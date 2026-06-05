import { Metadata } from 'next';
import Link from 'next/link';
import CGPACalculatorClient from '@/components/CGPACalculatorClient';

export const dynamic = 'force-static';
const SITE = 'https://smarttoolswala.com';
const CANONICAL = `${SITE}/anna-university-cgpa-calculator`;

export const metadata: Metadata = {
  title: 'Anna University CGPA Calculator – Free AU CGPA Tool (2025)',
  description: 'Free Anna University CGPA Calculator. Calculate your CGPA using Anna University official grade point table with grades O, A+, A, B+, B, C and get equivalent percentage instantly.',
  alternates: { canonical: CANONICAL },
  openGraph: { title: 'Anna University CGPA Calculator – Free AU CGPA Tool (2025)', description: 'Free Anna University CGPA Calculator. Calculate your CGPA using Anna University official grade point table with grades O, A+, A, B+, B, C and get equivalent percentage instantly.', url: CANONICAL, type: 'website' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Anna University CGPA Calculator – Free AU CGPA Tool (2025)',
  description: 'Free Anna University CGPA Calculator. Calculate your CGPA using Anna University official grade point table with grades O, A+, A, B+, B, C and get equivalent percentage instantly.',
  url: CANONICAL,
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'Anna University CGPA Calculator',
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
    { '@type': 'ListItem', position: 2, name: 'Anna University CGPA Calculator', item: CANONICAL },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
            { "@type": "Question", "name": "What is the Anna University grading system?", "acceptedAnswer": { "@type": "Answer", "text": "Anna University uses a 10-point absolute grading scale: O=10 (91-100%), A+=9 (81-90%), A=8 (71-80%), B+=7 (61-70%), B=6 (57-60%), C=5 (50-56%), U=0 (fail, below 50%)." } },
            { "@type": "Question", "name": "How to convert Anna University CGPA to percentage?", "acceptedAnswer": { "@type": "Answer", "text": "Anna University official formula: Percentage = (CGPA × 10) − 0.75. So CGPA 8.5 = 84.25%, CGPA 7.0 = 69.25%." } },
            { "@type": "Question", "name": "What is the minimum CGPA to pass at Anna University?", "acceptedAnswer": { "@type": "Answer", "text": "Students must score a minimum of C grade (5 points) in each subject and maintain an overall CGPA of 5.0 to be eligible for the degree. A U grade (fail) in any subject requires re-appearing." } },
            { "@type": "Question", "name": "What is a U grade at Anna University?", "acceptedAnswer": { "@type": "Answer", "text": "U stands for Unsatisfactory and is equivalent to a fail. Students must re-appear in the subject until they clear it. The U grade impacts CGPA significantly as it contributes 0 grade points." } },
            { "@type": "Question", "name": "What CGPA is required for government jobs from Anna University?", "acceptedAnswer": { "@type": "Answer", "text": "Most state government technical jobs require a minimum of 60% or CGPA 6.87 equivalent. Central PSUs generally require 60-65% or equivalent CGPA." } },
            { "@type": "Question", "name": "How many credits are in each semester at Anna University?", "acceptedAnswer": { "@type": "Answer", "text": "Anna University B.E/B.Tech programs typically have 23-25 credits per semester. The total for a 4-year programme is around 160-180 credits depending on the branch." } },
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
            <span className="text-slate-700">Anna University CGPA Calculator</span>
          </nav>

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
              🎓 Free Online Calculator
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              Anna University CGPA Calculator
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Free Anna University CGPA Calculator. Calculate your CGPA using Anna University official grade point table with grades O, A+, A, B+, B, C and get equivalent percentage instantly.
            </p>
          </div>

          {/* Calculator */}
          <CGPACalculatorClient variant="anna" accentColor="#b45309" />

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

            <h2>About Anna University Grading System</h2>
            <p>Anna University (AU) is the affiliating university for engineering colleges in Tamil Nadu, India. It is one of the largest technical universities in Asia, with over 500 affiliated colleges. Anna University follows a <strong>10-point grading system</strong> with absolute grading introduced under the regulation 2017 (R2017) and further revised in R2021.</p>

            <h2>Anna University Grade Point Table</h2>
            <table>
              <thead><tr><th>Grade</th><th>Grade Point</th><th>Marks Range</th><th>Description</th></tr></thead>
              <tbody>
                <tr><td><strong>O</strong></td><td>10</td><td>91–100</td><td>Outstanding</td></tr>
                <tr><td><strong>A+</strong></td><td>9</td><td>81–90</td><td>Excellent</td></tr>
                <tr><td><strong>A</strong></td><td>8</td><td>71–80</td><td>Very Good</td></tr>
                <tr><td><strong>B+</strong></td><td>7</td><td>61–70</td><td>Good</td></tr>
                <tr><td><strong>B</strong></td><td>6</td><td>57–60</td><td>Average</td></tr>
                <tr><td><strong>C</strong></td><td>5</td><td>50–56</td><td>Pass</td></tr>
                <tr><td><strong>U</strong></td><td>0</td><td>Below 50</td><td>Fail (Re-appear)</td></tr>
              </tbody>
            </table>

            <h2>Anna University CGPA Formula</h2>
            <p><strong>AU CGPA = Σ (Grade Point × Credits) / Σ (Total Credits)</strong></p>

            <h2>Anna University CGPA to Percentage — Unique Formula</h2>
            <p>Anna University has a unique official conversion formula:</p>
            <p><strong>Percentage = (CGPA × 10) − 0.75</strong></p>
            <p>This is specific to Anna University and differs from other universities. For example:</p>
            <ul>
              <li>CGPA 9.0 = (9.0 × 10) − 0.75 = <strong>89.25%</strong></li>
              <li>CGPA 8.0 = (8.0 × 10) − 0.75 = <strong>79.25%</strong></li>
              <li>CGPA 7.5 = (7.5 × 10) − 0.75 = <strong>74.25%</strong></li>
            </ul>
            <p>Reverse conversion (Percentage to CGPA):</p>
            <p><strong>CGPA = (Percentage + 0.75) / 10</strong></p>

            <h2>Anna University Regulation-Wise Differences</h2>
            <table>
              <thead><tr><th>Regulation</th><th>Grade Scale</th><th>Notable Change</th></tr></thead>
              <tbody>
                <tr><td>R2008</td><td>100-point marks</td><td>Traditional marks-based system</td></tr>
                <tr><td>R2013</td><td>10-point CGPA</td><td>First CGPA introduction</td></tr>
                <tr><td>R2017</td><td>10-point CGPA</td><td>Absolute grading, U grade replaces F</td></tr>
                <tr><td>R2021</td><td>10-point CGPA</td><td>OBE focus, refined assessment methods</td></tr>
              </tbody>
            </table>

          </article>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is the Anna University grading system?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Anna University uses a 10-point absolute grading scale: O=10 (91-100%), A+=9 (81-90%), A=8 (71-80%), B+=7 (61-70%), B=6 (57-60%), C=5 (50-56%), U=0 (fail, below 50%).
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  How to convert Anna University CGPA to percentage?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Anna University official formula: Percentage = (CGPA × 10) − 0.75. So CGPA 8.5 = 84.25%, CGPA 7.0 = 69.25%.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is the minimum CGPA to pass at Anna University?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Students must score a minimum of C grade (5 points) in each subject and maintain an overall CGPA of 5.0 to be eligible for the degree. A U grade (fail) in any subject requires re-appearing.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is a U grade at Anna University?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  U stands for Unsatisfactory and is equivalent to a fail. Students must re-appear in the subject until they clear it. The U grade impacts CGPA significantly as it contributes 0 grade points.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What CGPA is required for government jobs from Anna University?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Most state government technical jobs require a minimum of 60% or CGPA 6.87 equivalent. Central PSUs generally require 60-65% or equivalent CGPA.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  How many credits are in each semester at Anna University?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Anna University B.E/B.Tech programs typically have 23-25 credits per semester. The total for a 4-year programme is around 160-180 credits depending on the branch.
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
