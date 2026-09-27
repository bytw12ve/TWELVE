import type { Metadata } from 'next'

import { deleteAccountPage as page, helpCommon } from '@content/the-402/help'
import { HelpPage, HelpParagraph, helpStyles as styles } from '@/components/the-402/HelpPage'
import { CopyEmail } from '@/components/ui/CopyEmail'
import { isProduction } from '@/lib/content'
import { absoluteUrl, site } from '@/lib/site'

export const metadata: Metadata = {
  title: `${page.title} — The 402`,
  description: page.lead,
  alternates: { canonical: absoluteUrl('/402/delete-account') },
}

/**
 * How to delete a 402 account, with or without the app — Google Play's
 * account deletion URL, so it has to work for people who already uninstalled.
 * A section marked pending describes something the app cannot do yet; it is
 * shown in previews only (docs/DESIGN.md §5.8).
 */
export default function DeleteAccountPage() {
  const sections = page.sections.filter((section) => !(section.pending && isProduction))
  return (
    <HelpPage page="delete-account" title={page.title} lead={page.lead}>
      {sections.map((section) => (
        <section key={section.id} id={section.id} className={styles.section}>
          <h2 className={styles.heading}>{section.heading}</h2>
          {section.paragraphs?.map((p, n) => (
            <HelpParagraph key={n} text={p} pending={Boolean(section.pending)} />
          ))}
          {section.showEmail && (
            <CopyEmail
              email={site.email}
              label={helpCommon.copy.label}
              done={helpCommon.copy.done}
              className={styles.mailbox}
              addressClassName={styles.mailAddress}
              buttonClassName={styles.copy}
            />
          )}
        </section>
      ))}
    </HelpPage>
  )
}
