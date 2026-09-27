import type { PageOpener, PlaygroundStatus } from '@/types/content'

/**
 * Side projects (called the Playground until 2026-09-27) — docs/DESIGN.md §5.3.
 * The entries are in content/playground.ts; the code keeps its original names.
 */
export const playgroundPage = {
  opener: {
    eyebrow: 'Side projects',
    title: 'Side projects',
    lede: 'The things I’m building, testing or still figuring out. When one is finished and ready for people to use, it moves over to My work.',
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
