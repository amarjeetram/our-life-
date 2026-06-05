import { Metadata } from 'next';
import Link from 'next/link';
import CGPACalculatorClient from '@/components/CGPACalculatorClient';

export const dynamic = 'force-static';
const SITE = 'https://smarttoolswala.com';
const CANONICAL = `${SITE}/ktu-cgpa-calculator`;

export const metadata: Metadata = {
  title: 'KTU CGPA Calculator – Kerala Technological University CGPA (2025)',
  description: 'Free KTU CGPA Calculator for APJ Abdul Kalam Technological University, Kerala. Calculate your CGPA using KTU official grading scale with grades S, A+, A, B+, B, C+, C, D.',
  alternates: { canonical: CANONICAL },
  openGraph: { title: 'KTU CGPA Calculator – Kerala Technological University CGPA (2025)', description: 'Free KTU CGPA Calculator for APJ Abdul Kalam Technological University, Kerala. Calculate your CGPA using KTU official grading scale with grades S, A+, A, B+, B, C+, C, D.', url: CANONICAL, type: 'website' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'KTU CGPA Calculator – Kerala Technological University CGPA (2025)',
  description: 'Free KTU CGPA Calculator for APJ Abdul Kalam Technological University, Kerala. Calculate your CGPA using KTU official grading scale with grades S, A+, A, B+, B, C+, C, D.',
  url: CANONICAL,
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'KTU CGPA Calculator',
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
    { '@type': 'ListItem', position: 2, name: 'KTU CGPA Calculator', item: CANONICAL },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
            { "@type": "Question", "name": "What is the KTU grading system?", "acceptedAnswer": { "@type": "Answer", "text": "KTU (APJ Abdul Kalam Technological University) uses a 10-point scale: S=10 (90-100%), A+=9 (85-89%), A=8.5 (80-84%), B+=8 (70-79%), B=7 (60-69%), C+=6 (50-59%), C=5 (45-49%), D=4 (40-44%), F=0 (fail)." } },
            { "@type": "Question", "name": "How to calculate KTU CGPA?", "acceptedAnswer": { "@type": "Answer", "text": "KTU CGPA = Σ(Grade Point × Credits) / Σ(Total Credits). Use the KTU CGPA calculator above — select your grade and enter credits for each subject." } },
            { "@type": "Question", "name": "What is the minimum CGPA to pass KTU exams?", "acceptedAnswer": { "@type": "Answer", "text": "Students must maintain a minimum CGPA of 5.0 to be eligible for the degree certificate. Each individual subject requires a minimum D grade (40 marks) to pass." } },
            { "@type": "Question", "name": "How to convert KTU CGPA to percentage?", "acceptedAnswer": { "@type": "Answer", "text": "KTU Percentage = CGPA × 9.5. For example, CGPA 8.0 = 76%, CGPA 7.0 = 66.5%." } },
            { "@type": "Question", "name": "Is there grade rounding in KTU?", "acceptedAnswer": { "@type": "Answer", "text": "KTU uses fixed grade boundaries. If you score 84 marks, you get an A grade (8.5 points), not A+ (9 points), which starts at 85. There is no rounding to the next grade." } },
            { "@type": "Question", "name": "What CGPA is first class in KTU?", "acceptedAnswer": { "@type": "Answer", "text": "A CGPA of 7.0 to 8.99 is First Class. CGPA 9.0 and above is First Class with Honours. CGPA 5.0 to 6.99 is Second Class." } },
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
            <span className="text-slate-700">KTU CGPA Calculator</span>
          </nav>

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
              🎓 Free Online Calculator
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              KTU CGPA Calculator
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Free KTU CGPA Calculator for APJ Abdul Kalam Technological University, Kerala. Calculate your CGPA using KTU official grading scale with grades S, A+, A, B+, B, C+, C, D.
            </p>
          </div>

          {/* Calculator */}
          <CGPACalculatorClient variant="ktu" accentColor="#0891b2" />

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

            <h2>About KTU — APJ Abdul Kalam Technological University</h2>
            <p>APJ Abdul Kalam Technological University (KTU) is the affiliating university for engineering colleges in Kerala, India. Established in 2015, KTU affiliates over 160 engineering colleges across the state. The university follows a <strong>10-point grading system</strong> with a unique set of grade letters that includes fractional grade points.</p>

            <h2>KTU Grading System — Grade Points Table</h2>
            <table>
              <thead><tr><th>Grade</th><th>Grade Point</th><th>Marks Range</th><th>Performance Level</th></tr></thead>
              <tbody>
                <tr><td><strong>S</strong></td><td>10</td><td>90–100</td><td>Outstanding</td></tr>
                <tr><td><strong>A+</strong></td><td>9</td><td>85–89</td><td>Excellent</td></tr>
                <tr><td><strong>A</strong></td><td>8.5</td><td>80–84</td><td>Very Good</td></tr>
                <tr><td><strong>B+</strong></td><td>8</td><td>70–79</td><td>Good</td></tr>
                <tr><td><strong>B</strong></td><td>7</td><td>60–69</td><td>Above Average</td></tr>
                <tr><td><strong>C+</strong></td><td>6</td><td>50–59</td><td>Average</td></tr>
                <tr><td><strong>C</strong></td><td>5</td><td>45–49</td><td>Pass</td></tr>
                <tr><td><strong>D</strong></td><td>4</td><td>40–44</td><td>Marginal Pass</td></tr>
                <tr><td><strong>F</strong></td><td>0</td><td>Below 40</td><td>Fail</td></tr>
              </tbody>
            </table>

            <h2>KTU CGPA Formula</h2>
            <p><strong>KTU CGPA = Σ (Grade Point × Credit) / Σ (Total Credits)</strong></p>
            <p>KTU has a credit-based system where different subjects carry different credits. Laboratory courses typically have 1–2 credits, while core theory subjects have 3–4 credits. The CGPA is recalculated every semester cumulatively.</p>

            <h2>KTU CGPA to Percentage Conversion</h2>
            <p>KTU officially uses the formula: <strong>Percentage = CGPA × 9.5</strong></p>
            <p>For example: KTU CGPA 8.0 = 76%, CGPA 7.5 = 71.25%, CGPA 9.0 = 85.5%.</p>

            <h2>KTU CGPA Grading Classification</h2>
            <table>
              <thead><tr><th>CGPA Range</th><th>Class</th></tr></thead>
              <tbody>
                <tr><td>9.0 and above</td><td>First Class with Honours (Distinction)</td></tr>
                <tr><td>7.0 to 8.99</td><td>First Class</td></tr>
                <tr><td>5.0 to 6.99</td><td>Second Class</td></tr>
                <tr><td>Below 5.0</td><td>Pass (No Class)</td></tr>
              </tbody>
            </table>

            <h2>KTU Placement and Higher Studies CGPA Tips</h2>
            <ul>
              <li>Most companies visiting KTU colleges require a minimum CGPA of <strong>5.5 to 6.5</strong>.</li>
              <li>PSU exams (BSNL, ONGC, BHEL) typically require <strong>6.5 CGPA or 60% equivalent</strong>.</li>
              <li>For Kerala government technical jobs, a <strong>minimum CGPA of 6.0</strong> is generally required.</li>
              <li>For GATE, aim for CGPA 7.0+ to be competitive for NIT/IIT M.Tech programmes.</li>
            </ul>

          </article>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is the KTU grading system?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  KTU (APJ Abdul Kalam Technological University) uses a 10-point scale: S=10 (90-100%), A+=9 (85-89%), A=8.5 (80-84%), B+=8 (70-79%), B=7 (60-69%), C+=6 (50-59%), C=5 (45-49%), D=4 (40-44%), F=0 (fail).
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  How to calculate KTU CGPA?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  KTU CGPA = Σ(Grade Point × Credits) / Σ(Total Credits). Use the KTU CGPA calculator above — select your grade and enter credits for each subject.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is the minimum CGPA to pass KTU exams?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Students must maintain a minimum CGPA of 5.0 to be eligible for the degree certificate. Each individual subject requires a minimum D grade (40 marks) to pass.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  How to convert KTU CGPA to percentage?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  KTU Percentage = CGPA × 9.5. For example, CGPA 8.0 = 76%, CGPA 7.0 = 66.5%.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  Is there grade rounding in KTU?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  KTU uses fixed grade boundaries. If you score 84 marks, you get an A grade (8.5 points), not A+ (9 points), which starts at 85. There is no rounding to the next grade.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What CGPA is first class in KTU?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  A CGPA of 7.0 to 8.99 is First Class. CGPA 9.0 and above is First Class with Honours. CGPA 5.0 to 6.99 is Second Class.
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
