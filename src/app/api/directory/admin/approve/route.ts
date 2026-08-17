// src/app/api/directory/admin/approve/route.ts
// POST /api/directory/admin/approve — admin only
// Kept for backward compatibility. New admin actions use /api/manage/tools/[id]/status

import { NextRequest, NextResponse } from "next/server";
import { guardAdmin } from "@/lib/directory/auth";
import { approveTool } from "@/lib/directory/queries";

export async function POST(req: NextRequest) {
  const admin = await guardAdmin();
  if (admin instanceof NextResponse) return admin; // 401 or 403

  let tool_id: string;
  try {
    const body = await req.json();
    tool_id = body.tool_id;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!tool_id) {
    return NextResponse.json({ error: "tool_id is required" }, { status: 400 });
  }

  try {
    await approveTool(tool_id, admin.id);
    return NextResponse.json({ success: true, message: "Tool approved and published." });
  } catch (err) {
    console.error("[Admin] Approve tool error:", err);
    return NextResponse.json({ error: "Approval failed" }, { status: 500 });
  }
}