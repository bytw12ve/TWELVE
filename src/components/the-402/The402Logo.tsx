import styles from './The402Logo.module.css'

/**
 * The 402's logo, drawn from the app's own vector shapes (the 402 design
 * package's logo files). "The 0 is a building" — the tower stands in for the
 * zero (docs/DESIGN.md §5.7).
 *
 * Colours come from the parent through --logo-letters and --logo-tower, so the
 * same mark sits on orange, cream or night.
 */

const T = 'M0 0 H88 V24 H56 V96 H32 V24 H0 Z'
const H = 'M0 0 H24 V36 H64 V0 H88 V96 H64 V60 H24 V96 H0 Z'
const E = 'M0 0 H74 V24 H24 V36 H68 V60 H24 V72 H74 V96 H0 Z'
const FOUR = 'M118 0 H164 V186 H196 V232 H164 V300 H118 V232 H0 V190 Z M118 87 V186 H56 Z'
export const TOWER = 'M74 0 H122 V62 H168 V130 H196 V300 H0 V130 H28 V62 H74 Z M46 96 H150 V254 H46 Z'
const TWO =
  'M4 92 C4 36 48 0 100 0 C152 0 196 34 196 88 C196 130 168 160 130 194 L62 254 H196 V300 H4 V258 L96 168 C128 138 148 116 148 86 C148 58 132 44 100 44 C68 44 50 60 50 92 Z'

type Props = {
  /** "full" is THE 402; "mark" is the 4-tower-2 alone. */
  variant?: 'full' | 'mark'
  /** How the tower moves: rises out of the 0 on load, pops when its section is seen, or stays. */
  motion?: 'rise' | 'pop' | 'none'
  className?: string
}

export function The402Logo({ variant = 'full', motion = 'none', className }: Props) {
  const full = variant === 'full'
  const towerClass = [styles.tower, motion === 'rise' && styles.rise, motion === 'pop' && styles.pop]
    .filter(Boolean)
    .join(' ')
  return (
    <svg
      className={[styles.logo, className].filter(Boolean).join(' ')}
      viewBox={full ? '0 0 994 300' : '0 0 656 300'}
      aria-hidden="true"
      focusable="false"
    >
      {full && (
        <g className={styles.letters} transform="translate(0 204)">
          <path d={T} />
          <path d={H} transform="translate(108 0)" />
          <path d={E} transform="translate(216 0)" />
        </g>
      )}
      <g transform={full ? 'translate(338 0)' : undefined} fillRule="evenodd">
        <path className={styles.letters} d={FOUR} />
        <g transform="translate(230 0)">
          <path className={towerClass} d={TOWER} />
        </g>
        <path className={styles.letters} d={TWO} transform="translate(460 0)" />
      </g>
    </svg>
  )
}

/** The tower on its own, as a silhouette. Decorative. */
export function Tower({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 196 300" aria-hidden="true" focusable="false">
      <path fill="currentColor" fillRule="evenodd" d={TOWER} />
    </svg>
  )
}
