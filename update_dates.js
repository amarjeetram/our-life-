const fs = require('fs');
const path = require('path');

const dir = path.join(process.cwd(), 'content', 'blogs');

if (!fs.existsSync(dir)) {
    console.error('Directory not found:', dir);
    process.exit(1);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));
let updatedCount = 0;

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Make sure we only replace in the frontmatter to avoid accidentally 
    // replacing any random '2024' or '2025' deep in the article text.
    const parts = content.split('---');

    // Check if it has a valid frontmatter block
    if (parts.length >= 3) {
        let frontmatter = parts[1];

        // Match `date: "2024-03-14"` or `date: "2025-12-14"` exactly
        const hasOldDate = /date:\s*"(2024|2025)-/.test(frontmatter);

        if (hasOldDate) {
            frontmatter = frontmatter.replace(/(date:\s*")(2024|2025)(-\d{2}-\d{2}")/, '$12026$3');

            // Reconstruct content
            content = parts[0] + '---' + frontmatter + '---' + parts.slice(2).join('---');
            fs.writeFileSync(filePath, content);
            updatedCount++;
            console.log(`Updated: ${file}`);
        }
    }
}

console.log(`Done! Successfully updated ${updatedCount} files to 2026.`);
