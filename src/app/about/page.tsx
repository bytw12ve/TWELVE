import type { Metadata } from 'next'
import Link from 'next/link'

import { aboutPage as page } from '@content/pages/about'
import { BeforeTwelve } from '@/components/about/BeforeTwelve'
import { Page, Wrap } from '@/components/page/Page'
import { PageOpener } from '@/components/page/PageOpener'
import { Reveal } from '@/components/page/Reveal'
import { MetaLabel } from '@/components/ui/MetaLabel'
import { RichText } from '@/components/ui/RichText'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: page.opener.title,
  description: page.opener.lede,
}

const GLYPHS = {
  apps: (
    <>
      <rect x="11" y="3" width="18" height="34" rx="4" />
      <path d="M17 32h6" />
    </>
  ),
  websites: (
    <>
      <rect x="3" y="7" width="34" height="26" rx="3" />
      <path d="M3 14h34M8 10.5h1M12 10.5h1" />
    </>
  ),
  games: (
    <>
      <rect x="3" y="11" width="34" height="20" rx="10" />
      <path d="M12 17v8M8 21h8" />
      <circle cx="27" cy="19" r="1.5" fill="currentColor" />
      <circle cx="31" cy="23" r="1.5" fill="currentColor" />
    </>
  ),
  next: (
    <>
      <path d="M20 4v6M20 30v6M4 20h6M30 20h6M9 9l4 4M27 27l4 4M31 9l-4 4M13 27l-4 4" />
      <circle cx="20" cy="20" r="4" />
    </>
  ),
} as const

/** About — docs/DESIGN.md §5.2. */
export default function AboutPage() {
  return (
    <Page>
      <Wrap>
        <PageOpener opener={page.opener} labels={page.labels} />

        <div className={styles.intro}>
          <Reveal className={styles.photo} role="img" aria-label={page.photo.label}>
            <span className={styles.spark} aria-hidden="true" />
            <span className={styles.spark} aria-hidden="true" />
            <span className={styles.spark} aria-hidden="true" />
            <div className={styles.photoInner} aria-hidden="true">
              <span className={styles.face} />
              <MetaLabel className={styles.photoLabel}>
                {page.photo.placeholder[0]}
                <br />
                {page.photo.placeholder[1]}
              </MetaLabel>
            </div>
          </Reveal>
          <Reveal className={styles.story}>
            <h2 className={styles.storyHeading}>{page.story.heading}</h2>
            {page.story.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className={styles.dim}>{page.story.closing}</p>
            <dl className={styles.facts}>
              {page.story.facts.map((fact) => (
                <div key={fact.label}>
                  <dt>
                    <MetaLabel size="sm">{fact.label}</MetaLabel>
                  </dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Wrap>

      <Reveal className={styles.band}>
        <span className={styles.bandDot} aria-hidden="true" />
        <Wrap className={styles.bandInner}>
          <div>
            <span className={styles.rule} aria-hidden="true" />
            <MetaLabel className={styles.bandLabel}>{page.statement.label}</MetaLabel>
          </div>
          <div>
            <blockquote className={styles.quote}>
              <RichText text={page.statement.quote} markClassName={styles.quoteMark} />
            </blockquote>
            <p className={styles.sub}>{page.statement.sub}</p>
          </div>
        </Wrap>
      </Reveal>

      <Wrap>
        <section className={styles.make} aria-labelledby="what-i-make">
          <div className={styles.makeHead}>
            <MetaLabel as="h2" className={styles.makeTitle}>
              <span id="what-i-make">{page.make.label}</span>
            </MetaLabel>
            <MetaLabel size="sm">{page.make.aside}</MetaLabel>
          </div>
          <div className={styles.makeGrid}>
            {page.make.items.map((item) => (
              <Reveal as="article" key={item.title} className={styles.makeItem}>
                <svg
                  className={styles.glyph}
                  viewBox="0 0 40 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  {GLYPHS[item.glyph]}
                </svg>
                <h3 className={styles.makeName}>{item.title}</h3>
                <p>{item.line}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal>
          <BeforeTwelve {...page.before} />
        </Reveal>

        <Reveal className={styles.together}>
          <h2 className={styles.togetherHeading}>{page.together.heading}</h2>
          <div>
            <p>{page.together.body}</p>
            <Link className={styles.button} href={page.together.cta.href}>
              {page.together.cta.label} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>
      </Wrap>
    </Page>
  )
}
