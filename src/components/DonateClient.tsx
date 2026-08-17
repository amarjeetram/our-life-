"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Coffee, Zap, Shield, Star, CheckCircle2, Lock, ExternalLink, Sparkles, Users, Globe, Rocket } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';

const PRESET_AMOUNTS = [49, 99, 199, 499];
const BMC_URL = 'https://buymeacoffee.com/smarttoolswala';

declare global {
    interface Window { Razorpay: any; }
}

const FEATURES = [
    {
        icon: <Zap size={20} />,
        title: 'Lightning Fast Servers',
        desc: 'Your support keeps our servers running at top speed for instant image compression.',
        color: 'text-amber-500 dark:text-amber-400',
        bg: 'bg-amber-50 dark:bg-amber-950/40',
        border: 'border-amber-100 dark:border-amber-800/30',
    },
    {
        icon: <Shield size={20} />,
        title: 'Privacy First',
        desc: 'We never store your files. Your data is processed and deleted instantly.',
        color: 'text-emerald-500 dark:text-emerald-400',
        bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        border: 'border-emerald-100 dark:border-emerald-800/30',
    },
    {
        icon: <Users size={20} />,
        title: 'Tools for Students',
        desc: 'Building free CGPA calculators, exam tools & utilities for Indian students.',
        color: 'text-indigo-500 dark:text-indigo-400',
        bg: 'bg-indigo-50 dark:bg-indigo-950/40',
        border: 'border-indigo-100 dark:border-indigo-800/30',
    },
    {
        icon: <Globe size={20} />,
        title: '100% Free Forever',
        desc: 'No paywalls, no ads, no subscriptions. Every tool stays free for everyone.',
        color: 'text-violet-500 dark:text-violet-400',
        bg: 'bg-violet-50 dark:bg-violet-950/40',
        border: 'border-violet-100 dark:border-violet-800/30',
    },
];

const FAQS = [
    { q: 'Is my payment secure?', a: 'Yes! All payments are processed by Razorpay — India\'s most trusted payment gateway. We use 256-bit SSL encryption and never store your card or bank details.' },
    { q: 'Can I get a refund?', a: 'Since donations are voluntary contributions, they are generally non-refundable. However, if there\'s an error with your payment, contact us and we\'ll resolve it within 48 hours.' },
    { q: 'Where does my money go?', a: '100% of donations go towards server costs, CDN bandwidth, new feature development, and keeping all tools free for everyone.' },
    { q: 'Is there a minimum or maximum amount?', a: 'Minimum is ₹1 and maximum is ₹50,000 per transaction. You can donate as many times as you like!' },
];

export default function DonateClient() {
    const [amount, setAmount] = useState<number>(99);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [donated, setDonated] = useState(false);
    const [donatedAmount, setDonatedAmount] = useState<number>(0);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const paymentInFlight = useRef(false);

    const finalAmount = customAmount ? parseFloat(customAmount) : amount;

    const loadRazorpayScript = (): Promise<boolean> => {
        return new Promise((resolve) => {
            if (window.Razorpay) return resolve(true);
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleDonate = async () => {
        if (paymentInFlight.current) return;
        if (!finalAmount || isNaN(finalAmount) || finalAmount < 1) {
            toast.error('Please enter a valid amount (minimum ₹1)');
            return;
        }
        if (finalAmount > 50000) {
            toast.error('Maximum donation amount is ₹50,000');
            return;
        }
        paymentInFlight.current = true;
        setLoading(true);
        try {
            const loaded = await loadRazorpayScript();
            if (!loaded) {
                toast.error('Could not load payment gateway. Please check your internet connection.');
                paymentInFlight.current = false;
                setLoading(false);
                return;
            }
            const res = await fetch('/api/razorpay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: finalAmount }),
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to initiate payment');
            }
            const { orderId, keyId } = await res.json();
            const options = {
                key: keyId,
                amount: Math.round(finalAmount * 100),
                currency: 'INR',
                name: 'SmartToolsWala',
                description: `Donation of Rs.${finalAmount} — Thank you!`,
                order_id: orderId,
                image: '/favicon.ico',
                handler: async (response: {
                    razorpay_order_id: string;
                    razorpay_payment_id: string;
                    razorpay_signature: string;
                }) => {
                    try {
                        const verifyRes = await fetch('/api/razorpay/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }),
                        });
                        const verifyData = await verifyRes.json();
                        if (verifyRes.ok && verifyData.success) {
                            setDonatedAmount(finalAmount);
                            setDonated(true);
                            toast.success('🎉 Thank you for your donation! You are amazing!');
                        } else {
                            toast.error('Payment could not be verified. Please contact us if money was deducted.');
                        }
                    } catch {
                        toast.error('Verification failed. Please contact us if money was deducted.');
                    } finally {
                        paymentInFlight.current = false;
                        setLoading(false);
                    }
                },
                prefill: { name: '', email: '', contact: '' },
                notes: { purpose: 'Donation to SmartToolsWala' },
                theme: { color: '#6366f1' },
                modal: {
                    ondismiss: () => {
                        paymentInFlight.current = false;
                        setLoading(false);
                    },
                },
            };
            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', (response: any) => {
                toast.error(`Payment failed: ${response.error.description}`);
                paymentInFlight.current = false;
                setLoading(false);
            });
            rzp.open();
        } catch (err: any) {
            toast.error(err.message || 'Something went wrong. Please try again.');
            paymentInFlight.current = false;
            setLoading(false);
        }
    };

    // ── Thank You Screen ──────────────────────────────────────────────────
    if (donated) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-[var(--bg-primary)]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.88, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="
                        w-full max-w-[460px] text-center rounded-[28px] overflow-hidden
                        bg-white dark:bg-slate-900
                        border border-slate-200 dark:border-slate-700/60
                        shadow-[0_20px_60px_rgba(99,102,241,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                    "
                >
                    <div className="h-1" style={{ background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899)' }} />
                    <div className="px-10 py-12">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-[0_12px_32px_rgba(99,102,241,0.4)]">
                            <Heart size={36} color="#fff" fill="#fff" />
                        </div>
                        <h1 className="text-[28px] font-black tracking-tight text-slate-900 dark:text-slate-50 mb-3">
                            Thank you so much! 🙏
                        </h1>
                        <p className="text-[15px] text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                            Your donation of{' '}
                            <strong className="text-indigo-600 dark:text-indigo-400">₹{donatedAmount}</strong>{' '}
                            helps us keep SmartToolsWala free for everyone. You&apos;re amazing!
                        </p>
                        <div className="flex items-center justify-center gap-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 rounded-xl px-4 py-3 mb-8">
                            <CheckCircle2 size={16} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                            <span className="text-[13px] font-bold text-emerald-700 dark:text-emerald-400">
                                Payment Verified &amp; Secured by Razorpay
                            </span>
                        </div>
                        <Link
                            href="/"
                            className="
                                inline-flex items-center gap-2 px-8 py-4 rounded-2xl
                                bg-gradient-to-r from-indigo-600 to-violet-600
                                text-white font-bold text-[15px] no-underline
                                shadow-[0_4px_20px_rgba(99,102,241,0.4)]
                                hover:shadow-[0_8px_32px_rgba(99,102,241,0.55)]
                                hover:-translate-y-0.5 transition-all duration-200
                            "
                        >
                            <Zap size={16} />
                            Continue using free tools
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <>
            <style>{`
                @keyframes gradient-x {
                    0%,100% { background-position: 0% 50%; }
                    50%     { background-position: 100% 50%; }
                }
                @keyframes spin { to { transform: rotate(360deg); } }
                @keyframes float-heart {
                    0%,100% { transform: translateY(0) scale(1); }
                    50%     { transform: translateY(-10px) scale(1.08); }
                }
                @keyframes orb-pulse {
                    0%,100% { opacity:.15; transform:scale(1); }
                    50%     { opacity:.25; transform:scale(1.08); }
                }
                .gradient-text {
                    background: linear-gradient(135deg,#6366f1,#a855f7,#ec4899);
                    background-size: 200% 200%;
                    animation: gradient-x 4s ease infinite;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .hero-heart { animation: float-heart 3s ease-in-out infinite; }
                .top-bar {
                    height: 3px;
                    background: linear-gradient(90deg,#6366f1,#8b5cf6,#a855f7,#ec4899);
                    background-size: 200%;
                    animation: gradient-x 3s ease infinite;
                }
                .preset-btn-active {
                    background: linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1)) !important;
                }
                .donate-btn {
                    background: linear-gradient(135deg,#6366f1,#8b5cf6);
                    background-size: 200%;
                    transition: all 0.3s ease;
                }
                .donate-btn:hover:not(:disabled) {
                    background-position: right;
                    box-shadow: 0 10px 36px rgba(99,102,241,0.55) !important;
                    transform: translateY(-2px);
                }
                .donate-btn:active:not(:disabled) { transform: translateY(0); }
                .faq-item { transition: all 0.25s ease; }
                .spin { animation: spin 0.75s linear infinite; }
                .orb { animation: orb-pulse 5s ease-in-out infinite; }
            `}</style>

            <div className="min-h-screen bg-[var(--bg-primary)] pb-24 relative overflow-hidden">

                {/* ── Background Orbs ── */}
                <div className="pointer-events-none fixed inset-0 overflow-hidden -z-0">
                    <div className="orb absolute -top-60 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[radial-gradient(ellipse,rgba(99,102,241,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse,rgba(99,102,241,0.18)_0%,transparent_70%)]" />
                    <div className="orb absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(ellipse,rgba(236,72,153,0.08)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse,rgba(236,72,153,0.14)_0%,transparent_70%)]" style={{ animationDelay: '2s' }} />
                    <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" style={{
                        backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }} />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 pt-[clamp(64px,10vh,100px)]">

                    {/* ── Hero ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400">
                            <Sparkles size={13} />
                            <span className="text-[12px] font-bold uppercase tracking-widest">Support Free Software</span>
                        </div>

                        {/* Heart Icon */}
                        <div className="hero-heart w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center mx-auto mb-5 shadow-[0_12px_32px_rgba(99,102,241,0.4)]">
                            <Heart size={30} color="#fff" fill="#fff" />
                        </div>

                        <h1 className="text-[clamp(28px,5vw,48px)] font-black tracking-tight leading-[1.1] mb-4 text-slate-900 dark:text-slate-50">
                            SmartToolsWala is{' '}
                            <span className="gradient-text">sponsored by users like you!</span>
                        </h1>
                        <p className="text-[clamp(15px,2vw,17px)] text-slate-500 dark:text-slate-400 leading-relaxed max-w-[560px] mx-auto mb-3">
                            We provide <strong className="text-slate-700 dark:text-slate-300">100% free tools</strong> — no ads, no watermarks, no signups. Servers aren&apos;t free though. Your contribution keeps this platform alive.
                        </p>
                        <p className="text-[15px] text-slate-400 dark:text-slate-500 font-semibold">Thank you! 🙏</p>

                        {/* Stats row */}
                        <div className="flex flex-wrap justify-center gap-6 mt-8">
                            {[
                                { num: '50+', label: 'Free Tools' },
                                { num: '1M+', label: 'Users Served' },
                                { num: '4.9★', label: 'User Rating' },
                                { num: '₹0', label: 'Cost to You' },
                            ].map(s => (
                                <div key={s.label} className="text-center">
                                    <div className="text-[22px] font-black text-indigo-500 dark:text-indigo-400 tracking-tight">{s.num}</div>
                                    <div className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold mt-0.5 uppercase tracking-wider">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Two-Column Layout ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">

                        {/* ── LEFT: Features + FAQ ── */}
                        <div className="flex flex-col gap-6">

                            {/* Feature Cards */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <h2 className="text-[15px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">What your donation supports</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {FEATURES.map((f, i) => (
                                        <motion.div
                                            key={f.title}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                                            className={`
                                                rounded-2xl p-5 border
                                                ${f.bg} ${f.border}
                                                hover:-translate-y-1 transition-transform duration-200
                                            `}
                                        >
                                            <div className={`${f.color} mb-3`}>{f.icon}</div>
                                            <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-100 mb-1">{f.title}</h3>
                                            <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Buy Me A Coffee (shown in left on desktop) */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                                    <span className="text-[12px] text-slate-400 dark:text-slate-500 font-semibold whitespace-nowrap">Or support with</span>
                                    <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                                </div>
                                <a
                                    href={BMC_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        flex items-center justify-center gap-3
                                        py-4 px-6 rounded-2xl
                                        bg-[#FFDD00] hover:bg-[#ffd000]
                                        border-2 border-[#f0c800]
                                        no-underline
                                        shadow-[0_4px_20px_rgba(255,221,0,0.3)]
                                        hover:shadow-[0_8px_32px_rgba(255,221,0,0.45)]
                                        hover:-translate-y-1
                                        transition-all duration-200
                                        group
                                    "
                                >
                                    <Coffee size={22} color="#000" />
                                    <span className="text-[16px] font-black text-black">Buy me a coffee</span>
                                    <span className="px-2 py-1 rounded-lg bg-black/10 text-[13px] font-bold text-black/70">buymeacoffee.com</span>
                                </a>
                            </motion.div>

                            {/* FAQ */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.35 }}
                                className="
                                    rounded-2xl overflow-hidden
                                    bg-white dark:bg-slate-900/80
                                    border border-slate-200 dark:border-slate-700/60
                                    shadow-sm dark:shadow-black/20
                                "
                            >
                                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                                    <h2 className="text-[14px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Frequently Asked Questions</h2>
                                </div>
                                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {FAQS.map((faq, i) => (
                                        <div key={i} className="faq-item">
                                            <button
                                                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                                className="
                                                    w-full flex items-center justify-between
                                                    px-6 py-4 text-left
                                                    hover:bg-slate-50 dark:hover:bg-slate-800/50
                                                    transition-colors duration-150
                                                    cursor-pointer
                                                "
                                            >
                                                <span className="text-[14px] font-semibold text-slate-800 dark:text-slate-200">{faq.q}</span>
                                                <span className={`text-[20px] font-light text-indigo-500 dark:text-indigo-400 ml-3 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                                            </button>
                                            <AnimatePresence>
                                                {openFaq === i && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="px-6 pb-5 text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                                            {faq.a}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>

                        {/* ── RIGHT: Donation Card (sticky) ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.15 }}
                            className="lg:sticky lg:top-24"
                        >
                            <div className="
                                rounded-[28px] overflow-hidden
                                bg-white dark:bg-slate-900/90
                                border border-slate-200 dark:border-slate-700/60
                                shadow-[0_8px_40px_rgba(99,102,241,0.1)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)]
                                backdrop-blur-xl
                            ">
                                <div className="top-bar" />
                                <div className="p-7">

                                    {/* Card title + amount */}
                                    <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-slate-400 dark:text-slate-500 text-center mb-2">SmartToolsWala Tip</p>
                                    <p className="text-[clamp(36px,6vw,48px)] font-black tracking-tight text-slate-900 dark:text-slate-50 text-center mb-1">
                                        ₹{customAmount || amount}
                                        <span className="text-[24px] text-slate-400 dark:text-slate-500">.00</span>
                                    </p>

                                    {/* Preset chips */}
                                    <div className="flex justify-center gap-2 flex-wrap my-5">
                                        {PRESET_AMOUNTS.map(a => {
                                            const isActive = amount === a && !customAmount;
                                            return (
                                                <button
                                                    key={a}
                                                    onClick={() => { setAmount(a); setCustomAmount(''); }}
                                                    className={`
                                                        px-5 py-2.5 rounded-xl text-[14px] font-bold
                                                        border-2 transition-all duration-150 cursor-pointer
                                                        ${isActive
                                                            ? 'border-indigo-500 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 preset-btn-active'
                                                            : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 hover:border-indigo-300 dark:hover:border-indigo-600 hover:text-indigo-500 dark:hover:text-indigo-400'
                                                        }
                                                    `}
                                                >
                                                    ₹{a}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Custom amount input */}
                                    <div className="
                                        flex items-center gap-3
                                        bg-slate-50 dark:bg-slate-800/60
                                        border-2 border-slate-200 dark:border-slate-700
                                        rounded-2xl px-4 py-3 mb-5
                                        focus-within:border-indigo-400 dark:focus-within:border-indigo-500
                                        transition-colors duration-200
                                    ">
                                        <span className="text-[20px] font-black text-indigo-500 dark:text-indigo-400">₹</span>
                                        <input
                                            type="number"
                                            placeholder="Enter custom amount"
                                            value={customAmount}
                                            onChange={e => setCustomAmount(e.target.value)}
                                            min={1}
                                            max={50000}
                                            className="
                                                flex-1 bg-transparent border-none outline-none
                                                text-[15px] font-bold
                                                text-slate-900 dark:text-slate-100
                                                placeholder:text-slate-400 dark:placeholder:text-slate-500
                                            "
                                        />
                                        <span className="text-[12px] text-slate-400 dark:text-slate-500 font-semibold whitespace-nowrap">or pick above</span>
                                    </div>

                                    {/* Donate button */}
                                    <button
                                        onClick={handleDonate}
                                        disabled={loading}
                                        id="donate-btn"
                                        className="
                                            donate-btn w-full py-5 rounded-2xl
                                            text-white font-black text-[17px]
                                            flex items-center justify-center gap-3
                                            border-none cursor-pointer
                                            shadow-[0_4px_20px_rgba(99,102,241,0.4)]
                                            disabled:opacity-60 disabled:cursor-not-allowed
                                            disabled:transform-none disabled:shadow-none
                                        "
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spin w-5 h-5 rounded-full border-2 border-white/30 border-t-white inline-block" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Heart size={18} fill="currentColor" />
                                                Donate ₹{customAmount || amount} via Razorpay
                                            </>
                                        )}
                                    </button>

                                    {/* Security badges */}
                                    <div className="flex items-center justify-center gap-2 mt-4">
                                        <Lock size={12} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                        <p className="text-[12px] text-emerald-600 dark:text-emerald-400 font-bold">Secure Payment by Razorpay</p>
                                        <Shield size={12} className="text-emerald-500 dark:text-emerald-400 shrink-0" />
                                    </div>
                                    <p className="text-center text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                                        256-bit SSL · UPI, Cards, Net Banking, Wallets
                                    </p>

                                    {/* Payment method pills */}
                                    <div className="flex justify-center gap-2 mt-4 flex-wrap">
                                        {['UPI', 'Visa', 'Mastercard', 'RuPay', 'Net Banking'].map(m => (
                                            <span
                                                key={m}
                                                className="
                                                    px-2.5 py-1 rounded-lg text-[11px] font-bold
                                                    bg-slate-100 dark:bg-slate-800
                                                    text-slate-500 dark:text-slate-400
                                                    border border-slate-200 dark:border-slate-700
                                                "
                                            >
                                                {m}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Policy links */}
                                    <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                                        <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center mb-3">
                                            We do not store card or bank details. Payments processed securely by Razorpay.
                                        </p>
                                        <div className="flex justify-center gap-4 flex-wrap">
                                            {[
                                                { label: 'Privacy Policy', href: '/privacy-policy' },
                                                { label: 'Terms', href: '/terms-and-conditions' },
                                                { label: 'Refund Policy', href: '/cancellation-and-refund' },
                                            ].map(link => (
                                                <a
                                                    key={link.href}
                                                    href={link.href}
                                                    className="
                                                        inline-flex items-center gap-1
                                                        text-[12px] font-semibold no-underline
                                                        text-indigo-500 dark:text-indigo-400
                                                        hover:text-indigo-700 dark:hover:text-indigo-300
                                                        transition-colors
                                                    "
                                                >
                                                    {link.label} <ExternalLink size={10} />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
