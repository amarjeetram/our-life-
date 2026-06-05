import React from "react";
import type { Metadata } from "next";
import GeminiPromptGeneratorClient from "@/components/GeminiPromptGeneratorClient";
import SEOBottomSection from "@/components/SEOBottomSection";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Gemini Prompt Generator | Ultimate AI Prompt Creator",
    description: "Generate highly optimized prompts for Google Gemini and other AI models. Define the persona, task, and tone to get the most accurate AI responses instantly.",
    alternates: {
        canonical: "https://smarttoolswala.com/ai-prompts/gemini-prompt-generator",
    },
};

export default function GeminiPromptGeneratorPage() {
    return (
        <main style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "sans-serif", overflow: "hidden", position: "relative" }}>
            {/* Background Glows */}
            <div style={{ position: "absolute", top: "-10%", left: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, rgba(15,23,42,0) 70%)", filter: "blur(60px)", zIndex: 0, pointerEvents: "none" }}></div>
            <div style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "50%", height: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(15,23,42,0) 70%)", filter: "blur(60px)", zIndex: 0, pointerEvents: "none" }}></div>

            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px 60px", position: "relative", zIndex: 1 }}>
                
                {/* Back Button */}
                <Link 
                    href="/ai-prompts" 
                    className="text-slate-400 hover:text-slate-50 transition-colors inline-flex items-center gap-[6px] text-sm font-semibold mb-8 no-underline"
                >
                    <ArrowLeft size={16} /> Back to AI Prompts
                </Link>

                <GeminiPromptGeneratorClient />
                
                {/* SEO Text Area */}
                <div style={{ marginTop: "60px", borderRadius: "24px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <SEOBottomSection 
                        keyword="gemini prompt generator"
                        heading="Why Use the Gemini Prompt Generator?"
                        faqs={[]}
                    >
                        <p style={{ color: "#cbd5e1", marginBottom: "1rem", lineHeight: 1.7 }}>
                            Getting the best out of AI models like Google Gemini requires precise, well-structured prompts. Often, vague prompts lead to generic or incorrect outputs. Our <strong>Gemini Prompt Generator</strong> acts as your AI assistant, structuring your thoughts into a proven format that AI models understand perfectly.
                        </p>
                        <h3 style={{ color: "#f8fafc", fontSize: "1.25rem", margin: "1.5rem 0 1rem" }}>Key Features of Our Prompt Creator</h3>
                        <ul style={{ color: "#cbd5e1", marginBottom: "1rem", lineHeight: 1.7, paddingLeft: "1.5rem", listStyleType: "disc" }}>
                            <li><strong>Role Assignment:</strong> Tell the AI exactly who to act as (e.g., Marketing Expert or Software Engineer) to set the right baseline knowledge.</li>
                            <li><strong>Tone Control:</strong> Ensure the generated text matches your brand voice, whether it's casual, professional, or academic.</li>
                            <li><strong>Structured Output:</strong> Demand specific formats like Markdown, Tables, or Bullet Points for easy copy-pasting.</li>
                            <li><strong>Instant Copy & Launch:</strong> Copy your prompt in one click and open Gemini directly from our interface.</li>
                        </ul>
                        <h3 style={{ color: "#f8fafc", fontSize: "1.25rem", margin: "1.5rem 0 1rem" }}>How to write better AI prompts?</h3>
                        <p style={{ color: "#cbd5e1", marginBottom: "1rem", lineHeight: 1.7 }}>
                            A good prompt always consists of three elements: Context, Task, and Format. Our tool forces you to think about these three pillars, resulting in highly detailed prompts that eliminate AI guesswork. Stop wasting time regenerating responses and start crafting the perfect prompt the first time.
                        </p>
                    </SEOBottomSection>
                </div>
            </div>
        </main>
    );
}
