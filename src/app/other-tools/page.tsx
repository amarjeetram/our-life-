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
            tags: ['New Utility', 'Social']
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 py-24 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-indigo-200 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm border border-white/20 flex items-center gap-2">
                        <Wrench size={16} /> Category
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg leading-tight">
                        Other Social &amp;<br />Utility Tools
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed font-medium">
                        A collection of fun, social, and handy miscellaneous tools to simplify your digital tasks and social interactions.
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
                                    boxShadow: "0 4px 24px rgba(139,92,246,0.06), 0 1px 3px rgba(0,0,0,0.02)",
                                    overflow: "hidden", textDecoration: "none",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                }}>
                                    {/* Purple top bar */}
                                    <div style={{ height: "4px", background: "linear-gradient(90deg, #8b5cf6, #d946ef)" }} />

                                    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "4px" }}>
                                            <div style={{
                                                width: "52px", height: "52px", borderRadius: "16px",
                                                background: "linear-gradient(135deg, #f3e8ff, #fae8ff)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color: "#d946ef", flexShrink: 0,
                                                boxShadow: "0 2px 10px rgba(217,70,239,0.15)"
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
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
                                                    background: "#fdf4ff", border: "1px solid #fae8ff",
                                                    fontSize: "11px", fontWeight: 700, color: "#c026d3"
                                                }}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{
                                        background: "#fafbff", borderTop: "1px solid #f1f5f9",
                                        padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
                                        color: "#d946ef", fontWeight: 800, fontSize: "14px"
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
