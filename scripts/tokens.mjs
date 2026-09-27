#!/usr/bin/env node
/**
 * Generates src/styles/tokens.css from references/tokens.json, which is the
 * machine-readable mirror of docs/DESIGN.md §1.
 *
 *   node scripts/tokens.mjs           rewrite src/styles/tokens.css
 *   node scripts/tokens.mjs --check   fail if the committed file has drifted
 *
 * docs/BUILD.md §Build Stages requires token parity to be verified by a script and
 * not by eye, so --check runs in CI. Never hand-edit the generated CSS: change
 * docs/DESIGN.md §1 and references/tokens.json, then regenerate.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = join(root, 'references/tokens.json')
const TARGET = join(root, 'src/styles/tokens.css')

const fail = (message) => {
  console.error(`tokens: ${message}`)
  process.exit(1)
}

const tokens = JSON.parse(readFileSync(SOURCE, 'utf8'))

for (const section of ['color', 'spacing', 'radius', 'shadow', 'opacity']) {
  if (!Array.isArray(tokens[section]?.tokens) || tokens[section].tokens.length === 0) {
    fail(`references/tokens.json is missing a non-empty "${section}.tokens" array`)
  }
}
if (!tokens.type?.families || !Array.isArray(tokens.type?.groups)) {
  fail('references/tokens.json is missing "type.families" or "type.groups"')
}

/** `{purple-500}` in tokens.json is an alias, not a literal value. */
const resolve = (value) =>
  typeof value === 'string' && /^\{[a-z0-9-]+\}$/.test(value)
    ? `var(--${value.slice(1, -1)})`
    : value

const block = (title, lines) => [`  /* ${title} */`, ...lines, ''].join('\n')

const list = (section) => tokens[section].tokens.map((t) => `  --${t.name}: ${resolve(t.value)};`)

const families = Object.entries(tokens.type.families).map(
  ([name, stack]) => `  --font-${name}: ${stack};`,
)

const typeStyles = tokens.type.groups.flatMap((group) =>
  group.styles.flatMap((style) => {
    const rows = [
      `  --text-${style.name}-size: ${style.fontSize};`,
      `  --text-${style.name}-leading: ${style.lineHeight};`,
      `  --text-${style.name}-weight: ${style.fontWeight};`,
    ]
    if (style.letterSpacing) {
      rows.push(`  --text-${style.name}-tracking: ${style.letterSpacing};`)
    }
    return rows
  }),
)

const css = `/*
 * GENERATED FILE — do not edit.
 *
 * Source:    ${relative(root, SOURCE)} (the machine-readable mirror of docs/DESIGN.md §1)
 * Generator: ${relative(root, fileURLToPath(import.meta.url))}
 * Regenerate: pnpm tokens:build   ·   Verify: pnpm tokens:check
 *
 * Every raw colour, size, radius and duration in this codebase lives here and
 * nowhere else. A literal value in a component is a bug (docs/BUILD.md §Styling).
 */

:root {
${block('Colour — docs/DESIGN.md §1.1', list('color'))}
${block('Type — families', families)}
${block('Type — scale, docs/DESIGN.md §1.3', typeStyles)}
${block('Spacing — docs/DESIGN.md §1.4', list('spacing'))}
${block('Radius — docs/DESIGN.md §1.4', list('radius'))}
${block('Elevation — docs/DESIGN.md §1.4', list('shadow'))}
${block('Opacity — docs/DESIGN.md §1.4', list('opacity')).trimEnd()}
}
`

const check = process.argv.includes('--check')

if (check) {
  let current
  try {
    current = readFileSync(TARGET, 'utf8')
  } catch {
    fail(`${relative(root, TARGET)} is missing. Run: pnpm tokens:build`)
  }
  if (current !== css) {
    fail(
      `${relative(root, TARGET)} has drifted from ${relative(root, SOURCE)}.\n` +
        '        Do not hand-edit the generated CSS. Run: pnpm tokens:build',
    )
  }
  const count =
    ['color', 'spacing', 'radius', 'shadow', 'opacity'].reduce(
      (n, s) => n + tokens[s].tokens.length,
      0,
    ) + tokens.type.groups.reduce((n, g) => n + g.styles.length, 0)
  console.log(`tokens: ${count} tokens in sync with ${relative(root, SOURCE)}`)
} else {
  writeFileSync(TARGET, css)
  console.log(`tokens: wrote ${relative(root, TARGET)}`)
}
