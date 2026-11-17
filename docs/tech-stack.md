# Tech Stack

## Framework

- **Next.js** — React framework with App Router
- **TypeScript** — type-safe JavaScript

## Styling

- **Tailwind CSS** — utility-first CSS framework
- **shadcn/ui** — reusable UI components
- **Design system** — "Ink & Paper" tokens in `app/globals.css` (no white; `.surface-ink` inverts a section), square shadcn Button variants, one sticky header (`components/layout/site-header.tsx`). Details in `DESIGN.md`.
- **Motion** — CSS only plus one `IntersectionObserver` (`components/motion/scroll-reveal.tsx`); no animation library. Honors `prefers-reduced-motion`.

## Content

- **MDX** — markdown with JSX support for rich content pages
