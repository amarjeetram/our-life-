// src/app/manage/categories/page.tsx
// Admin: Manage categories

import { requireAdmin } from "@/lib/directory/auth";
import { supabaseServer } from "@/lib/directory/supabase";
import ManageCategoriesClient from "./ManageCategoriesClient";

export default async function ManageCategoriesPage() {
  await requireAdmin();

  const db = supabaseServer();
  const { data: categories } = await db
    .from("dir_categories")
    .select("*")
    .order("name");

  return (
    <div style={{ padding: "40px 48px" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#f1f5f9", marginBottom: 6 }}>
          Categories
        </h1>
        <p style={{ color: "#64748b", fontSize: 14 }}>
          Manage tool categories. These appear on the directory homepage.
        </p>
      </div>
      <ManageCategoriesClient categories={categories ?? []} />
    </div>
  );
}
