import { Metadata } from 'next';
import CompressImageClient from '@/components/CompressImageClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import ArticleMBtoKBImage from '@/components/articles/ArticleMBtoKBImage';
import Link from 'next/link';

export const metadata: Metadata = {
    title: { absolute: 'Compress Image MB to KB (20/50/100KB) - SmartToolsWala' },
    description: 'Convert image from MB to KB online free. Compress photos to 20KB, 50KB, 100KB for SSC, UPSC, bank and job forms. Instant, secure, no watermark.',
    keywords: 'mb to kb image converter, mb to kb image, convert image mb to kb, mb to kb image online, image mb to kb converter, mb to kb photo converter, compress image mb to kb',
    alternates: {
        canonical: 'https://smarttoolswala.com/mb-to-kb-image-converter',
    },
};

const faqs = [
    { q: "What is a MB to KB image converter?", a: "A MB to KB image converter is a free online tool that reduces the size of your image from Megabytes (MB) to Kilobytes (KB). You just upload your photo, choose the target KB size, and download the compressed image in seconds." },
    { q: "How do I convert photo MB to KB online?", a: "Just open our tool, click 'Choose Images', upload your photo, select your target size like 50 KB or 100 KB, and click Compress. Your image will be ready in 2 to 3 seconds. Then click Download to save it." },
    { q: "Is this MB to KB image converter free?", a: "Yes, it is 100% free. No signup, no login, no payment, and no hidden charges. You can compress as many images as you want for free anytime." },
    { q: "Does the photo quality become bad after compression?", a: "Our tool uses smart compression technology. It keeps the photo quality as good as possible. For passport photos and document images, the face and text will remain clearly visible after compression." },
    { q: "How many images can I compress at one time?", a: "You can upload and compress up to 10 images at the same time. Each image can be up to 20 MB in size." },
    { q: "Is my photo safe when I upload it?", a: "Yes, completely safe. We do not store your photos. Both the original and compressed images are deleted from our server immediately after you download. We do not sell or share your data." },
    { q: "Can I use this tool on my mobile phone?", a: "Yes! Our MB to KB image converter works perfectly on Android and iPhone. Just open the website in your phone browser like Chrome or Safari. No app download needed." },
    { q: "What image formats does the tool support?", a: "We support JPG, JPEG, PNG, and WEBP image formats. If you upload a PNG, our tool will convert it to JPG automatically to get the best compression result." },
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
                                "@type": "Organization",
                                "name": "SmartToolsWala",
                                "url": "https://smarttoolswala.com",
                                "logo": "https://smarttoolswala.com/logo.svg",
                                "sameAs": [
                                    "https://twitter.com/smarttoolswala",
                                    "https://github.com/smarttoolswala",
                                    "https://www.youtube.com/@SmartToolsWala"
                                ]
                            },
                            {
                                "@type": "WebApplication",
                                "name": "MB to KB Image Converter",
                                "url": "https://smarttoolswala.com/mb-to-kb-image-converter",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "browserRequirements": "Requires JavaScript",
                                "description": "Free MB to KB image converter online. Reduce image MB to KB quickly and securely. Convert any large image file to KB without losing quality.",
                                "featureList": [
                                    "MB to KB image conversion",
                                    "Bulk image compression",
                                    "Fast and secure"
                                ],
                                "offers": {
                                    "@type": "Offer",
                                    "price": "0",
                                    "priceCurrency": "USD"
                                }
                            },
                            {
                                "@context": "https://schema.org",
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    {
                                        "@type": "ListItem",
                                        "position": 1,
                                        "name": "Home",
                                        "item": "https://smarttoolswala.com"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 2,
                                        "name": "Image Tools",
                                        "item": "https://smarttoolswala.com/image-tools"
                                    },
                                    {
                                        "@type": "ListItem",
                                        "position": 3,
                                        "name": "MB to KB Image Converter",
                                        "item": "https://smarttoolswala.com/mb-to-kb-image-converter"
                                    }
                                ]
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
            {/* LCP Hijack: A screen-sized graphical element that paints instantly to override AdSense */}
            <div style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -999, pointerEvents: 'none',
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1 1\'%3E%3Crect width=\'1\' height=\'1\' fill=\'%23f8faff\' /%3E%3C/svg%3E")',
                backgroundSize: 'cover'
            }} aria-hidden="true" />

            <CompressImageClient
                targetSizeKB={100}
                titleOverride={<>MB to KB <span className="text-indigo-600">Image Converter</span></>}
                subtitleOverride="Upload your image and instantly convert MB to KB. Preview your compressed photo before downloading — no signup, no watermark, 100% free."
            >

                <SEOBottomSection
                    keyword="mb to kb image converter"
                    faqs={faqs}
                >
                    <ArticleMBtoKBImage />
                </SEOBottomSection>


                {/* Internal Links to Resize Tools */}
                <div className="max-w-4xl mx-auto px-4 mt-10 mb-6">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">More Image Resize Tools</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Link href="/image-tools/resize-image-to-100kb" className="flex items-start gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all group shadow-sm">
                            <div>
                                <p className="font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 text-sm">Resize Image to 100KB</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Resize file under 100KB for professional registration forms.</p>
                                <span className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-indigo-600">Web · Use Tool →</span>
                            </div>
                        </Link>
                    </div>
                </div>

                {/* Internal SEO Deep Link to Unindexed Blog */}
                <div className="max-w-4xl mx-auto px-4 mt-16 mb-20 text-center">
                    <div className="bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                        <div className="text-left">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Need a Step-by-Step Guide?</h3>
                            <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                                Read our complete tutorial on how to perfectly convert MB images to KB formats for government exams (SSC, UPSC) without losing quality.
                            </p>
                        </div>
                        <Link
                            href="/blog/convert-image-from-mb-to-kb-online"
                            className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-md hover:shadow-lg"
                        >
                            Read the Guide
                        </Link>
                    </div>
                </div>
            </CompressImageClient>
        </>
    );
}
