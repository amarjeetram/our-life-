import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/mdx';
import { getLatestWPPosts } from '@/lib/wordpress';

export const dynamic = 'force-static';
export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
    try {
        const localPosts = getAllPosts().map(p => ({
            slug: p.slug,
            title: p.title,
            description: p.description,
            type: 'blog' as const
        }));
        
        const wpPosts = (await getLatestWPPosts(30).catch(() => [])).map(p => ({
            slug: p.slug,
            title: p.title,
            description: p.description,
            externalLink: p.externalLink,
            type: 'blog' as const
        }));

        return NextResponse.json({ posts: [...wpPosts, ...localPosts] });
    } catch (e) {
        console.error("Error fetching blog posts for search API:", e);
        return NextResponse.json({ posts: [] }, { status: 500 });
    }
}
