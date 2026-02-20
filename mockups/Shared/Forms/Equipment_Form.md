# 📋 Form Spec: Equipment Sizing

> **Source:** `customer-portal-equipment.html`
> **Step:** 4 of 4 in the Customer Portal flow
> **Route:** Customer portal link (unauthenticated)
> **V1 Status:** ✅ ACTIVE — render and persist all fields

---

## BODY MEASUREMENTS

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| Height (value) | `number` | No | ✅ ACTIVE | e.g. 175 |
| Height (unit) | `select` | No | ✅ ACTIVE | cm / in |
| Weight (value) | `number` | No | ✅ ACTIVE | e.g. 70 |
| Weight (unit) | `select` | No | ✅ ACTIVE | kg / lbs |
| Shoe Size (value) | `text` | No | ✅ ACTIVE | e.g. 42 |
| Shoe Size (unit) | `select` | No | ✅ ACTIVE | EU / US / JP / CN |

---

## EQUIPMENT SIZES

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| Wetsuit Size | `select` | No | ✅ ACTIVE | XS / S / M / L / XL / XXL |
| BCD Size | `select` | No | ✅ ACTIVE | XS / S / M / L / XL |
| Fin Size | `select` | No | ✅ ACTIVE | XS / S / M / L / XL |
| Boot Size | `select` | No | ✅ ACTIVE | UK sizes 3–13 |
| Mask Size | `select` | No | ✅ ACTIVE | XS / S / M / L |

---

## POWERED LENSES

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| Needs Corrective Lenses | `radio` (Yes/No) | No | ✅ ACTIVE | |
| Prescription Details | `textarea` | No | ✅ ACTIVE | e.g. "Left: -2.00, Right: -2.50". Only required if Yes. |

---

## EQUIPMENT CUSTOMER IS BRINGING

Multi-checkbox — select all that apply:

| Item | Field Name | V1 Status |
|---|---|---|
| BCD | `bringing_bcd` | ✅ ACTIVE |
| Regulator | `bringing_regulator` | ✅ ACTIVE |
| Wetsuit | `bringing_wetsuit` | ✅ ACTIVE |
| Mask | `bringing_mask` | ✅ ACTIVE |
| Fins | `bringing_fins` | ✅ ACTIVE |
| Dive Computer | `bringing_computer` | ✅ ACTIVE |
| Torch / Light | `bringing_torch` | ✅ ACTIVE |

---

## ADDITIONAL NOTES

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| Equipment Notes or Special Requests | `textarea` | No | ✅ ACTIVE | Special needs, preferences, material allergies |

---

## NAVIGATION

- On submit → advance to Confirmation page
- Back button → return to Liability Form (Step 3)
