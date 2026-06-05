import { Metadata } from 'next';
import Link from 'next/link';
import CGPACalculatorClient from '@/components/CGPACalculatorClient';

export const dynamic = 'force-static';
const SITE = 'https://smarttoolswala.com';
const CANONICAL = `${SITE}/ipu-cgpa-calculator`;

export const metadata: Metadata = {
  title: 'IPU CGPA Calculator – IP University CGPA Calculator Free (2025)',
  description: 'Free IPU CGPA Calculator for Guru Gobind Singh Indraprastha University Delhi. Calculate your CGPA using IPU official 10-point grading scale with grades O, A, B+, B, C+, C, D.',
  alternates: { canonical: CANONICAL },
  openGraph: { title: 'IPU CGPA Calculator – IP University CGPA Calculator Free (2025)', description: 'Free IPU CGPA Calculator for Guru Gobind Singh Indraprastha University Delhi. Calculate your CGPA using IPU official 10-point grading scale with grades O, A, B+, B, C+, C, D.', url: CANONICAL, type: 'website' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'IPU CGPA Calculator – IP University CGPA Calculator Free (2025)',
  description: 'Free IPU CGPA Calculator for Guru Gobind Singh Indraprastha University Delhi. Calculate your CGPA using IPU official 10-point grading scale with grades O, A, B+, B, C+, C, D.',
  url: CANONICAL,
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'IPU CGPA Calculator',
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
    { '@type': 'ListItem', position: 2, name: 'IPU CGPA Calculator', item: CANONICAL },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
            { "@type": "Question", "name": "What is the IPU grading system?", "acceptedAnswer": { "@type": "Answer", "text": "IPU (Guru Gobind Singh Indraprastha University) uses a 10-point grading system: O=10 (90-100%), A=9 (80-89%), B+=8 (70-79%), B=7 (60-69%), C+=6 (50-59%), C=5 (45-49%), D=4 (40-44%), F=0 (fail)." } },
            { "@type": "Question", "name": "How to calculate IPU CGPA?", "acceptedAnswer": { "@type": "Answer", "text": "IPU CGPA = Σ(Grade Point × Credits) / Σ(Total Credits). Enter your grade and credits for each subject in the IPU CGPA calculator above." } },
            { "@type": "Question", "name": "What is the minimum CGPA to pass at IPU?", "acceptedAnswer": { "@type": "Answer", "text": "Students must earn a D grade (4 points, 40 marks minimum) in each subject and maintain an overall CGPA above 4.0 to be eligible for the degree." } },
            { "@type": "Question", "name": "How to convert IPU CGPA to percentage?", "acceptedAnswer": { "@type": "Answer", "text": "IPU Percentage = CGPA × 9.5. So CGPA 7.5 = 71.25%, CGPA 8.0 = 76%, CGPA 9.0 = 85.5%." } },
            { "@type": "Question", "name": "What CGPA is First Division in IPU?", "acceptedAnswer": { "@type": "Answer", "text": "A CGPA of 7.0 to 8.99 is considered First Division at IPU. CGPA 9.0 and above is First Division with Distinction." } },
            { "@type": "Question", "name": "Does IPU have a back paper policy?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. If a student fails (F grade) in a subject, they must clear the back paper in subsequent examination cycles. The F grade is replaced by the cleared grade in CGPA calculation." } },
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
            <span className="text-slate-700">IPU CGPA Calculator</span>
          </nav>

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
              🎓 Free Online Calculator
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              IPU CGPA Calculator
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Free IPU CGPA Calculator for Guru Gobind Singh Indraprastha University Delhi. Calculate your CGPA using IPU official 10-point grading scale with grades O, A, B+, B, C+, C, D.
            </p>
          </div>

          {/* Calculator */}
          <CGPACalculatorClient variant="ipu" accentColor="#0e7490" />

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

            <h2>About Guru Gobind Singh Indraprastha University (IPU)</h2>
            <p>Guru Gobind Singh Indraprastha University (GGSIPU), commonly known as IP University or IPU, is a state university in Delhi, India. It affiliates over 100 professional colleges across Delhi and NCR offering engineering, law, medicine, management, and other programmes. IPU follows a <strong>10-point Credit-Based Grading System (CBGS)</strong> introduced under its 2012 regulations.</p>

            <h2>IPU Grade Point Table</h2>
            <table>
              <thead><tr><th>Grade</th><th>Grade Point</th><th>Marks Range</th><th>Performance</th></tr></thead>
              <tbody>
                <tr><td><strong>O</strong></td><td>10</td><td>90–100</td><td>Outstanding</td></tr>
                <tr><td><strong>A</strong></td><td>9</td><td>80–89</td><td>Excellent</td></tr>
                <tr><td><strong>B+</strong></td><td>8</td><td>70–79</td><td>Very Good</td></tr>
                <tr><td><strong>B</strong></td><td>7</td><td>60–69</td><td>Good</td></tr>
                <tr><td><strong>C+</strong></td><td>6</td><td>50–59</td><td>Average</td></tr>
                <tr><td><strong>C</strong></td><td>5</td><td>45–49</td><td>Pass</td></tr>
                <tr><td><strong>D</strong></td><td>4</td><td>40–44</td><td>Marginal Pass</td></tr>
                <tr><td><strong>F</strong></td><td>0</td><td>Below 40</td><td>Fail</td></tr>
              </tbody>
            </table>

            <h2>IPU CGPA Formula</h2>
            <p><strong>IPU CGPA = Σ (Grade Point × Credit Hours) / Σ (Total Credit Hours)</strong></p>
            <p>In IPU affiliated colleges, each subject carries a specific number of credit hours. Theory subjects generally have 3–4 credits, and lab/practical sessions have 1–2 credits. Project work in the final year can carry 6 or more credits.</p>

            <h2>IPU CGPA to Percentage</h2>
            <p>IPU follows the standard formula: <strong>Percentage = CGPA × 9.5</strong></p>
            <p>For example, IPU CGPA 8.0 = 76%, CGPA 7.0 = 66.5%, CGPA 9.0 = 85.5%.</p>

            <h2>IPU Classification of Results</h2>
            <table>
              <thead><tr><th>CGPA</th><th>Division</th></tr></thead>
              <tbody>
                <tr><td>9.0 and above</td><td>First Division with Distinction</td></tr>
                <tr><td>7.0 to 8.99</td><td>First Division</td></tr>
                <tr><td>5.0 to 6.99</td><td>Second Division</td></tr>
                <tr><td>4.0 to 4.99</td><td>Pass (Third Division)</td></tr>
                <tr><td>Below 4.0</td><td>Fail</td></tr>
              </tbody>
            </table>

            <h2>IPU Placement CGPA Requirements</h2>
            <ul>
              <li><strong>Major IT companies:</strong> 6.0 CGPA minimum, 7.0+ preferred</li>
              <li><strong>Core Engineering companies:</strong> 6.5 CGPA minimum</li>
              <li><strong>Delhi Government jobs (Technical):</strong> 60% or CGPA 6.32 equivalent</li>
              <li><strong>UPSC/civil services:</strong> No CGPA requirement but First Division preferred</li>
            </ul>

          </article>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is the IPU grading system?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  IPU (Guru Gobind Singh Indraprastha University) uses a 10-point grading system: O=10 (90-100%), A=9 (80-89%), B+=8 (70-79%), B=7 (60-69%), C+=6 (50-59%), C=5 (45-49%), D=4 (40-44%), F=0 (fail).
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  How to calculate IPU CGPA?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  IPU CGPA = Σ(Grade Point × Credits) / Σ(Total Credits). Enter your grade and credits for each subject in the IPU CGPA calculator above.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is the minimum CGPA to pass at IPU?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Students must earn a D grade (4 points, 40 marks minimum) in each subject and maintain an overall CGPA above 4.0 to be eligible for the degree.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  How to convert IPU CGPA to percentage?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  IPU Percentage = CGPA × 9.5. So CGPA 7.5 = 71.25%, CGPA 8.0 = 76%, CGPA 9.0 = 85.5%.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What CGPA is First Division in IPU?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  A CGPA of 7.0 to 8.99 is considered First Division at IPU. CGPA 9.0 and above is First Division with Distinction.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  Does IPU have a back paper policy?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Yes. If a student fails (F grade) in a subject, they must clear the back paper in subsequent examination cycles. The F grade is replaced by the cleared grade in CGPA calculation.
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
