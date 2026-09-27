import { site } from '@/lib/site'
import type { PlaygroundEntry } from '@/types/content'

/**
 * The Playground's entries — real projects only (docs/DESIGN.md §5.3).
 * An entry without somewhere to go has a quiet line instead of a link, and
 * its card is not interactive.
 */
export const playground = [
  {
    id: 'keeb-wiki',
    status: 'live',
    title: 'keeb.wiki',
    line: 'A place to share and browse mechanical keyboard builds, made for the keyboard community.',
    meta: 'Website · 2025',
    visual: 'keyboard',
    action: { label: 'Visit site', href: 'https://keeb.wiki' },
  },
  {
    id: 'ledger-coffee',
    status: 'concept',
    title: 'Ledger Coffee',
    line: 'A website for a made-up coffee shop in an old brick warehouse. I made it to try out a darker, heavier style.',
    meta: 'Website concept · 2026',
    visual: 'ledger',
    action: { quiet: 'Page coming soon' },
  },
  {
    id: 'untitled-game',
    status: 'building',
    title: 'Untitled game',
    line: "A game built around an idea I haven't seen anyone try yet. That's all I'm saying for now.",
    meta: 'Game · starting soon',
    visual: 'game',
    action: { quiet: 'Nothing to play yet' },
  },
  {
    id: 'this-website',
    status: 'live',
    title: 'This website',
    line: "The site you're on. The stars on the homepage move when you do, and the pixel world is drawn fresh by code.",
    meta: 'Website · 2026',
    visual: 'site',
    action: { label: 'Go to the homepage', href: site.url },
  },
] as const satisfies readonly PlaygroundEntry[]
