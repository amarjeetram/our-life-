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
        const trimmed = text.substring(0, maxLength);
        const lastSpace = trimmed.lastIndexOf(' ');
        text = (lastSpace > 0 ? trimmed.substring(0, lastSpace) : trimmed) + '...';
    }

    return text;
}

/**
 * Internal helper — fetches a single page from the WordPress REST API.
 * Returns null if the fetch fails or times out so callers can handle gracefully.
 */
async function fetchWPPage(page: number, perPage: number): Promise<WPPost[] | null> {
    // 8-second hard timeout — avoids hanging the Next.js render
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        const url = `https://blog.smarttoolswala.com/wp-json/wp/v2/posts?_embed&per_page=${perPage}&page=${page}&orderby=date&order=desc`;
        const response = await fetch(url, {
            signal: controller.signal,
            // ISR cache — revalidate every hour
            next: { revalidate: 3600 },
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            console.warn(`[WP] Page ${page} responded with status ${response.status}`);
            return null;
        }

        return await response.json() as WPPost[];
    } catch (err: any) {
        clearTimeout(timeoutId);
        if (err?.name === 'AbortError') {
            console.warn(`[WP] Fetch timed out (page ${page})`);
        } else {
            console.warn(`[WP] Fetch failed (page ${page}):`, err?.message ?? err);
        }
        return null;
    }
}

/**
 * Maps a raw WPPost to our unified Post interface.
 */
function mapWPPost(wpPost: WPPost): Post {
    const authorName = wpPost._embedded?.author?.[0]?.name || 'SmartToolsWala';
    const imageUrl   = wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/og-image.png';
    return {
        slug:         wpPost.slug,
        title:        sanitizeText(wpPost.title.rendered),
        description:  sanitizeText(wpPost.excerpt.rendered, 160),
        date:         wpPost.date,
        author:       authorName,
        image:        imageUrl,
        content:      '',
        externalLink: `https://blog.smarttoolswala.com/${wpPost.slug}`,
    };
}

// WordPress REST API max per_page with _embed is reliably 50
const WP_PER_PAGE = 50;

/**
 * Fetches up to `limit` posts from WordPress, fetching multiple pages if needed.
 * Never throws — always returns an array (possibly empty) so pages can degrade gracefully.
 */
export async function getLatestWPPosts(limit: number = 10): Promise<Post[]> {
    // How many API pages do we need?
    const pagesToFetch = Math.ceil(limit / WP_PER_PAGE);
    const perPage      = Math.min(limit, WP_PER_PAGE);

    const results: Post[] = [];

    for (let page = 1; page <= pagesToFetch; page++) {
        const wpPosts = await fetchWPPage(page, perPage);

        // If a page fails, stop — don't keep trying further pages
        if (!wpPosts) break;

        results.push(...wpPosts.map(mapWPPost));

        // Stop early if we got fewer posts than requested (last page)
        if (wpPosts.length < perPage) break;
    }

    // Trim to exact requested limit
    return results.slice(0, limit);
}
