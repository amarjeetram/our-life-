// src/app/api/directory/tools/[id]/route.ts
// GET    — fetch a single tool (public)
// PUT    — update a tool (owner only, OR admin)
// DELETE — soft delete (owner only, OR admin)
//
// Ownership verification is done server-side in the DB query —
// the clerk_user_id filter ensures users can only touch their own tools.
// Admins bypass the filter (isAdmin=true passed to queries).
// Never trust the toolId or ownership from the client body.

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabaseServer } from "@/lib/directory/supabase";
import { updateTool, softDeleteTool } from "@/lib/directory/queries";
import { guardAuth } from "@/lib/directory/auth";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = supabaseServer();
  const { data, error } = await db
    .from("dir_tools")
    .select(
      "*, category:dir_categories(*), screenshots:dir_tool_screenshots(*), social_links:dir_tool_social(*)"
    )
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (error || !data)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Require authentication
  const authResult = await guardAuth();
  if (authResult instanceof NextResponse) return authResult;

  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const updates = await req.json();

    // Determine if caller is admin (server-side only — never trust client)
    const isAdmin = authResult.role === "admin";

    // updateTool enforces ownership at DB level when isAdmin=false
    const tool = await updateTool(id, userId, updates, isAdmin);
    return NextResponse.json(tool);
  } catch {
    return NextResponse.json(
      { error: "Update failed or unauthorized" },
      { status: 403 }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Require authentication
  const authResult = await guardAuth();
  if (authResult instanceof NextResponse) return authResult;

  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const isAdmin = authResult.role === "admin";

    // softDeleteTool enforces ownership at DB level when isAdmin=false
    await softDeleteTool(id, userId, isAdmin);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Delete failed or unauthorized" },
      { status: 403 }
    );
  }
}