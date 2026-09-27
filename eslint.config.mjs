import js from '@eslint/js'
import next from 'eslint-config-next'

const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  js.configs.recommended,
  ...next,
  {
    // The canonical host is declared once, in src/lib/site.ts (docs/BUILD.md §SEO).
    // scripts/check-domain.mjs enforces this across the whole tree, including
    // files ESLint never sees; this rule surfaces the same mistake in the editor.
    files: ['src/**/*.{ts,tsx}'],
    ignores: ['src/lib/site.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'Literal[value=/bytw12ve/]',
          message: 'The domain is declared once, in src/lib/site.ts. Import `site` instead.',
        },
      ],
    },
  },
]

export default config
