import Link from "next/link";
import { ArrowRight, ArrowLeftRight, HardDrive } from "lucide-react";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Free Unit Converters | SmartToolsWala",
    description: "Browse our collection of free online unit converters. Convert MB to KB, length, weight, temperature and more instantly.",
    alternates: {
        canonical: "https://smarttoolswala.com/unit-converters",
    },
};

const tools = [
    { href: "/unit-converters/mb-to-kb", icon: HardDrive, iconBg: "linear-gradient(135deg, #ede9fe, #ddd6fe)", iconColor: "#6d28d9", shadow: "0 4px 24px rgba(99,102,241,0.1)", badge: "Popular", badgeBg: "#6366f1", title: "MB to KB Converter", description: "Convert megabytes to kilobytes instantly. 1 MB = 1,024 KB.", tags: ["mb to kb", "File Size"] },
    { href: "/unit-converters/gb-to-mb", icon: HardDrive, iconBg: "linear-gradient(135deg, #dbeafe, #bfdbfe)", iconColor: "#1d4ed8", shadow: "0 4px 24px rgba(59,130,246,0.1)", badge: "New", badgeBg: "#3b82f6", title: "GB to MB Converter", description: "Convert gigabytes to megabytes instantly. 1 GB = 1,024 MB.", tags: ["gb to mb", "Storage"] },
    { href: "/unit-converters/kb-to-mb", icon: HardDrive, iconBg: "linear-gradient(135deg, #ccfbf1, #99f6e4)", iconColor: "#0f766e", shadow: "0 4px 24px rgba(20,184,166,0.1)", title: "KB to MB Converter", description: "Convert kilobytes back to megabytes easily.", tags: ["KB to MB", "Images"] },
    { href: "/unit-converters/mb-to-gb", icon: HardDrive, iconBg: "linear-gradient(135deg, #fbcfe8, #f9a8d4)", iconColor: "#be185d", shadow: "0 4px 24px rgba(244,114,182,0.1)", title: "MB to GB Converter", description: "Convert MB to gigabytes flawlessly.", tags: ["MB to GB", "Data"] },
    { href: "/unit-converters/gb-to-kb", icon: HardDrive, iconBg: "linear-gradient(135deg, #dbeafe, #bfdbfe)", iconColor: "#1d4ed8", shadow: "0 4px 24px rgba(59,130,246,0.1)", title: "GB to KB Converter", description: "Huge conversions from Gigabytes to Kilobytes.", tags: ["GB to KB", "Big files"] },
    { href: "/unit-converters/kb-to-gb", icon: HardDrive, iconBg: "linear-gradient(135deg, #ccfbf1, #99f6e4)", iconColor: "#0f766e", shadow: "0 4px 24px rgba(20,184,166,0.1)", title: "KB to GB Converter", description: "Tiny KB items calculated in Gigabytes.", tags: ["Logs", "KB to GB"] },
    { href: "/unit-converters/gb-to-tb", icon: HardDrive, iconBg: "linear-gradient(135deg, #ede9fe, #ddd6fe)", iconColor: "#6d28d9", shadow: "0 4px 24px rgba(139,92,246,0.1)", title: "GB to TB Converter", description: "Storage solutions in Terabytes calculation.", tags: ["GB to TB", "Cloud"] },
    { href: "/unit-converters/tb-to-gb", icon: HardDrive, iconBg: "linear-gradient(135deg, #ccfbf1, #99f6e4)", iconColor: "#0f766e", shadow: "0 4px 24px rgba(20,184,166,0.1)", title: "TB to GB Converter", description: "Terabyte to Gigabyte hard drive sizing.", tags: ["Drives", "TB to GB"] },
    { href: "/unit-converters/mb-to-tb", icon: HardDrive, iconBg: "linear-gradient(135deg, #fbcfe8, #f9a8d4)", iconColor: "#be185d", shadow: "0 4px 24px rgba(244,114,182,0.1)", title: "MB to TB Converter", description: "Megabytes against Terabytes volumes.", tags: ["MB to TB", "Scaling"] },
    { href: "/unit-converters/tb-to-mb", icon: HardDrive, iconBg: "linear-gradient(135deg, #dbeafe, #bfdbfe)", iconColor: "#1d4ed8", shadow: "0 4px 24px rgba(59,130,246,0.1)", title: "TB to MB Converter", description: "Convert huge drives into exact megabytes.", tags: ["Storage", "TB to MB"] },
    { href: "/unit-converters/kb-to-tb", icon: HardDrive, iconBg: "linear-gradient(135deg, #ccfbf1, #99f6e4)", iconColor: "#0f766e", shadow: "0 4px 24px rgba(20,184,166,0.1)", title: "KB to TB Converter", description: "Extreme conversions between KB and TB.", tags: ["KB to TB", "Servers"] },
    { href: "/unit-converters/tb-to-kb", icon: HardDrive, iconBg: "linear-gradient(135deg, #ede9fe, #ddd6fe)", iconColor: "#6d28d9", shadow: "0 4px 24px rgba(139,92,246,0.1)", title: "TB to KB Converter", description: "Calculate maximum precision files from Terabytes.", tags: ["TB to KB", "Calculation"] },
];

export default function UnitConvertersPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col container mx-auto px-4 py-12 md:py-24 mt-16">
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
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

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: "24px", maxWidth: "1100px", margin: "0 auto", width: "100%" }}>

                {/* Tool Cards */}
                {tools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                        <Link key={tool.href} href={tool.href} style={{ textDecoration: "none" }}>
                            <div
                                className="unit-tool-card native-fade-in"
                                style={{
                                    background: "white",
                                    borderRadius: "24px",
                                    border: "1px solid #f1f5f9",
                                    padding: "28px",
                                    boxShadow: tool.shadow,
                                    cursor: "pointer",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "16px",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                                    <div style={{
                                        width: "56px", height: "56px", borderRadius: "16px",
                                        background: tool.iconBg,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: tool.iconColor, flexShrink: 0,
                                    }}>
                                        <Icon size={26} />
                                    </div>
                                    {tool.badge && (
                                        <span style={{ fontSize: "11px", fontWeight: 700, background: tool.badgeBg, color: "white", padding: "3px 10px", borderRadius: "999px", letterSpacing: "0.05em" }}>
                                            {tool.badge}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", marginBottom: "8px", letterSpacing: "-0.01em" }}>
                                        {tool.title}
                                    </h2>
                                    <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.65, margin: 0 }}>
                                        {tool.description}
                                    </p>
                                </div>
                                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto" }}>
                                    {tool.tags.map(tag => (
                                        <span key={tag} style={{ fontSize: "12px", fontWeight: 600, color: "#6366f1", background: "#eef2ff", padding: "4px 10px", borderRadius: "999px" }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#6366f1", fontWeight: 700, fontSize: "14px" }}>
                                    Convert Now <ArrowRight size={16} />
                                </div>
                            </div>
                        </Link>
                    );
                })}

                {/* Coming Soon Card */}
                <div className="native-fade-in delay-100">
                    <div
                        style={{
                            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                            textAlign: "center", height: "100%", background: "white", borderRadius: "24px",
                            border: "2px dashed #e2e8f0", padding: "40px 24px", minHeight: "240px",
                        }}
                    >
                        <div style={{
                            width: "52px", height: "52px", borderRadius: "16px",
                            background: "linear-gradient(135deg, #fef3c7, #fde68a)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#d97706", marginBottom: "16px",
                        }}>
                            <ArrowLeftRight size={24} />
                        </div>
                        <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>
                            More Converters Coming Soon
                        </h3>
                        <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.6, maxWidth: "240px" }}>
                            Length, Weight, Temperature, Currency and more are on the way!
                        </p>
                    </div>
                </div>

            </div>
        </main>
    );
}
