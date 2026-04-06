import Link from "next/link";
import { ArrowRight, Youtube } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "YouTube SEO Tools | SmartToolsWala",
    description: "Free online YouTube tools to boost your video growth. Extract SEO-optimized tags, titles, and descriptions from any YouTube video instantly.",
    alternates: {
        canonical: "https://smarttoolswala.com/youtube-tools",
    },
};

export default function YouTubeToolsPage() {
    const tools = [
        {
            route: '/youtube-tools/1024x576-youtube-banner-maker', title: 'YouTube Banner Maker (1024×576)',
            desc: 'Resize any image to the perfect 1024×576 YouTube channel art size. Free, no watermark, instant PNG download.',
            tags: ['Banner', 'Channel Art', 'Free'],
            gradient: "linear-gradient(135deg, #ef4444, #f43f5e)",
        },
        {
            route: '/youtube-tag-extractor', title: 'YouTube Tag Extractor',
            desc: 'Extract SEO-optimized tags from any YouTube video to boost your content visibility.',
            tags: ['SEO', 'YouTube', 'Marketing'],
            gradient: "linear-gradient(135deg, #ef4444, #f43f5e)",
        },
        {
            route: '/youtube-description-extractor', title: 'YouTube Description Extractor',
            desc: 'Instantly extract titles, views, likes, comments, and full descriptions from any YouTube URL.',
            tags: ['Data', 'YouTube', 'Research'],
            gradient: "linear-gradient(135deg, #ef4444, #f43f5e)",
        },
        {
            route: '/youtube-title-extractor', title: 'YouTube Title Extractor',
            desc: 'Easily view and copy the exact title from any YouTube video for your own research.',
            tags: ['Title', 'YouTube', 'Copy'],
            gradient: "linear-gradient(135deg, #ef4444, #f43f5e)",
        }
    ];

    return (
        <main style={{ minHeight: "100vh", background: "linear-gradient(180deg, #fef2f2 0%, #fafafa 100%)", fontFamily: "sans-serif" }}>
            <style>{`
                .yt-tool-card {
                    background: #fff; border-radius: 20px;
                    border: 1.5px solid #e2e8f0; padding: 24px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    transition: all 0.18s; cursor: pointer;
                    display: flex; flex-direction: column;
                    text-decoration: none; color: inherit;
                }
                .yt-tool-card:hover {
                    box-shadow: 0 12px 36px rgba(239,68,68,0.15);
                    border-color: #fca5a5;
                    transform: translateY(-3px);
                }
            `}</style>
            
            <div style={{ maxWidth: 1000, margin: "0 auto", padding: "100px 20px 60px" }}>
                <div style={{ marginBottom: 50, textAlign: "center" }}>
                    <span style={{
                        display: "inline-block", background: "linear-gradient(135deg, #ef4444, #f43f5e)",
                        color: "#fff", borderRadius: 100, padding: "6px 18px",
                        fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", marginBottom: 16,
                    }}>
                        YOUTUBE TOOLS
                    </span>
                    <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, color: "#0f172a", margin: "0 0 16px", lineHeight: 1.2 }}>
                        Free YouTube SEO Growth Tools
                    </h1>
                    <p style={{ fontSize: "clamp(15px, 3vw, 18px)", color: "#64748b", maxWidth: 680, margin: "0 auto", lineHeight: 1.7 }}>
                        Powerful free tools for YouTube creators. Extract tags, analyze descriptions, and reverse-engineer titles to rank your videos higher.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                    {tools.map(({ route, title, desc, tags, gradient }) => (
                        <Link key={route} href={route} className="yt-tool-card">
                            <div style={{
                                width: 48, height: 48, borderRadius: 14, background: gradient,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                marginBottom: 16, boxShadow: "0 6px 16px rgba(239,68,68,0.3)", flexShrink: 0,
                            }}>
                                <Youtube size={22} color="#fff" />
                            </div>
                            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>{title}</h2>
                            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 20px", flex: 1 }}>{desc}</p>
                            
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                                {tags.map(tag => (
                                    <span key={tag} style={{
                                        background: "#fef2f2", color: "#e11d48", borderRadius: 100,
                                        padding: "4px 12px", fontSize: 12, fontWeight: 700, border: "1px solid #fecdd3",
                                    }}>{tag}</span>
                                ))}
                            </div>
                            
                            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#e11d48", fontSize: 14, fontWeight: 800, marginTop: "auto" }}>
                                Use Tool <ArrowRight size={16} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
