"use client";

import Link from "next/link";
import { ArrowRight, Youtube } from "lucide-react";

const relatedTools = [
    {
        route: '/youtube-tag-extractor', title: 'YouTube Tag Extractor',
        desc: 'Extract high-performing tags from any YouTube video.',
    },
    {
        route: '/youtube-description-extractor', title: 'YouTube Description Extractor',
        desc: 'Extract and copy descriptions from YouTube videos easily.',
    },
    {
        route: '/youtube-title-extractor', title: 'YouTube Title Extractor',
        desc: 'Extract titles from YouTube videos for research and inspiration.',
    },
    {
        route: '/youtube-tools/1024x576-youtube-banner-maker', title: '1024x576 YouTube Banner Maker',
        desc: 'Create perfect 1024x576 YouTube banners without crop issues.',
    },
];

export default function RelatedYoutubeTools({ currentRoute }: { currentRoute?: string }) {
    // Filter out the current route so we don't link to the page we're already on
    const toolsToShow = relatedTools.filter(t => t.route !== currentRoute).slice(0, 4);

    return (
        <section className="mt-16 mb-8 pt-10 border-t border-slate-200">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-slate-800">
                    More <span className="text-red-600">YouTube</span> Tools
                </h2>
                <p className="text-slate-500 mt-2">Free tools to optimize and grow your YouTube channel</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                {toolsToShow.map((tool, index) => (
                    <Link
                        key={index}
                        href={tool.route}
                        className="group flex flex-col justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:border-red-300 hover:shadow-lg transition-all"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-red-50 text-red-600 rounded-lg group-hover:bg-red-600 group-hover:text-white transition-colors">
                                    <Youtube size={20} />
                                </div>
                                <h3 className="font-bold text-slate-800 group-hover:text-red-700 transition-colors">
                                    {tool.title}
                                </h3>
                            </div>
                            <p className="text-sm text-slate-500 leading-relaxed pl-[44px]">
                                {tool.desc}
                            </p>
                        </div>
                        
                        <div className="text-red-600 text-sm font-bold flex items-center justify-end mt-4 gap-1 opacity-80 group-hover:opacity-100">
                            Use Tool <ArrowRight size={14} />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
