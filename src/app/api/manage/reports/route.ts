// src/app/api/manage/reports/route.ts
// GET /api/manage/reports — admin only (future: user-reported content)
// Layer 1: middleware.ts ensures Clerk session exists
// Layer 2: guardAdmin() verifies role === 'admin' in Supabase

import { NextRequest, NextResponse } from "next/server";
import { guardAdmin } from "@/lib/directory/auth";

export async function GET(_req: NextRequest) {
  const admin = await guardAdmin();
  if (admin instanceof NextResponse) return admin;

  // TODO: query dir_reports table when built
  return NextResponse.json({ reports: [], total: 0 });
}
