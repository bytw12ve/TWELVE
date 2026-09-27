'use client'

import { useEffect, useRef } from 'react'

import { COMPOSITIONS, generateStars, type Composition, type Star } from '@/lib/starfield'
import { useReducedMotion } from '@/lib/useReducedMotion'

import styles from './StarField.module.css'

/**
 * The star field — docs/DESIGN.md §4.1 layer 1, motion from §7.4.
 *
 * Only the animated marks are on the canvas. The 24px dot grid never moves,
 * so it is a CSS background on the element behind this one — pixel-exact and
 * free, instead of repainted sixty times a second (docs/BUILD.md §Performance,
 * Stage 2 refinements).
 *
 * The field is generated in the composition's *reference* coordinate space and
 * mapped onto whatever size the canvas happens to be. Resizing therefore costs
 * nothing: the list is regenerated only when the composition itself changes at
 * 1024px, never per resize and never per frame.
 *
 * Decorative: aria-hidden, not focusable, no semantics (§8).
 */

/**
 * Four-point star, the reference path as a unit mark. Built inside the effect
 * rather than at module scope: this module is imported during the server
 * render, where Path2D does not exist.
 */
const STAR_PATH_DATA = 'M0,-1 Q.16,-.16 1,0 Q.16,.16 0,1 Q-.16,.16 -1,0 Q-.16,-.16 0,-1 Z'

/*
 * docs/DESIGN.md §7.4, as amended at the Stage 2 review. The restraint is in
 * the falloff and the asynchrony, not in the amplitude: the first build kept
 * every value so low that the field read as a static texture.
 */
const CURSOR_RADIUS = 180
const CURSOR_EASE_MS = 600
const CURSOR_BRIGHTEN = 1.0
const TWINKLE_FLOOR = 0.25
const TWINKLE_PEAK = 0.85
/** Smallest mark, so nothing lands sub-pixel and disappears. */
const MIN_MARK = 1.6
const STREAK_MIN_MS = 6_000
const STREAK_MAX_MS = 6_000
const STREAK_LIFE_MS = 1_800
/** Flares per star per second — a handful across the field each minute. */
const FLARE_CHANCE = 0.00004
const FLARE_LIFE_MS = 900

/*
 * The companion star (docs/DESIGN.md §7.4). One mark that follows the pointer
 * while it is over the field — part of the sky, not a cursor.
 */
const COMPANION_LAG_MS = 170
/** How far behind the pointer it rests, so it never sits on the cursor. */
const COMPANION_OFFSET = 26
const COMPANION_SIZE = 3.4
const COMPANION_TRAIL = 7
/** Fade in and out; one eased value, run in both directions. */
const COMPANION_FADE_MS = 420
/** Below this speed it is considered settled and rejoins the ambient twinkle. */
const COMPANION_STILL = 0.02

/*
 * The dot's lean (docs/DESIGN.md §7.4). The brand dot drifts a few pixels
 * toward the pointer, strongest when it is near, so the hero's main mark
 * answers the cursor the way the stars do. Driven from this loop rather than a
 * second listener: the pointer is already tracked here.
 */
const DOT_LEAN_MAX = 10
const DOT_LEAN_RADIUS = 560
const DOT_LEAN_EASE_MS = 420

type Streak = { star: Star; start: number; dx: number; dy: number } | null
type Flare = { index: number; start: number }

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const element = canvasRef.current
    if (!element) return
    const context = element.getContext('2d')
    if (!context) return
    // Narrowed once; every closure below captures these non-null locals rather
    // than re-reading the ref, which TypeScript cannot narrow across calls.
    const canvas = element
    const ctx = context
    const starPath = new Path2D(STAR_PATH_DATA)

    let composition: Composition | null = null
    let stars: Star[] = []
    let influence: Float32Array = new Float32Array(0)
    let frame = 0
    let running = false
    let visible = true
    let onScreen = true
    let streak: Streak = null
    let flares: Flare[] = []
    let nextStreakAt = performance.now() + STREAK_MIN_MS
    let lastFrame = performance.now()

    /*
     * The companion does not exist until the pointer first moves inside the
     * field: one that is already waiting when the page renders reads as UI,
     * one that appears because you moved reads as a response. `presence` eases
     * 0 → 1 on arrival and back to 0 when the pointer leaves, so it never
     * snaps in either direction.
     */
    const companion = {
      born: false,
      x: 0,
      y: 0,
      presence: 0,
      speed: 0,
      trail: [] as { x: number; y: number }[],
    }

    /*
     * Canvas geometry, read once per resize. docs/BUILD.md §Performance:
     * nothing in the frame loop may touch layout — the first build called
     * getBoundingClientRect() every frame.
     */
    const box = { width: 0, height: 0, scaleX: 1, scaleY: 1, scale: 1 }

    /*
     * The dot's centre in canvas coordinates, and the element the lean is
     * written to. offsetLeft/Top ignore transforms, so the float and the lean
     * itself never feed back into the measurement. Read on resize only.
     */
    const hero = canvas.closest<HTMLElement>('[data-hero]')
    const dotElement = hero?.querySelector<HTMLElement>('[data-brand-dot]') ?? null
    const dot = { x: 0, y: 0, leanX: 0, leanY: 0 }
    const pointer = { x: -9999, y: -9999, active: false }

    /*
     * Cursor response is for pointers that can hover, not for small screens:
     * a touchscreen laptop should keep it, and a phone has no cursor to
     * respond to (docs/DESIGN.md §7.4).
     */
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')

    /** Which composition the current width calls for (docs/DESIGN.md §4.1). */
    const compositionFor = () =>
      window.matchMedia('(min-width: 1024px)').matches ? 'desktop' : 'mobile'

    const ensureStars = () => {
      const next = compositionFor()
      if (next === composition) return
      composition = next
      stars = generateStars(next)
      influence = new Float32Array(stars.length)
      flares = []
    }

    const measure = (rect: DOMRectReadOnly | DOMRect) => {
      if (rect.width === 0 || rect.height === 0) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ensureStars()
      const reference = COMPOSITIONS[composition ?? 'desktop']
      box.width = rect.width
      box.height = rect.height
      box.scaleX = rect.width / reference.width
      box.scaleY = rect.height / reference.height
      box.scale = Math.min(box.scaleX, box.scaleY)
      if (dotElement) {
        dot.x = dotElement.offsetLeft + dotElement.offsetWidth / 2
        dot.y = dotElement.offsetTop + dotElement.offsetHeight / 2
      }
      if (!running) draw(performance.now())
    }

    function draw(now: number) {
      if (!composition) return
      const elapsed = Math.min(now - lastFrame, 50)
      lastFrame = now

      ctx.clearRect(0, 0, box.width, box.height)

      if (!reducedMotion) {
        // One streak at a time (§7.4), now often enough to be seen.
        if (!streak && now >= nextStreakAt && stars.length > 0) {
          const pick = stars[Math.floor(Math.random() * stars.length)]
          if (pick) streak = { star: pick, start: now, dx: 60 + Math.random() * 60, dy: 16 }
        }
        // A handful of flares a minute, never many at once.
        if (flares.length < 3 && Math.random() < FLARE_CHANCE * elapsed * stars.length) {
          flares.push({ index: Math.floor(Math.random() * stars.length), start: now })
        }
        flares = flares.filter((f) => now - f.start < FLARE_LIFE_MS)
      }

      // Time-based easing: a fixed per-frame factor would run at double speed
      // on a 120Hz display (docs/BUILD.md §Performance).
      const ease = reducedMotion ? 1 : 1 - Math.exp(-elapsed / (CURSOR_EASE_MS / 3))

      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i]
        if (!star) continue

        let x = star.x * box.scaleX
        let y = star.y * box.scaleY
        let alpha = star.opacity
        let mark = Math.max(MIN_MARK, star.size * box.scale)

        if (!reducedMotion) {
          // Twinkle: every star, depth varying, phases never synchronised.
          const t = ((now + star.phase) % star.period) / star.period
          const wave = (Math.sin(t * Math.PI * 2) + 1) / 2
          const low = TWINKLE_FLOOR + (1 - star.depth) * (star.opacity - TWINKLE_FLOOR)
          alpha = low + wave * (TWINKLE_PEAK - low)

          if (pointer.active) {
            const dx = x - pointer.x
            const dy = y - pointer.y
            const distance = Math.hypot(dx, dy)
            const target = distance < CURSOR_RADIUS ? 1 - distance / CURSOR_RADIUS : 0
            // Eased in and out, so the field settles rather than snapping.
            const current = influence[i] ?? 0
            const eased = current + (target - current) * ease
            influence[i] = eased
            if (eased > 0.002) {
              const falloff = eased * eased
              const away = distance === 0 ? 0 : falloff / distance
              x += dx * away * star.driftX
              y += dy * away * star.driftY
              alpha = Math.min(1, alpha * (1 + CURSOR_BRIGHTEN * falloff))
              mark *= 1 + 0.35 * falloff
            }
          } else if ((influence[i] ?? 0) > 0.002) {
            influence[i] = (influence[i] ?? 0) * (1 - ease)
          }
        }

        if (streak && streak.star === star) {
          const t = Math.min(1, (now - streak.start) / STREAK_LIFE_MS)
          const trailX = streak.dx * t
          const trailY = streak.dy * t
          // A short trail behind it, so the movement registers.
          ctx.globalAlpha = (1 - t) * 0.5 * alpha
          ctx.strokeStyle = '#fff'
          ctx.lineWidth = Math.max(1, mark * 0.4)
          ctx.beginPath()
          ctx.moveTo(x + trailX * 0.6, y + trailY * 0.6)
          ctx.lineTo(x + trailX, y + trailY)
          ctx.stroke()
          x += trailX
          y += trailY
          alpha *= 1 - t
          if (t >= 1) {
            streak = null
            nextStreakAt = now + STREAK_MIN_MS + Math.random() * (STREAK_MAX_MS - STREAK_MIN_MS)
          }
        }

        const flare = flares.find((f) => f.index === i)
        if (flare) {
          const t = (now - flare.start) / FLARE_LIFE_MS
          const pulse = Math.sin(t * Math.PI)
          alpha = Math.min(1, alpha + pulse * 0.9)
          mark *= 1 + pulse * 0.8
        }

        if (star.glow || flare) {
          const radius = mark * (flare ? 5 : 3.4)
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
          gradient.addColorStop(0, `rgba(255,255,255,${flare ? 0.5 : 0.34})`)
          gradient.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.globalAlpha = 1
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.save()
        ctx.translate(x, y)
        ctx.scale(mark, mark)
        ctx.globalAlpha = alpha
        ctx.fillStyle = '#fff'
        ctx.fill(starPath)
        ctx.restore()
      }

      drawCompanion(now, elapsed, ease)
      ctx.globalAlpha = 1
      leanDot(elapsed)
    }

    /**
     * docs/DESIGN.md §7.4 — the dot leans toward the pointer and eases home
     * when it leaves. Writes two custom properties; BrandDot.module.css moves
     * the dot by them and runs the exact inverse on its knockout lettering, so
     * the type never shears against the wordmark.
     */
    function leanDot(elapsed: number) {
      if (!hero || reducedMotion || !finePointer.matches) return
      let targetX = 0
      let targetY = 0
      if (pointer.active) {
        const dx = pointer.x - dot.x
        const dy = pointer.y - dot.y
        const distance = Math.hypot(dx, dy)
        if (distance > 0 && distance < DOT_LEAN_RADIUS) {
          const pull = DOT_LEAN_MAX * (1 - distance / DOT_LEAN_RADIUS) ** 1.5
          // Scaled by distance up to 80px so the dot does not jump when the
          // pointer crosses its centre.
          const reach = Math.min(1, distance / 80)
          targetX = (dx / distance) * pull * reach
          targetY = (dy / distance) * pull * reach
        }
      }
      const follow = 1 - Math.exp(-elapsed / (DOT_LEAN_EASE_MS / 3))
      const nextX = dot.leanX + (targetX - dot.leanX) * follow
      const nextY = dot.leanY + (targetY - dot.leanY) * follow
      // Skip the style write once settled, so an idle page does no work here.
      if (Math.abs(nextX - dot.leanX) < 0.01 && Math.abs(nextY - dot.leanY) < 0.01) return
      dot.leanX = nextX
      dot.leanY = nextY
      hero.style.setProperty('--dot-lean-x', `${nextX.toFixed(2)}px`)
      hero.style.setProperty('--dot-lean-y', `${nextY.toFixed(2)}px`)
    }

    /**
     * docs/DESIGN.md §7.4 — the companion star.
     *
     * Trails the pointer on an eased lag, rests a short distance *behind* the
     * direction of travel so it never sits under the cursor, and when movement
     * stops it settles and twinkles like any other star. Drawn last so it sits
     * over the field, but with the same mark, the same white and the same halo
     * the other stars use — it should read as one of them, not as an overlay.
     */
    function drawCompanion(now: number, elapsed: number, ease: number) {
      if (reducedMotion || !finePointer.matches) return

      const wanted = pointer.active ? 1 : 0
      if (pointer.active && !companion.born) {
        // Arrive at the pointer's offset rather than flying in from a corner.
        companion.born = true
        companion.x = pointer.x
        companion.y = pointer.y
        companion.trail.length = 0
      }
      if (!companion.born) return

      const fade = 1 - Math.exp(-elapsed / (COMPANION_FADE_MS / 3))
      companion.presence += (wanted - companion.presence) * fade
      if (companion.presence < 0.004 && wanted === 0) {
        companion.born = false
        companion.presence = 0
        companion.trail.length = 0
        return
      }

      if (pointer.active) {
        // Rest behind the direction of travel, so the mark sits beside the
        // pointer rather than under it — even once movement stops.
        const dx = pointer.x - companion.x
        const dy = pointer.y - companion.y
        const distance = Math.hypot(dx, dy)
        const offset = Math.min(COMPANION_OFFSET, distance)
        const targetX = distance === 0 ? companion.x : pointer.x - (dx / distance) * offset
        const targetY = distance === 0 ? companion.y : pointer.y - (dy / distance) * offset
        const follow = 1 - Math.exp(-elapsed / COMPANION_LAG_MS)
        const nx = companion.x + (targetX - companion.x) * follow
        const ny = companion.y + (targetY - companion.y) * follow
        companion.speed = Math.hypot(nx - companion.x, ny - companion.y) / Math.max(elapsed, 1)
        companion.x = nx
        companion.y = ny
      } else {
        // Left behind: hold position and let presence carry it out.
        companion.speed += (0 - companion.speed) * ease
      }

      companion.trail.push({ x: companion.x, y: companion.y })
      if (companion.trail.length > COMPANION_TRAIL) companion.trail.shift()

      // Settled: rejoin the field's own rhythm rather than sitting flat.
      const stillness = 1 - Math.min(1, companion.speed / COMPANION_STILL)
      const twinkle = (Math.sin(now / 1400) + 1) / 2
      const alpha = companion.presence * (0.72 + stillness * twinkle * 0.28)
      const mark = COMPANION_SIZE * box.scale * (0.9 + companion.presence * 0.1)

      // A short, faint trail — enough to read as movement, not a comet.
      if (companion.trail.length > 1) {
        ctx.globalAlpha = alpha * 0.28
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = Math.max(1, mark * 0.35)
        ctx.lineCap = 'round'
        ctx.beginPath()
        const first = companion.trail[0]
        if (first) ctx.moveTo(first.x, first.y)
        for (const point of companion.trail) ctx.lineTo(point.x, point.y)
        ctx.stroke()
      }

      // The same restrained halo the glowing stars carry.
      const radius = mark * 3.6
      const glow = ctx.createRadialGradient(
        companion.x,
        companion.y,
        0,
        companion.x,
        companion.y,
        radius,
      )
      glow.addColorStop(0, `rgba(255,255,255,${0.32 * companion.presence})`)
      glow.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.globalAlpha = 1
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(companion.x, companion.y, radius, 0, Math.PI * 2)
      ctx.fill()

      ctx.save()
      ctx.translate(companion.x, companion.y)
      ctx.scale(mark, mark)
      ctx.globalAlpha = alpha
      ctx.fillStyle = '#fff'
      ctx.fill(starPath)
      ctx.restore()
    }

    const loop = (now: number) => {
      draw(now)
      frame = requestAnimationFrame(loop)
    }

    const start = () => {
      if (running || reducedMotion || !visible || !onScreen) return
      running = true
      frame = requestAnimationFrame(loop)
    }

    const stop = () => {
      if (!running) return
      running = false
      cancelAnimationFrame(frame)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches) return
      /*
       * This rect read is in the pointer handler, not the frame loop: the
       * hero is sticky, so its viewport position changes as the page scrolls
       * and a cached offset would send the effect to the wrong place. Pointer
       * moves are bursty and user-driven; the loop itself stays layout-free
       * (docs/BUILD.md §Performance).
       */
      const rect = canvas.getBoundingClientRect()
      pointer.x = event.clientX - rect.left
      pointer.y = event.clientY - rect.top
      pointer.active = true
    }
    const onPointerLeave = () => {
      pointer.active = false
    }

    // Pause when the tab is hidden and when the hero scrolls away.
    const onVisibility = () => {
      visible = document.visibilityState === 'visible'
      if (visible) start()
      else stop()
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry?.isIntersecting ?? true
        if (onScreen) start()
        else stop()
      },
      { threshold: 0 },
    )

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) measure(entry.contentRect)
    })
    resizeObserver.observe(canvas)
    observer.observe(canvas)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave, { passive: true })

    measure(canvas.getBoundingClientRect())
    // Reduced motion draws a single frame and never starts a loop.
    if (reducedMotion) draw(performance.now())
    else start()

    return () => {
      stop()
      resizeObserver.disconnect()
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [reducedMotion])

  return (
    <div className={styles.field} aria-hidden="true">
      <div className={styles.grid} />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}
