# 🗂️ MOCKUPS DIRECTORY INDEX

> **⚠️ CRITICAL AI DIRECTIVE:** > Do NOT assume any user persona or apply specific business logic based on this root folder. You are currently in the root directory. 

## FOLDER STRUCTURE & ROUTING

**1. `/Stakeholders/` (or individual role folders like `/Instructor/`)**
* **Purpose:** Role-specific, private dashboards.
* **Action:** Before editing any file in these folders, you MUST read the local `README.md` inside that folder to adopt the correct User Story and permissions.

**2. `/Shared/`**
* **Purpose:** Global registries, cross-role workflows (Bookings), and authentication pages.
* **Action:** See `/Shared/README.md` for rules on handling dynamic, multi-role permissions.

## HOW TO USE THESE FILES
These HTML files are **Visual Requirements**, not production code.
When instructed to build a feature, use these mockups to understand the DOM structure, widget layout, and styling intent, then translate that into the production React/Next.js stack as dictated by `LOTR.md`.

## ⚠️ TAILWIND v3 → v4 TRANSLATION NOTE
All HTML mockups in this directory use the **Tailwind v3 CDN** (`https://cdn.tailwindcss.com`) and an inline `tailwind.config` block for prototyping convenience. **Do not copy these patterns into production code.**

When building React components from these mockups:
- ✅ Translate colors, spacing, and theme values into `@theme { }` in `app/globals.css` (Tailwind v4 pattern)
- ✅ Convert hex color values to `oklch()` — see design tokens in `GLOBAL_CONTEXT.md` §4
- 🚫 Do **not** copy the inline `tailwind.config = { ... }` block — this is a v3 CDN-only pattern that breaks the build
- 🚫 Do **not** create `tailwind.config.js` — v3 pattern, forbidden by CORE_LOGIC Rule 7
- 🚫 Do **not** use `@apply` with v3-style utility names

See CORE_LOGIC Rule 7 for the full Tailwind v4 strict mode specification.