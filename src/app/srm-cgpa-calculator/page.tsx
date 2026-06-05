import { Metadata } from 'next';
import Link from 'next/link';
import CGPACalculatorClient from '@/components/CGPACalculatorClient';

export const dynamic = 'force-static';
const SITE = 'https://smarttoolswala.com';
const CANONICAL = `${SITE}/srm-cgpa-calculator`;

export const metadata: Metadata = {
  title: 'SRM CGPA Calculator – SRM University Grade to CGPA (2025)',
  description: 'Free SRM CGPA Calculator for SRM Institute of Science and Technology. Calculate your CGPA using SRM official 10-point grading scale with grade letters O, A+, A, B+, B, C.',
  alternates: { canonical: CANONICAL },
  openGraph: { title: 'SRM CGPA Calculator – SRM University Grade to CGPA (2025)', description: 'Free SRM CGPA Calculator for SRM Institute of Science and Technology. Calculate your CGPA using SRM official 10-point grading scale with grade letters O, A+, A, B+, B, C.', url: CANONICAL, type: 'website' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'SRM CGPA Calculator – SRM University Grade to CGPA (2025)',
  description: 'Free SRM CGPA Calculator for SRM Institute of Science and Technology. Calculate your CGPA using SRM official 10-point grading scale with grade letters O, A+, A, B+, B, C.',
  url: CANONICAL,
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'SRM CGPA Calculator',
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
    { '@type': 'ListItem', position: 2, name: 'SRM CGPA Calculator', item: CANONICAL },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
            { "@type": "Question", "name": "What is the SRM grading system?", "acceptedAnswer": { "@type": "Answer", "text": "SRM uses a 10-point grading system: O = 10 (91-100%), A+ = 9.5 (81-90%), A = 9 (71-80%), B+ = 8 (61-70%), B = 7 (51-60%), C = 6 (45-50%), F = 0 (fail)." } },
            { "@type": "Question", "name": "How to calculate SRM CGPA?", "acceptedAnswer": { "@type": "Answer", "text": "SRM CGPA = Σ(Grade Point × Credits) / Σ(Total Credits). Enter your grade and credits for each subject in our SRM CGPA calculator above." } },
            { "@type": "Question", "name": "What is the difference between SRM and VIT grading?", "acceptedAnswer": { "@type": "Answer", "text": "SRM has an A+ grade worth 9.5 points, while VIT does not. VIT's top grade S is 10 points, same as SRM's O. The major difference is SRM's A+ at 9.5, which falls between O and A." } },
            { "@type": "Question", "name": "What CGPA do I need for placements at SRM?", "acceptedAnswer": { "@type": "Answer", "text": "Most companies require a minimum of 6.0 CGPA for placements at SRM. For premium companies and IT service roles, 7.0 CGPA is recommended. Dream companies often require 8.0+." } },
            { "@type": "Question", "name": "Can I convert my SRM CGPA to percentage?", "acceptedAnswer": { "@type": "Answer", "text": "Yes: Percentage = SRM CGPA × 9.5. So a CGPA of 8.0 = 76%, CGPA of 9.0 = 85.5%." } },
            { "@type": "Question", "name": "Is SRM CGPA system relative or absolute?", "acceptedAnswer": { "@type": "Answer", "text": "SRM follows absolute grading — your grade depends on your actual marks, not class performance. Scoring 91+ always gives you an O grade regardless of how others perform." } },
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
            <span className="text-slate-700">SRM CGPA Calculator</span>
          </nav>

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
              🎓 Free Online Calculator
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              SRM CGPA Calculator
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Free SRM CGPA Calculator for SRM Institute of Science and Technology. Calculate your CGPA using SRM official 10-point grading scale with grade letters O, A+, A, B+, B, C.
            </p>
          </div>

          {/* Calculator */}
          <CGPACalculatorClient variant="srm" accentColor="#7c3aed" />

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

            <h2>SRM Institute Grading System</h2>
            <p>SRM Institute of Science and Technology (SRMIST) is one of India's top private universities with campuses in Chennai (Kattankulathur), Delhi NCR, Amaravati (AP), Vadapalani, and Trichy. SRM follows a <strong>10-point grading system</strong> similar to VIT but with a slightly different grade table that includes fractional grade points (like A+ = 9.5).</p>

            <h2>SRM Grade Point Table</h2>
            <table>
              <thead><tr><th>Grade</th><th>Grade Point</th><th>Marks Range</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><strong>O</strong></td><td>10</td><td>91–100</td><td>Outstanding</td></tr>
                <tr><td><strong>A+</strong></td><td>9.5</td><td>81–90</td><td>Excellent</td></tr>
                <tr><td><strong>A</strong></td><td>9</td><td>71–80</td><td>Very Good</td></tr>
                <tr><td><strong>B+</strong></td><td>8</td><td>61–70</td><td>Good</td></tr>
                <tr><td><strong>B</strong></td><td>7</td><td>51–60</td><td>Above Average</td></tr>
                <tr><td><strong>C</strong></td><td>6</td><td>45–50</td><td>Average</td></tr>
                <tr><td><strong>F</strong></td><td>0</td><td>Below 45</td><td>Fail</td></tr>
              </tbody>
            </table>

            <h2>SRM CGPA Calculation Formula</h2>
            <p><strong>SRM CGPA = Σ (Grade Point × Credit Hours) / Σ (Total Credit Hours)</strong></p>
            <p>SRM uses credit hours similar to most deemed universities. Theory subjects typically have 3 credits, lab subjects have 1.5 or 2 credits, and some major subjects carry 4 credits.</p>

            <h2>SRM CGPA to Percentage Conversion</h2>
            <p>SRM uses the standard formula: <strong>Percentage = CGPA × 9.5</strong></p>
            <p>For example, a CGPA of 9.0 at SRM = 85.5%, and CGPA of 8.5 = 80.75%.</p>

            <h2>SRM Placement CGPA Requirements</h2>
            <p>SRM has a very active placement cell with 500+ companies visiting annually. Common CGPA cutoffs include:</p>
            <ul>
              <li><strong>Top IT Companies (TCS Digital, Wipro Elite):</strong> 7.0+ CGPA</li>
              <li><strong>Mass Recruiters (TCS, Infosys, CTS):</strong> 6.0+ CGPA</li>
              <li><strong>Core Engineering:</strong> 6.5+ CGPA</li>
              <li><strong>Startups and Product Companies:</strong> Skill-based, CGPA 7.5+ preferred</li>
            </ul>

            <h2>CGPA Requirements for Higher Studies from SRM</h2>
            <ul>
              <li><strong>GATE (IIT/NIT M.Tech):</strong> 6.5+ CGPA required for most programmes</li>
              <li><strong>GRE (MS in USA):</strong> 7.5+ CGPA preferred by top universities</li>
              <li><strong>SRM Internal M.Tech:</strong> 7.0+ CGPA for direct admission</li>
              <li><strong>MBA (CAT/XAT):</strong> 6.5+ CGPA for most IIMs</li>
            </ul>

          </article>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is the SRM grading system?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  SRM uses a 10-point grading system: O = 10 (91-100%), A+ = 9.5 (81-90%), A = 9 (71-80%), B+ = 8 (61-70%), B = 7 (51-60%), C = 6 (45-50%), F = 0 (fail).
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  How to calculate SRM CGPA?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  SRM CGPA = Σ(Grade Point × Credits) / Σ(Total Credits). Enter your grade and credits for each subject in our SRM CGPA calculator above.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is the difference between SRM and VIT grading?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  SRM has an A+ grade worth 9.5 points, while VIT does not. VIT's top grade S is 10 points, same as SRM's O. The major difference is SRM's A+ at 9.5, which falls between O and A.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What CGPA do I need for placements at SRM?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Most companies require a minimum of 6.0 CGPA for placements at SRM. For premium companies and IT service roles, 7.0 CGPA is recommended. Dream companies often require 8.0+.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  Can I convert my SRM CGPA to percentage?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Yes: Percentage = SRM CGPA × 9.5. So a CGPA of 8.0 = 76%, CGPA of 9.0 = 85.5%.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  Is SRM CGPA system relative or absolute?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  SRM follows absolute grading — your grade depends on your actual marks, not class performance. Scoring 91+ always gives you an O grade regardless of how others perform.
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
