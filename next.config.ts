import type { NextConfig } from 'next'

// Twelve is statically rendered with no server runtime (docs/BUILD.md §Framework).
// Keep this file minimal: every addition here is a decision that belongs in docs/BUILD.md first.

// The 402's public event pages live in The 402's own web app, which has the data layer this
// site does not (docs/BUILD.md §Routing). It serves them under the same /402 prefix, so they
// are forwarded path for path and the address bar keeps this site's host.
const THE_402_EVENT_PAGES = 'https://the-402-web.vercel.app'

const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  async redirects() {
    return [
      // The Playground became Side projects at /projects (docs/BUILD.md §Routing). The old
      // address stays working for anyone who saved or shared it.
      { source: '/playground', destination: '/projects', permanent: true },
      // /402 alone was a 404. Temporary, so it can become a real page later.
      { source: '/402', destination: '/work/the-402', permanent: false },
    ]
  },
  async rewrites() {
    // Exactly two prefixes: the pages, and the assets they load. Every other /402 route is
    // Twelve's own and is never forwarded.
    return [
      { source: '/402/events/:path*', destination: `${THE_402_EVENT_PAGES}/402/events/:path*` },
      { source: '/402/_next/:path*', destination: `${THE_402_EVENT_PAGES}/402/_next/:path*` },
    ]
  },
}

export default nextConfig
