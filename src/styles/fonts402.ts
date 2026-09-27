import localFont from 'next/font/local'

/**
 * The 402's own faces (docs/DESIGN.md §1.5, docs/BUILD.md §Fonts). Imported
 * only by src/app/(the-402)/layout.tsx, so no other route preloads them.
 * Each exposes a --font-the402-*-loaded variable that the skin maps onto the
 * --font-the402-* stacks in tokens.css.
 */

export const the402Display = localFont({
  src: [
    {
      path: '../../public/fonts/BricolageGrotesque-Variable.woff2',
      weight: '500 800',
      style: 'normal',
    },
  ],
  variable: '--font-the402-display-loaded',
  display: 'swap',
  preload: true,
  fallback: ['Helvetica Neue', 'Helvetica', 'sans-serif'],
  adjustFontFallback: 'Arial',
  declarations: [{ prop: 'font-stretch', value: '75% 100%' }],
})

export const the402Sans = localFont({
  src: [{ path: '../../public/fonts/InstrumentSans-Variable.woff2', weight: '400 600', style: 'normal' }],
  variable: '--font-the402-sans-loaded',
  display: 'swap',
  preload: true,
  fallback: ['Helvetica Neue', 'Helvetica', 'sans-serif'],
  adjustFontFallback: 'Arial',
})

export const the402Mono = localFont({
  src: [
    { path: '../../public/fonts/DMMono-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/DMMono-Medium.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-the402-mono-loaded',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'monospace'],
})

export const the402FontVariables = [the402Display.variable, the402Sans.variable, the402Mono.variable].join(' ')
