# Workflow Rules

## Plan/Act discipline
Use Plan Mode for anything touching more than one file or introducing a new
component/pattern. Act Mode only for well-scoped, single-purpose tasks
(e.g. "add the theme toggle script", "wire up the sitemap integration").

## Branch strategy (per Technical Architecture 13.4)
- `main` → production, auto-deploys to Vercel
- `dev` → active development, Vercel preview deploys
No feature branches needed (solo project). Open dev→main PRs at milestones.

## Definition of done for a page
A page is NOT complete if:
- It depends on an item marked ❌ or ⚠️ in `03-content-status.md`
- Lighthouse/accessibility targets from Architecture Section 14-15 are unverified
- It has not been checked against its PRD acceptance criteria (Section 6.x)

## Memory bank discipline
Run "update memory bank" at the end of every session, and after completing
any task that changes architecture, adds a dependency, or resolves a blocked
content item. Start each new task with "follow your custom instructions" so
Cline reloads `memory-bank/` before acting.

## Domain migration sequencing
Do not implement anything assuming the custom domain is live. Follow
Technical_Architecture.md Section 13.3 order exactly when that task comes up —
it's a strict sequence (deploy → test → DNS → verify SSL → update formly.email
→ redirect old domain), not a checklist to reorder.