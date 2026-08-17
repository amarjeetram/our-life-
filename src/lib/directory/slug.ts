// ============================================================
// AI Tool Directory — Slug Utility
// src/lib/directory/slug.ts
// Generates unique slugs with collision handling (#9)
// ============================================================

import { supabaseServer } from './supabase';

/**
 * Convert a string to a URL-friendly slug.
 * "My AI Tool! 2.0" => "my-ai-tool-2-0"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Check if a slug already exists in dir_tools.
 */
async function slugExists(slug: string): Promise<boolean> {
  const db = supabaseServer();
  const { data } = await db
    .from('dir_tools')
    .select('id')
    .eq('slug', slug)
    .is('deleted_at', null)
    .maybeSingle();
  return !!data;
}

/**
 * Generate a unique slug. Handles collisions automatically.
 * "ChatGPT" => "chatgpt" (if free)
 * "ChatGPT" => "chatgpt-2" (if "chatgpt" exists)
 * "ChatGPT" => "chatgpt-3" (if "chatgpt-2" also exists)
 */
export async function generateUniqueSlug(toolName: string): Promise<string> {
  const base = slugify(toolName);
  if (!base) throw new Error('Tool name produces an empty slug');

  let slug = base;
  let i = 2;

  while (await slugExists(slug)) {
    slug = `${base}-${i}`;
    i++;
    if (i > 100) throw new Error('Could not generate a unique slug after 100 attempts');
  }

  return slug;
}
