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

        // 1. Extract Title
        let title = '';
        const titleMatch = html.match(/<meta\s+name="title"\s+content="([^"]+)"/i) ||
            html.match(/<meta\s+content="([^"]+)"\s+name="title"/i) ||
            html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i) ||
            html.match(/<meta\s+content="([^"]+)"\s+property="og:title"/i);
        if (titleMatch && titleMatch[1]) {
            title = titleMatch[1];
        }

        // 2. Extract Description (Short version for meta usually, we want the long one if possible)
        let description = '';
        const descMatch = html.match(/<meta\s+name="description"\s+content="([\s\S]*?)"\s*\/?>/i) ||
            html.match(/<meta\s+property="og:description"\s+content="([\s\S]*?)"\s*\/?>/i) ||
            html.match(/<meta\s+content="([\s\S]*?)"\s+name="description"\s*\/?>/i) ||
            html.match(/<meta\s+content="([\s\S]*?)"\s+property="og:description"\s*\/?>/i);
        if (descMatch && descMatch[1]) {
            description = descMatch[1];
        }

        // 3. Extract ytInitialData for precise views, likes, and full description
        // This is a large JSON object embedded in the page script
        let views = 'N/A';
        let likes = 'N/A';
        let comments = 'N/A';

        const ytInitialDataRegex = /var ytInitialData = ({.*?});<\/script>/;
        const ytDataMatch = ytInitialDataRegex.exec(html);

        if (ytDataMatch && ytDataMatch[1]) {
            try {
                const ytData = JSON.parse(ytDataMatch[1]);

                // Parse Video Details from primary info
                const primaryInfo = ytData?.contents?.twoColumnWatchNextResults?.results?.results?.contents?.find(
                    (c: any) => c.videoPrimaryInfoRenderer
                )?.videoPrimaryInfoRenderer;

                if (primaryInfo) {
                    // Try to get views
                    const viewCount = primaryInfo.viewCount?.videoViewCountRenderer?.viewCount?.simpleText ||
                        primaryInfo.viewCount?.videoViewCountRenderer?.shortViewCount?.simpleText;
                    if (viewCount) views = viewCount;
                }

                // Parse Likes from topLevelButtons
                const actionButtons = primaryInfo?.videoActions?.menuRenderer?.topLevelButtons;
                if (actionButtons) {
                    const likeButton = actionButtons.find((btn: any) =>
                        btn.segmentedLikeDislikeButtonViewModel?.likeButtonViewModel?.likeButtonViewModel?.toggleButtonViewModel?.toggleButtonViewModel?.defaultButtonViewModel?.buttonViewModel?.title
                    );

                    if (likeButton) {
                        likes = likeButton.segmentedLikeDislikeButtonViewModel.likeButtonViewModel.likeButtonViewModel.toggleButtonViewModel.toggleButtonViewModel.defaultButtonViewModel.buttonViewModel.title;
                    } else {
                        // Alternate structure
                        const altLikeButton = actionButtons.find((btn: any) => btn.toggleButtonRenderer?.defaultText?.accessibility?.accessibilityData?.label?.includes("like"));
                        if (altLikeButton) {
                            likes = altLikeButton.toggleButtonRenderer.defaultText.simpleText;
                        }
                    }
                }

                // Parse full description from secondary info
                const secondaryInfo = ytData?.contents?.twoColumnWatchNextResults?.results?.results?.contents?.find(
                    (c: any) => c.videoSecondaryInfoRenderer
                )?.videoSecondaryInfoRenderer;

                if (secondaryInfo?.attributedDescription?.content) {
                    description = secondaryInfo.attributedDescription.content;
                }

                // Parse Comments
                // Comments usually require an additional network request in modern YouTube, 
                // but the count might be in the initial data in some structures.
                // We'll try to find an engagement panel or generic comment count
                const itemSection = ytData?.contents?.twoColumnWatchNextResults?.results?.results?.contents?.find(
                    (c: any) => c.itemSectionRenderer?.sectionIdentifier === 'comment-item-section'
                )?.itemSectionRenderer;

                if (itemSection?.header?.commentsHeaderRenderer?.countText?.runs?.[0]?.text) {
                    comments = itemSection.header.commentsHeaderRenderer.countText.runs[0].text + (itemSection.header.commentsHeaderRenderer.countText.runs[1]?.text || '');
                }

            } catch (e) {
                console.warn('Failed to parse ytInitialData', e);
            }
        }

        // Clean up entities in description
        description = description.replace(/&quot;/g, '"')
            .replace(/&amp;/g, '&')
            .replace(/&#39;/g, "'")
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');

        return NextResponse.json({
            title,
            description,
            stats: {
                views,
                likes,
                comments
            }
        }, { status: 200 });

    } catch (error) {
        console.error('YouTube Extraction Error:', error);
        return NextResponse.json({ error: 'Failed to process the requested URL' }, { status: 500 });
    }
}
