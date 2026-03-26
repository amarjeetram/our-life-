import Link from "next/link";
import { ArrowRight, ArrowLeftRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free Unit Converters | SmartToolsWala",
    description: "Browse our collection of free online unit converters. Convert length, weight, volume, temperature, and more instantly.",
};

export default function UnitConvertersPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col container mx-auto px-4 py-12 md:py-24 mt-16">
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
                <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#f59e0b", marginBottom: "12px" }}>
                    Universal Converters
                </span>
                <h1 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                    Unit Converters
                </h1>
                <p style={{ marginTop: "16px", color: "#64748b", fontSize: "16px", maxWidth: "600px", margin: "16px auto 0" }}>
                    Fast, accurate, and completely free unit conversion tools. Convert between metric and imperial units with zero hassle.
                </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "24px", maxWidth: "1100px", margin: "0 auto" }}>
                
                {/* Placeholder Card for Coming Soon Tools */}
                <div className="native-fade-in delay-100 col-span-full">
                    <div
                        className="flex flex-col items-center justify-center text-center h-full bg-white rounded-3xl border border-slate-100 overflow-hidden py-16 px-6"
                        style={{
                            boxShadow: "0 4px 24px rgba(245,158,11,0.06), 0 1px 3px rgba(0,0,0,0.02)",
                        }}
                    >
                        <div style={{
                            width: "64px", height: "64px", borderRadius: "20px",
                            background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#d97706", flexShrink: 0,
                            boxShadow: "0 2px 10px rgba(245,158,11,0.15)",
                            marginBottom: "24px"
                        }}>
                            <ArrowLeftRight size={28} />
                        </div>
                        <h3 style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.01em", marginBottom: "12px" }}>
                            New Converter Tools Coming Soon!
                        </h3>
                        <p style={{ fontSize: "16px", color: "#64748b", lineHeight: 1.6, maxWidth: "450px" }}>
                            We are actively building a suite of high-precision unit converters. Check back soon for Length, Weight, Temperature, and Currency converters.
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}
