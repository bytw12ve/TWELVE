import { site } from '@/lib/site'
import type { PageOpener } from '@/types/content'

/** Contact — docs/DESIGN.md §5.4. */
export const contactPage = {
  opener: {
    eyebrow: 'Contact',
    title: 'Contact',
    lede: 'Have an idea, a question about something I made, or just want to say hi? Email me.',
  } satisfies PageOpener,
  /** The first label shows Omaha's local time: "Omaha · 9:41 PM". */
  clockPrefix: 'Omaha',
  labels: ['Email is the easiest way'],
  slab: ["Let's make", 'something.'],
  copy: { label: 'Copy address', done: 'Copied' },
  columns: {
    together: {
      label: 'If you want to work together',
      heading: "I'm open to it",
      body: "I'm not out looking for clients, but if you want an app, a website, or something nobody's made yet, tell me about it. I take my time, and it shows in the work.",
    },
    send: {
      label: 'Helpful to include',
      heading: 'What to send',
      items: ['What you want to make', 'Links, sketches, or anything you already have', "When you'd like it done"],
    },
    online: {
      label: 'Elsewhere',
      heading: 'Find me online',
      links: [{ label: 'GitHub', href: site.socials.github }],
      handle: `@${site.handle} on GitHub`,
    },
  },
} as const
