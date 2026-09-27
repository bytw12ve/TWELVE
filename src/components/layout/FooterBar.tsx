import { StudioStamp } from '@/components/ui/StudioStamp'
import { site } from '@/lib/site'

import styles from './FooterBar.module.css'

/**
 * The footer bar — docs/DESIGN.md §4 part 3 and §2.2. Three columns:
 *
 *   TWELVE — OMAHA, NE        <the studio email>                      12.
 *   © 2026
 *
 * The copyright belongs to the studio block, not to the stamp: it sits
 * directly beneath the studio line and travels with it at every width. The
 * stamp stands alone at the right edge as the studio signature, on the same x
 * as the stamp in the open menu, so it does not move when the menu opens.
 *
 * The year is computed at build time. Every route is statically rendered
 * (docs/BUILD.md §Framework), so this is the year of the last deploy — which
 * "confirm copyright year" in the launch checklist covers.
 */
export function FooterBar() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.studio}>
        <span>
          {site.name.toUpperCase()} — {site.location.toUpperCase()}
        </span>
        <span className={styles.year}>© {year}</span>
      </div>
      <a className={styles.email} href={`mailto:${site.email}`}>
        {site.email}
      </a>
      <StudioStamp className={styles.stamp} />
    </footer>
  )
}
