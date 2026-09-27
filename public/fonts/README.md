# Fonts

Self-hosted per `docs/BUILD.md` §Fonts. Declared in `src/styles/fonts.ts` via `next/font/local`;
nothing loads from a third-party origin at runtime.

| File | Family | Weight | Source |
| --- | --- | --- | --- |
| `Figtree-ExtraBold.woff2` | Figtree | 800 | Google Fonts `figtree/v9`, latin subset |
| `Archivo-Variable.woff2` | Archivo | 400–500 (variable `wght`) | Google Fonts `archivo/v25`, latin subset |
| `SpaceMono-Regular.woff2` | Space Mono | 400 | Google Fonts `spacemono/v17`, latin subset |
| `SpaceMono-Bold.woff2` | Space Mono | 700 | Google Fonts `spacemono/v17`, latin subset |

All four are SIL Open Font License 1.1, which permits redistribution including bundling with a
web application.

**Four files, not five.** Figtree and Archivo are served as variable fonts, so one file covers
each family's weight range — requesting Archivo 400 and 500 returns the same URL twice. Space
Mono is static and needs one file per weight.

**Figtree is a stand-in** for a custom display face (`docs/DESIGN.md` §1.3). Because every size
is a token, replacing it means swapping this file and re-checking the scale — not touching
components. That is why the loading mechanism is `next/font/local` rather than
`next/font/google`: the real face will never come from Google.

## Re-downloading

Google serves a different subset file per requested weight range, so fetch the exact ranges
above:

```
https://fonts.googleapis.com/css2?family=Figtree:wght@800&display=swap
https://fonts.googleapis.com/css2?family=Archivo:wght@400;500&display=swap
https://fonts.googleapis.com/css2?family=Space+Mono:wght@400&display=swap
https://fonts.googleapis.com/css2?family=Space+Mono:wght@700&display=swap
```

Request with a modern browser User-Agent — Google returns TTF to unknown agents — and take the
`latin` block's URL from each.
