"use client";

import Link from "next/link";
import { Home, Zap, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(160deg, #f8faff 0%, #f1f5ff 60%, #faf5ff 100%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            textAlign: "center", padding: "24px",
            fontFamily: "system-ui, sans-serif"
        }}>
            {/* Gradient orbs */}
            <div style={{ position: "fixed", top: "-100px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(99,102,241,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "fixed", bottom: "0", right: "-60px", width: "350px", height: "350px", background: "radial-gradient(ellipse, rgba(236,72,153,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

            <div style={{ position: "relative", zIndex: 1, maxWidth: "480px" }}>
                {/* Big 404 */}
                <div style={{
                    fontSize: "clamp(90px, 20vw, 150px)", fontWeight: 900,
                    lineHeight: 1, letterSpacing: "-0.06em", marginBottom: "8px",
                    background: "linear-gradient(135deg, #6366f1, #a855f7, #ec4899)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    userSelect: "none"
                }}>
                    404
                </div>

                {/* Card */}
                <div style={{
                    background: "#ffffff",
                    borderRadius: "28px",
                    border: "1px solid #e8eaf0",
                    boxShadow: "0 8px 40px rgba(99,102,241,0.1), 0 2px 8px rgba(0,0,0,0.04)",
                    overflow: "hidden",
                    marginBottom: "24px"
                }}>
                    <div style={{ height: "4px", background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #ec4899)" }} />
                    <div style={{ padding: "32px 36px 36px" }}>
                        <h1 style={{
                            fontSize: "22px", fontWeight: 900,
                            color: "#0f172a", marginBottom: "10px", letterSpacing: "-0.02em"
                        }}>
                            Page Not Found
                        </h1>
                        <p style={{
                            fontSize: "15px", color: "#64748b", lineHeight: 1.7, marginBottom: "28px"
                        }}>
                            This page does not exist. The URL might be incorrect, or the page has been removed.
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <button 
                                onClick={() => window.history.back()}
                                style={{
                                    display: "flex", alignItems: "center", justifyContent: "center", gap: "9px",
                                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                    color: "#fff", fontWeight: 800, fontSize: "15px",
                                    padding: "14px 24px", borderRadius: "14px",
                                    boxShadow: "0 4px 16px rgba(99,102,241,0.38)",
                                    border: "none", cursor: "pointer",
                                    fontFamily: "inherit"
                                }}
                            >
                                <ArrowLeft size={17} /> Previous Page
                            </button>
                            <Link href="/" style={{
                                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                                background: "#f8faff", color: "#4338ca",
                                fontWeight: 700, fontSize: "14px",
                                padding: "13px 24px", borderRadius: "14px",
                                border: "1.5px solid #e0e7ff",
                                textDecoration: "none"
                            }}>
                                <Home size={16} /> Go to Homepage
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
