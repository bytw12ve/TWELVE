import type { NextConfig } from 'next'

// Twelve is statically rendered with no server runtime (docs/BUILD.md §Framework).
// Keep this file minimal: every addition here is a decision that belongs in docs/BUILD.md first.
const nextConfig: NextConfig = {
  trailingSlash: false,
  poweredByHeader: false,
}

export default nextConfig
