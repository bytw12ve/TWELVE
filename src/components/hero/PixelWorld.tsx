import type { CSSProperties } from 'react'

import { generateWorld, toLayers, type WorldSize } from '@/lib/pixelWorld'

import styles from './PixelWorld.module.css'

/**
 * The pixel landscape — docs/DESIGN.md §4.1 layer 2.
 *
 * A server component: the generator is deterministic, so the art is built
 * during the render and ships as markup with no client JavaScript. Cells are
 * run-length merged and then collapsed to one path per colour — 1008 rects
 * become seven nodes — and the clouds are their own group so they can drift
 * over a complete sky, per docs/BUILD.md §Performance. It sits above the fold,
 * so its markup is on the critical path.
 *
 * Content, not decoration — it carries a real description (§8).
 */
export function PixelWorld({ size }: { size: WorldSize }) {
  const world = generateWorld(size)
  const width = world.cols * world.cell
  const height = world.rows * world.cell
  const base = toLayers(world.base, world.cell)
  const clouds = toLayers(world.clouds, world.cell)

  return (
    <svg
      className={styles.world}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
      role="img"
      aria-label="Pixel-art landscape: sky, clouds, a field of flowers and a small figure standing on the horizon"
    >
      {base.map((layer) => (
        <path key={layer.fill} d={layer.d} fill={layer.fill} />
      ))}

      {/* §7.4: clouds translate ~40px over 60s. Whole-pixel steps keep the
          art on its grid; alternating avoids a visible snap back. */}
      <g className={styles.clouds}>
        {clouds.map((layer) => (
          <path key={layer.fill} d={layer.d} fill={layer.fill} />
        ))}
      </g>

      <Walker world={world} />
    </svg>
  )
}

/*
 * The walker — docs/DESIGN.md §7.4. A small figure parked at the right of the
 * horizon that walks left when the window is hovered and walks home when the
 * pointer leaves. Drawn after the generated layers and outside the generator
 * entirely, so the world's rand() order is untouched (docs/BUILD.md).
 *
 * Half-cell pixels, so it reads as a figure in the landscape rather than a
 * block of it. Two leg frames swap while the window is hovered.
 */
const WALKER_BODY = ['.hh.', '.hh.', 'bbbb', '.bb.'] as const
const WALKER_FILL = { h: 'var(--paper-100)', b: 'var(--purple-700)' } as const
const WALKER_LEGS = { a: 'l..l', b: '.ll.' } as const

function spriteRects(
  rows: readonly string[],
  unit: number,
  top: number,
  fills: Readonly<Record<string, string>>,
) {
  return rows.flatMap((row, y) =>
    [...row].flatMap((c, x) => {
      const colour = fills[c]
      return colour
        ? [
            <rect
              key={`${x},${top + y}`}
              x={x * unit}
              y={(top + y) * unit}
              width={unit}
              height={unit}
              fill={colour}
            />,
          ]
        : []
    }),
  )
}

function Walker({ world }: { world: ReturnType<typeof generateWorld> }) {
  const unit = world.cell / 2
  const width = world.cols * world.cell
  const height = 5 * unit
  // Parked near the right edge, standing on the first ground row.
  const x = Math.round((width * 0.88) / unit) * unit
  const y = world.horizon * world.cell - height
  // Walk 46% of the world's width, in whole half-cells: one step per pixel.
  const steps = Math.round((width * 0.46) / unit)
  const legs = (frame: string) => spriteRects([frame], unit, 4, { l: 'var(--ink-900)' })

  return (
    <g transform={`translate(${x} ${y})`}>
      <g
        className={styles.walker}
        style={{ '--walk': `${-steps * unit}px`, '--walk-steps': steps } as CSSProperties}
      >
        {spriteRects(WALKER_BODY, unit, 0, WALKER_FILL)}
        <g className={styles.legsA}>{legs(WALKER_LEGS.a)}</g>
        <g className={styles.legsB}>{legs(WALKER_LEGS.b)}</g>
      </g>
    </g>
  )
}
