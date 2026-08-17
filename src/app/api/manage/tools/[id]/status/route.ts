// src/app/api/manage/tools/[id]/status/route.ts
// PATCH /api/manage/tools/:id/status
// Admin only: approve, reject, or reset to pending.
// Now with: audit logging, rate limiting, full guard chain.

import { NextRequest, NextResponse } from "next/server";
import { guardAdmin } from "@/lib/directory/auth";
import { supabaseServer } from "@/lib/directory/supabase";
import { writeAuditLog, getAuditIp } from "@/lib/directory/auditLog";
import { rateLimit } from "@/lib/directory/rateLimit";

const VALID_STATUSES = ["approved", "rejected", "pending"] as const;
type ToolStatus = (typeof VALID_STATUSES)[number];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Role check
  const admin = await guardAdmin();
  if (admin instanceof NextResponse) return admin;

  // Rate limiting for admin actions
  const limited = await rateLimit(req, "admin_action", admin.id);
  if (!limited.allowed) return limited.response;

  const { id } = await params;

  let status: ToolStatus;
  let note: string | undefined;
  try {
    const body = await req.json();
    status = body.status;
    note = typeof body.note === "string" ? body.note.slice(0, 500) : undefined;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json(
      { error: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}` },
      { status: 400 }
    );
  }

  const db = supabaseServer();

  // Get current tool state for audit log
  const { data: toolBefore } = await db
    .from("dir_tools")
    .select("id, name, status")
    .eq("id", id)
    .maybeSingle();

  if (!toolBefore) {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  }

  const updateData: Record<string, unknown> = { status };
  if (status === "approved") {
    updateData.approved_at = new Date().toISOString();
    updateData.approved_by = admin.id;
  }

  const { error } = await db.from("dir_tools").update(updateData).eq("id", id);

  if (error) {
    console.error("[Admin] Status update error:", error.code);
    return NextResponse.json({ error: "Database update failed" }, { status: 500 });
  }

  const action =
    status === "approved" ? "approve_tool" :
    status === "rejected" ? "reject_tool" :
    "reset_tool_pending";

  // Write audit log (non-blocking — never fails the request)
  await writeAuditLog({
    admin_id: admin.id,
    action,
    target_type: "tool",
    target_id: id,
    metadata: {
      tool_name: toolBefore.name,
      old_status: toolBefore.status,
      new_status: status,
      note: note ?? null,
    },
    ip_address: await getAuditIp(req),
  });

  // Update submission history
  try {
    await db.from("dir_submission_history").insert({
      tool_id: id,
      changed_by: admin.id,
      action: status === "approved" ? "approved" : status === "rejected" ? "rejected" : "reset_pending",
      note: note ?? null,
    });
  } catch {
    // Non-fatal
  }

  return NextResponse.json({ ok: true, status });
}
