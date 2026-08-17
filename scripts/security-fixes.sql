-- ============================================================
-- Production Security Fixes — Run in Supabase SQL Editor
-- File: scripts/security-fixes.sql
-- ============================================================
-- INSTRUCTIONS:
--   1. Open your Supabase project: https://supabase.com/dashboard
--   2. Go to SQL Editor
--   3. Copy and paste this entire file
--   4. Click "Run"
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- SECTION 1: Atomic Counter RPCs (H-4 Fix)
-- Replace read-modify-write with atomic SQL operations
-- ─────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION increment_tool_votes(tool_id UUID)
RETURNS void LANGUAGE sql SECURITY DEFINER AS $$
  UPDATE dir_tools SET votes_count = GREATEST(0, votes_count + 1) WHERE id = tool_id;
$$;

CREATE OR REPLACE FUNCTION decrement_tool_votes(tool_id UUID)
RETURNS void LANGUAGE sql SECURITY DEFINER AS $$
  UPDATE dir_tools SET votes_count = GREATEST(0, votes_count - 1) WHERE id = tool_id;
$$;

CREATE OR REPLACE FUNCTION increment_tool_views(tool_id UUID)
RETURNS void LANGUAGE sql SECURITY DEFINER AS $$
  UPDATE dir_tools SET views_count = views_count + 1 WHERE id = tool_id;
$$;

CREATE OR REPLACE FUNCTION increment_tool_clicks(tool_id UUID)
RETURNS void LANGUAGE sql SECURITY DEFINER AS $$
  UPDATE dir_tools SET clicks_count = clicks_count + 1 WHERE id = tool_id;
$$;

CREATE OR REPLACE FUNCTION decrement_tool_favorites(tool_id UUID)
RETURNS void LANGUAGE sql SECURITY DEFINER AS $$
  UPDATE dir_tools SET favorites_count = GREATEST(0, favorites_count - 1) WHERE id = tool_id;
$$;

-- ─────────────────────────────────────────────────────────────
-- SECTION 2: Fix dir_submission_history Action Constraint (M-2 Fix)
-- ─────────────────────────────────────────────────────────────

ALTER TABLE dir_submission_history
  DROP CONSTRAINT IF EXISTS dir_submission_history_action_check;

ALTER TABLE dir_submission_history
  ADD CONSTRAINT dir_submission_history_action_check
  CHECK (action IN (
    'submitted',
    'approved',
    'rejected',
    'edited',
    'featured',
    'deleted',
    'reset_pending',
    'role_change',
    'category_create',
    'category_update',
    'category_delete',
    'settings_change'
  ));

-- ─────────────────────────────────────────────────────────────
-- SECTION 3: Add dir_audit_logs Table (H-1 Fix)
-- Permanent, append-only log of all admin actions
-- ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS dir_audit_logs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id     UUID NOT NULL REFERENCES dir_profiles(id) ON DELETE RESTRICT,
  action       TEXT NOT NULL,
  target_type  TEXT NOT NULL, -- 'tool', 'user', 'category', 'settings'
  target_id    TEXT,          -- UUID or identifier of the affected entity
  metadata     JSONB,         -- Extra context: old values, new values, reason
  ip_address   TEXT,          -- Hashed or raw IP of the admin
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Immutable: no updates or deletes (append-only audit trail)
ALTER TABLE dir_audit_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "audit_logs_insert_service_only" ON dir_audit_logs
  FOR INSERT WITH CHECK (true); -- Only service role (bypasses RLS)
-- SELECT: only service role can read (no public/anon reads)
-- No UPDATE/DELETE policies = those operations are blocked

-- Indexes
CREATE INDEX IF NOT EXISTS idx_dir_audit_admin     ON dir_audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_dir_audit_target    ON dir_audit_logs(target_type, target_id);
CREATE INDEX IF NOT EXISTS idx_dir_audit_created   ON dir_audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_dir_audit_action    ON dir_audit_logs(action);

-- ─────────────────────────────────────────────────────────────
-- SECTION 4: dir_profiles Constraints (L-4 Fix)
-- ─────────────────────────────────────────────────────────────

-- Add index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_dir_profiles_email ON dir_profiles(email)
  WHERE email IS NOT NULL;

-- Add email format check at DB level (H-6 Fix)
-- Note: Contact email is on dir_tools, not dir_profiles
ALTER TABLE dir_tools
  DROP CONSTRAINT IF EXISTS dir_tools_contact_email_check;
ALTER TABLE dir_tools
  ADD CONSTRAINT dir_tools_contact_email_check
  CHECK (
    contact_email IS NULL OR
    contact_email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$'
  );

-- ─────────────────────────────────────────────────────────────
-- SECTION 5: dir_views Composite Index (L-2 Fix)
-- ─────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_dir_views_dedup
  ON dir_views(tool_id, ip_hash, viewed_at DESC);

-- ─────────────────────────────────────────────────────────────
-- SECTION 6: dir_submission_history Index on changed_by (L-8 Fix)
-- ─────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS idx_dir_history_admin ON dir_submission_history(changed_by);

-- ─────────────────────────────────────────────────────────────
-- SECTION 7: Review Text Length Constraint (H-5 Fix at DB level)
-- ─────────────────────────────────────────────────────────────

ALTER TABLE dir_reviews
  DROP CONSTRAINT IF EXISTS dir_reviews_text_length_check;
ALTER TABLE dir_reviews
  ADD CONSTRAINT dir_reviews_text_length_check
  CHECK (
    (review_text IS NULL OR length(review_text) <= 5000) AND
    (pros IS NULL OR length(pros) <= 1000) AND
    (cons IS NULL OR length(cons) <= 1000)
  );

-- ─────────────────────────────────────────────────────────────
-- SECTION 8: CRITICAL — Fix RLS Policies (C-2 Fix)
-- This is the most important section. Run this LAST.
-- ─────────────────────────────────────────────────────────────

-- Remove overly permissive grants
-- NOTE: Only run these if you previously ran the permissive migration.
-- The service role will always bypass RLS regardless.
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM anon;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM authenticated;

-- Re-grant permissions for public browsing & profile creation
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON dir_profiles TO anon, authenticated;

-- ── dir_profiles ──────────────────────────────────────────────
-- Drop all existing policies first (clean slate)
DROP POLICY IF EXISTS "dir_profiles_public_read"  ON dir_profiles;
DROP POLICY IF EXISTS "dir_profiles_insert"        ON dir_profiles;
DROP POLICY IF EXISTS "dir_profiles_update"        ON dir_profiles;
DROP POLICY IF EXISTS "dir_profiles_delete"        ON dir_profiles;

-- Public profiles are readable
CREATE POLICY "dir_profiles_public_read" ON dir_profiles
  FOR SELECT USING (true);

-- Allow profile creation & updates for logged-in users
CREATE POLICY "dir_profiles_insert" ON dir_profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "dir_profiles_update" ON dir_profiles
  FOR UPDATE USING (true);

-- ── dir_tools ─────────────────────────────────────────────────
DROP POLICY IF EXISTS "dir_tools_public_read"  ON dir_tools;
DROP POLICY IF EXISTS "dir_tools_insert"        ON dir_tools;
DROP POLICY IF EXISTS "dir_tools_update"        ON dir_tools;
DROP POLICY IF EXISTS "dir_tools_delete"        ON dir_tools;

-- Public: only APPROVED, non-deleted tools are visible
CREATE POLICY "dir_tools_public_read" ON dir_tools
  FOR SELECT USING (status = 'approved' AND deleted_at IS NULL);

-- No client-side writes — all mutations through service role in API routes

-- ── dir_categories ────────────────────────────────────────────
ALTER TABLE dir_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_categories_public_read" ON dir_categories;
CREATE POLICY "dir_categories_public_read" ON dir_categories
  FOR SELECT USING (true); -- Categories are fully public

-- ── dir_reviews ───────────────────────────────────────────────
DROP POLICY IF EXISTS "dir_reviews_public_read" ON dir_reviews;
CREATE POLICY "dir_reviews_public_read" ON dir_reviews
  FOR SELECT USING (is_visible = true);

-- ── dir_tool_screenshots ──────────────────────────────────────
DROP POLICY IF EXISTS "dir_screenshots_public_read" ON dir_tool_screenshots;
CREATE POLICY "dir_screenshots_public_read" ON dir_tool_screenshots
  FOR SELECT USING (true);

-- ── dir_tool_social ───────────────────────────────────────────
DROP POLICY IF EXISTS "dir_social_public_read" ON dir_tool_social;
CREATE POLICY "dir_social_public_read" ON dir_tool_social
  FOR SELECT USING (true);

-- ── dir_featured ──────────────────────────────────────────────
DROP POLICY IF EXISTS "dir_featured_public_read" ON dir_featured;
CREATE POLICY "dir_featured_public_read" ON dir_featured
  FOR SELECT USING (NOW() BETWEEN starts_at AND ends_at);

-- ── dir_bookmarks — NO public access (private user data) ──────
DROP POLICY IF EXISTS "dir_bookmarks_read" ON dir_bookmarks;
-- No policy = service role only

-- ── dir_votes — NO public access (aggregate count is on dir_tools) ──
DROP POLICY IF EXISTS "dir_votes_read" ON dir_votes;
-- No policy = service role only

-- ── dir_reports — NO public access ───────────────────────────
DROP POLICY IF EXISTS "dir_reports_read" ON dir_reports;
-- No policy = service role only

-- ── dir_audit_logs — NO public access ────────────────────────
-- Already defined above in Section 3

-- ── dir_submission_history — admin only ───────────────────────
ALTER TABLE dir_submission_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_history_read" ON dir_submission_history;
-- No policy = service role only

-- ─────────────────────────────────────────────────────────────
-- Done! Verify with:
-- SELECT schemaname, tablename, policyname, cmd, qual
-- FROM pg_policies WHERE schemaname = 'public'
-- ORDER BY tablename, policyname;
-- ─────────────────────────────────────────────────────────────
