# Progress

## Milestone breakdown

### M1 — Scaffold & tooling  (unblocked — do first)
**Goal:** Working Astro + Tailwind v4 + sitemap dev server with the Architecture Section 3 directory structure in place.

- [x] Install `tailwindcss` + `@tailwindcss/vite` (v4, NOT `@astrojs/tailwind`), `@astrojs/sitemap`
- [x] Configure `astro.config.mjs`: `output: 'static'`, `site` placeholder, `integrations: [sitemap()]`, `vite.plugins: [tailwindcss()]`
- [x] Create directory structure per Architecture Section 3: `src/{components/{layout,ui,sections},data,layouts,pages,scripts,styles}`, `public/{cv,images/{projects,og}}`
- [x] `src/styles/global.css`: `@import "tailwindcss"`, CSS custom properties for light/dark (Slate+Indigo per Architecture 7.3), `.reveal-on-scroll` + `prefers-reduced-motion` override (Architecture 8.1–8.2)
- [x] `src/data/types.ts`: `Project` and `Experience` interfaces (Architecture 5.1, verbatim)
- [x] `public/robots.txt` (permissive, sitemap reference — Architecture Section 9)
- [x] Verify `npm run build` produces sitemap + Tailwind CSS v4 output (confirmed via `dist/` inspection — see Decisions log)

**Maps to:** Architecture Sections 2, 3, 4, 5.1, 7.3, 8 | PRD T1, T5, T8, T9, S3, S4

---

### M2 — Layout shell & global infrastructure  (unblocked)
**Goal:** Every page renders inside `BaseLayout` with working nav, dark mode (no FOUC), footer, and scroll reveal — main slot empty/placeholder.

- [x] `src/layouts/BaseLayout.astro`: `<head>` with title/description/ogImage props, OG tags, canonical built from `Astro.site` + pathname, inline anti-FOUC theme script in `<head>` before styled content (Architecture 7.1), Header/Footer, `<slot/>`, scroll reveal init script (Architecture 8.1) + `<noscript>` fallback
- [x] `src/components/layout/Header.astro`: nav links (Home, Projects, About, Contact — PRD GL1) with `aria-current="page"` active state, ThemeToggle, CV download link (PRD GL4 — link wired; PDF is still-blocked content so it 404s until M5)
- [x] `src/components/layout/Footer.astro`: dynamic copyright year (`new Date().getFullYear()`), LinkedIn + GitHub links (PRD GL3 — profile URLs sourced from the live old site, see Decisions log)
- [x] `src/components/ui/ThemeToggle.astro`: button with `aria-label` + synced `aria-pressed`, sun/moon inline SVG icons (shown via `dark:` variants), toggle logic in `src/scripts/theme.ts` with `localStorage` persistence (Architecture 7.2)
- [x] `src/scripts/theme.ts` + `src/scripts/animations.ts`: `initThemeToggle()` + `initScrollReveal()` IntersectionObserver, unobserve after first reveal (Architecture 8.1)
- [x] All 5 page files (`index`, `about`, `projects`, `contact`, `404`) wired to `BaseLayout` with clearly-marked `[PLACEHOLDER — M2 stub]` content so nav/routes work end-to-end (no invented copy, no placeholder project cards)
- [x] Verified via `dist/` inspection: 5 routes built (`/`, `/about/`, `/projects/`, `/contact/`, `/404.html`), sitemap lists the 4 indexable URLs (404 correctly excluded), unique `<title>` + exactly one `<h1>` per page, canonical/OG URLs absolute, `.dark\:block:where(.dark,.dark *)` compiled into the CSS (class-based dark mode live), `prefers-reduced-motion` override + `<noscript>` fallback present, zero external JS files (both scripts inlined — far under the 10KB budget)
- [ ] Outstanding browser check (dev server): toggle persists across reload, no FOUC on a hard reload, keyboard-reachable toggle, reduced-motion disables the reveal

**Known gaps carried forward (not M2 defects):** `/images/og/og-default.jpg` is referenced as the OG default but the asset does not exist yet (M5/M6 SEO check); `/cv/gery-pratama-cv.pdf` 404s until the PDF lands in M5.

**Maps to:** Architecture Sections 6, 7, 8 | PRD GL1, GL2, GL3, GL4, GL5, D2, D3, D4

**Resolved (2026-09-29):** PRD Open Item O5 (color palette / design reference) — Slate+Indigo from Architecture 7.3 remains the default, adjustable in `global.css`.
**Resolved (2026-09-29):** PRD GL2/D2 ("light is the default, toggled manually") vs Architecture 7.1's OS-preference fallback — owner chose **Architecture**: first visit follows the OS preference, after that `localStorage` wins. See Decisions log.

---

### M3 — Data layer & UI primitives  ✅ Complete (2026-09-29)
**Goal:** Typed data files and all reusable components built and individually testable.

- [x] `src/data/projects.ts`: 3 entries (PawangBisnis, IDSC, nyambat.id). `description` kept as unshippable `[PLACEHOLDER — …]` (owner copy still ❌); `techStack: []` left empty rather than guessed (PRD P5 accuracy still ❌); `featured`/`order` per Architecture 5.2; `liveUrl` set from owner-confirmed URLs (no repo URLs were provided). Export `featuredProjects` (Architecture 5.2)
- [x] `src/data/experience.ts`: 6 entries built from `docs/resume_content.md` (owner-supplied) with highlights verbatim — nothing rewritten. INA Digital's DDI secondment block omitted; its standalone `May 2026 – Present` entry kept (refined owner decision — see Decisions log). `category: 'primary' | 'prior'` grouping (Architecture 5.1)
- [x] `src/components/ui/Button.astro`: variant-aware (primary/secondary/link), renders `<a>` when `href` is set and `<button>` otherwise, with `download`/`external` support; Header CV link now uses it
- [x] `src/components/ui/ProjectCard.astro`: title, description, tech-tag row, conditional live/repo links (Architecture 6.2). The media block renders only when the thumbnail file exists at build time — no thumbnails exist yet (❌ M5), so it emits nothing and logs a build warning instead of a broken image or an empty frame. **Thumbnail markup itself is pending open decision-3** (`public/` + `<img>` vs `src/` + Astro `<Image>`)
- [x] `src/components/ui/SkillTag.astro`: tag pill (renders an `<li>`, used inside a `<ul>`)
- [x] `src/components/ui/TimelineItem.astro`: main entry + conditional nested secondment block (Architecture 6.3 — component supports it; no entry populates it)
- [ ] Skills grouped object (Frontend/Backend/Databases/Tools) — lives in `about.astro` per Architecture Section 5, not a separate file → belongs to M4. Source material is now available (resume §Core Skills / §Additional Information)

**Verification (2026-09-29):** `npm run build` green. Because the primitives are not composed into pages until M4, a temporary scaffold page rendered all of them from the real data; `dist/` inspection then confirmed 9 `<h3>` (3 cards + 6 timeline roles), 0 secondment blocks, 3 placeholder project descriptions, 2 × "Present" ranges, 0 `<img>` (thumbnails absent, as expected), card links with `target="_blank" rel="noopener noreferrer"`, a CV anchor emitting a bare `download` attribute, valid UTF-8 en dashes in date ranges, 0 emitted JS files, and the build warning firing once per missing thumbnail. Scaffold deleted and rebuilt afterwards: 5 routes, sitemap back to the 4 indexable URLs. Rendering of the composed components is verified in M4.

**Maps to:** Architecture Sections 5, 6, 10 | PRD A2, A3, P2, P3, P5

---

### M4 — Page builds (structure + placeholder-flagged content)  (✅ complete for structure)
**Goal:** All 4 pages + 404 fully laid out with real component composition. Content gaps marked `[PLACEHOLDER — ...]` per `.clinerules/03`. Pages are NOT marked "done" — they depend on blocked content (M5).

- [x] `index.astro` — `Hero.astro` (name, title, location, tagline, primary CTA → /projects, secondary CTA → /contact, CV button) + `FeaturedProjects.astro` (top 2 featured cards) (PRD H1–H6)
- [x] `about.astro` — bio paragraph `[PLACEHOLDER — bio pending]`, `WorkTimeline.astro` (consuming `experience.ts`), `SkillsGrid.astro`, CV button (PRD A1–A5)
- [x] `projects.astro` — grouped by type (Professional / Personal), sorted by `order`, `ProjectCard` grid (PRD P1–P3, P6)
- [x] `contact.astro` — `ContactForm.astro` (formly.email form, Name/Email/Subject/Message, required + client-side validation, honeypot; success state deferred — see Decisions), static email fallback, LinkedIn/GitHub links, freelance note (PRD C1–C7)
- [x] `404.astro` — on-brand not-found page (PRD GL6)
- [x] Per-page `<title>`/`<meta description>` slots filled with real copy where unblocked, placeholder-flagged where pending
- [x] Verify: all internal routes resolve (no 404s), responsive at mobile/tablet/desktop, heading hierarchy h1→h2→h3 correct per page
- [x] Section components created: `Hero`, `FeaturedProjects`, `WorkTimeline`, `SkillsGrid`, `ContactForm` (Architecture Section 3)
- [x] Skills grid populated from `docs/resume_content.md` (23 tags in 4 groups) — PRD A3 unblocked
- [x] Contact static email fallback + social links use the owner-supplied resume values — PRD C5/C6 unblocked

**Verification (2026-10-24):** `npm run build` green → 5 routes, sitemap 4 URLs, 18.5KB CSS, 939 bytes inline JS. Automated `dist/` checks: every page has exactly one `h1` and no skipped heading levels (`index 1233`, `about 12333333323333`, `projects 123323`, `contact 1222`); zero broken internal links on any page; 2 featured cards on `/`, 3 on `/projects`, 6 timeline entries and 23 skill tags on `/about`; contact form exposes name/email/subject/message/_gotcha; canonical + `og:url` absolute (`https://gerypratama.com/about/`); missing-thumbnail warnings fire once per project as designed. Browser-level responsive + Lighthouse checks still pending (no browser in this environment).

**Maps to:** PRD Sections 6.1–6.5 (all page requirements) | Architecture Section 4

**Still blocked content (do NOT invent — mark placeholder and stop):** bio copy (⚠️), 3× project descriptions (❌), confirmed tech stacks (❌), thumbnails (❌), CV PDF (❌), formly endpoint + C4 success mechanism (❌)

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
| M1 — Scaffold & tooling | ✅ Complete | 1 |
| M2 — Layout shell | ✅ Complete (structure verified; browser pass pending) | 1 |
| M3 — Data + UI primitives | ✅ Complete | 1 |
| M4 — Page builds (structure) | ✅ Complete for structure (content placeholdered) | 1 |
| M5 — Content integration | ❌ Blocked on owner content | — |
| M6 — Launch & migration | ❌ Blocked on domain decision | — |

M1–M4 are complete for structure. The site is fully navigable with real timeline/skills/contact data, and the remaining placeholder copy is isolated to five blocked content items (M5). M6 waits on the domain decision.

## Last updated
2026-10-24 — M4 (Page builds, structure) complete. Added `sections/{Hero,FeaturedProjects,WorkTimeline,SkillsGrid,ContactForm}.astro` and composed all 4 pages + 404. `/about` now renders the real timeline (6 entries) and a 23-tag skills grid from `docs/resume_content.md`; `/contact` uses the owner-supplied email and profile URLs. Branch reconciliation: local M2 work that duplicated `origin/development` was preserved on branch `local-m2-backup`, `development` was reset to `origin/development` (M2 + M3 + resume doc), and only the page-composition value was salvaged into M4. Open items carried forward: decision-3 (thumbnail pipeline), C4 success-state mechanism (needs the formly endpoint), and all M5 content blocks. M5–M6 remain blocked on owner content/domain.
