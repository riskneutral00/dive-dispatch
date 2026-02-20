# 📋 BOOKING_SPEC.md — Parallel Booking Orchestration: Canonical Reference

> **Source of truth** for the Dive Dispatch booking and reservation system.
> The Project Architect passes this file to DB and BE teammates at spawn time.
> **Conflict resolution order: `build-spec.md` > `CORE_LOGIC.md` > project code > global docs.**

---

## §1 — Purpose, Core Invariants & Roles

### BookingOwner Definition

A **BookingOwner** is any Operator-tier stakeholder with booking creation and management authority.
The `ownerType` field on every `Booking` record identifies which type:

| OperatorType | Description |
|---|---|
| `DiveCenter` | Primary use case — creates and manages dive bookings |
| `Agent` | Creates bookings — can operate independently (book resources directly) OR refer to a DiveCenter (hybrid model; toggle on booking form selects mode) |
| `Liveaboard` | Creates dive trip bookings |
| `DiveResort` | Creates guest activity bookings |

> ⚠️ Do NOT assume `DiveCenter` is the only possible booking owner anywhere in the codebase.
> All four OperatorTypes have equal booking creation and management authority.
> Instructors may own bookings in a future release (V1.1 extension — do not implement now).

### Admin & Permissions Model

For most stakeholders, the user and the admin are the same person (single-user account).
For larger operations (DiveCenter, Liveaboard), the owner/manager has full authority over
their profile and bookings. **Multi-user per organization (sub-admins with configurable
permission restrictions) is DEFERRED to V1.1.** In V1, each Clerk account = one stakeholder
= full authority over their own data. CORE_LOGIC Rule 3 "Admin" refers to the account owner.

V1.1 will introduce: Clerk Organizations API, invitation flows, and per-permission RBAC
so an owner can delegate limited access to staff members.

### Three Non-Negotiable Invariants

Any implementation that violates these is wrong:

1. **No double-booking of Exclusive units**: No Exclusive-unit inventory (instructor, boat berth, pool lane) may be held by more than one booking for any overlapping session window, across any booking owner (any OperatorType).
2. **Pooled inventory decrements immediately**: Multi-unit inventory (pools, equipment sets) decrements available count on Hold placement and blocks only when count reaches zero.
3. **Atomic snapshot updates**: All AvailabilitySnapshot updates occur in the same Convex mutation as the Reservation write — there is no async consistency window.

### Overlap Definition

Two sessions conflict if:
```
newSession.startTime < existing.endTime AND newSession.endTime > existing.startTime
```
Overlap is evaluated per inventory unit, across all booking owners.

---

## §2 — Entity Definitions

### `Booking`

```
id,
ownerId: string,            -- references the operator record
ownerType: OperatorType,    -- "DiveCenter" | "Agent" | "Liveaboard" | "DiveResort"
                            -- NOT diveCenterId — any OperatorType may own a booking
activityType: string,
status: BookingStatus,
holdTTL: duration,          -- default 12h; booking-owner-editable at booking level
customerProfileId: string | null,   -- null until customer submits profile
createdAt: timestamp,
submittedAt: timestamp | null,
expiresAt: timestamp | null
```

### `BookingSession` *(atomic unit of reservation — one per day per stakeholder type)*

```
id: string,
bookingId: string,
inventoryUnitId: string,
date: string,               -- ISO date
startTime: string,          -- ISO time
endTime: string,            -- ISO time
timezone: string,           -- IANA timezone string
notes: string | null
```

### `CustomerProfile` *(completed via tokenized link — no auth required)*

```
id: string,
bookingId: string,
linkToken: string,          -- UUID; single-use
firstName: string,
lastName: string,
email: string,
phone: string,
emergencyContact: string,
accommodationName: string | null,  -- hotel/resort name where customer is staying
needsPickup: boolean,              -- whether customer needs transport pickup
                                   -- NOTE: shared fields (name, email, accommodation) across customer
                                   -- portal forms should auto-fill when already entered in a prior step
medicalAnswers: object,            -- JSON; verbatim questionnaire responses
waiverSignedAt: timestamp | null,
submittedAt: timestamp | null
```

### `BookingLink`

```
id: string,
bookingId: string,
token: string,              -- UUID
expiresAt: timestamp,
usedAt: timestamp | null    -- null until customer opens the link
```

### `InventoryUnit` *(one row per bookable unit)*

```
id: string,
resourceType: ResourceType,   -- "Instructor" | "Boat" | "EquipmentSet" | "PoolLane" | "Tank" | ...
resourceId: string,           -- references the actual stakeholder record
displayName: string,
capacityModel: "Exclusive" | "Pooled",
totalUnits: number,           -- 1 for Exclusive; N for Pooled
ownerId: string,              -- who owns/manages this unit
ownerType: ResourceOwnerType  -- NOT diveCenterId; see ResourceOwnerType below
```

**ResourceOwnerType** enumeration:
```
"BoatManager" | "EquipmentManager" | "PoolManager" |
"CompressorManager" | "DiveSiteManager" | "DiveCenter"
```
> `DiveCenter` may own in-house resources such as staff equipment.

### `StakeholderPreference` *(stored in stakeholder profile)*

```
stakeholderId: string,
stakeholderType: string,
acceptanceMode: "Auto" | "PrePayRequired" | "PostPayAllowed",
minimumPayPerSession: number | null,  -- only if PrePayRequired
maxHoursPerDay: number | null,
noWorkAfterTime: string | null,       -- ISO time
postJobBlockDuration: duration | null,
useNamedUnits: boolean                -- EquipmentManager only
```

### `Reservation`

```
id: string,
bookingId: string,
inventoryUnitId: string,
unitsRequested: number,   -- 1 for Exclusive; >= 1 for Pooled
status: ReservationStatus,
heldAt: timestamp | null,
confirmedAt: timestamp | null,
releasedAt: timestamp | null,
expiresAt: timestamp | null
```

### `AvailabilitySnapshot` *(materialized view — updated in same mutation as Reservation write)*

```
inventoryUnitId: string,
date: string,             -- ISO date
windowStart: string,      -- ISO time
windowEnd: string,        -- ISO time
totalUnits: number,
reservedUnits: number,
availableUnits: number    -- computed: totalUnits - reservedUnits
```

---

## §3 — Status Enumerations

### BookingStatus

| Status | Description |
|---|---|
| `Building` | Booking owner constructing form; no server reservation yet |
| `AwaitingCustomer` | Link sent; booking record exists; no inventory holds yet |
| `Draft` | Booking owner submitted; Holds placed on all inventory; customer profile may still be pending |
| `DraftIncomplete` | At least one Reservation was Declined; re-assignment required |
| `AwaitingConfirmation` | All holds active + customer profile received |
| `Confirmed` | Booking owner confirmed; Holds promoted to permanent Reservations |
| `Cancelled` | All Holds/Reservations released immediately |
| `Expired` | Draft TTL elapsed; Holds auto-released; booking dead |
| `Completed` | Activity occurred; reservations archived |

### ReservationStatus

| Status | Description |
|---|---|
| `Hold` | Temporary; counts against availability; has TTL |
| `PendingAcceptance` | Hold placed; awaiting stakeholder review (PrePayRequired/PostPayAllowed mode) |
| `Confirmed` | Permanent until Cancelled or Completed |
| `Declined` | Stakeholder declined or cancelled their hold → triggers re-assignment |
| `Released` | Booking cancelled; released by booking owner or system |
| `Expired` | TTL elapsed; auto-released by scheduled job |

---

## §4 — Concurrency Strategy (Convex Mutation Pattern)

Convex mutations are serializable. The `submitToDraft` mutation runs atomically:

```
STEP 1: For each requested BookingSession (unit + window):
  - Read AvailabilitySnapshot
  - If Exclusive and availableUnits < 1 → CONFLICT(unit, window)
  - If Pooled and availableUnits < unitsRequested → CONFLICT(unit, window)

STEP 2: If ANY conflict → throw → entire mutation aborts → zero writes

STEP 3: If no conflicts:
  - Write all Reservation rows (status = Hold or PendingAcceptance)
  - Decrement all AvailabilitySnapshot rows
  - Update Booking.status = Draft
  - Set Booking.expiresAt = now + holdTTL
```

**Race condition behavior:** Two simultaneous `submitToDraft` calls for the same Exclusive unit — Convex serializes them. First writer places the Hold; second writer reads the decremented snapshot and gets a conflict. No manual locking needed.

### `completeBooking` Mutation

Two triggers (both active in V1):

**Manual:** Booking owner clicks "Mark Complete" → `Confirmed` → `Completed`. Simple status patch. No archival logic in V1.

**Automatic:** A scheduled job runs daily. Any `Confirmed` booking whose last `BookingSession.endTime` has passed is auto-set to `Completed`. Booking owner can also manually complete early (before last session ends).

---

## §5 — Equipment Fulfillment (V1: Single-Manager Strict-Fail)

**V1 implementation — simplified (cascade deferred to V1.1):**

```
1. Booking owner selects one EquipmentManager for the order.
2. Check AvailabilitySnapshot: if availableUnits >= unitsRequested → place Hold → done.
3. If availableUnits < unitsRequested → CONFLICT (insufficient supply) → full rollback.
   Booking owner must select a different EM or reduce quantity.
```

No cross-EM fallback, no split-plan holds, no ranked cascade in V1.
Booking fails cleanly if the selected EM cannot fulfill — owner resolves manually.

**V1.1 — Full Cascading Algorithm (DEFERRED):**
```
// [DEFERRED V1.1 — see build-spec.md]
// 1. Try preferred EM for full quantity
// 2. Try other EMs (ranked) for full quantity → notify owner of reassignment
// 3. Split across multiple EMs if no single EM can fill → notify owner of split
// 4. Full rollback if total supply insufficient across all EMs
```

Booking owner is always notified when their selected EM cannot fulfill the order.

---

## §6 — Stakeholder Acceptance / Decline Flow

### Acceptance Modes

- **`Auto` mode**: Hold placed immediately; no stakeholder action required.
- **`PrePayRequired` mode**: Reservation created as `PendingAcceptance`; stakeholder notified. Payment must be confirmed before the dive. The booking owner sets this when payment is mandatory upfront.
  - Accepts → `PendingAcceptance` → `Hold`
  - Declines → `Declined` → re-assignment triggered → booking owner notified
- **`PostPayAllowed` mode**: Same flow as `PrePayRequired` — requires explicit stakeholder acceptance — but payment can be collected after the dive. The booking owner sets this when they allow deferred payment.

### Stakeholder-Initiated Cancellation

Any stakeholder can cancel an active Hold at any time, regardless of TTL remaining.
Cancellation triggers the same path as a Decline.

### When Declined (any path):

1. `AvailabilitySnapshot.availableUnits` increments (unit back to available)
2. `Booking.status` → `DraftIncomplete`
3. Notification dispatched to booking owner: "[Unit X] has declined/cancelled their hold for [session]."
4. Booking owner selects replacement → `submitHoldForUnit(bookingId, sessionId, newInventoryUnitId)` mutation runs

`DraftIncomplete` cannot advance to `Confirmed` until all sessions have `Hold` or `Confirmed` Reservations.

---

## §7 — Draft Hold TTL

- **Default**: 12 hours from `submittedAt`
- **Booking-owner-editable**: `Booking.holdTTL` field — editable at booking level
- **Extending TTL**: patches all child `Reservation.expiresAt` values atomically in one mutation
- **TTL cleanup** (Convex scheduled function — runs every 15 minutes):
  1. Query Reservations with status `Hold` or `PendingAcceptance` where `expiresAt < now()`
  2. Set status → `Expired`
  3. Increment corresponding `AvailabilitySnapshot.availableUnits`
  4. Set `Booking.status` → `Expired`
  5. Must run as a serializable mutation — no async side effects outside the mutation boundary

---

## §8 — Customer Profile Gate

The booking owner can manually Confirm a booking while the customer profile is still pending.

- System surfaces missing fields to stakeholders with active Reservations: e.g., "⚠ Medical form pending"
- Stakeholders may decline via the standard decline flow if they choose not to proceed without the profile
- Dive Dispatch does **not** enforce compliance or block Confirmation automatically
- Responsibility for compliance rests with human stakeholders
- This is intentional — the application facilitates; humans decide

---

## §9 — Cross-Owner Visibility

`AvailabilitySnapshot` exposes only `availableUnits` — not which booking owner holds the reservation.

Any operator sees "unavailable" for a time window, but not "booked by [Owner X]."
This applies equally across all OperatorTypes and is intentional.

---

## §10 — Booking UI States

### Booking Owner Flow (any OperatorType: DiveCenter, Agent, Liveaboard, DiveResort)

**`Building` state:**
- Blank booking form
- Real-time availability panel — subscribes to `AvailabilitySnapshot` via Convex; shows green (available) / yellow (limited) / red (unavailable) per inventory unit as booking owner selects date + time
- No server writes occur in this state

**`AwaitingCustomer` state (triggered by "Send to Customer"):**
- `BookingLink` created and dispatched
- Booking record exists on the server
- No inventory holds placed yet
- Booking owner may continue selecting stakeholders in parallel

**Stakeholder selection:**
- Assignment dropdowns filter by real-time availability (Convex subscription)
- No server writes until "Submit to Draft"

**"Submit to Draft" (→ `Draft` or conflict):**
- Spinner shown while `submitToDraft` mutation fires
- **Success**: "Inventory reserved for 12h. [List of held units with TTL countdown]."
- **Conflict**: "Cannot reserve: [Unit, window]. Suggested alternatives: [list]."
- **DraftIncomplete** (if already in Draft when a decline occurs): flagged unit displayed with "Re-assign required" prompt

**Stakeholder calendar badge:**
- Updates reactively via Convex subscription on `AvailabilitySnapshot`
- Badge appears on every stakeholder's calendar view for blocked windows

### Customer Flow

**Opens BookingLink:**
- Customer profile form rendered (no auth required — link-authenticated via UUID token)
- Shows activity name + date pulled from booking record

**Submits profile:**
- `CustomerProfile` inserted; `Booking.customerProfileId` patched
- If Booking is already in `Draft` → transitions to `AwaitingConfirmation`

**Error states:**
- Token already used: "This link has already been used."
- Token expired: "This link has expired. Contact your booking operator."

---

## §11 — Acceptance Criteria (18 Testable Statements)

These are the V1 acceptance criteria for the Parallel Booking Orchestration system.
Replace any legacy "Dive Center" reference with "booking owner" throughout implementation.

1. Submitting two overlapping `Draft` bookings for the same Exclusive-unit inventory results in the second submission throwing a conflict error and writing zero records to any table.
2. Pooled inventory available count decrements immediately upon Hold placement, not at Confirmation.
3. Pooled inventory blocks (conflict) only when `availableUnits` reaches zero — not before.
4. All `AvailabilitySnapshot` row updates occur within the same Convex mutation as their corresponding `Reservation` row writes — never in a separate async operation.
5. `submitToDraft` with any single conflicting unit/window aborts the entire mutation — no partial holds are placed for the non-conflicting units in the same call.
6. A successful `submitToDraft` writes all `Reservation` rows (status=`Hold`) and sets `Booking.status=Draft` in a single atomic transaction.
7. A `Booking` in `Draft` status has `expiresAt` set to exactly `submittedAt + holdTTL` (default 12h).
8. A `Booking` in `DraftIncomplete` status (at least one unresolved `Declined` Reservation) cannot transition to `Confirmed` or `AwaitingConfirmation` by any code path.
9. When a stakeholder declines a Hold, `AvailabilitySnapshot.availableUnits` for that unit/window increments in the same mutation that writes `Reservation.status=Declined`.
10. When a stakeholder declines a Hold, the booking owner receives a notification and `Booking.status` transitions to `DraftIncomplete` in the same mutation.
11. Equipment cascading: when the preferred EquipmentManager cannot fill the full quantity, the next-ranked EM is attempted for the full quantity before splitting.
12. Equipment cascading: when a split plan is required, the booking owner is notified of the deviation from the preferred EM before any holds are placed.
13. Equipment cascading: if total supply across all EMs is insufficient to fill the order, a conflict is thrown and zero partial holds are placed (full rollback).
14. `BookingLink` tokens are single-use: a second attempt to open or submit the same token returns the error "This link has already been used."
15. An expired `BookingLink` token (current time > `expiresAt`) returns the error "This link has expired. Contact your booking operator."
16. A `CustomerProfile` submitted while the booking is in `Draft` status transitions the booking to `AwaitingConfirmation` in the same mutation that writes the profile.
17. The TTL expiration scheduled function (runs every 15 minutes) sets expired Holds to `Expired`, increments their `AvailabilitySnapshot` counts, and sets `Booking.status=Expired` — all within a single serializable mutation per booking.
18. `AvailabilitySnapshot` queries return only `availableUnits` — no data identifying which booking owner holds a reservation — ensuring full cross-owner privacy regardless of OperatorType.

---

## §12 — Booking UI Mockup Decision (RESOLVED)

**Decision: Path C — Mockup + Spec Hybrid.**

Three booking mockups exist in `/mockups/Shared/Booking/`:
- `booking-new.html` — what the booking creator sees in Draft state
- `booking-detail.html` — what the booking looks like in Pending state, allowing edits and cancellations
- `instructor-request.html` — what the stakeholder sees when waiting to accept or decline

**Rule:** FE builds from the mockups as a general layout guide, but must ensure the result meets all spec requirements in this document (§10 states, §6 acceptance flow, §4 concurrency feedback). The mockup is a starting point, not a hard constraint. If the spec requires UI elements not in the mockup (e.g., TTL countdown, conflict error display, availability panel), the FE adds them.

**CORE_LOGIC Rule 1 is softened for booking UI only:** Mockup authority is maintained as the layout baseline, but spec requirements take precedence where the mockup is incomplete or silent.
