import Link from 'next/link';
import { Image, Download, FileText, Smartphone, Shield, Zap, CheckCircle, Scissors, Crop } from 'lucide-react';

export default function ArticlePanCardResize() {
    return (
        <article className="mt-8 space-y-10 text-slate-700 leading-relaxed">

            {/* Intro */}
            <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight">
                    PAN Card Photo & Signature Resizer Online Free – 10KB to 20KB
                </h2>
                <div className="h-1 w-16 bg-indigo-500 rounded-full mb-5"></div>
                <p className="text-base leading-relaxed mb-4">
                    Are you struggling with <strong>pan card photo resize</strong> or finding the right <strong>signature resize</strong> tool? To <strong>resize photo for pan card</strong>, you need an <strong>online free tool</strong> that can precisely target the <strong>10kb–20kb</strong> range required by portals. Whether you are applying for a new PAN card or updating existing details via UTI or NSDL, our <strong>pan card photo resizer online free</strong> is here to help.
                </p>
                <p className="text-base leading-relaxed mb-4">
                    Our specialized <strong>pan card image size converter</strong> handles everything from <strong>uti pan photo resize</strong> to <strong>nsdl pan photo resize</strong>. You can <strong>resize image for pan card upload</strong> instantly, ensuring your <strong>pan card photo size in kb</strong> and <strong>pan card signature size in pixels</strong> are perfectly compliant with the latest government regulations.
                </p>
                <p className="text-base leading-relaxed">
                    In this guide, we dive deep into <strong>how to resize photo for pan card online</strong>, the exact <strong>uti pan photo and signature size</strong> requirements, and how to use our <strong>free pan card photo resizer tool</strong> for a one-click <strong>pan card photo resize online</strong> experience.
                </p>
            </div>

            {/* Section 1: Requirements */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-start gap-2">
                    <span className="text-indigo-500 mt-1"><Zap size={20} /></span>
                    PAN Card Photo Size Requirements (UTI & NSDL)
                </h2>
                <p className="mb-4">
                    Understanding the <strong>pan card upload photo size requirements</strong> is the first step. Different portals like UTIITSL and NSDL (Protean) have slightly different specifications for <strong>resize jpg for pan card</strong>.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div className="bg-indigo-50 rounded-xl p-5 border border-indigo-100">
                        <h3 className="font-bold text-slate-800 mb-2">UTI PAN Photo Size</h3>
                        <ul className="text-sm text-slate-600 space-y-1">
                            <li>• Dimensions: 213 x 213 Pixels</li>
                            <li>• Size range: <Link href="/image-tools/resize-image-to-30kb" className="text-indigo-600 font-semibold underline">Under 30 KB</Link></li>
                            <li>• Format: JPEG</li>
                            <li>• Resolution: 300 DPI</li>
                        </ul>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                        <h3 className="font-bold text-slate-800 mb-2">NSDL PAN Photo Size</h3>
                        <ul className="text-sm text-slate-600 space-y-1">
                            <li>• Dimensions: 3.5 cm x 2.5 cm</li>
                            <li>• Size range: <Link href="/image-tools/resize-image-to-50kb" className="text-indigo-600 font-semibold underline">Under 50 KB</Link></li>
                            <li>• Resolution: 200 DPI</li>
                        </ul>
                    </div>
                </div>
                <p>
                    Using an <strong>online image resizer for government forms</strong> ensures you don't have to worry about complex <strong>dpi and pixel size for pan card photo</strong> calculations. Our tool handles <strong>image compression without losing quality</strong> automatically.
                </p>
            </section>

            {/* Section 2: How to Resize Photo */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-start gap-2">
                    <span className="text-indigo-500 mt-1"><Scissors size={20} /></span>
                    How to Resize Photo for PAN Card Online
                </h2>
                <p className="mb-5">
                    If you're wondering <strong>how to resize photo for pan card online</strong>, the process is now 100% automated with our <strong>pan card photo editor online</strong>. No more manual <strong>crop and resize image online</strong>.
                </p>
                <div className="space-y-4">
                    {[
                        { step: "1", title: "Upload Photo/Signature", desc: "Select your file. Our pan card signature resizer accepts JPG, PNG, and PDF formats." },
                        { step: "2", title: "Select Preset", desc: "Choose 'UTI' or 'NSDL' and the tool will automatically set the correct dimensions and file size targets." },
                        { step: "3", title: "Auto-Resize", desc: "Our engine will resize photo for pan card 3.5x2.5 cm or 213x213 pixels based on your local needs." },
                        { step: "4", title: "Instant Download", desc: "Click download and your pan card photo resize to 10kb–20kb file is ready for upload." },
                    ].map((item) => (
                        <div key={item.step} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
                                {item.step}
                            </div>
                            <div>
                                <p className="font-bold text-slate-800 mb-1">{item.title}</p>
                                <p className="text-sm text-slate-600">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 3: Signature Guidelines */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-start gap-2">
                    <span className="text-indigo-500 mt-1"><FileText size={20} /></span>
                    PAN Card Signature Size Guidelines
                </h2>
                <p className="mb-4">
                    Getting the <strong>pan card signature resize</strong> right is often harder than the photo. The <strong>pan card signature size in pixels</strong> must be wider than it is tall.
                </p>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-4">
                    <p className="font-bold text-slate-800 mb-2">UTI Signature Requirement:</p>
                    <p className="text-sm text-slate-600 mb-3">Dimensions: 1023 x 680 Pixels | Size: Under 60 KB | 600 DPI</p>
                    <p className="font-bold text-slate-800 mb-2">NSDL Signature Requirement:</p>
                    <p className="text-sm text-slate-600">Dimensions: 2 cm x 4.5 cm | Size: Under 50 KB | 200 DPI</p>
                </div>
                <p>
                    Our <strong>instant photo resize for pan card</strong> tool ensures your signature is clearly legible and fits the <strong>pan card signature size</strong> window perfectly. Use our <Link href="/govt-exam-tools/signature-resize" className="text-indigo-600 underline">Signature Resize Tool</Link> for more granular control if needed.
                </p>
            </section>

            {/* Section 4: Best Tool */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
                    Best Free PAN Card Photo Resizer Tool
                </h2>
                <p className="mb-4">
                    Why is SmartToolsWala the preferred <strong>uti pan photo resize tool</strong>? Because we focus on <strong>convert image to exact kb size</strong>.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                        "No registration or software required",
                        "100% Privacy - Client-side processing",
                        "Supports NSDL & UTI Standard Dimensions",
                        "Convert to 10KB, 20KB, 30KB or 50KB instantly",
                        "Works on Mobile (Android/iOS) and Windows",
                        "Optimized for High Quality & Low File Size"
                    ].map((li, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="text-green-500 shrink-0" size={16} /> <span>{li}</span>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Section 5: Step by Step Guide */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
                    Step-by-Step Guide to Resize Image to 10KB–20KB
                </h2>
                <p className="mb-4">
                    To <strong>compress image for pan card form</strong> within the 10KB–20KB range, follow these steps using our <strong>pan card image size converter</strong>:
                </p>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-600">
                    <li>Upload your scanned photo using the upload button.</li>
                    <li>Choose the <strong>Pan Card Photo Resize</strong> mode.</li>
                    <li>Set the <strong>Target Size</strong> to 15 KB (safe middle ground).</li>
                    <li>Wait for the engine to <strong>resize photo for pan card</strong>.</li>
                    <li>Click download to get your <strong>pan card photo resize to 10kb</strong> result.</li>
                </ol>
            </section>

            {/* Section 6: Common Mistakes */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
                    Common Mistakes While Uploading PAN Card Photo
                </h2>
                <p className="mb-4 text-sm">
                    Avoid these issues to prevent application rejection:
                </p>
                <div className="space-y-3">
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                        <p className="font-bold text-red-800 text-sm mb-1">Blurry Dimensions</p>
                        <p className="text-xs text-red-600">Manually stretching images can make them blurry. Use an <strong>online image resizer for government forms</strong> that preserves aspect ratio.</p>
                    </div>
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                        <p className="font-bold text-red-800 text-sm mb-1">Incorrect File Format</p>
                        <p className="text-xs text-red-600">Always <strong>resize jpg for pan card</strong>. Portals often reject PNG or PDF for photo fields.</p>
                    </div>
                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                        <p className="font-bold text-red-800 text-sm mb-1">Wrong DPI Settings</p>
                        <p className="text-xs text-red-600">NSDL requires 200 DPI while UTI requires 300 DPI. Our tool adjusts the <strong>dpi and pixel size for pan card photo</strong> internally.</p>
                    </div>
                </div>
            </section>

            {/* Why Use Online Tool */}
            <section className="bg-indigo-900 text-white rounded-3xl p-8">
                <h2 className="text-2xl font-bold mb-4">Why Use an Online PAN Card Resizer Tool?</h2>
                <p className="text-indigo-100 mb-6">
                    A professional <strong>pan card photo resize online</strong> tool saves you from the technical headache of Photoshop or mobile apps. Whether it is <strong>how to resize photo for pan card online</strong> or getting the exact <strong>pan card signature size</strong>, accuracy is key to getting your PAN card without delay.
                </p>
                <div className="flex flex-wrap gap-4">
                    <Link href="/" className="bg-white text-indigo-900 px-6 py-2 rounded-full font-bold hover:bg-indigo-50 transition-colors">Start Resizing 🚀</Link>
                    <Link href="/mb-to-kb-image-converter" className="border border-indigo-400 text-white px-6 py-2 rounded-full font-bold hover:bg-indigo-800 transition-colors">MB to KB Tool</Link>
                </div>
            </section>

        </article>
    );
}
