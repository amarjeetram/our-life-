// src/app/api/directory/admin/reject/route.ts
// POST /api/directory/admin/reject — admin only
// Kept for backward compatibility. New admin actions use /api/manage/tools/[id]/status

import { NextRequest, NextResponse } from "next/server";
import { guardAdmin } from "@/lib/directory/auth";
import { rejectTool } from "@/lib/directory/queries";

export async function POST(req: NextRequest) {
  const admin = await guardAdmin();
  if (admin instanceof NextResponse) return admin; // 401 or 403

  let tool_id: string;
  let note: string | undefined;
  try {
    const body = await req.json();
    tool_id = body.tool_id;
    note = body.note;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!tool_id) {
    return NextResponse.json({ error: "tool_id is required" }, { status: 400 });
  }

  try {
    await rejectTool(tool_id, admin.id, note);
    return NextResponse.json({ success: true, message: "Tool rejected." });
  } catch (err) {
    console.error("[Admin] Reject tool error:", err);
    return NextResponse.json({ error: "Rejection failed" }, { status: 500 });
  }
}