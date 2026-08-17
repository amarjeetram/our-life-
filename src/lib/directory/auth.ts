// ============================================================
// AI Tool Directory — Auth Helpers
// src/lib/directory/auth.ts
// Uses Clerk for identity, Supabase for role storage.
//
// Security model:
//   Layer 1 — middleware.ts  : verifies Clerk session (Edge)
//   Layer 2 — layout.tsx     : verifies admin role, returns 404
//   Layer 3 — API handlers   : call requireAdmin() / requireAuth()
//                              which verify role in Supabase
//
// NEVER trust client-sent role claims.
// ============================================================

import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabaseServer } from "./supabase";
import type { DirProfile, UserRole } from "@/types/directory";

// ─────────────────────────────────────────────────────────────
// Profile helpers
// ─────────────────────────────────────────────────────────────

/**
 * Get or create a dir_profiles row for the current Clerk user.
 * Call this in API routes / server actions to ensure profile exists.
 */
export async function getOrCreateDirProfile(): Promise<DirProfile | null> {
  const user = await currentUser();
  if (!user) return null;

  const db = supabaseServer();

  const { data: existing } = await db
    .from("dir_profiles")
    .select("*")
    .eq("clerk_user_id", user.id)
    .maybeSingle();

  if (existing) return existing as DirProfile;

  const { data: created, error } = await db
    .from("dir_profiles")
    .upsert(
      {
        clerk_user_id: user.id,
        email: user.emailAddresses?.[0]?.emailAddress ?? null,
        display_name: user.fullName ?? user.username ?? null,
        avatar_url: user.imageUrl ?? null,
        role: "developer",
      },
      { onConflict: "clerk_user_id" }
    )
    .select()
    .maybeSingle();

  if (error || !created) {
    if (error) {
      console.error("[Directory] Failed to create dir_profile:", error.message || error.code || error);
    }
    // Fallback: query once more in case profile was created concurrently
    const { data: fallback } = await db
      .from("dir_profiles")
      .select("*")
      .eq("clerk_user_id", user.id)
      .maybeSingle();

    if (fallback) return fallback as DirProfile;
    return null;
  }

  return created as DirProfile;
}

/**
 * Get the current user's role from dir_profiles.
 * Returns null if not logged in or profile not found.
 * Source of truth is always Supabase — never client data.
 */
export async function getCurrentUserRole(): Promise<UserRole | null> {
  const { userId } = await auth();
  if (!userId) return null;

  const profile = await getOrCreateDirProfile();
  return (profile?.role as UserRole) ?? null;
}

// ─────────────────────────────────────────────────────────────
// Server-side guards (throw on failure — for pages / actions)
// ─────────────────────────────────────────────────────────────

/**
 * Assert the current user is an admin.
 * Use in Server Components (layout / page).
 * Throws if not authenticated or not admin.
 */
export async function requireAdmin(): Promise<DirProfile> {
  const profile = await getOrCreateDirProfile();
  if (!profile) throw new Error("UNAUTHENTICATED");
  if (profile.role !== "admin") throw new Error("UNAUTHORIZED: admin only");
  return profile;
}

/**
 * Assert the current user is authenticated (any role).
 * Use in Server Components and API routes that need a logged-in user.
 */
export async function requireAuth(): Promise<DirProfile> {
  const profile = await getOrCreateDirProfile();
  if (!profile) throw new Error("UNAUTHENTICATED");
  return profile;
}

// ─────────────────────────────────────────────────────────────
// API response guards (return NextResponse on failure)
// ─────────────────────────────────────────────────────────────

/**
 * Guard for /api/manage/* endpoints — returns 401/403 NextResponse on failure.
 * Returns the admin DirProfile on success.
 *
 * Usage:
 *   const result = await guardAdmin();
 *   if (result instanceof NextResponse) return result;
 *   const admin = result; // DirProfile
 */
export async function guardAdmin(): Promise<DirProfile | NextResponse> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const db = supabaseServer();
    const { data: profile } = await db
      .from("dir_profiles")
      .select("*")
      .eq("clerk_user_id", userId)
      .single();

    if (!profile) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 401 }
      );
    }

    if (profile.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: admin access required" },
        { status: 403 }
      );
    }

    return profile as DirProfile;
  } catch (err) {
    console.error("[Auth] guardAdmin error:", err);
    return NextResponse.json(
      { error: "Authentication error" },
      { status: 500 }
    );
  }
}

/**
 * Guard for authenticated-user API endpoints — returns 401 on failure.
 * Returns the DirProfile on success.
 *
 * Usage:
 *   const result = await guardAuth();
 *   if (result instanceof NextResponse) return result;
 *   const profile = result;
 */
export async function guardAuth(): Promise<DirProfile | NextResponse> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const profile = await getOrCreateDirProfile();
    if (!profile) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 401 }
      );
    }

    return profile;
  } catch (err) {
    console.error("[Auth] guardAuth error:", err);
    return NextResponse.json(
      { error: "Authentication error" },
      { status: 500 }
    );
  }
}
