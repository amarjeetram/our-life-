"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Heart, RefreshCw, Handshake, Users, Flame, Skull, Link2, Sparkles, Star } from "lucide-react";

/* ─── Confetti Particle ─── */
interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    color: string;
    size: number;
    rotation: number;
    rotationSpeed: number;
    opacity: number;
    shape: "circle" | "square" | "heart" | "star";
}

const CELEBRATION_COLORS = [
    "#ff6b9d", "#c44dff", "#4dc7ff", "#ffd700",
    "#ff8c42", "#6bff6b", "#ff4d4d", "#4dffb4",
];

function createParticle(id: number): Particle {
    return {
        id,
        x: Math.random() * window.innerWidth,
        y: -20,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 4 + 2,
        color: CELEBRATION_COLORS[Math.floor(Math.random() * CELEBRATION_COLORS.length)],
        size: Math.random() * 10 + 6,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        opacity: 1,
        shape: (["circle", "square", "heart", "star"] as const)[Math.floor(Math.random() * 4)],
    };
}

/* ─── FLAMES Result Config ─── */
const flamesData = {
    F: {
        title: "Friends",
        desc: "You two are meant to be amazing friends! A bond built on trust and laughter.",
        icon: <Handshake size={40} />,
        color: "#60a5fa",
        glow: "rgba(96,165,250,0.4)",
        gradient: "from-blue-500 via-blue-400 to-cyan-400",
        bg: "from-blue-900/60 to-cyan-900/40",
        emoji: "🤝",
        celebrationColors: ["#60a5fa", "#22d3ee", "#3b82f6"],
    },
    L: {
        title: "Lovers",
        desc: "A spark of true love! You are destined to be lovers — written in the stars.",
        icon: <Heart size={40} fill="currentColor" />,
        color: "#f472b6",
        glow: "rgba(244,114,182,0.5)",
        gradient: "from-pink-500 via-rose-400 to-red-400",
        bg: "from-pink-900/60 to-rose-900/40",
        emoji: "❤️",
        celebrationColors: ["#f472b6", "#fb7185", "#fda4af"],
    },
    A: {
        title: "Affection",
        desc: "Deep affection flows between you! A strong, warm, and caring bond unites you.",
        icon: <Flame size={40} />,
        color: "#fb923c",
        glow: "rgba(251,146,60,0.4)",
        gradient: "from-orange-500 via-amber-400 to-yellow-400",
        bg: "from-orange-900/60 to-amber-900/40",
        emoji: "🔥",
        celebrationColors: ["#fb923c", "#fbbf24", "#f97316"],
    },
    M: {
        title: "Marriage",
        desc: "Wedding bells are ringing! You two are destined to walk down the aisle together.",
        icon: <Link2 size={40} />,
        color: "#c084fc",
        glow: "rgba(192,132,252,0.4)",
        gradient: "from-purple-500 via-violet-400 to-purple-400",
        bg: "from-purple-900/60 to-violet-900/40",
        emoji: "💍",
        celebrationColors: ["#c084fc", "#a78bfa", "#8b5cf6"],
    },
    E: {
        title: "Enemies",
        desc: "Uh oh! Sparks may fly — but not the romantic kind. You might be rivals!",
        icon: <Skull size={40} />,
        color: "#94a3b8",
        glow: "rgba(148,163,184,0.3)",
        gradient: "from-slate-400 via-slate-300 to-gray-400",
        bg: "from-slate-800/80 to-gray-800/60",
        emoji: "💀",
        celebrationColors: ["#94a3b8", "#64748b", "#475569"],
    },
    S: {
        title: "Siblings",
        desc: "A bond like brothers and sisters — unbreakable, warm, and full of memories.",
        icon: <Users size={40} />,
        color: "#34d399",
        glow: "rgba(52,211,153,0.4)",
        gradient: "from-emerald-500 via-teal-400 to-green-400",
        bg: "from-emerald-900/60 to-teal-900/40",
        emoji: "🫂",
        celebrationColors: ["#34d399", "#6ee7b7", "#10b981"],
    },
};

/* ─── Confetti Canvas ─── */
function ConfettiCanvas({ active, colors }: { active: boolean; colors: string[] }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animRef = useRef<number>(0);
    const countRef = useRef(0);

    useEffect(() => {
        if (!active) {
            particlesRef.current = [];
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d")!;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Burst 180 particles
        particlesRef.current = Array.from({ length: 180 }, (_, i) => createParticle(i));
        countRef.current = 180;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particlesRef.current.forEach((p) => {
                ctx.save();
                ctx.globalAlpha = p.opacity;
                ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)] || p.color;

                if (p.shape === "circle") {
                    ctx.beginPath();
                    ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    ctx.fill();
                } else if (p.shape === "square") {
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                } else if (p.shape === "heart") {
                    ctx.font = `${p.size * 1.5}px serif`;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("♥", 0, 0);
                } else {
                    ctx.font = `${p.size * 1.5}px serif`;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("★", 0, 0);
                }
                ctx.restore();

                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.08;
                p.rotation += p.rotationSpeed;
                if (p.y > canvas.height * 0.7) p.opacity -= 0.02;
            });

            particlesRef.current = particlesRef.current.filter((p) => p.opacity > 0);

            if (particlesRef.current.length > 0) {
                animRef.current = requestAnimationFrame(draw);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };

        animRef.current = requestAnimationFrame(draw);
        return () => {
            cancelAnimationFrame(animRef.current);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [active, colors]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[9999]"
            style={{ display: active ? "block" : "none" }}
        />
    );
}

/* ─── Floating Orbs Background ─── */
function FloatingOrbs() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full blur-3xl opacity-20"
                    style={{
                        width: `${120 + i * 40}px`,
                        height: `${120 + i * 40}px`,
                        background: [
                            "radial-gradient(circle, #f472b6, transparent)",
                            "radial-gradient(circle, #818cf8, transparent)",
                            "radial-gradient(circle, #fb923c, transparent)",
                            "radial-gradient(circle, #34d399, transparent)",
                            "radial-gradient(circle, #c084fc, transparent)",
                            "radial-gradient(circle, #60a5fa, transparent)",
                        ][i],
                        top: `${[5, 60, 20, 70, 40, 85][i]}%`,
                        left: `${[10, 80, 60, 20, 85, 40][i]}%`,
                        animation: `floatOrb ${8 + i * 2}s ease-in-out infinite alternate`,
                        animationDelay: `${i * 1.2}s`,
                    }}
                />
            ))}
        </div>
    );
}

/* ─── FLAMES Letter Row Animation ─── */
function FlamesLetterRow({ activeIndex, eliminatedIndex }: { activeIndex: number; eliminatedIndex: number }) {
    const letters = ["F", "L", "A", "M", "E", "S"];
    return (
        <div className="flex items-center justify-center gap-2 md:gap-3 my-4">
            {letters.map((letter, i) => (
                <div
                    key={i}
                    style={{
                        transitionDelay: `${i * 60}ms`,
                    }}
                    className={`
                        w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center
                        text-lg md:text-xl font-black border-2 transition-all duration-500
                        ${eliminatedIndex === i
                            ? "opacity-10 scale-50 border-transparent text-gray-600 line-through"
                            : activeIndex === i
                            ? "bg-gradient-to-br from-rose-500 to-orange-500 border-rose-400 text-white scale-125 shadow-[0_0_20px_rgba(251,113,133,0.7)]"
                            : "bg-white/5 border-white/20 text-white/70"
                        }
                    `}
                >
                    {letter}
                </div>
            ))}
        </div>
    );
}

/* ─── Main Component ─── */
export default function FlamesCalculatorClient() {
    const [name1, setName1] = useState("");
    const [name2, setName2] = useState("");
    const [dob1, setDob1] = useState("");
    const [dob2, setDob2] = useState("");
    const [isCalculating, setIsCalculating] = useState(false);
    const [result, setResult] = useState<(typeof flamesData)[keyof typeof flamesData] & { letter: string } | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [flamesStep, setFlamesStep] = useState<{ active: number; eliminated: number } | null>(null);
    const [inputFocus1, setInputFocus1] = useState(false);
    const [inputFocus2, setInputFocus2] = useState(false);
    const resultRef = useRef<HTMLDivElement>(null);

    // Styles injected via useEffect to avoid SSR issues
    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
            @keyframes floatOrb {
                0% { transform: translateY(0) scale(1); }
                100% { transform: translateY(-30px) scale(1.1); }
            }
            @keyframes pulseGlow {
                0%, 100% { box-shadow: 0 0 20px var(--glow); }
                50% { box-shadow: 0 0 50px var(--glow), 0 0 80px var(--glow); }
            }
            @keyframes revealResult {
                0% { opacity: 0; transform: scale(0.6) translateY(40px); filter: blur(12px); }
                60% { transform: scale(1.08) translateY(-8px); filter: blur(0); }
                100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
            }
            @keyframes slideUp {
                0% { opacity: 0; transform: translateY(30px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
            @keyframes spinSlow {
                to { transform: rotate(360deg); }
            }
            @keyframes bounceIn {
                0% { transform: scale(0); opacity: 0; }
                50% { transform: scale(1.25); }
                70% { transform: scale(0.9); }
                100% { transform: scale(1); opacity: 1; }
            }
            @keyframes typingBlink {
                0%, 100% { border-color: transparent; }
                50% { border-color: currentColor; }
            }
            @keyframes starPop {
                0% { transform: scale(0) rotate(-30deg); opacity: 0; }
                80% { transform: scale(1.3) rotate(10deg); }
                100% { transform: scale(1) rotate(0deg); opacity: 1; }
            }
            @keyframes heartbeat {
                0%, 100% { transform: scale(1); }
                14% { transform: scale(1.3); }
                28% { transform: scale(1); }
                42% { transform: scale(1.3); }
                70% { transform: scale(1); }
            }
            .result-card-reveal { animation: revealResult 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards; }
            .slide-up { animation: slideUp 0.6s ease forwards; }
            .bounce-in { animation: bounceIn 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards; }
            .star-pop { animation: starPop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards; }
            .heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }
            .spin-slow { animation: spinSlow 8s linear infinite; }
            .flames-card {
                background: linear-gradient(135deg, rgba(15,15,25,0.95) 0%, rgba(25,15,35,0.98) 100%);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255,255,255,0.08);
            }
            .input-dark {
                background: rgba(255,255,255,0.05);
                border: 2px solid rgba(255,255,255,0.10);
                color: white;
                transition: all 0.3s ease;
            }
            .input-dark:focus {
                background: rgba(255,255,255,0.08);
                border-color: rgba(244,114,182,0.7);
                box-shadow: 0 0 0 4px rgba(244,114,182,0.15), 0 0 20px rgba(244,114,182,0.1);
                outline: none;
            }
            .input-dark::placeholder { color: rgba(255,255,255,0.25); }
            .shimmer-btn {
                background: linear-gradient(90deg, #be185d, #9333ea, #be185d, #9333ea);
                background-size: 200% 100%;
                animation: shimmer 3s linear infinite;
            }
            .shimmer-btn:hover { animation: shimmer 1.5s linear infinite; }
            .shimmer-btn:disabled { animation: none; background: rgba(255,255,255,0.08); }
            .glow-text {
                text-shadow: 0 0 30px currentColor, 0 0 60px currentColor;
            }
            .date-input-dark {
                color-scheme: dark;
            }
        `;
        document.head.appendChild(style);
        return () => { document.head.removeChild(style); };
    }, []);

    const runFlamesAnimation = useCallback((finalLetter: string, onDone: () => void) => {
        const letters = ["F", "L", "A", "M", "E", "S"];
        let currentFlames = [...letters];
        let stepIdx = 0;

        const clean1 = name1.toLowerCase().replace(/[^a-z]/g, "");
        const clean2 = name2.toLowerCase().replace(/[^a-z]/g, "");
        let charCount = 0;
        const map1: Record<string, number> = {};
        const map2: Record<string, number> = {};
        for (const c of clean1) map1[c] = (map1[c] || 0) + 1;
        for (const c of clean2) map2[c] = (map2[c] || 0) + 1;
        for (const c in map1) {
            if (map2[c]) {
                const mn = Math.min(map1[c], map2[c]);
                map1[c] -= mn; map2[c] -= mn;
            }
        }
        for (const c in map1) charCount += map1[c];
        for (const c in map2) charCount += map2[c];
        if (dob1 && dob2) {
            const d1 = dob1.replace(/[^0-9]/g, "");
            const d2 = dob2.replace(/[^0-9]/g, "");
            for (const c of d1) charCount += parseInt(c);
            for (const c of d2) charCount += parseInt(c);
        }
        if (charCount === 0) charCount = 1;

        // Generate elimination sequence
        const steps: number[] = [];
        const tempFlames = [...letters];
        let tempIdx = 0;
        while (tempFlames.length > 1) {
            tempIdx = (tempIdx + charCount - 1) % tempFlames.length;
            steps.push(letters.indexOf(tempFlames[tempIdx]));
            tempFlames.splice(tempIdx, 1);
            if (tempIdx >= tempFlames.length) tempIdx = 0;
        }

        // Animate steps
        let eliminated: number[] = [];
        let stepCount = 0;
        const interval = setInterval(() => {
            if (stepCount >= steps.length) {
                clearInterval(interval);
                setFlamesStep(null);
                onDone();
                return;
            }
            const elimIdx = steps[stepCount];
            eliminated.push(elimIdx);
            const activeIdx = steps[stepCount + 1] !== undefined
                ? steps[stepCount + 1]
                : letters.indexOf(finalLetter);
            setFlamesStep({ active: activeIdx, eliminated: elimIdx });
            stepCount++;
        }, 300);
    }, [name1, name2, dob1, dob2]);

    const calculateFlames = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name1.trim() || !name2.trim()) return;

        setIsCalculating(true);
        setResult(null);
        setShowResult(false);
        setShowConfetti(false);
        setFlamesStep(null);

        setTimeout(() => {
            const clean1 = name1.toLowerCase().replace(/[^a-z]/g, "");
            const clean2 = name2.toLowerCase().replace(/[^a-z]/g, "");
            let charCount = 0;
            const map1: Record<string, number> = {};
            const map2: Record<string, number> = {};
            for (const c of clean1) map1[c] = (map1[c] || 0) + 1;
            for (const c of clean2) map2[c] = (map2[c] || 0) + 1;
            for (const c in map1) {
                if (map2[c]) {
                    const mn = Math.min(map1[c], map2[c]);
                    map1[c] -= mn; map2[c] -= mn;
                }
            }
            for (const c in map1) charCount += map1[c];
            for (const c in map2) charCount += map2[c];
            if (dob1 && dob2) {
                const d1 = dob1.replace(/[^0-9]/g, "");
                const d2 = dob2.replace(/[^0-9]/g, "");
                for (const c of d1) charCount += parseInt(c);
                for (const c of d2) charCount += parseInt(c);
            }
            if (charCount === 0) charCount = 1;

            let flames = ["F", "L", "A", "M", "E", "S"];
            let idx = 0;
            while (flames.length > 1) {
                idx = (idx + charCount - 1) % flames.length;
                flames.splice(idx, 1);
            }
            const finalLetter = flames[0] as keyof typeof flamesData;
            const finalResult = { letter: finalLetter, ...flamesData[finalLetter] };

            runFlamesAnimation(finalLetter, () => {
                setResult(finalResult);
                setIsCalculating(false);
                setTimeout(() => {
                    setShowResult(true);
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 4000);
                    setTimeout(() => {
                        if (resultRef.current) {
                            resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
                        }
                    }, 200);
                }, 300);
            });
        }, 500);
    };

    const handleReset = () => {
        setResult(null);
        setShowResult(false);
        setShowConfetti(false);
        setFlamesStep(null);
    };

    const letterColors = ["F", "L", "A", "M", "E", "S"];

    return (
        <>
            <ConfettiCanvas active={showConfetti} colors={result?.celebrationColors ?? CELEBRATION_COLORS} />

            <div className="w-full max-w-lg mx-auto">
                <div className="flames-card rounded-[2rem] overflow-hidden relative shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
                    <FloatingOrbs />

                    {/* Top glow bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500" />

                    <div className="p-6 md:p-10 relative z-10">
                        {/* FLAMES letters header */}
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-1 mb-3">
                                {["F","L","A","M","E","S"].map((l, i) => (
                                    <span
                                        key={i}
                                        className="text-2xl md:text-3xl font-black"
                                        style={{
                                            background: `linear-gradient(135deg, ${[
                                                "#f472b6","#c084fc","#fb923c","#60a5fa","#34d399","#fbbf24"
                                            ][i]}, white)`,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                            filter: "drop-shadow(0 0 8px rgba(255,255,255,0.2))",
                                        }}
                                    >
                                        {l}
                                    </span>
                                ))}
                            </div>
                            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                                Friendship · Love · Affection · Marriage · Enemies · Siblings
                            </p>
                        </div>

                        <form onSubmit={calculateFlames} className="space-y-5">
                            {/* Name 1 */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-white/70 block flex items-center gap-2">
                                    <span className="inline-flex w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 items-center justify-center text-xs">♂</span>
                                    Boy / First Person&apos;s Name
                                </label>
                                <div className={`relative transition-all duration-300 ${inputFocus1 ? "scale-[1.02]" : ""}`}>
                                    <input
                                        type="text"
                                        id="flames-name1"
                                        placeholder="E.g. Siddharth"
                                        required
                                        maxLength={40}
                                        value={name1}
                                        onChange={(e) => setName1(e.target.value)}
                                        onFocus={() => setInputFocus1(true)}
                                        onBlur={() => setInputFocus1(false)}
                                        className="input-dark w-full rounded-2xl px-5 py-4 text-white font-medium text-base"
                                    />
                                    {name1 && (
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg animate-pulse">✓</span>
                                    )}
                                </div>
                            </div>

                            {/* VS divider */}
                            <div className="flex items-center gap-3 py-1">
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent to-white/10" />
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-rose-500/30">
                                    VS
                                </div>
                                <div className="flex-1 h-px bg-gradient-to-l from-transparent to-white/10" />
                            </div>

                            {/* Name 2 */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-white/70 block flex items-center gap-2">
                                    <span className="inline-flex w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 items-center justify-center text-xs">♀</span>
                                    Girl / Second Person&apos;s Name
                                </label>
                                <div className={`relative transition-all duration-300 ${inputFocus2 ? "scale-[1.02]" : ""}`}>
                                    <input
                                        type="text"
                                        id="flames-name2"
                                        placeholder="E.g. Kiara"
                                        required
                                        maxLength={40}
                                        value={name2}
                                        onChange={(e) => setName2(e.target.value)}
                                        onFocus={() => setInputFocus2(true)}
                                        onBlur={() => setInputFocus2(false)}
                                        className="input-dark w-full rounded-2xl px-5 py-4 text-white font-medium text-base"
                                    />
                                    {name2 && (
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-400 text-lg animate-pulse">✓</span>
                                    )}
                                </div>
                            </div>

                            {/* Advanced DOB */}
                            <div className="border-t border-white/5 pt-5">
                                <p className="text-center text-xs font-bold text-white/25 uppercase tracking-widest mb-4">Advanced · Optional</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-white/40 block">Date of Birth 1</label>
                                        <input
                                            type="date"
                                            id="flames-dob1"
                                            value={dob1}
                                            onChange={(e) => setDob1(e.target.value)}
                                            className="input-dark date-input-dark w-full rounded-xl px-3 py-2.5 text-sm text-white/70"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-white/40 block">Date of Birth 2</label>
                                        <input
                                            type="date"
                                            id="flames-dob2"
                                            value={dob2}
                                            onChange={(e) => setDob2(e.target.value)}
                                            className="input-dark date-input-dark w-full rounded-xl px-3 py-2.5 text-sm text-white/70"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                id="flames-submit-btn"
                                disabled={isCalculating || !name1 || !name2}
                                className="w-full shimmer-btn text-white font-black text-lg rounded-2xl px-6 py-4 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-xl shadow-purple-900/40 hover:shadow-2xl hover:shadow-pink-500/30 active:scale-[0.97] relative overflow-hidden group"
                            >
                                <span className="relative flex items-center justify-center gap-3">
                                    {isCalculating ? (
                                        <>
                                            <Flame className="animate-bounce text-orange-300" size={22} />
                                            <span className="animate-pulse">Reading Your Destiny...</span>
                                            <Flame className="animate-bounce text-orange-300" size={22} style={{ animationDelay: "0.2s" }} />
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                                            Play FLAMES
                                            <Flame size={20} className="text-orange-300 group-hover:scale-125 transition-transform" />
                                        </>
                                    )}
                                </span>
                            </button>
                        </form>

                        {/* FLAMES Animation During Calculation */}
                        {isCalculating && flamesStep && (
                            <div className="mt-6 slide-up">
                                <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-2">Eliminating Letters...</p>
                                <FlamesLetterRow
                                    activeIndex={flamesStep.active}
                                    eliminatedIndex={flamesStep.eliminated}
                                />
                            </div>
                        )}

                        {isCalculating && !flamesStep && (
                            <div className="mt-6 flex justify-center">
                                <div className="flex gap-2 items-center">
                                    {["F","L","A","M","E","S"].map((l, i) => (
                                        <span
                                            key={i}
                                            className="text-lg font-black text-white/30 animate-bounce"
                                            style={{ animationDelay: `${i * 0.1}s` }}
                                        >
                                            {l}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* RESULT SECTION */}
                        {result && showResult && (
                            <div ref={resultRef} className="mt-8 result-card-reveal">
                                <div
                                    className={`relative rounded-3xl overflow-hidden p-8 text-center`}
                                    style={{
                                        background: `linear-gradient(135deg, ${result.celebrationColors[0]}15, ${result.celebrationColors[1]}10)`,
                                        border: `1px solid ${result.color}30`,
                                        boxShadow: `0 0 40px ${result.glow}, inset 0 0 60px ${result.color}08`,
                                    }}
                                >
                                    {/* Spinning ring */}
                                    <div
                                        className="absolute inset-0 pointer-events-none"
                                        style={{
                                            background: `conic-gradient(from 0deg, ${result.color}40, transparent, ${result.color}40, transparent)`,
                                            borderRadius: "1.5rem",
                                            animation: "spinSlow 6s linear infinite",
                                            opacity: 0.4,
                                        }}
                                    />

                                    {/* Emoji big */}
                                    <div className="bounce-in mb-2 text-6xl md:text-7xl leading-none" style={{ animationDelay: "0.1s" }}>
                                        {result.emoji}
                                    </div>

                                    {/* Icon circle */}
                                    <div
                                        className="bounce-in mx-auto mb-4 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl border"
                                        style={{
                                            background: `linear-gradient(135deg, ${result.color}30, ${result.color}10)`,
                                            borderColor: `${result.color}50`,
                                            color: result.color,
                                            boxShadow: `0 0 30px ${result.glow}`,
                                            animationDelay: "0.2s",
                                        }}
                                    >
                                        {result.icon}
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="text-4xl md:text-5xl font-black mb-3 glow-text tracking-tight slide-up"
                                        style={{ color: result.color, animationDelay: "0.3s" }}
                                    >
                                        {result.title}
                                    </h3>

                                    {/* Names */}
                                    <p className="text-white/60 font-semibold text-base mb-4 slide-up" style={{ animationDelay: "0.4s" }}>
                                        For{" "}
                                        <span className="font-black text-white capitalize">{name1}</span>
                                        {" "}
                                        <span style={{ color: result.color }}>♥</span>
                                        {" "}
                                        <span className="font-black text-white capitalize">{name2}</span>
                                    </p>

                                    {/* Description */}
                                    <div
                                        className="slide-up rounded-2xl px-5 py-4 mx-auto max-w-xs"
                                        style={{
                                            background: `${result.color}10`,
                                            border: `1px solid ${result.color}20`,
                                            animationDelay: "0.5s",
                                        }}
                                    >
                                        <p className="text-white/75 text-sm font-medium leading-relaxed">
                                            {result.desc}
                                        </p>
                                    </div>

                                    {/* Stars decoration */}
                                    {["L","M","A"].includes(result.letter) && (
                                        <div className="flex justify-center gap-1 mt-4">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={16}
                                                    fill={result.color}
                                                    className="star-pop"
                                                    style={{
                                                        color: result.color,
                                                        animationDelay: `${0.6 + i * 0.1}s`,
                                                        opacity: 0,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Play Again */}
                                <button
                                    id="flames-play-again"
                                    onClick={handleReset}
                                    className="mt-5 flex items-center justify-center gap-2 w-full text-white/40 font-semibold hover:text-white transition-all py-3 rounded-2xl hover:bg-white/5 group"
                                >
                                    <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                                    Play Again
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Bottom glow */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
            </div>
        </>
    );
}
