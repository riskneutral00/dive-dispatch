# 🧠 INTELLIGENCE INJECTION: Dive Dispatch — Agent Calibration Dossiers
> 📌 **READ WHEN**: Once, during bootstrap (Step 0 of Execution Core). **Project Architect** passes each dossier to the assigned teammate at spawn time.
> **Conflict resolution order: `build-spec.md` > `CORE_LOGIC.md` > project code > global docs.**

---

> **TO: Project Architect (Team Lead)**
>
> **Before spawning anything:**
> - Confirm `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is set — agent teams are disabled by default.
> - Stay in **Default** permission mode. Do not cycle Shift+Tab. The confirmation prompt before
>   each edit is your safety gate against accidental edits to teammate-owned files. Only edit
>   files you own as Architect (primarily `build-status.md`). Exit to resolve a teammate blocker,
>   then step back.
> - Agent teams is experimental. Session resumption can fail. Update `build-status.md` after
>   every completed batch — it is your only reliable recovery mechanism if a session drops.
>
> **No shared memory between teammates.** Each runs in an isolated context window.
> After spawn, the only coordination channels are the shared task list and the mailbox.
> Check your inbox regularly:
> ```bash
> cat ~/.claude/teams/dive-dispatch/inboxes/team-lead.json | jq '.'
> ```
> Teammates must send mid-task decisions to team-lead inbox — they cannot query your memory.
>
> ⚠️ **Team name is hardcoded:** The team MUST be created with the exact name `dive-dispatch`.
> This name determines the mailbox path: `~/.claude/teams/dive-dispatch/inboxes/team-lead.json`.
> If you use a different name, all inbox commands throughout this file will be wrong.
> After spawning, verify: `ls ~/.claude/teams/` to confirm the directory name matches.
>
> **Plan-before-coding (Back-End + Database Developer):**
> Ask for a one-paragraph plan before either begins writing code. A brief inbox message is enough.
> Catch design problems before code exists.
>
> **Spawn sequence — enforce this order:**
> 0. Read `BOOKING_SPEC.md`. Encode the booking schema task as a prerequisite before the standard DB seed task: `TaskUpdate({ taskId: "db-seed", addBlockedBy: ["booking-schema"] })`. The booking schema (all 8 entities) must exist before auth schema is built.
> 1. Encode native dependency first: `TaskUpdate({ taskId: "db-seed", addBlockedBy: ["clerk-seed-map"] })`
> 2. Spawn back-end-engineer first — produces `config/clerk-seed-map.json` to unblock DB Developer.
> 3. Spawn database-developer after the dependency is encoded — task is natively blocked.
> 4. Front-end-engineer and devops-engineer spawn in parallel immediately.
> 5. **Architect decision required before FE starts booking UI**: Confirm whether booking flow components will be mockup-derived (create HTML in `/mockups/`) or spec-first (derive from `BOOKING_SPEC.md §10`). Document the decision in `build-status.md`. FE must not begin booking UI until this is recorded. See `BOOKING_SPEC.md §12`.
>
> **Joint artifact:** `convex/auth.config.ts` is jointly owned by back-end-engineer and
> database-developer. See CORE_LOGIC Rule 10 for the canonical path and joint commit requirement.
>
> **Visual gate:** Before approving any UI component, ask front-end-engineer to confirm
> 8px grid compliance. Do not mark the task complete without this confirmation.
>
> **Token cost:** ~5x per active teammate. Full 5-teammate team is appropriate for V1 cross-layer
> build. Use single session or subagents for isolated or single-file tasks.
>
> **CCR routing (optional — if using claude-code-router):**
> Add `<CCR-SUBAGENT-MODEL>your-provider,your-model</CCR-SUBAGENT-MODEL>` at the very start
> of each teammate's spawn prompt to route that session to a cost-appropriate model.
> Example: route FE and DevOps to a cheaper model; route BE and DB to a stronger one.
> Model strings must match your `~/.claude-code-router/config.json` provider definitions.

---

> **⚠️ Isolation reminder (all dossiers):** Each teammate runs in a completely isolated context window with no access to the team lead's conversation history or any other teammate's context. Everything each teammate needs is in their specific dossier and the files listed in it. If a teammate needs a mid-task decision, they must send a message to the team-lead inbox — never assume or guess.

---

## DOSSIER 1 — Project Architect
### Topic: Agentic Orchestration & State Handoff
> *"You are the memory of this project. Agents have short memories — you must maintain the Golden Thread."*

| Resource | URL | Phase |
|---|---|---|
| Agent Teams Docs | https://code.claude.com/docs/en/agent-teams | ✅ V1 ACTIVE |
| Agent Teams Framework | https://github.com/wshobson/agents | ✅ V1 ACTIVE |

- **Permission mode**: Stay in **Default** mode. Do not cycle Shift+Tab. The confirmation
  prompt before each edit is your safety gate against accidental edits to teammate-owned files.
  Only edit files you own as Architect (primarily `build-status.md`). Exit to resolve a blocker,
  then step back. See CORE_LOGIC Rule 9.
- **Mailbox**: Your inbox is at `~/.claude/teams/dive-dispatch/inboxes/team-lead.json`.
  Check it after every task cycle. Teammates route decisions and blockers here.
- **Mockups are HTML**: All 11 mockups are `.html` files in `/mockups`. Front-End Engineer reads
  them as structured text. Verify 8px grid on every component before approving.
- **Joint artifact**: `convex/auth.config.ts` requires joint sign-off. See CORE_LOGIC Rule 10.
- **Auth gate**: Create a task `auth-config-sign-off` and set it as a dependency for the final
  integration step. Mark it complete ONLY after receiving explicit approval messages from both
  back-end-engineer AND database-developer in your inbox. Do not mark either engineer's task
  complete until this gate resolves.
- **State**: Update `build-status.md` after every completed batch without exception.

**build-status.md schema (required fields):**
- **Session constraints:** Active CORE_LOGIC rules this session (5-line summary — teammates read this, not CORE_LOGIC.md directly)
- **Scope snapshot:** Active vs. deferred features for this session
- **Last batch:** Batch name or number
- **Completed tasks:** Task names (one per line)
- **In-progress at drop:** Task name + last known state (fill this before any break)
- **Blocked tasks:** Task name + blocking condition
- **Teammates active:** Names + owned files
- **Next batch:** Proposed next batch (fill before session end)

---

## DOSSIER 2 — Front-End Engineer
### Topic: Visual Engine & UI Standards (Strict v4 Mode)

> *"The mockups are HTML — read them, don't guess them. Every pixel must be earned."*

| Resource | URL | Phase |
|---|---|---|
| Next.js 16 (App Router) | https://nextjs.org/docs | ✅ V1 ACTIVE |
| Tailwind CSS v4 | https://tailwindcss.com/docs | ✅ V1 ACTIVE |

**Your owned files:** Everything under `/app` and `/components`. Do not touch files outside
these directories. If you need a decision that requires another teammate's output, message
team-lead via the mailbox.

**Strict Tailwind v4 — see also CORE_LOGIC Rule 7:**
- 🚫 Do NOT create `tailwind.config.js` — v3 pattern, breaks the build.
- 🚫 Do NOT use `@apply` with v3-style utility names.
- ✅ All theme variables in `globals.css` using `@theme { }` directive — NOT `:root { }`.
  Example: `@theme { --color-primary: oklch(0.5 0.2 240); --color-glass: oklch(1 0 0 / 10%); }`
- ✅ Glassmorphism = `backdrop-blur-xl` + `bg-white/10` with strictly defined alpha values.
- ✅ All layouts enforce 8px grid. Normalize any mockup inconsistencies into this grid.

**Mockup protocol:**
- First: run `find . -type d -name "mockups"` to confirm location.
- Read all `.html` files in `/mockups` as the source of truth for structure, content, field names.
- Also read all `.md` files in `/mockups/Shared/Forms/` — these are detailed Form Specs (field names, validation rules, navigation flow, PADI verbatim text) for the Customer Portal forms. Use them alongside the HTML mockups when building form components.
- Do NOT invent UI elements not in the mockup HTML.
- **Before writing any React component:** Invoke the `frontend-design` skill. Provide the HTML
  mockup and the Atmospheric Glassmorphism constraints (CORE_LOGIC Rule 11, GLOBAL_CONTEXT §4).
  The skill's typography and aesthetic recommendations take precedence over any token defaults —
  confirm choices with team-lead before proceeding. Get recommendations on component structure,
  animation approach, and typography before writing any React.
- Build each stakeholder dashboard as atomic, reusable React components.
- After each component, compare against the mockup 8px grid and confirm to team-lead via inbox.
- **Before marking any component complete:** Re-invoke the `frontend-design` skill to audit the
  finished component for WCAG AA compliance against both required test backgrounds (`bubbles.jpg`
  and the `--color-bg-dark` token). Address all findings before marking the task complete.

**Booking UI Flow** — key components to build (see `BOOKING_SPEC.md §10` for full state machine):

> ⚠️ **IMPORTANT**: "Booking owner" = any Operator-tier stakeholder (DiveCenter, Agent, Liveaboard,
> DiveResort). All four share the same booking creation UI. The authenticated user's `ownerType`
> determines which operator record is stored in `Booking.ownerId`. Do not hardcode "DiveCenter"
> or "DC" anywhere in the booking components.

**Before starting any booking UI component:** Confirm with team-lead whether booking UI components
are mockup-derived (read HTML in `/mockups/`) or spec-first (derive from `BOOKING_SPEC.md §10`).
Do not begin implementation until this decision is documented in `build-status.md`.

1. **New Booking Form (booking-owner-facing):**
   - Real-time availability panel: subscribes to `AvailabilitySnapshot` via Convex; shows green/yellow/red per inventory unit as booking owner selects date + time
   - "Send to Customer" button: dispatches BookingLink; status → `AwaitingCustomer`
   - Stakeholder assignment dropdowns: filter by real-time availability
   - "Submit to Draft" button: triggers `submitToDraft` mutation; shows spinner → success/conflict

2. **Draft submission result UI:**
   - Success: list of held units with TTL countdown
   - Conflict: specific unit + window + suggested alternatives
   - DraftIncomplete: flagged unit with "Re-assign required" prompt

3. **Customer Profile Form (customer-facing, no auth):**
   - Accessed via BookingLink token (UUID, single-use)
   - Medical questionnaire fields (verbatim — see mockups if mockup-derived path chosen)
   - Waiver signature field
   - On submit: profile attached; booking advances to `AwaitingConfirmation` if already in Draft
   - Error states: "This link has already been used." / "This link has expired. Contact your booking operator."

4. **Stakeholder Calendar View (resource holders — Instructor, BoatManager, etc.):**
   - Real-time blocked windows via Convex subscription on `AvailabilitySnapshot`
   - Missing customer data badge: "⚠ Medical form pending"
   - "Not proceeding" decline button → triggers Declined flow (see `BOOKING_SPEC.md §6`)

---

## DOSSIER 3 — Back-End Engineer
### Topic: Authentication Architecture (First Mover — Next.js 16 proxy.ts)

> *"You move first. The Database Developer is natively blocked until you produce clerk-seed-map.json.
> You also co-own convex/auth.config.ts — do not write it alone."*

| Resource | URL | Phase |
|---|---|---|
| Clerk (Multi-Tenant Auth) | https://clerk.com/docs | ✅ V1 ACTIVE |
| @convex-dev/auth | https://labs.convex.dev/auth | ✅ V1 ACTIVE |

**Your owned files:** `proxy.ts`, `config/clerk-seed-map.json`, `convex/bookings.ts`.
Draft contributor to: `convex/auth.config.ts` (do not commit alone — route via team-lead).

> ⚠️ **Do NOT create `middleware.ts`.** Do NOT use `authMiddleware` from `@clerk/nextjs/server`.
> These are Next.js 14/15 patterns. Next.js 16 broke from the Edge Runtime middleware model.
> The correct file is `proxy.ts` using `convexAuthNextjsMiddleware` from `@convex-dev/auth/nextjs/server`.

**Task sequence:**
1. Send a one-paragraph plan to team-lead inbox before writing any code.
2. Create `proxy.ts` in the project root. This is the Next.js 16 route protection file — it runs
   on Node.js runtime natively (no Edge Runtime workarounds needed). Use
   `convexAuthNextjsMiddleware` from `@convex-dev/auth/nextjs/server` to protect all 10 authenticated paths (see list below).
3. Create 10 test stakeholder accounts in Clerk (one per active role — DiveSiteOperator DEFERRED V1.1).
   Use `+clerk_test` subaddress emails (e.g., `divecenter+clerk_test@example.com`). OTP is always `424242` in dev mode.
   Enable multi-session in Clerk Dashboard (Settings > Sessions) for quick persona switching.
4. Export real Clerk IDs to `config/clerk-seed-map.json`. This file unblocks the Database Developer.
5. Send team-lead a mailbox message when `clerk-seed-map.json` is ready.
6. Draft `convex/auth.config.ts` and send it to team-lead inbox for routing to Database Developer.
   Do not commit `convex/auth.config.ts` unilaterally — it requires joint sign-off.
   After the Database Developer has reviewed and the Architect confirms both approvals, send
   a final approval message to team-lead inbox with the exact text:
   `AUTH-CONFIG APPROVED by back-end-engineer`
   Do not commit the file — the Architect manages the gate.

**The 10 Clerk-authenticated stakeholder paths (DiveSiteOperator DEFERRED V1.1):**
`/dc`, `/agent`, `/liveaboard`, `/resort`, `/instructor`, `/boat`, `/gear`, `/pool`, `/air`, `/site`
`/site` — render a placeholder page ("Coming in V1.1") but no dashboard logic.
`/customer` — **NOT Clerk-authenticated.** The customer route serves the tokenized BookingLink form (no Clerk auth). Customers do not have Clerk accounts in V1. See `BOOKING_SPEC.md §8`.

**Production note:** Clerk does not support `*.vercel.app` domains — a custom domain is required
before production deployment. Confirm with team-lead before any production deploy.

**Booking Mutation Layer** — in addition to `proxy.ts` and auth, your V1 responsibilities include these Convex mutations in `convex/bookings.ts`. Read `BOOKING_SPEC.md §4` before writing any of these. Spawn a subagent to review each mutation for race conditions before submitting.

1. **`submitToDraft(bookingId)`** — core atomic hold mutation (see `BOOKING_SPEC.md §4`)
   - Reads `AvailabilitySnapshot` for all requested `BookingSession` rows
   - If any conflict → throw → zero writes
   - If no conflicts → writes all `Reservation` rows (status=`Hold` or `PendingAcceptance`) + decrements all `AvailabilitySnapshot` rows + sets `Booking.status=Draft`

2. **`submitHoldForUnit(bookingId, sessionId, newInventoryUnitId)`** — re-assignment after Declined
   - Same conflict-check pattern as `submitToDraft`, scoped to the single session

3. **`confirmBooking(bookingId)`** — promotes Holds to Confirmed Reservations
   - Validates no `DraftIncomplete` state (gate: all sessions must have `Hold` or `Confirmed`)
   - Patches all `Hold` → `Confirmed`; `Booking.status` → `Confirmed`

4. **`cancelBooking(bookingId)`** — releases all `Hold` and `Confirmed` Reservations
   - Sets all child Reservations to `Released`; increments all `AvailabilitySnapshot` rows

5. **`completeBooking(bookingId)`** — manual completion trigger
   - Validates booking is in `Confirmed` status
   - Patches `Booking.status` → `Completed`; no archival logic in V1

6. **TTL expiration scheduled function** (runs every 15 minutes):
   - Queries Reservations with status `Hold` or `PendingAcceptance` where `expiresAt < now()`
   - Sets status → `Expired`; increments `AvailabilitySnapshot.availableUnits`; sets `Booking.status` → `Expired`
   - Must run as a serializable Convex mutation — no async side effects outside the mutation boundary

7. **Auto-completion scheduled function** (runs daily):
   - Queries `Confirmed` bookings whose last `BookingSession.endTime` < now()
   - Patches `Booking.status` → `Completed`
   - Booking owner can also manually complete early via `completeBooking`

---

## DOSSIER 4 — Database Developer
### Topic: Real-Time Data Layer, Dependency & Shared Auth Config

> *"Do not seed fake IDs. Do not write convex/auth.config.ts alone. Your task is natively
> blocked — wait for the real artifact."*

| Resource | URL | Phase |
|---|---|---|
| Convex (Real-Time DB) | https://docs.convex.dev/home | ✅ V1 ACTIVE |
| @convex-dev/auth | https://labs.convex.dev/auth | ✅ V1 ACTIVE |

**Your owned files:** `convex/schema.ts`, `convex/seed.ts`, `convex/crons.ts`, `convex/booking.test.ts`.
Joint artifact: `convex/auth.config.ts` (review + co-sign only — do not create from scratch).

**Your task is natively blocked** until `config/clerk-seed-map.json` exists.
Do not begin `seed.ts` before that file is present. If it doesn't appear and you've been
unblocked, send a message to team-lead inbox before proceeding.

**Task sequence:**
1. Wait for native unblock (clerk-seed-map task completed by back-end-engineer).
2. Send a one-paragraph plan to team-lead inbox before writing any code.
3. Build `convex/schema.ts` — see schema rules below. The schema is NOT minimal; it includes all 8 booking entities.
4. Build `convex/seed.ts` using real Clerk IDs from `config/clerk-seed-map.json`.
   Do NOT invent placeholder IDs under any circumstances.
5. Review the `convex/auth.config.ts` draft routed by team-lead. Confirm it matches Convex's
   auth expectations. Send approval or revision notes to team-lead inbox.
   Neither you nor back-end-engineer commits this file without the other's sign-off.
   When you approve, send the exact message to team-lead inbox:
   `AUTH-CONFIG APPROVED by database-developer`
   Do not commit the file — the Architect manages the gate.

**Schema requirements (V1 — NOT minimal; booking system is fully active):**

Read `BOOKING_SPEC.md §2` for complete entity definitions before writing any table.

Tables to build:
- `bookings` — NOTE: `ownerId + ownerType: OperatorType`, NOT `diveCenterId`. See `BOOKING_SPEC.md §2`.
- `bookingSessions` — atomic reservation unit; indexed by `inventoryUnitId + date`
- `customerProfiles` — linked to booking; nullable until customer submits
- `bookingLinks` — UUID token; single-use; `usedAt` nullable
- `inventoryUnits` — `ownerId + ownerType: ResourceOwnerType`, NOT `diveCenterId`; `capacityModel` required
- `stakeholderPreferences` — per stakeholder; `acceptanceMode` + optional conditions
- `reservations` — links booking to inventoryUnit; full status lifecycle; indexed by `inventoryUnitId + expiresAt`
- `availabilitySnapshots` — materialized view; indexed by `inventoryUnitId + date + windowStart`

Index requirements (required for V1 — these are operationally active, not UI-only):
- `reservations`: by `inventoryUnitId + status` (for conflict detection in `submitToDraft`)
- `reservations`: by `expiresAt + status` (for TTL cleanup scheduled job)
- `bookingSessions`: by `inventoryUnitId + date` (for overlap detection)
- `availabilitySnapshots`: by `inventoryUnitId + date` (for real-time availability display)

Additional rules (see also CORE_LOGIC Rules 5 and 6):
- Fields marked 🟡 V1 UI ONLY in `build-spec.md` are stored in Convex document shape but carry **no indexes**. V1.1 activation = add index only, no migration required.
- Booking reservation entities carry full indexes — they are not UI-only; they are operationally active.
- Do not add tables or indexes for any feature marked 🔴 DEFERRED.

**Cron job — `convex/crons.ts` (required, do not skip):**
Convex scheduled functions must be registered in a dedicated `convex/crons.ts` file.
Create this file and register the TTL cleanup job at a 15-minute interval:
```ts
import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "ttl-cleanup",
  { minutes: 15 },
  internal.bookings.runTTLCleanup,
);

export default crons;
```
The `runTTLCleanup` internal action must be exported from `convex/bookings.ts` (owned by back-end-engineer).
Send team-lead a mailbox message when `convex/crons.ts` is ready so the BE engineer can verify the handler name matches.

**Vitest — `convex/booking.test.ts` (required — all 18 acceptance criteria):**
Read `BOOKING_SPEC.md §11` for the complete list of 18 testable statements before writing any test.
Create `convex/booking.test.ts` and implement one Vitest test per acceptance criterion.
Focus on the `submitToDraft` mutation: conflict detection, atomic writes, AvailabilitySnapshot updates,
TTL assignment, and DraftIncomplete gating. Do NOT mark your task complete until all 18 tests pass.

**Seed data strategy (see also `build-spec.md` Seed Data Strategy section):**
- `convex/seed.ts` creates 50 records per stakeholder type (500 total)
- 10 records map to real Clerk accounts (from `config/clerk-seed-map.json`)
- 490 records use synthetic `tokenIdentifier` values: `https://<clerk-dev-domain>|fake_<type>_<nnn>`
- Use `@faker-js/faker` with `faker.seed(42)` for deterministic, reproducible output
- Mark all synthetic records with `isSeeded: true` for easy cleanup
- Include realistic data: names, locations, equipment inventories, availability, booking history

---

## DOSSIER 5 — DevOps Engineer
### Topic: Vercel Deployment & Placeholder Architecture

> *"You are the guardian of V1.1. Prepare the ground, but do not pour the concrete."*

| Resource | URL | Phase |
|---|---|---|
| Serwist (Advanced PWA) | https://serwist.js.org/ | 🔴 DEFERRED V1.1 |
| Amazon Glacier API | https://docs.aws.amazon.com/amazonglacier/ | 🔴 DEFERRED V1.1 |

**Your owned files:** `next.config.js`, `vercel.json`, `.env.example`.

**Task:**
- Configure Vercel-native deployment. All config must be Vercel-native — no generic Node.js patterns.
- Structure `next.config.js` to allow future Serwist service worker plugins without a full rewrite.
- Stub environment variables for all services in `.env.example` — including deferred ones
  (Glacier, Serwist) — so V1.1 requires no config rewrite.
- Add a Tailwind v4 guard to `package.json`: in the `build` or `lint` script, add a check:
  `node -e "if(require('fs').existsSync('tailwind.config.js')){console.error('ERROR: tailwind.config.js detected — v3 pattern. Delete it.'); process.exit(1)}"`.
  This causes CI and local builds to fail immediately if any agent creates the forbidden file
  (see CORE_LOGIC Rule 7).

**Deferred — do not implement:**
- 🔴 Serwist service workers: DEFERRED V1.1. Do not implement. Do not block it either.
- 🔴 Amazon Glacier archiving: DEFERRED V1.1. Upload UI buttons may exist — no backend connection.

> ⚠️ If any teammate asks you to implement Serwist or Glacier in V1, cite `build-spec.md` and
> send a message to team-lead inbox. The Traffic Light table is the authority.

---

## DOSSIER 6 — SEO Engineer
### Topic: Search Engine & Generative Engine Optimization (GEO)

> *"You are the gatekeeper for discoverability. Your toolchain is dynamic — use whatever approved skills, repos, or MCP servers are necessary to ensure no page goes live without proper schema, valid Core Web Vitals targets, and AI search readiness."*

| Resource | URL | Phase |
|---|---|---|
| Claude SEO Tool (Baseline) | https://github.com/AgriciDaniel/claude-seo | ✅ V1 ACTIVE |
| Schema.org | https://schema.org | ✅ V1 ACTIVE |
| Future SEO Tools & MCPs | [To be injected as needed] | 🟡 V1.1+ |

**Your owned responsibilities:**
- `sitemap.xml` and `robots.txt` generation and maintenance.
- SEO-specific injections (`<head>` tags, JSON-LD scripts) within the `/app` directory.
- Maintaining and expanding your SEO toolchain (skills, repos, APIs).

**Your task is natively blocked** until front-end-engineer completes UI components.

**Task sequence:**
1. Wait for native unblock (front-end UI components completed by front-end-engineer).
2. Send a one-paragraph plan to team-lead inbox detailing your schema strategy and which tools you will use to validate the build.
3. Using your current toolchain (starting with `/seo page` and `/seo content`), audit the generated UI components for minimum word counts, readability, and E-E-A-T standards.
4. Generate context-appropriate JSON-LD for the 11 stakeholders and inject it directly into the React components.
5. Create a `robots.txt` file configuring crawler access (ensure GPTBot, PerplexityBot, and Googlebot are allowed).
6. Build a valid XML sitemap mapping the stakeholder routes from `/mockups/metadata.json`.
7. Before marking complete, run `/seo validate` on generated components. If no automated validation hook exists yet, manually confirm schema validation passed and document the result in a message to team-lead inbox. You cannot mark your task complete if schema validation fails.
8. If you require a new tool, skill, or GitHub repository to solve a complex SEO challenge, message the team-lead inbox requesting authorization to install/ingest it.

---

## INJECTION COMPLETE — Handoff Checklist

**Project Architect confirms all items before routing to `Universal_Agentic_Execution_Core.md`:**

- [ ] `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1` is set in environment or settings.json
- [ ] Architect is in Default permission mode (not cycled to Plan mode or Auto-accept edits)
- [ ] `build-status.md` initialized in project root
- [ ] `BOOKING_SPEC.md` read and booking schema task encoded as prerequisite before auth schema
- [ ] Booking UI approach decided (mockup-derived or spec-first) and documented in `build-status.md` before FE starts
- [ ] Native task dependency encoded: `TaskUpdate({ taskId: "db-seed", addBlockedBy: ["clerk-seed-map"] })`
- [ ] Back-End Engineer spawned first — plan-before-coding requirement understood
- [ ] Back-End Engineer confirmed: `proxy.ts` NOT `middleware.ts` — see Dossier 3 warning
- [ ] Database Developer spawn is natively blocked — will not start seed until clerk-seed-map exists
- [ ] Database Developer plan-before-coding requirement understood
- [ ] Front-End Engineer understands Tailwind v4 `@theme { }` constraint and HTML mockup protocol
- [ ] `convex/auth.config.ts` flagged as joint artifact at fixed path — neither commits alone
- [ ] `auth-config-sign-off` gate task created — blocks final integration step
- [ ] Team created with exact name `dive-dispatch` — verified via `ls ~/.claude/teams/`
- [ ] DevOps Engineer understands Vercel is the only deployment target
- [ ] User has provided Clerk API keys before Back-End Engineer begins
- [ ] Architect inbox path confirmed: `~/.claude/teams/dive-dispatch/inboxes/team-lead.json`
- [ ] No deferred items have been actioned

**⚠️ Agent Teams is MANDATORY.** There is no solo session fallback. If Agent Teams becomes
unavailable, STOP and contact the project maintainer. Do not attempt to build this project
in a single session. See `Universal_Agentic_Execution_Core.md` for the full rationale.
