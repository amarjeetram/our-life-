"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";

const relatedTools = [
    {
        route: '/govt-exam-tools/rrb-signature-resizer', title: 'RRB Signature Resizer',
        desc: 'Resize signature exactly to 140x60 pixels for RRB/IBPS exams.',
    },
    {
        route: '/govt-exam-tools/neet-photo-resizer', title: 'NEET Photo Resizer',
        desc: 'Resize passport & postcard size photos for NEET 2026.',
    },
    {
        route: '/govt-exam-tools/uti-photo-resize', title: 'UTI Photo Resize',
        desc: 'Crop and resize photo for UTI PAN applications (213x213px).',
    },
    {
        route: '/govt-exam-tools/pan-card-photo-resize', title: 'PAN Card Photo Resize',
        desc: 'Resize photo and signature for PAN card (10-20KB).',
    },
    {
        route: '/govt-exam-tools/signature-resize', title: 'Signature Resize & Compress',
        desc: 'Resize your written signature to exact pixels or cm (SSC/Banks).',
    },
];

export default function RelatedGovtTools({ currentRoute }: { currentRoute?: string }) {
    // Filter out the current route so we don't link to the page we're already on
    const toolsToShow = relatedTools.filter(t => t.route !== currentRoute).slice(0, 4);

    return (
        <section className="mt-16 mb-8 pt-10 border-t border-slate-200">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-slate-800">
                    Related <span className="text-emerald-600">Govt Exam</span> Tools
                </h2>
                <p className="text-slate-500 mt-2">Our other free tools for government portal uploads</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {toolsToShow.map((tool, index) => (
                    <Link
                        key={index}
                        href={tool.route}
                        className="group flex flex-col justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:border-emerald-300 hover:shadow-lg transition-all"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                    <BadgeCheck size={20} />
                                </div>
                                <h3 className="font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                                    {tool.title}
                                </h3>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed pl-[44px]">
                                {tool.desc}
                            </p>
                        </div>
                        
                        <div className="text-emerald-600 text-sm font-bold flex items-center justify-end mt-4 gap-1 opacity-80 group-hover:opacity-100">
                            Use Tool <ArrowRight size={14} />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
