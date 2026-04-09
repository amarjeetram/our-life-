import { NextRequest, NextResponse } from 'next/server';

const BOT_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const TIMEOUT_MS = 14000;

async function fetchSafe(url: string, signal: AbortSignal): Promise<{ ok: boolean; text: string; status: number; headers: Record<string, string> }> {
    try {
        const res = await fetch(url, {
            signal,
            headers: {
                'User-Agent': BOT_UA,
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
            },
        });
        const text = await res.text();
        const headers: Record<string, string> = {};
        [
            'content-type', 'x-frame-options', 'strict-transport-security',
            'content-security-policy', 'x-content-type-options', 'referrer-policy',
            'permissions-policy', 'cache-control', 'x-powered-by', 'server',
        ].forEach(h => { const v = res.headers.get(h); if (v) headers[h] = v; });
        return { ok: res.ok, text, status: res.status, headers };
    } catch {
        return { ok: false, text: '', status: 0, headers: {} };
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');
    const competitorUrl = searchParams.get('competitor');

    if (!url) return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });

    let parsedUrl: URL;
    try {
        parsedUrl = new URL(url);
        if (!['http:', 'https:'].includes(parsedUrl.protocol))
            return NextResponse.json({ error: 'Only HTTP/HTTPS URLs are supported.' }, { status: 400 });
    } catch {
        return NextResponse.json({ error: 'Invalid URL. Please enter a complete URL like https://example.com' }, { status: 400 });
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
        const origin = `${parsedUrl.protocol}//${parsedUrl.host}`;

        // Fetch main page + auxiliary resources in parallel
        const [pageRes, robotsRes, sitemapRes] = await Promise.all([
            fetchSafe(parsedUrl.toString(), controller.signal),
            fetchSafe(`${origin}/robots.txt`, controller.signal),
            fetchSafe(`${origin}/sitemap.xml`, controller.signal),
        ]);

        clearTimeout(timer);

        if (!pageRes.ok) {
            const msg = pageRes.status === 0
                ? 'Could not reach the website. The site may be blocking bots or is offline.'
                : `Website returned HTTP ${pageRes.status}. Please try a different URL.`;
            return NextResponse.json({ error: msg }, { status: 400 });
        }

        if (!pageRes.headers['content-type']?.includes('text/html')) {
            return NextResponse.json({ error: `This URL returned a non-HTML response. Please enter a webpage URL.` }, { status: 400 });
        }

        // Optional competitor fetch
        let competitorData = null;
        if (competitorUrl) {
            try {
                const compParsed = new URL(competitorUrl);
                const ctrl2 = new AbortController();
                setTimeout(() => ctrl2.abort(), 10000);
                const compRes = await fetchSafe(compParsed.toString(), ctrl2.signal);
                if (compRes.ok) {
                    competitorData = { html: compRes.text, headers: compRes.headers, statusCode: compRes.status };
                }
            } catch { /* ignore */ }
        }

        return NextResponse.json({
            html: pageRes.text,
            headers: pageRes.headers,
            statusCode: pageRes.status,
            origin,
            robots: { exists: robotsRes.ok, content: robotsRes.text },
            sitemap: { exists: sitemapRes.ok, content: sitemapRes.text, status: sitemapRes.status },
            competitorData,
            fetchedAt: new Date().toISOString(),
        });

    } catch (err: unknown) {
        clearTimeout(timer);
        if (err instanceof Error && err.name === 'AbortError')
            return NextResponse.json({ error: 'Request timed out (>14s). The website is too slow to audit.' }, { status: 504 });
        const msg = err instanceof Error ? err.message : 'Unknown error';
        return NextResponse.json({ error: `Fetch failed: ${msg}` }, { status: 500 });
    }
}
