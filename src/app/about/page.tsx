import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
}

/**
 * Stage 1 placeholder. The designed page arrives in Stage 4 — see
 * docs/DESIGN.md §5 and twelve-design/screens/AboutDesktop.png.
 */
export default function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Placeholder. This page is built in Stage 4.</p>
    </>
  )
}
