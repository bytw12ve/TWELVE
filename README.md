# Twelve

A creative studio for digital things worth making — apps, websites, games, products and experiments.

This repository is the studio site: Next.js App Router, TypeScript, CSS Modules over a generated design-token layer, statically rendered, deployed on Vercel to **bytw12ve.com**.

## Getting started

```bash
pnpm install --frozen-lockfile
pnpm dev
```

pnpm is required and pinned via `packageManager`; Node comes from `.nvmrc`.

## The gate

Everything below runs in CI on every push and pull request, and every step fails the job:

```bash
pnpm lint && pnpm typecheck && pnpm tokens:check && pnpm domain:check && pnpm build && pnpm budget
```

| Script | What it protects |
| --- | --- |
| `pnpm tokens:check` | `src/styles/tokens.css` still matches `references/tokens.json` **and** the tables in `docs/DESIGN.md` §1 |
| `pnpm domain:check` | the canonical host appears only in `src/lib/site.ts` |
| `pnpm budget` | first-load JS, against the budget in `docs/BUILD.md` §Performance |

`src/styles/tokens.css` is generated — run `pnpm tokens:build` rather than editing it.

## Documentation

The project documents are the source of truth. Read them before making changes; if they and the code disagree, flag it rather than picking a side.

| File | What it holds |
| --- | --- |
| [`docs/TWELVE.md`](docs/TWELVE.md) | what Twelve is, brand direction, site purpose, and how work on the repo is done |
| [`docs/DESIGN.md`](docs/DESIGN.md) | the visual source of truth: tokens, grid, page specs, motion, accessibility |
| [`docs/BUILD.md`](docs/BUILD.md) | architecture, tooling, build stages and exit criteria, CI, Git, performance, SEO, launch |
| [`docs/STATE.md`](docs/STATE.md) | **start here** — current stage, what is in flight, blockers, the next action |
| [`references/README.md`](references/README.md) | rendered screens, live previews and `tokens.json` for every approved design |
