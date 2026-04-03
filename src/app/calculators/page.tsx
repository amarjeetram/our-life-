import Link from "next/link";
import { ArrowRight, Calculator } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Online Calculators & Tools | SmartToolsWala",
    description: "Explore our collection of free, instant calculators for math, gaming probabilities, and general utilities.",
    alternates: {
        canonical: "https://smarttoolswala.com/calculators",
    },
};

export default function MathCalculatorsPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col container mx-auto px-4 py-12 md:py-24 mt-16">
                <div style={{ textAlign: "center", marginBottom: "40px" }}>
                    <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0ea5e9", marginBottom: "12px" }}>
                        All Calculators
                    </span>
                    <h1 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                        Calculators
                    </h1>
                    <p style={{ marginTop: "16px", color: "#64748b", fontSize: "16px", maxWidth: "600px", margin: "16px auto 0" }}>
                        Powerful, client-side calculators for math, analytics, and gaming probabilities. 100% free and instant.
                    </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "24px", maxWidth: "1100px", margin: "0 auto" }}>
                    {[
                        {
                            route: '/calculators/blooket-calculator', title: 'Blooket Calculator',
                            desc: 'Free token and probability calculator for Blooket 2026. Calculate your exact chances to pull rare and chroma blooks.',
                            tags: ['Gaming', 'Blooket', 'Probability']
                        },
                        {
                            route: '/calculators/derivative-calculator', title: 'Derivative Calculator',
                            desc: 'Free online symbolic derivative calculator. Find the derivative of any function instantly.',
                            tags: ['Math', 'Calculus']
                        },
                        {
                            route: '/calculators/integral-calculator', title: 'Integral Calculator',
                            desc: 'Compute indefinite integrals and antiderivatives symbolically with zero limits.',
                            tags: ['Math', 'Calculus']
                        }
                    ].map((tool, index) => (
                        <div
                            key={tool.route}
                            className={`native-fade-in delay-${(index % 5 + 1) * 100}`}
                        >
                            <Link href={tool.route} 
                                className="flex flex-col h-full bg-white rounded-3xl border border-slate-100 overflow-hidden no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(14,165,233,0.12),0_2px_8px_rgba(0,0,0,0.04)]"
                                style={{
                                    boxShadow: "0 4px 24px rgba(14,165,233,0.06), 0 1px 3px rgba(0,0,0,0.02)",
                                }}
                            >
                                <div style={{ height: "4px", background: "linear-gradient(90deg, #0ea5e9, #3b82f6)" }} />

                                <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "4px" }}>
                                        <div style={{
                                            width: "52px", height: "52px", borderRadius: "16px",
                                            background: "linear-gradient(135deg, #e0f2fe, #bae6fd)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: "#0ea5e9", flexShrink: 0,
                                            boxShadow: "0 2px 10px rgba(14,165,233,0.15)"
                                        }}>
                                            <Calculator size={24} />
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
                                                background: "#f0f9ff", border: "1px solid #e0f2fe",
                                                fontSize: "11px", fontWeight: 700, color: "#0369a1"
                                            }}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div style={{
                                    background: "#fafbff", borderTop: "1px solid #f1f5f9",
                                    padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
                                    color: "#0284c7", fontWeight: 800, fontSize: "14px"
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
