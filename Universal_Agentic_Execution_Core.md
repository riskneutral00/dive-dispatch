# Instruction: Initialize Universal Agentic Execution Core (5-Agent Edition — MANDATORY)

> 🔴 **READ WHEN**: ONLY when running the 5-agent build loop. This is the ONLY valid execution mode for this project.
> Solo mode is NOT supported. Agent Teams is MANDATORY.

> **What does "16-agent" mean?**
> The "16" counts 5 active build teammates + 11 stakeholder persona references used during the V1 Insight Audit and build validation. **Only 5 agents are spawned** (back-end-engineer, database-developer, front-end-engineer, devops-engineer, seo-engineer). The 11 stakeholder personas (DiveCenter, Agent, Liveaboard, DiveResort, Instructor, BoatManager, EquipmentManager, PoolManager, CompressorManager, DiveSiteManager, Customer) are read as context documents — they are not spawned as agents. No separate `.agents` file is used. Agent team definitions live in STEP 3 below. Natural language spawn is the active model.

---

## STEP 0 — PRE-LOADED AUDIT (Architect Only)

> This file is read by the **Project Architect (team lead)** only. Teammates receive only their specific context at spawn time — they do not read this file.

- Ingest: `GLOBAL_CONTEXT.md`, `CORE_LOGIC.md`, `build-spec.md`, and `INTELLIGENCE_INJECTION.md`.
- Do NOT ask the User to re-explain the mission, stack, or stakeholders. These are pre-loaded constraints.
- Confirm credentials pause (Step 1) before spawning any teammate that touches auth or cloud services.
- Check `build-status.md` before doing anything — if a previous session dropped, recover state from there.

---

## STEP 1 — CREDENTIAL PAUSE

Before spawning any teammate that touches cloud services, auth providers, or third-party APIs:

- **STOP.**
- Request the User to provide all required API keys and credentials.
- Do not proceed with spawning auth or infrastructure teammates until credentials are confirmed.

---

## STEP 2 — ENABLE & CONFIGURE AGENT TEAMS

> ⚠️ Agent Teams is experimental and **disabled by default**. It will not run without the flag.

```bash
# In shell or settings.json before any spawn:
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
# Split-pane mode (optional): add "teammateMode": "tmux" to settings.json
# Default "auto" uses split panes automatically when already inside a tmux session.
```

**Architect: stay in Default permission mode after launch.**
Do not cycle Shift+Tab. The confirmation prompt before each edit is your safety gate against
accidental edits to teammate-owned files. Only edit files you own as Architect (primarily
`build-status.md`). Exit to resolve a teammate blocker, then step back.
See CORE_LOGIC Rule 9.

**Token cost awareness:** Each teammate is a full Claude Code session (~5x token cost).
Run the full 5-teammate team for cross-layer builds. Use a single session or subagents
for isolated or single-file tasks.

---

## STEP 3 — SPAWN TEAMMATES (Natural Language)

Teammates have **no shared memory**. Each runs in its own context window and knows only
what you pass at spawn time. The only coordination channels after spawn are:

- The **shared task list** (file-backed, dependency-tracked, self-claimed)
- The **mailbox/inbox system**: `~/.claude/teams/{team-name}/inboxes/`

To check the Architect inbox at any time:

```bash
cat ~/.claude/teams/dive-dispatch/inboxes/team-lead.json | jq '.'
```

**Encode the native task dependency before spawning Database Developer:**

```
TaskUpdate({ taskId: "db-seed", addBlockedBy: ["clerk-seed-map"] })
```

**CCR routing (optional):** If using claude-code-router, prepend
`<CCR-SUBAGENT-MODEL>your-provider,your-model</CCR-SUBAGENT-MODEL>` to each spawn prompt below
to route that teammate session to a cost-appropriate model. Use your CCR config.json provider
names. Example: route FE/DevOps to a cheaper model; route BE/DB to a stronger reasoning model.

**Spawn the team using natural language — Claude handles the mechanics:**

> ⚠️ The team MUST be created with the exact name `dive-dispatch`. This name determines the
> mailbox path: `~/.claude/teams/dive-dispatch/inboxes/team-lead.json`. If you use a different
> name, the inbox commands throughout this file will be wrong. After spawning, verify:
> `ls ~/.claude/teams/` to confirm the directory name matches.

```
Create an agent team called "dive-dispatch" with five teammates.

Teammate 1 — back-end-engineer (spawn first):
Owns: proxy.ts, config/clerk-seed-map.json, convex/auth.config.ts (draft only)
Task: Initialize Clerk authentication using proxy.ts on Node.js runtime (Next.js 16 pattern).
Do NOT create middleware.ts — that is a Next.js 14/15 Edge Runtime pattern that fails here.
Use convexAuthNextjsMiddleware from @convex-dev/auth/nextjs/server in proxy.ts.
Create 10 test stakeholder accounts (DiveSiteOperator DEFERRED V1.1; roles defined in GLOBAL_CONTEXT.md section 6). Use +clerk_test subaddress emails.
Export real Clerk IDs to config/clerk-seed-map.json. This unblocks the Database Developer.
Draft convex/auth.config.ts and send it to team-lead inbox for routing — do not commit it alone.
Submit a one-paragraph plan to team-lead before writing any code.
Skill Trigger: Before submitting your draft of auth.config.ts or proxy.ts, run `/skill typescript-lsp check-types` to ensure strict type safety. Then, explicitly spawn a subagent to review the Clerk authentication flow for potential security vulnerabilities before passing the files to the database-developer.
Context to pass: GLOBAL_CONTEXT section 2, CORE_LOGIC.md, Dossier 3 from INTELLIGENCE_INJECTION.md.

Teammate 2 — database-developer (blocked until clerk-seed-map task completes):
Owns: convex/schema.ts, convex/seed.ts, convex/auth.config.ts (review + joint commit)
Task: Build Convex schema and seed.ts using real Clerk IDs from config/clerk-seed-map.json.
Do not begin until that file exists. Review the auth.config.ts draft from back-end-engineer
and send approval or revisions to team-lead inbox before either engineer commits it.
Submit a one-paragraph plan to team-lead before writing any code.
Skill Trigger: Before finalizing the schema or Convex mutation, invoke the local language server plugin using /skill typescript-lsp check-types. Spawn a subagent to verify that the query logic strictly enforces the permissions defined in the specific mockup folder's README.md.
Context to pass: GLOBAL_CONTEXT section 2, CORE_LOGIC.md, Dossier 4 from INTELLIGENCE_INJECTION.md.

Teammate 3 — front-end-engineer (parallel, no dependencies):
Owns: all files under /app and /components
Task: Read all .html mockups in /mockups. Build each stakeholder dashboard as atomic,
reusable React components using Tailwind v4 CSS variables (via @theme { } in globals.css —
NOT tailwind.config.js) and Atmospheric Glassmorphism.
Confirm 8px grid compliance to team-lead before marking any component done.
Skill Trigger (before implementation): Invoke the `frontend-design` skill. Provide the HTML mockup and the Atmospheric Glassmorphism constraints from CORE_LOGIC.md Rule 9 and GLOBAL_CONTEXT.md §4 as context. Get recommendations on component structure, animation approach, and typography before writing any React.
Skill Trigger (before marking complete): Re-invoke the `frontend-design` skill to audit the finished component for WCAG AA compliance against both required test backgrounds (bubbles.jpg + `--color-bg-dark` token). Address all findings before submitting.
Context to pass: GLOBAL_CONTEXT sections 4+6, Dossier 2 from INTELLIGENCE_INJECTION.md.

Teammate 4 — devops-engineer (parallel, no dependencies):
Owns: next.config.js, vercel.json, .env.example
Task: Configure Vercel deployment. Stub environment variables for Clerk, Convex,
and all deferred services (Glacier, Serwist) so V1.1 requires no config rewrite.
Skill Trigger: Before marking your configuration task as complete, spawn a bash subagent to run `npm run build` (or the equivalent dry-run build command) to verify that `next.config.js` and `vercel.json` are structurally sound and do not break the compiler.
Context to pass: GLOBAL_CONTEXT section 2, build-spec.md, Dossier 5 from INTELLIGENCE_INJECTION.md.

Teammate 5 — seo-engineer (blocked until front-end-engineer completes):
Owns: sitemap.xml, robots.txt, and SEO architecture for the application.
Task: Act as the technical SEO gatekeeper for all UI components and routes.
For V1, utilize the `claude-seo` skill suite (e.g., `/seo page`, `/seo schema`, `/seo sitemap`) to audit components, generate JSON-LD structured data, and enforce Core Web Vitals best practices.
Extensibility: You are not limited to a single repository. As the project evolves, you are authorized to install new Claude Code SEO skills, query external MCP servers (like Google Search Console or PageSpeed Insights), and ingest new SEO-focused GitHub repositories to accomplish your goals.
Skill Trigger: Before marking complete, run `/seo validate` on generated components. If no automated validation hook exists yet, manually confirm schema validation passed and document the result in a message to team-lead inbox. Coordinate with the front-end-engineer via the team-lead inbox to resolve any validation failures.
Context to pass: GLOBAL_CONTEXT sections 4+6, Dossier 6 from INTELLIGENCE_INJECTION.md.
```

---

## STEP 4 — EXECUTION LOOP

> **Conflict resolution order: `build-spec.md` > `CORE_LOGIC.md` > project code > global docs.**

- **Task-list batches**: Teammates self-claim tasks. Each task declares owned files before claiming.
  No two tasks may touch the same file simultaneously — treat same-file conflicts as blockers.
- **No shared memory**: If a teammate needs a mid-task decision, they must send a message to the
  team-lead inbox. The Architect checks the inbox and responds. Teammates do not assume the lead
  remembers prior conversation.
- **Logic Enforcement**: Enforce only rules marked ✅ ACTIVE in `build-spec.md`.
  Tag all deferred items as `// [DEFERRED — see build-spec.md]`.
- **auth.config.ts gate**: `convex/auth.config.ts` is a joint artifact at a fixed path.
  Neither back-end-engineer nor database-developer commits it without the other's sign-off
  routed through team-lead. See CORE_LOGIC Rule 10.
  Before either BE or DB marks their task complete, the Architect must confirm both
  `AUTH-CONFIG APPROVED` messages are in the inbox (one from each engineer).
  Run this before marking the BE task complete:
  ```bash
  grep -q "export default" convex/auth.config.ts && echo "READY" || echo "INCOMPLETE — do not unblock DB"
  ```
- **Quality Gate**: `TaskCompleted` hook blocks BE and DB tasks until Architect reviews.
  `TeammateIdle` hook catches stalled teammates. Front-End tasks require 8px grid confirmation.
- **State update**: After every completed batch, update `build-status.md`. Session drops are
  likely — this file is the only reliable recovery mechanism.

---

## STEP 5 — SHUTDOWN & CLEANUP

When all tasks are complete, the Architect:

1. Sends `shutdown_request` to each teammate via the mailbox.
2. Waits for acknowledgment from each.
3. Runs `TeamDelete` to clean up team files.
4. Updates `build-status.md` with final state before closing the session.

Do not close the session without completing shutdown — orphaned team files can cause issues
on session resumption (a known experimental limitation).

---

## STEP 6 — VERIFICATION (Delta Report)

Output a Delta Report confirmed by the Architect covering:

- **Mission Alignment**: Does the build match the mission in `GLOBAL_CONTEXT.md`?
- **Logic Fidelity**: Are all `CORE_LOGIC.md` rules enforced or explicitly deferred?
- **Scope Fidelity**: Does `build-status.md` reflect what was actually built vs. deferred?
- **Tool-Agnosticism**: Are the universal files free of project-specific hardcoding?

---

## 🔴 AGENT TEAMS IS MANDATORY — NO EXCEPTIONS

**There is no solo mode. There is no fallback. Agent Teams is the only valid execution mode.**

If Agent Teams becomes unavailable:
- STOP. Do not attempt to build this project.
- Contact the project maintainer.
- Do not proceed without the 5-agent team.

The booking system's concurrency requirements, multi-layer architecture, and context window constraints make solo execution impossible. Proceeding without agents will result in:
- Token overflow and session timeouts
- Architectural inconsistencies between layers
- Untested race conditions in booking mutations
- Incomplete builds that cannot be recovered
