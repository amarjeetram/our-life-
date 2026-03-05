import { MetadataRoute } from 'next';
import { fetchAllPostSlugs } from '@/lib/wordpress';

// Force sitemap to be fully dynamic so new posts appear instantly
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://smarttoolswala.com';

    // ── Static routes ─────────────────────────────────────────────────────────
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
        { url: `${baseUrl}/compress-image-to-20kb`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/compress-image-to-30kb`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/compress-image-to-50kb`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/compress-image-to-100kb`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/compress-image-to-200kb`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/resize-image-to-100kb`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/mb-to-kb-converter`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/stylish-couple-name-maker`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/youtube-tag-extractor`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/tnpsc-photo-compressor`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
        // Static MB to KB blog articles
        { url: `${baseUrl}/blog/free-mb-to-kb-converter-online`, lastModified: new Date('2026-03-05'), changeFrequency: 'monthly', priority: 0.75 },
        { url: `${baseUrl}/blog/mb-to-kb-converter-tool`, lastModified: new Date('2026-03-05'), changeFrequency: 'monthly', priority: 0.75 },
        { url: `${baseUrl}/blog/photo-mb-to-kb-converter-online`, lastModified: new Date('2026-03-05'), changeFrequency: 'monthly', priority: 0.75 },
        { url: `${baseUrl}/blog/convert-mb-to-kb-online`, lastModified: new Date('2026-03-05'), changeFrequency: 'monthly', priority: 0.75 },
        { url: `${baseUrl}/blog/photo-mb-to-kb-converter`, lastModified: new Date('2026-03-05'), changeFrequency: 'monthly', priority: 0.75 },
        { url: `${baseUrl}/blog/mb-to-kb-convert-tool`, lastModified: new Date('2026-03-05'), changeFrequency: 'monthly', priority: 0.75 },
        { url: `${baseUrl}/blog/best-mb-to-kb-converter-for-images`, lastModified: new Date('2026-03-05'), changeFrequency: 'monthly', priority: 0.75 },
        { url: `${baseUrl}/blog/online-photo-mb-to-kb-converter`, lastModified: new Date('2026-03-05'), changeFrequency: 'monthly', priority: 0.75 },
        { url: `${baseUrl}/blog/convert-image-mb-to-kb-free`, lastModified: new Date('2026-03-05'), changeFrequency: 'monthly', priority: 0.75 },
        { url: `${baseUrl}/blog/mb-to-kb-converter-online-free`, lastModified: new Date('2026-03-05'), changeFrequency: 'monthly', priority: 0.75 },
        // Static TNPSC blog articles
        { url: `${baseUrl}/blog/tnpsc-photo-compressor-compress-photo-20kb-50kb`, lastModified: new Date('2026-03-05'), changeFrequency: 'monthly', priority: 0.75 },
        { url: `${baseUrl}/blog/free-tnpsc-photo-compressor-online`, lastModified: new Date('2026-03-05'), changeFrequency: 'monthly', priority: 0.75 },
        { url: `${baseUrl}/blog/tnpsc-photo-and-signature-compressor`, lastModified: new Date('2026-03-05'), changeFrequency: 'monthly', priority: 0.75 },
        { url: `${baseUrl}/blog/online-tnpsc-photo-compressor`, lastModified: new Date('2026-03-05'), changeFrequency: 'monthly', priority: 0.75 },
        { url: `${baseUrl}/blog/best-tnpsc-photo-compressor-tool`, lastModified: new Date('2026-03-05'), changeFrequency: 'monthly', priority: 0.75 },
        { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/contact-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
        { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
        { url: `${baseUrl}/shipping-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
        { url: `${baseUrl}/cancellation-and-refund`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    ];

    // ── Dynamic blog posts from WordPress CMS ─────────────────────────────────
    const cmsSlugs = await fetchAllPostSlugs();
    const blogRoutes: MetadataRoute.Sitemap = cmsSlugs.map(({ slug, modified }) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(modified),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [...staticRoutes, ...blogRoutes];
}
