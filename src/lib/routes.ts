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
}

export const routes: readonly Route[] = [
  {
    href: '/',
    numeral: '01',
    label: 'Home',
    hint: 'START HERE',
  },
  {
    href: '/work',
    numeral: '02',
    label: 'My work',
    hint: 'FINISHED THINGS',
  },
  {
    href: '/about',
    numeral: '03',
    label: 'About',
    hint: "WHO'S MAKING THIS",
  },
  {
    href: '/playground',
    numeral: '04',
    label: 'Playground',
    hint: 'EVERYTHING ELSE',
  },
  {
    href: '/contact',
    numeral: '05',
    label: 'Contact',
    hint: 'SAY HI',
  },
] as const
