# 🏗️ BUILD STATUS — Dive Dispatch

> **SINGLE SOURCE OF TRUTH** for build state and session recovery.
> Update this file after every completed batch. Do not maintain a parallel log elsewhere.
> If a session drops, recover state from here — never from chat history.

---

## SCHEMA (required fields — fill at session start and update throughout)

| Field | Value |
|---|---|
| **Session constraints** | Active CORE_LOGIC rules this session (5-line summary — teammates read this, not CORE_LOGIC.md directly) |
| **Scope snapshot** | Active vs. deferred features for this session |
| **Last batch** | Batch name or number |
| **Completed tasks** | Task names (one per line) |
| **In-progress at drop** | Task name + last known state (fill before any break) |
| **Blocked tasks** | Task name + blocking condition |
| **Teammates active** | Names + owned files |
| **Next batch** | Proposed next batch (fill before session end) |

---

## CURRENT STATE

| Field | Value |
|---|---|
| **Date initialized** | 2026-02-19 |
| **Version** | V1 |
| **Status** | Scaffolding not started |
| **Last updated** | 2026-02-19 |
| **Last updated by** | Repo audit (pre-build) |
| **Booking spec** | BOOKING_SPEC.md authored; scope promoted in build-spec.md |
| **Booking mockup decision** | RESOLVED — Path A. Build from existing 3 mockups as layout baseline; spec requirements take precedence where mockups are silent. See BOOKING_SPEC.md §12. FE may proceed. |
| **Equipment cascade** | RESOLVED — V1 uses single-manager strict-fail. Full cascade DEFERRED V1.1. See BOOKING_SPEC.md §5 and CORE_LOGIC Rule 15. |
| **SEO skill** | RESOLVED — claude-seo skill will be installed before SEO engineer spawns. No bash fallback needed. |
| **DiveSiteOperator** | DEFERRED V1.1 — placeholder page at `/site`; mockups remain in repo |
| **Seed data** | 10 real Clerk accounts + 490 Convex-only faker records (50 per stakeholder type) |
| **Testing** | Vitest (unit) + Playwright (E2E) — V1 ACTIVE |
| **Notifications** | In-app only (Convex subscriptions). Email/SMS DEFERRED V1.1. |
| **Payment** | DEFERRED V1.1. Seed data simulates paid/unpaid. `PrePayRequired`/`PostPayAllowed` modes = manual human process. |
| **Admin model** | Single-user per account in V1. Multi-user sub-admins DEFERRED V1.1. |

---

## PHASE CHECKLIST

### V1 — Scaffolding Release
- [ ] Redirect files created (CLAUDE.md, .cursorrules, GEMINI.md, .antigravity/rules.md)
- [ ] Next.js 16 project initialized
- [ ] Clerk auth configured (10 active test stakeholder accounts; DiveSiteOperator deferred)
- [ ] `config/clerk-seed-map.json` created (real Clerk IDs)
- [ ] `proxy.ts` created (Node.js runtime, convexAuthNextjsMiddleware)
- [ ] Convex schema created (8 booking entities + auth + stakeholder profiles)
- [ ] `convex/seed.ts` created (10 real Clerk + 490 faker records)
- [ ] `convex/auth.config.ts` created (joint sign-off, back-end + DB)
- [ ] All 10 active stakeholder dashboards built (React + Atmospheric Glassmorphism)
- [ ] DiveSiteOperator placeholder page at `/site`
- [ ] Vitest unit tests for booking mutations
- [ ] Playwright E2E tests for booking flow
- [ ] Root scaffolding map `/` created
- [ ] Vercel deployment configured
- [ ] `.env.example` stubbed (all services including deferred)
- [ ] `build-spec.md` Traffic Light table verified against actual build

---

## SESSION LOG

| # | Date | Session Type | Completed | Deferred | Notes |
|---|---|---|---|---|---|
| — | — | — | — | — | No sessions started yet |

---

## KNOWN BLOCKERS

- ~~Booking UI mockup decision~~ — **RESOLVED** (Path A — existing 3 mockups as baseline; spec takes precedence).
- User must provide Clerk + Convex API keys before build starts.
- DiveSiteOperator dashboard deferred to V1.1 — only placeholder page in V1.

---

## RECOVERY INSTRUCTIONS

If a session drops mid-build:
1. Read this file to understand what was last completed.
2. Read `build-spec.md` to confirm scope.
3. Read `CORE_LOGIC.md` for active rules.
4. Resume from the last incomplete item in the Phase Checklist above.
5. Do **not** re-read full chat history — it is unreliable after session drops.
