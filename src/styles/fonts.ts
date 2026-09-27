import localFont from 'next/font/local'

/**
 * Self-hosted faces (docs/BUILD.md §Fonts). Provenance and licence in
 * public/fonts/README.md.
 *
 * Each exposes a CSS variable consumed by tokens.css, so components reference
 * --font-display / --font-editorial / --font-meta and never a family name.
 *
 * The `fallback` and `adjustFontFallback` settings are what keep the swap from
 * shifting layout: Next measures the face and generates a size-adjusted local
 * fallback, so the pre-swap and post-swap text occupy the same space.
 */

export const display = localFont({
  src: [{ path: '../../public/fonts/Figtree-ExtraBold.woff2', weight: '800', style: 'normal' }],
  variable: '--font-display-loaded',
  display: 'swap',
  preload: true,
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
})

export const editorial = localFont({
  // Variable file: one source covers 400 and 500.
  src: [{ path: '../../public/fonts/Archivo-Variable.woff2', weight: '400 500', style: 'normal' }],
  variable: '--font-editorial-loaded',
  display: 'swap',
  preload: true,
  fallback: ['Helvetica Neue', 'Arial', 'sans-serif'],
  adjustFontFallback: 'Arial',
})

export const meta = localFont({
  src: [
    { path: '../../public/fonts/SpaceMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/SpaceMono-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-meta-loaded',
  display: 'swap',
  fallback: ['ui-monospace', 'monospace'],
  /*
   * Preloaded, and it has to be. Dropping it to leave more of a throttled
   * connection for the display face — the LCP element — moved LCP by about a
   * tenth of a second and took CLS from 0 to 0.288: this face sets every label
   * and control in the hero, and swapping it in late resizes all of them. Not
   * a trade worth making.
   */
  preload: true,
})

export const fontVariables = [display.variable, editorial.variable, meta.variable].join(' ')
