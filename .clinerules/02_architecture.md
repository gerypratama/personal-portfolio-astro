# Architecture Rules

Full detail lives in `docs/Technical_Architecture.md`. Summary Cline must follow
without re-deriving it each task:

## Stack (locked — do not substitute)
- Astro (latest stable), output mode: static
- Tailwind CSS v4 via `@tailwindcss/vite` — NOT `@astrojs/tailwind` (deprecated for v4)
- Vanilla JS only for theme toggle + scroll reveal — no React/Vue/Svelte islands
- Data layer: plain typed TypeScript files (`src/data/*.ts`) — NOT Content
  Collections, NOT a CMS. This is a deliberate choice for a 3-project site.
- Contact form: formly.email, plain HTML `<form action=...>`, no JS required

## Explicitly excluded — do not suggest or introduce
shadcn/ui, DaisyUI, GSAP/Framer Motion/Motion, Astro Content Collections,
any CMS integration, any JS framework island.
If a task seems to need one of these, that's a signal the task has drifted
out of scope — flag it instead of adding the dependency.

## Repository structure
Mirror `docs/Technical_Architecture.md` Section 3 exactly. Key paths:
- `src/pages/{index,about,projects,contact,404}.astro` — no dynamic routes in v1
- `src/data/{types.ts,projects.ts,experience.ts}`
- `src/components/{layout,ui,sections}/`
- `public/cv/`, `public/images/projects/` (16:9, WebP, 800x450)

## Non-negotiable technical constraints
- Lighthouse performance ≥ 90 desktop; bundle < 10KB JS
- `prefers-reduced-motion` respected (Architecture Section 8.2) — not optional
- All images via Astro `<Image>` with explicit width/height (CLS prevention)
- Dark mode: light default, toggle persisted via localStorage, no FOUC
  (inline theme script in `<head>` before styled content)