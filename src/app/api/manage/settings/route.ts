// src/app/api/manage/settings/route.ts
// GET   /api/manage/settings — admin only: get platform settings
// PATCH /api/manage/settings — admin only: update platform settings
// Layer 1: middleware.ts ensures Clerk session exists
// Layer 2: guardAdmin() verifies role === 'admin' in Supabase

import { NextRequest, NextResponse } from "next/server";
import { guardAdmin } from "@/lib/directory/auth";

export async function GET(_req: NextRequest) {
  const admin = await guardAdmin();
  if (admin instanceof NextResponse) return admin;

  // TODO: query a platform_settings table when built
  return NextResponse.json({
    settings: {
      directory_open: true,
      max_tools_per_user: 10,
      require_approval: true,
    },
  });
}

export async function PATCH(req: NextRequest) {
  const admin = await guardAdmin();
  if (admin instanceof NextResponse) return admin;

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // TODO: persist to platform_settings table
  console.info("[Admin] Settings update by", admin.id, body);
  return NextResponse.json({ ok: true });
}
