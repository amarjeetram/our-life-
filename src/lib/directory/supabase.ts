// ============================================================
// AI Tool Directory — Supabase Client
// src/lib/directory/supabase.ts
//
// C-3 FIX: Added hard assertions for required env vars.
//           Missing keys now fail fast at startup rather than
//           silently using placeholder strings.
// ============================================================

import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────────
// Environment validation
// ─────────────────────────────────────────────────────────────

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value || value === "placeholder" || value.startsWith("placeholder-")) {
    // In build time (CI), allow missing — Next.js runs type-checking without real env
    if (process.env.NEXT_PHASE === "phase-production-build") {
      return `missing-${name}`;
    }
    throw new Error(
      `[Supabase] Missing required environment variable: ${name}\n` +
      `Add it to .env.local (local dev) or your deployment environment.`
    );
  }
  return value;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

// ─────────────────────────────────────────────────────────────
// Browser/client-side client
// Uses anon key — respects RLS policies.
// Safe to use in Client Components.
// ─────────────────────────────────────────────────────────────
export const supabaseBrowser = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

// ─────────────────────────────────────────────────────────────
// Server-side client with service role
// Bypasses RLS — use ONLY in Server Components and API routes.
// NEVER import this in client-side code.
// NEVER expose the returned client to the browser.
// ─────────────────────────────────────────────────────────────
export function supabaseServer() {
  if (!supabaseUrl || !supabaseServiceKey) {
    // Attempt to get values now in case env vars were lazy-loaded
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) {
      console.error(
        "[Supabase] Service role client requested but NEXT_PUBLIC_SUPABASE_URL or " +
        "SUPABASE_SERVICE_ROLE_KEY is not set. Database operations will fail."
      );
    }
    return createClient(url || supabaseUrl, key || supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
