# Twelve

## What Twelve Is

Twelve is a creative studio for digital things worth making.

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

Preferred voice:
- simple
- direct
- human
- confident
- concise

## Website Purpose

The site should:
1. Introduce Twelve clearly.
2. Show finished work.
3. Show experiments and unfinished ideas through Playground.
4. Give people a clear way to contact the studio.
5. Leave room for future Twelve products, tools, games, and releases.

## Site Structure

Primary pages:
- Home
- Work
- About
- Playground
- Contact

### Home
The homepage is primarily an immersive hero / entry experience.

It should not become a long traditional agency landing page.

On load:
- the hero is the main focus

On scroll:
- an index/navigation section reveals below the hero

The index points to:
- Work
- About
- Playground
- Contact

`VIEW WORK` goes directly to the Work page.

### Work
Finished, polished projects and products.

Projects should be described by what they are, not by whether they were client work.

### Playground
Experiments, prototypes, studies, unfinished ideas, small tools, game concepts, interaction tests, and other things being explored.

### About
A short explanation of Twelve, what it makes, and why.

### Contact
A clear way to reach the studio.

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

Implementation. The design system, every page design and `docs/DESIGN.md` are approved; `docs/BUILD.md` decisions are locked.

**`docs/STATE.md` says which stage is active and what the next action is. This file does not track status** — it would only go stale twice over.

The build runs in ordered stages with exit criteria. A stage does not close until its criteria pass, and Stages 2 and 5 need Jaycee's review before the next stage starts.

Launch domain is `bytw12ve.com`, declared once in `src/lib/site.ts`.

**There are no design blockers.** What remains is not design work: real project and Playground content, and a custom display face to replace the Figtree stand-in.

Visual reference for every approved design lives in `references/` — a rendered screen and a live preview each, indexed by `references/README.md`.

Do not reinterpret approved design rules during implementation without explicit instruction.
