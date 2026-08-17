// src/app/api/directory/views/route.ts
// POST — Track a tool view (public, IP-based dedup)
// Security: rate limited per IP, tool_id validated

import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { trackToolView } from "@/lib/directory/queries";
import { rateLimit, getClientIp } from "@/lib/directory/rateLimit";

export async function POST(req: NextRequest) {
  // Rate limit by IP: 30 view events per minute
  const limited = await rateLimit(req, "view_track");
  if (!limited.allowed) return limited.response;

  let tool_id: string;
  try {
    const body = await req.json();
    tool_id = body.tool_id;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!tool_id || typeof tool_id !== "string") {
    return NextResponse.json({ error: "tool_id is required" }, { status: 400 });
  }

  try {
    const ip = getClientIp(req);
    // Hash IP + tool_id so one user can't inflate a single tool's count
    // but can still count as viewing different tools
    const ipHash = createHash("sha256").update(ip + ":" + tool_id).digest("hex");

    await trackToolView(tool_id, ipHash);
    return NextResponse.json({ tracked: true });
  } catch {
    return NextResponse.json({ error: "Tracking failed" }, { status: 500 });
  }
}