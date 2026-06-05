import { Metadata } from 'next';
import Link from 'next/link';
import CGPACalculatorClient from '@/components/CGPACalculatorClient';

export const dynamic = 'force-static';
const SITE = 'https://smarttoolswala.com';
const CANONICAL = `${SITE}/percentage-to-cgpa-calculator`;

export const metadata: Metadata = {
  title: 'Percentage to CGPA Calculator – Free Instant Converter (2025)',
  description: 'Convert percentage to CGPA instantly. Use our free Percentage to CGPA Calculator supporting CBSE, Anna University, VTU and all major Indian university formulas.',
  alternates: { canonical: CANONICAL },
  openGraph: { title: 'Percentage to CGPA Calculator – Free Instant Converter (2025)', description: 'Convert percentage to CGPA instantly. Use our free Percentage to CGPA Calculator supporting CBSE, Anna University, VTU and all major Indian university formulas.', url: CANONICAL, type: 'website' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Percentage to CGPA Calculator – Free Instant Converter (2025)',
  description: 'Convert percentage to CGPA instantly. Use our free Percentage to CGPA Calculator supporting CBSE, Anna University, VTU and all major Indian university formulas.',
  url: CANONICAL,
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'Percentage to CGPA Calculator',
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
    { '@type': 'ListItem', position: 2, name: 'Percentage to CGPA Calculator', item: CANONICAL },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
            { "@type": "Question", "name": "What is the formula to convert percentage to CGPA?", "acceptedAnswer": { "@type": "Answer", "text": "The general formula is: CGPA = Percentage / 9.5. Anna University uses: CGPA = (% + 0.75) / 10. VTU uses: CGPA = % / 9.1." } },
            { "@type": "Question", "name": "How much is 75% in CGPA?", "acceptedAnswer": { "@type": "Answer", "text": "75% equals approximately 7.89 CGPA using the general formula (75 / 9.5). For Anna University it is 7.575, and for VTU it is 8.24." } },
            { "@type": "Question", "name": "How much is 60% in CGPA?", "acceptedAnswer": { "@type": "Answer", "text": "60% equals approximately 6.32 CGPA (60 / 9.5). This is the most common question since 60% is a common passing threshold." } },
            { "@type": "Question", "name": "Is percentage to CGPA conversion accurate?", "acceptedAnswer": { "@type": "Answer", "text": "It is an approximation. Since grading systems vary, the same percentage can map to different CGPAs depending on the university's grade point distribution and assessment methodology." } },
            { "@type": "Question", "name": "Do all companies accept CGPA instead of percentage?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, most modern Indian companies accept CGPA. Many IT companies and MNCs explicitly ask for CGPA. If they ask for percentage, you can convert using the formula above and mention the conversion method used." } },
            { "@type": "Question", "name": "What is 85 percentage in CGPA?", "acceptedAnswer": { "@type": "Answer", "text": "85 / 9.5 = 8.95 CGPA (general formula). On the Anna University scale: (85 + 0.75) / 10 = 8.575 CGPA." } },
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
            <span className="text-slate-700">Percentage to CGPA Calculator</span>
          </nav>

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
              🎓 Free Online Calculator
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
              Percentage to CGPA Calculator
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Convert percentage to CGPA instantly. Use our free Percentage to CGPA Calculator supporting CBSE, Anna University, VTU and all major Indian university formulas.
            </p>
          </div>

          {/* Calculator */}
          <CGPACalculatorClient variant="percentage-to-cgpa" accentColor="#10b981" />

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

            <h2>How to Convert Percentage to CGPA</h2>
            <p>The most widely used formula to convert percentage to CGPA in India is:</p>
            <p><strong>CGPA = Percentage ÷ 9.5</strong></p>
            <p>This formula was popularised by CBSE (Central Board of Secondary Education) and is now accepted by most Indian universities, engineering colleges, and recruiters. For example, if your percentage is 85.5%, your CGPA would be 85.5 / 9.5 = <strong>9.0 CGPA</strong>.</p>

            <h2>University-Specific Conversion Formulas</h2>
            <table>
              <thead><tr><th>University / Board</th><th>Formula</th><th>Example (75%)</th></tr></thead>
              <tbody>
                <tr><td>CBSE / General</td><td>CGPA = % / 9.5</td><td>7.89</td></tr>
                <tr><td>Anna University</td><td>CGPA = (% + 0.75) / 10</td><td>7.575</td></tr>
                <tr><td>VTU (Karnataka)</td><td>CGPA = % / 9.1</td><td>8.24</td></tr>
                <tr><td>MAKAUT (West Bengal)</td><td>CGPA = % / 9.5</td><td>7.89</td></tr>
                <tr><td>Mumbai University</td><td>CGPA = % / 9.5</td><td>7.89</td></tr>
              </tbody>
            </table>

            <h2>Percentage to CGPA Conversion Chart</h2>
            <table>
              <thead><tr><th>Percentage</th><th>CGPA (÷9.5)</th><th>CGPA (Anna Univ.)</th><th>CGPA (VTU ÷9.1)</th></tr></thead>
              <tbody>
                <tr><td>95%</td><td>10.00</td><td>9.575</td><td>10.00</td></tr>
                <tr><td>90%</td><td>9.47</td><td>9.075</td><td>9.89</td></tr>
                <tr><td>85%</td><td>8.95</td><td>8.575</td><td>9.34</td></tr>
                <tr><td>80%</td><td>8.42</td><td>8.075</td><td>8.79</td></tr>
                <tr><td>75%</td><td>7.89</td><td>7.575</td><td>8.24</td></tr>
                <tr><td>70%</td><td>7.37</td><td>7.075</td><td>7.69</td></tr>
                <tr><td>65%</td><td>6.84</td><td>6.575</td><td>7.14</td></tr>
                <tr><td>60%</td><td>6.32</td><td>6.075</td><td>6.59</td></tr>
                <tr><td>55%</td><td>5.79</td><td>5.575</td><td>6.04</td></tr>
                <tr><td>50%</td><td>5.26</td><td>5.075</td><td>5.49</td></tr>
              </tbody>
            </table>

            <h2>Why Different Universities Use Different Formulas</h2>
            <p>There is no single national standard for CGPA-to-percentage conversion in India. Each university designs its own grading scale based on its assessment philosophy. CBSE adopted the 9.5 multiplier as a default, and UGC guidelines loosely support this. However, universities like Anna University and VTU have their own proprietary formulas backed by their academic councils.</p>
            <p>When applying to companies or higher education programmes, always mention <em>which university's formula</em> you are using. Most MNCs and graduate programmes accept the CBSE/general formula (÷9.5) unless you specify otherwise.</p>

          </article>

          {/* FAQ */}
          <div className="mt-16">
            <h2 className="text-2xl font-black text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is the formula to convert percentage to CGPA?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  The general formula is: CGPA = Percentage / 9.5. Anna University uses: CGPA = (% + 0.75) / 10. VTU uses: CGPA = % / 9.1.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  How much is 75% in CGPA?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  75% equals approximately 7.89 CGPA using the general formula (75 / 9.5). For Anna University it is 7.575, and for VTU it is 8.24.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  How much is 60% in CGPA?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  60% equals approximately 6.32 CGPA (60 / 9.5). This is the most common question since 60% is a common passing threshold.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  Is percentage to CGPA conversion accurate?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  It is an approximation. Since grading systems vary, the same percentage can map to different CGPAs depending on the university's grade point distribution and assessment methodology.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  Do all companies accept CGPA instead of percentage?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  Yes, most modern Indian companies accept CGPA. Many IT companies and MNCs explicitly ask for CGPA. If they ask for percentage, you can convert using the formula above and mention the conversion method used.
                </div>
              </details>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-slate-800 hover:bg-slate-50 list-none">
                  What is 85 percentage in CGPA?
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">&#8964;</span>
                </summary>
                <div className="px-5 pb-5 text-slate-600 leading-relaxed text-[15px]">
                  85 / 9.5 = 8.95 CGPA (general formula). On the Anna University scale: (85 + 0.75) / 10 = 8.575 CGPA.
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
