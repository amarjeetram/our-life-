import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Government Exam Photo & Document Tools | SmartToolsWala",
    description: "Free online tools for SSC, UPSC, TNPSC, and Banking exams. Precisely compress, resize, and optimize your photos and signatures to match strict portal requirements.",
    alternates: {
        canonical: "https://smarttoolswala.com/govt-exam-tools",
    },
};

export default function GovtExamToolsPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col container mx-auto px-4 py-12 md:py-24 mt-16">
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#10b981", marginBottom: "12px" }}>
                    Photo &amp; Document Tools
                </span>
                <h1 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                    Govt Exam Tools
                </h1>
                <p style={{ marginTop: "16px", color: "#64748b", fontSize: "16px", maxWidth: "600px", margin: "16px auto 0" }}>
                    Bypass strict portal upload errors. Compress and resize your passport photos and signatures precisely for UPSC, SSC, Banking, and State Govt applications.
                </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "24px", maxWidth: "1100px", margin: "0 auto" }}>
                {[
                    {
                        route: '/govt-exam-tools/upsc-photo-resize', title: 'UPSC Photo Resize',
                        desc: 'Resize UPSC IAS/IFS photo to 20-300KB and signature to 10-40KB as per UPSC 2026 official portal guidelines.',
                        tags: ['UPSC', 'IAS', 'IFS', 'Civil Services']
                    },
                    {
                        route: '/govt-exam-tools/ssc-signature-resize', title: 'SSC CGL Signature Resize',
                        desc: 'Strict SSC portal compliance. Resize signature exactly to 10KB-20KB and 4cm x 2cm width & height.',
                        tags: ['SSC', 'CGL', 'GD']
                    },
                    {
                        route: '/govt-exam-tools/gds-photo-resize', title: 'GDS Photo Resize',
                        desc: 'Specifically designed for India Post GDS. Compress photos to 50KB and signatures to 20KB.',
                        tags: ['GDS', 'India Post']
                    },
                    {
                        route: '/govt-exam-tools/signature-resize', title: 'Signature Resize & Compress',
                        desc: 'Resize your written signature to exact pixels or cm, and compress to target KB (e.g. 10KB-20KB).',
                        tags: ['Signatures', 'UPSC', 'All Exams']
                    },
                    {
                        route: '/govt-exam-tools/tnpsc-photo-compressor', title: 'TNPSC Photo Compressor',
                        desc: '1-click compressor designed specifically for Tamil Nadu PSC photo (20-50KB) and signature (10-20KB) rules.',
                        tags: ['TNPSC', 'State Exams']
                    },
                    {
                        route: '/govt-exam-tools/add-name-date', title: 'Add Name & Date to Photo',
                        desc: 'Easily add your name and date of photo (DOP) at the bottom of your passport photo for exam portals.',
                        tags: ['UPSC', 'SSC', 'IBPS']
                    }
                ].map((tool, index) => (
                    <div
                        key={tool.route}
                        className={`native-fade-in delay-${(index % 5 + 1) * 100}`}
                    >
                        <Link href={tool.route}
                            className="flex flex-col h-full bg-white rounded-3xl border border-slate-100 overflow-hidden no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(16,185,129,0.12),0_2px_8px_rgba(0,0,0,0.04)]"
                            style={{
                                boxShadow: "0 4px 24px rgba(16,185,129,0.06), 0 1px 3px rgba(0,0,0,0.02)",
                            }}
                        >
                            <div style={{ height: "4px", background: "linear-gradient(90deg, #10b981, #34d399)" }} />

                            <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "4px" }}>
                                    <div style={{
                                        width: "52px", height: "52px", borderRadius: "16px",
                                        background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#059669", flexShrink: 0,
                                        boxShadow: "0 2px 10px rgba(16,185,129,0.15)"
                                    }}>
                                        <BadgeCheck size={24} />
                                    </div>
                                    <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.01em" }}>
                                        {tool.title}
                                    </h3>
                                </div>

                                <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.6 }}>
                                    {tool.desc}
                                </p>

                                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto", paddingTop: "8px" }}>
                                    {tool.tags.map(tag => (
                                        <span key={tag} style={{
                                            padding: "4px 10px", borderRadius: "100px",
                                            background: "#ecfdf5", border: "1px solid #d1fae5",
                                            fontSize: "11px", fontWeight: 700, color: "#047857"
                                        }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div style={{
                                background: "#fafbff", borderTop: "1px solid #f1f5f9",
                                padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
                                color: "#059669", fontWeight: 800, fontSize: "14px"
                            }}>
                                <span>Use Tool Free</span>
                                <ArrowRight size={16} />
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}
