// src/app/api/manage/categories/[id]/route.ts
// PATCH /api/manage/categories/:id — admin only
// DELETE /api/manage/categories/:id — admin only
// Now with: audit logging, safety checks

import { NextRequest, NextResponse } from "next/server";
import { guardAdmin } from "@/lib/directory/auth";
import { supabaseServer } from "@/lib/directory/supabase";
import { writeAuditLog, getAuditIp } from "@/lib/directory/auditLog";
import { sanitizeLine } from "@/lib/directory/validate";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await guardAdmin();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;

  let body: { name?: string; color?: string; icon?: string; description?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const db = supabaseServer();

  const { data: before } = await db
    .from("dir_categories")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!before) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  const updates: Record<string, unknown> = {};
  if (body.name !== undefined) updates.name = sanitizeLine(body.name, 50);
  if (body.color !== undefined) updates.color = sanitizeLine(body.color, 20);
  if (body.icon !== undefined) updates.icon_name = sanitizeLine(body.icon, 50);
  if (body.description !== undefined) updates.description = sanitizeLine(body.description, 200);

  const { data, error } = await db
    .from("dir_categories")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[Admin] Update category error:", error.code);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  await writeAuditLog({
    admin_id: admin.id,
    action: "update_category",
    target_type: "category",
    target_id: id,
    metadata: { old: before, new: updates },
    ip_address: await getAuditIp(req),
  });

  return NextResponse.json(data);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await guardAdmin();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;
  const db = supabaseServer();

  const { data: cat } = await db
    .from("dir_categories")
    .select("id, name")
    .eq("id", id)
    .maybeSingle();

  if (!cat) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  // Safety: block delete if tools are using this category
  const { count } = await db
    .from("dir_tools")
    .select("id", { count: "exact", head: true })
    .eq("category_id", id)
    .is("deleted_at", null);

  if ((count ?? 0) > 0) {
    return NextResponse.json(
      { error: `Cannot delete: ${count} active tool(s) use this category. Reassign them first.` },
      { status: 409 }
    );
  }

  const { error } = await db.from("dir_categories").delete().eq("id", id);

  if (error) {
    console.error("[Admin] Delete category error:", error.code);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }

  await writeAuditLog({
    admin_id: admin.id,
    action: "delete_category",
    target_type: "category",
    target_id: id,
    metadata: { deleted_name: cat.name },
    ip_address: await getAuditIp(_req),
  });

  return NextResponse.json({ ok: true });
}
