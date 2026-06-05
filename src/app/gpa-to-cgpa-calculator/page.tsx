import { Metadata } from 'next';
import Link from 'next/link';
import CGPACalculatorClient from '@/components/CGPACalculatorClient';

export const dynamic = 'force-static';
const SITE = 'https://smarttoolswala.com';
const CANONICAL = `${SITE}/gpa-to-cgpa-calculator`;

export const metadata: Metadata = {
  title: 'GPA to CGPA Calculator – Convert 4.0 Scale to 10.0 Scale Free (2025)',
  description: 'Convert your 4.0 scale GPA to Indian 10-point CGPA scale instantly. Free GPA to CGPA Calculator with formula, conversion table, and step-by-step examples.',
  alternates: { canonical: CANONICAL },
  openGraph: { title: 'GPA to CGPA Calculator – Convert 4.0 Scale to 10.0 Scale Free (2025)', description: 'Convert your 4.0 scale GPA to Indian 10-point CGPA scale instantly. Free GPA to CGPA Calculator with formula, conversion table, and step-by-step examples.', url: CANONICAL, type: 'website' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'GPA to CGPA Calculator – Convert 4.0 Scale to 10.0 Scale Free (2025)',
  description: 'Convert your 4.0 scale GPA to Indian 10-point CGPA scale instantly. Free GPA to CGPA Calculator with formula, conversion table, and step-by-step examples.',
  url: CANONICAL,
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'GPA to CGPA Calculator',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
    { '@type': 'ListItem', position: 2, name: 'GPA to CGPA Calculator', item: CANONICAL },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
            { "@type": "Question", "name": "How do I convert GPA to CGPA?", "acceptedAnswer": { "@type": "Answer", "text": "Use the formula: CGPA = (GPA / 4.0) × 10. This linearly maps a 4.0 scale GPA to a 10.0 scale CGPA." } },
            { "@type": "Question", "name": "What is 3.5 GPA in CGPA?", "acceptedAnswer": { "@type": "Answer", "text": "3.5 GPA on a 4.0 scale equals (3.5/4.0) × 10 = 8.75 CGPA on a 10.0 scale." } },
            { "@type": "Question", "name": "What is 3.0 GPA in CGPA?", "acceptedAnswer": { "@type": "Answer", "text": "3.0 GPA = (3.0/4.0) × 10 = 7.5 CGPA. This is considered a Good performance in the Indian grading system." } },
            { "@type": "Question", "name": "Is a 3.8 GPA good for Indian students going abroad?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, a 3.8 GPA (equivalent to ~9.5 CGPA) is excellent and competitive for most graduate programmes in the US, UK, Canada, and Australia." } },
            { "@type": "Question", "name": "Do Indian companies accept GPA instead of CGPA?", "acceptedAnswer": { "@type": "Answer", "text": "Some multinational companies with global systems accept GPA. Most Indian domestic companies, however, expect CGPA on a 10-point scale. Use this calculator to present your GPA as a CGPA equivalent." } },
            { "@type": "Question", "name": "What is 4.0 GPA in percentage?", "acceptedAnswer": { "@type": "Answer", "text": "A 4.0 GPA is considered equivalent to approximately 95%+ or a CGPA of 10.0 in Indian academic terms." } },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-8">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700">GPA to CGPA Calculator</span>
          </nav>

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
              🎓 Free Online Calculator
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              GPA to CGPA Calculator
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Convert your 4.0 scale GPA to Indian 10-point CGPA scale instantly. Free GPA to CGPA Calculator with formula, conversion table, and step-by-step examples.
            </p>
          </div>

          {/* Calculator */}
          <CGPACalculatorClient variant="gpa-to-cgpa" accentColor="#f59e0b" />

          {/* Article */}
          <article className="mt-16 prose prose-slate prose-lg max-w-none
            prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tight
            prose-p:text-slate-700 prose-p:leading-relaxed
            prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900
            prose-li:text-slate-700 marker:text-indigo-500
            prose-table:border-collapse
            prose-th:bg-slate-100 prose-th:p-3 prose-th:text-left prose-th:font-bold prose-th:text-slate-700
            prose-td:border prose-td:border-slate-200 prose-td:p-3 prose-td:text-slate-600">

            <h2>GPA vs CGPA — Understanding the Difference</h2>
            <p><strong>GPA (Grade Point Average)</strong> is the grading system used primarily in the United States, Canada, and several other countries. It typically runs on a <strong>4.0 scale</strong>, where 4.0 is the highest possible GPA. <strong>CGPA (Cumulative Grade Point Average)</strong> is used across India and runs on a <strong>10.0 scale</strong>.</p>
            <p>When Indian students apply to US universities, or when foreign students apply to Indian institutions, it becomes necessary to convert between these two scales. Similarly, Indian employees joining multinational companies with global HR systems may need to present their GPA equivalent.</p>

            <h2>GPA to CGPA Conversion Formula</h2>
            <p>The most commonly used conversion formula is a simple linear scale mapping:</p>
            <p><strong>CGPA = (GPA / 4.0) × 10</strong></p>
            <p>This assumes both scales are proportional. So a 4.0 GPA = 10.0 CGPA, 3.6 GPA = 9.0 CGPA, 3.0 GPA = 7.5 CGPA, and so on.</p>

            <h3>GPA to CGPA Conversion Table</h3>
            <table>
              <thead><tr><th>GPA (4.0 Scale)</th><th>CGPA (10.0 Scale)</th><th>Approx. %</th><th>Performance</th></tr></thead>
              <tbody>
                <tr><td>4.0</td><td>10.00</td><td>95%+</td><td>Outstanding</td></tr>
                <tr><td>3.8</td><td>9.50</td><td>90.25%</td><td>Excellent</td></tr>
                <tr><td>3.6</td><td>9.00</td><td>85.5%</td><td>Excellent</td></tr>
                <tr><td>3.4</td><td>8.50</td><td>80.75%</td><td>Very Good</td></tr>
                <tr><td>3.2</td><td>8.00</td><td>76%</td><td>Very Good</td></tr>
                <tr><td>3.0</td><td>7.50</td><td>71.25%</td><td>Good</td></tr>
                <tr><td>2.8</td><td>7.00</td><td>66.5%</td><td>Good</td></tr>
                <tr><td>2.5</td><td>6.25</td><td>59.4%</td><td>Average</td></tr>
                <tr><td>2.0</td><td>5.00</td><td>47.5%</td><td>Pass</td></tr>
              </tbody>
            </table>

            <h2>Is the Conversion Accurate?</h2>
            <p>The linear conversion is an approximation. Real GPA-to-CGPA conversion can be more complex because:</p>
            <ul>
              <li>Different universities weight their grades differently within each scale.</li>
              <li>A 3.5 GPA at MIT carries different academic weight than a 3.5 GPA at a regional university.</li>
              <li>Some Indian graduate programmes use their own evaluation rubrics for foreign applicants.</li>
            </ul>
            <p>For official purposes such as visa applications, university admissions, or professional certifications, always provide your original transcript and let the institution do the official conversion using their approved methodology (such as WES evaluation for Canada/USA).</p>

            <h2>CGPA to GPA — Reverse Conversion</h2>
            <p>If you need to convert Indian CGPA to US GPA, use the reverse formula:</p>
            <p><strong>GPA = (CGPA / 10) × 4</strong></p>
            <p>So a CGPA of 8.5 = (8.5/10) × 4 = <strong>3.4 GPA</strong> on the 4.0 scale.</p>

          </article>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  How do I convert GPA to CGPA?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Use the formula: CGPA = (GPA / 4.0) × 10. This linearly maps a 4.0 scale GPA to a 10.0 scale CGPA.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is 3.5 GPA in CGPA?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  3.5 GPA on a 4.0 scale equals (3.5/4.0) × 10 = 8.75 CGPA on a 10.0 scale.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is 3.0 GPA in CGPA?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  3.0 GPA = (3.0/4.0) × 10 = 7.5 CGPA. This is considered a Good performance in the Indian grading system.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  Is a 3.8 GPA good for Indian students going abroad?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Yes, a 3.8 GPA (equivalent to ~9.5 CGPA) is excellent and competitive for most graduate programmes in the US, UK, Canada, and Australia.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  Do Indian companies accept GPA instead of CGPA?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Some multinational companies with global systems accept GPA. Most Indian domestic companies, however, expect CGPA on a 10-point scale. Use this calculator to present your GPA as a CGPA equivalent.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is 4.0 GPA in percentage?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  A 4.0 GPA is considered equivalent to approximately 95%+ or a CGPA of 10.0 in Indian academic terms.
                </div>
              </details>
            </div>
            </div>
          </div>

          {/* Related */}
            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Related Tools</p>
              <div className="flex flex-wrap gap-2">
              <Link href="/cgpa-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-white border border-slate-200 rounded-full text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">CGPA Calculator</Link>
              <Link href="/percentage-to-cgpa-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-white border border-slate-200 rounded-full text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">Percentage to CGPA</Link>
              <Link href="/vit-cgpa-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-white border border-slate-200 rounded-full text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">VIT CGPA Calculator</Link>
              <Link href="/srm-cgpa-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-white border border-slate-200 rounded-full text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">SRM CGPA Calculator</Link>
              <Link href="/ktu-cgpa-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-white border border-slate-200 rounded-full text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">KTU CGPA Calculator</Link>
              </div>
            </div>

        </div>
      </div>
    </>
  );
}
