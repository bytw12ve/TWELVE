import type { PageOpener, RichText } from '@/types/content'

/** About — docs/DESIGN.md §5.2. */
export const aboutPage = {
  opener: {
    eyebrow: 'About',
    title: 'About',
    lede: "I'm Jaycee. twelve. is my creative studio, my playground, and where I keep everything I make.",
  } satisfies PageOpener,
  labels: ['Omaha, NE', 'Est. 2026'],
  photo: {
    label: 'Photo of Jaycee, coming soon',
    placeholder: ['Photo of Jaycee', 'goes here'],
  },
  story: {
    heading: 'I come up with a lot of ideas, and I want to make every one of them real.',
    paragraphs: [
      "I've been making things for as long as I can remember. Minecraft and Rust servers, Minecraft plugins, Discord bots, a few games, a LEGO channel where I built working candy machines, and a robotics team in middle school. Tech has always been part of my life.",
      'This year I spent a lot of time figuring out who I am. What I learned is that I love making things, and I want to make them my own way.',
    ],
    closing:
      "So that's what twelve. is. Apps, websites, games, whatever the idea needs. Mostly things people can actually use, and sometimes things nobody's made before.",
    facts: [
      { label: 'Based in', value: 'Omaha, Nebraska' },
      { label: 'Started', value: '2026' },
      { label: 'Team', value: 'Just me' },
    ],
  },
  statement: {
    label: "What I'm here for",
    quote: [
      'I like making things that are ',
      { text: 'useful to people', mark: true },
      ', and things nobody has made before.',
    ] satisfies RichText,
    sub: 'If an idea keeps coming back, I build it. Some turn into real products. Some stay experiments in the Playground.',
  },
  make: {
    label: 'What I make',
    aside: 'Anything, really',
    items: [
      { glyph: 'apps', title: 'Apps', line: 'Like the 402, an app for finding things to do in Omaha.' },
      { glyph: 'websites', title: 'Websites', line: "Sites that feel like whoever they're for, never a template." },
      { glyph: 'games', title: 'Games', line: 'One is starting soon. The concept is a secret for now.' },
      { glyph: 'next', title: "Whatever's next", line: "If the idea is good, I'll probably try it." },
    ],
  },
  before: {
    title: 'Before twelve.',
    line: 'Some of what I was making growing up.',
    listLabel: "Things I've made",
    /** [plain, emphasised] — rendered "Minecraft **servers**". */
    chips: [
      ['Minecraft', 'servers'],
      ['Minecraft', 'plugins'],
      ['Rust', 'servers'],
      ['Discord', 'bots'],
      ['Discord', 'servers'],
      ['A few', 'games'],
      ['LEGO', 'candy machines'],
      ['Middle school', 'robotics'],
    ],
  },
  together: {
    heading: 'Want to make something together?',
    body: "I'm not out looking for clients, but I'm open to it. If you've got an idea for an app, a site, or something stranger, tell me about it. Good work takes time, and I'll make it worth the wait.",
    cta: { label: 'Get in touch', href: '/contact' },
  },
} as const
