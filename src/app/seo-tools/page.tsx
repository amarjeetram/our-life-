import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free SEO Tools | SmartToolsWala",
    description: "Explore our collection of free, high-performance SEO tools for website auditing, keyword research, and more.",
    alternates: {
        canonical: "https://smarttoolswala.com/seo-tools",
    },
};

export default function SeoToolsPage() {
    const tools = [
        {
            route: '/seo-tools/website-audit', title: 'Website Audit Tool',
            desc: 'Analyze your website for SEO issues, performance bottlenecks, and get actionable recommendations.',
            tags: ['SEO', 'Audit', 'Performance'],
            gradient: "linear-gradient(135deg, #10b981, #059669)",
        }
    ];

    return (
        <main style={{ minHeight: "100vh", background: "linear-gradient(180deg, #f0fdf4 0%, #fafafa 100%)", fontFamily: "sans-serif" }}>
            <style>{`
                .seo-tool-card {
                    background: #fff; border-radius: 20px;
                    border: 1.5px solid #e2e8f0; padding: 24px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                    transition: all 0.18s; cursor: pointer;
                    display: flex; flex-direction: column;
                    text-decoration: none; color: inherit;
                }
                .seo-tool-card:hover {
                    box-shadow: 0 12px 36px rgba(16,185,129,0.15);
                    border-color: #6ee7b7;
                    transform: translateY(-3px);
                }
            `}</style>
            
            <div style={{ maxWidth: 1000, margin: "0 auto", padding: "100px 20px 60px" }}>
                <div style={{ marginBottom: 50, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <span style={{
                        display: "inline-block", background: "linear-gradient(135deg, #10b981, #059669)",
                        color: "#fff", borderRadius: 100, padding: "6px 18px",
                        fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", marginBottom: 16,
                    }}>
                        SEO TOOLS
                    </span>
                    <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 900, color: "#0f172a", margin: "0 0 16px", lineHeight: 1.2 }}>
                        Free Online SEO Tools
                    </h1>
                    <p style={{ fontSize: "clamp(15px, 3vw, 18px)", color: "#64748b", maxWidth: 680, margin: "0 auto", lineHeight: 1.7 }}>
                        Powerful tools to optimize your website, check technical SEO, and improve your search engine rankings.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                    {tools.map(({ route, title, desc, tags, gradient }) => (
                        <Link key={route} href={route} className="seo-tool-card">
                            <div style={{
                                width: 48, height: 48, borderRadius: 14, background: gradient,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                marginBottom: 16, boxShadow: "0 6px 16px rgba(16,185,129,0.3)", flexShrink: 0,
                            }}>
                                <Search size={22} color="#fff" />
                            </div>
                            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>{title}</h2>
                            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 20px", flex: 1 }}>{desc}</p>
                            
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
                                {tags.map(tag => (
                                    <span key={tag} style={{
                                        background: "#ecfdf5", color: "#10b981", borderRadius: 100,
                                        padding: "4px 12px", fontSize: 12, fontWeight: 700, border: "1px solid #d1fae5",
                                    }}>{tag}</span>
                                ))}
                            </div>
                            
                            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#10b981", fontSize: 14, fontWeight: 800, marginTop: "auto" }}>
                                Use Tool <ArrowRight size={16} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
