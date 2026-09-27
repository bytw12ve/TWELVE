'use client'

import { useEffect, useState } from 'react'

import styles from './Countdown.module.css'

const DAY = 86_400_000

function daysUntil(target: string, now: number) {
  return Math.max(0, Math.ceil((Date.parse(target) - now) / DAY))
}

/**
 * "Beta opens Oct 31 · N days" (docs/DESIGN.md §5.7). The page is static, so
 * the server renders the count as of the build; the client corrects it on
 * mount. It reads one constant, BETA_OPENS.
 */
export function Countdown({
  label,
  target,
  buildTime,
  units,
}: {
  label: string
  target: string
  buildTime: number
  units: { today: string; one: string; many: string }
}) {
  const [days, setDays] = useState(() => daysUntil(target, buildTime))

  useEffect(() => {
    const frame = requestAnimationFrame(() => setDays(daysUntil(target, Date.now())))
    return () => cancelAnimationFrame(frame)
  }, [target])

  return (
    <p className={styles.count}>
      <i className={styles.dot} aria-hidden="true" />
      {label} · <b className={styles.days}>
        {days === 0 ? units.today : `${days} ${days === 1 ? units.one : units.many}`}
      </b>
    </p>
  )
}
