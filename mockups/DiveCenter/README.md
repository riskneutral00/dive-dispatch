# 👤 USER STORY: THE DIVE CENTER MANAGER

## 1. THE BIG PICTURE: WHAT DO I NEED TO DO?

I need to make sure my Customers return from their dives safley, happily, and help me get more future Customers.

**I am DiveCenter: Matt & Ms. Mermaid's Dive Center**
Required before starting Booking, but not required on sign up: Dive Center Contact Form. This'll have all the information about my DiveCenter.

## 2. To run my dive center, I need to achieve three specific tasks:

### 1. **On-board Customers**

- Customer may walk into the dive center storefront and an associate greets them.
- Customer may contact the dive center online through our social media channels.
- Customer may be referred to us by an Agent.

I need to get information from the Customers. In the first two cases, I have to collect this myself, but the Agent has it already:

- Contact Form
- Medical Form
- Liability Form
- Equipment Form
- Payment

The contact, medical, liability, and equipment forms are mandatory before diving, but payment can be deferred until afterwards.

### 2. **Coordinate stakeholders**

Stakeholder= [Instructor, BoatOperator, EquipmentManager, PoolOperator, CompressorOperator, DiveSiteOperator, LiveaboardOperator]

For each Stakeholder, if the Customer needs {Stakeholder}, I need a system that shows all available {Stakeholder} and supports assigning that {Stakeholder} to the Booking.

Additionally, I need to capture and match Customer requirements such:

Instructors filtered by language, disabilities, or specialty training requests (e.g., Nitrox) etc.
BoatOperators filtered by schedule DiveSite, real-time capacity, departure and return times etc.
EquipmentManagers filtered by DPV, powered lenses, or all white equipment etc.
PoolOperator filtered by kid friendly, parent friendly (beers, pickleball), ample tables, shaded etc.
CompressorOperator filtered by gas mixes etc.
DiveSiteOperator — DEFERRED V1.1 (not included in V1 booking flow)
LiveaboardOperator filtered by luxury, pricing, DiveSites, number of days, number of dives etc.

<!-- Version 2
I need to define which Instructors are qualified or permitted to take which types of Customers, including operational constraints such as:
• Some Instructors can take only two or fewer Open Water students at a time.
• Some Instructors cannot take a Customer who weighs 30 kg more than them.
• Some Instructor subtypes (e.g., a Divemaster, who is an Instructor with restrictions — not a separate system role) can only take FunDivers.
• Some specific Instructors can have priority rules by Customer tier. For example, I need to label certain Customers as VIP, and configure an Instructor to prioritize VIP Customers. If a VIP Booking appears, the system should reassign that Instructor to the VIP Booking according to my rules.

I also need to maintain a favorites list of Instructors and create a tiered preference system. For each new Booking, if any Tier 1 Instructors are available and meet the Booking criteria, the system should automatically assign one using my own assignment algorithm. If no Tier 1 Instructor is available, the system should automatically attempt assignment from Tier 2 Instructors. If Tier 2 also has no availability, I need the option to select from all remaining available Instructors who fit the requirements and constraints.

For the assignment algorithm, I need it to be highly flexible and configurable, because I will continuously add rules and expect the algorithm to adjust accordingly. The algorithm must support multiple assignment strategies, including:
• Balanced workload distribution (week-by-week): If I have multiple Instructors (e.g., four), I want Customer/job types to be distributed as evenly as possible across them over a weekly period. Job types include, at minimum:
• Open Water students
• Advanced
• FunDivers
• Tri divers
The system should consider the mix of Bookings in a given week and assign in a way that keeps each Instructor’s weekly distribution as balanced as possible by job type.
• Earnings-based distribution: Different job types pay different amounts to Instructors (e.g., Open Water students and FunDivers do not pay the same). I need an algorithm option that assigns Bookings to control income distribution—so I can intentionally make one Instructor earn more or less than other Instructors over a period, while still respecting qualifications, restrictions, and availability.
• Hard constraints remain enforced: Any Instructor-specific restrictions (e.g., only FunDivers), Customer requirement matching (languages, disabilities, specialty requests like Nitrox), capacity limits (e.g., max two Open Water students), and safety/feasibility constraints (e.g., weight difference limitations) must be enforced regardless of which assignment strategy is chosen.

The system should let me choose or combine these strategies, tune them over time, and extend them with additional rules without needing a rewrite of the underlying assignment logic.
-->

### 3. **Debrief Customers**

- Customer needs to leave reviews
- Customer needs to confirm final payments
- Customer needs to book future dives

---

## 3. Tools to help me run my dive center:

### 1. Updated personal Calendar

I need a dashboard that tells me everything I need to manage for the week.
It needs a calendar that tells me what all my Customers are doing this week.
It needs to tell me of any changes to the Bookings.

### 2. Updated Stakeholder Calendar

I should be able to see all stakeholders' calendars, see when they are/not available.

### 3. Auto assigning Stakeholders

During the booking process, my available preferred stakeholders should be pre-filled. If tier one is unavailable, then tier two. If those are still not available, then I should be able to find one.
If a stakeholder has to cancel, a new stakeholder should be auto-assigned.

### 4. Auto checking Customers

I should be able to auto-remind Customer about:

- forms
- payment
- pickup time
- reviews

### 5. Santa's List

I should be auto-informed on who is a good or bad Stakeholder and why.

- theft
- drugs
- absences

## 4. Cancellation

Only BookingOwner can instigate cancellation. This should auto-update other stakeholders involved.

## 5. Notes for AI

- While the Customer is filling out forms, I simultaneously need to coordinate with other stakeholders to operate the dive.
- The goal is by the time the Customer submits their forms, the rest of Booking is filled with the other Stakeholders, and the Booking can immediately go from draft to pending after submission.
- I do not have time to contact each stakeholder to verify their availability. I need a system that does this autonomously and aynchronously.
- I should be able to tell the Customer with full confidence that their dive is scheduled successfully.
- I need to know if any of the stakeholders cancel, and I need backup stakeholders automatically assigned.
