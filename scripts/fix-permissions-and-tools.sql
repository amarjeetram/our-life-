-- ============================================================
-- Fix Permissions & Enable All Tools for Directory + Admin
-- Run this script in Supabase SQL Editor
-- File: scripts/fix-permissions-and-tools.sql
-- ============================================================

-- 1. Grant full schema & table permissions to anon and authenticated
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated;

-- 2. Update dir_tools RLS policies (allow SELECT, INSERT, UPDATE)
ALTER TABLE dir_tools ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_tools_public_read" ON dir_tools;
DROP POLICY IF EXISTS "dir_tools_select"      ON dir_tools;
DROP POLICY IF EXISTS "dir_tools_insert"      ON dir_tools;
DROP POLICY IF EXISTS "dir_tools_update"      ON dir_tools;
DROP POLICY IF EXISTS "dir_tools_delete"      ON dir_tools;

CREATE POLICY "dir_tools_select" ON dir_tools FOR SELECT USING (true);
CREATE POLICY "dir_tools_insert" ON dir_tools FOR INSERT WITH CHECK (true);
CREATE POLICY "dir_tools_update" ON dir_tools FOR UPDATE USING (true);

-- 3. Update dir_profiles RLS policies
ALTER TABLE dir_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_profiles_public_read" ON dir_profiles;
DROP POLICY IF EXISTS "dir_profiles_select"      ON dir_profiles;
DROP POLICY IF EXISTS "dir_profiles_insert"      ON dir_profiles;
DROP POLICY IF EXISTS "dir_profiles_update"      ON dir_profiles;

CREATE POLICY "dir_profiles_select" ON dir_profiles FOR SELECT USING (true);
CREATE POLICY "dir_profiles_insert" ON dir_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "dir_profiles_update" ON dir_profiles FOR UPDATE USING (true);

-- 4. Update dir_categories RLS policies
ALTER TABLE dir_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_categories_public_read" ON dir_categories;
DROP POLICY IF EXISTS "dir_categories_select"      ON dir_categories;
DROP POLICY IF EXISTS "dir_categories_insert"      ON dir_categories;
DROP POLICY IF EXISTS "dir_categories_update"      ON dir_categories;

CREATE POLICY "dir_categories_select" ON dir_categories FOR SELECT USING (true);
CREATE POLICY "dir_categories_insert" ON dir_categories FOR INSERT WITH CHECK (true);
CREATE POLICY "dir_categories_update" ON dir_categories FOR UPDATE USING (true);

-- 5. Update dir_reviews RLS policies
ALTER TABLE dir_reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_reviews_public_read" ON dir_reviews;
DROP POLICY IF EXISTS "dir_reviews_select"      ON dir_reviews;
DROP POLICY IF EXISTS "dir_reviews_insert"      ON dir_reviews;
DROP POLICY IF EXISTS "dir_reviews_update"      ON dir_reviews;

CREATE POLICY "dir_reviews_select" ON dir_reviews FOR SELECT USING (true);
CREATE POLICY "dir_reviews_insert" ON dir_reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "dir_reviews_update" ON dir_reviews FOR UPDATE USING (true);

-- 6. Update dir_tool_screenshots & dir_tool_social RLS
ALTER TABLE dir_tool_screenshots ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_screenshots_public_read" ON dir_tool_screenshots;
DROP POLICY IF EXISTS "dir_screenshots_select"      ON dir_tool_screenshots;
DROP POLICY IF EXISTS "dir_screenshots_insert"      ON dir_tool_screenshots;

CREATE POLICY "dir_screenshots_select" ON dir_tool_screenshots FOR SELECT USING (true);
CREATE POLICY "dir_screenshots_insert" ON dir_tool_screenshots FOR INSERT WITH CHECK (true);

ALTER TABLE dir_tool_social ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_social_public_read" ON dir_tool_social;
DROP POLICY IF EXISTS "dir_social_select"      ON dir_tool_social;
DROP POLICY IF EXISTS "dir_social_insert"      ON dir_tool_social;

CREATE POLICY "dir_social_select" ON dir_tool_social FOR SELECT USING (true);
CREATE POLICY "dir_social_insert" ON dir_tool_social FOR INSERT WITH CHECK (true);

-- 7. Update dir_submission_history
ALTER TABLE dir_submission_history ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "dir_history_select" ON dir_submission_history;
DROP POLICY IF EXISTS "dir_history_insert" ON dir_submission_history;

CREATE POLICY "dir_history_select" ON dir_submission_history FOR SELECT USING (true);
CREATE POLICY "dir_history_insert" ON dir_submission_history FOR INSERT WITH CHECK (true);

-- 8. Seed categories if missing
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

-- 9. Auto-approve all pending tools so they immediately show up on directory website & admin dashboard
UPDATE dir_tools
SET status = 'approved', approved_at = NOW()
WHERE status = 'pending' OR status IS NULL;

-- 10. Make sure all profiles have role = 'admin' for local testing
UPDATE dir_profiles
SET role = 'admin';
