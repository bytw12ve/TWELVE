import type { ReactNode } from 'react'

import styles from './Chip.module.css'

/**
 * Small metadata chip — docs/DESIGN.md §6, radius-sm, purple-700 border on
 * void-700.
 *
 * Built in Stage 1 because docs/BUILD.md names it among the stage's
 * primitives. Its first real use is the Playground filter row in Stage 4,
 * where the selected state arrives with the behaviour that needs it.
 */
export function Chip({ children, selected = false }: { children: ReactNode; selected?: boolean }) {
  return (
    <span className={[styles.chip, selected && styles.selected].filter(Boolean).join(' ')}>
      {children}
    </span>
  )
}
