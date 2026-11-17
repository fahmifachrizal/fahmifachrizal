# CLAUDE.md

## Design Context

This project has `PRODUCT.md` and `DESIGN.md` at the repo root, set up via `/impeccable init`. Read them before making any UI/UX changes.

- **Register:** brand (personal portfolio; `/learn` is one section under the same identity, not a separate product)
- **Visual system name:** "Ink & Paper" — two colors only (ink `#16100d`, paper `#e7e0de`), no separate accent hue, no white anywhere, flat and square surfaces, one sticky header
- **Hard constraint:** any change must preserve the MDX content pipeline (blog posts, `/learn` GRE/GMAT questions) — see `lib/mdx.ts` and `lib/learn.ts`
- Full detail: `PRODUCT.md` (strategy) and `DESIGN.md` (visual tokens/components)
