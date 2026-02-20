# 👤 USER STORY: THE EQUIPMENT MANAGER

## 1. THE BIG PICTURE: WHAT DO I NEED TO DO?

I need to make sure every diver has the correct, well-maintained gear packed and ready before the boat leaves the dock.

**I am Equipment Manager: Gundam**
Required before I can be assigned to any Booking, but not required on sign up: Equipment Inventory Form. This will include my available BCD , wetsuit , and regulator sizing and counts.

## 2. To be an Equipment Manager, I need to achieve three specific tasks:

### 1. **Process Gear Requests**

I need to know:

- Exactly what sizes my assigned customers need
- If they require any specialty equipment (powered lenses, dive computers)
- Location and time of where to deliver the gear

### 2. **Manage My Inventory**

- I need to track what is currently rented out versus what is in the shop
- I need to set limits so Bookings cannot request gear I don't have
- I need to flag items that are out for repair

### 3. **Log Missing or Broken Gear**

<!-- v2
I need to:

- Quickly mark if a piece of equipment was returned damaged
- Flag a customer's profile if they lost a piece of rental gear -->

## 3. Tools to help me be an Equipment Manager

### 1. Daily Pack List Dashboard

I need a dashboard that tells me exactly what gear to pull for the next day.
It needs to group the gear by Boat or Instructor so I can pack efficiently.
It needs to alert me if a customer changes their sizing last minute.

### 2. Live Inventory Tracker

I should be able to see my total capacity at a glance.
I really dislike when customers are promised sizes we don't have available.

### 3. Auto assigning Gear

During the Booking process, if a customer enters their sizes, my inventory should automatically reserve those items.
If my inventory is full, the system should automatically look for a tier-two rental partner.

## 4. Cancellation

New EquipmentManager should be auto-assigned and booking owner notified.

## 5. Notes for AI

- Current system is:

1. EquipmentManage receives order
2. Packs the bag
3. Writes the details of the bag on a piece of paper and attaches it to the bag
   That piece of paper says:

- The boat that is going on
- The customer's name
- The sizes in there
- The name of the instructor

- Dive Dispatch System is EquipmentManage writes identifying numbers on all dive bags, and the instructor is able to look up on the app which bag is theirs. This way, the equipment manager does not have to write it on every individual bag.
