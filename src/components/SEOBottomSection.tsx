import React from 'react';
import { HelpCircle, CheckCircle2 } from 'lucide-react';

interface FAQ {
    q: string;
    a: string;
}

interface SEOBottomSectionProps {
    keyword: string;
    faqs: FAQ[];
    children: React.ReactNode;
}

export default function SEOBottomSection({ keyword, faqs, children }: SEOBottomSectionProps) {
    return (
        <div className="space-y-6">
            {/* Article */}
            <div className="card p-6 md:p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                    About <span className="text-blue-600 capitalize">{keyword}</span>
                </h2>
                <div className="prose prose-sm prose-gray max-w-none text-gray-600 leading-relaxed space-y-3 text-[15px]">
                    {children}
                </div>
            </div>

            {/* FAQs */}
            <div className="card p-6 md:p-8">
                <div className="flex items-center gap-2 mb-5">
                    <HelpCircle className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">Frequently Asked Questions</h3>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                            <div className="flex items-start gap-3 mb-2">
                                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                <h4 className="text-sm font-semibold text-gray-800">{faq.q}</h4>
                            </div>
                            <p className="text-sm text-gray-500 pl-7 leading-relaxed">
                                {faq.a}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* SEO Footer Note */}
            <p className="text-xs text-gray-400 text-center pb-4">
                Looking for <strong>{keyword}</strong>? SmartToolsWala offers the best free {keyword} tool online.
            </p>
        </div>
    );
}
