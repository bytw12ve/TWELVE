'use client'

import { useRef, useState, type ReactNode } from 'react'

import { useReducedMotion } from '@/lib/useReducedMotion'

import styles from './PlaygroundFilter.module.css'

type Filter = { key: string; label: string; count: number }

/**
 * The Playground's filter — docs/DESIGN.md §5.3. The cards are server-rendered
 * children; this only hides the ones that do not match and springs the rest
 * back in (§7.5). Without JavaScript every card shows.
 */
export function PlaygroundFilter({ label, filters, children }: { label: string; filters: Filter[]; children: ReactNode }) {
  const [current, setCurrent] = useState('all')
  const grid = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  function choose(key: string) {
    setCurrent(key)
    const cards = grid.current?.querySelectorAll<HTMLElement>('[data-status]') ?? []
    let shown = 0
    for (const card of cards) {
      const on = key === 'all' || card.dataset.status === key
      card.hidden = !on
      if (on && !reduced && typeof card.animate === 'function') {
        card.animate({ scale: [0.94, 1] }, { duration: 500, delay: shown * 60, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', fill: 'backwards' })
        shown += 1
      }
    }
  }

  return (
    <>
      <div className={styles.filters} role="group" aria-label={label}>
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            className={styles.chip}
            aria-pressed={current === f.key}
            onClick={() => choose(f.key)}
          >
            {f.label} <span>{f.count}</span>
          </button>
        ))}
      </div>
      <div ref={grid} className={styles.grid}>
        {children}
      </div>
    </>
  )
}
