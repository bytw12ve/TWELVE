import type { Project } from '@/types/content'

/**
 * Finished, public projects — the list My work shows (docs/DESIGN.md §5.1).
 * `draft: true` keeps an entry out of the build, navigation and sitemap.
 */
export const projects = [
  {
    slug: 'the-402',
    href: '/work/the-402',
    number: '01',
    kind: 'iOS & Android app',
    year: '2026',
    headline: 'Find something to do in Omaha tonight.',
    summary:
      "An app for events, places, and things to do around the metro. Pick a mood, see what's on, and know the details before you leave the house.",
    tags: [{ label: 'Beta Oct 31', hot: true }, { label: 'iOS' }, { label: 'Android' }, { label: 'Free' }],
    cta: 'See the 402',
    screens: [
      {
        src: '/work/the-402/event.png',
        alt: '',
        width: 900,
        height: 1957,
      },
      {
        src: '/work/the-402/today.png',
        alt: '',
        width: 900,
        height: 1957,
      },
    ],
  },
] as const satisfies readonly Project[]
