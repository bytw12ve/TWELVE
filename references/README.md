# Design reference pack

Visual context for implementation. Everything approved lives here and in `docs/DESIGN.md`.

`docs/DESIGN.md` is the source of truth for rules and values. These files are the source of truth for *what it looks like*. Where they disagree, `docs/DESIGN.md` wins — and the disagreement is a bug worth reporting.

## What is here

```
references/
  previews/       live HTML previews of the approved designs
  tokens.json     the token set as data (colour, type, spacing, radius, shadow, opacity)
```

**The rendered screens are not in this repository.** They, and the Pages v2 design package (clickable prototype, app screens, 402 logo assets), live in the private design repository `bytw12ve/twelve-design`, as `screens/` and `pages-v2/`. These docs refer to them as `twelve-design/screens/…` and `twelve-design/pages-v2/…`. Where this README names a screen below, it is in that repository.

### screens/ and previews/

Most names appear in both folders — a PNG to look at, an HTML file to open in a browser and inspect. **The Pages v2 screens have no preview here**: their live mockup is `twelve-design/pages-v2/prototype/index.html`, one clickable file covering every Pages v2 page (hash routes `#work`, `#about`, `#playground`, `#contact`, `#the402`, `#privacy`, `#terms`, `#support`, `#delete`).

**Pages v2** (2026-09-26 — desktop at 1440, mobile at 390; copied from `twelve-design/pages-v2/screens/`)

| File | Route | Notes |
| --- | --- | --- |
| `MyWork{Desktop,Mobile}` | `/work` | One orange card for the 402, and the note pointing to the Playground |
| `About{Desktop,Mobile}` | `/about` | Photo placeholder and story, paper statement band, What I make, Before twelve., Want to make something together? |
| `Playground{Desktop,Mobile}` | `/playground` | Filter chips and four real projects |
| `Contact{Desktop,Mobile}` | `/contact` | "Let's make something." with the orbiting dot, copy email, three columns |
| `The402{Desktop,Mobile}` | `/work/the-402` | The 402's own orange skin and fonts |
| `The402Privacy{Desktop,Mobile}` | `/402/privacy` | **Shows the handoff's draft text.** The build uses the app's `policy.ts` instead (`docs/DESIGN.md` §5.8) |
| `The402Terms{Desktop,Mobile}` | `/402/terms` | Draft; the yellow highlights are Jaycee's open questions |
| `The402Support{Desktop,Mobile}` | `/402/support` | Email and copy, what to include, FAQ |
| `The402DeleteAccount{Desktop,Mobile}` | `/402/delete-account` | In the app, by email, what gets deleted |
| `Menu{Desktop,Mobile}` | — | The menu with the Pages v2 labels. Its design is unchanged; the previews below still carry the old labels |

**Homepage, hero and menu** (approved before Pages v2, still current)

| File | Notes |
| --- | --- |
| `HomepageDesktop` | The homepage. The built homepage has moved on since — see Known drift |
| `HeroDesktop` | The hero alone at 1440 — star field, pixel window, brand dot, knockout wordmark |
| `HeroMobile` | The hero reinterpreted vertically — dot upper-right, type below the window |
| `MenuDesktop` · `MenuMobile` (previews) | The menu's structure and states, with the old labels |

**Case study** — `/work/[project]`, **deferred** (`docs/DESIGN.md` §5.5)

| File | Notes |
| --- | --- |
| `CaseStudyDesktop` | The long state: metadata bar, cover, numbered sections, pull quote, paired shots, prev/next |
| `CaseStudyDesktopShort` | The short state — same template, fewer sections, no external links |
| `CaseStudyMobile` | Stacked, metadata in two columns, images full-bleed within the gutter |

**404**

| File | Notes |
| --- | --- |
| `NotFoundDesktop` | `404` with the brand dot behind it and the hero's ink knockout where they cross |
| `NotFoundMobile` | Same idea at 96px, actions stacked full width |

**Parts**

| File | Notes |
| --- | --- |
| `NavBar` | Every state of the MENU / CLOSE control. **Its inline Work / About / Playground links are gone** — the nav is the wordmark and MENU everywhere |
| `StudioStamp` | The `12.` mark: upright, rotated, on paper, at footer size |
| `Cover` | The design system's cover composition — the source for OG image art direction |

Removed in Pages v2, and still in git history: the old `Page*` and `Mobile*` page screens and previews, and the `SelectedWork`, `AboutTwelve`, `Playground` and `ContactFooter` sections. They showed the old "we" voice, projects that are no longer listed, and the inline nav.

## How to use these when building

1. Read `docs/DESIGN.md` first. It has the tokens, the rules, and the per-page specs.
2. Open the relevant `previews/*.html` in a browser. The CSS in them is written against the same token names as `tokens.css` will be, with hex fallbacks — so `var(--purple-500, #b5a9db)` in a preview maps directly to `var(--purple-500)` in production.
3. Use `screens/*.png` for quick visual comparison during Stage 4's "matches the approved design" check. For Pages v2, click through `twelve-design/pages-v2/prototype/index.html` too — it has the motion the PNGs cannot show.

**The previews are mockups, not production code.** They use absolute positioning, inline `<style>`, and generated SVG to communicate a design at a fixed width. Do not copy their structure into components — build the components properly per `docs/BUILD.md` §Component Architecture and use these to verify the result.

The star field and pixel world in the previews are generated by a small seeded PRNG in an inline `<script>`. That generator is the reference implementation for the canvas version described in `docs/BUILD.md` §Performance — same seed, same output, different renderer.

## Known drift from the built site

Rendered images cannot be edited as text, so older renders keep what was true when they were made. Build against `src/lib/site.ts` and `docs/DESIGN.md` wherever the pixels disagree.

| Where | The pixels show | The truth |
| --- | --- | --- |
| Pre-Pages v2 renders | `hello@bytw12ve.com` | `contact@bytw12ve.com` — `src/lib/site.ts` is the only source |
| Pre-Pages v2 renders | An `Are.na` or Instagram link | GitHub only (`docs/DESIGN.md` §6.2) |
| Pre-Pages v2 renders | The `12.` stamp centred in the footer; `© 2026` floating mid-row | Stamp right-anchored; `© 2026` under the studio line (`docs/DESIGN.md` §4) |
| `HomepageDesktop`, `NavBar` | Inline Work / About / Playground links; a route section under the hero | Wordmark and MENU only; no route section (`docs/DESIGN.md` §3, §4) |
| `CaseStudy*`, `NotFound*` | The old voice | First person (`docs/DESIGN.md` §9); any rewording is Jaycee's, when they are built |
| `The402Privacy*` | The handoff's draft policy | The app's `policy.ts`, word for word (`docs/DESIGN.md` §5.8) |
| Pages v2 renders | Small cream text on orange (My work card, the 402 nav's MENU) | Set in `night-950`; cream fails at that size (`docs/DESIGN.md` §1.5) |

## Coverage

**Every route being built has an approved desktop and mobile design.** Still placeholder, and not design work: Jaycee's photo on About, and the display face (Figtree is a stand-in).

## Brand assets

See `assets/brand/README.md`. Short version: there is no usable vector wordmark; the mark renders as live text in the display face. The PNG in the design system artifact is the colour authority for `purple-500`.
