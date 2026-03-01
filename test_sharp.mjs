import sharp from 'sharp';

async function test() {
    try {
        // Create a dummy image
        const img = await sharp({
            create: {
                width: 100,
                height: 100,
                channels: 4,
                background: { r: 255, g: 0, b: 0, alpha: 1 }
            }
        }).png().toBuffer();

        // Test withMetadata
        const out = await sharp(img).withMetadata({}).toBuffer();
        console.log("Success", out.length);
    } catch (e) {
        console.error("Failed:", e);
    }
}
test();
