#!/usr/bin/env node
/**
 * The canonical host is declared once, in src/lib/site.ts (docs/BUILD.md §SEO):
 * "if a reviewer sees a literal domain anywhere else in the codebase, that is
 * a bug". This makes it a machine-checked bug instead of a review-time one.
 *
 * Scans tracked source files for the literal canonical domain, ignoring the
 * one file allowed to contain it and the documentation that discusses it.
 * Repository and account identifiers such as `bytw12ve/the-402` are not host
 * declarations and must remain usable in CI configuration.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'

const ALLOWED = new Set([
  'src/lib/site.ts', // the one declaration
  'eslint.config.mjs', // the editor-side rule that names the string
  'scripts/check-domain.mjs', // this file
  'content/the-402/privacy.ts', // the 402 app's policy, copied word for word; it names its address
])
const SCANNED = /\.(ts|tsx|js|jsx|mjs|cjs|css|json|html|yml|yaml)$/
const SKIPPED = /^(references|assets)\//

const files = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], {
  encoding: 'utf8',
})
  .split('\n')
  .filter((f) => f && SCANNED.test(f) && !SKIPPED.test(f) && !ALLOWED.has(f))

const offenders = []
for (const file of files) {
  // git lists files that are deleted but not yet staged; skip rather than crash.
  if (!existsSync(file)) continue
  const lines = readFileSync(file, 'utf8').split('\n')
  lines.forEach((line, i) => {
    if (line.includes('bytw12ve.com')) offenders.push(`${file}:${i + 1}: ${line.trim()}`)
  })
}

if (offenders.length > 0) {
  console.error('check-domain: the domain is hard-coded outside src/lib/site.ts.\n')
  for (const o of offenders) console.error(`  ✗ ${o}`)
  console.error("\n  Import it instead:  import { site, absoluteUrl } from '@/lib/site'")
  process.exit(1)
}

console.log(`check-domain: ${files.length} files clean — the domain lives only in src/lib/site.ts`)
