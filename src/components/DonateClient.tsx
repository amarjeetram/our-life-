"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, Coffee, Zap, Shield, Star, CheckCircle2, Lock, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

const PRESET_AMOUNTS = [49, 99, 199, 499];
const BMC_URL = 'https://buymeacoffee.com/smarttoolswala';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function DonateClient() {
    const [amount, setAmount] = useState<number>(99);
    const [customAmount, setCustomAmount] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [donated, setDonated] = useState(false);
    const [donatedAmount, setDonatedAmount] = useState<number>(0);

    // ── Double-Submit Prevention ──────────────────────────────────────────
    // Tracks if a payment attempt is already in flight. Reset only on failure.
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
        // ── Guard: prevent double-submit ─────────────────────────────────
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

            // ── Step 1: Create Order (backend) ────────────────────────────
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

            // ── Step 2: Open Razorpay Checkout ────────────────────────────
            const options = {
                key: keyId,                                   // Public key only
                amount: Math.round(finalAmount * 100),
                currency: 'INR',
                name: 'SmartToolsWala',
                description: `Donation of Rs.${finalAmount} - Thank you!`,
                order_id: orderId,
                image: '/favicon.ico',

                // ── Step 3: Server-Side Verification ─────────────────────
                // Called by Razorpay after payment success on their end.
                // We MUST verify the signature server-side before trusting this.
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
                            // Verification passed! Payment is genuine.
                            setDonatedAmount(finalAmount);
                            setDonated(true);
                            toast.success('🎉 Thank you for your donation! You are amazing!');
                        } else {
                            // Signature mismatch — reject silently on UI, log server-side
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
            <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f8faff 0%, #f0f4ff 60%, #faf5ff 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ background: '#fff', borderRadius: '28px', padding: '48px 40px', textAlign: 'center', maxWidth: '480px', width: '100%', boxShadow: '0 20px 60px rgba(99,102,241,0.15)', border: '1px solid #e2e8f0' }}
                >
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 12px 32px rgba(99,102,241,0.35)' }}>
                        <Heart size={36} color="#fff" fill="#fff" />
                    </div>
                    <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', marginBottom: '12px', letterSpacing: '-0.02em' }}>Thank you so much! 🙏</h1>
                    <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, marginBottom: '28px' }}>
                        Your donation of <strong style={{ color: '#6366f1' }}>₹{donatedAmount}</strong> helps us keep SmartToolsWala free for everyone. You are amazing!
                    </p>
                    {/* Verified badge */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '10px 16px', marginBottom: '24px' }}>
                        <CheckCircle2 size={16} color="#16a34a" />
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#16a34a' }}>Payment Verified &amp; Secured by Razorpay</span>
                    </div>
                    <motion.a
                        href="/"
                        whileHover={{ scale: 1.03 }}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '16px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', textDecoration: 'none', fontSize: '15px', fontWeight: 700, boxShadow: '0 4px 16px rgba(99,102,241,0.38)' }}
                    >
                        <Zap size={16} /> Continue using free tools
                    </motion.a>
                </motion.div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f8faff 0%, #f0f4ff 60%, #faf5ff 100%)', paddingBottom: '80px' }}>
            <div style={{ maxWidth: '680px', margin: '0 auto', padding: 'clamp(90px, 12vh, 120px) 16px 0' }}>

                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '36px' }}
                >
                    <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 12px 32px rgba(99,102,241,0.3)' }}>
                        <Heart size={32} color="#fff" fill="#fff" />
                    </div>
                    <h1 style={{ fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em', marginBottom: '14px', lineHeight: 1.1 }}>
                        SmartToolsWala is{' '}
                        <span style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            sponsored by users like you!
                        </span>
                    </h1>
                    <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto' }}>
                        We provide <strong>100% free tools</strong> with no ads, no watermarks, and no signups. Running servers is expensive. Your contribution helps us keep this service free and add new features.
                    </p>
                    <p style={{ fontSize: '15px', color: '#475569', marginTop: '12px', fontWeight: 600 }}>Thank you! 🙏</p>
                </motion.div>

                {/* Main Donate Card */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{ background: '#fff', borderRadius: '28px', border: '1px solid #e2e8f0', boxShadow: '0 8px 32px rgba(99,102,241,0.12)', overflow: 'hidden', marginBottom: '20px' }}
                >
                    <div style={{ height: '4px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)' }} />
                    <div style={{ padding: 'clamp(24px, 5vw, 40px)' }}>

                        <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', textAlign: 'center', marginBottom: '6px' }}>SmartToolsWala Tip</p>
                        <p style={{ fontSize: 'clamp(32px, 6vw, 44px)', fontWeight: 900, color: '#0f172a', textAlign: 'center', letterSpacing: '-0.03em', marginBottom: '4px' }}>
                            ₹{customAmount || amount}.00
                        </p>

                        {/* Preset amounts */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', margin: '20px 0' }}>
                            {PRESET_AMOUNTS.map(a => (
                                <button
                                    key={a}
                                    onClick={() => { setAmount(a); setCustomAmount(''); }}
                                    style={{
                                        padding: '10px 20px', borderRadius: '12px', fontSize: '14px', fontWeight: 700,
                                        border: (amount === a && !customAmount) ? '2px solid #6366f1' : '2px solid #e2e8f0',
                                        background: (amount === a && !customAmount) ? 'linear-gradient(135deg, #ede9fe, #dbeafe)' : '#f8fafc',
                                        color: (amount === a && !customAmount) ? '#4f46e5' : '#64748b',
                                        cursor: 'pointer', transition: 'all 0.15s',
                                    }}
                                >₹{a}</button>
                            ))}
                        </div>

                        {/* Custom amount */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', padding: '10px 16px', marginBottom: '24px' }}>
                            <span style={{ fontSize: '18px', fontWeight: 800, color: '#6366f1' }}>₹</span>
                            <input
                                type="number"
                                placeholder="Enter custom amount"
                                value={customAmount}
                                onChange={e => setCustomAmount(e.target.value)}
                                min={1}
                                max={50000}
                                style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '15px', fontWeight: 700, color: '#0f172a', outline: 'none' }}
                            />
                            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600 }}>or choose above</span>
                        </div>

                        {/* Donate button */}
                        <motion.button
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            onClick={handleDonate}
                            disabled={loading}
                            id="donate-btn"
                            style={{
                                width: '100%', padding: '18px', borderRadius: '16px',
                                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                color: '#fff', border: 'none', fontSize: '17px', fontWeight: 800,
                                cursor: loading ? 'not-allowed' : 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                                boxShadow: '0 4px 20px rgba(99,102,241,0.4)', transition: 'opacity 0.2s',
                                opacity: loading ? 0.75 : 1, letterSpacing: '-0.01em',
                            }}
                        >
                            {loading ? (
                                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.75s linear infinite', display: 'inline-block' }} />
                                    Processing...
                                </span>
                            ) : (
                                <>
                                    <Heart size={18} fill="currentColor" />
                                    Donate ₹{customAmount || amount} via Razorpay
                                </>
                            )}
                        </motion.button>

                        {/* Secure payment badge */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '14px' }}>
                            <Lock size={13} color="#16a34a" />
                            <p style={{ textAlign: 'center', fontSize: '12px', color: '#16a34a', fontWeight: 700, margin: 0 }}>
                                Secure Payment by Razorpay
                            </p>
                            <Shield size={13} color="#16a34a" />
                        </div>
                        <p style={{ textAlign: 'center', fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
                            256-bit SSL · UPI, Cards, Net Banking, Wallets accepted · Payments verified server-side
                        </p>

                        {/* Payment method icons */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '14px', flexWrap: 'wrap' }}>
                            {['UPI', 'Visa', 'Mastercard', 'RuPay', 'Net Banking'].map(m => (
                                <span key={m} style={{ padding: '4px 10px', borderRadius: '6px', background: '#f1f5f9', fontSize: '11px', fontWeight: 700, color: '#64748b', border: '1px solid #e2e8f0' }}>{m}</span>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                    <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                    <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap' }}>Or donate with</span>
                    <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
                </div>

                {/* Buy Me a Coffee */}
                <motion.a
                    href={BMC_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px',
                        background: '#FFDD00', border: '2px solid #f0c800',
                        borderRadius: '20px', padding: '18px 24px', textDecoration: 'none',
                        boxShadow: '0 4px 20px rgba(255,221,0,0.35)', marginBottom: '24px',
                        transition: 'all 0.2s',
                    }}
                >
                    <Coffee size={24} color="#000" />
                    <span style={{ fontSize: '17px', fontWeight: 800, color: '#000' }}>Buy me a coffee</span>
                    <span style={{ padding: '4px 12px', borderRadius: '8px', background: 'rgba(0,0,0,0.08)', fontSize: '14px', fontWeight: 700, color: '#000' }}>buymeacoffee.com</span>
                </motion.a>

                {/* Why section */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    style={{ background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', marginBottom: '24px' }}
                >
                    <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>What your donation supports 💡</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            { icon: <Zap size={16} />, text: 'Server costs for fast image compression' },
                            { icon: <Shield size={16} />, text: 'Privacy — we never store your files' },
                            { icon: <Star size={16} />, text: 'Building new free tools for Indian students' },
                            { icon: <CheckCircle2 size={16} />, text: 'Keeping all tools 100% free, no paywalls' },
                        ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <span style={{ color: '#6366f1', flexShrink: 0 }}>{item.icon}</span>
                                <span style={{ fontSize: '14px', color: '#475569', fontWeight: 500 }}>{item.text}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Policy Links — Trust Footer */}
                <div style={{ textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
                    <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '10px' }}>
                        We do not store card or bank details. Payments are processed securely by Razorpay.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        {[
                            { label: 'Privacy Policy', href: '/privacy-policy' },
                            { label: 'Terms & Conditions', href: '/terms-and-conditions' },
                            { label: 'Refund Policy', href: '/cancellation-and-refund' },
                        ].map(link => (
                            <a
                                key={link.href}
                                href={link.href}
                                style={{ fontSize: '12px', color: '#6366f1', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}
                            >
                                {link.label} <ExternalLink size={10} />
                            </a>
                        ))}
                    </div>
                </div>

                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
        </div>
    );
}
