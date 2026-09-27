'use client'

import { useSyncExternalStore } from 'react'

/**
 * The single source of truth for reduced motion (docs/BUILD.md §Motion:
 * "Every motion path reads one useReducedMotion source of truth, not
 * scattered media queries").
 *
 * Server snapshot is `true` — motion off — so the first paint never starts an
 * animation the visitor asked not to see.
 */
const QUERY = '(prefers-reduced-motion: reduce)'

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY)
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}

export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => true,
  )
}
