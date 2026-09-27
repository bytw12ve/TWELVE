import { playgroundPage } from '@content/pages/playground'
import type { PlaygroundEntry } from '@/types/content'

import styles from './PlaygroundCard.module.css'
import { GameVisual, KeyboardVisual, SiteVisual } from './Visuals'

/**
 * A Playground card — docs/DESIGN.md §5.3. The card itself is not a link: a
 * card with somewhere to go has one real link in its footer row; a card with
 * nowhere to go has a quiet line, is not focusable, and does not lift.
 */
export function PlaygroundCard({ entry }: { entry: PlaygroundEntry }) {
  const linked = 'href' in entry.action
  return (
    <article className={[styles.card, linked && styles.linked].filter(Boolean).join(' ')} data-status={entry.status}>
      <div className={styles.visual}>
        <span className={[styles.badge, entry.status === 'live' && styles.live].filter(Boolean).join(' ')}>
          {playgroundPage.statusLabel[entry.status]}
        </span>
        <Visual entry={entry} />
      </div>
      <div className={styles.text}>
        <h2 className={styles.title}>{entry.title}</h2>
        <p className={styles.line}>{entry.line}</p>
        <span className={styles.meta}>{entry.meta}</span>
      </div>
      {'href' in entry.action ? (
        <a className={styles.action} href={entry.action.href} target="_blank" rel="noopener noreferrer">
          {entry.action.label} <span className={styles.arrow} aria-hidden="true">↗</span>
          <span className={styles.srOnly}> (opens in a new tab)</span>
        </a>
      ) : (
        <span className={`${styles.action} ${styles.quiet}`}>{entry.action.quiet}</span>
      )}
    </article>
  )
}

function Visual({ entry }: { entry: PlaygroundEntry }) {
  switch (entry.visual) {
    case 'keyboard':
      return <KeyboardVisual />
    case 'ledger':
      return (
        <div className={styles.brick} aria-hidden="true">
          <div className={styles.sign}>
            <b>LEDGER</b>
            <small>COFFEE · EST. OMAHA</small>
            <span className={styles.brass} />
          </div>
        </div>
      )
    case 'game':
      return <GameVisual loading={playgroundPage.gameLoading} />
    case 'site':
      return <SiteVisual hint={playgroundPage.siteCardHint} />
  }
}
