import React from 'react';
import Link from 'next/link';

const h2 = { fontSize: 'clamp(22px, 4vw, 28px)', color: '#0f172a', fontWeight: 800 as const, marginTop: '40px', marginBottom: '16px', lineHeight: 1.3 };
const h3 = { fontSize: '20px', color: '#1e293b', fontWeight: 700 as const, marginTop: '28px', marginBottom: '12px' };
const p = { fontSize: '16px', color: '#334155', lineHeight: 1.8, marginBottom: '16px' };
const li = { marginBottom: '10px', fontSize: '16px', color: '#334155', lineHeight: 1.7 };

export default function ArticleGdsPhotoResize() {
    return (
        <article style={{ padding: '0 clamp(10px,3vw,20px)', margin: '40px auto', maxWidth: '900px', fontFamily: 'system-ui, sans-serif', color: '#1e293b', lineHeight: 1.8 }}>

            {/* Intro */}
            <div style={{ background: 'linear-gradient(135deg,#f8fafc,#f1f5f9)', padding: 'clamp(20px,5vw,36px)', borderRadius: '20px', marginBottom: '36px', border: '1px solid #e2e8f0' }}>
                <h2 style={{ ...h2, marginTop: 0, fontSize: 'clamp(24px,5vw,32px)' }}>
                    The Only GDS Photo Resize to 50KB &amp; 20KB Tool You Need
                </h2>
                <p style={{ ...p, marginBottom: 0 }}>
                    Applying for India Post Gramin Dak Sevak (GDS) recruitment? The hardest part is the document upload — the portal is extremely strict. If your photo is even 1 KB over the limit, the application gets rejected. Our <strong>GDS photo resizer</strong> fixes this — resize to exactly 50KB or 20KB instantly, free, and without any app download.
                </p>
            </div>

            {/* Section 1 */}
            <h2 style={h2}>Official GDS Photo &amp; Signature Upload Requirements</h2>
            <p style={p}>India Post has two separate documents with completely different rules. Mixing them up is the #1 reason applications get rejected.</p>

            {/* Photo box */}
            <div style={{ background: '#eff6ff', padding: 'clamp(16px,4vw,28px)', borderRadius: '16px', border: '1px solid #bfdbfe', marginBottom: '20px' }}>
                <h3 style={{ ...h3, marginTop: 0, color: '#1e40af' }}>📍 GDS Passport Photo Specifications</h3>
                <ul style={{ paddingLeft: '22px', margin: 0 }}>
                    <li style={li}><strong>Maximum File Size:</strong> 50 KB or less</li>
                    <li style={li}><strong>Dimensions:</strong> 200 px × 230 px</li>
                    <li style={li}><strong>Format:</strong> JPG / JPEG only</li>
                    <li style={{ ...li, marginBottom: 0 }}><strong>Background:</strong> White or light blue — plain, no shadows</li>
                </ul>
            </div>

            {/* Signature box */}
            <div style={{ background: '#f0fdf4', padding: 'clamp(16px,4vw,28px)', borderRadius: '16px', border: '1px solid #bbf7d0', marginBottom: '32px' }}>
                <h3 style={{ ...h3, marginTop: 0, color: '#166534' }}>📍 GDS Signature Upload Specifications</h3>
                <ul style={{ paddingLeft: '22px', margin: 0 }}>
                    <li style={li}><strong>Maximum File Size:</strong> 20 KB or less</li>
                    <li style={li}><strong>Dimensions:</strong> 140 px × 60 px</li>
                    <li style={li}><strong>Format:</strong> JPG / JPEG only</li>
                    <li style={{ ...li, marginBottom: 0 }}><strong>Ink:</strong> Dark black pen on blank white paper (no ruled lines)</li>
                </ul>
            </div>

            {/* Section 2 */}
            <h2 style={h2}>How to Use the GDS Photo Resizer — Step by Step</h2>

            <h3 style={h3}>Step 1 — Take the Perfect Photo</h3>
            <p style={p}>Stand facing a window in natural daylight against a plain white wall. Take an unfiltered selfie. For signature, sign clearly on blank white printer paper with a thick black pen — no notebook lines.</p>

            <h3 style={h3}>Step 2 — Upload Your Image</h3>
            <p style={p}>Scroll up and drop your photo or signature into the upload box. You can also tap to pick from your phone gallery. Supports JPG, PNG, and WebP.</p>

            <h3 style={h3}>Step 3 — Set Dimensions and Target KB</h3>
            <p style={p}>
                For <strong>passport photo</strong>: Set Width = <strong>200 px</strong>, Height = <strong>230 px</strong>, Target = <strong>50 KB</strong>.<br />
                For <strong>signature</strong>: Set Width = <strong>140 px</strong>, Height = <strong>60 px</strong>, Target = <strong>20 KB</strong>.
            </p>

            <h3 style={h3}>Step 4 — Resize &amp; Download</h3>
            <p style={p}>Click <em>Resize Signature</em>. Your file will be compressed and downloaded instantly, ready to upload directly to the India Post GDS portal.</p>

            {/* Section 3 */}
            <h2 style={h2}>Why This Tool is Safe for Govt Form Documents</h2>
            <p style={p}>
                Many online tools upload your photo to foreign servers — putting your personal data at risk. Our <strong>GDS photo dimension tool</strong> works 100% in your browser (client-side). Your photo and signature <strong>never leave your device</strong>. Everything is processed locally — instant, private, and secure.
            </p>

            {/* Section 4 */}
            <h2 style={h2}>Common Mistakes GDS Applicants Make</h2>
            <ul style={{ paddingLeft: '22px', marginBottom: '32px' }}>
                <li style={li}><strong>Photographing a printed photo:</strong> Don't photograph a printed passport photo. The glare makes the face unclear. Take a fresh photo directly.</li>
                <li style={li}><strong>Wearing glasses or caps:</strong> India Post explicitly disqualifies photos with tinted glasses, heavy frames, or headgear.</li>
                <li style={li}><strong>Mixing up uploads:</strong> Many candidates accidentally upload the 20KB signature in the photo slot and vice versa. Always double-check the preview before submitting.</li>
                <li style={li}><strong>Lined paper for signature:</strong> Using notebook paper leaves visible ruled lines in the scan. Always use blank white A4 printer paper.</li>
                <li style={{ ...li, marginBottom: 0 }}><strong>Dark or shadowed background:</strong> Poor lighting ruins photo quality. Use bright natural light near a window.</li>
            </ul>

            {/* Internal links */}
            <h2 style={h2}>Related Tools You May Need</h2>
            <ul style={{ paddingLeft: '22px', marginBottom: '24px' }}>
                <li style={li}><Link href="/govt-exam-tools/ssc-signature-resize" style={{ color: '#4f46e5', fontWeight: 700 }}>SSC CGL Photo &amp; Signature Resizer 2026</Link> — Specifically for SSC CGL portal requirements</li>
                <li style={li}><Link href="/govt-exam-tools/signature-resize" style={{ color: '#4f46e5', fontWeight: 700 }}>General Signature Resize Tool</Link> — For any exam with custom dimension requirements</li>
                <li style={li}><Link href="/image-tools/resize-image-to-20kb" style={{ color: '#4f46e5', fontWeight: 700 }}>Resize Image to 20KB</Link> — Standalone 20KB resize for any portal</li>
                <li style={{ ...li, marginBottom: 0 }}><Link href="/mb-to-kb-image-converter" style={{ color: '#4f46e5', fontWeight: 700 }}>MB to KB Converter</Link> — For large MB photos to target KB</li>
            </ul>

            {/* FAQ Section */}
            <div style={{ marginTop: '56px', background: '#f8fafc', padding: 'clamp(20px,5vw,40px)', borderRadius: '28px', border: '1px solid #e2e8f0' }}>
                <h2 style={{ ...h2, marginTop: 0, textAlign: 'center', fontSize: 'clamp(24px,5vw,30px)' }}>
                    Frequently Asked Questions (FAQs)
                </h2>

                {[
                    {
                        q: 'How do I resize my GDS photo to 50KB?',
                        a: 'Upload your photo in the tool above. Set Width = 200 px, Height = 230 px, and Target Size = 50 KB. Click Resize and download the output — it will be within 50KB and accepted by the India Post GDS portal.'
                    },
                    {
                        q: 'How to do a GDS photo resize to 20KB for signature?',
                        a: 'Use the same tool! Upload your signature image. Set Width = 140 px, Height = 60 px, and Target = 20 KB. Download the output. It will fit perfectly in the GDS signature upload slot.'
                    },
                    {
                        q: 'What is the GDS photo size in pixels?',
                        a: 'The official India Post GDS passport photo must be 200 pixels wide × 230 pixels tall. The signature must be 140 pixels wide × 60 pixels tall. Our tool lets you enter exact pixel dimensions.'
                    },
                    {
                        q: 'Does this tool set the correct pixel dimensions automatically?',
                        a: 'Yes. You enter the target pixel dimensions (200×230 for photo, 140×60 for signature), and our tool resizes the image to those exact dimensions while also compressing to the target KB.'
                    },
                    {
                        q: 'Is this GDS photo resizer tool safe to use?',
                        a: '100% safe. Your photo and signature never leave your device — everything is processed locally in your browser using the File API. No uploads to any server, no data stored, no watermark added.'
                    },
                    {
                        q: 'What file format does GDS require for photo upload?',
                        a: 'India Post GDS requires JPG/JPEG format only. Our tool automatically converts PNG or WebP to JPEG during the resize process, so you can upload any format.'
                    },
                    {
                        q: 'Why is my GDS application photo getting rejected even after resizing?',
                        a: 'Common reasons: wearing glasses or cap in the photo, dark or shadowed background, signature in capital letters, using notebook paper with ruled lines for signature, or accidentally uploading the photo in the signature slot. Check all these before resubmitting.'
                    },
                ].map((faq, i) => (
                    <div key={i} style={{ marginBottom: '20px', background: '#fff', padding: 'clamp(16px,4vw,24px)', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                        <h3 style={{ ...h3, marginTop: 0, marginBottom: '10px', fontSize: '17px', color: '#0f172a' }}>
                            {i + 1}. {faq.q}
                        </h3>
                        <p style={{ ...p, marginBottom: 0, color: '#475569' }}>{faq.a}</p>
                    </div>
                ))}
            </div>

        </article>
    );
}
