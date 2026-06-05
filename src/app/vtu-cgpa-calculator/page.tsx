import { Metadata } from 'next';
import Link from 'next/link';
import CGPACalculatorClient from '@/components/CGPACalculatorClient';

export const dynamic = 'force-static';
const SITE = 'https://smarttoolswala.com';
const CANONICAL = `${SITE}/vtu-cgpa-calculator`;

export const metadata: Metadata = {
  title: 'VTU CGPA Calculator – Calculate VTU CGPA Online Free (2025)',
  description: 'Free VTU CGPA Calculator for Visvesvaraya Technological University Karnataka. Calculate your CGPA using VTU official grading scale. Supports 2015, 2018 and 2021 schemes.',
  alternates: { canonical: CANONICAL },
  openGraph: { title: 'VTU CGPA Calculator – Calculate VTU CGPA Online Free (2025)', description: 'Free VTU CGPA Calculator for Visvesvaraya Technological University Karnataka. Calculate your CGPA using VTU official grading scale. Supports 2015, 2018 and 2021 schemes.', url: CANONICAL, type: 'website' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'VTU CGPA Calculator – Calculate VTU CGPA Online Free (2025)',
  description: 'Free VTU CGPA Calculator for Visvesvaraya Technological University Karnataka. Calculate your CGPA using VTU official grading scale. Supports 2015, 2018 and 2021 schemes.',
  url: CANONICAL,
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'VTU CGPA Calculator',
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
    { '@type': 'ListItem', position: 2, name: 'VTU CGPA Calculator', item: CANONICAL },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
            { "@type": "Question", "name": "What is the VTU grading system?", "acceptedAnswer": { "@type": "Answer", "text": "VTU uses a 10-point grading system under CBCS: O=10 (90-100%), A+=9 (80-89%), A=8 (70-79%), B+=7 (60-69%), B=6 (55-59%), C=5 (50-54%), P=4 (45-49%), F=0 (fail)." } },
            { "@type": "Question", "name": "How to calculate VTU CGPA?", "acceptedAnswer": { "@type": "Answer", "text": "VTU CGPA = Σ(Grade Point × Credits) / Σ(Total Credits). Enter each subject's grade and credit in the VTU CGPA calculator above for instant results." } },
            { "@type": "Question", "name": "What is the VTU CGPA to percentage formula?", "acceptedAnswer": { "@type": "Answer", "text": "VTU uses: Percentage = CGPA × 9.1. This is different from the general 9.5 multiplier. A CGPA of 8.0 at VTU = 72.8%." } },
            { "@type": "Question", "name": "What is a good CGPA at VTU?", "acceptedAnswer": { "@type": "Answer", "text": "A CGPA of 7.5 and above is considered good for placements at most companies visiting VTU colleges. For PSUs and core engineering, 6.5 CGPA is the common minimum." } },
            { "@type": "Question", "name": "Does VTU have back paper impact on CGPA?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. If you fail a subject (F grade = 0 points), it severely impacts your CGPA. When you clear the back paper, the new grade replaces the F grade in CGPA calculations." } },
            { "@type": "Question", "name": "Is VTU grading absolute or relative?", "acceptedAnswer": { "@type": "Answer", "text": "VTU uses absolute grading under CBCS (2015 scheme onwards). Your grade depends on marks scored, not class performance." } },
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
            <span className="text-slate-700">VTU CGPA Calculator</span>
          </nav>

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
              🎓 Free Online Calculator
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              VTU CGPA Calculator
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Free VTU CGPA Calculator for Visvesvaraya Technological University Karnataka. Calculate your CGPA using VTU official grading scale. Supports 2015, 2018 and 2021 schemes.
            </p>
          </div>

          {/* Calculator */}
          <CGPACalculatorClient variant="vtu" accentColor="#16a34a" />

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

            <h2>About VTU — Visvesvaraya Technological University</h2>
            <p>Visvesvaraya Technological University (VTU) is one of the largest technical universities in India, affiliating over 200 engineering colleges across Karnataka. Founded in 1998 and headquartered in Belagavi, VTU introduced a CBCS (Choice Based Credit System) grading pattern starting with the 2015 scheme, moving away from the traditional marks-based assessment.</p>

            <h2>VTU Grading System</h2>
            <table>
              <thead><tr><th>Grade</th><th>Grade Point</th><th>Marks Range</th><th>Class</th></tr></thead>
              <tbody>
                <tr><td><strong>O</strong></td><td>10</td><td>90–100</td><td>Outstanding</td></tr>
                <tr><td><strong>A+</strong></td><td>9</td><td>80–89</td><td>Excellent</td></tr>
                <tr><td><strong>A</strong></td><td>8</td><td>70–79</td><td>Very Good</td></tr>
                <tr><td><strong>B+</strong></td><td>7</td><td>60–69</td><td>Good</td></tr>
                <tr><td><strong>B</strong></td><td>6</td><td>55–59</td><td>Above Average</td></tr>
                <tr><td><strong>C</strong></td><td>5</td><td>50–54</td><td>Average</td></tr>
                <tr><td><strong>P</strong></td><td>4</td><td>45–49</td><td>Pass</td></tr>
                <tr><td><strong>F</strong></td><td>0</td><td>Below 45</td><td>Fail</td></tr>
              </tbody>
            </table>

            <h2>VTU CGPA Formula</h2>
            <p><strong>VTU CGPA = Σ (Grade Point × Credits) / Σ (Total Credits)</strong></p>

            <h2>VTU CGPA to Percentage Conversion</h2>
            <p>VTU uses a unique conversion formula: <strong>Percentage = CGPA × 9.1</strong></p>
            <p>This differs from the general 9.5 multiplier used by CBSE and most other universities. So a VTU CGPA of 8.0 = 72.8%, and CGPA of 9.0 = 81.9%.</p>
            <table>
              <thead><tr><th>VTU CGPA</th><th>Percentage (×9.1)</th><th>Class</th></tr></thead>
              <tbody>
                <tr><td>9.0+</td><td>81.9%+</td><td>Distinction</td></tr>
                <tr><td>8.0–8.99</td><td>72.8%–81.8%</td><td>First Class</td></tr>
                <tr><td>6.0–7.99</td><td>54.6%–72.7%</td><td>Second Class</td></tr>
                <tr><td>4.5–5.99</td><td>40.9%–54.5%</td><td>Pass</td></tr>
              </tbody>
            </table>

            <h2>VTU Scheme-Wise Notes</h2>
            <ul>
              <li><strong>2015 Scheme:</strong> CBCS introduced, 10-point grading scale adopted.</li>
              <li><strong>2018 Scheme:</strong> Minor adjustments to credit structure. Same grading scale.</li>
              <li><strong>2021 Scheme:</strong> Outcome-Based Education (OBE) focus. Same 10-point grade scale with refinements to course objectives and outcomes.</li>
            </ul>

          </article>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is the VTU grading system?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  VTU uses a 10-point grading system under CBCS: O=10 (90-100%), A+=9 (80-89%), A=8 (70-79%), B+=7 (60-69%), B=6 (55-59%), C=5 (50-54%), P=4 (45-49%), F=0 (fail).
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  How to calculate VTU CGPA?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  VTU CGPA = Σ(Grade Point × Credits) / Σ(Total Credits). Enter each subject's grade and credit in the VTU CGPA calculator above for instant results.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is the VTU CGPA to percentage formula?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  VTU uses: Percentage = CGPA × 9.1. This is different from the general 9.5 multiplier. A CGPA of 8.0 at VTU = 72.8%.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is a good CGPA at VTU?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  A CGPA of 7.5 and above is considered good for placements at most companies visiting VTU colleges. For PSUs and core engineering, 6.5 CGPA is the common minimum.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  Does VTU have back paper impact on CGPA?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Yes. If you fail a subject (F grade = 0 points), it severely impacts your CGPA. When you clear the back paper, the new grade replaces the F grade in CGPA calculations.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  Is VTU grading absolute or relative?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  VTU uses absolute grading under CBCS (2015 scheme onwards). Your grade depends on marks scored, not class performance.
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
              <Link href="/sgpa-to-cgpa-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-white border border-slate-200 rounded-full text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">SGPA to CGPA</Link>
              <Link href="/percentage-to-cgpa-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-white border border-slate-200 rounded-full text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">Percentage to CGPA</Link>
              <Link href="/gpa-to-cgpa-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-white border border-slate-200 rounded-full text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">GPA to CGPA</Link>
              <Link href="/vit-cgpa-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-white border border-slate-200 rounded-full text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">VIT CGPA Calculator</Link>
              </div>
            </div>

        </div>
      </div>
    </>
  );
}
