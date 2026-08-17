// src/middleware.ts
// Layer 1 of defense: ensure every /manage and /api/manage/* request
// has a valid Clerk session. Role verification (admin-only) is done
// server-side in layout.tsx and each API route — middleware only
// handles authentication, never authorization, because Supabase role
// lookups require Node.js runtime which is not available in Edge.

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Routes that require a Clerk session (authentication gate only)
const isAdminRoute = createRouteMatcher([
  "/manage(.*)",
  "/api/manage(.*)",
]);

// Routes that require any authenticated user (developer / submitter)
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/directory/tools",
  "/api/directory/bookmarks(.*)",
  "/api/directory/votes(.*)",
  "/api/directory/reviews(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // All /manage + /api/manage/* require a Clerk session.
  // If no session → return 401 for API, redirect to sign-in for pages.
  if (isAdminRoute(req)) {
    const { userId } = await auth();
    if (!userId) {
      if (req.nextUrl.pathname.startsWith("/api/")) {
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }
      // For page routes: protect() will redirect to Clerk sign-in
      await auth.protect();
    }
    // NOTE: admin role verification (role === 'admin') is done inside
    // the layout (→ returns 404) and each /api/manage/* handler (→ 403).
    // Middleware cannot call Supabase safely at Edge.
    return NextResponse.next();
  }

  // Standard protected routes — just need a Clerk session
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    "/__clerk/:path*",
  ],
};
