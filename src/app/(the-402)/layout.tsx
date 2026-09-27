import type { ReactNode } from 'react'

import { the402FontVariables } from '@/styles/fonts402'

import styles from './layout.module.css'

/**
 * The 402's routes: /work/the-402 and /402/*. This layout is the only place
 * the 402's three faces are imported, so no other route preloads them
 * (docs/BUILD.md §Fonts). The group name does not appear in URLs.
 */
export default function The402Layout({ children }: { children: ReactNode }) {
  return <div className={`${the402FontVariables} ${styles.fonts}`}>{children}</div>
}
