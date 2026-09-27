import styles from './StudioStamp.module.css'

/**
 * The `12.` mark — docs/DESIGN.md §6.1.
 *
 * Rules the spec sets and this component keeps: at most twice per page, rotate
 * only to 90°, never larger than 32px, never inside a button, never as a
 * bullet. It is decorative shorthand for the studio, so it is aria-hidden —
 * the wordmark and the footer already name Twelve in text.
 */
export function StudioStamp({
  rotated = false,
  surface = 'dark',
  className,
}: {
  rotated?: boolean
  surface?: 'dark' | 'paper'
  className?: string
}) {
  return (
    <span
      aria-hidden="true"
      className={[styles.stamp, styles[surface], rotated && styles.rotated, className]
        .filter(Boolean)
        .join(' ')}
    >
      12<i className={styles.period}>.</i>
    </span>
  )
}
