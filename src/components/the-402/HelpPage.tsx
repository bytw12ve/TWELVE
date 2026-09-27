import Link from 'next/link'
import type { ReactNode } from 'react'

import { helpCommon } from '@content/the-402/help'
import { RichText } from '@/components/ui/RichText'
import type { HelpPageKey, RichText as Rich } from '@/types/content'

import styles from './HelpPage.module.css'
import { The402Logo, Tower } from './The402Logo'

/**
 * The shared frame of the 402's help pages — docs/DESIGN.md §5.8: crumb,
 * orange header card, one readable column, the link row.
 */
export function HelpPage({
  page,
  title,
  lead,
  version,
  children,
}: {
  page: HelpPageKey
  title: string
  lead: string
  version?: string
  children: ReactNode
}) {
  return (
    <div className={styles.page} data-skin="cream">
      <div className={styles.wrap}>
        <div className={styles.crumb}>
          <Link href={helpCommon.crumbBack.href}>{helpCommon.crumbBack.label}</Link>
          <span>{helpCommon.address(page)}</span>
        </div>
        <header className={styles.head}>
          <Tower className={styles.headTower} />
          <The402Logo variant="mark" className={styles.mark} />
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lead}>{lead}</p>
          {version && <p className={styles.version}>{version}</p>}
        </header>
        <div className={styles.body}>
          {children}
          <nav className={styles.links} aria-label={helpCommon.linksLabel}>
            {helpCommon.links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

/**
 * A paragraph that may still be waiting on Jaycee. Pending text only reaches
 * development and preview builds — the loader drops it from production — and
 * is highlighted there so it cannot be mistaken for settled copy.
 */
export function HelpParagraph({ text, pending }: { text: Rich; pending?: boolean }) {
  return (
    <p className={pending ? styles.pending : undefined}>
      {pending && <span className={styles.pendingTag}>Waiting on an answer — not shown in production. </span>}
      <RichText text={text} />
    </p>
  )
}

export { styles as helpStyles }
