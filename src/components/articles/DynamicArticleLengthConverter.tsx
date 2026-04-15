import React from 'react';
import { Ruler, Calculator, HelpCircle, ArrowRightLeft, History, AlertTriangle, Lightbulb, TrendingUp, BookOpen } from 'lucide-react';

interface DynamicArticleLengthConverterProps {
    fromUnitName: string;      
    toUnitName: string;        
    fromUnitSymbol: string;    
    toUnitSymbol: string;      
    conversionFactor: number;  
    conversionType: 'multiply' | 'divide';  
    systemFrom: 'Metric' | 'Imperial';
    systemTo: 'Metric' | 'Imperial';
}

export default function DynamicArticleLengthConverter({
    fromUnitName,
    toUnitName,
    fromUnitSymbol,
    toUnitSymbol,
    conversionFactor,
    conversionType,
    systemFrom,
    systemTo
}: DynamicArticleLengthConverterProps) {
    
    // Deterministic randomizer so the text doesn't change on hydrate, but each page gets a unique feel.
    const variationIndex = (fromUnitName.charCodeAt(0) + toUnitName.charCodeAt(0)) % 4;

    const calc = (val: number) => {
        const res = conversionType === 'multiply' ? val * conversionFactor : val / conversionFactor;
        return Number.isInteger(res) ? res.toString() : res.toFixed(4);
    };

    const tableValuesVariants = [
        [1, 5, 10, 15, 20, 25, 30, 40, 50, 75, 100, 150, 200, 500, 1000],
        [1, 2, 3, 4, 5, 10, 20, 50, 100, 250, 500, 1000, 5000, 10000],
        [5, 10, 15, 20, 25, 50, 100, 150, 200, 250, 300, 400, 500, 1000],
        [1, 10, 25, 50, 75, 100, 125, 150, 175, 200, 300, 400, 500, 1000]
    ];
    const tableValues = tableValuesVariants[variationIndex];

    // --- Content Variations ---

    // 1. Headers
    const headers = [
        `Comprehensive Guide: How to Convert ${fromUnitName} to ${toUnitName}`,
        `Mastering the ${fromUnitName} to ${toUnitName} Conversion`,
        `The Ultimate ${fromUnitSymbol} to ${toUnitSymbol} Converter and Guide`,
        `Everything You Need to Know About ${fromUnitName} to ${toUnitName}`
    ];

    // 2. Intros
    const intros = [
        [
            `Welcome to the ultimate guide on converting ${fromUnitName.toLowerCase()} to ${toUnitName.toLowerCase()} (${fromUnitSymbol} to ${toUnitSymbol}). Whether you are tackling a complex engineering project, completing a math homework assignment, or simply trying to understand a measurement in a different system, knowing how to seamlessly switch between the ${systemFrom} and ${systemTo} systems is an indispensable skill.`,
            `Our free, instant online ${fromUnitName.toLowerCase()} to ${toUnitName.toLowerCase()} converter takes the guesswork entirely out of the equation. By utilizing highly precise mathematical constants, it guarantees 100% accuracy every single time.`,
            `Below, we have compiled a massive resource that explores the exact formula, practical examples, history of the units, common mistakes, and a comprehensive quick-reference chart. Say goodbye to manual math!`
        ],
        [
            `Are you struggling to figure out exactly how many ${toUnitName.toLowerCase()} fit into a specific number of ${fromUnitName.toLowerCase()}? You are certainly not alone. Transitioning between ${systemFrom} and ${systemTo} measurements is one of the most common daily mathematical hurdles.`,
            `Instead of risking manual errors with a calculator, our digital ${fromUnitSymbol} to ${toUnitSymbol} tool provides instantaneous, flawless results.`,
            `In this detailed breakdown, we’ll explore not just the "how" but the "why" behind the ${fromUnitName} to ${toUnitName} conversion, equipping you with exact formulas, historical context, and ready-to-use data tables.`
        ],
        [
            `Converting ${fromUnitName} to ${toUnitName} shouldn't require a degree in mathematics. Whether you are dealing with real estate, architecture, or everyday DIY household tasks, fast and precise unit conversion is essential.`,
            `Using our automated ${fromUnitName.toLowerCase()} calculator ensures you never make a structural or financial mistake due to a misplaced decimal point.`,
            `Keep reading to discover professional calculation methods, quick mental math tricks, and an expansive conversion index spanning up to 1000 ${fromUnitSymbol}.`
        ],
        [
            `The relationship between ${fromUnitName} and ${toUnitName} forms the bedrock of thousands of calculations made globally every day in the fields of science, manufacturing, and global trade.`,
            `We specifically designed this ${fromUnitSymbol} to ${toUnitSymbol} converter to bridge the gap between the ${systemFrom} framework and the ${systemTo} framework effortlessly.`,
            `Dive into our deep analysis below, featuring exact equations, step-by-step mathematical walkthroughs, and common pitfalls to avoid when dealing with these specific length units.`
        ]
    ];

    // 3. Formula section descriptions
    const formulaIntros = [
        `If you find yourself without our digital converter and need to perform the calculation manually, you only need to remember one critical number: the conversion factor, which is ${conversionFactor}.`,
        `The mathematical backbone of this conversion is astonishingly simple once you memorize the base ratio. The magic number linking ${fromUnitName} and ${toUnitName} is ${conversionFactor}.`,
        `Manual calculation requires precision. To manually bridge ${fromUnitName} and ${toUnitName}, you will apply the constant factor of ${conversionFactor} through basic arithmetic.`,
        `When constructing algorithms or doing math by hand, the foundational rule is that the constant of proportionality between these two units is exactly ${conversionFactor}.`
    ];

    return (
        <article className="mt-16 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-200 text-slate-700 leading-relaxed">
            
            {/* Header / Intro Section */}
            <header className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                    {headers[variationIndex]}
                </h2>
                <div className="h-1.5 w-20 bg-green-500 rounded-full mb-6"></div>
                {intros[variationIndex].map((paragraph, i) => (
                    <p key={i} className="text-lg font-medium text-slate-600 mb-4">
                        {paragraph}
                    </p>
                ))}
            </header>

            {/* Formula Section */}
            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    {variationIndex % 2 === 0 ? <Calculator className="text-green-600" size={28} /> : <BookOpen className="text-green-600" size={28} />}
                    <h3 className="text-2xl font-bold text-slate-800">
                        {variationIndex < 2 ? `The Exact ${fromUnitName} to ${toUnitName} Formula` : `Mathematical Formula for ${fromUnitSymbol} to ${toUnitSymbol}`}
                    </h3>
                </div>
                <p className="mb-4">
                    {formulaIntros[variationIndex]}
                </p>
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-inner mb-6 text-center">
                    <span className="block text-sm text-slate-500 font-bold uppercase tracking-wider mb-2">Standard Equation</span>
                    <span className={`text-2xl md:text-3xl font-black ${variationIndex % 2 === 0 ? 'text-green-700' : 'text-blue-700'}`}>
                        {conversionType === 'multiply' 
                            ? `1 ${fromUnitName} = ${conversionFactor} ${toUnitName}` 
                            : `1 ${fromUnitName} = (1 ÷ ${conversionFactor}) ${toUnitName}`}
                    </span>
                </div>
                <p className="mb-4">
                    {variationIndex < 2 
                        ? `Therefore, to calculate exactly how many ${toUnitName.toLowerCase()} are in a specific amount of ${fromUnitName.toLowerCase()}, you simply take your ${fromUnitName} value and `
                        : `In practice, this means mapping a ${fromUnitName} input to a ${toUnitName} output requires you to `}
                    <strong>{conversionType}</strong> it by {conversionFactor}.
                </p>
                
                <div className={`p-6 rounded-2xl border flex flex-wrap items-center justify-center gap-4 text-lg font-mono text-center ${variationIndex % 2 === 0 ? 'bg-green-50 border-green-100' : 'bg-blue-50 border-blue-100'}`}>
                    <span className="font-bold">{toUnitName}</span> 
                    <span className={variationIndex % 2 === 0 ? 'text-green-500' : 'text-blue-500'}>=</span> 
                    <span>{fromUnitName} <strong>{conversionType === 'multiply' ? '×' : '÷'}</strong> {conversionFactor}</span>
                </div>
            </section>

            {/* Understanding the Systems (History/Context) Conditional Layout */}
            {variationIndex !== 3 && (
                <section className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <History className="text-green-600" size={28} />
                        <h3 className="text-2xl font-bold text-slate-800">Comparing {systemFrom} and {systemTo} Measurements</h3>
                    </div>
                    <div className="prose prose-slate max-w-none text-slate-600">
                        <p>
                            We frequently need to convert {fromUnitName} to {toUnitName} due to the differing adoption of measurement frameworks globally.
                        </p>
                        {systemFrom !== systemTo ? (
                            <p className="mt-4">
                                Bridging the <strong>{systemFrom} System</strong> and the <strong>{systemTo} System</strong> is critical. The Metric system is decimal-based and deeply logical, whereas the Imperial system is highly historical, rooted in ancient standardizations. A reliable {fromUnitSymbol} to {toUnitSymbol} translation prevents catastrophic engineering misalignments.
                            </p>
                        ) : (
                            <p className="mt-4">
                                Both {fromUnitName} and {toUnitName} belong to the <strong>{systemFrom} System</strong>. This conversion is purely a matter of scaling magnitudes up or down depending on the size of the object or distance you are measuring, allowing for more manageable numerical values.
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* Quick Reference Table using varying numbers */}
            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="text-green-600" size={28} />
                    <h3 className="text-2xl font-bold text-slate-800">{fromUnitName} to {toUnitName} Reference Chart</h3>
                </div>
                <p className="mb-6">
                    Whether you're estimating or need exact data, bookmark this expansive <strong>{fromUnitSymbol} to {toUnitSymbol} scale chart</strong> for rapid daily reference.
                </p>
                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm max-h-[600px] overflow-y-auto">
                    <table className="w-full text-left border-collapse text-sm md:text-base relative">
                        <thead className="sticky top-0 bg-slate-100 shadow-sm">
                            <tr>
                                <th className="p-4 font-bold text-slate-800 border-b border-slate-200">{fromUnitName} ({fromUnitSymbol})</th>
                                <th className="p-4 font-bold text-slate-800 border-b border-slate-200">{toUnitName} ({toUnitSymbol})</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableValues.map((val, index) => (
                                <tr key={val} className={`hover:bg-slate-100 transition-colors ${index % 2 === 1 ? 'bg-slate-50/50' : ''}`}>
                                    <td className="p-4 border-b border-slate-100 font-medium whitespace-nowrap">
                                        <span className="block w-full text-slate-700">{val} {fromUnitSymbol}</span>
                                    </td>
                                    <td className="p-4 border-b border-slate-100 font-bold text-slate-900">{calc(val)} {toUnitSymbol}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* SEO FAQs */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <HelpCircle className="text-green-600" size={28} />
                    <h3 className="text-2xl font-bold text-slate-800">Frequently Asked Questions (FAQ)</h3>
                </div>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-bold text-lg text-slate-800 mb-2">What is the exact value of 1 {fromUnitSymbol} in {toUnitSymbol}?</h4>
                        <p>When applying the standard conversion metric, 1 {fromUnitName.toLowerCase()} precisely equates to <strong>{calc(1)} {toUnitSymbol}</strong>.</p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-800 mb-2">Which acts as the larger unit: {fromUnitName} or {toUnitName}?</h4>
                        <p>
                            {conversionType === 'multiply' 
                                ? `The ${fromUnitName} dictates a larger length than the ${toUnitName}. You can see this because exactly 1 ${fromUnitSymbol} encompasses ${conversionFactor} ${toUnitSymbol}.`
                                : `The ${toUnitName} covers a larger distance. A single ${fromUnitName} is only a fraction, specifically resulting when you divide by ${conversionFactor}.`}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-slate-800 mb-2">Can I do this conversion without a calculator?</h4>
                        <p>
                            Yes, but accuracy may drop. For {fromUnitName} to {toUnitName}, you can heavily round the factor {conversionFactor} to the nearest whole number for rough estimates, however, structural or scientific data absolutely requires our tool above.
                        </p>
                    </div>
                </div>
            </section>
        </article>
    );
}
