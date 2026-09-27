import type { Metadata } from 'next'

import { privacyPage } from '@content/the-402/help'
import { POLICY_INTRO, POLICY_SECTIONS, POLICY_SHORT } from '@content/the-402/privacy'
import { HelpPage, helpStyles as styles } from '@/components/the-402/HelpPage'
import { absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: `${privacyPage.title} — The 402`,
  description: privacyPage.lead,
  alternates: { canonical: absoluteUrl('/402/privacy') },
}

/**
 * The 402's privacy policy — the app's own words (docs/DESIGN.md §5.8).
 * Submitted to App Store Connect as the Privacy Policy URL.
 */
export default function PrivacyPage() {
  return (
    <HelpPage page="privacy" title={privacyPage.title} lead={privacyPage.lead} version={privacyPage.version}>
      <p>{POLICY_INTRO}</p>
      <div className={styles.short}>
        <span className={styles.shortLabel}>{privacyPage.shortLabel}</span>
        <ul>
          {POLICY_SHORT.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
      <nav aria-label={privacyPage.jumpLabel}>
        <ol className={styles.jump}>
          {POLICY_SECTIONS.map((section, i) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>
                <small>{String(i + 1).padStart(2, '0')}</small>
                {section.question}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      {POLICY_SECTIONS.map((section, i) => (
        <section key={section.id} id={section.id} className={styles.section}>
          <span className={styles.numeral} aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h2 className={styles.heading}>{section.question}</h2>
          {section.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
      ))}
    </HelpPage>
  )
}
