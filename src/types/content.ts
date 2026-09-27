/**
 * Content types — docs/BUILD.md §Content Structure.
 *
 * Copy lives in `content/`, typed by these, and never inside a component.
 * Every module declares its data with `satisfies`, so a missing or misspelt
 * field fails `pnpm typecheck`; `src/lib/content.ts` adds the runtime checks
 * a type cannot express (dates, links, uniqueness) and throws at build time.
 */

/** A run of text that may carry a link or emphasis. */
export type Segment =
  | string
  | { text: string; href: string }
  | { text: string; strong: true }
  | { text: string; mark: true }

export type RichText = readonly Segment[]

/**
 * A clause still waiting on Jaycee's answer (docs/DESIGN.md §5.8). Shown in
 * development and preview builds; dropped from production.
 */
export type Pending<T> = { pending: true; value: T; waitingOn: string }

export type MaybePending<T> = T | Pending<T>

export type PageOpener = {
  eyebrow: string
  /** The slab. The purple period is added by the component. */
  title: string
  lede: string
}

export type AppScreen = {
  src: string
  alt: string
  width: number
  height: number
}

export type PlaygroundStatus = 'live' | 'building' | 'concept'

export type PlaygroundVisual = 'keyboard' | 'ledger' | 'game' | 'site'

export type PlaygroundEntry = {
  id: string
  status: PlaygroundStatus
  title: string
  line: string
  /** e.g. "Website · 2025" */
  meta: string
  visual: PlaygroundVisual
  /** Somewhere to go, or a quiet line when there is nowhere. */
  action: { label: string; href: string } | { quiet: string }
}

export type Project = {
  slug: string
  href: string
  number: string
  kind: string
  year: string
  headline: string
  summary: string
  tags: readonly { label: string; hot?: boolean }[]
  cta: string
  screens: readonly [AppScreen, AppScreen]
  draft?: boolean
}

export type HelpPageKey = 'privacy' | 'terms' | 'support' | 'delete-account'

export type HelpSection = {
  id: string
  heading: string
  paragraphs: readonly MaybePending<RichText>[]
}

/**
 * Declares content as exactly `T`: checked like an annotation, and widened to
 * `T` so loaders can take it generically. `satisfies` would keep every literal.
 */
export const typed = <T,>(value: T): T => value
