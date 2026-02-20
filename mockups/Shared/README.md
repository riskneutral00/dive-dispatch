# 🧠 CONTEXT: SHARED RESOURCES & GLOBAL FLOWS

## 1. PERSPECTIVE: THE OMNISCIENT SYSTEM
* **User:** Variable. Anyone from an unauthenticated Guest to a Dive Center Admin.
* **Auth State:** Mixed. 
  * `/landing.html`, `/signin.html`, `/signup.html` = Unauthenticated.
  * `/Booking/`, `/ListAll/`, `/Availability/` = Authenticated.
* **Data Scope:** Global and Cross-Functional.

## 2. THE RULE OF RELATIVITY
Unlike the isolated Stakeholder Dashboards, the views in this folder **change their behavior based on who is looking at them.**
* **Example (`booking-detail.html`):** * If the *Dive Center Manager* views it, they see "Edit" and "Reassign" buttons.
  * If the *Instructor* views it, those buttons are hidden (Read-Only).
* **The AI Directive:** When building these shared components, you MUST implement role-based access control (RBAC) UI toggles. Do not hardcode permissions to one specific persona.

## 3. DIRECTORY MAP & LOGIC

### A. `/ListAll/` (The Global Registries)
* **Purpose:** The "Phonebooks" of the system.
* **Logic:** These are lists of all available entities (Boats, Instructors, Pools). They are used by Booking Owners to *find and assign* resources. They rely heavily on Convex queries like `array-contains-any` for filtering.

### B. `/Booking/` (The Core Engine)
* **Purpose:** The creation and management of the actual dive event.
* **Logic:** This is a multi-step, multi-stakeholder entity. A single booking ties together the Customer, Instructor, Boat, and Equipment.

### C. `/Availability/` (The Grid)
* **Purpose:** Calendars and capacity trackers.
* **V1:** Render availability views as static visual elements only. No drag-and-drop logic or interaction handling. Drag-and-drop scheduling is **DEFERRED to V1.3** (see build-spec.md).

## 4. DESIGN ENFORCEMENT
* These pages are the connective tissue of the app. They must strictly adhere to the Atmospheric Glassmorphism visual engine defined in `GLOBAL_CONTEXT.md §4` and `CORE_LOGIC.md Rule 9`.