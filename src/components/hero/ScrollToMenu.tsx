'use client'

import { useEffect } from 'react'

import { OPEN_MENU_EVENT } from '@/components/layout/MenuOverlay'

/** Accumulated downward travel before the gesture counts, in CSS pixels. */
const WHEEL_THRESHOLD = 60
const SWIPE_THRESHOLD = 40
/** A pause this long between wheel events starts a new gesture. */
const GESTURE_GAP_MS = 200

/**
 * Scrolling down on the homepage opens the menu — docs/DESIGN.md §4.0.
 *
 * The homepage is one screen, so a downward scroll has nowhere to go; this
 * turns it into the next step, which is MENU. It is a request, not a hijack:
 * listeners are passive, nothing calls preventDefault, and it only acts once
 * the document is already at its bottom — on a phone too short for the whole
 * page, the browser's own scroll finishes first.
 *
 * Keyboard is deliberately not bound. Space and PageDown stay the browser's,
 * and the MENU pill is the keyboard path.
 */
export function ScrollToMenu() {
  useEffect(() => {
    let travel = 0
    let lastWheel = 0
    let touchY: number | null = null

    const atBottom = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      return scrollTop + clientHeight >= scrollHeight - 2
    }

    const request = () => {
      travel = 0
      window.dispatchEvent(new Event(OPEN_MENU_EVENT))
    }

    const onWheel = (event: WheelEvent) => {
      if (document.documentElement.dataset.menuOpen) return
      if (event.timeStamp - lastWheel > GESTURE_GAP_MS) travel = 0
      lastWheel = event.timeStamp
      if (event.deltaY <= 0 || !atBottom()) {
        travel = 0
        return
      }
      // deltaMode 1 is lines (Firefox with a mouse wheel); treat a line as 16px.
      travel += event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY
      if (travel >= WHEEL_THRESHOLD) request()
    }

    /*
     * The swipe has to *start* at the bottom. Checking only as it moves would
     * fire at the tail of the same swipe that scrolled a tall phone page down.
     */
    const onTouchStart = (event: TouchEvent) => {
      const single = event.touches.length === 1 && atBottom()
      touchY = single ? (event.touches[0]?.clientY ?? null) : null
    }

    const onTouchMove = (event: TouchEvent) => {
      if (touchY === null || document.documentElement.dataset.menuOpen) return
      const y = event.touches[0]?.clientY
      if (y === undefined) return
      // Finger moving up is the page moving down.
      if (touchY - y >= SWIPE_THRESHOLD) {
        touchY = null
        request()
      }
    }

    const onTouchEnd = () => {
      touchY = null
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return null
}
