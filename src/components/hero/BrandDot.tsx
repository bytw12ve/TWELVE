import styles from './BrandDot.module.css'

/**
 * The brand dot and the knockout clipped to it — docs/DESIGN.md §4.1 layer 3.
 *
 * A purple-500 circle bleeding off the pixel window's left edge. The gradient
 * across it is tonal depth, not a second brand colour (§1.2), and no copy ever
 * sits inside it.
 *
 * **The dot and its knockout share one animated wrapper**, because §7.4 is
 * explicit: "The knockout is clipped to the dot, so animate a wrapper holding
 * both — never the two separately." Floating them independently would shear
 * the lettering by 6px against the circle it is knocked out of.
 */
export function BrandDot() {
  return (
    <div className={styles.group} aria-hidden="true" data-brand-dot>
      <div className={styles.dot} />
      <div className={styles.knockout}>
        <span className={styles.type}>twelve.</span>
      </div>
    </div>
  )
}
