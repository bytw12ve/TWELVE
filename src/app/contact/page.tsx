import type { Metadata } from 'next'

import { contactPage as page } from '@content/pages/contact'
import { OmahaTime } from '@/components/contact/OmahaTime'
import { Page, Wrap } from '@/components/page/Page'
import { PageOpener } from '@/components/page/PageOpener'
import { Reveal } from '@/components/page/Reveal'
import { CopyEmail } from '@/components/ui/CopyEmail'
import { MetaLabel } from '@/components/ui/MetaLabel'
import { site } from '@/lib/site'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: page.opener.title,
  description: page.opener.lede,
}

/**
 * Contact — docs/DESIGN.md §5.4. "Let's make something." with the orbiting
 * dot; where the letters cross it they turn ink, through an aria-hidden copy
 * clipped to the dot's circle — the hero's technique (§4.1, §7.4): a layer
 * holding the dot and a fixed clip orbits, and the ink copy inside it runs the
 * exact inverse, so the lettering never shears and no script runs.
 */
export default function ContactPage() {
  const slab = (
    <>
      {page.slab[0]}
      <br />
      {page.slab[1]}
    </>
  )
  return (
    <Page>
      <Wrap>
        <PageOpener opener={page.opener} labels={[<OmahaTime key="time" prefix={page.clockPrefix} />, ...page.labels]} />
      </Wrap>
      <section className={styles.slab}>
        <Wrap>
          <div className={styles.bigWrap}>
            <div className={styles.orbit} aria-hidden="true">
              <span className={styles.dot} />
            </div>
            <p className={styles.big}>{slab}</p>
            <div className={`${styles.orbit} ${styles.orbitTop}`} aria-hidden="true">
              <div className={styles.clip}>
                <p className={`${styles.big} ${styles.knockout}`}>{slab}</p>
              </div>
            </div>
          </div>
          <CopyEmail
            email={site.email}
            label={page.copy.label}
            done={page.copy.done}
            className={styles.mailRow}
            addressClassName={styles.address}
            buttonClassName={styles.copy}
          />
        </Wrap>
      </section>
      <Wrap>
        <div className={styles.cols}>
          <Reveal>
            <MetaLabel size="sm">{page.columns.together.label}</MetaLabel>
            <h2 className={styles.colHeading}>{page.columns.together.heading}</h2>
            <p>{page.columns.together.body}</p>
          </Reveal>
          <Reveal>
            <MetaLabel size="sm">{page.columns.send.label}</MetaLabel>
            <h2 className={styles.colHeading}>{page.columns.send.heading}</h2>
            <ul className={styles.list}>
              {page.columns.send.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal>
            <MetaLabel size="sm">{page.columns.online.label}</MetaLabel>
            <h2 className={styles.colHeading}>{page.columns.online.heading}</h2>
            <ul className={styles.list}>
              {page.columns.online.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={styles.external}>
                    {link.label} <span aria-hidden="true">↗</span>
                    <span className={styles.srOnly}> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>{page.columns.online.handle}</li>
            </ul>
          </Reveal>
        </div>
      </Wrap>
    </Page>
  )
}
