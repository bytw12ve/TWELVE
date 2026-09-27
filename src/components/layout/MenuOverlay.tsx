'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { CSSProperties } from 'react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'

import { MetaLabel } from '@/components/ui/MetaLabel'
import { PillButton } from '@/components/ui/PillButton'
import { StudioStamp } from '@/components/ui/StudioStamp'
import { routes } from '@/lib/routes'
import { site } from '@/lib/site'

import { LocalTime } from './LocalTime'
import styles from './MenuOverlay.module.css'

/**
 * The full-screen menu — structure from docs/DESIGN.md §6.2, behaviour from
 * §7.2, accessibility from §8.
 *
 * Behaviour the spec requires and this implements: focus moves to the first
 * row on open and back to the pill on close; Escape closes; focus is trapped
 * while open; the page behind is inert and scroll-locked; the pill cross-fades
 * into CLOSE in place, so the control never appears to move.
 */
/** Display names for src/lib/site.ts's social keys. */
const SOCIAL_LABELS = { github: 'GitHub' } as const

/** Reverse-wipe duration, docs/DESIGN.md §7.2. Mirrors CSS; see CLOSE_MS use. */
const CLOSE_MS = 380

/**
 * The event the homepage's scroll gesture sends (docs/DESIGN.md §4.0). The
 * menu keeps its own state; anything else asks it to open through this.
 */
export const OPEN_MENU_EVENT = 'twelve:open-menu'

/**
 * How long after closing a scroll gesture is ignored. A trackpad keeps
 * delivering wheel events for most of a second after the fingers lift, and
 * without this the momentum of the scroll that opened the menu reopens it.
 */
const REOPEN_COOLDOWN_MS = 800

export function MenuOverlay() {
  /*
   * Three phases, not two. The panel has to stay mounted through the close so
   * the reverse wipe can play — unmounting on the state flip is why closing
   * felt abrupt: there was nothing left on screen to animate.
   */
  const [phase, setPhase] = useState<'closed' | 'open' | 'closing'>('closed')
  const open = phase === 'open'
  const mounted = phase !== 'closed'
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLButtonElement>(null)
  const firstRowRef = useRef<HTMLAnchorElement>(null)
  const panelId = useId()
  const closedAtRef = useRef(0)

  const close = useCallback(() => {
    setPhase((current) => {
      if (current !== 'open') return current
      // Reduced motion: no wipe, so no reason to wait for one.
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      return reduced ? 'closed' : 'closing'
    })
  }, [])

  /*
   * Unmount when the reverse wipe ends. The timeout is not belt-and-braces:
   * if animationend never fires — an interrupted animation, a background tab,
   * a browser that drops the event — the overlay would stay on screen over an
   * inert page, which traps the whole site. The timer guarantees it clears.
   */
  useEffect(() => {
    if (phase !== 'closing') return
    const panel = panelRef.current
    const done = () => setPhase('closed')
    const timer = window.setTimeout(done, CLOSE_MS + 80)
    panel?.addEventListener('animationend', done, { once: true })
    return () => {
      window.clearTimeout(timer)
      panel?.removeEventListener('animationend', done)
    }
  }, [phase])

  /*
   * §4.0: a request to open from outside — the homepage's scroll gesture. It
   * takes the same path as the pill, so focus, trap, inert and scroll lock are
   * the pill's, not a second implementation. Ignored unless fully closed, and
   * for a moment after closing.
   */
  useEffect(() => {
    const onRequest = () => {
      if (performance.now() - closedAtRef.current < REOPEN_COOLDOWN_MS) return
      setPhase((current) => (current === 'closed' ? 'open' : current))
    }
    window.addEventListener(OPEN_MENU_EVENT, onRequest)
    return () => window.removeEventListener(OPEN_MENU_EVENT, onRequest)
  }, [])

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const pill = pillRef.current
    firstRowRef.current?.focus()

    /*
     * §7.2: the page behind the menu is inert. The focus trap below is the
     * backstop; inert is the actual mechanism, and it also hides the shell
     * from assistive technology while the menu is over it.
     */
    const behind = Array.from(
      document.querySelectorAll<HTMLElement>('main, footer, [data-shortcuts]'),
    )
    for (const element of behind) element.inert = true

    // Styles the nav needs while the menu is over it (NavBar.module.css).
    document.documentElement.dataset.menuOpen = 'true'

    /*
     * Scroll lock, and the scrollbar bookkeeping that goes with it.
     *
     * Padding the body stops the page shifting when the scrollbar goes away.
     * The overlay needs the same offset for a different reason: it is
     * position: fixed, so it spans the whole viewport including the strip the
     * scrollbar occupied, while the footer underneath is inside the narrower
     * content box. Without this the menu's right gutter — and so the 12.
     * stamp — sits a scrollbar's width further right than the footer's, and
     * the signature jumps when the menu opens. Invisible on overlay-scrollbar
     * platforms like macOS; 16px out on Windows.
     */
    const { body, documentElement } = document
    const scrollbar = window.innerWidth - documentElement.clientWidth
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    body.style.overflow = 'hidden'
    if (scrollbar > 0) {
      body.style.paddingRight = `${scrollbar}px`
      documentElement.style.setProperty('--scrollbar-width', `${scrollbar}px`)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        close()
        return
      }

      if (event.key !== 'Tab') return

      // Focus trap: cycle within the panel (§7.2).
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables || focusables.length === 0) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      closedAtRef.current = performance.now()
      document.removeEventListener('keydown', onKeyDown)
      for (const element of behind) element.inert = false
      delete document.documentElement.dataset.menuOpen
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
      documentElement.style.removeProperty('--scrollbar-width')
      // Focus returns to the pill — which is where CLOSE sat, so it does not move.
      ;(pill ?? previouslyFocused)?.focus()
    }
  }, [open, close])

  return (
    <>
      <PillButton
        ref={pillRef}
        /*
         * Paper for as long as the panel is mounted, not just while open. The
         * close wipe collapses upward, so the pill's corner stays paper until
         * the very end; flipping to dark at the start of the close would put a
         * dark control on a paper ground for the length of the wipe.
         */
        surface={mounted ? 'paper' : 'dark'}
        data-surface={mounted ? 'paper' : 'dark'}
        className={styles.pill}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => (open ? close() : setPhase('open'))}
      >
        {/*
          Both labels are stacked in one grid cell and cross-faded, which does
          two things: the control reverses with the wipe instead of snapping at
          the end, and the pill stops resizing between states, because the cell
          is as wide as the wider label. "Same position, same pill" (§7.2).

          The visible labels are aria-hidden and the accessible name lives in
          the visually-hidden span below, so the name switches instantly with
          aria-expanded while the pixels take 300ms. A name that faded with the
          animation would be a regression; this is visual timing only.
        */}
        <span className={styles.srOnly}>{open ? 'Close menu' : 'Menu'}</span>

        <span className={styles.labels} aria-hidden="true">
          <span
            className={[styles.pillLabel, open && styles.pillLabelOut].filter(Boolean).join(' ')}
          >
            Menu
            <span className={styles.bars}>
              <b />
              <b />
            </span>
          </span>

          <span
            className={[styles.pillLabel, !open && styles.pillLabelOut].filter(Boolean).join(' ')}
          >
            Close
            <svg className={styles.glyph} viewBox="0 0 16 16" focusable="false">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
        </span>
      </PillButton>

      {/* Closed: removed from the tree entirely, so nothing behind it is reachable. */}
      {mounted && (
        <div
          className={[styles.overlay, phase === 'closing' && styles.closing]
            .filter(Boolean)
            .join(' ')}
          id={panelId}
          ref={panelRef}
          // Leaving: no longer interactive, and out of the a11y tree.
          {...(phase === 'closing' ? { inert: true } : {})}
        >
          <nav className={styles.panel} aria-label="Primary">
            {/*
              §6.2's top band is the nav's own wordmark and the CLOSE pill at
              the exact coordinates MENU occupied. Neither is duplicated here:
              the mark recolours to ink-900 through html[data-menu-open], and
              the pill is literally the same element. One "twelve." in the
              accessibility tree, one control that never appears to move.
            */}
            <div className={styles.rows}>
              {routes.map((route, index) => {
                const current = pathname === route.href
                return (
                  <Link
                    key={route.href}
                    href={route.href}
                    ref={index === 0 ? firstRowRef : undefined}
                    className={[styles.row, current && styles.currentRow].filter(Boolean).join(' ')}
                    aria-current={current ? 'page' : undefined}
                    onClick={close}
                    style={{ '--row-index': index } as CSSProperties}
                  >
                    <MetaLabel size="md" className={styles.numeral}>
                      {route.numeral}
                    </MetaLabel>
                    <span className={styles.label}>
                      <span className={styles.labelText}>{route.label}</span>
                    </span>
                    <MetaLabel size="md" className={styles.hint}>
                      {route.hint}
                    </MetaLabel>
                  </Link>
                )
              })}
            </div>

            <div className={styles.footer}>
              <a className={styles.email} href={`mailto:${site.email}`}>
                {site.email}
              </a>
              {/*
                A social with a URL is a real link, opening in a new tab. One
                without stays a plain list item — non-interactive by design
                (docs/DESIGN.md §7.1): not focusable, no hover, so nobody tries
                to click a name that goes nowhere.
              */}
              <ul className={styles.socials}>
                {Object.entries(site.socials).map(([name, url]) => {
                  const label = SOCIAL_LABELS[name as keyof typeof SOCIAL_LABELS]
                  return (
                    <li key={name} className={styles.social}>
                      {url ? (
                        <a
                          className={styles.socialLink}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {label}
                          <span aria-hidden="true"> ↗</span>
                          <span className={styles.srOnly}> (opens in a new tab)</span>
                        </a>
                      ) : (
                        label
                      )}
                    </li>
                  )
                })}
              </ul>
              <div className={styles.meta}>
                <LocalTime />
                <StudioStamp surface="paper" />
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
