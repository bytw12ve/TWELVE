import { host, site } from '@/lib/site'
import { typed } from '@/types/content'
import type { HelpPageKey, HelpSection, MaybePending, RichText } from '@/types/content'

import { POLICY_UPDATED, POLICY_VERSION } from './privacy'

/**
 * The 402's help and legal pages — docs/DESIGN.md §5.8. The privacy policy's
 * words are in ./privacy.ts, copied from the app; everything else is here.
 *
 * These paths are submitted to the App Store and Google Play. Never rename them.
 */

export const helpPaths = {
  privacy: '/402/privacy',
  terms: '/402/terms',
  support: '/402/support',
  'delete-account': '/402/delete-account',
} as const satisfies Record<HelpPageKey, string>

export const helpCommon = {
  crumbBack: { label: '← The 402', href: '/work/the-402' },
  address: (key: HelpPageKey) => `${host}${helpPaths[key]}`,
  linksLabel: 'The 402 help',
  links: [
    { label: 'Privacy policy', href: helpPaths.privacy },
    { label: 'Terms of service', href: helpPaths.terms },
    { label: 'Support', href: helpPaths.support },
    { label: 'Delete your account', href: helpPaths['delete-account'] },
    { label: 'About the 402', href: '/work/the-402' },
  ],
  copy: { label: 'Copy', done: 'Copied' },
}

export const privacyPage = {
  title: 'Privacy policy',
  lead: "What the 402 collects, how it's used, and how to delete it.",
  version: `Version ${POLICY_VERSION.replace(/^v/, '')} · Updated ${POLICY_UPDATED}`,
  shortLabel: 'The short version',
  jumpLabel: 'On this page',
}

export const termsPage = {
  title: 'Terms of service',
  lead: 'The rules for using the 402, in plain language.',
  version: 'Version 1.0 · Effective Oct 31, 2026',
  jumpLabel: 'On this page',
  sections: typed<readonly HelpSection[]>([
    {
      id: 'using',
      heading: 'Using the 402',
      paragraphs: [
        [
          "The 402 is free to use. By using it, you agree to these terms. If you don't agree, please don't use the app.",
        ],
        ['You need to be at least 13 years old to create an account.'],
      ],
    },
    {
      id: 'account',
      heading: 'Your account',
      paragraphs: [
        [
          "Use accurate information when you sign up, and keep your login to yourself. You're responsible for what happens on your account.",
        ],
        [
          'You can delete your account at any time. See ',
          { text: 'Delete your account', href: helpPaths['delete-account'] },
          '.',
        ],
      ],
    },
    {
      id: 'events',
      heading: 'Events and listings',
      paragraphs: [
        [
          'Event details come from organizers and public listings. Times, prices, and other details can change, so check with the organizer before you go.',
        ],
        ["The 402 helps you find events, but we don't run them and aren't responsible for what happens at them."],
      ],
    },
    {
      id: 'tickets',
      heading: 'Tickets',
      paragraphs: [
        [
          'Tickets are sold on other websites. Payments, refunds, and ticket problems are handled by the seller, not by the 402.',
        ],
      ],
    },
    {
      id: 'fair',
      heading: 'Using the app fairly',
      paragraphs: [
        [
          "Don't misuse the app. That includes trying to break it, copying its listings in bulk, or using it to spam or harass anyone.",
        ],
        {
          pending: true,
          waitingOn: "Jaycee's OK on this new sentence (only verified organizers post events, 2026-09-27)",
          value: [
            'Only verified organizers can post events. Organizers must not post anything false, illegal, or offensive.',
          ],
        },
        ['We may suspend or close accounts that break these terms.'],
      ],
    },
    {
      id: 'guarantees',
      heading: 'No guarantees',
      paragraphs: [
        [
          "We work hard to keep the app running and the listings correct, but the app is provided as it is, without guarantees. As far as the law allows, we aren't liable for losses that come from using it.",
        ],
      ],
    },
    {
      id: 'changes',
      heading: 'Changes',
      paragraphs: [
        [
          "If these terms change in a way that matters, we'll let you know in the app before the change takes effect.",
        ],
      ],
    },
    {
      id: 'law',
      heading: 'Law and contact',
      paragraphs: [
        ['These terms are governed by the laws of Nebraska.'],
        ['Questions? Email ', { text: site.email, href: `mailto:${site.email}` }, '.'],
      ],
    },
  ]),
}

export const supportPage = {
  title: 'Support',
  lead: "Questions about the 402, or something not working? Here's how to get help.",
  intro:
    "If something isn't working, or you have a question about the 402, email me. I read every message and answer them myself.",
  includeHeading: 'What to include',
  include: [
    'What happened, and what you expected to happen',
    'Your phone model and its iOS or Android version',
    'A screenshot, if you can take one',
  ],
  faqHeading: 'Common questions',
  faq: typed<readonly { q: string; a: RichText }[]>([
    {
      q: 'How do I join the beta?',
      a: [
        'Leave your email on ',
        { text: 'the 402 page', href: '/work/the-402#beta' },
        " and choose iPhone or Android. The beta opens October 31, and I'll email you an invite.",
      ],
    },
    {
      q: 'Do I need an account?',
      a: [
        "No. You can browse without one. You only need an account to save events and mark what you're going to.",
      ],
    },
    {
      q: 'Do I have to share my location?',
      a: [
        "No. If you'd rather not, pick the neighborhoods you usually go to, and the app will show you what's happening there.",
      ],
    },
    {
      q: 'An event is wrong or missing',
      a: ["Email me the name of the event and what's wrong, and I'll fix it."],
    },
    {
      q: 'How do I delete my account?',
      a: [
        "In the app, go to You → Settings → Delete account. If you've already deleted the app, ",
        { text: 'you can do it by email', href: helpPaths['delete-account'] },
        '.',
      ],
    },
  ]),
}

export const deleteAccountPage = {
  title: 'Delete your account',
  lead: 'How to delete your 402 account, with or without the app.',
  inApp: {
    heading: 'In the app',
    steps: typed<readonly RichText[]>([
      ['Open the 402 and go to ', { text: 'You → Settings', strong: true }, '.'],
      ['Tap ', { text: 'Delete account', strong: true }, '.'],
      ['Confirm. Your account is deleted right away.'],
    ]),
  },
  byEmail: {
    heading: 'Already deleted the app?',
    body: typed<RichText>([
      'Email me from the address on your account with the subject line ',
      { text: 'Delete my account', strong: true },
      ". I'll delete it and email you when it's done, within 7 days.",
    ]),
  },
  what: {
    heading: 'What gets deleted',
    paragraphs: typed<readonly MaybePending<RichText>[]>([
      [
        "Everything: your email address, your name, your username, your saved events and places, your Interested and Going marks, the organizers you follow, and your preferences. We don't keep a copy.",
      ],
      {
        pending: true,
        waitingOn: 'the 14-day grace period landing in the app and its policy.ts',
        value: [
          "You'll have 14 days to change your mind: sign back in and your account comes back as it was. After that it's gone for good.",
        ],
      },
    ]),
  },
}
