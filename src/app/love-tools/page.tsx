import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Love & Relationship Tools | SmartToolsWala",
    description: "Use our free online love and relationship tools. Calculate your love percentage, play the FLAMES game, blend names, and create romantic ship names instantly.",
    alternates: {
        canonical: "https://smarttoolswala.com/love-tools",
    },
};

export default function LoveToolsPage() {
    const tools = [
        {
            route: '/stylish-couple-name-maker', title: 'Couple Name Maker',
            desc: 'Combine two names into a stylish, emoji-filled romantic combo for Instagram & hashtags.',
            tags: ['Social', 'Popular'],
            gradient: "linear-gradient(135deg, #ec4899, #db2777)",
        },
        {
            route: '/love-tools/ship-name-generator', title: 'Ship Name Generator',
            desc: 'Create unique, cute, and catchy ship names for couples and fandoms instantly.',
            tags: ['Fun', 'Fandom'],
            gradient: "linear-gradient(135deg, #ec4899, #db2777)",
        },
        {
            route: '/calculators/fun/love-percentage-calculator-by-name', title: 'Love Percentage Calculator',
            desc: 'Check your love match instantly! Enter your name and your crush\'s name to find your love score.',
            tags: ['Fun', 'Social'],
            gradient: "linear-gradient(135deg, #ec4899, #db2777)",
        },
        {
            route: '/calculators/fun/flames-calculator', title: 'FLAMES Calculator Online',
            desc: 'Play the classic FLAMES game! Reveal your destiny: Friends, Lovers, Affection, Marriage, Enemies, or Siblings.',
            tags: ['Classic', 'Game'],
            gradient: "linear-gradient(135deg, #ec4899, #db2777)",
        }
    ];

    return (
        <main style={{ minHeight: "100vh", background: "linear-gradient(180deg, #fdf2f8 0%, #fafafa 100%)", fontFamily: "sans-serif" }}>
            <style>{`
                .love-tool-card {
                    background: #fff; border-radius: 20px;
                    border: 1.5px solid #fce7f3; padding: 24px;
                    box-shadow: 0 4px 20px rgba(219,39,119,0.05);
                    transition: all 0.18s; cursor: pointer;
                    display: flex; flex-direction: column;
                    text-decoration: none; color: inherit;
                }
                .love-tool-card:hover {
                    box-shadow: 0 12px 36px rgba(219,39,119,0.15);
                    border-color: #fbcfe8;
                    transform: translateY(-3px);
                }
            `}</style>
            
            <div style={{ maxWidth: 1000, margin: "0 auto", padding: "100px 20px 60px" }}>
                <div style={{ marginBottom: 50, textAlign: "center" }}>
                    <span style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        background: "linear-gradient(135deg, #ec4899, #db2777)",
                        color: "#fff", borderRadius: 100, padding: "6px 18px",
                        fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", marginBottom: 16,
                    }}>
                        <Heart size={14} className="fill-white" />
                        LOVE TOOLS
                    </span>
                    <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, color: "#0f172a", margin: "0 0 16px", lineHeight: 1.2 }}>
                        Free Love &amp; Relationship Tools
                    </h1>
                    <p style={{ fontSize: "clamp(15px, 3vw, 18px)", color: "#64748b", maxWidth: 680, margin: "0 auto", lineHeight: 1.7 }}>
                        Check your connection, generate completely unique couple names, and play classic matching games completely free.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                    {tools.map(({ route, title, desc, tags, gradient }) => (
                        <Link key={route} href={route} className="love-tool-card">
                            <div style={{
                                width: 48, height: 48, borderRadius: 14, background: gradient,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                marginBottom: 16, boxShadow: "0 6px 16px rgba(219,39,119,0.3)", flexShrink: 0,
                            }}>
                                <Heart size={22} color="#fff" />
                            </div>
                            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>{title}</h2>
                            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 20px", flex: 1 }}>{desc}</p>
                            
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                                {tags.map(tag => (
                                    <span key={tag} style={{
                                        background: "#fdf2f8", color: "#be123c", borderRadius: 100,
                                        padding: "4px 12px", fontSize: 12, fontWeight: 700, border: "1px solid #fce7f3",
                                    }}>{tag}</span>
                                ))}
                            </div>
                            
                            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#be123c", fontSize: 14, fontWeight: 800, marginTop: "auto" }}>
                                Use Tool <ArrowRight size={16} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
