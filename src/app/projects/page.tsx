import type { Metadata } from 'next'

import { playgroundPage as page } from '@content/pages/playground'
import { Page, Wrap } from '@/components/page/Page'
import { PageOpener } from '@/components/page/PageOpener'
import { PlaygroundCard } from '@/components/playground/PlaygroundCard'
import { PlaygroundFilter } from '@/components/playground/PlaygroundFilter'
import { playgroundEntries } from '@/lib/content'

export const metadata: Metadata = {
  title: page.opener.title,
  description: page.opener.lede,
}

/** Side projects — docs/DESIGN.md §5.3. Real projects only; counts are derived. */
export default function SideProjectsPage() {
  const entries = playgroundEntries()
  const count = (key: string) => (key === 'all' ? entries.length : entries.filter((e) => e.status === key).length)
  return (
    <Page>
      <Wrap>
        <PageOpener opener={page.opener} labels={[page.countLabel(entries.length), page.liveLabel(count('live'))]} />
        <PlaygroundFilter
          label={page.filterLabel}
          filters={page.filters.map((f) => ({ key: f.key, label: f.label, count: count(f.key) }))}
        >
          {entries.map((entry) => (
            <PlaygroundCard key={entry.id} entry={entry} />
          ))}
        </PlaygroundFilter>
      </Wrap>
    </Page>
  )
}
