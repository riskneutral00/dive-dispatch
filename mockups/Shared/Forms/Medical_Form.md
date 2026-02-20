# 📋 Form Spec: Medical Questionnaire

> **Source:** `customer-portal-medical.html` + PADI 10346 (Diver Medical Participant Questionnaire)
> **Step:** 2 of 4 in the Customer Portal flow
> **Route:** Customer portal link (unauthenticated)
> **V1 Status:** ✅ ACTIVE — render fields, persist answers. **Compliance enforcement DEFERRED to V1.1.**

---

## PADI INTRO TEXT (Verbatim — Do Not Modify)

> "Recreational scuba diving and freediving requires good physical and mental health. There are a few medical conditions which can be hazardous while diving. This questionnaire provides a basis to determine if you should seek out a physician's evaluation. Answer all questions honestly."

> **Note to women:** If you are pregnant, or attempting to become pregnant, do not dive.

---

## YES/NO MEDICAL QUESTIONS (PADI 10346)

All questions are `boolean` type (Yes / No toggle). All are **required** in V1.

A **"Yes" answer triggers a document upload requirement** — deferred to V1.1. In V1, render the question and persist the answer only. Do **not** implement upload UI or Glacier archiving.

| # | Question | Field Name | V1 Status | PADI Note |
|---|---|---|---|---|
| Q1 | I have had problems with my lungs/breathing, heart, blood, or have been diagnosed with COVID-19. | `medical_q1` | ✅ ACTIVE (UI only) | PADI 10346 Q1 |
| Q2 | I am over 45 years of age. | `medical_q2` | ✅ ACTIVE (UI only) | PADI 10346 Q2 |
| Q3 | I struggle to perform moderate exercise (walk 1.6 km/one mile in 14 minutes) or swim 200 m/yards without resting. | `medical_q3` | ✅ ACTIVE (UI only) | PADI 10346 Q3 |
| Q4 | I have had problems with my eyes, ears, or nasal passages/sinuses. | `medical_q4` | ✅ ACTIVE (UI only) | PADI 10346 Q4 |
| Q5 | I have had surgery within the last 12 months, or ongoing problems related to past surgery. | `medical_q5` | ✅ ACTIVE (UI only) | PADI 10346 Q5 |
| Q6 | I have lost consciousness, had migraine headaches, seizures, stroke, or significant head injury. | `medical_q6` | ✅ ACTIVE (UI only) | PADI 10346 Q6 |
| Q7 | I am currently undergoing treatment for psychological problems, panic attacks, or addiction. | `medical_q7` | ✅ ACTIVE (UI only) | PADI 10346 Q7 |
| Q8 | I have had back problems, hernia, ulcers, or diabetes. | `medical_q8` | ✅ ACTIVE (UI only) | PADI 10346 Q8 |
| Q9 | I have had stomach or intestine problems, including recent diarrhea. | `medical_q9` | ✅ ACTIVE (UI only) | PADI 10346 Q9 |
| Q10 | I am taking prescription medications (except birth control or anti-malarial drugs other than mefloquine). | `medical_q10` | ✅ ACTIVE (UI only) | PADI 10346 Q10 |

---

## PARTICIPANT STATEMENT

Display verbatim (no field — acknowledgment text only):
> "I have answered all questions honestly, and understand that I accept responsibility for any consequences resulting from any questions I may have answered inaccurately or for my failure to disclose any existing or past health conditions."

---

## COMPLIANCE ENFORCEMENT (DEFERRED V1.1)

- 🔴 If any answer is "Yes" → trigger document upload prompt — **DEFERRED**
- 🔴 Upload archived to Amazon Glacier — **DEFERRED**
- Tag any placeholder UI as `// [DEFERRED — see build-spec.md]`

---

## NAVIGATION

- On submit → advance to Liability Form (Step 3)
- Back button → return to Contact Form (Step 1)
