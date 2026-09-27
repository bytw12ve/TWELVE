#!/usr/bin/env node
/**
 * The web privacy policy must match the 402 app's own policy word for word
 * (docs/BUILD.md §Content Structure). The app's file is the source; this
 * compares every export of content/the-402/privacy.ts against it.
 *
 * Runs only where the 402's repository is checked out. It looks at
 * THE402_REPO (from the environment or the git-ignored .env.local), then at a
 * sibling folder named the-402. CI has no copy of the app, so it skips there
 * and says so; that is why this is `pnpm policy:check`, not part of the gate.
 *
 * Needs a Node that strips TypeScript types on import (22.18+ / 23.6+).
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = join(fileURLToPath(import.meta.url), '..', '..')
const fromEnvFile = () => {
  try {
    const line = readFileSync(join(root, '.env.local'), 'utf8').match(/^THE402_REPO=(.+)$/m)
    return line?.[1]?.trim().replace(/^["']|["']$/g, '')
  } catch {
    return undefined
  }
}
const repo = process.env.THE402_REPO ?? fromEnvFile() ?? join(root, '..', 'the-402')
const appFile = join(repo, 'apps/mobile/src/features/legal/policy.ts')
const webFile = join(root, 'content/the-402/privacy.ts')

if (!existsSync(appFile)) {
  console.error(`check-402-policy: the 402 repository is not at ${repo}.`)
  console.error('  Set THE402_REPO to its path; policy parity is a release requirement.')
  process.exit(1)
}

const app = await import(pathToFileURL(appFile).href)
const web = await import(pathToFileURL(webFile).href)

const failures = []
for (const name of [
  'POLICY_VERSION',
  'POLICY_UPDATED',
  'POLICY_INTRO',
  'POLICY_SHORT',
  'POLICY_SECTIONS',
]) {
  if (!(name in app)) failures.push(`${name}: missing from the app's policy`)
  else if (!(name in web)) failures.push(`${name}: missing from content/the-402/privacy.ts`)
  else if (JSON.stringify(app[name]) !== JSON.stringify(web[name]))
    failures.push(`${name}: the web copy differs from the app's`)
}
for (const name of Object.keys(app)) {
  if (!(name in web)) failures.push(`${name}: exported by the app, not copied to the web`)
}

if (failures.length > 0) {
  console.error('check-402-policy: the web privacy policy does not match the app.\n')
  for (const f of failures) console.error(`  ✗ ${f}`)
  console.error(
    '\n  The app is the source. Copy its policy.ts exports into content/the-402/privacy.ts.',
  )
  process.exit(1)
}
console.log(
  `check-402-policy: the web policy matches the app's, ${app.POLICY_VERSION} of ${app.POLICY_UPDATED}`,
)
