"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Mail, MapPin, Clock, CheckCircle2, Send, ArrowLeft, MessageSquare, Sparkles, Zap } from "lucide-react";
import toast from "react-hot-toast";
import type { Metadata } from "next";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setMousePos({
                    x: ((e.clientX - rect.left) / rect.width) * 100,
                    y: ((e.clientY - rect.top) / rect.height) * 100,
                });
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: JSON.stringify({
                    access_key: "2fcdb858-0568-4e1e-8554-2af8c4432adc",
                    name: form.name,
                    email: form.email,
                    subject: form.subject,
                    message: form.message
                })
            });

            const result = await response.json();
            if (result.success) {
                setSent(true);
                toast.success("Message sent successfully! ✅");
            } else {
                toast.error(result.message || "Failed to submit the form.");
            }
        } catch (error) {
            console.error("Web3Forms submission error:", error);
            toast.error("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const contactItems = [
        {
            icon: <Mail size={20} />,
            label: "Email Us",
            value: "hello@smarttoolswala.com",
            sub: "We reply within 24–48 hours",
            gradient: "from-indigo-500/20 to-violet-500/20",
            iconColor: "text-indigo-400",
            border: "border-indigo-500/20"
        },
        {
            icon: <MapPin size={20} />,
            label: "Location",
            value: "India 🇮🇳",
            sub: "Serving users worldwide",
            gradient: "from-violet-500/20 to-pink-500/20",
            iconColor: "text-violet-400",
            border: "border-violet-500/20"
        },
        {
            icon: <Clock size={20} />,
            label: "Response Time",
            value: "24 – 48 Hours",
            sub: "Monday to Saturday",
            gradient: "from-pink-500/20 to-rose-500/20",
            iconColor: "text-pink-400",
            border: "border-pink-500/20"
        },
    ];

    return (
        <>
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes float2 {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-15px) rotate(-5deg); }
                }
                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.4; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.1); }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .contact-card { animation: slide-up 0.6s ease-out both; }
                .contact-card:nth-child(1) { animation-delay: 0.1s; }
                .contact-card:nth-child(2) { animation-delay: 0.2s; }
                .contact-card:nth-child(3) { animation-delay: 0.3s; }
                .hero-animate { animation: slide-up 0.8s ease-out both; }
                .orb1 { animation: float 6s ease-in-out infinite; }
                .orb2 { animation: float2 8s ease-in-out infinite; }
                .orb3 { animation: pulse-glow 4s ease-in-out infinite; }
                .gradient-text {
                    background: linear-gradient(135deg, #a78bfa, #818cf8, #67e8f9, #34d399);
                    background-size: 300% 300%;
                    animation: gradient-shift 4s ease infinite;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .input-field {
                    width: 100%;
                    padding: 14px 18px;
                    border-radius: 14px;
                    border: 1.5px solid rgba(99,102,241,0.15);
                    background: rgba(15,23,42,0.6);
                    font-size: 15px;
                    color: #f1f5f9;
                    outline: none;
                    transition: all 0.3s ease;
                    box-sizing: border-box;
                    font-family: inherit;
                    backdrop-filter: blur(4px);
                }
                .input-field::placeholder { color: #64748b; }
                .input-field:focus {
                    border-color: rgba(99,102,241,0.6);
                    background: rgba(30,41,59,0.8);
                    box-shadow: 0 0 0 3px rgba(99,102,241,0.1), 0 4px 20px rgba(99,102,241,0.1);
                }
                .submit-btn {
                    width: 100%;
                    padding: 16px;
                    border-radius: 16px;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa);
                    background-size: 200% 200%;
                    color: #fff;
                    border: none;
                    font-weight: 800;
                    font-size: 16px;
                    cursor: pointer;
                    letter-spacing: -0.01em;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }
                .submit-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 40px rgba(99,102,241,0.5);
                    animation: gradient-shift 2s ease infinite;
                }
                .submit-btn:active:not(:disabled) { transform: translateY(0); }
                .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
                .submit-btn::after {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%;
                    width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
                    transition: left 0.5s ease;
                }
                .submit-btn:hover::after { left: 100%; }
                .info-card {
                    border-radius: 20px;
                    padding: 20px;
                    border: 1px solid;
                    transition: all 0.3s ease;
                    cursor: default;
                    position: relative;
                    overflow: hidden;
                }
                .info-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.02));
                    transition: opacity 0.3s;
                }
                .info-card:hover { transform: translateY(-4px); }
                .form-card {
                    background: rgba(15,23,42,0.7);
                    border: 1px solid rgba(99,102,241,0.2);
                    border-radius: 28px;
                    backdrop-filter: blur(20px);
                    overflow: hidden;
                    box-shadow: 0 25px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05) inset;
                }
                .success-icon {
                    animation: float 3s ease-in-out infinite;
                }
                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 16px;
                    border-radius: 100px;
                    background: rgba(99,102,241,0.1);
                    border: 1px solid rgba(99,102,241,0.3);
                    font-size: 12px;
                    font-weight: 700;
                    color: #a78bfa;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    backdrop-filter: blur(4px);
                    animation: slide-up 0.5s ease-out both;
                }
                .label-text {
                    font-size: 13px;
                    font-weight: 700;
                    color: #94a3b8;
                    display: block;
                    margin-bottom: 8px;
                    letter-spacing: 0.03em;
                    text-transform: uppercase;
                    font-size: 11px;
                }
                .tip-box {
                    background: rgba(16,185,129,0.08);
                    border: 1px solid rgba(16,185,129,0.2);
                    border-radius: 16px;
                    padding: 16px 18px;
                }
            `}</style>

            <main style={{ minHeight: "100vh", background: "transparent", fontFamily: "var(--font-inter, system-ui, sans-serif)" }}>

                {/* Hero Section */}
                <div ref={heroRef} style={{
                    position: "relative",
                    padding: "100px 20px 80px",
                    textAlign: "center",
                    overflow: "hidden",
                    background: "linear-gradient(180deg, rgba(99,102,241,0.05) 0%, transparent 100%)",
                    borderBottom: "1px solid rgba(99,102,241,0.1)"
                }}>
                    {/* Animated orbs */}
                    <div className="orb1" style={{
                        position: "absolute", top: "10%", left: "10%",
                        width: "300px", height: "300px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
                        pointerEvents: "none"
                    }} />
                    <div className="orb2" style={{
                        position: "absolute", top: "5%", right: "10%",
                        width: "250px", height: "250px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
                        pointerEvents: "none"
                    }} />
                    <div className="orb3" style={{
                        position: "absolute", bottom: "10%", left: "50%",
                        transform: "translateX(-50%)",
                        width: "400px", height: "200px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
                        pointerEvents: "none"
                    }} />

                    {/* Dynamic spotlight effect */}
                    <div style={{
                        position: "absolute", inset: 0,
                        background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(99,102,241,0.06) 0%, transparent 60%)`,
                        transition: "background 0.1s ease",
                        pointerEvents: "none"
                    }} />

                    <div style={{ position: "relative", zIndex: 1 }}>
                        <div className="badge hero-animate" style={{ marginBottom: "20px" }}>
                            <Sparkles size={12} />
                            Get In Touch
                        </div>

                        <h1 className="hero-animate" style={{
                            fontSize: "clamp(36px, 7vw, 72px)",
                            fontWeight: 900,
                            letterSpacing: "-0.04em",
                            lineHeight: 1.05,
                            marginBottom: "20px",
                            animationDelay: "0.1s"
                        }}>
                            <span style={{ color: "#f1f5f9" }}>We&apos;d Love to</span>
                            <br />
                            <span className="gradient-text">Hear From You</span>
                        </h1>

                        <p className="hero-animate" style={{
                            fontSize: "clamp(16px, 2vw, 18px)",
                            color: "#64748b",
                            maxWidth: "520px",
                            margin: "0 auto 40px",
                            lineHeight: 1.7,
                            animationDelay: "0.2s"
                        }}>
                            Have a question, bug report, or feature request? Drop us a message and our team will get back to you promptly.
                        </p>

                        {/* Stats row */}
                        <div className="hero-animate" style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "clamp(16px, 4vw, 40px)",
                            flexWrap: "wrap",
                            animationDelay: "0.3s"
                        }}>
                            {[
                                { num: "24h", label: "Avg. Reply Time" },
                                { num: "100%", label: "Response Rate" },
                                { num: "5★", label: "User Satisfaction" }
                            ].map(stat => (
                                <div key={stat.label} style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 900, color: "#a78bfa", letterSpacing: "-0.03em" }}>{stat.num}</div>
                                    <div style={{ fontSize: "12px", color: "#64748b", fontWeight: 600, marginTop: "2px" }}>{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 24px 80px" }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "clamp(24px, 4vw, 48px)",
                        alignItems: "start"
                    }}>

                        {/* Left Column */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                            <div style={{ marginBottom: "8px" }}>
                                <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#f1f5f9", marginBottom: "8px", letterSpacing: "-0.02em" }}>
                                    Contact Information
                                </h2>
                                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.6 }}>
                                    Multiple ways to reach our friendly support team.
                                </p>
                            </div>

                            {contactItems.map((item, i) => (
                                <div
                                    key={item.label}
                                    className={`info-card contact-card bg-gradient-to-br ${item.gradient} ${item.border}`}
                                    style={{ background: `linear-gradient(135deg, rgba(15,23,42,0.8), rgba(30,41,59,0.5))`, borderColor: item.border.replace("border-", "") }}
                                >
                                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                                        <div style={{
                                            width: "48px", height: "48px", borderRadius: "14px", flexShrink: 0,
                                            background: "rgba(99,102,241,0.1)",
                                            border: "1px solid rgba(99,102,241,0.2)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                        }} className={item.iconColor}>
                                            {item.icon}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
                                                {item.label}
                                            </p>
                                            <p style={{ fontSize: "16px", fontWeight: 700, color: "#f1f5f9", marginBottom: "2px" }}>
                                                {item.value}
                                            </p>
                                            <p style={{ fontSize: "12px", color: "#64748b" }}>{item.sub}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Tip box */}
                            <div className="tip-box contact-card" style={{ animationDelay: "0.4s" }}>
                                <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                                    <div style={{ fontSize: "20px", marginTop: "1px" }}>💡</div>
                                    <div>
                                        <p style={{ fontSize: "13px", fontWeight: 800, color: "#34d399", marginBottom: "6px" }}>Quick Tip</p>
                                        <p style={{ fontSize: "13px", color: "#6ee7b7", lineHeight: 1.6 }}>
                                            For faster support, mention the specific tool name and include screenshots if possible. Our team is here to help!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Social links */}
                            <div className="contact-card" style={{ animationDelay: "0.5s" }}>
                                <p style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
                                    Also reach us on
                                </p>
                                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                                    {[
                                        { label: "Twitter / X", emoji: "🐦", color: "rgba(29,161,242,0.1)", border: "rgba(29,161,242,0.2)", text: "#38bdf8" },
                                        { label: "Instagram", emoji: "📸", color: "rgba(225,48,108,0.1)", border: "rgba(225,48,108,0.2)", text: "#f472b6" },
                                        { label: "Email", emoji: "✉️", color: "rgba(99,102,241,0.1)", border: "rgba(99,102,241,0.2)", text: "#a78bfa" },
                                    ].map(s => (
                                        <span key={s.label} style={{
                                            display: "inline-flex", alignItems: "center", gap: "6px",
                                            padding: "8px 14px", borderRadius: "10px",
                                            background: s.color, border: `1px solid ${s.border}`,
                                            fontSize: "13px", fontWeight: 600, color: s.text,
                                            cursor: "pointer", transition: "all 0.2s"
                                        }}>
                                            {s.emoji} {s.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Form */}
                        <div className="form-card" style={{ animationDelay: "0.2s" }}>
                            {/* Top gradient bar */}
                            <div style={{
                                height: "3px",
                                background: "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899, #f43f5e)",
                                backgroundSize: "200% 100%",
                                animation: "gradient-shift 3s ease infinite"
                            }} />

                            <div style={{ padding: "36px" }}>
                                {sent ? (
                                    <div style={{ textAlign: "center", padding: "48px 0" }}>
                                        <div className="success-icon" style={{
                                            width: "80px", height: "80px", borderRadius: "50%",
                                            background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(52,211,153,0.1))",
                                            border: "2px solid rgba(16,185,129,0.3)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            margin: "0 auto 24px",
                                            fontSize: "40px"
                                        }}>
                                            ✅
                                        </div>
                                        <h3 style={{ fontSize: "26px", fontWeight: 900, color: "#f1f5f9", marginBottom: "10px", letterSpacing: "-0.02em" }}>
                                            Message Sent!
                                        </h3>
                                        <p style={{ fontSize: "15px", color: "#64748b", marginBottom: "8px", lineHeight: 1.6 }}>
                                            We&apos;ve received your message and will get back to you within 24–48 hours.
                                        </p>
                                        <p style={{ fontSize: "14px", color: "#475569", marginBottom: "32px" }}>
                                            Check your email for a confirmation.
                                        </p>
                                        <button
                                            onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                                            style={{
                                                padding: "12px 28px", borderRadius: "14px",
                                                background: "rgba(99,102,241,0.1)",
                                                border: "1px solid rgba(99,102,241,0.3)",
                                                cursor: "pointer", fontWeight: 700, fontSize: "14px",
                                                color: "#a78bfa", transition: "all 0.2s"
                                            }}
                                        >
                                            ← Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div style={{ marginBottom: "28px" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                                                <MessageSquare size={20} style={{ color: "#6366f1" }} />
                                                <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#f1f5f9", letterSpacing: "-0.02em" }}>
                                                    Send us a Message
                                                </h2>
                                            </div>
                                            <p style={{ fontSize: "13px", color: "#64748b", paddingLeft: "30px" }}>
                                                Fill out the form below and we&apos;ll respond ASAP.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                                                <div>
                                                    <label className="label-text">Name *</label>
                                                    <input
                                                        required
                                                        className="input-field"
                                                        placeholder="Your name"
                                                        value={form.name}
                                                        onFocus={() => setFocused("name")}
                                                        onBlur={() => setFocused(null)}
                                                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="label-text">Email *</label>
                                                    <input
                                                        required
                                                        type="email"
                                                        className="input-field"
                                                        placeholder="you@email.com"
                                                        value={form.email}
                                                        onFocus={() => setFocused("email")}
                                                        onBlur={() => setFocused(null)}
                                                        onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="label-text">Subject *</label>
                                                <input
                                                    required
                                                    className="input-field"
                                                    placeholder="e.g. Bug report / Feature request / General inquiry"
                                                    value={form.subject}
                                                    onFocus={() => setFocused("subject")}
                                                    onBlur={() => setFocused(null)}
                                                    onChange={e => setForm(p => ({ ...p, subject: e.target.value }))}
                                                />
                                            </div>

                                            {/* Category chips */}
                                            <div>
                                                <label className="label-text" style={{ marginBottom: "8px" }}>Quick Select Topic</label>
                                                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                                                    {["🐛 Bug Report", "💡 Feature Request", "❓ General Query", "💼 Partnership", "🙏 Feedback"].map(chip => (
                                                        <button
                                                            key={chip}
                                                            type="button"
                                                            onClick={() => setForm(p => ({ ...p, subject: chip.slice(3) }))}
                                                            style={{
                                                                padding: "6px 12px", borderRadius: "8px",
                                                                border: form.subject === chip.slice(3)
                                                                    ? "1px solid rgba(99,102,241,0.6)"
                                                                    : "1px solid rgba(99,102,241,0.15)",
                                                                background: form.subject === chip.slice(3)
                                                                    ? "rgba(99,102,241,0.15)"
                                                                    : "rgba(15,23,42,0.4)",
                                                                color: form.subject === chip.slice(3) ? "#a78bfa" : "#64748b",
                                                                fontSize: "12px", fontWeight: 600, cursor: "pointer",
                                                                transition: "all 0.2s"
                                                            }}
                                                        >
                                                            {chip}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <label className="label-text">Message *</label>
                                                <textarea
                                                    required
                                                    rows={5}
                                                    className="input-field"
                                                    style={{ resize: "vertical", display: "block" }}
                                                    placeholder="Tell us how we can help you..."
                                                    value={form.message}
                                                    onFocus={() => setFocused("message")}
                                                    onBlur={() => setFocused(null)}
                                                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                                                />
                                            </div>

                                            <button type="submit" disabled={loading} className="submit-btn">
                                                {loading ? (
                                                    <>
                                                        <div style={{
                                                            width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)",
                                                            borderTopColor: "#fff", borderRadius: "50%",
                                                            animation: "spin 0.8s linear infinite"
                                                        }} />
                                                        Sending…
                                                    </>
                                                ) : (
                                                    <>
                                                        <Send size={18} />
                                                        Send Message
                                                    </>
                                                )}
                                            </button>

                                            <p style={{ fontSize: "12px", color: "#475569", textAlign: "center" }}>
                                                🔒 Your information is safe with us. We never share your data.
                                            </p>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div style={{
                    borderTop: "1px solid rgba(99,102,241,0.1)",
                    padding: "48px 24px",
                    textAlign: "center",
                    background: "linear-gradient(0deg, rgba(99,102,241,0.03) 0%, transparent 100%)"
                }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        marginBottom: "16px", color: "#6366f1"
                    }}>
                        <Zap size={16} fill="currentColor" />
                        <span style={{ fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                            Powered by SmartToolsWala
                        </span>
                    </div>
                    <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "20px" }}>
                        Explore our suite of free tools while you wait for our response.
                    </p>
                    <Link href="/" style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        padding: "12px 24px", borderRadius: "14px",
                        background: "rgba(99,102,241,0.1)",
                        border: "1px solid rgba(99,102,241,0.25)",
                        color: "#a78bfa", fontWeight: 700, fontSize: "14px",
                        textDecoration: "none", transition: "all 0.2s"
                    }}>
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                </div>
            </main>

            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </>
    );
}
