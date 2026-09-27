'use client'

import { useEffect, useState } from 'react'

const format = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Chicago',
  hour: 'numeric',
  minute: '2-digit',
})

/** "Omaha · 9:41 PM" — Omaha's local time, refreshed every 15 seconds. */
export function OmahaTime({ prefix }: { prefix: string }) {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const tick = () => setTime(format.format(new Date()))
    const frame = requestAnimationFrame(tick)
    const timer = window.setInterval(tick, 15_000)
    return () => {
      cancelAnimationFrame(frame)
      window.clearInterval(timer)
    }
  }, [])
  return <>{time ? `${prefix} · ${time}` : prefix}</>
}
