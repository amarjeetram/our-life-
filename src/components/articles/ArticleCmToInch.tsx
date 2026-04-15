import React from 'react';
import { Ruler, Calculator, HelpCircle, ArrowRightLeft } from 'lucide-react';

export default function ArticleCmToInch() {
    return (
        <article className="mt-16 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-200 text-slate-700 leading-relaxed">
            {/* Header Section */}
            <header className="mb-10">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                    How to Convert Centimeters to Inches
                </h2>
                <div className="h-1.5 w-20 bg-green-500 rounded-full mb-6"></div>
                <p className="text-lg font-medium text-slate-600 mb-4">
                    If you need to <strong>convert cm to inches</strong> (centimeters to inches), you are in the right place. Whether you are measuring your height, buying clothes, checking screen sizes, or working on construction projects, understanding the relationship between the metric system and the imperial system is an essential mathematical skill. 
                </p>
                <p className="text-lg font-medium text-slate-600">
                    Our free online converter provides instant, highly accurate results for any <strong>cm to inches conversion</strong>. Say goodbye to manual math, complex formulas, and confusing charts!
                </p>
            </header>

            {/* Formula Section */}
            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <Calculator className="text-green-600" size={28} />
                    <h3 className="text-2xl font-bold text-slate-800">The Centimeters to Inches Formula</h3>
                </div>
                <p className="mb-4">
                    If you want to manually convert lengths from centimeters to inches, it is relatively straightforward once you know the exact conversion factor.
                </p>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner mb-6 text-center">
                    <span className="block text-sm text-slate-500 font-bold uppercase tracking-wider mb-2">Standard Formula</span>
                    <span className="text-2xl md:text-3xl font-black text-green-700">1 inch = 2.54 centimeters</span>
                </div>
                <p className="mb-4">
                    Therefore, to calculate <strong>how many inches are in a cm</strong>, you need to divide your length value by 2.54.
                </p>
                <div className="bg-green-50 p-6 rounded-2xl border border-green-100 flex items-center justify-center gap-4 text-lg font-mono">
                    <span className="font-bold">Inches</span> 
                    <span className="text-green-500">=</span> 
                    <span>Centimeters <strong>÷</strong> 2.54</span>
                </div>
            </section>

            {/* Practical Examples */}
            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <Ruler className="text-green-600" size={28} />
                    <h3 className="text-2xl font-bold text-slate-800">Common Conversion Examples</h3>
                </div>
                <p className="mb-6">
                    A lot of people search for the exact same measurements every day. Let's look at some highly requested conversions of how the <strong>length converter</strong> handles calculations mathematically:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 shadow-sm hover:border-green-300 transition-colors">
                        <ArrowRightLeft className="text-slate-400" size={20} />
                        <div>
                            <p className="font-bold text-slate-800">15 cm to inches</p>
                            <p className="text-slate-600 text-sm">15 ÷ 2.54 = <strong>5.90551 inches</strong></p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 shadow-sm hover:border-green-300 transition-colors">
                        <ArrowRightLeft className="text-slate-400" size={20} />
                        <div>
                            <p className="font-bold text-slate-800">20 cm to inches</p>
                            <p className="text-slate-600 text-sm">20 ÷ 2.54 = <strong>7.87402 inches</strong></p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 shadow-sm hover:border-green-300 transition-colors">
                        <ArrowRightLeft className="text-slate-400" size={20} />
                        <div>
                            <p className="font-bold text-slate-800">A Standard Ruler: 30 cm to inches</p>
                            <p className="text-slate-600 text-sm">30 ÷ 2.54 = <strong>11.8110 inches</strong></p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 shadow-sm hover:border-green-300 transition-colors">
                        <ArrowRightLeft className="text-slate-400" size={20} />
                        <div>
                            <p className="font-bold text-slate-800">Half a Meter: 50 cm to inches</p>
                            <p className="text-slate-600 text-sm">50 ÷ 2.54 = <strong>19.6850 inches</strong></p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Reference Table */}
            <section className="mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Comprehensive CM to Inches Reference Table</h3>
                <p className="mb-6">
                    For quick referencing, here is a highly requested metric and imperial unit conversion table spanning from 1 cm all the way up to 150 cm. These measurements are strictly precise.
                </p>
                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm max-h-[600px] overflow-y-auto">
                    <table className="w-full text-left border-collapse text-sm md:text-base relative">
                        <thead className="sticky top-0 bg-slate-100 shadow-sm">
                            <tr>
                                <th className="p-4 font-bold text-slate-800 border-b border-slate-200">Centimeters (cm)</th>
                                <th className="p-4 font-bold text-slate-800 border-b border-slate-200">Inches (in)</th>
                                <th className="p-4 font-bold text-slate-800 border-b border-slate-200 hidden sm:table-cell">Fractional (Approx)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { cm: 1, inch: 0.3937, frac: "3/8 in" },
                                { cm: 5, inch: 1.9685, frac: "1 31/32 in" },
                                { cm: 10, inch: 3.9370, frac: "3 15/16 in" },
                                { cm: 15, inch: 5.9055, frac: "5 29/32 in" },
                                { cm: 16, inch: 6.2992, frac: "6 5/16 in" },
                                { cm: 17, inch: 6.6929, frac: "6 11/16 in" },
                                { cm: 18, inch: 7.0866, frac: "7 3/32 in" },
                                { cm: 20, inch: 7.8740, frac: "7 7/8 in" },
                                { cm: 25, inch: 9.8425, frac: "9 27/32 in" },
                                { cm: 30, inch: 11.8110, frac: "11 13/16 in" },
                                { cm: 40, inch: 15.7480, frac: "15 3/4 in" },
                                { cm: 50, inch: 19.6850, frac: "1 ft 7 11/16 in" },
                                { cm: 60, inch: 23.6220, frac: "1 ft 11 5/8 in" },
                                { cm: 70, inch: 27.5591, frac: "2 ft 3 9/16 in" },
                                { cm: 80, inch: 31.4961, frac: "2 ft 7 1/2 in" },
                                { cm: 90, inch: 35.4331, frac: "2 ft 11 7/16 in" },
                                { cm: 100, inch: 39.3701, frac: "3 ft 3 3/8 in" },
                                { cm: 120, inch: 47.2441, frac: "3 ft 11 1/4 in" },
                                { cm: 150, inch: 59.0551, frac: "4 ft 11 1/16 in" }
                            ].map((row, index) => (
                                <tr key={row.cm} className={`hover:bg-green-50 transition-colors ${index % 2 === 1 ? 'bg-slate-50/50' : ''}`}>
                                    <td className="p-4 border-b border-slate-100 font-medium whitespace-nowrap">
                                        <a href={`#`} className="hover:underline hover:text-green-600 block w-full">{row.cm} cm to inches</a>
                                    </td>
                                    <td className="p-4 border-b border-slate-100 text-green-700 font-bold">{row.inch.toFixed(4)} in</td>
                                    <td className="p-4 border-b border-slate-100 text-slate-500 hidden sm:table-cell">{row.frac}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Why Use Our Converter? */}
            <section className="mb-12">
                <h3 className="text-2xl font-bold text-slate-800 mb-6">Why Use Our CM to In Converter?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-green-300 transition-colors">
                        <h4 className="font-bold text-lg text-slate-800 mb-2">100% Accurate</h4>
                        <p className="text-sm">We use the exact scientific conversion standard (<code className="text-xs bg-slate-100 px-1 py-0.5 rounded text-pink-600">1in = 2.54cm</code>) ensuring your construction plans or sewing patterns are absolutely flawless.</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-green-300 transition-colors">
                        <h4 className="font-bold text-lg text-slate-800 mb-2">Bidirectional</h4>
                        <p className="text-sm">Not only can you convert centi into inches, but our smart tool also acts directly as an <strong>inches to centimeters</strong> converter with a single click.</p>
                    </div>
                </div>
            </section>

            {/* SEO FAQs */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <HelpCircle className="text-green-600" size={28} />
                    <h3 className="text-2xl font-bold text-slate-800">Frequently Asked Questions</h3>
                </div>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-lg text-slate-800 mb-2">How do you convert 1 cm to an inch?</h4>
                        <p>Because one inch equals 2.54 centimeters, you convert 1 cm to an inch by dividing 1 by 2.54. This results in approximately <strong>0.3937 inches</strong>.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-800 mb-2">How many cm is an inch on a ruler?</h4>
                        <p>If you examine a standard school ruler, you will clearly see that the 1-inch mark aligns perfectly with the <strong>2.54 cm</strong> mark on the metric side of the ruler.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-800 mb-2">Is 1 inch strictly 2.5 cm?</h4>
                        <p>No, this is a common estimation. One inch is exactly 2.54 cm. While 2.5 cm might be fine for a rough mental guess, using it for detailed works like carpentry or engineering will lead to critical measurement errors.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-800 mb-2">What does CM and IN mean?</h4>
                        <p><strong>CM</strong> stands for Centimeter, which is a unit of length in the International System of Units (metric system). <strong>IN</strong> stands for Inch, which is a customary unit of length used primarily in the United States and the United Kingdom (imperial system).</p>
                    </div>
                </div>
            </section>
        </article>
    );
}
