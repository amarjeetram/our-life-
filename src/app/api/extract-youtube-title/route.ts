import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { url } = await req.json();

        if (!url || !url.includes('youtube.com/') && !url.includes('youtu.be/')) {
            return NextResponse.json({ error: 'Valid YouTube URL is required' }, { status: 400 });
        }

        // Add headers to mimic a browser, prevent caching errors, and bypass consent page
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
                'Cookie': 'CONSENT=YES+cb.20230214-08-p0.en+FX+483;'
            },
            cache: 'no-store' // Never cache to avoid saving captcha/consent blocks
        });

        if (!response.ok) {
            throw new Error('Failed to fetch YouTube page');
        }

        const html = await response.text();

        // 1. Extract Title (try different meta tags for reliability)
        let title = '';

        // Try oEmbed as primary fallback for title if meta tags fail
        try {
            const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`;
            const oEmbedRes = await fetch(oEmbedUrl, { cache: 'no-store' });
            if (oEmbedRes.ok) {
                const oEmbedData = await oEmbedRes.json();
                if (oEmbedData.title) title = oEmbedData.title;
            }
        } catch (e) {
            console.warn("oEmbed fallback failed", e);
        }

        // Try og:title first
        if (!title) {
            const ogTitleMatch = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i) || html.match(/<meta\s+content="([^"]+)"\s+property="og:title"/i);
            if (ogTitleMatch && ogTitleMatch[1]) {
                title = ogTitleMatch[1];
            }
        }

        // Try standard title tag as fallback
        if (!title) {
            const titleMatch = html.match(/<title>(.*?)<\/title>/i);
            if (titleMatch && titleMatch[1]) {
                // Remove the " - YouTube" suffix if it exists
                title = titleMatch[1].replace(' - YouTube', '');
            }
        }

        // Try name="title" as secondary fallback
        if (!title) {
            const nameTitleMatch = html.match(/<meta\s+name="title"\s+content="([^"]+)"/i) || html.match(/<meta\s+content="([^"]+)"\s+name="title"/i);
            if (nameTitleMatch && nameTitleMatch[1]) {
                title = nameTitleMatch[1];
            }
        }

        // Clean up title (decode HTML entities like &#39; to ')
        if (title) {
            title = title.replace(/&#39;/g, "'")
                .replace(/&quot;/g, '"')
                .replace(/&amp;/g, '&');
        }

        if (!title) {
            return NextResponse.json({ error: 'Could not extract title from this video. It might be private or deleted.' }, { status: 404 });
        }

        // Extract thumbnail for visual feedback in UI
        let thumbnail = '';
        const ogImageMatch = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/i) || html.match(/<meta\s+content="([^"]+)"\s+property="og:image"/i);
        if (ogImageMatch && ogImageMatch[1]) {
            thumbnail = ogImageMatch[1];
        }

        return NextResponse.json({
            title,
            thumbnail
        });

    } catch (error) {
        console.error('Error fetching YouTube title:', error);
        return NextResponse.json({ error: 'Failed to extract data. Please check the URL and try again.' }, { status: 500 });
    }
}
