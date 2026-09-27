/**
 * The pixel landscape's deterministic generator.
 *
 * Ported verbatim from references/previews/HeroDesktop.html. As with the star
 * field, the order of rand() calls is the algorithm — note that sky cells draw
 * one number per cloud, the two rows just below the horizon draw none at all,
 * and the flower test short-circuits. Those are preserved exactly, or the
 * landscape is a different landscape.
 *
 * Two departures from the reference, both recorded in docs/BUILD.md
 * §Performance:
 *
 * 1. Cells are emitted as horizontal runs rather than one rect per cell. A
 *    42×24 grid is 1008 nodes of above-the-fold markup otherwise.
 * 2. Clouds come back as their own layer over a complete sky, because the
 *    reference bakes them into the same grid and docs/DESIGN.md §7.4 needs
 *    them to drift as one group. Cells painted into a grid cannot be moved.
 */
import { rng } from './starfield'

export type Run = { x: number; y: number; width: number; fill: string }

export type World = {
  cols: number
  rows: number
  cell: number
  /** The first ground row. Read-only output: nothing here changes the draws. */
  horizon: number
  /** Sky, ground and flowers — everything except the clouds. */
  base: Run[]
  /** The cloud cells alone, so they can drift over the sky beneath them. */
  clouds: Run[]
}

/** One path per colour: every run of that colour as a subpath. */
export type Layer = { fill: string; d: string }

/**
 * Collapse runs into one path per colour.
 *
 * The art is above the fold, so its markup is on the critical path. Runs cut
 * 1008 rects to ~200; pathing them by colour cuts those to seven nodes and
 * roughly two thirds of the bytes, with identical pixels. The overlap is kept
 * so no seam shows between neighbours.
 */
export function toLayers(runs: Run[], cell: number, bleed = 0.6): Layer[] {
  const byFill = new Map<string, string[]>()
  for (const run of runs) {
    const w = run.width + bleed
    const h = cell + bleed
    const segment = `M${run.x} ${run.y}h${w}v${h}h-${w}z`
    const existing = byFill.get(run.fill)
    if (existing) existing.push(segment)
    else byFill.set(run.fill, [segment])
  }
  return [...byFill].map(([fill, segments]) => ({ fill, d: segments.join('') }))
}

export const WORLDS = {
  desktop: { cols: 42, rows: 24, cell: 16, seed: 1212 },
  mobile: { cols: 30, rows: 18, cell: 12, seed: 1212 },
  /** About's "Before twelve." band (docs/DESIGN.md §5.2): a wide strip, its own seed. */
  about: { cols: 96, rows: 28, cell: 12, seed: 402 },
} as const

export type WorldSize = keyof typeof WORLDS

const SKY_HIGH = 'var(--sky-400)'
const SKY_LOW = 'var(--sky-300)'
const CLOUD = 'var(--cloud-100)'
const GRASS_LIGHT = 'var(--grass-400)'
const GRASS_DARK = 'var(--grass-600)'
const BLOOM_PINK = 'var(--bloom-300)'
const BLOOM_GOLD = 'var(--bloom-500)'

/** Merge same-colour neighbours in a row into one rect. */
function toRuns(cells: (string | null)[], y: number, cell: number): Run[] {
  const runs: Run[] = []
  let start = 0
  while (start < cells.length) {
    const fill = cells[start]
    if (fill === null || fill === undefined) {
      start += 1
      continue
    }
    let end = start + 1
    while (end < cells.length && cells[end] === fill) end += 1
    runs.push({ x: start * cell, y: y * cell, width: (end - start) * cell, fill })
    start = end
  }
  return runs
}

export function generateWorld(size: WorldSize): World {
  const { cols, rows, cell, seed } = WORLDS[size]
  const rand = rng(seed)

  const horizon = Math.round(rows * 0.58)
  const clouds = [
    { x: cols * 0.17, y: rows * 0.21, rx: cols * 0.16, ry: rows * 0.085 },
    { x: cols * 0.52, y: rows * 0.12, rx: cols * 0.12, ry: rows * 0.065 },
    { x: cols * 0.84, y: rows * 0.27, rx: cols * 0.14, ry: rows * 0.075 },
  ]

  const base: Run[] = []
  const cloudRuns: Run[] = []

  for (let y = 0; y < rows; y += 1) {
    const baseRow: (string | null)[] = []
    const cloudRow: (string | null)[] = []

    for (let x = 0; x < cols; x += 1) {
      if (y < horizon) {
        const sky = y < rows * 0.16 ? SKY_HIGH : SKY_LOW
        let clouded = false
        // One random per cloud per cell, in order — same as the reference.
        for (const c of clouds) {
          const dx = (x - c.x) / c.rx
          const dy = (y - c.y) / c.ry
          if (dx * dx + dy * dy < 1 - rand() * 0.18) clouded = true
        }
        baseRow.push(sky)
        cloudRow.push(clouded ? CLOUD : null)
        continue
      }

      const d = (y - horizon) / (rows - horizon)
      let fill: string
      if (y < horizon + 2) {
        // No random draw on these two rows in the reference.
        fill = GRASS_LIGHT
      } else {
        fill = rand() < 0.18 + d * 0.55 ? GRASS_DARK : GRASS_LIGHT
      }
      // Short-circuits: below horizon + 1 only, exactly as the reference.
      if (y > horizon + 1 && rand() < 0.015 + d * 0.11) {
        fill = rand() < 0.6 ? BLOOM_PINK : BLOOM_GOLD
      }
      baseRow.push(fill)
      cloudRow.push(null)
    }

    base.push(...toRuns(baseRow, y, cell))
    cloudRuns.push(...toRuns(cloudRow, y, cell))
  }

  return { cols, rows, cell, horizon, base, clouds: cloudRuns }
}
