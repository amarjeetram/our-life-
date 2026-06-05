import { Metadata } from 'next';
import Link from 'next/link';
import CGPACalculatorClient from '@/components/CGPACalculatorClient';

export const dynamic = 'force-static';
const SITE = 'https://smarttoolswala.com';
const CANONICAL = `${SITE}/vit-cgpa-calculator`;

export const metadata: Metadata = {
  title: 'VIT CGPA Calculator – VIT University Grade to CGPA (2025)',
  description: 'Free VIT CGPA Calculator for VIT Vellore, Chennai, AP and Bhopal. Enter your VIT grade letters and credits to instantly calculate your CGPA using VIT official grading scale.',
  alternates: { canonical: CANONICAL },
  openGraph: { title: 'VIT CGPA Calculator – VIT University Grade to CGPA (2025)', description: 'Free VIT CGPA Calculator for VIT Vellore, Chennai, AP and Bhopal. Enter your VIT grade letters and credits to instantly calculate your CGPA using VIT official grading scale.', url: CANONICAL, type: 'website' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'VIT CGPA Calculator – VIT University Grade to CGPA (2025)',
  description: 'Free VIT CGPA Calculator for VIT Vellore, Chennai, AP and Bhopal. Enter your VIT grade letters and credits to instantly calculate your CGPA using VIT official grading scale.',
  url: CANONICAL,
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'VIT CGPA Calculator',
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
    { '@type': 'ListItem', position: 2, name: 'VIT CGPA Calculator', item: CANONICAL },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
            { "@type": "Question", "name": "What is the VIT grading system?", "acceptedAnswer": { "@type": "Answer", "text": "VIT uses a 10-point absolute grading system. Grade S = 10 points (91-100%), A = 9 (81-90%), B = 8 (71-80%), C = 7 (61-70%), D = 6 (51-60%), E = 5 (45-50%), F = 0 (fail)." } },
            { "@type": "Question", "name": "How is CGPA calculated at VIT?", "acceptedAnswer": { "@type": "Answer", "text": "VIT CGPA = Σ(Grade Point × Credits) / Σ(Total Credits). Enter your grade for each subject and the corresponding credits to calculate using our VIT CGPA calculator above." } },
            { "@type": "Question", "name": "What is a good CGPA at VIT?", "acceptedAnswer": { "@type": "Answer", "text": "A CGPA of 8.0 and above is considered good at VIT. For premium placements and higher studies (GATE/GRE), aim for 8.5+. For IIMs and IITs, 7.5+ is typically required." } },
            { "@type": "Question", "name": "How to convert VIT CGPA to percentage?", "acceptedAnswer": { "@type": "Answer", "text": "VIT CGPA to Percentage formula: Percentage = CGPA × 9.5. So a CGPA of 9.0 = 85.5%, CGPA of 8.0 = 76%." } },
            { "@type": "Question", "name": "What is the minimum CGPA to appear in VIT placements?", "acceptedAnswer": { "@type": "Answer", "text": "The minimum CGPA requirement varies by company. Most companies require 6.0 CGPA. Some premium IT companies require 6.5 or 7.0. Dream companies often prefer 8.0+." } },
            { "@type": "Question", "name": "Does VIT use relative or absolute grading?", "acceptedAnswer": { "@type": "Answer", "text": "VIT uses absolute grading. Your grade is based purely on your marks, not your class rank or batch performance. This is more transparent and predictable than relative grading systems." } },
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
            <span className="text-slate-700">VIT CGPA Calculator</span>
          </nav>

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
              🎓 Free Online Calculator
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              VIT CGPA Calculator
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Free VIT CGPA Calculator for VIT Vellore, Chennai, AP and Bhopal. Enter your VIT grade letters and credits to instantly calculate your CGPA using VIT official grading scale.
            </p>
          </div>

          {/* Calculator */}
          <CGPACalculatorClient variant="vit" accentColor="#dc2626" />

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

            <h2>VIT University Grading System Explained</h2>
            <p>VIT (Vellore Institute of Technology) is one of India's premier deemed universities, with campuses in Vellore, Chennai, Amaravati (AP), and Bhopal. VIT follows a <strong>10-point absolute grading system</strong>, which means your CGPA is determined purely by your marks, not relative to your classmates.</p>
            <p>This absolute system is beneficial for students because a batch-wide performance drop does not reduce your grade point. If you score 91 marks, you get an S grade (10 points), regardless of class average.</p>

            <h2>VIT Grade Point Table</h2>
            <table>
              <thead><tr><th>Grade</th><th>Grade Point</th><th>Marks Range</th><th>Performance</th></tr></thead>
              <tbody>
                <tr><td><strong>S</strong></td><td>10</td><td>91–100</td><td>Outstanding</td></tr>
                <tr><td><strong>A</strong></td><td>9</td><td>81–90</td><td>Excellent</td></tr>
                <tr><td><strong>B</strong></td><td>8</td><td>71–80</td><td>Very Good</td></tr>
                <tr><td><strong>C</strong></td><td>7</td><td>61–70</td><td>Good</td></tr>
                <tr><td><strong>D</strong></td><td>6</td><td>51–60</td><td>Average</td></tr>
                <tr><td><strong>E</strong></td><td>5</td><td>45–50</td><td>Pass</td></tr>
                <tr><td><strong>F</strong></td><td>0</td><td>Below 45</td><td>Fail</td></tr>
              </tbody>
            </table>

            <h2>VIT CGPA Formula</h2>
            <p>VIT calculates CGPA using the standard weighted credit formula:</p>
            <p><strong>VIT CGPA = Σ (Grade Point × Credits) / Σ (Credits)</strong></p>

            <h2>VIT CGPA to Percentage</h2>
            <p>VIT officially uses the CBSE standard conversion: <strong>Percentage = CGPA × 9.5</strong></p>
            <p>So a CGPA of 9.0 at VIT equals approximately 85.5%, and a CGPA of 8.0 equals approximately 76%.</p>

            <h2>VIT CGPA for Placements</h2>
            <p>VIT has excellent placement records with top companies like TCS, Infosys, Wipro, Cognizant, Accenture, and more. Here are common CGPA cutoffs at VIT placements:</p>
            <ul>
              <li><strong>Product Companies (Google, Amazon, Microsoft):</strong> Generally no strict cutoff but CGPA 8.5+ preferred</li>
              <li><strong>IT Service Companies (TCS, Infosys):</strong> CGPA 6.0 minimum</li>
              <li><strong>Mass Recruiters:</strong> CGPA 5.5 minimum</li>
              <li><strong>GATE / Higher Studies:</strong> CGPA 7.5+ recommended</li>
            </ul>

            <h2>Tips to Improve CGPA at VIT</h2>
            <ul>
              <li>VIT has a <strong>Digital Assessment (DA)</strong> system — attend all classes to avoid attendance shortage which can bar you from exams.</li>
              <li>The internal component includes quizzes, assignments, and lab performance. Score full marks here as they are relatively easy.</li>
              <li>VIT uses an absolute grading system — focus on getting 81+ marks to secure an A grade (9 points).</li>
              <li>FFCS (Fully Flexible Credit System) allows you to choose faculty — always pick faculty with a good teaching reputation for better understanding and marks.</li>
            </ul>

          </article>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is the VIT grading system?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  VIT uses a 10-point absolute grading system. Grade S = 10 points (91-100%), A = 9 (81-90%), B = 8 (71-80%), C = 7 (61-70%), D = 6 (51-60%), E = 5 (45-50%), F = 0 (fail).
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  How is CGPA calculated at VIT?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  VIT CGPA = Σ(Grade Point × Credits) / Σ(Total Credits). Enter your grade for each subject and the corresponding credits to calculate using our VIT CGPA calculator above.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is a good CGPA at VIT?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  A CGPA of 8.0 and above is considered good at VIT. For premium placements and higher studies (GATE/GRE), aim for 8.5+. For IIMs and IITs, 7.5+ is typically required.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  How to convert VIT CGPA to percentage?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  VIT CGPA to Percentage formula: Percentage = CGPA × 9.5. So a CGPA of 9.0 = 85.5%, CGPA of 8.0 = 76%.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is the minimum CGPA to appear in VIT placements?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  The minimum CGPA requirement varies by company. Most companies require 6.0 CGPA. Some premium IT companies require 6.5 or 7.0. Dream companies often prefer 8.0+.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  Does VIT use relative or absolute grading?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  VIT uses absolute grading. Your grade is based purely on your marks, not your class rank or batch performance. This is more transparent and predictable than relative grading systems.
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
              <Link href="/srm-cgpa-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-white border border-slate-200 rounded-full text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">SRM CGPA Calculator</Link>
              </div>
            </div>

        </div>
      </div>
    </>
  );
}
