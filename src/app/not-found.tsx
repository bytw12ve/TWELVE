import Link from 'next/link'

/**
 * Handler for unknown URLs. Deliberately bare: the designed 404
 * (docs/DESIGN.md §5.6, twelve-design/screens/NotFoundDesktop.png) is Stage 6's.
 *
 * This is not a navigable route — nothing links to it, and `/not-found` is not
 * a path. It renders inside the shell, so the nav and menu remain available.
 */
export default function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <p>
        That page does not exist. <Link href="/">Back to the homepage</Link>.
      </p>
    </>
  )
}
