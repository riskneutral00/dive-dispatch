# 📋 Form Spec: Liability Release

> **Source:** `customer-portal-liability.html` + PADI 10086 (Release of Liability / Assumption of Risk)
> **Step:** 3 of 4 in the Customer Portal flow
> **Route:** Customer portal link (unauthenticated)
> **V1 Status:** ✅ ACTIVE — render all fields and persist

---

## NON-AGENCY DISCLOSURE AND ACKNOWLEDGMENT AGREEMENT

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| PADI Member / Store / Resort Name | `text` | ✅ Yes | ✅ ACTIVE | Pre-filled from booking context (e.g. "Matt & Ms. Mermaid's Dive Center") |

Display the Non-Agency Disclosure legal text verbatim (read-only scrollable block). Text acknowledges that PADI Members are independent operators, not agents/employees of PADI Americas, Inc. Full text in `customer-portal-liability.html`.

---

## LIABILITY RELEASE AND ASSUMPTION OF RISK AGREEMENT (PADI 10086)

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| Participant Full Name | `text` | ✅ Yes | ✅ ACTIVE | "I, ___________" format |

Display the Liability Release legal text verbatim (read-only scrollable block). Key clauses: assumption of risk for scuba/freediving; 1-year validity from signature date. Full text in `customer-portal-liability.html`.

---

## ACKNOWLEDGMENT

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| Liability Acknowledgment | `checkbox` | ✅ Yes | ✅ ACTIVE | "I have read and fully understand this Release of Liability / Assumption of Risk Agreement. I am of lawful age and legally competent to sign it of my own free act." |

---

## DIVER ACCIDENT INSURANCE

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| Has Diver Accident Insurance | `radio` (Yes/No) | No | ✅ ACTIVE | |
| Policy Number | `text` | No | ✅ ACTIVE | Only shown/relevant if "Yes" selected |

---

## SIGNATURES

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| Participant Signature | `canvas` (signature pad) | ✅ Yes | ✅ ACTIVE | Touch/mouse draw; clear button provided |
| Date | `date` | ✅ Yes | ✅ ACTIVE | |

### Under-18 Guardian Section (conditional)

| Field | Type | Required | V1 Status | Notes |
|---|---|---|---|---|
| Parent / Guardian Name | `text` | Conditional | ✅ ACTIVE | Required if participant is under 18 |
| Parent / Guardian Signature | `canvas` (signature pad) | Conditional | ✅ ACTIVE | Required if participant is under 18 |

---

## NAVIGATION

- On submit → advance to Equipment Form (Step 4)
- Back button → return to Medical Form (Step 2)
