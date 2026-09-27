import type { Metadata } from 'next'
import Link from 'next/link'

import { BETA_OPENS, screens, the402Page as page } from '@content/the-402/page'
import { Reveal } from '@/components/page/Reveal'
import { AppScreen } from '@/components/the-402/AppScreen'
import { Apple, BetaForm, GooglePlay } from '@/components/the-402/BetaForm'
import { Countdown } from '@/components/the-402/Countdown'
import { The402Logo, Tower } from '@/components/the-402/The402Logo'
import { RichText } from '@/components/ui/RichText'
import { absoluteUrl, site } from '@/lib/site'

import styles from './page.module.css'

export const metadata: Metadata = {
  // The app's own page: its name alone, without the studio's "— Twelve" suffix.
  title: { absolute: page.meta.title },
  description: page.meta.description,
  alternates: { canonical: absoluteUrl('/work/the-402') },
}

/**
 * The 402 — docs/DESIGN.md §5.7. A one-off page in the app's own skin, not an
 * instance of the case-study template (docs/BUILD.md §Routing).
 */
/** Evaluated once, when the page is prerendered; the countdown corrects itself on load. */
const BUILD_TIME = Date.now()

export default function The402Page() {
  return (
    <div className={styles.page} data-skin="orange">
      <div className={styles.wrap}>
        <div className={styles.crumb}>
          <Link href={page.crumb.back.href}>{page.crumb.back.label}</Link>
          <span>{page.crumb.detail}</span>
        </div>

        <section className={styles.hero} aria-labelledby="the402-title">
          <div className={styles.heroLeft}>
            <h1 id="the402-title" className={styles.heroTitle}>
              <span className={styles.heroLine}>{page.hero.line}</span>
              <The402Logo motion="rise" className={styles.heroLogo} />
              <span className={styles.srOnly}>{page.hero.logoLabel}</span>
            </h1>
            <p className={styles.heroSub}>{page.hero.sub}</p>
            <div className={styles.cta}>
              <Countdown label={page.hero.countdown} target={BETA_OPENS} buildTime={BUILD_TIME} units={page.hero.days} />
              <a className={styles.join} href="#beta">
                {page.hero.cta}
              </a>
              <p className={styles.soon}>
                <Apple className={styles.soonGlyph} />
                <GooglePlay className={styles.soonGlyph} />
                {page.hero.soon}
              </p>
            </div>
          </div>
          <div className={styles.heroRight} aria-hidden="true">
            <Tower className={styles.heroTower} />
            <AppScreen screen={screens.discover} decorative priority className={`${styles.phone} ${styles.phoneBack}`} />
            <AppScreen screen={screens.today} decorative priority className={`${styles.phone} ${styles.phoneFront}`} />
          </div>
        </section>

        <Reveal as="section" className={styles.why} aria-label={page.why.label}>
          <Tower className={styles.whyTower} />
          <p className={styles.label}>{page.why.label}</p>
          <div>
            <blockquote className={styles.quote}>
              <RichText text={page.why.quote} markClassName={styles.quoteMark} />
            </blockquote>
            <p className={styles.sig}>
              <i aria-hidden="true" />
              {page.why.signature}
            </p>
          </div>
        </Reveal>

        <div className={styles.tour}>
          {page.tour.map((stop, i) => (
            <Reveal as="section" key={stop.step} className={styles.stop}>
              <div className={styles.shot}>
                <AppScreen screen={stop.screen} className={styles.shotImage} />
                {stop.notes.map((note, n) => (
                  <span key={n} className={`${styles.note} ${n === 0 ? styles.noteA : styles.noteB}`} aria-hidden="true">
                    <RichText text={note} />
                  </span>
                ))}
              </div>
              <div>
                <p className={styles.step}>
                  <i aria-hidden="true">{i + 1}</i>
                  {stop.step}
                </p>
                <h2 className={styles.stopHeading}>{stop.heading}</h2>
                <p className={styles.stopBody}>{stop.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal as="section" className={styles.also}>
          <div className={styles.alsoArt} aria-hidden="true">
            <AppScreen screen={page.also.screen} decorative className={styles.alsoScreen} />
            <span className={styles.appIcon}>
              <The402Logo variant="mark" />
            </span>
          </div>
          <div>
            <p className={styles.label}>{page.also.label}</p>
            <h2 className={styles.alsoHeading}>{page.also.heading}</h2>
            <ul className={styles.features}>
              {page.also.features.map((f) => (
                <li key={f.title}>
                  <b className={styles.featureTitle}>
                    {f.title}
                    {'tag' in f && <span className={styles.soonTag}>{f.tag}</span>}
                  </b>
                  <span className={styles.featureBody}>{f.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal as="section" className={styles.logoSection}>
          <div>
            <p className={styles.labelOrange}>{page.logo.label}</p>
            <h2 className={styles.logoHeading}>{page.logo.heading}</h2>
            {page.logo.paragraphs.map((p) => (
              <p key={p} className={styles.logoBody}>
                {p}
              </p>
            ))}
          </div>
          <div className={styles.logoArt} aria-hidden="true">
            <The402Logo motion="pop" className={styles.logoMark} />
            <div className={styles.callout}>
              <i />
              <span>
                {page.logo.callout[0]}
                <br />
                <b>{page.logo.callout[1]}</b>
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" id="beta" className={styles.beta}>
          <Tower className={`${styles.float} ${styles.floatA}`} />
          <Tower className={`${styles.float} ${styles.floatB}`} />
          <Tower className={`${styles.float} ${styles.floatC}`} />
          <div>
            <p className={styles.labelDeep}>{page.beta.label}</p>
            <h2 className={styles.betaHeading}>{page.beta.heading}</h2>
            <p className={styles.betaBody}>{page.beta.body}</p>
          </div>
          <BetaForm copy={page.beta.form} contactEmail={site.email} />
          <div className={styles.stores}>
            <p>{page.beta.storesLabel}</p>
            {page.beta.stores.map((store, i) => (
              <span key={store.name} className={styles.store} role="img" aria-label={store.label}>
                {i === 0 ? <Apple className={styles.storeGlyph} /> : <GooglePlay className={styles.storeGlyph} />}
                <span>
                  <small>{store.small}</small>
                  <b>{store.name}</b>
                </span>
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className={styles.fine}>
          <div>
            <p className={styles.label}>{page.fine.label}</p>
            <h2 className={styles.fineHeading}>{page.fine.heading}</h2>
          </div>
          <div>
            <ul className={styles.points}>
              {page.fine.points.map((point) => (
                <li key={point}>
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                  {point}
                </li>
              ))}
            </ul>
            <nav className={styles.policyLinks} aria-label={page.fine.linksLabel}>
              {page.fine.links.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label} <small>{link.hint}</small>
                </Link>
              ))}
            </nav>
          </div>
        </Reveal>

        <nav className={styles.next} aria-label="More work">
          <Link href={page.next.back.href}>
            <small>{page.next.back.small}</small>
            <b>{page.next.back.name}</b>
          </Link>
          <Link href={page.next.next.href}>
            <small>{page.next.next.small}</small>
            <b>{page.next.next.name}</b>
          </Link>
        </nav>
      </div>
    </div>
  )
}
