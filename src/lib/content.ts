import { contactPage } from '@content/pages/contact'
import { playground } from '@content/playground'
import { deleteAccountPage, helpCommon, supportPage, termsPage } from '@content/the-402/help'
import { BETA_OPENS, the402Page } from '@content/the-402/page'
import { projects } from '@content/work'

import type { MaybePending, Pending, PlaygroundEntry, Project, RichText } from '@/types/content'

/**
 * Content loaders — docs/BUILD.md §Content Structure.
 *
 * Two jobs a type cannot do:
 *   1. drop what is not ready — `draft` entries everywhere, and `pending`
 *      clauses from production builds (docs/DESIGN.md §5.8);
 *   2. validate the content at build time, so a malformed entry fails the
 *      build instead of rendering broken (docs/BUILD.md §Stage 3).
 */

/** Production is Vercel's production deployment, nothing else. Previews show pending text. */
export const isProduction = process.env.VERCEL_ENV === 'production'

export const isPending = <T>(value: MaybePending<T>): value is Pending<T> =>
  typeof value === 'object' && value !== null && 'pending' in value && value.pending === true

/**
 * Resolve a list that may hold pending clauses: in production they are left
 * out; elsewhere they are kept and flagged so the page can highlight them.
 */
export function resolvePending<T>(
  items: readonly MaybePending<T>[],
  production = isProduction,
): { value: T; pending: boolean }[] {
  return items.flatMap((item): { value: T; pending: boolean }[] => {
    if (!isPending(item)) return [{ value: item, pending: false }]
    return production ? [] : [{ value: item.value, pending: true }]
  })
}

// ---------------------------------------------------------------------------
// Validation. Runs once, when this module is first imported during the build.

class ContentError extends Error {
  constructor(where: string, problem: string) {
    super(`content: ${where} — ${problem}`)
  }
}

const isInternal = (href: string) => /^\/[a-z0-9\-/#]*$/i.test(href)
const isExternal = (href: string) => /^(https:\/\/|mailto:)/.test(href)

function checkHref(where: string, href: string) {
  if (!isInternal(href) && !isExternal(href))
    throw new ContentError(where, `"${href}" is not an internal path, https URL or mailto`)
}

function checkRich(where: string, text: RichText) {
  if (text.length === 0) throw new ContentError(where, 'empty text')
  for (const segment of text) {
    if (typeof segment === 'string') continue
    if (!segment.text.trim()) throw new ContentError(where, 'empty segment')
    if ('href' in segment) checkHref(where, segment.href)
  }
}

function checkUnique(where: string, ids: readonly string[]) {
  const seen = new Set<string>()
  for (const id of ids) {
    if (seen.has(id)) throw new ContentError(where, `duplicate id "${id}"`)
    seen.add(id)
  }
}

function checkScreen(where: string, s: { src: string; width: number; height: number; alt: string }) {
  if (!/^\/work\/[a-z0-9-]+\/[a-z0-9-]+\.(png|webp|jpg)$/.test(s.src))
    throw new ContentError(where, `screen "${s.src}" is not under /work/<slug>/`)
  if (!(s.width > 0 && s.height > 0)) throw new ContentError(where, 'screen needs its dimensions')
}

export function validateContent() {
  checkUnique('work', projects.map((p) => p.slug))
  for (const p of projects as readonly Project[]) {
    checkHref(`work/${p.slug}`, p.href)
    if (!/^\d{4}$/.test(p.year)) throw new ContentError(`work/${p.slug}`, `year "${p.year}"`)
    p.screens.forEach((s) => checkScreen(`work/${p.slug}`, s))
  }

  checkUnique('playground', playground.map((e) => e.id))
  for (const e of playground as readonly PlaygroundEntry[]) {
    if (!e.title.trim() || !e.line.trim()) throw new ContentError(`playground/${e.id}`, 'empty text')
    if ('href' in e.action) checkHref(`playground/${e.id}`, e.action.href)
  }

  if (Number.isNaN(Date.parse(BETA_OPENS))) throw new ContentError('the-402', `BETA_OPENS "${BETA_OPENS}"`)
  for (const stop of the402Page.tour) {
    checkScreen(`the-402/tour/${stop.step}`, stop.screen)
    stop.notes.forEach((n) => checkRich(`the-402/tour/${stop.step}`, n))
  }
  checkRich('the-402/why', the402Page.why.quote)
  if (the402Page.fine.points.length !== 4)
    throw new ContentError('the-402/fine', 'the fine print shows four points')
  for (const link of the402Page.fine.links) checkHref('the-402/fine', link.href)

  checkUnique('terms', termsPage.sections.map((s) => s.id))
  for (const section of termsPage.sections)
    for (const p of section.paragraphs) checkRich(`terms/${section.id}`, isPending(p) ? p.value : p)
  supportPage.faq.forEach((f, i) => checkRich(`support/faq/${i}`, f.a))
  checkUnique('delete-account', deleteAccountPage.sections.map((s) => s.id))
  for (const section of deleteAccountPage.sections)
    section.paragraphs?.forEach((p, i) => checkRich(`delete-account/${section.id}/${i}`, p))
  for (const link of helpCommon.links) checkHref('help/links', link.href)
  for (const link of contactPage.columns.online.links) checkHref('contact/online', link.href)
}

validateContent()

// ---------------------------------------------------------------------------
// Loaders.

export const publishedProjects = (): readonly Project[] =>
  (projects as readonly Project[]).filter((p) => !p.draft)

export const playgroundEntries = (): readonly PlaygroundEntry[] => playground
