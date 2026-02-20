/**
 * convex/seed.ts — Deterministic seed data for Dive Dispatch
 *
 * 10 real Clerk accounts (from config/clerk-seed-map.json) + 490 faker records.
 * 50 records per stakeholder type (10 types = 500 total users).
 * All synthetic records marked with isSeeded: true.
 * Synthetic tokenIdentifier format: https://super-gar-43.clerk.accounts.dev|fake_<type>_<nnn>
 *
 * Run via Convex dashboard "Run function" or a one-off script.
 */

import { mutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { faker } from "@faker-js/faker";

// Deterministic output
faker.seed(42);

// --- Constants ---

const CLERK_DOMAIN = "https://super-gar-43.clerk.accounts.dev";
const HOLD_TTL_MS = 43_200_000; // 12 hours

// Phuket-area dive locations for realistic data
const DIVE_LOCATIONS = [
  "Chalong, Phuket",
  "Kata Beach, Phuket",
  "Patong, Phuket",
  "Rawai, Phuket",
  "Kamala, Phuket",
  "Karon, Phuket",
  "Cape Panwa, Phuket",
  "Ao Nang, Krabi",
  "Phi Phi Islands",
  "Khao Lak",
  "Similan Islands",
  "Koh Lanta",
  "Koh Tao",
  "Koh Samui",
  "Pattaya",
];

const ACTIVITY_TYPES = [
  "Fun Dive",
  "Open Water Course",
  "Advanced Open Water",
  "Rescue Diver",
  "Discover Scuba Diving",
  "Divemaster Course",
  "Night Dive",
  "Wreck Dive",
  "Deep Dive",
  "Nitrox Specialty",
];

const CERT_LEVELS = [
  "PADI Open Water Instructor",
  "PADI Divemaster",
  "PADI Advanced Open Water Instructor",
  "PADI Master Instructor",
  "PADI Course Director",
  "PADI IDC Staff Instructor",
  "SSI Open Water Instructor",
  "SSI Dive Control Specialist",
];

const INSTRUCTOR_SPECIALTIES = [
  "Deep Diving",
  "Wreck Diving",
  "Night Diving",
  "Nitrox",
  "Underwater Photography",
  "Search & Recovery",
  "Drift Diving",
  "Coral Reef Conservation",
  "Sidemount",
  "Full Face Mask",
];

const DIVE_SITE_NAMES = [
  "Shark Point",
  "King Cruiser Wreck",
  "Anemone Reef",
  "Racha Yai Bay 1",
  "Racha Noi South Tip",
  "Koh Dok Mai",
  "Phi Phi Bida Nok",
  "Similan Island #9",
  "Richelieu Rock",
  "Hin Daeng",
  "Hin Muang",
  "Koh Bon West Ridge",
  "Surin Islands",
  "Boulder City",
  "Christmas Point",
];

const BOAT_NAMES = [
  "MV Deep Blue",
  "MV Coral Queen",
  "MV Sea Wanderer",
  "MV Andaman Explorer",
  "MV Phuket Diver",
  "MV Similan Star",
  "MV Ocean Spirit",
  "MV Reef Runner",
  "MV Dive Master I",
  "MV Emerald Wave",
];

// --- Real Clerk accounts (from clerk-seed-map.json) ---

interface ClerkAccount {
  clerkUserId: string;
  email: string;
  name: string;
  role: string;
}

const REAL_ACCOUNTS: ClerkAccount[] = [
  { clerkUserId: "user_39w3fVWHq03fNIB6j7nJyyNhC2U", email: "divecenter+clerk_test@example.com", name: "Dive Center", role: "diveCenter" },
  { clerkUserId: "user_39w3h1RXki2xJHM12aU9yB71ovX", email: "agent+clerk_test@example.com", name: "Agent TestUser", role: "agent" },
  { clerkUserId: "user_39w3h3iiEc6R5IxANeMVIAQZJZC", email: "liveaboard+clerk_test@example.com", name: "Liveaboard TestUser", role: "liveaboard" },
  { clerkUserId: "user_39w3h5Gdvg5yaHKZqOc0LTWBTxz", email: "resort+clerk_test@example.com", name: "Dive Resort", role: "diveResort" },
  { clerkUserId: "user_39w3h3trE0FIWhA82CaaQSpDcHo", email: "instructor+clerk_test@example.com", name: "Instructor TestUser", role: "instructor" },
  { clerkUserId: "user_39w3h40akapIiAOcLkm2QyvDmo6", email: "boat+clerk_test@example.com", name: "Boat Manager", role: "boatManager" },
  { clerkUserId: "user_39w3hHU7eRe1BgPicJdt4HQqF6t", email: "gear+clerk_test@example.com", name: "Gear Manager", role: "equipmentManager" },
  { clerkUserId: "user_39w3hDrDLa2T95C7KdRj6yNeKat", email: "pool+clerk_test@example.com", name: "Pool Manager", role: "poolManager" },
  { clerkUserId: "user_39w3hH3thkietD39H7r8Wn1AYna", email: "air+clerk_test@example.com", name: "Air Manager", role: "compressorManager" },
  { clerkUserId: "user_39w3hAKyiaESq40C1qDu4aMRqhd", email: "site+clerk_test@example.com", name: "Site Manager", role: "siteManager" },
];

// --- Helpers ---

function syntheticToken(type: string, index: number): string {
  return `${CLERK_DOMAIN}|fake_${type}_${String(index).padStart(3, "0")}`;
}

function randomLocation(): string {
  return faker.helpers.arrayElement(DIVE_LOCATIONS);
}

function randomPhone(): string {
  return `+66${faker.string.numeric(9)}`;
}

// --- Seed function ---

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if already seeded
    const existingUsers = await ctx.db.query("users").first();
    if (existingUsers) {
      console.log("Database already seeded. Skipping.");
      return { status: "already_seeded" };
    }

    // Re-seed faker for deterministic output
    faker.seed(42);

    // Track created IDs for cross-referencing
    const userIdsByRole: Record<string, string[]> = {};
    const profileIdsByRole: Record<string, string[]> = {};
    const inventoryUnitIds: string[] = [];

    // ================================================================
    // 1. CREATE USERS (10 real + 490 synthetic = 500 total)
    // ================================================================

    for (const account of REAL_ACCOUNTS) {
      const userId = await ctx.db.insert("users", {
        tokenIdentifier: `${CLERK_DOMAIN}|${account.clerkUserId}`,
        email: account.email,
        name: account.name,
        role: account.role,
        isSeeded: false, // Real Clerk accounts
      });
      if (!userIdsByRole[account.role]) userIdsByRole[account.role] = [];
      userIdsByRole[account.role].push(userId);
    }

    const STAKEHOLDER_TYPES = [
      "diveCenter", "agent", "liveaboard", "diveResort", "instructor",
      "boatManager", "equipmentManager", "poolManager", "compressorManager", "siteManager",
    ];

    for (const role of STAKEHOLDER_TYPES) {
      if (!userIdsByRole[role]) userIdsByRole[role] = [];
      for (let i = 1; i <= 49; i++) {
        const userId = await ctx.db.insert("users", {
          tokenIdentifier: syntheticToken(role, i),
          email: faker.internet.email({ firstName: faker.person.firstName(), lastName: faker.person.lastName() }),
          name: faker.person.fullName(),
          role,
          isSeeded: true,
        });
        userIdsByRole[role].push(userId);
      }
    }

    // ================================================================
    // 2. CREATE STAKEHOLDER PROFILES
    // ================================================================

    // --- Dive Centers (50) ---
    for (const userId of userIdsByRole["diveCenter"]) {
      const profileId = await ctx.db.insert("diveCenters", {
        userId: userId as any,
        name: `${faker.company.name()} Dive Center`,
        location: randomLocation(),
        contactEmail: faker.internet.email(),
        contactPhone: randomPhone(),
        description: faker.lorem.sentence(),
        isSeeded: userId !== userIdsByRole["diveCenter"][0],
      });
      if (!profileIdsByRole["diveCenter"]) profileIdsByRole["diveCenter"] = [];
      profileIdsByRole["diveCenter"].push(profileId);
    }

    // --- Agents (50) ---
    for (const userId of userIdsByRole["agent"]) {
      const profileId = await ctx.db.insert("agents", {
        userId: userId as any,
        name: `${faker.company.name()} Travel`,
        location: randomLocation(),
        contactEmail: faker.internet.email(),
        contactPhone: randomPhone(),
        specialties: faker.helpers.arrayElements(["PADI", "SSI", "Snorkeling", "Freediving", "Liveaboard Trips", "Day Trips"], { min: 1, max: 3 }),
        isSeeded: userId !== userIdsByRole["agent"][0],
      });
      if (!profileIdsByRole["agent"]) profileIdsByRole["agent"] = [];
      profileIdsByRole["agent"].push(profileId);
    }

    // --- Liveaboards (50) ---
    for (const userId of userIdsByRole["liveaboard"]) {
      const profileId = await ctx.db.insert("liveaboards", {
        userId: userId as any,
        name: `${faker.company.name()} Liveaboard`,
        vesselName: faker.helpers.arrayElement(BOAT_NAMES) + ` ${faker.string.alpha({ length: 2, casing: "upper" })}`,
        homePort: randomLocation(),
        contactEmail: faker.internet.email(),
        contactPhone: randomPhone(),
        capacity: faker.number.int({ min: 8, max: 30 }),
        isSeeded: userId !== userIdsByRole["liveaboard"][0],
      });
      if (!profileIdsByRole["liveaboard"]) profileIdsByRole["liveaboard"] = [];
      profileIdsByRole["liveaboard"].push(profileId);
    }

    // --- Dive Resorts (50) ---
    for (const userId of userIdsByRole["diveResort"]) {
      const profileId = await ctx.db.insert("diveResorts", {
        userId: userId as any,
        name: `${faker.company.name()} Resort`,
        location: randomLocation(),
        contactEmail: faker.internet.email(),
        contactPhone: randomPhone(),
        roomCount: faker.number.int({ min: 5, max: 80 }),
        isSeeded: userId !== userIdsByRole["diveResort"][0],
      });
      if (!profileIdsByRole["diveResort"]) profileIdsByRole["diveResort"] = [];
      profileIdsByRole["diveResort"].push(profileId);
    }

    // --- Instructors (50) ---
    for (const userId of userIdsByRole["instructor"]) {
      const profileId = await ctx.db.insert("instructors", {
        userId: userId as any,
        name: faker.person.fullName(),
        location: randomLocation(),
        contactEmail: faker.internet.email(),
        contactPhone: randomPhone(),
        certificationLevel: faker.helpers.arrayElement(CERT_LEVELS),
        specialties: faker.helpers.arrayElements(INSTRUCTOR_SPECIALTIES, { min: 1, max: 4 }),
        isSeeded: userId !== userIdsByRole["instructor"][0],
      });
      if (!profileIdsByRole["instructor"]) profileIdsByRole["instructor"] = [];
      profileIdsByRole["instructor"].push(profileId);
    }

    // --- Boat Managers (50) ---
    for (const userId of userIdsByRole["boatManager"]) {
      const profileId = await ctx.db.insert("boatManagers", {
        userId: userId as any,
        name: `${faker.person.fullName()} Marine Services`,
        location: randomLocation(),
        contactEmail: faker.internet.email(),
        contactPhone: randomPhone(),
        fleetSize: faker.number.int({ min: 1, max: 8 }),
        isSeeded: userId !== userIdsByRole["boatManager"][0],
      });
      if (!profileIdsByRole["boatManager"]) profileIdsByRole["boatManager"] = [];
      profileIdsByRole["boatManager"].push(profileId);
    }

    // --- Equipment Managers (50) ---
    for (const userId of userIdsByRole["equipmentManager"]) {
      const profileId = await ctx.db.insert("equipmentManagers", {
        userId: userId as any,
        name: `${faker.company.name()} Dive Gear`,
        location: randomLocation(),
        contactEmail: faker.internet.email(),
        contactPhone: randomPhone(),
        inventoryCount: faker.number.int({ min: 10, max: 200 }),
        isSeeded: userId !== userIdsByRole["equipmentManager"][0],
      });
      if (!profileIdsByRole["equipmentManager"]) profileIdsByRole["equipmentManager"] = [];
      profileIdsByRole["equipmentManager"].push(profileId);
    }

    // --- Pool Managers (50) ---
    for (const userId of userIdsByRole["poolManager"]) {
      const profileId = await ctx.db.insert("poolManagers", {
        userId: userId as any,
        name: `${faker.company.name()} Aquatics`,
        location: randomLocation(),
        contactEmail: faker.internet.email(),
        contactPhone: randomPhone(),
        laneCount: faker.number.int({ min: 2, max: 10 }),
        isSeeded: userId !== userIdsByRole["poolManager"][0],
      });
      if (!profileIdsByRole["poolManager"]) profileIdsByRole["poolManager"] = [];
      profileIdsByRole["poolManager"].push(profileId);
    }

    // --- Compressor Managers (50) ---
    for (const userId of userIdsByRole["compressorManager"]) {
      const profileId = await ctx.db.insert("compressorManagers", {
        userId: userId as any,
        name: `${faker.person.fullName()} Air Station`,
        location: randomLocation(),
        contactEmail: faker.internet.email(),
        contactPhone: randomPhone(),
        compressorCount: faker.number.int({ min: 1, max: 5 }),
        isSeeded: userId !== userIdsByRole["compressorManager"][0],
      });
      if (!profileIdsByRole["compressorManager"]) profileIdsByRole["compressorManager"] = [];
      profileIdsByRole["compressorManager"].push(profileId);
    }

    // --- Site Managers (50) ---
    for (const userId of userIdsByRole["siteManager"]) {
      const profileId = await ctx.db.insert("siteManagers", {
        userId: userId as any,
        name: faker.person.fullName(),
        location: randomLocation(),
        contactEmail: faker.internet.email(),
        contactPhone: randomPhone(),
        siteName: faker.helpers.arrayElement(DIVE_SITE_NAMES),
        isSeeded: userId !== userIdsByRole["siteManager"][0],
      });
      if (!profileIdsByRole["siteManager"]) profileIdsByRole["siteManager"] = [];
      profileIdsByRole["siteManager"].push(profileId);
    }

    // ================================================================
    // 3. CREATE STAKEHOLDER PREFERENCES (for instructors, boat, equip, pool, compressor, site)
    // ================================================================

    const RESOURCE_ROLES = ["instructor", "boatManager", "equipmentManager", "poolManager", "compressorManager", "siteManager"];
    for (const role of RESOURCE_ROLES) {
      for (const profileId of (profileIdsByRole[role] ?? [])) {
        await ctx.db.insert("stakeholderPreferences", {
          stakeholderId: profileId,
          stakeholderType: role,
          acceptanceMode: faker.helpers.arrayElement(["Auto", "PrePayRequired", "PostPayAllowed"] as const),
          minimumPayPerSession: faker.datatype.boolean() ? faker.number.int({ min: 500, max: 5000 }) : undefined,
          maxHoursPerDay: faker.datatype.boolean() ? faker.number.int({ min: 4, max: 10 }) : undefined,
          noWorkAfterTime: faker.datatype.boolean() ? `${faker.number.int({ min: 16, max: 20 })}:00` : undefined,
          postJobBlockDuration: faker.datatype.boolean() ? faker.number.int({ min: 30, max: 120 }) * 60_000 : undefined,
          useNamedUnits: role === "equipmentManager" ? faker.datatype.boolean() : false,
        });
      }
    }

    // ================================================================
    // 4. CREATE INVENTORY UNITS
    // ================================================================

    // Instructors → Exclusive units
    for (const profileId of (profileIdsByRole["instructor"] ?? []).slice(0, 30)) {
      const unitId = await ctx.db.insert("inventoryUnits", {
        resourceType: "Instructor",
        resourceId: profileId,
        displayName: `Instructor ${faker.person.firstName()}`,
        capacityModel: "Exclusive",
        totalUnits: 1,
        ownerId: profileId,
        ownerType: "DiveCenter",
      });
      inventoryUnitIds.push(unitId);
    }

    // Boats → Exclusive units (berths modeled as separate units)
    for (const profileId of (profileIdsByRole["boatManager"] ?? []).slice(0, 20)) {
      const unitId = await ctx.db.insert("inventoryUnits", {
        resourceType: "Boat",
        resourceId: profileId,
        displayName: faker.helpers.arrayElement(BOAT_NAMES),
        capacityModel: "Exclusive",
        totalUnits: 1,
        ownerId: profileId,
        ownerType: "BoatManager",
      });
      inventoryUnitIds.push(unitId);
    }

    // Equipment sets → Pooled units
    for (const profileId of (profileIdsByRole["equipmentManager"] ?? []).slice(0, 20)) {
      const totalSets = faker.number.int({ min: 5, max: 50 });
      const unitId = await ctx.db.insert("inventoryUnits", {
        resourceType: "EquipmentSet",
        resourceId: profileId,
        displayName: `${faker.commerce.productName()} Dive Kit`,
        capacityModel: "Pooled",
        totalUnits: totalSets,
        ownerId: profileId,
        ownerType: "EquipmentManager",
      });
      inventoryUnitIds.push(unitId);
    }

    // Pool lanes → Exclusive units
    for (const profileId of (profileIdsByRole["poolManager"] ?? []).slice(0, 15)) {
      const lanes = faker.number.int({ min: 2, max: 6 });
      for (let lane = 1; lane <= lanes; lane++) {
        const unitId = await ctx.db.insert("inventoryUnits", {
          resourceType: "PoolLane",
          resourceId: profileId,
          displayName: `Lane ${lane}`,
          capacityModel: "Exclusive",
          totalUnits: 1,
          ownerId: profileId,
          ownerType: "PoolManager",
        });
        inventoryUnitIds.push(unitId);
      }
    }

    // Compressor fills → Pooled units (tanks per day)
    for (const profileId of (profileIdsByRole["compressorManager"] ?? []).slice(0, 15)) {
      const dailyCapacity = faker.number.int({ min: 20, max: 100 });
      const unitId = await ctx.db.insert("inventoryUnits", {
        resourceType: "Tank",
        resourceId: profileId,
        displayName: `Tank fills - ${faker.number.int({ min: 1, max: 5 })} compressors`,
        capacityModel: "Pooled",
        totalUnits: dailyCapacity,
        ownerId: profileId,
        ownerType: "CompressorManager",
      });
      inventoryUnitIds.push(unitId);
    }

    // ================================================================
    // 5. CREATE SAMPLE BOOKINGS WITH SESSIONS, RESERVATIONS, SNAPSHOTS
    // ================================================================

    const operatorTypes = ["DiveCenter", "Agent", "Liveaboard", "DiveResort"] as const;
    const operatorRoles = ["diveCenter", "agent", "liveaboard", "diveResort"] as const;
    const bookingStatuses = ["Building", "Draft", "AwaitingCustomer", "AwaitingConfirmation", "Confirmed", "Completed", "Cancelled", "Expired"] as const;

    // Generate 40 sample bookings spread across operator types
    for (let b = 0; b < 40; b++) {
      const opIndex = b % 4;
      const operatorRole = operatorRoles[opIndex];
      const ownerProfileId = profileIdsByRole[operatorRole]?.[b % (profileIdsByRole[operatorRole]?.length ?? 1)] ?? profileIdsByRole[operatorRole]?.[0];
      if (!ownerProfileId) continue;

      const status = faker.helpers.arrayElement(bookingStatuses);
      const createdAt = Date.now() - faker.number.int({ min: 0, max: 30 * 24 * 60 * 60_000 });
      const submittedAt = (status !== "Building" && status !== "AwaitingCustomer")
        ? createdAt + faker.number.int({ min: 1_000, max: 3_600_000 })
        : undefined;

      const bookingId = await ctx.db.insert("bookings", {
        ownerId: ownerProfileId,
        ownerType: operatorTypes[opIndex],
        activityType: faker.helpers.arrayElement(ACTIVITY_TYPES),
        status,
        holdTTL: HOLD_TTL_MS,
        customerProfileId: undefined,
        submittedAt,
        expiresAt: submittedAt ? submittedAt + HOLD_TTL_MS : undefined,
      });

      // Create 1-3 booking sessions per booking (if not Building)
      if (status !== "Building" && inventoryUnitIds.length > 0) {
        const sessionCount = faker.number.int({ min: 1, max: 3 });
        for (let s = 0; s < sessionCount; s++) {
          const futureDate = new Date(Date.now() + faker.number.int({ min: 1, max: 60 }) * 24 * 60 * 60_000);
          const dateStr = futureDate.toISOString().split("T")[0];
          const startHour = faker.number.int({ min: 7, max: 14 });
          const durationHours = faker.number.int({ min: 1, max: 4 });
          const unitId = faker.helpers.arrayElement(inventoryUnitIds);

          await ctx.db.insert("bookingSessions", {
            bookingId: bookingId as any,
            inventoryUnitId: unitId as any,
            date: dateStr,
            startTime: `${String(startHour).padStart(2, "0")}:00`,
            endTime: `${String(startHour + durationHours).padStart(2, "0")}:00`,
            timezone: "Asia/Bangkok",
            notes: faker.datatype.boolean() ? faker.lorem.sentence() : undefined,
          });

          // Create matching reservation for Draft/Confirmed/Completed bookings
          if (["Draft", "AwaitingConfirmation", "Confirmed", "Completed"].includes(status)) {
            const resStatus = status === "Confirmed" || status === "Completed"
              ? "Confirmed"
              : faker.helpers.arrayElement(["Hold", "PendingAcceptance"] as const);

            await ctx.db.insert("reservations", {
              bookingId: bookingId as any,
              inventoryUnitId: unitId as any,
              unitsRequested: 1,
              status: resStatus,
              heldAt: submittedAt,
              confirmedAt: resStatus === "Confirmed" ? (submittedAt ?? createdAt) + 3_600_000 : undefined,
              releasedAt: undefined,
              expiresAt: resStatus === "Hold" ? (submittedAt ?? createdAt) + HOLD_TTL_MS : undefined,
            });

            // Create matching availability snapshot
            await ctx.db.insert("availabilitySnapshots", {
              inventoryUnitId: unitId as any,
              date: dateStr,
              windowStart: `${String(startHour).padStart(2, "0")}:00`,
              windowEnd: `${String(startHour + durationHours).padStart(2, "0")}:00`,
              totalUnits: 1,
              reservedUnits: 1,
              availableUnits: 0,
            });
          }
        }
      }

      // Create booking link for AwaitingCustomer+ bookings
      if (["AwaitingCustomer", "Draft", "AwaitingConfirmation", "Confirmed", "Completed"].includes(status)) {
        const token = faker.string.uuid();
        await ctx.db.insert("bookingLinks", {
          bookingId: bookingId as any,
          token,
          expiresAt: createdAt + 7 * 24 * 60 * 60_000, // 7 day expiry
          usedAt: status !== "AwaitingCustomer" ? createdAt + faker.number.int({ min: 60_000, max: 86_400_000 }) : undefined,
        });

        // Create customer profile for bookings past AwaitingCustomer
        if (["Draft", "AwaitingConfirmation", "Confirmed", "Completed"].includes(status) && faker.datatype.boolean({ probability: 0.7 })) {
          const profileId = await ctx.db.insert("customerProfiles", {
            bookingId: bookingId as any,
            linkToken: token,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            phone: randomPhone(),
            emergencyContact: `${faker.person.fullName()} - ${randomPhone()}`,
            accommodationName: faker.datatype.boolean() ? `${faker.company.name()} Hotel` : undefined,
            needsPickup: faker.datatype.boolean(),
            medicalAnswers: {
              hasHeartCondition: false,
              hasAsthma: faker.datatype.boolean({ probability: 0.1 }),
              isPregnant: false,
              hasDiabetes: faker.datatype.boolean({ probability: 0.05 }),
              recentSurgery: false,
              takingMedication: faker.datatype.boolean({ probability: 0.2 }),
              lastDive: faker.helpers.arrayElement(["Never", "Less than 6 months", "6-12 months", "Over a year"]),
            },
            waiverSignedAt: faker.datatype.boolean({ probability: 0.8 }) ? createdAt + 120_000 : undefined,
            submittedAt: createdAt + faker.number.int({ min: 60_000, max: 3_600_000 }),
          });

          // Patch booking with customer profile reference
          await ctx.db.patch(bookingId, {
            customerProfileId: profileId as any,
          });
        }
      }
    }

    // ================================================================
    // 6. CREATE ADDITIONAL AVAILABILITY SNAPSHOTS (for un-booked inventory)
    // ================================================================

    // Populate availability for the next 14 days for some inventory units
    const snapshotUnits = inventoryUnitIds.slice(0, 20);
    for (const unitId of snapshotUnits) {
      const unit = await ctx.db.get(unitId as Id<"inventoryUnits">);
      if (!unit) continue;

      for (let day = 0; day < 14; day++) {
        const date = new Date(Date.now() + day * 24 * 60 * 60_000);
        const dateStr = date.toISOString().split("T")[0];

        // Morning and afternoon windows
        for (const window of [
          { start: "08:00", end: "12:00" },
          { start: "13:00", end: "17:00" },
        ]) {
          const existing = await ctx.db
            .query("availabilitySnapshots")
            .withIndex("by_inventoryUnitId_date_windowStart", (q) =>
              q
                .eq("inventoryUnitId", unitId as Id<"inventoryUnits">)
                .eq("date", dateStr)
                .eq("windowStart", window.start)
            )
            .first();

          if (!existing) {
            await ctx.db.insert("availabilitySnapshots", {
              inventoryUnitId: unitId as Id<"inventoryUnits">,
              date: dateStr,
              windowStart: window.start,
              windowEnd: window.end,
              totalUnits: unit.totalUnits,
              reservedUnits: 0,
              availableUnits: unit.totalUnits,
            });
          }
        }
      }
    }

    console.log("Seed complete: 500 users, 500 profiles, inventory, bookings, and availability snapshots created.");
    return { status: "seeded", users: 500, bookings: 40 };
  },
});
