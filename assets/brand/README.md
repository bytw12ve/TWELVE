# Brand assets

## The wordmark

**`twelve-wordmark.png` (in the design system artifact) is the colour authority.** `purple-500` `#b5a9db` was sampled from the dot in that raster.

### Status: no vector wordmark exists yet

Two earlier SVG exports of the wordmark were **not usable** and are not in this repository (they are kept in the private design repository, `twelve-design/brand/`, so nobody re-exports the same stub thinking it is missing). Each was a single `<text>` element with no outlines and no declared font, so it rendered in whatever default font the viewer had. Their colours (`#B8A9E0` dot, `#2A1F45` ink) also differ from the sampled values and are **not** authoritative. Do not re-derive tokens from them.

### How the mark is rendered instead

**Decision: the wordmark is live text**, set in the `display` family with the period in `purple-500` — exactly as the hero already does it (`docs/DESIGN.md` §4.1). This applies to the nav mark, the footer, and the menu overlay. There is no image dependency anywhere in the layout.

Consequences:
- The mark inherits the display face. When a custom face replaces Figtree, the mark updates with it automatically.
- The favicon and app icons use the `12.` stamp construction — the purple dot — rather than the full wordmark, which is illegible at 32px anyway.
- OG images are composed at build time from type and the brand dot (`next/og`), not from a logo file.

### What a real SVG needs, if one is produced later

Open the original artwork in the tool it was drawn in, **convert the type to outlines**, and export SVG. The result should contain `<path>` elements and no `<text>`, no font references, and no embedded metadata. Drop it in here and update this file.
