/**
 * The star field's deterministic generator.
 *
 * Ported verbatim from references/previews/HeroDesktop.html, which
 * docs/BUILD.md §Performance names as the reference implementation. The
 * sequence of rand() calls is the algorithm: change the order and the field
 * changes, so the branches below keep the original's exact call pattern,
 * including the early `continue` that consumes three numbers and no more.
 */

/** Linear congruential generator — the same constants as the reference. */
export function rng(seed: number): () => number {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

export type Star = {
  /** Position in reference space, not canvas pixels. */
  x: number
  y: number
  /** Scale of the four-point mark. */
  size: number
  /** Resting opacity. */
  opacity: number
  /** A few marks carry a soft halo (5% in the reference). */
  glow: boolean
  /** Twinkle cycle length and offset — see generateStars. */
  period: number
  phase: number
  /** How deep this star's twinkle runs, 0–1. */
  depth: number
  /** Drift direction under the pointer, in reference units. */
  driftX: number
  driftY: number
}

/**
 * The composition's reference dimensions and density. These are the
 * generator's coordinate space: the field is generated once per composition
 * and mapped onto whatever size the canvas happens to be, so resizing never
 * needs a regeneration (docs/BUILD.md §Performance, Stage 2 refinements).
 */
export const COMPOSITIONS = {
  desktop: { width: 1376, height: 776, seed: 12, tries: 900 },
  mobile: { width: 394, height: 844, seed: 12, tries: 520 },
} as const

export type Composition = keyof typeof COMPOSITIONS

export function generateStars(composition: Composition): Star[] {
  const { width, height, seed, tries } = COMPOSITIONS[composition]
  const rand = rng(seed)
  const stars: Star[] = []

  const cx = width / 2
  const cy = height / 2
  const maxd = Math.sqrt(cx * cx + cy * cy)

  for (let i = 0; i < tries; i += 1) {
    const x = rand() * width
    const y = rand() * height
    const d = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)) / maxd

    // Sparse through the centre where the type lands, denser toward the
    // corners (docs/DESIGN.md §4.1).
    if (rand() > 0.1 + d * 0.62) continue

    const size = 1.1 + rand() * 2.0
    const opacity = 0.32 + rand() * 0.46
    const glow = rand() < 0.05

    stars.push({
      x,
      y,
      size,
      opacity,
      glow,
      period: 0,
      phase: 0,
      depth: 0,
      driftX: 0,
      driftY: 0,
    })
  }

  /*
   * Animation parameters come from a second stream so they cannot disturb the
   * positions above.
   *
   * docs/DESIGN.md §7.4, as amended at the Stage 2 review: the whole field
   * twinkles, not a bright minority. The first build animated 41% of a field
   * whose median mark is 2px and read as static texture. Depth varies per
   * star — most shallow, a few deep — so the field shimmers asynchronously
   * instead of pulsing together.
   */
  const animRand = rng(seed + 1)
  for (const star of stars) {
    star.period = 2600 + animRand() * 4400
    star.phase = animRand() * star.period
    // Most shallow, a minority deep: cubed skews the distribution low.
    star.depth = 0.28 + Math.pow(animRand(), 3) * 0.72
    star.driftX = 6 + animRand() * 4
    star.driftY = 6 + animRand() * 4
  }

  return stars
}
