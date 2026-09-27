import { site } from '@/lib/site'
import type { PageOpener } from '@/types/content'

/** Contact — docs/DESIGN.md §5.4. */
export const contactPage = {
  opener: {
    eyebrow: 'Contact',
    title: 'Contact',
    lede: 'Have a project in mind, or a question about something I’ve made? Send me an email. I read everything and reply myself.',
  } satisfies PageOpener,
  /** The first label shows Omaha's local time: "Omaha · 9:41 PM". */
  clockPrefix: 'Omaha',
  labels: ['Email is the easiest way'],
  slab: ["Let's make", 'something.'],
  copy: { label: 'Copy address', done: 'Copied' },
  columns: {
    together: {
      label: 'Working together',
      heading: 'Have a project?',
      body: 'I’m open to making things for other people. Tell me what you have in mind, and we can talk it through together.',
    },
    send: {
      label: 'Helpful to include',
      heading: 'What helps',
      items: [
        'A few lines about your idea',
        'Anything you already have, like links or sketches',
        'When you’re hoping to have it done',
      ],
    },
    online: {
      label: 'Elsewhere',
      heading: 'Find me online',
      links: [
        { label: 'GitHub', href: site.socials.github },
        { label: 'YouTube', href: site.socials.youtube },
      ],
      handle: `I’m @${site.handle} on both. On YouTube I’m starting to document what I build.`,
    },
  },
} as const
