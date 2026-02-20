# 🗺️ BUILD SPECIFICATION: Dive Dispatch
> 📌 **READ WHEN**: Once per session (by Architect). After reading, write the active/deferred scope snapshot to `build-status.md`. Teammates read the snapshot. Re-read only if scope is disputed.

## ⚠️ SCOPE AUTHORITY
> **Conflict resolution order: `build-spec.md` > `CORE_LOGIC.md` > project code > global docs.**

This file is the single source of truth for what is built in each version.
All other files (GLOBAL_CONTEXT, CORE_LOGIC) defer to this table for scope decisions.
Do not implement any feature marked DEFERRED regardless of how it is described elsewhere.

---

## V1 SCOPE DECISION TABLE

| Feature | V1 Status | Implementation Rule |
|---|---|---|
| Mockup recreation (10 active stakeholders) | ✅ V1 ACTIVE | Recreate /mockups as React components. DiveSiteOperator is DEFERRED V1.1 — show placeholder at `/site`. Stakeholder onboarding forms are spec-first (waive Rule 1 — derive from READMEs + BOOKING_SPEC.md entities). |
| Clerk auth (stakeholder login) | ✅ V1 ACTIVE | Implement after User provides API keys. 10 real Clerk test accounts (one per active stakeholder type) + 490 Convex-only seed records. See Seed Data Strategy below. |
| Convex schema + seed data | ✅ V1 ACTIVE | Full schema: 8 booking entities + auth + stakeholder profiles. Seed 50 records per stakeholder type (10 real Clerk + 490 faker). |
| Atmospheric Glassmorphism visual system | ✅ V1 ACTIVE | backdrop-blur-xl, oklch glows, 8px grid |
| Scaffolding Map at root (/) | ✅ V1 ACTIVE | Categorized map linking all stakeholder paths (10 active + DiveSiteOp placeholder) |
| Phuket Staffing UI Controls | 🟡 V1 UI ONLY | Render instructor assignment fields — no enforcement logic |
| Medical questionnaire fields | 🟡 V1 UI ONLY | Static fields matching mockups — no backend processing |
| PADI status display | 🟡 V1 UI ONLY | UI placeholder only if present in mockup |
| Seating chart / cabin layout | 🟡 V1 UI ONLY | Static visual or CSS layout — no interaction or persistence |
| Drag-and-drop seating | 🔴 DEFERRED V1.3 | Do not implement — render as static element |
| Compliance vacuum (non-booking automated hooks) | 🔴 DEFERRED V1.1 | Do not implement — fields exist, no automation. NOTE: Booking reservation automation IS active (see Booking & Reservation System block below). Only the data-vacuum audit hooks (insurance checks, PADI verification, revenue audit trails, Glacier archiving) remain DEFERRED. |
| Amazon Glacier archiving | 🔴 DEFERRED V1.1 | Upload button may exist in UI — no backend connection |
| Greedy Skyline assignment algorithm | 🔴 DEFERRED V1.1 | Do not implement — use dropdown/select UI only |
| Serwist PWA / offline mode | 🔴 DEFERRED V1.1 | Do not implement in V1 |
| DiveSiteOperator dashboard + routes | 🔴 DEFERRED V1.1 | Mockups remain in repo. Show placeholder page at `/site`. Do not build dashboard logic. |
| Payment processing (Stripe / gateway) | 🔴 DEFERRED V1.1 | No payment gateway in V1. `PrePayRequired`/`PostPayAllowed` = manual human process (stakeholder reviews payment outside app, then accepts/declines in app). Use seed data for paid/unpaid states. |
| Auto-reminders (forms, payment, pickup, reviews) | 🔴 DEFERRED V1.1 | No reminder logic or UI in V1. |
| Customer reviews / post-dive debrief | 🔴 DEFERRED V1.1 | No review entity, debrief UI, or flagging in V1. |
| Santa's List (stakeholder reputation tracking) | 🔴 DEFERRED V1.1+ | Requires incident log, reputation scoring, legal review. |
| Pickup / drop-off / transportation logistics | 🔴 DEFERRED V1.1 | Booking owners communicate manually. NOTE: CustomerProfile includes `accommodationName` and `needsPickup` fields (persisted, no automation). |
| Customer account creation (Clerk) | 🔴 DEFERRED V1.1 | Customers use tokenized BookingLink only in V1. No Clerk accounts for customers. |
| Emergency close cascade (Pool + Compressor) | 🔴 DEFERRED V1.1 | Button renders in UI (placeholder). No cascade notifications or auto-release of reservations. |
| Pool authorized users whitelist | 🔴 DEFERRED V1.1 | Any booking owner can book any pool in V1. No whitelist enforcement. |
| Equipment bag tagging / ID lookup | 🔴 DEFERRED V1.1 | Equipment assigned at booking level only. No bag numbering. |
| Agent commission tracking | 🔴 DEFERRED V1.1 | No commission calculation or tracking. DiveCenter_Form toggle removed from V1 UI. |
| Instructor booking ownership | 🔴 DEFERRED V1.1 | Instructors cannot own bookings in V1. OperatorType remains 4 types. |
| Notification delivery (email / SMS / push) | 🔴 DEFERRED V1.1 | All notifications are in-app only (Convex real-time subscriptions). BookingLink copied to clipboard and sent manually by booking owner. |
| Vitest unit tests | ✅ V1 ACTIVE | Unit tests for Convex mutations (submitToDraft, confirmBooking, etc.). |
| Playwright E2E tests | ✅ V1 ACTIVE | End-to-end tests for booking flow, auth, dashboard rendering. |
| SEO: sitemap.xml generation | ✅ V1 ACTIVE | SEO Engineer generates after FE completes. |
| SEO: robots.txt | ✅ V1 ACTIVE | Configure crawler access (GPTBot, PerplexityBot, Googlebot). |
| SEO: JSON-LD schema injection | ✅ V1 ACTIVE | Context-appropriate structured data per stakeholder route. |
| SEO: Core Web Vitals audit | ✅ V1 ACTIVE | Validate before marking UI components complete. |

---

## BOOKING & RESERVATION SYSTEM

| Feature | V1 Status | Implementation Rule |
|---|---|---|
| Parallel Booking Orchestration (booking owner form + customer link) | ✅ V1 ACTIVE | See BOOKING_SPEC.md for full entity model and flow |
| BookingSession per-day window model | ✅ V1 ACTIVE | Atomic reservation unit; one row per day per stakeholder |
| AvailabilitySnapshot real-time view | ✅ V1 ACTIVE | Updated in same mutation as Hold placement; never async |
| CustomerProfile + BookingLink (tokenized, no-auth) | ✅ V1 ACTIVE | UUID link; single-use; expiry enforced |
| Inventory Hold / Reservation lifecycle | ✅ V1 ACTIVE | TTL = 12h default; booking-owner-editable; see BOOKING_SPEC.md |
| Equipment fulfillment | ✅ V1 ACTIVE | Single-manager strict-fail: owner selects one EM; if insufficient → CONFLICT → owner resolves. Full cascade DEFERRED V1.1. |
| Stakeholder acceptance / decline flow | ✅ V1 ACTIVE | Auto default; PrePayRequired / PostPayAllowed; Declined triggers re-assign |
| StakeholderPreference profile settings | ✅ V1 ACTIVE | Acceptance mode, max hours, post-job block, equipment naming |
| Stakeholder calendar (real-time hold visibility) | ✅ V1 ACTIVE | Convex subscription; updates in same tx as hold placement |
| Draft TTL expiration (scheduled cleanup) | ✅ V1 ACTIVE | Convex scheduledFunction; releases expired holds atomically |

---

## PHASE 1 BUILD STEPS

### Phase 0 — Booking & Reservation Infrastructure *(prerequisite — before Step 1)*

- **DB Developer**: Build the booking schema — all 8 entities (Booking, BookingSession, CustomerProfile, BookingLink, InventoryUnit, StakeholderPreference, Reservation, AvailabilitySnapshot). This must exist before the auth schema is built. See BOOKING_SPEC.md §2 for full entity definitions.
- **BE Developer**: Implement the core Convex mutations: `submitToDraft`, `submitHoldForUnit`, `confirmBooking`, `cancelBooking`, `completeBooking` (manual trigger), and the TTL expiration + auto-completion scheduled functions. See BOOKING_SPEC.md §4.
- **Dependency**: Booking schema must exist before auth schema — auth may reference booking entities. Do not start Step 1 until Phase 0 schema is complete.

### Step 1 — Infrastructure & Auth
- **Before building auth, read BOOKING_SPEC.md.** The Convex schema must include all 8 booking entities — not minimal schema.
- Set up Convex schema with seed data for all stakeholder roles (after Phase 0 booking schema is complete).
- Implement Clerk authentication for all 10 active stakeholder paths (DiveSiteOperator deferred to V1.1).
- **PAUSE**: Do not finalize auth integration until User provides Clerk API keys.
- DevOps Engineer ingests skill repos from INTELLIGENCE_INJECTION.md to calibrate the agent workspace.
- **Production note**: Clerk does not support `https://<site-name>.vercel.app` — a custom domain is required before production deployment. Not a V1 dev blocker, but must be resolved before launch.

### Step 2 — Compliance UI (Fields Only)
- Build static medical questionnaire fields matching mockups. No backend processing.
- Render Phuket instructor assignment fields. No 4:1 enforcement logic.
- Add PADI status placeholder if present in mockup. No verification logic.

### Step 3 — UI/UX Build
- Implement Atmospheric Glassmorphism: backdrop-blur-xl panes, oklch border glows, 8px grid.
- Render seating/cabin/bed areas as static visual elements per mockups. No interaction logic.
- Generate Scaffolding Map at root (/) with all stakeholder paths (10 active + DiveSiteOp placeholder).
- **Tailwind v4 strict**: Do not create `tailwind.config.js`. All theme config lives in `globals.css` using the `@theme { }` directive with CSS custom properties. See CORE_LOGIC Rule 7.
- **Agent Teams cost**: Running the full 5-teammate team costs ~5x tokens per teammate. Reserve for cross-layer builds. Use single session or subagents for isolated tasks.

---

## SEED DATA STRATEGY

V1 uses a three-layer approach to simulate realistic data volume without creating hundreds of Clerk accounts:

| Layer | Count | Purpose |
|---|---|---|
| Real Clerk test accounts | 10 (one per active stakeholder type) | Actual login sessions for interactive testing |
| Convex-only seed records | ~490 (49 per type) | Populate lists, availability, bookings — realistic data volume |
| Convex dashboard "Act as user" | Unlimited | Test mutations/queries as any identity without Clerk login |

**Creating Clerk test accounts (Back-End Engineer — during build, not now):**
- Use `+clerk_test` subaddress emails: e.g., `divecenter+clerk_test@example.com`
- Clerk dev mode: no real email delivery needed; OTP is always `424242`
- Enable **multi-session** in Clerk Dashboard (Settings > Sessions) so developer can sign in as multiple personas simultaneously and switch via `<UserButton />`
- Dev instance cap: 500 users (well above the 10 needed)

**Creating Convex seed records (Database Developer — during build):**
- `convex/seed.ts` uses `@faker-js/faker` (seeded deterministically with `faker.seed(42)`) to generate 490 additional stakeholder records
- Each record has a synthetic `tokenIdentifier` (e.g., `https://<clerk-dev-domain>|fake_instructor_001`) — valid for queries but cannot be logged into
- Mark seed records with `isSeeded: true` for easy identification and cleanup
- Include realistic data: names, locations, equipment inventories, availability schedules, booking history
- Target: 50 records per stakeholder type (DiveCenter, Agent, Liveaboard, DiveResort, Instructor, BoatManager, EquipmentManager, PoolManager, CompressorManager, Customer)
- Note: Mockup folders use `*Operator` naming (e.g., `BoatOperator/`); Convex schema and `BOOKING_SPEC.md` use `*Manager` (e.g., `BoatManager`). The `*Manager` naming is canonical for schema types.

**Quick-switch workflow during development:**
1. Sign in with all 10 real test accounts using Clerk multi-session
2. Use `<UserButton />` component to switch between personas in one click
3. The 490 seed records appear in every list, dropdown, and calendar
