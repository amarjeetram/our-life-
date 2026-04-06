import React from 'react';
import Link from 'next/link';
import { Type, HandMetal, Crop } from 'lucide-react';

export default function ArticleAddNameDate() {
    return (
        <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Do You Need to Add Name and Date on Passport Photos?</h2>
            <p>
                When applying for various competitive exams and government posts like <strong>TNPSC, SSC (Staff Selection Commission), UPPSC, Railway Recruitment Board (RRB)</strong>, or Police Constabulary, the official notification clearly mandates that the candidate's recent passport-size photograph must prominently display their Name and the Date the photo was taken at the bottom.
            </p>
            <p>
                Failing to adhere to this strict formatting rule is one of the leading causes for application rejection. Instead of paying extra at a cyber cafe or battling complex editing software, our <strong>Add Name & Date to Photo Formatter</strong> gives you perfectly positioned text on a white strip, exactly as required by recruitment boards.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 not-prose">
                <div className="bg-white border text-center border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center">
                    <div className="bg-indigo-50 text-indigo-600 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                        <Type size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">Clean Typography</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">Text is rendered in bold, block letters on a crisp white background strip ensuring readability.</p>
                </div>
                <div className="bg-white border text-center border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center relative md:before:content-[''] md:before:absolute md:before:top-1/2 md:before:-left-5 md:before:w-6 md:before:border-t-2 md:before:border-dashed md:before:border-slate-300">
                    <div className="bg-indigo-50 text-indigo-600 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                        <HandMetal size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">Automated Framing</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">It perfectly scales the name/date strip proportionally without overlapping your face.</p>
                </div>
                <div className="bg-white border text-center border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center relative md:before:content-[''] md:before:absolute md:before:top-1/2 md:before:-left-5 md:before:w-6 md:before:border-t-2 md:before:border-dashed md:before:border-slate-300">
                    <div className="bg-emerald-50 text-emerald-600 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                        <Crop size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">Exact Size Resizing</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">Built-in options allow you to instantly compress down to 50KB or 20KB for seamless portal uploads.</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Step-by-Step Instructions</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
                <div className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-600 text-white font-bold rounded-full text-sm">1</span>
                    <p className="mt-1"><strong>Upload your base photo:</strong> Choose a clean passport photo. Try to pick a photo with a light background as standard exams prefer white or grey backgrounds.</p>
                </div>
                <div className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-600 text-white font-bold rounded-full text-sm">2</span>
                    <p className="mt-1"><strong>Enter Information:</strong> Type your full name (usually block letters are best) and the Date on which the photo was captured. SSC explicitly mentions the date should not be older than 3 months.</p>
                </div>
                <div className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-600 text-white font-bold rounded-full text-sm">3</span>
                    <p className="mt-1"><strong>Optional Settings:</strong> If the portal requires the photo under a limit (e.g., 50KB), toggle the <em>Compression Settings</em> checkbox and enter "50" under Target Size.</p>
                </div>
                <div className="flex gap-4 items-start">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-600 text-white font-bold rounded-full text-sm">4</span>
                    <p className="mt-1"><strong>Processing:</strong> Click the "Apply Name & Date" button. Within 1-2 seconds, your final perfectly stamped image will be ready for secure download!</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Explore More Exam Utilities</h2>
            <p>
                We have built specialized free web applications to cover all your documentation requirements seamlessly:
            </p>
            <ul>
                <li><strong><Link href="/govt-exam-tools/tnpsc-photo-compressor" className="text-indigo-600 hover:text-indigo-800 underline font-semibold">TNPSC Photo Compressor</Link>:</strong> A dedicated tool to hit exact KB marks for the Tamil Nadu portal.</li>
                <li><strong><Link href="/govt-exam-tools/signature-resize" className="text-indigo-600 hover:text-indigo-800 underline font-semibold">Signature Resize to 10-20KB</Link>:</strong> Never get a stretched signature rejection again.</li>
                <li><strong><Link href="/compress-image-to-100kb" className="text-indigo-600 hover:text-indigo-800 underline font-semibold">Compress Photo to 100KB</Link>:</strong> Ideal for central exams like Railway Registration.</li>
            </ul>
        </div>
    );
}
