// src/app/api/directory/bookmarks/route.ts
// POST — Add or remove a bookmark (authenticated)
// Security: rate limited, tool existence validated

import { NextRequest, NextResponse } from "next/server";
import { guardAuth } from "@/lib/directory/auth";
import { supabaseServer } from "@/lib/directory/supabase";
import { rateLimit } from "@/lib/directory/rateLimit";

export async function POST(req: NextRequest) {
  // 1. Authentication
  const profile = await guardAuth();
  if (profile instanceof NextResponse) return profile;

  // 2. Rate limiting: 60 bookmark actions per hour per user
  const limited = await rateLimit(req, "bookmark", profile.id);
  if (!limited.allowed) return limited.response;

  // 3. Parse & validate
  let tool_id: string;
  let action: "add" | "remove";
  try {
    const body = await req.json();
    tool_id = body.tool_id;
    action = body.action === "remove" ? "remove" : "add";
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!tool_id || typeof tool_id !== "string") {
    return NextResponse.json({ error: "tool_id is required" }, { status: 400 });
  }

  const db = supabaseServer();

  // 4. Verify tool exists
  const { data: tool } = await db
    .from("dir_tools")
    .select("id")
    .eq("id", tool_id)
    .eq("status", "approved")
    .is("deleted_at", null)
    .maybeSingle();

  if (!tool) {
    return NextResponse.json({ error: "Tool not found" }, { status: 404 });
  }

  // 5. Add or remove
  if (action === "remove") {
    await db
      .from("dir_bookmarks")
      .delete()
      .eq("user_id", profile.id)
      .eq("tool_id", tool_id);

    // Atomic decrement
    await db.rpc("decrement_tool_favorites", { tool_id });
    return NextResponse.json({ bookmarked: false });
  }

  // Add bookmark (upsert is idempotent)
  const { error } = await db
    .from("dir_bookmarks")
    .upsert(
      { user_id: profile.id, tool_id },
      { onConflict: "user_id,tool_id", ignoreDuplicates: true }
    );

  if (!error) {
    await db.rpc("increment_tool_clicks", { tool_id });
  }

  return NextResponse.json({ bookmarked: true });
}