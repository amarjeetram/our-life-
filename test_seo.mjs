import fs from 'fs';
fetch('http://localhost:3000/blog/google-gemini-ai-photo-editor-tricks')
    .then(res => res.text())
    .then(html => {
        const canonicalMatch = html.match(/<link[^>]*rel="canonical"[^>]*>/i);
        const robotsMatch = html.match(/<meta[^>]*name="robots"[^>]*>/i);
        console.log("Canonical:", canonicalMatch ? canonicalMatch[0] : "Not found");
        console.log("Robots:", robotsMatch ? robotsMatch[0] : "Not found");
    })
    .catch(err => console.error("Fetch error:", err));
