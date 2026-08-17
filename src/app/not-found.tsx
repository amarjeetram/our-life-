"use client";

import Link from "next/link";
import { Home, ArrowLeft, Search, Compass } from "lucide-react";
import { useEffect, useState } from "react";

const FLOATING_ICONS = ["🔍", "📄", "🗺️", "💫", "🚀", "⚡", "🎯", "✨"];

export default function NotFound() {
    const [mounted, setMounted] = useState(false);
    const [particles, setParticles] = useState<{ id: number; x: number; delay: number; dur: number; icon: string }[]>([]);

    useEffect(() => {
        setMounted(true);
        setParticles(
            Array.from({ length: 8 }, (_, i) => ({
                id: i,
                x: 10 + i * 11,
                delay: i * 0.4,
                dur: 4 + (i % 3),
                icon: FLOATING_ICONS[i],
            }))
        );
    }, []);

    return (
        <>
            <style>{`
                @keyframes float-up {
                    0%   { opacity: 0; transform: translateY(60px) scale(0.8) rotate(-10deg); }
                    20%  { opacity: 0.6; }
                    80%  { opacity: 0.4; }
                    100% { opacity: 0; transform: translateY(-80px) scale(1.1) rotate(10deg); }
                }
                @keyframes four04-in {
                    0%   { opacity: 0; transform: scale(0.7) translateY(40px); }
                    60%  { transform: scale(1.05) translateY(-6px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes card-in {
                    0%   { opacity: 0; transform: translateY(32px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse-ring {
                    0%   { transform: scale(1);   opacity: 0.4; }
                    50%  { transform: scale(1.15); opacity: 0.1; }
                    100% { transform: scale(1);   opacity: 0.4; }
                }
                @keyframes gradient-x {
                    0%   { background-position: 0%   50%; }
                    50%  { background-position: 100% 50%; }
                    100% { background-position: 0%   50%; }
                }
                @keyframes wiggle {
                    0%, 100% { transform: rotate(-3deg); }
                    50%      { transform: rotate(3deg);  }
                }
                .animate-four04 {
                    animation: four04-in 0.9s cubic-bezier(.22,1,.36,1) both;
                }
                .animate-card {
                    animation: card-in 0.7s cubic-bezier(.22,1,.36,1) 0.3s both;
                }
                .animate-float-up {
                    animation: float-up var(--dur) ease-in-out var(--delay) infinite;
                }
                .animate-pulse-ring {
                    animation: pulse-ring 3s ease-in-out infinite;
                }
                .gradient-404 {
                    background: linear-gradient(135deg, #6366f1, #a855f7, #ec4899, #f43f5e);
                    background-size: 300% 300%;
                    animation: gradient-x 4s ease infinite;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .btn-primary {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 9px;
                    width: 100%;
                    padding: 14px 24px;
                    border-radius: 14px;
                    font-size: 15px;
                    font-weight: 800;
                    border: none;
                    cursor: pointer;
                    font-family: inherit;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    color: #fff;
                    box-shadow: 0 4px 20px rgba(99,102,241,0.4);
                    transition: all 0.25s ease;
                    text-decoration: none;
                }
                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 32px rgba(99,102,241,0.55);
                }
                .btn-primary:active { transform: translateY(0); }

                .btn-secondary {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    width: 100%;
                    padding: 13px 24px;
                    border-radius: 14px;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    font-family: inherit;
                    text-decoration: none;
                    transition: all 0.25s ease;
                }
                .btn-secondary:hover { transform: translateY(-2px); }
            `}</style>

            {/* ── Page shell ── */}
            <div className="
                min-h-screen flex flex-col items-center justify-center
                text-center px-6 py-12 relative overflow-hidden
                bg-[var(--bg-primary)]
            ">

                {/* ── Background orbs ── */}
                <div className="pointer-events-none fixed inset-0 overflow-hidden">
                    <div className="
                        absolute -top-40 left-1/2 -translate-x-1/2
                        w-[700px] h-[500px] rounded-full
                        animate-pulse-ring
                        bg-[radial-gradient(ellipse,rgba(99,102,241,0.12)_0%,transparent_70%)]
                        dark:bg-[radial-gradient(ellipse,rgba(99,102,241,0.18)_0%,transparent_70%)]
                    " />
                    <div className="
                        absolute bottom-0 right-0
                        w-[400px] h-[400px] rounded-full
                        bg-[radial-gradient(ellipse,rgba(236,72,153,0.08)_0%,transparent_70%)]
                        dark:bg-[radial-gradient(ellipse,rgba(236,72,153,0.14)_0%,transparent_70%)]
                    " />
                    <div className="
                        absolute bottom-20 left-0
                        w-[300px] h-[300px] rounded-full
                        bg-[radial-gradient(ellipse,rgba(139,92,246,0.07)_0%,transparent_70%)]
                        dark:bg-[radial-gradient(ellipse,rgba(139,92,246,0.12)_0%,transparent_70%)]
                    " />

                    {/* Grid pattern */}
                    <div className="
                        absolute inset-0 opacity-[0.025] dark:opacity-[0.04]
                    " style={{
                        backgroundImage: `
                            linear-gradient(rgba(99,102,241,1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px"
                    }} />
                </div>

                {/* ── Floating particles ── */}
                {mounted && particles.map(p => (
                    <div
                        key={p.id}
                        className="animate-float-up pointer-events-none fixed bottom-0 text-2xl select-none"
                        style={{
                            left: `${p.x}%`,
                            ["--delay" as string]: `${p.delay}s`,
                            ["--dur" as string]: `${p.dur}s`,
                        }}
                    >
                        {p.icon}
                    </div>
                ))}

                {/* ── Main content ── */}
                <div className="relative z-10 w-full max-w-[460px]">

                    {/* Compass icon top */}
                    <div className="flex justify-center mb-4">
                        <div className="
                            w-16 h-16 rounded-2xl flex items-center justify-center
                            bg-indigo-50 dark:bg-indigo-950/50
                            border border-indigo-100 dark:border-indigo-800/50
                            shadow-lg dark:shadow-indigo-900/30
                        ">
                            <Compass size={32} className="text-indigo-500 dark:text-indigo-400" style={{ animation: "wiggle 2s ease-in-out infinite" }} />
                        </div>
                    </div>

                    {/* 404 number */}
                    <div
                        className="animate-four04 gradient-404 select-none leading-none mb-3"
                        style={{
                            fontSize: "clamp(100px, 22vw, 160px)",
                            fontWeight: 900,
                            letterSpacing: "-0.06em",
                        }}
                    >
                        404
                    </div>

                    {/* Card */}
                    <div className="
                        animate-card
                        rounded-[28px] overflow-hidden mb-6
                        bg-white dark:bg-slate-900/80
                        border border-slate-200 dark:border-slate-700/60
                        shadow-[0_8px_40px_rgba(99,102,241,0.10)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)]
                        backdrop-blur-xl
                    ">
                        {/* Gradient top bar */}
                        <div style={{
                            height: "3px",
                            background: "linear-gradient(90deg,#6366f1,#8b5cf6,#a855f7,#ec4899,#f43f5e)",
                            backgroundSize: "200% 100%",
                            animation: "gradient-x 3s ease infinite"
                        }} />

                        <div className="px-8 py-8">
                            <h1 className="
                                text-[22px] font-black tracking-tight mb-3
                                text-slate-900 dark:text-slate-50
                            ">
                                Page Not Found
                            </h1>
                            <p className="
                                text-[15px] leading-relaxed mb-7
                                text-slate-500 dark:text-slate-400
                            ">
                                Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved, deleted, or the URL could be wrong.
                            </p>

                            {/* Suggested links */}
                            <div className="
                                flex flex-wrap gap-2 justify-center mb-7
                            ">
                                {[
                                    { href: "/image-tools", label: "🖼️ Image Tools" },
                                    { href: "/calculators", label: "🧮 Calculators" },
                                    { href: "/youtube-tools", label: "▶️ YouTube Tools" },
                                    { href: "/blog", label: "📝 Blog" },
                                ].map(item => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="
                                            px-3 py-1.5 rounded-lg text-[12px] font-semibold
                                            bg-slate-100 dark:bg-slate-800
                                            text-slate-600 dark:text-slate-300
                                            border border-slate-200 dark:border-slate-700
                                            hover:bg-indigo-50 dark:hover:bg-indigo-950/50
                                            hover:text-indigo-600 dark:hover:text-indigo-400
                                            hover:border-indigo-200 dark:hover:border-indigo-700
                                            transition-all duration-200
                                            no-underline
                                        "
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => window.history.back()}
                                    className="btn-primary"
                                >
                                    <ArrowLeft size={17} />
                                    Go Back
                                </button>

                                <Link
                                    href="/"
                                    className="
                                        btn-secondary
                                        bg-slate-100 dark:bg-slate-800
                                        text-slate-700 dark:text-slate-200
                                        border border-slate-200 dark:border-slate-700
                                        hover:bg-indigo-50 dark:hover:bg-indigo-950/60
                                        hover:text-indigo-700 dark:hover:text-indigo-300
                                        hover:border-indigo-200 dark:hover:border-indigo-700
                                    "
                                >
                                    <Home size={16} />
                                    Go to Homepage
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Help text */}
                    <p className="text-[13px] text-slate-400 dark:text-slate-500">
                        Still stuck?{" "}
                        <Link
                            href="/contact-us"
                            className="text-indigo-500 dark:text-indigo-400 font-semibold hover:underline"
                        >
                            Contact our support team
                        </Link>
                        .
                    </p>
                </div>
            </div>
        </>
    );
}
