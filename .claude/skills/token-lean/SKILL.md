---
name: token-lean
description: Token-efficient execution protocol for large implementation tasks. Use whenever executing a multi-file plan, refactor, or audit to minimize context consumption and cost.
---

# Token-Lean Execution Protocol

Ranked by impact. Apply all of them.

## 1. Context isolation via delegation (highest impact)
- Delegate mechanical, fully-specified work to subagents running **cheaper models (Haiku)**; reserve the expensive orchestrator model for judgement calls and synthesis.
- Pass subagents **file paths and plan references, never file contents**. The subagent reads in its own disposable context; the orchestrator receives only a short summary.
- One subagent per coherent phase — not per file (agent startup has fixed overhead).

## 2. Never re-read what you already know
- Do not re-read a file after editing it — the edit either succeeded or errored.
- Do not re-read files summarized earlier in the session; trust the summary.
- Read only the line ranges you need (`offset`/`limit`) for files >300 lines.

## 3. Surgical writes
- Prefer `Edit` (old/new string) over `Write` (full file) — a Write costs the whole file in tokens; an Edit costs only the changed region.
- Batch all independent edits to one file into consecutive Edit calls without intervening reads.

## 4. Lean search
- `Grep` with `head_limit`, `files_with_matches` mode, and tight regexes — never dump full-file matches.
- `Glob` before `Grep`; never `find | xargs cat`.

## 5. Batch tool calls
- Issue independent tool calls in a single message (parallel execution, one round-trip of context).

## 6. Summaries over transcripts
- When reporting, state outcomes and deltas — never paste file contents, build logs (last 5 lines max), or diffs unless the user asks.

## 7. Plan-file pattern
- For multi-phase work, write the full plan to a file in the repo once. Executors reference it by path. The plan is never re-pasted into any prompt.