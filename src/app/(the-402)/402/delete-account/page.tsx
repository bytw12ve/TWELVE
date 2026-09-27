import type { Metadata } from 'next'

import { deleteAccountPage as page, helpCommon } from '@content/the-402/help'
import { HelpPage, HelpParagraph, helpStyles as styles } from '@/components/the-402/HelpPage'
import { CopyEmail } from '@/components/ui/CopyEmail'
import { RichText } from '@/components/ui/RichText'
import { resolvePending } from '@/lib/content'
import { absoluteUrl, site } from '@/lib/site'

export const metadata: Metadata = {
  title: `${page.title} — The 402`,
  description: page.lead,
  alternates: { canonical: absoluteUrl('/402/delete-account') },
}

/**
 * How to delete a 402 account, with or without the app — Google Play's
 * account deletion URL, so it has to work for people who already uninstalled.
 */
export default function DeleteAccountPage() {
  return (
    <HelpPage page="delete-account" title={page.title} lead={page.lead}>
      <section className={styles.section}>
        <h2 className={styles.heading}>{page.inApp.heading}</h2>
        <ol className={styles.steps}>
          {page.inApp.steps.map((step, i) => (
            <li key={i}>
              <span>
                <RichText text={step} />
              </span>
            </li>
          ))}
        </ol>
      </section>
      <section className={styles.section}>
        <h2 className={styles.heading}>{page.byEmail.heading}</h2>
        <p>
          <RichText text={page.byEmail.body} />
        </p>
        <CopyEmail
          email={site.email}
          label={helpCommon.copy.label}
          done={helpCommon.copy.done}
          className={styles.mailbox}
          addressClassName={styles.mailAddress}
          buttonClassName={styles.copy}
        />
      </section>
      <section className={styles.section}>
        <h2 className={styles.heading}>{page.what.heading}</h2>
        {resolvePending(page.what.paragraphs).map((p, n) => (
          <HelpParagraph key={n} text={p.value} pending={p.pending} />
        ))}
      </section>
    </HelpPage>
  )
}
