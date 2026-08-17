// src/app/api/directory/votes/route.ts
// POST — Toggle vote on a tool (authenticated)
// Security: rate limited, atomic DB update, tool existence validated

import { NextRequest, NextResponse } from "next/server";
import { guardAuth } from "@/lib/directory/auth";
import { supabaseServer } from "@/lib/directory/supabase";
import { rateLimit } from "@/lib/directory/rateLimit";

export async function POST(req: NextRequest) {
  // 1. Authentication
  const profile = await guardAuth();
  if (profile instanceof NextResponse) return profile;

  // 2. Rate limiting: 60 votes per hour per user
  const limited = await rateLimit(req, "vote", profile.id);
  if (!limited.allowed) return limited.response;

  // 3. Parse & validate input
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

  const db = supabaseServer();

  // 4. Verify tool exists and is approved
  const { data: tool } = await db
    .from("dir_tools")
    .select("id, votes_count")
    .eq("id", tool_id)
    .eq("status", "approved")
    .is("deleted_at", null)
    .maybeSingle();

  if (!tool) {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  }

  // 5. Check for existing vote
  const { data: existing } = await db
    .from("dir_votes")
    .select("id")
    .eq("user_id", profile.id)
    .eq("tool_id", tool_id)
    .maybeSingle();

  if (existing) {
    // Un-vote: atomic decrement (prevents race condition)
    await db.from("dir_votes").delete().eq("id", existing.id);
    await db.rpc("decrement_tool_votes", { tool_id });
    return NextResponse.json({ voted: false });
  }

  // Vote: atomic increment
  await db.from("dir_votes").insert({ user_id: profile.id, tool_id });
  await db.rpc("increment_tool_votes", { tool_id });
  return NextResponse.json({ voted: true });
}