// src/app/directory/category/[slug]/page.tsx
// Dedicated SEO Category Page for AI Tools

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getApprovedTools, getCategories } from "@/lib/directory/queries";
import DirectoryClient from "../../DirectoryClient";
import Link from "next/link";
import { ArrowLeft, Sparkles, Folder } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  const title = `Best ${category.name} AI Tools & Software (2026) — SmartToolsWala`;
  const description = category.description
    ? `Explore top ${category.name} AI tools: ${category.description}. Compare pricing, ratings, and features.`
    : `Discover the top rated ${category.name} AI tools and software. Filter by free, paid, open source, and API capabilities.`;

  return {
    title,
    description,
    keywords: [category.name, `${category.name} AI tools`, `best ${category.name} software`, "AI directory"],
    openGraph: {
      title,
      description,
      type: "website",
      url: `/directory/category/${category.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `/directory/category/${category.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string>>;
}) {
  const { slug } = await params;
  const sp = await searchParams;

  const [category, categories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
  ]);

  if (!category) {
    notFound();
  }

  const initialTools = await getApprovedTools({
    category: category.slug,
    pricing_type: sp.pricing as never,
    is_open_source: sp.open_source === "true" ? true : undefined,
    has_api: sp.has_api === "true" ? true : undefined,
    has_mobile_app: sp.mobile === "true" ? true : undefined,
    has_chrome_ext: sp.chrome_ext === "true" ? true : undefined,
    search: sp.q,
    sort: (sp.sort as never) ?? "newest",
    page: parseInt(sp.page ?? "1"),
    limit: 24,
  });

  // Schema.org JSON-LD Breadcrumbs & ItemList
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://smarttoolswala.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "AI Directory",
            item: "https://smarttoolswala.com/directory",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: category.name,
            item: `https://smarttoolswala.com/directory/category/${category.slug}`,
          },
        ],
      },
      {
        "@type": "CollectionPage",
        name: `Best ${category.name} AI Tools`,
        description: category.description ?? `Directory of ${category.name} AI software`,
        url: `https://smarttoolswala.com/directory/category/${category.slug}`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: initialTools.tools.length,
          itemListElement: initialTools.tools.map((t, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `https://smarttoolswala.com/directory/${t.slug}`,
            name: t.name,
          })),
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DirectoryClient
        categories={categories}
        initialTools={initialTools}
        featured={[]}
        initialSearch={sp.q ?? ""}
        initialCategory={category.slug}
        categoryHeading={{
          name: category.name,
          description: category.description ?? `Browse and compare top-rated ${category.name} AI applications and services.`,
          color: category.color ?? "#6366f1",
        }}
      />
    </>
  );
}
