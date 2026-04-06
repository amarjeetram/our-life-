const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

async function test(name, fetchUrl, headers) {
    try {
        const response = await fetch(fetchUrl, { headers });
        let html = await response.text();
        if (fetchUrl.includes('allorigins')) {
            html = JSON.parse(html).contents;
        }
        console.log(`\n--- ${name} ---`);
        console.log("Length:", html?.length);
        console.log("Has ytInitialData:", html?.includes('var ytInitialData ='));
        console.log("Has tag:", html?.includes('og:video:tag'));
    } catch(e) {
        console.log(`${name} Failed:`, e.message);
    }
}

async function run() {
    await test('GoogleBot', url, {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    });
    
    await test('AllOrigins', `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, {});
}
run();
