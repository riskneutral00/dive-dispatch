# ⚖️ CORE LOGIC: Dive Dispatch
> 📌 **READ WHEN**: Once per session. After first read, write a 5-line constraint summary to `build-status.md` under "Session constraints." Teammates read the summary, not this file directly. Re-read only if a teammate reports a rule conflict.

## SCOPE AUTHORITY
> **Conflict resolution order: `build-spec.md` > `CORE_LOGIC.md` > project code > global docs.**

This file contains only business rules that are **active in the current version**.
For deferred rules, see `build-spec.md`. Do not implement any logic not confirmed as ✅ ACTIVE in build-spec.md.

---

## ACTIVE RULES (V1)

### Rule 1 — Mockup Authority
Every feature, button, and data field must be derived from `/mockups`.
Do not invent UI elements or interactions not present in the mockups.

**Exceptions (formally waived):**
- Booking UI components: Mockups are a layout baseline; `BOOKING_SPEC.md` requirements take precedence where mockups are incomplete. See `BOOKING_SPEC.md §12`.
- Stakeholder onboarding forms: No HTML mockups exist for resource-tier onboarding. Derive fields from each stakeholder's README and `BOOKING_SPEC.md` entity definitions (spec-first).

### Rule 2 — Unknown Logic Protocol
If you identify a missing logic requirement (e.g., "What happens when I click this?"):
- **Do NOT assume the answer.**
- **STOP** and send a message to team-lead inbox.
- Document the confirmed answer in this file before proceeding.

### Rule 3 — Manual Override Authority
Any Booking Owner (DiveCenter, Agent, Liveaboard, or DiveResort) has full authority to
manually assign any resource within their own booking via Dropdown/Select UI.
In V1, each account owner has full authority over their own data (single-user model).
Multi-user sub-admin permissions are DEFERRED V1.1 (see BOOKING_SPEC.md §1).
BoatManager retains authority over their own vessel's seating assignments.
No AI suggestion may override a manual selection.

### Rule 4 — LOTR.md Line Limit
`LOTR.md` must never exceed 100 lines. It is a routing document only — not a rules document.
If any edit would push it past 100 lines, move the new content to the appropriate file
in its FILE ROUTING table instead. Detailed rules belong in `CORE_LOGIC.md`, agent behavior
in `INTELLIGENCE_INJECTION.md`, and team mechanics in `Universal_Agentic_Execution_Core.md`.

### Rule 5 — Atomic Commits
Each completed task gets its own atomic git commit before the task is marked complete.
Do not accumulate multiple tasks into a single commit. Commit message format:
`[teammate-role] task-name: brief description of what was built`

### Rule 6 — Scope Discipline
If a feature is marked 🔴 DEFERRED in build-spec.md:
- Render a static UI placeholder if the mockup shows it.
- Do not wire up any logic, backend connection, or state management for it.
- Tag it in code comments as `// [DEFERRED — see build-spec.md]`.

### Rule 7 — Tailwind v4 Strict Mode
Applies in all contexts — any agent, any file, any session.

- 🚫 Do NOT create `tailwind.config.js` — v3 pattern, breaks the build.
- 🚫 Do NOT use `@apply` with v3-style utility names.
- ✅ All theme variables in `globals.css` as CSS custom properties: `--color-primary: oklch(...)`.
- ✅ Glassmorphism = `backdrop-blur-xl` + `bg-white/10` with strictly defined alpha values.

If a v3 pattern appears in existing code, flag it to team-lead before proceeding.

/* ✅ CORRECT — Tailwind v4 */
@theme {
  --color-primary: oklch(0.5 0.2 240);
  --color-glass: oklch(1 0 0 / 10%);
}

/* 🚫 WRONG — v3 pattern */
:root {
  --color-primary: ...;
}

### Rule 8 — UI-Only Field Persistence
Fields marked 🟡 V1 UI ONLY in `build-spec.md`:
- Are **stored in Convex document shape** — persisted, not front-end state only.
- Carry **no indexes** in V1.
- V1.1 activation = add index only. No data migration required.

This decision eliminates migration cost when V1.1 features activate.

### Rule 9 — Architect Commit Authority
The Project Architect may commit files directly when needed (integration, conflict resolution).
**Preference**: Architect avoids editing files owned by an active teammate task.
Only commit to a teammate's file to resolve a blocker — notify the teammate via mailbox afterward.

### Rule 10 — Canonical Auth Artifact Path
The joint Back-End + Database Developer artifact required by `@convex-dev/auth` lives at:
```
convex/auth.config.ts
```
This path is fixed. Neither engineer commits this file without the other's sign-off
routed through team-lead inbox. Do not place `auth.config.ts` at any other path.

---

### Rule 11 — Background Layer Independence

The visual system has two independent layers that must **never** be structurally coupled:

- **Layer 1 (Background Skin):** Full-screen background image applied to `<body>` or `<div id="bg-skin">`. Controlled via CSS custom property `--bg-skin: url('/assets/wallpapers/bubbles.jpg')`. Swapping the wallpaper = changing this one variable. Nothing else changes.
- **Layer 2 (Glass Panes):** All UI components. Use `backdrop-blur-xl` and semi-transparent backgrounds to reveal Layer 1. Styling is entirely independent of Layer 1 content.

```css
/* ✅ CORRECT — wallpaper swap = one variable */
@theme {
  --bg-skin: url('/assets/wallpapers/bubbles.jpg');
}

body {
  background-image: var(--bg-skin);
  background-size: cover;
  background-attachment: fixed;
}
```

**Constraints:**
- All components must be tested against at least 2 different backgrounds (dark photo vs. solid dark color).
- No component color may assume a specific background. All text must meet WCAG AA against the most transparent glass configuration.
- Any future wallpaper swap must pass the legibility test before deploying.

**The two required test backgrounds are:**
1. `bubbles.jpg` (dark photo) — the canonical wallpaper in `/UIUX_Inspirations/`.
2. `oklch(0.12 0.02 248)` solid dark color — mapped to the `--color-bg-dark` design token. No additional wallpaper file is needed; test by temporarily setting `--bg-skin` to this solid color value.

See GLOBAL_CONTEXT.md §4 for the full visual reference.

### Rule 12 — Stakeholder Subset Model

Two stakeholder types are subsets of existing roles — not separate roles. Do not create a separate
route, dashboard, Convex table, or Clerk account type for either:

- **Divemaster** is a subset of **Instructor**. A PADI Divemaster logs in at `/instructor` and
  holds the same dashboard. Restrictions (e.g., FunDivers only, no Open Water students) are
  implemented as `StakeholderPreference` constraints on their Instructor profile, not as a
  separate role. "Divemaster" remains a valid PADI certification label in dropdowns and filters.

- **Dive Hostel** is a subset of **DiveResort**. A hostel-style operator logs in at `/resort`
  and holds the same dashboard. The distinction (dorm beds vs. private rooms) is a resource
  configuration within the DiveResort profile, not a separate stakeholder type.

### Rule 13 — Parallel Booking Orchestration (Core Invariants)

The booking system has three absolute invariants. Any implementation that violates them is wrong:

1. No Exclusive-unit inventory (instructor, boat berth, pool lane) may be held by more than one booking for any overlapping session window, across any booking owner (any OperatorType).
2. Pooled inventory (equipment sets, tanks) decrements available count immediately on Hold placement and blocks only when count reaches zero.
3. All AvailabilitySnapshot updates occur in the same Convex mutation as the Reservation write — there is no async consistency window.

For full entity model, status lifecycle, and concurrency pattern, see `BOOKING_SPEC.md`.

### Rule 14 — Inventory Hold Lifecycle

- `Hold` (Draft): Temporary. Has TTL (default 12h, booking-owner-editable). Counts against availability.
- `Confirmed`: Permanent until Cancelled or Completed.
- `Declined`: Stakeholder cancelled their Hold. AvailabilitySnapshot increments. Re-assignment required.
- `Expired`: TTL elapsed. Cleaned by scheduled job. AvailabilitySnapshot increments.
- `DraftIncomplete` bookings (≥1 Declined reservation unresolved) cannot be promoted to Confirmed.

### Rule 15 — Equipment Fulfillment (V1: Single-Manager Strict-Fail)

V1 uses single-manager strict-fail. Booking owner selects one EquipmentManager.
If that EM cannot fill the full quantity → CONFLICT → full rollback → owner selects a different EM.
No cross-EM cascade, no split-plan holds in V1. Full cascading algorithm is DEFERRED V1.1.
See `BOOKING_SPEC.md §5` for the V1.1 cascade spec.

### Rule 16 — Stakeholder Acceptance & Decline

- `Auto` mode: Hold placed immediately, no action required.
- `PrePayRequired` mode: `PendingAcceptance` status until stakeholder reviews; payment must be confirmed before dive.
- `PostPayAllowed` mode: Same flow as `PrePayRequired`; payment can be collected after dive. Booking owner chooses the mode.
- Any stakeholder can cancel a Hold at any time, regardless of TTL remaining.
- Decline (any path) always triggers: AvailabilitySnapshot increment + owner notification + re-assignment path.

### Rule 17 — Draft Incompleteness Gate

A booking in `DraftIncomplete` status (≥1 session has no active Hold or Confirmed Reservation)
cannot be promoted to `Confirmed` or `AwaitingConfirmation` by any code path.
The Architect must not mark a booking-related task complete if the booking remains in `DraftIncomplete`.

### Rule 18 — Customer Profile Transparency (Not Enforcement)

Dive Dispatch surfaces missing customer data to stakeholders with active Reservations on the booking.
It does not block Confirmation or automatically enforce compliance.
Stakeholders hold the compliance authority and may decline via the standard decline flow.
This is intentional — the application facilitates; humans decide.

---

## FUTURE RULES (Documented for V1.1+ — Do Not Implement Now)

| Rule | Trigger | Action | Version |
|---|---|---|---|
| Phuket Staffing | location == Phuket AND customers > 4 | Require instructors >= 2, block booking | V1.1 |
| Medical Compliance | Questionnaire answer == "Yes" | Trigger doc upload, archive to Glacier | V1.1 |
| Greedy Skyline | New booking created | Suggest optimal instructor/equipment assignment | V1.1 |
| Offline Sync | Network lost | Queue actions via Serwist service worker | V1.1 |
| Drag-and-Drop | Admin accesses seating view | Enable spatial drag-and-drop assignment | V1.3 |
