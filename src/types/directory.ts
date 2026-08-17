// ============================================================
// AI Tool Directory — TypeScript Types
// src/types/directory.ts
// NEW FILE — does not modify any existing code
// ============================================================

export type ToolStatus = 'pending' | 'approved' | 'rejected';
export type UserRole = 'developer' | 'admin';
export type PricingType = 'free' | 'freemium' | 'paid' | 'lifetime' | 'open_source';
export type SocialPlatform = 'twitter' | 'github' | 'linkedin' | 'youtube' | 'discord' | 'website';
export type VerificationMethod = 'email' | 'domain' | 'manual';
export type FeaturedSlot = 'homepage' | 'category' | 'sidebar';

// ── Profiles ──────────────────────────────────────────────
export interface DirProfile {
  id: string;
  clerk_user_id: string;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

// ── Categories ────────────────────────────────────────────
export interface DirCategory {
  id: string;
  name: string;
  slug: string;
  icon_name: string | null;   // Lucide icon name e.g. 'Sparkles'
  color: string | null;       // hex color e.g. '#7c3aed'
  description: string | null;
  sort_order: number;
  created_at: string;
}

// ── Tool (full DB row) ────────────────────────────────────
export interface DirTool {
  id: string;
  submitter_id: string | null;
  clerk_user_id: string | null;  // direct Clerk ID for easy auth checks
  name: string;
  slug: string;
  tagline: string | null;
  description_short: string | null;
  description_long: string | null;

  // SEO
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;

  website_url: string;
  logo_url: string | null;
  cover_url: string | null;
  category_id: string | null;

  // Pricing (structured)
  pricing_type: PricingType | null;
  starting_price: number | null;
  currency: string;

  status: ToolStatus;

  ai_models: string[];
  features: string[];
  use_cases: string[];
  tags: string[];
  languages: string[];
  country: string | null;
  launch_date: string | null;
  contact_email: string | null;
  support_url: string | null;
  docs_url: string | null;
  video_demo_url: string | null;

  is_open_source: boolean;
  has_api: boolean;
  has_mobile_app: boolean;
  has_chrome_ext: boolean;

  // Analytics
  views_count: number;
  clicks_count: number;
  outbound_clicks: number;
  favorites_count: number;
  votes_count: number;
  reviews_count: number;
  avg_rating: number;

  // Verification
  is_verified: boolean;
  verification_method: VerificationMethod | null;

  // Soft delete
  deleted_at: string | null;

  approved_at: string | null;
  approved_by: string | null;
  created_at: string;
  updated_at: string;
}

// ── Tool with joined data (for list/detail pages) ─────────
export interface DirToolWithCategory extends DirTool {
  category?: DirCategory | null;
  screenshots?: DirToolScreenshot[];
  social_links?: DirToolSocial[];
  submitter?: Pick<DirProfile, 'id' | 'display_name' | 'avatar_url'>;
  is_bookmarked?: boolean;
  has_voted?: boolean;
}

// ── Screenshots ───────────────────────────────────────────
export interface DirToolScreenshot {
  id: string;
  tool_id: string;
  url: string;
  alt: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  sort_order: number;
}

// ── Social Links ──────────────────────────────────────────
export interface DirToolSocial {
  id: string;
  tool_id: string;
  platform: SocialPlatform;
  url: string;
}

// ── Reviews ───────────────────────────────────────────────
export interface DirReview {
  id: string;
  tool_id: string;
  reviewer_id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  review_text: string | null;
  pros: string | null;
  cons: string | null;
  helpful_count: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
  reviewer?: Pick<DirProfile, 'display_name' | 'avatar_url'>;
}

// ── Bookmarks ─────────────────────────────────────────────
export interface DirBookmark {
  id: string;
  user_id: string;
  tool_id: string;
  created_at: string;
  tool?: DirToolWithCategory;
}

// ── Votes ─────────────────────────────────────────────────
export interface DirVote {
  id: string;
  user_id: string;
  tool_id: string;
  created_at: string;
}

// ── Featured Slots ────────────────────────────────────────
export interface DirFeatured {
  id: string;
  tool_id: string;
  slot: FeaturedSlot;
  starts_at: string;
  ends_at: string;
  created_at: string;
  tool?: DirToolWithCategory;
}

// ── Reports ───────────────────────────────────────────────
export interface DirReport {
  id: string;
  tool_id: string;
  reporter_id: string;
  reason: string;
  is_resolved: boolean;
  created_at: string;
}

// ── Submission History ────────────────────────────────────
export type SubmissionAction = 'submitted' | 'approved' | 'rejected' | 'edited' | 'featured';

export interface DirSubmissionHistory {
  id: string;
  tool_id: string;
  changed_by: string | null;
  action: SubmissionAction;
  note: string | null;
  created_at: string;
}

// ── API Payloads ──────────────────────────────────────────

export interface SubmitToolPayload {
  name: string;
  tagline?: string;
  description_short: string;
  description_long?: string;
  website_url: string;
  logo_url?: string;
  cover_url?: string;
  category_id?: string;
  pricing_type: PricingType;
  starting_price?: number;
  currency?: string;
  ai_models?: string[];
  features?: string[];
  use_cases?: string[];
  tags?: string[];
  languages?: string[];
  country?: string;
  launch_date?: string;
  contact_email?: string;
  support_url?: string;
  docs_url?: string;
  video_demo_url?: string;
  is_open_source?: boolean;
  has_api?: boolean;
  has_mobile_app?: boolean;
  has_chrome_ext?: boolean;
  social_links?: { platform: SocialPlatform; url: string }[];
  screenshots?: { url: string; alt?: string; caption?: string; width?: number; height?: number }[];
  // SEO (optional override)
  meta_title?: string;
  meta_description?: string;
}

export interface ToolListFilters {
  category?: string;
  pricing_type?: PricingType;
  is_open_source?: boolean;
  has_api?: boolean;
  has_mobile_app?: boolean;
  has_chrome_ext?: boolean;
  search?: string;
  sort?: 'newest' | 'popular' | 'top_rated' | 'votes';
  page?: number;
  limit?: number;
}

export interface PaginatedTools {
  tools: DirToolWithCategory[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ── Pricing Display Helper ────────────────────────────────
export function formatPrice(tool: Pick<DirTool, 'pricing_type' | 'starting_price' | 'currency'>): string {
  if (!tool.pricing_type || tool.pricing_type === 'free') return 'Free';
  if (tool.pricing_type === 'open_source') return 'Open Source';
  if (tool.pricing_type === 'freemium') return 'Freemium';
  if (tool.pricing_type === 'lifetime') {
    if (tool.starting_price) return `${tool.currency === 'INR' ? '₹' : '$'}${tool.starting_price} lifetime`;
    return 'Lifetime';
  }
  if (tool.pricing_type === 'paid') {
    if (tool.starting_price) return `From ${tool.currency === 'INR' ? '₹' : '$'}${tool.starting_price}/mo`;
    return 'Paid';
  }
  return 'Unknown';
}
