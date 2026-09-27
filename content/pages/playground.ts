import type { PageOpener, PlaygroundStatus } from '@/types/content'

/** Playground — docs/DESIGN.md §5.3. The entries are in content/playground.ts. */
export const playgroundPage = {
  opener: {
    eyebrow: 'Playground',
    title: 'Playground',
    lede: "Everything I'm building, trying out, or still figuring out. Some of it becomes real work. Some of it just lives here.",
  } satisfies PageOpener,
  countLabel: (n: number) => `${n} ${n === 1 ? 'thing' : 'things'}`,
  liveLabel: (n: number) => `${n} live`,
  filterLabel: 'Filter projects',
  filters: [
    { key: 'all', label: 'All' },
    { key: 'live', label: 'Live' },
    { key: 'building', label: 'Building' },
    { key: 'concept', label: 'Concept' },
  ] as const satisfies readonly { key: 'all' | PlaygroundStatus; label: string }[],
  statusLabel: { live: 'Live', building: 'Building', concept: 'Concept' } satisfies Record<
    PlaygroundStatus,
    string
  >,
  siteCardHint: 'Move your cursor here',
  gameLoading: 'LOADING',
} as const
