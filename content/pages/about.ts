import type { PageOpener, RichText } from '@/types/content'

/** About — docs/DESIGN.md §5.2. */
export const aboutPage = {
  opener: {
    eyebrow: 'About',
    title: 'About',
    lede: "Hi, I'm Jaycee. twelve. is my studio. It's where I make apps, websites and games, and where I keep everything I've built.",
  } satisfies PageOpener,
  labels: ['Omaha, NE', 'Est. 2026'],
  photo: {
    label: 'Photo of Jaycee, coming soon',
    placeholder: ['Photo of Jaycee', 'goes here'],
  },
  story: {
    heading: 'I have more ideas than I have time, so I build the ones that won’t leave me alone.',
    paragraphs: [
      "I've been building things online since I was a kid. I ran Minecraft and Rust servers, wrote plugins, and made Discord bots for my friends. I had a YouTube channel where I built working LEGO candy machines, and I spent way too long trying to get LEGO Mindstorms to stir a milkshake. In middle school I joined the robotics team, and I never really stopped building after that.",
      'The thing I’m proudest of from back then is a GTA 5 roleplay server I ran. Real people played on it, and I managed all of it. I sold it for $100, which I still think about.',
      'These days I make things for everyday people, usually because I ran into a problem myself and wanted a better way. The 402 started because I could never find anything to do in Omaha until it was already over.',
    ],
    closing:
      'The name comes from my birthday, February 12th. Twelve has always been my number, and purple is my favorite color, so this whole studio is pretty much me. Some of what I make turns into real products, like the 402. Some of it stays an experiment. All of it is made by me, here in Omaha.',
    facts: [
      { label: 'Based in', value: 'Omaha, Nebraska' },
      { label: 'Started', value: '2026' },
      { label: 'Team', value: 'Just me' },
    ],
  },
  statement: {
    label: "What I'm here for",
    quote: [
      'I want to make things people ',
      { text: 'actually use', mark: true },
      ', and a few things nobody has tried yet.',
    ] satisfies RichText,
    sub: 'If an idea keeps coming back, I build it. Some become real products. The rest live in Side projects until they’re ready.',
  },
  make: {
    label: 'What I make',
    aside: 'Anything, really',
    items: [
      {
        glyph: 'apps',
        title: 'Apps',
        line: 'Real apps you can download, like the 402, built for the App Store and Google Play.',
      },
      {
        glyph: 'websites',
        title: 'Websites',
        line: 'Built from scratch around who they’re for, never from a template.',
      },
      {
        glyph: 'games',
        title: 'Games',
        line: 'My first one, wake., is a psychological mystery game I’m starting in 2027.',
      },
      {
        glyph: 'next',
        title: "Whatever's next",
        line: 'If an idea sticks with me, I’ll probably end up building it.',
      },
    ],
  },
  before: {
    title: 'Before twelve.',
    line: 'A few things I made before any of this had a name.',
    listLabel: "Things I've made",
    /** [plain, emphasised] — rendered "Minecraft **servers**". */
    chips: [
      ['Minecraft', 'servers'],
      ['Minecraft', 'plugins'],
      ['Rust', 'servers'],
      ['Discord', 'bots'],
      ['GTA 5', 'roleplay server'],
      ['Discord', 'servers'],
      ['A few', 'games'],
      ['LEGO', 'candy machines'],
      ['Middle school', 'robotics'],
    ],
    /** The one she's proudest of; its pin is drawn a little larger. */
    favorite: 'GTA 5 roleplay server',
    favoriteLabel: 'My favorite',
  },
  together: {
    heading: 'Want to make something together?',
    body: "I'm not actively looking for clients, but I'm always happy to talk. If you have an idea for an app, a website or something a little different, send me a message. We'll talk it through and see if it's a good fit.",
    cta: { label: 'Get in touch', href: '/contact' },
  },
} as const
