// src/app/api/submit-tool/route.ts
// DEPRECATED — this legacy route has been decommissioned.
// All tool submissions go through /api/directory/tools (POST) instead.
// Returning 410 Gone so old clients stop retrying.

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "This endpoint has been deprecated. Use POST /api/directory/tools instead.",
    },
    { status: 410 }
  );
}
