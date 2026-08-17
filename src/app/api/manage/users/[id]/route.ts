// src/app/api/manage/users/[id]/route.ts
// PATCH /api/manage/users/:id — admin only: update user role
// DELETE /api/manage/users/:id — admin only
// Now with: audit logging, self-lockout prevention

import { NextRequest, NextResponse } from "next/server";
import { guardAdmin } from "@/lib/directory/auth";
import { supabaseServer } from "@/lib/directory/supabase";
import { writeAuditLog, getAuditIp } from "@/lib/directory/auditLog";

const ALLOWED_ROLES = ["developer", "admin"] as const;
type AllowedRole = (typeof ALLOWED_ROLES)[number];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await guardAdmin();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;

  let body: { role?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const newRole = body.role as AllowedRole;
  if (!ALLOWED_ROLES.includes(newRole)) {
    return NextResponse.json(
      { error: `Invalid role. Must be one of: ${ALLOWED_ROLES.join(", ")}` },
      { status: 400 }
    );
  }

  // Safety: prevent admin from removing their own admin role
  if (id === admin.id && newRole !== "admin") {
    return NextResponse.json(
      { error: "You cannot remove your own admin role" },
      { status: 400 }
    );
  }

  const db = supabaseServer();

  const { data: userBefore } = await db
    .from("dir_profiles")
    .select("id, display_name, email, role")
    .eq("id", id)
    .maybeSingle();

  if (!userBefore) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { data, error } = await db
    .from("dir_profiles")
    .update({ role: newRole })
    .eq("id", id)
    .select("id, display_name, email, role")
    .single();

  if (error) {
    console.error("[Admin] Update user role error:", error.code);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  // Audit log
  await writeAuditLog({
    admin_id: admin.id,
    action: "change_user_role",
    target_type: "user",
    target_id: id,
    metadata: {
      user_email: userBefore.email,
      old_role: userBefore.role,
      new_role: newRole,
    },
    ip_address: await getAuditIp(req),
  });

  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await guardAdmin();
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;

  if (id === admin.id) {
    return NextResponse.json(
      { error: "You cannot delete your own account via admin panel" },
      { status: 400 }
    );
  }

  const db = supabaseServer();

  const { data: user } = await db
    .from("dir_profiles")
    .select("id, email, role")
    .eq("id", id)
    .maybeSingle();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Safety: don't delete other admins (downgrade first)
  if (user.role === "admin") {
    return NextResponse.json(
      { error: "Cannot delete an admin account. Change their role to developer first." },
      { status: 409 }
    );
  }

  const { error } = await db.from("dir_profiles").delete().eq("id", id);

  if (error) {
    console.error("[Admin] Delete user error:", error.code);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }

  await writeAuditLog({
    admin_id: admin.id,
    action: "delete_user",
    target_type: "user",
    target_id: id,
    metadata: { deleted_email: user.email },
    ip_address: await getAuditIp(req),
  });

  return NextResponse.json({ ok: true });
}
