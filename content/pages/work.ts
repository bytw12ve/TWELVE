import type { PageOpener } from '@/types/content'

/** My work — docs/DESIGN.md §5.1. */
export const workPage = {
  opener: {
    eyebrow: 'My work',
    title: 'My work',
    lede: 'Finished projects that are out in the world for anyone to use.',
  } satisfies PageOpener,
  /** "1 project" is derived from the list; this is the second label. */
  moreLabel: 'More on the way',
  projectCount: (n: number) => `${n} ${n === 1 ? 'project' : 'projects'}`,
  playgroundNote: {
    text: 'keeb.wiki and Ledger Coffee are in the Playground until their pages are ready.',
    link: { label: 'Go to the Playground →', href: '/playground' },
  },
} as const
