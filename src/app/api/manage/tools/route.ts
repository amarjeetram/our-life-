// src/app/api/manage/tools/route.ts
// GET /api/manage/tools — admin only: list all tools (any status)
// Layer 1: middleware.ts ensures Clerk session exists
// Layer 2: guardAdmin() verifies role === 'admin' in Supabase

import { NextRequest, NextResponse } from "next/server";
import { guardAdmin } from "@/lib/directory/auth";
import { supabaseServer } from "@/lib/directory/supabase";

export async function GET(req: NextRequest) {
  const admin = await guardAdmin();
  if (admin instanceof NextResponse) return admin;

  const { searchParams } = req.nextUrl;
  const status = searchParams.get("status") ?? undefined; // filter by status
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "50"));
  const offset = (page - 1) * limit;

  const db = supabaseServer();

  let query = db
    .from("dir_tools")
    .select(
      "id, name, slug, tagline, website_url, status, created_at, votes_count, views_count, pricing_type, dir_categories(name, color)",
      { count: "exact" }
    )
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("[Admin] List tools error:", error);
    return NextResponse.json({ error: "Failed to fetch tools" }, { status: 500 });
  }

  return NextResponse.json({ tools: data ?? [], total: count ?? 0, page, limit });
}
