# Project Context

This is a static Astro rewrite of a personal portfolio (gerypratama.vercel.app),
replacing an existing Remix site. Owner is a solo developer — no design handoff,
no QA team, no content team.

## Source of truth
Two documents govern this project. Read both before any non-trivial task:
- `docs/PRD.md` — product requirements, priorities, non-goals, content dependencies
- `docs/Technical_Architecture.md` — approved stack, file structure, exclusions

If the two documents conflict, STOP and flag the conflict instead of picking one.
Do not implement anything both documents are silent on without asking first.

## Non-goals (do not build these even if asked casually)
No blog, no CMS, no i18n, no case study detail pages, no e-commerce/booking,
no analytics dashboard, no dynamic routes, no backend/server logic.
The site is 100% static output (Astro `output: 'static'`).

## Priority reference
PRD requirements are tagged Must / Should. Treat "Must" as blocking for a page
to be considered complete. "Should" items can slip to a follow-up task.