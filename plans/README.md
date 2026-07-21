# Plans — index

Working/task plans for this repo, kept project-local and version-controlled (not in the shared
`~/.claude/plans/`) so they travel with the project. Configured via `plansDirectory` in
`../.claude/settings.json`.

Three live files on a time horizon, plus an archive — this is deliberately not one-file-per-plan:

- **[`active.md`](active.md)** — in flight right now. Currently: the Whetstone MVP build (static
  UK launch, 12 practice tests).
- **[`deferred.md`](deferred.md)** — near-term, roughly next week.
- **[`cold-storage.md`](cold-storage.md)** — weeks+ out, parked, or frozen ideas.
- **[`archive/`](archive/)** — completed plans, kept as immutable history.

An item graduates cold → deferred → active as its horizon nears or its blocker clears. When it
ships, the same commit folds a one-line outcome into the relevant status doc (`CLAUDE.md` or the
matching `docs/*.md`) and moves the finished plan into `archive/`.

For the *why* behind any plan here, see `../memory/decisions.md`. For what's still genuinely open
(not yet a plan), see `../memory/open-questions.md`.
