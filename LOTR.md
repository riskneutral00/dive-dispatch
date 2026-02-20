# 👁️ LOTR.md — The One Ring: Multi-AI Master Control
> This file governs all AI tools on this project: Claude Code, Cursor, Gemini CLI, and Anti-Gravity.
> Conflict resolution order: `build-spec.md` > `CORE_LOGIC.md` > project code > global docs.
>
> ⚠️ **LINE LIMIT: This file must never exceed 100 lines.** If an edit would push it past 100 lines,
> move the new content to the appropriate file in the routing table below instead.

---

## MULTI-AI SHARED CONSCIOUSNESS
All AI tools operate from the same project DNA. No tool has its own rules. No tool may contradict another. This file is the arbitrator.

## TOOL ENTRY POINTS

| Tool | Native File | Status |
|---|---|---|
| Claude Code | CLAUDE.md | Redirects here |
| Cursor | .cursorrules | Redirects here |
| Gemini CLI | GEMINI.md | Redirects here |
| Anti-Gravity | .antigravity/rules.md | Redirects here |

---

## FILE ROUTING — What Each AI Must Read

| File | Read When |
|---|---|
| `build-spec.md` | Every task — scope authority |
| `CORE_LOGIC.md` | Every task — active business rules |
| `GLOBAL_CONTEXT.md` | Once per session — mission, stack, personas |
| `BOOKING_SPEC.md` | Once at bootstrap — Architect passes to DB and BE at spawn time |
| `INTELLIGENCE_INJECTION.md` | Once at bootstrap — agent dossiers and spawn sequence |
| `Universal_Agentic_Execution_Core.md` | Only when running the agent team build loop |
| `Universal_Scaffolding_Initializer.md` | Only when bootstrapping a new repo |
| `build-status.md` | Check before starting any task — current build state |

> ⚠️ Do NOT read: `GLOBAL_CONTEXT_DIVE_DISPATCH.md` (deprecated), `PATCH_NOTES.md` (obsolete),
> `overview_risk_neutral.md` (human-only business context).

---

## SESSION LAUNCH (Claude Code — Agent Teams Mandatory)

```bash
# Step 1 — Enable agent teams (REQUIRED — disabled by default)
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
# Split-pane mode (optional): add "teammateMode": "tmux" to settings.json

# Step 2 — Paste this prompt to the Architect:
Read LOTR.md (you are reading it now). You are the Project Architect.
This is a MANDATORY Agent Teams project. Stay in Default permission mode.
Do not cycle Shift+Tab. Only edit files you own as Architect (primarily build-status.md).
For spawn sequence: read Universal_Agentic_Execution_Core.md STEP 3.
For agent dossiers: read INTELLIGENCE_INJECTION.md.
DO NOT ATTEMPT SOLO MODE — the architecture requires 5 parallel agents.
```

> ⚠️ Agent Teams is experimental. If a session drops, recover from `build-status.md`.
> Full agent rules, `.agents` file guidance, and mandatory-team rationale: `Universal_Agentic_Execution_Core.md`.
> Full shared rules (mockup authority, scope discipline, Tailwind v4, commit discipline): `CORE_LOGIC.md`.
> Full subagent and skill authorization: `INTELLIGENCE_INJECTION.md` dossiers.
> Reference: https://code.claude.com/docs/en/agent-teams
