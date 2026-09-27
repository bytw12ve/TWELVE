import Link from 'next/link'
import type { ComponentPropsWithRef, ReactNode } from 'react'

import styles from './PillButton.module.css'

type Common = {
  children: ReactNode
  /** Which ground it sits on — picks the focus ring and border colour (§7.1). */
  surface?: 'dark' | 'paper'
  className?: string
}

type AsButton = Common & { href?: undefined } & ComponentPropsWithRef<'button'>
type AsLink = Common & { href: string } & Omit<ComponentPropsWithRef<'a'>, 'href'>

/**
 * The pill control — MENU, CLOSE, VIEW WORK. Geometry from
 * references/previews/NavBar.html; states from docs/DESIGN.md §7.1.
 *
 * Renders a real <button> or a real <a>: never a div with a click handler, so
 * keyboard activation and focus come from the platform.
 */
export function PillButton(props: AsButton | AsLink) {
  const { children, surface = 'dark', className, ...rest } = props
  const classes = [styles.pill, styles[surface], className].filter(Boolean).join(' ')

  if (typeof props.href === 'string') {
    const { href, ...anchorProps } = rest as ComponentPropsWithRef<'a'> & { href: string }
    return (
      <Link href={href} className={classes} {...anchorProps}>
        {children}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} {...(rest as ComponentPropsWithRef<'button'>)}>
      {children}
    </button>
  )
}
