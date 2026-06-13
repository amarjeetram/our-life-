"use client";

import Link from "next/link";
import {
    Zap, ArrowRight, ShieldCheck, Lock, CheckCircle2,
    Star, Clock, ChevronRight, ImageIcon, Heart, MessageCirclePlus, Mail, SendHorizontal, ThumbsUp, MessageSquare
} from "lucide-react";
import HeroUploadZone from "./HeroUploadZone";

const CAROUSEL_TOOLS = [
    { title: "Signature Resizer", href: "/govt-exam-tools/signature-resize" },
    { title: "Image Compressor", href: "/image-compressor-to-20kb" },
    { title: "Blooket Token Calc", href: "/calculators/blooket-calculator" },
    { title: "YouTube Tag Extractor", href: "/youtube-tag-extractor" },
    { title: "Love Percentage Calc", href: "/calculators/fun/love-percentage-calculator-by-name" },
    { title: "Instagram Bio Generator", href: "/instagram-tools/instagram-bio-generator" },
    { title: "Website Audit Tool", href: "/seo-tools/website-audit" },
    { title: "Math to Word Converter", href: "/calculators/derivative-calculator" },
];



const stats = [
    { value: "50K+", label: "Tools Used Daily", icon: <Zap className="w-5 h-5" /> },
    { value: "< 3s", label: "Average Processing", icon: <Clock className="w-5 h-5" /> },
    { value: "100%", label: "Privacy Guaranteed", icon: <ShieldCheck className="w-5 h-5" /> },
    { value: "4.9★", label: "User Rating", icon: <Star className="w-5 h-5" /> },
];

const features = [
    {
        icon: <Lock className="w-6 h-6" />,
        title: "100% Private & Secure",
        desc: "Your files never leave your device or are instantly deleted from memory. Total privacy guaranteed.",
        gradient: "linear-gradient(135deg, #059669, #0891b2)",
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: "Lightning Fast Processing",
        desc: "Powered by industrial-grade Sharp engine. Optimize and compress your images in milliseconds.",
        gradient: "linear-gradient(135deg, #d97706, #ea580c)",
    },
    {
        icon: <ShieldCheck className="w-6 h-6" />,
        title: "Zero Limits, No Signup",
        desc: "Completely free. No watermarks, no daily limits, and no account required — ever.",
        gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    },
];

const steps = [
    { n: "01", title: "Upload Your Image", desc: "Click, drag & drop any JPG, PNG or WEBP file. Max 20 MB." },
    { n: "02", title: "Set Target Size", desc: "Choose your exact target — 20KB, 50KB, 100KB or custom." },
    { n: "03", title: "Download Instantly", desc: "Compressed image downloads in seconds. Zero quality loss." },
];

function ToolCard({
    route,
    title,
    desc,
    tags,
    index,
    gradient,
    icon
}: {
    route: string;
    title: string;
    desc: string;
    tags: string[];
    index: number;
    gradient: "indigo" | "red" | "purple" | "pink" | "sky" | "amber" | "blue" | "emerald" | "violet";
    icon?: React.ReactNode;
}) {
    const config = {
        indigo: {
            topBar: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #ec4899)",
            iconBg: "from-indigo-100 to-blue-100 dark:from-indigo-950/40 dark:to-slate-800/40",
            iconText: "text-indigo-600 dark:text-indigo-400",
            iconShadow: "shadow-indigo-500/10 dark:shadow-indigo-500/5",
            cardShadow: "shadow-[0_4px_24px_rgba(99,102,241,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
            tagBg: "bg-indigo-50 dark:bg-indigo-950/30",
            tagBorder: "border-indigo-100/60 dark:border-indigo-900/40",
            tagText: "text-indigo-600 dark:text-indigo-400",
            footerText: "text-indigo-700 dark:text-indigo-300",
        },
        red: {
            topBar: "linear-gradient(90deg, #ef4444, #dc2626)",
            iconBg: "from-red-100 to-orange-100 dark:from-red-950/40 dark:to-slate-800/40",
            iconText: "text-red-600 dark:text-red-400",
            iconShadow: "shadow-red-500/10 dark:shadow-red-500/5",
            cardShadow: "shadow-[0_4px_24px_rgba(239,68,68,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
            tagBg: "bg-red-50 dark:bg-red-950/30",
            tagBorder: "border-red-100/60 dark:border-red-900/40",
            tagText: "text-red-600 dark:text-red-400",
            footerText: "text-red-700 dark:text-red-300",
        },
        purple: {
            topBar: "linear-gradient(90deg, #9333ea, #ec4899)",
            iconBg: "from-purple-100 to-pink-100 dark:from-purple-950/40 dark:to-slate-800/40",
            iconText: "text-purple-600 dark:text-purple-400",
            iconShadow: "shadow-purple-500/10 dark:shadow-purple-500/5",
            cardShadow: "shadow-[0_4px_24px_rgba(147,51,234,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
            tagBg: "bg-purple-50 dark:bg-purple-950/30",
            tagBorder: "border-purple-100/60 dark:border-purple-900/40",
            tagText: "text-purple-600 dark:text-purple-400",
            footerText: "text-purple-700 dark:text-purple-300",
        },
        pink: {
            topBar: "linear-gradient(90deg, #ec4899, #db2777)",
            iconBg: "from-pink-100 to-rose-100 dark:from-pink-950/40 dark:to-slate-800/40",
            iconText: "text-pink-600 dark:text-pink-400",
            iconShadow: "shadow-pink-500/10 dark:shadow-pink-500/5",
            cardShadow: "shadow-[0_4px_24px_rgba(219,39,119,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
            tagBg: "bg-pink-50 dark:bg-pink-950/30",
            tagBorder: "border-pink-100/60 dark:border-pink-900/40",
            tagText: "text-pink-600 dark:text-pink-400",
            footerText: "text-pink-700 dark:text-pink-300",
        },
        sky: {
            topBar: "linear-gradient(90deg, #0ea5e9, #3b82f6)",
            iconBg: "from-sky-100 to-blue-100 dark:from-sky-950/40 dark:to-slate-800/40",
            iconText: "text-sky-600 dark:text-sky-400",
            iconShadow: "shadow-sky-500/10 dark:shadow-sky-500/5",
            cardShadow: "shadow-[0_4px_24px_rgba(14,165,233,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
            tagBg: "bg-sky-50 dark:bg-sky-950/30",
            tagBorder: "border-sky-100/60 dark:border-sky-900/40",
            tagText: "text-sky-600 dark:text-sky-400",
            footerText: "text-sky-700 dark:text-sky-300",
        },
        amber: {
            topBar: "linear-gradient(90deg, #f59e0b, #fbbf24)",
            iconBg: "from-amber-100 to-yellow-100 dark:from-amber-950/40 dark:to-slate-800/40",
            iconText: "text-amber-600 dark:text-amber-400",
            iconShadow: "shadow-amber-500/10 dark:shadow-amber-500/5",
            cardShadow: "shadow-[0_4px_24px_rgba(245,158,11,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
            tagBg: "bg-amber-50 dark:bg-amber-950/30",
            tagBorder: "border-amber-100/60 dark:border-amber-900/40",
            tagText: "text-amber-600 dark:text-amber-400",
            footerText: "text-amber-700 dark:text-amber-300",
        },
        blue: {
            topBar: "linear-gradient(90deg, #2563eb, #3b82f6)",
            iconBg: "from-blue-100 to-indigo-100 dark:from-blue-950/40 dark:to-slate-800/40",
            iconText: "text-blue-600 dark:text-blue-400",
            iconShadow: "shadow-blue-500/10 dark:shadow-blue-500/5",
            cardShadow: "shadow-[0_4px_24px_rgba(37,99,235,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
            tagBg: "bg-blue-50 dark:bg-blue-950/30",
            tagBorder: "border-blue-100/60 dark:border-blue-900/40",
            tagText: "text-blue-600 dark:text-blue-400",
            footerText: "text-blue-700 dark:text-blue-300",
        },
        emerald: {
            topBar: "linear-gradient(90deg, #10b981, #059669)",
            iconBg: "from-emerald-100 to-teal-100 dark:from-emerald-950/40 dark:to-slate-800/40",
            iconText: "text-emerald-600 dark:text-emerald-400",
            iconShadow: "shadow-emerald-500/10 dark:shadow-emerald-500/5",
            cardShadow: "shadow-[0_4px_24px_rgba(16,185,129,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
            tagBg: "bg-emerald-50 dark:bg-emerald-950/30",
            tagBorder: "border-emerald-100/60 dark:border-emerald-900/40",
            tagText: "text-emerald-600 dark:text-emerald-400",
            footerText: "text-emerald-700 dark:text-emerald-300",
        },
        violet: {
            topBar: "linear-gradient(90deg, #8b5cf6, #d946ef)",
            iconBg: "from-violet-100 to-fuchsia-100 dark:from-violet-950/40 dark:to-slate-800/40",
            iconText: "text-violet-600 dark:text-violet-400",
            iconShadow: "shadow-violet-500/10 dark:shadow-violet-500/5",
            cardShadow: "shadow-[0_4px_24px_rgba(139,92,246,0.04)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.2)]",
            tagBg: "bg-violet-50 dark:bg-violet-950/30",
            tagBorder: "border-violet-100/60 dark:border-violet-900/40",
            tagText: "text-violet-600 dark:text-violet-400",
            footerText: "text-violet-700 dark:text-violet-300",
        }
    }[gradient];

    return (
        <div className={`native-fade-in delay-${(index % 5 + 1) * 100} h-full`}>
            <Link
                prefetch={false}
                href={route}
                className={`flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-3xl overflow-hidden text-decoration-none transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${config.cardShadow}`}
            >
                {/* Rainbow top bar */}
                <div style={{ height: "4px", background: config.topBar }} />

                <div className="p-8 flex flex-col gap-4 flex-grow">
                    <div className="flex items-center gap-4 mb-1">
                        <div className={`w-[52px] h-[52px] rounded-2xl bg-gradient-to-br ${config.iconBg} flex items-center justify-center ${config.iconText} shrink-0 shadow-md ${config.iconShadow}`}>
                            {icon || <Zap size={22} />}
                        </div>
                        <h3 className="text-[19px] font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                            {title}
                        </h3>
                    </div>

                    <p className="text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        {desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto pt-2">
                        {tags.map(tag => (
                            <span
                                key={tag}
                                className={`px-2.5 py-1 rounded-full border text-[11px] font-bold ${config.tagBg} ${config.tagBorder} ${config.tagText}`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <div className={`bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 px-8 py-4 flex items-center justify-between font-extrabold text-sm ${config.footerText}`}>
                    <span>Use Tool Free</span>
                    <ArrowRight size={16} />
                </div>
            </Link>
        </div>
    );
}

export default function HomeClient({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ minHeight: "100vh", background: "var(--bg-secondary)", overflowX: "clip" }}>

            {/* ─── HERO ─── */}
            <section style={{
                position: "relative", paddingTop: "140px", paddingBottom: "110px", overflow: "hidden",
                background: "var(--bg-primary)"
            }}>

                {/* Left/Top-Left Glow */}
                <div style={{
                    position: "absolute",
                    top: "-10%",
                    left: "-10%",
                    width: "45%",
                    height: "120%",
                    background: "radial-gradient(ellipse at 20% 30%, rgba(99, 102, 241, 0.08), transparent 60%)",
                    pointerEvents: "none",
                    zIndex: 0
                }} className="hero-glow-left" />

                {/* Right/Top-Right Glow */}
                <div style={{
                    position: "absolute",
                    top: "-10%",
                    right: "-10%",
                    width: "45%",
                    height: "120%",
                    background: "radial-gradient(ellipse at 80% 40%, rgba(236, 72, 153, 0.06), transparent 60%)",
                    pointerEvents: "none",
                    zIndex: 0
                }} className="hero-glow-right" />

                {/* Spreading pink gradient targeting h1 from top */}
                <div className="hero-top-grid" />
                <div className="hero-top-pink-glow" />
                <div className="hero-top-pink-line" />

                {/* Centered hero content */}
                <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 10, textAlign: "center" }}>

                    {/* Premium Pill Badge */}
                    <div className="hero-pill-badge">
                        <span className="hero-pill-dot" />
                        <span className="hero-pill-text">
                            ✦ Free Utility &amp; Web Tools ✦
                        </span>
                    </div>

                    {/* Main headline — 90% text-primary, 10% indigo accent */}
                    <h1 style={{ fontSize: "clamp(42px, 7.5vw, 84px)", fontWeight: 900, lineHeight: 1.04, letterSpacing: "-0.04em", marginBottom: "28px", color: "var(--text-primary)" }}>
                        The Home of{" "}
                        <br />
                        <span className="hero-title-blue">Smart Web Tools</span>
                    </h1>



                    {/* Subtitle — theme-aware secondary text color */}
                    <p style={{ fontSize: "clamp(15px, 2.2vw, 19px)", color: "var(--text-secondary)", maxWidth: "580px", margin: "0 auto 40px", lineHeight: 1.75 }}>
                        Access free, fast, and SEO-optimized web tools. Compress images, generate Instagram bios, calculate GPA, extract YouTube tags, and more.{" "}
                        <strong style={{ color: "var(--text-primary)" }}>No signup required.</strong>
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center w-full max-w-sm sm:max-w-none mx-auto px-4 sm:px-0 mb-11">
                        <Link prefetch={false} href="/#tools"
                            className="hero-btn-primary w-full sm:w-auto justify-center"
                        >
                            Browse Tools <ArrowRight size={17} />
                        </Link>
                        <Link prefetch={false} href="/contact-us" style={{
                            display: "flex", alignItems: "center", justifyContent: "center", gap: "9px",
                            background: "var(--bg-tertiary)",
                            color: "var(--text-primary)", fontWeight: 700, fontSize: "16px",
                            padding: "16px 36px", borderRadius: "16px",
                            border: "1px solid var(--border-light)",
                            textDecoration: "none", letterSpacing: "-0.01em",
                            transition: "transform 0.15s, background 0.15s"
                        }}
                        className="hover:bg-slate-200 dark:hover:bg-slate-800 hover:scale-[1.02] w-full sm:w-auto"
                        >
                            <MessageCirclePlus size={17} style={{ color: "#f97316" }} /> Request a Tool
                        </Link>
                    </div>

                    {/* Social proof pills — theme-aware glassmorphism */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
                        {[
                            { icon: <CheckCircle2 size={13} />, label: "UPSC / SSC Portals" },
                            { icon: <CheckCircle2 size={13} />, label: "Bank Applications" },
                            { icon: <CheckCircle2 size={13} />, label: "College Admissions" },
                            { icon: <CheckCircle2 size={13} />, label: "Web Developers" },
                        ].map((p) => (
                            <span key={p.label} style={{
                                display: "inline-flex", alignItems: "center", gap: "5px",
                                background: "var(--bg-tertiary)", border: "1px solid var(--border-light)",
                                borderRadius: "100px", padding: "6px 16px",
                                fontSize: "12px", fontWeight: 600, color: "var(--text-secondary)",
                            }}>
                                <span style={{ color: "#34d399" }}>{p.icon}</span> {p.label}
                            </span>
                        ))}
                    </div>

                </div>
            </section>



            {/* ─── STATS STRIP ─── */}
            <section style={{ position: "relative", zIndex: 1, background: "#0f172a", padding: "48px 20px", overflow: "hidden" }}>
                {/* Grid pattern overlay */}
                <div style={{
                    position: "absolute", inset: 0, opacity: 0.04,
                    backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)",
                }} />
                <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: "32px", position: "relative", zIndex: 1 }}>
                    {stats.map((s, i) => (
                        <div
                            key={i}
                            className={`native-fade-in delay-${(i % 5 + 1) * 100}`}
                            style={{ textAlign: "center" }}
                        >
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px", color: "#818cf8" }}>
                                {s.icon}
                            </div>
                            <p style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "6px" }}>
                                {s.value}
                            </p>
                            <p style={{ fontSize: "13px", color: "#64748b", fontWeight: 600 }}>{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── IMAGE TOOLS ─── */}
            <section id="image-tools" className="bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800/80" style={{ position: "relative", padding: "80px 20px" }}>
                <div style={{ maxWidth: "960px", margin: "0 auto" }}>

                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4338ca", marginBottom: "12px" }}>
                            Image Tools
                        </span>
                        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                            Photo & Image Compression
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "24px", marginBottom: "72px" }}>
                        {[
                            {
                                route: '/image-compressor-to-20kb', title: 'Image Compressor to 20KB',
                                desc: 'Perfect for UPSC, SSC & govt portals. Guaranteed under 20KB.',
                                tags: ['UPSC / IAS', 'SSC', 'Forms']
                            },
                            {
                                route: '/govt-exam-tools/pan-card-photo-resize', title: 'PAN Card Resizer',
                                desc: 'Resize photo and signature for PAN card (UTI/NSDL) easily. 213x213px & 10-20KB presets.',
                                tags: ['PAN Card', 'UTI', 'NSDL']
                            },
                            {
                                route: '/govt-exam-tools/neet-photo-resizer', title: 'NEET Photo Resizer',
                                desc: 'Resize passport & postcard size photos for NEET 2026. Official dimensions & KB limits.',
                                tags: ['NEET 2026', 'NTA', 'Exam']
                            },
                            {
                                route: '/govt-exam-tools/rrb-signature-resizer', title: 'RRB Signature Resizer',
                                desc: 'Resize signature to exact 140x60 pixels for RRB & IBPS exams. 10-20KB compression.',
                                tags: ['RRB', 'IBPS', 'Sign']
                            },
                            {
                                route: '/govt-exam-tools/uti-photo-resize', title: 'UTI Photo Resize',
                                desc: 'Crop and resize photo for UTI PAN applications (213x213px). Exact KB & format.',
                                tags: ['UTI', 'PAN', 'Crop']
                            },
                            {
                                route: '/compress-image-to-100kb', title: 'Compress to 100KB',
                                desc: 'Standard compression for high-quality professional document uploads.',
                                tags: ['General', 'High Quality']
                            },
                            {
                                route: '/mb-to-kb-image-converter', title: 'MB to KB Converter',
                                desc: 'Shrink massive megabyte photos down to optimized kilobytes instantly.',
                                tags: ['Universal', 'Smart Convert']
                            },

                            {
                                route: '/photo-compressor-to-30kb', title: 'Photo Compressor to 30KB',
                                desc: 'Strictly under 30KB for specific government compliance formats.',
                                tags: ['Compliance', 'State Exams']
                            },
                            {
                                route: '/compress-image-to-200kb', title: 'Compress to 200KB',
                                desc: 'Heavy files to 200KB for portals requiring larger HD formats.',
                                tags: ['HD Docs', 'Websites']
                            },
                            {
                                route: '/govt-exam-tools/tnpsc-photo-compressor', title: 'TNPSC Photo Compressor',
                                desc: 'Compress TNPSC photo to 20-50KB and signature to 10-20KB as per official TNPSC requirements.',
                                tags: ['TNPSC', 'Tamil Nadu', 'Govt Exam']
                            },
                            {
                                route: '/govt-exam-tools/signature-resize', title: 'Signature Resize',
                                desc: 'Resize your signature to exact pixels or cm, and compress to target KB — perfect for UPSC, SSC & banking forms.',
                                tags: ['Signature', 'Resize', 'Govt Forms']
                            },
                            {
                                route: '/image-tools', title: 'View All Image Tools',
                                desc: 'Access all our free image compression, resizing, and converting tools in one organized place.',
                                tags: ['View All', 'Free']
                            }
                        ].map((tool, index) => (
                            <ToolCard
                                key={tool.route}
                                route={tool.route}
                                title={tool.title}
                                desc={tool.desc}
                                tags={tool.tags}
                                index={index}
                                gradient="indigo"
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* YOUTUBE TOOLS SECTION */}
            <section id="youtube-tools" className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80" style={{ position: "relative", padding: "80px 20px" }}>
                <div style={{ maxWidth: "960px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#b91c1c", marginBottom: "12px" }}>
                            YouTube Tools
                        </span>
                        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                            Boost Video Growth
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: "24px", marginBottom: "72px" }}>
                        {[
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
                                desc: 'Copy YouTube description, title, tags & views instantly with our free YouTube Description Extractor. Perfect for SEO research and competitor analysis.',
                                tags: ['Data', 'YouTube', 'Research']
                            },
                            {
                                route: '/youtube-title-extractor', title: 'YouTube Title Extractor',
                                desc: 'Easily view and copy the exact title from any YouTube video for your own research.',
                                tags: ['Title', 'YouTube', 'Copy']
                            },
                            {
                                route: '/youtube-tools', title: 'View All YouTube Tools',
                                desc: 'Explore all our free YouTube SEO tools to extract tags, titles, and boost your channel growth.',
                                tags: ['View All', 'Free']
                            }
                        ].map((tool, index) => (
                            <ToolCard
                                key={tool.route}
                                route={tool.route}
                                title={tool.title}
                                desc={tool.desc}
                                tags={tool.tags}
                                index={index}
                                gradient="red"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="mr-0"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* INSTAGRAM TOOLS SECTION */}
            <section id="instagram-tools" className="bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800/80" style={{ position: "relative", padding: "80px 20px" }}>
                <div style={{ maxWidth: "960px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#7e22ce", marginBottom: "12px" }}>
                            Instagram Tools
                        </span>
                        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                            Grow Your Instagram
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "24px", marginBottom: "72px" }}>
                        {[
                            {
                                route: '/instagram-tools/instagram-bio-generator', title: 'Instagram Bio Generator',
                                desc: 'Generate catchy Instagram bios instantly. Pick a category, tone & keywords — get 3 ready-to-copy bios. Free, no signup.',
                                tags: ['Instagram', 'Bio', 'Free']
                            },
                            {
                                route: '/instagram-tools', title: 'View All Instagram Tools',
                                desc: 'Check out all our free tools to optimize your Instagram profile and generate top-tier bios.',
                                tags: ['View All', 'Free']
                            }
                        ].map((tool, index) => (
                            <ToolCard
                                key={tool.route}
                                route={tool.route}
                                title={tool.title}
                                desc={tool.desc}
                                tags={tool.tags}
                                index={index}
                                gradient="purple"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* LOVE & RELATIONSHIP TOOLS SECTION */}
            <section id="love-tools" className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/80" style={{ position: "relative", padding: "80px 20px" }}>
                <div style={{ maxWidth: "960px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#db2777", marginBottom: "12px" }}>
                            Love & Relationship Tools
                        </span>
                        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                            Check Your Connection ❤️
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "24px", marginBottom: "72px" }}>
                        {[
                            {
                                route: '/stylish-couple-name-maker', title: 'Couple Name Maker',
                                desc: 'Blend two names into a stylish, emoji-filled romantic combo for Instagram & hashtags.',
                                tags: ['Popular', 'Social']
                            },
                            {
                                route: '/love-tools/ship-name-generator', title: 'Ship Name Generator',
                                desc: 'Create unique, cute, and catchy ship names for couples and fandoms instantly.',
                                tags: ['New', 'Fandom']
                            },
                            {
                                route: '/calculators/fun/love-percentage-calculator-by-name', title: 'Love Percentage Calculator',
                                desc: 'Check your love match instantly! Enter your name and your crush\'s name to find your score.',
                                tags: ['Fun', 'Social']
                            },
                            {
                                route: '/calculators/fun/flames-calculator', title: 'FLAMES Calculator Online',
                                desc: 'Test your names to reveal your destiny: Friends, Lovers, Affection, Marriage, Enemies, or Siblings.',
                                tags: ['Classic', 'Game']
                            }
                        ].map((tool, index) => (
                            <ToolCard
                                key={tool.route}
                                route={tool.route}
                                title={tool.title}
                                desc={tool.desc}
                                tags={tool.tags}
                                index={index}
                                gradient="pink"
                                icon={<Heart size={22} className="fill-pink-500" />}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CALCULATORS SECTION */}
            <section id="calculators" className="bg-slate-50 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800/80" style={{ position: "relative", padding: "80px 20px" }}>
                <div style={{ maxWidth: "960px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#0369a1", marginBottom: "12px" }}>
                            Calculators
                        </span>
                        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                            Calculators
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "24px", marginBottom: "72px" }}>
                        {[
                            {
                                route: '/calculators/blooket-calculator', title: 'Blooket Calculator',
                                desc: 'Free token and probability calculator for Blooket 2026. Calculate your exact chances to pull rare and chroma blooks.',
                                tags: ['Gaming', 'Blooket', 'Tokens']
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
                            },
                            {
                                route: '/calculators', title: 'View All Calculators',
                                desc: 'Access our full suite of free online calculators for math, analytics, and gaming probabilities.',
                                tags: ['View All', 'Free']
                            }
                        ].map((tool, index) => (
                            <ToolCard
                                key={tool.route}
                                route={tool.route}
                                title={tool.title}
                                desc={tool.desc}
                                tags={tool.tags}
                                index={index}
                                gradient="sky"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /><path d="M12 10v4"/><path d="M10 12h4"/><path d="M10 16h4"/><path d="M10 8h4"/></svg>}
                            />
                        ))}
                    </div>

                    {/* UNIT CONVERTERS SECTION */}
                    <div id="unit-converters" style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#b45309", marginBottom: "12px" }}>
                            Unit Converters
                        </span>
                        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                            Universal Converters
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "24px", marginBottom: "72px" }}>
                        {[
                            {
                                route: '/unit-converters/mb-to-kb', title: 'MB to KB Converter',
                                desc: 'Convert megabytes to kilobytes instantly. 1 MB = 1,024 KB. Perfect for precise file size conversions.',
                                tags: ['mb to kb', 'File Size']
                            },
                            {
                                route: '/unit-converters/gb-to-mb', title: 'GB to MB Converter',
                                desc: 'Convert gigabytes to megabytes instantly. 1 GB = 1,024 MB. Ideal for digital storage capacity calculations.',
                                tags: ['gb to mb', 'Storage']
                            },
                            {
                                route: '/unit-converters', title: 'View All Converters',
                                desc: 'Access over a dozen free unit converters for digital storage sizes including terabytes, gigabytes, megabytes, and kilobytes.',
                                tags: ['View All', 'Free']
                            }
                        ].map((tool, index) => (
                            <ToolCard
                                key={tool.route}
                                route={tool.route}
                                title={tool.title}
                                desc={tool.desc}
                                tags={tool.tags}
                                index={index}
                                gradient="amber"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>}
                            />
                        ))}
                    </div>


                    {/* DATE & TIME TOOLS SECTION */}
                    <div id="date-time-tools" style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563eb", marginBottom: "12px" }}>
                            Date & Time Tools
                        </span>
                        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                            Day & Date Calculators
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "24px", marginBottom: "72px" }}>
                        {[
                            {
                                route: '/date-time-tools/day-calculators/days-from-today', title: 'Days From Today',
                                desc: 'Find out what date is X days from today. Enter any number and get the exact future date instantly.',
                                tags: ['Popular', 'Planning']
                            },
                            {
                                route: '/date-time-tools/day-calculators/30-days-from-today', title: '30 Days From Today',
                                desc: "What's the exact date 30 days from today? Instantly see the result — no calculation needed.",
                                tags: ['Quick Answer', 'Deadline']
                            },
                            {
                                route: '/date-time-tools/day-calculators/date-difference', title: 'Date Difference Calculator',
                                desc: 'Calculate the exact number of days, weeks, and months between any two dates instantly.',
                                tags: ['Days Between', 'Date Math']
                            },
                            {
                                route: '/date-time-tools/day-calculators/90-days-from-today', title: '90 Days From Today',
                                desc: 'Find the exact date 90 days (≈3 months) from today. Great for quarterly planning & notice periods.',
                                tags: ['Quarterly', '90-Day']
                            },
                            {
                                route: '/date-time-tools', title: 'View All Date & Time Tools',
                                desc: 'Explore all our free day calculators — days ago, add days to date, 7/45/60 days from today and more.',
                                tags: ['View All', 'Free']
                            }
                        ].map((tool, index) => (
                            <ToolCard
                                key={tool.route}
                                route={tool.route}
                                title={tool.title}
                                desc={tool.desc}
                                tags={tool.tags}
                                index={index}
                                gradient="blue"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>}
                            />
                        ))}
                    </div>

                    {/* SEO TOOLS SECTION */}

                    <div id="seo-tools" style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#059669", marginBottom: "12px" }}>
                            SEO Tools
                        </span>
                        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                            Boost Search Rankings
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "24px", marginBottom: "72px" }}>
                        {[
                            {
                                route: '/seo-tools/website-audit', title: 'Website Audit Tool',
                                desc: 'Analyze your website for SEO issues, performance bottlenecks, and get actionable recommendations.',
                                tags: ['SEO', 'Audit', 'Performance']
                            },
                            {
                                route: '/seo-tools', title: 'View All SEO Tools',
                                desc: 'Explore all our free SEO tools to optimize your website, check technical SEO, and improve rankings.',
                                tags: ['View All', 'Free']
                            }
                        ].map((tool, index) => (
                            <ToolCard
                                key={tool.route}
                                route={tool.route}
                                title={tool.title}
                                desc={tool.desc}
                                tags={tool.tags}
                                index={index}
                                gradient="emerald"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>}
                            />
                        ))}
                    </div>

                    {/* AI TOOLS SECTION */}
                    <div id="ai-tools" style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3b82f6", marginBottom: "12px" }}>
                            AI Tools
                        </span>
                        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                            Prompt Generators
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "24px", marginBottom: "72px" }}>
                        {[
                            {
                                route: '/ai-prompts/gemini-prompt-generator', title: 'Gemini Prompt Generator',
                                desc: 'Craft the perfect AI prompt for Google Gemini to get highly accurate and tailored responses.',
                                tags: ['AI Tool', 'Gemini', 'Prompts']
                            },
                            {
                                route: '/ai-prompts', title: 'View All AI Tools',
                                desc: 'Explore all AI prompt generators and utility tools to maximize your AI productivity.',
                                tags: ['View All', 'Free']
                            }
                        ].map((tool, index) => (
                            <ToolCard
                                key={tool.route}
                                route={tool.route}
                                title={tool.title}
                                desc={tool.desc}
                                tags={tool.tags}
                                index={index}
                                gradient="indigo"
                                icon={<Zap size={22} />}
                            />
                        ))}
                    </div>

                    {/* OTHER TOOLS SECTION */}
                    <div id="other-tools" style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6d28d9", marginBottom: "12px" }}>
                            Other Tools
                        </span>
                        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                            Social & Utilities
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "24px", marginBottom: "72px" }}>
                        {[
                            {
                                route: '/other-tools/random-object-generator', title: 'Random Object Generator',
                                desc: 'Instantly generate up to 100 arbitrary items for games, drawing, or object shows. Features a live animated roulette.',
                                tags: ['Live App', 'Fun Utility', 'Lists']
                            },
                            {
                                route: '/stylish-couple-name-maker', title: 'Couple Name Maker',
                                desc: 'Combine two names into a stylish, emoji-filled romantic combo for Instagram & hashtags.',
                                tags: ['New Utility', 'Social']
                            },
                            {
                                route: '/other-tools', title: 'View All Other Tools',
                                desc: 'Explore our complete collection of fun, social, and handy miscellaneous utilities.',
                                tags: ['View All', 'Free']
                            }
                        ].map((tool, index) => (
                            <ToolCard
                                key={tool.route}
                                route={tool.route}
                                title={tool.title}
                                desc={tool.desc}
                                tags={tool.tags}
                                index={index}
                                gradient="violet"
                                icon={<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SMART AI TOOLS PROMOTION ─── */}
            <section style={{ padding: "80px 20px", background: "var(--bg-primary)", borderTop: "1px solid var(--border-light)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "10%", left: "5%", width: "300px", height: "300px", background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "10%", right: "5%", width: "250px", height: "250px", background: "radial-gradient(ellipse, rgba(236,72,153,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
                
                <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px", alignItems: "center" }} className="md:grid-cols-2">
                        
                        {/* Left Side: Text Details */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6366f1" }}>
                                Smart AI Generators
                            </span>
                            <h2 style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                                Write Better Prompts, <br/>Get Perfect AI Results.
                            </h2>
                            <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                                AI is only as good as the prompt you give it. Our AI Prompt Generators help you write structured, highly optimized prompts for Gemini, ChatGPT, and Claude in seconds. No prompt-engineering experience needed.
                            </p>
                            
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                                <Link
                                    prefetch={false}
                                    href="/ai-prompts/gemini-prompt-generator"
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: "8px",
                                        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                        color: "#fff", fontWeight: 700, fontSize: "14px",
                                        padding: "12px 24px", borderRadius: "12px",
                                        boxShadow: "0 4px 14px rgba(99,102,241,0.3)"
                                    }}
                                    className="hover:scale-[1.02] active:scale-[0.98] transition-all"
                                >
                                    Try Gemini Generator <ArrowRight size={15} />
                                </Link>
                                <Link
                                    prefetch={false}
                                    href="/ai-prompts"
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: "8px",
                                        background: "transparent", border: "1px solid var(--border-medium)",
                                        color: "var(--text-primary)", fontWeight: 700, fontSize: "14px",
                                        padding: "12px 24px", borderRadius: "12px"
                                    }}
                                    className="hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                    Browse AI Suite
                                </Link>
                            </div>
                        </div>

                        {/* Right Side: Floating elements / Mock AI Prompt UI */}
                        <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center" }} className="h-[280px] md:h-auto">
                            
                            {/* Abstract Floating Shapes */}
                            <div className="absolute w-20 h-20 rounded-full bg-indigo-500/10 blur-xl floating-1" style={{ top: "10%", left: "10%" }} />
                            <div className="absolute w-28 h-28 rounded-full bg-pink-500/10 blur-xl floating-2" style={{ bottom: "10%", right: "10%" }} />
                            
                            {/* Mock Prompt Box */}
                            <div className="glass-card relative w-full max-w-[340px] rounded-2xl p-5 floating-1">
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ef4444" }} />
                                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#f59e0b" }} />
                                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10b981" }} />
                                    <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--text-tertiary)", marginLeft: "auto" }}>gemini-generator.exe</span>
                                </div>
                                <div style={{ background: "var(--bg-secondary)", borderRadius: "8px", padding: "10px", border: "1px solid var(--border-light)", marginBottom: "12px" }}>
                                    <p style={{ fontSize: "12px", fontFamily: "monospace", color: "var(--text-secondary)", margin: 0 }}>
                                        <span style={{ color: "#6366f1" }}>SYSTEM:</span> Act as an expert copywriter. Optimize the following text for high conversion...
                                    </p>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#10b981", display: "flex", alignItems: "center", gap: "4px" }}>
                                        <CheckCircle2 size={12} /> Optimized for API v2
                                    </span>
                                    <button 
                                        suppressHydrationWarning
                                        style={{ background: "linear-gradient(135deg, #f97316, #f59e0b)", color: "white", border: "none", fontSize: "11px", fontWeight: 800, padding: "6px 12px", borderRadius: "6px", cursor: "pointer" }}
                                    >
                                        Generate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section style={{ padding: "120px 20px", background: "var(--bg-secondary)", position: "relative", overflow: "hidden" }}>
                {/* Multi-layered decorative glows */}
                <div style={{ position: "absolute", top: "-200px", left: "-200px", width: "700px", height: "700px", background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "-200px", right: "-100px", width: "600px", height: "600px", background: "radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 65%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "1px", height: "60%", background: "linear-gradient(180deg, transparent, rgba(99,102,241,0.08), transparent)", pointerEvents: "none" }} />

                <div style={{ maxWidth: "1140px", margin: "0 auto", position: "relative", zIndex: 1 }}>
                    {/* Section Header */}
                    <div style={{ textAlign: "center", marginBottom: "80px" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "12px", fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8b5cf6", marginBottom: "20px", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", padding: "8px 20px", borderRadius: "100px" }}>
                            <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#8b5cf6", boxShadow: "0 0 8px #8b5cf6", animation: "pulse 2s infinite" }} />
                            Simple as 1-2-3
                        </div>
                        <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--text-primary)", marginBottom: "16px" }}>
                            How It{" "}
                            <span style={{ background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Works</span>
                        </h2>
                        <p style={{ color: "var(--text-secondary)", fontSize: "18px", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
                            Three steps. Zero friction. Maximum output.
                        </p>
                    </div>

                    {/* Steps Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "28px", alignItems: "start" }}>
                        {steps.map((s, i) => {
                            const gradients = [
                                { from: "#6366f1", to: "#8b5cf6", glow: "rgba(99,102,241,0.4)", soft: "rgba(99,102,241,0.06)" },
                                { from: "#8b5cf6", to: "#ec4899", glow: "rgba(139,92,246,0.4)", soft: "rgba(139,92,246,0.06)" },
                                { from: "#06b6d4", to: "#6366f1", glow: "rgba(6,182,212,0.4)", soft: "rgba(6,182,212,0.06)" },
                            ];
                            const g = gradients[i % gradients.length];
                            return (
                                <div
                                    key={i}
                                    className={`group native-fade-in delay-${(i % 5 + 1) * 100}`}
                                    style={{
                                        position: "relative",
                                        borderRadius: "28px",
                                        padding: "2px",
                                        background: "transparent",
                                        transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                                    }}
                                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-10px) scale(1.01)"; }}
                                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0) scale(1)"; }}
                                >
                                    {/* Gradient border on hover using pseudo via inline trick */}
                                    <div
                                        className="group-hover:opacity-100"
                                        style={{
                                            position: "absolute", inset: 0, borderRadius: "28px",
                                            background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                                            opacity: 0, transition: "opacity 0.4s ease", zIndex: 0,
                                        }}
                                    />
                                    <div style={{
                                        position: "relative", zIndex: 1,
                                        background: "var(--bg-primary)",
                                        borderRadius: "27px",
                                        padding: "40px 36px 44px",
                                        border: "1px solid var(--border-light)",
                                        overflow: "hidden",
                                    }}>
                                        {/* Giant watermark number */}
                                        <div style={{
                                            position: "absolute", top: "-20px", right: "-8px",
                                            fontSize: "140px", fontWeight: 900, lineHeight: 1,
                                            background: `linear-gradient(135deg, ${g.from}18, transparent)`,
                                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                            backgroundClip: "text",
                                            userSelect: "none", pointerEvents: "none",
                                            transition: "transform 0.5s ease",
                                            zIndex: 0,
                                        }}>
                                            0{s.n}
                                        </div>

                                        {/* Top row: badge + step number */}
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px", position: "relative", zIndex: 1 }}>
                                            {/* Icon badge */}
                                            <div style={{
                                                width: "60px", height: "60px", borderRadius: "18px",
                                                background: `linear-gradient(135deg, ${g.from}, ${g.to})`,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                boxShadow: `0 16px 40px ${g.glow}`,
                                                fontSize: "24px", fontWeight: 900, color: "#fff",
                                                flexShrink: 0,
                                                transition: "box-shadow 0.3s ease, transform 0.3s ease",
                                            }}>
                                                {s.n}
                                            </div>
                                            {/* Step label pill */}
                                            <div style={{
                                                fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em",
                                                textTransform: "uppercase",
                                                color: g.from,
                                                background: g.soft,
                                                border: `1px solid ${g.from}30`,
                                                padding: "5px 14px", borderRadius: "100px",
                                            }}>
                                                Step 0{s.n}
                                            </div>
                                        </div>

                                        {/* Text content */}
                                        <div style={{ position: "relative", zIndex: 1 }}>
                                            <h3 style={{
                                                fontSize: "22px", fontWeight: 800,
                                                color: "var(--text-primary)",
                                                marginBottom: "12px", letterSpacing: "-0.02em"
                                            }}>
                                                {s.title}
                                            </h3>
                                            <p style={{
                                                fontSize: "15px",
                                                color: "var(--text-secondary)",
                                                lineHeight: 1.75, margin: 0
                                            }}>
                                                {s.desc}
                                            </p>
                                        </div>

                                        {/* Bottom accent bar */}
                                        <div style={{
                                            position: "absolute", bottom: 0, left: "36px", right: "36px",
                                            height: "3px", borderRadius: "100px",
                                            background: `linear-gradient(90deg, ${g.from}, ${g.to})`,
                                            opacity: 0.5,
                                            transition: "opacity 0.4s ease, transform 0.4s ease",
                                        }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Bottom CTA row */}
                    <div style={{ textAlign: "center", marginTop: "64px" }}>
                        <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "20px" }}>
                            Ready to get started? No sign-up required.
                        </p>
                        <a href="#tools" style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            background: "linear-gradient(135deg, #6366f1, #a855f7)",
                            color: "#fff", border: "none", borderRadius: "14px",
                            padding: "14px 32px", fontSize: "15px", fontWeight: 700,
                            textDecoration: "none", cursor: "pointer",
                            boxShadow: "0 12px 40px rgba(99,102,241,0.35)",
                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 50px rgba(99,102,241,0.5)"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(99,102,241,0.35)"; }}
                        >
                            🚀 Try a Tool Now
                        </a>
                    </div>
                </div>
            </section>

            {/* ─── FEATURES ─── */}
            <section style={{ padding: "80px 20px", background: "#0f172a", position: "relative", overflow: "hidden" }}>
                {/* Subtle dot pattern */}
                <div style={{ position: "absolute", inset: 0, opacity: 0.035, backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
                {/* Purple glow */}
                <div style={{ position: "absolute", top: "-100px", right: "10%", width: "400px", height: "400px", background: "radial-gradient(ellipse, rgba(139,92,246,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 1 }}>
                    <div style={{ textAlign: "center", marginBottom: "56px" }}>
                        <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#818cf8", marginBottom: "12px" }}>
                            Why SmartToolsWala
                        </span>
                        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.2, maxWidth: "600px", margin: "0 auto" }}>
                            Built for Performance &amp; Privacy
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "20px" }}>
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className={`native-fade-in delay-${(i % 5 + 1) * 100}`}
                                style={{
                                    background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)",
                                    borderRadius: "24px", padding: "32px 28px",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    transition: "background 0.2s, transform 0.2s",
                                }}
                            >
                                <div style={{
                                    width: "52px", height: "52px", borderRadius: "16px",
                                    background: f.gradient,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#fff", marginBottom: "20px",
                                    boxShadow: "0 6px 20px rgba(0,0,0,0.3)"
                                }}>
                                    {f.icon}
                                </div>
                                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#f8fafc", marginBottom: "10px", letterSpacing: "-0.01em" }}>
                                    {f.title}
                                </h3>
                                <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: 1.7 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA inside dark section */}
                    <div
                        className="native-fade-in delay-200"
                        style={{ textAlign: "center", marginTop: "56px" }}
                    >
                        <Link prefetch={false} href="/image-compressor-to-20kb" style={{
                            display: "inline-flex", alignItems: "center", gap: "10px",
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            color: "#fff", fontWeight: 800, fontSize: "16px",
                            padding: "15px 36px", borderRadius: "16px",
                            boxShadow: "0 4px 24px rgba(99,102,241,0.45)",
                            textDecoration: "none", letterSpacing: "-0.01em"
                        }}>
                            <Zap size={18} /> Start Compressing — It&apos;s Free
                        </Link>
                        <p style={{ marginTop: "14px", fontSize: "13px", color: "#475569" }}>
                            No signup · No watermarks · No limits
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── BOOST PRODUCTIVITY ─── */}
            <section style={{ padding: "80px 20px", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)", position: "relative", overflow: "hidden" }}>
                <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "48px", alignItems: "center" }} className="lg:grid-cols-2">
                        
                        {/* Left Side: Newsletter Signup */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#f97316" }}>
                                Boost Productivity
                            </span>
                            <h2 style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                                Get New Tools <br/>Direct in Your Inbox.
                            </h2>
                            <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                                Join our community of 10k+ power users. We launch new custom tools every week to automate your daily repetitive digital tasks.
                            </p>
                            
                            {/* Email Signup Form */}
                            <form 
                                onSubmit={(e) => e.preventDefault()} 
                                style={{ display: "flex", gap: "10px", width: "100%", maxWidth: "420px" }}
                            >
                                <div style={{ position: "relative", flexGrow: 1 }}>
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email address" 
                                        required 
                                        suppressHydrationWarning
                                        style={{ 
                                            width: "100%", 
                                            padding: "14px 16px 14px 42px", 
                                            borderRadius: "12px", 
                                            border: "1.5px solid var(--border-medium)", 
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            outline: "none"
                                        }}
                                        className="focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all dark:bg-slate-900"
                                    />
                                    <Mail size={16} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-tertiary)" }} />
                                </div>
                                <button 
                                    type="submit" 
                                    suppressHydrationWarning
                                    style={{ 
                                        background: "linear-gradient(135deg, #f97316, #f59e0b)", 
                                        color: "white", 
                                        border: "none", 
                                        padding: "14px 20px", 
                                        borderRadius: "12px", 
                                        fontWeight: 800, 
                                        fontSize: "14px", 
                                        cursor: "pointer", 
                                        display: "flex", 
                                        alignItems: "center", 
                                        gap: "6px" 
                                    }}
                                    className="hover:scale-[1.02] active:scale-[0.98] transition-transform"
                                >
                                    Subscribe <SendHorizontal size={14} />
                                </button>
                            </form>
                            
                            <p style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
                                Join today. Unsubscribe at any time. We respect your privacy.
                            </p>
                        </div>
                        
                        {/* Right Side: Productivity Impact Card */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="w-full">
                            
                            {/* Card Wrapper */}
                            <div style={{ 
                                borderRadius: "24px", 
                                padding: "28px"
                            }} className="glass-card w-full relative overflow-hidden group hover:border-orange-500/30 transition-all duration-300">
                                
                                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-primary)", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                                    <Zap size={18} className="text-orange-500" /> Productivity Impact
                                </h3>
                                
                                {/* Power Users Stat */}
                                <div style={{ marginBottom: "20px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                        <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-secondary)" }}>Power Users</span>
                                        <span style={{ fontSize: "13px", fontWeight: 800, color: "#10b981" }}>42 Hours Saved / Mo</span>
                                    </div>
                                    <div style={{ height: "8px", background: "var(--bg-tertiary)", borderRadius: "100px", overflow: "hidden" }}>
                                        <div style={{ width: "92%", height: "100%", background: "linear-gradient(90deg, #10b981, #059669)", borderRadius: "100px" }} />
                                    </div>
                                </div>
                                
                                {/* Average Users Stat */}
                                <div style={{ marginBottom: "20px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                        <span style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-secondary)" }}>Average Users</span>
                                        <span style={{ fontSize: "13px", fontWeight: 800, color: "#6366f1" }}>18 Hours Saved / Mo</span>
                                    </div>
                                    <div style={{ height: "8px", background: "var(--bg-tertiary)", borderRadius: "100px", overflow: "hidden" }}>
                                        <div style={{ width: "45%", height: "100%", background: "linear-gradient(90deg, #6366f1, #8b5cf6)", borderRadius: "100px" }} />
                                    </div>
                                </div>
                                
                                {/* Mini Testimonial */}
                                <div style={{ background: "var(--bg-secondary)", borderRadius: "16px", padding: "16px", border: "1px solid var(--border-light)", display: "flex", gap: "12px", alignItems: "start" }}>
                                    <ThumbsUp size={16} className="text-orange-500 shrink-0 mt-0.5" />
                                    <p style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                                        &ldquo;Signature Resizer saved me hours of editing while filling out exam forms. Absolute lifesaver!&rdquo; <br/>
                                        <strong style={{ fontSize: "11px", color: "var(--text-primary)" }}>— Amit K., UPSC Aspirant</strong>
                                    </p>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </section>

            {/* ─── BLOG (children) ─── */}
            <section style={{ background: "var(--bg-primary)" }}>
                {children}
            </section>

        </div>
    );
}

