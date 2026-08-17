// src/app/api/manage/users/route.ts
// GET  /api/manage/users — admin only: list all users
// Layer 1: middleware.ts ensures Clerk session exists
// Layer 2: guardAdmin() verifies role === 'admin' in Supabase

import { NextRequest, NextResponse } from "next/server";
import { guardAdmin } from "@/lib/directory/auth";
import { supabaseServer } from "@/lib/directory/supabase";

export async function GET(req: NextRequest) {
  const admin = await guardAdmin();
  if (admin instanceof NextResponse) return admin;

  const { searchParams } = req.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
  const limit = Math.min(100, parseInt(searchParams.get("limit") ?? "50"));
  const offset = (page - 1) * limit;

  const db = supabaseServer();
  const { data, error, count } = await db
    .from("dir_profiles")
    .select("id, display_name, email, role, avatar_url, created_at", {
      count: "exact",
    })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("[Admin] List users error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }

  return NextResponse.json({ users: data ?? [], total: count ?? 0, page, limit });
}
