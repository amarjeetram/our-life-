// src/app/api/directory/[slug]/route.ts / src/app/directory/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getToolBySlug, getCategoryBySlug, getSimilarTools } from "@/lib/directory/queries";
import ToolDetailClient from "./ToolDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getToolBySlug(slug);

  if (!tool) {
    // Check if it's a category
    const cat = await getCategoryBySlug(slug);
    if (cat) {
      return {
        title: `Best ${cat.name} AI Tools — SmartToolsWala`,
        description: cat.description ?? `Explore top-rated ${cat.name} AI tools and software.`,
      };
    }
    return { title: "Tool Not Found" };
  }

  const title = tool.meta_title ?? `${tool.name} — AI Tools Directory`;
  const description = tool.meta_description ?? tool.description_short ?? "";
  const images = tool.cover_url
    ? [tool.cover_url]
    : tool.logo_url
    ? [tool.logo_url]
    : [];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
      type: "website",
      url: `/directory/${tool.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    alternates: {
      canonical: `/directory/${tool.slug}`,
    },
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { userId } = await auth();

  const tool = await getToolBySlug(slug, userId ?? undefined);

  if (!tool) {
    // If slug matches a category, redirect to dedicated category page
    const category = await getCategoryBySlug(slug);
    if (category) {
      redirect(`/directory/category/${category.slug}`);
    }
    notFound();
  }

  const similarTools = await getSimilarTools(tool.category_id, tool.id, 4);

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
          ...(tool.category
            ? [
                {
                  "@type": "ListItem",
                  position: 3,
                  name: tool.category.name,
                  item: `https://smarttoolswala.com/directory/category/${tool.category.slug}`,
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: tool.name,
                  item: `https://smarttoolswala.com/directory/${tool.slug}`,
                },
              ]
            : [
                {
                  "@type": "ListItem",
                  position: 3,
                  name: tool.name,
                  item: `https://smarttoolswala.com/directory/${tool.slug}`,
                },
              ]),
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: tool.name,
        url: tool.website_url,
        description: tool.description_short ?? "",
        applicationCategory: tool.category?.name ?? "WebApplication",
        operatingSystem: "All",
        offers: {
          "@type": "Offer",
          price: tool.starting_price ?? 0,
          priceCurrency: tool.currency ?? "USD",
        },
        aggregateRating:
          tool.avg_rating > 0
            ? {
                "@type": "AggregateRating",
                ratingValue: tool.avg_rating,
                reviewCount: tool.reviews_count,
              }
            : undefined,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ToolDetailClient tool={tool} similarTools={similarTools} />
    </>
  );
}