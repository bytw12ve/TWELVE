import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Playground',
}

/**
 * Stage 1 placeholder. The designed page arrives in Stage 4 — see
 * docs/DESIGN.md §5 and twelve-design/screens/PagePlayground.png.
 */
export default function PlaygroundPage() {
  return (
    <>
      <h1>Playground</h1>
      <p>Placeholder. This page is built in Stage 4.</p>
    </>
  )
}
