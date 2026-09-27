import type { Metadata } from 'next'

import { helpCommon, supportPage } from '@content/the-402/help'
import { FaqItem } from '@/components/the-402/Faq'
import { HelpPage, helpStyles as styles } from '@/components/the-402/HelpPage'
import { CopyEmail } from '@/components/ui/CopyEmail'
import { RichText } from '@/components/ui/RichText'
import { absoluteUrl, site } from '@/lib/site'

export const metadata: Metadata = {
  title: `${supportPage.title} — The 402`,
  description: supportPage.lead,
  alternates: { canonical: absoluteUrl('/402/support') },
}

/** The 402's support page — submitted to App Store Connect as the Support URL. */
export default function SupportPage() {
  return (
    <HelpPage page="support" title={supportPage.title} lead={supportPage.lead}>
      <p>{supportPage.intro}</p>
      <CopyEmail
        email={site.email}
        label={helpCommon.copy.label}
        done={helpCommon.copy.done}
        className={styles.mailbox}
        addressClassName={styles.mailAddress}
        buttonClassName={styles.copy}
      />
      <section className={styles.section}>
        <h2 className={styles.heading}>{supportPage.includeHeading}</h2>
        <ol className={styles.steps}>
          {supportPage.include.map((item) => (
            <li key={item}>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      </section>
      <section className={styles.section}>
        <h2 className={styles.heading}>{supportPage.faqHeading}</h2>
        {supportPage.faq.map((item) => (
          <FaqItem key={item.q} question={item.q}>
            <p>
              <RichText text={item.a} />
            </p>
          </FaqItem>
        ))}
      </section>
    </HelpPage>
  )
}
