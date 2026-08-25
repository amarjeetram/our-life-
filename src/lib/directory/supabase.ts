// ============================================================
// AI Tool Directory — Supabase Client
// src/lib/directory/supabase.ts
//
// FIX: Lazy-initialize all clients so Vercel build-time page
//      data collection doesn't crash when env vars are absent.
// ============================================================

import { createClient, SupabaseClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────────
// Check if we are in Next.js production build phase
// (env vars may not be available during static analysis)
// ─────────────────────────────────────────────────────────────
const isBuildTime =
  process.env.NEXT_PHASE === "phase-production-build" ||
  process.env.NEXT_PHASE === "phase-export";

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

// ─────────────────────────────────────────────────────────────
// Browser/client-side client (lazy getter)
// Uses anon key — respects RLS policies.
// Safe to use in Client Components.
// ─────────────────────────────────────────────────────────────
let _supabaseBrowser: SupabaseClient | null = null;

export function supabaseBrowser(): SupabaseClient {
  if (_supabaseBrowser) return _supabaseBrowser;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    if (isBuildTime) {
      // Return a dummy client during build — will never be called at runtime
      _supabaseBrowser = createClient("https://placeholder.supabase.co", "placeholder-key", {
        auth: { persistSession: false },
      });
      return _supabaseBrowser;
    }
    throw new Error(
      "[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY.\n" +
      "Add them to .env.local (local dev) or your Vercel project environment variables."
    );
  }

  _supabaseBrowser = createClient(url, anonKey, {
    auth: { persistSession: false },
  });
  return _supabaseBrowser;
}

// ─────────────────────────────────────────────────────────────
// Server-side client with service role (lazy)
// Bypasses RLS — use ONLY in Server Components and API routes.
// NEVER import this in client-side code.
// NEVER expose the returned client to the browser.
// ─────────────────────────────────────────────────────────────
export function supabaseServer(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    if (isBuildTime) {
      return createClient("https://placeholder.supabase.co", "placeholder-key", {
        auth: { persistSession: false, autoRefreshToken: false },
      });
    }
    console.error(
      "[Supabase] Service role client requested but NEXT_PUBLIC_SUPABASE_URL or " +
      "SUPABASE_SERVICE_ROLE_KEY is not set. Database operations will fail."
    );
    return createClient(url || "", key || "", {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
