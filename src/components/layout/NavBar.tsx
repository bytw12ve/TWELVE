import Link from 'next/link'

import { site } from '@/lib/site'

import { MenuOverlay } from './MenuOverlay'
import styles from './NavBar.module.css'

/**
 * The persistent nav: the wordmark left and the MENU pill right, at every
 * width and on every route (docs/DESIGN.md §3). Pages v2 removed the inline
 * shortcut links; MENU is the whole navigation.
 *
 * Server component. Menu state lives in MenuOverlay.
 */
export function NavBar() {
  return (
    <header className={styles.bar}>
      <Link href="/" className={styles.mark}>
        {/* The wordmark is live text, never an image — docs/BUILD.md §Images and Media. */}
        twelve<i className={styles.period}>.</i>
        <span className={styles.srOnly}> — {site.name} home</span>
      </Link>

      {/* §3: the wordmark and MENU at every width — MENU is the whole navigation. */}
      <MenuOverlay />
    </header>
  )
}
