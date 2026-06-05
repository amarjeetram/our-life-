"use client";

import Link from "next/link";
import { ArrowRight, HeartPulse } from "lucide-react";

const relatedTools = [
    {
        route: '/calculators/fun/love-percentage-calculator-by-name', 
        title: 'Love Percentage Calculator',
        desc: 'Calculate the love compatibility percentage between two names instantly with our fun matching algorithm.',
    },
    {
        route: '/calculators/fun/flames-calculator', 
        title: 'FLAMES Calculator Online',
        desc: 'Play the classic FLAMES game online. Enter your names and find your destiny!',
    },
    {
        route: '/love-tools/ship-name-generator', 
        title: 'Ship Name Generator',
        desc: 'Combine two names to create a cute, unique ship name for you and your partner or favorite fictional characters.',
    },
];

export default function RelatedFunCalculators({ currentRoute }: { currentRoute?: string }) {
    // Filter out the current route so we don't link to the page we're already on
    const toolsToShow = relatedTools.filter(t => t.route !== currentRoute);

    if (toolsToShow.length === 0) return null;

    return (
        <section className="mt-16 mb-8 pt-10 border-t border-slate-200">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-slate-800">
                    More <span className="text-rose-600">Fun</span> Calculators
                </h2>
                <p className="text-slate-500 mt-2">Check out our other popular entertainment calculators</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
                {toolsToShow.map((tool, index) => (
                    <Link
                        key={index}
                        href={tool.route}
                        className="group flex flex-col justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:border-rose-300 hover:shadow-lg transition-all"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-rose-50 text-rose-600 rounded-lg group-hover:bg-rose-600 group-hover:text-white transition-colors">
                                    <HeartPulse size={20} />
                                </div>
                                <h3 className="font-bold text-slate-800 group-hover:text-rose-700 transition-colors">
                                    {tool.title}
                                </h3>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed pl-[44px]">
                                {tool.desc}
                            </p>
                        </div>
                        
                        <div className="text-rose-600 text-sm font-bold flex items-center justify-end mt-4 gap-1 opacity-80 group-hover:opacity-100">
                            Use Tool <ArrowRight size={14} />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
