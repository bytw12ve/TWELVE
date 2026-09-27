import Link from 'next/link'

import { AppScreen } from '@/components/the-402/AppScreen'
import { The402Logo, Tower } from '@/components/the-402/The402Logo'
import { the402FontVariables } from '@/styles/fonts402'
import type { Project } from '@/types/content'

import styles from './FeatureCard.module.css'

/**
 * My work's project card — docs/DESIGN.md §5.1. One link to the project, in
 * the project's own skin. Small text on the orange is ink, never cream (§1.5).
 */
export function FeatureCard({ project }: { project: Project }) {
  const [back, front] = project.screens
  return (
    <Link href={project.href} className={`${the402FontVariables} ${styles.card}`}>
      <Tower className={styles.tower} />
      <div className={styles.body}>
        <p className={styles.num}>
          <span>{project.number}</span>
          <span>{project.kind}</span>
          <span>{project.year}</span>
        </p>
        <The402Logo className={styles.logo} />
        <h2 className={styles.headline}>{project.headline}</h2>
        <p className={styles.summary}>{project.summary}</p>
        <ul className={styles.tags}>
          {project.tags.map((tag) => (
            <li key={tag.label} className={tag.hot ? styles.hot : undefined}>
              {tag.label}
            </li>
          ))}
        </ul>
        <span className={styles.go}>
          <span>{project.cta}</span>
          <span className={styles.circle} aria-hidden="true">
            →
          </span>
        </span>
      </div>
      <div className={styles.phones} aria-hidden="true">
        <AppScreen screen={back} decorative className={`${styles.phone} ${styles.back}`} sizes="(max-width: 900px) 46vw, 300px" />
        <AppScreen screen={front} decorative className={`${styles.phone} ${styles.front}`} sizes="(max-width: 900px) 52vw, 340px" />
      </div>
    </Link>
  )
}
