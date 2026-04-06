const fs = require('fs');
const path = require('path');

const units = {
    kb: { name: 'Kilobyte', symbol: 'KB', power: 1 },
    mb: { name: 'Megabyte', symbol: 'MB', power: 2 },
    gb: { name: 'Gigabyte', symbol: 'GB', power: 3 },
    tb: { name: 'Terabyte', symbol: 'TB', power: 4 },
};

const pairs = [
    { from: 'gb', to: 'kb' },
    { from: 'gb', to: 'mb' },
    { from: 'gb', to: 'tb' },
    { from: 'kb', to: 'gb' },
    { from: 'kb', to: 'mb' },
    { from: 'kb', to: 'tb' },
    { from: 'mb', to: 'gb' },
    { from: 'mb', to: 'tb' },
    { from: 'tb', to: 'gb' },
    { from: 'tb', to: 'kb' },
    { from: 'tb', to: 'mb' },
    { from: 'mb', to: 'kb' }
];

const SRC_DIR = path.join(__dirname, '..', 'src');
const ARTICLES_DIR = path.join(SRC_DIR, 'components', 'articles');
const CONVERTERS_DIR = path.join(SRC_DIR, 'app', 'unit-converters');

function formatNumber(num) {
    if (num < 0.000001) return num.toExponential(4);
    if (num < 1) return parseFloat(num.toFixed(6)).toString();
    return num.toLocaleString('en-US', { maximumFractionDigits: 4 });
}

function generateArticleComponent(fromKey, toKey) {
    const from = units[fromKey];
    const to = units[toKey];
    
    const powerDiff = from.power - to.power;
    const binRatio = Math.pow(1024, powerDiff);
    const decRatio = Math.pow(1000, powerDiff);
    
    const amounts = [0.1, 0.5, 1, 2, 5, 10, 25, 100];
    
    let tableRows = '';
    amounts.forEach(amt => {
        const binVal = amt * binRatio;
        const decVal = amt * decRatio;
        
        tableRows += `
                            <tr key="${amt} ${from.symbol}" className="border-b border-indigo-100">
                                <td className="px-3 py-2 text-gray-700 border border-indigo-100">${amt} ${from.symbol}</td>
                                <td className="px-3 py-2 text-indigo-700 font-semibold border border-indigo-100">${formatNumber(binVal)} ${to.symbol}</td>
                                <td className="px-3 py-2 text-gray-600 border border-indigo-100">${formatNumber(decVal)} ${to.symbol}</td>
                            </tr>`;
    });

    const componentName = `Article${from.symbol}to${to.symbol}Unit`;
    
    const content = `import React from 'react';
import Link from 'next/link';

export default function ${componentName}() {
    return (
        <div className="prose prose-blue max-w-none text-gray-600 space-y-6">

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">${from.symbol} to ${to.symbol} – Complete Guide to ${from.name} and ${to.name} Conversion</h2>
            <p>
                Whether you are a student, a developer, or someone filling an online form, understanding how to convert <strong>${from.symbol} to ${to.symbol}</strong> is a highly practical digital skill. Every government portal, job application site, university admission form, and cloud storage system specifies exact file size limits. If your file is in ${from.name}s (${from.symbol}), you must know how to <strong>convert ${from.symbol} to ${to.symbol}</strong> accurately.
            </p>
            <p>
                Our free <strong>${from.symbol} to ${to.symbol} calculator</strong> makes this conversion instant. Just enter the value in ${from.symbol}, and you will get the exact result in ${to.symbol} within milliseconds. No downloads, no signup, completely free.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What is a ${from.name} (${from.symbol})?</h2>
            <p>
                A <strong>${from.name} (${from.symbol})</strong> is a unit of digital information storage. In the decimal (SI) system, 1 ${from.symbol} represents ${formatNumber(Math.pow(1000, from.power - 1))} bytes. In the binary system used extensively by computer operating systems, 1 ${from.symbol} represents ${formatNumber(Math.pow(1024, from.power - 1))} bytes.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What is a ${to.name} (${to.symbol})?</h2>
            <p>
                A <strong>${to.name} (${to.symbol})</strong> is another prominent unit of digital storage. In the decimal system, 1 ${to.symbol} represents ${formatNumber(Math.pow(1000, to.power - 1))} bytes. In the standard binary system, 1 ${to.symbol} represents ${formatNumber(Math.pow(1024, to.power - 1))} bytes. Understanding this contrast is vital when estimating how much storage space an application, video, or database will consume.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">${from.symbol} to ${to.symbol} Conversion Formula</h2>
            <p>
                The numerical formula to <strong>convert ${from.symbol} to ${to.symbol}</strong> is based on binary multipliers:
            </p>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>In binary (used by computers):</strong> 1 ${from.symbol} = ${formatNumber(binRatio)} ${to.symbol}</li>
                <li><strong>In decimal (hardware SI standard):</strong> 1 ${from.symbol} = ${formatNumber(decRatio)} ${to.symbol}</li>
            </ul>
            <p>
                So if you want to convert <strong>1 ${from.symbol} to ${to.symbol}</strong>, the most technically accurate binary answer is <strong>${formatNumber(binRatio)} ${to.symbol}</strong>.
            </p>

            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 my-6 overflow-x-auto">
                <h3 className="text-lg font-bold text-gray-900 mb-3 mt-0">Quick ${from.symbol} to ${to.symbol} Reference Table</h3>
                <table className="w-full text-sm text-left border-collapse min-w-[500px]">
                    <thead>
                        <tr className="bg-indigo-100">
                            <th className="px-3 py-2 font-bold text-gray-800 border border-indigo-200">${from.name}s (${from.symbol})</th>
                            <th className="px-3 py-2 font-bold text-gray-800 border border-indigo-200">${to.name}s (${to.symbol}) – Binary</th>
                            <th className="px-3 py-2 font-bold text-gray-800 border border-indigo-200">${to.name}s (${to.symbol}) – Decimal</th>
                        </tr>
                    </thead>
                    <tbody>${tableRows}
                    </tbody>
                </table>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Use Our ${from.symbol} to ${to.symbol} Calculator</h2>
            <p>
                Using our free <strong>${from.symbol} to ${to.symbol} convert</strong> tool is extremely simple:
            </p>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>Step 1:</strong> Enter your core value in ${from.name}s (${from.symbol}) into the primary input field.</li>
                <li><strong>Step 2:</strong> Verify the target dropdown is set to ${to.symbol}.</li>
                <li><strong>Step 3:</strong> The result appears instantly! We perform heavy lifting mathematically on the fly.</li>
                <li><strong>Step 4:</strong> Click to copy the generated ${to.symbol} value for your own documentation.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">LSI Keywords – Related Searches</h2>
            <ul className="list-disc pl-6 space-y-2">
                <li><strong>1 ${from.symbol} to ${to.symbol}</strong> = ${formatNumber(binRatio)} ${to.symbol}</li>
                <li><strong>${from.symbol} convert to ${to.symbol}</strong> — Use the calculator above!</li>
                <li><strong>${from.symbol} to ${to.symbol} calculator</strong> — Enter any ${from.symbol} to attain precise ${to.symbol} immediately.</li>
                <li><strong>${to.symbol} to ${from.symbol} converter</strong> — You can effortlessly do reverse conversions here too.</li>
                <li><strong>${from.name} to ${to.name}</strong> — Precise data transmission scale.</li>
                <li><strong>Digital storage unit converter</strong> — Master bits, Bytes, KB, MB, GB, TB seamlessly!</li>
            </ul>

            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 mt-10">
                <h3 className="text-lg font-bold text-gray-900 mb-4 mt-0">Explore Related Tools</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-0 list-none pl-0">
                    <li className="pl-0"><Link href="/unit-converters" className="text-blue-600 hover:text-blue-800 font-semibold no-underline flex items-center gap-2 transition-colors"><span>→</span> All Unit Converters</Link></li>
                    <li className="pl-0"><Link href="/mb-to-kb-image-converter" className="text-blue-600 hover:text-blue-800 font-semibold no-underline flex items-center gap-2 transition-colors"><span>→</span> Image Resizers</Link></li>
                    <li className="pl-0"><Link href="/compress-image-to-20kb" className="text-blue-600 hover:text-blue-800 font-semibold no-underline flex items-center gap-2 transition-colors"><span>→</span> Compress Image to 20KB</Link></li>
                    <li className="pl-0"><Link href="/compress-image-to-50kb" className="text-blue-600 hover:text-blue-800 font-semibold no-underline flex items-center gap-2 transition-colors"><span>→</span> Compress Image to 50KB</Link></li>
                </ul>
            </div>
        </div>
    );
}
`;
    const filePath = path.join(ARTICLES_DIR, `${componentName}.tsx`);
    fs.writeFileSync(filePath, content, 'utf8');
    return componentName;
}

function updatePageFile(fromKey, toKey, componentName) {
    const from = units[fromKey];
    const to = units[toKey];
    const pageDir = path.join(CONVERTERS_DIR, `${fromKey}-to-${toKey}`);
    const pagePath = path.join(pageDir, 'page.tsx');
    
    if (!fs.existsSync(pagePath)) {
        console.log(`Skipping ${pagePath} as it doesnt exist`);
        return;
    }
    
    let content = fs.readFileSync(pagePath, 'utf8');
    
    if (!content.includes('SEOBottomSection')) {
        content = content.replace(/import (UnitConverterClient|DataUnitConverterClient)[^;]*;/, (match) => {
            return `${match}\nimport SEOBottomSection from '@/components/SEOBottomSection';\nimport ${componentName} from '@/components/articles/${componentName}';`;
        });
    } else if (!content.includes(componentName)) {
        content = content.replace(/import SEOBottomSection[^;]*;/, (match) => {
            return `${match}\nimport ${componentName} from '@/components/articles/${componentName}';`;
        });
    }

    const title = `${from.symbol} to ${to.symbol} Converter - Convert ${from.name} to ${to.name}`;
    const binRatio = Math.pow(1024, from.power - to.power);
    
    const faqs = [
        {
            q: `How many ${to.name}s are in 1 ${from.name}?`,
            a: `In the standard binary system used by computers, 1 ${from.symbol} is equal to ${formatNumber(binRatio)} ${to.symbol}. In the decimal system, it is ${formatNumber(Math.pow(1000, from.power - to.power))} ${to.symbol}.`
        },
        {
            q: `What is the difference between ${from.symbol} and ${to.symbol}?`,
            a: from.power > to.power ? `${from.name} (${from.symbol}) is a much larger unit of digital storage than ${to.name} (${to.symbol}). Files measured in ${from.symbol}s are significantly heavier.` : `${from.name} (${from.symbol}) is a smaller unit of digital storage than ${to.name} (${to.symbol}). It takes many ${from.symbol}s to equal one ${to.symbol}.`
        },
        {
            q: `How do I convert ${from.symbol} to ${to.symbol} online?`,
            a: `Simply type your ${from.symbol} value into our calculator box above. The exact ${to.symbol} calculation will immediately display without clicking any buttons.`
        },
        {
            q: `Is this ${from.symbol} to ${to.symbol} conversion tool free?`,
            a: `Yes! Our digital unit converter is incredibly fast, 100% free, and requires no downloads or sign-ups.`
        }
    ];

    const faqSchema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
    }, null, 4);

    if (content.includes('const faqs = [')) {
        content = content.replace(/const faqs \= \[[^]*?\];/s, `const faqs = ${JSON.stringify(faqs, null, 4)};`);
    } else {
        content = content.replace(/export default function Page\(\) \{/, `const faqs = ${JSON.stringify(faqs, null, 4)};\n\nexport default function Page() {`);
    }

    if (!content.includes('SEOBottomSection')) {
        content = content.replace(/(<DataUnitConverterClient[^>]*\/>)/, `$1\n            <SEOBottomSection keyword="${from.symbol.toLowerCase()} to ${to.symbol.toLowerCase()}" faqs={faqs}>\n                <${componentName} />\n            </SEOBottomSection>`);
    } else {
        content = content.replace(/<Article[a-zA-Z]+ \/>/g, `<${componentName} />`);
    }

    if (content.includes('__html: JSON.stringify([')) {
        content = content.replace(/dangerouslySetInnerHTML=\{\{\n\s+__html: JSON\.stringify\(\[\n\s+\{([^]*?"applicationCategory": "Utility"[^]*?)\}[^]*?\]\)\n\s+\}\}/, 
        `dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
$1},
                        ${faqSchema}
                    ])
                }}`);
    } else if (content.includes('__html: JSON.stringify({')) {
        content = content.replace(/dangerouslySetInnerHTML=\{\{\n\s+__html: JSON\.stringify\(\{([^]*?"applicationCategory": "Utility"[^]*?)\}\)\n\s+\}\}/, 
        `dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
$1},
                        ${faqSchema}
                    ])
                }}`);
    }
    
    fs.writeFileSync(pagePath, content, 'utf8');
}

pairs.forEach(pair => {
    console.log(`Processing ${pair.from} to ${pair.to}...`);
    const compName = generateArticleComponent(pair.from, pair.to);
    updatePageFile(pair.from, pair.to, compName);
});

console.log('Successfully generated all articles and updated pages.');
