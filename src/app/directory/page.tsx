// src/app/directory/page.tsx
// AI Tools Directory — Browse Page (Server Component)

import type { Metadata } from "next";
import { getApprovedTools, getCategories, getFeaturedTools } from "@/lib/directory/queries";
import DirectoryClient from "./DirectoryClient";

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description: "Browse 100s of AI tools and SaaS products. Filter by category, pricing model, and features.",
  openGraph: {
    title: "AI Tools Directory — SmartToolsWala",
    description: "Discover the best AI tools and SaaS products.",
    type: "website",
  },
};

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const sp = await searchParams;

  const [categories, initialTools, featured] = await Promise.all([
    getCategories(),
    getApprovedTools({
      category: sp.category,
      pricing_type: sp.pricing as never,
      is_open_source: sp.open_source === "true" ? true : undefined,
      has_api: sp.has_api === "true" ? true : undefined,
      has_mobile_app: sp.mobile === "true" ? true : undefined,
      has_chrome_ext: sp.chrome_ext === "true" ? true : undefined,
      search: sp.q,
      sort: (sp.sort as never) ?? "newest",
      page: parseInt(sp.page ?? "1"),
      limit: 24,
    }),
    getFeaturedTools("homepage"),
  ]);

  return (
    <DirectoryClient
      categories={categories}
      initialTools={initialTools}
      featured={featured}
      initialSearch={sp.q ?? ""}
      initialCategory={sp.category ?? ""}
    />
  );
}