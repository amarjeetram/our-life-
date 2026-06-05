import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Name & Content Generators | SmartToolsWala",
    description: "Explore our collection of free online generators. Generate names, text, ideas, and more instantly with our powerful generator tools.",
    alternates: {
        canonical: "https://smarttoolswala.com/generators",
    },
};

export default function GeneratorsPage() {
    const tools = [
        {
            route: '/generators/warrior-cat-name-generator', 
            title: 'Warrior Cat Name Generator',
            desc: 'Generate unique, cool, and random warrior cat names with descriptions based on personality and clans.',
            tags: ['Fun', 'Names', 'Gaming'],
            gradient: "linear-gradient(135deg, #f59e0b, #ef4444)",
        },
        {
            route: '/generators/band-name-generator', 
            title: 'Band Name Generator',
            desc: 'Instantly generate hundreds of epic, unique names for your Metal, Rock, Punk, Emo, or Pop band.',
            tags: ['Music', 'Names', 'Creative'],
            gradient: "linear-gradient(135deg, #8b5cf6, #d946ef)",
        },
        {
            route: '/generators/podcast-name-generator', 
            title: 'Podcast Name Generator',
            desc: 'Generate catchy, professional names for your True Crime, Sports, Comedy, or Business podcast instantly.',
            tags: ['Audio', 'Creators', 'Names'],
            gradient: "linear-gradient(135deg, #10b981, #14b8a6)",
        },
        {
            route: '/generators/elf-name-generator', 
            title: 'Elf Name Generator',
            desc: 'Summon authentic, lore-friendly names for your D&D characters. Supports High Elves, Wood Elves, Drow, and Half-Elves.',
            tags: ['Fantasy', 'D&D', 'Names'],
            gradient: "linear-gradient(135deg, #34d399, #818cf8)",
        }
    ];

    return (
        <main style={{ minHeight: "100vh", background: "linear-gradient(180deg, #fdf4ff 0%, #fafafa 100%)", fontFamily: "sans-serif" }}>
            <style>{`
                .gen-tool-card {
                    background: #fff; border-radius: 20px;
                    border: 1.5px solid #e2e8f0; padding: 24px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    transition: all 0.18s; cursor: pointer;
                    display: flex; flex-direction: column;
                    text-decoration: none; color: inherit;
                }
                .gen-tool-card:hover {
                    box-shadow: 0 12px 36px rgba(236,72,153,0.15);
                    border-color: #f472b6;
                    transform: translateY(-3px);
                }
            `}</style>
            
            <div style={{ maxWidth: 1000, margin: "0 auto", padding: "100px 20px 60px" }}>
                <div style={{ marginBottom: 50, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span style={{
                        display: "inline-block", background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
                        color: "#fff", borderRadius: 100, padding: "6px 18px",
                        fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", marginBottom: 16,
                    }}>
                        GENERATORS
                    </span>
                    <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, color: "#0f172a", margin: "0 0 16px", lineHeight: 1.2 }}>
                        Free Online Generators
                    </h1>
                    <p style={{ fontSize: "clamp(15px, 3vw, 18px)", color: "#64748b", maxWidth: 680, margin: "0 auto", lineHeight: 1.7 }}>
                        Powerful, instant generators for names, ideas, and fun content. 100% free and instant.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                    {tools.map(({ route, title, desc, tags, gradient }) => (
                        <Link key={route} href={route} className="gen-tool-card">
                            <div style={{
                                width: 48, height: 48, borderRadius: 14, background: gradient,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                marginBottom: 16, boxShadow: "0 6px 16px rgba(236,72,153,0.3)", flexShrink: 0,
                            }}>
                                <Sparkles size={22} color="#fff" />
                            </div>
                            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>{title}</h2>
                            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 20px", flex: 1 }}>{desc}</p>
                            
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                                {tags.map(tag => (
                                    <span key={tag} style={{
                                        background: "#fdf4ff", color: "#d946ef", borderRadius: 100,
                                        padding: "4px 12px", fontSize: 12, fontWeight: 700, border: "1px solid #fae8ff",
                                    }}>{tag}</span>
                                ))}
                            </div>
                            
                            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#d946ef", fontSize: 14, fontWeight: 800, marginTop: "auto" }}>
                                Open Generator <ArrowRight size={16} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
