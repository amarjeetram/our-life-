const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'content/blogs');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'));

let count = 0;
for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    if (content.includes('author: "SmartToolsWala"')) {
        content = content.replace(/author:\s*"SmartToolsWala"/g, 'author: "Ankush Prasad"');
        fs.writeFileSync(filePath, content);
        count++;
    } else if (content.includes('author: "Ankush prasad"')) {
        content = content.replace(/author:\s*"Ankush prasad"/g, 'author: "Ankush Prasad"');
        fs.writeFileSync(filePath, content);
        count++;
    }
}
console.log('Fixed ' + count + ' files for author name.');
