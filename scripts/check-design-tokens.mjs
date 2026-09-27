#!/usr/bin/env node
/**
 * Closes the loop on the Stage 0 exit criterion: "every token in docs/DESIGN.md §1
 * exists in tokens.css with the exact documented value, verified by a script —
 * not by eye" (docs/BUILD.md §Build Stages).
 *
 * scripts/tokens.mjs proves tokens.css matches references/tokens.json. This
 * script proves both of them match the prose spec, by parsing the §1.1, §1.3
 * and §1.4 tables in docs/DESIGN.md directly. docs/DESIGN.md wins: anything it documents
 * must be present with the documented value. tokens.json may carry extra
 * detail the prose leaves out (a letter-spacing, a shadow value); that is not
 * a failure, but a disagreement is.
 */
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const design = readFileSync(join(root, 'docs/DESIGN.md'), 'utf8')
const tokens = JSON.parse(readFileSync(join(root, 'references/tokens.json'), 'utf8'))
const css = readFileSync(join(root, 'src/styles/tokens.css'), 'utf8')

const section = (heading, next) => {
  const start = design.indexOf(heading)
  const end = design.indexOf(next, start + 1)
  if (start === -1 || end === -1) {
    console.error(`check-design-tokens: cannot find "${heading}" in docs/DESIGN.md.`)
    console.error('        The §1 structure changed — update this script rather than removing it.')
    process.exit(1)
  }
  return design.slice(start, end)
}

const s11 = section('### 1.1 Color', '### 1.2')
const s13 = section('### 1.3 Type', '### 1.4')
const s14 = section('### 1.4 Spacing', '### 1.5')
const s15 = section('### 1.5 The 402 skin', '## 2.')

const failures = []
const checked = []

const cssValue = (name) => {
  const match = css.match(new RegExp(`^\\s*--${name}:\\s*(.+?);`, 'm'))
  return match ? match[1].trim() : null
}
const jsonValue = (name) => {
  for (const s of ['color', 'spacing', 'radius', 'shadow', 'opacity']) {
    const hit = tokens[s].tokens.find((t) => t.name === name)
    if (hit) return hit.value
  }
  return null
}

/** Compare one documented token against tokens.json and tokens.css. */
const expect = (name, documented, { unit = '' } = {}) => {
  checked.push(name)
  const want = `${documented}${unit}`
  const json = jsonValue(name)
  const inCss = cssValue(name)
  if (json === null)
    failures.push(`${name}: documented in docs/DESIGN.md, missing from tokens.json`)
  else if (json.toLowerCase() !== want.toLowerCase())
    failures.push(`${name}: docs/DESIGN.md says ${want}, tokens.json says ${json}`)
  if (inCss === null)
    failures.push(`${name}: documented in docs/DESIGN.md, missing from tokens.css`)
  else if (inCss.toLowerCase() !== want.toLowerCase())
    failures.push(`${name}: docs/DESIGN.md says ${want}, tokens.css says ${inCss}`)
}

// §1.1 — colours. Covers the table rows and the packed pixel-world rows.
const colours = [...s11.matchAll(/`([a-z]+-[a-z0-9]+)`[^`\n]*`(#[0-9a-fA-F]{6})`/g)]
if (colours.length < 20) {
  failures.push(`§1.1 parsed only ${colours.length} colours — the table format changed`)
}
for (const [, name, hex] of colours) expect(name, hex)

// §1.5 — the 402 skin's colours, same row format as §1.1.
const skin = [...s15.matchAll(/`([a-z]+-[a-z0-9]+)`[^`\n]*`(#[0-9a-fA-F]{6})`/g)]
if (skin.length < 15) {
  failures.push(`§1.5 parsed only ${skin.length} colours — the table format changed`)
}
for (const [, name, hex] of skin) expect(name, hex)

// §1.5 — the 402 type styles. Most are fluid, so their sizes live as clamp()
// in tokens.json and are not compared here; every documented name must exist.
for (const [, name] of s15.matchAll(/^\|\s*`(the402-[a-z-]+)`\s*\|\s*[\d]/gm)) {
  checked.push(name)
  const style = tokens.type.groups.flatMap((g) => g.styles).find((s) => s.name === name)
  if (!style) failures.push(`${name}: documented in docs/DESIGN.md §1.5, missing from tokens.json`)
  else if (cssValue(`text-${name}-size`) === null)
    failures.push(`text-${name}-size: missing from tokens.css`)
}

// §1.1 — the two focus aliases, which point at a token rather than a value.
for (const [, name, target] of s11.matchAll(/`(focus-[a-z]+)`\s*\|\s*→\s*`([a-z]+-[a-z0-9]+)`/g)) {
  checked.push(name)
  if (jsonValue(name) !== `{${target}}`)
    failures.push(`${name}: docs/DESIGN.md aliases ${target}, tokens.json says ${jsonValue(name)}`)
  if (cssValue(name) !== `var(--${target})`)
    failures.push(`${name}: docs/DESIGN.md aliases ${target}, tokens.css says ${cssValue(name)}`)
}

// §1.3 — the type scale: "| `display-hero` | 220 / 0.82 / 800, ls −0.045em |"
const styles = [
  ...s13.matchAll(
    /`([a-z][a-z-]*)`\s*\|\s*([\d.]+)\s*\/\s*([\d.]+)\s*\/\s*(\d+)(?:,\s*ls\s*(−|-)?([\d.]+em))?/g,
  ),
]
if (styles.length < 14) {
  failures.push(`§1.3 parsed only ${styles.length} type styles — the table format changed`)
}
for (const [, name, size, leading, weight, sign, tracking] of styles) {
  checked.push(name)
  const style = tokens.type.groups.flatMap((g) => g.styles).find((s) => s.name === name)
  if (!style) {
    failures.push(`${name}: documented in docs/DESIGN.md §1.3, missing from tokens.json`)
    continue
  }
  const want = { fontSize: `${size}px`, lineHeight: leading, fontWeight: Number(weight) }
  for (const [key, value] of Object.entries(want)) {
    if (String(style[key]) !== String(value))
      failures.push(`${name}.${key}: docs/DESIGN.md says ${value}, tokens.json says ${style[key]}`)
  }
  if (tracking) {
    const want = `${sign ? '-' : ''}${tracking}`
    if (style.letterSpacing !== want)
      failures.push(
        `${name}.letterSpacing: docs/DESIGN.md says ${want}, tokens.json says ${style.letterSpacing}`,
      )
  }
  if (cssValue(`text-${name}-size`) !== `${size}px`)
    failures.push(`text-${name}-size: missing or wrong in tokens.css`)
}

// §1.4 — spacing, written as "`space-1` 4 · `-2` 8 · `-3` 12".
const spacingLine = s14.match(/^Spacing:.*$/m)?.[0] ?? ''
for (const [, suffix, value] of spacingLine.matchAll(/`(?:space)?-(\d+)`\s*(\d+)/g)) {
  expect(`space-${suffix}`, value, { unit: 'px' })
}

// §1.4 — radius, written as "`radius-xl` 40 (environments…)".
for (const [, name, value] of s14.matchAll(/`(radius-[a-z]+)`\s*(\d+)/g)) {
  expect(name, value, { unit: 'px' })
}

// §1.4 — opacity, written as "`opacity-grid` 0.5 (star grid)".
for (const [, name, value] of s14.matchAll(/`(opacity-[a-z]+)`\s*([\d.]+)/g)) {
  expect(name, value)
}

// §1.4 — the two shadows are named but not valued in prose; check they exist.
for (const [, name] of s14.matchAll(/`(shadow-[a-z]+)`/g)) {
  checked.push(name)
  if (!jsonValue(name))
    failures.push(`${name}: named in docs/DESIGN.md §1.4, missing from tokens.json`)
  if (!cssValue(name))
    failures.push(`${name}: named in docs/DESIGN.md §1.4, missing from tokens.css`)
}

if (failures.length > 0) {
  console.error('check-design-tokens: docs/DESIGN.md §1 and the token layer disagree.\n')
  for (const f of failures) console.error(`  ✗ ${f}`)
  console.error('\n  docs/DESIGN.md is the source of truth. Fix references/tokens.json, then:')
  console.error('    pnpm tokens:build')
  process.exit(1)
}

console.log(
  `check-design-tokens: ${new Set(checked).size} tokens verified against docs/DESIGN.md §1`,
)
