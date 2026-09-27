import type { ReactNode } from 'react'

import styles from './Page.module.css'

/**
 * The inner pages' frame. The page is full-bleed (main adds no padding when a
 * [data-page] is present), so full-width bands — About's paper statement,
 * Contact's slab — can run edge to edge; `Wrap` puts content back on the
 * gutters, capped at 1600px.
 */
export function Page({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div data-page className={[styles.page, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}

export function Wrap({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={[styles.wrap, className].filter(Boolean).join(' ')}>{children}</div>
}
