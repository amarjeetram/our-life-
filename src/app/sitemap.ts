import { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/firebase/firestore';
import type { Timestamp } from 'firebase/firestore';

const WP_API = 'https://api.insanenotes.in/wp-json/wp/v2';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://smarttoolswala.com';
    const currentDate = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: baseUrl, lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
        { url: `${baseUrl}/compress-image-to-20kb`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/compress-image-to-30kb`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/compress-image-to-50kb`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/compress-image-to-100kb`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/compress-image-to-200kb`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/resize-image-to-100kb`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/mb-to-kb-converter`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/stylish-couple-name-maker`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/blog`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.8 },
        { url: `${baseUrl}/about-us`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/contact-us`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/privacy-policy`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.5 },
        { url: `${baseUrl}/terms-and-conditions`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.3 },
        { url: `${baseUrl}/disclaimer`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.3 },
        { url: `${baseUrl}/shipping-policy`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.3 },
        { url: `${baseUrl}/cancellation-and-refund`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.3 },
        { url: `${baseUrl}/youtube-tag-extractor`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${baseUrl}/blog/reduce-image-size-to-200kb`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.8 },
    ];

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const res = await fetch(`${WP_API}/posts?_fields=slug,modified&per_page=100`, {
            next: { revalidate: 3600 },
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (res.ok) {
            const posts = await res.json();
            const blogRoutes: MetadataRoute.Sitemap = posts.map((post: { slug: string; modified: string }) => ({
                url: `${baseUrl}/blog/${post.slug}`,
                lastModified: new Date(post.modified),
                changeFrequency: 'weekly',
                priority: 0.7,
            }));

            // Also fetch Firestore (admin panel) posts
            let firestoreRoutes: MetadataRoute.Sitemap = [];
            try {
                const firestorePosts = await getPublishedPosts();
                firestoreRoutes = firestorePosts.map((post) => ({
                    url: `${baseUrl}/blog/${post.slug}`,
                    lastModified: post.updatedAt ? new Date((post.updatedAt as Timestamp).seconds * 1000) : currentDate,
                    changeFrequency: 'weekly' as const,
                    priority: 0.7,
                }));
            } catch {
                // If Firestore is not configured yet, skip
            }

            return [...staticRoutes, ...blogRoutes, ...firestoreRoutes];
        }
    } catch (error) {
        console.error('Error generating dynamic sitemap:', error);
    }

    // Fallback to static routes if API fetching fails entirely
    return staticRoutes;
}
