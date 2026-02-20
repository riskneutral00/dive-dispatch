# 🌊 GLOBAL CONTEXT: Dive Dispatch

> 📌 **READ WHEN**: Once per session. Do not re-ingest mid-task.
> **FILENAME**: This file must be saved as `GLOBAL_CONTEXT.md` — all routing tables reference this exact name.

## 1. MISSION & GOLDEN THREAD

- **MISSION**: Operational Invisibility (The Mimosa Lifestyle) — all 11 stakeholders manage their operations without friction or manual admin overhead.
- **GOLDEN THREAD**: Maximize automated Data Vacuum for Risk Neutral monetization.

## PROJECT POINTERS

> **Conflict resolution order: `build-spec.md` > `CORE_LOGIC.md` > project code > global docs.**

- Scope authority (✅ ACTIVE / 🔴 DEFERRED) → `build-spec.md`
- Business rules → `CORE_LOGIC.md`
- Booking system spec → `BOOKING_SPEC.md`
- Stakeholder-to-mockup mapping (after bootstrap) → `/mockups/metadata.json`
- Build loop procedure → `Universal_Agentic_Execution_Core.md`
- Repo bootstrapping → `Universal_Scaffolding_Initializer.md`

---

## 2. TECH STACK

| Layer            | Tool                                                             |
| ---------------- | ---------------------------------------------------------------- |
| Frontend         | Next.js 16 (App Router), Tailwind v4                             |
| Auth             | Clerk (multi-tenant, 10 active V1 roles; DiveSiteOp deferred V1.1) |
| Auth Integration | @convex-dev/auth (official Clerk + Convex bridge)                |
| Database         | Convex (real-time, schema + seed data)                           |
| Deployment       | Vercel (Node.js runtime via Next.js 16 proxy — see Note below)   |
| PWA              | Serwist (DEFERRED V1.1)                                          |
| Archiving        | Amazon Glacier (DEFERRED V1.1)                                   |
| Unit Testing     | Vitest                                                           |
| E2E Testing      | Playwright                                                       |

> **Deployment Note**: Next.js 16 replaces `middleware.ts` with `proxy.ts`. The proxy function runs on Node.js runtime natively — no Edge Runtime workaround required. Route protection uses `convexAuthNextjsMiddleware` from `@convex-dev/auth/nextjs/server`. Clerk does not support `*.vercel.app` domains in production — a custom domain is required before launch.

- **STAKEHOLDER TIERS**: Operator (booking owners) → Resource (accept bookings) → Customer (end user). See §6 for full persona table.
- **BUILD MECHANICS**: Task-list batch rule is active — follow `Universal_Agentic_Execution_Core.md` for the full batching procedure. Each batch = 1–3 tasks; each task declares owned files; no two tasks touch the same files.
- **ROUTING**: Root (/) is a categorized Scaffolding Map. Use stakeholder-specific paths: `/dc`, `/boat`, `/instructor`, etc.

---

## 3. DATA VACUUM & BOOKING ENGINE

**ACTIVE IN V1 (backend automation is real):**
The Parallel Booking Orchestration system is the primary V1 automation:
- Real-time inventory reservation with atomic Hold/Confirm/Release lifecycle
- Cross-operator double-booking prevention (serializable Convex mutations)
- Stakeholder availability calendar (updated in same transaction as hold)
- Customer profile collection via tokenized link (parallel to booking owner's workflow)
- Equipment cascading fulfillment across multiple EquipmentManagers
- Stakeholder accept/decline flow with automatic re-assignment notification
→ Booking owner = any Operator-tier role (DiveCenter, Agent, Liveaboard, DiveResort)
→ Full spec: `BOOKING_SPEC.md`

**DEFERRED (see build-spec.md):**
Data Vacuum audit hooks (compliance status, insurance checks, revenue audit trails, PADI
verification, automated Glacier archiving) are NOT implemented in V1. In V1, these data
fields exist in the UI only.

---

## 4. VISUAL ENGINE: ATMOSPHERIC GLASSMORPHISM

- Full-screen background skin with semi-transparent **Glass Panes** (`backdrop-blur-xl`).
- **oklch border glows** for all interactive elements.
- **8px grid** enforced across all layouts. Normalize all mockup inconsistencies into this grid.
- **Visual references and wallpaper assets** are in `/UIUX_Inspirations/`. `bubbles.jpg` is the canonical background for Atmospheric Glassmorphism.
- **Background independence rule**: See CORE_LOGIC Rule 11. Layer 1 (background skin) and Layer 2 (glass panes) must never be structurally coupled. Swap wallpapers by changing `--bg-skin` only.

### Design Token Reference

All tokens are defined in `app/globals.css` using Tailwind v4 `@theme { }` syntax (Next.js default filename — with 's'). Do **not** use `:root { }` (v3 pattern).

```css
@theme {
  /* Colors (oklch) */
  --color-primary:         oklch(0.53 0.20 253);   /* #1978e5 — interactive blue */
  --color-bg-dark:         oklch(0.12 0.02 248);   /* #111821 — dark mode background */
  --color-bg-light:        oklch(0.97 0.00 248);   /* #f6f7f8 — light mode background */

  /* Glass pane tokens */
  --color-glass-pane:      oklch(1 0 0 / 10%);     /* bg-white/10 — glass surface */
  --color-glass-border:    oklch(1 0 0 / 15%);     /* glass pane border */
  --color-glass-glow:      oklch(0.53 0.20 253 / 40%); /* primary glow for interactive elements */

  /* Spacing (8px grid base) */
  --spacing:               0.5rem;                 /* 8px — base grid unit */

  /* Border radius */
  --radius-sm:             0.25rem;                /* 4px */
  --radius-md:             0.5rem;                 /* 8px */
  --radius-lg:             0.75rem;                /* 12px */
  --radius-full:           9999px;

  /* Background skin (swap here only — see CORE_LOGIC Rule 11) */
  --bg-skin:               url('/assets/wallpapers/bubbles.jpg');
}
```

> These values are derived from the mockup prototypes. Refine before production. All glass pane components must pass WCAG AA legibility against at least 2 backgrounds (dark photo + solid dark). See CORE_LOGIC Rule 11.

> **Typography:** Typography is not pre-assigned. The front-end engineer invokes the `frontend-design` skill before implementation; the skill's aesthetic direction takes precedence over any default font choices. The design token `--font-display` will be set by the skill output.

---

## 5. COMPLIANCE CONSTRAINTS (Full Vision — See build-spec for V1 scope)

- **REGIONAL RULE (Phuket)**: If location == Phuket AND customers > 4, require instructors >= 2. In V1, instructor assignment fields are rendered in the UI only — enforcement logic is deferred.
- **COMPLIANCE**: Verbatim medical questionnaire. "Yes" answer triggers mandatory document upload, archived to Amazon Glacier. In V1, fields are static — upload and archiving are deferred.

---

## 6. THE BUILD TEAM & STAKEHOLDER PERSONAS

> **"16-agent" count explained:** 5 active build teammates + 11 stakeholder persona references. Only 5 agents are spawned. The 11 personas are read as context documents — not spawned as agents.

> If `/mockups/metadata.json` exists, skip this section — use that file for all stakeholder-to-route routing. This section is only needed at bootstrap.

### Stakeholder Consultation Protocol

The V1 Insight Audit protocol is defined and enforced in `Universal_Agentic_Execution_Core.md`. Stakeholder personas and their Voices are the source data — the audit steps live in the Execution Core.

### Build Team

| #   | Agent              | Role                                                 | Voice                |
| --- | ------------------ | ---------------------------------------------------- | -------------------- |
| 1   | Project Architect  | Technical coordinator, enforces build-spec scope     | Authority            |
| 2   | Front-End Engineer | Glassmorphism, mockup recreation, frictionless forms | Aesthetic Precision  |
| 3   | Back-End Engineer  | Clerk auth, proxy.ts, booking mutations (submitToDraft, confirmBooking, TTL job) | Functional Integrity |
| 4   | Database Developer | Convex schema (8 booking entities + auth), seed data, audit logic | Data Security |
| 5   | DevOps Engineer    | Skill ingestion, PWA, Glacier archiving flows        | Scalability          |

### ⚠️ MOCKUP PATH RESOLUTION (Flexible Routing)

The "Mockup" column below lists **Logical IDs**, not literal file paths.

- **Do not** look for `dc-v1.html` at the root of `/mockups`.
- **DO** scan the `/mockups/` directory recursively.
- **Match Rule:** Identify the file by its stakeholder folder (e.g., `/mockups/DiveCenter/`) or by fuzzy-matching the filename (e.g., `divecenter-dashboard.html` matches ID `dc-v1`).
- **Authority:** Once found, write the _actual_ absolute path into `/mockups/metadata.json`. That file becomes the source of truth.

### 📂 MOCKUP TAXONOMY: DASHBOARDS VS. RESOURCES

To prevent "Context Confusion" between individual dashboards and global lists, enforce this distinction:

**1. STAKEHOLDER DASHBOARDS (`/mockups/<StakeholderName>/`)**

- **Context:** Single-User (Auth Required).
- **Filename Pattern:** `[role]-dashboard.html` (e.g., `instructor-dashboard.html`).
- **Purpose:** "My work." Shows _my_ assigned bookings, _my_ schedule, _my_ profile.
- **Route:** `/instructor`, `/boat`, `/dc`.

**2. SHARED RESOURCE LISTS (`/mockups/Shared/ListAll/`)**

- **Context:** Multi-User / Admin / Public View.
- **Filename Pattern:** `[plural_role].html` (e.g., `instructors.html`, `boats.html`).
- **Purpose:** "The Registry." Lists _all_ entities of that type available in the system. Used for assignment, filtering, and availability checks.
- **Route:** `/resources/instructors`, `/resources/boats`.

> **⚠️ CRITICAL:** Do not confuse `instructor-dashboard.html` (Riya's private view) with `instructors.html` in `Shared/ListAll/` (The list of all instructors). They are distinct views with distinct data subscriptions.

### Stakeholder Personas

| #   | Persona                           | Mockup             | Voice                  | Quote                                                               |
| --- | --------------------------------- | ------------------ | ---------------------- | ------------------------------------------------------------------- |
| 6   | DiveCenter (Matt @ Ms. Mermaid's) | dc-v1.html         | Operational Efficiency | "Show me the real-time manifest and hidden revenue logs." *(revenue logs: DEFERRED V1.1)* |
| 7   | Agent (Global Dive Leads)         | agent-v1.html      | Operational Efficiency | "I need clean attribution and instant visibility into commissions." |
| 8   | Liveaboard (MV Deep Sea)          | liveaboard-v1.html | Resource Management    | "Don't make me fight the system—let me assign cabins/beds fast."    |
| 9   | DiveResort (Blue Coral)           | resort-v1.html     | Zero-Friction          | "Guests should onboard instantly without chaos."                    |
| —   | *(Dive Hostel)*                   | *no separate route* | *DiveResort subset*   | A Dive Hostel is a DiveResort with dorm-style accommodation. Uses the DiveResort dashboard and route. Not a separate stakeholder role. |
| 10  | Instructor (Riya Lee)             | riya-v1.html       | Safety & Compliance    | "I need the medical triggers to work perfectly."                    |
| —   | *(Divemaster)*                    | *no separate route* | *Instructor subset*   | A PADI Divemaster logs in as Instructor with restrictions applied. Not a separate stakeholder role or dashboard. |
| 11  | BoatManager (Captain Somchai)     | boat-v1.html       | Resource Management    | "Give me a simple dropdown to assign seats."                        |
| 12  | EquipmentManager (Gear Tech)      | gear-v1.html       | Resource Management    | "Show me what's assigned and what needs turnaround."                |
| 13  | PoolManager (Pool Op)             | pool-v1.html       | Resource Management    | "Don't overbook me. I need clean scheduling."                       |
| 14  | CompressorManager (Air Tech)      | air-v1.html        | Safety & Compliance    | "If it's not logged, it didn't happen."                             |
| 15  | DiveSiteManager (Permit Liaison)  | site-v1.html       | Safety & Compliance    | "If the site is restricted, the plan must update." *(DEFERRED V1.1 — placeholder page at `/site`)* |
| 16  | Customer (End User)               | customer-v1.html   | Zero-Friction          | "Let me sign my life away in 2 minutes and get out of my way."      |

> **Mockup discovery**: After bootstrap, `/mockups/metadata.json` is the mapping authority for stakeholder-to-file routing. Do not re-read this persona table for routing decisions once that file exists.

---

## 7. MANUAL OVERRIDE (Mimosa Mode — Full Vision)

- **AUTHORITY**: Each account owner has full override authority within their own bookings. Multi-user sub-admin permissions DEFERRED V1.1. BoatManager retains authority over their own vessel.
- **MECHANISM**: Dropdown/Select UI in V1. Drag-and-drop deferred to V1.3.
- **ALGORITHM**: Greedy Skyline for initial instructor/equipment suggestions. Deferred to V1.1.
- **V1 IMPLEMENTATION**: Seating, cabin, and bed areas render as static visual elements only. No interaction logic or persistence.

---

## 8. BUILD LOG & STATE

Current build state is maintained in `/build-status.md` at the project root.
Updated after every completed batch. Single source of truth for session recovery.
Agent Teams is experimental — session drops are possible. This file is the only
reliable recovery mechanism. Do not maintain a parallel log here.
