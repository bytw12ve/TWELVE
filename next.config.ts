import type { NextConfig } from 'next'

// Twelve is statically rendered with no server runtime (docs/BUILD.md §Framework).
// Keep this file minimal: every addition here is a decision that belongs in docs/BUILD.md first.
const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
  // The Playground became Side projects at /projects (docs/BUILD.md §Routing). The old
  // address stays working for anyone who saved or shared it.
  async redirects() {
    return [{ source: '/playground', destination: '/projects', permanent: true }]
  },
}

export default nextConfig
