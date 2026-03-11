import https from 'https';

https.get('https://smarttoolswala.com/blog', (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);

    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        const robotsMeta = data.match(/<meta[^>]*name=["']robots["'][^>]*>/i);
        const canonical = data.match(/<link[^>]*rel=["']canonical["'][^>]*>/i);
        console.log('Robots Meta:', robotsMeta ? robotsMeta[0] : 'None');
        console.log('Canonical:', canonical ? canonical[0] : 'None');
    });
}).on('error', (err) => {
    console.error('Error:', err.message);
});
