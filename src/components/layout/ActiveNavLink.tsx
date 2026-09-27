'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from './NavBar.module.css'

/**
 * One inline nav link, and the only reason the nav needs the client at all.
 *
 * docs/DESIGN.md §7.1 gives the current route a persistent purple-500
 * underline, which means knowing the current path. Keeping that in a
 * single-link component leaves NavBar itself a server component — marking the
 * whole bar 'use client' would ship the wordmark and static chrome to the
 * browser for one boolean (docs/BUILD.md §Component Architecture).
 */
export function ActiveNavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const current = pathname === href

  return (
    <Link
      href={href}
      className={[styles.link, current && styles.current].filter(Boolean).join(' ')}
      aria-current={current ? 'page' : undefined}
    >
      {label}
    </Link>
  )
}
