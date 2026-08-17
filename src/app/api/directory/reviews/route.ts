import { NextRequest, NextResponse } from "next/server";
import { guardAuth } from "@/lib/directory/auth";
import { supabaseServer } from "@/lib/directory/supabase";
import { rateLimit } from "@/lib/directory/rateLimit";
import { sanitizeText } from "@/lib/directory/validate";
import { getToolReviews } from "@/lib/directory/queries";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const tool_id = searchParams.get("tool_id");
  if (!tool_id) {
    return NextResponse.json({ error: "tool_id required" }, { status: 400 });
  }

  try {
    const reviews = await getToolReviews(tool_id);
    return NextResponse.json(reviews);
  } catch (err) {
    console.error("[Reviews] GET error:", err);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // 1. Authentication
  const profile = await guardAuth();
  if (profile instanceof NextResponse) return profile;

  // 2. Rate limiting: 10 reviews per hour per user
  const limited = await rateLimit(req, "review", profile.id);
  if (!limited.allowed) return limited.response;

  // 3. Parse input
  let body: {
    tool_id?: string;
    rating?: number;
    review_text?: string;
    pros?: string;
    cons?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { tool_id, rating } = body;

  // 4. Validate required fields
  if (!tool_id || typeof tool_id !== "string") {
    return NextResponse.json({ error: "tool_id is required" }, { status: 400 });
  }
  if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Rating must be a number between 1 and 5" },
      { status: 400 }
    );
  }

  // 5. Sanitize text fields — strip HTML and dangerous content
  const review_text = sanitizeText(body.review_text, 5000);
  const pros = sanitizeText(body.pros, 1000);
  const cons = sanitizeText(body.cons, 1000);

  const db = supabaseServer();

  // 6. Verify tool is approved
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

  // 7. Upsert review (one per user per tool — enforced by UNIQUE constraint)
  const { data, error } = await db
    .from("dir_reviews")
    .upsert(
      {
        tool_id,
        reviewer_id: profile.id,
        rating: Math.round(rating), // ensure integer
        review_text: review_text || null,
        pros: pros || null,
        cons: cons || null,
      },
      { onConflict: "tool_id,reviewer_id" }
    )
    .select()
    .single();

  if (error) {
    console.error("[Reviews] Upsert error:", error.code); // log code only, not full error
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 400 }
    );
  }

  // 8. Recalculate avg_rating atomically
  const { data: reviews } = await db
    .from("dir_reviews")
    .select("rating")
    .eq("tool_id", tool_id)
    .eq("is_visible", true);

  if (reviews?.length) {
    const avg =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await db
      .from("dir_tools")
      .update({
        avg_rating: Math.round(avg * 100) / 100, // 2 decimal places
        reviews_count: reviews.length,
      })
      .eq("id", tool_id);
  }

  return NextResponse.json(data, { status: 201 });
}