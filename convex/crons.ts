import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "ttl-cleanup",
  { minutes: 15 },
  internal.bookings.runTTLCleanup,
);

crons.daily(
  "auto-completion",
  { hourUTC: 2, minuteUTC: 0 },
  internal.bookings.runAutoCompletion,
);

export default crons;
