// src/app/manage/tools/page.tsx
// Admin: All tools management

import { requireAdmin } from "@/lib/directory/auth";
import { supabaseServer } from "@/lib/directory/supabase";
import ManageToolsClient from "./ManageToolsClient";

export default async function ManageToolsPage() {
  await requireAdmin();

  const db = supabaseServer();
  const { data: tools, error } = await db
    .from("dir_tools")
    .select(`
      id, name, slug, tagline, website_url, category_id,
      status, created_at, pricing_type, logo_url, votes_count, views_count,
      dir_categories(name, color)
    `)
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("[Admin] ManageTools fetch error:", error.message);
  }

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", marginBottom: 6 }}>
          All Tools
        </h1>
        <p style={{ color: "#64748b", fontSize: 14 }}>
          {tools?.length ?? 0} tools total (showing latest 100).
        </p>
      </div>
      <ManageToolsClient tools={(tools ?? []) as any} />
    </div>
  );
}
