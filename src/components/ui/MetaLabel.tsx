import type { ElementType, ReactNode } from 'react'

import styles from './MetaLabel.module.css'

type Size = 'sm' | 'md' | 'lg'

/**
 * Uppercase letterspaced label — docs/DESIGN.md §1.3 meta scale.
 * Used for eyebrows, corner annotations and control text.
 */
export function MetaLabel({
  children,
  size = 'md',
  as: Tag = 'span',
  className,
}: {
  children: ReactNode
  size?: Size
  as?: ElementType
  className?: string
}) {
  return (
    <Tag className={[styles.label, styles[size], className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  )
}
