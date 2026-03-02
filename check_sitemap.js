const http = require('http');

http.get('http://localhost:3000/sitemap.xml', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        // Check if there are any firestore links
        console.log("Total links:", data.match(/<loc>/g)?.length);
        console.log("Has /blog/:", data.includes('smarttoolswala.com/blog/'));
        const matches = [...data.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
        const blogLinks = matches.filter(url => url.includes('/blog/'));
        console.log("Blog links:", blogLinks.length);
        if (blogLinks.length > 0) {
            console.log("Sample blog links:", blogLinks.slice(0, 5));
        }
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});
