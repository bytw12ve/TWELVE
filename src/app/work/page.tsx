import type { Metadata } from 'next'
import Link from 'next/link'

import { workPage } from '@content/pages/work'
import { Page, Wrap } from '@/components/page/Page'
import { PageOpener } from '@/components/page/PageOpener'
import { Reveal } from '@/components/page/Reveal'
import { FeatureCard } from '@/components/work/FeatureCard'
import { publishedProjects } from '@/lib/content'

import styles from './page.module.css'

export const metadata: Metadata = {
  title: workPage.opener.title,
  description: workPage.opener.lede,
}

/** My work — docs/DESIGN.md §5.1. Finished, public projects only. */
export default function WorkPage() {
  const projects = publishedProjects()
  return (
    <Page>
      <Wrap>
        <PageOpener opener={workPage.opener} labels={[workPage.projectCount(projects.length), workPage.moreLabel]} />
        {projects.map((project) => (
          <Reveal key={project.slug}>
            <FeatureCard project={project} />
          </Reveal>
        ))}
        <Reveal className={styles.later}>
          <p>{workPage.playgroundNote.text}</p>
          <Link href={workPage.playgroundNote.link.href}>{workPage.playgroundNote.link.label}</Link>
        </Reveal>
      </Wrap>
    </Page>
  )
}
