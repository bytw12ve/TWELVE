import type { PageOpener } from '@/types/content'

/** My work — docs/DESIGN.md §5.1. */
export const workPage = {
  opener: {
    eyebrow: 'My work',
    title: 'My work',
    lede: "These are the projects I've finished and put out into the world. You can download them, use them, and tell me what you think.",
  } satisfies PageOpener,
  /** "1 project" is derived from the list; this is the second label. */
  moreLabel: 'More coming soon',
  projectCount: (n: number) => `${n} ${n === 1 ? 'project' : 'projects'}`,
  playgroundNote: {
    text: "Looking for keebwiki or Ledger Coffee? They're in the Playground for now, until they're ready for a page of their own.",
    link: { label: 'Go to the Playground →', href: '/playground' },
  },
} as const
