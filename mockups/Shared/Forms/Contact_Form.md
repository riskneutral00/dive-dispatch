# 📋 Form Spec: Contact Information

> **Source:** `customer-portal-contact.html`
> **Step:** 1 of 4 in the Customer Portal flow
> **Route:** Customer portal link (unauthenticated)
> **V1 Status:** ✅ ACTIVE — render and persist all fields

---

## PERSONAL INFORMATION

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| Full Name | `text` | ✅ Yes | ✅ ACTIVE | First and last name |
| Email | `email` | ✅ Yes | ✅ ACTIVE | |
| Phone | `tel` | ✅ Yes | ✅ ACTIVE | International format: +1 555 000 0000 |

---

## EMERGENCY CONTACT

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| Emergency Contact Name | `text` | ✅ Yes | ✅ ACTIVE | Full name |
| Emergency Contact Phone | `tel` | ✅ Yes | ✅ ACTIVE | International format |
| Relationship to Diver | `text` | No | ✅ ACTIVE | e.g. Spouse, Parent, Friend |

---

## DIVING CERTIFICATION

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| Cert Agency | `select` | No | ✅ ACTIVE | PADI, SSI, NAUI, BSAC, CMAS, None |
| Certification Level | `select` | No | ✅ ACTIVE | Open Water, Advanced Open Water, Rescue Diver, Divemaster, Instructor, None |
| Cert Number | `text` | No | ✅ ACTIVE | Numeric string e.g. 1234567890 |
| Years of Diving Experience | `select` | No | ✅ ACTIVE | Less than 1 year / 1–3 years / 3–5 years / 5–10 years / 10+ years |

---

## HEALTH INFORMATION

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| Known Allergies | `textarea` | No | ✅ ACTIVE | Food, medication, environmental. Accept "None" |
| Medical Conditions | `textarea` | No | ✅ ACTIVE | Any relevant conditions |

---

## NAVIGATION

- On submit → advance to Medical Form (Step 2)
- No back button on Step 1
