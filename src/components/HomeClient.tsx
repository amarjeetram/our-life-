"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
    Zap,
    ArrowRight,
    ShieldCheck,
    Lock,
    CheckCircle2,
    Star,
    Clock,
    Search,
    Sparkles,
    ChevronDown,
    ChevronUp,
    HelpCircle,
    UserCheck,
    Check,
    Cpu,
    Coins,
    Smartphone,
    Globe,
    Layers,
    ArrowUpRight,
    MessageSquare,
    SendHorizontal,
    ImageIcon,
    Compass,
    Shield,
    Flame,
    FileText,
    Wand2,
    Youtube,
    Instagram,
    Calculator,
    Heart,
    Calendar,
    ArrowLeftRight,
    ExternalLink,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ToolCategory } from "@/data/toolsData";

// ── Per-category icon + gradient palette ──────────────────────────────────
const CATEGORY_META: Record<ToolCategory, { Icon: LucideIcon; from: string; via: string; to: string; glow: string }> = {
    "Image Tools":        { Icon: ImageIcon,      from: "#6366f1", via: "#8b5cf6", to: "#a78bfa", glow: "rgba(99,102,241,0.35)" },
    "Govt Exam Tools":    { Icon: ShieldCheck,    from: "#0ea5e9", via: "#38bdf8", to: "#7dd3fc", glow: "rgba(14,165,233,0.35)" },
    "YouTube Tools":      { Icon: Youtube,        from: "#ef4444", via: "#f87171", to: "#fca5a5", glow: "rgba(239,68,68,0.35)" },
    "Instagram Tools":    { Icon: Instagram,      from: "#ec4899", via: "#f472b6", to: "#e879f9", glow: "rgba(236,72,153,0.35)" },
    "Calculators":        { Icon: Calculator,     from: "#f59e0b", via: "#fbbf24", to: "#fde68a", glow: "rgba(245,158,11,0.35)" },
    "Unit Converters":    { Icon: ArrowLeftRight, from: "#10b981", via: "#34d399", to: "#6ee7b7", glow: "rgba(16,185,129,0.35)" },
    "Date & Time Tools":  { Icon: Calendar,       from: "#8b5cf6", via: "#a78bfa", to: "#c4b5fd", glow: "rgba(139,92,246,0.35)" },
    "SEO Tools":          { Icon: Globe,          from: "#06b6d4", via: "#22d3ee", to: "#67e8f9", glow: "rgba(6,182,212,0.35)" },
    "Love & Relationship":{ Icon: Heart,          from: "#f43f5e", via: "#fb7185", to: "#fda4af", glow: "rgba(244,63,94,0.35)" },
    "AI Tools":           { Icon: Sparkles,       from: "#7c3aed", via: "#8b5cf6", to: "#c084fc", glow: "rgba(124,58,237,0.35)" },
};
import HeroUploadZone from "./HeroUploadZone";
import { ALL_TOOLS, CATEGORIES } from "@/data/toolsData";

export default function HomeClient({ children }: { children: React.ReactNode }) {
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    // Interactive grid mouse tracking
    const gridWrapperRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const handleGridMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!gridWrapperRef.current || !spotlightRef.current) return;
        const rect = gridWrapperRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spotlightRef.current.style.setProperty("--mx", `${x}px`);
        spotlightRef.current.style.setProperty("--my", `${y}px`);
        spotlightRef.current.style.opacity = "1";
    }, []);
    const handleGridMouseLeave = useCallback(() => {
        if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
    }, []);


    const featuredTools = ALL_TOOLS.filter((t) => t.featured).slice(0, 12);

    const faqs = [
        {
            q: "Is SmartToolsWala completely free to use?",
            a: "Yes! All our tools (image compressors, YouTube extractors, GPA calculators, unit converters) are 100% free with no hidden charges, daily caps, or forced subscriptions.",
        },
        {
            q: "Are my uploaded photos and files safe and private?",
            a: "Absolutely. Most of our tools process files directly in your browser. Any temporary server processing is immediately auto-deleted from memory after conversion.",
        },
        {
            q: "Do I need to register or create an account to use the tools?",
            a: "No registration or login is required to use any of our web utilities. Just open the tool, process your files, and download instantly.",
        },
        {
            q: "Does image compression reduce photo quality?",
            a: "Our image tools use smart industrial compression algorithms (Sharp & WebAssembly) that significantly shrink file sizes (under 20KB, 50KB, etc.) while preserving visual quality.",
        },
        {
            q: "How can I request a new tool?",
            a: "You can click on the 'Request a Tool' button in the hero section or visit our contact page to suggest new tools you would like us to build.",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden">
            {/* ─── 1. HERO SECTION (ULTRA SAAS GLASSMORPHISM) ─── */}
            <section className="relative pt-36 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-200/60 dark:border-white/10">
                {/* Left/Top-Left Glow */}
                <div style={{
                    position: "absolute",
                    top: "-10%",
                    left: "-10%",
                    width: "45%",
                    height: "120%",
                    background: "radial-gradient(ellipse at 20% 30%, rgba(99, 102, 241, 0.12), transparent 60%)",
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
                    background: "radial-gradient(ellipse at 80% 40%, rgba(236, 72, 153, 0.1), transparent 60%)",
                    pointerEvents: "none",
                    zIndex: 0
                }} className="hero-glow-right" />

                {/* Spreading Grid, Pink Glow & Beam Line */}
                <div className="hero-top-grid" />
                <div className="hero-top-pink-glow" />
                <div className="hero-top-pink-line" />

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    {/* Glowing Glass Pill Badge */}
                    <div className="hero-pill-badge">
                        <span className="hero-pill-dot" />
                        <span className="hero-pill-text">✦ Free Utility &amp; Web Tools ✦</span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.06] mb-6">
                        Smart, Fast & Free <br />
                        <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">
                            Web Utility Tools
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-slate-600 dark:text-slate-300 text-base sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Compress images under 20KB, extract YouTube tags, calculate GPA, generate bios, and convert units instantly. Zero limits, zero wait time.
                    </p>


                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                        <Link
                            href="/tools"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold text-base shadow-[0_10px_35px_rgba(99,102,241,0.35)] transition-all hover:scale-[1.03] active:scale-95 text-decoration-none"
                        >
                            Explore All Tools <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/contact-us"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 hover:bg-white dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-base border border-slate-200/80 dark:border-white/10 transition-all hover:scale-[1.03] active:scale-95 text-decoration-none shadow-sm"
                        >
                            Request a Tool
                        </Link>
                    </div>

                    {/* Social proof pills */}
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 justify-center max-w-sm sm:max-w-none mx-auto">
                        {[
                            { label: "UPSC / SSC Presets" },
                            { label: "100% Free Forever" },
                            { label: "Zero File Upload Limits" },
                            { label: "No Signup Required" },
                        ].map((p) => (
                            <span
                                key={p.label}
                                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold backdrop-blur-md bg-white/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/10 text-slate-600 dark:text-slate-300 shadow-sm"
                            >
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {p.label}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 2. FEATURED TOOLS ─── */}
            {/* Full-width bg wrapper — background spans edge to edge, no clipping */}
            <div
                className="relative w-full py-24"
                ref={gridWrapperRef}
                onMouseMove={handleGridMouseMove}
                onMouseLeave={handleGridMouseLeave}
            >
                {/* Background layers — fixed to this wrapper, not clipped by any section */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {/* Static grid lines */}
                    <div className="hero-top-grid" style={{ top: 0, opacity: 0.18 }} />
                    <div className="hero-top-pink-glow" />
                    <div className="hero-top-pink-line" />
                    <div className="absolute top-1/4 left-[10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl" />
                    <div className="absolute top-1/3 right-[8%] w-[420px] h-[420px] bg-pink-500/08 rounded-full blur-3xl" />
                    {/* Interactive cursor spotlight that fills grid cells */}
                    <div
                        ref={spotlightRef}
                        className="grid-spotlight"
                        style={{ opacity: 0, transition: "opacity 0.3s ease" }}
                    />
                </div>

                {/* Content container — no overflow-hidden, no border */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
                        <div>
                            <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-2 block">
                                ✦ Handpicked Utilities ✦
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                                Popular &amp; Featured Tools
                            </h2>
                        </div>
                        <Link
                            href="/tools"
                            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-sm hover:underline text-decoration-none"
                        >
                            View All 100+ Tools <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {featuredTools.map((tool, idx) => {
                            const meta = CATEGORY_META[tool.category] ?? CATEGORY_META["AI Tools"];
                            const { Icon } = meta;
                            return (
                                <Link
                                    key={tool.id}
                                    href={tool.route}
                                    className="tool-card-2026 group relative flex flex-col gap-5 p-6 rounded-[20px] bg-white dark:bg-[#0f1117] border border-slate-200/70 dark:border-white/[0.07] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden text-decoration-none"
                                >
                                    {/* Hover glow border overlay */}
                                    <div
                                        className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                        style={{ boxShadow: `0 0 0 1.5px ${meta.from}, 0 8px 40px ${meta.glow}` }}
                                    />

                                    {/* Top: icon orb + card number */}
                                    <div className="flex items-start justify-between">
                                        {/* Gradient icon orb */}
                                        <div
                                            className="flex items-center justify-center w-11 h-11 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300"
                                            style={{ background: `linear-gradient(135deg, ${meta.from}, ${meta.to})`, boxShadow: `0 4px 16px ${meta.glow}` }}
                                        >
                                            <Icon className="w-5 h-5 text-white" />
                                        </div>
                                        {/* Card index number */}
                                        <span className="text-[11px] font-black tracking-widest text-slate-300 dark:text-slate-600 select-none">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                    </div>

                                    {/* Body */}
                                    <div className="flex-1">
                                        {/* Category label */}
                                        <p
                                            className="text-[11px] font-extrabold uppercase tracking-widest mb-1.5"
                                            style={{ color: meta.from }}
                                        >
                                            {tool.category}
                                        </p>
                                        <h3 className="text-[17px] font-black text-slate-900 dark:text-white leading-snug tracking-tight mb-2 group-hover:opacity-90 transition-opacity">
                                            {tool.title}
                                        </h3>
                                        <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium line-clamp-2">
                                            {tool.description}
                                        </p>
                                    </div>

                                    {/* Footer CTA */}
                                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/[0.06]">
                                        <span
                                            className="text-[13px] font-extrabold group-hover:opacity-80 transition-opacity"
                                            style={{ color: meta.from }}
                                        >
                                            Try Tool Now
                                        </span>
                                        <div
                                            className="flex items-center justify-center w-8 h-8 rounded-full group-hover:translate-x-1 transition-transform duration-200"
                                            style={{ background: `linear-gradient(135deg, ${meta.from}22, ${meta.to}22)` }}
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" style={{ color: meta.from }} />
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ─── 3. BROWSE BY CATEGORY ─── */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/60 dark:border-white/10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-2 block">
                        Organized Workspace
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                        Browse Tools by Category
                    </h2>
                    <p className="text-slate-500 text-sm sm:text-base font-medium">
                        Explore dedicated categories designed to help students, creators, and developers solve tasks fast.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CATEGORIES.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/tools`}
                            className="group p-6 rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-white/10 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1.5 text-decoration-none flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/15 to-purple-500/15 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Layers className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                    {cat.label}
                                </h3>
                                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 font-medium">
                                    {cat.desc}
                                </p>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-extrabold text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                                <span>{cat.count}+ Tools</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* ─── 4. WHY CHOOSE SMARTTOOLSWALA (OBSIDIAN GLASS) ─── */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-950 text-white rounded-3xl my-12 relative overflow-hidden border border-white/10 shadow-2xl shadow-indigo-950/40">
                {/* Background Ambient Glows */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
                    <span className="text-xs font-extrabold text-indigo-400 tracking-widest uppercase mb-2 block">
                        Engineered For Efficiency
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
                        Why Choose SmartToolsWala?
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base font-medium">
                        Built from the ground up for sub-second speed, absolute privacy, and seamless usability.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                    {[
                        {
                            icon: <Zap className="w-6 h-6 text-amber-400" />,
                            title: "Lightning Fast",
                            desc: "Powered by WebAssembly & optimized backend engines for sub-second processing.",
                        },
                        {
                            icon: <Cpu className="w-6 h-6 text-indigo-400" />,
                            title: "AI Powered",
                            desc: "Smart algorithms automatically optimize image quality and extract accurate data.",
                        },
                        {
                            icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
                            title: "100% Privacy Focused",
                            desc: "Files stay in your browser or are permanently deleted immediately after processing.",
                        },
                        {
                            icon: <Coins className="w-6 h-6 text-purple-400" />,
                            title: "Free Daily Usage",
                            desc: "No hidden subscriptions, paywalls, or credit card requirements.",
                        },
                        {
                            icon: <Lock className="w-6 h-6 text-rose-400" />,
                            title: "Secure & Encrypted",
                            desc: "End-to-end HTTPS protection for all server communication and downloads.",
                        },
                        {
                            icon: <Smartphone className="w-6 h-6 text-sky-400" />,
                            title: "100% Mobile Friendly",
                            desc: "Fully responsive touch interface optimized for Android, iOS & desktop devices.",
                        },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="backdrop-blur-2xl bg-slate-900/80 p-6 rounded-3xl border border-white/10 shadow-xl hover:border-indigo-500/40 hover:bg-slate-900 transition-all duration-300"
                        >
                            <div className="p-3 rounded-2xl bg-slate-950/80 w-fit mb-4 border border-white/10">
                                {item.icon}
                            </div>
                            <h3 className="text-lg font-extrabold text-white mb-2">{item.title}</h3>
                            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── 5. HOW IT WORKS ─── */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-2 block">
                        Simple Workflow
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        How It Works in 3 Simple Steps
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            step: "01",
                            title: "Pick or Search a Tool",
                            desc: "Search from our 100+ utilities or select your desired tool from the directory.",
                        },
                        {
                            step: "02",
                            title: "Upload or Enter Data",
                            desc: "Drag and drop your file, image, or enter parameters with instant preview.",
                        },
                        {
                            step: "03",
                            title: "Get Instant Results",
                            desc: "Download your compressed image or copy your generated output in seconds.",
                        },
                    ].map((s) => (
                        <div
                            key={s.step}
                            className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 text-center relative shadow-lg hover:border-indigo-500/40 transition-all duration-300"
                        >
                            <span className="text-5xl font-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent block mb-4">
                                {s.step}
                            </span>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{s.title}</h3>
                            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── 6. TESTIMONIALS ─── */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200/60 dark:border-white/10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-2 block">
                        Trusted Worldwide
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        Loved by Students, Creators & Developers
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            quote: "The 20KB signature resizer saved my UPSC application submission! Worked instantly on mobile.",
                            author: "Priya Sharma",
                            role: "UPSC Aspirant",
                        },
                        {
                            quote: "Extremely fast YouTube tag & title extractors. A must-have bookmark for content creators.",
                            author: "Rohan Verma",
                            role: "YouTube Creator",
                        },
                        {
                            quote: "Best free image compressor out there. Clean UI, zero watermarks, and incredible compression speed.",
                            author: "Alex Mercer",
                            role: "Web Developer",
                        },
                    ].map((t, i) => (
                        <div
                            key={i}
                            className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 p-6 rounded-3xl border border-slate-200/80 dark:border-white/10 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all"
                        >
                            <div className="flex gap-1 text-amber-400 mb-4">
                                {[...Array(5)].map((_, idx) => (
                                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                                ))}
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 italic font-medium">
                                "{t.quote}"
                            </p>
                            <div>
                                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">{t.author}</h4>
                                <p className="text-slate-400 text-xs font-semibold">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── 7. PRICING PREVIEW ─── */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-2 block">
                        Transparent Pricing
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                        100% Free Forever for Everyone
                    </h2>
                    <p className="text-slate-500 text-sm font-medium">
                        All tools on SmartToolsWala are free with unlimited daily usage.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Free Tier */}
                    <div className="backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 p-8 rounded-3xl border-2 border-indigo-600 dark:border-indigo-500 shadow-[0_0_50px_rgba(99,102,241,0.25)] relative">
                        <span className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                            Popular
                        </span>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Free Plan</h3>
                        <p className="text-4xl font-black text-slate-900 dark:text-white mb-6">
                            $0 <span className="text-xs font-semibold text-slate-400">/ forever</span>
                        </p>
                        <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-8 font-medium">
                            <li className="flex items-center gap-2.5">
                                <Check className="w-4 h-4 text-emerald-500 shrink-0" /> Access to 100+ Free Online Tools
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Check className="w-4 h-4 text-emerald-500 shrink-0" /> Unlimited File Processing
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Check className="w-4 h-4 text-emerald-500 shrink-0" /> No Registration or Account Needed
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Check className="w-4 h-4 text-emerald-500 shrink-0" /> Zero Watermarks on Downloads
                            </li>
                        </ul>
                        <Link
                            href="/tools"
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-extrabold text-sm block text-center shadow-lg shadow-indigo-600/25 hover:scale-[1.02] active:scale-95 transition-all text-decoration-none"
                        >
                            Start Using Free Tools
                        </Link>
                    </div>

                    {/* API / Custom Plan */}
                    <div className="backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 p-8 rounded-3xl border border-slate-200/80 dark:border-white/10 shadow-sm">
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">API & Custom</h3>
                        <p className="text-4xl font-black text-slate-900 dark:text-white mb-6">
                            Custom <span className="text-xs font-semibold text-slate-400">/ integrations</span>
                        </p>
                        <ul className="space-y-3.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-8 font-medium">
                            <li className="flex items-center gap-2.5">
                                <Check className="w-4 h-4 text-indigo-500 shrink-0" /> Bulk Image Compression API
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Check className="w-4 h-4 text-indigo-500 shrink-0" /> Custom Presets for Portals
                            </li>
                            <li className="flex items-center gap-2.5">
                                <Check className="w-4 h-4 text-indigo-500 shrink-0" /> Dedicated SLA Support
                            </li>
                        </ul>
                        <Link
                            href="/contact-us"
                            className="w-full py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm block text-center text-decoration-none hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                        >
                            Contact Support
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── 8. FAQ SECTION ─── */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-200/60 dark:border-white/10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-2 block">
                        Got Questions?
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openFaqIndex === index;
                        return (
                            <div
                                key={index}
                                className="backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-white/10 overflow-hidden shadow-sm hover:border-indigo-500/40 transition-all"
                            >
                                <button
                                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                                    className="w-full p-5 text-left font-extrabold text-slate-900 dark:text-white text-sm sm:text-base flex items-center justify-between gap-4"
                                >
                                    <span>{faq.q}</span>
                                    {isOpen ? (
                                        <ChevronUp className="w-5 h-5 text-indigo-500 shrink-0" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                                    )}
                                </button>
                                {isOpen && (
                                    <div className="px-5 pb-5 text-slate-500 dark:text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3 font-medium">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* ─── 9. FINAL CALL TO ACTION ─── */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto my-12 text-center">
                <div className="relative rounded-3xl p-10 sm:p-16 text-white shadow-2xl overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                    <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
                    <h2 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight relative z-10">
                        Ready to Explore 100+ Free Tools?
                    </h2>
                    <p className="text-indigo-100 text-sm sm:text-lg max-w-xl mx-auto mb-8 font-medium relative z-10">
                        No credit card, no sign-up, no hidden restrictions. Start using our utilities instantly.
                    </p>
                    <Link
                        href="/tools"
                        className="inline-flex items-center gap-2.5 px-9 py-4.5 rounded-2xl bg-white text-slate-900 font-extrabold text-base shadow-[0_10px_35px_rgba(0,0,0,0.2)] hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 text-decoration-none relative z-10"
                    >
                        Explore All Tools Now <ArrowRight className="w-5 h-5 text-indigo-600" />
                    </Link>
                </div>
            </section>

            {/* ─── 10. BLOG SECTION & FOOTER CHILDREN ─── */}
            {children}
        </div>
    );
}
