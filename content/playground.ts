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
    title: 'keebwiki',
    line: 'Like PCPartPicker, but for custom mechanical keyboards. Post your build, browse what other people have made, and pick up tips from the community, all in one place.',
    meta: 'Website · 2025',
    visual: 'keyboard',
    action: { quiet: 'Page coming soon' },
  },
  {
    id: 'ledger-coffee',
    status: 'concept',
    title: 'Ledger Coffee',
    line: 'A concept I made for fun: the website for a coffee shop that doesn’t exist, inspired by the old brick warehouses of downtown Omaha. I used it to try a darker, heavier style than I usually go for.',
    meta: 'Website concept · 2026',
    visual: 'ledger',
    action: { quiet: 'Page coming soon' },
  },
  {
    id: 'wake',
    status: 'building',
    title: 'wake.',
    line: 'A psychological mystery game. You slowly realize your life is a simulation, and something is trying to stop you from waking up. I’m still choosing the platform.',
    meta: 'Game · starting 2027',
    visual: 'game',
    action: { quiet: 'Nothing to play yet' },
  },
  {
    id: 'this-website',
    status: 'live',
    title: 'This website',
    line: 'The site you’re looking at. The stars on the homepage react to your cursor, and the pixel landscape is drawn entirely in code instead of being an image.',
    meta: 'Website · 2026',
    visual: 'site',
    action: { label: 'Go to the homepage', href: site.url },
  },
] as const satisfies readonly PlaygroundEntry[]
