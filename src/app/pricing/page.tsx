import type { Metadata } from "next";
import Link from "next/link";
import { Check, Zap, Sparkles, Code, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing Plans - SmartToolsWala",
  description: "Check out SmartToolsWala plans. All our web tools are 100% free. Support us or check out our upcoming Developer API and Pro options.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-secondary)", paddingTop: "120px", paddingBottom: "80px", overflow: "hidden", position: "relative" }}>
      
      {/* Background Grid & Orbs for Glassmorphism visual impact */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "repeating-linear-gradient(0deg, #6366f1 0px, #6366f1 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, #6366f1 0px, #6366f1 1px, transparent 1px, transparent 40px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "-100px", left: "20%", width: "600px", height: "600px", background: "radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "100px", right: "20%", width: "500px", height: "500px", background: "radial-gradient(ellipse, rgba(99,102,241,0.1) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 20px", position: "relative", zIndex: 10 }}>
        
        {/* Header Title */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase", color: "#f97316", display: "block", marginBottom: "12px" }}>
            Plans &amp; Pricing
          </span>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "20px" }}>
            Simple, Transparent <span className="text-gradient">Plans</span>
          </h1>
          <p style={{ fontSize: "clamp(15px, 2vw, 18px)", color: "var(--text-secondary)", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
            Access all standard digital tools completely free. Support our development or check out our developer access options below.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: "28px", alignItems: "stretch", marginBottom: "64px" }}>
          
          {/* Card 1: Free Plan (Glassmorphism) */}
          <div style={{ 
            borderRadius: "24px", 
            padding: "36px 32px",
            display: "flex",
            flexDirection: "column",
            position: "relative"
          }} className="glass-card group hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-300">
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--text-tertiary)", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
                Free Forever
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "10px" }}>
                <span style={{ fontSize: "48px", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>$0</span>
                <span style={{ fontSize: "14px", color: "var(--text-tertiary)", fontWeight: 600 }}>/ month</span>
              </div>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Perfect for quick image compression, gpa calculations, and daily text utilities.
              </p>
            </div>
            
            <hr style={{ border: 0, borderTop: "1px solid var(--border-light)", margin: "0 0 28px" }} />
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px", flexGrow: 1 }}>
              {[
                "Unlimited free conversions",
                "100% secure local browser processing",
                "Access to all 50+ standard utility tools",
                "Standard file limits (up to 20 MB)",
                "Zero watermarks & no registration required",
              ].map((feature, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "start" }}>
                  <div style={{ color: "#10b981", flexShrink: 0, marginTop: "2px" }}><Check size={16} strokeWidth={3} /></div>
                  <span style={{ fontSize: "14px", color: "var(--text-secondary)", fontWeight: 550 }}>{feature}</span>
                </div>
              ))}
            </div>

            <Link 
              prefetch={false}
              href="/#tools"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                background: "var(--bg-tertiary)", color: "var(--text-primary)",
                fontWeight: 800, fontSize: "15px", padding: "14px 24px", borderRadius: "14px",
                textDecoration: "none"
              }}
              className="hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              Get Started Free <ArrowRight size={16} />
            </Link>
          </div>

          {/* Card 2: Pro Plan (Featured Glassmorphism) */}
          <div style={{ 
            borderRadius: "24px", 
            padding: "36px 32px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            border: "2px solid #f97316"
          }} className="glass-card group transition-all duration-300">
            {/* Featured Badge */}
            <div style={{
              position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
              background: "linear-gradient(135deg, #f97316, #f59e0b)", color: "white",
              fontWeight: 800, fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "4px 16px", borderRadius: "100px", boxShadow: "0 4px 10px rgba(249,115,22,0.25)"
            }}>
              Most Popular
            </div>

            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "#f97316", fontWeight: 800, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
                <Sparkles size={14} /> Pro Creator <span style={{ fontSize: "10px", background: "rgba(249,115,22,0.1)", color: "#f97316", padding: "2px 6px", borderRadius: "6px", marginLeft: "6px" }}>Beta</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "10px" }}>
                <span style={{ fontSize: "48px", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>$9</span>
                <span style={{ fontSize: "14px", color: "var(--text-tertiary)", fontWeight: 600 }}>/ month</span>
              </div>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                For power creators, developers, and professionals needing higher batch execution speeds.
              </p>
            </div>
            
            <hr style={{ border: 0, borderTop: "1px solid var(--border-light)", margin: "0 0 28px" }} />
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px", flexGrow: 1 }}>
              {[
                "Batch processing (up to 50 files concurrently)",
                "Support for massive files (up to 100 MB)",
                "Early access to premium AI text & SEO tools",
                "High-priority server-side conversion speeds",
                "Ad-free premium platform experience",
                "Dedicated email & chat support",
              ].map((feature, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "start" }}>
                  <div style={{ color: "#f97316", flexShrink: 0, marginTop: "2px" }}><Zap size={16} /></div>
                  <span style={{ fontSize: "14px", color: "var(--text-secondary)", fontWeight: 550 }}>{feature}</span>
                </div>
              ))}
            </div>

            <Link 
              prefetch={false}
              href="/contact-us?subject=Pro%20Beta%20Access"
              className="pricing-btn-primary"
            >
              Join Pro Beta <ArrowRight size={16} />
            </Link>
          </div>

          {/* Card 3: Developer API (Glassmorphism) */}
          <div style={{ 
            borderRadius: "24px", 
            padding: "36px 32px",
            display: "flex",
            flexDirection: "column",
            position: "relative"
          }} className="glass-card group hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-all duration-300">
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--text-tertiary)", fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "12px" }}>
                <Code size={14} /> Developer API
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "10px" }}>
                <span style={{ fontSize: "48px", fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Custom</span>
              </div>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Integrate our industrial-grade image & format engines directly into your applications.
              </p>
            </div>
            
            <hr style={{ border: 0, borderTop: "1px solid var(--border-light)", margin: "0 0 28px" }} />
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px", flexGrow: 1 }}>
              {[
                "Direct API access to image optimization endpoints",
                "High-performance REST API integration templates",
                "Ultra-fast processing powered by CDN caches",
                "99.9% uptime service level agreement",
                "Custom developer setup & documentation",
              ].map((feature, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", alignItems: "start" }}>
                  <div style={{ color: "#6366f1", flexShrink: 0, marginTop: "2px" }}><Check size={16} strokeWidth={3} /></div>
                  <span style={{ fontSize: "14px", color: "var(--text-secondary)", fontWeight: 550 }}>{feature}</span>
                </div>
              ))}
            </div>

            <Link 
              prefetch={false}
              href="/contact-us?subject=API%20Integration"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                background: "var(--bg-tertiary)", color: "var(--text-primary)",
                fontWeight: 800, fontSize: "15px", padding: "14px 24px", borderRadius: "14px",
                textDecoration: "none"
              }}
              className="hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              Contact Support <ArrowRight size={16} />
            </Link>
          </div>

        </div>

        {/* Bottom Guarantee Banner (Glassmorphism) */}
        <div style={{ 
          borderRadius: "24px", 
          padding: "24px 32px",
          textAlign: "center"
        }} className="glass-card">
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: 0 }}>
            🚀 <strong>No risk:</strong> All standard web tools remain <strong>100% free forever</strong>. No signup, credit card, or registration required.
          </p>
        </div>

      </div>
    </div>
  );
}
