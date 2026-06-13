import Link from "next/link";
import { ArrowRight, Instagram } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Instagram Tools – Free Bio Generator & Profile Tools | SmartToolsWala",
    description: "Free Instagram tools online — bio generator, profile tools, and more. No signup, no watermark, instant results.",
    alternates: {
        canonical: "https://smarttoolswala.com/instagram-tools",
    },
};

export default function InstagramToolsPage() {
    const tools = [
        {
            route: "/instagram-tools/instagram-bio-generator",
            title: "Instagram Bio Generator",
            desc: "Generate catchy, niche-specific Instagram bios in seconds. Pick category, tone, and keywords — get 3 ready-to-use bios instantly.",
            tags: ["Instagram", "Bio", "Free"],
            gradient: "linear-gradient(135deg, #9333ea, #ec4899)",
        },
    ];

    return (
        <main className="instagram-tools-main">
            <style>{`
                .instagram-tools-main {
                    min-height: 100vh;
                    background: linear-gradient(180deg, #f5f3ff 0%, #fafafa 100%);
                    font-family: sans-serif;
                }
                .dark .instagram-tools-main {
                    background: var(--bg-primary) !important;
                }
                .ig-tool-card {
                    background: var(--bg-primary); border-radius: 20px;
                    border: 1.5px solid var(--border-light); padding: 24px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
                    transition: all 0.18s; cursor: pointer;
                    display: flex; flex-direction: column;
                    text-decoration: none; color: inherit;
                }
                .dark .ig-tool-card {
                    background: var(--bg-secondary);
                    border-color: var(--border-light);
                }
                .ig-tool-card:hover {
                    box-shadow: 0 12px 36px rgba(147,51,234,0.15);
                    border-color: #c4b5fd;
                    transform: translateY(-3px);
                }
            `}</style>
            <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 20px 60px" }}>

                <div style={{ marginBottom: 40, textAlign: "center" }}>
                    <span style={{
                        display: "inline-block", background: "linear-gradient(135deg, #9333ea, #ec4899)",
                        color: "#fff", borderRadius: 100, padding: "6px 18px",
                        fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", marginBottom: 16,
                    }}>
                        INSTAGRAM TOOLS
                    </span>
                    <h1 style={{ fontSize: 36, fontWeight: 900, color: "var(--text-primary)", margin: "0 0 14px", lineHeight: 1.2 }}>
                        Free Instagram Tools
                    </h1>
                    <p style={{ fontSize: 16, color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
                        Create bios, optimize your profile, and grow your Instagram — all free, no signup needed.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                    {tools.map(({ route, title, desc, tags, gradient }) => (
                        <Link key={route} href={route} className="ig-tool-card">
                            <div style={{
                                width: 48, height: 48, borderRadius: 14, background: gradient,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                marginBottom: 16, boxShadow: "0 6px 16px rgba(147,51,234,0.3)", flexShrink: 0,
                            }}>
                                <Instagram size={22} color="#fff" />
                            </div>
                            <h2 style={{ fontSize: 17, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 8px" }}>{title}</h2>
                            <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.65, margin: "0 0 16px", flex: 1 }}>{desc}</p>
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                                {tags.map(tag => (
                                    <span key={tag} style={{
                                        background: "#faf5ff", color: "#7c3aed", borderRadius: 100,
                                        padding: "3px 10px", fontSize: 11, fontWeight: 700, border: "1px solid #e9d5ff",
                                    }}>{tag}</span>
                                ))}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 5, color: "#9333ea", fontSize: 13, fontWeight: 800 }}>
                                Use Tool <ArrowRight size={14} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
