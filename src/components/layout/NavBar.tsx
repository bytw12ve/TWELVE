import Link from 'next/link'

import { navRoutes } from '@/lib/routes'
import { site } from '@/lib/site'

import { ActiveNavLink } from './ActiveNavLink'
import { MenuOverlay } from './MenuOverlay'
import styles from './NavBar.module.css'

/**
 * The persistent nav — references/previews/NavBar.html is the exact source:
 * 96px bar, space-16 gutters, hairline-dark bottom rule, the wordmark left,
 * the inline shortcut links and the MENU pill right.
 *
 * Server component. Route awareness lives in ActiveNavLink, menu state in
 * MenuOverlay.
 */
export function NavBar() {
  return (
    <header className={styles.bar}>
      <Link href="/" className={styles.mark}>
        {/* The wordmark is live text, never an image — docs/BUILD.md §Images and Media. */}
        twelve<i className={styles.period}>.</i>
        <span className={styles.srOnly}> — {site.name} home</span>
      </Link>

      <div className={styles.right}>
        {/* Inline links are a shortcut (§3), hidden below 1024px (§2.2). */}
        <nav className={styles.links} aria-label="Shortcuts" data-shortcuts>
          {navRoutes.map((route) => (
            <ActiveNavLink key={route.href} href={route.href} label={route.label} />
          ))}
        </nav>
        <MenuOverlay />
      </div>
    </header>
  )
}
