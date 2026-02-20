# Instruction: Initialize Universal Project Scaffolding (Master Engine Edition)

> 📌 **READ WHEN**: Bootstrapping a new repo only. Do not re-ingest after initial setup.

## 1. TARGET STATE MAP & DIRECTORY CREATION

> ⚠️ **Existing files guard:** This scaffolding may run in a folder that already contains foundational files (LOTR.md, GLOBAL_CONTEXT.md, mockups/, etc.). Before writing any file, check if it already exists. If it does, do NOT overwrite it — skip that file and log it as "already present." Only create files that are missing.

Establish this exact directory structure to support a Multi-AI Shared Consciousness:

```
/project-root
├── LOTR.md                    # 👁️ Master Control: governs all AI tools
├── CLAUDE.md                  # Claude Code native redirect → LOTR.md
├── .cursorrules               # Cursor + Anti-Gravity native redirect → LOTR.md
├── GEMINI.md                  # Gemini CLI native redirect → LOTR.md
├── .antigravity/
│   └── rules.md               # Anti-Gravity project rules redirect → LOTR.md
├── GLOBAL_CONTEXT.md          # Master DNA: Mission, Stack, Stakeholders, Visuals
├── build-spec.md              # Feature Roadmap & Phase Checklist
├── INTELLIGENCE_INJECTION.md  # Agent calibration dossiers
├── build-status.md            # Live build state — updated after every batch
├── /mockups                   # Absolute Visual Authority
│   ├── README.md              # The Root Mockup Index (Traffic Cop)
│   ├── /Stakeholders          # Local context folders (e.g., /Instructor)
│   │   └── README.md          # Persona constraints for local folder
│   ├── /Shared                # Global flows & registries
│   │   └── README.md          # Global view constraints
│   └── metadata.json          # Stakeholder-to-Mockup Mapping
├── CORE_LOGIC.md              # Business Rules & Manual Override Logic
└── /config                    # Reserved for future tool-specific config

> **Note on agent team definitions:** No `/.agent/rules/` directory is used. Agent team definitions
> live in `Universal_Agentic_Execution_Core.md` STEP 3 (natural language spawn). `CORE_LOGIC.md`
> lives at the project root — do not place it under `/.agent/rules/` or any subdirectory.
```

---

## 2. PHYSICAL FILE WRITING (The "Pre-Load" DNA)

Read each modular file provided by the User. Do not invent or assume any values. Write only what is explicitly defined in those files. The project files are the single source of truth — do not restate their contents here.

**Confirm the following are physically present in the written files:**

- GLOBAL_CONTEXT.md: mission, golden thread, tech stack, visuals, regional rule (if any)
- CORE_LOGIC.md: active V1 rules, manual override authority, future rules table
- build-spec.md: scope decision table with ✅ ACTIVE and 🔴 DEFERRED features

Use this as a verification checklist — flag any category not found in the provided files as `[UNDEFINED — USER INPUT REQUIRED]`.

**From GLOBAL_CONTEXT.md, confirm and anchor:**

- MISSION: [Defined in GLOBAL_CONTEXT]
- GOLDEN THREAD: [Defined in GLOBAL_CONTEXT]
- TECH STACK: [Defined in GLOBAL_CONTEXT]
- VISUALS: [Defined in GLOBAL_CONTEXT]
- COMPLIANCE_CONSTRAINTS: [Defined in GLOBAL_CONTEXT]

**From CORE_LOGIC.md, confirm and anchor:**

- ACTIVE V1 RULESET: [As defined in CORE_LOGIC ACTIVE RULES section]
- MANUAL OVERRIDE RULE: [Which roles have override authority and by what mechanism]
- FUTURE RULES: [As defined in CORE_LOGIC FUTURE RULES section — DEFERRED; do not implement in V1]

**Create `/mockups/metadata.json`** — extract stakeholder names, mockup filenames, and roles directly from `GLOBAL_CONTEXT.md`. Once written, this file is the mapping authority — do not re-read the full persona table from GLOBAL_CONTEXT for routing decisions.

**Create `build-status.md`** — initialize with current date, version V1, status "Scaffolding complete." This file is the single source of truth for build state and session recovery. Do not duplicate its contents in GLOBAL_CONTEXT.

---

## 3. SHARED CONSCIOUSNESS REDIRECTS (The One Ring Architecture)

### Step A — Create the Master Control File: `LOTR.md`

This is the single governing document for all AI tools on this project.
All tool-specific files point here and here alone. Nothing is duplicated.

Write `LOTR.md` with the following content:

````
# 👁️ LOTR.md — The One Ring: Multi-AI Master Control
> This file governs all AI tools on this project: Claude Code, Cursor, Gemini CLI, and Anti-Gravity.
> Conflict resolution order: build-spec.md > CORE_LOGIC.md > project code > global docs.
>
> ⚠️ **LINE LIMIT: This file must never exceed 100 lines.** If an edit would push it past 100 lines,
> move the new content to the appropriate file in the routing table instead.

## THIS PROJECT USES A MULTI-AI SHARED CONSCIOUSNESS.
All AI tools operate from the same project DNA. No tool has its own rules.
No tool may contradict another. This file is the arbitrator.

## TOOL ENTRY POINTS
| Tool | Native File | Status |
|---|---|---|
| Claude Code | CLAUDE.md | Redirects here |
| Cursor | .cursorrules | Redirects here |
| Gemini CLI | GEMINI.md | Redirects here |
| Anti-Gravity | .antigravity/rules.md | Redirects here |

## FILE ROUTING — What Each AI Must Read
| File | Read When |
|---|---|
| build-spec.md | Every task — scope authority |
| CORE_LOGIC.md | Every task — active business rules |
| GLOBAL_CONTEXT.md | Once per session — full vision, stack, personas |
| BOOKING_SPEC.md | Once at bootstrap — Architect passes to DB and BE at spawn time |
| INTELLIGENCE_INJECTION.md | Once at bootstrap — agent calibration dossiers |
| Universal_Agentic_Execution_Core.md | Only when running the agent team build loop |
| Universal_Scaffolding_Initializer.md | Only when bootstrapping a new repo |
| build-status.md | Check before starting any task — current build state |

## SESSION LAUNCH (Claude Code)

> ⚠️ EXPERIMENTAL FEATURE — Agent Teams has known limitations around session resumption,
> task coordination, and shutdown. Recover state from build-status.md if a session drops.
> Reference: https://code.claude.com/docs/en/agent-teams

```bash
# Step 1 — Enable agent teams (REQUIRED — disabled by default, nothing works without this)
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
# Split-pane mode (optional): add "teammateMode": "tmux" to settings.json

# Step 2 — Paste this prompt to the Architect:
Read LOTR.md, then follow the FILE ROUTING table above.
You are the Project Architect. This is a MANDATORY Agent Teams project.
Stay in Default permission mode. Do not cycle Shift+Tab.
The confirmation prompt before each edit is your safety gate against accidental edits
to teammate-owned files. Only edit files you own as Architect (primarily build-status.md).
For full spawn sequence and dossiers, read Universal_Agentic_Execution_Core.md
and INTELLIGENCE_INJECTION.md. Do not rely on this file for those details.
DO NOT ATTEMPT SOLO MODE — the architecture requires 5 parallel agents.
````

## SHARED RULES FOR ALL TOOLS

1. Do not implement any feature marked 🔴 DEFERRED in build-spec.md.
2. Do not invent UI elements not present in /mockups.
3. Do not ask the user to re-explain context already in these files.
4. If instructions conflict between files, follow the conflict resolution order above.
5. Current build state lives in build-status.md — read it before starting any task.
6. Token cost: ~5x per active teammate. Agent Teams is mandatory for this project —
   do not attempt cost reduction via solo mode. The architecture requires parallel execution.

```

---

### Step B — Create Five Redirect Files

Create the following files. Each contains ONLY the redirect below — no other content.
Do not copy project logic into these files. They are pointers, not documents.

**`CLAUDE.md`** (Claude Code reads this natively at session start):
```

# 🔴 DO NOT EDIT THIS FILE.

# This file is a redirect. All instructions live in LOTR.md.

# Read LOTR.md first. Then follow its FILE ROUTING table.

# Any content added here will be ignored and overwritten.

→ MASTER CONTROL: /LOTR.md

```

**`.cursorrules`** (Cursor reads this natively; Anti-Gravity also reads this):
```

# 🔴 DO NOT EDIT THIS FILE.

# This file is a redirect. All instructions live in LOTR.md.

# Read LOTR.md first. Then follow its FILE ROUTING table.

# Any content added here will be ignored and overwritten.

→ MASTER CONTROL: /LOTR.md

```

**`GEMINI.md`** (Gemini CLI reads this natively from project root):
```

# 🔴 DO NOT EDIT THIS FILE.

# This file is a redirect. All instructions live in LOTR.md.

# Read LOTR.md first. Then follow its FILE ROUTING table.

# Any content added here will be ignored and overwritten.

→ MASTER CONTROL: /LOTR.md

```

**`.antigravity/rules.md`** (Anti-Gravity reads this as its project-level rules file):
```

# 🔴 DO NOT EDIT THIS FILE.

# This file is a redirect. All instructions live in LOTR.md.

# Read LOTR.md first. Then follow its FILE ROUTING table.

# Any content added here will be ignored and overwritten.

→ MASTER CONTROL: /LOTR.md

```
> Note: Create the `.antigravity/` directory before writing this file: `mkdir -p .antigravity`

---

## 4. VERIFICATION & TREE OUTPUT

- Perform a file-system scan and output a tree diagram.
- Confirm no `[UNDEFINED — USER INPUT REQUIRED]` flags remain from Section 2.
- Confirm that `build-status.md` exists and is initialized.
- Confirm that INTELLIGENCE_INJECTION.md exists and contains at minimum:
  - List of skill repo URLs for agent calibration
  - List of external documentation URLs relevant to the tech stack
  - If not provided by the User, create it with `[UNDEFINED — USER INPUT REQUIRED]` placeholders.
- Confirm `GLOBAL_CONTEXT.md` is named exactly `GLOBAL_CONTEXT.md` — not `GLOBAL_CONTEXT_<project>.md` or any other variant. All routing tables reference this exact filename.
- Confirm `.antigravity/rules.md` exists (Anti-Gravity project rules redirect).

**Companion tools (recommended, not required):**
- **rulesync** (`npx rulesync generate --targets "*"`) — auto-generates and syncs config files for
  all AI tools from a single `.rulesync/rules/*.md` source. Eliminates manual redirect maintenance
  as the tool roster expands. Supports Anti-Gravity, Cursor, Claude Code, Copilot, Cline, and more.
  See: https://github.com/dyoshikawa/rulesync
- **claude-code-router** (`ccr code`) — routes Claude Code requests to different models based on
  task type (background, think, longContext). Use `<CCR-SUBAGENT-MODEL>provider,model</CCR-SUBAGENT-MODEL>`
  in spawn prompts to route Agent Teams teammates to cost-appropriate models (~5x token savings possible).
  See: https://github.com/musistudio/claude-code-router

---

## ⚠️ CRITICAL: AGENT TEAMS ONLY

**This project MUST be built using the Agent Teams approach (5 parallel agents).**
**Single-LLM sequential mode is NOT supported.**

After scaffolding completes:
1. **DO NOT** attempt to build this project in a single session.
2. **DO** proceed to `Universal_Agentic_Execution_Core.md` to spawn the 5-agent team.
3. **REQUIRED**: Set environment variable before spawning: `export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

The 5-agent team approach is mandatory because:
- The booking system is complex and requires parallel BE/DB/FE work.
- Agent Teams enforces isolation and prevents file conflicts.
- Solo mode will cause context window overflows and integration failures.

**NEXT ACTION after bootstrapping is complete**: Read and execute `Universal_Agentic_Execution_Core.md` to begin the 5-agent build loop.
```
