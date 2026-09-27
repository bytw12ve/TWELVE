import type { CSSProperties } from 'react'

import { generateWorld, toLayers } from '@/lib/pixelWorld'

import styles from './BeforeTwelve.module.css'

type Chip = readonly [string, string]

/**
 * About's "Before twelve." band — docs/DESIGN.md §5.2. The site's own pixel
 * world (server-rendered, seed 402) with what Jaycee made growing up pinned
 * across it; her favorite is drawn a little larger and labelled. A real list; each pin is placed from the table below, tilted a
 * little, and bobs gently (§7.5). Below 1024px the pins fall into a wrapped
 * flow instead, so nothing overlaps on a phone.
 */

/** Pin centres as a share of the band, and a tilt. Tuned by eye, deterministic. */
const PINS = [
  { x: 62, y: 14, r: -3 },
  { x: 85, y: 30, r: 3 },
  { x: 15, y: 48, r: 2 },
  { x: 40, y: 38, r: -2 },
  { x: 64, y: 50, r: -2 },
  { x: 87, y: 66, r: 4 },
  { x: 17, y: 78, r: -4 },
  { x: 42, y: 70, r: 3 },
  { x: 70, y: 85, r: -2 },
] as const

export function BeforeTwelve({
  title,
  line,
  listLabel,
  chips,
  favorite,
  favoriteLabel,
}: {
  title: string
  line: string
  listLabel: string
  favorite: string
  favoriteLabel: string
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
          const isFavorite = c.join(' ') === favorite
          return (
            <li
              key={c.join(' ')}
              className={[styles.chip, isFavorite && styles.favorite].filter(Boolean).join(' ')}
              style={
                {
                  '--x': `${pin.x}%`,
                  '--y': `${pin.y}%`,
                  '--tilt': `${pin.r}deg`,
                  '--i': i,
                } as CSSProperties
              }
            >
              {isFavorite && <span className={styles.favoriteLabel}>{favoriteLabel}</span>}
              {chip(c)}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
