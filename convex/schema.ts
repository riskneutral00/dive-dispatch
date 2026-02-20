import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// --- Shared validators ---

const operatorType = v.union(
  v.literal("DiveCenter"),
  v.literal("Agent"),
  v.literal("Liveaboard"),
  v.literal("DiveResort"),
);

const resourceOwnerType = v.union(
  v.literal("BoatManager"),
  v.literal("EquipmentManager"),
  v.literal("PoolManager"),
  v.literal("CompressorManager"),
  v.literal("DiveSiteManager"),
  v.literal("DiveCenter"),
);

const bookingStatus = v.union(
  v.literal("Building"),
  v.literal("AwaitingCustomer"),
  v.literal("Draft"),
  v.literal("DraftIncomplete"),
  v.literal("AwaitingConfirmation"),
  v.literal("Confirmed"),
  v.literal("Cancelled"),
  v.literal("Expired"),
  v.literal("Completed"),
);

const reservationStatus = v.union(
  v.literal("Hold"),
  v.literal("PendingAcceptance"),
  v.literal("Confirmed"),
  v.literal("Declined"),
  v.literal("Released"),
  v.literal("Expired"),
);

const capacityModel = v.union(
  v.literal("Exclusive"),
  v.literal("Pooled"),
);

const acceptanceMode = v.union(
  v.literal("Auto"),
  v.literal("PrePayRequired"),
  v.literal("PostPayAllowed"),
);

// --- Schema ---

export default defineSchema({
  // ============================================================
  // BOOKING ENTITIES (8 tables — BOOKING_SPEC.md §2)
  // ============================================================

  bookings: defineTable({
    ownerId: v.string(),
    ownerType: operatorType,
    activityType: v.string(),
    status: bookingStatus,
    holdTTL: v.number(), // milliseconds; default 12h = 43_200_000
    customerProfileId: v.optional(v.id("customerProfiles")),
    submittedAt: v.optional(v.number()), // timestamp ms
    expiresAt: v.optional(v.number()), // timestamp ms
  })
    .index("by_ownerId_ownerType", ["ownerId", "ownerType"])
    .index("by_status", ["status"]),

  bookingSessions: defineTable({
    bookingId: v.id("bookings"),
    inventoryUnitId: v.id("inventoryUnits"),
    date: v.string(), // ISO date "YYYY-MM-DD"
    startTime: v.string(), // ISO time "HH:mm"
    endTime: v.string(), // ISO time "HH:mm"
    timezone: v.string(), // IANA timezone
    notes: v.optional(v.string()),
  })
    .index("by_bookingId", ["bookingId"])
    .index("by_inventoryUnitId_date", ["inventoryUnitId", "date"]),

  customerProfiles: defineTable({
    bookingId: v.id("bookings"),
    linkToken: v.string(), // UUID; single-use
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    emergencyContact: v.string(),
    accommodationName: v.optional(v.string()),
    needsPickup: v.boolean(),
    medicalAnswers: v.any(), // JSON object; verbatim questionnaire responses
    waiverSignedAt: v.optional(v.number()), // timestamp ms
    submittedAt: v.optional(v.number()), // timestamp ms
  })
    .index("by_bookingId", ["bookingId"])
    .index("by_linkToken", ["linkToken"]),

  bookingLinks: defineTable({
    bookingId: v.id("bookings"),
    token: v.string(), // UUID
    expiresAt: v.number(), // timestamp ms
    usedAt: v.optional(v.number()), // timestamp ms; null until customer opens
  })
    .index("by_bookingId", ["bookingId"])
    .index("by_token", ["token"]),

  inventoryUnits: defineTable({
    resourceType: v.string(), // "Instructor" | "Boat" | "EquipmentSet" | "PoolLane" | "Tank" | ...
    resourceId: v.string(), // references actual stakeholder record
    displayName: v.string(),
    capacityModel: capacityModel,
    totalUnits: v.number(), // 1 for Exclusive; N for Pooled
    ownerId: v.string(),
    ownerType: resourceOwnerType,
  })
    .index("by_ownerId_ownerType", ["ownerId", "ownerType"])
    .index("by_resourceType", ["resourceType"]),

  stakeholderPreferences: defineTable({
    stakeholderId: v.string(),
    stakeholderType: v.string(),
    acceptanceMode: acceptanceMode,
    minimumPayPerSession: v.optional(v.number()),
    maxHoursPerDay: v.optional(v.number()),
    noWorkAfterTime: v.optional(v.string()), // ISO time
    postJobBlockDuration: v.optional(v.number()), // milliseconds
    useNamedUnits: v.boolean(), // EquipmentManager only
  })
    .index("by_stakeholderId", ["stakeholderId"]),

  reservations: defineTable({
    bookingId: v.id("bookings"),
    inventoryUnitId: v.id("inventoryUnits"),
    unitsRequested: v.number(), // 1 for Exclusive; >= 1 for Pooled
    status: reservationStatus,
    heldAt: v.optional(v.number()), // timestamp ms
    confirmedAt: v.optional(v.number()), // timestamp ms
    releasedAt: v.optional(v.number()), // timestamp ms
    expiresAt: v.optional(v.number()), // timestamp ms
  })
    .index("by_bookingId", ["bookingId"])
    .index("by_inventoryUnitId_status", ["inventoryUnitId", "status"])
    .index("by_expiresAt_status", ["expiresAt", "status"]),

  availabilitySnapshots: defineTable({
    inventoryUnitId: v.id("inventoryUnits"),
    date: v.string(), // ISO date
    windowStart: v.string(), // ISO time
    windowEnd: v.string(), // ISO time
    totalUnits: v.number(),
    reservedUnits: v.number(),
    availableUnits: v.number(), // computed: totalUnits - reservedUnits
  })
    .index("by_inventoryUnitId_date", ["inventoryUnitId", "date"])
    .index("by_inventoryUnitId_date_windowStart", [
      "inventoryUnitId",
      "date",
      "windowStart",
    ]),

  // ============================================================
  // AUTH & USER TABLES
  // ============================================================

  users: defineTable({
    tokenIdentifier: v.string(), // Clerk JWT subject
    email: v.string(),
    name: v.string(),
    role: v.string(), // stakeholder type key
    isSeeded: v.boolean(), // true for faker-generated records
  })
    .index("by_tokenIdentifier", ["tokenIdentifier"])
    .index("by_role", ["role"]),

  // ============================================================
  // STAKEHOLDER PROFILE TABLES (one per active stakeholder type)
  // ============================================================

  diveCenters: defineTable({
    userId: v.id("users"),
    name: v.string(),
    location: v.string(),
    contactEmail: v.string(),
    contactPhone: v.string(),
    description: v.optional(v.string()),
    isSeeded: v.boolean(),
  }).index("by_userId", ["userId"]),

  agents: defineTable({
    userId: v.id("users"),
    name: v.string(),
    location: v.string(),
    contactEmail: v.string(),
    contactPhone: v.string(),
    specialties: v.optional(v.array(v.string())),
    isSeeded: v.boolean(),
  }).index("by_userId", ["userId"]),

  liveaboards: defineTable({
    userId: v.id("users"),
    name: v.string(),
    vesselName: v.string(),
    homePort: v.string(),
    contactEmail: v.string(),
    contactPhone: v.string(),
    capacity: v.number(),
    isSeeded: v.boolean(),
  }).index("by_userId", ["userId"]),

  diveResorts: defineTable({
    userId: v.id("users"),
    name: v.string(),
    location: v.string(),
    contactEmail: v.string(),
    contactPhone: v.string(),
    roomCount: v.optional(v.number()),
    isSeeded: v.boolean(),
  }).index("by_userId", ["userId"]),

  instructors: defineTable({
    userId: v.id("users"),
    name: v.string(),
    location: v.string(),
    contactEmail: v.string(),
    contactPhone: v.string(),
    certificationLevel: v.string(), // e.g. "PADI Open Water Instructor", "PADI Divemaster"
    specialties: v.optional(v.array(v.string())),
    isSeeded: v.boolean(),
  }).index("by_userId", ["userId"]),

  boatManagers: defineTable({
    userId: v.id("users"),
    name: v.string(),
    location: v.string(),
    contactEmail: v.string(),
    contactPhone: v.string(),
    fleetSize: v.optional(v.number()),
    isSeeded: v.boolean(),
  }).index("by_userId", ["userId"]),

  equipmentManagers: defineTable({
    userId: v.id("users"),
    name: v.string(),
    location: v.string(),
    contactEmail: v.string(),
    contactPhone: v.string(),
    inventoryCount: v.optional(v.number()),
    isSeeded: v.boolean(),
  }).index("by_userId", ["userId"]),

  poolManagers: defineTable({
    userId: v.id("users"),
    name: v.string(),
    location: v.string(),
    contactEmail: v.string(),
    contactPhone: v.string(),
    laneCount: v.optional(v.number()),
    isSeeded: v.boolean(),
  }).index("by_userId", ["userId"]),

  compressorManagers: defineTable({
    userId: v.id("users"),
    name: v.string(),
    location: v.string(),
    contactEmail: v.string(),
    contactPhone: v.string(),
    compressorCount: v.optional(v.number()),
    isSeeded: v.boolean(),
  }).index("by_userId", ["userId"]),

  siteManagers: defineTable({
    userId: v.id("users"),
    name: v.string(),
    location: v.string(),
    contactEmail: v.string(),
    contactPhone: v.string(),
    siteName: v.string(),
    isSeeded: v.boolean(),
  }).index("by_userId", ["userId"]),
});
