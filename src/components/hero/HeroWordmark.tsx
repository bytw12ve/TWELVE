import styles from './HeroWordmark.module.css'

/**
 * `twelve.` in display-hero, and the two knockout layers — docs/DESIGN.md
 * §4.1.
 *
 * Three copies of the same word at the same coordinates: the base in
 * star-100, plus one in ink-900 clipped to the dot's circle and one clipped to
 * the pixel window. That is what gives 8.5:1 on the dot and 5.8–16:1 on the
 * landscape, where star-100 would read at 1.8:1.
 *
 * §4.1 warns that if the dot or window moves and its clip does not, the
 * lettering shears. Every layer is therefore positioned from the *same*
 * custom properties as the object it crosses — --window-x, --word-y and so on,
 * declared once in HeroEnvironment.module.css.
 *
 * The dot's knockout lives in BrandDot rather than here, because the dot
 * floats and §7.4 requires the circle and its knockout to animate as one
 * wrapper. This component owns the base layer and the window knockout.
 *
 * Both knockouts are aria-hidden: three copies of one word would otherwise be
 * announced three times (§8).
 */
export function HeroWordmark() {
  return (
    <>
      <h1 className={styles.wordmark}>
        twelve<i className={styles.period}>.</i>
      </h1>

      {/* Clipped to the pixel window's rounded rectangle. */}
      <div className={`${styles.knockout} ${styles.knockoutWindow}`} aria-hidden="true">
        <span className={styles.knockoutType}>twelve.</span>
      </div>
    </>
  )
}
