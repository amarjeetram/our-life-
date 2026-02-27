"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate submission (replace with real API call / EmailJS / Formspree)
        await new Promise(r => setTimeout(r, 1200));
        setSent(true);
        setLoading(false);
    };

    const inputStyle = {
        width: "100%", padding: "12px 16px", borderRadius: "12px",
        border: "1.5px solid #e0e7ff", background: "#f8faff",
        fontSize: "15px", color: "#0f172a", outline: "none",
        transition: "border-color 0.2s", boxSizing: "border-box" as const,
        fontFamily: "inherit"
    };

    return (
        <main style={{ minHeight: "100vh", background: "#fafbff", fontFamily: "system-ui, sans-serif" }}>

            {/* Hero */}
            <div style={{
                background: "linear-gradient(160deg, #f8faff 0%, #ede9fe 60%, #faf5ff 100%)",
                padding: "80px 20px 60px", textAlign: "center", borderBottom: "1px solid #e8eaf0"
            }}>
                <span style={{ fontSize: "12px", fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6366f1" }}>
                    Get In Touch
                </span>
                <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", marginTop: "10px", marginBottom: "16px" }}>
                    Contact Us
                </h1>
                <p style={{ fontSize: "17px", color: "#64748b", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7 }}>
                    Have a question, bug report, or feature request? We&apos;d love to hear from you.
                </p>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10">

                {/* Info column */}
                <div>
                    <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", marginBottom: "24px" }}>Reach Us</h2>

                    {[
                        { icon: <Mail size={18} />, label: "Email", value: "hello@smarttoolswala.com" },
                        { icon: <MapPin size={18} />, label: "Location", value: "India 🇮🇳" },
                        { icon: <Clock size={18} />, label: "Response Time", value: "Within 24–48 hours" },
                    ].map(item => (
                        <div key={item.label} style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "22px" }}>
                            <div style={{
                                width: "42px", height: "42px", borderRadius: "12px", flexShrink: 0,
                                background: "linear-gradient(135deg, #ede9fe, #dbeafe)",
                                display: "flex", alignItems: "center", justifyContent: "center", color: "#6366f1"
                            }}>
                                {item.icon}
                            </div>
                            <div>
                                <p style={{ fontSize: "12px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>{item.label}</p>
                                <p style={{ fontSize: "15px", fontWeight: 600, color: "#1e293b" }}>{item.value}</p>
                            </div>
                        </div>
                    ))}

                    <div style={{ marginTop: "32px", padding: "18px", background: "#f0fdf4", borderRadius: "14px", border: "1px solid #bbf7d0" }}>
                        <p style={{ fontSize: "13px", fontWeight: 700, color: "#166534", marginBottom: "6px" }}>💡 Common issues?</p>
                        <p style={{ fontSize: "13px", color: "#15803d", lineHeight: 1.6 }}>
                            If your compressed image is still too large, try reducing quality further or use a JPEG format. Our FAQ section is coming soon!
                        </p>
                    </div>
                </div>

                {/* Form column */}
                <div style={{
                    background: "#fff", borderRadius: "24px",
                    border: "1px solid #f1f5f9",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                    overflow: "hidden"
                }}>
                    <div style={{ height: "4px", background: "linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)" }} />
                    <div style={{ padding: "32px" }}>
                        {sent ? (
                            <div style={{ textAlign: "center", padding: "40px 0" }}>
                                <div style={{
                                    width: "64px", height: "64px", borderRadius: "50%",
                                    background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    margin: "0 auto 18px", color: "#059669"
                                }}>
                                    <CheckCircle2 size={30} />
                                </div>
                                <h3 style={{ fontSize: "22px", fontWeight: 900, color: "#0f172a", marginBottom: "8px" }}>Message Sent! ✅</h3>
                                <p style={{ fontSize: "15px", color: "#64748b", marginBottom: "24px" }}>We&apos;ll get back to you within 24–48 hours.</p>
                                <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                                    style={{ padding: "12px 24px", borderRadius: "12px", background: "#f1f5f9", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "14px", color: "#374151" }}>
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label style={{ fontSize: "13px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>Name *</label>
                                        <input required style={inputStyle} placeholder="Your name"
                                            value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                                    </div>
                                    <div>
                                        <label style={{ fontSize: "13px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>Email *</label>
                                        <input required type="email" style={inputStyle} placeholder="you@email.com"
                                            value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                                    </div>
                                </div>
                                <div style={{ marginBottom: "14px" }}>
                                    <label style={{ fontSize: "13px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>Subject *</label>
                                    <input required style={inputStyle} placeholder="e.g. Bug report / Feature request"
                                        value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} />
                                </div>
                                <div style={{ marginBottom: "22px" }}>
                                    <label style={{ fontSize: "13px", fontWeight: 700, color: "#374151", display: "block", marginBottom: "6px" }}>Message *</label>
                                    <textarea required rows={5} style={{ ...inputStyle, resize: "vertical" as const, display: "block" }}
                                        placeholder="Tell us how we can help..."
                                        value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
                                </div>
                                <button type="submit" disabled={loading} style={{
                                    width: "100%", padding: "14px", borderRadius: "14px",
                                    background: loading ? "#e0e7ff" : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                    color: loading ? "#94a3b8" : "#fff", border: "none",
                                    fontWeight: 800, fontSize: "15px", cursor: loading ? "not-allowed" : "pointer",
                                    letterSpacing: "-0.01em", transition: "all 0.2s"
                                }}>
                                    {loading ? "Sending…" : "Send Message →"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <div style={{ textAlign: "center", paddingBottom: "48px" }}>
                <Link href="/" style={{ fontSize: "14px", fontWeight: 600, color: "#6366f1", textDecoration: "none" }}>← Back to Home</Link>
            </div>
        </main>
    );
}
