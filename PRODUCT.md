# Product

## Register

brand

## Users

Primary: recruiters, potential clients, and professional collaborators evaluating Fahmi Fachrizal as a full-stack developer. They typically arrive via a resume link, LinkedIn, or GitHub profile and skim quickly to judge credibility and craft before deciding to reach out.

Secondary: Fahmi himself, using `/learn` daily as a personal GRE practice tool. Not built for public discovery or onboarding — optimized for his own repeat-use study flow.

## Product Purpose

A personal portfolio and professional presence for Fahmi Fachrizal, showcasing work (Experience, Blog) and driving professional opportunities (hiring, freelance, collaboration). Also hosts `/learn`, a self-study GRE/GMAT practice tool built on the same MDX content pipeline as the blog, currently for personal use only.

Success = recruiters/clients reach out, and the site reads as sharp and intentional rather than sprawling — a streamlined single system, not a pile of separately-designed features.

## Brand Personality

Minimal, precise, confident. Quiet craftsmanship — let the work speak, no decorative flourishes, engineer-clean. The warm two-colour palette (paper background, espresso near-black ink, #16100d since 2026-11-17) carries everything; personality comes from large light type, generous space and restraint, not decoration.

## Anti-references

No specific named anti-references. The failure mode to actively avoid: visual and structural drift accumulated feature-by-feature — e.g. `/learn` evolving a different card style than `/blog`, ad-hoc spacing decisions, untokenized one-off colors. "Streamline" means removing that drift, not introducing a new aesthetic.

A 2026-07-25 streamlining pass removed the first round of this drift: the dead `Navbar.tsx` shim, the `bg-white/80`/`bg-card` inconsistency, untokenized quiz-state colors, and all unused dark-mode CSS.

The 2026-11 editorial redesign settled the open navigation question: `top-navbar.tsx` and `floating-navbar.tsx` were consolidated into one sticky `SiteHeader` (wordmark, About / Projects / Blog / Resume, a "Let's talk" button, and a full-screen menu on small screens). There is now exactly one navigation pattern. Extend `components/layout/nav-items.ts` rather than adding another, and keep `/learn` out of it.

Also out of bounds:
- copying the layout reference's words, photos, logos or statistics
- invented clients, numbers or testimonials (every figure on the site comes from existing copy or the CV)
- white surfaces of any kind

## Design Principles

1. **One visual system, not per-feature dialects.** New sections must reuse existing patterns (cards, buttons, nav, typography scale) rather than inventing parallel ones.
2. **Preserve the MDX authoring pipeline as a hard constraint.** Any streamlining must not break how content (blog posts, GRE/GMAT questions) is authored or rendered.
3. **Restraint over decoration.** Minimal, precise, confident — cut before adding.
4. **Every page should read fast and skim well.** Recruiters and visitors judge in seconds; hierarchy and clarity beat cleverness.
5. **Dead code and redundant components get removed, not accumulated.**

## Accessibility & Inclusion

WCAG 2.1 AA target: verified contrast ratios (body text ≥4.5:1, large text ≥3:1), full keyboard navigation, visible focus states, and `prefers-reduced-motion` alternatives for all animation.

A 2026-07-25 polish pass closed the two gaps this section originally flagged: a global `@media (prefers-reduced-motion: reduce)` rule in `globals.css` now collapses every animation/transition site-wide (covers the blog `Presentation` slideshow, the `/learn` focus-mode overlay, and any future animated component in one place), and `--destructive` was darkened from a failing 3.66:1 to 4.89:1 against paper.
