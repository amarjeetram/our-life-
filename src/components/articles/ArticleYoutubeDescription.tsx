import React from 'react';
import { HelpCircle, Shield, Zap, Search, Eye } from 'lucide-react';

export default function ArticleYoutubeDescription() {
    return (
        <article className="mt-16 bg-white rounded-3xl p-8 sm:p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-slate-100">
            {/* Header Section */}
            <header className="mb-12 text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm mb-6">
                    <Search className="w-4 h-4" />
                    About This Tool
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                    YouTube Description & Title Extractor
                </h2>
                <p className="text-lg text-slate-600 leading-relaxed">
                    This free YouTube description, title and metadata extractor tool helps you extract YouTube video title, description, and other valuable data. You can also see the number of views, likes, and comments on a YouTube video. It uses YouTube Data to fetch and present these data.
                </p>
                <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm text-slate-500 text-left">
                    <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                        <p>
                            This tool retrieves information from YouTube. Your use of this tool is subject to YouTube&apos;s terms of service and privacy policy. Please review YouTube&apos;s terms of service and privacy policy to understand how your data is handled when using this tool. We do not store any YouTube data or personally identifiable information from your use of this tool.
                        </p>
                    </div>
                </div>
            </header>

            <hr className="border-slate-100 my-12" />

            {/* How to use */}
            <section className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <HelpCircle className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">How to use?</h3>
                </div>

                <p className="text-slate-600 mb-6 text-lg">
                    You can extract the title and meta data of any YouTube video by following these three easy steps:
                </p>

                <div className="grid sm:grid-cols-3 gap-6">
                    {[
                        { step: "1", title: "Copy Link", desc: "Copy the link of the YouTube video you want to analyze." },
                        { step: "2", title: "Paste URL", desc: "Paste the link in the input box at the top of this page." },
                        { step: "3", title: "Extract", desc: "And done. This tool will securely output the title, description, views and other metadata." }
                    ].map((item, i) => (
                        <div key={i} className="relative p-6 rounded-2xl bg-slate-50 border border-slate-100/50 hover:shadow-md transition-shadow">
                            <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-700 mb-4">
                                {item.step}
                            </div>
                            <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                            <p className="text-sm text-slate-600 leading-relaxed bg-transparent p-0 border-0">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Use Section */}
            <section className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                        <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Why extract YouTube descriptions?</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl border border-slate-100">
                        <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <Eye className="w-4 h-4 text-emerald-500" /> Competitor Analysis
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Analyze how successful channels format their descriptions, what keywords they use, and which affiliate links or time stamps drive engagement.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl border border-slate-100">
                        <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                            <Search className="w-4 h-4 text-blue-500" /> Improve Your SEO
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            A well-crafted YouTube description helps the algorithm understand your video setup, increasing chances of appearing in suggested videos and search results.
                        </p>
                    </div>
                </div>
            </section>

            <div className="mt-12 text-center">
                <p className="text-sm font-medium text-slate-400">Last updated: Just now</p>
            </div>
        </article>
    );
}
