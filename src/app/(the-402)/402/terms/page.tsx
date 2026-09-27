import type { Metadata } from 'next'

import { termsPage } from '@content/the-402/help'
import { HelpPage, HelpParagraph, helpStyles as styles } from '@/components/the-402/HelpPage'
import { resolvePending } from '@/lib/content'
import { absoluteUrl } from '@/lib/site'

export const metadata: Metadata = {
  title: `${termsPage.title} — The 402`,
  description: termsPage.lead,
  alternates: { canonical: absoluteUrl('/402/terms') },
}

/** The 402's terms of service — docs/DESIGN.md §5.8. */
export default function TermsPage() {
  return (
    <HelpPage page="terms" title={termsPage.title} lead={termsPage.lead} version={termsPage.version}>
      <p>{termsPage.intro}</p>
      <nav aria-label={termsPage.jumpLabel}>
        <ol className={styles.jump}>
          {termsPage.sections.map((section, i) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>
                <small>{String(i + 1).padStart(2, '0')}</small>
                {section.heading}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      {termsPage.sections.map((section, i) => (
        <section key={section.id} id={section.id} className={styles.section}>
          <span className={styles.numeral} aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <h2 className={styles.heading}>{section.heading}</h2>
          {resolvePending(section.paragraphs).map((p, n) => (
            <HelpParagraph key={n} text={p.value} pending={p.pending} />
          ))}
        </section>
      ))}
    </HelpPage>
  )
}
