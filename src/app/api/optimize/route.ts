import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const format = (formData.get('format') as string) || 'webp';
        const quality = parseInt(formData.get('quality') as string) || 80;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // Strip all metadata (EXIF, GPS, etc.) for privacy by not including it
        let pipeline = sharp(buffer);

        if (format === 'jpeg' || format === 'jpg') {
            pipeline = pipeline.jpeg({ quality, progressive: true, mozjpeg: true });
        } else if (format === 'webp') {
            pipeline = pipeline.webp({ quality, smartSubsample: true });
        } else if (format === 'png') {
            pipeline = pipeline.png({ quality, compressionLevel: 9 });
        } else if (format === 'avif') {
            pipeline = pipeline.avif({ quality });
        }

        const outputBuffer = await pipeline.toBuffer();
        const mimeType = format === 'jpg' ? 'jpeg' : format;

        return new NextResponse(new Uint8Array(outputBuffer), {
            headers: {
                'Content-Type': `image/${mimeType}`,
                'Content-Disposition': `attachment; filename="smarttoolswala-${file.name.split('.')[0]}.${format}"`,
                'Cache-Control': 'no-store',
            },
        });
    } catch (error) {
        console.error('Optimization error:', error);
        return NextResponse.json({ error: 'Optimization failed' }, { status: 500 });
    }
}
