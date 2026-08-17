import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { LRUCache } from 'lru-cache';
import { validateImageBuffer, isValidOrigin } from '@/lib/directory/validate';

// Rate Limiter: Max 20 requests per IP per minute (in-memory, per-instance)
const rateLimiter = new LRUCache<string, number>({
    max: 500,
    ttl: 1000 * 60, // 1 minute
});

export async function POST(req: NextRequest) {
    try {
        // H-2 FIX: CSRF check for multipart/form-data
        if (!isValidOrigin(req)) {
            return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 });
        }

        const formData = await req.formData();
        const file = formData.get('file') as File;
        const targetSizeKb = parseInt(formData.get('targetSize') as string) || 20;
        const width = formData.get('width') ? parseInt(formData.get('width') as string) : null;
        const height = formData.get('height') ? parseInt(formData.get('height') as string) : null;

        // Rate Limiting
        const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown-ip';
        const currentUsage = rateLimiter.get(ip) || 0;

        if (currentUsage >= 20) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429, headers: { 'Retry-After': '60' } }
            );
        }
        rateLimiter.set(ip, currentUsage + 1);

        // Basic presence check
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > 20) {
            return NextResponse.json({ error: 'File too large. Maximum size is 20MB.' }, { status: 413 });
        }

        const targetBytes = targetSizeKb * 1024;
        const buffer = Buffer.from(await file.arrayBuffer());

        // H-3 FIX: Magic bytes validation — never trust client-declared MIME type.
        // A renamed .exe or .php file passes file.type check but fails magic bytes.
        const validation = validateImageBuffer(buffer, file.type, file.name);
        if (!validation.valid) {
            return NextResponse.json(
                { error: validation.error ?? 'Invalid file type' },
                { status: 415 }
            );
        }

        
        // Initial sharp instance
        let sharpInstance = sharp(buffer);
        
        // Apply fixed dimensions if provided
        if (width || height) {
            sharpInstance = sharpInstance.resize({
                width: width || undefined,
                height: height || undefined,
                fit: 'fill' // Usually for government forms, we want exactly these dimensions
            });
        }

        const metadata = await sharpInstance.metadata();
        const currentWidth = metadata.width || 800;

        let outputBuffer: Buffer;

        // Step 1: Binary search on quality (5 -> 95)
        let low = 5, high = 95;
        outputBuffer = await sharpInstance.clone()
            .jpeg({ quality: high, progressive: true, mozjpeg: true })
            .toBuffer();

        if (outputBuffer.length <= targetBytes) {
            // Fits at high quality
        } else {
            while (low < high - 1) {
                const mid = Math.floor((low + high) / 2);
                const tempBuffer = await sharpInstance.clone()
                    .jpeg({ quality: mid, progressive: true, mozjpeg: true })
                    .toBuffer();

                if (tempBuffer.length <= targetBytes) {
                    low = mid;
                    outputBuffer = tempBuffer;
                } else {
                    high = mid;
                }
            }
            // Final check at low if high was too big
            if (outputBuffer.length > targetBytes) {
                outputBuffer = await sharpInstance.clone()
                    .jpeg({ quality: low, progressive: true, mozjpeg: true })
                    .toBuffer();
            }
        }

        // Step 2: If still too large AND we DON'T have fixed dimensions, progressively resize
        // If we DO have fixed dimensions, we can't resize further without breaking requirements, 
        // so we just return the lowest quality version (or throw error, but returning low qual is better)
        if (outputBuffer.length > targetBytes && !width && !height) {
            let scaleFactor = 0.85;
            let attempts = 0;
            while (outputBuffer.length > targetBytes && scaleFactor > 0.05 && attempts < 15) {
                const newWidth = Math.max(80, Math.floor(currentWidth * scaleFactor));
                outputBuffer = await sharp(buffer)
                    .resize({ width: newWidth, withoutEnlargement: true })
                    .jpeg({ quality: Math.max(15, low), progressive: true, mozjpeg: true })
                    .toBuffer();
                scaleFactor -= 0.1;
                attempts++;
            }
        }

        return new NextResponse(new Uint8Array(outputBuffer), {
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Disposition': `attachment; filename="smarttoolswala-compressed-${file.name.split('.')[0]}.jpg"`,
                'Cache-Control': 'no-store',
                'X-Final-Size': `${Math.round(outputBuffer.length / 1024 * 100) / 100}KB`,
            },
        });
    } catch (error) {
        console.error('Compression error:', error);
        return NextResponse.json({ error: 'Compression failed' }, { status: 500 });
    }
}
