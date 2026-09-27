/**
 * The 402's privacy policy, word for word.
 *
 * The source is the app's own policy — `apps/mobile/src/features/legal/policy.ts`
 * in the 402's repository — and the web page must say exactly what the app
 * says (docs/BUILD.md §Content Structure). The words change there first, then
 * here. `pnpm policy:check` compares the two when the app's repository is
 * checked out beside this one.
 *
 * This file is exempt from `pnpm domain:check`: the policy names its contact
 * address, and a verbatim copy cannot swap it for a constant.
 */

export const POLICY_VERSION = 'v1.0';

export const POLICY_UPDATED = 'September 14, 2026';

export const POLICY_INTRO =
  'The 402 works without knowing who you are. This is the whole policy, in the order people ask about it.';

export const POLICY_SHORT = [
  'No advertising, and no ad networks in the app.',
  'No third-party analytics, no tracking SDKs, no advertising identifier.',
  'We do not sell your personal information or share it for anyone’s marketing.',
  'You can export or delete your account, and everything on it, from Settings.',
];

export type PolicySection = { id: string; question: string; paragraphs: string[] };

export const POLICY_SECTIONS: PolicySection[] = [
  {
    id: 'collect',
    question: 'What does the app collect?',
    paragraphs: [
      'Browsing needs no account. You can open the app, read Today, search, filter and open any event, venue or organizer without signing in, and we do not build a browsing-history profile.',
      'An account is something you create deliberately, with an email address and a password. Nothing creates one for you.',
      'Once you have one, it holds your email address; your first and last name and your username, if you enter them; the events and places you save; the events you mark yourself Interested or Going to; the organizers you follow; and your preferences — your interests, preferred neighbourhoods, starting location, travel distance and whether you want activity personalization.',
      'Your chosen interests and preferred neighbourhoods help order discovery. If you turn on activity personalization, your retained saves, Interested and Going choices, and followed organizers also influence recommendations. Removing an action removes its influence; turning this preference off stops activity-based ranking without deleting your actions. We do not collect browsing history for recommendations.',
      'Those preferences are stored on our servers with the rest of your account, not only on your phone, because they have to follow you to a new device. Your starting location is stored as coordinates. That is the piece most worth knowing, so it has its own section below.',
      'We do not buy data about you, and we do not match your account against other services.',
      'Our host keeps service and security logs to run the app and investigate problems or abuse. Requests made while signed in carry your account session, and authentication logs can identify the account involved. We do not use these logs to rank recommendations.',
    ],
  },
  {
    id: 'location',
    question: 'What happens with my location?',
    paragraphs: [
      'The app asks for location twice at most: once during setup, when it offers to work out where you are starting from, and once when you first open Nearby. Both ask only for the "while using the app" permission.',
      'If you allow it, we take your position once and store it as your starting location, so the app can measure distance from it.',
      'It is a point on a map, not a history. We do not follow you, we do not record where you go, and the app cannot see your location when it is closed.',
      'If you decline, nothing breaks. You pick neighbourhoods instead and the rest of the app works the same way.',
      'You can change or clear your starting location at any time from your account, and turning the permission off in your phone’s settings does not affect anything you have saved.',
      'Your location is never shared with organizers or venues.',
    ],
  },
  {
    id: 'others',
    question: 'Who else sees any of it?',
    paragraphs: [
      'These services help run the app.',
      'Our host runs the database and the sign-in, on servers in Oregon, in the United States. They hold your account because they hold everything.',
      'Resend delivers account emails, including confirmation and password-reset codes. It receives the recipient email address and the contents of those messages to deliver them.',
      'Our map provider serves the map tiles. When a map loads, your IP address reaches them, the same as visiting any website. They are not told who you are or what you were looking for.',
      'Google, only if you choose to continue with Google, and only to confirm it is you.',
      'Tapping a ticket link or Directions opens somebody else’s app or website, which has its own policy. We pass nothing about you along with the tap.',
      'We do not sell personal information and we do not share it for cross-context behavioural advertising, as those terms are defined under applicable state law. We disclose information to law enforcement only in response to valid legal process, and we will tell the person affected unless we are prohibited from doing so.',
    ],
  },
  {
    id: 'kept',
    question: 'How long is it kept?',
    paragraphs: [
      'Your account and everything on it is kept until you delete it.',
      'Events stay in the app after they happen, so you can look back at what was on. That is deliberate, and it includes events you said you were going to.',
    ],
  },
  {
    id: 'delete',
    question: 'How do I delete everything?',
    paragraphs: [
      'Open your account and choose Delete account. It asks for your password, then removes your account immediately — there is no request form and nothing to wait for.',
      'That takes your email address, your name, your username, your saved events and places, your Interested and Going marks, the organizers you follow and your preferences.',
      'It cannot be undone and we cannot recover any of it for you. You can make a new account with the same email address afterwards; it starts empty.',
      'Settings → Export my data gives you a copy of all of it first, as a file another program can read.',
    ],
  },
  {
    id: 'rights',
    question: 'What rights do I have?',
    paragraphs: [
      'Depending on where you live you may have the right to see what we hold, correct it, delete it, and not be treated differently for asking.',
      'We extend all of those to everyone. Export my data and Delete account in Settings are the fastest way to use them, and they cover everything we hold. For anything else, write to us.',
      'The 402 is not intended for children under 13, and we do not knowingly keep an account for one. If you think a child has made one, tell us and it will be removed.',
    ],
  },
  {
    id: 'changes',
    question: 'When this changes, and how to reach a person',
    paragraphs: [
      'If this policy changes in a way that affects you, a notice appears on this screen before the change takes effect.',
      'Questions go to contact@bytw12ve.com and are answered by a person.',
      'The 402 is made by twelve.',
    ],
  },
];
