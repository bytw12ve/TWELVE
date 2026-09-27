import type { CSSProperties } from 'react'

import { generateWorld, toLayers } from '@/lib/pixelWorld'

import styles from './BeforeTwelve.module.css'

type Chip = readonly [string, string]

/**
 * About's "Before twelve." band — docs/DESIGN.md §5.2. The site's own pixel
 * world (server-rendered, seed 402) with what Jaycee made growing up pinned
 * across it. A real list; each pin is placed from the table below, tilted a
 * little, and bobs gently (§7.5). Below 860px the pins fall into a wrapped
 * flow instead, so nothing overlaps on a phone.
 */

/** Pin centres as a share of the band, and a tilt. Tuned by eye, deterministic. */
const PINS = [
  { x: 62, y: 16, r: -3 },
  { x: 84, y: 32, r: 3 },
  { x: 16, y: 48, r: 2 },
  { x: 41, y: 40, r: -2 },
  { x: 66, y: 52, r: 4 },
  { x: 21, y: 76, r: -4 },
  { x: 47, y: 70, r: 3 },
  { x: 77, y: 80, r: -2 },
] as const

export function BeforeTwelve({
  title,
  line,
  listLabel,
  chips,
}: {
  title: string
  line: string
  listLabel: string
  chips: readonly Chip[]
}) {
  const world = generateWorld('about')
  const width = world.cols * world.cell
  const height = world.rows * world.cell
  const chip = ([plain, strong]: Chip) => (
    <>
      {plain} <b>{strong}</b>
    </>
  )
  return (
    <section className={styles.band} aria-labelledby="before-twelve">
      <svg
        className={styles.world}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        {toLayers(world.base, world.cell).map((layer) => (
          <path key={layer.fill} d={layer.d} fill={layer.fill} />
        ))}
        <g className={styles.clouds}>
          {toLayers(world.clouds, world.cell).map((layer) => (
            <path key={layer.fill} d={layer.d} fill={layer.fill} />
          ))}
        </g>
      </svg>
      <div className={styles.cap}>
        <h2 id="before-twelve" className={styles.title}>
          {title}
        </h2>
        <p className={styles.line}>{line}</p>
      </div>
      <ul className={styles.pins} aria-label={listLabel}>
        {chips.map((c, i) => {
          const pin = PINS[i % PINS.length] ?? PINS[0]
          return (
            <li
              key={c.join(' ')}
              className={styles.chip}
              style={
                {
                  '--x': `${pin.x}%`,
                  '--y': `${pin.y}%`,
                  '--tilt': `${pin.r}deg`,
                  '--i': i,
                } as CSSProperties
              }
            >
              {chip(c)}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
