'use client'

import { useSyncExternalStore } from 'react'

import { site } from '@/lib/site'

import styles from './MenuOverlay.module.css'

/**
 * The studio's local time in the menu footer (docs/DESIGN.md §6.2).
 *
 * useSyncExternalStore with a null server snapshot is the hydration-safe way
 * to render something the server cannot know: the server emits nothing, the
 * client fills it after mount, and React never compares two different clocks.
 *
 * The slot reserves its full box beforehand — min-width from the widest time
 * string and min-height from the line box (MenuOverlay.module.css .time) — so
 * the value appearing cannot shift the footer. Tabular figures hold the width
 * as digits change.
 */
/** "OMAHA 1:30:02 PM", matching references/previews/MenuDesktop.html. */
const formatter = () =>
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'America/Chicago',
  }).format(new Date())

let cached: string | null = null

function subscribe(onChange: () => void) {
  cached = formatter()
  /*
   * One second, because the reference shows seconds. Only while the menu is
   * open: LocalTime unmounts with the overlay, so nothing ticks behind a
   * closed menu.
   */
  const id = window.setInterval(() => {
    const next = formatter()
    if (next !== cached) {
      cached = next
      onChange()
    }
  }, 1_000)
  return () => window.clearInterval(id)
}

const getSnapshot = () => (cached ??= formatter())
const getServerSnapshot = () => null

export function LocalTime() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const city = site.location.split(',')[0]?.toUpperCase() ?? ''

  return (
    <span className={styles.time}>
      <span aria-hidden={time === null}>{time ? `${city} ${time}` : ''}</span>
    </span>
  )
}
