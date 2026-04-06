import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Other Social & Utility Tools | SmartToolsWala",
    description: "Explore our collection of social media and utility tools, including the Stylish Couple Name Maker and more free online utilities.",
    alternates: {
        canonical: "https://smarttoolswala.com/other-tools",
    },
};

export default function OtherToolsPage() {
    const tools = [
        {
            route: '/stylish-couple-name-maker', title: 'Couple Name Maker',
            desc: 'Combine two names into a stylish, emoji-filled romantic combo for Instagram & hashtags.',
            tags: ['Social'],
            gradient: "linear-gradient(135deg, #d946ef, #8b5cf6)",
        },
        {
            route: '/other-tools/random-object-generator', title: 'Random Object Generator',
            desc: 'Generate completely random objects with pictures instantly. Perfect for drawing, object shows, and kids games.',
            tags: ['New Utility', 'Fun & Games'],
            gradient: "linear-gradient(135deg, #d946ef, #8b5cf6)",
        }
    ];

    return (
        <main style={{ minHeight: "100vh", background: "linear-gradient(180deg, #fdf4ff 0%, #fafafa 100%)", fontFamily: "sans-serif" }}>
            <style>{`
                .other-tool-card {
                    background: #fff; border-radius: 20px;
                    border: 1.5px solid #e2e8f0; padding: 24px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    transition: all 0.18s; cursor: pointer;
                    display: flex; flex-direction: column;
                    text-decoration: none; color: inherit;
                }
                .other-tool-card:hover {
                    box-shadow: 0 12px 36px rgba(217,70,239,0.15);
                    border-color: #f5d0fe;
                    transform: translateY(-3px);
                }
            `}</style>
            
            <div style={{ maxWidth: 1000, margin: "0 auto", padding: "100px 20px 60px" }}>
                <div style={{ marginBottom: 50, textAlign: "center" }}>
                    <span style={{
                        display: "inline-block", background: "linear-gradient(135deg, #d946ef, #8b5cf6)",
                        color: "#fff", borderRadius: 100, padding: "6px 18px",
                        fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", marginBottom: 16,
                    }}>
                        OTHER TOOLS
                    </span>
                    <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, color: "#0f172a", margin: "0 0 16px", lineHeight: 1.2 }}>
                        Other Social &amp; Utility Tools
                    </h1>
                    <p style={{ fontSize: "clamp(15px, 3vw, 18px)", color: "#64748b", maxWidth: 680, margin: "0 auto", lineHeight: 1.7 }}>
                        A collection of fun, social, and handy miscellaneous tools to simplify your digital tasks and social interactions.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                    {tools.map(({ route, title, desc, tags, gradient }) => (
                        <Link key={route} href={route} className="other-tool-card">
                            <div style={{
                                width: 48, height: 48, borderRadius: 14, background: gradient,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                marginBottom: 16, boxShadow: "0 6px 16px rgba(217,70,239,0.3)", flexShrink: 0,
                            }}>
                                <Wrench size={22} color="#fff" />
                            </div>
                            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>{title}</h2>
                            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 20px", flex: 1 }}>{desc}</p>
                            
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                                {tags.map(tag => (
                                    <span key={tag} style={{
                                        background: "#fdf4ff", color: "#c026d3", borderRadius: 100,
                                        padding: "4px 12px", fontSize: 12, fontWeight: 700, border: "1px solid #fae8ff",
                                    }}>{tag}</span>
                                ))}
                            </div>
                            
                            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#c026d3", fontSize: 14, fontWeight: 800, marginTop: "auto" }}>
                                Use Tool <ArrowRight size={16} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
