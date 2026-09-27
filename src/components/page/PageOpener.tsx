import { Fragment, type ReactNode } from 'react'

import { MetaLabel } from '@/components/ui/MetaLabel'
import { StudioStamp } from '@/components/ui/StudioStamp'
import type { PageOpener as Opener } from '@/types/content'

import styles from './PageOpener.module.css'

/**
 * The inner pages' opener — docs/DESIGN.md §3.1. The 12. mark and an
 * eyebrow; the page name as a slab ending in a purple period (a disc, not a
 * glyph); one lead; two labels. The words rise out of their line and the
 * period drops in (§7.5) — CSS only, and none of it under reduced motion.
 */
export function PageOpener({ opener, labels }: { opener: Opener; labels: readonly ReactNode[] }) {
  const words = opener.title.split(' ')
  return (
    <header className={styles.opener}>
      <div className={styles.kick}>
        <StudioStamp className={styles.stamp} />
        <MetaLabel>{opener.eyebrow}</MetaLabel>
      </div>
      <h1 className={styles.title}>
        {words.map((word, i) => (
          <Fragment key={i}>
            {i > 0 && ' '}
            <span className={styles.word}>
              <span style={{ animationDelay: `${i * 80}ms` }}>{word}</span>
            </span>
          </Fragment>
        ))}
        <span className={styles.period} aria-hidden="true" />
      </h1>
      <p className={styles.lede}>{opener.lede}</p>
      <div className={styles.side}>
        {labels.map((label, i) => (
          <MetaLabel key={i}>{label}</MetaLabel>
        ))}
      </div>
    </header>
  )
}
