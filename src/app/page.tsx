import type { Metadata } from 'next'

import { HeroEnvironment } from '@/components/hero/HeroEnvironment'
import { ScrollToMenu } from '@/components/hero/ScrollToMenu'
import { site } from '@/lib/site'

import styles from './page.module.css'

export const metadata: Metadata = {
  // The homepage keeps the untemplated title — docs/BUILD.md §SEO.
  title: site.title,
}

/**
 * The homepage — docs/DESIGN.md §4: the hero, then the footer, in one screen.
 *
 * There is no route section and no scroll behaviour. A panel of four
 * destinations lived beneath the hero through four rebuilds — a full-height
 * index, four bordered cells, a line of type, four columns — and each one had
 * the same problem: MENU already reaches every route from every page, so the
 * section either repeated it or competed with it. It was removed rather than
 * tuned a fifth time.
 *
 * The page is one screen, so it has no scroll-driven *layout*: no observer,
 * no pin, no reveal. The one scroll listener is ScrollToMenu, which turns a
 * downward scroll with nowhere to go into opening MENU (§4.0). The other client
 * code is the star field.
 */
export default function HomePage() {
  return (
    <div className={styles.heroFrame}>
      <HeroEnvironment />
      <ScrollToMenu />
    </div>
  )
}
