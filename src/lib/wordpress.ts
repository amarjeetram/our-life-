import { Post } from './mdx';

export interface WPPost {
    id: number;
    date: string;
    slug: string;
    title: {
        rendered: string;
    };
    excerpt: {
        rendered: string;
    };
    _embedded?: {
        author?: Array<{
            name: string;
        }>;
        'wp:featuredmedia'?: Array<{
            source_url: string;
        }>;
    };
}

/**
 * Strips HTML tags, decodes common HTML entities, collapses whitespace,
 * and optionally trims the text to provide a clean plain-text string.
 */
function sanitizeText(html: string, maxLength?: number): string {
    let text = html
        .replace(/<[^>]*>?/gm, '') // Remove HTML tags
        .replace(/&nbsp;/g, ' ')
        .replace(/&hellip;/g, '...')
        .replace(/&#8211;/g, '-')
        .replace(/&#8212;/g, '--')
        .replace(/&#8216;/g, "'")
        .replace(/&#8217;/g, "'")
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')
        .replace(/&#038;/g, '&')
        .replace(/\s+/g, ' ') // Collapse multiple spaces and line breaks
        .trim();

    if (maxLength && text.length > maxLength) {
        // Trim to maxLength and add an ellipsis, avoiding splitting words if possible
        const trimmed = text.substring(0, maxLength);
        const lastSpace = trimmed.lastIndexOf(' ');
        text = (lastSpace > 0 ? trimmed.substring(0, lastSpace) : trimmed) + '...';
    }

    return text;
}

/**
 * Fetches the latest posts from the WordPress REST API and maps them to our application's `Post` interface.
 */
export async function getLatestWPPosts(limit: number = 10): Promise<Post[]> {
    try {
        const response = await fetch(
            `https://blog.smarttoolswala.com/wp-json/wp/v2/posts?_embed&per_page=${limit}`,
            {
                // Revalidate cache every 1 hour (3600 seconds) to ensure fresh posts are picked up
                next: { revalidate: 3600 }
            }
        );

        if (!response.ok) {
            console.error(`WordPress API responded with status: ${response.status}`);
            return [];
        }

        const wpPosts: WPPost[] = await response.json();

        return wpPosts.map((wpPost) => {
            const authorName = wpPost._embedded?.author?.[0]?.name || 'SmartToolsWala';
            const imageUrl = wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/og-image.png';

            return {
                slug: wpPost.slug,
                title: sanitizeText(wpPost.title.rendered),
                description: sanitizeText(wpPost.excerpt.rendered, 160),
                date: wpPost.date,
                author: authorName,
                image: imageUrl,
                content: '', // Next.js never renders full content for these posts
                externalLink: `https://blog.smarttoolswala.com/${wpPost.slug}`,
            };
        });
    } catch (error) {
        console.error('Failed to fetch WordPress posts:', error);
        return [];
    }
}
