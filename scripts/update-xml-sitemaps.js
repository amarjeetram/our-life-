const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const sitemapTsPath = path.join(rootDir, 'src', 'app', 'sitemap.ts');
const blogsDir = path.join(rootDir, 'content', 'blogs');
const liveSitemapPath = path.join(rootDir, 'live-sitemap.xml');
const tempSitemapPath = path.join(rootDir, 'sitemap-temp.xml');

// Helper to format ISO Date to only date or ISO String
const getIsoDateString = () => new Date().toISOString();

function main() {
    try {
        console.log('Generating updated sitemaps...');

        // 1. Parse static routes from sitemap.ts
        if (!fs.existsSync(sitemapTsPath)) {
            console.error('sitemap.ts not found at ' + sitemapTsPath);
            return;
        }
        const sitemapTsContent = fs.readFileSync(sitemapTsPath, 'utf8');
        
        // Regex to extract all static routes matching { url: `${baseUrl}/...`, ... } or { url: baseUrl, ... }
        const urlRegex = /url:\s*(?:`\${baseUrl}([^`]*)`|baseUrl)/g;
        const urls = [];
        let match;
        
        while ((match = urlRegex.exec(sitemapTsContent)) !== null) {
            const path = match[1] || '';
            urls.push('https://smarttoolswala.com' + path);
        }

        // De-duplicate static urls
        const uniqueUrls = [...new Set(urls)];
        console.log(`Found ${uniqueUrls.length} static URLs in sitemap.ts`);

        // 2. Read all MDX blog posts
        if (!fs.existsSync(blogsDir)) {
            console.error('Blogs directory not found at ' + blogsDir);
            return;
        }

        const blogFiles = fs.readdirSync(blogsDir).filter(file => file.endsWith('.mdx'));
        console.log(`Found ${blogFiles.length} blog posts in content/blogs/`);

        const blogUrls = blogFiles.map(file => {
            const slug = file.replace(/\.mdx$/, '');
            return `https://smarttoolswala.com/blog/${slug}`;
        });

        // 3. Construct XML Content
        const dateStr = getIsoDateString();
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        // Add static routes (high priority/frequent update for index, weekly for others)
        uniqueUrls.forEach(url => {
            const isHome = url === 'https://smarttoolswala.com';
            xml += '<url>\n';
            xml += `  <loc>${url}</loc>\n`;
            xml += `  <lastmod>${dateStr}</lastmod>\n`;
            xml += `  <changefreq>${isHome ? 'daily' : 'weekly'}</changefreq>\n`;
            xml += `  <priority>${isHome ? '1.0' : '0.9'}</priority>\n`;
            xml += '</url>\n';
        });

        // Add blog routes
        blogUrls.forEach(url => {
            xml += '<url>\n';
            xml += `  <loc>${url}</loc>\n`;
            xml += `  <lastmod>${dateStr}</lastmod>\n`;
            xml += `  <changefreq>daily</changefreq>\n`;
            xml += `  <priority>0.85</priority>\n`;
            xml += '</url>\n';
        });

        xml += '</urlset>\n';

        // 4. Write to files
        fs.writeFileSync(liveSitemapPath, xml, 'utf8');
        fs.writeFileSync(tempSitemapPath, xml, 'utf8');
        
        console.log(`Successfully wrote sitemaps to live-sitemap.xml and sitemap-temp.xml! Total URLs: ${uniqueUrls.length + blogUrls.length}`);
    } catch (error) {
        console.error('Error updating sitemaps:', error);
    }
}

main();
