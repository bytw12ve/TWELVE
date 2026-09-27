#!/usr/bin/env node
/**
 * First-load JS budget gate (docs/BUILD.md §Performance).
 *
 * THE BUDGET IS TWELVE'S OWN JS, ON TOP OF A RECORDED FRAMEWORK FLOOR.
 *
 *   framework baseline   BASELINE_BYTES below — measured, locked, documented
 *   homepage allowance   ≤ 60 KB gzipped of Twelve's own code
 *   inner pages          ≤ 40 KB gzipped of Twelve's own code
 *
 * An empty Next 16 App Router page already ships ~130 KB gzipped of React and
 * router runtime, so the 60/40 figures in docs/BUILD.md cannot be absolute totals.
 * They are what Twelve is allowed to add. The floor is pinned here so that a
 * Next upgrade which inflates it fails this check instead of quietly eating
 * the headroom — see docs/BUILD.md §Performance for the measurement method and the
 * re-measurement procedure.
 *
 * "A budget regression fails the job, it does not warn" — this exits non-zero,
 * and it is the last step of CI.
 *
 * HOW IT MEASURES
 * Next 16 with Turbopack emits no app-build-manifest.json, so instead of
 * reading an internal manifest this reads the prerendered HTML Next writes for
 * each static route and sums the gzipped size of every JS file that HTML tells
 * the browser to load. That is what a visitor actually pays. The polyfill
 * bundle is served with `noModule` and is excluded: no browser that can run
 * this site downloads it.
 *
 * FAIL-LOUD
 * Pinned to the Next version below. Any broken assumption — a missing build,
 * no prerendered HTML, a route with no scripts, a script that does not resolve
 * on disk, a zero total, a different Next version, or a framework floor that
 * has moved — exits non-zero naming what changed. It never reports a partial
 * sum: "0 KB, under budget" would be a green check that means nothing.
 */
import { gzipSync } from 'node:zlib'
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative, sep } from 'node:path'

/**
 * The locked Next version and the framework floor measured against it.
 *
 * Measured 2026-09-20 on the Stage 0 scaffold: a route whose only content is
 * static markup, no client components, no app JS. Reproduce with
 * `pnpm build && pnpm budget` on a bare route; a webpack build (`next build
 * --webpack`) gave 127.9 KB, confirming this is the React/App-Router floor and
 * not a Turbopack artifact.
 *
 * On a Next upgrade this check fails by design. Re-measure deliberately,
 * update both constants, and record the new floor in docs/BUILD.md §Performance.
 */
const SUPPORTED_NEXT = '16.3.5'
const BASELINE_BYTES = 133_454 // 130.3 KB gzipped
const BASELINE_TOLERANCE = 2 * 1024 // chunk hashing moves this by a few bytes

/** Twelve's own JS allowance, on top of the baseline (docs/BUILD.md §Performance). */
const BUDGETS = {
  '/': 60 * 1024,
  default: 40 * 1024,
}

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const appDir = join(root, '.next/server/app')
const staticDir = join(root, '.next/static')

const fail = (message, detail) => {
  console.error(`\ncheck-budget: ${message}`)
  if (detail) console.error(`\n${detail}`)
  console.error(
    '\n  If this is a Next.js upgrade rather than a real regression, re-verify the\n' +
      '  build output layout and update scripts/check-budget.mjs (SUPPORTED_MAJOR).',
  )
  process.exit(1)
}

// — Assumption 1: the Next major this script was written against.
let nextVersion
try {
  nextVersion = JSON.parse(
    readFileSync(join(root, 'node_modules/next/package.json'), 'utf8'),
  ).version
} catch {
  fail('cannot read node_modules/next/package.json. Run: pnpm install')
}
if (nextVersion !== SUPPORTED_NEXT) {
  fail(
    `built with Next ${nextVersion}, but this check is locked to Next ${SUPPORTED_NEXT}.`,
    '  Both the build output layout and the framework baseline were measured against\n' +
      `  ${SUPPORTED_NEXT}. Re-measure on the new version, update SUPPORTED_NEXT and\n` +
      '  BASELINE_BYTES here, and record the new floor in docs/BUILD.md §Performance.',
  )
}

// — Assumption 2: a production build exists, with prerendered HTML.
if (!existsSync(appDir)) fail(`no build output at ${relative(root, appDir)}. Run: pnpm build`)
if (!existsSync(staticDir))
  fail(`no static assets at ${relative(root, staticDir)}. Run: pnpm build`)

const htmlFiles = []
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full)
    else if (entry.endsWith('.html')) htmlFiles.push(full)
  }
}
walk(appDir)

if (htmlFiles.length === 0) {
  fail(
    `found no prerendered HTML under ${relative(root, appDir)}.`,
    '  Every route is statically rendered (docs/BUILD.md §Framework), so this should\n' +
      '  never be empty. Either the build failed or the output layout changed.',
  )
}

/** `.next/server/app/work/index.html` → `/work`; `_not-found.html` → `/_not-found`. */
const routeOf = (file) => {
  const rel = relative(appDir, file)
    .split(sep)
    .join('/')
    .replace(/\.html$/, '')
  const route = rel === 'index' ? '/' : `/${rel.replace(/\/index$/, '')}`
  return route
}

const gzipped = new Map()
const sizeOf = (asset) => {
  if (gzipped.has(asset)) return gzipped.get(asset)
  const file = join(root, '.next', asset.replace(/^\/_next\//, ''))
  if (!existsSync(file)) {
    fail(
      `a script referenced by the built HTML does not exist on disk: ${asset}`,
      '  The mapping from /_next/* to .next/* no longer holds, so any total this\n' +
        '  script reported would be too low.',
    )
  }
  const size = gzipSync(readFileSync(file)).length
  gzipped.set(asset, size)
  return size
}

const rows = []
for (const file of htmlFiles.sort()) {
  const route = routeOf(file)
  const html = readFileSync(file, 'utf8')
  // Script tags plus script preloads. The polyfill bundle is served with
  // `noModule`, so no browser that can run this site ever downloads it —
  // counting it would overstate the cost by roughly 39 KB.
  const src = (tag) => tag.match(/(?:src|href)="(\/_next\/static\/[^"]+\.js)"/)?.[1]
  const scripts = [...html.matchAll(/<script[^>]*>/g)]
    .map((m) => m[0])
    .filter((tag) => !/\bnomodule\b/i.test(tag))
    .map(src)
  const preloads = [...html.matchAll(/<link[^>]+as="script"[^>]*>/g)].map((m) => src(m[0]))
  const assets = [...new Set([...scripts, ...preloads].filter(Boolean))]

  if (assets.length === 0) {
    fail(
      `route ${route} references no JS at all in its prerendered HTML.`,
      '  Next always ships a runtime chunk, so zero means the HTML is no longer the\n' +
        '  place these are declared — not that the page is free.',
    )
  }

  const bytes = assets.reduce((sum, asset) => sum + sizeOf(asset), 0)
  if (bytes === 0) fail(`route ${route} measured 0 bytes across ${assets.length} scripts`)

  const budget = BUDGETS[route] ?? BUDGETS.default
  const app = bytes - BASELINE_BYTES
  rows.push({ route, bytes, app, budget, count: assets.length, over: app > budget })
}

// — Assumption 3: the framework floor is still where it was measured.
// Every route carries it, so the cheapest route is the closest thing to it.
const floor = Math.min(...rows.map((r) => r.bytes))
if (floor < BASELINE_BYTES - BASELINE_TOLERANCE || floor > BASELINE_BYTES + BASELINE_TOLERANCE) {
  fail(
    `the framework baseline has moved: measured ${(floor / 1024).toFixed(1)} KB, ` +
      `recorded ${(BASELINE_BYTES / 1024).toFixed(1)} KB.`,
    "  Twelve's JS allowance is measured on top of this floor, so a moved floor\n" +
      '  silently changes the gate. Re-measure deliberately, update BASELINE_BYTES\n' +
      '  in this file, and record the new floor and the reason in docs/BUILD.md\n' +
      '  §Performance. Do not adjust it to make a build pass.',
  )
}

if (!rows.some((r) => r.route === '/')) {
  fail(
    'the homepage was not found in the build output.',
    `  Routes seen: ${rows.map((r) => r.route).join(', ') || '(none)'}`,
  )
}

const kb = (n) => `${(n / 1024).toFixed(1)} KB`
const pad = (s, n) => String(s).padEnd(n)

console.log(`\nFirst-load JS, gzipped — Next ${nextVersion}`)
console.log(`Framework baseline ${kb(BASELINE_BYTES)}; the budget below is Twelve's own JS.\n`)
console.log(
  `  ${pad('Route', 20)}${pad('Total', 11)}${pad('Twelve', 11)}${pad('Budget', 11)}Status`,
)
for (const r of rows.sort((a, b) => b.bytes - a.bytes)) {
  const status = r.over ? `OVER by ${kb(r.app - r.budget)}` : `ok (${kb(r.budget - r.app)} spare)`
  console.log(
    `  ${pad(r.route, 20)}${pad(kb(r.bytes), 11)}${pad(kb(Math.max(r.app, 0)), 11)}${pad(kb(r.budget), 11)}${status}`,
  )
}
console.log('')

const over = rows.filter((r) => r.over)
if (over.length > 0) {
  console.error('check-budget: over the docs/BUILD.md §Performance budget:\n')
  for (const r of over) {
    console.error(
      `  ✗ ${r.route} — ${kb(r.app)} of Twelve's own JS against a ${kb(r.budget)} budget ` +
        `(${kb(r.bytes)} total)`,
    )
  }
  console.error(
    '\n  docs/BUILD.md treats these as release gates, not aspirations. Either remove the\n' +
      '  weight, or change the budget in docs/BUILD.md first with a written reason.',
  )
  process.exit(1)
}

console.log(`check-budget: ${rows.length} routes within budget`)
