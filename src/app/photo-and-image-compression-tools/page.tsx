import Link from "next/link";
import { Zap, ArrowRight, ImageIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Photo & Image Compression Tools | SmartToolsWala",
    description: "Free online photo and image compression tools. Compress to 20KB, 50KB, 100KB, or convert MB to KB instantly without losing quality.",
    alternates: {
        canonical: "https://smarttoolswala.com/photo-and-image-compression-tools",
    },
};

export default function ImageCompressionToolsPage() {
    const tools = [
        {
            route: '/compress-image-to-20kb', title: 'Compress to 20KB',
            desc: 'Perfect for UPSC, SSC & govt portals. Guaranteed under 20KB.',
            tags: ['UPSC / IAS', 'SSC', 'Forms']
        },
        {
            route: '/compress-image-to-50kb', title: 'Compress to 50KB',
            desc: 'Ideal for Bank exams, admit cards, and diverse state portals.',
            tags: ['Bank Forms', 'Admit Cards']
        },
        {
            route: '/compress-image-to-100kb', title: 'Compress to 100KB',
            desc: 'Standard compression for high-quality professional document uploads.',
            tags: ['General', 'High Quality']
        },
        {
            route: '/mb-to-kb-converter', title: 'MB to KB Converter',
            desc: 'Shrink massive megabyte photos down to optimized kilobytes instantly.',
            tags: ['Universal', 'Smart Convert']
        },
        {
            route: '/compress-image-to-30kb', title: 'Compress to 30KB',
            desc: 'Strictly under 30KB for specific government compliance formats.',
            tags: ['Compliance', 'State Exams']
        },
        {
            route: '/compress-image-to-200kb', title: 'Compress to 200KB',
            desc: 'Heavy files to 200KB for portals requiring larger HD formats.',
            tags: ['HD Docs', 'Websites']
        },
        {
            route: '/resize-image-to-100kb', title: 'Resize Image to 100KB',
            desc: 'Resize dimensions and compress file size exactly under 100KB.',
            tags: ['Resize', 'Web']
        },
        {
            route: '/tnpsc-photo-compressor', title: 'TNPSC Photo Compressor',
            desc: 'Compress TNPSC photo to 20-50KB and signature to 10-20KB as per official TNPSC requirements.',
            tags: ['TNPSC', 'Tamil Nadu', 'Govt Exam']
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 py-24 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-indigo-200 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm border border-white/20 flex items-center gap-2">
                        <ImageIcon size={16} /> Category
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg leading-tight">
                        Photo & Image<br />Compression Tools
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed font-medium">
                        Fast, free, and secure image optimization tools. Compress, resize, and convert your photos to exact KB sizes instantly without losing quality.
                    </p>
                </div>
            </div>

            {/* Tools Grid Section */}
            <section style={{ padding: "80px 20px", background: "#fafbff" }}>
                <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "24px" }}>
                        {tools.map((tool, index) => (
                            <div
                                key={tool.route}
                                className={`native-fade-in delay-${(index % 5 + 1) * 100}`}
                            >
                                <Link href={tool.route} style={{
                                    display: "flex", flexDirection: "column", height: "100%",
                                    background: "#ffffff", borderRadius: "24px",
                                    border: "1px solid #f1f5f9",
                                    boxShadow: "0 4px 24px rgba(99,102,241,0.06), 0 1px 3px rgba(0,0,0,0.02)",
                                    overflow: "hidden", textDecoration: "none",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                }}>
                                    {/* Rainbow top bar */}
                                    <div style={{ height: "4px", background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #ec4899)" }} />

                                    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "4px" }}>
                                            <div style={{
                                                width: "52px", height: "52px", borderRadius: "16px",
                                                background: "linear-gradient(135deg, #ede9fe, #dbeafe)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color: "#6366f1", flexShrink: 0,
                                                boxShadow: "0 2px 10px rgba(99,102,241,0.15)"
                                            }}>
                                                <Zap size={22} />
                                            </div>
                                            <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.01em" }}>
                                                {tool.title}
                                            </h2>
                                        </div>

                                        <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.6 }}>
                                            {tool.desc}
                                        </p>

                                        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto", paddingTop: "8px" }}>
                                            {tool.tags.map(tag => (
                                                <span key={tag} style={{
                                                    padding: "4px 10px", borderRadius: "100px",
                                                    background: "#f8faff", border: "1px solid #e0e7ff",
                                                    fontSize: "11px", fontWeight: 700, color: "#4338ca"
                                                }}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{
                                        background: "#fafbff", borderTop: "1px solid #f1f5f9",
                                        padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
                                        color: "#6366f1", fontWeight: 800, fontSize: "14px"
                                    }}>
                                        <span>Use Tool Free</span>
                                        <ArrowRight size={16} />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
