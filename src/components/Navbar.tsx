"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Image as ImageIcon, ChevronRight, Home, Wrench, BookOpen, Zap } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
        { name: 'All Tools', href: '/#tools', icon: <Wrench className="w-5 h-5" /> },
        { name: 'Blog', href: '/blog', icon: <BookOpen className="w-5 h-5" /> },
        { name: 'Image Optimizer', href: '/image-optimizer', icon: <Zap className="w-5 h-5" /> },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <Image
                                src="/logo.svg"
                                alt="SmartToolsWala Logo"
                                width={38}
                                height={38}
                                className="rounded-xl group-hover:scale-110 transition-transform duration-300"
                            />
                            <span className="text-xl font-extrabold tracking-tight text-gray-900">
                                SmartTools<span className="text-gradient">Wala</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-2 bg-white/40 backdrop-blur-md px-2 py-1.5 rounded-2xl border border-white/60 shadow-sm">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="px-5 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-xl transition-all duration-200"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex items-center gap-3">
                            <Link
                                href="/compress-image-to-20kb"
                                className="btn-primary"
                                style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '12px' }}
                            >
                                <ImageIcon className="w-4 h-4" />
                                Compress Now
                                <ChevronRight className="w-4 h-4 -ml-1 opacity-70" />
                            </Link>
                        </div>

                        {/* Mobile Hamburger — only on mobile */}
                        <button
                            className="md:hidden p-2 rounded-xl bg-white/50 border border-white/60 text-gray-700 hover:bg-white transition-colors shadow-sm"
                            onClick={() => setIsOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Backdrop — renders outside nav, covers full screen */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Left Drawer — always in DOM, toggled via transform */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '280px',
                    zIndex: 999,
                    backgroundColor: '#ffffff',
                    boxShadow: '4px 0 30px rgba(0,0,0,0.15)',
                    display: 'flex',
                    flexDirection: 'column',
                    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    visibility: isOpen ? 'visible' : 'hidden',
                }}
            >
                {/* Drawer Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', borderBottom: '1px solid #f1f5f9' }}>
                    <Link href="/" onClick={() => setIsOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                        <Image src="/logo.svg" alt="SmartToolsWala Logo" width={32} height={32} style={{ borderRadius: '10px' }} />
                        <span style={{ fontSize: '16px', fontWeight: 800, color: '#111827' }}>
                            SmartTools<span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Wala</span>
                        </span>
                    </Link>
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{ padding: '8px', borderRadius: '10px', border: 'none', background: '#f8fafc', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        aria-label="Close menu"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Nav Links */}
                <nav style={{ flex: 1, padding: '12px', overflowY: 'auto' }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', color: '#374151', fontWeight: 600, fontSize: '15px', borderRadius: '14px', textDecoration: 'none', marginBottom: '4px', transition: 'background 0.15s' }}
                            onMouseEnter={e => (e.currentTarget.style.background = '#eef2ff')}
                            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                            <span style={{ color: '#9ca3af' }}>{link.icon}</span>
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Drawer Footer */}
                <div style={{ padding: '16px', borderTop: '1px solid #f1f5f9' }}>
                    <Link
                        href="/compress-image-to-20kb"
                        onClick={() => setIsOpen(false)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: '14px', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#ffffff', fontWeight: 700, fontSize: '15px', borderRadius: '14px', textDecoration: 'none' }}
                    >
                        <ImageIcon size={18} />
                        Compress Image Free
                    </Link>
                    <p style={{ textAlign: 'center', fontSize: '11px', color: '#9ca3af', marginTop: '10px', fontWeight: 500 }}>No signup · 100% Free · Instant</p>
                </div>
            </div>
        </>
    );
};

export default Navbar;
