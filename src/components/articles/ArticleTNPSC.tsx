import React from 'react';
import Link from 'next/link';
import { ImagePlus, Settings2, Download } from 'lucide-react';

export default function ArticleTNPSC() {
    return (
        <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
            
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How to Compress TNPSC Photo & Signature</h2>
            <p>
                Preparing your documents for the TNPSC application doesn't have to be complicated. Follow these three simple steps to resize your images perfectly without losing visual clarity:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 not-prose">
                <div className="bg-white border text-center border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center">
                    <div className="bg-indigo-50 text-indigo-600 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                        <ImagePlus size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">1. Upload Image</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">Select your raw photograph or signature scan securely from your device.</p>
                </div>
                <div className="bg-white border text-center border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center relative md:before:content-[''] md:before:absolute md:before:top-1/2 md:before:-left-5 md:before:w-6 md:before:border-t-2 md:before:border-dashed md:before:border-slate-300">
                    <div className="bg-indigo-50 text-indigo-600 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                        <Settings2 size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">2. Process & Compress</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">Choose your target (e.g., 50KB or 20KB). Our engine perfectly formats the dimensions and size.</p>
                </div>
                <div className="bg-white border text-center border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center relative md:before:content-[''] md:before:absolute md:before:top-1/2 md:before:-left-5 md:before:w-6 md:before:border-t-2 md:before:border-dashed md:before:border-slate-300">
                    <div className="bg-emerald-50 text-emerald-600 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                        <Download size={24} />
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">3. Download Fast</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">Save the crisp, correctly sized exact JPG file directly to your device securely.</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">TNPSC Photo & Signature Size Requirements</h2>
            <p>
                Before using the online compressor, you must strictly follow the official guidelines set by the Tamil Nadu Public Service Commission. An incorrect size will result in a failed upload.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6 not-prose">
                <div className="border border-indigo-100 bg-indigo-50/30 rounded-xl p-5">
                    <h3 className="font-bold text-slate-900 text-lg mb-3">📸 Photograph Rules</h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex gap-2"><span>•</span> <span><strong>File Size:</strong> Must be strictly <strong>20–50KB</strong>.</span></li>
                        <li className="flex gap-2"><span>•</span> <span><strong>Dimensions:</strong> Standard passport size (3.5 cm x 4.5 cm).</span></li>
                        <li className="flex gap-2"><span>•</span> <span><strong>Format:</strong> Only JPG or JPEG is accepted.</span></li>
                        <li className="flex gap-2"><span>•</span> <span><strong>Mandatory Extra:</strong> Your name and date of photo must be printed clearly at the bottom margin. (Use our <Link href="/govt-exam-tools/add-name-date" className="text-indigo-600 hover:text-indigo-800 underline font-semibold">free Name & Date stamping tool</Link> if needed).</span></li>
                    </ul>
                </div>
                <div className="border border-indigo-100 bg-indigo-50/30 rounded-xl p-5">
                    <h3 className="font-bold text-slate-900 text-lg mb-3">✍️ Signature Rules</h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex gap-2"><span>•</span> <span><strong>File Size:</strong> Must be strictly <strong>10–20KB</strong>.</span></li>
                        <li className="flex gap-2"><span>•</span> <span><strong>Dimensions:</strong> Approximately 6.0 cm x 2.0 cm.</span></li>
                        <li className="flex gap-2"><span>•</span> <span><strong>Format:</strong> Only JPG or JPEG is accepted.</span></li>
                        <li className="flex gap-2"><span>•</span> <span><strong>Clarity:</strong> Must be signed with blue or black ink on a blank white box without shadows.</span></li>
                    </ul>
                </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Applications Get Rejected & How to Avoid Mistakes</h2>
            <p>
                Thousands of applicants face heartbreak when their <strong>TNPSC exam photo upload</strong> is rejected. Generic image editing apps often slap unwanted watermarks across your face or forcefully reduce the resolution down to the point of being entirely blurred. 
            </p>
            <p>
                By using our specialized compressor designed specifically for the <strong>TNPSC official portal upload</strong>, your document retains extremely high visual clarity. For your signature needs, you can also use our dedicated <Link href="/govt-exam-tools/signature-resize" className="text-indigo-600 hover:text-indigo-800 underline">Signature Resize tool</Link>. If your signature is pixellated, exam center staff may declare it illegible and cancel your hall ticket. Avoid zooming out too much and try to frame the signature boundary cleanly. Never upload random PNGs without guaranteeing they have been correctly verified and shrunk under the <Link href="/compress-image-to-50kb" className="text-indigo-600 hover:text-indigo-800 underline">50KB limit</Link>! We also have a <Link href="/unit-converters/mb-to-kb" className="text-indigo-600 hover:text-indigo-800 underline">MB to KB Converter</Link> if you need general file size reductions.
            </p>

            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6 mt-10">
                <h3 className="text-lg font-bold text-gray-900 mb-4 mt-0">Compatible with all TNPSC Exams</h3>
                <p className="text-sm text-slate-600 mb-5">Our photo and signature compressor is perfectly formatted for official uploads across all major Tamil Nadu state recruitments, including:</p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2 mb-0 list-none pl-0 text-sm font-semibold text-slate-700">
                    <li className="pl-0 flex items-center gap-2"><span className="text-blue-500 font-bold">→</span> TNPSC Group Exams (I, II, III, IV)</li>
                    <li className="pl-0 flex items-center gap-2"><span className="text-blue-500 font-bold">→</span> TNPSC Assistant / Clerk</li>
                    <li className="pl-0 flex items-center gap-2"><span className="text-blue-500 font-bold">→</span> TNPSC VAO / Village Administrative Officer</li>
                    <li className="pl-0 flex items-center gap-2"><span className="text-blue-500 font-bold">→</span> TNPSC Technical & Non-Technical Posts</li>
                </ul>
            </div>
        </div>
    );
}
