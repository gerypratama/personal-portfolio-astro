# Progress

## Milestone breakdown (initial — refine with Cline in Plan Mode before starting)

### M1 — Scaffold (unblocked, do first)
- [ ] `npm create astro@latest`, install Tailwind v4 via `@tailwindcss/vite`
- [ ] Repo structure per Architecture Section 3
- [ ] `src/data/types.ts` interfaces (Project, Experience)
- [ ] BaseLayout with theme script (inline, anti-FOUC) + meta/OG props

### M2 — Static pages, structure only (unblocked)
- [ ] Home, About, Projects, Contact — layout and components, placeholder-flagged content
- [ ] Nav, footer (dynamic copyright year), dark mode toggle + persistence
- [ ] Scroll reveal (Intersection Observer, respects prefers-reduced-motion)

### M3 — SEO/perf scaffolding (unblocked)
- [ ] Sitemap integration, robots.txt, canonical URLs
- [ ] Per-page title/meta description slots (content pending)

### M4 — Content integration (BLOCKED — see 03-content-status.md)
- [ ] Bio copy → About + Home
- [ ] 3x project descriptions + confirmed tech stacks → projects.ts
- [ ] Real thumbnails (16:9 WebP) for all 3 projects
- [ ] CV PDF in `public/cv/`

### M5 — Contact form (partially blocked)
- [ ] Form markup + client validation + success state (unblocked)
- [ ] formly.email endpoint for new domain (blocked until domain purchased)

### M6 — Launch
- [ ] Lighthouse ≥ 90 verification
- [ ] Domain migration sequence (Architecture 13.3, strict order)
- [ ] Old Remix repo archived, old Vercel URL redirect added

## Last updated
(update this line + a one-line status note every time you run "update memory bank")