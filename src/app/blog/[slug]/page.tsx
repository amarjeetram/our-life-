import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { Calendar, User, ArrowLeft, Clock, Heart, Sparkles, Hash, Type, ArrowRight, BookOpen } from 'lucide-react';
import { getPostBySlug, getAllPosts } from '@/lib/mdx';
import FloatingCTA from '@/components/FloatingCTA';
import CoupleNameClientWrapper from '@/components/CoupleNameClientWrapper';
import InstagramBioClientWrapper from '@/components/InstagramBioClientWrapper';
import AIPromptCard from '@/components/AIPromptCard';
import BioCard from '@/components/BioCard';
import BlogTOC from '@/components/BlogTOC';

// EXPLICIT FORCE STATIC - Critical for fast indexing and crawling
export const dynamic = 'force-static';
const SITE = 'https://smarttoolswala.com';

// Tag → CTA mapping: intent-based — each tag points to the most relevant tool
const TAG_CTA: Record<string, { title: string; badge: string; buttonLink: string; gradient: string }> = {
    'cta-mb-to-kb': {
        title: 'Free MB to KB Converter – Try Now!',
        badge: '🚀 Free Tool',
        buttonLink: '/mb-to-kb-image-converter',
        gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    },
    'cta-compress-50kb': {
        title: 'Compress Image to 50KB – Free & Instant!',
        badge: '✅ Free Tool',
        buttonLink: '/compress-image-to-50kb',
        gradient: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
    },
    'cta-compress-100kb': {
        title: 'Compress Image to 100KB – High Quality!',
        badge: '⚡ Free Tool',
        buttonLink: '/compress-image-to-100kb',
        gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    },
    'cta-compress-20kb': {
        title: 'Compress Image to 20KB – Exams Ready!',
        badge: '📝 Free Tool',
        buttonLink: '/image-compressor-to-20kb',
        gradient: 'linear-gradient(135deg, #ec4899, #be185d)',
    },
    'cta-compress-30kb': {
        title: 'Compress Image to 30KB – Exact Size!',
        badge: '🎯 Free Tool',
        buttonLink: '/photo-compressor-to-30kb',
        gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
    },
    'cta-compress-200kb': {
        title: 'Compress Image to 200KB – Best Quality!',
        badge: '🖼️ Free Tool',
        buttonLink: '/compress-image-to-200kb',
        gradient: 'linear-gradient(135deg, #14b8a6, #0f766e)',
    },
    'cta-resize-100kb': {
        title: 'Resize Image to 100KB – Online Forms!',
        badge: '📐 Free Tool',
        buttonLink: '/resize-image-to-100kb',
        gradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
    },
    'cta-tnpsc': {
        title: 'TNPSC Photo Compressor – Auto Size!',
        badge: '💯 Free Tool',
        buttonLink: '/govt-exam-tools/tnpsc-photo-compressor',
        gradient: 'linear-gradient(135deg, #f43f5e, #be123c)',
    },
    'cta-youtube-tags': {
        title: 'Extract YouTube Tags – Boost Views!',
        badge: '📈 Free Tool',
        buttonLink: '/youtube-tag-extractor',
        gradient: 'linear-gradient(135deg, #10b981, #059669)',
    },
    'cta-youtube-title': {
        title: 'Generate Viral YouTube Titles – Try Now!',
        badge: '🔥 Free Tool',
        buttonLink: '/youtube-title-generator',
        gradient: 'linear-gradient(135deg, #ef4444, #b91c1c)',
    },
    'cta-youtube-description': {
        title: 'Extract YouTube Descriptions – Rank High!',
        badge: '✨ Free Tool',
        buttonLink: '/youtube-description-extractor',
        gradient: 'linear-gradient(135deg, #8b5cf6, #4c1d95)',
    },
    'cta-couple-name': {
        title: 'Stylish Couple Name Maker – Try Now!',
        badge: '💖 Free Tool',
        buttonLink: '/stylish-couple-name-maker',
        gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
    },
    'cta-flames': {
        title: 'Play FLAMES Calculator Online – Free!',
        badge: '🔥 Free Tool',
        buttonLink: '/calculators/fun/flames-calculator',
        gradient: 'linear-gradient(135deg, #be185d, #9333ea, #f97316)',
    },
    'cta-instagram-bio': {
        title: 'Free Instagram Bio Generator – Try Now!',
        badge: '✨ Free Tool',
        buttonLink: '/instagram-tools/instagram-bio-generator',
        gradient: 'linear-gradient(135deg, #f09433, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
    },
};

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return {
            title: 'Post Not Found | SmartToolsWala',
        };
    }

    const canonical = `${SITE}/blog/${post.slug}`;
    const publishedTime = post.date || new Date().toISOString();
    const ogImage = post.image ? `${SITE}${post.image}` : `${SITE}/og-image.png`;

    return {
        title: `${post.title}`,
        description: post.description,
        alternates: { canonical },
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            url: canonical,
            publishedTime: publishedTime,
            authors: [post.author],
            images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.description,
            images: [ogImage],
        },
    };
}

// Reusable CTA button to inject via MDX components
const MDXInlineCTA = ({ config }: { config?: { title: string; badge: string; buttonLink: string; gradient: string } }) => {
    if (!config) return null;
    return (
        <Link href={config.buttonLink} style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            gap: "16px", background: config.gradient,
            borderRadius: "16px", padding: "16px 20px", margin: "36px 0",
            textDecoration: "none", boxShadow: "0 4px 24px rgba(99,102,241,0.25)"
        }}>
            <span style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                <span style={{ fontSize: "11px", fontWeight: 800, color: "rgba(255,255,255,0.75)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {config.badge}
                </span>
                <span style={{ fontSize: "15px", fontWeight: 800, color: "#ffffff" }}>
                    {config.title}
                </span>
            </span>
            <span style={{
                flexShrink: 0, background: "rgba(255,255,255,0.2)", color: "#fff",
                padding: "8px 16px", borderRadius: "100px", fontSize: "13px", fontWeight: 700,
                border: "1px solid rgba(255,255,255,0.3)", whiteSpace: "nowrap"
            }}>
                Open Tool →
            </span>
        </Link>
    );
};

// Extract H2/H3 headings from MDX content for TOC
function extractHeadings(content: string): { id: string; text: string; level: number }[] {
    const lines = content.split('\n');
    const headings: { id: string; text: string; level: number }[] = [];
    for (const line of lines) {
        const h2 = line.match(/^##\s+(.+)/);
        const h3 = line.match(/^###\s+(.+)/);
        if (h2) {
            const text = h2[1].trim();
            if (text.toLowerCase().includes('table of content')) continue;
            const id = text.toLowerCase().replace(/[^a-z0-9\u0900-\u097f\s]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 60);
            headings.push({ id, text, level: 2 });
        } else if (h3) {
            const text = h3[1].trim();
            if (text.toLowerCase().includes('table of content')) continue;
            const id = text.toLowerCase().replace(/[^a-z0-9\u0900-\u097f\s]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 60);
            headings.push({ id, text, level: 3 });
        }
    }
    return headings;
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    // Get 3 related/recent posts (excluding the current one)
    const allPosts = getAllPosts();
    const relatedPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 3);

    const canonical = `${SITE}/blog/${post.slug}`;
    const datePublishedStr = new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    // Auto-calculate reading time based on word count
    const wordCount = post.content.split(/\s+/g).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    let schemaImageUrl = `${SITE}/og-image.png`;
    if (post.image) {
        schemaImageUrl = post.image.startsWith('http') ? post.image : `${SITE}${post.image}`;
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonical
        },
        "headline": post.title,
        "description": post.description,
        "image": [schemaImageUrl],
        "datePublished": post.date,
        "dateModified": post.date,
        "author": {
            "@type": "Person",
            "name": post.author,
            "url": SITE
        },
        "publisher": {
            "@type": "Organization",
            "name": "SmartToolsWala",
            "logo": {
                "@type": "ImageObject",
                "url": `${SITE}/logo.png`
            }
        }
    };

    // Auto-extract FAQ schema from MDX content (looks for ### questions under ## FAQ section)
    const faqInFaqSection = (() => {
        const faqSectionStart = post.content.search(/##.*FAQ/i);
        if (faqSectionStart === -1) return [];
        const faqSection = post.content.slice(faqSectionStart);
        const nextH2 = faqSection.slice(4).search(/^## /m);
        const faqContent = nextH2 > 0 ? faqSection.slice(0, nextH2 + 4) : faqSection;
        const pairs = [...faqContent.matchAll(/###\s+\d*\.?\s*(.+?)\n([\s\S]*?)(?=###|$)/g)];
        return pairs.map(m => ({
            "@type": "Question",
            "name": m[1].trim(),
            "acceptedAnswer": {
                "@type": "Answer",
                "text": m[2].replace(/[*`_#]/g, '').trim().slice(0, 500)
            }
        })).filter(q => q.name.length > 5 && q.acceptedAnswer.text.length > 10);
    })();

    const faqJsonLd = faqInFaqSection.length >= 2 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqInFaqSection
    } : null;

    const isInstagramBioPost = post.slug === 'instagram-bio-for-boys';

    const howToJsonLd = isInstagramBioPost ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "How to Customize and Set a Stylish Instagram Bio",
        "description": "A step-by-step guide to customizing, styling, and copying bios for your Instagram profile using our tools.",
        "image": `${SITE}/images/blogs/instagram-bio-for-boys-featured.webp`,
        "step": [
            {
                "@type": "HowToStep",
                "name": "Select a Bio Category",
                "text": "Browse through categories such as Attitude, VIP, Stylish, or Gamer to find the style that represents you.",
                "url": `${SITE}/blog/instagram-bio-for-boys#ai-tools`
            },
            {
                "@type": "HowToStep",
                "name": "Use the Search Feature",
                "text": "Type keywords like 'King' or 'Fitness' into the search bar to find bios matching your exact vibe.",
                "url": `${SITE}/blog/instagram-bio-for-boys#ai-tools`
            },
            {
                "@type": "HowToStep",
                "name": "Copy the Selected Bio",
                "text": "Click the copy button on your chosen bio card. The text will be saved to your clipboard instantly.",
                "url": `${SITE}/blog/instagram-bio-for-boys#ai-tools`
            },
            {
                "@type": "HowToStep",
                "name": "Paste on Instagram Profile",
                "text": "Open Instagram, go to Edit Profile, paste the bio into the bio text field, and save your changes.",
                "url": "https://www.instagram.com"
            }
        ]
    } : null;

    const collectionJsonLd = isInstagramBioPost ? {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "[1500+] Best Instagram Bio For Boys – Attitude, Stylish & VIP Bios (2026)",
        "description": "Discover 1500+ Instagram Bio For Boys including attitude, stylish, VIP, cool, trending and emoji bios. Copy and use instantly.",
        "url": `${SITE}/blog/instagram-bio-for-boys`,
        "about": {
            "@type": "ItemList",
            "numberOfItems": 1548,
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Attitude Bios for Boys", "description": "Bold, confident, and high-attitude bios." },
                { "@type": "ListItem", "position": 2, "name": "Stylish Bios for Boys", "description": "Stylish typography and creative font bios." },
                { "@type": "ListItem", "position": 3, "name": "VIP Bios for Boys", "description": "Premium status, official-look and Royal VIP bios." },
                { "@type": "ListItem", "position": 4, "name": "Cool Bios for Boys", "description": "Chill, smooth, and charismatic bios." },
                { "@type": "ListItem", "position": 5, "name": "Trending Bios for Boys", "description": "The most popular bios for 2026." },
                { "@type": "ListItem", "position": 6, "name": "Emoji Bios for Boys", "description": "Bio combinations rich with expressive emojis." },
                { "@type": "ListItem", "position": 7, "name": "Short Bios for Boys", "description": "Minimalist, punchy, and short bios." },
                { "@type": "ListItem", "position": 8, "name": "Professional Bios for Boys", "description": "Career, creator, and business-focused bios." },
                { "@type": "ListItem", "position": 9, "name": "Gamer Bios for Boys", "description": "Cyberpunk, gaming-centric, and esports bios." },
            ]
        }
    } : null;

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${SITE}/blog` },
            { "@type": "ListItem", "position": 3, "name": post.title, "item": canonical }
        ]
    };

    const ctaConfig = post.tags?.map((t) => TAG_CTA[t]).find(Boolean) ?? null;

    const headings = extractHeadings(post.content);

    // Define custom MDX components corresponding to the tags injected in MDX files
    const mdxComponents = {
        CTAMBToKB: () => <MDXInlineCTA config={TAG_CTA['cta-mb-to-kb']} />,
        CTACompress50KB: () => <MDXInlineCTA config={TAG_CTA['cta-compress-50kb']} />,
        CTACompress100KB: () => <MDXInlineCTA config={TAG_CTA['cta-compress-100kb']} />,
        CTACompress20KB: () => <MDXInlineCTA config={TAG_CTA['cta-compress-20kb']} />,
        CTACompress30KB: () => <MDXInlineCTA config={TAG_CTA['cta-compress-30kb']} />,
        CTACompress200KB: () => <MDXInlineCTA config={TAG_CTA['cta-compress-200kb']} />,
        CTAResize100KB: () => <MDXInlineCTA config={TAG_CTA['cta-resize-100kb']} />,
        CTATnpsc: () => <MDXInlineCTA config={TAG_CTA['cta-tnpsc']} />,
        CTAYoutubeTags: () => <MDXInlineCTA config={TAG_CTA['cta-youtube-tags']} />,
        CTAYoutubeTitle: () => <MDXInlineCTA config={TAG_CTA['cta-youtube-title']} />,
        CTAYoutubeDescription: () => <MDXInlineCTA config={TAG_CTA['cta-youtube-description']} />,
        CTACoupleName: () => <MDXInlineCTA config={TAG_CTA['cta-couple-name']} />,
        CTAFlames: () => <MDXInlineCTA config={TAG_CTA['cta-flames']} />,
        CTAInstagramBio: () => <MDXInlineCTA config={TAG_CTA['cta-instagram-bio']} />,
        BlogInlineTOC: () => (
            <div className="block lg:hidden my-8 not-prose">
                <BlogTOC headings={headings} />
            </div>
        ),
        TableOfContents: () => (
            <div className="block lg:hidden my-8 not-prose">
                <BlogTOC headings={headings} />
            </div>
        ),
        InteractiveCoupleName: () => (
            <span className="block my-12 not-prose border border-pink-100 rounded-3xl bg-white shadow-xl overflow-hidden relative z-10">
                <span className="block bg-pink-50/50 p-4 text-center border-b border-pink-100">
                    <span className="text-sm font-bold text-pink-600 uppercase tracking-widest">Interactive Tool</span>
                </span>
                <span className="block p-2 sm:p-6">
                    <CoupleNameClientWrapper />
                </span>
            </span>
        ),
        InteractiveInstagramBio: () => (
            <span className="block my-12 not-prose border border-slate-800 rounded-3xl bg-slate-950 shadow-xl overflow-hidden relative z-10">
                <span className="block bg-slate-900 p-4 text-center border-b border-slate-800">
                    <span className="text-sm font-bold text-indigo-500 uppercase tracking-widest">Interactive Tool</span>
                </span>
                <span className="block p-2 sm:p-6">
                    <InstagramBioClientWrapper />
                </span>
            </span>
        ),
        AIPromptCard,
        // ── Headings with auto-generated IDs for TOC scrollspy ──
        h2: ({ children, ...props }: any) => {
            const text = typeof children === 'string' ? children : '';
            const id = text.toLowerCase().replace(/[^a-z0-9\u0900-\u097f\s]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 60);
            return <h2 id={id} {...props}>{children}</h2>;
        },
        h3: ({ children, ...props }: any) => {
            const text = typeof children === 'string' ? children : '';
            const id = text.toLowerCase().replace(/[^a-z0-9\u0900-\u097f\s]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').slice(0, 60);
            return <h3 id={id} {...props}>{children}</h3>;
        },
        // ── Table components — ensures MDX tables render as proper HTML ──

        table: ({ children, ...props }: any) => (
            <div style={{ overflowX: 'auto', margin: '2rem 0', borderRadius: '14px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }} {...props}>
                    {children}
                </table>
            </div>
        ),
        thead: ({ children, ...props }: any) => (
            <thead style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }} {...props}>{children}</thead>
        ),
        tbody: ({ children, ...props }: any) => <tbody {...props}>{children}</tbody>,
        tr: ({ children, ...props }: any) => (
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }} {...props}>{children}</tr>
        ),
        th: ({ children, ...props }: any) => (
            <th style={{
                padding: '12px 18px',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                textAlign: 'left',
                whiteSpace: 'nowrap',
                border: 'none',
            }} {...props}>{children}</th>
        ),
        td: ({ children, ...props }: any) => (
            <td style={{
                padding: '11px 18px',
                color: '#94a3b8',
                lineHeight: 1.65,
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                verticalAlign: 'middle',
            }} {...props}>{children}</td>
        ),
        pre: ({ children, ...props }: any) => {
            const childArray = React.Children.toArray(children);
            const codeElement = childArray[0] as React.ReactElement;
            let codeText = '';
            const codeProps = codeElement && (codeElement.props as any);
            if (codeProps && codeProps.children) {
                codeText = String(codeProps.children);
            } else if (typeof children === 'string') {
                codeText = children;
            } else {
                return <pre {...props}>{children}</pre>;
            }

            // Exclude programming code
            const isCodeContent = codeText.includes('function ') ||
                                  codeText.includes('import ') ||
                                  codeText.includes('const ') ||
                                  codeText.includes('class ') ||
                                  codeText.includes('<html>') ||
                                  codeText.includes('css') ||
                                  codeText.includes('//');

            if (isCodeContent) {
                return <pre {...props}>{children}</pre>;
            }

            return <BioCard text={codeText} />;
        }
    };

    // Process content for TOC:
    // On desktop, the sidebar displays BlogTOC.
    // On mobile, the TOC appears directly in the blog content (after the intro/CTA), styled with BlogTOC.
    let contentToRender = post.content;
    const manualTocRegex = /(?:^|\n)(?:---\s*\n+)?##\s+Table of Contents[\s\S]*?(?=(?:^---\s*$|^##\s+))/im;
    if (headings.length > 2) {
        if (manualTocRegex.test(contentToRender)) {
            contentToRender = contentToRender.replace(manualTocRegex, '\n\n<BlogInlineTOC />\n\n');
        } else if (!contentToRender.includes('<BlogInlineTOC')) {
            const firstH2Match = contentToRender.search(/^##\s+/m);
            if (firstH2Match !== -1) {
                contentToRender = contentToRender.slice(0, firstH2Match) + '<BlogInlineTOC />\n\n' + contentToRender.slice(firstH2Match);
            }
        }
    }

    if (post.slug === 'stylish-couple-name-maker-with-meaning-find-unique-names-with-romantic-significance') {
        return (
            <div className="min-h-screen bg-[#07090f] pt-28 pb-20">
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
                {howToJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />}
                {collectionJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />}

                <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 text-center relative z-10">
                    <nav className="flex items-center justify-center gap-2 text-xs text-slate-500 font-semibold mb-6 flex-wrap" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-indigo-400 transition-colors text-slate-500">Home</Link>
                        <span className="text-slate-700">/</span>
                        <Link href="/blog" className="hover:text-indigo-400 transition-colors text-slate-500">Blog</Link>
                        <span className="text-slate-700">/</span>
                        <span className="text-slate-400 truncate max-w-[200px] sm:max-w-xs md:max-w-none">{post.title}</span>
                    </nav>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
                        <Heart className="w-3.5 h-3.5 fill-pink-500" />
                        Free Utility Tool
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-black text-slate-100 tracking-tight leading-[1.15] mb-6">{post.title}</h1>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
                        Blend two names into beautiful, unique nicknames with stylish fonts, wedding hashtags, and emojis — free, instant, and ready for Instagram.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        {[{ icon: Sparkles, color: 'text-pink-400', label: 'Stylish Fonts' }, { icon: Hash, color: 'text-purple-400', label: 'Wedding Hashtags' }, { icon: Type, color: 'text-indigo-400', label: 'Unicode Fonts' }, { icon: Heart, color: 'text-rose-400', label: '100% Free' }].map(({ icon: Icon, color, label }) => (
                            <div key={label} className="flex items-center gap-1.5 text-sm text-slate-400 font-medium">
                                <Icon className={`w-4 h-4 ${color}`} />
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-4 sm:px-6 relative z-20"><CoupleNameClientWrapper /></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-16">
                    <div className="blog-article-prose">
                        <MDXRemote source={contentToRender} components={mdxComponents} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bp-article-root">
                {/* JSON-LD */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
                {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
                {howToJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />}
                {collectionJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />}

                {/* ══ HERO ══════════════════════════════════════════════════════ */}
                <header className="bp-hero">
                    {/* Ambient orbs */}
                    <div className="bp-hero-orb bp-hero-orb-1" />
                    <div className="bp-hero-orb bp-hero-orb-2" />
                    <div className="bp-hero-grid" />

                    <div className="bp-hero-inner">
                        {/* Breadcrumb */}
                        <nav className="bp-breadcrumb" aria-label="Breadcrumb">
                            <Link href="/" className="bp-bc-link">Home</Link>
                            <span className="bp-bc-sep">/</span>
                            <Link href="/blog" className="bp-bc-link">Blog</Link>
                            <span className="bp-bc-sep">/</span>
                            <span className="bp-bc-current">{post.title}</span>
                        </nav>

                        {/* Back link */}
                        <Link href="/blog" className="bp-back-link">
                            <ArrowLeft className="w-4 h-4" /> Back to Blog
                        </Link>

                        {/* Category eyebrow */}
                        <div className="bp-eyebrow">
                            <BookOpen className="w-3.5 h-3.5" />
                            Article
                        </div>

                        {/* Title */}
                        <h1 className="bp-title">{post.title}</h1>

                        {/* Meta strip */}
                        <div className="bp-meta-strip">
                            <span className="bp-meta-chip">
                                <User className="w-3.5 h-3.5" />
                                {post.author}
                            </span>
                            <span className="bp-meta-dot" />
                            <span className="bp-meta-chip">
                                <Calendar className="w-3.5 h-3.5" />
                                {datePublishedStr}
                            </span>
                            <span className="bp-meta-dot" />
                            <span className="bp-meta-chip bp-meta-chip-accent">
                                <Clock className="w-3.5 h-3.5" />
                                {readingTime} min read
                            </span>
                        </div>

                        {/* CTA if applicable */}
                        {ctaConfig && (
                            <div className="bp-hero-cta-wrap">
                                <MDXInlineCTA config={ctaConfig} />
                            </div>
                        )}
                    </div>
                </header>

                {/* ══ FEATURED IMAGE ══════════════════════════════════════════ */}
                {post.image && (
                    <div className="bp-featured-img-wrap">
                        <div className="bp-featured-img-inner">
                            <Image
                                src={post.image}
                                alt={post.title}
                                width={1200}
                                height={675}
                                sizes="(max-width: 1280px) 100vw, 1000px"
                                className="bp-featured-img"
                                priority
                            />
                            <div className="bp-featured-img-overlay" />
                        </div>
                    </div>
                )}

                {/* ══ BODY: TOC LEFT + CONTENT RIGHT ══════════════════════════ */}
                <div className="bp-body-layout">

                    {/* ── TOC sidebar (right on desktop only) ── */}
                    {headings.length > 2 && (
                        <aside className="bp-toc-sidebar hidden lg:block">
                            <BlogTOC headings={headings} />
                        </aside>
                    )}

                    {/* ── Article content ── */}
                    <main className="bp-content-main" id="article-content">
                        {/* Couple name tool injection */}
                        {post.slug === 'stylish-couple-name-maker-with-meaning-find-unique-names-with-romantic-significance' && (
                            <div className="bp-tool-embed">
                                <div className="bp-tool-embed-header">
                                    <div className="bp-tool-embed-dot" />
                                    <span>Stylish Couple Name Maker</span>
                                </div>
                                <div className="bp-tool-embed-body">
                                    <CoupleNameClientWrapper />
                                </div>
                            </div>
                        )}

                        <div className="blog-article-prose">
                            <MDXRemote
                                source={contentToRender}
                                components={mdxComponents}
                                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                            />
                        </div>

                        {/* Author footer */}
                        <div className="bp-author-footer">
                            <div className="bp-author-avatar">{post.author.charAt(0)}</div>
                            <div className="bp-author-info">
                                <p className="bp-author-label">Written by</p>
                                <p className="bp-author-name">{post.author}</p>
                            </div>
                            <Link href="/blog" className="bp-more-link">
                                <ArrowLeft className="w-4 h-4" /> More Articles
                            </Link>
                        </div>
                    </main>
                </div>

                {/* ══ RELATED ARTICLES ════════════════════════════════════════ */}
                {relatedPosts.length > 0 && (
                    <section className="bp-related">
                        <div className="bp-related-inner">
                            <div className="bp-related-header">
                                <h2 className="bp-related-title">Related Articles</h2>
                                <Link href="/blog" className="bp-related-all">
                                    View All <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <div className="bp-related-grid">
                                {relatedPosts.map(rp => (
                                    <Link key={rp.slug} href={`/blog/${rp.slug}`} className="bp-related-card">
                                        <div className="bp-related-card-img-wrap">
                                            {rp.image
                                                ? <img src={rp.image} alt={rp.title} className="bp-related-card-img" loading="lazy" />
                                                : <div className="bp-related-card-img-empty"><Sparkles className="w-8 h-8" style={{ color: '#334155' }} /></div>
                                            }
                                            <div className="bp-related-card-overlay" />
                                        </div>
                                        <div className="bp-related-card-body">
                                            <p className="bp-related-card-date">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {new Date(rp.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </p>
                                            <h3 className="bp-related-card-title">{rp.title}</h3>
                                            <p className="bp-related-card-desc">{rp.description}</p>
                                            <span className="bp-related-card-cta">Read Article <ArrowRight className="w-3.5 h-3.5" /></span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ══ STYLES ══════════════════════════════════════════════════ */}
                <style>{`
                    /* ═══════════════════════════════════════════════
                       BLOG ARTICLE PAGE — Dark SaaS Premium Design
                    ═══════════════════════════════════════════════ */

                    .bp-article-root {
                        background: #07090f;
                        min-height: 100vh;
                    }

                    /* ── HERO ── */
                    .bp-hero {
                        position: relative;
                        padding: 8.5rem 1.5rem 4rem;
                        overflow: hidden;
                        border-bottom: 1px solid rgba(255,255,255,0.06);
                    }
                    .bp-hero-orb {
                        position: absolute; border-radius: 50%;
                        filter: blur(100px); pointer-events: none;
                    }
                    .bp-hero-orb-1 {
                        width: 600px; height: 600px;
                        background: radial-gradient(circle,#6366f1,transparent 70%);
                        top: -200px; right: -100px; opacity: 0.18;
                    }
                    .bp-hero-orb-2 {
                        width: 400px; height: 400px;
                        background: radial-gradient(circle,#ec4899,transparent 70%);
                        bottom: -100px; left: -60px; opacity: 0.1;
                    }
                    .bp-hero-grid {
                        position: absolute; inset: 0;
                        background-image:
                            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
                        background-size: 60px 60px;
                    }
                    .bp-hero-inner {
                        position: relative; z-index: 10;
                        max-width: 820px; margin: 0 auto;
                    }

                    /* breadcrumb */
                    .bp-breadcrumb {
                        display: flex; align-items: center; flex-wrap: wrap; gap: 0.4rem;
                        margin-bottom: 1.25rem; font-size: 12px; font-weight: 600;
                    }
                    .bp-bc-link { color: #475569; text-decoration: none; transition: color 0.2s; }
                    .bp-bc-link:hover { color: #818cf8; }
                    .bp-bc-sep { color: #1e293b; }
                    .bp-bc-current { color: #334155; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 260px; }

                    /* back */
                    .bp-back-link {
                        display: inline-flex; align-items: center; gap: 0.5rem;
                        font-size: 11px; font-weight: 800; text-transform: uppercase;
                        letter-spacing: 0.08em; color: #475569;
                        background: rgba(255,255,255,0.04);
                        border: 1px solid rgba(255,255,255,0.08);
                        padding: 0.4rem 0.9rem; border-radius: 10px;
                        text-decoration: none; transition: all 0.25s; margin-bottom: 1.5rem;
                    }
                    .bp-back-link:hover { color: #a5b4fc; background: rgba(99,102,241,0.1); border-color: rgba(99,102,241,0.3); }

                    /* eyebrow */
                    .bp-eyebrow {
                        display: inline-flex; align-items: center; gap: 0.4rem;
                        padding: 0.3rem 0.85rem; border-radius: 999px;
                        background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.25);
                        color: #a5b4fc; font-size: 10px; font-weight: 800;
                        letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 1.25rem;
                    }

                    /* title */
                    .bp-title {
                        font-size: clamp(1.9rem, 4.5vw, 3rem);
                        font-weight: 900; color: #f1f5f9;
                        line-height: 1.12; letter-spacing: -0.03em;
                        margin-bottom: 1.5rem;
                    }

                    /* meta */
                    .bp-meta-strip {
                        display: flex; flex-wrap: wrap; align-items: center; gap: 0.6rem;
                        margin-bottom: 1.5rem;
                    }
                    .bp-meta-chip {
                        display: inline-flex; align-items: center; gap: 0.35rem;
                        font-size: 12px; font-weight: 600; color: #475569;
                        background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
                        padding: 0.3rem 0.75rem; border-radius: 8px;
                    }
                    .bp-meta-chip-accent { color: #818cf8; border-color: rgba(99,102,241,0.2); background: rgba(99,102,241,0.07); }
                    .bp-meta-dot { width: 4px; height: 4px; border-radius: 50%; background: #1e293b; }

                    /* description */
                    .bp-description {
                        font-size: 1.05rem; color: #64748b; line-height: 1.75;
                        font-weight: 500; max-width: 680px;
                    }
                    .bp-hero-cta-wrap { margin-top: 1.5rem; max-width: 560px; }

                    /* ── FEATURED IMAGE ── */
                    .bp-featured-img-wrap {
                        max-width: 1100px; margin: 0 auto;
                        padding: 2.5rem 1.5rem 0;
                    }
                    .bp-featured-img-inner {
                        position: relative; border-radius: 20px; overflow: hidden;
                        border: 1px solid rgba(255,255,255,0.08);
                        box-shadow: 0 20px 60px rgba(0,0,0,0.5);
                        aspect-ratio: 16/9;
                    }
                    .bp-featured-img { object-fit: cover; width: 100%; height: 100%; }
                    .bp-featured-img-overlay {
                        position: absolute; inset: 0;
                        background: linear-gradient(to bottom, transparent 50%, rgba(7,9,15,0.5) 100%);
                        pointer-events: none;
                    }

                    /* ── BODY LAYOUT ── */
                    .bp-body-layout {
                        max-width: 1280px; margin: 0 auto;
                        padding: 3.5rem 1.5rem 5rem;
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: 3rem;
                        align-items: start;
                    }
                    @media (min-width: 1024px) {
                        .bp-body-layout {
                            grid-template-columns: 1fr 280px;
                            grid-template-areas: "content toc";
                        }
                        .bp-content-main { grid-area: content; }
                        .bp-toc-sidebar { grid-area: toc; }
                    }
                    @media (min-width: 1280px) {
                        .bp-body-layout { grid-template-columns: 1fr 300px; }
                    }

                    /* ── TOC Sidebar (Desktop Only) ── */
                    .bp-toc-sidebar {
                        display: none;
                    }
                    @media (min-width: 1024px) {
                        .bp-toc-sidebar {
                            display: block;
                            position: sticky;
                            top: 90px;
                            height: fit-content;
                            order: 0;
                        }
                    }

                    /* ── CONTENT ── */
                    .bp-content-main { min-width: 0; }

                    /* ── Tool embed ── */
                    .bp-tool-embed {
                        border: 1px solid rgba(255,255,255,0.07); border-radius: 20px;
                        overflow: hidden; margin-bottom: 2.5rem; background: #0d1117;
                    }
                    .bp-tool-embed-header {
                        display: flex; align-items: center; gap: 0.5rem;
                        padding: 0.85rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.06);
                        background: rgba(255,255,255,0.02);
                        font-size: 11px; font-weight: 800; color: #6366f1;
                        text-transform: uppercase; letter-spacing: 0.08em;
                    }
                    .bp-tool-embed-dot { width: 8px; height: 8px; border-radius: 50%; background: linear-gradient(135deg,#6366f1,#8b5cf6); }
                    .bp-tool-embed-body { padding: 1.5rem; }

                    /* ── Article prose ── */
                    .blog-article-prose {
                        color: #94a3b8;
                        font-size: 1rem;
                        line-height: 1.8;
                        font-weight: 450;
                    }
                    .blog-article-prose h1,
                    .blog-article-prose h2,
                    .blog-article-prose h3,
                    .blog-article-prose h4 {
                        color: #e2e8f0;
                        font-weight: 800;
                        letter-spacing: -0.02em;
                        line-height: 1.3;
                        margin-top: 2.5rem;
                        margin-bottom: 1rem;
                        scroll-margin-top: 100px;
                    }
                    .blog-article-prose h2 {
                        font-size: 1.55rem;
                        padding-bottom: 0.65rem;
                        border-bottom: 1px solid rgba(255,255,255,0.07);
                        color: #f1f5f9;
                    }
                    .blog-article-prose h3 {
                        font-size: 1.2rem;
                        color: #e2e8f0;
                    }
                    .blog-article-prose h4 { font-size: 1rem; color: #cbd5e1; }
                    .blog-article-prose p { margin-bottom: 1.25rem; }
                    .blog-article-prose strong { color: #e2e8f0; font-weight: 700; }
                    .blog-article-prose em { color: #a5b4fc; font-style: italic; }
                    .blog-article-prose a {
                        color: #818cf8; text-decoration: none; font-weight: 600;
                        border-bottom: 1px solid rgba(129,140,248,0.35);
                        transition: border-color 0.2s, color 0.2s;
                    }
                    .blog-article-prose a:hover { color: #a5b4fc; border-color: rgba(165,180,252,0.6); }
                    .blog-article-prose ul, .blog-article-prose ol { padding-left: 1.5rem; margin-bottom: 1.25rem; }
                    .blog-article-prose li { margin-bottom: 0.45rem; }
                    .blog-article-prose ul li::marker { color: #6366f1; }
                    .blog-article-prose ol li::marker { color: #6366f1; font-weight: 700; }
                    .blog-article-prose blockquote {
                        border-left: 3px solid #6366f1;
                        padding: 1rem 1.25rem; margin: 1.5rem 0;
                        background: rgba(99,102,241,0.06);
                        border-radius: 0 12px 12px 0;
                        color: #94a3b8; font-style: italic;
                    }
                    .blog-article-prose code {
                        background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);
                        border-radius: 5px; padding: 0.15em 0.4em;
                        font-size: 0.87em; color: #c084fc;
                    }
                    .blog-article-prose pre {
                        background: #0d1117; border: 1px solid rgba(255,255,255,0.07);
                        border-radius: 12px; padding: 1.25rem; overflow-x: auto;
                        margin: 1.5rem 0;
                    }
                    .blog-article-prose pre code { background: none; border: none; padding: 0; color: #e2e8f0; }
                    .blog-article-prose img {
                        border-radius: 14px; border: 1px solid rgba(255,255,255,0.08);
                        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                        margin: 1.5rem auto;
                    }
                    .blog-article-prose hr {
                        border: none; border-top: 1px solid rgba(255,255,255,0.07);
                        margin: 2.5rem 0;
                    }

                    /* ── Author Footer ── */
                    .bp-author-footer {
                        display: flex; flex-wrap: wrap; align-items: center;
                        justify-content: space-between; gap: 1rem;
                        margin-top: 3.5rem; padding-top: 2rem;
                        border-top: 1px solid rgba(255,255,255,0.07);
                    }
                    .bp-author-avatar {
                        width: 48px; height: 48px; border-radius: 50%;
                        background: linear-gradient(135deg,#6366f1,#8b5cf6);
                        display: flex; align-items: center; justify-content: center;
                        font-weight: 800; font-size: 1.1rem; color: #fff; flex-shrink: 0;
                    }
                    .bp-author-info { display: flex; flex-direction: column; flex: 1; }
                    .bp-author-label { font-size: 11px; font-weight: 600; color: #334155; text-transform: uppercase; letter-spacing: 0.06em; }
                    .bp-author-name { font-size: 0.95rem; font-weight: 800; color: #e2e8f0; }
                    .bp-more-link {
                        display: inline-flex; align-items: center; gap: 0.4rem;
                        font-size: 12px; font-weight: 700; color: #6366f1;
                        background: rgba(99,102,241,0.08); border: 1px solid rgba(99,102,241,0.2);
                        padding: 0.5rem 1rem; border-radius: 10px; text-decoration: none;
                        transition: all 0.25s;
                    }
                    .bp-more-link:hover { background: rgba(99,102,241,0.15); border-color: rgba(99,102,241,0.4); color: #818cf8; }

                    /* ── RELATED ── */
                    .bp-related {
                        background: #0a0c14;
                        border-top: 1px solid rgba(255,255,255,0.06);
                        padding: 5rem 1.5rem;
                    }
                    .bp-related-inner { max-width: 1100px; margin: 0 auto; }
                    .bp-related-header {
                        display: flex; align-items: center; justify-content: space-between;
                        margin-bottom: 2.5rem;
                    }
                    .bp-related-title {
                        font-size: 1.4rem; font-weight: 900; color: #e2e8f0;
                        letter-spacing: -0.02em;
                    }
                    .bp-related-all {
                        display: inline-flex; align-items: center; gap: 0.35rem;
                        font-size: 12px; font-weight: 700; color: #6366f1;
                        text-decoration: none; transition: color 0.2s;
                    }
                    .bp-related-all:hover { color: #818cf8; }

                    .bp-related-grid {
                        display: grid; grid-template-columns: 1fr;
                        gap: 1.25rem;
                    }
                    @media (min-width: 640px)  { .bp-related-grid { grid-template-columns: repeat(2,1fr); } }
                    @media (min-width: 1024px) { .bp-related-grid { grid-template-columns: repeat(3,1fr); } }

                    .bp-related-card {
                        display: flex; flex-direction: column;
                        background: #0d1117; border: 1px solid rgba(255,255,255,0.07);
                        border-radius: 18px; overflow: hidden; text-decoration: none;
                        transition: all 0.3s;
                    }
                    .bp-related-card:hover { border-color: rgba(99,102,241,0.25); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(99,102,241,0.12); }
                    .bp-related-card-img-wrap { position: relative; aspect-ratio: 16/9; overflow: hidden; }
                    .bp-related-card-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; opacity: 0.7; }
                    .bp-related-card:hover .bp-related-card-img { transform: scale(1.05); opacity: 0.85; }
                    .bp-related-card-img-empty { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: #13161f; }
                    .bp-related-card-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(13,17,23,.5) 0%, transparent 60%); }
                    .bp-related-card-body { padding: 1.25rem; display: flex; flex-direction: column; flex: 1; }
                    .bp-related-card-date { display: flex; align-items: center; gap: 0.35rem; font-size: 11px; font-weight: 700; color: #6366f1; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.6rem; }
                    .bp-related-card-title { font-size: 0.95rem; font-weight: 800; color: #e2e8f0; line-height: 1.4; margin-bottom: 0.5rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; transition: color 0.2s; }
                    .bp-related-card:hover .bp-related-card-title { color: #c7d2fe; }
                    .bp-related-card-desc { font-size: 12px; color: #334155; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; flex: 1; margin-bottom: 1rem; font-weight: 500; }
                    .bp-related-card-cta { display: flex; align-items: center; gap: 0.35rem; font-size: 11px; font-weight: 800; color: #6366f1; text-transform: uppercase; letter-spacing: 0.05em; transition: gap 0.25s; }
                    .bp-related-card:hover .bp-related-card-cta { gap: 0.6rem; }

                    @media (max-width: 640px) {
                        .bp-hero { padding: 7rem 1.25rem 3rem; }
                        .bp-body-layout { padding: 2rem 1.25rem 4rem; }
                        .bp-featured-img-wrap { padding: 1.5rem 1.25rem 0; }
                    }
                `}</style>
            </div>

            {/* Floating CTA — shown only when post has a matching tool tag */}
            {ctaConfig && (
                <FloatingCTA
                    title={ctaConfig.title}
                    badge={ctaConfig.badge}
                    buttonLink={ctaConfig.buttonLink}
                    gradient={ctaConfig.gradient}
                />
            )}
        </>
    );
}
