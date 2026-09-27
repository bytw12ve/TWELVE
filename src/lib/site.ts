/**
 * The only place the Twelve domain appears (docs/BUILD.md §SEO).
 *
 * Metadata, sitemap.ts, robots.ts, the OG image routes, JSON-LD and the footer
 * all read from here. A literal domain anywhere else in the codebase is a bug —
 * scripts/check-domain.mjs fails the build on one.
 */
export const site = {
  url: 'https://bytw12ve.com', // canonical origin, apex, no trailing slash
  name: 'Twelve',
  title: 'Twelve — Creative studio for digital things worth making',
  description:
    'Twelve is a creative studio for digital things worth making — apps, websites, games, products and experiments.',
  email: 'contact@bytw12ve.com',
  location: 'Omaha, NE',
  socials: {
    // A social without a URL renders as plain text, never as a link to
    // nowhere — the "non-interactive by design" state in docs/DESIGN.md §7.1.
    github: 'https://github.com/bytw12ve/TWELVE',
  },
} as const

export const absoluteUrl = (path = '/') => new URL(path, site.url).toString()
