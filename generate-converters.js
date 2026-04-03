const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const appDir = path.join(srcDir, 'app', 'unit-converters');
const componentsDir = path.join(srcDir, 'components', 'articles');

const conversions = [
    { from: 'KB', to: 'MB', rate: 'divide by 1,024', val: 1024, isFromLarger: false },
    { from: 'MB', to: 'GB', rate: 'divide by 1,024', val: 1024, isFromLarger: false },
    { from: 'GB', to: 'KB', rate: 'multiply by 1,048,576', val: 1048576, isFromLarger: true },
    { from: 'KB', to: 'GB', rate: 'divide by 1,048,576', val: 1048576, isFromLarger: false },
    { from: 'GB', to: 'TB', rate: 'divide by 1,024', val: 1024, isFromLarger: false },
    { from: 'TB', to: 'GB', rate: 'multiply by 1,024', val: 1024, isFromLarger: true },
    { from: 'MB', to: 'TB', rate: 'divide by 1,048,576', val: 1048576, isFromLarger: false },
    { from: 'TB', to: 'MB', rate: 'multiply by 1,048,576', val: 1048576, isFromLarger: true },
    { from: 'KB', to: 'TB', rate: 'divide by 1,073,741,824', val: 1073741824, isFromLarger: false },
    { from: 'TB', to: 'KB', rate: 'multiply by 1,073,741,824', val: 1073741824, isFromLarger: true }
];

const themes = [
    { heroGradient: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 50%, #5eead4 100%)', textGradient: 'linear-gradient(90deg, #99f6e4, #ccfbf1)', primaryBg: '#f0fdfa', primaryText: '#0f766e', primaryBorder: '#ccfbf1', secondaryBg: '#f8fafc', secondaryText: '#0ea5e9', secondaryBorder: '#bae6fd', buttonGradient: 'linear-gradient(135deg, #14b8a6, #0f766e)' },
    { heroGradient: 'linear-gradient(135deg, #831843 0%, #be185d 50%, #f472b6 100%)', textGradient: 'linear-gradient(90deg, #fbcfe8, #fdf2f8)', primaryBg: '#fdf2f8', primaryText: '#9d174d', primaryBorder: '#fbcfe8', secondaryBg: '#fff1f2', secondaryText: '#be123c', secondaryBorder: '#fecdd3', buttonGradient: 'linear-gradient(135deg, #be185d, #9d174d)' },
    { heroGradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #93c5fd 100%)', textGradient: 'linear-gradient(90deg, #dbeafe, #eff6ff)', primaryBg: '#eff6ff', primaryText: '#1e40af', primaryBorder: '#bfdbfe', secondaryBg: '#f8fafc', secondaryText: '#0369a1', secondaryBorder: '#bae6fd', buttonGradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)' },
    { heroGradient: 'linear-gradient(135deg, #064e3b 0%, #10b981 50%, #6ee7b7 100%)', textGradient: 'linear-gradient(90deg, #d1fae5, #ecfdf5)', primaryBg: '#ecfdf5', primaryText: '#047857', primaryBorder: '#a7f3d0', secondaryBg: '#f0fdfa', secondaryText: '#0f766e', secondaryBorder: '#ccfbf1', buttonGradient: 'linear-gradient(135deg, #10b981, #059669)' },
    { heroGradient: 'linear-gradient(135deg, #4c1d95 0%, #8b5cf6 50%, #c4b5fd 100%)', textGradient: 'linear-gradient(90deg, #ede9fe, #f5f3ff)', primaryBg: '#f5f3ff', primaryText: '#5b21b6', primaryBorder: '#ddd6fe', secondaryBg: '#fdf4ff', secondaryText: '#86198f', secondaryBorder: '#f5d0fe', buttonGradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }
];

function generateExamples(from, isFromLarger) {
    if (isFromLarger) {
        return [
            { label: `1 ${from} to ${to}`, from: from.toLowerCase(), to: to.toLowerCase(), value: '1' },
            { label: `0.5 ${from} to ${to}`, from: from.toLowerCase(), to: to.toLowerCase(), value: '0.5' },
            { label: `2 ${from} to ${to}`, from: from.toLowerCase(), to: to.toLowerCase(), value: '2' },
            { label: `5 ${from} to ${to}`, from: from.toLowerCase(), to: to.toLowerCase(), value: '5' }
        ];
    } else {
        return [
            { label: `100 ${from} to ${to}`, from: from.toLowerCase(), to: to.toLowerCase(), value: '100' },
            { label: `500 ${from} to ${to}`, from: from.toLowerCase(), to: to.toLowerCase(), value: '500' },
            { label: `1000 ${from} to ${to}`, from: from.toLowerCase(), to: to.toLowerCase(), value: '1000' },
            { label: `2048 ${from} to ${to}`, from: from.toLowerCase(), to: to.toLowerCase(), value: '2048' }
        ];
    }
}

conversions.forEach((conv, idx) => {
    from = conv.from;
    to = conv.to;
    let slug = `${from.toLowerCase()}-to-${to.toLowerCase()}`;
    let pageDir = path.join(appDir, slug);
    let theme = themes[idx % themes.length];
    
    if (!fs.existsSync(pageDir)) fs.mkdirSync(pageDir, { recursive: true });

    let componentName = `Article${from}to${to}Unit`;
    
    let examples = generateExamples(from, conv.isFromLarger);
    let examplesStr = JSON.stringify(examples, null, 4);

    let fromFull = from === 'KB' ? 'Kilobytes' : from === 'MB' ? 'Megabytes' : from === 'GB' ? 'Gigabytes' : 'Terabytes';
    let toFull = to === 'KB' ? 'Kilobytes' : to === 'MB' ? 'Megabytes' : to === 'GB' ? 'Gigabytes' : 'Terabytes';

    let pageContent = `import { Metadata } from 'next';
import DigitalConverterClient from '@/components/DigitalConverterClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ${componentName} from '@/components/articles/${componentName}';

export const metadata: Metadata = {
    title: { absolute: '${from} to ${to} Converter – Convert ${fromFull} to ${toFull} Online Free' },
    description: 'Convert ${from} to ${to} instantly with our free online ${from} to ${to} calculator. Get precise digital storage size results flawlessly.',
    keywords: '${from.toLowerCase()} to ${to.toLowerCase()}, ${from.toLowerCase()} to ${to.toLowerCase()} converter, convert ${from.toLowerCase()} to ${to.toLowerCase()}, ${fromFull.toLowerCase()} to ${toFull.toLowerCase()} calculator',
    alternates: {
        canonical: 'https://smarttoolswala.com/unit-converters/${slug}',
    },
};

const faqs = [
    { q: "How do I convert ${from} to ${to}?", a: "To convert ${from} to ${to}, you can simply use our free calculator above. The mathematical rule is to ${conv.rate} from the ${from} value to get the ${to} equivalent." },
    { q: "Is a ${from} larger than a ${to}?", a: "${conv.isFromLarger ? 'Yes, ' + from + ' is much larger than ' + to + '.' : 'No, ' + to + ' is larger than ' + from + '.'}" },
    { q: "Is this ${from} to ${to} calculator free to use?", a: "Yes! All digital storage unit converters on SmartToolsWala are 100% free and don't require any signup." },
];

export default function Page() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "WebApplication",
                                "name": "${from} to ${to} Converter",
                                "url": "https://smarttoolswala.com/unit-converters/${slug}",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "description": "Free online ${from} to ${to} converter. Convert ${fromFull.toLowerCase()} to ${toFull.toLowerCase()} instantly.",
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "USD"
                                }
                            },
                            {
                                "@type": "FAQPage",
                                "mainEntity": faqs.map(f => ({
                                    "@type": "Question",
                                    "name": f.q,
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": f.a
                                    }
                                }))
                            }
                        ]
                    })
                }}
            />
            <DigitalConverterClient
                titleProps={{ highlight: '${from} to ${to}', suffix: 'Converter' }}
                description="Convert ${from} to ${to} instantly using our free online conversion tool. Perfect for calculating correct file sizes."
                defaultFrom="${from.toLowerCase()}"
                defaultTo="${to.toLowerCase()}"
                examples={${examplesStr}}
                theme={${JSON.stringify(theme, null, 4)}}
                infoCards={[{ label: 'Conversion Math', value: '${conv.rate.toUpperCase()}' }]}
            >
                <SEOBottomSection
                    keyword="${from.toLowerCase()} to ${to.toLowerCase()} converter"
                    heading="${from} to ${to} Conversion Guide"
                    faqs={faqs}
                >
                    <${componentName} />
                </SEOBottomSection>
            </DigitalConverterClient>
        </>
    );
}
`;

    let articleContent = `import React from 'react';
import Link from 'next/link';

export default function ${componentName}() {
    return (
        <div className="prose prose-blue max-w-none text-gray-600 space-y-6">

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding the ${from} to ${to} Conversion</h2>
            <p>
                Knowing how to quickly convert <strong>${from} to ${to}</strong> is crucial when dealing with server logs, document uploads, or video storage. If you want to know the exact storage footprint of your data, you must know how to use a <strong>${from.toLowerCase()} to ${to.toLowerCase()} converter</strong>.
            </p>
            <p>
                Our free calculator provides instantaneous results. Forget trying to ${conv.rate} in your head!
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Conversion Logic Explained</h2>
            <p>
                In the digital storage world (using the binary architecture), there is a strict hierarchy: Bytes, Kilobytes (KB), Megabytes (MB), Gigabytes (GB), and Terabytes (TB). To convert from <strong>${from}</strong> to <strong>${to}</strong>, the rule is simple: <strong>${conv.rate}</strong>.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Explore More Converters</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mt-6">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-0 list-none pl-0">
                    <li className="pl-0"><Link href="/unit-converters/mb-to-kb" className="text-blue-600 hover:text-blue-800 font-semibold no-underline flex items-center gap-2"><span>→</span> MB to KB Converter</Link></li>
                    <li className="pl-0"><Link href="/unit-converters/gb-to-mb" className="text-blue-600 hover:text-blue-800 font-semibold no-underline flex items-center gap-2"><span>→</span> GB to MB Converter</Link></li>
                    <li className="pl-0"><Link href="/unit-converters" className="text-blue-600 hover:text-blue-800 font-semibold no-underline flex items-center gap-2"><span>→</span> View All Converters</Link></li>
                </ul>
            </div>
        </div>
    );
}
`;

    fs.writeFileSync(path.join(pageDir, 'page.tsx'), pageContent);
    fs.writeFileSync(path.join(componentsDir, `${componentName}.tsx`), articleContent);
    
    console.log(`Generated ${from} to ${to}`);
});
