# Twelve Build Plan

This file is the implementation foundation for Twelve.

The major technical choices are now made. Where a decision is recorded here, treat it as settled — if you disagree, flag the conflict and say why, do not silently choose something else.

Design rules live in `docs/DESIGN.md` and win on anything visual. This file covers how the site is built, not how it looks.

Visual reference lives in `references/` — rendered screens, the live HTML previews they came from, and `tokens.json`. Start there for anything that needs to *look* right; `references/README.md` indexes it.

## Build Status

`docs/STATE.md` holds the live status; this file holds the rules.

Approved: the homepage (built, Stage 2), the **Pages v2** designs of 2026-09-26 — My work, About, Playground, Contact, the 402 page and its four help pages — the 404 and case-study designs, `docs/DESIGN.md`, and the decisions in this file. Pages v2's design source is `twelve-design/pages-v2/`; `references/` carries its screens.

## Framework

**Decision: Next.js (App Router) + TypeScript + React.**

Why, against the criteria in the original plan:

- **SEO** — the metadata API, generated sitemap and OG images, and static rendering give crawlable HTML without extra work. `docs/BUILD.md`'s rule against client-only rendering for SEO content is satisfied by default.
- **Routing** — file-based routes grow into `/work/[project]` without a routing library.
- **Future products** — room for a product page, a changelog, or a subdomain app without re-platforming.
- **Deployment** — first-class on Vercel.

Every page is **statically rendered**. There is no database and no server-rendered page.

**One deliberate exception: `POST /api/beta`** (Pages v2, Jaycee's decision, 2026-09-26). The 402's beta signup needs somewhere to send an email address and a phone platform, so one route handler receives the form and emails it to the studio through Resend — see §Contact. It is the only server code in the project. Anything further that needs a server is another deliberate decision, recorded here first.

## Styling

**Decision: CSS Modules over a global design-token layer. No Tailwind.**

- `src/styles/tokens.css` declares every token from `docs/DESIGN.md` §1 as a CSS custom property. It is the only place raw values appear.
- Each component owns a `.module.css` next to it, consuming tokens via `var(--…)`.
- Raw hex, px sizes, or one-off radii in a component are a bug. The token layer is the contract.

Rationale: the design system is precise and unusual (220px display type, exact hex, a hand-tuned scale). A utility framework would bury those decisions in class strings and make `docs/DESIGN.md` harder to verify against the code. CSS Modules keep the mapping one-to-one and legible to whoever — or whatever — reads the file next.

This is reversible if it turns out to hurt; nothing else depends on it.

## Routing

```
/                      Home — hero, footer
/work                  My work — finished, public projects
/work/the-402          The 402 — a one-off page in the 402's own skin
/work/[project]        Case study template — deferred (see below)
/about                 About
/playground            Playground
/contact               Contact
/402/privacy           The 402 — privacy policy
/402/terms             The 402 — terms of service
/402/support           The 402 — support
/402/delete-account    The 402 — delete your account
/api/beta              POST only — the beta signup (§Contact)
not-found.tsx          404
```

- Playground entries have **no detail route**. A card links to the live thing, its repo, or nothing.
- **`/work/the-402` is a static route, not an instance of `/work/[project]`** (Jaycee's decision, 2026-09-26). The 402 has its own design, and its layout does not fit the case-study template. A static segment wins over the dynamic one, so both can coexist when the template is built.
- **The 402's routes live in a route group, `src/app/(the-402)/`**, whose layout loads the 402's three font families and nothing else does (§Fonts). The group does not appear in URLs.
- **The help pages sit under `/402/`**, on `bytw12ve.com`, not a separate domain — Jaycee's choice. The paths are printed on the pages and submitted to both app stores, so **they are permanent**: never rename them.
- **When each route is built:** see §Build Stages. `/work/[project]` is **deferred** until a second finished project exists; the designed 404 is Stage 6.
- Project slugs come from the content directory; `generateStaticParams` enumerates them at build.
- Trailing slashes off. Unknown `/work/*` slugs render the 404.

## Content Structure

**Decision: file-based content, separate from presentation. No CMS.**

```
content/
  pages/                 copy for My work, About, Playground and Contact
  work.ts                the finished projects My work lists (today: the 402)
  playground.ts          typed array — entries need metadata, not bodies
  the-402/
    page.ts              every string on /work/the-402, and BETA_OPENS
    privacy.ts           the app's policy, word for word (below)
    terms.ts · support.ts · delete-account.ts
types/content.ts         the content types and their shared unions
```

**Revised for Pages v2 (2026-09-26).** The original plan was one MDX file per project, rendered by the case-study template. The template is deferred, and every page being built now is structured — sections, lists, cards, questions — rather than long-form prose, so the content is **typed TypeScript modules**. MDX (`gray-matter`, `next-mdx-remote/rsc`) comes in with the case-study template, when a project first has a body to render. Neither dependency is added before then.

- **Copy is verbatim from `twelve-design/pages-v2/prototype/index.html`**, which Jaycee approved line by line. It lives here and never inside a component. New copy — a loading state, an error message — is proposed to Jaycee before it ships.
- `kind` is a union type, not a free string, so kind labels stay consistent.
- Playground entries are a typed array — status (`live` · `building` · `concept`), title, line, kind label, date, and an optional link. An entry with no link is the non-interactive card `docs/DESIGN.md` §5.3 describes. Filter counts and page labels are derived, never typed.
- `draft: true` excludes an entry from the build, navigation and the sitemap.
- **`pending`** marks a clause, or a whole page, that is waiting on Jaycee's answer (`docs/DESIGN.md` §5.8). Development and preview builds render it highlighted; a production build (`VERCEL_ENV=production`) leaves a pending clause out, and leaves out a page marked pending entirely. Nothing highlighted ever reaches production.
- Images live in `public/work/<slug>/`. The 402's app screens are **real Simulator captures** from `twelve-design/pages-v2/app-screens/`.
- **This repository is public: never commit an image or file that carries an embedded provenance tag** (C2PA, or tool metadata naming how it was generated), and never strip one either. Check before adding any binary: `strings <file> | grep -iE "c2pa|provenance"` must be empty. Files that fail stay in the private design repository.
- **Literal domains stay out of content.** The help pages print their own address and the contact email; both are built from `src/lib/site.ts`, so `pnpm domain:check` still holds.

**The privacy policy has one source, and it is not this repository.** The web policy must match the in-app policy word for word, and Jaycee chose the app's text: `apps/mobile/src/features/legal/policy.ts` in the 402's repository. `content/the-402/privacy.ts` copies its exports (`POLICY_VERSION`, `POLICY_UPDATED`, `POLICY_INTRO`, `POLICY_SHORT`, `POLICY_SECTIONS`) with the same names and shape. `scripts/check-402-policy.mjs` compares the two whenever the app repository is checked out beside this one and fails on any difference; CI, which has no copy of the app, skips it and says so. **The words change in the app first**, then here. The 402 page's fine print is `POLICY_SHORT` from the same module, not its own copy.

A future product page would add `content/products/` following the same shape. Do not introduce a CMS to solve a problem we do not have yet.

## SEO

- Per-route `metadata` exports: title, description, canonical, Open Graph, Twitter card.
- Title template: `%s — Twelve`; home is `Twelve — Creative studio for digital things worth making`.
- `app/sitemap.ts` and `app/robots.ts` generated from the route list plus the content directory.
- OG images generated at build with `next/og` from the brand composition (dark ground, brand dot, wordmark). One per route, one per project.
- JSON-LD: `Organization` on the homepage, `CreativeWork` on each project page.
- Semantic heading order: one `h1` per page (the opener slab; on the homepage, the wordmark), `h2` for sections, no skips.
- **Canonical host: `https://bytw12ve.com`** — the apex, no `www`. `www.bytw12ve.com` 301-redirects to it at the Vercel level. Canonical tags, OG URLs and the sitemap must all use the same host the site is served from, or they cancel each other out.
- The host is declared **once**, in `src/lib/site.ts`, and nothing else hard-codes it:

```ts
// src/lib/site.ts — the only place the domain appears
export const site = {
  url: 'https://bytw12ve.com',          // canonical origin, no trailing slash
  name: 'Twelve',
  title: 'Twelve — Creative studio for digital things worth making',
  description: '…',
  email: 'contact@bytw12ve.com',
  location: 'Omaha, NE',
  socials: { instagram: '…', github: '…' },
} as const

export const absoluteUrl = (path = '/') => new URL(path, site.url).toString()
```

  Metadata, `sitemap.ts`, `robots.ts`, OG image routes, JSON-LD and the footer all read from `site`. Changing domain later is editing one line — **if a reviewer sees a literal domain anywhere else in the codebase, that is a bug**.

## Accessibility

Non-negotiable, and verified before launch:

- Semantic HTML; the menu is a `nav` with focus trapping, `Escape` to close, `inert` on the page behind, and focus returned to the MENU pill on close.
- Visible focus on everything interactive: 2px `focus-dark` on dark, `focus-light` on paper, 3px offset. Never removed.
- Touch targets ≥ 44×44px, including the MENU pill, menu rows and index rows.
- Heading order correct; landmarks present (`header`, `main`, `nav`, `footer`).
- The star field is decorative: `aria-hidden`, not focusable, no semantics.
- **The two hero knockout layers are `aria-hidden`** — they are duplicate copies of "twelve." and would otherwise be announced three times.
- The pixel landscape carries a real alt description; decorative SVG is hidden.
- Work rows and index rows are a single link each — no nested interactive elements.
- `prefers-reduced-motion: reduce` removes the hero pin, the reveal, the twinkle, the cursor response and page transitions. The site must be complete and usable with every animation off.

## Motion and Interaction

Settled (see `docs/DESIGN.md` §4.0 and §7):

- **Homepage scroll** — the hero fills the viewport and holds a short pinned phase (10–20vh, tuned by feel — `docs/DESIGN.md` §4.0) while the navigation tray transitions in beneath it. After the pin releases, scrolling is ordinary. No snap points, no scroll hijacking, no delay on anyone trying to leave.
- Under reduced motion: no pin, no animated reveal, plain stacked layout.
- `VIEW WORK` navigates to `/work`. It is not the reveal trigger.
- Menu: 420ms open / 320ms close, pill cross-fades into CLOSE in place.
- Page transitions: 160ms out, 320ms in; nav and footer do not participate. **Owned by Stage 4** — they are built and validated when the routes carry real content, because a transition between two placeholder pages proves nothing. Stage 1 builds the shell they run inside and deliberately does not implement them.

Implementation notes:

- Prefer CSS for the pin (`position: sticky`) over scroll listeners. Where JS is unavoidable, use `IntersectionObserver`, never a scroll handler that runs layout on every frame.
- Every motion path reads one `useReducedMotion` source of truth, not scattered media queries.

## Performance

**Open blocker — LCP.** Measured **2.3s against the < 2.0s target** on a throttled mobile profile, stable across runs, with Performance 98, CLS 0 and TBT 0ms. It is recorded here rather than resolved.

What has been tried and what it bought: collapsing the pixel art to one path per colour took LCP from 2.7s to 2.3s and TBT from 130ms to 0. Unpreloading the meta face bought 0.1s and cost 0.288 of CLS — reverted. A 996-byte critical subset of the display face, covering just the wordmark's six glyphs, moved LCP **not at all** — so the metric is not bound by the font's bytes, and the subset was reverted rather than kept as complexity that buys nothing.

Ruled out by Jaycee: `font-display: optional` and outlining the wordmark, both of which weaken the brand for a fraction of a second. **This is left open for whenever the real custom display face replaces the Figtree stand-in (`docs/DESIGN.md` §1.3), which changes the picture anyway.** The performance table below is a Stage 7 release gate; this must be closed before then.

**Targets** (enforced before launch, measured on a mobile profile):

| Metric | Target |
| --- | --- |
| Lighthouse Performance | ≥ 95 |
| LCP | < 2.0s |
| CLS | < 0.05 |
| INP | < 200ms |
| First-load JS, homepage | ≤ 60KB gzipped **of Twelve's own code** |
| First-load JS, inner pages | ≤ 40KB gzipped **of Twelve's own code** |

### The JS budget is measured on top of a recorded framework baseline

Measured during Stage 0, 2026-09-20: **an empty Next 16 App Router route — static markup, no client components, no Twelve code — already ships 130.3 KB gzipped of React and router runtime.** The 60/40 figures above therefore cannot be absolute totals; they are what Twelve is allowed to *add*.

- **Locked framework version:** Next `16.3.5`, React `19.3.0`.
- **Recorded baseline:** 133,454 bytes (130.3 KB) gzipped.
- **Measurement method:** for each statically prerendered route, sum the gzipped size of every JS file its prerendered HTML tells the browser to load — `<script src>` plus `<link as="script">`, deduplicated. The polyfill bundle is served with `noModule` and is excluded: no browser that can run this site downloads it. Implemented in `scripts/check-budget.mjs`, run as `pnpm budget`.
- **Reproduce:** `pnpm build && pnpm budget` on a route with no client components. A webpack build (`next build --webpack`) measured 127.9 KB, confirming this is the React/App-Router floor rather than a Turbopack artifact.
- **Gate:** `route total − baseline > budget` fails the job. The baseline itself is pinned in the script, so a Next upgrade that inflates the floor **fails the check** instead of quietly eating the headroom.

**On a Next upgrade this check fails by design.** Re-measure deliberately, update `SUPPORTED_NEXT` and `BASELINE_BYTES` in `scripts/check-budget.mjs`, and record the new version, baseline and date here. Never adjust the baseline to make a build pass — that is the one change this gate exists to prevent.

**The star field is the main risk.** As designed it is hundreds of twinkling marks plus a cursor-proximity effect. Rendering that as animated SVG nodes will jank on mid-range phones and drain battery.

**Decision: render the star field to a single `<canvas>`** using the seeded generator from the design previews. Same output, one element, one `requestAnimationFrame` loop. It must:

- pause when off-screen (`IntersectionObserver`) and when the tab is hidden;
- render a single static frame and stop under reduced motion;
- scale marks by device pixel ratio, capped at 2;
- reduce density on small viewports per `docs/DESIGN.md` §2.

The pixel world is static art: inline SVG, rendered once, with cloud drift as a CSS transform on one group. It is not redrawn per frame.

### Stage 2 refinements to the above

Decided while planning the hero, and recorded here because they change how the decisions above are implemented:

- **The dot grid is CSS, not canvas.** The rule above says render the star field to a single `<canvas>`; the reason was to avoid hundreds of animated SVG nodes. The 24px grid never animates (`docs/DESIGN.md` §7.4: "The grid does not animate"), so it is a `radial-gradient` background at `background-size: 24px 24px` — pixel-exact and free — and the canvas draws only the animated stars. That is the same intent with less per-frame work, not a loosening of it.
- **The star list is generated per composition, not once forever.** Desktop and mobile have different dimensions and densities, so one list cannot serve both. It is generated deterministically for the active composition and reused for every frame; it regenerates only when crossing the 1024px composition breakpoint, when the width crosses a quantised size bucket, or when device pixel ratio changes. Never per frame, and never per resize event — a `ResizeObserver` feeds the bucketing so dragging a window edge cannot thrash the generator.
- **The pixel world renders on the server.** It is deterministic, so it ships as markup with zero client JS. Two things follow: same-colour cells are **run-length merged** horizontally, because a 42×24 grid is 1008 rect nodes above the fold otherwise; and the clouds are emitted as a **separate group** over a complete sky, because the generator bakes clouds into the cell grid and cells baked into a grid cannot be translated. The drift uses `steps()` timing so the clouds move whole pixels and stay on the pixel grid.
- **Both generators are ported verbatim** from `references/previews/HeroDesktop.html`, including the order of random calls — the order is what makes the output deterministic, so it is not an implementation detail to tidy.
- **The pixel art is one path per colour.** Run-length merging cut 1008 rects to 203; collapsing those runs into a path per colour cut them to seven nodes and roughly half the page's HTML — 91 KB to 43 KB raw, 11.5 KB to 6.3 KB gzipped. Identical pixels. It is above the fold, so this is critical-path weight, and it moved LCP by 0.3s and TBT from 130ms to 0.
- **The homepage's layout watches nothing.** No `IntersectionObserver`, no sticky, no transform, no reveal. Every mechanism that once lived here existed to reveal a route section, and went when the section did (`docs/DESIGN.md` §4).

  **One listener came back, for a different job** (Stage 2 follow-up review, Jaycee's call): `ScrollToMenu` turns a downward wheel or swipe with nowhere to go into opening MENU (`docs/DESIGN.md` §4.0). It changes no layout, reads only `scrollTop`/`scrollHeight`/`clientHeight` on input events, is passive, never calls `preventDefault`, and talks to the menu through a `twelve:open-menu` window event so menu state stays owned by `MenuOverlay`. With it, the dot lean and the menu changes, the homepage measures 9.5 KB gz of own-code JS — inside the 60 KB budget with 50.5 KB spare.

  The history is worth keeping, because each attempt failed in a way that is easy to repeat. A reversible recession driven by an observer bounced under a fast flick. That observer's `rootMargin` was larger than the pin distance, so it intersected at scroll 0 and fired everything on load. A *transition* out of a waiting phase never played at all, because the phase lasted a single frame. A latched listener fixed those and still fired ~900px before the section was visible, so the animation played to nobody. **The reliable version of scroll-driven UI, for a page that does not need it, is no scroll-driven UI.**

  One rule survives as general practice: state applied on mount goes in a `requestAnimationFrame`, not synchronously in an effect body, which cascades renders.
- **The star-field loop reads no layout.** The first Stage 2 build called `getBoundingClientRect()` inside `draw()`, forcing a layout on every frame of an animation whose entire justification is that it is cheap. Canvas dimensions come from the `ResizeObserver` and are read once per resize; the pointer position is stored in canvas-relative coordinates when it changes. **Nothing in the frame loop may touch layout.**
- **The dot lean rides the star-field loop.** No second pointer listener: `StarField` already tracks the pointer, so it eases `--dot-lean-x/y` on the hero each frame. The dot's centre is read with `offsetLeft/Top` on resize — transform-free, so neither the float nor the lean feeds back into it — and the style write is skipped once settled.
- **The walker is CSS and markup only.** A handful of `<rect>`s drawn after the generated world and moved by a `:hover` transition with `steps()`. `generateWorld` now also returns `horizon`, an output it already computed; its random draws are unchanged.
- **Frame-independent easing.** Per-frame interpolation uses elapsed time, not an assumed 16ms frame, or the cursor response runs at double speed on a 120Hz display.
- **Reveal-on-scroll never ships hidden, and every frame of it must pass contrast.** A one-shot reveal applies its waiting state from the client after mount, never in the server HTML, and **nothing it touches is ever transparent — including mid-animation**. The first tray held `opacity: 0` server-side: axe reported eight contrast failures, and the four links would have been invisible to anything that did not run the script, which §SEO forbids for navigation. Moving the fade inside the animation only shortened the window: axe sampled a column mid-fade and failed it again.

  The rule is not *never fade* — that was one way of satisfying it, mistaken for the rule itself. It is that **the lowest-opacity frame must clear the threshold**, which makes the floor a number to compute rather than an effect to abandon. For `star-400` on `void-900` it is **0.85** (5.31:1 against a 4.5:1 requirement); 0.75 fails at 4.34:1. Reveals are floored there.

  **And the floor is measured, not declared.** axe samples whenever it happens to sample and cannot be relied on to catch an intermediate frame — on a short page the reveal can be over before it looks. The check is a browser probe that samples effective opacity (the element's, multiplied by every ancestor's) on every animation frame through the whole reveal, composites the text colour over its real background at the minimum it observed, and computes the ratio there. It is what caught the footer's first entrance never playing at all.
- **The hero's coordinates are proportional on both axes, and the rule is *same axis, same container*.** Horizontal values are `cqw`, vertical `cqh`, against the panel as a size container — so a knockout offset always subtracts like for like and resolves against one box. The earlier rule, *everything is width-relative*, only worked while the panel's aspect ratio was frozen, and freezing it is what left the hero undersized (`docs/DESIGN.md` §4.1). Two corollaries, both found by measuring: the wordmark's size must be bounded on **both** axes or it drives the copy through the panel's bottom edge on a short wide window; and the panel's height must come from the **viewport**, never `100%` — under `prefers-reduced-motion` the sticky box becomes `height: auto`, and a percentage against it collapses the panel to zero.
- **All four font files stay preloaded.** Dropping the meta face's preload, to leave more of a throttled connection for the display face that carries the LCP element, moved LCP about a tenth of a second and took **CLS from 0 to 0.288** — that face sets every label and control in the hero, and swapping it in late resizes all of them. Measured, reverted, recorded so it is not retried.

Also: no animation library (no GSAP, no Framer Motion) unless a specific need is documented here first. Images through `next/image` with explicit dimensions. Nothing above the fold lazy-loads.

## Fonts

**Decision: self-hosted, via `next/font/local`.** Reaffirmed at Stage 1 against the alternative: `next/font/google` also self-hosts, downloading the faces at build time and serving them from our own origin, so it would satisfy the privacy and round-trip reasons below without committing binaries. It was **not** chosen, because `next/font/local` is the shape the future custom display face needs — that face will never come from Google, and having the mechanism already in place makes the swap a file change rather than a rewrite.

The five files committed to `public/fonts/`, Latin subset, OFL licensed, with their source recorded in `public/fonts/README.md`:

```
Figtree-ExtraBold.woff2     display   800
Archivo-Regular.woff2       editorial 400
Archivo-Medium.woff2        editorial 500
SpaceMono-Regular.woff2     meta      400
SpaceMono-Bold.woff2        meta      700
```

- Figtree ExtraBold (display), Archivo 400/500 (editorial), Space Mono 400/700 (meta).
- Latin subset only, `woff2`, in `public/fonts/`.
- Self-hosted rather than Google's CDN: removes a third-party request (see Privacy), removes a render-blocking round trip, and lets us preload the two faces used above the fold.
- `font-display: swap` with `size-adjust`-tuned fallbacks so the swap does not shift layout.
- These faces are **stand-ins** (`docs/DESIGN.md` §1.3). Because every size lives in a token, swapping in a custom face later means changing the font files and re-checking the scale — not touching components.

### The 402's faces (Pages v2)

The 402's page and help pages use the app's own type (`docs/DESIGN.md` §1.5): **Bricolage Grotesque** (display, variable, width and weight axes), **Instrument Sans** 400–600 (body, variable) and **DM Mono** 400/500 (labels). All three are OFL, self-hosted the same way as Twelve's faces, Latin subset, `woff2`, with their source and licence in `public/fonts/README.md`.

- **They load only on the 402's routes.** `src/app/(the-402)/layout.tsx` declares them with `next/font/local`; nothing outside that route group imports them, so no other route preloads or downloads them. Verified per route in the built HTML: a `<link rel="preload" as="font">` for a 402 face on any other route is a failure.
- **Their weight is measured before commit, not estimated**, and recorded here with the files. Bricolage Grotesque's optical-size axis is not used, so it is dropped from the subset; the width axis is kept, because the design sets it narrow. The budget for the three together is **150 KB of `woff2`**; if they come in above it, subset further before shipping.
- They do not touch Twelve's four preloaded files or the homepage's LCP.

## Images and Media

- Formats: AVIF with WebP fallback, via `next/image`.
- Project covers: 3:2, minimum 1600px wide.
- Every meaningful image needs real alt text written by a human; decorative images get `alt=""` and `aria-hidden`.
- **The wordmark renders as live text**, not as an image file — set in the `display` family with the period in `purple-500`, exactly as the hero does it (`docs/DESIGN.md` §4.1). This applies to the nav mark, the footer and the menu. There is no logo-image dependency in the layout.
- The favicon and app icons use the `12.` stamp construction; the full wordmark is illegible at 32px. OG images are composed at build time by `next/og` from type and the brand dot, not from a logo file.
- No vector wordmark exists yet. The two SVGs in `assets/brand/` are non-vector stubs (a `<text>` element with no embedded font) and **must not be shipped** — see `assets/brand/README.md`. The PNG in the design system remains the colour authority.

## Tooling

**Decision: pnpm**, with a committed `pnpm-lock.yaml`. The exact version is pinned in `package.json` via `packageManager`, so local, CI and Vercel all resolve the same pnpm. This was implicit before Stage 0 — only a `.pnpm-store/` line in `.gitignore` hinted at it — and is recorded here now.

Locked versions as of Stage 0 (2026-09-20): pnpm `10.34.5`, Node `24` (`.nvmrc`), Next `16.3.5`, React `19.3.0`, TypeScript `6.0.3`, ESLint `9`.

Two version constraints worth knowing before upgrading:

- **TypeScript stays on 6.x.** `typescript-eslint` does not support the TypeScript 7 API yet, and `eslint-config-next` depends on it.
- **ESLint stays on 9.x.** ESLint 10 changed the scope-manager API that `@typescript-eslint/parser` 8 relies on.
- **pnpm stays on 10.x — this is a deployment constraint, not a preference.** Vercel supports pnpm 6 through 10. pnpm 12 writes `packageManagerDependencies` and `configDependencies` into the lockfile; the file still declares `lockfileVersion: 9.0`, so Vercel accepts it and then fails on keys pnpm 10 does not understand. That is what broke the first preview build. pnpm 12 would only work behind Vercel's experimental Corepack flag, which trades a supported path for an undocumented dependency in the build. Revisit when Vercel's supported-versions table lists a newer major.
- **`engines.node` is an exact major (`24.x`), matching `.nvmrc`.** Vercel reads this field and rejects ranges it cannot resolve to one of its supported majors with "Found invalid Node.js Version"; a range like `>=20.9.0` is a plausible way to fail a deploy that builds fine locally.
- **Build-script allowlists live in `package.json`** under `pnpm.onlyBuiltDependencies` (currently `unrs-resolver`, pulled in by `eslint-config-next`). pnpm 12 wanted them in a `pnpm-workspace.yaml`, which also made Vercel treat this single-package repo as a monorepo; that file is gone.

**Decision: `@axe-core/cli` as a devDependency (Stage 1).** `docs/BUILD.md` requires "axe reports no violations on any route" but named no tool, which would have left the criterion to a one-time manual pass. It is now a CI gate like the token and budget checks: `pnpm a11y` runs axe against `next start` over every route, and a violation fails the job. This is a dependency the original plan did not name — recorded here, with its reason, rather than added quietly. It is a devDependency and ships nothing to the browser.

Guardrail scripts, all wired into CI:

```
scripts/tokens.mjs                generates src/styles/tokens.css from references/tokens.json
                                  --check fails on drift; never hand-edit the generated CSS
scripts/check-design-tokens.mjs   parses docs/DESIGN.md §1 directly and verifies every documented
                                  token against tokens.json and tokens.css. docs/DESIGN.md wins
scripts/check-domain.mjs          fails if a literal domain appears outside src/lib/site.ts
scripts/check-budget.mjs          first-load JS budget, measured against the recorded
                                  framework baseline (see Performance)
pnpm a11y                         @axe-core/cli against a production server, every route
```

## Component Architecture

Names follow `docs/DESIGN.md` §6 exactly. Do not invent parallel vocabulary.

```
src/
  app/                      routes, layouts, metadata, sitemap, robots
    (the-402)/              the 402's routes and the layout that loads its fonts
    api/beta/               the one route handler
  components/
    layout/                 NavBar · MenuOverlay · FooterBar
    hero/                   HeroEnvironment · StarField · PixelWorld · BrandDot · HeroWordmark
    page/                   PageOpener · StatementBand · Reveal
    work/                   FeatureCard
    about/                  PhotoFrame · MakeGrid · BeforeTwelve
    playground/             PlaygroundFilter · PlaygroundCard (and its visuals)
    contact/                ContactSlab
    the-402/                The402Logo · Countdown · AppScreen · BetaForm · HelpHeader · HelpLinks · Faq
    ui/                     PillButton · MetaLabel · StudioStamp · Chip · CopyEmail
  lib/                      site constants, content loaders, seeded PRNG, reduced-motion hook
  styles/                   tokens.css, globals.css
```

`NavBar`, `MenuOverlay` and `FooterBar` live in the root layout so they survive page transitions. Everything else is a route-level concern.

Components stay server components unless they need state. The client components are the star field, the menu, and — from Pages v2 — the section reveal, the copy buttons, the Playground filter and its three canvas/interval visuals, the Contact knockout, the countdown, the beta form and the FAQ. Each is marked `'use client'` and kept small, so interactivity does not leak into the rest of the tree, and each page stays inside the 40 KB own-code budget.

Do not turn every element into its own file. A component earns a file when it is reused, when it holds state, or when it is named in `docs/DESIGN.md`.

## Contact

**Decision: `mailto:` only on Twelve's pages. No contact form.**

`docs/DESIGN.md` §5.4 specifies no contact form, no newsletter, no calendar embed. Revisit only if mail volume becomes a real problem.

### The 402 beta signup — the one form

**Decision (Jaycee, 2026-09-26): a route handler emails each signup to the studio through Resend.** The 402's beta form (`docs/DESIGN.md` §6.4) collects an email address and iPhone or Android. TestFlight invites testers by email, and Google Play closed testing takes a list of testers' Google account emails, which is why it asks for both. Options considered: this; a hosted form service (Tally, Formspree), which adds a third party that sees visitors' addresses; a prefilled `mailto:`, which changes the design; and a stored list (Upstash, Vercel KV), which adds a database. Resend was chosen because the 402 app already uses it, and nothing is stored.

How it works:

- `src/app/api/beta/route.ts` accepts `POST` only, form-encoded or JSON. It validates the email (length-capped, one `@`, a dot in the domain) and the platform (`ios` or `android`, nothing else), and rejects anything with the honeypot field filled.
- It sends **one plain-text email to `site.email`**, with the address and platform in the body and `Reply-To` set to the signup's address. **Nothing is stored** — not in a database, not in logs beyond Vercel's standard request logs. The inbox is the list.
- It calls Resend's HTTP API with `fetch` — **no SDK dependency**. The key is `RESEND_API_KEY`, a server-only environment variable in Vercel, never `NEXT_PUBLIC_`, never committed. **Jaycee sets it herself** in Vercel for Production and Preview; nobody else handles the key. `bytw12ve.com` is already a verified sending domain in Resend (Jaycee, 2026-09-26). The sender is `The 402 <beta@bytw12ve.com>`, declared in `src/lib/site.ts` alongside `email`, and every signup goes to `contact@bytw12ve.com`.
- Responses: `303` back to `/work/the-402?beta=ok#beta` (or `=invalid`, `=error`) for a plain form post, so it works without JavaScript; JSON for the enhanced form. The success, invalid and error states are designed (`docs/DESIGN.md` §6.4).
- Abuse: the honeypot, a size cap on the body, and one submission per request. No rate limiter at launch; add one if the inbox shows abuse, and record it here.
- **In preview deployments without the key**, the handler returns the error state rather than pretending to succeed.

The address shown in the designs is `contact@bytw12ve.com`, following the launch domain. **Confirm this mailbox actually receives mail before launch** — it is in the Launch QA checklist, and a studio site with a dead contact address is the one bug that costs real work.

## Analytics

**Decision: none at launch.**

Nothing to disclose, no cookie banner, no third-party script. If analytics are added later, prefer a cookieless, privacy-respecting provider, and document the provider and the reason here before adding it.

## Privacy

With the decisions above, the site loads no third-party resources in the browser: fonts are self-hosted, there is no analytics and no embeds. **The one piece of personal data in transit** is the 402 beta signup (§Contact): an email address and a phone platform, posted to our own origin and emailed onward to the studio by Resend, server to server. Nothing is stored, and the form says what the address is for. Keep it that way unless there is a stated reason not to — and record that reason here.

## Deployment

- **Host:** Vercel.
- **Project:** `twelve`, production alias `twelve-roan.vercel.app`, connected to the public `bytw12ve/TWELVE` (2026-09-27). The earlier project, connected to the private archive, is `twelve-archive`. An older project, `12-old-do-not-use`, still holds `www.bytw12ve.com`; that domain has to be released from it before it can be connected here (§Deployment, the domain is connected early).
- **The framework preset must be Next.js.** A new project created from the CLI defaults to "Other", which brings back the output-directory failure below. It was set to Next.js through the API when the project was created.
- **Project settings — verified 2026-09-20 against a green deploy.** Every override is off; the Next.js preset is doing all the work:

  | Setting | Value |
  | --- | --- |
  | Framework Preset | Next.js |
  | Build Command override | off |
  | Output Directory override | off |
  | Install Command override | off |
  | Development Command override | off |
  | Root Directory | blank |
  | Include files outside the root directory | off |
  | Node.js Version | 24.x |
  | Environment variables | none |

- **Do not override the install command.** Vercel documents that an override such as `pnpm install` makes it use *the oldest pnpm in the build container — pnpm 6*, which cannot read our lockfile. Left alone, Vercel detects `pnpm-lock.yaml`, reads `lockfileVersion: 9.0` and uses pnpm 10, which matches what we pin.
- **Do not override the output directory.** The Next.js preset handles `.next` itself. An override of `public` fails the deploy with "No Output Directory named 'public' found" — and this repo has no `public/` directory at all until fonts land in Stage 1.
- **`main` deploys to production.** Nothing else does.
- **Every other branch gets its own preview deployment**, built exactly as production is.
- **The preview URL is part of review.** A branch is not ready to merge until its preview has been opened and checked against the stage's exit criteria — not just until CI is green. CI proves it compiles; the preview proves it looks and behaves right.
- **Domain:** `bytw12ve.com` (apex) for launch, `www` redirecting to it. The canonical host lives only in `src/lib/site.ts` — see SEO above — so moving domains later touches one line, not page code or metadata.
- **Environment variables:** one — `RESEND_API_KEY`, server-only, set in Vercel for Production and Preview (§Contact). Nothing else.
- **The domain is connected early** (Jaycee, 2026-09-26). The 402's help pages must be live at `bytw12ve.com/402/*` around **October 24** so the app can be submitted, which is before Stage 8. `bytw12ve.com` (apex) and the `www` redirect are attached to production once the 402 pages merge, with Jaycee's go-ahead at that moment. From then on, whatever is on `main` is public at the real domain — so an unfinished page reaching `main` is a public page, and the stage gates matter more, not less. Stage 8 still owns the launch checks.
- **Rollback:** promote the previous deployment in Vercel. Because the site is static with no data layer, rollback is instant and lossless — the beta handler holds no state either.
- **Previews are behind Vercel Deployment Protection.** Verifying one requires an authenticated browser. An unauthenticated request returns Vercel's SSO login page with HTTP 200 — that is not the site, and it is not verification. Without a signed-in session a preview cannot be checked; say so rather than infer.

Both the output and install overrides were set when the project was created, and cost **four** failed preview builds before the cause was visible — while GitHub Actions was building the same commits green the whole time. The build settings are part of the deployment contract: **if a deploy fails while the same commit passes locally and in CI, suspect configuration before code.**

## Testing

Before launch, verify:

- desktop, tablet, mobile at the `docs/DESIGN.md` §2 breakpoints;
- keyboard-only navigation of every route, including the menu open/close cycle;
- `prefers-reduced-motion` on: no pin, no reveal, no twinkle, everything still usable;
- screen reader pass on the homepage — "twelve." announced once, the star field silent, the pixel world described;
- contrast spot-check against the measured values in `docs/DESIGN.md` §1.1;
- metadata, OG previews, sitemap, robots, 404;
- Lighthouse against the targets above, on a throttled mobile profile;
- Safari, Chrome, Firefox; iOS Safari and Android Chrome.


## Security and Failure States

The launch version is intentionally simple: static pages, no database, no analytics, and **one route handler**, `POST /api/beta` (§Contact). Keep the security plan proportional to that architecture. The handler has the protections its data needs: input validation, a body-size cap, a honeypot, no duplicate submission while one is pending, a server-only key, and a designed error state.

Required before launch:

- HTTPS only in production.
- No secrets, tokens, API keys or private credentials in frontend code, committed files or public environment variables.
- Audit third-party packages and remove unused dependencies.
- Add sensible security headers through Next.js/Vercel where appropriate.
- External links that open a new tab use safe `rel` attributes.
- No new public API endpoint, upload flow, auth system, payment flow or database is added without updating this file first.

If the architecture later gains a backend, form, uploads, payments or accounts, add the relevant protections at that time: validation, sanitization, rate limiting, request limits, upload constraints, duplicate-submission/payment protection, database indexes, backups and abuse monitoring.

Do not add backend infrastructure merely to satisfy a generic launch checklist.

Every interactive feature must have an intentional failure mode:

- loading state when work is asynchronous;
- clear error state when something can fail;
- empty state when content can legitimately be empty;
- no duplicate action while an interaction is already pending;
- graceful timeout/failure behavior for any future network request.

At launch, the site should still render and navigate if decorative motion fails.

## SEO and Discovery Checklist

In addition to the SEO decisions above, verify before launch:

- every indexable route has a unique title and description;
- canonical URL is correct on every route;
- Open Graph and Twitter/X previews render correctly;
- favicon and platform icons are present;
- `sitemap.xml` resolves and contains only intended public routes;
- `robots.txt` resolves and matches the launch environment;
- internal navigation is crawlable without JavaScript-only discovery;
- URLs are descriptive and stable;
- the custom 404 is implemented and linked back into the site;
- structured data is valid and only used where it truthfully describes the page;
- project pages excluded by `draft: true` do not appear in navigation, metadata generation or the sitemap.

## Privacy and Legal Review

Current launch architecture requires no cookie banner: there is no analytics, no embeds, no cookies and no third-party font request. The one form, the 402 beta signup, sets no cookie.

Before launch, still verify the actual implementation matches that assumption.

Add a Privacy Policy for the site itself if Twelve later collects personal data through analytics, forms, mailing lists, accounts, payments or other tracking. **Open question for Jaycee:** the beta signup collects an email address. The form states its one use, and the 402's privacy policy covers the app, not this form — whether the site needs its own short notice is her call before the form goes live.

The 402's privacy policy and terms at `/402/*` are **the app's** legal pages, published here because the app stores require public URLs for them. They are not the site's.

Add Terms & Conditions when the site begins selling products/services, accepting accounts, payments, uploads or user-generated content.

Do not add legal pages or consent UI just because a generic website checklist recommends them; add them when the site's real behavior makes them relevant.

## Performance and Core Web Vitals QA

The numeric targets in the Performance section are release gates, not aspirations.

Before launch:

- test the production build on a throttled mobile profile;
- verify Core Web Vitals rather than relying only on desktop Lighthouse;
- compress project imagery before it enters `public/`;
- confirm `next/image` is generating sensible responsive sizes;
- confirm above-the-fold assets are not accidentally lazy-loaded;
- confirm below-the-fold media is lazy-loaded where appropriate;
- verify font loading causes no visible layout jump;
- pause the star-field render loop when hidden or off-screen;
- confirm the canvas density reduction works on small screens;
- check battery/CPU behavior on an actual phone, not only a desktop simulator;
- reject any animation or dependency that pushes the homepage over the JS/performance budget without a documented reason.

## Responsive, Browser and Accessibility QA

Before launch, test the real production build on:

- desktop;
- tablet;
- small and large phones;
- iOS Safari;
- Android Chrome;
- desktop Safari;
- Chrome;
- Firefox.

Also verify:

- no unintended horizontal overflow;
- orientation changes do not break the hero or menu;
- text zoom/scaling remains usable;
- every interactive control can be reached and used by keyboard;
- menu focus is trapped while open and restored correctly when closed;
- `Escape` closes the full-screen menu;
- focus indicators remain visible against both dark and paper surfaces;
- no information or action exists only on hover;
- reduced-motion mode removes the hero pin/reveal and ambient animation without hiding content;
- screen readers announce the brand once, ignore decorative star-field content, and receive meaningful image descriptions.

## Links, Content and Launch QA

Before production release:

- crawl every internal route and fix broken links;
- verify external links and social profiles;
- verify `VIEW WORK` routes to `/work`;
- verify the homepage scroll reveal does not trap, snap or hijack normal scrolling;
- proofread all production copy;
- remove placeholder/demo content;
- verify project dates, names, kinds, summaries and links;
- verify contact email and studio information;
- confirm copyright year and studio name;
- test the custom 404;
- check browser console output for meaningful errors;
- confirm there are no exposed secrets or unexpected network calls;
- compare the finished implementation against the approved designs before shipping.

Do not add fake reviews, filler FAQs, maps, a team photo, response-time promises or other trust elements that are not real parts of Twelve.

## Monitoring After Launch

Because launch is static and has no backend, monitoring can stay lightweight.

At minimum:

- use Vercel deployment health and logs;
- verify the production domain and HTTPS after each release;
- periodically re-run link, Lighthouse and metadata checks after substantial updates.

Add dedicated uptime/error monitoring only if the runtime complexity grows enough to justify it.


## Git and GitHub Workflow

**GitHub is the source of truth for this repository.** Local state is a working copy, never the record.

### Branching

`main` is production-ready at all times and is **not used for active development**. All implementation happens on short-lived branches, merged when their stage's exit criteria pass.

Branch naming:

```
foundation/stage-0      scaffolding and guardrails
feature/hero            a feature or component cluster
feature/menu
page/work               a route
page/about
fix/mobile-nav          a bug fix
design/mobile-pages     non-code work that lands in the repo
```

Keep branches short-lived. A branch open across several stages will conflict with everything.

### Before starting work — every time

1. **Fetch and pull** the latest repo state. Never start from a stale clone.
2. **Read `docs/STATE.md`** — it says what stage is active, what is in flight, and what closed last.
3. **Confirm the active branch** before the first edit, and create the correct branch if you are on `main`.
4. **Check for work already in progress** — `git branch -a`, recent commits, and the In Progress section of `docs/STATE.md`. If someone else is on that area, pick different work or say so; do not start a parallel implementation of the same thing.

### While working

- Commit each meaningful unit of work with a clear message saying what changed and why — not `wip`, not `updates`.
- Keep commits scoped. A commit that touches the hero, the menu and the sitemap is three commits.

### Pull requests

**Work reaches `main` through a pull request, never a direct push.** The PR is what CI runs against and what Vercel attaches a preview to, and its description is where the stage's exit criteria are checked off. Open it as soon as the branch has something to look at, not only when it is finished.

**Jaycee merges.** Whoever opens the PR keeps CI green and reports; they do not merge their own stage.

### Before merging

In order:

1. sync with the latest `main` and **resolve conflicts intentionally** — read both sides, do not accept a side wholesale to make the conflict go away;
2. run the full local gate, which is the same set CI runs:

   ```bash
   pnpm install --frozen-lockfile && pnpm lint && pnpm typecheck && pnpm tokens:check && pnpm domain:check && pnpm build && pnpm budget
   ```

3. run the stage-specific checks from the Build Stages section;
4. **open the Vercel preview and verify it**;
5. merge only once the current stage's exit criteria pass and any required Jaycee review is complete.

### Hard rules

- **Never force-push `main`.**
- **Never overwrite, rebase, reset or delete someone else's branch or work** without explicit instruction from Jaycee.
- Do not merge a stage that has an unmet exit criterion. Flag it instead.
- After a meaningful merge, **update `docs/STATE.md`** — what closed, what passed, what was deferred.

### Routine Git work

Whoever is working **handles normal Git operations themselves** — branching, staging, committing, pushing, opening PRs, syncing with `main`. Do not ask Jaycee to run routine commands. Ask her only for the things that need her: approving a review gate, resolving an ambiguous conflict, granting access, or anything destructive.

## Build Stages

The site is built in ordered stages. **A stage is not closed until its exit criteria pass.** The criteria exist so that the checks which normally happen at launch — accessibility, performance, responsive behaviour, budgets — happen at the point where fixing them is cheap.

Rules for every stage:

- Do not start a later stage to avoid finishing an earlier one.
- Update `docs/STATE.md` when a stage closes, naming what passed and what was deferred.
- If an exit criterion cannot be met, stop and flag it. Do not lower the bar quietly.
- Stages marked **REVIEW** need Jaycee's approval before the next stage starts.

**Design is complete for everything being built.** Pages v2 (`twelve-design/pages-v2/`, 2026-09-26) supplies My work, About, Playground, Contact, the 402 and its help pages; the 404 and case-study designs stand. Review gates are approvals of *built* work, not of designs:

- **Stage 2** — the hero. Closed.
- **Stage 4** — every page Pages v2 adds is reviewed by Jaycee in a browser, on its preview, before it merges.
- **Stage 5** — the case-study route, when it is built.

### Pages v2 — order and branches

The 402's beta opens **October 31, 2026**, and its privacy, support and delete-account pages need to be live around **October 24** so the builds can be submitted to the stores. The stage order stands — **Stage 3 closes before Stage 4 starts** — and inside Stage 4 the 402's routes go first. Four short-lived branches, each its own pull request:

| # | Branch | Stage | What |
| --- | --- | --- | --- |
| 1 | `design/pages-v2` | — | `docs/` and `references/` brought in line with the Pages v2 design package; the 402 tokens through the pipeline. No page code |
| 2 | `feature/content-layer` | **3** | Types, content modules with all Pages v2 copy, loaders, draft and pending handling, `check-402-policy.mjs` |
| 3 | `page/the-402` | **4, part 1** | The 402's fonts and route group; `/work/the-402`; the four `/402/*` pages; the beta form and `/api/beta`; their metadata. **Target: merged by October 20**, then the domain is connected |
| 4 | `page/inner-pages` | **4, part 2** | The nav change; My work, About, Playground, Contact; page transitions. **Closes Stage 4** |

Stage 4's exit criteria apply to every page in both parts; part 1 is not exempt for being first. Stage 5 is deferred (below); Stages 6–8 follow as written.

### Stage 0 — Foundation and guardrails

Repo, Next.js + TypeScript, `tokens.css` generated from `docs/DESIGN.md` §1, ESLint + Prettier, GitHub Actions CI, first Vercel preview deploy.

**GitHub Actions — `.github/workflows/ci.yml`, runs on every push and every pull request:**

1. install dependencies — `pnpm install --frozen-lockfile`, pnpm from `packageManager`, Node from `.nvmrc`, store cached;
2. `pnpm lint`;
3. `pnpm typecheck`;
4. `pnpm tokens:check` — token parity, both directions (see Tooling);
5. `pnpm domain:check` — the domain appears only in `src/lib/site.ts`;
6. `pnpm build` — production build;
7. `pnpm budget` — the JS budget from the Performance section. A budget regression **fails the job**, it does not warn.

Every step fails the job. The workflow must fail the PR, not just report: a red check blocks merge. Runs are cancelled when a newer commit lands on the same ref.

**As built:** Next 16.3.5, React 19.3.0, TypeScript 6, ESLint 9, pnpm 10.34.5 — all pinned; see Tooling. `tokens.css` is generated, not written. The four guardrail scripts were each verified by making them fail, not only by watching them pass.

Done when:
- the GitHub Actions workflow exists and every step passes on a clean clone; ✅
- every token in `docs/DESIGN.md` §1 exists in `tokens.css` with the exact documented value, verified by a script — not by eye; ✅
- the JS budget from the Performance table is wired as a build-time check, so a regression fails the build instead of being discovered in QA; ✅
- a preview URL is live. ⬜ **outstanding** — needs the Vercel project connected; see Deployment and `docs/STATE.md`.

**Stage 1 does not begin until the preview is verified and Stage 0 is closed in `docs/STATE.md`.**

### Stage 1 — Layout shell and primitives

`NavBar`, `MenuOverlay`, `FooterBar`, plus `PillButton`, `MetaLabel`, `StudioStamp`, `Chip`.

**The routes Stage 1 creates, named rather than counted** — the earlier wording said "all six routes" without listing them, and the docs disagreed on which six:

| Route | Stage 1 ships |
| --- | --- |
| `/` · `/work` · `/about` · `/playground` · `/contact` | a placeholder: one `h1` and a line of holding copy, inside the real shell |
| `not-found.tsx` | a bare placeholder. It is the **handler for unknown URLs**, not a navigable route — nothing links to it, and `/not-found` is not a path |

**Deliberately not in Stage 1:**

- **`/work/[project]`** — it cannot exist before the Stage 3 content layer gives it something to enumerate. Built in **Stage 5**.
- **The designed 404** (`docs/DESIGN.md` §5.6) — Stage 1's `not-found.tsx` is a placeholder wearing the shell. The designed page is **Stage 6**'s. Neither stage should assume the other did it.

Placeholder means placeholder: no `PageOpener`, `IndexRow`, `WorkRow`, `StatementBand` or `PlaygroundCard`. If a component appears in a `docs/DESIGN.md` §5 page spec, it belongs to Stage 4, not here.

Done when:
- every route is reachable, and the menu reaches every route from every page;
- an unknown URL renders `not-found.tsx` with the shell intact and a 404 status;
- keyboard-only pass: focus trapped in the open menu, `Escape` closes, focus returns to the MENU pill, focus visible on every control against both dark and paper;
- axe reports no violations on any route — enforced by `pnpm a11y` in CI, not checked once by hand (see Tooling);
- heading order and landmarks correct;
- the fonts are self-hosted and loading causes no layout shift.

### Stage 2 — Hero — REVIEW

`HeroEnvironment`: star-field canvas, pixel world, brand dot, wordmark with both knockout layers.

**Stage 2 owns the homepage scroll behaviour** (`docs/DESIGN.md` §4.0). Three of the criteria below were rewritten at the fifth Stage 2 review, with Jaycee's approval, when the route section was removed: the pinned phase, the tray revealing beneath the hero, and the reduced-motion stacking. They were not lowered — **they were replaced by a stricter one**, because the safest version of "scrolling must not misbehave" is a page that does not listen to scroll at all.

Done when:
- the homepage presents the hero alone on load, and the footer follows it in normal document flow; *(follow-up review: nav, hero and footer now stack to exactly one viewport — `docs/DESIGN.md` §4)*
- **the homepage has no scroll-driven state whatsoever** — no scroll listener, no `IntersectionObserver`, no threshold, no sticky positioning, no transform on the hero, no reveal. This is verified by inspection of `src/`, not by behaviour alone;
- ~~scrolling never opens the full-screen menu~~ — **superseded at the Stage 2 follow-up review by Jaycee**: a downward scroll with nowhere to go opens MENU, under the rules in `docs/DESIGN.md` §4.0 (at the bottom only, a real-intent threshold, a cooldown after closing, passive listeners, keyboard unbound). MENU is still the homepage's only navigation, so it must be reachable by keyboard and announced correctly;
- `VIEW WORK` navigates to `/work`. It is a link, not a scroll trigger;
- nothing is hijacked: no snap points, no interception, and the scrollbar always reflects true position. A visitor who scrolls hard reaches the footer immediately;
- the nav strip's content sits the same distance from the top of the page as the hero panel sits from the strip, and as the panel sits from the bottom of the viewport — **one gap, measured equal at every width** (`docs/DESIGN.md` §4.1);
- under `prefers-reduced-motion` the page is complete and usable as a plain stacked layout — hero then footer — with the star field static;
- the composition matches the approved design at 1440, 1024 and 390;
- measured on a real phone, not a simulator: the star field holds frame rate, and the render loop pauses off-screen and on tab hide;
- a screen reader announces "twelve." once, ignores the star field, and describes the pixel world;
- the ambient motion is **perceptible** — the field reads as alive, and moving a pointer visibly disturbs the stars nearest it (`docs/DESIGN.md` §7.4). Cursor behaviour is gated on a fine pointer, so touch devices keep the ambience and lose only the cursor response;
- LCP measured against the target on a throttled mobile profile.

This is the stage where the design either survives contact with a browser or does not. Nothing downstream should start before it is approved.

### Stage 3 — Content layer

`types/content.ts`, the content modules in §Content Structure — including all Pages v2 copy and the 402's legal text — their loaders, draft and pending handling, and `scripts/check-402-policy.mjs`. No MDX until Stage 5 (§Content Structure).

Done when:
- content types compile and a malformed entry fails the build rather than rendering broken;
- `draft: true` removes an entry from navigation, metadata and the sitemap — verified, not assumed;
- a `pending` clause is absent from a production build and a `pending` page returns 404 there — verified by building with `VERCEL_ENV=production`, not assumed;
- the web privacy text matches the app's `policy.ts` exactly, checked by script;
- no content strings remain inside components.

### Stage 4 — Inner pages

The Pages v2 routes against their approved desktop and mobile designs (`twelve-design/screens/`, `twelve-design/pages-v2/prototype/`): `/work/the-402` and the four `/402/*` pages first, then My work, About, Playground and Contact, and the nav change.

**Stage 4 also owns page transitions** (`docs/DESIGN.md` §7.3). They were specified but unassigned until Stage 1 flagged it; they land here because validating them needs real content on both sides of the navigation, and because the shell they run inside exists from Stage 1 onward.

Done when:
- each page matches its approved design at all four breakpoints, and **Jaycee has reviewed it in a browser** on its preview;
- page transitions match §7.3 — 160ms out, 320ms in, nav and footer not participating, a menu link closing the menu first, and an instant swap under reduced motion;
- no horizontal overflow at any width; orientation change does not break layout;
- no nested interactive elements: the My work card is one link; a Playground card's only interactive element is its one link;
- non-interactive Playground cards are genuinely non-interactive — not focusable, no arrow;
- **every animation in `docs/DESIGN.md` §7.5 is off under reduced motion, and nothing rests invisible waiting for a script** — checked with the per-frame contrast probe (§Performance), not by axe alone;
- the bugs the prototype found stay fixed: CLOSE is visible when the menu opens on a 402 page; Back from a help page returns to the same scroll position on the 402 page; the FAQ animates on every open and every close; no small cream-on-orange text;
- the 402's fonts are preloaded only on the 402's routes;
- the beta form works with and without JavaScript, shows every designed state, and a real submission reaches the inbox from the preview;
- the privacy, support and delete-account pages are live on production with no pending markers, before the store submission;
- axe clean on every route, including the five new ones.

### Stage 5 — Case study — REVIEW

The template is designed — `docs/DESIGN.md` §5.5, with long, short and mobile reference screens. Build it with `generateStaticParams`.

**Deferred (Jaycee, 2026-09-26)** until a second finished project exists. The 402 is a one-off page (§Routing), so there is no project to render through the template yet, and building it against placeholder content would prove nothing. Stages 6–8 do not wait for it.

Done when:
- a real project renders end to end from its MDX file;
- an unknown slug renders the 404;
- the template holds up with both a long and a short case study.

### Stage 6 — SEO, metadata and 404

Per-route metadata, canonical, OG and Twitter, `sitemap.ts`, `robots.ts`, generated OG images, JSON-LD, the custom 404.

Done when the SEO and Discovery Checklist in this file passes in full, against the production build.

### Stage 7 — Launch QA

The Performance, Responsive/Browser/Accessibility, and Links/Content/Launch checklists in this file, run against the production build on real devices.

Done when every box is checked and the performance targets are met — they are release gates, not aspirations.

### Stage 8 — Deploy and monitor

Production domain, HTTPS verification, post-release checks as described under Monitoring After Launch.

## Build Rule

Do not add complexity just because a framework or library makes it possible.

Prefer the simplest maintainable implementation that preserves the approved design and interaction quality. If a dependency is not named in this file, adding it is a decision — write it down here with the reason.
