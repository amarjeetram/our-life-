import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { LRUCache } from 'lru-cache';

// Rate Limiter: Max 20 requests per IP per minute
const rateLimit = new LRUCache<string, number>({
    max: 500,
    ttl: 1000 * 60,
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const targetSizeKb = parseInt(formData.get('targetSize') as string) || 20;
        const width = parseInt(formData.get('width') as string);
        const height = parseInt(formData.get('height') as string);

        // Rate Limiting Logic
        const ip = req.headers.get('x-forwarded-for') || 'unknown-ip';
        const currentUsage = rateLimit.get(ip) || 0;

        if (currentUsage >= 20) {
            return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
        }
        rateLimit.set(ip, currentUsage + 1);

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Invalid file type' }, { status: 415 });
        }

        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > 20) {
            return NextResponse.json({ error: 'File too large. Maximum size is 20MB.' }, { status: 413 });
        }

        const targetBytes = targetSizeKb * 1024;
        const buffer = Buffer.from(await file.arrayBuffer());
        
        // Initial resize to exact dimensions FIRST
        let currentBuffer = await sharp(buffer)
            .resize({
                width: width || undefined,
                height: height || undefined,
                fit: 'fill', // Force exact dimensions even if it skews
            })
            .jpeg({ quality: 100, mozjpeg: true })
            .toBuffer();

        let outputBuffer = currentBuffer;
        
        // Step 1: Binary search on quality (80 -> 10) to reach target size
        if (outputBuffer.length > targetBytes) {
            let low = 5, high = 85;
            let quality = 85;

            while (low < high - 1) {
                quality = Math.floor((low + high) / 2);
                const testBuffer = await sharp(currentBuffer)
                    .jpeg({ quality, progressive: true, mozjpeg: true })
                    .toBuffer();

                if (testBuffer.length <= targetBytes) {
                    low = quality;
                    outputBuffer = testBuffer;
                } else {
                    high = quality;
                }
            }
            
            // Final pass at the lowest working quality found
            outputBuffer = await sharp(currentBuffer)
                .jpeg({ quality: low, progressive: true, mozjpeg: true })
                .toBuffer();
        }

        // If STILL too large (happens with very large dimensions and small KB target)
        // We shouldn't resize dimensions because user asked for exact WxH, but if we must, we error out or return whatever is smallest without changing dimensions.
        // For signature resizing, exact dimensions are usually strict requirements. So we return the compressed image even if it slightly exceeds,
        // but Sharp easily reaches small sizes by dropping quality.
        
        return new NextResponse(new Uint8Array(outputBuffer), {
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Disposition': `attachment; filename="signature-resized-${file.name.split('.')[0]}.jpg"`,
                'Cache-Control': 'no-store',
                'X-Final-Size': `${Math.round(outputBuffer.length / 1024 * 100) / 100}KB`,
            },
        });
    } catch (error) {
        console.error('Signature Resize error:', error);
        return NextResponse.json({ error: 'Resize failed' }, { status: 500 });
    }
}
