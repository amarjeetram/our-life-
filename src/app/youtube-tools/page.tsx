import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
            tags: ['Banner', 'Channel Art', 'Free']
        },
        {
            route: '/youtube-tag-extractor', title: 'YouTube Tag Extractor',
            desc: 'Extract SEO-optimized tags from any YouTube video to boost your content visibility.',
            tags: ['SEO', 'YouTube', 'Marketing']
        },
        {
            route: '/youtube-description-extractor', title: 'YouTube Description Extractor',
            desc: 'Instantly extract titles, views, likes, comments, and full descriptions from any YouTube URL.',
            tags: ['Data', 'YouTube', 'Research']
        },
        {
            route: '/youtube-title-extractor', title: 'YouTube Title Extractor',
            desc: 'Easily view and copy the exact title from any YouTube video for your own research.',
            tags: ['Title', 'YouTube', 'Copy']
        }
    ];


    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 py-24 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-indigo-200 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm border border-white/20 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                        Category
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg leading-tight">
                        YouTube SEO<br />Growth Tools
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed font-medium">
                        Powerful free tools for YouTube creators. Extract tags, analyze descriptions, and reverse-engineer titles to rank your videos higher.
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
                                    boxShadow: "0 4px 24px rgba(239,68,68,0.06), 0 1px 3px rgba(0,0,0,0.02)",
                                    overflow: "hidden", textDecoration: "none",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                }}>
                                    {/* Red top bar */}
                                    <div style={{ height: "4px", background: "linear-gradient(90deg, #ef4444, #dc2626)" }} />

                                    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "4px" }}>
                                            <div style={{
                                                width: "52px", height: "52px", borderRadius: "16px",
                                                background: "linear-gradient(135deg, #fee2e2, #fecaca)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color: "#ef4444", flexShrink: 0,
                                                boxShadow: "0 2px 10px rgba(239,68,68,0.15)"
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
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
                                                    background: "#fef2f2", border: "1px solid #fee2e2",
                                                    fontSize: "11px", fontWeight: 700, color: "#b91c1c"
                                                }}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{
                                        background: "#fafbff", borderTop: "1px solid #f1f5f9",
                                        padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
                                        color: "#b91c1c", fontWeight: 800, fontSize: "14px"
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
