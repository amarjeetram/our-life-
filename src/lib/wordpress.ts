const WP_API = 'https://api.insanenotes.in/wp-json/wp/v2';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WPPost {
    id: number;
    slug: string;
    date: string;
    modified: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    content: { rendered: string };
    _embedded?: {
        'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }>;
        author?: Array<{ name: string }>;
        'wp:term'?: Array<Array<{ name: string; slug: string }>>;
    };
}

export interface WPSlugEntry {
    slug: string;
    modified: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Fetch a list of posts (most recent first), with embedded media + author. */
export async function fetchPosts(
    page = 1,
    perPage = 20
): Promise<WPPost[]> {
    try {
        const url =
            `${WP_API}/posts?_embed&page=${page}&per_page=${perPage}&status=publish`;
        const res = await fetch(url, {
            next: { revalidate: 3600 }, // ISR – revalidate every 1 hour
        });
        if (!res.ok) return [];
        return res.json() as Promise<WPPost[]>;
    } catch {
        return [];
    }
}

/** Fetch a single post by its slug. Returns null if not found or on error. */
export async function fetchPostBySlug(slug: string): Promise<WPPost | null> {
    try {
        const url = `${WP_API}/posts?_embed&slug=${encodeURIComponent(slug)}&status=publish`;
        const res = await fetch(url, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) return null;
        const posts: WPPost[] = await res.json();
        return posts[0] ?? null;
    } catch {
        return null;
    }
}

/** Fetch all post slugs + modified dates (lightweight) – used for sitemap & generateStaticParams. */
export async function fetchAllPostSlugs(): Promise<WPSlugEntry[]> {
    try {
        // WordPress can have many posts; fetch up to 100 per page, paginate if needed
        const results: WPSlugEntry[] = [];
        let page = 1;
        const perPage = 100;

        while (true) {
            const url = `${WP_API}/posts?fields=slug,modified&page=${page}&per_page=${perPage}&status=publish`;
            const res = await fetch(url, {
                cache: 'no-store',
            });
            if (!res.ok) break;

            const posts: Array<{ slug: string; modified: string }> = await res.json();
            if (!posts.length) break;

            results.push(...posts.map(p => ({ slug: p.slug, modified: p.modified })));

            // Check if there are more pages
            const totalPages = parseInt(res.headers.get('X-WP-TotalPages') ?? '1', 10);
            if (page >= totalPages) break;
            page++;
        }

        return results;
    } catch {
        return [];
    }
}

/** Strip HTML tags from a string (for excerpts / descriptions). */
export function stripHtml(html: string): string {
    if (!html) return '';
    return html
        .replace(/<[^>]+>/g, '')
        .replace(/\[&hellip;\]/g, '...')
        .replace(/&#8230;/g, '...')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .trim();
}

/** Estimate reading time in minutes from content/excerpt HTML. */
export function readingTime(html: string): number {
    const words = stripHtml(html).split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / 200));
}
