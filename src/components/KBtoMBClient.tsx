"use client";
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, RefreshCw, ArrowRight, FileImage, Zap, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

function formatBytes(bytes: number) {
    if (bytes === 0) return '0 B';
    const kb = bytes / 1024;
    const mb = bytes / (1024 * 1024);
    if (mb >= 1) return `${mb.toFixed(3)} MB`;
    return `${kb.toFixed(2)} KB`;
}

export default function KBtoMBClient({ children }: { children?: React.ReactNode }) {
    const [result, setResult] = useState<{ kb: number; mb: number; name: string; type: string } | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const processFile = (file: File) => {
        const kb = file.size / 1024;
        const mb = file.size / (1024 * 1024);
        setResult({ kb, mb, name: file.name, type: file.type });
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
    };


    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #f8faff 0%, #f1f5ff 60%, #faf5ff 100%)', paddingBottom: '80px' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(80px, 12vh, 110px) 16px 0' }}>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: 'center', marginBottom: '40px' }}
                >
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        background: 'linear-gradient(135deg, #ede9fe, #dbeafe)',
                        border: '1px solid #c4b5fd', borderRadius: '100px',
                        padding: '5px 16px', fontSize: '11px', fontWeight: 700,
                        color: '#5b21b6', letterSpacing: '0.06em', textTransform: 'uppercase',
                        marginBottom: '20px'
                    }}>
                        <Zap size={11} /> Free · Instant · No Watermark
                    </span>

                    <h1 style={{
                        fontSize: 'clamp(28px, 5vw, 46px)', fontWeight: 900,
                        color: '#0f172a', lineHeight: 1.1, marginBottom: '16px',
                        letterSpacing: '-0.03em'
                    }}>
                        KB to MB{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}>
                            Image Converter
                        </span>
                    </h1>
                    <p style={{ fontSize: '17px', color: '#64748b', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
                        Instantly convert image KB to MB size. Check your photo, JPG, or PNG exact file size in both KB and MB — no upload to server, 100% private.
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                        {[
                            { label: 'Photo KB to MB', color: '#7c3aed' },
                            { label: 'Image KB to MB', color: '#0ea5e9' },
                            { label: 'JPG KB to MB', color: '#d97706' },
                            { label: 'PNG KB to MB', color: '#059669' },
                        ].map(u => (
                            <span key={u.label} style={{
                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                padding: '6px 14px', borderRadius: '100px',
                                background: '#fff', border: `1px solid ${u.color}22`,
                                fontSize: '12px', fontWeight: 700, color: u.color,
                                boxShadow: `0 2px 8px ${u.color}15`
                            }}>
                                {u.label}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Main Tool Card */}
                <motion.div
                    initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{
                        background: '#fff', borderRadius: '32px',
                        border: '1px solid #e2e8f8',
                        boxShadow: '0 8px 8px -4px rgba(0,0,0,0.04), 0 24px 64px -12px rgba(99,102,241,0.14)',
                        marginBottom: '24px', overflow: 'hidden'
                    }}
                >
                    <div style={{ height: '4px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #ec4899)' }} />
                    <div style={{ padding: 'clamp(20px, 4vw, 36px)' }}>


                        <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', marginBottom: '12px' }}>
                            📁 Upload Image to Check KB &amp; MB Size
                        </h2>
                        <AnimatePresence mode="wait">
                            {!result ? (
                                <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                    <div
                                        onClick={() => inputRef.current?.click()}
                                        onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                                        onDragLeave={() => setIsDragging(false)}
                                        onDrop={handleDrop}
                                        style={{
                                            border: `2px dashed ${isDragging ? '#6366f1' : '#e2e8f0'}`,
                                            borderRadius: '20px', background: isDragging ? '#f5f3ff' : '#fafbff',
                                            padding: '48px 24px', textAlign: 'center', cursor: 'pointer',
                                            transition: 'all 0.25s ease'
                                        }}
                                    >
                                        <input ref={inputRef} type="file" hidden accept="image/*" onChange={e => { if (e.target.files?.[0]) processFile(e.target.files[0]); }} />
                                        <div style={{
                                            width: '72px', height: '72px', borderRadius: '22px',
                                            margin: '0 auto 18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            background: 'linear-gradient(135deg, #ede9fe, #dbeafe)',
                                            boxShadow: '0 12px 28px rgba(99,102,241,0.18)'
                                        }}>
                                            <Upload size={30} color="#5b21b6" strokeWidth={1.6} />
                                        </div>
                                        <p style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>
                                            Drop your image here
                                        </p>
                                        <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
                                            JPG, PNG, WebP supported · Result shown instantly
                                        </p>
                                        <button style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '8px',
                                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                            color: '#fff', border: 'none', borderRadius: '14px',
                                            padding: '13px 28px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                                            boxShadow: '0 4px 16px rgba(99,102,241,0.38)'
                                        }}>
                                            <FileImage size={16} /> Browse File
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                    <div style={{
                                        background: 'linear-gradient(135deg, #f5f3ff, #ede9fe)',
                                        borderRadius: '20px', padding: '28px', border: '1px solid #c4b5fd'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                                            <div style={{
                                                width: '48px', height: '48px', borderRadius: '14px',
                                                background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                boxShadow: '0 4px 12px rgba(99,102,241,0.15)'
                                            }}>
                                                <FileImage size={22} color="#6366f1" />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: '15px', fontWeight: 800, color: '#1e293b' }}>{result.name}</p>
                                                <p style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: 600 }}>{result.type}</p>
                                            </div>
                                        </div>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                            {[
                                                { label: 'Size in KB', value: `${result.kb.toFixed(2)} KB` },
                                                { label: 'Size in MB', value: `${result.mb.toFixed(4)} MB` },
                                            ].map(s => (
                                                <div key={s.label} style={{
                                                    background: '#fff', borderRadius: '14px',
                                                    padding: '18px 20px', border: '1px solid #e0d9fb'
                                                }}>
                                                    <p style={{ fontSize: '12px', color: '#8b5cf6', fontWeight: 700, marginBottom: '6px' }}>{s.label}</p>
                                                    <p style={{ fontSize: '22px', fontWeight: 900, color: '#3730a3' }}>{s.value}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => { setResult(null); }}
                                            style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                marginTop: '18px', padding: '10px 20px', borderRadius: '12px',
                                                border: '1px solid #c4b5fd', background: '#fff',
                                                fontSize: '13px', fontWeight: 700, color: '#7c3aed', cursor: 'pointer'
                                            }}
                                        >
                                            <RefreshCw size={13} /> Check Another File
                                        </button>
                                    </div>

                                    {/* CTA to compress if big */}
                                    {result.kb > 100 && (
                                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                            style={{
                                                marginTop: '16px', background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                                                border: '1px solid #bfdbfe', borderRadius: '16px', padding: '20px 24px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'
                                            }}>
                                            <div>
                                                <p style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '15px' }}>File is {result.kb.toFixed(0)} KB — Want to compress it?</p>
                                                <p style={{ fontSize: '13px', color: '#3b82f6', marginTop: '2px' }}>Use our free image compressor to reduce it to 20KB, 50KB, or 100KB</p>
                                            </div>
                                            <Link href="/mb-to-kb-image-converter" style={{
                                                display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                background: '#2563eb', color: '#fff', padding: '10px 20px',
                                                borderRadius: '12px', fontSize: '14px', fontWeight: 700, textDecoration: 'none'
                                            }}>
                                                Compress Now <ArrowRight size={14} />
                                            </Link>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Trust bar */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                    style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', marginBottom: '40px' }}>
                    {[
                        { icon: <ShieldCheck size={16} />, text: '100% Private — No Upload to Server' },
                        { icon: <Zap size={16} />, text: 'Instant Result' },
                        { icon: <FileImage size={16} />, text: 'JPG, PNG, WebP' },
                    ].map(t => (
                        <span key={t.text} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            padding: '8px 16px', borderRadius: '100px', background: '#fff',
                            border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 600, color: '#475569',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
                        }}>
                            {t.icon} {t.text}
                        </span>
                    ))}
                </motion.div>
                {/* Children — SEO Article & FAQs */}
                {children && (
                    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 16px 40px' }}>
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}
