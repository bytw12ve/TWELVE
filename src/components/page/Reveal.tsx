'use client'

import { useEffect, useRef, type ElementType, type HTMLAttributes, type ReactNode } from 'react'

import { useReducedMotion } from '@/lib/useReducedMotion'

import styles from './Reveal.module.css'

/**
 * Sections nudge up into place as they scroll in, once (docs/DESIGN.md §7.5).
 *
 * Translate only — nothing is ever transparent, at rest or in flight (§4.0).
 * The waiting state is applied from the client after mount, and only to a
 * section still below the fold, so the server HTML is always the finished
 * page and anything that never runs this script sees everything.
 *
 * Sets data-seen when the section arrives, which other motion keys off (the
 * 402's rising towers, the logo's pop).
 */
export function Reveal({
  as: Tag = 'div',
  className,
  children,
  ...rest
}: {
  as?: ElementType
  className?: string
  children: ReactNode
} & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (reduced) {
      el.dataset.seen = ''
      return
    }
    let observer: IntersectionObserver | undefined
    const frame = requestAnimationFrame(() => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        el.dataset.seen = ''
        return
      }
      el.dataset.pre = ''
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue
            delete el.dataset.pre
            el.dataset.seen = ''
            observer?.disconnect()
          }
        },
        { threshold: 0.12 },
      )
      observer.observe(el)
    })
    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
    }
  }, [reduced])

  return (
    <Tag ref={ref} {...rest} className={[styles.reveal, className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  )
}
