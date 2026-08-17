// ============================================================
// AI Tool Directory — Database Queries
// src/lib/directory/queries.ts
// All Supabase queries in one place — server side only
// ============================================================

import { supabaseServer } from './supabase';
import type {
  DirTool, DirToolWithCategory, DirCategory, DirReview,
  DirBookmark, DirFeatured, ToolListFilters, PaginatedTools,
  SubmitToolPayload,
} from '@/types/directory';
import { generateUniqueSlug } from './slug';

const FALLBACK_CATEGORIES: DirCategory[] = [
  { id: '1', name: 'Image', slug: 'image', icon_name: 'Image', color: '#3b82f6', description: 'AI Image Generators', sort_order: 1, created_at: '' },
  { id: '2', name: 'Video', slug: 'video', icon_name: 'Video', color: '#ef4444', description: 'AI Video Tools', sort_order: 2, created_at: '' },
  { id: '3', name: 'Audio', slug: 'audio', icon_name: 'Mic', color: '#8b5cf6', description: 'AI Audio & Music', sort_order: 3, created_at: '' },
  { id: '4', name: 'Writing', slug: 'writing', icon_name: 'PenLine', color: '#10b981', description: 'AI Copywriting & Text', sort_order: 4, created_at: '' },
  { id: '5', name: 'Coding', slug: 'coding', icon_name: 'Code2', color: '#f59e0b', description: 'AI Code Assistants', sort_order: 5, created_at: '' },
  { id: '6', name: 'Marketing', slug: 'marketing', icon_name: 'Megaphone', color: '#f97316', description: 'Marketing Automation', sort_order: 6, created_at: '' },
  { id: '7', name: 'SEO', slug: 'seo', icon_name: 'Search', color: '#06b6d4', description: 'SEO Optimization Tools', sort_order: 7, created_at: '' },
  { id: '8', name: 'Chatbot', slug: 'chatbot', icon_name: 'MessageSquare', color: '#6366f1', description: 'AI Chatbots', sort_order: 8, created_at: '' },
];

export async function getCategories(): Promise<DirCategory[]> {
  try {
    const db = supabaseServer();
    const { data, error } = await db
      .from('dir_categories')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error || !data || data.length === 0) return FALLBACK_CATEGORIES;
    return data;
  } catch (err) {
    console.warn('[Directory] getCategories fallback used:', err);
    return FALLBACK_CATEGORIES;
  }
}

export async function getCategoryBySlug(slug: string): Promise<DirCategory | null> {
  try {
    const db = supabaseServer();
    const { data } = await db
      .from('dir_categories')
      .select('*')
      .eq('slug', slug)
      .single();
    return data ?? FALLBACK_CATEGORIES.find(c => c.slug === slug) ?? null;
  } catch {
    return FALLBACK_CATEGORIES.find(c => c.slug === slug) ?? null;
  }
}

// ── Tools — Listing ───────────────────────────────────────

export async function getApprovedTools(filters: ToolListFilters = {}): Promise<PaginatedTools> {
  const page = filters.page ?? 1;
  const limit = Math.min(filters.limit ?? 24, 100);
  const offset = (page - 1) * limit;

  try {
    const db = supabaseServer();
    let query = db
      .from('dir_tools')
      .select('*, category:dir_categories(*)', { count: 'exact' })
      .eq('status', 'approved')
      .is('deleted_at', null);

    // Filters
    if (filters.category) {
      const cat = await getCategoryBySlug(filters.category);
      if (cat) query = query.eq('category_id', cat.id);
    }
    if (filters.pricing_type) query = query.eq('pricing_type', filters.pricing_type);
    if (filters.is_open_source !== undefined) query = query.eq('is_open_source', filters.is_open_source);
    if (filters.has_api !== undefined) query = query.eq('has_api', filters.has_api);
    if (filters.has_mobile_app !== undefined) query = query.eq('has_mobile_app', filters.has_mobile_app);
    if (filters.has_chrome_ext !== undefined) query = query.eq('has_chrome_ext', filters.has_chrome_ext);

    // Full-text search (uses tsvector GIN index)
    if (filters.search && filters.search.trim()) {
      const tsQuery = filters.search.trim().split(/\s+/).join(' & ');
      query = query.textSearch('search_vector', tsQuery, { type: 'websearch' });
    }

    // Sorting
    switch (filters.sort) {
      case 'popular': query = query.order('views_count', { ascending: false }); break;
      case 'top_rated': query = query.order('avg_rating', { ascending: false }); break;
      case 'votes': query = query.order('votes_count', { ascending: false }); break;
      case 'newest':
      default: query = query.order('created_at', { ascending: false }); break;
    }

    const { data, error, count } = await query.range(offset, offset + limit - 1);
    if (error) {
      console.warn('[Directory] getApprovedTools query error:', error.message);
      return { tools: [], total: 0, page, limit, totalPages: 0 };
    }

    return {
      tools: (data ?? []) as DirToolWithCategory[],
      total: count ?? 0,
      page,
      limit,
      totalPages: Math.ceil((count ?? 0) / limit),
    };
  } catch (err) {
    console.warn('[Directory] getApprovedTools catch fallback:', err);
    return { tools: [], total: 0, page, limit, totalPages: 0 };
  }
}

// ── Tool — Single ─────────────────────────────────────────

export async function getToolBySlug(slug: string, clerkUserId?: string): Promise<DirToolWithCategory | null> {
  const db = supabaseServer();
  const { data, error } = await db
    .from('dir_tools')
    .select(`
      *,
      category:dir_categories(*),
      screenshots:dir_tool_screenshots(*),
      social_links:dir_tool_social(*),
      submitter:dir_profiles!submitter_id(id, display_name, avatar_url)
    `)
    .eq('slug', slug)
    .is('deleted_at', null)
    .single();

  if (error || !data) return null;

  let is_bookmarked = false;
  let has_voted = false;

  if (clerkUserId) {
    const { data: profile } = await db
      .from('dir_profiles')
      .select('id')
      .eq('clerk_user_id', clerkUserId)
      .single();

    if (profile) {
      const [bm, vote] = await Promise.all([
        db.from('dir_bookmarks').select('id').eq('user_id', profile.id).eq('tool_id', data.id).maybeSingle(),
        db.from('dir_votes').select('id').eq('user_id', profile.id).eq('tool_id', data.id).maybeSingle(),
      ]);
      is_bookmarked = !!bm.data;
      has_voted = !!vote.data;
    }
  }

  return { ...data, is_bookmarked, has_voted } as DirToolWithCategory;
}

// ── Related Tools ─────────────────────────────────────────

export async function getSimilarTools(categoryId: string | null, currentToolId: string, limit = 4): Promise<DirToolWithCategory[]> {
  try {
    const db = supabaseServer();
    let query = db
      .from('dir_tools')
      .select('*, category:dir_categories(*)')
      .eq('status', 'approved')
      .is('deleted_at', null)
      .neq('id', currentToolId);

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    const { data } = await query.order('views_count', { ascending: false }).limit(limit);
    return (data ?? []) as DirToolWithCategory[];
  } catch {
    return [];
  }
}

// ── Tool — Submit ─────────────────────────────────────────

export async function submitTool(
  payload: SubmitToolPayload,
  profileId: string,
  clerkUserId: string,
): Promise<DirTool> {
  const db = supabaseServer();
  const slug = await generateUniqueSlug(payload.name);

  const { screenshots, social_links, ...toolData } = payload;

  const { data, error } = await db
    .from('dir_tools')
    .insert({
      ...toolData,
      slug,
      submitter_id: profileId,
      clerk_user_id: clerkUserId,
      status: 'pending',
      currency: toolData.currency ?? 'USD',
    })
    .select()
    .single();

  if (error) throw error;

  // Insert screenshots
  if (screenshots?.length) {
    await db.from('dir_tool_screenshots').insert(
      screenshots.map((s, i) => ({ ...s, tool_id: data.id, sort_order: i }))
    );
  }

  // Insert social links
  if (social_links?.length) {
    await db.from('dir_tool_social').insert(
      social_links.map((sl) => ({ ...sl, tool_id: data.id }))
    );
  }

  // Log submission history
  await db.from('dir_submission_history').insert({
    tool_id: data.id,
    changed_by: profileId,
    action: 'submitted',
  });

  return data as DirTool;
}

// ── Tool — Update (owner only, OR admin) ─────────────────

export async function updateTool(
  toolId: string,
  clerkUserId: string,
  updates: Partial<SubmitToolPayload>,
  isAdmin = false,
): Promise<DirTool> {
  const db = supabaseServer();

  // Build the base query
  let query = db
    .from('dir_tools')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', toolId)
    .is('deleted_at', null);

  // Admins can edit any tool. Regular users can only edit their own.
  if (!isAdmin) {
    query = query.eq('clerk_user_id', clerkUserId);
  }

  const { data, error } = await query.select().single();

  if (error || !data) {
    throw new Error(isAdmin ? 'Update failed' : 'Update failed or unauthorized');
  }
  return data as DirTool;
}

// ── Tool — Soft Delete (owner only, OR admin) ────────────

export async function softDeleteTool(
  toolId: string,
  clerkUserId: string,
  isAdmin = false,
): Promise<void> {
  const db = supabaseServer();

  let query = db
    .from('dir_tools')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', toolId);

  // Admins can delete any tool. Regular users can only delete their own.
  if (!isAdmin) {
    query = query.eq('clerk_user_id', clerkUserId);
  }

  const { error } = await query;
  if (error) throw error;
}

// ── Admin — Approve/Reject ────────────────────────────────

export async function approveTool(toolId: string, adminProfileId: string): Promise<void> {
  const db = supabaseServer();
  await db.from('dir_tools').update({
    status: 'approved',
    approved_at: new Date().toISOString(),
    approved_by: adminProfileId,
  }).eq('id', toolId);

  await db.from('dir_submission_history').insert({
    tool_id: toolId, changed_by: adminProfileId, action: 'approved',
  });
}

export async function rejectTool(toolId: string, adminProfileId: string, note?: string): Promise<void> {
  const db = supabaseServer();
  await db.from('dir_tools').update({ status: 'rejected' }).eq('id', toolId);
  await db.from('dir_submission_history').insert({
    tool_id: toolId, changed_by: adminProfileId, action: 'rejected', note: note ?? null,
  });
}

// ── Analytics — Track View ────────────────────────────────

export async function trackToolView(toolId: string, ipHash: string): Promise<void> {
  const db = supabaseServer();
  // Deduplicate: one view per ip_hash per hour
  const oneHourAgo = new Date(Date.now() - 3600 * 1000).toISOString();
  const { data: existing } = await db
    .from('dir_views')
    .select('id')
    .eq('tool_id', toolId)
    .eq('ip_hash', ipHash)
    .gte('viewed_at', oneHourAgo)
    .maybeSingle();

  if (!existing) {
    await db.from('dir_views').insert({ tool_id: toolId, ip_hash: ipHash });
    await db.rpc('increment_tool_views', { tool_id: toolId });
  }
}

// ── Reviews ───────────────────────────────────────────────

export async function getToolReviews(toolId: string): Promise<DirReview[]> {
  const db = supabaseServer();
  const { data } = await db
    .from('dir_reviews')
    .select('*, reviewer:dir_profiles!reviewer_id(display_name, avatar_url)')
    .eq('tool_id', toolId)
    .eq('is_visible', true)
    .order('created_at', { ascending: false });
  return (data ?? []) as DirReview[];
}

// ── Bookmarks ─────────────────────────────────────────────

export async function getUserBookmarks(profileId: string): Promise<DirBookmark[]> {
  const db = supabaseServer();
  const { data } = await db
    .from('dir_bookmarks')
    .select('*, tool:dir_tools(*, category:dir_categories(*))')
    .eq('user_id', profileId)
    .order('created_at', { ascending: false });
  return (data ?? []) as DirBookmark[];
}

// ── Developer — My Tools ──────────────────────────────────

export async function getMyTools(clerkUserId: string): Promise<DirTool[]> {
  const db = supabaseServer();
  const { data } = await db
    .from('dir_tools')
    .select('*')
    .eq('clerk_user_id', clerkUserId)
    .is('deleted_at', null)
    .order('created_at', { ascending: false });
  return (data ?? []) as DirTool[];
}

// ── Admin — Pending Tools ─────────────────────────────────

export async function getPendingTools(): Promise<DirTool[]> {
  const db = supabaseServer();
  const { data } = await db
    .from('dir_tools')
    .select('*, category:dir_categories(*), submitter:dir_profiles!submitter_id(display_name, email)')
    .eq('status', 'pending')
    .is('deleted_at', null)
    .order('created_at', { ascending: true });
  return (data ?? []) as DirTool[];
}

// ── Featured ──────────────────────────────────────────────

export async function getFeaturedTools(slot: 'homepage' | 'category' | 'sidebar'): Promise<DirFeatured[]> {
  try {
    const db = supabaseServer();
    const now = new Date().toISOString();
    const { data } = await db
      .from('dir_featured')
      .select('*, tool:dir_tools(*, category:dir_categories(*))')
      .eq('slot', slot)
      .lte('starts_at', now)
      .gte('ends_at', now);
    return (data ?? []) as DirFeatured[];
  } catch {
    return [];
  }
}
