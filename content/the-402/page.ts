import type { AppScreen, RichText } from '@/types/content'

import { POLICY_SHORT } from './privacy'

/** The beta opens at midnight, Omaha time. The countdown reads only this. */
export const BETA_OPENS = '2026-10-31T00:00:00-05:00'

const screen = (name: string, alt: string): AppScreen => ({
  src: `/work/the-402/${name}.png`,
  alt,
  width: 900,
  height: 1956,
})

export const screens = {
  today: screen(
    'today',
    'The 402 home screen, showing Tonight in the 402 with The 70’s Band at Stinson Park',
  ),
  discover: screen(
    'discover',
    'The 402 discover screen, asking what are you in the mood for, with moods like date night, chill, outside, live music, family and food',
  ),
  event: screen(
    'event',
    'The 402 event details for The 70’s Band at Stinson Park, with where, when, cover, ages, directions and an Event details button',
  ),
  nearby: screen(
    'nearby',
    'The 402 map of Omaha showing 22 things nearby, with pins in Benson and Aksarben',
  ),
  account: screen(
    'account',
    'The 402 create account screen: keep what you find worth keeping',
  ),
} as const

/** Every string on /work/the-402 — docs/DESIGN.md §5.7. */
export const the402Page = {
  meta: {
    title: 'The 402',
    description:
      "An app for finding things to do around Omaha, from live music and markets to food and whatever's happening tonight.",
  },
  crumb: { back: { label: '← My work', href: '/work' }, detail: '01 · App · 2026' },
  hero: {
    line: "What's on in",
    logoLabel: 'The 402',
    sub: 'The 402 shows you what’s happening around Omaha tonight, this weekend and near you. Live music, markets, food, and everything in between, whether you grew up here or you’re just visiting.',
    countdown: 'Beta opens Oct 31',
    days: { today: 'today', one: 'day', many: 'days' },
    cta: 'Join the beta →',
    soon: 'Coming soon to the App Store and Google Play',
  },
  why: {
    label: 'Why I made it',
    quote: [
      'I’ve lived in Omaha my whole life, and finding something to do here always meant digging. By the time you heard about it, it was over. I made the 402 so it’s easy to ',
      { text: 'get out', mark: true },
      ', try something new, and ',
      { text: 'meet people', mark: true },
      '.',
    ] satisfies RichText,
    signature: 'Jaycee',
  },
  tour: [
    {
      step: 'Home',
      heading: 'Tonight in the 402',
      body: 'Open the app and see what’s on right now and over the next few hours. Search for something specific, or narrow it down to tonight, today, or cheap and free.',
      screen: screens.today,
      notes: [
        ["What's on ", { text: 'right now', strong: true }],
        [{ text: 'Cheap or free', strong: true }, ' filter'],
      ],
    },
    {
      step: 'Discover',
      heading: 'Pick your vibe',
      body: 'Not sure what you’re in the mood for? Choose a mood, like date night, live music or something the whole family can do, and see what fits.',
      screen: screens.discover,
      notes: [
        ['Now · Tonight · ', { text: 'Weekend', strong: true }],
        [{ text: '6', strong: true }, ' moods'],
      ],
    },
    {
      step: 'Event details',
      heading: 'Know before you go',
      body: 'Every event shows where it is, when it starts, what it costs, who can go and where to park, with directions one tap away.',
      screen: screens.event,
      notes: [
        ['Where to ', { text: 'park', strong: true }],
        ['Directions in ', { text: 'one tap', strong: true }],
      ],
    },
    {
      step: 'Nearby',
      heading: "See what's around you",
      body: 'Open the map to see what’s happening near you, or switch to a list. If you’d rather not share your location, pick the neighborhoods you usually go to and the app shows you what’s happening there instead.',
      screen: screens.nearby,
      notes: [
        ['Map or ', { text: 'list', strong: true }],
        [{ text: '22', strong: true }, ' things nearby'],
      ],
    },
  ] satisfies readonly {
    step: string
    heading: string
    body: string
    screen: AppScreen
    notes: readonly [RichText, RichText]
  }[],
  also: {
    label: 'Also in the app',
    heading: 'Go from scrolling to making plans.',
    screen: screens.account,
    features: [
      { title: 'Save it for later', body: 'Save events you’re thinking about so they’re easy to find again.' },
      { title: 'Make lists', body: 'Group events and places into your own lists, like date ideas or things to do this summer.' },
      {
        title: 'Interested or going',
        body: 'Mark what you’re going to, and see how many other people are going too.',
      },
      {
        title: 'Notifications',
        body: 'Get a reminder before an event you saved starts, so you don’t miss it.',
        /** The app does not send any yet (Jaycee, 2026-09-27). Remove when it does. */
        tag: 'Coming soon',
      },
    ],
  },
  logo: {
    label: 'About the logo',
    heading: 'The 0 is a building.',
    paragraphs: [
      "It's the new Mutual of Omaha tower, the tallest building in Nebraska. Yes, that one. The one everybody jokes about.",
      'Nobody in Omaha can look at it with a straight face, so it had to be in the logo.',
    ],
    callout: ['Mutual of Omaha tower', '677 ft'],
  },
  beta: {
    label: 'Beta · Oct 31',
    heading: 'Try it before everyone else.',
    body: 'The beta opens October 31. Leave your email and tell me which phone you have, and I’ll send you an invite as soon as it’s ready.',
    form: {
      email: 'Email',
      placeholder: 'you@example.com',
      phone: 'My phone',
      ios: 'iPhone',
      android: 'Android',
      submit: 'Join the beta',
      /** New copy — not in the prototype. Needs Jaycee's OK. */
      sending: 'Sending…',
      fine: 'I’ll only email you about the beta.',
      invalid: "That email doesn't look right. Check it and try again.",
      /** New copy — not in the prototype. Needs Jaycee's OK. */
      failed: "That didn't go through. Try again in a minute, or email me at {email}.",
      done: "You're on the list.",
      doneBody: "I'll send an {platform} invite to {email} when the beta opens on October 31.",
      /** Used when the no-JavaScript form lands back here without the address. */
      doneBodyPlain: "I'll send you an invite when the beta opens on October 31.",
    },
    storesLabel: 'Coming to',
    stores: [
      { small: 'Download on the', name: 'App Store', label: 'App Store, coming soon' },
      { small: 'Get it on', name: 'Google Play', label: 'Google Play, coming soon' },
    ],
  },
  fine: {
    label: 'The fine print',
    heading: 'Your data stays yours.',
    /** The app policy's own short version, word for word (Jaycee, 2026-09-26). */
    points: POLICY_SHORT,
    linksLabel: 'The 402 policies',
    links: [
      { label: 'Privacy policy', hint: 'Read it →', href: '/402/privacy' },
      { label: 'Support', hint: 'Get help →', href: '/402/support' },
      { label: 'Delete your account', hint: 'How it works →', href: '/402/delete-account' },
      { label: 'Terms of service', hint: 'Read them →', href: '/402/terms' },
    ],
  },
  next: {
    back: { small: '← Back', name: 'My work', href: '/work' },
    next: { small: 'Next →', name: 'Playground', href: '/playground' },
  },
} as const
