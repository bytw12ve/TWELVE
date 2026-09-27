'use client'

import { useEffect, useRef, useState } from 'react'

import { useReducedMotion } from '@/lib/useReducedMotion'

import styles from './PlaygroundCard.module.css'
import { useInView } from './useInView'

const KEYS = 43
const SPACE = 40

/** keeb.wiki — a keyboard that presses its own keys. */
export function KeyboardVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const active = useInView(ref)
  const reduced = useReducedMotion()
  const [down, setDown] = useState<number | null>(null)

  useEffect(() => {
    if (!active || reduced) return
    let release: number | undefined
    const press = window.setInterval(() => {
      setDown(Math.floor(Math.random() * KEYS))
      window.clearTimeout(release)
      release = window.setTimeout(() => setDown(null), 260)
    }, 180)
    return () => {
      window.clearInterval(press)
      window.clearTimeout(release)
    }
  }, [active, reduced])

  return (
    <div ref={ref} className={styles.keys}>
      <div className={styles.kb}>
        {Array.from({ length: KEYS }, (_, i) => (
          <i key={i} className={[i === SPACE && styles.space, i === down && styles.down].filter(Boolean).join(' ')} />
        ))}
      </div>
    </div>
  )
}

/** The untitled game — drifting pixel stars behind a loading bar. */
export function GameVisual({ loading }: { loading: string }) {
  const box = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const active = useInView(box)
  const reduced = useReducedMotion()

  useEffect(() => {
    const cv = canvas.current
    const ctx = cv?.getContext('2d')
    if (!cv || !ctx) return
    const W = 120
    const H = 70
    cv.width = W
    cv.height = H
    // Seeded, so the field is the same on every visit.
    let seed = 12
    const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296)
    const stars = Array.from({ length: 40 }, () => ({ x: rand() * W, y: rand() * H, v: 0.2 + rand() * 0.6 }))
    const styles = getComputedStyle(cv)
    const ground = styles.getPropertyValue('--void-900').trim()
    const bright = styles.getPropertyValue('--purple-400').trim()
    const dim = styles.getPropertyValue('--star-700').trim()
    let frame = 0
    const draw = () => {
      ctx.fillStyle = ground
      ctx.fillRect(0, 0, W, H)
      for (const s of stars) {
        if (active && !reduced) {
          s.x -= s.v
          if (s.x < 0) s.x = W
        }
        ctx.fillStyle = s.v > 0.6 ? bright : dim
        ctx.fillRect(s.x | 0, s.y | 0, 1, 1)
      }
      if (active && !reduced) frame = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(frame)
  }, [active, reduced])

  return (
    <div ref={box} className={styles.game}>
      <canvas ref={canvas} aria-hidden="true" />
      <div className={styles.loading}>
        <b>
          {loading}
          <span className={styles.blink}>_</span>
        </b>
        <div className={styles.bar}>
          <i />
        </div>
      </div>
    </div>
  )
}

/** This website — stars that flee the cursor, the purple dot, the 12. */
export function SiteVisual({ hint }: { hint: string }) {
  const box = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const active = useInView(box)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = box.current
    const cv = canvas.current
    const ctx = cv?.getContext('2d')
    if (!el || !cv || !ctx) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let W = 0
    let H = 0
    const resize = () => {
      W = cv.width = el.clientWidth * dpr
      H = cv.height = el.clientHeight * dpr
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)
    let seed = 1212
    const rand = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296)
    const stars = Array.from({ length: 140 }, () => ({ x: rand(), y: rand(), r: rand() * 1.4 + 0.4, t: rand() * 6 }))
    let mouse = { x: -999, y: -999 }
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      mouse = { x: (e.clientX - r.left) * dpr, y: (e.clientY - r.top) * dpr }
    }
    const leave = () => (mouse = { x: -999, y: -999 })
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    const starColour = getComputedStyle(cv).getPropertyValue('--star-100').trim()
    let frame = 0
    const draw = (t: number) => {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = starColour
      const R = 120 * dpr
      for (const s of stars) {
        let px = s.x * W
        let py = s.y * H
        const dx = px - mouse.x
        const dy = py - mouse.y
        const d = Math.hypot(dx, dy)
        const near = d < R && !reduced
        if (near) {
          const k = (1 - d / R) * 28 * dpr
          px += (dx / d) * k
          py += (dy / d) * k
        }
        const a = reduced ? 0.8 : 0.45 + 0.55 * Math.abs(Math.sin(t / 900 + s.t))
        ctx.globalAlpha = a
        ctx.beginPath()
        ctx.arc(px, py, s.r * dpr * (near ? 1.6 : 1), 0, 7)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      if (active && !reduced) frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [active, reduced])

  return (
    <div ref={box} className={styles.site}>
      <canvas ref={canvas} aria-hidden="true" />
      <span className={styles.siteDot} aria-hidden="true" />
      <span className={styles.siteMark} aria-hidden="true">
        12<i>.</i>
      </span>
      <span className={styles.siteHint}>{hint}</span>
    </div>
  )
}
