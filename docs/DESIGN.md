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
| `display-xl` | 120 / 0.9 / 800, ls −0.035em | Page openers; MAKE SOMETHING |
| `display-stamp` | 22 / 1 / 800 | The `12.` stamp |
| `heading-xl` | 56 / 1.02 / 500, ls −0.025em | Project titles; the About statement |
| `heading-lg` | 34 / 1.12 / 500 | Index rows; mobile menu rows |
| `heading-md` | 22 / 1.25 / 500 | Card titles |
| `menu-row` | 76 / 1.1 / 400, ls −0.03em | Desktop menu rows |
| `body-lg` | 20 / 1.5 / 400 | Hero line; opener copy |
| `body` | 16 / 1.6 / 400 | Running copy, nav links |
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

- **Work** rows stack: image well, kind label, title, year. The alternating spread becomes one column; the arrow moves below the title as a row footer.
- **About** keeps its paper inversion, statement drops to `heading-lg`.
- **Playground** keeps a horizontal strip at mobile width, cards at 76% of viewport so the next one always peeks — one of the few places horizontal scroll is the right answer.
- **Contact** sets `MAKE SOMETHING` at `display-hero-mobile` size across two lines.

All four inner pages are designed at mobile width — `twelve-design/screens/Mobile{Work,About,Playground,Contact}.png`. Shared mobile chrome across every route:

- **Nav** 64px, `space-4` gutters: the wordmark left, the MENU pill right. **No inline links below 1024px** — on tablet and mobile the MENU control is the whole navigation. (This read "below `md`" until Stage 1, which literally left Work / About / Playground visible from 640–1023px, where there is no room for them. Jaycee set the threshold at 1024.)
- **Opener** — the `12.` stamp and eyebrow on one line, then the page name at `heading-xl` (56px) rather than `display-xl`, the lead at 17px, and the peripheral metadata reduced to two labels wrapping under it.
- **Footer** stacks: the email on its own line, then the studio block (`TWELVE — OMAHA, NE` with `© 2026` beneath it) on the left with the `12.` stamp opposite. The copyright stays inside the studio block at every width — it never groups with the stamp.
- Every row, chip and control clears 44px of touch target; list rows use a full-width footer row for their arrow rather than a right-edge target.

---

## 3. Site architecture

| Route | What it is |
| --- | --- |
| `/` | The hero and the footer. Nothing else — MENU is the navigation (§4) |
| `/work` | Finished projects as editorial rows |
| `/about` | The studio statement and how the studio works |
| `/playground` | The experiment archive |
| `/contact` | The close and the ways to reach the studio |
| `/work/[project]` | A case study for one project |

Playground entries have no detail route. A card links to the live thing, its repo, or nothing at all.

**The full-screen menu is the primary navigation** and is identical on every page: `01 Home · 02 Work · 03 About · 04 Playground · 05 Contact`. The inline nav (Work / About / Playground) is a shortcut; Contact lives in the menu and in every footer.

### 3.1 Page skeleton

Every route except `/` shares one skeleton:

1. the persistent nav, with the current route showing a persistent `purple-500` underline
2. an opener — a `meta` eyebrow, a `display-xl` slab naming the page, and at most three lines of `body-lg`, with a right-hand `meta` annotation
3. the page's content
4. the footer bar

Pages open at `display-xl`, never `display-hero`: arriving at `/work` must never feel like arriving at a second homepage. **The star field does not repeat on inner pages** — it is the homepage hero's environment. Inner pages sit on flat `void-900` so the work is the loudest thing on screen.

### 3.2 What does not exist

No testimonials, pricing tables, service cards, FAQs, stat counters or dashboard mockups, on any page.

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

**The homepage nav is the wordmark and MENU, nothing else.** The inline Work / About / Playground shortcuts are hidden on `/`: MENU already reaches every route, and three links beside it crowded the one screen whose job is to be an entry experience. Inner pages keep the shortcuts (§3).

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

1024 is the same threshold the nav already uses for its inline links (§2.2), so the page changes character once, not twice.

---

## 5. Page specs

### 5.1 Work

Opener: `SELECTED WORK`, slab **Work**, one line. Content: up to six projects as full-width editorial rows, alternating which side the image well sits on. Each row: index numeral, title in `heading-xl`, a kind label (`iOS APP`, `BROWSER GAME`, `WEB PRODUCT`, `CREATIVE TOOL`), a one-line descriptor, a year, a `radius-md` image well, and a persistent arrow.

A visitor gets three answers instantly: what it is, what kind of thing it is, how to open it. The kind label is load-bearing — not every project is client work. The whole row is one link to `/work/<slug>`; the image well lives inside it.

### 5.2 About

Opener: `ABOUT`, slab **About**. Content: the `paper-100` statement band (a `purple-ink` rule, three lines in `heading-xl`, two supporting lines in `ink-600`), then back to `void-900` for three principles as columns and a short studio-facts list. The statement band is the only paper in the page content, and it is not repeated on the homepage.

### 5.3 Playground

Opener: `PLAYGROUND`, slab **Playground**, one line establishing the difference from Work. Content: a filter row of status chips, then a grid of cards — status chip, visual, title in `heading-md`, date, and `OPEN →` where there is something to open.

A card links to the live thing, its repository, or nothing — there is no Playground detail page. A card with nothing to open (`SKETCH`, abandoned work) is plainly non-interactive: no arrow, no hover lift, title in `star-400`. Unfinished things are allowed to look unfinished; that honesty is the section's point. A card that leaves the site says so with an external-link affordance.

### 5.4 Contact

Opener: `CONTACT`, slab **Contact**. Content: `MAKE SOMETHING →` as a `display-xl` mail link, the address and social links, then two short columns — what's useful to send, and what happens next. No contact form, no newsletter, no second CTA.

The copy never assumes the visitor is a client: people arrive to collaborate, to hire, because they found a Twelve product, or to look around.

### 5.5 Case study — `/work/[project]`

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

## 6. Components

| Component | Where it lives |
| --- | --- |
| `NavBar` | Site layout — persists across page transitions |
| `MenuOverlay` | Site layout |
| `FooterBar` | Site layout |
| `HeroEnvironment` | `/` only — star field, pixel window, brand dot, knocked-out wordmark as children |
| `PageOpener` | Every route except `/` |
| `IndexRow` | `/` |
| `WorkRow` | `/work` |
| `PlaygroundCard` | `/playground` |
| `StatementBand` | `/about` |
| `MetaLabel`, `StudioStamp`, `Chip`, `PillButton` | Everywhere |

The star field takes a density prop and renders from a seeded generator, so it is deterministic across renders. The pixel landscape is driven by a cell array, so the art can change without touching layout.

### 6.1 The `12.` stamp

`12.` in `display-stamp` with a purple period — `purple-500` on dark, `purple-ink` on paper. At most twice per page: once as a graphic annotation at a page opener, and once in the footer. **Never in the homepage hero** — §4.1. Rotate only to 90°, never past 32px, never inside a button, never as a bullet.

### 6.2 The full-screen menu

Reference: `twelve-design/screens/MenuDesktop.png` and `MenuMobile.png`.

The menu is the site's primary navigation and is identical on every route.

**Desktop.** `paper-100` fills the whole viewport, inset `space-16` horizontally, `40px` top / `34px` bottom. Three bands:

- **Top** — the `twelve.` mark in `ink-900` with the period in `purple-ink`, left; the CLOSE pill right, at the exact coordinates the MENU pill occupied.
- **Rows** — five, vertically centred in the remaining space, each a `hairline-light` rule above (and below the last). Per row: a `meta` numeral `01`–`05` top-aligned in a 34px column, the label in `menu-row` `ink-900`, and a right-aligned `meta` hint in `ink-600` (`START HERE`, `FINISHED THINGS`, `WHO AND WHY`, `UNFINISHED THINGS`, `SAY HELLO`).
- **Footer** — the email left, the social links centre, the local time and the `12.` stamp right, all `body-sm` / `meta` in `ink-600`. The studio has **GitHub only** (`https://github.com/bytw12ve/TWELVE`); there is no Instagram. A social with a URL in `src/lib/site.ts` is a real link — new tab, a `↗` glyph, "(opens in a new tab)" for screen readers, `ink-600` → `ink-900` with an underline drawing in from the left on hover and focus, 44px tall. One without a URL is plain text (§7.1).

**Mobile.** Same structure at `space-4` gutters. Rows drop to `heading-lg` with the numeral **inline before** the label, each row ≥ 64px tall. The footer stacks to three lines: email, socials, then time and stamp on one row.

**States.** Row hover fills `paper-200` left-to-right over 220ms and turns the numeral `purple-ink`. The current route's numeral is `purple-ink` at rest. Focus is a 2px `focus-light` ring at 3px offset.

The menu must read as the same studio as the dark pages — same type, same stamp, same restraint. It is an inversion, not a different site.

### 6.3 Iconography

Almost none. Three marks, drawn as inline SVG at 1.5px stroke in `currentColor`: the two-bar MENU glyph, the CLOSE cross, and the arrow. Arrows inside text controls are typographic characters; SVG only where they animate. Do not introduce an icon library.

---

## 7. Interaction

### 7.1 Hover and focus

| Element | Hover | Focus |
| --- | --- | --- |
| Nav link | `purple-500` underline grows from the left, 180ms | 2px `focus-dark`, 3px offset |
| MENU pill | Fill `void-800` → `void-600`, border to `star-400` | 2px `focus-dark` |
| VIEW WORK | Arrow slides down 4px and returns | 2px `focus-dark` |
| Index row | Ground fills `void-800`; arrow travels 8px right, turns `purple-400` | 2px `focus-dark` on the row |
| Work row | Row keeps full opacity, siblings drop to `opacity-muted`; arrow 8px right; well scales 1.02 | 2px `focus-dark` on the row |
| Playground card | Border to `purple-500`, card lifts 4px | 2px `focus-dark` |
| Menu row | Ground fills `paper-200` left-to-right, 220ms; numeral turns `purple-ink` | 2px `focus-light` |
| MAKE SOMETHING | Letters to `purple-400`, arrow 12px right | 2px `focus-dark` |

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

---

## 8. Accessibility

- **Contrast.** Every text pair in §1.1 is measured. Body text clears 4.5:1; large display type clears 3:1. Hairlines are decorative and sit below 3:1 — a control is never marked by its border alone.
- **Focus.** Always visible: 2px `focus-dark` on dark, `focus-light` on paper, 3px offset. Never replaced by a colour change.
- **Targets.** Everything interactive is at least 44×44px, including the MENU pill and each menu and index row.
- **Motion.** Every animation is wrapped in `prefers-reduced-motion: reduce`: the star field freezes at a rendered frame, clouds stop, reveals become instant, transitions become swaps.
- **Semantics.** The star field is `aria-hidden`. The pixel landscape carries a short alt description. Work rows and index rows are single links, not nested interactive elements. The menu is a `nav` with focus trapping and Escape.
- **Discoverability.** Nothing important is reachable only by hovering or by discovering a hidden interaction. Every route is reachable from every page via the menu.

---

## 9. Voice

Plain and first person plural. Say what the studio makes, not what it transforms.

- Use: "Creative studio for digital things worth making." · "Work is finished. This is not." · "MAKE SOMETHING →"
- Never: AI-powered, innovative solutions, cutting-edge, future-forward, transforming brands, disruptive.
- Sentence case for editorial copy; UPPERCASE with `meta` letterspacing for labels and controls only.
  - **One stated exception:** the homepage route section's descriptors are sentence case in the `meta` face at `meta` size, with normal letterspacing (§4 part 2). The same words are uppercase in the menu, where they are labels; in the route section they are a line of copy under a name, and setting them as labels made four columns read as a second nav bar.
- Never more than three lines of body copy in a row.
- Projects are described by what they are — "iOS app", "browser game", "internal tool" — not by the client relationship.

---

## 10. Open items for the build

**Design is complete.** Every route has an approved desktop and mobile design, including the case-study template in both its long and short states, and the 404.

What remains is not design:

- A custom display face to replace Figtree, which is a stand-in. Because every size lives in a token, this is a font swap and a scale re-check, not a redesign.
- Real project and experiment content — the previews carry placeholders, and the case-study imagery is placeholder art.
- The wordmark is live text (`assets/brand/README.md`); a real vector file is optional.

Settled and no longer open: the hero scroll behaviour (§4.0), the contact method (mailto, no form — §5.4), the routing tree (§3), the mobile layouts (§2.1–2.2), the case-study template (§5.5) and the 404 (§5.6).
