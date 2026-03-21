import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { LRUCache } from 'lru-cache';

// Rate Limiter: Max 20 requests per IP per minute
const rateLimit = new LRUCache<string, number>({
    max: 500, // Max number of IPs to track
    ttl: 1000 * 60, // 1 minute
});

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const targetSizeKb = parseInt(formData.get('targetSize') as string) || 20;

        // Rate Limiting Logic
        const ip = req.headers.get('x-forwarded-for') || 'unknown-ip';
        const currentUsage = rateLimit.get(ip) || 0;

        if (currentUsage >= 20) {
            return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
        }
        rateLimit.set(ip, currentUsage + 1);

        // Security Validation
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Invalid file type. Only images are allowed.' }, { status: 415 });
        }

        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > 20) {
            return NextResponse.json({ error: 'File too large. Maximum size is 20MB.' }, { status: 413 });
        }

        const targetBytes = targetSizeKb * 1024;

        const buffer = Buffer.from(await file.arrayBuffer());
        const metadata = await sharp(buffer).metadata();
        const originalWidth = metadata.width || 800;

        let outputBuffer: Buffer;

        // Step 1: Binary search on quality (5 -> 90)
        let low = 5, high = 90;
        outputBuffer = await sharp(buffer)
            .jpeg({ quality: high, progressive: true })
            .toBuffer();

        if (outputBuffer.length <= targetBytes) {
            // Already fits at high quality, return as-is
        } else {
            while (low < high - 1) {
                const mid = Math.floor((low + high) / 2);
                outputBuffer = await sharp(buffer)
                    .jpeg({ quality: mid, progressive: true })
                    .toBuffer();

                if (outputBuffer.length <= targetBytes) {
                    low = mid;
                } else {
                    high = mid;
                }
            }
            outputBuffer = await sharp(buffer)
                .jpeg({ quality: low, progressive: true })
                .toBuffer();
        }

        // Step 2: If still too large, progressively resize
        if (outputBuffer.length > targetBytes) {
            let scaleFactor = 0.85;
            let attempts = 0;
            while (outputBuffer.length > targetBytes && scaleFactor > 0.05 && attempts < 20) {
                const newWidth = Math.max(80, Math.floor(originalWidth * scaleFactor));
                outputBuffer = await sharp(buffer)
                    .resize({ width: newWidth, withoutEnlargement: true })
                    .jpeg({ quality: Math.max(20, low), progressive: true })
                    .toBuffer();
                scaleFactor -= 0.05;
                attempts++;
            }
        }

        return new NextResponse(new Uint8Array(outputBuffer), {
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Disposition': `attachment; filename="smarttoolswala-20kb-${file.name.split('.')[0]}.jpg"`,
                'Cache-Control': 'no-store',
                'X-Final-Size': `${Math.round(outputBuffer.length / 1024 * 100) / 100}KB`,
            },
        });
    } catch (error) {
        console.error('Compression error:', error);
        return NextResponse.json({ error: 'Compression failed' }, { status: 500 });
    }
}
