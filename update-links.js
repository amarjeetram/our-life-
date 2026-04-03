const fs = require('fs');
const path = require('path');

const pageFile = path.join(__dirname, 'src', 'app', 'unit-converters', 'page.tsx');

let content = fs.readFileSync(pageFile, 'utf-8');

const list = [
    {
        href: "/unit-converters/mb-to-kb",
        iconPath: "HardDrive",
        iconBg: "linear-gradient(135deg, #ede9fe, #ddd6fe)",
        iconColor: "#6d28d9",
        shadow: "0 4px 24px rgba(99,102,241,0.1)",
        badge: "Popular",
        badgeBg: "#6366f1",
        title: "MB to KB Converter",
        description: "Convert megabytes to kilobytes instantly. 1 MB = 1,024 KB. Supports KB, MB, GB, TB and more digital storage units.",
        tags: ["mb to kb", "1 MB = 1024 KB", "File Size"],
    },
    {
        href: "/unit-converters/gb-to-mb",
        iconPath: "HardDrive",
        iconBg: "linear-gradient(135deg, #dbeafe, #bfdbfe)",
        iconColor: "#1d4ed8",
        shadow: "0 4px 24px rgba(59,130,246,0.1)",
        badge: "New",
        badgeBg: "#3b82f6",
        title: "GB to MB Converter",
        description: "Convert gigabytes to megabytes instantly. 1 GB = 1,024 MB. Calculate exactly how many MB are in 0.1 GB, 0.98 GB, and 4 GB.",
        tags: ["gb to mb", "1 GB = 1024 MB", "Storage"],
    },
    { href: "/unit-converters/kb-to-mb", iconBg: "linear-gradient(135deg, #ccfbf1, #99f6e4)", iconColor: "#0f766e", shadow: "0 4px 24px rgba(20,184,166,0.1)", title: "KB to MB", description: "Convert kilobytes back to megabytes easily.", tags: ["KB to MB", "Images"] },
    { href: "/unit-converters/mb-to-gb", iconBg: "linear-gradient(135deg, #fbcfe8, #f9a8d4)", iconColor: "#be185d", shadow: "0 4px 24px rgba(244,114,182,0.1)", title: "MB to GB", description: "Convert mb to gigabytes flawlessly.", tags: ["MB to GB", "Data"] },
    { href: "/unit-converters/gb-to-kb", iconBg: "linear-gradient(135deg, #dbeafe, #bfdbfe)", iconColor: "#1d4ed8", shadow: "0 4px 24px rgba(59,130,246,0.1)", title: "GB to KB", description: "Huge conversions from Gigabytes to Kilobytes.", tags: ["GB to KB", "Big files"] },
    { href: "/unit-converters/kb-to-gb", iconBg: "linear-gradient(135deg, #ccfbf1, #99f6e4)", iconColor: "#0f766e", shadow: "0 4px 24px rgba(20,184,166,0.1)", title: "KB to GB", description: "Tiny KB items calculated in Gigabytes.", tags: ["Logs", "KB to GB"] },
    { href: "/unit-converters/gb-to-tb", iconBg: "linear-gradient(135deg, #ede9fe, #ddd6fe)", iconColor: "#6d28d9", shadow: "0 4px 24px rgba(139,92,246,0.1)", title: "GB to TB", description: "Storage solutions in Terabytes calculation.", tags: ["GB to TB", "Cloud"] },
    { href: "/unit-converters/tb-to-gb", iconBg: "linear-gradient(135deg, #ccfbf1, #99f6e4)", iconColor: "#0f766e", shadow: "0 4px 24px rgba(20,184,166,0.1)", title: "TB to GB", description: "Terabyte to Gigabyte hard drive sizing.", tags: ["Drives", "TB to GB"] },
    { href: "/unit-converters/mb-to-tb", iconBg: "linear-gradient(135deg, #fbcfe8, #f9a8d4)", iconColor: "#be185d", shadow: "0 4px 24px rgba(244,114,182,0.1)", title: "MB to TB", description: "Megabytes against Terabytes volumes.", tags: ["MB to TB", "Scaling"] },
    { href: "/unit-converters/tb-to-mb", iconBg: "linear-gradient(135deg, #dbeafe, #bfdbfe)", iconColor: "#1d4ed8", shadow: "0 4px 24px rgba(59,130,246,0.1)", title: "TB to MB", description: "Convert huge drives into exact megabytes.", tags: ["Storage", "TB to MB"] },
    { href: "/unit-converters/kb-to-tb", iconBg: "linear-gradient(135deg, #ccfbf1, #99f6e4)", iconColor: "#0f766e", shadow: "0 4px 24px rgba(20,184,166,0.1)", title: "KB to TB", description: "Extreme conversions between KB and TB.", tags: ["KB to TB", "Servers"] },
    { href: "/unit-converters/tb-to-kb", iconBg: "linear-gradient(135deg, #ede9fe, #ddd6fe)", iconColor: "#6d28d9", shadow: "0 4px 24px rgba(139,92,246,0.1)", title: "TB to KB", description: "Calculate maximum precision files from Terabytes.", tags: ["TB to KB", "Calculation"] },
];

let targetStr = `const tools = [\\s\\S]*?];`;

const replacementObj = JSON.stringify(list, null, 4).replace(/"HardDrive"/g, 'HardDrive');

const updated = content.replace(new RegExp(targetStr), \`const tools = \${replacementObj};\`);

fs.writeFileSync(pageFile, updated);
console.log('Update Complete');
