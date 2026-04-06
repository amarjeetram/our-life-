import { Metadata } from 'next';
import SignatureResizeClient from '@/components/SignatureResizeClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import Link from 'next/link';

export const metadata: Metadata = {
    title: { absolute: 'SSC CGL Photo & Signature Resizer 2026 - Free Online Tool' },
    description: 'Resize SSC CGL photo and signature online for 2026 applications. Adjust SSC signature size, dimensions, and KB instantly with this free tool.',
    keywords: 'ssc cgl photo resizer 2026, ssc cgl signature resize, ssc signature size kb, ssc cgl photo size, ssc signature resize online, ssc cgl 2026 photo format',
    alternates: {
        canonical: 'https://smarttoolswala.com/govt-exam-tools/ssc-signature-resize',
    },
};

const faqs = [
    { q: "What is the SSC CGL 2026 signature size in KB?", a: "The SSC CGL 2026 signature must be between 10 KB and 20 KB in file size, in JPEG format, with dimensions 3.5 cm × 1.5 cm. Set target to 20 KB in our tool for guaranteed portal compliance." },
    { q: "What is the SSC CGL 2026 photo size requirement?", a: "The SSC CGL 2026 passport photo must be between 20 KB and 50 KB in JPEG format. Dimensions are passport size (3.5 cm × 4.5 cm) with a white or light background." },
    { q: "Can I resize SSC CGL photo and signature in the same tool?", a: "Yes! Our SSC CGL Resizer handles both. For photos, set target to 50KB with 3.5×4.5 cm dimensions. For signatures, set 20KB with 3.5×1.5 cm. Download each separately." },
    { q: "Why does SSC CGL reject my signature?", a: "Common reasons: Capital letter signature (SSC requires running handwriting), file size outside 10-20KB range, wrong format (not JPEG), or dimensions that don't match specifications." },
    { q: "Can I use PNG for SSC CGL signature upload?", a: "No. SSC CGL requires JPEG/JPG format only. Our tool automatically converts PNG to JPG while resizing, so you can upload any format and get a portal-ready JPEG output." },
];

const h2Style = { fontSize: 'clamp(22px, 4vw, 28px)', color: '#0f172a', fontWeight: 800 as const, marginTop: '40px', marginBottom: '16px', lineHeight: 1.3 };
const h3Style = { fontSize: '20px', color: '#1e293b', fontWeight: 700 as const, marginTop: '24px', marginBottom: '12px' };
const pStyle = { fontSize: '16px', color: '#334155', lineHeight: 1.8, marginBottom: '16px' };
const liStyle = { marginBottom: '10px', fontSize: '16px', color: '#334155', lineHeight: 1.7 };

function SSCArticle() {
    return (
        <article style={{ padding: '0 clamp(10px,3vw,20px)', margin: '40px auto', maxWidth: '900px', fontFamily: 'system-ui, sans-serif', color: '#1e293b', lineHeight: 1.8 }}>
            <div style={{ background: 'linear-gradient(135deg,#f8fafc,#f1f5f9)', padding: 'clamp(20px,5vw,36px)', borderRadius: '20px', marginBottom: '36px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: 'clamp(16px,3vw,18px)', color: '#334155', fontWeight: 500, margin: 0 }}>
                    Every year, lakhs of candidates preparing for <strong>SSC CGL 2026</strong> get their applications rejected — not because of eligibility, but because their photo or signature fails strict portal validation. Our <strong>SSC CGL Photo &amp; Signature Resizer 2026</strong> solves this precisely. Upload your raw photo or handwritten signature and get a perfectly compliant file in seconds.
                </p>
            </div>

            <h2 style={h2Style}>SSC CGL 2026 — Official Photo &amp; Signature Size Requirements</h2>
            <p style={pStyle}>Before uploading to the SSC CGL 2026 application portal, confirm these exact specifications from the official notification:</p>

            <div style={{ background: '#eff6ff', padding: 'clamp(16px,4vw,28px)', borderRadius: '16px', border: '1px solid #bfdbfe', marginBottom: '20px' }}>
                <h3 style={{ ...h3Style, marginTop: 0, color: '#1e40af' }}>📋 SSC CGL Photo Specifications 2026</h3>
                <ul style={{ paddingLeft: '22px', margin: 0 }}>
                    <li style={liStyle}><strong>Format:</strong> JPEG / JPG only</li>
                    <li style={liStyle}><strong>File Size:</strong> 20 KB to 50 KB</li>
                    <li style={liStyle}><strong>Dimensions:</strong> Passport size — 3.5 cm × 4.5 cm</li>
                    <li style={{ ...liStyle, marginBottom: 0 }}><strong>Background:</strong> White or light background, recent photograph</li>
                </ul>
            </div>

            <div style={{ background: '#faf5ff', padding: 'clamp(16px,4vw,28px)', borderRadius: '16px', border: '1px solid #d8b4fe', marginBottom: '32px' }}>
                <h3 style={{ ...h3Style, marginTop: 0, color: '#6b21a8' }}>✍️ SSC CGL Signature Specifications 2026</h3>
                <ul style={{ paddingLeft: '22px', margin: 0 }}>
                    <li style={liStyle}><strong>Format:</strong> JPEG / JPG only</li>
                    <li style={liStyle}><strong>File Size:</strong> 10 KB to 20 KB</li>
                    <li style={liStyle}><strong>Dimensions:</strong> 3.5 cm × 1.5 cm</li>
                    <li style={liStyle}><strong>Ink:</strong> Black or blue ballpoint pen on white paper</li>
                    <li style={{ ...liStyle, marginBottom: 0 }}><strong>Important:</strong> Must NOT be in capital letters — only running handwriting</li>
                </ul>
            </div>

            <h2 style={h2Style}>How to Use the SSC CGL Resizer — Step by Step</h2>
            <h3 style={h3Style}>Step 1 — Upload Your Image</h3>
            <p style={pStyle}>Drop your raw photo or scanned signature into the upload box above. Accepts JPG, PNG, and WebP. No registration or app download needed.</p>

            <h3 style={h3Style}>Step 2 — Set the Dimensions</h3>
            <p style={pStyle}>For <strong>signature</strong>: Select Centimeter → Width = <strong>3.5 cm</strong>, Height = <strong>1.5 cm</strong>.<br />For <strong>passport photo</strong>: Width = <strong>3.5 cm</strong>, Height = <strong>4.5 cm</strong>.</p>

            <h3 style={h3Style}>Step 3 — Set Target KB</h3>
            <p style={pStyle}>For signature → set <strong>20 KB</strong>. For photo → set <strong>50 KB</strong>. Our engine hits the exact size without blurring.</p>

            <h3 style={h3Style}>Step 4 — Resize &amp; Download</h3>
            <p style={pStyle}>Click Resize. Download and upload directly to the SSC CGL 2026 portal — rejection free!</p>

            <h2 style={h2Style}>SSC CGL 2026 Photo vs Signature — Comparison</h2>
            <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                    <thead>
                        <tr style={{ background: '#ede9fe' }}>
                            {['Parameter', 'Photo', 'Signature'].map(h => (
                                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 800, color: '#4c1d95', borderBottom: '2px solid #c4b5fd' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            ['File Size', '20 KB – 50 KB', '10 KB – 20 KB'],
                            ['Dimensions', '3.5 × 4.5 cm', '3.5 × 1.5 cm'],
                            ['Format', 'JPG / JPEG', 'JPG / JPEG'],
                            ['Background', 'White / light', 'White blank paper'],
                            ['Content', 'Passport size face', 'Handwritten (running)'],
                        ].map(([param, photo, sig], i) => (
                            <tr key={param} style={{ background: i % 2 === 0 ? '#fff' : '#faf5ff', borderBottom: '1px solid #e2e8f0' }}>
                                <td style={{ padding: '12px 16px', fontWeight: 700, color: '#374151' }}>{param}</td>
                                <td style={{ padding: '12px 16px', color: '#64748b' }}>{photo}</td>
                                <td style={{ padding: '12px 16px', color: '#64748b' }}>{sig}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h2 style={h2Style}>Common Mistakes That Get SSC Applications Rejected</h2>
            <ul style={{ paddingLeft: '22px', marginBottom: '32px' }}>
                <li style={liStyle}><strong>Capital letter signature</strong> — SSC rejects all-caps. Use running handwriting only.</li>
                <li style={liStyle}><strong>Lined paper</strong> — Always sign on blank white A4 paper, not ruled notebook pages.</li>
                <li style={liStyle}><strong>Yellow/dim background</strong> — Use bright natural light against a plain white wall for photos.</li>
                <li style={liStyle}><strong>Wrong format</strong> — SSC needs JPEG/JPG only. Our tool auto-converts PNG to JPG.</li>
                <li style={{ ...liStyle, marginBottom: 0 }}><strong>File under 10 KB</strong> — Portal rejects over-compressed files too. Our tool targets the safe range.</li>
            </ul>

            <h2 style={h2Style}>Related Tools</h2>
            <ul style={{ paddingLeft: '22px', marginBottom: '24px' }}>
                <li style={liStyle}><Link href="/image-tools/resize-image-to-20kb" style={{ color: '#4f46e5', fontWeight: 700 }}>Resize Image to 20KB</Link> — For portals requiring 20KB photo limit</li>
                <li style={liStyle}><Link href="/govt-exam-tools/signature-resize" style={{ color: '#4f46e5', fontWeight: 700 }}>General Signature Resize Tool</Link> — For non-SSC exams</li>
                <li style={liStyle}><Link href="/mb-to-kb-image-converter" style={{ color: '#4f46e5', fontWeight: 700 }}>MB to KB Converter</Link> — For heavy photos 1MB+ to target KB</li>
                <li style={{ ...liStyle, marginBottom: 0 }}><Link href="/image-tools" style={{ color: '#4f46e5', fontWeight: 700 }}>All Image Tools</Link> — Full image tools directory</li>
            </ul>
        </article>
    );
}

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
                                "name": "SSC CGL Photo & Signature Resizer 2026",
                                "url": "https://smarttoolswala.com/govt-exam-tools/ssc-signature-resize",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "description": "Free tool to resize SSC CGL 2026 photo and signature to exact portal specifications.",
                                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
                            },
                            {
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                                    { "@type": "ListItem", "position": 2, "name": "Govt Exam Tools", "item": "https://smarttoolswala.com/govt-exam-tools" },
                                    { "@type": "ListItem", "position": 3, "name": "SSC CGL Photo & Signature Resizer 2026", "item": "https://smarttoolswala.com/govt-exam-tools/ssc-signature-resize" }
                                ]
                            },
                            {
                                "@type": "FAQPage",
                                "mainEntity": faqs.map(f => ({
                                    "@type": "Question",
                                    "name": f.q,
                                    "acceptedAnswer": { "@type": "Answer", "text": f.a }
                                }))
                            }
                        ]
                    })
                }}
            />
            <SignatureResizeClient
                title="SSC CGL Photo & Signature Resizer 2026"
                subtitle="Resize your SSC CGL 2026 signature to 10–20 KB (3.5×1.5 cm) and passport photo to 20–50 KB — instantly, free, no software needed."
            >
                <SEOBottomSection keyword="ssc cgl photo signature resizer 2026" faqs={faqs}>
                    <SSCArticle />
                </SEOBottomSection>
            </SignatureResizeClient>
        </>
    );
}
