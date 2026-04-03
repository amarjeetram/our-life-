import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        if (!url || typeof url !== 'string') {
            return NextResponse.json({ error: 'Valid YouTube URL string is required' }, { status: 400 });
        }

        // Validate structure (must contain youtube or youtu.be)
        if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
            return NextResponse.json({ error: 'Not a valid YouTube domain' }, { status: 400 });
        }

        // We fetch the raw HTML.
        // Adding a User-Agent, Accept-Language, and CONSENT cookie helps bypass localized/consent pages.
        // Using cache: 'no-store' prevents caching blocked pages.
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cookie': 'CONSENT=YES+cb.20230214-08-p0.en+FX+483;'
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch video page from YouTube' }, { status: 502 });
        }

        const html = await response.text();

        // Regex to find all matching meta tags: <meta property="og:video:tag" content="keyword or phrase">
        const tagRegex = /<meta\s+property="og:video:tag"\s+content="([^"]+)"/ig;
        const tagRegexAlt = /<meta\s+content="([^"]+)"\s+property="og:video:tag"/ig;

        const tags: string[] = [];
        let match;

        while ((match = tagRegex.exec(html)) !== null) {
            if (match[1] && match[1].trim() !== '') {
                tags.push(match[1].trim());
            }
        }
        
        while ((match = tagRegexAlt.exec(html)) !== null) {
            if (match[1] && match[1].trim() !== '') {
                tags.push(match[1].trim());
            }
        }

        if (tags.length === 0) {
            // Some videos might not have any tags intentionally set by the creator.
            return NextResponse.json({ tags: [], message: 'No tags found for this video. The creator might not have added any.' }, { status: 200 });
        }

        // Remove duplicates just in case
        const uniqueTags = Array.from(new Set(tags));

        return NextResponse.json({ tags: uniqueTags }, { status: 200 });

    } catch (error) {
        console.error('YouTube Extraction Error:', error);
        return NextResponse.json({ error: 'Failed to process the requested URL' }, { status: 500 });
    }
}
