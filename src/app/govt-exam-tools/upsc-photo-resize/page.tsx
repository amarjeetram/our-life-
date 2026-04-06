import { Metadata } from 'next';
import SignatureResizeClient from '@/components/SignatureResizeClient';
import SEOBottomSection from '@/components/SEOBottomSection';
import Link from 'next/link';

export const metadata: Metadata = {
    title: { absolute: 'UPSC Photo Resize 2026 — IAS/IFS Photo & Signature Size Tool' },
    description: 'Resize UPSC IAS photo and signature online for 2026 civil services applications. Compress UPSC photo to 20-300KB and signature to 10-40KB instantly, free.',
    keywords: 'upsc photo resize, upsc photo size kb, upsc ias photo resize, upsc signature resize, upsc photo 300kb, upsc photo size 2026, resize photo for upsc portal',
    alternates: {
        canonical: 'https://smarttoolswala.com/govt-exam-tools/upsc-photo-resize',
    },
};

const faqs = [
    { q: 'What is the UPSC photo size requirement for 2026?', a: 'For UPSC CSE 2026, the passport photo must be in JPEG format, between 20 KB and 300 KB, with dimensions not exceeding 350×350 pixels. The face must be clearly visible with a white background.' },
    { q: 'What is the UPSC signature size in KB?', a: 'The UPSC signature must be in JPEG format, between 10 KB and 40 KB. Dimensions should not exceed 350×100 pixels. Sign with black ink on white paper in running handwriting.' },
    { q: 'How do I resize my photo to 300KB for UPSC?', a: 'Upload your photo in the tool above. Set the target KB to 300. The tool will compress your image to within 300KB while maintaining clarity. Download and upload directly to the UPSC portal.' },
    { q: 'Can I use PNG for UPSC photo upload?', a: 'No, UPSC requires JPEG/JPG format only. Our tool automatically converts PNG or WebP to JPEG while resizing, so you can upload any format and get a UPSC-compliant JPEG output.' },
    { q: 'Why is my UPSC photo getting rejected?', a: 'Common reasons: file size outside the 20KB-300KB range, wrong format (not JPEG), background not plain white, wearing glasses or cap, or signature in capital letters.' },
    { q: 'Is this UPSC photo resize tool safe?', a: '100% safe. Everything is processed locally in your browser — your photo and signature never leave your device. No server uploads, no watermarks, no data stored.' },
    { q: 'Can I resize both UPSC photo and signature in the same tool?', a: 'Yes! Set dimensions for your photo (set target to 300KB), then upload your signature separately and set target to 40KB. Download each file separately before uploading to the UPSC portal.' },
];

const h2 = { fontSize: 'clamp(22px, 4vw, 28px)', color: '#0f172a', fontWeight: 800 as const, marginTop: '40px', marginBottom: '16px', lineHeight: 1.3 };
const h3 = { fontSize: '20px', color: '#1e293b', fontWeight: 700 as const, marginTop: '28px', marginBottom: '12px' };
const p = { fontSize: '16px', color: '#334155', lineHeight: 1.8, marginBottom: '16px' };
const li = { marginBottom: '10px', fontSize: '16px', color: '#334155', lineHeight: 1.7 };

function UPSCArticle() {
    return (
        <article style={{ padding: '0 clamp(10px,3vw,20px)', margin: '40px auto', maxWidth: '900px', fontFamily: 'system-ui, sans-serif', color: '#1e293b', lineHeight: 1.8 }}>

            {/* Intro */}
            <div style={{ background: 'linear-gradient(135deg,#f8fafc,#f1f5f9)', padding: 'clamp(20px,5vw,36px)', borderRadius: '20px', marginBottom: '36px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: 'clamp(16px,3vw,18px)', color: '#334155', fontWeight: 500, margin: 0 }}>
                    The UPSC Civil Services Examination (IAS/IFS) is one of the most competitive exams in India — and the application portal is equally strict about photo and signature uploads. A wrong file size or format can block your submission entirely. Our <strong>UPSC Photo Resize tool</strong> ensures your passport photo and signature meet every official 2026 requirement — compress, resize, and download in seconds, completely free.
                </p>
            </div>

            {/* Requirements */}
            <h2 style={h2}>UPSC 2026 Official Photo &amp; Signature Size Requirements</h2>
            <p style={p}>Before uploading to the UPSC application portal, confirm these specifications from the official UPSC notification:</p>

            <div style={{ background: '#eff6ff', padding: 'clamp(16px,4vw,28px)', borderRadius: '16px', border: '1px solid #bfdbfe', marginBottom: '20px' }}>
                <h3 style={{ ...h3, marginTop: 0, color: '#1e40af' }}>📋 UPSC Passport Photo Specifications 2026</h3>
                <ul style={{ paddingLeft: '22px', margin: 0 }}>
                    <li style={li}><strong>Format:</strong> JPEG / JPG only</li>
                    <li style={li}><strong>File Size:</strong> 20 KB to 300 KB</li>
                    <li style={li}><strong>Max Dimensions:</strong> 350 × 350 pixels</li>
                    <li style={li}><strong>Background:</strong> Plain white — no shadows, no patterns</li>
                    <li style={{ ...li, marginBottom: 0 }}><strong>Face:</strong> Must be clearly visible, no glasses, no cap</li>
                </ul>
            </div>

            <div style={{ background: '#faf5ff', padding: 'clamp(16px,4vw,28px)', borderRadius: '16px', border: '1px solid #d8b4fe', marginBottom: '32px' }}>
                <h3 style={{ ...h3, marginTop: 0, color: '#6b21a8' }}>✍️ UPSC Signature Specifications 2026</h3>
                <ul style={{ paddingLeft: '22px', margin: 0 }}>
                    <li style={li}><strong>Format:</strong> JPEG / JPG only</li>
                    <li style={li}><strong>File Size:</strong> 10 KB to 40 KB</li>
                    <li style={li}><strong>Max Dimensions:</strong> 350 × 100 pixels</li>
                    <li style={li}><strong>Ink:</strong> Black pen on plain white paper</li>
                    <li style={{ ...li, marginBottom: 0 }}><strong>Important:</strong> Signature must be in running handwriting — NOT capital letters</li>
                </ul>
            </div>

            {/* Comparison Table */}
            <h2 style={h2}>UPSC Photo vs Signature — Quick Reference Table</h2>
            <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '15px' }}>
                    <thead>
                        <tr style={{ background: '#ede9fe' }}>
                            {['Parameter', 'Passport Photo', 'Signature'].map(h => (
                                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 800, color: '#4c1d95', borderBottom: '2px solid #c4b5fd' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            ['File Size', '20 KB – 300 KB', '10 KB – 40 KB'],
                            ['Max Dimensions', '350 × 350 px', '350 × 100 px'],
                            ['Format', 'JPG / JPEG', 'JPG / JPEG'],
                            ['Background', 'Plain white', 'Plain white paper'],
                            ['Content', 'Recent passport face', 'Handwritten (running)'],
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

            {/* How to use */}
            <h2 style={h2}>How to Use the UPSC Photo Resize Tool — Step by Step</h2>

            <h3 style={h3}>Step 1 — Upload Your Photo or Signature</h3>
            <p style={p}>Click the upload box above or drag your image directly. Supports JPG, PNG, and WebP. For UPSC photo, use a recent passport-size photo with white background. For signature, use a clear scan on white paper.</p>

            <h3 style={h3}>Step 2 — Set Dimensions</h3>
            <p style={p}>Switch to <em>Pixel</em> mode. For <strong>passport photo</strong>: enter Width = <strong>350</strong>, Height = <strong>350</strong>. For <strong>signature</strong>: enter Width = <strong>350</strong>, Height = <strong>100</strong>.</p>

            <h3 style={h3}>Step 3 — Set Target File Size</h3>
            <p style={p}>For <strong>photo</strong>: set target to <strong>300 KB</strong>. For <strong>signature</strong>: set target to <strong>40 KB</strong>. The tool will compress exactly within that limit.</p>

            <h3 style={h3}>Step 4 — Resize &amp; Download</h3>
            <p style={p}>Click <em>Resize Signature</em>. Your UPSC-compliant file will be ready in seconds. Download and upload directly to the UPSC online application portal — no rejection!</p>

            {/* Common mistakes */}
            <h2 style={h2}>Common Reasons UPSC Photo Gets Rejected</h2>
            <ul style={{ paddingLeft: '22px', marginBottom: '32px' }}>
                <li style={li}><strong>File size outside range:</strong> UPSC rejects files below 20KB (too small) or above 300KB (too large). Use our tool to hit the exact sweet spot.</li>
                <li style={li}><strong>Wrong format:</strong> Only JPEG/JPG is accepted. Our tool converts PNG/WebP automatically.</li>
                <li style={li}><strong>Glasses or headgear:</strong> UPSC explicitly requires an unobstructed face — no sunglasses, frames covering eyes, or caps.</li>
                <li style={li}><strong>Coloured or patterned background:</strong> Must be plain white. Light blue or grey often causes auto-rejection.</li>
                <li style={li}><strong>Signature in capitals:</strong> UPSC requires running cursive handwriting. All-caps signatures are rejected.</li>
                <li style={{ ...li, marginBottom: 0 }}><strong>Old photograph:</strong> Photo must be recent (within 6 months). Old photos with yellowish tones are rejected by the AI scanner.</li>
            </ul>

            {/* Internal links */}
            <h2 style={h2}>More Govt Exam Photo Tools</h2>
            <ul style={{ paddingLeft: '22px', marginBottom: '24px' }}>
                <li style={li}><Link href="/govt-exam-tools/ssc-signature-resize" style={{ color: '#4f46e5', fontWeight: 700 }}>SSC CGL Photo &amp; Signature Resizer 2026</Link> — For SSC CGL portal with 3.5×1.5 cm signature specs</li>
                <li style={li}><Link href="/govt-exam-tools/gds-photo-resize" style={{ color: '#4f46e5', fontWeight: 700 }}>GDS Photo Resize Tool</Link> — India Post GDS 50KB photo and 20KB signature</li>
                <li style={li}><Link href="/govt-exam-tools/signature-resize" style={{ color: '#4f46e5', fontWeight: 700 }}>General Signature Resize</Link> — For any exam with custom dimension requirements</li>
                <li style={{ ...li, marginBottom: 0 }}><Link href="/mb-to-kb-image-converter" style={{ color: '#4f46e5', fontWeight: 700 }}>MB to KB Converter</Link> — For large raw photos from 1MB+ to small KB size</li>
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
                                "name": "UPSC Photo Resize Tool 2026",
                                "url": "https://smarttoolswala.com/govt-exam-tools/upsc-photo-resize",
                                "applicationCategory": "Utility",
                                "operatingSystem": "All",
                                "description": "Free tool to resize UPSC IAS/IFS photo and signature to exact 2026 portal specifications.",
                                "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
                            },
                            {
                                "@type": "BreadcrumbList",
                                "itemListElement": [
                                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://smarttoolswala.com" },
                                    { "@type": "ListItem", "position": 2, "name": "Govt Exam Tools", "item": "https://smarttoolswala.com/govt-exam-tools" },
                                    { "@type": "ListItem", "position": 3, "name": "UPSC Photo Resize 2026", "item": "https://smarttoolswala.com/govt-exam-tools/upsc-photo-resize" }
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
                title="UPSC Photo Resize 2026"
                subtitle="Resize your UPSC IAS/IFS passport photo to 20–300 KB and signature to 10–40 KB as per official 2026 civil services portal requirements — instantly, free, no software."
            >
                <SEOBottomSection keyword="upsc photo resize 2026" faqs={faqs}>
                    <UPSCArticle />
                </SEOBottomSection>
            </SignatureResizeClient>
        </>
    );
}
