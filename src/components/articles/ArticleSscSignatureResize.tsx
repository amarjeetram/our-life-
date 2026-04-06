import Link from 'next/link';

const s = {
    h2: { fontSize: 'clamp(22px, 4vw, 28px)', color: '#0f172a', fontWeight: 800 as const, marginTop: '40px', marginBottom: '16px', lineHeight: 1.3 },
    h3: { fontSize: '20px', color: '#1e293b', fontWeight: 700 as const, marginTop: '24px', marginBottom: '12px' },
    p: { fontSize: '16px', color: '#334155', lineHeight: 1.8, marginBottom: '16px' },
    li: { marginBottom: '10px', fontSize: '16px', color: '#334155', lineHeight: 1.7 },
};

export default function ArticleSSCSignatureResize() {
    return (
        <article style={{ padding: '0 clamp(10px,3vw,20px)', margin: '40px auto', maxWidth: '900px', fontFamily: 'system-ui, sans-serif', color: '#1e293b', lineHeight: 1.8 }}>

            {/* Intro box */}
            <div style={{ background: 'linear-gradient(135deg,#f8fafc,#f1f5f9)', padding: 'clamp(20px,5vw,36px)', borderRadius: '20px', marginBottom: '36px', border: '1px solid #e2e8f0' }}>
                <p style={{ fontSize: 'clamp(16px,3vw,18px)', color: '#334155', fontWeight: 500, margin: 0 }}>
                    Every year, lakhs of candidates preparing for <strong>SSC CGL 2026</strong> get their applications rejected — not because of eligibility issues, but because their photo or signature fails the strict portal validation. Our <strong>SSC CGL Photo &amp; Signature Resizer 2026</strong> solves this exactly. Upload your raw photo or handwritten signature and get a perfectly compliant file in seconds — no software needed.
                </p>
            </div>

            <h2 style={s.h2}>SSC CGL 2026 — Official Photo &amp; Signature Size Requirements</h2>
            <p style={s.p}>
                Before uploading anything to the SSC CGL 2026 application portal, confirm these exact specifications from the official notification:
            </p>

            {/* Photo specs box */}
            <div style={{ background: '#eff6ff', padding: 'clamp(16px,4vw,28px)', borderRadius: '16px', border: '1px solid #bfdbfe', marginBottom: '20px' }}>
                <h3 style={{ ...s.h3, marginTop: 0, color: '#1e40af' }}>📋 SSC CGL Photo Specifications 2026</h3>
                <ul style={{ paddingLeft: '22px', margin: 0 }}>
                    <li style={s.li}><strong>Format:</strong> JPEG / JPG only</li>
                    <li style={s.li}><strong>File Size:</strong> 20 KB to 50 KB</li>
                    <li style={s.li}><strong>Dimensions:</strong> Passport size — 3.5 cm × 4.5 cm</li>
                    <li style={{ ...s.li, marginBottom: 0 }}><strong>Background:</strong> White or light background, recent photograph</li>
                </ul>
            </div>

            {/* Signature specs box */}
            <div style={{ background: '#faf5ff', padding: 'clamp(16px,4vw,28px)', borderRadius: '16px', border: '1px solid #d8b4fe', marginBottom: '32px' }}>
                <h3 style={{ ...s.h3, marginTop: 0, color: '#6b21a8' }}>✍️ SSC CGL Signature Specifications 2026</h3>
                <ul style={{ paddingLeft: '22px', margin: 0 }}>
                    <li style={s.li}><strong>Format:</strong> JPEG / JPG only</li>
                    <li style={s.li}><strong>File Size:</strong> 10 KB to 20 KB</li>
                    <li style={s.li}><strong>Dimensions:</strong> 3.5 cm × 1.5 cm</li>
                    <li style={s.li}><strong>Ink:</strong> Black or blue ballpoint pen on white paper</li>
                    <li style={{ ...s.li, marginBottom: 0 }}><strong>Important:</strong> Must NOT be in capital letters — only running handwriting</li>
                </ul>
            </div>

            {/* How to use */}
            <h2 style={s.h2}>How to Use the SSC CGL Resizer Tool — Step by Step</h2>

            <h3 style={s.h3}>Step 1 — Upload Your Image</h3>
            <p style={s.p}>
                Drop your raw photo or scanned signature into the upload box above. The tool accepts JPG, PNG, and WebP formats. No registration, no app download, no watermark.
            </p>

            <h3 style={s.h3}>Step 2 — Set the Dimensions</h3>
            <p style={s.p}>
                For <strong>SSC CGL signature</strong>: Select <em>Centimeter</em> mode → Width = <strong>3.5 cm</strong>, Height = <strong>1.5 cm</strong>.<br />
                For <strong>SSC CGL passport photo</strong>: Width = <strong>3.5 cm</strong>, Height = <strong>4.5 cm</strong>.
            </p>

            <h3 style={s.h3}>Step 3 — Set Target KB Size</h3>
            <p style={s.p}>
                For <strong>signature</strong> → set target to <strong>20 KB</strong>. For <strong>passport photo</strong> → set target to <strong>50 KB</strong>. Our compression engine hits the exact size without blurring the image.
            </p>

            <h3 style={s.h3}>Step 4 — Resize &amp; Download</h3>
            <p style={s.p}>
                Click <em>Resize Signature</em>. Within seconds, download your file and upload it directly to the SSC CGL 2026 portal — rejection free!
            </p>

            {/* Comparison table */}
            <h2 style={s.h2}>SSC CGL 2026 Photo vs Signature — Key Differences</h2>
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

            {/* Common mistakes */}
            <h2 style={s.h2}>Common Mistakes That Get SSC CGL Applications Rejected</h2>
            <p style={s.p}>Even with the right tool, these mistakes can still cause portal rejection:</p>
            <ul style={{ paddingLeft: '22px', marginBottom: '32px' }}>
                <li style={s.li}><strong>Capital letter signature</strong> — SSC explicitly rejects all-caps. Sign in normal running handwriting only.</li>
                <li style={s.li}><strong>Lined paper</strong> — Never sign on ruled notebook paper. Use blank white A4 printing paper.</li>
                <li style={s.li}><strong>Yellow/dim photo background</strong> — Use bright natural light against a plain white wall for your passport photo.</li>
                <li style={s.li}><strong>Wrong file format</strong> — SSC accepts JPEG/JPG only. Our tool converts PNG to JPG automatically.</li>
                <li style={{ ...s.li, marginBottom: 0 }}><strong>File too small (under 10 KB for signature)</strong> — The portal rejects files that are over-compressed too. Our tool targets the safe sweet spot.</li>
            </ul>

            {/* Internal links */}
            <h2 style={s.h2}>Related Tools You May Need</h2>
            <ul style={{ paddingLeft: '22px', marginBottom: '24px' }}>
                <li style={s.li}><Link href="/image-tools/resize-image-to-20kb" style={{ color: '#4f46e5', fontWeight: 700, textDecoration: 'underline' }}>Resize Image to 20KB</Link> — For portals requiring 20KB photo limit</li>
                <li style={s.li}><Link href="/govt-exam-tools/signature-resize" style={{ color: '#4f46e5', fontWeight: 700, textDecoration: 'underline' }}>General Signature Resize Tool</Link> — For non-SSC exams with different dimension requirements</li>
                <li style={s.li}><Link href="/mb-to-kb-image-converter" style={{ color: '#4f46e5', fontWeight: 700, textDecoration: 'underline' }}>MB to KB Image Converter</Link> — For heavy photos 1MB+ to target KB</li>
                <li style={{ ...s.li, marginBottom: 0 }}><Link href="/image-tools" style={{ color: '#4f46e5', fontWeight: 700, textDecoration: 'underline' }}>All Image Tools</Link> — Complete image tools directory</li>
            </ul>

        </article>
    );
}
