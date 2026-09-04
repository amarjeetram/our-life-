// src/middleware.ts
// Layer 1 of defense: ensure every /manage and /api/manage/* request
// has a valid Clerk session. Role verification (admin-only) is done
// server-side in layout.tsx and each API route — middleware only
// handles authentication, never authorization, because Supabase role
// lookups require Node.js runtime which is not available in Edge.
//
// FIX (Clerk v7): In v7, auth() inside clerkMiddleware is async.
// auth.protect() is also async. Both must be awaited correctly.
// The async keyword is added to the callback for proper resolution.

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse, NextFetchEvent } from "next/server";

// Routes that require a Clerk session (authentication gate only)
const isAdminRoute = createRouteMatcher([
  "/manage(.*)",
  "/api/manage(.*)",
]);

// Routes that require any authenticated user (developer / submitter)
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/api/directory/bookmarks(.*)",
  "/api/directory/votes(.*)",
  "/api/directory/reviews(.*)",
]);

const clerkHandler = clerkMiddleware(async (auth, req) => {
  // All /manage + /api/manage/* require a Clerk session.
  if (isAdminRoute(req)) {
    const authObj = await auth();
    if (!authObj.userId) {
      if (req.nextUrl.pathname.startsWith("/api/")) {
        return NextResponse.json(
          { error: "Authentication required" },
          { status: 401 }
        );
      }
      // For page routes: redirect to Clerk sign-in
      return authObj.redirectToSignIn();
    }
    // NOTE: admin role verification is done inside layout.tsx and each
    // /api/manage/* handler. Middleware cannot call Supabase at Edge.
    return NextResponse.next();
  }

  // Standard protected routes — just need a Clerk session
  if (isProtectedRoute(req)) {
    const authObj = await auth();
    if (!authObj.userId) {
      return authObj.redirectToSignIn();
    }
  }
});

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  const userAgent = req.headers.get("user-agent") || "";

  // 1. Immediately bypass Clerk for Search Engine crawlers and Google Inspection tools
  // This prevents Clerk development handshake redirects (307) which cause Google Search Console "Redirect error"
  const isSearchBot = /Googlebot|Google-InspectionTool|Google-PageSpeed|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|facebot|facebookexternalhit/i.test(userAgent);
  if (isSearchBot) {
    return NextResponse.next();
  }

  // 2. Bypass Clerk for purely public content routes (blogs, static tools, sitemaps, robots.txt)
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith("/blog") ||
    pathname.startsWith("/images") ||
    pathname === "/sitemap.xml" ||
    pathname === "/robots.txt"
  ) {
    return NextResponse.next();
  }

  return clerkHandler(req, event);
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
