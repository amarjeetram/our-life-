"use client";

import React, { useState } from 'react';
import { Bot, Copy, CheckCircle2, Sparkles, Wand2, RefreshCw, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GeminiPromptGeneratorClient() {
    const [role, setRole] = useState('Marketing Expert');
    const [task, setTask] = useState('');
    const [context, setContext] = useState('');
    const [tone, setTone] = useState('Professional');
    const [format, setFormat] = useState('Markdown with headings');
    
    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);

    const roles = [
        "Marketing Expert", "Software Engineer", "Creative Writer", 
        "SEO Specialist", "Data Analyst", "Life Coach", 
        "Teacher/Educator", "Product Manager", "Startup Founder"
    ];

    const tones = [
        "Professional", "Casual & Friendly", "Humorous", 
        "Persuasive", "Academic", "Empathetic", "Inspirational"
    ];

    const formats = [
        "Markdown with headings", "Bullet points", "Numbered list", 
        "Table format", "Step-by-step guide", "Short summary", "Code block"
    ];

    const generatePrompt = () => {
        if (!task.trim()) {
            toast.error("Please enter the main task/goal.");
            return;
        }

        setIsGenerating(true);
        
        // Simulate a slight delay for UI effect
        setTimeout(() => {
            const prompt = `Act as an expert ${role}. I need you to help me with the following task:

**Main Task/Goal:**
${task.trim()}

${context.trim() ? `**Background Context:**\n${context.trim()}\n` : ''}
**Tone/Style:**
Please maintain a ${tone.toLowerCase()} tone throughout your response.

**Output Format:**
Please format your response as: ${format}.`;

            setGeneratedPrompt(prompt);
            setCopied(false);
            setIsGenerating(false);
            toast.success("Prompt generated successfully!");
        }, 600);
    };

    const copyToClipboard = async () => {
        if (!generatedPrompt) return;
        try {
            await navigator.clipboard.writeText(generatedPrompt);
            setCopied(true);
            toast.success("Prompt copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error("Failed to copy");
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div style={{
                background: "rgba(30, 41, 59, 0.6)", backdropFilter: "blur(20px)",
                borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)",
                padding: "clamp(24px, 5vw, 40px)", marginBottom: "32px",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)"
            }}>
                <div className="text-center mb-10">
                    <div style={{
                        width: "64px", height: "64px", borderRadius: "20px",
                        background: "linear-gradient(135deg, #6366f1, #a855f7)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        margin: "0 auto 20px", color: "white",
                        boxShadow: "0 10px 25px -5px rgba(168, 85, 247, 0.4)"
                    }}>
                        <Bot size={32} />
                    </div>
                    <h2 style={{ fontSize: "clamp(28px, 5vw, 36px)", fontWeight: 800, color: "#f8fafc", marginBottom: "12px", letterSpacing: "-0.02em" }}>
                        Ultimate Gemini Prompt Generator
                    </h2>
                    <p style={{ color: "#94a3b8", fontSize: "16px", maxWidth: "600px", margin: "0 auto", lineHeight: 1.6 }}>
                        Craft the perfect prompt for Google Gemini by defining the AI's role, the specific task, and the desired format. Get better, more accurate AI responses instantly.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Role Input */}
                    <div>
                        <label style={{ display: "block", color: "#cbd5e1", fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>
                            AI Persona / Role
                        </label>
                        <select 
                            value={role} onChange={(e) => setRole(e.target.value)}
                            style={{
                                width: "100%", padding: "16px", borderRadius: "14px",
                                background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255,255,255,0.1)",
                                color: "#f8fafc", fontSize: "15px", outline: "none",
                                transition: "border-color 0.2s", appearance: "none"
                            }}
                        >
                            {roles.map(r => <option key={r} value={r} style={{ background: "#0f172a" }}>{r}</option>)}
                        </select>
                    </div>

                    {/* Tone Input */}
                    <div>
                        <label style={{ display: "block", color: "#cbd5e1", fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>
                            Response Tone
                        </label>
                        <select 
                            value={tone} onChange={(e) => setTone(e.target.value)}
                            style={{
                                width: "100%", padding: "16px", borderRadius: "14px",
                                background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255,255,255,0.1)",
                                color: "#f8fafc", fontSize: "15px", outline: "none",
                                transition: "border-color 0.2s", appearance: "none"
                            }}
                        >
                            {tones.map(t => <option key={t} value={t} style={{ background: "#0f172a" }}>{t}</option>)}
                        </select>
                    </div>
                </div>

                {/* Task Input */}
                <div className="mb-6">
                    <label style={{ display: "block", color: "#cbd5e1", fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>
                        What do you want Gemini to do? (The Core Task) <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <textarea 
                        value={task} onChange={(e) => setTask(e.target.value)}
                        placeholder="e.g., Write a 500-word blog post about the benefits of drinking green tea..."
                        rows={3}
                        style={{
                            width: "100%", padding: "16px", borderRadius: "14px",
                            background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255,255,255,0.1)",
                            color: "#f8fafc", fontSize: "15px", outline: "none",
                            transition: "border-color 0.2s", resize: "vertical", minHeight: "100px"
                        }}
                    />
                </div>

                {/* Context Input */}
                <div className="mb-6">
                    <label style={{ display: "block", color: "#cbd5e1", fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>
                        Additional Context (Optional)
                    </label>
                    <textarea 
                        value={context} onChange={(e) => setContext(e.target.value)}
                        placeholder="e.g., The target audience is beginners. Mention matcha as an alternative..."
                        rows={2}
                        style={{
                            width: "100%", padding: "16px", borderRadius: "14px",
                            background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255,255,255,0.1)",
                            color: "#f8fafc", fontSize: "15px", outline: "none",
                            transition: "border-color 0.2s", resize: "vertical", minHeight: "80px"
                        }}
                    />
                </div>

                {/* Format Input */}
                <div className="mb-10">
                    <label style={{ display: "block", color: "#cbd5e1", fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>
                        Output Format
                    </label>
                    <select 
                        value={format} onChange={(e) => setFormat(e.target.value)}
                        style={{
                            width: "100%", padding: "16px", borderRadius: "14px",
                            background: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(255,255,255,0.1)",
                            color: "#f8fafc", fontSize: "15px", outline: "none",
                            transition: "border-color 0.2s", appearance: "none"
                        }}
                    >
                        {formats.map(f => <option key={f} value={f} style={{ background: "#0f172a" }}>{f}</option>)}
                    </select>
                </div>

                {/* Generate Button */}
                <button 
                    onClick={generatePrompt}
                    disabled={isGenerating}
                    style={{
                        width: "100%", padding: "18px", borderRadius: "16px",
                        background: isGenerating ? "rgba(99,102,241,0.5)" : "linear-gradient(135deg, #6366f1, #a855f7)",
                        color: "#fff", fontSize: "18px", fontWeight: 700,
                        border: "none", cursor: isGenerating ? "not-allowed" : "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
                        boxShadow: isGenerating ? "none" : "0 10px 25px -5px rgba(168, 85, 247, 0.4)",
                        transition: "all 0.3s"
                    }}
                >
                    {isGenerating ? <RefreshCw className="animate-spin" size={22} /> : <Wand2 size={22} />}
                    {isGenerating ? "Generating..." : "Generate Magic Prompt"}
                </button>
            </div>

            {/* Result Section */}
            {generatedPrompt && (
                <div style={{
                    background: "rgba(30, 41, 59, 0.8)", backdropFilter: "blur(20px)",
                    borderRadius: "24px", border: "1px solid rgba(168,85,247,0.3)",
                    padding: "32px", animation: "fadeInUp 0.5s ease-out"
                }}>
                    <style>{`
                        @keyframes fadeInUp {
                            from { opacity: 0; transform: translateY(20px); }
                            to { opacity: 1; transform: translateY(0); }
                        }
                    `}</style>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-700/50">
                        <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#f8fafc", display: "flex", alignItems: "center", gap: "8px", margin: 0 }}>
                            <Sparkles size={20} color="#a855f7" /> Your Optimized Prompt
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            <button 
                                onClick={copyToClipboard}
                                style={{
                                    display: "flex", alignItems: "center", gap: "8px",
                                    padding: "10px 20px", borderRadius: "12px", border: "none",
                                    background: copied ? "#10b981" : "rgba(255,255,255,0.05)",
                                    color: copied ? "#fff" : "#cbd5e1", fontSize: "14px", fontWeight: 600,
                                    cursor: "pointer", transition: "all 0.2s"
                                }}
                            >
                                {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                                {copied ? "Copied!" : "Copy Prompt"}
                            </button>
                            <a 
                                href="https://gemini.google.com/" target="_blank" rel="noopener noreferrer"
                                style={{
                                    display: "flex", alignItems: "center", gap: "8px",
                                    padding: "10px 20px", borderRadius: "12px", border: "1px solid rgba(99,102,241,0.5)",
                                    background: "rgba(99,102,241,0.1)",
                                    color: "#818cf8", fontSize: "14px", fontWeight: 600,
                                    cursor: "pointer", textDecoration: "none", transition: "all 0.2s"
                                }}
                            >
                                Open Gemini <ExternalLink size={16} />
                            </a>
                        </div>
                    </div>
                    
                    <div style={{
                        background: "rgba(15, 23, 42, 0.6)", padding: "24px", borderRadius: "16px",
                        border: "1px solid rgba(255,255,255,0.05)", color: "#e2e8f0",
                        fontSize: "16px", lineHeight: 1.7, whiteSpace: "pre-wrap"
                    }}>
                        {generatedPrompt}
                    </div>
                </div>
            )}
        </div>
    );
}
