#!/usr/bin/env node
/**
 * Accessibility gate (docs/BUILD.md §Stage 1, §Tooling).
 *
 * "axe reports no violations on any route" is an exit criterion, so it runs on
 * every push rather than being checked once by hand. Starts the production
 * server, runs @axe-core/cli over every route, and exits non-zero on any
 * violation.
 *
 * Fail-loud, like the other guardrails: if the server does not come up, or a
 * route cannot be reached, that is a failure — never a silent pass. A gate
 * that cannot fail is not a gate.
 */
import { spawn, spawnSync } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const PORT = process.env.A11Y_PORT ?? '3210'
const ORIGIN = `http://127.0.0.1:${PORT}`
const ROUTES = [
  '/',
  '/work',
  '/about',
  '/playground',
  '/contact',
  '/work/the-402',
  '/402/privacy',
  '/402/terms',
  '/402/support',
  '/402/delete-account',
  '/this-route-does-not-exist',
]
const BOOT_TIMEOUT_MS = 60_000

const fail = (message) => {
  console.error(`\ncheck-a11y: ${message}`)
  process.exit(1)
}

const server = spawn('pnpm', ['exec', 'next', 'start', '--port', PORT], {
  stdio: ['ignore', 'pipe', 'pipe'],
})
let serverOutput = ''
server.stdout.on('data', (d) => (serverOutput += d))
server.stderr.on('data', (d) => (serverOutput += d))
server.on('exit', (code) => {
  if (code !== null && code !== 0) {
    console.error(serverOutput)
    fail(`the server exited with code ${code} before the run finished`)
  }
})

const stop = () => server.kill('SIGTERM')
process.on('exit', stop)
process.on('SIGINT', () => process.exit(130))

// Wait for readiness rather than sleeping a fixed amount, with a hard ceiling
// so a server that never boots fails the job instead of hanging it.
const startedAt = Date.now()
let ready = false
while (Date.now() - startedAt < BOOT_TIMEOUT_MS) {
  try {
    const response = await fetch(ORIGIN, { signal: AbortSignal.timeout(2000) })
    if (response.ok) {
      ready = true
      break
    }
  } catch {
    // not up yet
  }
  await sleep(500)
}

if (!ready) {
  console.error(serverOutput)
  fail(`the server did not respond on ${ORIGIN} within ${BOOT_TIMEOUT_MS / 1000}s`)
}

console.log(`\nchecking ${ROUTES.length} routes with axe — ${ORIGIN}\n`)

const result = spawnSync(
  'pnpm',
  [
    'exec',
    'axe',
    ...ROUTES.map((route) => `${ORIGIN}${route}`),
    '--exit',
    '--chrome-options',
    'no-sandbox,disable-dev-shm-usage,headless',
  ],
  { stdio: 'inherit' },
)

stop()

if (result.error) fail(`could not run axe: ${result.error.message}`)
if (result.status !== 0) {
  fail(`axe reported violations, or could not reach a route. Exit code ${result.status}.`)
}

console.log(`\ncheck-a11y: ${ROUTES.length} routes clean`)
