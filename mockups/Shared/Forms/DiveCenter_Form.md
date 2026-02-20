# 📋 Form Spec: DiveCenter Profile / Registration

> **Source:** DiveCenter stakeholder onboarding — extracted from `GLOBAL_CONTEXT.md` and `dc-dashboard.html` context
> **Used by:** DiveCenter Admin (Matt @ Ms. Mermaid's) during initial platform setup
> **Route:** `/dc/setup` or Clerk onboarding flow
> **V1 Status:** ✅ ACTIVE — render and persist all fields. Fields link to Clerk org and Convex DiveCenter document.

---

## DIVE CENTER IDENTITY

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| Dive Center Name | `text` | ✅ Yes | ✅ ACTIVE | e.g. "Matt & Ms. Mermaid's Dive Center" |
| Display Name / Short Name | `text` | No | ✅ ACTIVE | Used in booking tokens and emails |
| Logo | `file` (image) | No | 🟡 UI ONLY | Display only; no upload pipeline in V1 |
| Website URL | `url` | No | ✅ ACTIVE | |

---

## LOCATION

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| Country | `select` | ✅ Yes | ✅ ACTIVE | ISO country list |
| City / Region | `text` | ✅ Yes | ✅ ACTIVE | e.g. "Koh Tao, Thailand" |
| Address | `textarea` | No | ✅ ACTIVE | Street address for receipts/compliance |
| Timezone | `select` | ✅ Yes | ✅ ACTIVE | IANA timezone list; affects booking time display |

> **⚠️ PHUKET RULE:** If location == Phuket AND customers > 4, require instructors >= 2. This field seeds the location-based compliance logic. **Enforcement is DEFERRED V1.1** — store location now; enforcement activates on index addition (see CORE_LOGIC Future Rule: Phuket Staffing).

---

## PADI AFFILIATION

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| PADI Member Number | `text` | No | ✅ ACTIVE | Required for liability forms (pre-fills PADI member name on customer forms) |
| PADI Member / Store / Resort Name | `text` | No | ✅ ACTIVE | Exact legal name for PADI 10086 liability form |

---

## CONTACT & BILLING

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| Primary Contact Name | `text` | ✅ Yes | ✅ ACTIVE | Admin's full name |
| Primary Contact Email | `email` | ✅ Yes | ✅ ACTIVE | Linked to Clerk org owner |
| Primary Contact Phone | `tel` | No | ✅ ACTIVE | International format |
| Billing Currency | `select` | ✅ Yes | ✅ ACTIVE | THB, USD, EUR, TWD, PHP, IDR, JPY |

---

## OPERATIONAL SETTINGS

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| Default Booking Language | `select` | No | ✅ ACTIVE | English, Thai, Japanese, Chinese (Simplified/Traditional), Indonesian |
| Max Customers per Booking (default) | `number` | No | ✅ ACTIVE | Used to enforce Phuket rule in V1.1 |
| Enable Agent Commission Tracking | `toggle` | No | 🔴 DEFERRED V1.1 | Do not render in V1. Commission tracking deferred entirely. |

---

## NOTES

- This form populates the Convex `DiveCenter` document on first save.
- The PADI Member name field pre-fills `nad-member` in `Liability_Form.md` for all customer bookings at this dive center.
- See `GLOBAL_CONTEXT.md` §6 and `build-spec.md` for V1 scope boundaries.
