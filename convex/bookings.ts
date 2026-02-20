import { v } from "convex/values";
import { mutation, internalMutation } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// ============================================================
// Helper: find or create AvailabilitySnapshot for a given unit+date+window
// ============================================================

async function getOrCreateSnapshot(
  ctx: { db: any },
  inventoryUnitId: Id<"inventoryUnits">,
  date: string,
  windowStart: string,
  windowEnd: string,
) {
  const existing = await ctx.db
    .query("availabilitySnapshots")
    .withIndex("by_inventoryUnitId_date_windowStart", (q: any) =>
      q
        .eq("inventoryUnitId", inventoryUnitId)
        .eq("date", date)
        .eq("windowStart", windowStart),
    )
    .first();

  if (existing && existing.windowEnd === windowEnd) {
    return existing;
  }

  // Create snapshot from InventoryUnit totalUnits
  const unit = await ctx.db.get(inventoryUnitId);
  if (!unit) throw new Error(`InventoryUnit ${inventoryUnitId} not found`);

  const snapshotId = await ctx.db.insert("availabilitySnapshots", {
    inventoryUnitId,
    date,
    windowStart,
    windowEnd,
    totalUnits: unit.totalUnits,
    reservedUnits: 0,
    availableUnits: unit.totalUnits,
  });

  return await ctx.db.get(snapshotId);
}

// ============================================================
// Helper: check for time overlap between two windows
// ============================================================

function windowsOverlap(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
): boolean {
  return aStart < bEnd && aEnd > bStart;
}

// ============================================================
// 1. submitToDraft — Core atomic hold mutation (BOOKING_SPEC §4)
// ============================================================

export const submitToDraft = mutation({
  args: {
    bookingId: v.id("bookings"),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) throw new Error("Booking not found");
    if (booking.status !== "Building" && booking.status !== "AwaitingCustomer") {
      throw new Error(
        `Cannot submit booking in status "${booking.status}" — must be Building or AwaitingCustomer`,
      );
    }

    // Get all BookingSessions for this booking
    const sessions = await ctx.db
      .query("bookingSessions")
      .withIndex("by_bookingId", (q: any) => q.eq("bookingId", args.bookingId))
      .collect();

    if (sessions.length === 0) {
      throw new Error("Booking has no sessions — cannot submit to draft");
    }

    // STEP 1: Check availability for ALL sessions (collect conflicts)
    const conflicts: { inventoryUnitId: string; date: string; window: string }[] = [];
    const snapshotUpdates: {
      snapshot: any;
      inventoryUnit: any;
      session: any;
      unitsRequested: number;
    }[] = [];

    for (const session of sessions) {
      const inventoryUnit = await ctx.db.get(session.inventoryUnitId);
      if (!inventoryUnit) {
        throw new Error(`InventoryUnit ${session.inventoryUnitId} not found`);
      }

      const snapshot = await getOrCreateSnapshot(
        ctx,
        session.inventoryUnitId,
        session.date,
        session.startTime,
        session.endTime,
      );

      const unitsRequested =
        inventoryUnit.capacityModel === "Exclusive" ? 1 : 1;

      if (inventoryUnit.capacityModel === "Exclusive") {
        // Also check for overlapping windows on the same date for this unit
        const daySnapshots = await ctx.db
          .query("availabilitySnapshots")
          .withIndex("by_inventoryUnitId_date", (q: any) =>
            q.eq("inventoryUnitId", session.inventoryUnitId).eq("date", session.date),
          )
          .collect();

        let hasOverlapConflict = false;
        for (const ds of daySnapshots) {
          if (
            ds._id !== snapshot._id &&
            windowsOverlap(session.startTime, session.endTime, ds.windowStart, ds.windowEnd) &&
            ds.availableUnits < 1
          ) {
            hasOverlapConflict = true;
            break;
          }
        }

        if (snapshot.availableUnits < 1 || hasOverlapConflict) {
          conflicts.push({
            inventoryUnitId: session.inventoryUnitId,
            date: session.date,
            window: `${session.startTime}-${session.endTime}`,
          });
          continue;
        }
      } else {
        // Pooled
        if (snapshot.availableUnits < unitsRequested) {
          conflicts.push({
            inventoryUnitId: session.inventoryUnitId,
            date: session.date,
            window: `${session.startTime}-${session.endTime}`,
          });
          continue;
        }
      }

      snapshotUpdates.push({
        snapshot,
        inventoryUnit,
        session,
        unitsRequested,
      });
    }

    // STEP 2: If ANY conflict → throw → entire mutation aborts → zero writes
    if (conflicts.length > 0) {
      throw new Error(
        `Availability conflict: ${JSON.stringify(conflicts)}`,
      );
    }

    // STEP 3: No conflicts — write all Reservations + update Snapshots + update Booking
    const holdTTL = booking.holdTTL || 43_200_000; // default 12h
    const expiresAt = now + holdTTL;

    for (const update of snapshotUpdates) {
      // Determine reservation status based on stakeholder acceptance mode
      const preference = await ctx.db
        .query("stakeholderPreferences")
        .withIndex("by_stakeholderId", (q: any) =>
          q.eq("stakeholderId", update.inventoryUnit.ownerId),
        )
        .first();

      const acceptanceMode = preference?.acceptanceMode ?? "Auto";
      const reservationStatus =
        acceptanceMode === "Auto" ? "Hold" : "PendingAcceptance";

      // Write Reservation
      await ctx.db.insert("reservations", {
        bookingId: args.bookingId,
        inventoryUnitId: update.session.inventoryUnitId,
        unitsRequested: update.unitsRequested,
        status: reservationStatus,
        heldAt: now,
        expiresAt,
      });

      // Decrement AvailabilitySnapshot (same mutation — Invariant #3)
      await ctx.db.patch(update.snapshot._id, {
        reservedUnits: update.snapshot.reservedUnits + update.unitsRequested,
        availableUnits: update.snapshot.availableUnits - update.unitsRequested,
      });
    }

    // Update Booking status
    await ctx.db.patch(args.bookingId, {
      status: "Draft",
      submittedAt: now,
      expiresAt,
    });
  },
});

// ============================================================
// 2. submitHoldForUnit — Re-assignment after Declined (BOOKING_SPEC §6)
// ============================================================

export const submitHoldForUnit = mutation({
  args: {
    bookingId: v.id("bookings"),
    sessionId: v.id("bookingSessions"),
    newInventoryUnitId: v.id("inventoryUnits"),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) throw new Error("Booking not found");
    if (booking.status !== "DraftIncomplete" && booking.status !== "Draft") {
      throw new Error(
        `Cannot re-assign unit in status "${booking.status}" — must be Draft or DraftIncomplete`,
      );
    }

    const session = await ctx.db.get(args.sessionId);
    if (!session) throw new Error("BookingSession not found");
    if (session.bookingId !== args.bookingId) {
      throw new Error("Session does not belong to this booking");
    }

    const newUnit = await ctx.db.get(args.newInventoryUnitId);
    if (!newUnit) throw new Error("New InventoryUnit not found");

    // Check availability for the new unit
    const snapshot = await getOrCreateSnapshot(
      ctx,
      args.newInventoryUnitId,
      session.date,
      session.startTime,
      session.endTime,
    );

    const unitsRequested = newUnit.capacityModel === "Exclusive" ? 1 : 1;

    if (newUnit.capacityModel === "Exclusive" && snapshot.availableUnits < 1) {
      throw new Error(
        `Availability conflict: ${newUnit.displayName} unavailable for ${session.date} ${session.startTime}-${session.endTime}`,
      );
    }
    if (newUnit.capacityModel === "Pooled" && snapshot.availableUnits < unitsRequested) {
      throw new Error(
        `Availability conflict: insufficient ${newUnit.displayName} units for ${session.date} ${session.startTime}-${session.endTime}`,
      );
    }

    // Determine reservation status based on acceptance mode
    const preference = await ctx.db
      .query("stakeholderPreferences")
      .withIndex("by_stakeholderId", (q: any) =>
        q.eq("stakeholderId", newUnit.ownerId),
      )
      .first();

    const acceptanceMode = preference?.acceptanceMode ?? "Auto";
    const reservationStatus =
      acceptanceMode === "Auto" ? "Hold" : "PendingAcceptance";

    const holdTTL = booking.holdTTL || 43_200_000;
    const expiresAt = now + holdTTL;

    // Write new Reservation
    await ctx.db.insert("reservations", {
      bookingId: args.bookingId,
      inventoryUnitId: args.newInventoryUnitId,
      unitsRequested,
      status: reservationStatus,
      heldAt: now,
      expiresAt,
    });

    // Decrement snapshot (same mutation — Invariant #3)
    await ctx.db.patch(snapshot._id, {
      reservedUnits: snapshot.reservedUnits + unitsRequested,
      availableUnits: snapshot.availableUnits - unitsRequested,
    });

    // Update the session to point to the new inventory unit
    await ctx.db.patch(args.sessionId, {
      inventoryUnitId: args.newInventoryUnitId,
    });

    // Check if all sessions now have active reservations — if so, restore Draft status
    const allSessions = await ctx.db
      .query("bookingSessions")
      .withIndex("by_bookingId", (q: any) => q.eq("bookingId", args.bookingId))
      .collect();

    const allReservations = await ctx.db
      .query("reservations")
      .withIndex("by_bookingId", (q: any) => q.eq("bookingId", args.bookingId))
      .collect();

    const activeStatuses = new Set(["Hold", "PendingAcceptance", "Confirmed"]);
    const activeReservationUnitIds = new Set(
      allReservations
        .filter((r: any) => activeStatuses.has(r.status))
        .map((r: any) => r.inventoryUnitId),
    );

    const allCovered = allSessions.every((s: any) =>
      activeReservationUnitIds.has(s.inventoryUnitId),
    );

    if (allCovered && booking.status === "DraftIncomplete") {
      // Check if customer profile exists — if so, move to AwaitingConfirmation
      if (booking.customerProfileId) {
        await ctx.db.patch(args.bookingId, { status: "AwaitingConfirmation" });
      } else {
        await ctx.db.patch(args.bookingId, { status: "Draft" });
      }
    }
  },
});

// ============================================================
// 3. confirmBooking — Promote Holds to Confirmed (BOOKING_SPEC §4)
// ============================================================

export const confirmBooking = mutation({
  args: {
    bookingId: v.id("bookings"),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) throw new Error("Booking not found");

    // DraftIncomplete gate — CORE_LOGIC Rule 17
    if (booking.status === "DraftIncomplete") {
      throw new Error(
        "Cannot confirm booking — at least one session has no active reservation (DraftIncomplete). Resolve all declined reservations first.",
      );
    }

    if (
      booking.status !== "Draft" &&
      booking.status !== "AwaitingConfirmation"
    ) {
      throw new Error(
        `Cannot confirm booking in status "${booking.status}" — must be Draft or AwaitingConfirmation`,
      );
    }

    // Verify no Declined reservations remain unresolved
    const reservations = await ctx.db
      .query("reservations")
      .withIndex("by_bookingId", (q: any) => q.eq("bookingId", args.bookingId))
      .collect();

    const hasDeclined = reservations.some(
      (r: any) => r.status === "Declined",
    );
    if (hasDeclined) {
      throw new Error(
        "Cannot confirm booking — unresolved Declined reservations exist",
      );
    }

    // Promote all Hold and PendingAcceptance reservations to Confirmed
    for (const reservation of reservations) {
      if (
        reservation.status === "Hold" ||
        reservation.status === "PendingAcceptance"
      ) {
        await ctx.db.patch(reservation._id, {
          status: "Confirmed",
          confirmedAt: now,
          expiresAt: undefined,
        });
      }
    }

    await ctx.db.patch(args.bookingId, {
      status: "Confirmed",
      expiresAt: undefined,
    });
  },
});

// ============================================================
// 4. cancelBooking — Release all active reservations (BOOKING_SPEC §6)
// ============================================================

export const cancelBooking = mutation({
  args: {
    bookingId: v.id("bookings"),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) throw new Error("Booking not found");

    if (booking.status === "Cancelled" || booking.status === "Completed") {
      throw new Error(
        `Cannot cancel booking in status "${booking.status}"`,
      );
    }

    const reservations = await ctx.db
      .query("reservations")
      .withIndex("by_bookingId", (q: any) => q.eq("bookingId", args.bookingId))
      .collect();

    const activeStatuses = new Set([
      "Hold",
      "PendingAcceptance",
      "Confirmed",
    ]);

    for (const reservation of reservations) {
      if (activeStatuses.has(reservation.status)) {
        // Release reservation
        await ctx.db.patch(reservation._id, {
          status: "Released",
          releasedAt: now,
          expiresAt: undefined,
        });

        // Increment AvailabilitySnapshot (same mutation — Invariant #3)
        const snapshots = await ctx.db
          .query("availabilitySnapshots")
          .withIndex("by_inventoryUnitId_date", (q: any) =>
            q.eq("inventoryUnitId", reservation.inventoryUnitId),
          )
          .collect();

        // Find matching snapshot(s) for this reservation's sessions
        const sessions = await ctx.db
          .query("bookingSessions")
          .withIndex("by_bookingId", (q: any) =>
            q.eq("bookingId", args.bookingId),
          )
          .collect();

        const relevantSessions = sessions.filter(
          (s: any) => s.inventoryUnitId === reservation.inventoryUnitId,
        );

        for (const session of relevantSessions) {
          const matchingSnapshot = snapshots.find(
            (snap: any) =>
              snap.date === session.date &&
              snap.windowStart === session.startTime &&
              snap.windowEnd === session.endTime,
          );

          if (matchingSnapshot) {
            await ctx.db.patch(matchingSnapshot._id, {
              reservedUnits:
                matchingSnapshot.reservedUnits - reservation.unitsRequested,
              availableUnits:
                matchingSnapshot.availableUnits + reservation.unitsRequested,
            });
          }
        }
      }
    }

    await ctx.db.patch(args.bookingId, {
      status: "Cancelled",
    });
  },
});

// ============================================================
// 5. completeBooking — Manual completion (BOOKING_SPEC §4)
// ============================================================

export const completeBooking = mutation({
  args: {
    bookingId: v.id("bookings"),
  },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) throw new Error("Booking not found");

    if (booking.status !== "Confirmed") {
      throw new Error(
        `Cannot complete booking in status "${booking.status}" — must be Confirmed`,
      );
    }

    await ctx.db.patch(args.bookingId, {
      status: "Completed",
    });
  },
});

// ============================================================
// 6. expireHolds — TTL expiration (BOOKING_SPEC §7)
//    Internal mutation called by crons.ts every 15 minutes
// ============================================================

export const runTTLCleanup = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // Find all Hold and PendingAcceptance reservations that have expired
    // We query by status and check expiresAt in application code
    const holdReservations = await ctx.db
      .query("reservations")
      .withIndex("by_inventoryUnitId_status")
      .collect();

    const expiredReservations = holdReservations.filter(
      (r: any) =>
        (r.status === "Hold" || r.status === "PendingAcceptance") &&
        r.expiresAt &&
        r.expiresAt < now,
    );

    // Group by bookingId to process bookings atomically
    const bookingIds = new Set<string>();

    for (const reservation of expiredReservations) {
      // Set reservation to Expired
      await ctx.db.patch(reservation._id, {
        status: "Expired",
        releasedAt: now,
        expiresAt: undefined,
      });

      // Increment AvailabilitySnapshot
      const sessions = await ctx.db
        .query("bookingSessions")
        .withIndex("by_bookingId", (q: any) =>
          q.eq("bookingId", reservation.bookingId),
        )
        .collect();

      const relevantSessions = sessions.filter(
        (s: any) => s.inventoryUnitId === reservation.inventoryUnitId,
      );

      for (const session of relevantSessions) {
        const snapshot = await ctx.db
          .query("availabilitySnapshots")
          .withIndex("by_inventoryUnitId_date_windowStart", (q: any) =>
            q
              .eq("inventoryUnitId", reservation.inventoryUnitId)
              .eq("date", session.date)
              .eq("windowStart", session.startTime),
          )
          .first();

        if (snapshot && snapshot.windowEnd === session.endTime) {
          await ctx.db.patch(snapshot._id, {
            reservedUnits: snapshot.reservedUnits - reservation.unitsRequested,
            availableUnits: snapshot.availableUnits + reservation.unitsRequested,
          });
        }
      }

      bookingIds.add(reservation.bookingId);
    }

    // Set affected bookings to Expired
    for (const bookingId of bookingIds) {
      const booking = await ctx.db.get(bookingId as Id<"bookings">);
      if (!booking) continue;

      // Only expire if booking is in Draft or DraftIncomplete
      if (booking.status === "Draft" || booking.status === "DraftIncomplete") {
        // Check if ALL reservations for this booking are now expired/declined/released
        const bookingReservations = await ctx.db
          .query("reservations")
          .withIndex("by_bookingId", (q: any) =>
            q.eq("bookingId", bookingId),
          )
          .collect();

        const hasActiveReservation = bookingReservations.some(
          (r: any) =>
            r.status === "Hold" ||
            r.status === "PendingAcceptance" ||
            r.status === "Confirmed",
        );

        if (!hasActiveReservation) {
          await ctx.db.patch(bookingId as Id<"bookings">, {
            status: "Expired",
          });
        }
      }
    }
  },
});

// ============================================================
// 7. autoCompleteBookings — Daily auto-completion (BOOKING_SPEC §4)
//    Internal mutation called by crons.ts daily
// ============================================================

// ============================================================
// 8. declineReservation — Stakeholder decline/cancel (BOOKING_SPEC §6)
//    Acceptance criteria #9-10
// ============================================================

export const declineReservation = mutation({
  args: {
    reservationId: v.id("reservations"),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const reservation = await ctx.db.get(args.reservationId);
    if (!reservation) throw new Error("Reservation not found");

    if (reservation.status !== "Hold" && reservation.status !== "PendingAcceptance") {
      throw new Error(
        `Cannot decline reservation in status "${reservation.status}" — must be Hold or PendingAcceptance`,
      );
    }

    // Set reservation to Declined
    await ctx.db.patch(args.reservationId, {
      status: "Declined",
      releasedAt: now,
      expiresAt: undefined,
    });

    // Increment AvailabilitySnapshot (same mutation — Invariant #3, AC #9)
    const sessions = await ctx.db
      .query("bookingSessions")
      .withIndex("by_bookingId", (q: any) =>
        q.eq("bookingId", reservation.bookingId),
      )
      .collect();

    const relevantSessions = sessions.filter(
      (s: any) => s.inventoryUnitId === reservation.inventoryUnitId,
    );

    for (const session of relevantSessions) {
      const snapshot = await ctx.db
        .query("availabilitySnapshots")
        .withIndex("by_inventoryUnitId_date_windowStart", (q: any) =>
          q
            .eq("inventoryUnitId", reservation.inventoryUnitId)
            .eq("date", session.date)
            .eq("windowStart", session.startTime),
        )
        .first();

      if (snapshot && snapshot.windowEnd === session.endTime) {
        await ctx.db.patch(snapshot._id, {
          reservedUnits: snapshot.reservedUnits - reservation.unitsRequested,
          availableUnits: snapshot.availableUnits + reservation.unitsRequested,
        });
      }
    }

    // Transition Booking to DraftIncomplete (same mutation — AC #10)
    const booking = await ctx.db.get(reservation.bookingId);
    if (
      booking &&
      booking.status !== "Cancelled" &&
      booking.status !== "Expired" &&
      booking.status !== "Completed"
    ) {
      await ctx.db.patch(reservation.bookingId, {
        status: "DraftIncomplete",
      });
    }
  },
});

// ============================================================
// 9. validateBookingLink — Token validation (BOOKING_SPEC §10, AC #14-15)
// ============================================================

export const validateBookingLink = mutation({
  args: {
    token: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const link = await ctx.db
      .query("bookingLinks")
      .withIndex("by_token", (q: any) => q.eq("token", args.token))
      .first();

    if (!link) throw new Error("Invalid booking link");

    // AC #14: single-use check
    if (link.usedAt) {
      throw new Error("This link has already been used.");
    }

    // AC #15: expiration check
    if (link.expiresAt < now) {
      throw new Error("This link has expired. Contact your booking operator.");
    }

    // Mark as used
    await ctx.db.patch(link._id, {
      usedAt: now,
    });

    return { bookingId: link.bookingId };
  },
});

// ============================================================
// 10. submitCustomerProfile — Customer profile submission (BOOKING_SPEC §8, AC #16)
// ============================================================

export const submitCustomerProfile = mutation({
  args: {
    bookingId: v.id("bookings"),
    linkToken: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    emergencyContact: v.string(),
    accommodationName: v.optional(v.string()),
    needsPickup: v.boolean(),
    medicalAnswers: v.any(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const booking = await ctx.db.get(args.bookingId);
    if (!booking) throw new Error("Booking not found");

    // Insert CustomerProfile
    const profileId = await ctx.db.insert("customerProfiles", {
      bookingId: args.bookingId,
      linkToken: args.linkToken,
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phone: args.phone,
      emergencyContact: args.emergencyContact,
      accommodationName: args.accommodationName,
      needsPickup: args.needsPickup,
      medicalAnswers: args.medicalAnswers,
      submittedAt: now,
    });

    // Patch booking with customer profile reference
    await ctx.db.patch(args.bookingId, {
      customerProfileId: profileId,
    });

    // AC #16: If booking is in Draft, transition to AwaitingConfirmation
    if (booking.status === "Draft") {
      await ctx.db.patch(args.bookingId, {
        status: "AwaitingConfirmation",
      });
    }
  },
});

// ============================================================
// 7. autoCompleteBookings — Daily auto-completion (BOOKING_SPEC §4)
//    Internal mutation called by crons.ts daily
// ============================================================

export const runAutoCompletion = internalMutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // Find all Confirmed bookings
    const confirmedBookings = await ctx.db
      .query("bookings")
      .withIndex("by_status", (q: any) => q.eq("status", "Confirmed"))
      .collect();

    for (const booking of confirmedBookings) {
      // Get all sessions for this booking
      const sessions = await ctx.db
        .query("bookingSessions")
        .withIndex("by_bookingId", (q: any) =>
          q.eq("bookingId", booking._id),
        )
        .collect();

      if (sessions.length === 0) continue;

      // Find the latest session endTime
      let latestEndMs = 0;
      for (const session of sessions) {
        // Combine date and endTime into a timestamp
        const endDateTime = new Date(`${session.date}T${session.endTime}`);
        const endMs = endDateTime.getTime();
        if (endMs > latestEndMs) {
          latestEndMs = endMs;
        }
      }

      // If the last session has ended, auto-complete
      if (latestEndMs > 0 && latestEndMs < now) {
        await ctx.db.patch(booking._id, {
          status: "Completed",
        });
      }
    }
  },
});
