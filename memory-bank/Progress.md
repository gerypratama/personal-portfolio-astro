# Progress

## Milestone breakdown

### M1 — Scaffold & tooling  (unblocked — do first)
**Goal:** Working Astro + Tailwind v4 + sitemap dev server with the Architecture Section 3 directory structure in place.

- [ ] Install `tailwindcss` + `@tailwindcss/vite` (v4, NOT `@astrojs/tailwind`), `@astrojs/sitemap`
- [ ] Configure `astro.config.mjs`: `output: 'static'`, `site` placeholder, `integrations: [sitemap()]`, `vite.plugins: [tailwindcss()]`
- [ ] Create directory structure per Architecture Section 3: `src/{components/{layout,ui,sections},data,layouts,pages,scripts,styles}`, `public/{cv,images/{projects,og}}`
- [ ] `src/styles/global.css`: `@import "tailwindcss"`, CSS custom properties for light/dark (Slate+Indigo per Architecture 7.3), `.reveal-on-scroll` + `prefers-reduced-motion` override (Architecture 8.1–8.2)
- [ ] `src/data/types.ts`: `Project` and `Experience` interfaces (Architecture 5.1, verbatim)
- [ ] `public/robots.txt` (permissive, sitemap reference — Architecture Section 9)
- [ ] Verify `npm run dev` compiles with Tailwind utilities working

**Maps to:** Architecture Sections 2, 3, 4, 5.1, 7.3, 8 | PRD T1, T5, T8, T9, S3, S4

---

### M2 — Layout shell & global infrastructure  (unblocked)
**Goal:** Every page renders inside `BaseLayout` with working nav, dark mode (no FOUC), footer, and scroll reveal — main slot empty/placeholder.

- [ ] `src/layouts/BaseLayout.astro`: `<head>` with title/description/ogImage props, OG tags, canonical (`Astro.url`), inline anti-FOUC theme script in `<head>` before styled content (Architecture 7.1), Header/Footer, `<slot/>`, scroll reveal init script (Architecture 8.1)
- [ ] `src/components/layout/Header.astro`: nav links (Home, Projects, About, Contact — PRD GL1), ThemeToggle, CV download link (PRD GL4 — link works, PDF itself is blocked content)
- [ ] `src/components/layout/Footer.astro`: dynamic copyright year (`new Date().getFullYear()`), LinkedIn + GitHub links (PRD GL3)
- [ ] `src/components/ui/ThemeToggle.astro`: button with `aria-label`, sun/moon icons, toggle script with `localStorage` persistence (Architecture 7.2)
- [ ] `src/scripts/theme.ts` + `src/scripts/animations.ts`: `initScrollReveal()` IntersectionObserver, unobserve after first reveal (Architecture 8.1)
- [ ] Wire all 5 page files (`index`, `about`, `projects`, `contact`, `404`) to `BaseLayout` with placeholder `<slot>` content so nav/routes work end-to-end
- [ ] Verify: dark mode toggles + persists, no FOUC on reload, `prefers-reduced-motion` disables reveal, keyboard-reachable toggle

**Maps to:** Architecture Sections 6, 7, 8 | PRD GL1, GL2, GL3, GL4, GL5, D2, D3, D4

**Needs owner confirmation:** PRD Open Item O5 (color palette / design reference) — Architecture 7.3 specifies Slate+Indigo. Treat as default adjustable in `global.css`; confirm before M4 polish.

---

### M3 — Data layer & UI primitives  (unblocked)
**Goal:** Typed data files and all reusable components built and individually testable.

- [ ] `src/data/projects.ts`: 3 entries (PawangBisnis, IDSC, nyambat.id) with `description: '[PLACEHOLDER — pending, see content-status.md]'`, placeholder tech stacks, `featured` flags, `liveUrl`/`repoUrl` per Decisions log (IDSC linkable, INA Digital N/A here). Export `featuredProjects` (Architecture 5.2)
- [ ] `src/data/experience.ts`: work timeline entries from resume. INA Digital secondment omitted entirely per Decisions log — drop the `secondment` block rather than genericize. `category: 'primary' | 'prior'` grouping (Architecture 5.1)
- [ ] `src/components/ui/Button.astro`: variant-aware (primary/secondary/link), used for CTAs and CV download
- [ ] `src/components/ui/ProjectCard.astro`: thumbnail (Astro `<Image>` 800×450 WebP), title, description, tech stack tags, live/repo links (Architecture 6.2, Section 10)
- [ ] `src/components/ui/SkillTag.astro`: tag pill
- [ ] `src/components/ui/TimelineItem.astro`: main entry + conditional nested secondment block (Architecture 6.3 — though per Decisions, no secondment will render for now)
- [ ] Skills grouped object (Frontend/Backend/Databases/Tools) — defined in `about.astro` per Architecture Section 5, not a separate file

**Maps to:** Architecture Sections 5, 6, 10 | PRD A2, A3, P2, P3, P5

---

### M4 — Page builds (structure + placeholder-flagged content)  (unblocked for structure)
**Goal:** All 4 pages + 404 fully laid out with real component composition. Content gaps marked `[PLACEHOLDER — ...]` per `.clinerules/03`. Pages are NOT marked "done" — they depend on blocked content (M5).

- [ ] `index.astro` — `Hero.astro` (name, title, location, tagline, primary CTA → /projects, secondary CTA → /contact, CV button) + `FeaturedProjects.astro` (top 2 featured cards) (PRD H1–H6)
- [ ] `about.astro` — bio paragraph `[PLACEHOLDER — bio pending]`, `WorkTimeline.astro` (consuming `experience.ts`), `SkillsGrid.astro`, CV button (PRD A1–A5)
- [ ] `projects.astro` — grouped by type (Professional / Personal), sorted by `order`, `ProjectCard` grid (PRD P1–P3, P6)
- [ ] `contact.astro` — `ContactForm.astro` (formly.email form, Name/Email/Subject/Message, required + client-side validation, honeypot, success state markup), static email fallback, LinkedIn/GitHub links, freelance note (PRD C1–C7)
- [ ] `404.astro` — on-brand not-found page (PRD GL6)
- [ ] Per-page `<title>`/`<meta description>` slots filled with real copy where unblocked, placeholder-flagged where pending
- [ ] Verify: all internal routes resolve (no 404s), responsive at mobile/tablet/desktop, heading hierarchy h1→h2→h3 correct per page

**Maps to:** PRD Sections 6.1–6.5 (all page requirements) | Architecture Section 4

**Blocked content (do NOT invent — mark placeholder and stop):** bio copy (⚠️), 3× project descriptions (❌), confirmed tech stacks (❌), nyambat screenshot (❌), CV PDF (❌)

---

### M5 — Content integration  (BLOCKED — see `.clinerules/03-content-status.md`)
**Goal:** Replace all placeholder-flagged content with real owner-produced content. Each item unblocks specific PRD "Must" requirements.

- [ ] Bio copy (web-adapted from July 2026 resume) → `about.astro` + `index.astro` Hero tagline  (⚠️ draft exists) — unblocks PRD A1, H4
- [ ] PawangBisnis description (2–3 sentences) → `projects.ts`  (❌) — unblocks PRD P2, P4
- [ ] IDSC description (2–3 sentences) → `projects.ts`  (❌) — unblocks PRD P2, P4
- [ ] nyambat.id description (2–3 sentences) → `projects.ts`  (❌) — unblocks PRD P2, P4
- [ ] Confirmed tech stack per project → `projects.ts`  (❌) — unblocks PRD P5
- [ ] Real thumbnails (16:9, WebP, 800×450) for all 3 → `public/images/projects/`  (❌ for nyambat) — unblocks PRD P7, D7
- [ ] CV PDF (print-ready) → `public/cv/gery-pratama-cv.pdf`  (❌) — unblocks PRD H6, A4, GL4
- [ ] formly.email endpoint for new domain → `ContactForm.astro` action  (❌ pending domain) — unblocks PRD C1

**Cannot start until owner delivers content.** Per workflow rules, do not mark pages "done" until this milestone completes.

---

### M6 — Launch & domain migration  (BLOCKED on custom domain decision)
**Goal:** Production deployment with zero-downtime domain migration. Strict sequence — do not reorder (Architecture 13.3).

- [ ] Lighthouse Performance ≥ 90 desktop, CLS < 0.1, LCP < 2.5s, JS bundle < 10KB (Architecture Section 14)
- [ ] Accessibility audit: keyboard nav, contrast ≥ 4.5:1 both modes, `prefers-reduced-motion`, heading hierarchy, `lang="en"` (Architecture Section 15)
- [ ] SEO verification: unique titles/descriptions per page, OG tags, canonical URLs, sitemap resolves, robots.txt permissive (PRD S1–S7)
- [ ] 1. Deploy Astro site to Vercel → live at `*.vercel.app`
- [ ] 2. Test all pages, form, CV download, dark mode on preview URL
- [ ] 3. Add custom domain to NEW Vercel project
- [ ] 4. Update DNS records at registrar
- [ ] 5. Wait for DNS propagation
- [ ] 6. Verify custom domain live + SSL issued
- [ ] 7. Update formly.email allowed domain
- [ ] 8. OLD Vercel project: add redirect `gerypratama.vercel.app` → new domain
- [ ] 9. Archive old Remix repo on GitHub

**Maps to:** Architecture Section 13.3 | PRD T2, T3, T4, S5

---

## Status summary

| Milestone | Status | PRs (dev→main) |
|---|---|---|
| M1 — Scaffold & tooling | ✅ Unblocked | 1 |
| M2 — Layout shell | ✅ Unblocked | 1 |
| M3 — Data + UI primitives | ✅ Unblocked | 1 |
| M4 — Page builds (structure) | ✅ Unblocked (content placeholdered) | 1 |
| M5 — Content integration | ❌ Blocked on owner content | — |
| M6 — Launch & migration | ❌ Blocked on domain decision | — |

M1–M4 can be executed back-to-back now — all unblocked foundation/structure work. 4 clean dev→main PRs deliver a fully functional (but content-incomplete) site on a Vercel preview URL. M5 and M6 wait on the owner.

## Last updated
2026-08-02 — Milestone breakdown finalized in Plan Mode and written to Progress.md. M1–M4 unblocked and ready to execute; M5–M6 blocked on owner content/domain.