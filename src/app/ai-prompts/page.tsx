import Link from "next/link";
import { ArrowRight, Sparkles, Bot, Zap, Cpu } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Prompts & Gemini Tools | SmartToolsWala",
    description: "Discover a collection of powerful AI prompts and tools optimized for Gemini and other advanced AI models to boost your productivity.",
    alternates: {
        canonical: "https://smarttoolswala.com/ai-prompts",
    },
};

export default function AIPromptsPage() {
    // Array to add tools later easily
    const tools = [
        {
            route: '/ai-prompts/gemini-prompt-generator', // Added the route here
            title: 'Ultimate Gemini Prompt Generator',
            desc: 'Generate highly optimized prompts for Google Gemini to get the most accurate and creative responses.',
            tags: ['Gemini', 'Prompts', 'AI'],
            icon: <Bot size={24} color="#fff" />,
            gradient: "linear-gradient(135deg, #6366f1, #a855f7)",
        },
        {
            route: '#', // Placeholder for future tool
            title: 'AI Code Assistant Prompts',
            desc: 'A curated list of the best AI prompts for writing, debugging, and refactoring code using AI models.',
            tags: ['Coding', 'Dev', 'AI'],
            icon: <Cpu size={24} color="#fff" />,
            gradient: "linear-gradient(135deg, #3b82f6, #06b6d4)",
        },
        {
            route: '#', // Placeholder for future tool
            title: 'Creative Writing AI Prompts',
            desc: 'Unlock your creativity with these AI prompts designed for storytelling, copywriting, and content creation.',
            tags: ['Writing', 'Creative', 'Content'],
            icon: <Sparkles size={24} color="#fff" />,
            gradient: "linear-gradient(135deg, #ec4899, #f43f5e)",
        }
    ];

    return (
        <main style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "sans-serif", overflow: "hidden", position: "relative" }}>
            {/* Background Glows */}
            <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(15,23,42,0) 70%)", filter: "blur(60px)", zIndex: 0, pointerEvents: "none" }}></div>
            <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(15,23,42,0) 70%)", filter: "blur(60px)", zIndex: 0, pointerEvents: "none" }}></div>

            <style>{`
                .ai-tool-card {
                    background: rgba(30, 41, 59, 0.4);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-radius: 24px;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    padding: 32px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    text-decoration: none;
                    color: inherit;
                    position: relative;
                    overflow: hidden;
                    z-index: 1;
                }
                .ai-tool-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    border-radius: 24px;
                    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    z-index: -1;
                }
                .ai-tool-card:hover {
                    transform: translateY(-8px);
                    border-color: rgba(168, 85, 247, 0.4);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px rgba(168, 85, 247, 0.15);
                }
                .ai-tool-card:hover::before {
                    opacity: 1;
                }
                .ai-tool-icon-wrapper {
                    transition: transform 0.3s ease;
                }
                .ai-tool-card:hover .ai-tool-icon-wrapper {
                    transform: scale(1.1) rotate(5deg);
                }
                .ai-tool-link-text {
                    transition: transform 0.3s ease;
                }
                .ai-tool-card:hover .ai-tool-link-text {
                    transform: translateX(5px);
                }
                
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                    100% { transform: translateY(0px); }
                }
                .floating-badge {
                    animation: float 4s ease-in-out infinite;
                }
            `}</style>
            
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px", position: "relative", zIndex: 1 }}>
                <div style={{ marginBottom: 80, textAlign: "center" }}>
                    <div className="floating-badge" style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        background: "rgba(168, 85, 247, 0.1)", border: "1px solid rgba(168, 85, 247, 0.3)",
                        color: "#c084fc", borderRadius: 100, padding: "8px 20px",
                        fontSize: 14, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 24,
                        backdropFilter: "blur(10px)"
                    }}>
                        <Zap size={16} fill="#c084fc" />
                        AI & GEMINI TOOLS
                    </div>
                    <h1 style={{ 
                        fontSize: "clamp(36px, 6vw, 64px)", 
                        fontWeight: 900, 
                        margin: "0 0 24px", 
                        lineHeight: 1.1,
                        background: "linear-gradient(to right, #fff, #94a3b8)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        letterSpacing: "-0.02em"
                    }}>
                        Supercharge Your Workflow<br />with AI Prompts
                    </h1>
                    <p style={{ 
                        fontSize: "clamp(16px, 3vw, 20px)", 
                        color: "#94a3b8", 
                        maxWidth: 720, 
                        margin: "0 auto", 
                        lineHeight: 1.6 
                    }}>
                        Explore our ultimate collection of Gemini and AI tools. Get perfectly crafted prompts to generate stunning text, code, and creative assets instantly.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
                    {tools.map((tool, index) => (
                        <Link key={index} href={tool.route} className="ai-tool-card">
                            <div className="ai-tool-icon-wrapper" style={{
                                width: 56, height: 56, borderRadius: 16, background: tool.gradient,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                marginBottom: 24, boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
                            }}>
                                {tool.icon}
                            </div>
                            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#f8fafc", margin: "0 0 12px", letterSpacing: "-0.01em" }}>{tool.title}</h2>
                            <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.6, margin: "0 0 24px", flex: 1 }}>{tool.desc}</p>
                            
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                                {tools[index].tags.map(tag => (
                                    <span key={tag} style={{
                                        background: "rgba(255, 255, 255, 0.05)", color: "#cbd5e1", borderRadius: 100,
                                        padding: "4px 14px", fontSize: 13, fontWeight: 600, border: "1px solid rgba(255, 255, 255, 0.1)",
                                    }}>{tag}</span>
                                ))}
                            </div>
                            
                            <div className="ai-tool-link-text" style={{ 
                                display: "flex", alignItems: "center", gap: 8, 
                                color: "#c084fc", fontSize: 15, fontWeight: 700, marginTop: "auto" 
                            }}>
                                Launch Tool <ArrowRight size={18} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
