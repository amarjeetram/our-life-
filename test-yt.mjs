const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';

async function test() {
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html'
        }
    });
    
    const html = await response.text();
    console.log("Length of HTML:", html.length);
    console.log("Includes ytInitialData:", html.includes('var ytInitialData ='));
    console.log("Includes title:", html.includes('<meta name="title"'));
}
test();
