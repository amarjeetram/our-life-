import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

export const dynamic = 'force-static';

// Sitemap configuration
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://smarttoolswala.com';

    // ── Static routes ─────────────────────────────────────────────────────────
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
        { url: `${baseUrl}/compress-image-to-20kb`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/compress-image-to-30kb`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/compress-image-to-50kb`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/compress-image-to-100kb`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/govt-exam-tools/signature-resize`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/compress-image-to-200kb`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/resize-image-to-100kb`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/mb-to-kb-converter`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/mb-to-kb-image-converter`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/stylish-couple-name-maker`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/youtube-tag-extractor`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/youtube-description-extractor`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/youtube-title-extractor`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/govt-exam-tools/tnpsc-photo-compressor`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/govt-exam-tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/unit-converters`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/photo-and-image-compression-tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/youtube-tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/youtube-tools/1024x576-youtube-banner-maker`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/instagram-tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/instagram-tools/instagram-bio-generator`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/other-tools`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/calculators`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
        { url: `${baseUrl}/calculators/derivative-calculator`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/calculators/integral-calculator`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/calculators/es/calculadora-de-derivadas`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/calculators/es/calculadora-de-integrales`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/donate`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
        { url: `${baseUrl}/about-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/contact-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/terms-and-conditions`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
        { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
        { url: `${baseUrl}/shipping-policy`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
        { url: `${baseUrl}/cancellation-and-refund`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    ];

    // ── Dynamic blog posts from MDX ─────────────────────────────────
    // Always use today's date so Google treats these as fresh and recrawls them
    const allPosts = getAllPosts();
    const blogRoutes: MetadataRoute.Sitemap = allPosts.map(({ slug }) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.85,
    }));

    return [...staticRoutes, ...blogRoutes];
}
