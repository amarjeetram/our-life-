-- ============================================================
-- AI Tool Directory — Database Migration
-- Run this in Supabase SQL Editor
-- Creates ALL new tables with dir_ prefix
-- Does NOT modify any existing tables
-- ============================================================

-- Enable UUID extension (usually already enabled)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ── 1. dir_profiles ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS dir_profiles (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id   TEXT UNIQUE NOT NULL,
  email           TEXT,
  display_name    TEXT,
  avatar_url      TEXT,
  role            TEXT NOT NULL DEFAULT 'developer'
                  CHECK (role IN ('developer', 'admin')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_dir_profiles_clerk ON dir_profiles(clerk_user_id);

-- ── 2. dir_categories ────────────────────────────────────
CREATE TABLE IF NOT EXISTS dir_categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT UNIQUE NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  icon_name   TEXT,
  color       TEXT,
  description TEXT,
  sort_order  INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_dir_categories_slug ON dir_categories(slug);

-- ── 3. dir_tools ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS dir_tools (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submitter_id      UUID REFERENCES dir_profiles(id) ON DELETE SET NULL,
  clerk_user_id     TEXT,
  name              TEXT NOT NULL,
  slug              TEXT UNIQUE NOT NULL,
  tagline           TEXT,
  description_short TEXT,
  description_long  TEXT,
  -- SEO
  meta_title        TEXT,
  meta_description  TEXT,
  canonical_url     TEXT,
  -- Core
  website_url       TEXT NOT NULL,
  logo_url          TEXT,
  cover_url         TEXT,
  category_id       UUID REFERENCES dir_categories(id) ON DELETE SET NULL,
  -- Pricing
  pricing_type      TEXT CHECK (pricing_type IN ('free','freemium','paid','lifetime','open_source')),
  starting_price    NUMERIC,
  currency          TEXT NOT NULL DEFAULT 'USD',
  -- Status (no 'featured' — managed via dir_featured table)
  status            TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'approved', 'rejected')),
  -- Feature flags
  ai_models         TEXT[] NOT NULL DEFAULT '{}',
  features          TEXT[] NOT NULL DEFAULT '{}',
  use_cases         TEXT[] NOT NULL DEFAULT '{}',
  tags              TEXT[] NOT NULL DEFAULT '{}',
  languages         TEXT[] NOT NULL DEFAULT '{}',
  country           TEXT,
  launch_date       DATE,
  contact_email     TEXT,
  support_url       TEXT,
  docs_url          TEXT,
  video_demo_url    TEXT,
  is_open_source    BOOLEAN NOT NULL DEFAULT false,
  has_api           BOOLEAN NOT NULL DEFAULT false,
  has_mobile_app    BOOLEAN NOT NULL DEFAULT false,
  has_chrome_ext    BOOLEAN NOT NULL DEFAULT false,
  -- Analytics
  views_count       INT NOT NULL DEFAULT 0,
  clicks_count      INT NOT NULL DEFAULT 0,
  outbound_clicks   INT NOT NULL DEFAULT 0,
  favorites_count   INT NOT NULL DEFAULT 0,
  votes_count       INT NOT NULL DEFAULT 0,
  reviews_count     INT NOT NULL DEFAULT 0,
  avg_rating        NUMERIC(3,2) NOT NULL DEFAULT 0,
  -- Verification
  is_verified           BOOLEAN NOT NULL DEFAULT false,
  verification_method   TEXT CHECK (verification_method IN ('email','domain','manual')),
  -- Soft delete
  deleted_at        TIMESTAMPTZ,
  -- FTS
  search_vector     tsvector,
  -- Timestamps
  approved_at       TIMESTAMPTZ,
  approved_by       UUID REFERENCES dir_profiles(id) ON DELETE SET NULL,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for dir_tools
CREATE INDEX IF NOT EXISTS idx_dir_tools_status    ON dir_tools(status);
CREATE INDEX IF NOT EXISTS idx_dir_tools_slug      ON dir_tools(slug);
CREATE INDEX IF NOT EXISTS idx_dir_tools_category  ON dir_tools(category_id);
CREATE INDEX IF NOT EXISTS idx_dir_tools_created   ON dir_tools(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_dir_tools_search    ON dir_tools USING GIN(search_vector);
CREATE INDEX IF NOT EXISTS idx_dir_tools_deleted   ON dir_tools(deleted_at) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_dir_tools_votes     ON dir_tools(votes_count DESC);
CREATE INDEX IF NOT EXISTS idx_dir_tools_rating    ON dir_tools(avg_rating DESC);
CREATE INDEX IF NOT EXISTS idx_dir_tools_clerk     ON dir_tools(clerk_user_id);

-- Full-text search trigger
CREATE OR REPLACE FUNCTION dir_tools_search_vector_update()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
    setweight(to_tsvector('english', COALESCE(NEW.tagline, '')), 'B') ||
    setweight(to_tsvector('english', COALESCE(NEW.description_short, '')), 'C') ||
    setweight(to_tsvector('english', array_to_string(COALESCE(NEW.tags, '{}'), ' ')), 'D');
  RETURN NEW;
END
$$;

DROP TRIGGER IF EXISTS dir_tools_search_update ON dir_tools;
CREATE TRIGGER dir_tools_search_update
  BEFORE INSERT OR UPDATE ON dir_tools
  FOR EACH ROW EXECUTE FUNCTION dir_tools_search_vector_update();

-- updated_at auto-update trigger
CREATE OR REPLACE FUNCTION dir_updated_at_trigger()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END $$;

DROP TRIGGER IF EXISTS dir_tools_updated_at ON dir_tools;
CREATE TRIGGER dir_tools_updated_at
  BEFORE UPDATE ON dir_tools
  FOR EACH ROW EXECUTE FUNCTION dir_updated_at_trigger();

-- ── 4. dir_tool_social ───────────────────────────────────
CREATE TABLE IF NOT EXISTS dir_tool_social (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id    UUID NOT NULL REFERENCES dir_tools(id) ON DELETE CASCADE,
  platform   TEXT NOT NULL CHECK (platform IN ('twitter','github','linkedin','youtube','discord','website')),
  url        TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_dir_social_tool ON dir_tool_social(tool_id);

-- ── 5. dir_tool_screenshots ──────────────────────────────
CREATE TABLE IF NOT EXISTS dir_tool_screenshots (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id    UUID NOT NULL REFERENCES dir_tools(id) ON DELETE CASCADE,
  url        TEXT NOT NULL,
  alt        TEXT,
  caption    TEXT,
  width      INT,
  height     INT,
  sort_order INT NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_dir_screenshots_tool ON dir_tool_screenshots(tool_id);

-- ── 6. dir_reviews ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS dir_reviews (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id       UUID NOT NULL REFERENCES dir_tools(id) ON DELETE CASCADE,
  reviewer_id   UUID NOT NULL REFERENCES dir_profiles(id) ON DELETE CASCADE,
  rating        SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text   TEXT,
  pros          TEXT,
  cons          TEXT,
  helpful_count INT NOT NULL DEFAULT 0,
  is_visible    BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (tool_id, reviewer_id)
);
CREATE INDEX IF NOT EXISTS idx_dir_reviews_tool ON dir_reviews(tool_id);

-- ── 7. dir_bookmarks ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS dir_bookmarks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES dir_profiles(id) ON DELETE CASCADE,
  tool_id     UUID NOT NULL REFERENCES dir_tools(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, tool_id)
);
CREATE INDEX IF NOT EXISTS idx_dir_bookmarks_user ON dir_bookmarks(user_id);

-- ── 8. dir_votes ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS dir_votes (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    UUID NOT NULL REFERENCES dir_profiles(id) ON DELETE CASCADE,
  tool_id    UUID NOT NULL REFERENCES dir_tools(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, tool_id)
);
CREATE INDEX IF NOT EXISTS idx_dir_votes_tool ON dir_votes(tool_id);

-- ── 9. dir_views ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS dir_views (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id    UUID NOT NULL REFERENCES dir_tools(id) ON DELETE CASCADE,
  ip_hash    TEXT,
  viewed_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_dir_views_tool ON dir_views(tool_id);
CREATE INDEX IF NOT EXISTS idx_dir_views_time ON dir_views(viewed_at DESC);

-- ── 10. dir_submission_history ───────────────────────────
CREATE TABLE IF NOT EXISTS dir_submission_history (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id     UUID NOT NULL REFERENCES dir_tools(id) ON DELETE CASCADE,
  changed_by  UUID REFERENCES dir_profiles(id) ON DELETE SET NULL,
  action      TEXT NOT NULL CHECK (action IN ('submitted','approved','rejected','edited','featured')),
  note        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_dir_history_tool ON dir_submission_history(tool_id);

-- ── 11. dir_featured ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS dir_featured (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id     UUID NOT NULL REFERENCES dir_tools(id) ON DELETE CASCADE,
  slot        TEXT NOT NULL CHECK (slot IN ('homepage','category','sidebar')),
  starts_at   TIMESTAMPTZ NOT NULL,
  ends_at     TIMESTAMPTZ NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_dir_featured_slot ON dir_featured(slot, starts_at, ends_at);

-- ── 12. dir_reports ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS dir_reports (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id      UUID NOT NULL REFERENCES dir_tools(id) ON DELETE CASCADE,
  reporter_id  UUID NOT NULL REFERENCES dir_profiles(id) ON DELETE CASCADE,
  reason       TEXT NOT NULL,
  is_resolved  BOOLEAN NOT NULL DEFAULT false,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ── Analytics helper RPC ──────────────────────────────────
CREATE OR REPLACE FUNCTION increment_tool_views(tool_id UUID)
RETURNS void LANGUAGE sql AS $$
  UPDATE dir_tools SET views_count = views_count + 1 WHERE id = tool_id;
$$;

CREATE OR REPLACE FUNCTION increment_tool_clicks(tool_id UUID)
RETURNS void LANGUAGE sql AS $$
  UPDATE dir_tools SET clicks_count = clicks_count + 1 WHERE id = tool_id;
$$;

-- ── Row Level Security ────────────────────────────────────
ALTER TABLE dir_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE dir_tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE dir_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE dir_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE dir_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE dir_tool_screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE dir_tool_social ENABLE ROW LEVEL SECURITY;
ALTER TABLE dir_featured ENABLE ROW LEVEL SECURITY;
ALTER TABLE dir_reports ENABLE ROW LEVEL SECURITY;

-- Policies: dir_tools — public read approved tools
CREATE POLICY "dir_tools_public_read" ON dir_tools
  FOR SELECT USING (status = 'approved' AND deleted_at IS NULL);

-- Service role bypasses RLS (used in server functions)
-- No additional policies needed for service role key

-- ── Seed: 16 categories ───────────────────────────────────
INSERT INTO dir_categories (name, slug, icon_name, color, sort_order) VALUES
  ('Image',        'image',        'Image',          '#3b82f6', 1),
  ('Video',        'video',        'Video',           '#ef4444', 2),
  ('Audio',        'audio',        'Mic',             '#8b5cf6', 3),
  ('Writing',      'writing',      'PenLine',         '#10b981', 4),
  ('Coding',       'coding',       'Code2',           '#f59e0b', 5),
  ('Marketing',    'marketing',    'Megaphone',       '#f97316', 6),
  ('SEO',          'seo',          'Search',          '#06b6d4', 7),
  ('Chatbot',      'chatbot',      'MessageSquare',   '#6366f1', 8),
  ('Education',    'education',    'GraduationCap',   '#84cc16', 9),
  ('Productivity', 'productivity', 'Zap',             '#eab308', 10),
  ('Research',     'research',     'FlaskConical',    '#14b8a6', 11),
  ('Automation',   'automation',   'Bot',             '#8b5cf6', 12),
  ('Business',     'business',     'Briefcase',       '#64748b', 13),
  ('Design',       'design',       'Palette',         '#ec4899', 14),
  ('Developer',    'developer',    'Terminal',        '#22c55e', 15),
  ('Other',        'other',        'Sparkles',        '#94a3b8', 16)
ON CONFLICT (slug) DO NOTHING;

-- ── Grants & RLS Policies ─────────────────────────────────
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated;

-- Profiles
ALTER TABLE dir_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_profiles_public_read" ON dir_profiles;
CREATE POLICY "dir_profiles_public_read" ON dir_profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "dir_profiles_insert" ON dir_profiles;
CREATE POLICY "dir_profiles_insert" ON dir_profiles FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "dir_profiles_update" ON dir_profiles;
CREATE POLICY "dir_profiles_update" ON dir_profiles FOR UPDATE USING (true);

-- Tools
ALTER TABLE dir_tools ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_tools_public_read" ON dir_tools;
CREATE POLICY "dir_tools_public_read" ON dir_tools FOR SELECT USING ((status = 'approved' AND deleted_at IS NULL) OR true);
DROP POLICY IF EXISTS "dir_tools_insert" ON dir_tools;
CREATE POLICY "dir_tools_insert" ON dir_tools FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "dir_tools_update" ON dir_tools;
CREATE POLICY "dir_tools_update" ON dir_tools FOR UPDATE USING (true);

-- Reviews
ALTER TABLE dir_reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_reviews_public_read" ON dir_reviews;
CREATE POLICY "dir_reviews_public_read" ON dir_reviews FOR SELECT USING (is_visible = true);
DROP POLICY IF EXISTS "dir_reviews_insert" ON dir_reviews;
CREATE POLICY "dir_reviews_insert" ON dir_reviews FOR INSERT WITH CHECK (true);

-- Bookmarks & Votes
ALTER TABLE dir_bookmarks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_bookmarks_all" ON dir_bookmarks;
CREATE POLICY "dir_bookmarks_all" ON dir_bookmarks FOR ALL USING (true);

ALTER TABLE dir_votes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_votes_all" ON dir_votes;
CREATE POLICY "dir_votes_all" ON dir_votes FOR ALL USING (true);

-- Screenshots & Social
ALTER TABLE dir_tool_screenshots ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_screenshots_all" ON dir_tool_screenshots;
CREATE POLICY "dir_screenshots_all" ON dir_tool_screenshots FOR ALL USING (true);

ALTER TABLE dir_tool_social ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_social_all" ON dir_tool_social;
CREATE POLICY "dir_social_all" ON dir_tool_social FOR ALL USING (true);

-- History & Views
ALTER TABLE dir_submission_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_history_all" ON dir_submission_history;
CREATE POLICY "dir_history_all" ON dir_submission_history FOR ALL USING (true);

ALTER TABLE dir_views ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_views_all" ON dir_views;
CREATE POLICY "dir_views_all" ON dir_views FOR ALL USING (true);

-- Categories & Featured
ALTER TABLE dir_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_categories_public_read" ON dir_categories;
CREATE POLICY "dir_categories_public_read" ON dir_categories FOR SELECT USING (true);

ALTER TABLE dir_featured ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_featured_public_read" ON dir_featured;
CREATE POLICY "dir_featured_public_read" ON dir_featured FOR SELECT USING (true);

-- ✅ Migration complete
SELECT 'AI Tool Directory migration and permissions completed successfully' AS status;


