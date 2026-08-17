// src/app/api/directory/tools/route.ts
// GET  — list approved tools with filters (public)
//        ?status=pending — admin only
// POST — submit a new tool (authenticated, rate limited)

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import {
  getApprovedTools,
  getPendingTools,
  submitTool,
} from "@/lib/directory/queries";
import { guardAuth, guardAdmin } from "@/lib/directory/auth";
import { rateLimit } from "@/lib/directory/rateLimit";
import { sanitizeLine, sanitizeText, validateUrl, validateEmail } from "@/lib/directory/validate";
import type { ToolListFilters, SubmitToolPayload } from "@/types/directory";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const statusParam = searchParams.get("status");

    // Pending tools listing is admin-only
    if (statusParam === "pending") {
      const result = await guardAdmin();
      if (result instanceof NextResponse) return result;
      const pendingTools = await getPendingTools();
      return NextResponse.json({ tools: pendingTools, total: pendingTools.length });
    }

    // Public: approved tools with optional filters
    const filters: ToolListFilters = {
      category: searchParams.get("category") ?? undefined,
      pricing_type:
        (searchParams.get("pricing") as ToolListFilters["pricing_type"]) ?? undefined,
      is_open_source:
        searchParams.get("open_source") === "true" ? true : undefined,
      has_api: searchParams.get("has_api") === "true" ? true : undefined,
      has_mobile_app: searchParams.get("mobile") === "true" ? true : undefined,
      has_chrome_ext:
        searchParams.get("chrome_ext") === "true" ? true : undefined,
      search: searchParams.get("q") ?? undefined,
      sort: (searchParams.get("sort") as ToolListFilters["sort"]) ?? "newest",
      page: parseInt(searchParams.get("page") ?? "1"),
      limit: parseInt(searchParams.get("limit") ?? "24"),
    };

    const result = await getApprovedTools(filters);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[Directory] GET /tools error:", err);
    return NextResponse.json({ error: "Failed to fetch tools" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  // 1. Authentication
  const profile = await guardAuth();
  if (profile instanceof NextResponse) return profile;

  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // 2. Rate limiting: 3 submissions per 24 hours per user
  const limited = await rateLimit(req, "submit_tool", profile.id);
  if (!limited.allowed) return limited.response;

  // 3. Parse input
  let rawPayload: Record<string, unknown>;
  try {
    rawPayload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // 4. Sanitize & validate all fields server-side
  const name = sanitizeLine(rawPayload.name, 100);
  const tagline = sanitizeLine(rawPayload.tagline, 160);
  const description_short = sanitizeText(rawPayload.description_short, 500);
  const description_long = sanitizeText(rawPayload.description_long, 10000);
  const website_url = validateUrl(rawPayload.website_url);
  const contact_email = rawPayload.contact_email
    ? validateEmail(rawPayload.contact_email)
    : null;
  const pricing_type = rawPayload.pricing_type as SubmitToolPayload["pricing_type"];
  const VALID_PRICING = ["free", "freemium", "paid", "lifetime", "open_source"];

  if (!name) {
    return NextResponse.json({ error: "Tool name is required" }, { status: 400 });
  }
  if (!website_url) {
    return NextResponse.json(
      { error: "A valid HTTPS website URL is required" },
      { status: 400 }
    );
  }
  if (!description_short) {
    return NextResponse.json(
      { error: "Short description is required" },
      { status: 400 }
    );
  }
  if (!pricing_type || !VALID_PRICING.includes(pricing_type)) {
    return NextResponse.json(
      { error: `Pricing type must be one of: ${VALID_PRICING.join(", ")}` },
      { status: 400 }
    );
  }

  // Construct the sanitized payload
  const payload: SubmitToolPayload = {
    ...(rawPayload as unknown as SubmitToolPayload),
    name,
    tagline,
    description_short,
    description_long,
    website_url,
    contact_email: contact_email ?? undefined,
    pricing_type,
  };

  try {
    const tool = await submitTool(payload, profile.id, userId);
    return NextResponse.json(
      { tool, message: "Tool submitted for review!" },
      { status: 201 }
    );
  } catch (err) {
    console.error("[Directory] POST /tools error:", err);
    return NextResponse.json({ error: "Submission failed" }, { status: 500 });
  }
}