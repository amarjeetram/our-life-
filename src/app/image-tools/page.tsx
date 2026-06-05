import Link from "next/link";
import { ArrowRight, ImageIcon, Minimize2, RefreshCw, ArrowLeftRight, GraduationCap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Image Tools | SmartToolsWala",
    description: "Free online photo and image compression tools. Compress, resize, and convert photos to exact KB sizes instantly without losing quality.",
    alternates: {
        canonical: "https://smarttoolswala.com/image-tools",
    },
};

const groups = [
    {
        id: "compress",
        heading: "Compress Image Tools",
        subtitle: "Reduce image file size to an exact KB target for government portals, exam forms, and document uploads.",
        iconColor: "#6366f1", // Indigo
        gradient: "linear-gradient(135deg, #6366f1, #a855f7)",
        bgLight: "#eef2ff",
        tools: [
            { route: '/image-compressor-to-20kb', title: 'Image Compressor to 20KB', desc: 'Perfect for UPSC, SSC & govt portals. Guaranteed under 20KB.', tags: ['UPSC / IAS', 'SSC', 'Forms'] },
            { route: '/photo-compressor-to-30kb', title: 'Photo Compressor to 30KB', desc: 'Strictly under 30KB for specific government compliance formats.', tags: ['Compliance', 'State Exams'] },
            { route: '/compress-image-to-50kb', title: 'Compress to 50KB', desc: 'Ideal for Bank exams, admit cards, and diverse state portals.', tags: ['Bank Forms', 'Admit Cards'] },
            { route: '/compress-image-to-100kb', title: 'Compress to 100KB', desc: 'Standard compression for high-quality professional document uploads.', tags: ['General', 'High Quality'] },
            { route: '/compress-image-to-200kb', title: 'Compress to 200KB', desc: 'Heavy files to 200KB for portals requiring larger HD formats.', tags: ['HD Docs', 'Websites'] },
        ],
    },
    {
        id: "resize",
        heading: "Resize Image Tools",
        subtitle: "Intelligently resize and compress photos to a precise KB size — perfect for signatures, passport photos, and scanned documents.",
        iconColor: "#8b5cf6", // Violet
        gradient: "linear-gradient(135deg, #8b5cf6, #d946ef)",
        bgLight: "#f5f3ff",
        tools: [
            { route: '/image-tools/resize-image-to-15kb', title: 'Resize Image to 15KB', desc: 'Resize image to 15kb online without losing quality. Perfect for signature and thumbprint uploads.', tags: ['Resize to 15KB', 'Signature'] },
            { route: '/image-tools/resize-image-to-20kb', title: 'Resize Image to 20KB', desc: 'Resize image to 20kb to 50kb online for passport dimensions and quick online formats.', tags: ['Resize to 20KB', 'Passport Size'] },
            { route: '/image-tools/resize-image-to-30kb', title: 'Resize Image to 30KB', desc: 'Precisely resize image to 30kb online. Perfect for SSC, RRB signature uploads without quality loss.', tags: ['Resize to 30KB', 'SSC', 'RRB'] },
            { route: '/image-tools/resize-image-to-100kb', title: 'Resize Image to 100KB', desc: 'Resize and compress file size exactly under 100KB for professional registration forms.', tags: ['Resize to 100KB', 'Web'] },
            { route: '/image-tools/resize-image-to-200kb', title: 'Resize Image to 200KB', desc: 'Resize larger document scans natively and securely exactly under 200KB.', tags: ['Resize to 200KB', 'Scans'] },
        ],
    },
    {
        id: "converters",
        heading: "File Size Converters",
        subtitle: "Convert between MB and KB instantly — check exact file sizes for images, PDFs, and photos before submitting online.",
        iconColor: "#0ea5e9", // Sky
        gradient: "linear-gradient(135deg, #0ea5e9, #3b82f6)",
        bgLight: "#f0f9ff",
        tools: [
            { route: '/mb-to-kb-image-converter', title: 'MB to KB Image Converter', desc: 'Convert image from MB to KB online. Preview your compressed photo before downloading — free & instant.', tags: ['MB to KB', 'Preview'] },
            { route: '/image-tools/kb-to-mb-image-converter', title: 'KB to MB Converter', desc: 'Instantly check photo, PDF, or image KB to MB. Free online calculator + file upload — no server needed.', tags: ['KB to MB', 'PDF', 'Calculator'] },
        ],
    },
    {
        id: "govt",
        heading: "Govt Exam Photo Tools",
        subtitle: "Specialized tools designed to meet exact photo and signature requirements for popular Indian government exams.",
        iconColor: "#059669", // Emerald
        gradient: "linear-gradient(135deg, #10b981, #059669)",
        bgLight: "#ecfdf5",
        tools: [
            { route: '/govt-exam-tools/rrb-signature-resizer', title: 'RRB Signature Resizer', desc: 'Resize signature to exact 140x60 pixels for RRB & IBPS exams.', tags: ['RRB', 'IBPS', 'Sign'] },
            { route: '/govt-exam-tools/uti-photo-resize', title: 'UTI Photo Resize', desc: 'Crop and resize photo for UTI PAN applications (213x213px).', tags: ['UTI', 'PAN', 'Crop'] },
            { route: '/govt-exam-tools/neet-photo-resizer', title: 'NEET Photo Resizer', desc: 'Resize passport and postcard photos for NEET 2026 as per NTA instructions.', tags: ['NEET 2026', 'NTA', 'Exam'] },
            { route: '/govt-exam-tools/pan-card-photo-resize', title: 'PAN Card Photo Resize', desc: 'Resize photo and signature for PAN card (UTI/NSDL). 213x213px & 10-20KB presets.', tags: ['PAN Card', 'UTI', 'NSDL'] },
            { route: '/govt-exam-tools/tnpsc-photo-compressor', title: 'TNPSC Photo Compressor', desc: 'Compress TNPSC photo to 20-50KB and signature to 10-20KB as per official TNPSC requirements.', tags: ['TNPSC', 'Tamil Nadu'] },
            { route: '/govt-exam-tools/signature-resize', title: 'Signature Resize', desc: 'Resize your signature to 10-20KB, specify dimensions in cm or pixels for SSC & RRB exams.', tags: ['Signature', 'SSC', 'RRB'] },
        ],
    },
];

const groupIcons: Record<string, React.ReactNode> = {
    compress: <Minimize2 size={24} color="#fff" />,
    resize: <RefreshCw size={24} color="#fff" />,
    converters: <ArrowLeftRight size={24} color="#fff" />,
    govt: <GraduationCap size={24} color="#fff" />,
};

export default function ImageCompressionToolsPage() {
    return (
        <main style={{ minHeight: "100vh", background: "linear-gradient(180deg, #eff6ff 0%, #fafafa 100%)", fontFamily: "sans-serif" }}>
            <style>{`
                .img-tool-card {
                    background: #fff; border-radius: 20px;
                    border: 1.5px solid #e2e8f0; padding: 24px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    transition: all 0.18s; cursor: pointer;
                    display: flex; flex-direction: column;
                    text-decoration: none; color: inherit;
                }
                .img-tool-card:hover {
                    box-shadow: 0 12px 36px var(--hover-shadow);
                    border-color: var(--hover-border);
                    transform: translateY(-3px);
                }
            `}</style>
            
            <div style={{ maxWidth: 1000, margin: "0 auto", padding: "100px 20px 60px" }}>
                <div style={{ marginBottom: 50, textAlign: "center" }}>
                    <span style={{
                        display: "inline-block", background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                        color: "#fff", borderRadius: 100, padding: "6px 18px",
                        fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", marginBottom: 16,
                    }}>
                        IMAGE TOOLS
                    </span>
                    <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, color: "#0f172a", margin: "0 0 16px", lineHeight: 1.2 }}>
                        Free Image Tools
                    </h1>
                    <p style={{ fontSize: "clamp(15px, 3vw, 18px)", color: "#64748b", maxWidth: 640, margin: "0 auto", lineHeight: 1.7 }}>
                        Fast, free, and secure image optimization tools. Compress, resize, and convert your photos to exact KB sizes instantly without losing quality.
                    </p>
                </div>

                {groups.map((group) => (
                    <section key={group.id} style={{ marginBottom: 64 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                            <div style={{
                                width: 56, height: 56, borderRadius: 16,
                                background: group.gradient, display: 'flex', alignItems: 'center',
                                justifyContent: 'center', flexShrink: 0,
                                boxShadow: `0 6px 20px ${group.iconColor}40`
                            }}>
                                {groupIcons[group.id]}
                            </div>
                            <div>
                                <h2 style={{ fontSize: 24, fontWeight: 900, color: '#0f172a', margin: '0 0 6px' }}>
                                    {group.heading}
                                </h2>
                                <p style={{ fontSize: 15, color: '#64748b', margin: 0, lineHeight: 1.5 }}>
                                    {group.subtitle}
                                </p>
                            </div>
                        </div>

                        <div style={{ 
                            display: "grid", 
                            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
                            gap: 20,
                            marginTop: 24 
                        }}>
                            {group.tools.map((tool) => (
                                <Link 
                                    key={tool.route} 
                                    href={tool.route} 
                                    className="img-tool-card"
                                    style={{
                                        '--hover-shadow': `rgba(${hexToRgb(group.iconColor)}, 0.15)`,
                                        '--hover-border': `${group.iconColor}80`
                                    } as React.CSSProperties}
                                >
                                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>{tool.title}</h3>
                                    <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 20px", flex: 1 }}>{tool.desc}</p>
                                    
                                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                                        {tool.tags.map(tag => (
                                            <span key={tag} style={{
                                                background: group.bgLight, color: group.iconColor, borderRadius: 100,
                                                padding: "4px 12px", fontSize: 12, fontWeight: 700, border: `1px solid ${group.iconColor}30`,
                                            }}>{tag}</span>
                                        ))}
                                    </div>
                                    
                                    <div style={{ display: "flex", alignItems: "center", gap: 6, color: group.iconColor, fontSize: 14, fontWeight: 800, marginTop: "auto" }}>
                                        Use Tool <ArrowRight size={16} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}

// Helper block for accurate RGB values 
function hexToRgb(hex: string) {
    hex = hex.replace(/^#/, '');
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r}, ${g}, ${b}`;
}
