// ✅ SERVER COMPONENT — no "use client" — renders fully in initial HTML for SEO
import Link from "next/link";
import { Zap, ArrowRight, Heart } from "lucide-react";
import FloatingCTA from "./FloatingCTA";

interface Category {
    name: string;
    slug: string;
}

interface Props {
    categories: Category[];
    variant?: "block" | "floating";
}

function resolveCTA(categories: Category[]) {
    const catString = categories
        .map(c => c.name.toLowerCase() + " " + c.slug.toLowerCase())
        .join(" ");

    if (catString.includes("tnpsc")) {
        return {
            title: "TNPSC Photo Compressor",
            subtitle: "Compress your TNPSC photo to 20KB–50KB instantly. Meets official Tamil Nadu PSC portal requirements.",
            buttonText: "Compress TNPSC Photo",
            buttonLink: "/tnpsc-photo-compressor",
            gradient: "linear-gradient(135deg, #0ea5e9, #0284c7)",
            badge: "TNPSC Ready",
        };
    }
    if (catString.includes("upsc") || catString.includes("ssc") || catString.includes("ias") || catString.includes("exam")) {
        return {
            title: "UPSC & SSC Photo Resizer",
            subtitle: "Compress your passport photos and signatures to exactly under 20KB for government exam portals.",
            buttonText: "Compress to 20KB Now",
            buttonLink: "/compress-image-to-20kb",
            gradient: "linear-gradient(135deg, #10b981, #059669)",
            badge: "Exam Ready",
        };
    }
    if (catString.includes("bank") || catString.includes("ibps") || catString.includes("admit")) {
        return {
            title: "Bank Application Photo Compressor",
            subtitle: "Resize your documents, photos, and signatures to exactly under 50KB to prevent form rejections.",
            buttonText: "Compress to 50KB Now",
            buttonLink: "/compress-image-to-50kb",
            gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
            badge: "Bank Forms",
        };
    }
    if (catString.includes("100kb")) {
        return {
            title: "High-Quality Document Compressor",
            subtitle: "Shrink your images to under 100KB without losing critical details.",
            buttonText: "Compress to 100KB Now",
            buttonLink: "/compress-image-to-100kb",
            gradient: "linear-gradient(135deg, #6366f1, #4f46e5)",
            badge: "HQ Compression",
        };
    }
    if (catString.includes("200kb")) {
        return {
            title: "Compress Photo to 200KB",
            subtitle: "Quickly resize heavy images down to 200KB. Guaranteed preservation of document clarity.",
            buttonText: "Compress to 200KB Now",
            buttonLink: "/compress-image-to-200kb",
            gradient: "linear-gradient(135deg, #8b5cf6, #c026d3)",
            badge: "HD Resizer",
        };
    }
    if (catString.includes("50kb")) {
        return {
            title: "Compress Photo to 50KB",
            subtitle: "Quickly resize your documents and photos strictly under 50KB for standard web uploads.",
            buttonText: "Compress to 50KB Now",
            buttonLink: "/compress-image-to-50kb",
            gradient: "linear-gradient(135deg, #3b82f6, #2563eb)",
            badge: "Strict Size",
        };
    }
    if (catString.includes("20kb")) {
        return {
            title: "Compress Photo to 20KB",
            subtitle: "Quickly resize your photos and signatures strictly under 20KB for any portal or application.",
            buttonText: "Compress to 20KB Now",
            buttonLink: "/compress-image-to-20kb",
            gradient: "linear-gradient(135deg, #10b981, #059669)",
            badge: "Strict Size",
        };
    }
    if (catString.includes("30kb")) {
        return {
            title: "Compress Photo to 30KB",
            subtitle: "Resize photos strictly under 30KB for specific state and central government portals.",
            buttonText: "Compress to 30KB Now",
            buttonLink: "/compress-image-to-30kb",
            gradient: "linear-gradient(135deg, #14b8a6, #0d9488)",
            badge: "Strict Size",
        };
    }
    if (catString.includes("mb to kb") || catString.includes("converter") || catString.includes("image-tools")) {
        return {
            title: "MB to KB Image Converter",
            subtitle: "Got a huge multi-megabyte photo? Shrink it down to kilobytes in one swift click.",
            buttonText: "Open MB to KB Converter",
            buttonLink: "/mb-to-kb-converter",
            gradient: "linear-gradient(135deg, #f59e0b, #d97706)",
            badge: "Smart Converter",
        };
    }
    if (catString.includes("youtube tag") || catString.includes("extractor")) {
        return {
            title: "YouTube Tag Extractor",
            subtitle: "Extract hidden SEO tags from any viral YouTube video and boost your own views!",
            buttonText: "Extract YT Tags",
            buttonLink: "/youtube-tag-extractor",
            gradient: "linear-gradient(135deg, #ef4444, #dc2626)",
            badge: "YouTube Utility",
        };
    }
    if (catString.includes("couple name") || catString.includes("name generator")) {
        return {
            title: "Create Your Unique Couple Name",
            subtitle: "Combine two names to generate a stylish, romantic couple name instantly for Instagram or weddings!",
            buttonText: "Generate Couple Name",
            buttonLink: "/stylish-couple-name-maker",
            gradient: "linear-gradient(135deg, #ec4899, #be185d)",
            badge: "Trendy Tool",
        };
    }
    // Default
    return {
        title: "Compress Photos Online for Free",
        subtitle: "Need to resize your photos for portals or exams? Try our Universal Image Optimizer!",
        buttonText: "Explore All Tools",
        buttonLink: "/",
        gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        badge: "100% Free & Private",
    };
}

export default function DynamicBlogCTA({ categories = [], variant = "block" }: Props) {
    const cta = resolveCTA(categories);

    // Floating variant — delegate to client component (needs position:fixed)
    if (variant === "floating") {
        return (
            <FloatingCTA
                title={cta.title}
                badge={cta.badge}
                buttonLink={cta.buttonLink}
                gradient={cta.gradient}
            />
        );
    }

    // Block variant — pure server HTML, no hooks, no client JS
    return (
        <div style={{
            margin: "32px 0", padding: "24px", background: "#ffffff",
            borderRadius: "20px", border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px -5px rgba(0,0,0,0.05), inset 0 2px 4px 0 rgba(255,255,255,0.5)",
            position: "relative", overflow: "hidden",
        }}>
            {/* Top accent line */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: cta.gradient }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative", zIndex: 10 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{
                        width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
                        background: cta.gradient, display: "flex", alignItems: "center",
                        justifyContent: "center", color: "#ffffff", boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    }}>
                        <Zap size={22} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <span style={{
                            display: "inline-block", padding: "4px 10px", background: "#f1f5f9",
                            borderRadius: "100px", fontSize: "11px", fontWeight: 700, color: "#64748b", marginBottom: "8px",
                        }}>
                            {cta.badge}
                        </span>
                        <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", marginBottom: "4px", lineHeight: 1.2 }}>
                            {cta.title}
                        </h3>
                        <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.5 }}>
                            {cta.subtitle}
                        </p>
                    </div>
                </div>
                <div style={{ marginTop: "4px" }}>
                    <Link href={cta.buttonLink} style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                        gap: "8px", background: cta.gradient, color: "#ffffff", border: "none",
                        padding: "14px 24px", borderRadius: "12px", fontSize: "15px", fontWeight: 700,
                        textDecoration: "none", boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                    }}>
                        {cta.buttonText} <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
            {/* Background glow */}
            <div style={{
                position: "absolute", bottom: "-50px", right: "-50px", width: "150px", height: "150px",
                background: cta.gradient, opacity: 0.05, borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none",
            }} />
        </div>
    );
}
