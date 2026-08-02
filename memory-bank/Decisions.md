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
