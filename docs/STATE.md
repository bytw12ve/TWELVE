# Twelve State

Last updated: 2026-09-27

**Read this file before starting any work.** It is the only place that says what is happening right now; `docs/TWELVE.md`, `docs/DESIGN.md` and `docs/BUILD.md` say what is true in general. The top of this file is the current picture; everything under **History** is the record of how it got here.

## Where things are

| | |
| --- | --- |
| Code | `github.com/bytw12ve/TWELVE` — **public**. `main` is production |
| Design files | `bytw12ve/twelve-design` — **private**: rendered screens (`screens/`), the Pages v2 design package and clickable prototype (`pages-v2/`), the real app screens (`pages-v2/app-screens/`), brand stubs (`brand/`). Referred to in these docs as `twelve-design/…` |
| Older history | `bytw12ve/TWELVE-archive` — **private**: the repository's full history and PRs up to 2026-09-27, when this public repository started from one clean commit. PR numbers before that date in this file refer to the archive |
| Hosting | Vercel project `twelve`. `main` deploys to production at **bytw12ve.com** (apex; `www` redirects to it). Every branch gets a preview |
| Secrets | One: `RESEND_API_KEY`, set in Vercel for Production and Preview. Never in the repository |
| The 402 app | A separate repository. The website's privacy policy must match the app's `apps/mobile/src/features/legal/policy.ts` (`pnpm policy:check`) |

## Latest

**Pages v2 is live on bytw12ve.com. Policy v1.2 is prepared but not deployed.** The `codex/402-policy-v1-2` branch removes the unbuilt “Make lists” claim, adds the beta-form notice and v1.2 copy, and makes cross-repository parity a mandatory CI gate against an exact The 402 commit. Production remains on v1.1 until this branch is reviewed, merged and deployed.

## Next action

1. Pin CI to the final accepted The 402 Stage 10 commit, run the complete affected-file/CI gate, and open the policy v1.2 pull request. Do not merge or deploy it as part of Stage 10 closeout.
2. After separately authorized merge/deployment, verify the live v1.2 policy and absence of “Make lists.”
3. **One real beta signup on production**, to confirm the email arrives, remains a later authorized production check.

## Open items

| Item | Owner | Notes |
| --- | --- | --- |
| Policy v1.2 release | Stage 10 closeout / Jaycee | Source parity is prepared. CI must pin the final accepted The 402 commit; production remains v1.1 until separately merged and deployed |
| Repository-wide formatting debt | existing site backlog | The full-tree formatter reports 24 unrelated files from `main`. This policy PR formats and checks only its affected files; it does not broaden into that debt |
| 14-day deletion grace period | Jaycee (app side) | Build and test it in the app, add it to `policy.ts`, then drop `pending` from the site's delete-account section and add it to `content/the-402/privacy.ts` |
| Legal review before launch | Jaycee | From her legal draft: confirm the legal operator behind twelve. and whether to publish a mailing address; whether stored location coordinates are precise/sensitive data, the consent flow, and reducing precision; real retention for logs, email and backups; Apple App Privacy and Google Play Data Safety answers; organizer posting, moderation and content rights; Nebraska counsel on the Nebraska Data Privacy Act (appeals process if it applies), processor contracts, the liability clause and any cap, and dispute resolution |
| One real beta signup on production | Jaycee | Submit the form on bytw12ve.com/work/the-402 and confirm the email reaches `contact@bytw12ve.com` |
| `contact@bytw12ve.com` receives mail | Jaycee | Before launch |
| Photo for About | Jaycee | The frame shows a placeholder until then |
| Event photos in the app screens | Jaycee | The screens show listing photos (e.g. Stinson Park). Confirm they can be shown in marketing |
| LCP 2.3s against < 2.0s | build | Open blocker, recorded in `docs/BUILD.md` §Performance. **Must close before Stage 7** |
| Star-field smoothness on a real phone | Jaycee | The one Stage 2 criterion only she can mark |
| Reduced motion checked on a real device | Jaycee | Every animation has its reduced-motion gate; the preview browser cannot emulate the setting |
| Stage 5 case-study template | build | Deferred until a second finished project exists |
| A custom display face to replace Figtree | any time | Swapping it changes font files and the scale check, not components |
| Local Node 26 against `engines.node: 24.x` | cosmetic | pnpm prints "Unsupported engine"; nothing fails. CI and Vercel run 24 |

## Build Stages

Exit criteria in `docs/BUILD.md` §Build Stages. A stage closes only when its criteria pass.

| Stage | What | Gate | Status |
| --- | --- | --- | --- |
| 0 | Foundation and guardrails | CI + token parity | ✅ closed 2026-09-20 |
| 1 | Layout shell and primitives | keyboard, axe | ✅ closed 2026-09-20 |
| 2 | Hero | Jaycee review | ✅ closed 2026-09-26 (real-phone smoothness still open) |
| 3 | Content layer | build-time validation | ✅ closed 2026-09-27, merged |
| 4 | Inner pages and the 402 | four breakpoints, Jaycee review | ✅ closed 2026-09-27, approved and merged |
| 5 | Case study route | Jaycee review | deferred |
| 6 | SEO, metadata, 404 | discovery checklist | **next** |
| 7 | Launch QA | performance gates | not started |
| 8 | Deploy and monitor | — | the domain is already connected; the rest not started |

## Working agreement

The full rules are in `docs/TWELVE.md` §Working Rules: read the docs before meaningful work, check this file first, never develop on `main`, flag conflicts rather than resolving them silently, and write decisions down — technical in `docs/BUILD.md`, visual in `docs/DESIGN.md`, status here. The local gate, which CI also runs, is in `docs/BUILD.md` §Working on this repo.

---

# History

### Pages v2 — the plan

The 402's beta opens **October 31, 2026**. `/402/privacy`, `/402/support` and `/402/delete-account` must be live on `bytw12ve.com` around **October 24** so the builds can be submitted. The stage order is kept: Stage 3 closes before Stage 4, and inside Stage 4 the 402 goes first (`docs/BUILD.md` §Build Stages → Pages v2).

| # | Branch | Stage | Status |
| --- | --- | --- | --- |
| 1 | `design/pages-v2` | — | 🟡 open for review |
| 2 | `feature/content-layer` | 3 | 🟡 open for review — stacked on PR 1 |
| 3 | `page/the-402` | 4, part 1 | 🟡 open for review — stacked on PR 2. **Target merged by October 20** |
| 4 | `page/inner-pages` | 4, part 2 | 🟡 open for review — stacked on PR 3. Closes Stage 4 once Jaycee has reviewed every page |

After PR 3 merges: connect `bytw12ve.com` and `www` in Vercel, **with Jaycee's go-ahead at that moment**, and check the three store URLs.

### Decisions Jaycee made, 2026-09-26

| Decision | Recorded in |
| --- | --- |
| The beta form emails each signup to the studio through Resend, from one route handler. Nothing stored | `docs/BUILD.md` §Contact, §Framework, §Privacy |
| The web privacy policy is the app's `policy.ts`, word for word. She's open to a joint review of both | `docs/BUILD.md` §Content Structure, `docs/DESIGN.md` §5.8 |
| `bytw12ve.com` is connected early, once the 402 pages merge | `docs/BUILD.md` §Deployment |
| `/work/the-402` is a one-off page; the case-study template is deferred until a second project | `docs/BUILD.md` §Routing, §Stage 5 |
| The nav is the wordmark and MENU on every route; first-person voice; the 402's own skin | `docs/DESIGN.md` §3, §9, §1.5 (from the handoff) |

### Jaycee's answers to PR 1's flags, 2026-09-26

| Flag | Answer | Recorded in |
| --- | --- | --- |
| Privacy draft vs the app's `policy.ts` | `policy.ts` is right, word for word | `docs/DESIGN.md` §5.8 |
| The 402 fine print | Use the policy's four short-version points (`POLICY_SHORT`) | `docs/DESIGN.md` §5.7 |
| Accounts | Optional, but encouraged — saves, interests, follows and notifications are the point. Browsing without one is fine | voice guidance for the 402 copy |
| Delete account | **A 14-day grace period**: gone immediately, restorable for 14 days, then erased. App behaviour, so the 402 app and `policy.ts` change first; the site follows. Email requests answered within 7 days | `docs/DESIGN.md` §5.8 |
| Terms | Only verified organizers post events for now (so scam events can't get in); everyone else browses, saves and follows. Effective Oct 31, 2026; Nebraska law | `docs/DESIGN.md` §5.8 |
| Contact socials | No Instagram. GitHub only, linking the TWELVE repo | `docs/DESIGN.md` §5.4 |
| Playground hover | Only cards with a link lift. The two pages stay separate: My work is finished, the Playground is in progress | `docs/DESIGN.md` §5.3 |
| Resend | `bytw12ve.com` is already verified; Jaycee has the key | `docs/BUILD.md` §Contact |
| Contrast | The spec's fixes stand | `docs/DESIGN.md` §1.5, §5.7 |

### The repository went public — 2026-09-27

`bytw12ve/TWELVE` is now a **public** repository, started from one clean commit of the site as it stood. The earlier history, including PRs #1–#5, is in the private `bytw12ve/TWELVE-archive`; **PR numbers before 2026-09-27 in this file refer to the archive.** Design images and the Pages v2 design package are in the private `bytw12ve/twelve-design`. The tree and every file's metadata were checked before publishing: no secrets, no personal details. The archive is deleted only when Jaycee says.

### Pages v2 polish — PR 6, 2026-09-27

Her review of the built pages: the copy sounded AI-written, so every page was rewritten in her voice from her answers. Also: pins scattered across About's pixel scene, rounded phone screens, YouTube beside GitHub, keebwiki, wake., and her launch legal text on the four /402 pages.

**The legal draft's review notes are not published.** They are open items, before the store submissions and launch:

- Confirm the legal operator behind twelve., and whether to publish a mailing address.
- Location: whether stored coordinates count as precise or sensitive data, the consent flow, and whether precision can be reduced.
- Real retention for logs, email and backups.
- The 14-day grace period: build and test it, then publish its text (the site holds it in previews only).
- Apple App Privacy and Google Play Data Safety answers matching production.
- The organizer posting and moderation workflow, and content rights.
- Nebraska counsel: Nebraska Data Privacy Act applicability (and an appeals process if it applies), processor contracts, the liability clause and any cap, dispute resolution.
- The app's `policy.ts` updated to v1.1 (update request sent to Jaycee); `pnpm policy:check` fails until then.

**Closed: Stage 2 follow-up — homepage polish.** Branch `feature/homepage-polish`, off `main` at `e308d06`, merged through PR #4. **Approved by Jaycee on 2026-09-26** ("this is what we should have done in the first place"). Jaycee reviewed the live homepage after the Stage 2 merge and asked for six things; all six shipped:

| Ask | Outcome |
| --- | --- |
| The homepage should be one page; the footer had far too much space | Nav, panel and footer stack to exactly the viewport. Measured at 1440×900: 16 / 16 / 16 / 16, scroll height 900. Footer mirrors the nav strip, no hairline on `/` (`docs/DESIGN.md` §4, §4.1) |
| Scrolling down should open the menu | Built — **reverses** the "scrolling never opens the menu" rule, on Jaycee's instruction. At the bottom only, 60px intent threshold, 800ms cooldown after close, no hijack (`docs/DESIGN.md` §4.0) |
| Pixel world that responds | A small pixel walker crosses the horizon when the window is hovered, and walks home on leave. Stops clear of the knockout (§7.4) |
| Cursor-reactive dot | The dot leans up to 10px toward the pointer; knockout lettering stays aligned to 0.02px (§7.4) |
| Smoother menu open and row hover | Ease-in-out curtain, rows follow its edge, labels rise out of their line, hover band passes through, siblings step back (§7.2) |
| Socials had no click | Instagram removed. GitHub is a real link to `github.com/bytw12ve/TWELVE` (§6.2). **It 404s for visitors while the repo is private** |

Verified: lint, typecheck, tokens, domain, build, budget (`/` 9.5 KB own JS of 60), axe 0 violations on all six routes; wheel, swipe, cooldown, Escape and focus return exercised in a browser at 1440, 1024, 375×812 and 375×667. **Not verified in a browser:** reduced motion — the preview cannot emulate it; the CSS gates are in place for every new animation.

**Carried forward from Stage 2, still open:**

- **LCP is 2.3s against a < 2.0s target.** Recorded as an open blocker in `docs/BUILD.md` §Performance. Deferred until the real display face replaces the Figtree stand-in, and **it must close before Stage 7.**
- **Star-field smoothness on a real phone has not been verified.** It is the one exit criterion only Jaycee can mark, on actual hardware; Stage 2 was approved with it still open, so it is recorded as unverified rather than passed.
- **Keep the checkout outside any cloud-synced folder** (iCloud, Dropbox): sync conflict copies break the build and the domain check.

### Stage 2 — settled decisions

Each lives in the document that owns it. This is the index, not a second copy.

| Decision | Owner |
| --- | --- |
| The nav goes transparent over the hero on `/` only; solid everywhere else | `docs/DESIGN.md` §4.1 |
| Hero responsive rule — proportional desktop composition 1440 → 1024, separate mobile composition below | `docs/DESIGN.md` §4.1, §2.1 |
| Dot grid in CSS, canvas for animated stars only | `docs/BUILD.md` §Performance → Stage 2 refinements |
| Star list generated per composition bucket, never per frame | same |
| Pixel world server-rendered, run-length merged, clouds as a separate group | same |
| Both generators ported verbatim, call order preserved | same |

**How the nav knows it is on `/`:** the hero renders a server-side `data-hero` marker and the nav styles itself through `:has()`. No `usePathname`, no new client boundary, no flash before hydration — the marker is in the initial HTML. The component architecture is unchanged.

### Stage 2 — progress

| | |
| --- | --- |
| Branch | `feature/hero`, off `main` at `db389e7`, merged through PR #3 |
| Status | ✅ **approved by Jaycee, 2026-09-26, after six review rounds** |
| Review | The composition was approved in a browser. Star-field smoothness on a real phone is still unverified — see Next Action |

### Stage 2 — exit criteria

| Criterion | Result |
| --- | --- |
| Hero alone on load; short pinned phase; index reveals beneath | ✅ pin is 10vh, inside §4.0's 10–20vh |
| **Scrolling never opens the menu; MENU user-triggered** | ✅ at the time — **superseded** in the Stage 2 follow-up: scrolling down now opens MENU (`docs/DESIGN.md` §4.0) |
| `VIEW WORK` navigates to `/work` | ✅ a real `<a href="/work">` |
| No hijack: no snap, no interception, scrollbar true | ✅ no scroll listener, `scroll-snap-type: none`, page reaches its true bottom |
| Composition matches the approved design at 1440, 1024, 390 | ✅ proportions measured against the reference at every width. The panel no longer holds the reference's fixed 1376×776 — §4.1 frees its ratio so it fills the viewport — but the composition inside keeps its relative positions, and the dot stays circular |
| Star field holds frame rate on a real phone | ⬜ **Still unverified.** Stage 2 was approved with this open — only Jaycee can mark it, on actual hardware |
| Loop pauses off-screen and on tab hide | ✅ measured, not assumed: **0 changed pixels** while the hero is out of view, motion again on return. The homepage is too short for the hero to leave the viewport on its own, so the probe adds a temporary spacer to force it |
| Reduced motion removes pin and reveal; page complete | ✅ re-proved under forced `prefers-reduced-motion`: sticky is `static`, no pin distance, no animation, all four route links visible at full opacity — and the panel renders at full size, which it did not until this round's fix |
| Screen reader: "twelve." once, star field silent, pixel world described | ✅ one `h1`, canvas `aria-hidden`, both knockouts `aria-hidden`, SVG `role="img"` with a description. axe clean on all six routes |
| Ambient motion is perceptible; pointer visibly disturbs nearby stars | ✅ measured in pixels changed, not judged by eye |
| LCP against the target | ❌ **2.3s against < 2.0s — open blocker, see below** |

### Stage 2 — first review, and what changed

Jaycee reviewed the built hero in a browser and did not approve it. The implementation was green; the experience was not what Twelve is meant to feel like. All twelve points are addressed:

| Review point | Outcome |
| --- | --- |
| Hero needs far more ambient life | The whole field twinkles at varying depth, stars flare, streaks run every 6–12s, and the cursor visibly disturbs what is near it. **Measured: 43.6% of lit pixels change in 500ms; 62.2% when the pointer enters** |
| Homepage nav is crowded | Now the wordmark and MENU. One CSS rule on the existing mechanism |
| Composition feels packed | The copy is one token-spaced stack; the wordmark was **raised** rather than shrunk, since its size is a token. Bottom clearance 38px → 55px |
| `12.` stamp competes | Moved high on the left edge, into the empty band above the wordmark — not the lower left, which the copy stack now occupies |
| Remove the large index | Gone |
| Replace with a navigation tray | 93px, one row desktop / two-by-two mobile, normal document flow, no trap, no scroll lock |
| Scroll resistance | Pin 50vh → 15vh, inside a 10–20vh range tuned by feel |
| Keep existing decisions | `VIEW WORK` → `/work`, pixel world, dot, wordmark, copy and reduced motion all unchanged |
| Audit the code | Two real defects found and fixed — a layout read in the frame loop, and frame-rate-dependent easing |
| Documentation current | Each decision in the document that owns it |
| LCP open | Below |
| Review gate | Everything re-run; stopping here |

**A defect the accessibility gate caught:** the first tray shipped with `opacity: 0` in the server HTML, waiting for an observer. axe reported eight contrast failures — and the four links would have been invisible to anything that never ran the script, which `docs/BUILD.md` §SEO forbids for navigation. Fixed: the waiting state is client-applied and no resting state is transparent.

### Keep the checkout out of synced folders

A checkout inside a cloud-synced folder picks up conflict copies (`file 2.tsx`) as a build rewrites thousands of files, which breaks `pnpm domain:check` and `pnpm typecheck`. Clone outside any synced folder. **Do not "fix" this with `.gitignore`** — ignoring conflict copies hides them and would mask a genuine one later.

### Stage 2 — sixth review round, 2026-09-22

Two changes. The second removes more than everything the last three rounds added.

| Review point | Outcome |
| --- | --- |
| Too much space between the nav and the hero; the hero looks cut off at the bottom | Cause found and measured: the MENU pill was centred in a 72px strip, leaving **14px above it and 38px below it**. The strip is now a gap plus one 44px control (60px), and `--page-gap` sets the space above the nav, below it, and beneath the panel. **16 / 16 / 16 at every width**, measured |
| Not much space between the nav and the top of the page | The shared gap is `space-4` (16px), not 24 — tighter at the top, and the panel grows as a side effect: 1392×780 → **1408×808** at 1440×900, 2528×1348 at 2560×1440 |
| Remove the route section; MENU is enough | Deleted: `NavTray`, its stylesheet, `trayRoutes`, the `descriptor` field, the scroll listener and threshold, the reveal animation and stagger, the sticky pin and its reduced-motion counterpart |

**The homepage now has no scroll-driven state at all** — no listener, no observer, no threshold, no sticky, no transform on the hero. The only client code on it is the star field. The JS budget fell from **9.2 KB to 8.6 KB**, and every other route from 6.0 to 5.9 KB.

**A 1px defect the gap measurement caught.** The gaps came out 15.5 / 16.5 / 16 rather than 16 / 16 / 16. The homepage nav's bottom border was transparent but still 1px wide, which took a pixel out of the content box and centred the 44px control half a pixel high. Removing the *width* rather than the colour made all three exact.

**Three Stage 2 exit criteria in `docs/BUILD.md` were rewritten, with Jaycee's approval** — the pinned phase, the tray revealing beneath the hero, and the reduced-motion stacking. They were not lowered: they are replaced by a stricter one, that the homepage must have no scroll-driven state whatsoever, verified by inspecting `src/` rather than by behaviour alone.

**Measured after the changes:** gaps 16/16/16 and the panel centred at 2560, 1600, 1440, 1280, 1024 and 800 — no overlap with the strip, no overflow, dot circular, `VIEW WORK` clear. Hero `transform: none` at every scroll position. `aria-expanded` false through a full-page scroll; `scroll-snap-type: none`; no `inert`; true bottom reached in one throw. axe clean on six routes. Lighthouse mobile: Performance 98, **LCP 2.3s** (the open blocker, unmoved), **CLS 0**, TBT 10ms, a11y 100. Under forced `prefers-reduced-motion`: gaps still 16/16/16, panel full size, zero motion. Star field, companion star and both pause paths re-proved unchanged.

### Stage 2 — fifth review round, 2026-09-21

Jaycee rejected the interaction rather than the look: the reversible recession was unnecessary and could feel glitchy under a fast scroll. **This round deleted more than it added.**

| Review point | Outcome |
| --- | --- |
| Centre the hero properly beneath the nav | One gutter on all four sides again — `space-6` desktop, `space-4` mobile. `nav → gap → hero → gap`, measured equal at seven widths |
| Use nearly all available width | The max width is gone. The panel takes the display: **2512×1320 at 2560×1440**, 1872×960 at 1920×1080, 1392×780 at 1440×900. Ratio guards widened to 2.1:1–1.25:1, which every ordinary window sits inside |
| Remove the reversible hero recession | Deleted — markup, CSS and its reduced-motion counterpart. The hero's computed transform is `none` at every scroll position, measured |
| A one-time route reveal at a scroll threshold | A passive listener latches past **96px**, reveals once and removes itself. No observer, no scrubbing, no reversal |
| Robust to fast scrolling | Proved by counting, below |
| Footer: no scroll animation | Entrance and keyframes deleted. Its measured opacity is 1 throughout the reveal |
| Audit for stale mechanisms | `data-released`, `data-route-section`, the recession selectors, `footerRise` and the split gutter properties all return **zero hits** in `src/` |

**The reveal runs exactly once — counted, not observed.** An `animationstart` counter on the four columns, across a slow crawl past the threshold, a hard flick from the top, a scrollbar drag, an immediate flick racing the mount, twelve rapid top-to-bottom alternations, and repeated returns to the top. **Every run reports 4 — one per column — and never 5.** The revealed class never clears.

**A defect the linter caught:** `setPhase('pending')` ran synchronously in the effect body, which cascades renders. It moved into a `requestAnimationFrame`, which is also where a page that loads already scrolled now gets caught — a restored position or a deep link no longer leaves the section waiting.

**Measured after the changes:** centred with equal gaps at 2560, 1920, 1440, 1280, 1024, 768 and 390 — no overlap with the strip anywhere, no overflow, dot circular, `VIEW WORK` clear of the bottom edge (18px even in the deliberately squashed 1800×700 case, which is the one window that letterboxes). Budget **9.2 KB** of 60. axe clean on six routes. Lighthouse mobile: Performance 98, **LCP 2.3s** (the open blocker, unmoved), **CLS 0**, TBT 0ms, a11y 100. Contrast at the lowest-opacity frame: route text bottoms out at 0.85 for **5.33:1 against 4.5:1 required**; the footer never dips. Under forced `prefers-reduced-motion`: zero animation starts, the section plainly visible, hero static and full size, no pin, no listener. Star field, companion star and both pause paths re-proved unchanged.

### Stage 2 — fourth review round, 2026-09-21

A final sizing and transition pass, at Jaycee's direction: no structural change, no redesign of the four-column route section or the footer.

| Review point | Outcome |
| --- | --- |
| The hero still feels small relative to the viewport | Side and bottom gutters `space-6` → `space-4`, the homepage nav strip 96 → 72px, max width 1760 → 1920. **1440×900: 1392×756 → 1408×788.** 1920×1080: 1760×936 → **1839×968**. The gap between strip and panel stays a deliberate 24px at every width, measured |
| The hero → route handoff feels like the section simply appears | The hero now recedes 16px and 0.994 over 700ms as the section arrives, and eases back on return. The columns rise 20px and fade from 0.85, 80ms apart. Space above and below the section went `space-16` → `space-24` |
| Route section → footer reads as one block | The footer is its own layer: `space-8` of top padding under a hairline that now has room, and a 12px rise with the same gentle fade, 320ms behind the last column. Homepage only |
| Scroll behaviour, MENU, `VIEW WORK` | Unchanged and re-proved. No snap, no `preventDefault`, no listener, no automatic MENU |

**Three defects the verification caught, all invisible by eye:**

1. **The whole transition was firing on load.** The observer's `rootMargin` was `0px 0px 28% 0px` — 28% of the viewport, which is *larger* than the 10vh pin separating the section from the fold. So it intersected at scroll 0: the columns animated before anyone scrolled, and the hero shipped permanently receded. Measured — `data-released` read `true` at scrollY 0. The margin is now `0px`, and the release fires as the pin lets go. **This had been true since the section was built**, and no previous round caught it.
2. **The footer's entrance never played.** It was a transition out of the waiting phase, and that phase lasts until the observer fires — on a page this short, the same frame it mounts. The probe reported the footer's minimum opacity as 1 through the entire reveal. It is an animation now.
3. **The first contrast probe measured the wrong thing.** Taking the minimum declared opacity across every stylesheet picked up the closed MENU overlay's `0`, which has nothing to do with this. Corrected to per-element live sampling.

**The fade, verified properly.** Jaycee asked not to rely on axe alone for an intermediate animation frame. A browser probe now samples effective opacity — the element's multiplied by every ancestor's — on **every animation frame** through the reveal, composites each text colour over its real background at the minimum observed, and computes the ratio there. Every animated element bottoms out at exactly **0.85**; the tightest result is the route descriptors and the footer's studio block at **5.33:1 against 4.5:1 required (+0.83)**, and the labels sit at 12.21:1. axe is clean on all six routes alongside it.

**Measured after the changes:** panel 1839×968 at 1920×1080, 1408×788 at 1440×900, 1248×688 at 1280×800, 992×656 at 1024×768, 744×932 at 768, 366×752 at 390 — nav gap 24/16 at every one, no overlap, no overflow, dot circular, `VIEW WORK` clear of the bottom edge (20px even in the 1800×700 worst case). Budget **9.2 KB** of 60, unchanged. Lighthouse mobile: Performance 98, **LCP 2.3s** (the open blocker, unmoved), **CLS 0**, TBT 0ms, a11y 100. Hero recession measured at rest → released → back to rest. Under forced `prefers-reduced-motion`: panel at full size, no pin, no transforms, no animations, footer and all four links at full opacity. Star field, companion star and the pause paths all unchanged and re-proved.

### Stage 2 — third review round, 2026-09-21

Jaycee reviewed the revised build and did not approve it. Three changes, all made; nothing else about the hero was touched.

| Review point | Outcome |
| --- | --- |
| The hero became too small — "a card floating inside too much empty black space" | The panel no longer holds the reference aspect ratio. It fills the viewport beneath the nav strip, inset `space-6`, up to 1760px wide, with its ratio free between 1.9:1 and 1.4:1. **1440×900: 1234×696 → 1392×756.** 1920×1080: 1760×936. Gutters and the nav's separation are unchanged |
| Remove the hero `12.` stamp completely | Gone from the markup and from both breakpoints' CSS. Not relocated, not replaced. Recorded as a decision in `docs/DESIGN.md` §4.1, §2.1 and §6.1 rather than left as drift |
| The one-line route section is too sparse — "loose footer text" | Four columns again, without the furniture: name at `heading-md`, sentence-case descriptor, `purple-500` arrow. One hairline above, no cells, no dividers, no numerals, no header. Two-by-two below 1024 |
| Transition, pin and hero behaviour preserved | Untouched. `StarField.tsx`, the generators, `BrandDot` and `HeroWordmark` are not in this round's diff at all |

**Three defects the verification caught, none visible by eye:**

1. **The copy stack fell through the panel's bottom edge** on a short wide window — `VIEW WORK` clipped by 5px at 1800×700, which a 1280×800 laptop also reaches. Freeing the ratio meant the wordmark, sized only against width, could grow while the height it had to fit shrank. Its size is now bounded on both axes, and the copy stack's rhythm follows the panel's height.
2. **Reduced motion collapsed the panel to zero height.** §4.0 drops the pin, the sticky box becomes `height: auto`, and the panel's `height: 100%` resolved against it to nothing. The height now comes from the viewport, never from the parent.
3. **axe failed the route section's reveal**, sampling a column mid-fade — two contrast violations. The entrance is now translation alone; nothing it touches is transparent at any point. This is the third time a fade-in has failed this gate, so `docs/BUILD.md` now forbids it rather than warning about it.

**Measured after the changes:** panel 1392×756 at 1440×900, 976×624 at 1024×768, 736×928 at 768, 358×748 at 390 — no overflow, no cropping, the dot circular and `VIEW WORK` clear of the edge at every one. axe clean on all six routes. Budget **9.2 KB** of 60. Lighthouse mobile: Performance 98, **LCP 2.3s** (the open blocker, unmoved), CLS 0, TBT 0ms, a11y 100. Star loop still stops dead off-screen (0 changed pixels) and resumes; the companion star still appears only on a fine pointer and fades when it leaves; under forced `prefers-reduced-motion` it never appears and the pin and reveal are gone.

### Stage 2 — later review adjustments

| Change | Owner |
| --- | --- |
| `DIGITAL / EXPERIMENTAL` removed; the bottom-right corner stays empty | `docs/DESIGN.md` §4.1 |
| The companion star that follows the pointer | `docs/DESIGN.md` §7.4 |
| Homepage nav is its own strip **above** the hero, no rule, wordmark and MENU only | `docs/DESIGN.md` §4.1 |
| **The homepage has no route section — MENU is the navigation** | `docs/DESIGN.md` §4 |
| One `--page-gap` sets the nav's rhythm and the panel's inset; strip is 60px | `docs/DESIGN.md` §4.1 |
| The homepage has no scroll-driven state at all | `docs/DESIGN.md` §4.0, `docs/BUILD.md` §Stage 2 |
| The hero is centred beneath the nav with one equal gap; no max width | `docs/DESIGN.md` §4.1 |
| In the hero only, `display-hero` is a scale reference, not a ceiling | `docs/DESIGN.md` §1.3 |
| The reveal is one-way and latched at a 96px threshold; the hero never moves | `docs/DESIGN.md` §4.0, `docs/BUILD.md` §Stage 2 refinements |
| Homepage nav strip is 72px; hero gutters asymmetric, the gap above it deliberate | `docs/DESIGN.md` §4.1 |
| The hero recedes on release and reverses; columns and footer enter behind it | `docs/DESIGN.md` §4.0 |
| One observer drives all three movements through `data-phase` / `data-released` | `docs/BUILD.md` §Stage 2 refinements |
| Fades are floored where contrast holds — 0.85 — and the floor is measured per frame | `docs/BUILD.md` §Stage 2 refinements |
| The hero panel fills the space beneath the nav; ratio free within 1.9:1–1.4:1 | `docs/DESIGN.md` §4.1 |
| Hero coordinates are proportional per axis; the shearing rule is *same axis, same container* | `docs/BUILD.md` §Stage 2 refinements |
| No `12.` stamp in the hero at any width | `docs/DESIGN.md` §4.1, §2.1, §6.1 |
| Route descriptors are sentence case — the stated exception to the uppercase-label rule | `docs/DESIGN.md` §9 |
| Pin down to 10vh; the section opens with space and a staggered entrance | `docs/DESIGN.md` §4.0 |

Both gates were proved with a control rather than assumed: on a fine pointer the companion lifts the field's brightness **154% above the ambient range** in its window; on a coarse pointer there is no lift at all and the ambient motion keeps running. Budget went 8.7 KB → **9.1 KB** of the homepage's 60 KB.

### Stage 2 — the one criterion that misses

**LCP is 2.3s; `docs/BUILD.md` §Performance targets < 2.0s.** Stable across runs on a throttled mobile profile. Everything else passes: **Performance 98**, **CLS 0**, **TBT 0ms**, FCP 0.9s.

It is now recorded as an **open blocker** in `docs/BUILD.md` §Performance, with everything that was tried and what each bought — including the critical subset of the display face, which moved LCP **not at all** and was therefore reverted rather than kept as complexity buying nothing. That result matters: the metric is not bound by the font's bytes.

Left open for when the real display face replaces the Figtree stand-in. **It must close before Stage 7.**

**Two verification split points**, agreed up front:

- **I measure** LCP with Lighthouse on a throttled mobile profile and report it against the < 2.0s target, along with the JS budget and the loop's pause behaviour.
- **Jaycee verifies** star-field smoothness and interaction feel **on an actual phone**. That criterion is not markable from a simulator and I will not mark it.

### Stage 1 — closed

Every exit criterion passed, and both review rounds are addressed. Details below; the record of what was fixed stays here because it is status, not rule.

### Stage 1 review — round one, all five addressed

| # | Review item | Fix |
| --- | --- | --- |
| 1 | Menu close felt abrupt | It had no close animation at all — the panel unmounted on the state flip. Added a closing phase so §7.2's 320ms reverse wipe can play; the pill holds CLOSE through it. Focus and `inert` release at the *start* of the close, so the keyboard does not wait for the animation |
| 2 | Wrong contact address | `contact@bytw12ve.com`, changed once in `src/lib/site.ts`; every component reads the constant. Docs and the 17 editable reference previews updated too |
| 3 | Are.na shown | Removed from `site.socials`, the menu and the reference previews. No replacement. Instagram and GitHub stay as non-interactive labels — `docs/DESIGN.md` §7.1's "designed state, not a disabled one" — until real URLs exist |
| 4 | `12.` stamp jumped when the menu opened | Right-anchored in both states. The site footer reorders to studio · email · year · stamp, recorded in `docs/DESIGN.md` §4. The mobile menu footer had the same bug and was fixed with it |
| 5 | Time display | Unchanged, as asked. Reservation re-verified: 153px empty, filled and at the widest string |

### Stage 1 review — round two, all addressed

| # | Review item | Fix |
| --- | --- | --- |
| 1 | CLOSE held, then snapped back to MENU | Both labels now share one grid cell and cross-fade over 220ms, finishing before the 320ms panel. A second fault was found with it: the pill's surface was keyed to `open`, so it went dark the instant the close began while the wipe leaves its corner on paper until the end. It now holds paper until the paper actually goes |
| 2 | `© 2026` floated mid-footer | It belongs to the studio: studio block left with the copyright beneath it, email centred, `12.` standalone at the right edge. Same logic stacked on mobile — the copyright never groups with the stamp. `docs/DESIGN.md` §4 and §2.2 rewritten as the approved composition |
| 3 | Home hint | `START HERE`, changed in the route table |
| 4 | Stage 2 scroll behaviour unowned in criteria | `docs/BUILD.md` §Stage 2 now carries it as exit criteria, including **scrolling never opens the menu — MENU stays user-triggered** |

**Two bugs surfaced by measuring rather than looking**, both of which would have shipped:

- **Mobile grid placement.** With the email spanning both columns, auto-placement pushed the stamp to a third row in column one, so it sat 16px short of the footer edge and no longer matched the menu's. Named areas fixed it.
- **Scrollbar gutter.** The overlay is `position: fixed` and spans the viewport; the footer sits in the narrower content box. On classic-scrollbar platforms the menu's stamp would sit a scrollbar's width right of the footer's. Invisible on macOS, 16px out on Windows. The overlay now insets by the width the scroll lock reclaims.

**Cross-fade, measured through a close:** CLOSE 1.0 at 21ms · 0.24 at 121ms · fully MENU at 242ms while the panel is still animating. Pill width fixed at 120px in both states.

**Measured, not eyeballed:** stamp right edge 1376px closed and open at 1440, 374px at 390 (re-measured after the footer rework) · close at 30ms shows the panel still animating with focus already returned and `inert` already released · reduced-motion close completes in 42ms · clock box identical empty and filled.

**The PNG reference screens now lag the build** — they still show `hello@`, Are.na, and the centred stamp. They cannot be edited as text; `references/README.md` records the three drifts and says to trust `src/lib/site.ts` and `docs/DESIGN.md` over the pixels.

### Stage 1 exit criteria — all met

| Criterion (`docs/BUILD.md` §Stage 1) | Result |
| --- | --- |
| Every route reachable; the menu reaches every route from every page | ✅ five primary routes, each with the menu; the route table is one source, so it holds by construction |
| Unknown URL renders `not-found.tsx` with the shell intact | ✅ |
| Keyboard-only: focus trapped, Escape closes, focus returns to the MENU pill, focus visible on dark and paper | ✅ measured in a browser — see below |
| axe reports no violations on any route | ✅ `pnpm a11y`, 6 routes, 0 violations, now a CI step |
| Heading order and landmarks correct | ✅ one `h1` per route; `header` / `main` / `footer` / `nav`; skip link first |
| Fonts self-hosted, no layout shift | ✅ four `woff2` in `public/fonts/`, `next/font/local` with size-adjusted fallbacks |

**Keyboard behaviour, measured rather than assumed:** focus moves to the first row on open · the page behind goes `inert` · Shift+Tab from the first row wraps to the last · Escape closes · focus returns to the MENU pill · `inert` and the scroll lock both release.

**Responsive:** no horizontal overflow at 390, 640, 1023, 1024 or 1440. The 1024px threshold is exact — at 1023 the inline links are hidden and the bar is 64px; at 1024 they appear and it is 96px.

**JS budget:** 5.6 KB of Twelve's own code on every route, against 60 KB on the homepage and 40 KB elsewhere. `ActiveNavLink` and `MenuOverlay` are the only client components.

### Decided while building

- **Four font files, not five.** Figtree and Archivo are served as variable fonts, so one file covers each family's weight range; Space Mono is static and needs one per weight. `docs/BUILD.md` §Fonts and `public/fonts/README.md` record it.
- **The menu's top band reuses the nav's wordmark** rather than rendering a second one — it is raised above the paper panel and recoloured through `html[data-menu-open]`. Keeps one `twelve.` in the accessibility tree, and makes the CLOSE pill literally the MENU element, which is what §7.2's "never appears to move" requires.
- **The clock's reserved box needed the tracking added explicitly.** `17ch` under-reserved by 19px because `ch` ignores letter-spacing; `calc(17ch + 17 * tracking)` matches at 153px empty, filled and at the widest string.
- **Type sizes follow `docs/DESIGN.md` §1.3, not the previews**, where the two disagree — the menu previews use an off-scale 11px hint and 18px stamp; the tokens' 12px and 22px are used instead, per the rule that the doc wins.

### Known limits, stated rather than buried

- **axe tests each route with the menu closed.** It loads a URL and scans; it cannot open the overlay. The menu's own accessibility — trap, `inert`, focus return — was verified manually and is recorded above. Automating it needs a browser-driving test, which Stage 1 does not have.
- **Reduced motion** was verified by asserting the served CSS wraps every animation in `prefers-reduced-motion`, not by toggling the OS setting. Worth one manual check on the preview.
- **Social links in the menu are plain text**, because `src/lib/site.ts` has empty handles. They become links when the handles are real.

### Decisions made when Stage 1 was planned

Recorded in the documents that own them; this is the index.

| Decision | Recorded in |
| --- | --- |
| Stage 1 ships the five primary routes plus a bare `not-found.tsx`, which handles unknown URLs and is not a navigable route | `docs/BUILD.md` §Stage 1 |
| `/work/[project]` deferred to Stage 5 — it needs the Stage 3 content layer | `docs/BUILD.md` §Routing, §Stage 1 |
| The designed 404 deferred to Stage 6 | `docs/BUILD.md` §Routing, §Stage 1 |
| Inline nav links hide below **1024px**; MENU is the whole navigation on tablet and mobile | `docs/DESIGN.md` §2.2 |
| Fonts stay `next/font/local` with five committed `woff2` files | `docs/BUILD.md` §Fonts |
| axe becomes a CI gate via `@axe-core/cli`, not a one-time manual check | `docs/BUILD.md` §Tooling, §Stage 1 |

### Page transitions — now owned

**Assigned to Stage 4** (`docs/DESIGN.md` §7.3, recorded in `docs/BUILD.md` §Motion and §Stage 4). They were specified but in no stage's criteria. Stage 4 owns them because validating a transition needs real content on both sides — between two placeholder pages it proves nothing. **Stage 1 does not implement them**, though it builds the shell they run inside.

The menu is specified in two separate places and Stage 1 needs both:

| `docs/DESIGN.md` | Covers |
| --- | --- |
| §6 Components | the component vocabulary Stage 1 builds |
| §6.2 The full-screen menu | the menu's structure and layout |
| §7.1 Hover and focus | the focus states the keyboard criterion tests |
| §7.2 Menu | the menu's interaction — open, close, focus return |
| §8 Accessibility | landmarks, heading order, the keyboard pass |

## Stage 0 Result

### Exit criteria

| Criterion (`docs/BUILD.md` §Build Stages) | Status |
| --- | --- |
| GitHub Actions workflow exists and all steps pass on a clean clone | ✅ green on PR #1 and on push |
| Every token in `docs/DESIGN.md` §1 is in `tokens.css` at the documented value, verified by a script | ✅ 63 tokens, two scripts |
| The JS budget is a build-time check, so a regression fails the build | ✅ verified by deliberately busting it |
| A preview URL is live | ✅ the Stage 0 preview deployment, green 2026-09-20 19:11:59Z. Opened by Jaycee in an authenticated browser and confirmed to render the placeholder: `void-900` ground, "Twelve" heading, the description line, no nav or hero |

### What was built

- **Next.js App Router + TypeScript scaffold**, hand-written rather than `create-next-app`, which pulls in Tailwind and contradicts `docs/BUILD.md` §Styling. Next 16.3.5, React 19.3.0.
- **`src/styles/tokens.css`** — generated, never hand-edited. 63 tokens.
- **`src/lib/site.ts`** — the one declaration of the canonical host.
- **ESLint + Prettier**, flat config.
- **Four guardrail scripts**, all wired into CI and all tested by making them fail:

  | Script | Guards |
  | --- | --- |
  | `scripts/tokens.mjs` | generates `tokens.css`; `--check` fails on drift |
  | `scripts/check-design-tokens.mjs` | parses the `docs/DESIGN.md` §1 tables and verifies both artifacts against the prose |
  | `scripts/check-domain.mjs` | fails if a literal domain appears outside `src/lib/site.ts` |
  | `scripts/check-budget.mjs` | first-load JS budget, measured against the recorded framework baseline |

- **`.github/workflows/ci.yml`** — runs on every push and pull request; every step fails the job.

### Decisions taken during Stage 0

All are recorded in `docs/BUILD.md`; this is the index, not the detail.

- **pnpm is the package manager**, pinned via `packageManager` (`pnpm@10.34.5`) so local, CI and Vercel resolve the same version. It had only ever been implied by a `.pnpm-store/` line in `.gitignore`.
- **pnpm is held at 10.x by Vercel, not by preference.** The first preview build failed: pnpm 12 writes lockfile keys that the pnpm versions Vercel supports (6–10) cannot read. The toolchain was moved to pnpm 10.34.5 and `pnpm-workspace.yaml` removed. **Vercel must have no install-command override** — an override forces pnpm 6. Both recorded in `docs/BUILD.md` §Tooling and §Deployment.
- **The JS budget was unreachable as written.** An empty Next 16 route already ships 130.3 KB gzipped of React and router runtime against a 60 KB homepage target. Resolved with Jaycee: 60 KB home / 40 KB inner is now Twelve's *own* allowance on top of a recorded, pinned framework baseline. See `docs/BUILD.md` §Performance for the locked version, the measured floor, the method and the re-measurement rule.
- **Version ceilings:** TypeScript stays on 6.x and ESLint on 9.x. Both have upstream causes, recorded in `docs/BUILD.md` §Tooling.
- **A second token check exists** beyond the one originally planned: generator parity only proves `tokens.css` matches `tokens.json`, so `check-design-tokens.mjs` reads `docs/DESIGN.md` itself and keeps the prose authoritative.
- **Prettier does not format `*.md` or `references/`.** It reflowed the project docs on its first run; both are excluded now.

### What the deployment cost, and what it taught

Four preview builds failed before the cause was found, and **none of them was the repository's fault.** The Vercel project had been created with an Output Directory override of `public` — which a Next.js project never produces, and which this repo does not even contain — and an Install Command override, which makes Vercel fall back to the oldest pnpm in its build container. Clearing both fixed it with no code change.

The lesson, now written into `docs/BUILD.md` §Deployment: **GitHub Actions was building those same commits green the entire time.** When CI passes on the exact commit a deploy fails on, the difference is configuration, not code — check the settings before touching the repo. Two real repo problems were found and fixed along the way (the pnpm 12 lockfile, `engines.node` as a range); neither was the cause, and chasing them cost three builds.

### Deferred out of Stage 0

- Fonts — self-hosting is a Stage 1 exit criterion; no font files are committed yet.
- Security headers, `sitemap.ts`, `robots.ts`, OG images — Stage 6.
- Real social handles in `src/lib/site.ts`, currently empty strings with a TODO.
