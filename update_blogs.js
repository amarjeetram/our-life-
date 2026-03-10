const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/AMARJEET/.gemini/antigravity/playground/OUR LIFE/content/blogs';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    const tagsMatch = content.match(/tags:\s*\[\"(.*?)\"\]/);
    if (!tagsMatch) continue;
    const tag = tagsMatch[1];

    let componentName = '';
    if (tag === 'cta-mb-to-kb') componentName = 'CTAMBToKB';
    if (tag === 'cta-compress-50kb') componentName = 'CTACompress50KB';
    if (tag === 'cta-compress-100kb') componentName = 'CTACompress100KB';
    if (tag === 'cta-compress-20kb') componentName = 'CTACompress20KB';
    if (tag === 'cta-compress-30kb') componentName = 'CTACompress30KB';
    if (tag === 'cta-compress-200kb') componentName = 'CTACompress200KB';
    if (tag === 'cta-resize-100kb') componentName = 'CTAResize100KB';
    if (tag === 'cta-tnpsc') componentName = 'CTATnpsc';
    if (tag === 'cta-youtube-tags') componentName = 'CTAYoutubeTags';
    if (tag === 'cta-youtube-title') componentName = 'CTAYoutubeTitle';
    if (tag === 'cta-youtube-description') componentName = 'CTAYoutubeDescription';

    if (!componentName) continue;

    const componentTagStr = '<' + componentName + ' />';
    const btn = '\n\n' + componentTagStr + '\n\n';

    // rename image to featured-1.png etc for 16:9 
    content = content.replace(/image:\s*".*?"/, 'image: \"/images/blogs/featured-' + (parseInt(i) + 1) + '.png\"');

    if (!content.includes(componentTagStr)) {
        const parts = content.split('---');
        if (parts.length >= 3) {
            let frontmatter = parts[1];
            let body = parts.slice(2).join('---').trim();

            // Add top button before first H2 if exists, else top
            const firstH2 = body.indexOf('\n## ');
            if (firstH2 !== -1) {
                body = body.substring(0, firstH2) + btn + body.substring(firstH2);
            } else {
                body = btn + body;
            }

            // Add bottom button
            body += btn;

            content = '---\n' + frontmatter.trim() + '\n---\n\n' + body + '\n';
            fs.writeFileSync(filePath, content);
        }
    } else {
        fs.writeFileSync(filePath, content);
    }
}
console.log('Fixed ' + files.length + ' files');
