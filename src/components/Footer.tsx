import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Instagram, Youtube, Mail, ArrowRight, ShieldCheck, Zap, Star, Globe, BookOpen, Heart } from 'lucide-react';

const CATEGORIES = [
    { name: '🤖 AI Directory', href: '/directory' },
    { name: 'Image Tools', href: '/image-tools' },
    { name: 'Govt Exam Tools', href: '/govt-exam-tools' },
    { name: 'YouTube Tools', href: '/youtube-tools' },
    { name: 'Instagram Tools', href: '/instagram-tools' },
    { name: 'Calculators', href: '/calculators' },
    { name: 'Unit Converters', href: '/unit-converters' },
    { name: 'Other Tools', href: '/other-tools' },
];

const POPULAR_TOOLS = [
    { name: 'Compress to 20KB', href: '/image-compressor-to-20kb' },
    { name: 'Compress to 50KB', href: '/compress-image-to-50kb' },
    { name: 'MB to KB Converter', href: '/mb-to-kb-image-converter' },
    { name: 'YouTube Tags', href: '/youtube-tag-extractor' },
    { name: 'Instagram Bio Gen', href: '/instagram-tools' },
    { name: 'Derivative Calc', href: '/calculators/derivative-calculator' },
];

const COMPANY_LINKS = [
    { name: '🤖 AI Directory', href: '/directory' },
    { name: '🚀 Submit AI Tool', href: '/directory/submit' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'Our Blog', href: '/blog' },
    { name: '❤️ Donate', href: '/donate' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms-and-conditions' },
];

const SOCIALS = [
    { icon: Instagram, href: 'https://www.instagram.com/_smarttoolswala_', label: 'Instagram', color: '#e1306c', glow: 'rgba(225,48,108,0.4)' },
    { icon: Youtube, href: 'https://www.youtube.com', label: 'YouTube', color: '#ff0000', glow: 'rgba(255,0,0,0.4)' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter/X', color: '#1d9bf0', glow: 'rgba(29,155,240,0.4)' },
    { icon: Mail, href: 'mailto:support@smarttoolswala.com', label: 'Email', color: '#818cf8', glow: 'rgba(129,140,248,0.4)' },
];

const STATS = [
    { value: '50+', label: 'Free Tools', icon: Zap },
    { value: '1M+', label: 'Users Served', icon: Globe },
    { value: '4.9★', label: 'User Rating', icon: Star },
    { value: '100%', label: 'Free Always', icon: ShieldCheck },
];

const Footer = () => (
    <footer className="ft-root">
        {/* Ambient Glows */}
        <div className="ft-glow-line" />
        <div className="ft-glow-orb ft-glow-orb-1" />
        <div className="ft-glow-orb ft-glow-orb-2" />

        <div className="ft-container">

            {/* ══ STATS ROW ══════════════════════════════════════════════ */}
            <div className="ft-stats-row">
                {STATS.map(({ value, label, icon: Icon }) => (
                    <div key={label} className="ft-stat-item">
                        <div className="ft-stat-icon-wrap">
                            <Icon className="ft-stat-icon" />
                        </div>
                        <div>
                            <div className="ft-stat-value">{value}</div>
                            <div className="ft-stat-label">{label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ══ MAIN LAYOUT ══════════════════════════════════════════════ */}
            <div className="ft-main-grid">

                {/* ── Brand column ── */}
                <div className="ft-brand-col">
                    <Link href="/" className="ft-logo-link">
                        <div className="ft-logo-icon-wrap">
                            <Image src="/logo.svg" alt="SmartToolsWala Logo" fill sizes="40px" className="object-cover" />
                        </div>
                        <span className="ft-logo-text">
                            SmartTools<span className="ft-logo-accent">Wala</span>
                        </span>
                    </Link>

                    <p className="ft-brand-desc">
                        Empowering millions with blazingly fast, free & 100% secure online tools. Powered by industry-grade tech.
                    </p>

                    <div className="ft-badges">
                        <span className="ft-badge ft-badge-green"><Zap className="w-3 h-3" /> Fast & Free</span>
                        <span className="ft-badge ft-badge-blue"><ShieldCheck className="w-3 h-3" /> 100% Secure</span>
                    </div>

                    {/* Social icons */}
                    <div className="ft-socials">
                        {SOCIALS.map(({ icon: Icon, href, label, color, glow }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith('http') ? '_blank' : undefined}
                                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                aria-label={label}
                                className="ft-social-btn"
                                style={{ '--ft-social-color': color, '--ft-social-glow': glow } as any}
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>

                    <Link href="/donate" className="ft-donate-btn">
                        <Heart className="w-4 h-4 fill-pink-300" />
                        Support Us — Donate
                    </Link>
                </div>

                {/* ── Links section (2-cols on mobile, 3-cols on desktop) ── */}
                <div className="ft-links-group">
                    <div className="ft-links-col">
                        <div className="ft-col-header">
                            <span className="ft-col-header-dot" />
                            Categories
                        </div>
                        <ul className="ft-links-list">
                            {CATEGORIES.map(l => (
                                <li key={l.name}>
                                    <Link href={l.href} className="ft-link">
                                        <ArrowRight className="ft-link-arrow" />
                                        {l.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="ft-links-col">
                        <div className="ft-col-header">
                            <span className="ft-col-header-dot" />
                            Popular Tools
                        </div>
                        <ul className="ft-links-list">
                            {POPULAR_TOOLS.map(l => (
                                <li key={l.name}>
                                    <Link href={l.href} className="ft-link">
                                        <ArrowRight className="ft-link-arrow" />
                                        {l.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="ft-links-col">
                        <div className="ft-col-header">
                            <span className="ft-col-header-dot" />
                            Company
                        </div>
                        <ul className="ft-links-list">
                            {COMPANY_LINKS.map(l => (
                                <li key={l.name}>
                                    <Link href={l.href} className="ft-link">
                                        <ArrowRight className="ft-link-arrow" />
                                        {l.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* ── Newsletter / CTA column ── */}
                <div className="ft-cta-col">
                    <div className="ft-col-header">
                        <span className="ft-col-header-dot" />
                        Stay Connected
                    </div>
                    <p className="ft-cta-desc">
                        Have a feature request or found a bug? Reach out to our developer team.
                    </p>

                    <Link href="/contact-us" className="ft-cta-btn">
                        <span>Send us a Message</span>
                        <ArrowRight className="w-4 h-4 flex-shrink-0" />
                    </Link>

                    <div className="ft-blog-card">
                        <div className="ft-blog-icon-box">
                            <BookOpen className="ft-blog-card-icon" />
                        </div>
                        <div>
                            <p className="ft-blog-card-title">Read our Blog</p>
                            <p className="ft-blog-card-sub">Guides, SEO & Tutorials</p>
                        </div>
                        <Link href="/blog" className="ft-blog-card-arrow" aria-label="Go to blog">
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

            </div>

            {/* ══ BOTTOM BAR ═════════════════════════════════════════════ */}
            <div className="ft-bottom">
                <div className="ft-disclaimer">
                    <span className="ft-disclaimer-label">Disclaimer:</span>
                    {' '}SmartToolsWala is an independent platform. We are <strong>not affiliated</strong> with any government agency or exam conducting authority.
                </div>

                <div className="ft-bottom-bar">
                    <p className="ft-copyright">
                        © {new Date().getFullYear()} SmartTools<span className="ft-logo-accent">Wala</span>. All rights reserved.
                    </p>

                    <div className="ft-bottom-links">
                        <Link href="/privacy-policy" className="ft-bottom-link">Privacy</Link>
                        <span className="ft-sep" />
                        <Link href="/terms-and-conditions" className="ft-bottom-link">Terms</Link>
                        <span className="ft-sep" />
                        <Link href="/cancellation-and-refund" className="ft-bottom-link">Refunds</Link>
                        <span className="ft-sep" />
                        <Link href="/shipping-policy" className="ft-bottom-link">Shipping</Link>
                    </div>

                    <p className="ft-madein">Made with ❤️ in India 🇮🇳</p>
                </div>
            </div>
        </div>

        <style>{`
            /* ═══════════════════════════════════════════════════════════
               FOOTER — Ultra Premium Dark SaaS, Mobile Optimized
            ═══════════════════════════════════════════════════════════ */

            .ft-root {
                position: relative;
                background: #06080e;
                border-top: 1px solid rgba(255,255,255,0.08);
                overflow: hidden;
                font-family: inherit;
            }

            /* ambient glow */
            .ft-glow-line {
                position: absolute; top: 0; left: 0; right: 0; height: 1px;
                background: linear-gradient(90deg, transparent, #6366f1 35%, #ec4899 50%, #6366f1 65%, transparent);
                opacity: 0.8;
            }
            .ft-glow-orb {
                position: absolute; border-radius: 50%;
                filter: blur(120px); pointer-events: none;
            }
            .ft-glow-orb-1 {
                width: 600px; height: 600px;
                background: radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%);
                top: -150px; left: -100px;
            }
            .ft-glow-orb-2 {
                width: 500px; height: 500px;
                background: radial-gradient(circle, rgba(236,72,153,0.12), transparent 70%);
                bottom: -100px; right: -80px;
            }

            .ft-container {
                max-width: 1280px;
                margin: 0 auto;
                padding: 3.5rem 1.25rem 2.5rem;
                position: relative; z-index: 10;
            }

            /* ── Stats row ── */
            .ft-stats-row {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 1px;
                background: rgba(255,255,255,0.07);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 20px;
                overflow: hidden;
                margin-bottom: 3.5rem;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
            @media (min-width: 640px)  { .ft-stats-row { grid-template-columns: repeat(4, 1fr); } }

            .ft-stat-item {
                display: flex; align-items: center; gap: 0.85rem;
                padding: 1.25rem 1.25rem;
                background: rgba(13,17,26,0.6);
                backdrop-filter: blur(12px);
                transition: background 0.25s;
            }
            .ft-stat-item:hover { background: rgba(99,102,241,0.1); }
            .ft-stat-icon-wrap {
                width: 38px; height: 38px; border-radius: 10px;
                background: rgba(99,102,241,0.12);
                border: 1px solid rgba(99,102,241,0.25);
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0;
            }
            .ft-stat-icon { width: 18px; height: 18px; color: #818cf8; }
            .ft-stat-value { font-size: 1.25rem; font-weight: 900; color: #f8fafc; line-height: 1.1; letter-spacing: -0.02em; }
            .ft-stat-label { font-size: 11px; font-weight: 700; color: #94a3b8; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.05em; }

            /* ── Main Layout ── */
            .ft-main-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 2.5rem;
            }
            @media (min-width: 1024px) {
                .ft-main-grid {
                    grid-template-columns: 2.2fr 4fr 2fr;
                    gap: 3rem;
                    align-items: start;
                }
            }

            /* ── Brand col ── */
            .ft-brand-col { display: flex; flex-direction: column; }
            .ft-logo-link {
                display: inline-flex; align-items: center; gap: 0.75rem;
                text-decoration: none; margin-bottom: 1rem;
                transition: transform 0.2s;
            }
            .ft-logo-link:hover { transform: translateY(-1px); }
            .ft-logo-icon-wrap {
                position: relative; width: 42px; height: 42px;
                border-radius: 12px; overflow: hidden;
                border: 1px solid rgba(255,255,255,0.15);
                box-shadow: 0 4px 14px rgba(99,102,241,0.3);
                flex-shrink: 0;
            }
            .ft-logo-text { font-size: 1.4rem; font-weight: 900; color: #ffffff; letter-spacing: -0.03em; }
            .ft-logo-accent { color: #818cf8; }
            .ft-brand-desc {
                font-size: 13.5px; color: #94a3b8; line-height: 1.7;
                margin-bottom: 1.25rem; font-weight: 450;
            }
            .ft-badges { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1.5rem; }
            .ft-badge {
                display: inline-flex; align-items: center; gap: 0.35rem;
                font-size: 11px; font-weight: 700; padding: 0.35rem 0.75rem;
                border-radius: 999px; border: 1px solid; text-transform: uppercase; letter-spacing: 0.04em;
            }
            .ft-badge-green { color: #34d399; background: rgba(52,211,153,0.1); border-color: rgba(52,211,153,0.25); }
            .ft-badge-blue  { color: #60a5fa; background: rgba(96,165,250,0.1); border-color: rgba(96,165,250,0.25); }

            /* socials */
            .ft-socials { display: flex; gap: 0.65rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
            .ft-social-btn {
                width: 42px; height: 42px; border-radius: 12px;
                display: flex; align-items: center; justify-content: center;
                background: rgba(255,255,255,0.05);
                border: 1px solid rgba(255,255,255,0.1);
                color: #cbd5e1; text-decoration: none;
                transition: all 0.25s;
            }
            .ft-social-btn:hover {
                color: var(--ft-social-color);
                background: rgba(255,255,255,0.08);
                border-color: var(--ft-social-color);
                box-shadow: 0 0 18px var(--ft-social-glow);
                transform: translateY(-3px);
            }

            /* donate button */
            .ft-donate-btn {
                display: inline-flex; align-items: center; gap: 0.6rem;
                padding: 0.75rem 1.4rem; border-radius: 14px;
                font-size: 13.5px; font-weight: 800; color: #fff;
                text-decoration: none;
                background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
                box-shadow: 0 4px 20px rgba(236,72,153,0.35);
                transition: all 0.25s;
                width: fit-content;
            }
            .ft-donate-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(236,72,153,0.5); }

            /* ── Links Group (Desktop 3 cols, Mobile 2 cols) ── */
            .ft-links-group {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem 1.5rem;
            }
            @media (min-width: 640px) {
                .ft-links-group {
                    grid-template-columns: repeat(3, 1fr);
                    gap: 2rem;
                }
            }

            .ft-links-col { display: flex; flex-direction: column; }
            .ft-col-header {
                display: flex; align-items: center; gap: 0.5rem;
                font-size: 11.5px; font-weight: 800; color: #e2e8f0;
                text-transform: uppercase; letter-spacing: 0.08em;
                margin-bottom: 1.25rem;
            }
            .ft-col-header-dot {
                width: 7px; height: 7px; border-radius: 50%;
                background: linear-gradient(135deg, #6366f1, #ec4899);
                flex-shrink: 0;
            }
            .ft-links-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.45rem; }
            .ft-link {
                display: flex; align-items: center; gap: 0;
                font-size: 13.5px; font-weight: 500; color: #94a3b8;
                text-decoration: none; padding: 0.2rem 0;
                transition: all 0.2s;
            }
            .ft-link-arrow {
                width: 12px; height: 12px; color: #818cf8;
                flex-shrink: 0; opacity: 0;
                transform: translateX(-8px);
                transition: all 0.2s;
                margin-right: 0;
            }
            .ft-link:hover { color: #f8fafc; font-weight: 600; padding-left: 2px; }
            .ft-link:hover .ft-link-arrow { opacity: 1; transform: translateX(0); margin-right: 6px; }

            /* ── CTA col ── */
            .ft-cta-col { display: flex; flex-direction: column; }
            .ft-cta-desc { font-size: 13.5px; color: #94a3b8; line-height: 1.65; margin-bottom: 1.25rem; }
            .ft-cta-btn {
                display: inline-flex; align-items: center; justify-content: space-between; gap: 0.5rem;
                padding: 0.8rem 1.2rem; border-radius: 14px; margin-bottom: 1.25rem;
                font-size: 13.5px; font-weight: 800; color: #fff;
                background: linear-gradient(135deg, #6366f1, #8b5cf6);
                box-shadow: 0 4px 18px rgba(99,102,241,0.35);
                text-decoration: none; transition: all 0.25s;
            }
            .ft-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(99,102,241,0.5); }

            .ft-blog-card {
                display: flex; align-items: center; gap: 0.75rem;
                padding: 0.85rem 1rem; border-radius: 14px;
                background: rgba(255,255,255,0.04);
                border: 1px solid rgba(255,255,255,0.08);
                transition: all 0.25s;
            }
            .ft-blog-card:hover { background: rgba(99,102,241,0.08); border-color: rgba(99,102,241,0.25); }
            .ft-blog-icon-box {
                width: 34px; height: 34px; border-radius: 10px;
                background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3);
                display: flex; align-items: center; justify-content: center; flex-shrink: 0;
            }
            .ft-blog-card-icon { width: 16px; height: 16px; color: #a5b4fc; }
            .ft-blog-card-title { font-size: 12.5px; font-weight: 800; color: #f1f5f9; }
            .ft-blog-card-sub { font-size: 11px; color: #94a3b8; margin-top: 1px; }
            .ft-blog-card-arrow {
                margin-left: auto; flex-shrink: 0;
                width: 30px; height: 30px; border-radius: 10px;
                background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.3);
                color: #a5b4fc; display: flex; align-items: center; justify-content: center;
                text-decoration: none; transition: all 0.2s;
            }
            .ft-blog-card-arrow:hover { background: rgba(99,102,241,0.3); transform: translateX(2px); color: #fff; }

            /* ══ BOTTOM BAR ═══════════════════════════════════════════ */
            .ft-bottom { margin-top: 3.5rem; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 2rem; }

            .ft-disclaimer {
                background: rgba(245,158,11,0.08);
                border: 1px solid rgba(245,158,11,0.2);
                border-radius: 12px;
                padding: 0.85rem 1.1rem;
                font-size: 12.5px; color: #cbd5e1; line-height: 1.6;
                margin-bottom: 1.5rem;
            }
            .ft-disclaimer strong { color: #ffffff; }
            .ft-disclaimer-label { color: #fbbf24; font-weight: 800; }

            .ft-bottom-bar {
                display: flex; flex-direction: column; align-items: center;
                gap: 1.2rem; text-align: center;
            }
            @media (min-width: 768px) {
                .ft-bottom-bar {
                    flex-direction: row; justify-content: space-between;
                    align-items: center; text-align: left;
                }
            }
            .ft-copyright { font-size: 13px; color: #94a3b8; font-weight: 500; }
            .ft-bottom-links { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: 0.5rem 0.85rem; }
            .ft-bottom-link { font-size: 12.5px; color: #cbd5e1; text-decoration: none; font-weight: 500; transition: color 0.2s; }
            .ft-bottom-link:hover { color: #818cf8; }
            .ft-sep { width: 3px; height: 3px; border-radius: 50%; background: #475569; flex-shrink: 0; }
            .ft-madein { font-size: 12.5px; color: #cbd5e1; font-weight: 600; white-space: nowrap; }

            /* ── Mobile layout tuning ── */
            @media (max-width: 639px) {
                .ft-container { padding: 2.5rem 1rem 2rem; }
                .ft-stats-row { margin-bottom: 2.5rem; border-radius: 16px; }
                .ft-stat-item { padding: 1rem 0.85rem; gap: 0.65rem; }
                .ft-stat-icon-wrap { width: 32px; height: 32px; border-radius: 8px; }
                .ft-stat-icon { width: 15px; height: 15px; }
                .ft-stat-value { font-size: 1.1rem; }
                .ft-stat-label { font-size: 10px; }
                .ft-brand-col { padding-bottom: 2rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
                .ft-links-group { padding-bottom: 1.5rem; border-bottom: 1px solid rgba(255,255,255,0.08); }
            }
        `}</style>
    </footer>
);

export default Footer;
