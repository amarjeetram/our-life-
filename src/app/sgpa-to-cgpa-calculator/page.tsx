import { Metadata } from 'next';
import Link from 'next/link';
import CGPACalculatorClient from '@/components/CGPACalculatorClient';

export const dynamic = 'force-static';
const SITE = 'https://smarttoolswala.com';
const CANONICAL = `${SITE}/sgpa-to-cgpa-calculator`;

export const metadata: Metadata = {
  title: 'SGPA to CGPA Calculator – Free Instant Converter (2025)',
  description: 'Convert SGPA to CGPA online for free. Enter your semester-wise SGPA and credits to get your cumulative CGPA instantly. Works for all Indian universities.',
  alternates: { canonical: CANONICAL },
  openGraph: { title: 'SGPA to CGPA Calculator – Free Instant Converter (2025)', description: 'Convert SGPA to CGPA online for free. Enter your semester-wise SGPA and credits to get your cumulative CGPA instantly. Works for all Indian universities.', url: CANONICAL, type: 'website' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'SGPA to CGPA Calculator – Free Instant Converter (2025)',
  description: 'Convert SGPA to CGPA online for free. Enter your semester-wise SGPA and credits to get your cumulative CGPA instantly. Works for all Indian universities.',
  url: CANONICAL,
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'SGPA to CGPA Calculator',
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
    { '@type': 'ListItem', position: 2, name: 'SGPA to CGPA Calculator', item: CANONICAL },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
            { "@type": "Question", "name": "How is SGPA converted to CGPA?", "acceptedAnswer": { "@type": "Answer", "text": "CGPA = Σ(SGPA × Credits per semester) / Σ(Total Credits). Multiply each semester SGPA by its credits, add all these values, then divide by the total credits earned." } },
            { "@type": "Question", "name": "Is SGPA and CGPA the same?", "acceptedAnswer": { "@type": "Answer", "text": "No. SGPA measures your performance in a single semester. CGPA is the weighted cumulative average of all semesters combined." } },
            { "@type": "Question", "name": "Can I calculate CGPA without knowing credits?", "acceptedAnswer": { "@type": "Answer", "text": "If all your semesters have the same number of credits, you can take a simple average of all SGPAs. Otherwise, you need semester-wise credits for an accurate CGPA." } },
            { "@type": "Question", "name": "What SGPA do I need to get a CGPA of 8.0?", "acceptedAnswer": { "@type": "Answer", "text": "If your current CGPA is below 8.0, you need to score higher than 8.0 in future semesters. The exact SGPA required depends on your remaining semesters and credits. Use this calculator by entering your desired CGPA as a target and work backward." } },
            { "@type": "Question", "name": "Does SGPA reset every semester?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. SGPA is fresh every semester and only reflects that semester's performance. CGPA carries forward all previous semester results." } },
            { "@type": "Question", "name": "Which is more important for placements, SGPA or CGPA?", "acceptedAnswer": { "@type": "Answer", "text": "CGPA is used for placements, not individual SGPAs. Companies look at your overall CGPA, not individual semester performance. However, a strong final-semester SGPA can sometimes be highlighted in interviews." } },
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
            <span className="text-slate-700">SGPA to CGPA Calculator</span>
          </nav>

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
              🎓 Free Online Calculator
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              SGPA to CGPA Calculator
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Convert SGPA to CGPA online for free. Enter your semester-wise SGPA and credits to get your cumulative CGPA instantly. Works for all Indian universities.
            </p>
          </div>

          {/* Calculator */}
          <CGPACalculatorClient variant="sgpa-to-cgpa" accentColor="#8b5cf6" />

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

            <h2>What is SGPA?</h2>
            <p><strong>SGPA (Semester Grade Point Average)</strong> is the weighted average of all grade points earned in a single semester. It reflects your academic performance for that specific semester alone. SGPA is calculated using the formula:</p>
            <p><strong>SGPA = Σ (Grade Points × Credits) / Σ (Credits)</strong></p>
            <p>For example, if you scored an A+ (9 points) in a 4-credit course and a B+ (7 points) in a 3-credit course, your SGPA for those two subjects would be: (9×4 + 7×3) / (4+3) = (36+21)/7 = 57/7 ≈ 8.14.</p>

            <h2>How to Convert SGPA to CGPA</h2>
            <p>CGPA is simply the weighted average of all your semester SGPAs. The formula is:</p>
            <p><strong>CGPA = Σ (SGPA × Semester Credits) / Σ (Total Credits)</strong></p>
            <p>You need both the SGPA and the total credit load for each semester. Universities with uniform credit structures (same credits every semester) can use a simple average, but most engineering programmes have varying credit loads, so a weighted average is essential.</p>

            <h3>SGPA to CGPA Conversion Table</h3>
            <table>
              <thead><tr><th>SGPA (All Sems Equal)</th><th>CGPA (Approx.)</th><th>Percentage</th></tr></thead>
              <tbody>
                <tr><td>9.5</td><td>9.50</td><td>90.25%</td></tr>
                <tr><td>9.0</td><td>9.00</td><td>85.5%</td></tr>
                <tr><td>8.5</td><td>8.50</td><td>80.75%</td></tr>
                <tr><td>8.0</td><td>8.00</td><td>76.0%</td></tr>
                <tr><td>7.5</td><td>7.50</td><td>71.25%</td></tr>
                <tr><td>7.0</td><td>7.00</td><td>66.5%</td></tr>
                <tr><td>6.5</td><td>6.50</td><td>61.75%</td></tr>
                <tr><td>6.0</td><td>6.00</td><td>57.0%</td></tr>
              </tbody>
            </table>

            <h2>Why is SGPA Different from CGPA?</h2>
            <p>SGPA is a semester-level metric, while CGPA is cumulative. A student can have a high SGPA in the final semester but a moderate CGPA if early semesters were weak. This is because earlier semesters with heavy credit loads carry significant weight in the CGPA formula.</p>
            <p>Conversely, if you performed poorly in one semester (low SGPA), your CGPA impact depends on the credits in that semester. A bad semester with 15 credits hurts less than a bad semester with 30 credits.</p>

            <h2>SGPA to CGPA — Practical Tips</h2>
            <ul>
              <li><strong>Consistency is Key:</strong> A consistent SGPA of 8.0 across all semesters gives you the same CGPA as 8.0, regardless of credit variation.</li>
              <li><strong>Heavy Semesters Matter More:</strong> If Semester 3 has 30 credits while Semester 1 has 18, Semester 3 has almost double the CGPA impact.</li>
              <li><strong>Final Year Impact:</strong> Many universities front-load credits in Years 1–2. By the time you reach Year 4, you may need significantly high SGPA to move your CGPA meaningfully.</li>
              <li><strong>Track Early:</strong> Use this calculator every semester to understand where you stand and what SGPA you need in future semesters to hit your target CGPA.</li>
            </ul>

          </article>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  How is SGPA converted to CGPA?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  CGPA = Σ(SGPA × Credits per semester) / Σ(Total Credits). Multiply each semester SGPA by its credits, add all these values, then divide by the total credits earned.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  Is SGPA and CGPA the same?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  No. SGPA measures your performance in a single semester. CGPA is the weighted cumulative average of all semesters combined.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  Can I calculate CGPA without knowing credits?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  If all your semesters have the same number of credits, you can take a simple average of all SGPAs. Otherwise, you need semester-wise credits for an accurate CGPA.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What SGPA do I need to get a CGPA of 8.0?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  If your current CGPA is below 8.0, you need to score higher than 8.0 in future semesters. The exact SGPA required depends on your remaining semesters and credits. Use this calculator by entering your desired CGPA as a target and work backward.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  Does SGPA reset every semester?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Yes. SGPA is fresh every semester and only reflects that semester's performance. CGPA carries forward all previous semester results.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  Which is more important for placements, SGPA or CGPA?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  CGPA is used for placements, not individual SGPAs. Companies look at your overall CGPA, not individual semester performance. However, a strong final-semester SGPA can sometimes be highlighted in interviews.
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
              <Link href="/gpa-to-cgpa-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-white border border-slate-200 rounded-full text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">GPA to CGPA</Link>
              <Link href="/vit-cgpa-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-white border border-slate-200 rounded-full text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">VIT CGPA Calculator</Link>
              <Link href="/srm-cgpa-calculator" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold bg-white border border-slate-200 rounded-full text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors">SRM CGPA Calculator</Link>
              </div>
            </div>

        </div>
      </div>
    </>
  );
}
