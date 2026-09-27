import Link from 'next/link'

import { MetaLabel } from '@/components/ui/MetaLabel'
import { site } from '@/lib/site'

import { BrandDot } from './BrandDot'
import { HeroWordmark } from './HeroWordmark'
import styles from './HeroEnvironment.module.css'
import { PixelWorld } from './PixelWorld'
import { StarField } from './StarField'

/**
 * The homepage hero — docs/DESIGN.md §4.1, composition from
 * twelve-design/screens/HeroDesktop.png and HeroMobile.png.
 *
 * Four layers, back to front: star field, pixel window, brand dot, wordmark
 * and copy. Every coordinate is a custom property declared once in the
 * stylesheet, in proportion to the panel, so the layers cannot drift apart and
 * the whole composition scales from 1440 to 1024 without being re-authored
 * (§4.1, responsive rule).
 *
 * `data-hero` is what makes the nav transparent on this route — see
 * NavBar.module.css. It is server-rendered, so the nav is correct in the first
 * paint rather than after hydration.
 */
export function HeroEnvironment() {
  return (
    <section className={styles.environment} data-hero>
      <StarField />

      {/*
        §4.1: three peripheral labels on desktop. §2.1 reduces mobile to two —
        CREATIVE STUDIO under the nav and OMAHA, NE at the bottom edge — so the
        location splits out of the first label and reappears below.
      */}
      <div className={styles.metaTopLeft}>
        <MetaLabel size="sm">
          Creative studio<span className={styles.metaLocation}> — {site.location}</span>
        </MetaLabel>
      </div>
      <div className={styles.metaTopRight}>
        <MetaLabel size="sm">Est. 2026</MetaLabel>
      </div>
      <div className={styles.metaBottomLeft}>
        <MetaLabel size="sm">{site.location}</MetaLabel>
      </div>
      <div className={styles.window}>
        <MetaLabel size="sm" className={styles.windowTag}>
          World 01
        </MetaLabel>
        <div className={styles.worldDesktop}>
          <PixelWorld size="desktop" />
        </div>
        <div className={styles.worldMobile}>
          <PixelWorld size="mobile" />
        </div>
      </div>

      <BrandDot />
      <HeroWordmark />

      {/*
        One stack, not three coordinates. Spacing between the line, the
        descriptor and the CTA is a token, so giving the composition air is a
        gap value rather than a hunt through three magic numbers — and the
        relationship holds as the panel resizes (docs/DESIGN.md §4.1).
      */}
      <div className={styles.copy}>
        <p className={styles.line}>Creative studio for digital things worth making.</p>
        <MetaLabel className={styles.descriptor}>Apps · Websites · Games · Experiments</MetaLabel>

        {/*
          §4.0: VIEW WORK navigates directly to /work. It is a link, not the
          reveal's trigger and not a scroll target.
        */}
        <Link href="/work" className={styles.cta}>
          View work <span aria-hidden="true">↓</span>
        </Link>
      </div>
    </section>
  )
}
