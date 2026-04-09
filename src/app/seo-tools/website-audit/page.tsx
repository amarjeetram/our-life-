import { Metadata } from 'next';
import Link from 'next/link';
import SEOBottomSection from '@/components/SEOBottomSection';
import WebsiteAuditClient from '@/components/WebsiteAuditClient';

export const metadata: Metadata = {
    title: 'Free Website Audit Tool - SEO Checker & Site Health Analyzer | SmartToolsWala',
    description: 'Run a free website audit to instantly check SEO issues, Core Web Vitals, broken links, meta tags, schema markup, security headers & more. Get a detailed report in seconds.',
    keywords: 'website audit tool, free seo checker, site health check, technical seo audit, page speed checker, on-page seo analysis, meta tag checker, broken links checker, website health score, seo analyzer',
    alternates: {
        canonical: 'https://smarttoolswala.com/seo-tools/website-audit',
    },
    openGraph: {
        title: 'Free Website Audit Tool - SEO & Site Health Checker',
        description: 'Instantly audit any website for 60+ SEO, performance, security, and accessibility issues. Free, no registration required.',
        url: 'https://smarttoolswala.com/seo-tools/website-audit',
        type: 'website',
    },
};

export default function WebsiteAuditPage() {
    return (
        <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '80px' }}>

            {/* ── Tool Section ── */}
            <div style={{ maxWidth: '860px', margin: '0 auto', padding: '100px 20px 0' }}>
                <WebsiteAuditClient />
            </div>

            {/* ── SEO Article + FAQs + Internal Links ── */}
            <div style={{ maxWidth: '860px', margin: '48px auto 0', padding: '0 20px' }}>
                <SEOBottomSection
                    keyword="website audit tool"
                    heading="Free Website Audit Tool — Complete Guide to SEO Site Analysis"
                    faqs={[
                        {
                            q: 'Is this website audit tool 100% free?',
                            a: 'Yes! SmartToolsWala\'s website audit tool is completely free — no account, no credit card, and no hidden limits. Simply enter any URL and get your full report instantly.',
                        },
                        {
                            q: 'What SEO checks does this website analyzer run?',
                            a: 'Our free SEO checker runs 60+ checks across 9 categories: Technical SEO (robots.txt, sitemap, canonical, HTTPS, noindex), On-Page SEO (title tag, meta description, H1/H2 structure, Open Graph, Twitter Card), Content Quality (word count, keyword density, readability), Performance (HTML size, render-blocking scripts, lazy loading), Mobile SEO (viewport meta, font size, touch targets), Security (HTTPS, HSTS, CSP, X-Frame-Options), Accessibility (image alt text, HTML lang, favicon), Structured Data / Schema (JSON-LD types, FAQPage, BreadcrumbList), and Links (internal links, nofollow analysis).',
                        },
                        {
                            q: 'How accurate is the website health score?',
                            a: 'The SEO score is calculated from real HTML analysis of your webpage. Our scoring system weights critical issues heavily (noindex, missing title, thin content) and rewards best practices. While it doesn\'t replace a full manual audit or Google Search Console, it provides an accurate, actionable snapshot of your page\'s SEO health.',
                        },
                        {
                            q: 'Why can\'t the tool fetch some websites?',
                            a: 'Some websites use Cloudflare, bot-protection firewalls, or IP-based blocking that prevents automated tools from fetching their HTML. This is a normal server-side limitation. Try with a different page URL, or check if the site is accessible without a browser. Sites that are completely JS-rendered (React/Next.js SPA without SSR) may also return minimal HTML.',
                        },
                        {
                            q: 'Does this tool work for WordPress, Shopify, and Next.js websites?',
                            a: 'Yes! Our website audit tool works with any publicly accessible web page regardless of the technology — WordPress, Shopify, Wix, Next.js, Webflow, static HTML, or any CMS. It analyzes the final rendered HTML that search engines receive.',
                        },
                        {
                            q: 'What is a good SEO score for my website?',
                            a: '90–100 is Excellent, 70–89 is Good, 50–69 Needs Improvement, and below 50 is Critical. Most well-optimized websites score between 70–85. A score below 50 typically means there are critical technical or on-page SEO issues that are directly hurting your rankings.',
                        },
                        {
                            q: 'Can I export the SEO audit report?',
                            a: 'Yes! You can export your full audit report in 3 formats: Excel (.xls) for a formatted spreadsheet with color-coded priority rows, CSV (.csv) with UTF-8 BOM for Google Sheets compatibility, and JSON for developers and API integrations.',
                        },
                        {
                            q: 'What is the difference between Beginner Mode and Pro Mode?',
                            a: 'Beginner Mode explains every issue in simple language with clear "Problem → Why It Matters → How to Fix" cards — perfect for non-technical users or website owners. Pro Mode adds technical details, raw code snippets you can copy directly, and advanced metadata like HTTP headers.',
                        },
                    ]}
                >
                    <p>
                        A <strong>website audit</strong> is the process of analyzing a web page across multiple dimension — technical SEO, on-page optimization, content quality, page speed, mobile usability, security headers, and structured data — to identify issues that are preventing your site from ranking higher on Google and other search engines.
                    </p>
                    <p>
                        Our <strong>free website audit tool</strong> is a professional-grade <em>site health checker</em> that runs <strong>60+ automated checks</strong> in seconds. No installation, no account, and no limits. Whether you are a blogger, developer, SEO specialist, or small business owner, this <strong>free SEO analyzer</strong> gives you a clear picture of your site&apos;s strengths and weaknesses.
                    </p>

                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '28px 0 10px', color: '#0f172a' }}>🔍 What Does a Technical SEO Audit Check?</h3>
                    <p>
                        The <strong>technical SEO audit</strong> section of our tool validates the foundational elements that determine whether Google can <em>discover, crawl, and index</em> your pages. A technically healthy website is the prerequisite for good organic rankings.
                    </p>
                    <ul style={{ paddingLeft: '22px', color: '#374151', lineHeight: 1.8, margin: '12px 0' }}>
                        <li><strong>robots.txt checker</strong> — Verifies that your robots.txt file exists, is accessible, and is not accidentally blocking Googlebot from crawling key pages.</li>
                        <li><strong>XML sitemap validator</strong> — Confirms that your sitemap.xml exists and returns a valid 200 status code so Google can discover all your URLs.</li>
                        <li><strong>HTTPS / SSL check</strong> — Validates that your site uses a secure HTTPS connection, which is a confirmed Google ranking signal since 2014.</li>
                        <li><strong>Canonical tag checker</strong> — Detects missing or incorrect canonical tags that can cause duplicate content issues and split PageRank.</li>
                        <li><strong>noindex detection</strong> — Flags any page that has a <code>noindex</code> directive in its meta robots tag or X-Robots-Tag HTTP header — a critical issue that would prevent Google from showing the page in search results.</li>
                        <li><strong>URL structure analysis</strong> — Checks for overly long URLs, which can be truncated in SERPs and are harder for users to share.</li>
                    </ul>

                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '28px 0 10px', color: '#0f172a' }}>📝 On-Page SEO Analysis Explained</h3>
                    <p>
                        On-page SEO refers to all the elements on the webpage itself that you can directly control. Our <strong>on-page SEO checker</strong> audits the most impactful of these signals:
                    </p>
                    <ul style={{ paddingLeft: '22px', color: '#374151', lineHeight: 1.8, margin: '12px 0' }}>
                        <li><strong>Title tag audit</strong> — Checks length (50–60 characters recommended), keyword presence, and whether the title is missing or duplicated.</li>
                        <li><strong>Meta description checker</strong> — Validates length (140–160 characters), keyword inclusion, and uniqueness. A well-written meta description is the best way to improve click-through rate (CTR) from Google.</li>
                        <li><strong>Heading structure (H1, H2, H3)</strong> — Checks that your page has exactly one H1 with your target keyword, and uses H2/H3 tags to create a logical content hierarchy.</li>
                        <li><strong>Open Graph tag validator</strong> — Confirms og:title, og:description, og:image, and og:url are all present for rich social media sharing previews on Facebook, LinkedIn, and WhatsApp.</li>
                        <li><strong>Twitter Card meta tags</strong> — Ensures your page looks professional when shared on X (Twitter).</li>
                        <li><strong>Keyword optimization check</strong> — When you provide a target keyword, the tool checks its presence in the title, H1, meta description, URL, and body content, and calculates keyword density.</li>
                    </ul>

                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '28px 0 10px', color: '#0f172a' }}>⚡ Performance & Core Web Vitals Signals</h3>
                    <p>
                        Google officially uses <strong>Core Web Vitals</strong> as ranking signals. While our tool doesn&apos;t run a live browser to measure LCP, CLS, and INP directly, it analyzes the key <em>HTML-level factors</em> that most strongly impact these metrics:
                    </p>
                    <ul style={{ paddingLeft: '22px', color: '#374151', lineHeight: 1.8, margin: '12px 0' }}>
                        <li><strong>HTML page size</strong> — Large HTML files (over 150KB) slow down Time to First Byte (TTFB) and initial parsing, directly impacting LCP.</li>
                        <li><strong>Render-blocking scripts</strong> — JavaScript files loaded without <code>defer</code> or <code>async</code> block the browser from rendering the page, causing poor LCP scores.</li>
                        <li><strong>Render-blocking CSS</strong> — Too many stylesheet requests increase render-blocking time.</li>
                        <li><strong>Image lazy loading</strong> — Images without <code>loading=&quot;lazy&quot;</code> force the browser to download off-screen images on initial load, increasing page weight unnecessarily.</li>
                        <li><strong>Preconnect hints</strong> — Missing <code>rel=&quot;preconnect&quot;</code> tags mean the browser can&apos;t establish connections to external domains (Google Fonts, CDN) early enough.</li>
                    </ul>

                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '28px 0 10px', color: '#0f172a' }}>🔒 Security Headers Audit</h3>
                    <p>
                        Security headers are HTTP response headers that protect your website and users from common attacks. They also signal trustworthiness to both users and Google, supporting your <strong>E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)</strong> score. Our <em>security audit</em> checks for:
                    </p>
                    <ul style={{ paddingLeft: '22px', color: '#374151', lineHeight: 1.8, margin: '12px 0' }}>
                        <li><strong>Strict-Transport-Security (HSTS)</strong> — Forces browsers to always use HTTPS, preventing SSL-stripping attacks.</li>
                        <li><strong>Content-Security-Policy (CSP)</strong> — Prevents cross-site scripting (XSS) by restricting what resources the browser can load.</li>
                        <li><strong>X-Frame-Options</strong> — Blocks your site from being embedded in iframes, preventing clickjacking attacks.</li>
                        <li><strong>X-Content-Type-Options</strong> — Stops browsers from MIME-sniffing responses, which can be exploited.</li>
                        <li><strong>Referrer-Policy</strong> — Controls privacy-sensitive referrer information sent to third parties.</li>
                        <li><strong>Privacy policy &amp; contact page detection</strong> — E-E-A-T signals that Google explicitly recommends for building site trustworthiness.</li>
                    </ul>

                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '28px 0 10px', color: '#0f172a' }}>📊 How to Read Your SEO Score</h3>
                    <p>
                        After running the audit, you&apos;ll see an <strong>Overall SEO Score out of 100</strong> along with 6 category sub-scores (SEO, Content, Performance, Mobile, Security, Accessibility). Here&apos;s how to interpret them:
                    </p>
                    <ul style={{ paddingLeft: '22px', color: '#374151', lineHeight: 1.8, margin: '12px 0' }}>
                        <li><strong>90–100 (Excellent)</strong> — Your page is well-optimized. Focus on content depth and link building.</li>
                        <li><strong>70–89 (Good)</strong> — Solid foundation. Fix the remaining warnings to push into Excellent range.</li>
                        <li><strong>50–69 (Needs Improvement)</strong> — There are important issues holding back your rankings. Prioritize Critical and High items.</li>
                        <li><strong>Below 50 (Critical)</strong> — Urgent attention needed. There may be indexability issues, missing core SEO elements, or major performance problems.</li>
                    </ul>
                    <p>
                        Always <strong>fix Critical issues first</strong>, then High, then Medium. Low and Info items can be addressed as time permits. Use the <em>Priority filter</em> in the tool to focus only on the most impactful issues.
                    </p>

                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '28px 0 10px', color: '#0f172a' }}>🛠️ How to Use This Free Website Audit Tool</h3>
                    <ol style={{ paddingLeft: '22px', color: '#374151', lineHeight: 1.8, margin: '12px 0' }}>
                        <li>Enter your full page URL in the input field (e.g. <code>https://yoursite.com/blog/post-slug</code>)</li>
                        <li>Optionally enter your <strong>target keyword</strong> for keyword optimization analysis</li>
                        <li>Select a scan mode (Single Page, Mobile Audit, Blog Post Audit, etc.)</li>
                        <li>Click <strong>Run Full SEO Audit</strong> and wait a few seconds</li>
                        <li>Review your score dashboard and read each issue — use Beginner or Pro mode depending on your expertise</li>
                        <li>Prioritize Critical → High → Medium issues and implement the fixes</li>
                        <li>Export your report as <strong>Excel, CSV, or JSON</strong></li>
                        <li>Re-audit after making changes to track progress</li>
                    </ol>

                    {/* Internal Links Section */}
                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '32px 0 12px', color: '#0f172a' }}>🔗 Explore More Free SEO & Marketing Tools</h3>
                    <p style={{ marginBottom: 14 }}>
                        SmartToolsWala offers a growing collection of <strong>free online tools</strong> for bloggers, students, developers, and digital marketers:
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 10 }}>
                        {[
                            { href: '/youtube-tag-extractor', label: '🏷️ YouTube Tag Extractor', desc: 'Extract hidden tags from any YT video' },
                            { href: '/youtube-description-extractor', label: '📋 YT Description Extractor', desc: 'Copy full YouTube video descriptions' },
                            { href: '/youtube-title-generator', label: '✍️ YouTube Title Generator', desc: 'Generate SEO-optimized video titles' },
                            { href: '/instagram-tools/instagram-bio-generator', label: '📸 Instagram Bio Generator', desc: 'Create stylish Instagram bios instantly' },
                            { href: '/compress-image-to-20kb', label: '🗜️ Image Compressor to 20KB', desc: 'Reduce image size without losing quality' },
                            { href: '/calculators/derivative-calculator', label: '📐 Derivative Calculator', desc: 'Solve calculus derivatives step by step' },
                            { href: '/seo-tools', label: '🔍 All SEO Tools', desc: 'Explore our full suite of SEO tools' },
                        ].map(link => (
                            <Link key={link.href} href={link.href}
                                style={{
                                    display: 'flex', flexDirection: 'column', gap: 4, padding: '12px 14px',
                                    borderRadius: 12, border: '1.5px solid #e0e7ff', background: '#fafbff',
                                    textDecoration: 'none', transition: 'all 0.15s',
                                }}
                            >
                                <span style={{ fontSize: 13, fontWeight: 700, color: '#4f46e5' }}>{link.label}</span>
                                <span style={{ fontSize: 12, color: '#64748b' }}>{link.desc}</span>
                            </Link>
                        ))}
                    </div>
                </SEOBottomSection>
            </div>
        </main>
    );
}
