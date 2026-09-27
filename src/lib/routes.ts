/**
 * The site's route table — one source for the nav, the menu and anything else
 * that needs to enumerate routes.
 *
 * docs/DESIGN.md §3 defines the five primary routes; §6.2 fixes the menu's
 * numerals and hint copy, which are reproduced here verbatim. Keeping them in
 * one place is what makes "the menu reaches every route from every page"
 * (docs/BUILD.md §Stage 1) true by construction rather than by inspection.
 */
export type Route = {
  href: string
  /** Menu numeral, docs/DESIGN.md §6.2. */
  numeral: string
  label: string
  /** Right-aligned menu hint, verbatim from docs/DESIGN.md §6.2. */
  hint: string
  /** In the inline nav shortcut (docs/DESIGN.md §3). Home and Contact are menu-only. */
  inNav: boolean
}

export const routes: readonly Route[] = [
  {
    href: '/',
    numeral: '01',
    label: 'Home',
    hint: 'START HERE',
    inNav: false,
  },
  {
    href: '/work',
    numeral: '02',
    label: 'Work',
    hint: 'FINISHED THINGS',
    inNav: true,
  },
  {
    href: '/about',
    numeral: '03',
    label: 'About',
    hint: 'WHO AND WHY',
    inNav: true,
  },
  {
    href: '/playground',
    numeral: '04',
    label: 'Playground',
    hint: 'UNFINISHED THINGS',
    inNav: true,
  },
  {
    href: '/contact',
    numeral: '05',
    label: 'Contact',
    hint: 'SAY HELLO',
    inNav: false,
  },
] as const

/** The inline nav is a shortcut, not the whole navigation — docs/DESIGN.md §3. */
export const navRoutes = routes.filter((route) => route.inNav)
