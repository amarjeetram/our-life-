"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    Zap, ArrowRight, ShieldCheck, Lock, CheckCircle2,
    Star, Clock, ChevronRight, ImageIcon
} from "lucide-react";
import HeroUploadZone from "./HeroUploadZone";



const stats = [
    { value: "50K+", label: "Images Compressed", icon: <ImageIcon className="w-5 h-5" /> },
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

export default function HomeClient({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ minHeight: "100vh", background: "#fafbff", overflow: "hidden" }}>

            {/* ─── HERO ─── */}
            <section style={{ position: "relative", paddingTop: "120px", paddingBottom: "80px", textAlign: "center", overflow: "hidden" }}>

                {/* Gradient orb backgrounds */}
                <div style={{ position: "absolute", top: "-120px", left: "50%", transform: "translateX(-60%)", width: "700px", height: "500px", background: "radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: "60px", right: "-80px", width: "400px", height: "400px", background: "radial-gradient(ellipse, rgba(236,72,153,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: "0", left: "-60px", width: "350px", height: "350px", background: "radial-gradient(ellipse, rgba(14,165,233,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

                <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 10 }}>

                    {/* Badge */}
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                        <span style={{
                            display: "inline-flex", alignItems: "center", gap: "8px",
                            background: "rgba(255,255,255,0.85)", backdropFilter: "blur(12px)",
                            border: "1px solid rgba(99,102,241,0.2)", borderRadius: "100px",
                            padding: "7px 18px", fontSize: "13px", fontWeight: 700,
                            color: "#4338ca", marginBottom: "28px",
                            boxShadow: "0 2px 16px rgba(99,102,241,0.12)"
                        }}>
                            <span style={{ position: "relative", display: "flex", width: "8px", height: "8px" }}>
                                <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#6366f1", opacity: 0.75, animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }} />
                                <span style={{ position: "relative", borderRadius: "50%", background: "#6366f1", width: "8px", height: "8px", display: "block" }} />
                            </span>
                            #1 Free Image Compression Tool in India
                        </span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        style={{ fontSize: "clamp(38px, 7vw, 72px)", fontWeight: 900, color: "#0f172a", lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: "20px" }}
                    >
                        Compress Images to
                        <br />
                        <span style={{ background: "linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            Any Size, Instantly
                        </span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={{ fontSize: "clamp(15px, 2.5vw, 19px)", color: "#64748b", maxWidth: "600px", margin: "0 auto 36px", lineHeight: 1.7 }}
                    >
                        Compress image to 20KB, 50KB, 100KB or any target size online. Free image size reducer perfect for UPSC, SSC, banking forms, and web optimization. <strong style={{ color: "#0f172a" }}>No signup required.</strong>
                    </motion.p>

                    {/* ── Hero Upload Zone ── */}
                    <HeroUploadZone />

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "44px" }}
                    >
                        <Link href="/#tools" style={{
                            display: "inline-flex", alignItems: "center", gap: "9px",
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                            color: "#fff", fontWeight: 800, fontSize: "16px",
                            padding: "15px 32px", borderRadius: "16px",
                            boxShadow: "0 4px 20px rgba(99,102,241,0.42), 0 1px 3px rgba(0,0,0,0.1)",
                            textDecoration: "none", letterSpacing: "-0.01em",
                            transition: "transform 0.15s, box-shadow 0.15s"
                        }}>
                            <ImageIcon size={18} /> Explore All Tools <ArrowRight size={17} />
                        </Link>
                    </motion.div>

                    {/* Social proof pills */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.25 }}
                        style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}
                    >
                        {[
                            { icon: <CheckCircle2 size={13} />, label: "UPSC / SSC Portals" },
                            { icon: <CheckCircle2 size={13} />, label: "Bank Applications" },
                            { icon: <CheckCircle2 size={13} />, label: "College Admissions" },
                            { icon: <CheckCircle2 size={13} />, label: "Web Developers" },
                        ].map((p) => (
                            <span key={p.label} style={{
                                display: "inline-flex", alignItems: "center", gap: "5px",
                                background: "rgba(255,255,255,0.8)", border: "1px solid #e2e8f0",
                                borderRadius: "100px", padding: "5px 12px",
                                fontSize: "12px", fontWeight: 600, color: "#475569",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                            }}>
                                <span style={{ color: "#10b981" }}>{p.icon}</span> {p.label}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── STATS STRIP ─── */}
            <section style={{ background: "#0f172a", padding: "48px 20px", position: "relative", overflow: "hidden" }}>
                {/* Grid pattern overlay */}
                <div style={{
                    position: "absolute", inset: 0, opacity: 0.04,
                    backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #fff 0px, #fff 1px, transparent 1px, transparent 40px)",
                }} />
                <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))", gap: "32px", position: "relative", zIndex: 1 }}>
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            style={{ textAlign: "center" }}
                        >
                            <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px", color: "#818cf8" }}>
                                {s.icon}
                            </div>
                            <p style={{ fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 900, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "6px" }}>
                                {s.value}
                            </p>
                            <p style={{ fontSize: "13px", color: "#64748b", fontWeight: 600 }}>{s.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── FEATURED TOOL ─── */}
            <section id="tools" style={{ padding: "80px 20px", background: "#fafbff" }}>
                <div style={{ maxWidth: "820px", margin: "0 auto" }}>

                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6366f1", marginBottom: "12px" }}>
                            Image Tools
                        </span>
                        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                            Photo & Image Compression
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "24px", marginBottom: "72px" }}>
                        {[
                            {
                                route: '/compress-image-to-20kb', title: 'Compress to 20KB',
                                desc: 'Perfect for UPSC, SSC & govt portals. Guaranteed under 20KB.',
                                tags: ['UPSC / IAS', 'SSC', 'Forms']
                            },
                            {
                                route: '/compress-image-to-50kb', title: 'Compress to 50KB',
                                desc: 'Ideal for Bank exams, admit cards, and diverse state portals.',
                                tags: ['Bank Forms', 'Admit Cards']
                            },
                            {
                                route: '/compress-image-to-100kb', title: 'Compress to 100KB',
                                desc: 'Standard compression for high-quality professional document uploads.',
                                tags: ['General', 'High Quality']
                            },
                            {
                                route: '/mb-to-kb-converter', title: 'MB to KB Converter',
                                desc: 'Shrink massive megabyte photos down to optimized kilobytes instantly.',
                                tags: ['Universal', 'Smart Convert']
                            },
                            {
                                route: '/compress-image-to-30kb', title: 'Compress to 30KB',
                                desc: 'Strictly under 30KB for specific government compliance formats.',
                                tags: ['Compliance', 'State Exams']
                            },
                            {
                                route: '/compress-image-to-200kb', title: 'Compress to 200KB',
                                desc: 'Heavy files to 200KB for portals requiring larger HD formats.',
                                tags: ['HD Docs', 'Websites']
                            },
                            {
                                route: '/tnpsc-photo-compressor', title: 'TNPSC Photo Compressor',
                                desc: 'Compress TNPSC photo to 20-50KB and signature to 10-20KB as per official TNPSC requirements.',
                                tags: ['TNPSC', 'Tamil Nadu', 'Govt Exam']
                            }
                        ].map((tool, index) => (
                            <motion.div
                                key={tool.route}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link href={tool.route} style={{
                                    display: "flex", flexDirection: "column", height: "100%",
                                    background: "#ffffff", borderRadius: "24px",
                                    border: "1px solid #f1f5f9",
                                    boxShadow: "0 4px 24px rgba(99,102,241,0.06), 0 1px 3px rgba(0,0,0,0.02)",
                                    overflow: "hidden", textDecoration: "none",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(99,102,241,0.12), 0 2px 8px rgba(0,0,0,0.04)";
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(99,102,241,0.06), 0 1px 3px rgba(0,0,0,0.02)";
                                    }}
                                >
                                    {/* Rainbow top bar */}
                                    <div style={{ height: "4px", background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #ec4899)" }} />

                                    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "4px" }}>
                                            <div style={{
                                                width: "52px", height: "52px", borderRadius: "16px",
                                                background: "linear-gradient(135deg, #ede9fe, #dbeafe)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color: "#6366f1", flexShrink: 0,
                                                boxShadow: "0 2px 10px rgba(99,102,241,0.15)"
                                            }}>
                                                <Zap size={22} />
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
                                                    background: "#f8faff", border: "1px solid #e0e7ff",
                                                    fontSize: "11px", fontWeight: 700, color: "#4338ca"
                                                }}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{
                                        background: "#fafbff", borderTop: "1px solid #f1f5f9",
                                        padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
                                        color: "#6366f1", fontWeight: 800, fontSize: "14px"
                                    }}>
                                        <span>Use Tool Free</span>
                                        <ArrowRight size={16} />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* YOUTUBE TOOLS SECTION */}
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#ef4444", marginBottom: "12px" }}>
                            YouTube Tools
                        </span>
                        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                            Boost Video Growth
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "24px", marginBottom: "72px" }}>
                        {[
                            {
                                route: '/youtube-tag-extractor', title: 'YouTube Tag Extractor',
                                desc: 'Extract SEO-optimized tags from any YouTube video to boost your content visibility.',
                                tags: ['SEO', 'YouTube', 'Marketing']
                            },
                            {
                                route: '/youtube-description-extractor', title: 'YouTube Description Extractor',
                                desc: 'Instantly extract titles, views, likes, comments, and full descriptions from any YouTube URL.',
                                tags: ['Data', 'YouTube', 'Research']
                            },
                            {
                                route: '/youtube-title-extractor', title: 'YouTube Title Extractor',
                                desc: 'Easily view and copy the exact title from any YouTube video for your own research.',
                                tags: ['Title', 'YouTube', 'Copy']
                            }
                        ].map((tool, index) => (
                            <motion.div
                                key={tool.route}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link href={tool.route} style={{
                                    display: "flex", flexDirection: "column", height: "100%",
                                    background: "#ffffff", borderRadius: "24px",
                                    border: "1px solid #f1f5f9",
                                    boxShadow: "0 4px 24px rgba(239,68,68,0.06), 0 1px 3px rgba(0,0,0,0.02)",
                                    overflow: "hidden", textDecoration: "none",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(239,68,68,0.12), 0 2px 8px rgba(0,0,0,0.04)";
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(239,68,68,0.06), 0 1px 3px rgba(0,0,0,0.02)";
                                    }}
                                >
                                    <div style={{ height: "4px", background: "linear-gradient(90deg, #ef4444, #dc2626)" }} />

                                    <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "16px", flexGrow: 1 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "4px" }}>
                                            <div style={{
                                                width: "52px", height: "52px", borderRadius: "16px",
                                                background: "linear-gradient(135deg, #fee2e2, #fecaca)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color: "#ef4444", flexShrink: 0,
                                                boxShadow: "0 2px 10px rgba(239,68,68,0.15)"
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="mr-0"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>

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
                                                    background: "#fef2f2", border: "1px solid #fee2e2",
                                                    fontSize: "11px", fontWeight: 700, color: "#b91c1c"
                                                }}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={{
                                        background: "#fafbff", borderTop: "1px solid #f1f5f9",
                                        padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
                                        color: "#ef4444", fontWeight: 800, fontSize: "14px"
                                    }}>
                                        <span>Use Tool Free</span>
                                        <ArrowRight size={16} />
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* OTHER TOOLS SECTION */}
                    <div style={{ textAlign: "center", marginBottom: "40px" }}>
                        <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#8b5cf6", marginBottom: "12px" }}>
                            Other Tools
                        </span>
                        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
                            Social & Utilities
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: "24px", marginBottom: "72px" }}>
                        {[
                            {
                                route: '/stylish-couple-name-maker', title: 'Couple Name Maker',
                                desc: 'Combine two names into a stylish, emoji-filled romantic combo for Instagram & hashtags.',
                                tags: ['New Utility', 'Social']
                            }
                        ].map((tool, index) => (
                            <motion.div
                                key={tool.route}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Link href={tool.route} style={{
                                    display: "flex", flexDirection: "column", height: "100%",
                                    background: "#ffffff", borderRadius: "24px",
                                    border: "1px solid #f1f5f9",
                                    boxShadow: "0 4px 24px rgba(139,92,246,0.06), 0 1px 3px rgba(0,0,0,0.02)",
                                    overflow: "hidden", textDecoration: "none",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(139,92,246,0.12), 0 2px 8px rgba(0,0,0,0.04)";
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                                        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(139,92,246,0.06), 0 1px 3px rgba(0,0,0,0.02)";
                                    }}
                                >
                                    {/* Rainbow top bar */}
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
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
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
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── HOW IT WORKS ─── */}
            <section style={{ padding: "72px 20px", background: "#f8faff", borderTop: "1px solid #f1f5f9" }}>
                <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                    <div style={{ textAlign: "center", marginBottom: "48px" }}>
                        <span style={{ display: "block", fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6366f1", marginBottom: "12px" }}>
                            Simple as 1-2-3
                        </span>
                        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em" }}>
                            How It Works
                        </h2>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: "24px" }}>
                        {steps.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{
                                    background: "#fff", borderRadius: "24px",
                                    padding: "28px 24px", border: "1px solid #e8eaf0",
                                    boxShadow: "0 2px 16px rgba(0,0,0,0.03)"
                                }}
                            >
                                <div style={{
                                    width: "48px", height: "48px", borderRadius: "16px",
                                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    marginBottom: "18px",
                                    boxShadow: "0 6px 16px rgba(99,102,241,0.3)",
                                    fontSize: "16px", fontWeight: 900, color: "#fff", letterSpacing: "-0.02em"
                                }}>
                                    {s.n}
                                </div>
                                <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>{s.title}</h3>
                                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.65 }}>{s.desc}</p>
                            </motion.div>
                        ))}
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
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                style={{
                                    background: "rgba(255,255,255,0.04)", backdropFilter: "blur(8px)",
                                    borderRadius: "24px", padding: "32px 28px",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    transition: "background 0.2s, transform 0.2s",
                                }}
                                whileHover={{ y: -4, backgroundColor: "rgba(255,255,255,0.07)" }}
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
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom CTA inside dark section */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: "center", marginTop: "56px" }}
                    >
                        <Link href="/compress-image-to-20kb" style={{
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
                    </motion.div>
                </div>
            </section>

            {/* ─── BLOG (children) ─── */}
            <section style={{ background: "#fafbff" }}>
                {children}
            </section>

        </div>
    );
}
