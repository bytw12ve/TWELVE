import { host, site } from '@/lib/site'
import { typed } from '@/types/content'
import type { HelpPageKey, HelpSection, RichText } from '@/types/content'

import { POLICY_UPDATED, POLICY_VERSION } from './privacy'

/**
 * The 402's help and legal pages — docs/DESIGN.md §5.8. The privacy policy's
 * words are in ./privacy.ts, shared with the app; everything else is here.
 * Launch text from Jaycee's legal draft of 2026-09-26, with its internal
 * review notes left out (they are tracked in docs/STATE.md, not published).
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
  version: `Version ${POLICY_VERSION.replace(/^v/, '')} · Effective ${POLICY_UPDATED}`,
  shortLabel: 'The short version',
  jumpLabel: 'On this page',
}

const email = { text: site.email, href: `mailto:${site.email}` }

export const termsPage = {
  title: 'Terms of service',
  lead: 'The rules for using the 402, in plain language.',
  version: 'Effective October 31, 2026',
  intro: 'These Terms govern the 402. By using it, you agree to them.',
  jumpLabel: 'On this page',
  sections: typed<readonly HelpSection[]>([
    {
      id: 'what',
      heading: 'What is the 402?',
      paragraphs: [
        [
          'The 402 is a free discovery service for events, places, organizers, live music, food, and things to do around Omaha. Unless explicitly stated otherwise, we do not organize, operate, sponsor, sell tickets to, or control listed events.',
        ],
      ],
    },
    {
      id: 'who',
      heading: 'Who can use it?',
      paragraphs: [
        [
          'Anyone may browse without an account. You must be at least 13 to create one. Protect your login credentials and provide accurate account information.',
        ],
      ],
    },
    {
      id: 'accuracy',
      heading: 'How accurate are listings?',
      paragraphs: [
        [
          'Information may come from verified organizers and public sources. Dates, times, prices, availability, age restrictions, venues, and other details can change. Check important details with the organizer, venue, or seller before making plans, buying tickets, or traveling.',
        ],
      ],
    },
    {
      id: 'tickets',
      heading: 'What about tickets and outside services?',
      paragraphs: [
        [
          'The 402 does not currently sell tickets or process ticket payments. Third-party sellers handle purchases, fees, refunds, and support under their own terms. Directions and other external links may also open services we do not control.',
        ],
      ],
    },
    {
      id: 'organizers',
      heading: 'What rules apply to organizers?',
      paragraphs: [
        [
          'Only approved organizers may use organizer publishing features. Organizers are responsible for submitted content and for having rights to it. They may not submit misleading, fraudulent, unlawful, infringing, threatening, harassing, or harmful content.',
        ],
        [
          'By submitting listing content, an organizer grants the 402 a non-exclusive, worldwide, royalty-free license to host, reproduce, format, display, and distribute it as reasonably necessary to operate and promote the listing and the 402. The organizer keeps ownership.',
        ],
        [
          'We may remove content or restrict organizer features when reasonably necessary to enforce these Terms, protect users, comply with law, or protect the service.',
        ],
      ],
    },
    {
      id: 'not-allowed',
      heading: 'What uses are not allowed?',
      paragraphs: [
        [
          "Do not attempt unauthorized access; interfere with the service; scrape or copy it in bulk without permission; spam, harass, threaten, impersonate, or defraud people; submit false information; violate others' rights; or use the service unlawfully.",
        ],
      ],
    },
    {
      id: 'ownership',
      heading: 'Who owns the 402?',
      paragraphs: [
        [
          "The 402's original software, branding, design, and original content are owned by twelve. or its licensors. Third-party materials remain their owners' property.",
        ],
      ],
    },
    {
      id: 'suspension',
      heading: 'Can access be suspended?',
      paragraphs: [
        [
          'We may restrict or suspend access when we reasonably believe an account violates these Terms, harms users, compromises security, or violates law.',
        ],
      ],
    },
    {
      id: 'guarantee',
      heading: 'Is the service guaranteed?',
      paragraphs: [
        [
          'To the extent permitted by law, the 402 is provided "as is" and "as available." We do not guarantee uninterrupted availability or that every listing will remain accurate. Nothing excludes rights that cannot legally be excluded.',
        ],
      ],
    },
    {
      id: 'liability',
      heading: 'What is the limit on liability?',
      paragraphs: [
        [
          'To the maximum extent permitted by law, twelve. and people operating the 402 are not liable for indirect, incidental, special, consequential, or punitive damages arising from the service, third-party services, event changes or cancellations, ticket transactions, or conduct at an event. Nothing limits liability where law forbids it.',
        ],
      ],
    },
    {
      id: 'law',
      heading: 'What law applies?',
      paragraphs: [['Nebraska law governs these Terms except where applicable law provides non-waivable rights.']],
    },
    {
      id: 'contact',
      heading: 'Contact',
      paragraphs: [['Questions about these Terms? Email ', email, '.']],
    },
  ]),
}

export const supportPage = {
  title: 'Support',
  lead: "Questions about the 402, or something not working? Here's how to get help.",
  intro:
    'Email me. Include what happened, what you expected, your phone model and iOS or Android version, and a screenshot if it helps. Never email your password.',
  faqHeading: 'Common questions',
  faq: typed<readonly { q: string; a: RichText }[]>([
    {
      q: 'Do I need an account?',
      a: ['No. Accounts enable saves, Interested and Going marks, followed organizers, and preferences.'],
    },
    {
      q: 'Do I have to share my location?',
      a: ['No. You can choose neighborhoods instead.'],
    },
    {
      q: 'An event is wrong or missing.',
      a: ['Email the event name and what appears wrong.'],
    },
    {
      q: 'How do I delete my account?',
      a: [
        'You → Settings → Delete account. If you uninstalled the app, use the email process on ',
        { text: 'Delete your account', href: helpPaths['delete-account'] },
        '.',
      ],
    },
  ]),
}

/** A section of the delete-account page. `pending` holds it back until the app can do it. */
export type DeleteSection = {
  id: string
  heading: string
  steps?: readonly RichText[]
  paragraphs?: readonly RichText[]
  showEmail?: boolean
  pending?: string
}

export const deleteAccountPage = {
  title: 'Delete your account',
  lead: 'How to delete your 402 account, with or without the app.',
  sections: typed<readonly DeleteSection[]>([
    {
      id: 'in-app',
      heading: 'In the app',
      paragraphs: [['Go to ', { text: 'You → Settings → Delete account', strong: true }, ' and confirm.']],
    },
    {
      id: 'change-your-mind',
      heading: 'Can I change my mind?',
      paragraphs: [
        [
          'Your account becomes unavailable immediately. You have 14 days to restore it by signing back in. Otherwise permanent deletion occurs after 14 days.',
        ],
      ],
    },
    {
      id: 'by-email',
      heading: 'Already uninstalled?',
      paragraphs: [
        [
          'Email ',
          email,
          ' from the account email with the subject ',
          { text: 'Delete my account', strong: true },
          ". We will process the request and respond within 7 days. We may verify the request to avoid deleting someone else's account.",
        ],
      ],
      showEmail: true,
    },
    {
      id: 'what',
      heading: 'What gets deleted?',
      paragraphs: [
        [
          'Account data under our control: email, name, username, saved events and places, Interested and Going marks, followed organizers, preferences, and stored starting location. Limited security, legal, and backup records may persist temporarily where legitimately required. Provider-held account data is handled through available deletion processes.',
        ],
      ],
    },
    {
      id: 'export',
      heading: 'Export first',
      paragraphs: [['Use ', { text: 'Settings → Export my data', strong: true }, ' before requesting deletion.']],
    },
  ]),
}
