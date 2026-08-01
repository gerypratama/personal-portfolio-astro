# Content Status — Blocking Dependencies

PRD Section 10 lists content the owner has not yet produced. Several PRD
requirements explicitly forbid placeholder content (A5: no "Coming Soon" on
/about; P4: no placeholder cards on /projects). These two facts conflict if
Cline fills gaps with invented copy. Resolve it this way:

## Rule
When a task requires content that is marked ❌ or ⚠️ below, DO NOT invent,
paraphrase from assumption, or generate placeholder text to fill it.
Instead:
1. Build the component/page with the real data structure and layout complete
2. Use an obviously-fake, clearly-marked placeholder ONLY in local dev
   (e.g. `[PLACEHOLDER — bio pending, see content-status.md]`) that would be
   impossible to ship by accident
3. Stop and report which specific content item is blocking completion

Never mark a page or task "done" if it depends on blocked content below.

## Current status (update this table as content arrives)
| Item | Blocks | Status |
|---|---|---|
| Bio copy (3+ yrs, full-stack framing) | /about, / | ⚠️ Draft resume exists, needs web adaptation |
| PawangBisnis description (2-3 sentences) | /projects | ❌ Not written |
| IDSC description | /projects | ❌ Not written |
| nyambat.id description | /projects | ❌ Not written |
| Confirmed tech stack per project | /projects | ❌ Not confirmed |
| nyambat.id real screenshot (16:9, WebP) | /projects | ❌ Missing (current is PNG placeholder) |
| CV PDF (print-ready) | Global CV button | ❌ Not prepared |
| Custom domain decision | Global, deployment | ❌ Pending |
| formly.email endpoint for new domain | /contact | ❌ Pending (works on preview domain in the meantime) |
| IDSC project — public linkability | /projects | ✅ Confirmed — safe to link (live URL and/or repo, whichever exists) |
| INA Digital — mention in work timeline | /about (Experience secondment field) | ✅ Confirmed — omit entirely, do not substitute generic wording |

### Note on IDSC vs INA Digital
These are two different entities, not one blocked item:
- **IDSC** is a project in `src/data/projects.ts` — public linkability is
  confirmed. Build it normally with `liveUrl`/`repoUrl` as available.
- **INA Digital** appears only as a `secondment.client` value inside
  `Experience` entries in `Technical_Architecture.md`'s type definitions
  (i.e. a past-employer/client name in the work timeline, not a project).
  Confirmed: OMIT it entirely.
  - Do not populate `secondment.client` with "INA Digital" in `experience.ts`
  - Do not substitute a generic description in its place either — if the
    secondment period isn't presentable without naming the client, omit
    that `secondment` block from the entry rather than inventing wording
    around it
  - This is resolved, not an open item — no further confirmation needed

## What CAN proceed regardless of blocks
Layout, component structure, styling, routing, dark mode, animations,
SEO scaffolding, and the data-layer TypeScript interfaces are all unblocked —
build these first while content is pending.