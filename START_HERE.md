# START HERE — Human Operator Guide: Dive Dispatch

> **Who this is for:** You or anyone handing this system to an LLM cold.
> **What this covers:** What the files do, what's missing, what order to run things, and the exact prompts to use.

---

## PART 1 — HONEST ASSESSMENT: WILL ANOTHER LLM UNDERSTAND THIS?

**Short answer:** Yes — no remaining gaps. All decisions are applied and canonical files are consistent.

### What Works Well

The file system has a clear hierarchy with a consistent conflict resolution order. Every foundational
file cross-references the others correctly. Agent dossiers are detailed enough that teammates can
work without asking follow-up questions. The booking spec is complete. Business rules are enforced
through multiple files so there's no single point of failure. All 35 HTML mockups exist.

### What is NOT a problem (common misconceptions)

- The `Universal_Scaffolding_Initializer.md` generates a template LOTR.md for a **new app repo**.
  The content differs from the current LOTR.md intentionally — it's a starter template.
- `overview_risk_neutral.md` is intentionally not in the routing table — business context for humans.
- `padi-originals/` contains the PADI Instructor Manual, medical forms, and liability waiver PDFs.
  These are source material for verbatim questionnaire wording in mockups.
- `UIUX_Inspirations/` contains `bubbles.jpg` (canonical wallpaper) and design reference screenshots.
  The LLM is directed to look here by CORE_LOGIC Rule 11.
- You do not need a separate app repo. See Part 3.

---

## PART 2 — WHAT THESE FILES DO (reading order for a human)

| File | What It Is | When to Read |
|---|---|---|
| `overview_risk_neutral.md` | Business context — parent company vision | Once, for yourself |
| `LOTR.md` | Master control — routes all AI tools to the right files | Every new AI session |
| `GLOBAL_CONTEXT.md` | Mission, tech stack, visual system, all 11 stakeholders | Once per session |
| `build-spec.md` | What is built in V1 vs. deferred | Every task — scope authority |
| `CORE_LOGIC.md` | Active business rules (Rules 1–15) | Once per session |
| `BOOKING_SPEC.md` | Full booking system spec — 8 entities, status lifecycle, 18 tests | At bootstrap; pass to DB + BE |
| `INTELLIGENCE_INJECTION.md` | Agent dossiers — one per teammate | At spawn; give each agent their dossier |
| `Universal_Scaffolding_Initializer.md` | How to bootstrap the Next.js app repo | Once, when initializing the project |
| `Universal_Agentic_Execution_Core.md` | Agent team spawn sequence and execution loop | When running the 5-agent build team |
| `build-status.md` | Live build state — updated after every batch | Before every task |

---

## PART 3 — STARTING FROM SCRATCH

### Do I need a separate folder? Can I just use this one?

**Yes — use this folder.** You do not need to copy files anywhere.

This repository is the project root. When you run `Universal_Scaffolding_Initializer.md`, Claude
Code will initialize the Next.js app directly in this directory (running `npx create-next-app .`).
The foundational files you already have will coexist with the generated app code.

You also do **not** need to feed the LLM one prompt at a time. Give it one bootstrap prompt (see
Step 1 below) and it will read all the routing files, self-direct, and initialize everything.
The files are designed to be self-contained instructions — that is their entire purpose.

---

### Step 1 — What You Need Before Anything

1. **A Clerk account** with API keys (Publishable Key + Secret Key)
2. **A Convex account** (free tier is fine for V1 dev)
3. **A Vercel account** connected to your GitHub
4. **Claude Code** installed and running (`claude` CLI)

---

### Step 2 — Bootstrap the Project

Open Claude Code in this folder. Run this prompt:

```
Read LOTR.md, then follow the FILE ROUTING table.
Run Universal_Scaffolding_Initializer.md now to initialize this folder as the Next.js project root.
This is a bootstrapping pass only — do not spawn agent teammates yet.
Confirm all required files are present, create /mockups/metadata.json from the stakeholder
table in GLOBAL_CONTEXT.md §6 (use actual discovered HTML file paths — do not use the
Logical IDs from the persona table as literal filenames; scan each stakeholder folder for
its HTML file), and initialize build-status.md with today's date and version V1.
```

This pass:
- Runs `npx create-next-app .` in this directory
- Verifies all foundational files are present
- Creates `mockups/metadata.json` with real discovered paths (not assumed filenames)
- Initializes `build-status.md`
- Does NOT start building yet

---

### Step 3 — Provide API Keys

Before spawning any agent that touches auth or infrastructure:

```bash
export CLERK_PUBLISHABLE_KEY=pk_test_...
export CLERK_SECRET_KEY=sk_test_...
export CONVEX_DEPLOYMENT=dev:...
```

The Architect agent will pause and ask for these. Have them ready.

---

### Step 4 — Enable Agent Teams

```bash
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
```

Verify: `echo $CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` → should return `1`.

---

### Step 5 — Launch the Agent Build Team

Open Claude Code in this folder. Run this prompt:

```
Read LOTR.md, then follow the FILE ROUTING table.
You are the Project Architect. Stay in Default permission mode. Do not cycle Shift+Tab.
The confirmation prompt before each edit is your safety gate.
Read build-status.md first to confirm current state.
Read BOOKING_SPEC.md and encode the booking schema task as a prerequisite before auth schema.
Then run Universal_Agentic_Execution_Core.md to begin the build loop.
```

**Team spawn order (Architect enforces this):**
1. `back-end-engineer` — spawns first; produces `clerk-seed-map.json`
2. `database-developer` — natively blocked until clerk-seed-map exists
3. `front-end-engineer` — spawns in parallel with back-end
4. `devops-engineer` — spawns in parallel with back-end
5. `seo-engineer` — blocked until FE completes

---

### Step 6 — Monitor and Recover

```bash
cat build-status.md
cat ~/.claude/teams/dive-dispatch/inboxes/team-lead.json | jq '.'
```

If a session drops:
```
Read build-status.md. Resume from the last incomplete item in the Phase Checklist.
Do not re-read chat history.
```

---

## PART 4 — KEY RULES AN LLM MUST NEVER VIOLATE

If you're briefing a new LLM verbally, these are the non-negotiables:

1. **`build-spec.md` outranks everything.** If it says DEFERRED, nothing gets built for it.
2. **Tailwind v4 only.** No `tailwind.config.js`. All theme config in `globals.css` via `@theme {}`.
3. **`proxy.ts` not `middleware.ts`.** Next.js 16 runs on Node.js — no Edge Runtime pattern.
4. **`convex/auth.config.ts` requires joint sign-off** from back-end + database engineers.
5. **No invented Clerk IDs.** Seed only with real IDs from `config/clerk-seed-map.json`.
6. **No `diveCenterId` anywhere.** Use `ownerId + ownerType: OperatorType` on all booking entities.
7. **Booking mutations are atomic.** `submitToDraft` either completes fully or writes nothing.
8. **Team name is exactly `dive-dispatch`.** The mailbox path depends on this exact string.
9. **Read the local README.md before editing any file in `/mockups/`.** Each folder has persona constraints.
10. **Update `build-status.md` after every batch.** It's the only recovery mechanism if a session drops.
11. **Discover mockups by scanning folders — never assume filenames.** See Part 5.

---

## PART 5 — MOCKUP INVENTORY

### Current Inventory (35 HTML files)

**Stakeholder Dashboards — 10 operator folders + Customer multi-screen flow:**

| Folder | File | Notes |
|---|---|---|
| `DiveCenter/` | `divecenter-dashboard.html` | ✅ |
| `Agent/` | `agent-dashboard.html` | ✅ |
| `Liveaboard/` | `liveaboard-dashboard.html` | ✅ |
| `DiveResort/` | `diveresort-dashboard.html` | ✅ (Dive Hostel is a subset — no separate dashboard) |
| `Instructor/` | `instructor-dashboard.html` | ✅ |
| `BoatOperator/` | `boat-dashboard.html` | ✅ |
| `EquipmentManager/` | `equipment-dashboard.html` | ✅ |
| `PoolOperator/` | `pool-dashboard.html` | ✅ |
| `CompressorOperator/` | `compressor-dashboard.html` | ✅ |
| `DiveSiteOperator/` | `dive-site-dashboard.html` | ⚠️ DEFERRED V1.1 — placeholder only |
| `Customer/` | `customer-portal-contact.html` | Multi-screen flow (6 files) |
| `Customer/` | `customer-portal-medical.html` | |
| `Customer/` | `customer-portal-liability.html` | |
| `Customer/` | `customer-portal-equipment.html` | |
| `Customer/` | `customer-portal-confirmation.html` | |
| `Customer/` | `customer-portal-expired.html` | |

**Shared — Booking (3 files):**

| File | Notes |
|---|---|
| `booking-new.html` | New booking form |
| `booking-detail.html` | Booking detail / draft view |
| `instructor-request.html` | Stakeholder accept/decline — matches §6 |

**Shared — Availability (5 files):**

| File | Notes |
|---|---|
| `boat-availability.html` | ✅ |
| `compressor-availability.html` | ✅ |
| `dive-site-availability.html` | ✅ |
| `instructor-availability.html` | ✅ |
| `pool-availability.html` | ✅ Day-detail view (occupancy for one specific day) |

**Shared — ListAll (6 files):** `boats.html`, `compressors.html`, `dive-sites.html`, `equipment.html`, `instructors.html`, `pools.html`

**Shared — Root (5 files):** `landing.html`, `signin.html`, `signup.html`, `settings.html`, `help.html`

---

### Naming Convention

One HTML file per stakeholder folder for dashboards. Multi-screen flows (like Customer's 6 files) are fine.

**Never hardcode filenames in instruction files:**
```
❌  "Read mockups/DiveCenter/dc-dashboard.html"    ← hardcodes a specific filename
✅  "Read all HTML files in mockups/DiveCenter/"   ← discovers whatever is there
```

After the bootstrap pass, `metadata.json` locks in actual paths — filenames stop mattering entirely.
