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