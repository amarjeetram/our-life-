// src/app/manage/pending/page.tsx
// Admin: Review pending tool submissions

import { requireAdmin } from "@/lib/directory/auth";
import { supabaseServer } from "@/lib/directory/supabase";
import PendingToolsClient from "./PendingToolsClient";

export default async function ManagePendingPage() {
  await requireAdmin();

  const db = supabaseServer();
  const { data: tools, error } = await db
    .from("dir_tools")
    .select(`
      id, name, slug, tagline, description_short, website_url, category_id,
      submitter_id, status, created_at, pricing_type, logo_url,
      dir_categories(name, color)
    `)
    .eq("status", "pending")
    .is("deleted_at", null)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[Admin] ManagePending fetch error:", error.message);
  }

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", marginBottom: 6 }}>
          Pending Review
        </h1>
        <p style={{ color: "#64748b", fontSize: 14 }}>
          {tools?.length ?? 0} tool(s) waiting for approval.
        </p>
      </div>
      <PendingToolsClient tools={(tools ?? []) as any} />
    </div>
  );
}
