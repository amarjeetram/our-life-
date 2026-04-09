import React from "react";
import Link from "next/link";

export default function ArticleCookingConverter({ from, to }: { from: string, to: string }) {
    const fromUpper = from.toUpperCase();
    const toUpper = to.toUpperCase();
    
    return (
        <article className="mt-16 bg-white p-8 md:p-12 rounded-[2rem] border border-slate-200">
            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">
                How to Convert {fromUpper} to {toUpper} Ingredients
            </h2>
            <p className="mb-6 leading-relaxed text-lg text-slate-700">
                Converting <strong>{fromUpper} to {toUpper}</strong> in cooking is completely different than converting standard math metrics. This is because cooking mixes <strong>Volume</strong> (like Cups, Milliliters) with <strong>Weight</strong> (like Grams, Ounces), and that makes <strong>Density</strong> the most important factor in your kitchen.
            </p>
            <p className="mb-8 leading-relaxed text-lg text-slate-700">
                For instance, if a recipe calls for 100 {fromUpper} of water, it might directly equal 100 {toUpper} because water has a 1:1 density ratio. However, 100 {fromUpper} of <em>Flour</em> or <em>Powdered Sugar</em> is much lighter, meaning the numerical value will drop drastically when converting to {toUpper}. Our free online cooking calculator uses pre-set database densities to give you a restaurant-accurate conversion instantly.
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-6">Why Accurate Conversions Matter in Baking</h2>
            <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 mb-8">
                <p className="text-orange-900 font-medium leading-relaxed">
                    Baking is a science. While cooking savory dishes allows for "eyeballing" measurements, a baking recipe can completely fail if your measurements are off by just 10%. Using cups instead of grams is notoriously inaccurate because people "pack" their flour differently. Highly skilled bakers exclusively use grams instead of cups for dry ingredients!
                </p>
            </div>

            <h3 className="text-xl font-bold text-slate-800 mb-4">Common Ingredient Densities</h3>
            <ul className="list-disc pl-6 space-y-2 mb-8 text-slate-600 font-medium">
                <li><strong>Water & Milk:</strong> Very heavy. 1 mL is roughly 1 gram.</li>
                <li><strong>Flour (All-Purpose):</strong> Very light. It is about 0.52 grams per mL (meaning 1 cup is approx 120g).</li>
                <li><strong>Butter:</strong> Dense fat. About 0.95 grams per mL.</li>
                <li><strong>Honey:</strong> Extremely dense. About 1.43 grams per mL.</li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-800 mt-10 mb-6">Explore Other Popular Conversions</h2>
            <div className="flex flex-wrap gap-3">
                <Link href="/unit-converters/cooking/ml-to-grams" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-colors">mL to Grams</Link>
                <Link href="/unit-converters/cooking/cups-to-grams" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-colors">Cups to Grams</Link>
                <Link href="/unit-converters/cooking/tbsp-to-grams" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-colors">Tbsp to Grams</Link>
                <Link href="/unit-converters/cooking/oz-to-grams" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-colors">Oz to Grams</Link>
                <Link href="/unit-converters/cooking/liters-to-grams" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-colors">Liters to Grams</Link>
                <Link href="/unit-converters/cooking/cups-to-ml" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-colors">Cups to mL</Link>
                <Link href="/unit-converters/cooking/tablespoons-to-cups" className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-bold transition-colors">Tbsp to Cups</Link>
            </div>
        </article>
    );
}
