import type { Metadata } from 'next'
import { ViewTransition, type ReactNode } from 'react'

import { FooterBar } from '@/components/layout/FooterBar'
import { NavBar } from '@/components/layout/NavBar'
import { site } from '@/lib/site'
// Imported for its side effect: every build validates the content layer and
// fails on a malformed entry (docs/BUILD.md §Stage 3).
import '@/lib/content'
import { fontVariables } from '@/styles/fonts'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
}

/**
 * NavBar, MenuOverlay (inside NavBar) and FooterBar live here so they mount
 * once and survive navigation — docs/BUILD.md §Component Architecture.
 *
 * Landmarks per docs/DESIGN.md §8: header, main, footer, plus the menu's own
 * nav. The skip link is the first focusable element on every page.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <NavBar />
        <main id="main" tabIndex={-1}>
          {/*
            docs/DESIGN.md §7.3: only the page's content transitions. The nav
            and footer sit outside this boundary, and the document itself has
            no view-transition name (globals.css), so they never move.
          */}
          <ViewTransition default="page">{children}</ViewTransition>
        </main>
        <FooterBar />
      </body>
    </html>
  )
}
