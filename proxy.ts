import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Protected routes — all 10 stakeholder dashboards require Clerk auth.
 * /customer is NOT protected — uses tokenized BookingLink (no Clerk auth).
 */
const isProtectedRoute = createRouteMatcher([
  "/dc(.*)",
  "/agent(.*)",
  "/liveaboard(.*)",
  "/resort(.*)",
  "/instructor(.*)",
  "/boat(.*)",
  "/gear(.*)",
  "/pool(.*)",
  "/air(.*)",
  "/site(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, always run for API routes
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
