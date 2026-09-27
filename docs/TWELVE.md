# Twelve

## What Twelve Is

Twelve (written **twelve.**) is Jaycee's creative studio for digital things worth making, based in Omaha, Nebraska. It's one person: Jaycee makes everything herself, and the site speaks in her first-person voice.

The name comes from her birthday, February 12th; purple is her favorite color, which is where the brand purple comes from.

Twelve can create:
- apps
- websites
- games
- digital products
- interactive experiences
- prototypes
- experiments

Twelve is not limited to client work or web design.

## Brand Direction

Twelve should feel:
- creative
- experimental
- intentional
- digital
- human
- playful without being childish
- technical without sounding corporate

Avoid AI/startup buzzwords and generic agency language.

Preferred voice (details in `docs/DESIGN.md` §9):
- first person, the way Jaycee talks
- simple
- direct
- human
- confident
- concise, without being so short it reads as a slogan

## Website Purpose

The site should:
1. Introduce Twelve clearly.
2. Show finished work.
3. Show side projects and unfinished ideas (the Side projects page).
4. Give people a clear way to contact the studio.
5. Leave room for future Twelve products, tools, games, and releases.

## Site Structure

Primary pages, all reachable from the MENU:

| Page | Route | What it is |
| --- | --- | --- |
| Home | `/` | One screen: the immersive hero (star field, pixel world, brand dot, wordmark) and the footer. Scrolling down opens the menu; `VIEW WORK` goes to My work |
| My work | `/work` | Finished, public projects, described by what they are. Today: the 402 |
| About | `/about` | Who Jaycee is, what she's made, and why twelve. exists |
| Side projects | `/projects` | Things being built, tested or still figured out. Called the Playground until 2026-09-27; `/playground` redirects |
| Contact | `/contact` | Email, and where to find Jaycee online (GitHub, YouTube) |

**The 402** — Jaycee's Omaha events app — has its own page at `/work/the-402`, in the app's own look, plus four help and legal pages the app stores require: `/402/privacy`, `/402/terms`, `/402/support`, `/402/delete-account`. Those four paths are submitted to Apple and Google and must never move.

## Current Design Direction

The visual design system lives in `docs/DESIGN.md` and is approved and complete.

Do not replace or reinterpret approved design rules during implementation without explicit instruction.

## Working Rules

These apply to anyone working in this repository.

Before doing meaningful work, read:
1. `docs/TWELVE.md`
2. `docs/STATE.md`
3. `docs/DESIGN.md` when design decisions are relevant
4. `docs/BUILD.md` when implementation decisions are relevant

### Which document owns what

| File | Owns |
| --- | --- |
| `docs/TWELVE.md` | what Twelve is, the brand direction, the site's purpose, and these working rules |
| `docs/DESIGN.md` | every visual and UI decision. Wins on anything that can be seen |
| `docs/BUILD.md` | architecture, tooling, stages and exit criteria, CI, Git, performance, SEO, launch rules |
| `docs/STATE.md` | current status: active stage, what is in flight, blockers, the exact next action |

`references/` is the visual record; `references/README.md` indexes it.

### Rules

- **Check `docs/STATE.md` before starting**, every time, and fetch first — GitHub is the source of truth, not a local clone.
- Avoid duplicating work already in progress: check `git branch -a`, recent commits, and open pull requests before picking something up.
- Never develop on `main`. Branch, and open a pull request.
- Keep changes scoped to the assigned task.
- Do not redesign approved UI without instruction.
- Do not introduce major dependencies or architecture changes casually.
- Do not rewrite unrelated code.
- Do not remove functionality just because it appears unused.
- If documentation and code conflict, flag the conflict instead of silently choosing one.
- **Write decisions down where they belong** — technical in `docs/BUILD.md`, visual in `docs/DESIGN.md`, status in `docs/STATE.md`. Anything that lives only in someone's head or notes is lost to whoever works on this next.
- Update `docs/STATE.md` after meaningful progress, naming what passed and what was deferred.

## Current Phase

**`docs/STATE.md` says what is built, what is in flight and what comes next. This file does not track status** — it would only go stale twice over.

The build runs in ordered stages with exit criteria (`docs/BUILD.md` §Build Stages). A stage does not close until its criteria pass, and stages marked REVIEW need Jaycee's approval.

Launch domain is `bytw12ve.com`, declared once in `src/lib/site.ts`.

Visual reference for approved designs is indexed by `references/README.md`: live previews are in this repository; rendered screens and the design package live in the private `twelve-design` repository.

Do not reinterpret approved design rules during implementation without explicit instruction.
