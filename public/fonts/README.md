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

## The 402's faces

Loaded **only** on the 402's routes, by `src/app/(the-402)/layout.tsx` through `src/styles/fonts402.ts`
(`docs/BUILD.md` §Fonts → The 402's faces). Nothing else imports them, so no other route preloads them.

| File | Family | Weight | Size | Source |
| --- | --- | --- | --- | --- |
| `BricolageGrotesque-Variable.woff2` | Bricolage Grotesque | 500–800, width 75–100% (variable `wght`, `wdth`; no `opsz`) | 76 KB | Google Fonts `bricolagegrotesque/v9`, latin subset |
| `InstrumentSans-Variable.woff2` | Instrument Sans | 400–600 (variable `wght`) | 29 KB | Google Fonts `instrumentsans/v4`, latin subset |
| `DMMono-Regular.woff2` | DM Mono | 400 | 8.5 KB | Google Fonts `dmmono/v16`, latin subset |
| `DMMono-Medium.woff2` | DM Mono | 500 | 8.5 KB | Google Fonts `dmmono/v16`, latin subset |

**136 KB together**, inside the 150 KB budget. All SIL Open Font License 1.1. Re-download with:

```
https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wdth,wght@75..100,500..800&display=swap
https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400..600&display=swap
https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap
```

Leaving `opsz` out of the Bricolage request is what drops the optical-size axis from the file.
