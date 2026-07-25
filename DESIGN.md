---
name: fahmifachrizal
description: Personal portfolio and blog for a full-stack developer, with a self-study GRE/GMAT practice tool
colors:
  ink: "#1d0b08"
  paper: "#e7e0de"
  paper-muted: "#ded7d5"
  ink-soft: "oklch(0.556 0 0)"
  surface-neutral: "oklch(0.97 0 0)"
  hairline: "oklch(0.922 0 0)"
  focus-ring: "oklch(0.708 0 0)"
  alert-red: "oklch(0.577 0.245 27.325)"
  success: "oklch(0.48 0.14 150)"
  warning: "oklch(0.5 0.13 65)"
typography:
  display:
    fontFamily: "var(--font-geist-sans), Geist, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "var(--font-geist-sans), Geist, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 3rem)"
    fontWeight: 900
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "var(--font-geist-sans), Geist, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "var(--font-geist-sans), Geist, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "var(--font-geist-mono), Geist Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.md}"
    padding: "9px 17px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "9px 17px"
  card:
    backgroundColor: "{colors.paper-muted}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
---

# Design System: fahmifachrizal

## 1. Overview

**Creative North Star: "Ink & Paper"**

The system is built from exactly two colors doing all the work: a warm paper background (#e7e0de) and a near-black ink foreground (#1d0b08) that is *also* the primary action color — there is no separate accent hue anywhere in the palette. Depth comes from tonal variation of the same paper (a slightly deeper #ded7d5 for cards), not from a rainbow of semantic colors. This is a portfolio for a full-stack developer who wants the work — not the chrome — to be the subject: minimal, precise, confident. Personality lives in restraint, generous whitespace, and typographic weight contrast, never in decoration.

This system explicitly rejects gradient accents, glassmorphism-as-decoration, multi-color semantic palettes, and side-stripe card borders. A streamlining pass (2026-07-25) removed the drift an earlier scan had flagged here: quiz-state colors are now real `--success`/`--warning` tokens instead of raw Tailwind values, the unused dark-mode CSS and all inert `dark:` utility classes were removed outright (nothing ever toggled them), and the article reading-surface now uses `bg-card` instead of a separate `bg-white/80`.

**Key Characteristics:**
- Two-color foundation (ink + paper), tonal variation instead of hue variation for depth
- Flat surfaces at rest; shadow is earned only on hover or when an element floats above content
- Single sans typeface (Geist) at every text role; mono (Geist Mono) reserved for code and technical labels
- Border-first component definition (1px hairline borders), not shadow-first
- Radius scales with element size: small controls get tight corners, cards and hero art get the loosest

## 2. Colors

The palette is monochrome by design: everything is a shade of ink or a shade of paper, plus a single reserved red for destructive/error states.

### Primary
- **Deep Ink** (#1d0b08): The single primary color in the system. Used identically as body text color, primary button fill, and heading color. There is no separate "brand accent" — ink IS the accent.

### Neutral
- **Warm Paper** (#e7e0de): Page background. The literal "paper" the ink sits on.
- **Soft Paper** (#ded7d5): Card and popover surfaces — one step darker than the page background, giving cards just enough separation without a shadow or border-color change.
- **Muted Ink** (oklch(0.556 0 0)): Secondary/muted text — captions, metadata, timestamps.
- **Surface Neutral** (oklch(0.97 0 0)): Secondary/muted/accent backgrounds (badges, hover fills, tab list track). Notably these three roles currently share one identical value — a real opportunity to differentiate them or consciously keep them merged.
- **Hairline** (oklch(0.922 0 0)): Border and input-stroke color across the whole system.
- **Focus Ring** (oklch(0.708 0 0)): Keyboard-focus outline color, 3px ring offset from the element edge.
- **Success** (oklch(0.48 0.14 150)): Correct-answer states in `/learn`, the "easy" difficulty label, the MDX success callout, the copy-button checkmark. 4.68:1 contrast against paper.
- **Warning** (oklch(0.5 0.13 65)): The "medium" difficulty label and the MDX warning callout. 4.73:1 contrast against paper.

### Named Rules
**The One Ink Rule.** There is exactly one primary color, and it is the same value as body text. Never introduce a second saturated "brand" accent color — the restraint IS the brand.

**Known gap: `--destructive` fails its own contrast bar.** At oklch(0.577 0.245 27.325) it measures 3.66:1 against paper — under the 4.5:1 body-text minimum this system targets. It reads fine on tinted backgrounds (`bg-destructive/10`) but is too light wherever it's used as direct text color (e.g. `text-destructive` in error pages). Not fixed in the 2026-07-25 pass — flagged, not touched, since it wasn't part of that pass's agreed scope and darkening it would ripple into every button/error surface using it.

## 3. Typography

**Body Font:** Geist (`var(--font-geist-sans)`), with system sans-serif fallback
**Label/Mono Font:** Geist Mono (`var(--font-geist-mono)`), for code blocks and technical labels only

**Character:** One typeface family carries the entire hierarchy — weight and size create contrast, not a second font. This is deliberate restraint, not an oversight: adding a display serif or a second sans would work against the "Ink & Paper" minimalism.

### Hierarchy
- **Display** (700, `clamp(2.5rem, 6vw, 4.5rem)`, 1.05 line-height): Hero name/headline on the homepage only (e.g. "Fahmi Fachrizal").
- **Headline** (900, `clamp(1.875rem, 4vw, 3rem)`, tight tracking): Page-level titles — "Blog", "Learn", "GRE" collection headers. Consistently `font-black tracking-tight`, one step heavier than the hero's display weight.
- **Title** (700, 1.5rem–2.25rem): Card titles, question titles, MDX h1/h2 (h2 carries a bottom border rule).
- **Body** (400, 1rem, 1.7 line-height): Prose and UI copy. MDX prose is capped via Tailwind Typography's `prose` sizing, not a custom max-width.
- **Label** (500, 0.875rem, mono): Code language tags, kbd keys, timestamps paired with a middot separator (`Jul 20, 2026 · Medium`).

### Named Rules
**The Single Voice Rule.** One family (Geist) for everything except code. If a second typeface is ever introduced, it should be for code/mono contexts only, never a second display face.

## 4. Elevation

Flat by default. Cards, buttons, and callouts rest on a 1px hairline border alone — no ambient shadow. Shadow is introduced only as a *response to state*: on hover for interactive cards, or permanently on elements that visually float above the page content (dropdown menus, the `/learn` focus-mode floating control panel, the presentation slideshow controls).

### Shadow Vocabulary
- **Hover lift** (`shadow-lg`): Applied on `:hover` to interactive cards (blog post cards, question cards) alongside a border-color shift toward the primary/ink color at reduced opacity.
- **Floating panel** (`shadow-2xl` + `backdrop-blur-md`): Reserved for elements that overlay page content rather than sit within its flow — dropdown menus, the focus-mode bottom-right control cluster.
- **Reading-surface lift** (`shadow-sm`): The lightest tier, used on the blog/learn article card itself (`bg-white/80 shadow-sm`) to lift it slightly off the muted page background.

### Named Rules
**The Earned Shadow Rule.** Nothing carries a shadow at rest. Shadow appears only on hover, focus, or genuine floating/overlay content — never as static card decoration.

## 5. Components

### Buttons
- **Shape:** `rounded-md` (8px) — one step tighter than card radius.
- **Primary:** Ink background, paper text (`bg-primary text-primary-foreground`), `h-9 px-4 py-2` default sizing.
- **Outline:** Transparent fill, hairline border, `shadow-xs` at rest — the one deliberate exception to the Earned Shadow Rule: a near-invisible 1px shadow that reads as "clickable" rather than "elevated".
- **Ghost:** No border, no fill; background appears only on hover (`hover:bg-accent`).
- **Hover / Focus:** Background darkens via `/90` opacity on primary; `focus-visible:ring-[3px]` using the Focus Ring color on every variant.
- **Split button (compound action):** Two adjacent buttons of the same variant, corners flattened on the touching edge (`rounded-r-none` / `rounded-l-none`), separated by a 1px `border-l` at reduced opacity rather than a gap — used for the "Next question ▾" control in `/learn`.

### Cards / Containers
- **Corner Style:** `rounded-xl` (14px) — one step looser than buttons, the system's default "content container" radius.
- **Background:** Soft Paper (`bg-card`) for both listing cards and the article reading surface — consolidated from a separate `bg-white/80` on 2026-07-25.
- **Shadow Strategy:** Flat at rest, `shadow-lg` + border-color shift on hover (see Elevation).
- **Border:** 1px hairline, always present.
- **Internal Padding:** `p-6` standard; `p-6 md:p-12` for the main reading-surface article container.

### Navigation
- **Top nav:** Sticky, translucent paper background with `backdrop-blur`, hairline bottom border, icon + label link pattern (label hidden below `sm`).
- **Floating nav:** Home page only — a separate pill-shaped, icon-only-below-`sm` nav that appears after scrolling past the hero, for in-page section jumps. Functionally a second navigation system alongside the top nav; a deliberate decision (keep both, or consolidate) is owed before a third pattern gets added.
- **Active/hover state:** `hover:bg-accent hover:text-accent-foreground`; no distinct "active route" styling currently exists in either nav.

### Callouts (Question/Answer states)
- **Info/Callout box:** Tinted background at 5–10% opacity of the semantic color, matching-color icon, left-aligned text — used for MDX admonitions (`<Callout type="info|warning|success|danger">`) and directly informs the quiz answer-choice states (correct = green tint + check icon, incorrect = red tint + x icon).

## 6. Do's and Don'ts

### Do:
- **Do** use ink (#1d0b08) as the only primary/accent color — resist adding a second saturated brand hue.
- **Do** keep cards and buttons flat (border-only) at rest; earn shadow only on hover or for genuinely floating elements.
- **Do** reuse the existing card pattern (`rounded-xl border bg-card p-6`, hover lift) for any new listing/collection UI rather than inventing a new card style — this is exactly how `/learn`'s question cards were built from the blog's card pattern, and it should stay the template.
- **Do** use Geist for everything; reserve Geist Mono strictly for code and technical labels.
- **Do** use the `--success`/`--warning` tokens (not raw Tailwind color literals) for any new semantic state — this is exactly what the 2026-07-25 pass fixed; don't reintroduce the pattern it removed.

### Don't:
- **Don't** introduce a second saturated brand accent color — the one-ink-color restraint is the point.
- **Don't** add ambient/decorative shadows to elements at rest; shadow is a state response only.
- **Don't** use `border-left`/`border-right` as a colored accent stripe on cards or callouts.
- **Don't** use gradient text (`background-clip: text`) — emphasis comes from weight/size, not gradient fills.
- **Don't** build a new nav pattern without first asking whether the existing top-nav/floating-nav split should be consolidated rather than extended to a third variant.
- **Don't** leave new semantic colors (success/warning/danger states) as raw Tailwind utility values — wire them into `globals.css` alongside every other token.
