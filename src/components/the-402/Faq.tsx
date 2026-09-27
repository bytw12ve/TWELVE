'use client'

import { useRef, type MouseEvent, type ReactNode } from 'react'

import { useReducedMotion } from '@/lib/useReducedMotion'

import styles from './Faq.module.css'

const EASE = 'cubic-bezier(0.2, 0.8, 0.2, 1)'

/**
 * One question. A real <details>, so it opens and closes with no JavaScript;
 * with it, the height animates on every open and every close — the prototype
 * animated only the first opening (docs/DESIGN.md §7.5).
 */
export function FaqItem({ question, children }: { question: string; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null)
  const animation = useRef<Animation | null>(null)
  const reduced = useReducedMotion()

  function toggle(event: MouseEvent<HTMLElement>) {
    const details = ref.current
    if (!details || reduced || typeof details.animate !== 'function') return
    event.preventDefault()
    const summary = details.querySelector('summary')
    const answer = details.querySelector<HTMLElement>(`.${styles.answer}`)
    const start = details.offsetHeight
    animation.current?.cancel()

    if (!details.open) {
      details.open = true
      const end = details.offsetHeight
      animation.current = details.animate({ height: [`${start}px`, `${end}px`] }, { duration: 320, easing: EASE })
      answer?.animate({ transform: ['translateY(-6px)', 'none'] }, { duration: 320, easing: 'ease-out' })
    } else {
      const end = summary?.offsetHeight ?? 0
      animation.current = details.animate({ height: [`${start}px`, `${end}px`] }, { duration: 260, easing: EASE })
      animation.current.onfinish = () => {
        details.open = false
      }
    }
  }

  return (
    <details ref={ref} className={styles.item}>
      <summary className={styles.question} onClick={toggle}>
        {question}
      </summary>
      <div className={styles.answer}>{children}</div>
    </details>
  )
}
