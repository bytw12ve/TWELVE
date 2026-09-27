# DESIGN — Twelve site, source of truth

Approved design system for the Twelve studio site. Everything an implementation needs: tokens, layout, components, page specs, interaction and accessibility rules. Where this document and a preview disagree, this document wins.

Twelve is a creative studio for digital things worth making — apps, websites, games, experiments. The site is multi-page and dark-first, built around one immersive hero, one warm paper counterweight, and a purple dot taken from the studio's own wordmark.

**Visual reference:** `references/` holds a rendered screen and a live HTML preview for every approved design, plus `tokens.json`. This document is the rules; that folder is the look.

---

## 1. Tokens

All values are design tokens. No hard-coded colours, sizes, radii or spacing in components.

### 1.1 Color

| Token | Value | Use |
| --- | --- | --- |
| `void-900` | `#07060a` | Page ground, every page |
| `void-800` | `#0c0b11` | Inside the hero environment; index-row hover |
| `void-700` | `#15131c` | Raised surfaces: work wells, playground cards, the pixel-window frame |
| `void-600` | `#1f1c29` | Hover fill for dark tiles and the MENU pill |
| `hairline-dark` | `#2f2b3b` | Dividers and tile borders on dark (1.6:1 — decorative only) |
| `paper-100` | `#f2efe9` | The full-screen menu; the About statement band |
| `paper-200` | `#e7e2d8` | Recessed light surface; menu row hover |
| `hairline-light` | `#cfc8b9` | Dividers on paper (1.5:1 — decorative only) |
| `ink-900` | `#14121c` | Text on paper (16.2:1); the wordmark's knockout over light objects |
| `ink-600` | `#5f5a4e` | Secondary text on paper (6.0:1) |
| `star-100` | `#edeaf5` | Text on dark (16.5:1 on `void-800`) |
| `star-400` | `#9b96ae` | Metadata on dark (6.9:1 on `void-800`, 6.5:1 on `void-700`) |
| `star-700` | `#464154` | The star field's dot grid. Decoration, never text |
| `purple-400` | `#cbc0eb` | Lit upper edge of the brand dot; hover tint on dark |
| **`purple-500`** | **`#b5a9db`** | **The Twelve purple** — see §1.2 |
| `purple-600` | `#9a8bc7` | Tonal depth, one step down |
| `purple-700` | `#7868a8` | Deepest tonal step; chip borders on `void-700` |
| `purple-ink` | `#4a3c78` | Purple text, rules and focus rings on paper (8.3:1). A support tint, not the brand colour |
| `sky-400` `#5d9fe0` · `sky-300` `#7fb6ee` · `cloud-100` `#e8f1fb` | | Pixel world, sky |
| `grass-600` `#33562f` · `grass-400` `#6f9d4e` | | Pixel world, ground |
| `bloom-300` `#e9a6c6` · `bloom-500` `#e0b431` | | Pixel world, flowers |
| `focus-dark` | → `purple-500` | 2px focus ring on dark |
| `focus-light` | → `purple-ink` | 2px focus ring on paper |

### 1.2 The brand purple

`purple-500` `#b5a9db` is the Twelve purple, sampled directly from the dot in the `twelve.` wordmark (`assets/Brand/twelve-wordmark.png`). **The wordmark is the authority.** If it ever changes, `purple-500` changes with it and `purple-400` / `600` / `700` are re-derived from it at the same hue (254°).

Rules:

- The hero dot is `purple-500` with a `purple-400 → purple-700` gradient across it. That gradient is tonal variation for depth. Never introduce a different, darker purple as the brand colour.
- On paper, `purple-500` reads at 1.9:1 — unusable. Purple text, rules and focus rings on paper use `purple-ink`.
- White type never sits on the brand purple (`star-100` on `purple-500` = 1.8:1). Where the wordmark crosses the dot or the pixel window it flips to `ink-900` — see §4.1.
- Purple is never a button fill and never a glow.

### 1.3 Type

Three families, one job each.

| Family | Face | Job |
| --- | --- | --- |
| `display` | Figtree 800 | Brand voice: the hero wordmark, page openers, the `12.` stamp |
| `editorial` | Archivo 400/500 | Everything a person reads |
| `meta` | Space Mono 400/700 | Labels, annotations, controls |

Figtree ExtraBold is a stand-in chosen to match the wordmark's geometric lowercase and rounded terminals. When a custom face arrives, replace the family — not the token names.

| Style | Size / leading / weight | Use |
| --- | --- | --- |
| `display-hero` | 220 / 0.82 / 800, ls −0.045em | The homepage hero wordmark. Once per site |
| `display-hero-mobile` | 88 / 0.86 / 800 | The same wordmark below 768px |

**One stated exception, in the hero only.** `display-hero` is the size the hero wordmark scales *from*, not a ceiling it stops at. The composition is proportional — the wordmark occupies 15.99% of the panel's width and 28.35% of its height — and 220px is what that comes to at the reference panel of 1376×776. Capping it there meant the wordmark stopped growing while the panel kept going: 15.8% of the panel at a 1440-wide window, 8.8% at 2560, so the composition drifted on exactly the displays with the most room for it. Everywhere else in the site the token is a fixed size, and `display-hero-mobile` keeps its cap because §2.1 is its own composition.
| `display-page` | 176 / 0.86 / 800, ls −0.045em | Inner-page opener slabs and "Let's make something." Fluid from 72 at 390 wide up to this size (§3.1) |
| `display-xl` | 120 / 0.9 / 800, ls −0.035em | The 404 and the case study's project name |
| `display-stamp` | 22 / 1 / 800 | The `12.` stamp |
| `heading-xl` | 56 / 1.02 / 500, ls −0.025em | Project titles; the About statement |
| `heading-lg` | 34 / 1.12 / 500 | Index rows; mobile menu rows |
| `heading-md` | 22 / 1.25 / 500 | Card titles |
| `menu-row` | 76 / 1.1 / 400, ls −0.03em | Desktop menu rows |
| `body-lg` | 20 / 1.5 / 400 | Hero line; opener copy |
| `body` | 16 / 1.6 / 400 | Running copy |
| `body-sm` | 14 / 1.5 / 400 | Captions, footer links |
| `meta-lg` | 14 / 1.2 / 700, ls 0.1em | MENU, CLOSE, VIEW WORK |
| `meta` | 12 / 1.2 / 400, ls 0.14em | Eyebrows, peripheral labels |
| `meta-sm` | 10 / 1.2 / 400, ls 0.16em | Corner annotations, index numerals |

The scale is deliberately gapped. If two neighbouring elements land within one step of each other, one of them is the wrong size. Never set a section in a single weight and size.

### 1.4 Spacing, radius, elevation

Spacing: `space-1` 4 · `-2` 8 · `-3` 12 · `-4` 16 · `-6` 24 · `-8` 32 · `-12` 48 · `-16` 64 · `-24` 96 · `-32` 128 · `-48` 192.
Desktop gutter `space-16`; mobile gutter `space-4`. Sections within a page separate by `space-32`.

Radius carries scale: `radius-xl` 40 (environments, the menu panel) · `radius-lg` 28 (the pixel window) · `radius-md` 18 (work wells) · `radius-sm` 10 (cards, chips) · `radius-xs` 4 (pixel cells) · `radius-pill` 999 (controls).

Two shadows only — `shadow-window` under the pixel window, `shadow-overlay` under the menu panel. Surfaces are separated by radius, hairline and contrast, not elevation.

Opacity: `opacity-grid` 0.5 (star grid) · `opacity-twinkle` 0.85 (star peak) · `opacity-muted` 0.62 (non-hovered siblings).

### 1.5 The 402 skin

The 402 is Jaycee's app, and its page and help pages wear the app's own identity, not Twelve's (§5.7, §5.8). These tokens exist **only** for those routes (`/work/the-402`, `/402/*`) and the one My work card that points at it (§5.1). Nothing else on the site uses them. The nav, menu and footer on those routes are still Twelve's components; only the nav's surface changes to sit on the page (§5.7, §5.8).

| Token | Value | Use |
| --- | --- | --- |
| `marquee-500` | `#ee4b1e` | **The 402 orange.** The whole ground of `/work/the-402`; the header card of each help page; the My work card |
| `marquee-600` | `#d33f16` | Tower silhouettes on orange. Decoration only — 4.37:1 on cream, so never text |
| `marquee-700` | `#a82f0d` | Orange *text* on cream: labels, section numerals, errors, hover (6.38:1 on `cream-50`) |
| `marquee-100` | `#fde6de` | The halo behind each app screen; the floating towers in the beta panel |
| `cream-0` | `#ffffff` | The beta form's card and its field |
| `cream-50` | `#faf7f1` | The 402 paper: help-page ground, panels on orange, and **headings** on orange (3.47:1 — large text only) |
| `cream-100` | `#f2eee5` | Recessed cream: the email box, numbered steps, the fine-print points |
| `night-950` | `#0a0b0d` | **Text on orange** (5.31:1); the "Why I made it" and logo panels |
| `night-900` | `#131418` | The 402 ink: text on cream (17.2:1); the countdown pill; the selected phone choice |
| `night-800` | `#1c1d22` | The tower silhouette on the Why panel. Decoration only |
| `night-700` | `#31343a` | Running text of the help pages (11.7:1 on `cream-50`) |
| `night-500` | `#5b616c` | Secondary text on cream (5.83:1) and white (6.23:1); the beta form's field border |
| `night-300` | `#c9ccd2` | Body text on the night panels (11.4:1 on `night-900`) |
| `river-600` | `#1c5fa8` | Links in help-page prose (6.04:1); the form field's focus ring |
| `prairie-600` | `#2f6b4f` | Check marks in the fine print; the success badge (cream icon 5.89:1) |
| `corn-400` | `#f5b72e` | The countdown's dot and figure, on night (10.2:1) |
| `hairline-cream` | `#dedcd7` | Dividers on cream. Decorative only |
| `hairline-orange` | `#c03e1b` | Dividers on orange. Decorative only |

**The contrast rule on orange.** Body text on `marquee-500` is `night-950`, never cream: cream measures 3.47:1, which passes only for large text. Cream on orange is allowed at **24px and up, or 19px and up at weight 700** — headings, the wordmark in the nav, the big "Back / Next" names. Everything smaller on orange is set in `night-950`: paragraphs, labels, tags, chips, the nav's MENU pill, the numerals in step circles. The prototype sets several of these in cream; the build does not (§5.7 lists them).

**The contrast rule on cream.** Orange text on cream is `marquee-700`, never `marquee-500` (3.47:1) or `marquee-600` (4.37:1), at any size under 24px.

**Type.** Three families, all OFL and self-hosted like Twelve's own (`docs/BUILD.md` §Fonts), loaded only on the 402's routes:

| Family | Face | Job |
| --- | --- | --- |
| `the402-display` | Bricolage Grotesque 700–800, set narrow (`font-stretch` 78–90%) and tight | Headlines, the big numbers, feature names |
| `the402-sans` | Instrument Sans 400/500/600 | Everything a person reads; buttons |
| `the402-mono` | DM Mono 400/500 | Labels, notes, the countdown, crumbs |

| Style | Size / leading / weight | Use |
| --- | --- | --- |
| `the402-hero` | 44→84 fluid / 0.94 / 800, stretch 80% | "What's on in", the hero headline |
| `the402-title` | 44→88 fluid / 0.92 / 800, stretch 80% | Help-page titles |
| `the402-section` | 36→64 fluid / 0.96 / 800, stretch 80% | App-tour headings, "The 0 is a building.", beta |
| `the402-quote` | 30→54 fluid / 1.08 / 700, stretch 85% | The "Why I made it" statement |
| `the402-heading` | 22→28 fluid / 1.2 / 700, stretch 90% | Help-page section headings |
| `the402-feature` | 20 / 1.15 / 700, stretch 90% | Feature names in "Also in the app" |
| `the402-body-lg` | 18 / 1.6 / 400 | Lead paragraphs |
| `the402-body` | 17 / 1.68 / 400 | Help-page prose |
| `the402-body-sm` | 15 / 1.5 / 400 | Feature descriptions |
| `the402-button` | 16 / 1 / 600 | Buttons and the phone choice |
| `the402-label` | 12 / 1.3 / 500, ls 0.08em | Uppercase labels, crumbs, countdown, notes |

The fluid sizes are written `clamp()` in `references/tokens.json`, with the range above between 390 and 1440 wide.

---

## 2. Grid and breakpoints

| Name | Range | Columns | Gutter |
| --- | --- | --- | --- |
| `sm` | < 640 | 4 | `space-4` |
| `md` | 640–1023 | 8 | `space-8` |
| `lg` | 1024–1439 | 12 | `space-12` |
| `xl` | ≥ 1440 | 12, content capped at 1440 | `space-16` |

Mobile is a reinterpretation, not a shrink: preserve the idea, not the coordinates.

### 2.1 The mobile hero

Reference: `twelve-design/screens/HeroMobile.png`.

The three layers stay; the composition turns vertical:

1. The rounded environment insets `--page-gap` on all four sides and fills the viewport between the nav strip and the bottom edge.
2. The pixel window becomes a **wide, short band** (roughly 3:2 rather than 4:3) across the middle of the panel.
3. The brand dot shrinks to ~168px and moves to the **upper right**, overlapping the window's top edge rather than its left edge.
4. `twelve.` sets in `display-hero-mobile` on one line **below** the window, aligned to the gutter, with the positioning line beneath it. The overlap now happens between dot and window, not between type and both — which is why **no knockout layer is needed on mobile**: the wordmark sits on plain `void-800`.
5. Metadata reduces to two labels: `CREATIVE STUDIO` under the nav, `OMAHA, NE` at the bottom edge. **No `12.` stamp** — §4.1 removed it from the hero at every width, mobile included.
6. `VIEW WORK ↓` becomes a full-width 52px pill.

### 2.2 Inner pages on small screens

Pages v2 (2026-09-26) replaced the Stage 1 mobile designs. References: `twelve-design/screens/{MyWork,About,Playground,Contact,The402,The402Privacy,The402Terms,The402Support,The402DeleteAccount,Menu}Mobile.png`, at 390 wide.

- **My work** — the 402 card stacks: text first, then the two phones in a 440px band beneath it.
- **About** — the photo and the story stack, photo capped at 420px wide; the paper band drops to one column with the dot pushed further off the corner; "What I make" goes two-by-two below 900 and one column below 520.
- **Playground** — the card grid goes to one column below 760. The filter chips wrap.
- **Contact** — "Let's make something." on two lines at its fluid minimum; the three columns stack.
- **The 402** — every two-column section stacks; the app screens go above their text; the fine print's points go to one column.

Shared chrome on every route:

- **Nav** — the wordmark left, the MENU pill right, **at every width** (§3). 64px below 1024.
- **Opener** — the `12.` mark and eyebrow on one line, then the page name, the lead, and the peripheral labels in a row beneath it rather than to its right (§3.1).
- **Footer** stacks: the email on its own line, then the studio block (`TWELVE — OMAHA, NE` with `© 2026` beneath it) on the left with the `12.` stamp opposite. The copyright stays inside the studio block at every width — it never groups with the stamp.
- Every row, chip and control clears 44px of touch target; list rows use a full-width footer row for their arrow rather than a right-edge target.

---

## 3. Site architecture

| Route | What it is |
| --- | --- |
| `/` | The hero and the footer. Nothing else — MENU is the navigation (§4) |
| `/work` | **My work** — finished, public projects only (§5.1) |
| `/about` | Who's making this: Jaycee's story (§5.2) |
| `/projects` | **Side projects** — live side projects, concepts, things being built (§5.3). Renamed from Playground on 2026-09-27; `/playground` redirects here |
| `/contact` | How to reach me (§5.4) |
| `/work/the-402` | The 402's own page, in the 402's own skin (§5.7) |
| `/402/privacy` · `/402/terms` · `/402/support` · `/402/delete-account` | The 402's help and legal pages, which the App Store and Google Play require as public URLs (§5.8) |
| `/work/[project]` | The case-study template (§5.5). **Deferred** until a second finished project exists — the 402 is a one-off page, not an instance of it |

Playground entries have no detail route. A card links to the live thing, its repo, or nothing at all.

**The full-screen menu is the only navigation**, identical on every page: `01 Home · 02 My work · 03 About · 04 Side projects · 05 Contact`. **The nav is the wordmark and MENU at every width, on every route** — Pages v2 removed the inline Work / About / Playground shortcuts, so every page works the way the homepage does. Contact lives in the menu and in every footer. The 402's pages are reached from My work and from each other, not from the menu.

### 3.1 Page skeleton

The four inner pages (My work, About, Playground, Contact) share one skeleton:

1. the persistent nav — wordmark and MENU
2. an opener (`PageOpener`): the `12.` mark and a `meta` eyebrow naming the page; the page name as a `display` slab (fluid 72→176px, leading 0.86, ls −0.045em) ending in a **purple period** — a `purple-500` disc, not a glyph; one lead paragraph; and two `meta` labels, right-aligned beside the slab on desktop and in a row beneath it below 700px. A hairline closes the opener
3. the page's content
4. the footer bar

The slab is bigger than the Stage 1 `display-xl` (120px): Pages v2 set it larger, and the homepage hero is still larger again, so arriving at `/work` still never feels like arriving at a second homepage. **The star field does not repeat on inner pages** — it is the homepage hero's environment. Inner pages sit on flat `void-900` so the work is the loudest thing on screen.

The 402's pages have their own skeletons (§5.7, §5.8).

### 3.2 What does not exist

No testimonials, pricing tables, service cards, stat counters or dashboard mockups, on any page. **No FAQs on Twelve's pages** — the one FAQ on the site is on `/402/support`, where the questions are real questions people ask about the app.

---

## 4. The homepage

The homepage is the entry experience, not a container. **It is one screen**: the nav strip, the hero panel and the footer stack to exactly the viewport, with nothing below. Two parts:

1. **Hero** — the immersive environment (§4.1), taking whatever height the strip and the footer leave.
2. **Footer** — three columns:

   ```
   TWELVE — OMAHA, NE        contact@bytw12ve.com                    12.
   © 2026
   ```

   The studio block sits left, with `© 2026` **directly beneath** the studio line — the copyright belongs to the studio, not to the stamp, and the two share a left edge. The email is centred in the bar. The `12.` stamp stands alone at the right edge as the studio signature, aligned to the block's first line.

   **The stamp's right edge is the same in the footer and in the open menu**, at every width. The signature is anchored, and must not shift horizontally when the menu opens over the page.

   **On the homepage the footer mirrors the nav strip.** One 44px row (`--nav-control-h`) and then `--page-gap` to the viewport's bottom edge, the way the strip is `--page-gap` and then one row. No hairline above it, for the same reason the strip has none: the panel's rounded edge is the separation. Below 1024 it is two 44px rows — the email, then the studio block and the stamp. Inner pages keep the hairline and `space-8` padding.

**There is no route section, and that is a decision rather than an omission.** A panel of four destinations lived between the hero and the footer through four rebuilds — a full-height index of `heading-lg` rows, four bordered cells, a single line of type, then four columns of type. Each version had the same problem: **MENU already reaches every route from every page**, so the section either repeated it or competed with it, and every attempt to make it lighter made it read as loose footer text instead.

It was removed at the fifth Stage 2 review. The homepage is the hero and the footer; MENU is the navigation. Anything proposed for that space has to answer what it does that MENU does not.

### 4.0 Load and scroll behaviour

**The homepage is one screen, and scrolling down opens the menu.** The hero fills what the nav strip and the footer leave, so on a desktop there is nothing to scroll to — and a downward scroll becomes the next step, which is MENU.

This reverses a rule. Until the Stage 2 follow-up review this section read "Scrolling never opens the menu"; Jaycee changed it there, once the page stopped having anywhere for a scroll to go. The history before that is still worth keeping so it is not rebuilt by accident: a 40–60vh pinned phase, then 10–20vh; a full-height index that rose beneath the hero, then a tray, then four columns; a reversible hero recession driven by an `IntersectionObserver`; a latched scroll listener with a threshold. Every one existed to reveal a section that no longer exists, and all of them went with it.

What holds now:

- **Nothing is pinned, nothing is revealed, nothing is scrubbed.** No observer, no sticky positioning, no transform on the hero. The layout never responds to scroll.
- **A downward scroll with nowhere to go opens MENU** (`ScrollToMenu`). The rules that keep it from feeling like a hijack:
  - it acts only when the document is **already at its bottom** — on a desktop that is always, on a phone too short for the page (below) the browser's own scroll finishes first, and a swipe has to *start* at the bottom to count;
  - it needs **real intent**: 60px of accumulated wheel travel in one gesture, or a 40px upward swipe. A trackpad brush does nothing;
  - **800ms of cooldown after closing**, so trackpad momentum from the scroll that opened it cannot reopen it;
  - listeners are passive and nothing calls `preventDefault` — scrolling itself stays the browser's;
  - the keyboard is not bound. Space and PageDown stay the browser's; the MENU pill is the keyboard path;
  - it opens through the same path as the pill — focus to the first row, trap, inert, scroll lock — and only on `/`.
- **`VIEW WORK` navigates directly to `/work`.** A link, not a scroll target.
- **One screen gives way to legibility, never the reverse.** Below 1024 the panel has a 600px floor, where §2.1's composition still holds — OMAHA, NE clears the VIEW WORK pill by 15px. A phone shorter than that (an SE at 667) keeps the floor and scrolls ~130px to the footer.
- The footer has no entrance on any route. Spacing, not animation.
- **Under `prefers-reduced-motion` nothing special is required**: the page is already static, and the menu drops its wipe. The star field keeps its own reduced-motion behaviour (§7.4).

**Every frame of a fade must pass contrast.** This outlived the reveal that produced it and stays as a general rule: content animating from `opacity: 0` is unreadable on the way in, and axe has failed real work on exactly that. Any fade over `void-900` is floored at **0.85**, where the dimmest text in play (`star-400`) holds 5.31:1 against a 4.5:1 requirement. Nothing is transparent at rest or in flight, and the floor is verified in a browser at the animation's lowest-opacity frame — not asserted from the stylesheet.

### 4.1 Hero composition

A `radius-xl` panel on `void-800`, inset `--page-gap` on every side. Four layers, back to front:

1. **Star field** — a `star-700` dot grid at 24px pitch, `opacity-grid`, with scattered four-point stars off-grid; sparser through the centre where the type lands, denser toward the corners. The grid says *interface*, the stars say *sky*. Generated from a seeded function so it is deterministic. `aria-hidden`.
2. **Pixel window** — `radius-lg` on `void-700` with `shadow-window`, right of centre, roughly the middle half of the panel's width. A hard-edged pixel world: sky, clouds, a grass horizon, flowers. Needs a short alt description — it is content, not decoration. The darkest grass is kept off the left of the window, where the lettering lands.
3. **Brand dot** — a ~336px `purple-500` circle bleeding off the window's left edge, half in the star field and half over the landscape. No copy inside it, ever.
4. **Wordmark and copy** — `twelve.` in `display-hero`, baseline crossing the lower third of the dot, last letters over the window. Below it one `body-lg` line, one `meta` descriptor, and the `VIEW WORK ↓` pill.

**The knockout.** Because the dot and the pixel world are light, the wordmark carries two extra layers: the same type, at the same coordinates, in `ink-900`, clipped to the dot's circle and to the window's rectangle. This gives 8.5:1 on the dot and 5.8–16:1 on the pixel world. If the dot or window moves, its clip moves with it, or the lettering shears.

**Both knockout layers are `aria-hidden`.** They are three copies of the same word; only the base layer is exposed, so the page announces "twelve." once.

Peripheral metadata, **two labels only**: `CREATIVE STUDIO — OMAHA, NE` and `EST. 2026` under the nav. **The bottom-right corner is deliberately empty** — `DIGITAL / EXPERIMENTAL` sat there until the Stage 2 review, where it read as noise rather than information. Nothing replaces it; the corner is there to let the composition breathe.

**The nav sits above the hero, as its own strip.** On the homepage only, the persistent nav drops its `void-900` background and its bottom hairline and becomes a clean strip in normal flow; the rounded environment begins underneath it and stands on its own. Every other route keeps the solid bar with its rule. It is the same nav component either way — one mark, one MENU control, mounted once — only its surface and position change.

The strip carries **no rule of its own**: the panel's rounded edge is the separation, and a hairline directly above it would be a second competing edge. The nav overlapped the star field until the Stage 2 review, which is what this replaced — the reference render shows the nav inside the panel, and standing it above reads better in a browser than it does in a static frame.

**The homepage nav is the wordmark and MENU, nothing else.** The inline Work / About / Playground shortcuts were hidden on `/` first, because three links beside MENU crowded the one screen whose job is to be an entry experience. Pages v2 then removed them everywhere (§3), so every route's nav is now what the homepage's always was.

**The composition breathes.** The wordmark, line, descriptor and `VIEW WORK` form one stack anchored to the panel's lower left, spaced by tokens rather than by individual coordinates, and lifted clear of the panel's bottom edge. Peripheral labels sit further in from the corners than the reference render shows. The dot, the pixel window and the wordmark keep their reference positions — this is air around the composition, not a new composition.

**The hero carries no `12.` stamp, at any width.** It was vertically centred on the left edge, then moved high on that edge, then set upright in the mobile bottom-right corner; at the third Stage 2 review it came out altogether. It is not relocated to another corner and it is not replaced by another label — the space it held is now part of the composition's air. The stamp remains the studio signature in the footer and the open menu (§6.1), where it is anchored and unambiguous; in the hero it was a third mark competing with `twelve.` and the dot.

**One gap, used four times.** `--page-gap` is `space-4` (16px) at every width, and it sets the distance above the nav strip's content, the distance from that content to the panel, the distance from the panel to the footer's row, and the distance from that row to the viewport's bottom — as well as the panel's own inset on all four sides.

```
┌─ page top
│  16px
│  twelve.   MENU                          44px, the tallest nav control
│  16px
│  ╭──────────────────────────────────╮
│  │          the hero panel          │
│  ╰──────────────────────────────────╯
│  16px
│  TWELVE — OMAHA   contact@…   12.       44px footer row
│  16px
└─ viewport bottom
```

Measured at 1440×900: 16 / 16 / 16 / 16, footer bottom at 900, scroll height 900.

**The strip is a gap plus one control**, 60px, rather than a bar with its content centred in whatever height it happens to be. Centring in a 72px strip put 14px above the MENU pill and 38px below it, which is what made the hero read as pushed down and cut off at the bottom. The wordmark and the pill both carry `min-height: var(--target-min)`, so they fill that 44px row exactly.

On the homepage the strip's bottom border is removed by **width, not only colour** — a transparent 1px border still occupies a pixel, takes it out of the content box, and centres the control half a pixel high. That is measurable: the gaps read 15.5 / 16.5 / 16 until the width went to zero.

The order never changes: the panel does not rise into the strip, and the strip never sits over the star field. Inner pages keep the 96px bar with its background and rule.

**There is no maximum width.** The panel takes whatever the display gives it, and the composition scales with it — including the wordmark, which is the §1.3 exception. Not a fixed 88vh, and not a fixed aspect ratio: the browser's shape wins over the reference's.

**Its ratio is free within 2.1:1 and 1.25:1**, which covers every ordinary window, so in practice the panel always fills. Past those bounds the leftover becomes gutter and it letterboxes rather than stretching — **2.1 is where the brand dot, sized from the panel's width, stops bleeding off the pixel window's left edge**, which is the composition's first relationship to break. A deliberately squashed window is the only case that sees side gutters, and it stays centred in them.

**The homepage nav strip is 72px**, not the 96px bar the inner pages use — it carries only the wordmark and MENU. Below 1024 it is 64px, as it already was.

```
2560×1440   panel 2528×1348   wordmark 382px
1600×1000   panel 1568× 908   wordmark 251px
1440× 900   panel 1408× 808   wordmark 225px
1024× 768   panel  992× 656
 390× 844   panel  358× 748   (§2.1's composition)
```

This replaced a panel locked to the reference's 1376×776. Locking the ratio meant deriving the width from the available height, and once the nav became a strip in flow that left the panel at 1234×696 on a 1440×900 window — a card adrift in black, which is what the third Stage 2 review rejected. It is now 1392×756 there.

**Coordinates are proportional on both axes**: horizontal against the panel's width, vertical against its height. §4.1's shearing rule is *same axis, same container* — a knockout's offset subtracts two horizontal values or two vertical ones, and both resolve against the panel, so the arithmetic holds at any ratio. The wordmark's size is bounded on **both** axes, because a width-only bound oversizes it on a short wide panel and drives the copy beneath it off the bottom edge. The brand dot is sized from the panel's width alone and holds a 1:1 ratio, so it stays a circle.

**Responsive rule for the hero composition.** Two compositions, one threshold:

- **1024px and above** — the desktop composition, laid out in proportion to the panel rather than at fixed pixel offsets. Every element keeps its relative position as the panel narrows from 1440, and the wordmark scales down from `display-hero` rather than being cropped.
- **Below 1024px** — the separate mobile composition in §2.1. Not a squeezed desktop: the window becomes a band, the dot moves upper-right, the type drops below the window, and the knockout layers disappear because the type no longer crosses anything light.

1024 is also where the nav's bar drops from its desktop height to 64px (§2.2), so the page changes character once, not twice.

---

## 5. Page specs

The copy for every page below lives in the content layer (`docs/BUILD.md` §Content Structure), verbatim from `twelve-design/pages-v2/prototype/index.html`, which Jaycee approved line by line. This section describes structure and behaviour; it quotes copy only where the copy *is* the design.

### 5.1 My work

Reference: `twelve-design/screens/MyWorkDesktop.png`, `MyWorkMobile.png`.

**Only finished, public projects.** Today that is one: the 402. keeb.wiki and Ledger Coffee live in the Playground until their own pages are designed; Mosh and Ground are gone.

- **Opener** — eyebrow `My work`, slab **My work.**, lead, labels `1 project` / `More on the way`. The count is derived from the content, not typed.
- **The feature card** — one large `marquee-500` card, `radius` 28, the whole card one link to `/work/the-402`. Left: a `the402-label` row (`01`, `iOS & Android app`, `2026`), the full THE 402 logo in cream, a cream `the402-section`-class headline, the lead paragraph, the tags (`Beta Oct 31` on a `night-900` fill, then `iOS`, `Android`, `Free`), and a footer row with the call to action and a cream circle holding the arrow. Right: two app screens, overlapping and floating (§7.5), behind them a `marquee-600` tower silhouette.
  - **Contrast (§1.5):** the headline is large and stays cream. The label row, paragraph, tags and call to action are set in `night-950`, not cream as the prototype has them — they are under 19px.
  - Below 900 the phones drop beneath the text in a 440px band.
- **The Playground note** — a dashed `star-700` box: one `star-400` line saying where keeb.wiki and Ledger Coffee went, and a `purple-400` `meta-lg` link to `/playground`.

### 5.2 About

Reference: `twelve-design/screens/AboutDesktop.png`, `AboutMobile.png`.

1. **Opener** — eyebrow `About`, slab **About.**, lead in first person, labels `Omaha, NE` / `Est. 2026`.
2. **Intro** — two columns, 5:7. Left: the **photo frame**, 4:5, `radius` 20, `void-700` with a dashed `star-700` border, three square pixel sparkles in `purple-500`, `bloom-500` and `bloom-300`. Until Jaycee supplies her photo it shows a drawn silhouette and `Photo of Jaycee goes here`; the real photo replaces the inside, the frame and sparkles stay. Right: the story — a `heading` question-length line at fluid 28→40, three paragraphs (the last in `star-400`), and a facts list (`Based in`, `Started`, `Team`) under a hairline.
3. **The statement band** — `paper-100`, full bleed: a `purple-ink` rule and `meta` label on the left, the statement in fluid 34→64 `editorial` 500 on the right with its key phrase in `purple-ink`, and a supporting line in `ink-600`. A large `purple-500` dot sits off the bottom-right corner, behind the text. Still the only paper in any page's content.
4. **What I make** — a `meta` header row over four columns (Apps, Websites, Games, Whatever's next), each a 40px line glyph in `purple-500` (§6.3), a name in `display` at fluid 26→34, and one `star-400` line.
5. **Before twelve.** — a `radius` 24 band holding a pixel world drawn by the site's own generator (seed 402), the caption `Before twelve.` in `ink-900` over the sky, and nine paper chips **pinned across the scene** (a purple pin on each, a slight tilt, a gentle bob), naming what Jaycee made growing up. Her favorite, the GTA 5 roleplay server, is a size up with a purple-ink edge and a `My favorite` label. Below 1024 the pins fall into a wrapped flow. (Pages v2 review, 2026-09-27: this replaced a scrolling ticker.)
6. **Want to make something together?** — a `display` slab at fluid 44→88, a paragraph, and a `purple-500` pill `Get in touch →` to `/contact`.

### 5.3 Side projects (formerly Playground)

Reference: `twelve-design/screens/PlaygroundDesktop.png`, `PlaygroundMobile.png`.

**Real projects only.** Four: keebwiki (live; its page is coming soon), Ledger Coffee (a concept inspired by downtown Omaha), wake. (a psychological mystery game, starting 2027), this website (live).

- **Opener** — eyebrow `Playground`, slab **Playground.**, lead, labels counting things and live things, derived from the content.
- **Filter** — a row of chips, `All` / `Live` / `Building` / `Concept`, each with its count. `aria-pressed` toggles; the pressed chip fills `star-100` with `ink-900` text. Filtering hides the other cards and animates the remaining ones back in (§7.5). Without JavaScript every card shows and the filter does nothing harmful.
- **Cards** — a two-column grid (one below 760), `void-700`, `radius` 18. Each: a 280px visual with a status badge (`Live` carries a pulsing green dot), a title at 26px `editorial` 500, one `star-400` line, a `meta-sm` kind and date, and a footer row.
  - A card with somewhere to go has a real link in its footer row — `Visit site ↗`, `Go to the homepage ↗` — which opens in a new tab. The card itself is not a link (§7.1).
  - A card with nowhere to go has a plain `star-400` footer line instead (`Page coming soon`, `Nothing to play yet`). No link, no arrow, not focusable.
  - **Hover lift** is only on cards with somewhere to go, per §7.1. The prototype lifts all four; the build does not (settled with Jaycee, 2026-09-26).
- **Why the Playground is separate from My work** (Jaycee, 2026-09-26): My work is finished things people can use and test. The Playground is prototypes and work in progress. A project moves across when it is finished.
  - Each visual is its own small piece: keeb.wiki's keyboard presses its own keys; Ledger Coffee's brick wall and sign with a spinning brass coin; the game's pixel stars and a stepped loading bar; this website's stars that flee the cursor, the purple dot and a `12.`. All are `aria-hidden`.

### 5.4 Contact

Reference: `twelve-design/screens/ContactDesktop.png`, `ContactMobile.png`.

- **Opener** — eyebrow `Contact`, slab **Contact.**, lead, labels showing Omaha's local time and `Email is the easiest way`.
- **The slab** — `Let's make something.` in `display-page` across two lines, with a large `purple-500` dot orbiting slowly behind it. Where the letters cross the dot they turn `ink-900` — the hero's knockout technique (§4.1), a second `aria-hidden` copy clipped to the dot's circle, which follows the orbit. Beneath: the address as underlined text and a ghost pill `Copy address` that confirms with `Copied`. The address is also a `mailto:` link.
- **Three columns** under a hairline: working together, what to send (a list), and where to find me online.
  - **"Find me online" is GitHub and YouTube** (`@bytw12ve` on both; no Instagram). The menu footer lists both. The prototype's `Instagram — link coming` row is dropped, and `@bytw12ve on both` becomes `@bytw12ve on GitHub`. GitHub links to the TWELVE repository (`src/lib/site.ts`), which is being made public.
- **No contact form**, no newsletter, no calendar embed. The removed "replies within two days" promise stays removed.

### 5.5 Case study — `/work/[project]`

**Deferred (Pages v2).** The template is designed and kept, but nothing uses it yet: My work has one project, and the 402 has its own page (§5.7). It is built when a second finished project exists. The references below were rendered before Pages v2 and show the old studio voice and footer.

Reference: `twelve-design/screens/CaseStudyDesktop.png` (long), `CaseStudyDesktopShort.png` (short), `CaseStudyMobile.png`.

One template that has to hold a long, image-rich story and a four-paragraph note without either looking wrong.

**Structure, in order:**

1. **Back link** — `← BACK TO WORK` in `meta`, 44px target. The only upward navigation besides the nav.
2. **Opener** — the kind chip, the project name at `display-xl`, and a summary at `body-lg` (max 640px). The project name is the page's single `h1`.
3. **Metadata bar** — a `hairline-dark` rule above and below, five columns: `YEAR`, `KIND`, `ROLE`, `STATUS`, `ELSEWHERE`. Labels in `meta-sm` `star-400`, values in `body`. `ELSEWHERE` holds the external links — live site, App Store, repo — each underlined in `purple-500` with a `↗`. **A project with nothing public shows "Not publicly available" in `star-400` rather than an empty column or a dead link.**
4. **Cover** — full-width `radius-md` well, 3:2, with a `meta-sm` caption beneath. Real imagery replaces the placeholder art in the previews.
5. **Body** — a two-column grid: a 200px margin column holding `01`, `02`, `03` section numerals in `purple-500`, and a prose column capped at 680px. Section headings at `heading-lg`, paragraphs at 18px/1.65.
6. **Optional blocks**, used only where they earn it: a pull quote (`heading-lg`, 2px `purple-500` left rule) and paired screenshots in a two-up grid with one `meta-sm` caption under the pair.
7. **Previous / next** — two bordered tiles above the footer, `← PREVIOUS` and `NEXT →` in `meta-sm`, project name at `heading-lg`, kind and year beneath. The next tile is right-aligned. At the ends of the list, show only the direction that exists rather than a disabled tile.

**The short state is not a different template.** It is the same file with fewer sections: opener, metadata, cover, one section, prev/next. What keeps it from looking broken is that the metadata bar and the cover carry the page — so a short entry still reads as a finished thing, not a stub. Never pad a short case study to fill the layout.

**Mobile.** Everything stacks. The project name drops to 56px, the metadata bar becomes a two-column grid with `ELSEWHERE` spanning full width, images go full-bleed within the gutter, and prev/next stack vertically.

**Accessibility.** One `h1` (the project name), `h2` per section, numerals decorative. Every external link says where it goes and opens with `rel="noopener noreferrer"`. Images carry real alt text — the cover describes the product, not the layout. Prev/next are plain links in a `nav`.

### 5.6 Not found — 404

Reference: `twelve-design/screens/NotFoundDesktop.png`, `NotFoundMobile.png`.

Branded, short, and pointed back into the site. It reuses the hero's one visual idea at small scale rather than inventing anything.

- `404` set in `display-hero` on flat `void-900` — **no star field**, per §3.1.
- The brand dot sits behind the numerals, overlapping them, and the numerals carry **the same `ink-900` knockout** the hero wordmark uses (§4.1) where they cross it. Same technique, same contrast guarantee, one third the size.
- One line of copy in `body-lg`: *"This one didn't make it out of the Playground. The page you asked for isn't here — it may never have been."* Then `TWELVE — PAGE NOT FOUND` in `meta`.
- Two controls: `← HOME` in a `purple-500` pill, `VIEW WORK →` in a `hairline-dark` ghost pill. Two ways out, no more.
- The `12.` stamp rotated on the left edge, as on the homepage hero.
- **No route shows as current in the nav** — the visitor is nowhere, and the nav should not claim otherwise.
- Mobile: `404` at 96px, dot behind it top-right, the two controls stacked full-width at 52px, stamp below.

---

### 5.7 The 402 — `/work/the-402`

Reference: `twelve-design/screens/The402Desktop.png`, `The402Mobile.png`; the live mockup is `twelve-design/pages-v2/prototype/index.html#the402`.

**A one-off page, not a case study.** It carries the app's own skin (§1.5): the whole page is `marquee-500`, with cream as the accent and `night-950` for text. Twelve's footer closes it on `void-900`. It is the product page for an app that is about to launch, so it sells the app, explains it, takes beta signups and links to the help pages the stores require.

**The nav on this page** takes the orange: a translucent `marquee-500` bar, the wordmark in cream with its period in `night-950` (large text, passes), and the MENU pill in `night-950` with a `night-950` border — **not cream**, which fails at 12px. These styles are scoped to the nav's resting state only. **The menu itself is untouched**: it is the same paper menu on every route, and CLOSE must stay `ink-900` on paper. The prototype's first version inherited the page's cream into the menu's CLOSE pill and made it vanish.

**Sections, in order:**

1. **Crumb** — `← My work` left, `01 · App · 2026` right, both `the402-label` in `night-950`.
2. **Hero** — two columns, 6:5. Left: one `h1` made of `What's on in` in `the402-hero` cream **and** the full THE 402 logo as an SVG, with "The 402" as its accessible text; the lead in `night-950`; the countdown pill (`night-900` with a pulsing `corn-400` dot: `Beta opens Oct 31 · N days`, read from one constant); the `Join the beta →` button (cream fill, `night-900` text) scrolling to the signup; and `Coming soon to the App Store and Google Play` with the two store glyphs. Right: two app screens floating over a `marquee-600` tower. The logo's tower grows up out of the "0" on load (§7.5).
3. **Why I made it** — a `night-950` panel, `radius` 28: label in `marquee-500`, the statement in `the402-quote` cream with two phrases in `marquee-500`, and Jaycee's signature. A `night-800` tower rises behind it as it scrolls in.
4. **The app tour** — the screens have the phone's rounded corners (`AppScreen`). Event details names parking but **not weather**, which the app does not show yet. Four rows, alternating image side: Home, Discover, Event details, Nearby. Each: the screen on a cream well with a `marquee-100` halo and two `night-900` notes pinned to it, then a numbered step label, a `the402-section` heading in cream and a paragraph in `night-950`. Screens are **real captures of the app from the iOS Simulator** (`twelve-design/pages-v2/app-screens/`, 2026-09-27), served through `next/image`, with alt text describing what each one actually shows. The design package's patched crops are not used: they, and the App Store exports, carry an embedded provenance tag and do not go in this repository.
5. **Also in the app** — the app icon beside a real screen, and a two-by-two feature list: Save it for later, Make lists, Interested or going, Notifications. **Notifications carries a `Coming soon` tag** (Jaycee, 2026-09-27): the app does not send any yet, and the tag comes off when it does. The Saved screen needs a signed-in account, so it is not captured; the screen here is the create-account screen ("Keep what you find worth keeping"), which says what an account is for.
6. **About the logo** — a `night-950` panel: `The 0 is a building.` and two paragraphs on the left; the logo on the right, where the letters dim and the tower pops up in orange with a callout, `Mutual of Omaha tower · 677 ft`. **The copy is Jaycee's, approved as written — keep it exactly. The joke is never spelled out.**
7. **Beta signup** (`#beta`) — a cream panel with three `marquee-100` towers drifting up behind it. Left: label in `marquee-700`, `Try it before everyone else.`, one paragraph. Right: the form (§6.4). Beneath, across both columns: `Coming to` and the two store badges, not links yet.
8. **The fine print** — `Your data stays yours.` and four checked points on cream tiles, then a list of links to the four help pages. **The four points are the app policy's short version (`POLICY_SHORT`), word for word**, read from the same content module as the privacy page so the two cannot drift (Jaycee, 2026-09-26). They replace the prototype's four, whose first point, `Only your name, email, and location`, the policy contradicts.
9. **Back / Next** — `← Back · My work` and `Next → · Playground`, the names in cream `the402-section`-scale type, the small labels in `night-950`.

**Contrast fixes over the prototype** (§1.5): the nav's MENU pill, the step-circle numerals, the form's submit label (set at 19px/700 so cream passes, or in `night-950`), and every orange label on cream (`marquee-700`, not `marquee-600`). Hover on the fine-print links and the crumb moves and underlines them; it does not turn them cream, which would fail at their size.

### 5.8 The 402's help pages — `/402/*`

Reference: `twelve-design/screens/The402{Privacy,Terms,Support,DeleteAccount}{Desktop,Mobile}.png`.

Four pages the stores require as public URLs: **Privacy policy** (App Store Connect), **Support** (App Store Connect), **Delete your account** (Google Play), and **Terms of service**. They are for people who need an answer, so they are plain: one readable column on `cream-50`.

**Skeleton:**

1. The nav on cream: `cream-50` bar, `night-900` wordmark with a `marquee-500` period (large, passes), `night-900` MENU pill.
2. **Crumb** — `← The 402` left, the page's own address right (`bytw12ve.com/402/support`, built from `src/lib/site.ts`).
3. **Header card** — `marquee-500`, `radius` 24: the 402 mark (the "4‑tower‑2" with the tower in `night-950`), the title in `the402-title` cream, one line in `night-950`, and a version line where the page has one. A `marquee-600` tower sits in the corner.
4. **Body** — one column, max 680px, `the402-body` in `night-700`; section numerals in `marquee-700`; headings in `the402-heading`; links in `river-600`.
5. **Link row** — pills to all four pages plus `About the 402`, closing every page.
6. Twelve's footer, on `void-900`, as on the 402 page.

**Per page:**

- **Privacy policy** — **the launch text is Jaycee's legal draft of 2026-09-26 (v1.1)**, which leads the app this once: `policy.ts` in the app takes the same words next. Before that it was `apps/mobile/src/features/legal/policy.ts` in the 402 repository (Jaycee's decision, 2026-09-26). Its version and "updated" date go in the header; `POLICY_SHORT` renders as the dark "short version" box; each section's question is an `h2`, with a jump list at the top. The draft's wording is not used. Jaycee may want a joint review of both texts; if the words change, they change in the app file first.
- **Terms of service** — the handoff's draft, with Jaycee's answers (2026-09-26): **only verified organizers post events** for now, and everyone else browses, saves and follows, so the posting line stays and applies to organizers; minimum age 13, matching the policy; effective **October 31, 2026**; governed by the laws of **Nebraska**. It ships after her final read at the PR 3 review. If the app's policy later says something different about organizers, the Terms follow it.
- **Support** — the intro, the email in a copy box, `What to include` as three numbered steps, and five questions as an accordion (§7.5). One question's answer links to the beta signup on `/work/the-402#beta`.
- **Delete your account** — in-app steps, then **Already deleted the app?** by email, then what gets deleted. Email requests are answered **within 7 days**. `What gets deleted` names what the policy names (username, followed organizers, preferences, Interested/Going marks).
  - **A 14-day grace period is coming** (Jaycee, 2026-09-26): the account disappears immediately, can be restored by signing back in within 14 days, and is erased after that — so someone who changes their mind can come back, and someone who leaves is gone. **This is app behaviour, so it lands in the 402 app and its `policy.ts` first.** Until then the page describes deletion as the app does it today, and the grace-window sentences are `pending`: built, visible in previews, absent from production. The prototype's backups sentence is replaced by whatever the updated policy says about backups.

**Draft markers never ship.** The yellow question highlights and the `Draft` boxes in the prototype are review aids. The build renders them only in development and preview builds. In production a pending *clause* is left out, and a page that cannot stand without its pending parts (the Terms) is left out entirely.

## 6. Components

| Component | Where it lives |
| --- | --- |
| `NavBar` | Site layout — persists across page transitions |
| `MenuOverlay` | Site layout |
| `FooterBar` | Site layout |
| `HeroEnvironment` | `/` only — star field, pixel window, brand dot, knocked-out wordmark as children |
| `PageOpener` | My work, About, Playground, Contact — the slab with the purple period (§3.1) |
| `FeatureCard` | `/work` — the 402's orange card (§5.1) |
| `PhotoFrame` · `StatementBand` · `MakeGrid` · `BeforeTwelve` | `/about` |
| `PlaygroundFilter` · `PlaygroundCard` | `/playground` |
| `ContactSlab` · `CopyEmail` | `/contact`; `CopyEmail` also on the 402's help pages |
| `The402Logo` · `Countdown` · `AppScreen` · `BetaForm` · `HelpHeader` · `HelpLinks` · `Faq` | the 402's routes (§5.7, §5.8) |
| `Reveal` | any section that nudges into place as it scrolls in (§7.5) |
| `MetaLabel`, `StudioStamp`, `Chip`, `PillButton` | Everywhere |

`IndexRow` and `WorkRow` are retired: the homepage has no route section (§4) and My work has no rows until there is more than one project.

The star field takes a density prop and renders from a seeded generator, so it is deterministic across renders. The pixel landscape is driven by a cell array, so the art can change without touching layout.

### 6.1 The `12.` stamp

`12.` in `display-stamp` with a purple period — `purple-500` on dark, `purple-ink` on paper. At most twice per page: once as a graphic annotation at a page opener, and once in the footer. **Never in the homepage hero** — §4.1. Rotate only to 90°, never past 32px, never inside a button, never as a bullet.

### 6.2 The full-screen menu

Reference: `twelve-design/screens/MenuDesktop.png` and `MenuMobile.png`.

The menu is the site's primary navigation and is identical on every route.

**Desktop.** `paper-100` fills the whole viewport, inset `space-16` horizontally, `40px` top / `34px` bottom. Three bands:

- **Top** — the `twelve.` mark in `ink-900` with the period in `purple-ink`, left; the CLOSE pill right, at the exact coordinates the MENU pill occupied.
- **Rows** — five, vertically centred in the remaining space, each a `hairline-light` rule above (and below the last). Per row: a `meta` numeral `01`–`05` top-aligned in a 34px column, the label in `menu-row` `ink-900`, and a right-aligned `meta` hint in `ink-600`. Labels and hints since Pages v2: `Home — START HERE`, `My work — FINISHED THINGS`, `About — WHO'S MAKING THIS`, `Playground — EVERYTHING ELSE`, `Contact — SAY HI`. The menu's design is otherwise unchanged.
- **Footer** — the email left, the social links centre, the local time and the `12.` stamp right, all `body-sm` / `meta` in `ink-600`. The studio has **GitHub only** (`https://github.com/bytw12ve/TWELVE`); there is no Instagram. A social with a URL in `src/lib/site.ts` is a real link — new tab, a `↗` glyph, "(opens in a new tab)" for screen readers, `ink-600` → `ink-900` with an underline drawing in from the left on hover and focus, 44px tall. One without a URL is plain text (§7.1).

**Mobile.** Same structure at `space-4` gutters. Rows drop to `heading-lg` with the numeral **inline before** the label, each row ≥ 64px tall. The footer stacks to three lines: email, socials, then time and stamp on one row.

**States.** Row hover fills `paper-200` left-to-right over 220ms and turns the numeral `purple-ink`. The current route's numeral is `purple-ink` at rest. Focus is a 2px `focus-light` ring at 3px offset.

The menu must read as the same studio as the dark pages — same type, same stamp, same restraint. It is an inversion, not a different site.

### 6.3 Iconography

Almost none. Three marks, drawn as inline SVG at 1.5px stroke in `currentColor`: the two-bar MENU glyph, the CLOSE cross, and the arrow. Arrows inside text controls are typographic characters; SVG only where they animate. Do not introduce an icon library.

Pages v2 adds a small, closed set, all inline SVG in `currentColor` taken from the prototype: the four "What I make" glyphs on About (2px stroke, 40px), the check mark, the Apple and Google Play glyphs on the 402's store badges and phone choice, and the 402's own shapes — the tower, the 402 mark and the full logo, from `twelve-design/pages-v2/assets/the-402/`. Still no icon library.

### 6.4 The beta form

On `/work/the-402` (§5.7, `#beta`). A white card on the cream panel.

- **Email** — label `EMAIL` in `the402-label` `night-500`; a 54px field, `radius` 12, with a 1.5px `night-500` border (the prototype's 22% ink border measures about 1.7:1 and would leave the field marked by nothing that clears 3:1); focus adds a `river-600` ring.
- **My phone** — a two-choice radio group, iPhone / Android, as two 52px segments with their platform glyphs. The chosen one fills `night-900` with cream text. iPhone is chosen by default. The platform is asked because TestFlight invites by Apple ID email and Play closed testing by Google account email.
- **Join the beta** — full-width `marquee-500` button (contrast rule in §5.7).
- **Fine line** — `One email when your invite is ready. Nothing else.`
- **States.** An invalid email shows `That email doesn't look right. Check it and try again.` in `marquee-700` and returns focus to the field. While sending, the button is disabled and says so. **Success** replaces the form with a `prairie-600` check, `You're on the list.` and a line naming the phone and the address. **Failure** (network or server) keeps what was typed and says it did not go through, with the email address as a fallback. The success copy is the prototype's minus its "design preview" line; the sending and failure lines are new copy and need Jaycee's OK.
- It works without JavaScript: a plain `POST` that lands on a server-rendered success or error state.

Where the signup goes is a build decision — `docs/BUILD.md` §Contact.

---

## 7. Interaction

### 7.1 Hover and focus

| Element | Hover | Focus |
| --- | --- | --- |
| MENU pill | Fill `void-800` → `void-600`, border to `star-400` | 2px `focus-dark`, 3px offset |
| VIEW WORK | Arrow slides down 4px and returns | 2px `focus-dark` |
| Menu row | Ground fills `paper-200` left-to-right, 220ms; numeral turns `purple-ink` | 2px `focus-light` |
| My work card | The phones drift apart (§7.5); the tower rises 24px; the arrow circle grows and turns −45° | 2px `night-950` on the card |
| Playground card (with a link) | Lifts 6px, border to `star-700`; the link's `↗` nudges up and right | 2px `focus-dark` on the link |
| Filter chip | Lifts 2px | 2px `focus-dark` |
| What I make column | The name moves 6px right and turns `purple-400` | — (not interactive) |
| `Get in touch` / purple pills | Lift 3px over a `purple-ink` shadow; the arrow moves 5px right | 2px `focus-dark` |
| Copy buttons | — ; the label confirms `Copied` for 1.8s after a click | 2px `focus-dark`, or `night-900` on cream |
| Footer `12.` | Rotates −12° and scales 1.1 on a spring | — (not interactive) |
| The 402's buttons | Lift 2–3px over a `marquee-700` shadow | 2px `night-950` on orange, `night-900` on cream |
| The 402's text links (crumb, fine print, back/next) | Move right and underline; never recolour to cream (§5.7) | same |

The inline nav link row is gone (§3), and so are the index and work rows it was paired with.

Hover is always additive. Nothing appears on hover that was not already visible — arrows, labels and titles are all present at rest, so nothing is discoverable only by pointer.

Other states:

- **Active / pressed** — the element's hover treatment plus a 1px downward nudge on pills. No colour flash.
- **Current route** — a persistent `purple-500` underline in the nav; `purple-ink` numeral in the menu.
- **Non-interactive by design** — a Playground card with nothing to open is not a link, not focusable, has no arrow and no hover response, and its title sits in `star-400`. This is a designed state, not a disabled one.
- **Visited** — not styled. Links look the same before and after.

### 7.2 Menu

Opening: the paper panel wipes down from the top over **560ms on `cubic-bezier(0.76, 0, 0.24, 1)`** — an ease-in-out — bottom corners at `radius-xl` during the wipe, settling square. Closing reverses at **380ms** on the same curve.

Rows **follow the curtain's edge** rather than starting with it: row *n* begins at `160ms + n × 55ms`. Its rule, numeral and hint fade in over 480ms; its label **rises out of its own line** — `translateY(125%)` to rest, masked by `overflow: clip` on the label, over 640ms on `cubic-bezier(0.16, 1, 0.3, 1)`, 40ms behind its row.

Revised at the Stage 2 follow-up review, because the first version felt rough: the rows faded up in step with the wipe, so most of their entrance happened under a clip that had not reached them yet and all anyone saw was the tail — a pop. And a full-screen curtain on a strong ease-out lurches on its first frame and crawls to the end; in-out reads as one weighted movement. Two curves, then: the curtain eases in and out, everything on it eases out and settles.

The MENU pill cross-fades into CLOSE in place — same position, same pill — so the control never appears to move, over 300ms on the curtain's curve so it finishes inside the wipe.

Focus moves to the first row on open and returns to the pill on close. Escape closes. Focus is trapped while open; the page behind is `inert` and scroll-locked. The current route's numeral shows `purple-ink` at rest.

**Row hover.** The `paper-200` band sweeps in from the left and **leaves to the right** — it passes through the row instead of retracting — over 420ms on the settle curve. The label moves `space-3` right, the numeral turns `purple-ink` over 300ms, and **the other rows' labels step back to `ink-600`**. Colour, not opacity: `opacity-muted` would take the `ink-600` numerals and hints below 3:1, and every frame must pass contrast (§4.0). `ink-600` on paper holds 6.0:1.

Under reduced motion: no wipe, no stagger, no rise, and hover states change instantly.

### 7.3 Page transitions

Outgoing page fades to 0 over 160ms; incoming fades up 12px over 320ms on the same curve. Nav and footer do not participate — the frame is continuous, only content changes. A link followed from the menu closes the menu first (320ms), so paper never cross-fades straight into a dark page. Under reduced motion, the swap is instant.

### 7.4 Ambient motion

- **Twinkle** — stars cycle opacity 0.25 → `opacity-twinkle` over 3–7s, randomised delays, never synchronised. The grid does not animate.

  **It has to be visible.** The first Stage 2 build twinkled 41% of a field whose median mark is 2px, and the result read as a static texture — every approved behaviour present, all of them below the threshold of perception. The whole field now twinkles, with per-star depth so it shimmers rather than pulsing in unison, and a few marks per minute flare brighter still. Tasteful is the falloff and the asynchrony, not the amplitude.
- **Flare** — a small number of stars per minute brighten sharply and fade, with a brief halo. Never many at once.
- **Cursor** — stars within ~180px brighten and drift away from the pointer, easing back over 600ms, strongest at the centre and fading to nothing at the edge of the radius. The environment should read as interactive the moment the pointer moves. Felt, not watched — but felt.

  **Pointer devices only.** Gated on a fine hover-capable pointer, not on viewport width, so a touchscreen laptop behaves correctly. Touch devices keep every ambient behaviour and simply have no cursor to respond to.
- **Companion star** — one brighter mark that follows the pointer across the field. It is a star, not a cursor: the same four-point mark, the same white, one size step up, with the restrained halo the glowing stars already carry.

  - It **does not exist until the pointer first moves** inside the field, and then fades in. A mark already waiting at page load reads as an interface element; one that appears because you moved reads as a response.
  - It **trails behind** on an eased lag, and rests a short distance *behind* the direction of travel, so it never sits under the cursor — even once movement stops.
  - A **short, faint trail** of a few frames follows it. Enough to read as movement; not a comet.
  - When movement stops it **settles and twinkles** on the field's own rhythm, so it stops reading as a pointer and becomes a star again.
  - When the pointer leaves it **fades back into the field** rather than vanishing, holding its last position on the way out.
  - It works **alongside** the proximity response above, not instead of it. Two effects, one pointer.

  Same three gates as the cursor response: fine pointers only, nothing under reduced motion, and it pauses with the rest of the field when the hero is off-screen or the tab is hidden.
- **Streak** — one star drifts and fades every 6–12s, leaving a short trail. Never two at once.
- **Pixel world** — clouds translate ~40px over 60s, looping; 2–3px parallax against the star field on scroll. Nothing else moves.
- **Walker** — a small half-cell pixel figure (`paper-100` head, `purple-700` body, `ink-900` legs) parked at the right of the horizon. Hovering the window walks it left across 46% of the world in whole-pixel steps over 2.4s, legs swapping between two frames; leaving walks it home. It stops well right of the dot and the wordmark's knockout, which cover the window's left quarter, so it never passes under the lettering. Pure CSS, drawn after the generated world so the generator's draws are untouched. Nothing under reduced motion.
- **Brand dot** — a 6px vertical float over 8s. No rotation, no pulse, no glow. The knockout is clipped to the dot, so animate a wrapper holding both — never the two separately.

  **It leans toward the pointer**: up to 10px, strongest near the dot and nothing past 560px, eased over ~420ms and back to rest when the pointer leaves. Driven from the star field's existing pointer loop into `--dot-lean-x/y` on the hero, applied with the individual `translate` property so it composes with the float. The knockout lettering runs the exact inverse, the same way it cancels the float, so the type never shears — measured at 0.02px. Same gates as the cursor response: fine pointers only, nothing under reduced motion.
- **Type reveal** — fade up 12px over 500ms, 80ms stagger: metadata, wordmark, line, CTA. No character splitting, no scroll-scrubbed animation.

The page must look finished with every animation paused. That is the test for any new motion.

### 7.5 Page motion — Pages v2

Jaycee likes this motion; it is part of the design, not decoration to trim. Every item obeys three rules: **it is off under `prefers-reduced-motion`**, **nothing rests invisible waiting for a script** (a reveal is a translate, applied from the client after mount, never an opacity in the server HTML — §4.0), and **the page looks finished with all of it paused**.

| Where | Motion |
| --- | --- |
| Every inner-page opener | The slab's words rise out of their own line (`translateY(105%)` to rest under `overflow: clip`, 900ms, 80ms apart); the purple period drops in with a small bounce 350ms later |
| Sections | Nudge up 36px into place as they scroll in, **once**. Translate only. Sections already in view on load do not move |
| Menu | Unchanged from §7.2 |
| My work card | Both phones float on slow loops (6s, 7s). On hover they drift apart using the individual **`translate`** property, so the hover never fights the float's `transform` — the snapping Jaycee saw in the prototype came from animating the same property twice |
| About | The photo frame tilts −1.5° on hover; the sparkles blink in two steps; the statement dot drifts and breathes over 7s; the pixel clouds drift; the "Before twelve." chips scroll on a 38s loop, pause while hovered or focused, and lift when hovered |
| Playground | Cards lift on hover; filtering animates the remaining cards back in with a small scale spring, 60ms apart; keeb.wiki's keys press themselves; Ledger's brass coin spins; the game's loading bar fills in 14 steps; "This website"'s stars flee the cursor |
| Contact | The dot orbits over 12s; its ink knockout stays clipped to it every frame; the copy button confirms |
| The 402 | The logo's tower grows up out of the "0" on load; the phones and notes float and bob; the countdown pill's dot pulses; the Why panel's tower rises as it scrolls in; the logo section dims the letters and pops the tower; towers drift up behind the beta panel; each app screen lifts and tilts on hover; the FAQ opens **and closes** smoothly **every time** — the prototype animated only the first opening |

**Loops pause when they cannot be seen.** The canvas pieces (About's pixel world, the Playground's game and star cards) run only while on screen and while the tab is visible, the same rule as the hero (`docs/BUILD.md` §Performance).

---

## 8. Accessibility

- **Contrast.** Every text pair in §1.1 is measured. Body text clears 4.5:1; large display type clears 3:1. Hairlines are decorative and sit below 3:1 — a control is never marked by its border alone.
- **Focus.** Always visible: 2px `focus-dark` on dark, `focus-light` on paper, 3px offset. On the 402's surfaces the ring is `night-950` on orange (5.31:1) and `night-900` on cream. Never replaced by a colour change.
- **Targets.** Everything interactive is at least 44×44px, including the MENU pill and each menu and index row.
- **Motion.** Every animation is wrapped in `prefers-reduced-motion: reduce`: the star field freezes at a rendered frame, clouds stop, reveals become instant, transitions become swaps.
- **Semantics.** The star field is `aria-hidden`. The pixel landscape carries a short alt description. Work rows and index rows are single links, not nested interactive elements. The menu is a `nav` with focus trapping and Escape.
- **Discoverability.** Nothing important is reachable only by hovering or by discovering a hidden interaction. Every route is reachable from every page via the menu.

---

## 9. Voice

**First person: "I" and "my"**, written the way Jaycee talks. Plain, grammatical, no slogans. Say what I make, not what it transforms. Pages v2 replaced the old first-person-plural "we" copy everywhere on Twelve's pages; there is one person behind the studio and the site says so.

- Use: "Finished projects that are out in the world for anyone to use." · "If an idea keeps coming back, I build it." · "Have an idea, a question about something I made, or just want to say hi? Email me."
- Never: AI-powered, innovative solutions, cutting-edge, future-forward, transforming brands, disruptive.
- **Two stated exceptions:**
  - **The 402's own pages speak in the 402's voice**: second person, facts first ("Open the app and see what's happening right now"). Jaycee still signs the parts that are hers — "Why I made it", the beta invite, Support's "email me".
  - **The legal pages say "we"**, because the privacy policy is the app's own text word for word (§5.8), and the terms follow it.
- Sentence case for editorial copy; UPPERCASE with `meta` letterspacing for labels and controls only.
- Never more than three lines of body copy in a row — except in the About story and the 402's legal text, where the content is the point.
- Projects are described by what they are — "iOS & Android app", "Website concept", "Game" — not by the client relationship.
- **No promises the studio has not made.** The old "replies within two days" is gone; nothing replaces it.

---

## 10. Open items for the build

**Design is complete for every route that is being built.** Pages v2 (2026-09-26) supplies desktop and mobile designs for My work, About, Playground, Contact, the 402 and its four help pages, and the menu. The 404 (§5.6) and the case-study template (§5.5) are unchanged from their approval and were drawn in the old voice.

Waiting on Jaycee, not design work:

- **Her photo** for About (§5.2).
- Her final read of the Terms (§5.8).
- **The 402 app's policy update** — the 14-day deletion grace period and verified organizers posting events land in the app's `policy.ts` first; then the privacy and delete-account pages sync (§5.8).
- A custom display face to replace Figtree, which is a stand-in. Because every size lives in a token, this is a font swap and a scale re-check, not a redesign.
- The wordmark is live text (`assets/brand/README.md`); a real vector file is optional.

Settled: the hero scroll behaviour (§4.0), the routing tree (§3), the nav (wordmark and MENU everywhere, §3), the mobile layouts (§2.1–2.2), the 402 skin (§1.5), and the contact method — mailto on Twelve's pages, with the 402's beta form as the one exception (`docs/BUILD.md` §Contact).
