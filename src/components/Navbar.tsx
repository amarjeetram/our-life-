"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Image as ImageIcon, ChevronRight, Home, Wrench, BookOpen, Heart, Search, Compass, FileText, Instagram } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);

    // Global Search States
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [blogPosts, setBlogPosts] = useState<{ slug: string; title: string; description: string; type: 'blog'; externalLink?: string }[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Fetch blog posts on open
    useEffect(() => {
        if (isSearchOpen && blogPosts.length === 0) {
            fetch('/api/blog-posts')
                .then(res => res.json())
                .then(data => {
                    if (data && data.posts) {
                        setBlogPosts(data.posts);
                    }
                })
                .catch(err => console.error("Error loading blog posts for search:", err));
        }
    }, [isSearchOpen, blogPosts.length]);

    // Handle selection reset on query change
    useEffect(() => {
        setSelectedIndex(0);
    }, [searchQuery]);

    // Filter results
    const searchResults = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return [];

        const filteredTools = TOOLS.filter(t => 
            t.title.toLowerCase().includes(query) ||
            t.desc.toLowerCase().includes(query) ||
            t.category.toLowerCase().includes(query)
        );

        const filteredBlogs = blogPosts.filter(b => 
            b.title.toLowerCase().includes(query) ||
            b.description.toLowerCase().includes(query)
        );

        return [...filteredTools, ...filteredBlogs];
    }, [searchQuery, blogPosts]);

    // Keyboard navigation
    useEffect(() => {
        if (!isSearchOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsSearchOpen(false);
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % Math.max(1, searchResults.length));
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + searchResults.length) % Math.max(1, searchResults.length));
            } else if (e.key === 'Enter') {
                if (searchResults[selectedIndex]) {
                    e.preventDefault();
                    const target = searchResults[selectedIndex];
                    setIsSearchOpen(false);
                    // Navigate
                    if (target.type === 'tool') {
                        window.location.href = target.route;
                    } else {
                        window.location.href = target.externalLink || `/blog/${target.slug}`;
                    }
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSearchOpen, searchResults, selectedIndex]);

    const handleLoginClick = () => {
        toast.dismiss(); // Clear any existing toasts to prevent stacking
        toast("Login system is under development. Coming soon! 🚀", {
            id: 'login-toast', // Fixed ID to overwrite instead of creating new toast instances
            duration: 3000,    // Set duration to 3 seconds
            icon: '🔒',
            style: {
                borderRadius: '12px',
                background: '#334155',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '600',
                lineHeight: '1.5',
                padding: '12px 18px',
            }
        });
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden'; // Lock HTML tag too
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', href: '/', icon: <Home className="w-5 h-5" /> },
        {
            name: 'All Tools',
            isDropdown: true,
            icon: <Wrench className="w-5 h-5" />,
            subItems: [
                { name: 'Image Tools', href: '/image-tools' },
                { name: 'YouTube Tools', href: '/youtube-tools' },
                { name: 'Instagram Tools', href: '/instagram-tools' },
                { name: 'Govt Exam Tools', href: '/govt-exam-tools' },
                { name: 'Calculators', href: '/calculators' },
                { name: 'Unit Converters', href: '/unit-converters' },
                { name: 'Date & Time Tools', href: '/date-time-tools' },
                { name: 'Generators', href: '/generators' },
                { name: 'Other Tools', href: '/other-tools' },
            ]
        },
        { name: 'Blog', href: '/blog', icon: <BookOpen className="w-5 h-5" /> },
        { name: 'Instagram Bio', href: '/instagram-tools', icon: <Instagram className="w-5 h-5" /> },
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3 group">
                            <Image
                                src="/logo.svg"
                                alt="SmartToolsWala Logo"
                                width={38}
                                height={38}
                                priority
                                className="rounded-xl group-hover:scale-110 transition-transform duration-300"
                            />
                            <span className="text-[1.1rem] sm:text-xl font-extrabold tracking-tight text-gray-900">
                                SmartTools<span className="text-gradient">Wala</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-2 bg-white/40 backdrop-blur-md px-2 py-1.5 rounded-2xl border border-white/60 shadow-sm relative">
                            {navLinks.map((link) => (
                                link.isDropdown ? (
                                    <div
                                        key={link.name}
                                        className="relative"
                                        onMouseEnter={() => setIsToolsDropdownOpen(true)}
                                        onMouseLeave={() => setIsToolsDropdownOpen(false)}
                                    >
                                        <button suppressHydrationWarning className="px-5 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-xl transition-all duration-200 flex items-center gap-1">
                                            {link.name}
                                            <svg className={`w-4 h-4 transition-transform duration-200 ${isToolsDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                        </button>

                                        {/* Dropdown Menu */}
                                        <div
                                            className={`absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden transition-all duration-200 origin-top-left ${isToolsDropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
                                            style={{ zIndex: 1000 }}
                                        >
                                            <div className="py-2">
                                                {link.subItems?.map(sub => (
                                                    <Link
                                                        key={sub.name}
                                                        href={sub.href}
                                                        className="block px-4 py-2 text-sm text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 font-medium transition-colors"
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        key={link.name}
                                        href={link.href || '#'}
                                        className="px-5 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-white/80 rounded-xl transition-all duration-200"
                                    >
                                        {link.name}
                                    </Link>
                                )
                            ))}
                            {/* Desktop Search Icon Button */}
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                suppressHydrationWarning
                                className="px-3.5 py-2 text-gray-500 hover:text-indigo-600 hover:bg-white/80 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0 border border-transparent hover:border-slate-100"
                                aria-label="Search site"
                                title="Search tools and blogs"
                            >
                                <Search className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex items-center gap-2">
                            <button
                                onClick={handleLoginClick}
                                className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all duration-200 border border-slate-200 shadow-sm cursor-pointer"
                            >
                                Login
                            </button>
                            <button
                                onClick={handleLoginClick}
                                className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-all duration-200 shadow-sm shadow-indigo-100 cursor-pointer"
                            >
                                Sign Up
                            </button>
                        </div>

                        {/* Mobile Hamburger — only on mobile */}
                        <button
                            suppressHydrationWarning
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
                        <span style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>
                            SmartTools<span style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Wala</span>
                        </span>
                    </Link>
                    <button
                        suppressHydrationWarning
                        onClick={() => setIsOpen(false)}
                        style={{ padding: '8px', borderRadius: '10px', border: 'none', background: '#f8fafc', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        aria-label="Close menu"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Mobile Search Input Button */}
                <div style={{ padding: '12px 12px 0 12px' }}>
                    <button
                        onClick={() => { setIsOpen(false); setIsSearchOpen(true); }}
                        suppressHydrationWarning
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            width: '100%',
                            padding: '12px 16px',
                            background: '#f1f5f9',
                            border: 'none',
                            borderRadius: '14px',
                            color: '#64748b',
                            fontWeight: 600,
                            fontSize: '14px',
                            cursor: 'pointer',
                            textAlign: 'left'
                        }}
                    >
                        <Search size={18} />
                        Search tools & blogs...
                    </button>
                </div>

                {/* Nav Links */}
                <nav style={{ flex: 1, padding: '12px', overflowY: 'auto' }}>
                    {navLinks.map((link) => (
                        <div key={link.name}>
                            {link.isDropdown ? (
                                <div>
                                    <div
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', color: '#374151', fontWeight: 600, fontSize: '15px', borderRadius: '14px', cursor: 'default', marginBottom: '4px', background: '#f8fafc' }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{ color: '#9ca3af' }}>{link.icon}</span>
                                            {link.name}
                                        </div>
                                    </div>
                                    {/* Mobile Submenu Items */}
                                    <div style={{ paddingLeft: '24px', marginBottom: '8px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                        {link.subItems?.map(sub => (
                                            <Link
                                                key={sub.name}
                                                href={sub.href}
                                                onClick={() => setIsOpen(false)}
                                                style={{ display: 'flex', alignItems: 'center', padding: '10px 16px', color: '#475569', fontWeight: 500, fontSize: '14px', borderRadius: '10px', textDecoration: 'none', transition: 'background 0.15s' }}
                                                onMouseEnter={e => (e.currentTarget.style.background = '#eef2ff')}
                                                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                            >
                                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#cbd5e1', marginRight: '10px' }}></div>
                                                {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href={link.href || '#'}
                                    onClick={() => setIsOpen(false)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', color: '#374151', fontWeight: 600, fontSize: '15px', borderRadius: '14px', textDecoration: 'none', marginBottom: '4px', transition: 'background 0.15s' }}
                                    onMouseEnter={e => (e.currentTarget.style.background = '#eef2ff')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                >
                                    <span style={{ color: '#9ca3af' }}>{link.icon}</span>
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                {/* Drawer Footer */}
                <div style={{ padding: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={() => { setIsOpen(false); handleLoginClick(); }}
                            style={{ flex: 1, padding: '12px', background: '#f8fafc', color: '#475569', fontWeight: 700, fontSize: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', cursor: 'pointer' }}
                        >
                            Login
                        </button>
                        <button
                            onClick={() => { setIsOpen(false); handleLoginClick(); }}
                            style={{ flex: 1, padding: '12px', background: '#4f46e5', color: '#ffffff', fontWeight: 700, fontSize: '14px', borderRadius: '12px', border: 'none', cursor: 'pointer' }}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>

            {/* Global Search Modal Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4 sm:px-6">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSearchOpen(false)}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        
                        {/* Modal Dialog */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden flex flex-col max-h-[70vh] z-[201]"
                        >
                            {/* Search Header */}
                            <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 bg-slate-50/50">
                                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Search tools and blog posts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                    suppressHydrationWarning
                                    className="w-full bg-transparent text-[15px] text-slate-800 placeholder-slate-400 font-medium focus:outline-none"
                                />
                                <button
                                    onClick={() => setIsSearchOpen(false)}
                                    suppressHydrationWarning
                                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors cursor-pointer text-xs font-bold shrink-0"
                                >
                                    ESC
                                </button>
                            </div>

                            {/* Search Results */}
                            <div className="flex-1 overflow-y-auto p-3 space-y-4">
                                {!searchQuery ? (
                                    <div className="text-center py-12 text-slate-400 font-medium text-sm">
                                        <Compass className="w-10 h-10 mx-auto mb-3 text-slate-300 animate-pulse" />
                                        <p>Type to search all utilities and guides...</p>
                                    </div>
                                ) : searchResults.length === 0 ? (
                                    <div className="text-center py-12 text-slate-400 font-medium text-sm">
                                        <FileText className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                                        <p>No results found matching "{searchQuery}"</p>
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        {searchResults.map((item, idx) => {
                                            const isSelected = idx === selectedIndex;
                                            const isTool = item.type === 'tool';
                                            
                                            return (
                                                <Link
                                                    key={isTool ? item.route : item.slug}
                                                    href={isTool ? item.route : (item.externalLink || `/blog/${item.slug}`)}
                                                    onClick={() => setIsSearchOpen(false)}
                                                    onMouseEnter={() => setSelectedIndex(idx)}
                                                    className={`flex items-start justify-between gap-4 px-4 py-3 rounded-2xl transition-all border text-left
                                                        ${isSelected 
                                                            ? 'bg-indigo-50/80 border-indigo-100/60 shadow-sm' 
                                                            : 'bg-transparent border-transparent'
                                                        }
                                                    `}
                                                >
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md border
                                                                ${isTool 
                                                                    ? 'bg-indigo-50 border-indigo-100 text-indigo-600' 
                                                                    : 'bg-pink-50 border-pink-100 text-pink-600'
                                                                }
                                                            `}>
                                                                {isTool ? 'Tool' : 'Blog'}
                                                            </span>
                                                            <span className="font-extrabold text-[15px] text-slate-800 leading-tight">
                                                                {item.title}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-slate-500 font-medium line-clamp-1">
                                                            {item.type === 'tool' ? item.desc : item.description}
                                                        </p>
                                                    </div>
                                                    <ChevronRight className={`w-4 h-4 mt-1 shrink-0 transition-transform duration-200
                                                        ${isSelected ? 'translate-x-1 text-indigo-500' : 'text-slate-300'}
                                                    `} />
                                                </Link>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Search Footer */}
                            <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-[11px] text-slate-400 font-semibold select-none">
                                <div className="flex items-center gap-3">
                                    <span>↑↓ to navigate</span>
                                    <span>↵ to select</span>
                                </div>
                                <span>Search index updated hourly</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;

const TOOLS = [
    { title: 'Image Compressor to 20KB', desc: 'Compress images to exactly 20KB online.', route: '/image-compressor-to-20kb', type: 'tool' as const, category: 'Image Tools' },
    { title: 'Resize Image to 15KB', desc: 'Resize image to 15KB with customized width & height.', route: '/image-tools/resize-image-to-15kb', type: 'tool' as const, category: 'Image Tools' },
    { title: 'Resize Image to 20KB', desc: 'Resize image to exactly 20KB.', route: '/image-tools/resize-image-to-20kb', type: 'tool' as const, category: 'Image Tools' },
    { title: 'Resize Image to 30KB', desc: 'Resize image to exactly 30KB.', route: '/image-tools/resize-image-to-30kb', type: 'tool' as const, category: 'Image Tools' },
    { title: 'Resize Image to 100KB', desc: 'Resize image to exactly 100KB.', route: '/image-tools/resize-image-to-100kb', type: 'tool' as const, category: 'Image Tools' },
    { title: 'Resize Image to 200KB', desc: 'Resize image to exactly 200KB.', route: '/image-tools/resize-image-to-200kb', type: 'tool' as const, category: 'Image Tools' },
    { title: 'Photo Compressor to 30KB', desc: 'Compress passport photos or images to 30KB.', route: '/photo-compressor-to-30kb', type: 'tool' as const, category: 'Image Tools' },
    { title: 'Compress Image to 50KB', desc: 'Compress JPEG, PNG images to 50KB.', route: '/compress-image-to-50kb', type: 'tool' as const, category: 'Image Tools' },
    { title: 'Compress Image to 100KB', desc: 'Compress image size to 100KB.', route: '/compress-image-to-100kb', type: 'tool' as const, category: 'Image Tools' },
    { title: 'Compress Image to 200KB', desc: 'Compress image size to 200KB.', route: '/compress-image-to-200kb', type: 'tool' as const, category: 'Image Tools' },
    { title: 'MB to KB Image Converter', desc: 'Convert image files from Megabytes to Kilobytes.', route: '/mb-to-kb-image-converter', type: 'tool' as const, category: 'Image Tools' },
    { title: 'KB to MB Image Converter', desc: 'Convert image files from Kilobytes to Megabytes.', route: '/kb-to-mb-image-converter', type: 'tool' as const, category: 'Image Tools' },
    { title: 'Signature Resize & Compressor', desc: 'Resize signature image for government applications.', route: '/govt-exam-tools/signature-resize', type: 'tool' as const, category: 'Govt Exam Tools' },
    { title: 'SSC Signature Resizer', desc: 'Crop and resize signature image specifically for SSC exams.', route: '/govt-exam-tools/ssc-signature-resize', type: 'tool' as const, category: 'Govt Exam Tools' },
    { title: 'RRB Signature Resizer', desc: 'Resize signature photo for RRB exams.', route: '/govt-exam-tools/rrb-signature-resizer', type: 'tool' as const, category: 'Govt Exam Tools' },
    { title: 'NEET Photo Resizer', desc: 'Resize photo and signature according to NEET specs.', route: '/govt-exam-tools/neet-photo-resizer', type: 'tool' as const, category: 'Govt Exam Tools' },
    { title: 'UPSC Photo & Signature Resize', desc: 'Resize photograph and signature for UPSC online application.', route: '/govt-exam-tools/upsc-photo-resize', type: 'tool' as const, category: 'Govt Exam Tools' },
    { title: 'UTI Photo Resizer', desc: 'Resize photo for UTI PAN card portal.', route: '/govt-exam-tools/uti-photo-resize', type: 'tool' as const, category: 'Govt Exam Tools' },
    { title: 'PAN Card Photo & Signature Resizer', desc: 'Resize photo and signature for NSDL / UTI PAN card.', route: '/govt-exam-tools/pan-card-photo-resize', type: 'tool' as const, category: 'Govt Exam Tools' },
    { title: 'TNPSC Photo & Signature Compressor', desc: 'Compress photo according to TNPSC guidelines.', route: '/govt-exam-tools/tnpsc-photo-compressor', type: 'tool' as const, category: 'Govt Exam Tools' },
    { title: 'GDS Photo & Signature Resizer', desc: 'Resize images for Gramin Dak Sevak application.', route: '/govt-exam-tools/gds-photo-resize', type: 'tool' as const, category: 'Govt Exam Tools' },
    { title: 'Add Name and Date to Photo', desc: 'Add name badge and date overlay to passport photos.', route: '/govt-exam-tools/add-name-date', type: 'tool' as const, category: 'Govt Exam Tools' },
    { title: 'Instagram Bio Generator', desc: 'Create custom stylish bios for your Instagram profile.', route: '/instagram-tools/instagram-bio-generator', type: 'tool' as const, category: 'Instagram Tools' },
    { title: 'Stylish Couple Name Maker', desc: 'Generate unique couple names with meaning.', route: '/stylish-couple-name-maker', type: 'tool' as const, category: 'Love Tools' },
    { title: 'Ship Name Generator', desc: 'Blend two names to find the perfect relationship ship name.', route: '/love-tools/ship-name-generator', type: 'tool' as const, category: 'Love Tools' },
    { title: 'Love Percentage Calculator', desc: 'Calculate love match percentage by name.', route: '/calculators/fun/love-percentage-calculator-by-name', type: 'tool' as const, category: 'Calculators' },
    { title: 'Flames Calculator', desc: 'Play the classic flames game with your partner\'s name.', route: '/calculators/fun/flames-calculator', type: 'tool' as const, category: 'Calculators' },
    { title: 'YouTube Tag Extractor', desc: 'Extract hidden tags from any YouTube video.', route: '/youtube-tag-extractor', type: 'tool' as const, category: 'YouTube Tools' },
    { title: 'YouTube Description Extractor', desc: 'Extract description text from a YouTube video.', route: '/youtube-description-extractor', type: 'tool' as const, category: 'YouTube Tools' },
    { title: 'YouTube Title Extractor', desc: 'Extract the title of a YouTube video.', route: '/youtube-title-extractor', type: 'tool' as const, category: 'YouTube Tools' },
    { title: 'Band Name Generator', desc: 'Find unique names for your music band.', route: '/generators/band-name-generator', type: 'tool' as const, category: 'Generators' },
    { title: 'Elf Name Generator', desc: 'Generate magical and fantasy elf names.', route: '/generators/elf-name-generator', type: 'tool' as const, category: 'Generators' },
    { title: 'Podcast Name Generator', desc: 'Generate creative name suggestions for your podcast.', route: '/generators/podcast-name-generator', type: 'tool' as const, category: 'Generators' },
    { title: 'Warrior Cat Name Generator', desc: 'Create warrior cat names with suffix & prefix.', route: '/generators/warrior-cat-name-generator', type: 'tool' as const, category: 'Generators' },
    { title: 'Random Object Generator', desc: 'Generate random objects for games, brainstorming, or writing.', route: '/other-tools/random-object-generator', type: 'tool' as const, category: 'Other Tools' },
    { title: 'GPA to CGPA Calculator', desc: 'Convert GPA out of 10 or 4 to CGPA.', route: '/gpa-to-cgpa-calculator', type: 'tool' as const, category: 'Calculators' },
    { title: 'CGPA Calculator', desc: 'Calculate semester or college CGPA.', route: '/cgpa-calculator', type: 'tool' as const, category: 'Calculators' },
    { title: 'Percentage to CGPA Calculator', desc: 'Convert marks percentage to CGPA scale.', route: '/percentage-to-cgpa-calculator', type: 'tool' as const, category: 'Calculators' },
    { title: 'SGPA to CGPA Calculator', desc: 'Convert SGPA scores to cumulative CGPA.', route: '/sgpa-to-cgpa-calculator', type: 'tool' as const, category: 'Calculators' },
    { title: 'Anna University CGPA Calculator', desc: 'Calculate CGPA according to Anna University standards.', route: '/anna-university-cgpa-calculator', type: 'tool' as const, category: 'Calculators' },
    { title: 'IPU CGPA Calculator', desc: 'Calculate CGPA according to IP University standards.', route: '/ipu-cgpa-calculator', type: 'tool' as const, category: 'Calculators' },
    { title: 'KTU CGPA Calculator', desc: 'KTU CGPA and SGPA grading calculator.', route: '/ktu-cgpa-calculator', type: 'tool' as const, category: 'Calculators' },
    { title: 'SRM CGPA Calculator', desc: 'Calculate CGPA for SRM University courses.', route: '/srm-cgpa-calculator', type: 'tool' as const, category: 'Calculators' },
    { title: 'VIT CGPA Calculator', desc: 'Calculate CGPA for VIT University.', route: '/vit-cgpa-calculator', type: 'tool' as const, category: 'Calculators' },
    { title: 'VTU CGPA Calculator', desc: 'Calculate CGPA for VTU University.', route: '/vtu-cgpa-calculator', type: 'tool' as const, category: 'Calculators' }
];
