import { Metadata } from 'next';
import Link from 'next/link';
import CGPACalculatorClient from '@/components/CGPACalculatorClient';

export const dynamic = 'force-static';
const SITE = 'https://smarttoolswala.com';
const CANONICAL = `${SITE}/cgpa-calculator`;

export const metadata: Metadata = {
  title: 'CGPA Calculator – Calculate CGPA from SGPA Online (2025)',
  description: 'Free CGPA Calculator online. Enter your SGPA and credits for each semester to instantly calculate your Cumulative Grade Point Average. Supports all Indian universities.',
  alternates: { canonical: CANONICAL },
  openGraph: { title: 'CGPA Calculator – Calculate CGPA from SGPA Online (2025)', description: 'Free CGPA Calculator online. Enter your SGPA and credits for each semester to instantly calculate your Cumulative Grade Point Average. Supports all Indian universities.', url: CANONICAL, type: 'website' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'CGPA Calculator – Calculate CGPA from SGPA Online (2025)',
  description: 'Free CGPA Calculator online. Enter your SGPA and credits for each semester to instantly calculate your Cumulative Grade Point Average. Supports all Indian universities.',
  url: CANONICAL,
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'CGPA Calculator',
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
    { '@type': 'ListItem', position: 2, name: 'CGPA Calculator', item: CANONICAL },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
            { "@type": "Question", "name": "What is CGPA full form?", "acceptedAnswer": { "@type": "Answer", "text": "CGPA stands for Cumulative Grade Point Average. It is the average of all your Semester Grade Point Averages (SGPA) weighted by credit hours." } },
            { "@type": "Question", "name": "What is the formula to calculate CGPA?", "acceptedAnswer": { "@type": "Answer", "text": "CGPA = Σ(SGPA × Credits) / Σ(Credits). Multiply each semester SGPA by its credits, sum all values, and divide by total credits." } },
            { "@type": "Question", "name": "How do I convert CGPA to percentage?", "acceptedAnswer": { "@type": "Answer", "text": "Multiply your CGPA by 9.5 to get the approximate percentage. For Anna University: Percentage = (CGPA × 10) − 0.75." } },
            { "@type": "Question", "name": "Is 7.5 CGPA good?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, a 7.5 CGPA is considered good. Most tier-1 companies set a cutoff of 7.0 CGPA. A 7.5 CGPA gives you access to most campus placement opportunities." } },
            { "@type": "Question", "name": "Can CGPA decrease after a good semester?", "acceptedAnswer": { "@type": "Answer", "text": "Generally no — a semester with SGPA higher than your current CGPA will increase it, and vice versa. Since it is a weighted average, even a great semester may only marginally improve your CGPA if you have many semesters behind you." } },
            { "@type": "Question", "name": "What is the difference between GPA and CGPA?", "acceptedAnswer": { "@type": "Answer", "text": "GPA (Grade Point Average) is used in the US on a 4.0 scale. CGPA is used in India on a 10.0 scale. Both measure academic performance but on different scales." } },
            { "@type": "Question", "name": "What CGPA is required for government jobs?", "acceptedAnswer": { "@type": "Answer", "text": "Most PSU and government recruitment boards require a minimum CGPA of 6.0 to 6.5. Some premium roles may require 7.0 or higher." } },
            { "@type": "Question", "name": "Does CGPA matter after getting a job?", "acceptedAnswer": { "@type": "Answer", "text": "CGPA matters most during campus placements and initial job applications. Once you have work experience (typically 2+ years), CGPA becomes much less relevant compared to your skills and portfolio." } },
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
            <span className="text-slate-700">CGPA Calculator</span>
          </nav>

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
              🎓 Free Online Calculator
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              CGPA Calculator
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Free CGPA Calculator online. Enter your SGPA and credits for each semester to instantly calculate your Cumulative Grade Point Average. Supports all Indian universities.
            </p>
          </div>

          {/* Calculator */}
          <CGPACalculatorClient variant="master" accentColor="#6366f1" />

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

            <h2>What is CGPA?</h2>
            <p>CGPA, or <strong>Cumulative Grade Point Average</strong>, is the overall measure of a student's academic performance across all semesters of their degree programme. Unlike SGPA (Semester Grade Point Average), which reflects performance in a single semester, CGPA gives a holistic view of your academic journey from the first semester to the last.</p>
            <p>In India, most universities — including IITs, NITs, VIT, SRM, Anna University, KTU, VTU, and IPU — follow a 10-point grading scale. A CGPA of 10 is the highest possible score, while a CGPA below 5 is often considered unsatisfactory. Many companies, especially in the IT and engineering sectors, set a minimum CGPA cutoff of 6.0 or 7.0 for campus placements.</p>

            <h2>Why is CGPA Important?</h2>
            <ul>
              <li><strong>Campus Placements:</strong> Most top-tier companies set a CGPA cutoff between 6.0 and 7.5. A higher CGPA keeps more doors open.</li>
              <li><strong>Higher Education:</strong> For Masters programmes like M.Tech, MBA, or MS abroad, CGPA is a primary shortlisting criterion.</li>
              <li><strong>Government Jobs:</strong> Many PSUs and government recruiters consider CGPA as part of their selection process.</li>
              <li><strong>Scholarships:</strong> Merit-based scholarships, including national and institutional ones, are almost always linked to CGPA.</li>
              <li><strong>Personal Milestone:</strong> CGPA is a numerical representation of your consistency, hard work, and academic dedication over the entire course.</li>
            </ul>

            <h2>CGPA Formula — How is CGPA Calculated?</h2>
            <p>The standard formula for calculating CGPA from multiple semesters is:</p>
            <p><strong>CGPA = Σ (SGPA × Credits) / Σ (Credits)</strong></p>
            <p>This is a weighted average formula. Each semester's SGPA is multiplied by the total credits of that semester. The sum of all weighted SGPAs is then divided by the total credits across all semesters.</p>

            <h3>Step-by-Step Calculation Example</h3>
            <p>Suppose you have completed 4 semesters:</p>
            <table>
              <thead><tr><th>Semester</th><th>SGPA</th><th>Credits</th><th>SGPA × Credits</th></tr></thead>
              <tbody>
                <tr><td>1</td><td>8.2</td><td>22</td><td>180.4</td></tr>
                <tr><td>2</td><td>7.8</td><td>24</td><td>187.2</td></tr>
                <tr><td>3</td><td>8.5</td><td>26</td><td>221.0</td></tr>
                <tr><td>4</td><td>9.0</td><td>24</td><td>216.0</td></tr>
              </tbody>
            </table>
            <p><strong>Total Weighted = 804.6 | Total Credits = 96</strong></p>
            <p><strong>CGPA = 804.6 / 96 = 8.38</strong></p>

            <h2>CGPA to Percentage Conversion</h2>
            <p>Most universities and employers still use percentage as a benchmark. Here is how to convert your CGPA to a percentage equivalent:</p>
            <p><strong>Percentage = CGPA × 9.5</strong></p>
            <p>This is the formula recommended by CBSE and widely used across Indian universities. So a CGPA of 8.38 equals approximately 79.6% using this formula.</p>
            <p>However, different universities use different multipliers. Anna University uses the formula: <em>Percentage = (CGPA × 10) − 0.75</em>. VTU uses 9.1 as the multiplier.</p>

            <h2>CGPA vs SGPA — What is the Difference?</h2>
            <table>
              <thead><tr><th>Parameter</th><th>SGPA</th><th>CGPA</th></tr></thead>
              <tbody>
                <tr><td>Stands For</td><td>Semester Grade Point Average</td><td>Cumulative Grade Point Average</td></tr>
                <tr><td>Scope</td><td>One semester only</td><td>All semesters combined</td></tr>
                <tr><td>Frequency</td><td>Calculated every semester</td><td>Recalculated cumulatively</td></tr>
                <tr><td>Use Case</td><td>Semester-specific assessment</td><td>Overall academic standing</td></tr>
              </tbody>
            </table>

            <h2>CGPA Grading Scale in Indian Universities</h2>
            <p>While most Indian universities follow a 10-point scale, the letter grades and their corresponding grade points can differ:</p>
            <ul>
              <li><strong>O (Outstanding):</strong> 10 points — typically 90–100%</li>
              <li><strong>A+ (Excellent):</strong> 9 points — typically 80–89%</li>
              <li><strong>A (Very Good):</strong> 8 points — typically 70–79%</li>
              <li><strong>B+ (Good):</strong> 7 points — typically 60–69%</li>
              <li><strong>B (Above Average):</strong> 6 points — typically 50–59%</li>
              <li><strong>C (Average):</strong> 5 points — typically 45–49%</li>
              <li><strong>F (Fail):</strong> 0 points — Below 45%</li>
            </ul>

            <h2>Tips to Improve Your CGPA</h2>
            <ol>
              <li><strong>Start Strong:</strong> Your first-year CGPA sets the base. A low start is mathematically harder to recover from due to weighted averaging.</li>
              <li><strong>Focus on High-Credit Subjects:</strong> Subjects with more credits have more weight in your CGPA calculation. Prioritise these.</li>
              <li><strong>Never Leave Backlogs:</strong> Failing a subject and re-appearing costs you time, money, and hurts your CGPA.</li>
              <li><strong>Attend Classes Consistently:</strong> Attendance often has internal marks attached. Missing classes can reduce your internal score significantly.</li>
              <li><strong>Practice Past Year Papers:</strong> Most universities are predictable in their question patterns. Solving previous papers gives you a major edge.</li>
              <li><strong>Form Study Groups:</strong> Collaborative learning improves understanding and retention significantly.</li>
              <li><strong>Seek Help Early:</strong> If you are struggling in a subject, approach your professor or senior well before exams.</li>
            </ol>

            <h2>How to Use This CGPA Calculator</h2>
            <ol>
              <li>Enter the SGPA you obtained in Semester 1 and the total credits for that semester.</li>
              <li>Click "Add Semester" to add rows for additional semesters.</li>
              <li>Enter SGPA and credits for each subsequent semester.</li>
              <li>Click "Calculate CGPA" to get your cumulative result instantly.</li>
              <li>The calculator also shows your equivalent percentage and academic performance label.</li>
            </ol>

          </article>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is CGPA full form?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  CGPA stands for Cumulative Grade Point Average. It is the average of all your Semester Grade Point Averages (SGPA) weighted by credit hours.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is the formula to calculate CGPA?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  CGPA = Σ(SGPA × Credits) / Σ(Credits). Multiply each semester SGPA by its credits, sum all values, and divide by total credits.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  How do I convert CGPA to percentage?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Multiply your CGPA by 9.5 to get the approximate percentage. For Anna University: Percentage = (CGPA × 10) − 0.75.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  Is 7.5 CGPA good?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Yes, a 7.5 CGPA is considered good. Most tier-1 companies set a cutoff of 7.0 CGPA. A 7.5 CGPA gives you access to most campus placement opportunities.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  Can CGPA decrease after a good semester?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Generally no — a semester with SGPA higher than your current CGPA will increase it, and vice versa. Since it is a weighted average, even a great semester may only marginally improve your CGPA if you have many semesters behind you.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is the difference between GPA and CGPA?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  GPA (Grade Point Average) is used in the US on a 4.0 scale. CGPA is used in India on a 10.0 scale. Both measure academic performance but on different scales.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What CGPA is required for government jobs?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Most PSU and government recruitment boards require a minimum CGPA of 6.0 to 6.5. Some premium roles may require 7.0 or higher.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  Does CGPA matter after getting a job?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  CGPA matters most during campus placements and initial job applications. Once you have work experience (typically 2+ years), CGPA becomes much less relevant compared to your skills and portfolio.
                </div>
              </details>
            </div>
            </div>
          </div>

          {/* Related */}
            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Related Tools</p>
              <div className="flex flex-wrap gap-2">

              </div>
            </div>

        </div>
      </div>
    </>
  );
}
