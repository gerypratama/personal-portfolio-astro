# Decisions Log

Append one entry per non-trivial decision made during implementation
(deviations from the docs, judgment calls on ambiguous requirements, etc).
Cline should read this before starting related work and add to it after.

## Format
### [Date] — [Short title]
**Context:** why this came up
**Decision:** what was decided
**Source:** PRD/Architecture section, or "judgment call — not covered in docs"

---

### 2026-08-02 — IDSC confirmed linkable; INA Digital omitted
**Context:** PRD Open Item O6 grouped IDSC and INA Digital together as
"may have restrictions." They are actually two different things — IDSC is
a project (`/projects`), INA Digital is a secondment client name in the
work timeline (`/about`).
**Decision:** IDSC may be publicly linked (live URL/repo). INA Digital is
to be omitted entirely from the work timeline — no substitute or genericized
wording in its place. If a secondment entry can't stand without naming the
client, drop that `secondment` block rather than working around it.
**Source:** Owner confirmation in conversation; cross-referenced against
Technical_Architecture.md Experience/secondment type definition.

---

### 2026-08-02 — M1 milestone complete; build output verified
**Context:** M1 (Scaffold & tooling) required verification that `npm run build`
produces both sitemap and Tailwind CSS v4 output. Previous attempts to confirm
via build command output were inconclusive (no visible streaming output).
Owner provided a screenshot of the `dist/` directory; Cline verified directly
by inspecting the actual `dist/` contents.
**Decision:** M1 is complete. Build output confirmed via direct `dist/`
inspection:
- Tailwind v4.3.3 CSS at `dist/_astro/index.CjDIl9Wr.css` — contains all
  utility layers (`properties`, `theme`, `base`, `components`, `utilities`),
  Slate+Indigo theme variables, light/dark custom properties with `.dark`
  overrides, and `.reveal-on-scroll` with `prefers-reduced-motion` override
- Sitemap at `dist/sitemap-index.xml` (index) + `dist/sitemap-0.xml` (URL
  set containing `https://gerypratama.com/` — the only page built so far;
  more URLs will appear as pages are added in M2/M4)
- `site` config set to `https://gerypratama.com` as placeholder per
  Architecture; will be confirmed during M6 domain migration
- Build verification via `dist/` inspection is stronger evidence than dev
  server — if static build produces correct output, dev server will too
**Source:** Architecture Sections 2, 3, 7.3, 8, 9; build output inspection

---

### 2026-09-29 — Dark mode default: PRD vs Architecture conflict resolved (Architecture wins)
**Context:** PRD GL2/D2 say "light is the default; dark mode toggled manually by
the user", but the Architecture 7.1 anti-FOUC snippet falls back to
`prefers-color-scheme` when nothing is stored — so an OS-dark-mode visitor gets
dark mode on first visit without ever toggling. Rule 01 requires flagging
conflicts rather than silently picking one.
**Decision:** Architecture wins. First visit follows the OS preference; from then
on the `localStorage` value wins (an explicit stored choice overrides the OS).
Implemented from Architecture 7.1 in `BaseLayout.astro`.
**Source:** Owner decision in conversation, resolving PRD GL2/D2 vs Architecture 7.1.

---

### 2026-09-29 — Tailwind v4 needs `@custom-variant dark`, not `darkMode: 'class'`
**Context:** Architecture 7.1 states "class-based dark mode (`darkMode: 'class'`
in config)". Tailwind v4 has no JS config, and its `dark:` variant defaults to
the `prefers-color-scheme` media query — so every `dark:` utility would have
ignored the toggle.
**Decision:** Added `@custom-variant dark (&:where(.dark, .dark *));` to
`src/styles/global.css`. This is the v4 equivalent of the documented strategy;
verified in the built CSS (`.dark\:block:where(.dark,.dark *){display:block}`).
**Source:** Architecture Sections 7.1/7.3 — v4 translation of a v3-era setting.

---

### 2026-09-29 — Canonical/OG URLs built from `Astro.site` instead of `Astro.url`
**Context:** Architecture 6.1 shows `href={Astro.url}` for the canonical link,
which renders the full request URL — including the dev host/port in `astro dev`.
**Decision:** `const canonicalURL = new URL(Astro.url.pathname, Astro.site)` and
`ogImageURL = new URL(ogImage, Astro.site)`. Both are absolute and stable in dev
and in the static build (PRD S2, S7). Verified in `dist/index.html`.
**Source:** PRD S2/S7; refinement of the illustrative snippet in Architecture 6.1.

---

### 2026-09-29 — Theme toggle: SVG icons + `aria-pressed`, logic in `src/scripts/theme.ts`
**Context:** Architecture 7.2 shows sun/moon text glyphs and an inline `<script>`
inside the component; the M2 task list in Progress.md also calls for
`src/scripts/theme.ts`.
**Decision:** Inline SVG sun/moon icons (crisper, themeable via `currentColor`,
still swapped with `dark:` variants) marked `aria-hidden`, plus `aria-pressed`
synced by `initThemeToggle()` so the button state reaches assistive tech. The
click logic lives in `src/scripts/theme.ts` and is imported by the component's
script tag — satisfying both documents. The anti-FOUC head script stays
`is:inline` because it must run before paint and cannot import a module.
**Source:** Architecture 7.2 (adapted); Progress.md M2 task list.

---

### 2026-09-29 — Scroll reveal made JS-optional (readyState guard + `<noscript>` fallback)
**Context:** Architecture 8.1 sets `.reveal-on-scroll { opacity: 0 }` and reveals
via IntersectionObserver. If JS is disabled or fails, every revealed section
stays invisible — a silent content-loss failure mode. Separately, a deferred
module script that only listens for `DOMContentLoaded` can miss the event.
**Decision:** `initScrollReveal()` is called directly when
`document.readyState !== 'loading'`, and `BaseLayout.astro` carries a
`<noscript><style is:inline>` rule forcing `.reveal-on-scroll` visible. Neither
changes the documented animation behaviour.
**Source:** Architecture 8.1/8.2 — robustness judgment call, not covered in docs.

---

### 2026-09-29 — Social profile URLs sourced from the live old site
**Context:** PRD GL3 requires LinkedIn + GitHub in the footer, but neither URL
appears anywhere in the PRD or the Architecture doc.
**Decision:** Used the URLs from the existing deployed site
(https://github.com/gerypratama/ and
https://www.linkedin.com/in/gery-pratama-oktaviano/), opened with
`target="_blank" rel="noopener noreferrer"`. The contact email required by PRD C5
is still unknown and is needed before M4.
**Source:** Existing deployed Remix site; not specified in docs.

---

### 2026-09-29 — M2 stubs vs blocked content; OG image and CV PDF gaps
**Context:** M2 wires all 5 routes before any real content exists. PRD A5/P4
forbid placeholder-looking content, so the stubs must be impossible to ship.
**Decision:** Every page body carries an explicit
`[PLACEHOLDER — M2 stub ... see .clinerules/03-content-status.md]` string, and
`/projects` renders no cards at all (not placeholder cards). Two non-blocked
assets are knowingly missing and tracked in Progress.md:
`/images/og/og-default.jpg` (documented OG default, file not produced yet) and
`/cv/gery-pratama-cv.pdf` (link wired per GL4, returns 404 until M5). Both must
be cleared before the M6 launch/SEO checks. Note also that the `.gitkeep` files
in `public/cv` and `public/images/*` are copied into `dist/` — harmless now, but
remove them once real assets land in M5.
**Source:** `.clinerules/03_content_status.md`; PRD Section 10.

---

### 2026-09-29 — Branch naming drift (informational)
**Context:** `.clinerules/04_workflow.md` and Architecture 13.4 name the
development branch `dev`; the repository actually uses `development`.
**Decision:** No rename — `development` is the working branch on origin, and
renaming is out of scope for a code task. Flagged here only so the docs-vs-reality
mismatch isn't re-discovered each session.
**Source:** Observed repo state vs `.clinerules/04_workflow.md`.

---

### 2026-09-29 — M2 milestone complete; verification evidence
**Context:** M2 (Layout shell & global infrastructure) was verified without a
browser available for interactive testing.
**Decision:** Treated `dist/` inspection as the acceptance evidence, matching the
M1 precedent: 5 routes built (`/`, `/about/`, `/projects/`, `/contact/`,
`/404.html`), sitemap contains exactly the 4 indexable URLs (404 excluded by the
sitemap integration), every page has a unique `<title>`, one `<h1>` and an
absolute canonical, the class-based dark variant is present in the compiled CSS,
the `prefers-reduced-motion` and `<noscript>` overrides are both present, and no
external JS files are emitted (both scripts inlined — far under the 10KB budget).
Interactive checks (toggle persistence, FOUC on reload, keyboard operation) still
need a browser pass and are left unchecked in Progress.md.
**Source:** Architecture Sections 6, 7, 8, 14; PRD GL1–GL5, D2–D4, S1–S3.

---


---

### 2026-09-29 — Resume content landed; several content gaps resolved at once
**Context:** M3 needed work-history data for `src/data/experience.ts`, but no
resume existed in the repo, the old live site has no timeline section at all, and
the only experience data in the docs was the illustrative mock in Architecture 6.3.
**Decision:** The owner supplied `docs/resume_content.md` (committed as `1cd4161`)
as the source of truth. It unblocked four things at once:
- `experience.ts` — six entries, highlights used verbatim, nothing rewritten
- the M4 skills grid — resume §Core Skills / §Additional Information map onto
  PRD A3's Frontend / Backend / Databases / Tools groups
- the M4 static contact email required by PRD C5 (`gerypratama.o@gmail.com`)
- the M5 bio base — the professional summary, still ⚠️ because web adaptation is
  a separate writing task
Education and certifications are deliberately not modelled: the `Experience`
type has no field for them and no v1 PRD requirement covers them.
**Source:** Owner-supplied file; PRD A2, A3, C5; Architecture 5.1.

---

### 2026-09-29 — INA Digital: standalone employment entry kept, secondment block omitted
**Context:** The 2026-08-02 ruling said to omit INA Digital entirely from the work
timeline, on the stated premise that it appeared "only as a `secondment.client`
value". The owner-supplied resume disproves that premise: INA Digital is also a
direct employment entry (Frontend Developer, May 2026 – Present), separate from
the May 2024 – Dec 2024 secondment under PT. Digital Data Integrasi. Rule 01
requires flagging a conflict like this rather than silently picking a reading.
**Decision:** Owner confirmed (2026-09-29): keep the standalone May 2026 – Present
`Experience` entry, and continue to omit the DDI `secondment` block entirely (not
genericized, not reworded around). Omitting the standalone entry would have left
/about's timeline without a current role and out of step with the resume (PRD A2),
which is why it was raised. `.clinerules/03-content-status.md` updated to the
refined scope, superseding the 2026-08-02 wording.
**Source:** Owner confirmation; PRD A2; .clinerules/03-content-status.md.

---

### 2026-09-29 — Project live URLs confirmed (no repo URLs)
**Context:** PRD P6 wants external links where available and permitted. IDSC's
linkability was confirmed on 2026-08-02, but no actual URLs existed in any doc, and
the old site's "Details" buttons expose no hrefs in their markup.
**Decision:** Owner supplied `https://pawangbisnis.com/` (PawangBisnis),
`https://idsc.com.sg/` (IDSC) and `https://nyambat-id.vercel.app/` (nyambat.id),
all wired as `liveUrl`. No `repoUrl` values were provided, so none are set and the
"Source code" link simply does not render.
**Source:** Owner message, 2026-09-29; PRD P6.

---

### 2026-09-29 — ProjectCard thumbnail handling: existence-gated media, open decision-3
**Context:** Architecture Section 3 requires thumbnails in `public/images/projects/`,
while the non-negotiable constraint requires all images to go through Astro
`<Image>` — and `<Image>` cannot optimize files served from `public/`. The two
cannot both hold literally (flagged to the owner, who deferred the choice).
Separately, no thumbnail files exist yet (M5 blocker).
**Decision:** Pipeline decision deferred by the owner as `decision-3`. To stay
unblocked and build-safe in the meantime:
- `ProjectCard` gates its media block on `fs.existsSync()` for the thumbnail at
  build time. No file → no `<img>` at all, plus a build-time warning naming the
  missing asset. This avoids both a broken image and an empty frame (an empty frame
  would read as placeholder content, which PRD P4 rules out), and the screenshot
  starts rendering automatically once the asset lands in M5.
- The media markup currently uses a plain `<img>` with explicit
  `width`/`height`/`alt`/`loading`/`decoding` (PRD S6 + CLS target) and a
  `TODO(decision-3)` marker. Only that one block changes if the decision goes the
  other way, so no rework is expected.
**Status:** OPEN — must be resolved before M4/M5 card rendering is signed off.
**Source:** Architecture Sections 3 and 6.2 vs the `<Image>` constraint;
.clinerules/02; PRD S6, P4, D7; owner deferral.

---

### 2026-09-29 — M3 milestone complete; verification evidence
**Context:** M3's data files and `ui/` primitives are not composed into any page
until M4, so a plain `npm run build` would not compile them — leaving syntax errors
undetected. No type-checker is installed (`astro check` would add `@astrojs/check`
+ `typescript`, which was not approved and was therefore not added).
**Decision:** Verified with a temporary scaffold route (`src/pages/m3-check.astro`)
that rendered the four primitives from the real data, built it, inspected the
emitted HTML, then deleted the scaffold and rebuilt. Evidence: 9 `<h3>` (3 cards +
6 timeline roles), 0 secondment blocks, 3 placeholder project descriptions,
2 × "Present" ranges, 0 `<img>` (thumbnails absent as expected), card links with
`target="_blank"` + `rel="noopener noreferrer"`, a bare `download` attribute on the
CV anchor, valid UTF-8 en dashes in date ranges, 0 emitted JS files, and one build
warning per missing thumbnail. Final state: 5 routes, sitemap back to the 4
indexable URLs. Also noted: the Header CV link now renders through
`Button variant="link"`, which changes its colour from slate to indigo-600 /
indigo-400 — deliberate (it is a Must-level CTA) but a visible header restyle.
**Source:** Architecture Sections 6, 14, 15; PRD GL4, S6; M1/M2 verification precedent.

---

### 2026-10-24 — Divergent M2 branches reconciled by resetting to origin
**Context:** Local work on `development` had implemented M2 independently
(`4a2410d` + `047cdb0`), while `origin/development` already carried a different,
further-along M2 (`08dde72`), M3 (`9ee1e2e`) and the owner-supplied
`docs/resume_content.md` (`1cd4161`). The two histories diverged at `aca9321`,
so `git pull` (rebase) conflicted on nearly every shared file. Merging would
have regressed M3 and produced a hybrid of two design systems.
**Decision:** Preserve the local commits on branch `local-m2-backup`, reset
`development` hard to `origin/development`, and salvage only the genuinely
additive local work — the richer page composition (hero, contact form, 404)
— into M4 section components styled against the origin design system. The two
local "fixes" (missing `global.css` import, hard-to-reach CV link) were already
solved better on origin (`Astro.site`-absolute canonical URLs, `Button`-based
CV link), so nothing was lost.
**Source:** Judgment call — not covered in docs; both branches satisfied M2 on
paper but the remote was authoritative.

---

### 2026-10-24 — M4 composition decisions
**Context:** Building the pages surfaced three judgment calls not settled by
the PRD or Architecture doc.
1. **Skills source (PRD A3):** `docs/resume_content.md` lists skills by
   technology group. Grouped into Frontend / Backend / Databases / Tools,
   copied verbatim (23 tags). Defined as a `skillGroups` object inside
   `about.astro` and passed to `SkillsGrid.astro`, per Architecture Section 5
   (single consumer, no separate data file).
2. **Contact fallbacks (PRD C5/C6):** static email `gerypratama.o@gmail.com`
   and the LinkedIn/GitHub URLs come from the owner-supplied resume, matching
   the existing Footer URLs. No address was invented.
3. **C4 success state:** deliberately not implemented yet. A static form has no
   post-submit state of its own; the mechanism depends on formly.email's
   redirect configuration, which cannot exist until the endpoint is provisioned
   for the production domain. Rather than add JavaScript outside the
   sanctioned theme/scroll scripts, the form ships with a placeholder action
   and the success handling is decided in M5.
4. **Project cards with placeholder descriptions:** rendered as flagged in
   `.clinerules/03` (unshippable string from the data layer) because PRD P4
   blocks page completion, not structure work. The page is explicitly not
   marked content-complete.
**Source:** PRD 6.2/6.4/6.3, A3, C4–C6, P4; Architecture Sections 5, 6, 11;
judgment calls where the docs are silent.
