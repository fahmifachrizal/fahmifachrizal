---
name: fahmifachrizal
description: Personal portfolio and blog for a full-stack developer, with a self-study GRE/GMAT practice tool
colors:
  ink: "#16100d"
  paper: "#e7e0de"
  paper-soft: "#ded7d5"
  ink-muted: "#554e4c"
  hairline: "#c8c1bf"
  input-stroke: "#7f7876"
  focus-ring: "{colors.ink}"
  ink-surface-card: "#251f1c"
  ink-surface-muted-text: "#a8a29f"
  ink-surface-hairline: "#403a37"
  alert-red: "oklch(0.5 0.22 27.325)"
  success: "oklch(0.48 0.14 150)"
  warning: "oklch(0.5 0.13 65)"
typography:
  wordmark:
    fontFamily: "var(--font-geist-sans), Geist, sans-serif"
    fontSize: "clamp(3.25rem, 11.5vw, 9.75rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.05em"
    textTransform: "uppercase"
  display:
    fontFamily: "var(--font-geist-sans), Geist, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 4.5rem)"
    fontWeight: 300
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "var(--font-geist-sans), Geist, sans-serif"
    fontSize: "2.25rem / 3rem / 3.75rem (sm / md / lg)"
    fontWeight: 300
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  card-title:
    fontFamily: "var(--font-geist-sans), Geist, sans-serif"
    fontSize: "1.75rem / 2rem / 2.25rem"
    fontWeight: 400
    lineHeight: 0.88
    textTransform: "uppercase"
  body:
    fontFamily: "var(--font-geist-sans), Geist, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  eyebrow:
    fontFamily: "var(--font-geist-sans), Geist, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.2em"
    textTransform: "uppercase"
  eyebrow-md:
    fontFamily: "var(--font-geist-sans), Geist, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.2em"
    textTransform: "uppercase"
  meta:
    fontFamily: "var(--font-geist-sans), Geist, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    letterSpacing: "0.14em"
    textTransform: "uppercase"
rounded:
  none: "0px"
  full: "9999px"
spacing:
  gutter: "24px / 40px (base / md)"
  container: "1280px"
  section: "64px / 96px / 144px (base / md / lg)"
  band: "112px / 160px (base / lg)"
  measure: "65ch"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 24px, height 40px (lg: 0 32px, height 48px)"
  button-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "4px 0"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 24px"
  card:
    backgroundColor: "transparent (hover: {colors.paper-soft})"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "24px / 32px / 40px"
  header:
    backgroundColor: "{colors.paper} at 85% + backdrop blur"
    textColor: "{colors.ink}"
    height: "64px"
---

# Design System: fahmifachrizal

## 1. Overview

**Creative North Star: "Ink & Paper", editorial edition**

Two colours do all the work: warm paper (#e7e0de) and an espresso near-black ink (#16100d). Ink is the text colour, the primary action colour and the colour of every other band on the home page; there is no accent hue. The 2026-11 editorial redesign took its structure, spacing, type scale and motion from a large-type editorial agency layout. It kept the palette, content and single typeface. Sections alternate paper and ink down the page, headings run very large and light, buttons are square ink rectangles, and nothing carries a shadow at rest.

**There is no white anywhere.** Every surface that the shadcn defaults, the reference layout, or an earlier version of this site painted white now resolves to paper or soft paper. That includes the header, mobile menu, popovers, inputs, cards, the footer, and the blog and `/learn` reading surfaces. This replaces the earlier "white reading surface" decision. Long-form prose now sits directly on paper at a 65ch measure, at 14.5:1 ink-on-paper contrast. The only white left in the repository is on `/sos` (see Do's and Don'ts).

**Key Characteristics:**
- Two colours; ink bands and paper bands alternate down the home page
- One family (Geist) from the 9.75rem wordmark to 12px eyebrows; contrast comes from weight (900 wordmark, 300 headings) and size
- Square corners everywhere (radius 0). `rounded-full` is kept only for true circles: step numbers, answer markers and slide dots.
- Hairline borders define structure; there are no shadows, gradients or ambient blurs
- Motion is a slow reveal (fade, 24px rise, 6px blur, 0.9s expo-out), a wordmark that rises in line by line, and a 60s text marquee. Reduced motion turns all of it off.

## 2. Colors

### Primary
- **Espresso Ink** (#16100d): body text, headings, the primary button fill, ink section backgrounds, and the focus ring on paper. It moved from #1d0b08 (via #17090b) to a browner, darker value on 2026-11-17 at the owner's request. It reaches 14.5:1 against paper and 13.3:1 against soft paper.

### Neutral
- **Warm Paper** (#e7e0de): the page background, header, mobile menu, popovers, footer, reading surfaces, and text on ink.
- **Soft Paper** (#ded7d5): cards, callouts, code blocks, the hover fill on guide cards, the inline slideshow, and secondary buttons. Use it only where a surface has to separate from the page.
- **Muted Ink** (#554e4c): captions, metadata, eyebrows, and secondary copy. 6.3:1 on paper, 5.7:1 on soft paper.
- **Hairline** (#c8c1bf): ink at 15% over paper, used for every border.
- **Input Stroke** (#7f7876): ink at 50%, 3.3:1. Use it wherever a control boundary has to be perceivable.

### Ink-section tokens (`.surface-ink`)
An ink section re-points the same tokens instead of introducing a second set of classes:
- background becomes ink and text becomes paper
- `--primary` becomes paper, so buttons invert to paper on ink
- muted text becomes #a8a29f (7.5:1 on ink)
- hairlines become #403a37
- cards become #251f1c
- the focus ring becomes paper

### Semantic
- **Success** oklch(0.48 0.14 150), **Warning** oklch(0.5 0.13 65), **Alert Red** oklch(0.5 0.22 27.325).
- These are used only for quiz states, difficulty labels and callout icons/borders. Callout body text stays ink, so it holds AA on soft paper.
- Text on a filled success or destructive marker is paper, never white.

### Named Rules
**The One Ink Rule.** There is exactly one primary colour, and it is the text colour. Never introduce a second saturated accent.

**The No White Rule.** No surface or text is `#fff`. Wherever a reference design or a library default says white, use paper. Use soft paper only when the surface must separate from the page. Third-party output follows the same rule: the Mermaid ER diagram sets `rowOdd`/`rowEven` to paper and soft paper, and its hard-coded white markers are overridden to soft paper.

## 3. Typography

**Family:** Geist (`var(--font-geist-sans)`) for everything; Geist Mono only for code. Geist's variable axis covers 300 to 900, so the light display weight needs no second family.

### Hierarchy
- **Wordmark** (900, uppercase, `clamp(3.25rem, 11.5vw, 9.75rem)`, -0.05em, 0.9 line-height): the home hero only, plus the small stacked logotype in the header and footer.
- **Display** (300, `clamp(2.25rem, 6vw, 4.5rem)`, -0.025em, 1.08): the hero role line ("Full Stack Developer") and inner-page H1s (`text-5xl md:text-6xl lg:text-7xl`).
- **Headline** (300, `text-4xl md:text-5xl lg:text-6xl`, 1.1): section H2s, always preceded by an eyebrow (`SectionIntro`).
- **Statement** (300, `text-3xl md:text-4xl lg:text-5xl`, 1.15): the ink intro statement.
- **Card title** (400, uppercase, `text-[1.75rem] lg:text-[2rem] xl:text-4xl`, 0.88): the three guide cards.
- **Post title** (300, `text-2xl md:text-[1.75rem]`): post and question cards.
- **Body** (400, 18px, 1.625): lead and intro copy, capped at 65ch.
- **Eyebrow** (500, uppercase, 0.2em tracking, 12/14px, the `eyebrow` utility): section labels.
- **Meta** (500, uppercase, 0.14em tracking, 12px): dates, read time, difficulty, technology lists, and footer column headings.
- **MDX headings**: h1 and h2 run light (300) with tight tracking; h3 is 400; h4 to h6 stay semibold at small sizes for scannability.

### Named Rules
**The Single Voice Rule.** One family for everything except code.

## 4. Layout and rhythm

- **Container** (the `page-container` utility): max 1280px, with 24px gutters (40px from md).
- **Section rhythm** (the `section-y` utility): `py-16 md:py-24 lg:py-36`.
- **Bands**: the numbers and closing bands use `py-28 lg:py-40`.
- **Measure**: running text is capped at 65ch.
- **Home order**: hero (paper), tech marquee (paper), intro (ink, split with portrait), guide cards (paper), projects (heading on paper, then features alternating ink, paper, ink, paper), writing (paper), numbers (ink, centred), let's talk (ink, centred), footer (paper).

## 5. Elevation

Flat. Nothing has a shadow, at rest or on hover. Floating layers (dropdowns, the focus-mode control cluster, slideshow controls) separate with a hairline border on paper, not a shadow. There are no ambient blur blobs and no glass.

### Named Rules
**The Flat Rule.** Structure comes from hairlines and from alternating paper and ink, never from shadow.

## 6. Components

### Buttons (`components/ui/button.tsx`, one set of variants)
- **default**: a solid ink rectangle with paper text, radius 0, `h-10 px-6` (lg `h-12 px-8`); on hover it drops to 85% ink. Inside `.surface-ink` it renders paper with ink text automatically.
- **link** (the secondary action): text plus a trailing arrow, underlined (6px offset) on hover, and the arrow nudges 4px to the right. Used for "More about me", "All posts", Resume, LinkedIn and GitHub.
- **outline**: transparent with a 30% ink border that turns solid ink on hover. Used for utility controls in `/learn`.
- **secondary**: a soft paper fill. Used for icon controls (slideshow and focus-mode).
- **ghost**: no fill; 5% ink on hover.
- **destructive**: alert red with paper text.
- None of the variants has a shadow, gradient or pill shape.

### Header (`components/layout/site-header.tsx`): the only navigation
- One sticky 64px header on 85% paper with a backdrop blur. A hairline appears once the page scrolls.
- Left: the stacked wordmark. On the home page it stays hidden until the hero wordmark scrolls out of view.
- Centre (lg and up): About, Projects, Blog, Resume. The current page is underlined.
- Right: a solid "Let's talk" button linking to `/#contact`.
- Below lg, a menu button opens a full-screen paper `<dialog>`:
  - large light links with arrows
  - "Let's talk" and the email address
  - focus is trapped by the native modal, Escape closes it, focus returns to the trigger, and the page behind stops scrolling
- The nav list lives in `nav-items.ts`. `/learn` is deliberately absent.
- This replaces both the old `top-navbar.tsx` and the home-only `floating-navbar.tsx`; both were deleted.

### Footer
- Paper with a hairline top border.
- Contents: the wordmark and a one-line tagline, then three columns (Site, Elsewhere, Contact) with meta-style headings, then the copyright year.

### Cards
- **Guide cards**: a three-column grid with hairline dividers, an index number, an uppercase title and an arrow; soft paper fill on hover.
- **Post cards and question cards**: a top hairline, a meta line, a light title (the whole card is clickable), a description and a "Read →". `PostCard` is shared by home and `/blog`; `QuestionCard` follows the same pattern.

### Reading surfaces
- **Blog posts**: an article column on paper (max-w-3xl), with a hairline under the header. The table of contents sits in the right rail.
- **`/learn` questions**: a hairline-framed panel on paper.
- **`/about`**: the Presentation sits directly on paper.
- **MDX blocks**: callouts, code blocks and the question stem use soft paper with hairlines.

### Motion
- `data-reveal` on any element gives a fade, a 24px rise and an un-blur the first time it enters the viewport. A single `ScrollReveal` observer handles this, mounted in the root layout. Elements only start hidden when `html.js` is set and the visitor has not asked for reduced motion.
- The hero wordmark lines rise from a clipping mask (`animate-rise`, staggered by 120ms).
- The tech marquee scrolls over 60s. It pauses on hover and has a Pause/Play toggle (WCAG 2.2.2). Under reduced motion it becomes a static wrapped list.
- The global `prefers-reduced-motion` rule in `globals.css` still collapses every animation and transition.

## 7. Do's and Don'ts

### Do:
- **Do** use `.surface-ink` for any ink band instead of hand-inverting colours.
- **Do** open every home section with `SectionIntro` (an eyebrow plus a light headline) and every inner page with `PageIntro`.
- **Do** use the `link` button variant (text plus arrow) for secondary actions and `default` for the primary one.
- **Do** use the `page-container`, `section-y`, `eyebrow` and `display` utilities instead of re-deriving spacing and type per feature.
- **Do** keep claims on the page traceable to the site's existing copy or the CV.

### Don't:
- **Don't** use white (`#fff`, `bg-white`, `text-white`, `oklch(1 0 0)`) for any surface or text.
- **Don't** add shadows, gradients, glass or blur blobs.
- **Don't** round buttons, cards or panels. Never use pill shapes.
- **Don't** add a second navigation pattern; extend `nav-items.ts`. Don't add `/learn` to it.
- **Don't** introduce a second typeface or a second accent hue.

### Known exceptions
- `/sos` (`app/sos/sos-view.tsx`) keeps its own emergency styling: `text-white` on red buttons and a light grey page. It is a private, encrypted emergency card and deliberately outside this system.
- The staticrypt password screen for `/sos` uses `--template-color-secondary "#ffffff"`, set in `package.json`.
