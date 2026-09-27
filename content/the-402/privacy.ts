/**
 * The 402's privacy policy, word for word.
 *
 * The web page and the app must say exactly the same thing (docs/BUILD.md
 * §Content Structure). This version (v1.1) was written for the launch and
 * leads the app: it goes into `apps/mobile/src/features/legal/policy.ts` next,
 * and `pnpm policy:check` fails until it does. After that, the words change in
 * the app first, then here.
 *
 * It states only what the app does today. The 14-day deletion grace period is
 * added once that feature works in production.
 *
 * This file is exempt from `pnpm domain:check`: the policy names its contact
 * address, and a verbatim copy cannot swap it for a constant.
 */

export const POLICY_VERSION = 'v1.1'

/** The date the words take effect, not the date of the build. */
export const POLICY_UPDATED = 'October 31, 2026'

export const POLICY_INTRO =
  'The 402 is an Omaha events-discovery app made by twelve. You can browse without an account. We collect only the information needed to provide the features you choose to use.'

/** The four facts people come to check. The 402 page's fine print shows these too. */
export const POLICY_SHORT = [
  'You can browse without an account.',
  'No ad networks, third-party analytics, tracking SDKs or advertising identifier.',
  'We do not sell personal information or share it for targeted advertising.',
  'You can export or delete your account from Settings.',
]

export type PolicySection = { id: string; question: string; paragraphs: string[] }

export const POLICY_SECTIONS: PolicySection[] = [
  {
    id: 'collect',
    question: 'What does the app collect?',
    paragraphs: [
      'Browsing does not require an account, and we do not build a browsing-history profile for recommendations.',
      'If you create an account, we may store your email; first and last name and username if provided; saved events and places; Interested and Going marks; followed organizers; interests; preferred neighborhoods; starting location; travel distance; and activity-personalization setting.',
      'Our infrastructure providers may generate authentication, technical, service, and security logs needed to operate and protect the service. We do not use those logs for advertising or recommendation ranking.',
    ],
  },
  {
    id: 'use',
    question: 'How do you use my information?',
    paragraphs: [
      'We use account information to create and secure your account, sync your choices, provide requested features, communicate about your account, personalize discovery when you enable it, and operate and protect the service. We do not buy data about you or match your account with data purchased from data brokers.',
    ],
  },
  {
    id: 'location',
    question: 'What happens with my location?',
    paragraphs: [
      'Location is optional. If allowed while using the app, we use your current position to set a starting location and store that point with your account so it can sync across devices and measure distance. We do not create a location history, track where you travel, or access your location while the app is closed. If you decline, you can choose neighborhoods instead.',
      'You can change or clear the stored starting location. We do not provide it to organizers or venues.',
    ],
  },
  {
    id: 'recipients',
    question: 'Who receives information?',
    paragraphs: [
      'We disclose information only as needed to operate the service, provide a feature you request, protect the service, or comply with law. We do not sell it or disclose it for advertising.',
      'Supabase (our host, database and sign-in provider, on servers in the United States) processes account, authentication, and service and security data needed to run the app.',
      'Resend receives the recipient email and message content needed to deliver account emails.',
      'OpenFreeMap serves map content. Network information such as your IP address reaches it when maps load.',
      'Google is involved when you choose Continue with Google for authentication.',
      'Ticket, Directions, and other external links may open third-party services. Their own terms and privacy practices apply.',
    ],
  },
  {
    id: 'sell',
    question: 'Do you sell my information?',
    paragraphs: [
      'No. The 402 does not sell personal information, use it for targeted advertising, or give it to advertisers or ad networks. Service providers receive information only to perform services for the 402.',
    ],
  },
  {
    id: 'kept',
    question: 'How long is information kept?',
    paragraphs: [
      'Account information is kept while your account is active. Event information may remain after an event ends.',
      'Authentication, security, email-delivery, backup, and service-provider records may have separate retention periods needed for security, reliability, legal compliance, or backup operations.',
    ],
  },
  {
    id: 'rights-controls',
    question: 'How do I export, correct, or delete my information?',
    paragraphs: [
      'Settings → Export my data lets you obtain a portable copy. Supported account details can be corrected in the app.',
      'To delete your account, go to You → Settings → Delete account. Your account is deleted right away.',
      'If you no longer have the app, email contact@bytw12ve.com from the account email with the subject "Delete my account." We will process the request and respond within 7 days.',
      'Deletion covers account data under our control, including email, name, username, saves, Interested and Going marks, followed organizers, preferences, and stored starting location. We use available provider controls to delete associated account data held on our behalf where applicable.',
    ],
  },
  {
    id: 'rights',
    question: 'What privacy rights do I have?',
    paragraphs: [
      'Depending on where you live, you may have rights to access, correct, delete, or obtain a copy of personal information and to opt out of certain sale, targeted-advertising, or profiling uses. The 402 does not sell personal information or use it for targeted advertising.',
      'We make export, supported corrections, and deletion available regardless of location. For other requests, email contact@bytw12ve.com. We may verify your identity.',
    ],
  },
  {
    id: 'children',
    question: 'What about children?',
    paragraphs: [
      'The 402 is not intended for children under 13. You must be at least 13 to create an account. We do not knowingly keep an account for a child under 13. A parent or guardian can contact contact@bytw12ve.com.',
    ],
  },
  {
    id: 'security',
    question: 'How do you protect information?',
    paragraphs: [
      'We use reasonable administrative and technical measures appropriate to the service. No internet-connected service can promise perfect security.',
    ],
  },
  {
    id: 'changes',
    question: 'What happens if this policy changes?',
    paragraphs: [
      'If a material change affects how we handle your information, we will provide notice in the app before it takes effect when appropriate.',
    ],
  },
  {
    id: 'contact',
    question: 'How do I contact you?',
    paragraphs: ['The 402 is made by twelve. in Omaha, Nebraska. Email contact@bytw12ve.com.'],
  },
]
