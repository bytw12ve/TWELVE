'use client'

import { useEffect, useState, type RefObject } from 'react'

/**
 * True while the element is on screen and the tab is visible. The Playground's
 * moving visuals run only then (docs/DESIGN.md §7.5), like the hero.
 */
export function useInView(ref: RefObject<Element | null>) {
  const [onScreen, setOnScreen] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setOnScreen(!!entry?.isIntersecting))
    observer.observe(el)
    const onVisibility = () => setVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [ref])

  return onScreen && visible
}
