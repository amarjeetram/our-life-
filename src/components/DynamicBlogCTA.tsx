"use client";

import Link from "next/link";
import { Zap, ArrowRight, Heart } from "lucide-react";

interface Category {
    name: string;
    slug: string;
}

interface Props {
    categories: Category[];
    variant?: "block" | "floating";
}

export default function DynamicBlogCTA({ categories = [], variant = "block" }: Props) {
    // Flatten category names to lowercase string for easy matching
    const catString = categories.map(c => c.name.toLowerCase() + " " + c.slug.toLowerCase()).join(" ");

    // Default Fallback Props (Universal)
    let ctaConfig = {
        title: "Compress Photos Online for Free",
        subtitle: "Need to resize your photos for portals or exams? Try our Universal Image Optimizer!",
        buttonText: "Explore All Tools",
        buttonLink: "/",
        icon: <Zap size={22} />,
        gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        badge: "100% Free & Private"
    };

    // Rule 1: Strictly Government Exams (UPSC, SSC, IAS)
    if (
        catString.includes("upsc") ||
        catString.includes("ssc") ||
        catString.includes("ias") ||
        catString.includes("exam")
    ) {
        ctaConfig = {
            title: "UPSC & SSC Photo Resizer",
            subtitle: "Compress your passport photos and signatures to exactly under 20KB for government exam portals.",
            buttonText: "Compress to 20KB Now",
            buttonLink: "/compress-image-to-20kb",
            icon: <Zap size={22} />,
            gradient: "linear-gradient(135deg, #10b981, #059669)", // Emerald
            badge: "Exam Ready"
        };
    }
    // Rule 2: Strictly Bank Exams / Admit Cards
    else if (
        catString.includes("bank") ||
        catString.includes("ibps") ||
        catString.includes("admit")
    ) {
        ctaConfig = {
            title: "Bank application photo compressor",
            subtitle: "Resize your documents, photos, and signatures to exactly under 50KB to prevent form rejections.",
            buttonText: "Compress to 50KB Now",
            buttonLink: "/compress-image-to-50kb",
            icon: <Zap size={22} />,
            gradient: "linear-gradient(135deg, #3b82f6, #2563eb)", // Blue
            badge: "Bank Forms"
        };
    }
    // Rule 3: General 20KB Compressor
    else if (catString.includes("20kb")) {
        ctaConfig = {
            title: "Compress Photo to 20KB",
            subtitle: "Quickly resize your photos and signatures strictly under 20KB for any portal or application.",
            buttonText: "Compress to 20KB Now",
            buttonLink: "/compress-image-to-20kb",
            icon: <Zap size={22} />,
            gradient: "linear-gradient(135deg, #10b981, #059669)", // Emerald
            badge: "Strict Size"
        };
    }
    // Rule 4: General 50KB Compressor
    else if (catString.includes("50kb")) {
        ctaConfig = {
            title: "Compress Photo to 50KB",
            subtitle: "Quickly resize your documents and photos strictly under 50KB for standard web uploads.",
            buttonText: "Compress to 50KB Now",
            buttonLink: "/compress-image-to-50kb",
            icon: <Zap size={22} />,
            gradient: "linear-gradient(135deg, #3b82f6, #2563eb)", // Blue
            badge: "Strict Size"
        };
    }
    // Rule 3: 100KB / High Quality
    else if (catString.includes("100kb")) {
        ctaConfig = {
            title: "High-Quality Document Compressor",
            subtitle: "Shrink your images to under 100KB without losing critical details. Perfect for standard uploads.",
            buttonText: "Compress to 100KB Now",
            buttonLink: "/compress-image-to-100kb",
            icon: <Zap size={22} />,
            gradient: "linear-gradient(135deg, #6366f1, #4f46e5)", // Indigo
            badge: "HQ Compression"
        };
    }
    // Rule 4: 200KB / High Quality
    else if (catString.includes("200kb")) {
        ctaConfig = {
            title: "Compress Photo to 200KB",
            subtitle: "Quickly resize heavy images down to 200KB. Guaranteed preservation of document clarity.",
            buttonText: "Compress to 200KB Now",
            buttonLink: "/compress-image-to-200kb",
            icon: <Zap size={22} />,
            gradient: "linear-gradient(135deg, #8b5cf6, #c026d3)", // Purple/Fuchsia
            badge: "HD Resizer"
        };
    }
    // Rule 5: 30KB
    else if (catString.includes("30kb")) {
        ctaConfig = {
            title: "Compress Photo to 30KB",
            subtitle: "Resize photos strictly under 30KB for specific state and central government portals.",
            buttonText: "Compress to 30KB Now",
            buttonLink: "/compress-image-to-30kb",
            icon: <Zap size={22} />,
            gradient: "linear-gradient(135deg, #14b8a6, #0d9488)", // Teal
            badge: "Strict Size"
        };
    }
    // Rule 6: MB to KB Converter
    else if (catString.includes("mb to kb") || catString.includes("converter")) {
        ctaConfig = {
            title: "MB to KB Image Converter",
            subtitle: "Got a huge multi-megabyte photo? Shrink it down to kilobytes in one swift click.",
            buttonText: "Open MB to KB Converter",
            buttonLink: "/mb-to-kb-converter",
            icon: <Zap size={22} />,
            gradient: "linear-gradient(135deg, #f59e0b, #d97706)", // Amber
            badge: "Smart Converter"
        };
    }
    // Rule 7: YouTube Tag Extractor
    else if (catString.includes("youtube tag") || catString.includes("extractar") || catString.includes("extractor")) {
        ctaConfig = {
            title: "YouTube Tag Extractor",
            subtitle: "Extract hidden SEO tags from any viral YouTube video and boost your own views!",
            buttonText: "Extract YT Tags",
            buttonLink: "/youtube-tag-extractor",
            icon: <Zap size={22} />,
            gradient: "linear-gradient(135deg, #ef4444, #dc2626)", // Red (YouTube)
            badge: "YouTube Utility"
        };
    }
    // Rule 4: Couple Name Generator
    else if (catString.includes("couple name") || catString.includes("name generator")) {
        ctaConfig = {
            title: "Create Your Unique Couple Name",
            subtitle: "Combine two names to generate a stylish, romantic couple name instantly for Instagram or weddings!",
            buttonText: "Generate Couple Name",
            buttonLink: "/stylish-couple-name-maker",
            icon: <Heart size={22} />,
            gradient: "linear-gradient(135deg, #ec4899, #be185d)", // Pink
            badge: "Trendy Tool"
        };
    }

    if (variant === "floating") {
        return (
            <div style={{
                position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)",
                zIndex: 100, width: "calc(100% - 32px)", maxWidth: "420px",
                background: "#ffffff", borderRadius: "100px", padding: "8px 8px 8px 24px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px"
            }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", overflow: "hidden" }}>
                    <span style={{ fontSize: "11px", fontWeight: 800, color: ctaConfig.gradient.includes('10b981') ? '#059669' : '#6366f1', textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {ctaConfig.badge}
                    </span>
                    <span style={{ fontSize: "14px", fontWeight: 800, color: "#0f172a", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                        {ctaConfig.title}
                    </span>
                </div>
                <Link href={ctaConfig.buttonLink} style={{
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    background: ctaConfig.gradient, color: "#ffffff", border: "none",
                    padding: "10px 18px", borderRadius: "100px",
                    fontSize: "13px", fontWeight: 800, textDecoration: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)", transition: "transform 0.1s"
                }}>
                    Open Tool
                </Link>
            </div>
        );
    }

    return (
        <div style={{
            margin: "32px 0",
            padding: "24px",
            background: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.05), inset 0 2px 4px 0 rgba(255, 255, 255, 0.5)",
            position: "relative",
            overflow: "hidden"
        }}>
            {/* Top gradient accent line */}
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: ctaConfig.gradient }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative", zIndex: 10 }}>
                {/* Header row */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                    <div style={{
                        width: "52px", height: "52px", borderRadius: "14px", flexShrink: 0,
                        background: ctaConfig.gradient,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#ffffff", boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                    }}>
                        {ctaConfig.icon}
                    </div>

                    <div style={{ flex: 1 }}>
                        <span style={{ display: "inline-block", padding: "4px 10px", background: "#f1f5f9", borderRadius: "100px", fontSize: "11px", fontWeight: 700, color: "#64748b", marginBottom: "8px" }}>
                            {ctaConfig.badge}
                        </span>
                        <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", marginBottom: "4px", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                            {ctaConfig.title}
                        </h3>
                        <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.5 }}>
                            {ctaConfig.subtitle}
                        </p>
                    </div>
                </div>

                {/* Button Row */}
                <div style={{ marginTop: "4px" }}>
                    <Link href={ctaConfig.buttonLink} style={{
                        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", maxWidth: "fit-content",
                        background: ctaConfig.gradient, color: "#ffffff", border: "none",
                        padding: "14px 24px", borderRadius: "12px",
                        fontSize: "15px", fontWeight: 700, textDecoration: "none",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.15)", transition: "transform 0.2s"
                    }}>
                        {ctaConfig.buttonText} <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
            {/* Background subtle glow */}
            <div style={{ position: "absolute", bottom: "-50px", right: "-50px", width: "150px", height: "150px", background: ctaConfig.gradient, opacity: 0.05, borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none" }} />
        </div>
    );
}
