// src/app/api/manage/categories/route.ts
// GET  /api/manage/categories — admin only
// POST /api/manage/categories — admin only: create a new category
// Now with: audit logging

import { NextRequest, NextResponse } from "next/server";
import { guardAdmin } from "@/lib/directory/auth";
import { supabaseServer } from "@/lib/directory/supabase";
import { writeAuditLog, getAuditIp } from "@/lib/directory/auditLog";
import { sanitizeLine } from "@/lib/directory/validate";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(_req: NextRequest) {
  const admin = await guardAdmin();
  if (admin instanceof NextResponse) return admin;

  const db = supabaseServer();
  const { data, error } = await db
    .from("dir_categories")
    .select("*")
    .order("name");

  if (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const admin = await guardAdmin();
  if (admin instanceof NextResponse) return admin;

  let body: { name?: string; color?: string; icon?: string; description?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = sanitizeLine(body.name, 50);
  if (!name) {
    return NextResponse.json({ error: "Category name is required" }, { status: 400 });
  }

  const slug = slugify(name);
  if (!slug) {
    return NextResponse.json(
      { error: "Name must contain at least one alphanumeric character" },
      { status: 400 }
    );
  }

  const db = supabaseServer();

  const { data: existing } = await db
    .from("dir_categories")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ error: "A category with this name already exists" }, { status: 409 });
  }

  const { data, error } = await db
    .from("dir_categories")
    .insert({
      name,
      slug,
      color: sanitizeLine(body.color, 20) || "#8b5cf6",
      icon_name: sanitizeLine(body.icon, 50) || "Sparkles",
      description: sanitizeLine(body.description, 200) || null,
    })
    .select()
    .single();

  if (error) {
    console.error("[Admin] Create category error:", error.code);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }

  // Audit log
  await writeAuditLog({
    admin_id: admin.id,
    action: "create_category",
    target_type: "category",
    target_id: data.id,
    metadata: { name, slug },
    ip_address: await getAuditIp(req),
  });

  return NextResponse.json(data, { status: 201 });
}
