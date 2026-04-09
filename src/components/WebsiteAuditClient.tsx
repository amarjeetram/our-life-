"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
    Search, Globe, Loader2, ArrowRight, RefreshCw, Zap,
    CheckCircle2, XCircle, AlertTriangle, Info,
    Shield, Smartphone, FileText, Tag, Link2, Image as Img,
    BarChart2, Code2, Settings, Eye, EyeOff, Copy, Download,
    ChevronDown, ChevronUp, BookOpen, Star, TrendingUp,
    AlertCircle, Lock, Activity, Layers, Hash, Type,
} from 'lucide-react';
import toast from 'react-hot-toast';

// ─── Types ────────────────────────────────────────────────────────────────────
type Priority = 'critical' | 'high' | 'medium' | 'low' | 'pass' | 'info';
type Category = 'Technical SEO' | 'On-Page SEO' | 'Content' | 'Performance' | 'Mobile' | 'Security' | 'Accessibility' | 'Schema' | 'Links';

interface Issue {
    id: string;
    category: Category;
    label: string;
    priority: Priority;
    problem: string;
    why: string;
    fix: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    impact: 'Low' | 'Moderate' | 'High';
    detail?: string;
    codeSnippet?: string;
}

interface AuditData {
    html: string;
    headers: Record<string, string>;
    statusCode: number;
    origin: string;
    robots: { exists: boolean; content: string };
    sitemap: { exists: boolean; content: string; status: number };
    competitorData: { html: string; headers: Record<string, string>; statusCode: number } | null;
    fetchedAt: string;
}

interface ScoreSummary { seo: number; content: number; performance: number; mobile: number; security: number; accessibility: number; overall: number; }

// ─── Helpers ─────────────────────────────────────────────────────────────────
const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bg: string; border: string; icon: React.ReactNode }> = {
    critical: { label: 'Critical', color: '#dc2626', bg: '#fef2f2', border: '#fecaca', icon: <XCircle size={14} /> },
    high:     { label: 'High',     color: '#ea580c', bg: '#fff7ed', border: '#fed7aa', icon: <AlertTriangle size={14} /> },
    medium:   { label: 'Medium',   color: '#ca8a04', bg: '#fefce8', border: '#fef08a', icon: <AlertCircle size={14} /> },
    low:      { label: 'Low',      color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe', icon: <Info size={14} /> },
    pass:     { label: 'Pass',     color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0', icon: <CheckCircle2 size={14} /> },
    info:     { label: 'Info',     color: '#6366f1', bg: '#eef2ff', border: '#c7d2fe', icon: <Info size={14} /> },
};

const CATEGORY_CONFIG: Record<Category, { gradient: string; icon: React.ReactNode }> = {
    'Technical SEO': { gradient: 'linear-gradient(135deg,#10b981,#059669)', icon: <Settings size={16} /> },
    'On-Page SEO':   { gradient: 'linear-gradient(135deg,#3b82f6,#2563eb)', icon: <Tag size={16} /> },
    'Content':       { gradient: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', icon: <BookOpen size={16} /> },
    'Performance':   { gradient: 'linear-gradient(135deg,#f59e0b,#d97706)', icon: <Zap size={16} /> },
    'Mobile':        { gradient: 'linear-gradient(135deg,#06b6d4,#0891b2)', icon: <Smartphone size={16} /> },
    'Security':      { gradient: 'linear-gradient(135deg,#ef4444,#dc2626)', icon: <Shield size={16} /> },
    'Accessibility': { gradient: 'linear-gradient(135deg,#ec4899,#db2777)', icon: <Eye size={16} /> },
    'Schema':        { gradient: 'linear-gradient(135deg,#6366f1,#4f46e5)', icon: <Code2 size={16} /> },
    'Links':         { gradient: 'linear-gradient(135deg,#14b8a6,#0d9488)', icon: <Link2 size={16} /> },
};

function scoreColor(s: number) { return s >= 80 ? '#16a34a' : s >= 60 ? '#ca8a04' : s >= 40 ? '#ea580c' : '#dc2626'; }
function scoreLabel(s: number) { return s >= 90 ? 'Excellent' : s >= 70 ? 'Good' : s >= 50 ? 'Needs Improvement' : 'Critical'; }

function el(html: string, sel: string) {
    const matches: string[] = [];
    const re = new RegExp(`<${sel}[^>]*>([\\s\\S]*?)<\\/${sel}>`, 'gi');
    let m; while ((m = re.exec(html)) !== null) matches.push(m[0]);
    return matches;
}

function attr(tag: string, name: string) {
    const re = new RegExp(`${name}=["']([^"']*)["']`, 'i');
    const m = re.exec(tag); return m ? m[1] : '';
}

function stripTags(html: string) { return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }

function readabilityScore(text: string) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(Boolean);
    if (!sentences.length || !words.length) return 50;
    const avgWordsPerSentence = words.length / sentences.length;
    if (avgWordsPerSentence > 25) return 35;
    if (avgWordsPerSentence > 18) return 60;
    return 80;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN ANALYSIS ENGINE
// ─────────────────────────────────────────────────────────────────────────────
function runAudit(data: AuditData, targetKeyword: string): { issues: Issue[]; scores: ScoreSummary } {
    const { html, headers, origin, robots, sitemap } = data;
    const lower = html.toLowerCase();
    const issues: Issue[] = [];
    const kw = targetKeyword.toLowerCase().trim();

    // ── HELPERS ──────────────────────────────────────────────────────────────
    const add = (issue: Issue) => issues.push(issue);

    // ═══════════════════════════════════════════════════════════════════════
    // 1) TECHNICAL SEO
    // ═══════════════════════════════════════════════════════════════════════

    // robots.txt
    if (!robots.exists) {
        add({ id:'robots-missing', category:'Technical SEO', label:'robots.txt Missing', priority:'high',
            problem:'No robots.txt file found at /robots.txt.',
            why:'Search engines use robots.txt to understand crawl rules. Missing it can cause unintended pages to be crawled.',
            fix:'Create a robots.txt at your root domain. Example:\nUser-agent: *\nAllow: /\nSitemap: https://yourdomain.com/sitemap.xml',
            difficulty:'Easy', impact:'Moderate',
            codeSnippet:'User-agent: *\nAllow: /\nSitemap: https://yourdomain.com/sitemap.xml'
        });
    } else {
        add({ id:'robots-ok', category:'Technical SEO', label:'robots.txt Found', priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
            detail:'robots.txt exists and is accessible.',
        });
        // Check if Googlebot is blocked
        if (/disallow:\s*\//i.test(robots.content) && robots.content.toLowerCase().includes('user-agent: *')) {
            add({ id:'robots-block', category:'Technical SEO', label:'robots.txt Blocking All Crawlers', priority:'critical',
                problem:'Your robots.txt may be blocking all crawlers from accessing your site.',
                why:'If Googlebot is blocked, your site will NOT appear in search results.',
                fix:'Review your robots.txt. Replace "Disallow: /" with "Allow: /" for User-agent: *.',
                difficulty:'Easy', impact:'High',
            });
        }
    }

    // sitemap.xml
    if (!sitemap.exists) {
        add({ id:'sitemap-missing', category:'Technical SEO', label:'sitemap.xml Missing', priority:'high',
            problem:'No sitemap.xml found at /sitemap.xml.',
            why:'Sitemaps help Google discover and index all your pages faster.',
            fix:'Generate a sitemap.xml and submit it to Google Search Console. Most CMSs (WordPress, Next.js) can auto-generate these.',
            difficulty:'Medium', impact:'High',
        });
    } else {
        const sitemapUrls = (sitemap.content.match(/<loc>([^<]+)<\/loc>/gi) || []).length;
        add({ id:'sitemap-ok', category:'Technical SEO', label:'sitemap.xml Found', priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
            detail:`Sitemap found with approximately ${sitemapUrls} URLs.`,
        });
        // Check for non-200 in sitemap responses
        if (sitemap.status !== 200) {
            add({ id:'sitemap-error', category:'Technical SEO', label:'Sitemap Not Accessible', priority:'high',
                problem:`Sitemap returned HTTP ${sitemap.status} instead of 200.`,
                why:'Search engines cannot read a sitemap that fails to load.',
                fix:'Fix the server error so /sitemap.xml returns a valid 200 response.',
                difficulty:'Medium', impact:'High',
            });
        }
    }

    // HTTPS
    const isHttps = origin.startsWith('https://');
    if (!isHttps) {
        add({ id:'https-missing', category:'Technical SEO', label:'HTTPS Not Enabled', priority:'critical',
            problem:'Your site is using HTTP instead of HTTPS.',
            why:'HTTPS is a confirmed Google ranking factor. Non-HTTPS sites show "Not Secure" warnings to users.',
            fix:'Install an SSL/TLS certificate (free via Let\'s Encrypt). Redirect all HTTP traffic to HTTPS.',
            difficulty:'Medium', impact:'High',
        });
    } else {
        add({ id:'https-ok', category:'Technical SEO', label:'HTTPS / SSL Enabled', priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
            detail:'Site is served over HTTPS. ✓',
        });
    }

    // Canonical
    const canonMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
    if (!canonMatch) {
        add({ id:'canonical-missing', category:'Technical SEO', label:'Canonical Tag Missing', priority:'high',
            problem:'No canonical link tag was found on this page.',
            why:'Without canonical tags, search engines may index duplicate content versions of your page.',
            fix:'Add <link rel="canonical" href="https://yourdomain.com/this-page-slug" /> inside your <head>.',
            difficulty:'Easy', impact:'Moderate',
            codeSnippet:'<link rel="canonical" href="https://yourdomain.com/page-url" />',
        });
    } else {
        add({ id:'canonical-ok', category:'Technical SEO', label:'Canonical Tag Present', priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
            detail:`Canonical: ${canonMatch[1]}`,
        });
    }

    // noindex
    const noindexMeta = /content=["'][^"']*noindex[^"']*["']/i.test(html);
    const noindexHeader = (headers['x-robots-tag'] || '').toLowerCase().includes('noindex');
    if (noindexMeta || noindexHeader) {
        add({ id:'noindex', category:'Technical SEO', label:'Page Has noindex Directive', priority:'critical',
            problem:`This page has a "noindex" directive ${noindexMeta ? 'in meta robots tag' : 'in X-Robots-Tag header'}.`,
            why:'Search engines will NOT index this page — it will never appear in Google.',
            fix:'Remove the noindex directive from your meta robots tag unless this page is intentionally excluded.',
            difficulty:'Easy', impact:'High',
            codeSnippet:'<!-- Remove or change this: -->\n<meta name="robots" content="noindex" />\n<!-- To this: -->\n<meta name="robots" content="index, follow" />',
        });
    } else {
        add({ id:'indexable-ok', category:'Technical SEO', label:'Page Indexable', priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
            detail:'No noindex directive found. Page is indexable by search engines.',
        });
    }

    // URL length
    const url = data.html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] || origin;
    if (url.length > 100) {
        add({ id:'url-long', category:'Technical SEO', label:'URL Too Long', priority:'medium',
            problem:`URL is ${url.length} characters long (recommended: under 75).`,
            why:'Long URLs are harder to share, read, and may be truncated in search results.',
            fix:'Use short, descriptive, hyphenated slugs. Remove unnecessary parameters and subfolders.',
            difficulty:'Hard', impact:'Low',
        });
    }

    // Trailing slash consistency is hard to check from HTML alone — skip for now

    // ═══════════════════════════════════════════════════════════════════════
    // 2) ON-PAGE SEO
    // ═══════════════════════════════════════════════════════════════════════

    // Title
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? stripTags(titleMatch[1]) : '';
    if (!title) {
        add({ id:'title-missing', category:'On-Page SEO', label:'Page Title Missing', priority:'critical',
            problem:'No <title> tag was found on this page.',
            why:'The title is the single most important on-page SEO element. Google uses it as the SERP headline.',
            fix:'Add a unique, descriptive title tag inside <head> between 50–60 characters.',
            difficulty:'Easy', impact:'High',
            codeSnippet:'<title>Your Primary Keyword | Brand Name</title>',
        });
    } else if (title.length < 30) {
        add({ id:'title-short', category:'On-Page SEO', label:'Title Too Short', priority:'high',
            problem:`Title is only ${title.length} characters: "${title}"`,
            why:'Short titles miss keyword opportunities and look incomplete in search results.',
            fix:'Expand your title to 50–60 characters. Include your primary keyword near the beginning.',
            difficulty:'Easy', impact:'High',
        });
    } else if (title.length > 70) {
        add({ id:'title-long', category:'On-Page SEO', label:'Title Too Long (May Be Truncated)', priority:'medium',
            problem:`Title is ${title.length} characters: "${title.substring(0,70)}…"`,
            why:'Google typically shows ~60 characters. Longer titles get cut off in search results.',
            fix:'Trim your title to under 60 characters while keeping the primary keyword at the front.',
            difficulty:'Easy', impact:'Moderate',
        });
    } else {
        add({ id:'title-ok', category:'On-Page SEO', label:'Title Tag Length is Good', priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
            detail:`Title (${title.length} chars): "${title}"`,
        });
    }
    if (kw && title && !title.toLowerCase().includes(kw)) {
        add({ id:'title-kw-missing', category:'On-Page SEO', label:'Keyword Missing from Title', priority:'high',
            problem:`Your target keyword "${targetKeyword}" is not in the page title.`,
            why:'Including the keyword in the title is one of the strongest on-page SEO signals.',
            fix:`Add "${targetKeyword}" to the beginning of your title tag.`,
            difficulty:'Easy', impact:'High',
        });
    }

    // Meta Description
    const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
        || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
    const desc = descMatch ? descMatch[1].trim() : '';
    if (!desc) {
        add({ id:'desc-missing', category:'On-Page SEO', label:'Meta Description Missing', priority:'high',
            problem:'No meta description was found.',
            why:'Google may auto-generate a snippet, often pulling random content. A good meta description improves click-through rates.',
            fix:'Write a 140–160 character description that includes your keyword and a compelling reason to click.',
            difficulty:'Easy', impact:'Moderate',
            codeSnippet:'<meta name="description" content="Your 140-160 character description with keyword." />',
        });
    } else if (desc.length < 80) {
        add({ id:'desc-short', category:'On-Page SEO', label:'Meta Description Too Short', priority:'medium',
            problem:`Meta description is only ${desc.length} characters.`,
            why:'Too-short descriptions miss the opportunity to fully describe the page and attract clicks.',
            fix:'Expand to 140–160 characters. Include your keyword and a clear value proposition.',
            difficulty:'Easy', impact:'Moderate',
        });
    } else if (desc.length > 170) {
        add({ id:'desc-long', category:'On-Page SEO', label:'Meta Description Too Long', priority:'medium',
            problem:`Meta description is ${desc.length} characters. Google clips at ~160.`,
            why:'Truncated descriptions look unprofessional in search results and miss the CTA.',
            fix:'Trim to 155–160 characters. Put the most important message first.',
            difficulty:'Easy', impact:'Low',
        });
    } else {
        add({ id:'desc-ok', category:'On-Page SEO', label:'Meta Description Length is Good', priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
            detail:`Meta description (${desc.length} chars): "${desc.substring(0,80)}…"`,
        });
    }
    if (kw && desc && !desc.toLowerCase().includes(kw)) {
        add({ id:'desc-kw-missing', category:'On-Page SEO', label:'Keyword Missing from Meta Description', priority:'medium',
            problem:`Target keyword "${targetKeyword}" not found in meta description.`,
            why:'Google bolds keywords in the SERP snippet, increasing click-through rate when the keyword appears.',
            fix:`Include "${targetKeyword}" naturally in your meta description.`,
            difficulty:'Easy', impact:'Moderate',
        });
    }

    // H1
    const h1Tags = el(html, 'h1');
    if (h1Tags.length === 0) {
        add({ id:'h1-missing', category:'On-Page SEO', label:'H1 Tag Missing', priority:'critical',
            problem:'No <h1> tag was found on this page.',
            why:'The H1 is the primary heading of your content. Google uses it to understand the page topic.',
            fix:'Add exactly one H1 tag that includes your primary keyword and describes the page accurately.',
            difficulty:'Easy', impact:'High',
            codeSnippet:'<h1>Your Primary Keyword - Descriptive Heading</h1>',
        });
    } else if (h1Tags.length > 1) {
        add({ id:'h1-multiple', category:'On-Page SEO', label:`Multiple H1 Tags (${h1Tags.length} found)`, priority:'high',
            problem:`${h1Tags.length} H1 tags found. Only one H1 per page is recommended.`,
            why:'Multiple H1 tags confuse search engines about the main topic of the page.',
            fix:'Keep only one H1 on the page. Convert other H1 tags to H2 or H3.',
            difficulty:'Easy', impact:'Moderate',
        });
    } else {
        const h1Text = stripTags(h1Tags[0]);
        add({ id:'h1-ok', category:'On-Page SEO', label:'H1 Tag Present', priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
            detail:`H1: "${h1Text.substring(0,80)}"`,
        });
        if (kw && !h1Text.toLowerCase().includes(kw)) {
            add({ id:'h1-kw-missing', category:'On-Page SEO', label:'Keyword Missing from H1', priority:'high',
                problem:`Keyword "${targetKeyword}" not found in the H1 tag.`,
                why:'Google places significant weight on the H1 for understanding page relevance.',
                fix:`Include "${targetKeyword}" in your H1 tag.`,
                difficulty:'Easy', impact:'High',
            });
        }
    }

    // H2/H3 hierarchy
    const h2Count = (html.match(/<h2[^>]*>/gi) || []).length;
    const h3Count = (html.match(/<h3[^>]*>/gi) || []).length;
    if (h2Count === 0) {
        add({ id:'h2-missing', category:'On-Page SEO', label:'No H2 Subheadings Found', priority:'medium',
            problem:'No H2 headings were detected on this page.',
            why:'H2 tags structure content and help search engines understand sub-topics.',
            fix:'Break your content into sections with descriptive H2 headings.',
            difficulty:'Easy', impact:'Moderate',
        });
    } else {
        add({ id:'h2-ok', category:'On-Page SEO', label:`${h2Count} H2 and ${h3Count} H3 Subheadings`, priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
            detail:`Found ${h2Count} H2 and ${h3Count} H3 headings — good content structure.`,
        });
    }

    // Open Graph
    const ogTitle  = lower.includes('property="og:title"') || lower.includes("property='og:title'");
    const ogDesc   = lower.includes('property="og:description"') || lower.includes("property='og:description'");
    const ogImage  = lower.includes('property="og:image"') || lower.includes("property='og:image'");
    const ogURL    = lower.includes('property="og:url"') || lower.includes("property='og:url'");
    const allOG = ogTitle && ogDesc && ogImage && ogURL;
    if (!allOG) {
        const missing = [!ogTitle&&'og:title',!ogDesc&&'og:description',!ogImage&&'og:image',!ogURL&&'og:url'].filter(Boolean).join(', ');
        add({ id:'og-incomplete', category:'On-Page SEO', label:'Open Graph Tags Incomplete', priority:'medium',
            problem:`Missing OG tags: ${missing}.`,
            why:'OG tags control how your page appears when shared on Facebook, LinkedIn, WhatsApp.',
            fix:'Add all 4 essential OG meta tags inside your <head>.',
            difficulty:'Easy', impact:'Moderate',
            codeSnippet:'<meta property="og:title" content="Page Title" />\n<meta property="og:description" content="Description" />\n<meta property="og:image" content="https://yoursite.com/image.jpg" />\n<meta property="og:url" content="https://yoursite.com/page" />',
        });
    } else {
        add({ id:'og-ok', category:'On-Page SEO', label:'Open Graph Tags Complete', priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
            detail:'All essential Open Graph tags found (title, description, image, url).',
        });
    }

    // Twitter Card
    const twitterCard = lower.includes('name="twitter:card"') || lower.includes("name='twitter:card'");
    if (!twitterCard) {
        add({ id:'twitter-missing', category:'On-Page SEO', label:'Twitter Card Tags Missing', priority:'low',
            problem:'No Twitter Card meta tags found.',
            why:'Twitter Card tags make your pages look great when shared on X (Twitter).',
            fix:'Add Twitter Card meta tags for better social sharing.',
            difficulty:'Easy', impact:'Low',
            codeSnippet:'<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:title" content="Page Title" />\n<meta name="twitter:description" content="Description" />',
        });
    } else {
        add({ id:'twitter-ok', category:'On-Page SEO', label:'Twitter Card Tags Present', priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low', detail:'Twitter card meta tags found.',
        });
    }

    // Keyword in URL
    if (kw) {
        const pageUrl = canonMatch?.[1] || '';
        if (pageUrl && !pageUrl.toLowerCase().includes(kw.replace(/\s+/g, '-'))) {
            add({ id:'kw-url', category:'On-Page SEO', label:'Keyword Missing from URL', priority:'medium',
                problem:`"${targetKeyword}" not present in the URL.`,
                why:'Keywords in URLs are a mild ranking signal and improve user understanding.',
                fix:`Use "${kw.replace(/\s+/g,'-')}" in your URL slug.`,
                difficulty:'Hard', impact:'Low',
            });
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 3) CONTENT
    // ═══════════════════════════════════════════════════════════════════════
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyText = bodyMatch ? stripTags(bodyMatch[1]) : stripTags(html);
    const words = bodyText.split(/\s+/).filter(w => w.length > 1);
    const wordCount = words.length;

    if (wordCount < 300) {
        add({ id:'thin-content', category:'Content', label:'Thin Content Detected', priority:'critical',
            problem:`Only ${wordCount} words found on this page.`,
            why:'Google Panda targets thin content. Pages with < 300 words rarely rank well.',
            fix:'Expand content to at least 600-800 words. Cover the topic comprehensively with examples, FAQs, and structured sections.',
            difficulty:'Hard', impact:'High',
        });
    } else if (wordCount < 600) {
        add({ id:'content-short', category:'Content', label:'Low Word Count', priority:'medium',
            problem:`${wordCount} words — below recommended 600+ for ranking pages.`,
            why:'Longer, comprehensive content tends to rank better and earn more backlinks.',
            fix:'Add more in-depth coverage: examples, comparisons, FAQs, or a step-by-step section.',
            difficulty:'Medium', impact:'Moderate',
        });
    } else {
        add({ id:'content-ok', category:'Content', label:`Good Content Length (${wordCount} words)`, priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
            detail:`${wordCount} words detected — solid content length.`,
        });
    }

    // Keyword density
    if (kw) {
        const kwCount = words.filter(w => w.toLowerCase().includes(kw)).length;
        const kwDensity = wordCount > 0 ? ((kwCount / wordCount) * 100).toFixed(2) : '0';
        const densityNum = parseFloat(kwDensity);
        if (densityNum === 0) {
            add({ id:'kw-density-zero', category:'Content', label:'Keyword Not Found in Content', priority:'high',
                problem:`"${targetKeyword}" was not detected in the body content.`,
                why:'Your page content must naturally include the target keyword to rank for it.',
                fix:'Include your keyword naturally throughout the content, especially in the intro, headings, and conclusion.',
                difficulty:'Medium', impact:'High',
            });
        } else if (densityNum > 3.5) {
            add({ id:'kw-stuffing', category:'Content', label:'Keyword Stuffing Detected', priority:'high',
                problem:`Keyword density is ${kwDensity}% — too high (over 3.5%).`,
                why:'Keyword stuffing is penalized by Google. It makes content feel spammy.',
                fix:'Reduce keyword frequency and use natural variations.',
                difficulty:'Easy', impact:'High',
            });
        } else {
            add({ id:'kw-density-ok', category:'Content', label:`Good Keyword Density (${kwDensity}%)`, priority:'pass',
                problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
                detail:`"${targetKeyword}" appears ${kwCount} times (${kwDensity}% density).`,
            });
        }
    }

    // Readability
    const rs = readabilityScore(bodyText);
    if (rs < 45) {
        add({ id:'readability-poor', category:'Content', label:'Poor Readability', priority:'medium',
            problem:'Content appears to have very long, complex sentences.',
            why:'Hard-to-read content increases bounce rate, which hurts rankings.',
            fix:'Write shorter sentences (under 20 words). Use bullet points and subheadings to break up text.',
            difficulty:'Medium', impact:'Moderate',
        });
    } else if (rs < 65) {
        add({ id:'readability-ok', category:'Content', label:'Average Readability', priority:'info',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
            detail:'Content readability is average. Could be improved with shorter sentences.',
        });
    } else {
        add({ id:'readability-good', category:'Content', label:'Good Readability', priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
            detail:'Content readability is good.',
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 4) PERFORMANCE (estimated from HTML)
    // ═══════════════════════════════════════════════════════════════════════
    const sizeKB = Math.round(html.length / 1024);
    if (sizeKB > 500) {
        add({ id:'page-size-critical', category:'Performance', label:`HTML Very Large (${sizeKB}KB)`, priority:'critical',
            problem:`Your HTML is ${sizeKB}KB — extremely large.`,
            why:'Large HTML causes slow Time to First Byte (TTFB) and increases parse time.',
            fix:'Remove inline scripts, inline CSS, duplicate code. Defer large JS to external files.',
            difficulty:'Hard', impact:'High',
        });
    } else if (sizeKB > 150) {
        add({ id:'page-size-warn', category:'Performance', label:`Large HTML Size (${sizeKB}KB)`, priority:'medium',
            problem:`HTML is ${sizeKB}KB. Recommended: under 150KB.`,
            why:'Larger pages take longer to download, parse, and render.',
            fix:'Minify HTML. Load non-critical content lazily. Move inline styles/scripts to external files.',
            difficulty:'Medium', impact:'Moderate',
        });
    } else {
        add({ id:'page-size-ok', category:'Performance', label:`HTML Size OK (${sizeKB}KB)`, priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
            detail:`HTML file is ${sizeKB}KB — within optimal range.`,
        });
    }

    // Render-blocking resources
    const renderBlockingCSS = (html.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi) || []).filter(t => !t.includes('media=')).length;
    const renderBlockingJS = (html.match(/<script[^>]*src=["'][^"']+["'][^>]*>/gi) || []).filter(t => !/defer|async/i.test(t)).length;
    if (renderBlockingJS > 3) {
        add({ id:'render-blocking-js', category:'Performance', label:`${renderBlockingJS} Render-Blocking Scripts`, priority:'high',
            problem:`${renderBlockingJS} <script> tags without defer/async detected.`,
            why:'Render-blocking scripts delay when users see your page content (high LCP).',
            fix:'Add "defer" or "async" attribute to all non-critical scripts.',
            difficulty:'Easy', impact:'High',
            codeSnippet:'<!-- Change this: -->\n<script src="app.js"></script>\n<!-- To this: -->\n<script src="app.js" defer></script>',
        });
    } else if (renderBlockingJS > 0) {
        add({ id:'render-blocking-js-warn', category:'Performance', label:`${renderBlockingJS} Scripts Without defer/async`, priority:'medium',
            problem:`${renderBlockingJS} scripts may be render-blocking.`,
            why:'Scripts loaded without defer/async can delay page rendering.',
            fix:'Add defer or async to non-critical scripts.',
            difficulty:'Easy', impact:'Moderate',
        });
    }

    if (renderBlockingCSS > 5) {
        add({ id:'render-blocking-css', category:'Performance', label:`Many Stylesheets (${renderBlockingCSS})`, priority:'medium',
            problem:`${renderBlockingCSS} CSS files detected.`,
            why:'Too many separate CSS files increase HTTP requests and can delay render.',
            fix:'Bundle CSS files together. Use media queries to load print/mobile CSS conditionally.',
            difficulty:'Medium', impact:'Moderate',
        });
    }

    // Lazy loading
    const imgTags = html.match(/<img[^>]+>/gi) || [];
    const imgNoLazy = imgTags.filter(t => !/loading=["']lazy["']/i.test(t));
    if (imgTags.length > 3 && imgNoLazy.length > imgTags.length * 0.6) {
        add({ id:'lazy-load', category:'Performance', label:'Images Missing lazy loading', priority:'medium',
            problem:`${imgNoLazy.length} of ${imgTags.length} images don't have loading="lazy".`,
            why:'Lazy loading defers off-screen images, improving initial page load speed.',
            fix:'Add loading="lazy" to all <img> tags that are not in the initial viewport.',
            difficulty:'Easy', impact:'Moderate',
            codeSnippet:'<img src="photo.jpg" alt="Description" loading="lazy" />',
        });
    }

    // Preconnect hints
    const hasPreconnect = lower.includes('rel="preconnect"') || lower.includes("rel='preconnect'");
    if (!hasPreconnect) {
        add({ id:'preconnect-missing', category:'Performance', label:'No Preconnect Resource Hints', priority:'low',
            problem:'No preconnect or dns-prefetch hints found.',
            why:'Preconnect hints speed up connections to external resources (fonts, CDN, analytics).',
            fix:'Add preconnect tags for critical external domains.',
            difficulty:'Easy', impact:'Low',
            codeSnippet:'<link rel="preconnect" href="https://fonts.googleapis.com" />\n<link rel="preconnect" href="https://cdn.yourdomain.com" />',
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 5) MOBILE
    // ═══════════════════════════════════════════════════════════════════════
    const viewportMeta = /name=["']viewport["']/i.test(html);
    if (!viewportMeta) {
        add({ id:'viewport-missing', category:'Mobile', label:'Viewport Meta Tag Missing', priority:'critical',
            problem:'No viewport meta tag found.',
            why:'Without viewport meta, mobile devices render the desktop version — broken layout.',
            fix:'Add the viewport meta tag inside <head>.',
            difficulty:'Easy', impact:'High',
            codeSnippet:'<meta name="viewport" content="width=device-width, initial-scale=1" />',
        });
    } else {
        add({ id:'viewport-ok', category:'Mobile', label:'Viewport Meta Tag Present', priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
            detail:'Mobile viewport is configured correctly.',
        });
    }

    // Font-size check (simplified — check for small font declarations)
    if (lower.includes('font-size: 10px') || lower.includes('font-size:10px') || lower.includes('font-size: 11px')) {
        add({ id:'font-size-small', category:'Mobile', label:'Small Font Size Detected', priority:'medium',
            problem:'Font sizes below 12px found in inline styles.',
            why:'Google requires readable font sizes on mobile (minimum 12px).',
            fix:'Use font sizes of at least 16px for body text on mobile.',
            difficulty:'Easy', impact:'Moderate',
        });
    }

    // Touch targets (check for very small buttons)
    const smallButtons = (html.match(/<button[^>]+style=["'][^"']*width:\s*[0-2]\d?px[^"']*["']/gi) || []).length;
    if (smallButtons > 0) {
        add({ id:'touch-targets', category:'Mobile', label:'Small Touch Targets Detected', priority:'medium',
            problem:`${smallButtons} buttons with small dimensions detected.`,
            why:'Google requires tap targets of at least 48×48px for mobile usability.',
            fix:'Make all buttons at least 48×48px. Add padding to small elements.',
            difficulty:'Easy', impact:'Moderate',
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 6) SECURITY
    // ═══════════════════════════════════════════════════════════════════════
    const hsts = headers['strict-transport-security'];
    const csp = headers['content-security-policy'];
    const xfo = headers['x-frame-options'];
    const xcto = headers['x-content-type-options'];
    const rp = headers['referrer-policy'];

    if (!hsts && isHttps) {
        add({ id:'hsts-missing', category:'Security', label:'HSTS Header Missing', priority:'medium',
            problem:'Strict-Transport-Security header not found.',
            why:'HSTS tells browsers to always use HTTPS, preventing downgrade attacks.',
            fix:'Add HSTS header on your server / CDN: Strict-Transport-Security: max-age=31536000; includeSubDomains',
            difficulty:'Medium', impact:'Moderate',
        });
    } else if (hsts) {
        add({ id:'hsts-ok', category:'Security', label:'HSTS Header Present', priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low', detail:`HSTS: ${hsts.substring(0,60)}`,
        });
    }

    if (!csp) {
        add({ id:'csp-missing', category:'Security', label:'Content-Security-Policy Missing', priority:'medium',
            problem:'No Content-Security-Policy header found.',
            why:'CSP prevents XSS attacks by controlling what resources the browser can load.',
            fix:'Implement a CSP header. Start with a basic policy and tighten over time.',
            difficulty:'Hard', impact:'Moderate',
        });
    } else {
        add({ id:'csp-ok', category:'Security', label:'CSP Header Present', priority:'pass', problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low', detail:'Content-Security-Policy found.' });
    }

    if (!xfo) {
        add({ id:'xfo-missing', category:'Security', label:'X-Frame-Options Missing', priority:'medium',
            problem:'No X-Frame-Options header.',
            why:'Missing X-Frame-Options makes your site vulnerable to clickjacking attacks.',
            fix:'Add: X-Frame-Options: SAMEORIGIN',
            difficulty:'Easy', impact:'Moderate',
        });
    } else {
        add({ id:'xfo-ok', category:'Security', label:'X-Frame-Options Present', priority:'pass', problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low', detail:`X-Frame-Options: ${xfo}` });
    }

    if (!xcto) {
        add({ id:'xcto-missing', category:'Security', label:'X-Content-Type-Options Missing', priority:'low',
            problem:'No X-Content-Type-Options header.',
            why:'Without this, browsers may MIME-sniff responses, which can be exploited.',
            fix:'Add: X-Content-Type-Options: nosniff',
            difficulty:'Easy', impact:'Low',
        });
    }

    if (!rp) {
        add({ id:'rp-missing', category:'Security', label:'Referrer-Policy Header Missing', priority:'low',
            problem:'No Referrer-Policy header set.',
            why:'Controls how much referrer information is included. Protects user privacy.',
            fix:'Add: Referrer-Policy: strict-origin-when-cross-origin',
            difficulty:'Easy', impact:'Low',
        });
    }

    // Trust pages
    const hasPrivacy = lower.includes('/privacy') || lower.includes('privacy-policy') || lower.includes('privacy policy');
    const hasContact = lower.includes('/contact') || lower.includes('contact us') || lower.includes('contact-us');
    if (!hasPrivacy) {
        add({ id:'privacy-missing', category:'Security', label:'Privacy Policy Link Not Found', priority:'medium',
            problem:'No link to a privacy policy page detected.',
            why:'Privacy policy is legally required in many regions (GDPR, CCPA). Also a Google E-E-A-T signal.',
            fix:'Create a privacy policy page and link to it from your footer.',
            difficulty:'Easy', impact:'Moderate',
        });
    }
    if (!hasContact) {
        add({ id:'contact-missing', category:'Security', label:'Contact Page Not Found', priority:'low',
            problem:'No link to a contact page detected.',
            why:'Contact info is an E-E-A-T trust signal. Google values sites with clear contact info.',
            fix:'Add a Contact Us page and link to it from your header or footer.',
            difficulty:'Easy', impact:'Low',
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 7) ACCESSIBILITY
    // ═══════════════════════════════════════════════════════════════════════
    const imgNoAlt = imgTags.filter(t => !/alt=["'][^"']+["']/i.test(t) && !/alt=["']["']/i.test(t) === false);
    const imgMissingAlt = imgTags.filter(t => !/alt=/i.test(t));
    if (imgMissingAlt.length > 0) {
        add({ id:'img-alt-missing', category:'Accessibility', label:`${imgMissingAlt.length} Images Missing alt Text`, priority: imgMissingAlt.length > 5 ? 'high' : 'medium',
            problem:`${imgMissingAlt.length} of ${imgTags.length} images have no alt attribute.`,
            why:'Screen readers need alt text to describe images. Also affects image SEO.',
            fix:'Add descriptive alt attributes to all meaningful images. Decorative images use alt="".',
            difficulty:'Easy', impact:'Moderate',
            codeSnippet:'<img src="photo.jpg" alt="Descriptive text about the image" />',
        });
    } else if (imgTags.length > 0) {
        add({ id:'img-alt-ok', category:'Accessibility', label:'All Images Have alt Text', priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
            detail:`All ${imgTags.length} images have alt attributes.`,
        });
    }

    // Lang attribute
    const hasLang = /html[^>]+lang=/i.test(html);
    if (!hasLang) {
        add({ id:'lang-missing', category:'Accessibility', label:'HTML lang Attribute Missing', priority:'medium',
            problem:'The <html> element does not have a lang attribute.',
            why:'Screen readers need lang to use the correct pronunciation. Also helps WordPress/Google understand language.',
            fix:'Add lang="en" (or your language code) to the <html> tag.',
            difficulty:'Easy', impact:'Moderate',
            codeSnippet:'<html lang="en">',
        });
    } else {
        add({ id:'lang-ok', category:'Accessibility', label:'HTML lang Attribute Present', priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
        });
    }

    // Favicon
    const hasFavicon = lower.includes('rel="icon"') || lower.includes("rel='icon'") || lower.includes('rel="shortcut icon"');
    if (!hasFavicon) {
        add({ id:'favicon-missing', category:'Accessibility', label:'Favicon Not Declared', priority:'low',
            problem:'No favicon link tag found in <head>.',
            why:'Favicons improve brand recognition and appear in browser tabs and bookmarks.',
            fix:'Add a favicon link tag.',
            difficulty:'Easy', impact:'Low',
            codeSnippet:'<link rel="icon" type="image/png" href="/favicon.png" />',
        });
    } else {
        add({ id:'favicon-ok', category:'Accessibility', label:'Favicon Declared', priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 8) SCHEMA / STRUCTURED DATA
    // ═══════════════════════════════════════════════════════════════════════
    const hasSchema = lower.includes('application/ld+json');
    const hasSchemaOrg = lower.includes('schema.org');

    if (!hasSchema && !hasSchemaOrg) {
        add({ id:'schema-missing', category:'Schema', label:'No Structured Data Found', priority:'high',
            problem:'No JSON-LD or Schema.org structured data detected.',
            why:'Structured data enables rich results in Google (stars, FAQs, breadcrumbs) — dramatically improving CTR.',
            fix:'Add JSON-LD structured data appropriate for your page type.',
            difficulty:'Medium', impact:'High',
            codeSnippet:'<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "WebPage",\n  "name": "Page Title",\n  "description": "Page description"\n}\n</script>',
        });
    } else {
        // Detect schema types
        const schemaTypes: string[] = [];
        const schemaMatches = html.match(/"@type"\s*:\s*"([^"]+)"/g) || [];
        schemaMatches.forEach(m => { const t = m.match(/"@type"\s*:\s*"([^"]+)"/); if (t) schemaTypes.push(t[1]); });
        const uniqueTypes = [...new Set(schemaTypes)];

        add({ id:'schema-found', category:'Schema', label:`Structured Data Found (${uniqueTypes.length} type${uniqueTypes.length!==1?'s':''})`, priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
            detail:`Detected schema types: ${uniqueTypes.length > 0 ? uniqueTypes.join(', ') : 'Unknown'}`,
        });

        // Check for FAQ schema
        if (!uniqueTypes.includes('FAQPage') && wordCount > 400) {
            add({ id:'schema-faq-missing', category:'Schema', label:'FAQPage Schema Not Found', priority:'info',
                problem:'No FAQPage schema detected on this content-rich page.',
                why:'FAQ schema can give you FAQ rich results in Google, expanding your SERP real estate.',
                fix:'Add FAQPage JSON-LD with your most common questions.',
                difficulty:'Medium', impact:'Moderate',
            });
        }
        if (!uniqueTypes.includes('BreadcrumbList')) {
            add({ id:'schema-breadcrumb', category:'Schema', label:'Breadcrumb Schema Missing', priority:'info',
                problem:'No BreadcrumbList schema detected.',
                why:'Breadcrumb rich results appear in Google SERPs and help users understand site structure.',
                fix:'Add BreadcrumbList JSON-LD schema.',
                difficulty:'Medium', impact:'Low',
            });
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // 9) LINKS
    // ═══════════════════════════════════════════════════════════════════════
    const allLinks = html.match(/<a[^>]+href=["']([^"']+)["'][^>]*>/gi) || [];
    const internalLinks = allLinks.filter(t => {
        const href = attr(t, 'href');
        return href.startsWith('/') || href.includes(new URL(origin).hostname);
    });
    const externalLinks = allLinks.filter(t => {
        const href = attr(t, 'href');
        return href.startsWith('http') && !href.includes(new URL(origin).hostname);
    });

    if (internalLinks.length < 3) {
        add({ id:'internal-links-few', category:'Links', label:`Only ${internalLinks.length} Internal Links`, priority:'medium',
            problem:`Very few internal links found (${internalLinks.length}).`,
            why:'Internal links distribute PageRank across your site and help users discover related content.',
            fix:'Add links to 3-5 related articles/pages from this page. Use descriptive anchor text.',
            difficulty:'Easy', impact:'Moderate',
        });
    } else {
        add({ id:'internal-links-ok', category:'Links', label:`${internalLinks.length} Internal Links`, priority:'pass',
            problem:'', why:'', fix:'', difficulty:'Easy', impact:'Low',
            detail:`${internalLinks.length} internal and ${externalLinks.length} external links found.`,
        });
    }

    // Nofollow on all external links
    const exNoFollow = externalLinks.every(t => /rel=["'][^"']*nofollow[^"']*["']/i.test(t));
    if (externalLinks.length > 0 && exNoFollow) {
        add({ id:'all-nofollow', category:'Links', label:'All External Links are nofollow', priority:'info',
            problem:'All external links have rel="nofollow".',
            why:'While nofollow is fine for paid/untrusted links, linking to quality resources without nofollow builds credibility.',
            fix:'Use nofollow selectively. Let trusted external links pass.',
            difficulty:'Easy', impact:'Low',
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SCORE CALCULATION
    // ═══════════════════════════════════════════════════════════════════════
    function catScore(cat: Category): number {
        const catIssues = issues.filter(i => i.category === cat);
        if (catIssues.length === 0) return 70;
        const total = catIssues.length;
        const passCount = catIssues.filter(i => i.priority === 'pass').length;
        const infoCount = catIssues.filter(i => i.priority === 'info').length;
        const lowCount = catIssues.filter(i => i.priority === 'low').length;
        const medCount = catIssues.filter(i => i.priority === 'medium').length;
        const hiCount = catIssues.filter(i => i.priority === 'high').length;
        const critCount = catIssues.filter(i => i.priority === 'critical').length;
        const score = ((passCount * 1 + infoCount * 0.9 + lowCount * 0.7 + medCount * 0.4 + hiCount * 0.15 + critCount * 0) / total) * 100;
        return Math.round(Math.min(100, Math.max(0, score)));
    }

    const seoScore = Math.round((catScore('On-Page SEO') + catScore('Technical SEO')) / 2);
    const contentScore = catScore('Content');
    const performanceScore = catScore('Performance');
    const mobileScore = catScore('Mobile');
    const securityScore = catScore('Security');
    const accessibilityScore = catScore('Accessibility');
    const overall = Math.round((seoScore * 0.35 + contentScore * 0.2 + performanceScore * 0.15 + mobileScore * 0.1 + securityScore * 0.1 + accessibilityScore * 0.1));

    return {
        issues,
        scores: { seo: seoScore, content: contentScore, performance: performanceScore, mobile: mobileScore, security: securityScore, accessibility: accessibilityScore, overall },
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// SUBCOMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function CircleScore({ score, label, size = 80 }: { score: number; label: string; size?: number }) {
    const color = scoreColor(score);
    const inner = size * 0.82;
    return (
        <div style={{ textAlign: 'center' }}>
            <div style={{
                width: size, height: size, borderRadius: '50%',
                background: `conic-gradient(${color} ${score * 3.6}deg, #e2e8f0 0deg)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 0 4px white, 0 0 0 6px ${color}22`,
            }}>
                <div style={{ width: inner, height: inner, borderRadius: '50%', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: size * 0.24, fontWeight: 900, color, lineHeight: 1 }}>{score}</span>
                </div>
            </div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#64748b', marginTop: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
        </div>
    );
}

function IssueRow({ issue, proMode }: { issue: Issue; proMode: boolean }) {
    const [open, setOpen] = useState(false);
    const pc = PRIORITY_CONFIG[issue.priority];
    if (issue.priority === 'pass') {
        return (
            <div style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 20px',
                borderBottom: '1px solid #f1f5f9',
            }}>
                <div style={{ color: pc.color, flexShrink: 0 }}>{pc.icon}</div>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#374151', flex: 1 }}>{issue.label}</span>
                {issue.detail && <span style={{ fontSize: 12, color: '#94a3b8', textAlign: 'right', maxWidth: 300 }}>{issue.detail}</span>}
            </div>
        );
    }
    return (
        <div style={{ borderBottom: '1px solid #f1f5f9' }}>
            <button
                onClick={() => setOpen(o => !o)}
                style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 20px', background: 'transparent', border: 'none',
                    cursor: 'pointer', textAlign: 'left',
                }}
            >
                <div style={{
                    padding: '3px 8px', borderRadius: 100, fontSize: 11, fontWeight: 800,
                    background: pc.bg, border: `1px solid ${pc.border}`, color: pc.color,
                    display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0, whiteSpace: 'nowrap',
                }}>
                    {pc.icon} {pc.label}
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', flex: 1 }}>{issue.label}</span>
                <div style={{ color: '#94a3b8', flexShrink: 0 }}>{open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</div>
            </button>
            {open && (
                <div style={{ padding: '0 20px 20px 20px', background: '#fafbff' }}>
                    {/* Beginner mode */}
                    {!proMode && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <div style={{ background: pc.bg, border: `1px solid ${pc.border}`, borderRadius: 12, padding: 14 }}>
                                <p style={{ fontSize: 12, fontWeight: 700, color: pc.color, marginBottom: 4, textTransform: 'uppercase' }}>🔴 Problem</p>
                                <p style={{ fontSize: 14, color: '#374151', margin: 0 }}>{issue.problem}</p>
                            </div>
                            <div style={{ background: '#fffbeb', border: '1px solid #fef08a', borderRadius: 12, padding: 14 }}>
                                <p style={{ fontSize: 12, fontWeight: 700, color: '#ca8a04', marginBottom: 4, textTransform: 'uppercase' }}>💡 Why it matters</p>
                                <p style={{ fontSize: 14, color: '#374151', margin: 0 }}>{issue.why}</p>
                            </div>
                            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: 14 }}>
                                <p style={{ fontSize: 12, fontWeight: 700, color: '#16a34a', marginBottom: 4, textTransform: 'uppercase' }}>✅ How to fix</p>
                                <p style={{ fontSize: 14, color: '#374151', margin: 0, whiteSpace: 'pre-wrap' }}>{issue.fix}</p>
                            </div>
                            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                {[
                                    { label: 'Difficulty', value: issue.difficulty, colors: { Easy: '#16a34a', Medium: '#ca8a04', Hard: '#dc2626' } },
                                    { label: 'Impact', value: issue.impact, colors: { Low: '#6366f1', Moderate: '#ca8a04', High: '#dc2626' } },
                                ].map(badge => (
                                    <div key={badge.label} style={{ fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 100, background: '#f1f5f9', color: (badge.colors as any)[badge.value] || '#374151' }}>
                                        {badge.label}: {badge.value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {/* Pro mode */}
                    {proMode && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                                {[
                                    { k: 'Category', v: issue.category },
                                    { k: 'Priority', v: issue.priority.toUpperCase() },
                                    { k: 'Difficulty', v: issue.difficulty },
                                    { k: 'Impact', v: issue.impact },
                                ].map(b => (
                                    <span key={b.k} style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 100, background: '#e2e8f0', color: '#374151' }}>
                                        {b.k}: {b.v}
                                    </span>
                                ))}
                            </div>
                            <p style={{ fontSize: 14, color: '#374151', margin: '0 0 6px' }}><strong>Problem:</strong> {issue.problem}</p>
                            <p style={{ fontSize: 14, color: '#374151', margin: '0 0 6px' }}><strong>Why:</strong> {issue.why}</p>
                            <p style={{ fontSize: 14, color: '#374151', margin: 0, whiteSpace: 'pre-wrap' }}><strong>Fix:</strong> {issue.fix}</p>
                            {issue.codeSnippet && (
                                <div style={{ background: '#1e293b', borderRadius: 10, padding: 16, marginTop: 8, position: 'relative' }}>
                                    <pre style={{ color: '#a5f3fc', fontSize: 13, margin: 0, overflowX: 'auto', whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>{issue.codeSnippet}</pre>
                                    <button
                                        onClick={() => { navigator.clipboard.writeText(issue.codeSnippet!); toast.success('Copied!'); }}
                                        style={{ position: 'absolute', top: 10, right: 10, background: '#334155', border: 'none', borderRadius: 6, padding: '4px 8px', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}
                                    >
                                        <Copy size={12} /> Copy
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const SCAN_MODES = ['Single Page', 'Homepage Only', 'Mobile Audit', 'Blog Post Audit'] as const;
const CATEGORIES: Category[] = ['Technical SEO', 'On-Page SEO', 'Content', 'Performance', 'Mobile', 'Security', 'Accessibility', 'Schema', 'Links'];

export default function WebsiteAuditClient() {
    const [url, setUrl] = useState('');
    const [keyword, setKeyword] = useState('');
    const [competitorUrl, setCompetitorUrl] = useState('');
    const [scanMode, setScanMode] = useState<string>('Single Page');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [proMode, setProMode] = useState(false);
    const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [auditResult, setAuditResult] = useState<{ issues: Issue[]; scores: ScoreSummary } | null>(null);
    const [auditMeta, setAuditMeta] = useState<{ url: string; fetchedAt: string } | null>(null);
    const [showExportMenu, setShowExportMenu] = useState(false);

    const normalizeUrl = (u: string) => {
        const trimmed = u.trim();
        if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) return 'https://' + trimmed;
        return trimmed;
    };

    const handleAudit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim()) { toast.error('Please enter a website URL'); return; }
        const finalUrl = normalizeUrl(url);
        setLoading(true); setError(null); setAuditResult(null);

        try {
            const params = new URLSearchParams({ url: finalUrl });
            if (competitorUrl.trim()) params.set('competitor', normalizeUrl(competitorUrl));

            const res = await fetch(`/api/website-audit?${params}`);
            const data = await res.json();
            if (!res.ok || data.error) throw new Error(data.error || 'Audit failed');

            const result = runAudit(data as AuditData, keyword);
            setAuditResult(result);
            setAuditMeta({ url: finalUrl, fetchedAt: new Date().toLocaleString() });
            setActiveCategory('All');
            toast.success('🎉 Audit complete!');
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Unknown error';
            setError(msg); toast.error('Audit failed');
        } finally {
            setLoading(false);
        }
    };

    const filteredIssues = useMemo(() => {
        if (!auditResult) return [];
        return activeCategory === 'All'
            ? auditResult.issues
            : auditResult.issues.filter(i => i.category === activeCategory);
    }, [auditResult, activeCategory]);

    const issuesByPriority = useMemo(() => {
        const groups: Record<string, Issue[]> = { critical: [], high: [], medium: [], low: [], info: [], pass: [] };
        filteredIssues.forEach(i => { groups[i.priority]?.push(i); });
        return groups;
    }, [filteredIssues]);

    const summaryCount = useMemo(() => {
        if (!auditResult) return { critical: 0, high: 0, medium: 0, low: 0, pass: 0 };
        const i = auditResult.issues;
        return {
            critical: i.filter(x => x.priority === 'critical').length,
            high: i.filter(x => x.priority === 'high').length,
            medium: i.filter(x => x.priority === 'medium').length,
            low: i.filter(x => x.priority === 'low' || x.priority === 'info').length,
            pass: i.filter(x => x.priority === 'pass').length,
        };
    }, [auditResult]);

    // ── Export: JSON ──────────────────────────────────────────────────────────
    const exportJSON = () => {
        if (!auditResult) return;
        const data = JSON.stringify({
            url: auditMeta?.url,
            fetchedAt: auditMeta?.fetchedAt,
            scores: auditResult.scores,
            issues: auditResult.issues.map(({ id, category, label, priority, problem, why, fix, difficulty, impact, detail }) =>
                ({ id, category, label, priority, problem, why, fix, difficulty, impact, detail })),
        }, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `seo-audit-${new Date().toISOString().slice(0,10)}.json`;
        a.click();
        toast.success('JSON report downloaded!');
        setShowExportMenu(false);
    };

    // ── Export: CSV (UTF-8 BOM — opens cleanly in Excel) ─────────────────────
    const exportCSV = () => {
        if (!auditResult) return;
        const esc = (s: string) => `"${(s || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`;
        const headers = ['#', 'Category', 'Label', 'Priority', 'Status', 'Problem', 'Why It Matters', 'How to Fix', 'Difficulty', 'Impact'];
        const rows: string[][] = auditResult.issues
            .filter(i => i.priority !== 'pass')
            .map((i, idx) => [
                String(idx + 1),
                i.category,
                i.label,
                i.priority.toUpperCase(),
                i.priority === 'critical' ? '🔴 Critical' : i.priority === 'high' ? '🟠 High' : i.priority === 'medium' ? '🟡 Medium' : 'ℹ️ Low/Info',
                i.problem,
                i.why,
                i.fix,
                i.difficulty,
                i.impact,
            ]);
        const BOM = '\uFEFF'; // UTF-8 BOM so Excel shows Hindi/special chars correctly
        const csv = BOM + [headers, ...rows].map(r => r.map(esc).join(',')).join('\r\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `seo-audit-issues-${new Date().toISOString().slice(0,10)}.csv`;
        a.click();
        toast.success('CSV downloaded! Open in Excel or Google Sheets.');
        setShowExportMenu(false);
    };

    // ── Export: Excel (.xls via HTML table — opens in Excel without any library) ─
    const exportExcel = () => {
        if (!auditResult) return;
        const esc = (s: string) => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        const priorityColor: Record<string, string> = {
            critical: '#fef2f2', high: '#fff7ed', medium: '#fefce8', low: '#eff6ff', info: '#eef2ff', pass: '#f0fdf4',
        };
        const priorityText: Record<string, string> = {
            critical: '#dc2626', high: '#ea580c', medium: '#ca8a04', low: '#2563eb', info: '#6366f1', pass: '#16a34a',
        };

        const scoreRows = Object.entries(auditResult.scores).map(([k, v]) =>
            `<tr><td style="padding:6px 12px;font-weight:700;background:#f8fafc;">${k.charAt(0).toUpperCase()+k.slice(1)}</td><td style="padding:6px 12px;font-weight:900;color:${scoreColor(v as number)};">${v}/100 — ${scoreLabel(v as number)}</td></tr>`
        ).join('');

        const issueRows = auditResult.issues.filter(i => i.priority !== 'pass').map((i, idx) => `
            <tr style="background:${priorityColor[i.priority] || '#fff'};">
                <td style="padding:8px 10px;font-weight:700;text-align:center;">${idx + 1}</td>
                <td style="padding:8px 10px;">${esc(i.category)}</td>
                <td style="padding:8px 10px;font-weight:600;">${esc(i.label)}</td>
                <td style="padding:8px 10px;font-weight:800;color:${priorityText[i.priority] || '#374151'};text-transform:uppercase;">${esc(i.priority)}</td>
                <td style="padding:8px 10px;">${esc(i.problem)}</td>
                <td style="padding:8px 10px;color:#4b5563;">${esc(i.why)}</td>
                <td style="padding:8px 10px;color:#047857;">${esc(i.fix)}</td>
                <td style="padding:8px 10px;text-align:center;">${esc(i.difficulty)}</td>
                <td style="padding:8px 10px;text-align:center;">${esc(i.impact)}</td>
            </tr>`).join('');

        const html = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="UTF-8" /><style>
body { font-family: Calibri, Arial, sans-serif; font-size: 11pt; }
th { background: #1e293b; color: #fff; padding: 10px 12px; text-align: left; font-size: 11pt; }
td { border: 1px solid #e2e8f0; font-size: 10.5pt; }
</style></head><body>
<h2 style="font-family:Calibri,Arial;color:#0f172a;">SEO Audit Report</h2>
<p style="color:#64748b;">Website: ${esc(auditMeta?.url || '')} &nbsp;|&nbsp; Generated: ${esc(auditMeta?.fetchedAt || '')}</p>

<h3 style="font-family:Calibri,Arial;color:#0f172a;margin-top:24px;">Score Summary</h3>
<table border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse;min-width:300px;">
<thead><tr><th>Category</th><th>Score</th></tr></thead>
<tbody>${scoreRows}</tbody></table>

<h3 style="font-family:Calibri,Arial;color:#0f172a;margin-top:24px;">Issues Found (${auditResult.issues.filter(i => i.priority !== 'pass').length})</h3>
<table border="1" cellpadding="0" cellspacing="0" style="border-collapse:collapse;width:100%;">
<thead><tr>
<th>#</th><th>Category</th><th>Issue</th><th>Priority</th>
<th>Problem</th><th>Why It Matters</th><th>How to Fix</th><th>Difficulty</th><th>Impact</th>
</tr></thead>
<tbody>${issueRows}</tbody></table>
</body></html>`;

        const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `seo-audit-report-${new Date().toISOString().slice(0,10)}.xls`;
        a.click();
        toast.success('Excel report downloaded! Open in Microsoft Excel.');
        setShowExportMenu(false);
    };

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>

            {/* ── INPUT FORM ─────────────────────────────────────────────── */}
            <div style={{ background: '#fff', borderRadius: 24, padding: 'clamp(24px,5vw,40px)', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.08)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 6, background: 'linear-gradient(90deg,#10b981,#3b82f6,#8b5cf6)' }} />

                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <div style={{ width: 68, height: 68, borderRadius: 20, background: 'linear-gradient(135deg,#10b981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 10px 25px -5px rgba(16,185,129,0.4)' }}>
                        <Activity size={32} color="#fff" />
                    </div>
                    <h2 style={{ fontSize: 'clamp(22px,5vw,30px)', fontWeight: 900, color: '#0f172a', marginBottom: 8, letterSpacing: '-0.03em' }}>Website SEO Audit Tool</h2>
                    <p style={{ color: '#64748b', fontSize: 16 }}>Get a comprehensive 60+ point SEO report in seconds.</p>
                </div>

                <form onSubmit={handleAudit} style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 760, margin: '0 auto' }}>
                    {/* URL + Scan mode row */}
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                        <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
                            <Globe size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://yourwebsite.com"
                                style={{ width: '100%', padding: '16px 16px 16px 44px', borderRadius: 14, border: '2px solid #e2e8f0', fontSize: 15, outline: 'none', color: '#0f172a', background: '#f8fafc', fontFamily: 'inherit' }}
                                onFocus={e => e.currentTarget.style.borderColor = '#10b981'}
                                onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                            />
                        </div>
                        <select value={scanMode} onChange={e => setScanMode(e.target.value)}
                            style={{ padding: '16px 14px', borderRadius: 14, border: '2px solid #e2e8f0', fontSize: 14, outline: 'none', color: '#374151', background: '#f8fafc', cursor: 'pointer', fontFamily: 'inherit' }}>
                            {SCAN_MODES.map(m => <option key={m}>{m}</option>)}
                        </select>
                    </div>

                    {/* Keyword row */}
                    <div style={{ position: 'relative' }}>
                        <Hash size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Target keyword (optional — e.g. 'website audit tool')"
                            style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: 14, border: '2px solid #e2e8f0', fontSize: 14, outline: 'none', color: '#0f172a', background: '#f8fafc', fontFamily: 'inherit', boxSizing: 'border-box' }}
                            onFocus={e => e.currentTarget.style.borderColor = '#10b981'}
                            onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                        />
                    </div>

                    {/* Advanced toggle */}
                    <button type="button" onClick={() => setShowAdvanced(a => !a)}
                        style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: '#6366f1', fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, padding: 0 }}>
                        <Settings size={14} /> Advanced Options {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {showAdvanced && (
                        <div style={{ position: 'relative' }}>
                            <Link2 size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                            <input type="text" value={competitorUrl} onChange={e => setCompetitorUrl(e.target.value)} placeholder="Competitor URL (optional — for comparison)"
                                style={{ width: '100%', padding: '14px 14px 14px 44px', borderRadius: 14, border: '2px solid #e2e8f0', fontSize: 14, outline: 'none', color: '#0f172a', background: '#f8fafc', fontFamily: 'inherit', boxSizing: 'border-box' }}
                                onFocus={e => e.currentTarget.style.borderColor = '#8b5cf6'}
                                onBlur={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                            />
                        </div>
                    )}

                    <button type="submit" disabled={loading || !url.trim()}
                        style={{
                            padding: '17px 32px', borderRadius: 14, border: 'none', cursor: loading || !url.trim() ? 'not-allowed' : 'pointer',
                            background: loading || !url.trim() ? '#cbd5e1' : 'linear-gradient(135deg,#10b981,#059669)',
                            color: '#fff', fontWeight: 800, fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                            boxShadow: loading || !url.trim() ? 'none' : '0 8px 20px -6px rgba(16,185,129,0.55)',
                            transition: 'all 0.2s', fontFamily: 'inherit',
                        }}>
                        {loading ? <><Loader2 size={20} className="animate-spin" /> Running Audit…</> : <><Search size={18} /> Run Full SEO Audit <ArrowRight size={17} /></>}
                    </button>
                </form>

                {error && (
                    <div style={{ marginTop: 20, padding: '14px 18px', borderRadius: 12, background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', fontSize: 14, display: 'flex', gap: 10, alignItems: 'flex-start', maxWidth: 760, margin: '20px auto 0' }}>
                        <XCircle size={18} style={{ flexShrink: 0, marginTop: 1 }} />
                        <span>{error}</span>
                    </div>
                )}
            </div>

            {/* ── RESULTS ───────────────────────────────────────────────── */}
            {auditResult && (
                <>
                    {/* Overall Score + Category Scores */}
                    <div style={{ background: '#0f172a', borderRadius: 24, padding: 'clamp(24px,4vw,36px)', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(#fff 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 20, marginBottom: 28 }}>
                                <div>
                                    <p style={{ fontSize: 12, fontWeight: 800, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Audit Complete</p>
                                    <p style={{ fontSize: 14, color: '#94a3b8', wordBreak: 'break-all' }}>{auditMeta?.url}</p>
                                    <p style={{ fontSize: 12, color: '#64748b' }}>Checked at {auditMeta?.fetchedAt} · {scanMode} Mode</p>
                                </div>
                                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>

                                    {/* ── Export Dropdown ── */}
                                    <div style={{ position: 'relative' }}>
                                        <button
                                            onClick={() => setShowExportMenu(m => !m)}
                                            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, border: '1px solid #334155', background: showExportMenu ? '#1e293b' : 'transparent', color: '#94a3b8', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                                        >
                                            <Download size={14} /> Export <ChevronDown size={12} />
                                        </button>

                                        {showExportMenu && (
                                            <div style={{
                                                position: 'absolute', top: '110%', right: 0, zIndex: 99,
                                                background: '#1e293b', borderRadius: 14, boxShadow: '0 16px 40px rgba(0,0,0,0.35)',
                                                border: '1px solid #334155', minWidth: 200, overflow: 'hidden',
                                            }}>
                                                <div style={{ padding: '10px 14px 6px', borderBottom: '1px solid #334155' }}>
                                                    <p style={{ fontSize: 11, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>Export Report As</p>
                                                </div>
                                                {[
                                                    { icon: '📊', label: 'Excel (.xls)', sub: 'Open in Microsoft Excel', action: exportExcel },
                                                    { icon: '📋', label: 'CSV (.csv)',   sub: 'Google Sheets / Excel', action: exportCSV },
                                                    { icon: '{ }', label: 'JSON (.json)', sub: 'For developers / APIs', action: exportJSON },
                                                ].map(opt => (
                                                    <button key={opt.label} onClick={opt.action}
                                                        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid #1e293b', fontFamily: 'inherit' }}
                                                        onMouseEnter={e => (e.currentTarget.style.background = '#0f172a')}
                                                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                                                    >
                                                        <span style={{ fontSize: 20, lineHeight: 1, width: 28, textAlign: 'center', flexShrink: 0 }}>{opt.icon}</span>
                                                        <div>
                                                            <p style={{ fontSize: 13, fontWeight: 700, color: '#e2e8f0', margin: 0 }}>{opt.label}</p>
                                                            <p style={{ fontSize: 11, color: '#64748b', margin: 0 }}>{opt.sub}</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* ── Pro / Beginner Mode ── */}
                                    <button onClick={() => setProMode(p => !p)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', borderRadius: 10, border: '1px solid #6366f1', background: proMode ? '#6366f1' : 'transparent', color: proMode ? '#fff' : '#818cf8', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                                        {proMode ? <EyeOff size={14} /> : <Code2 size={14} />} {proMode ? 'Beginner' : 'Pro'} Mode
                                    </button>
                                </div>
                            </div>

                            {/* Scores grid */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 28 }}>
                                <div style={{ textAlign: 'center' }}>
                                    <CircleScore score={auditResult.scores.overall} label="Overall" size={100} />
                                    <p style={{ fontSize: 12, fontWeight: 700, color: scoreColor(auditResult.scores.overall), marginTop: 4 }}>{scoreLabel(auditResult.scores.overall)}</p>
                                </div>
                                {[
                                    { score: auditResult.scores.seo, label: 'SEO' },
                                    { score: auditResult.scores.content, label: 'Content' },
                                    { score: auditResult.scores.performance, label: 'Performance' },
                                    { score: auditResult.scores.mobile, label: 'Mobile' },
                                    { score: auditResult.scores.security, label: 'Security' },
                                    { score: auditResult.scores.accessibility, label: 'Accessibility' },
                                ].map(s => <CircleScore key={s.label} score={s.score} label={s.label} size={72} />)}
                            </div>
                        </div>
                    </div>

                    {/* Issue Summary Counts */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 14 }}>
                        {[
                            { key: 'critical', label: 'Critical' },
                            { key: 'high', label: 'High' },
                            { key: 'medium', label: 'Medium' },
                            { key: 'low', label: 'Low / Info' },
                            { key: 'pass', label: 'Passed' },
                        ].map(({ key, label }) => {
                            const pc = PRIORITY_CONFIG[key as Priority];
                            const count = summaryCount[key as keyof typeof summaryCount] ?? 0;
                            return (
                                <div key={key} style={{ background: pc.bg, border: `1.5px solid ${pc.border}`, borderRadius: 16, padding: '18px 16px', textAlign: 'center' }}>
                                    <p style={{ fontSize: 32, fontWeight: 900, color: pc.color, lineHeight: 1, marginBottom: 4 }}>{count}</p>
                                    <p style={{ fontSize: 12, fontWeight: 700, color: pc.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Category Tabs */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {(['All', ...CATEGORIES] as const).map(cat => {
                            const active = activeCategory === cat;
                            const cfg = cat !== 'All' ? CATEGORY_CONFIG[cat] : null;
                            return (
                                <button key={cat} onClick={() => setActiveCategory(cat)}
                                    style={{
                                        padding: '8px 16px', borderRadius: 100, border: active ? '2px solid transparent' : '2px solid #e2e8f0',
                                        background: active ? (cfg?.gradient || 'linear-gradient(135deg,#10b981,#059669)') : '#fff',
                                        color: active ? '#fff' : '#374151', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                                        display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit',
                                        boxShadow: active ? '0 4px 12px rgba(0,0,0,0.12)' : 'none',
                                    }}>
                                    {cfg?.icon} {cat}
                                    <span style={{ fontSize: 11, fontWeight: 800, padding: '1px 6px', borderRadius: 100, background: active ? 'rgba(255,255,255,0.25)' : '#f1f5f9', color: active ? '#fff' : '#64748b' }}>
                                        {cat === 'All' ? auditResult.issues.filter(i => i.priority !== 'pass').length : auditResult.issues.filter(i => i.category === cat && i.priority !== 'pass').length}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Issue List by Priority Group */}
                    {(['critical', 'high', 'medium', 'low', 'info', 'pass'] as Priority[]).map(priority => {
                        const group = issuesByPriority[priority] || [];
                        if (group.length === 0) return null;
                        const pc = PRIORITY_CONFIG[priority];
                        const label = priority === 'pass' ? `✅ Passed (${group.length})` : priority === 'info' ? `ℹ️ Info (${group.length})` : `${pc.label} Issues (${group.length})`;
                        return (
                            <div key={priority} style={{ background: '#fff', borderRadius: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                                <div style={{ padding: '14px 20px', background: pc.bg, borderBottom: `2px solid ${pc.border}`, display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ color: pc.color }}>{pc.icon}</span>
                                    <span style={{ fontSize: 14, fontWeight: 800, color: pc.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</span>
                                </div>
                                <div>
                                    {group.map(issue => <IssueRow key={issue.id} issue={issue} proMode={proMode} />)}
                                </div>
                            </div>
                        );
                    })}

                    {/* Re-audit + Export Actions */}
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button onClick={() => { setAuditResult(null); setUrl(''); setKeyword(''); setCompetitorUrl(''); setShowExportMenu(false); }}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 26px', borderRadius: 14, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#10b981,#059669)', color: '#fff', fontWeight: 700, fontSize: 15, boxShadow: '0 8px 20px -6px rgba(16,185,129,0.5)', fontFamily: 'inherit' }}>
                            <RefreshCw size={16} /> Audit Another URL
                        </button>
                        <button onClick={exportExcel}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 20px', borderRadius: 14, border: '2px solid #bbf7d0', cursor: 'pointer', background: '#f0fdf4', color: '#16a34a', fontWeight: 700, fontSize: 14, fontFamily: 'inherit' }}>
                            📊 Excel
                        </button>
                        <button onClick={exportCSV}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 20px', borderRadius: 14, border: '2px solid #bfdbfe', cursor: 'pointer', background: '#eff6ff', color: '#2563eb', fontWeight: 700, fontSize: 14, fontFamily: 'inherit' }}>
                            📋 CSV
                        </button>
                        <button onClick={exportJSON}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '13px 20px', borderRadius: 14, border: '2px solid #e2e8f0', cursor: 'pointer', background: '#fff', color: '#374151', fontWeight: 700, fontSize: 14, fontFamily: 'inherit' }}>
                            <Download size={15} /> JSON
                        </button>
                    </div>

                    {/* Related Tools */}
                    <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                        <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', padding: '14px 20px' }}>
                            <p style={{ fontSize: 15, fontWeight: 800, color: '#0f172a' }}>More Free Tools</p>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: '16px 20px' }}>
                            {[
                                { href: '/youtube-tag-extractor', label: 'YT Tag Extractor' },
                                { href: '/compress-image-to-20kb', label: 'Image Compressor' },
                                { href: '/calculators/derivative-calculator', label: 'Derivative Calc' },
                                { href: '/instagram-tools/instagram-bio-generator', label: 'Instagram Bio' },
                            ].map(t => (
                                <Link key={t.href} href={t.href}
                                    style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '7px 14px', borderRadius: 8, border: '1.5px solid #e0e7ff', background: '#fafbff', fontSize: 13, fontWeight: 700, color: '#4f46e5', textDecoration: 'none' }}>
                                    <Zap size={12} /> {t.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
