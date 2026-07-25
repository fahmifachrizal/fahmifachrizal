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

Minimal, precise, confident. Quiet craftsmanship — let the work speak, no decorative flourishes, engineer-clean. The existing warm neutral palette (cream background, near-black ink) stays as-is; personality comes from restraint and consistency, not a visual overhaul.

## Anti-references

No specific named anti-references. The failure mode to actively avoid: visual and structural drift accumulated feature-by-feature — e.g. `/learn` evolving a different card style than `/blog`, ad-hoc spacing decisions, untokenized one-off colors. "Streamline" means removing that drift, not introducing a new aesthetic.

A 2026-07-25 streamlining pass removed the first round of this drift: the dead `Navbar.tsx` shim, the `bg-white/80`/`bg-card` inconsistency, untokenized quiz-state colors, and all unused dark-mode CSS. Remaining nav surface is exactly two deliberate patterns (`top-navbar.tsx` for content pages, `floating-navbar.tsx` for home in-page jumps) — don't add a third without asking whether these two should consolidate first.

## Design Principles

1. **One visual system, not per-feature dialects.** New sections must reuse existing patterns (cards, buttons, nav, typography scale) rather than inventing parallel ones.
2. **Preserve the MDX authoring pipeline as a hard constraint.** Any streamlining must not break how content (blog posts, GRE/GMAT questions) is authored or rendered.
3. **Restraint over decoration.** Minimal, precise, confident — cut before adding.
4. **Every page should read fast and skim well.** Recruiters and visitors judge in seconds; hierarchy and clarity beat cleverness.
5. **Dead code and redundant components get removed, not accumulated.**

## Accessibility & Inclusion

WCAG 2.1 AA target: verified contrast ratios (body text ≥4.5:1, large text ≥3:1), full keyboard navigation, visible focus states, and `prefers-reduced-motion` alternatives for all animation — including the existing blog `Presentation`/slideshow component and the `/learn` focus-mode overlay, neither of which currently has a reduced-motion fallback.
