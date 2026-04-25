import Link from 'next/link';
import { Image, Download, FileText, Smartphone, Shield, Zap, CheckCircle, Scissors, Crop, Scaling } from 'lucide-react';

export default function ArticleUtiPhotoResize() {
    return (
        <article className="mt-8 space-y-10 text-slate-700 leading-relaxed">

            {/* Intro */}
            <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight">
                    UTI PAN Photo Resizer Online Free – Crop, Resize & Compress Image to Exact Size
                </h2>
                <div className="h-1 w-16 bg-orange-500 rounded-full mb-5"></div>
                <p className="text-base leading-relaxed mb-4">
                    UTI PAN application ke liye photo resize karna zaroori hota hai jisme <strong>exact KB</strong> aur dimensions follow karne padte hain. If you are applying for a new PAN card through UTIITSL, you must use a dedicated <strong>uti photo resize</strong> tool to meet the strict <strong>213x213 pixels</strong> requirement. Our <strong>online free</strong> tool helps you <strong>crop, resize & compress image to exact size</strong> instantly.
                </p>
                <p className="text-base leading-relaxed mb-4">
                    Using our <strong>uti photo resize tool</strong>, you don't need to manually calculate the <strong>uti photo size in kb and pixels</strong>. This <strong>uti crop tool</strong> handles everything from <strong>uti pan photo resize</strong> to adjusting <strong>uti photo resize width height</strong> as per latest portal specifications. It is a 100% free solution for <strong>uti photo resize online</strong> without any signup required.
                </p>
                <p className="text-base leading-relaxed">
                    In this guide, we dive deep into <strong>how to resize photo for uti pan</strong>, the exact <strong>uti photo resize online process</strong>, and how to use our <strong>image resizer</strong> for a successful PAN upload.
                </p>
            </div>

            {/* Section 1: UTI Requirements */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-start gap-2">
                    <span className="text-orange-500 mt-1"><Scaling size={20} /></span>
                    UTI PAN Photo Size Requirements (Photo & Signature Guidelines)
                </h2>
                <p className="mb-4">
                    The UTIITSL portal has very specific <strong>photo resize width height</strong> settings. If you miss these, the portal will show a "Size Mismatch" error.
                </p>
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 mb-6">
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2 font-bold text-orange-900"><CheckCircle className="text-orange-600" size={16} /> Dimensions: 213 x 213 Pixels</li>
                        <li className="flex items-center gap-2 font-bold text-orange-900"><CheckCircle className="text-orange-600" size={16} /> File Size: Less than 30 KB</li>
                        <li className="flex items-center gap-2 font-bold text-orange-900"><CheckCircle className="text-orange-600" size={16} /> Format: JPEG / JPG</li>
                        <li className="flex items-center gap-2 font-bold text-orange-900"><CheckCircle className="text-orange-600" size={16} /> Resolution: 300 DPI (Standard)</li>
                        <li className="flex items-center gap-2 font-bold text-orange-900"><CheckCircle className="text-orange-600" size={16} /> Color: Color Photograph (Recent)</li>
                    </ul>
                </div>
                <p className="text-sm">
                    <strong>Note:</strong> While this page is for UTI Photo, if you need <strong>pan uti photo resize</strong> for NSDL or general use, you can also use our <Link href="/image-tools/pan-card-photo-resize" className="text-orange-600 font-black underline">Main PAN Card Photo Resizer</Link>.
                </p>
            </section>

            {/* Section 2: UTI Photo Resize Tool */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-start gap-2">
                    <span className="text-orange-500 mt-1"><Crop size={20} /></span>
                    UTI Photo Resize Tool – Crop, Compress & Convert Image Online
                </h2>
                <p className="mb-4">
                    Our <strong>uti crop tool</strong> is built to handle the unique square ratio of 213x213. When you upload your photo, the <strong>uti photo resize tool</strong> automatically centers the crop to ensure your face is clearly visible. This saves you from the technical headache of manually setting <strong>uti photo resize width height</strong> in Photoshop.
                </p>
                <p>
                    The <strong>uti photo resize online free</strong> version also includes an intelligent <strong>compress image to exact kb</strong> engine that ensures the file stays safely under 30KB while maintaining high sharpness.
                </p>
            </section>

            {/* Section 3: How to Resize */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-start gap-2">
                    <span className="text-orange-500 mt-1"><Scissors size={20} /></span>
                    How to Resize Photo for UTI PAN Online (Step-by-Step Guide)
                </h2>
                <p className="mb-5 font-bold">
                    Upload your photo and instantly resize it for UTI PAN – exact size, KB & format ready in seconds.
                </p>
                <div className="space-y-4">
                    {[
                        { step: "1", title: "Select Photograph", desc: "Choose your recent color photo from your gallery or desktop." },
                        { step: "2", title: "Auto-Resize Trigger", desc: "Our engine detects it's for UTI and sets the frame to 213x213 pixels automatically." },
                        { step: "3", title: "Compress to KB", desc: "The tool will scale the quality to keep the file size between 10KB to 28KB." },
                        { step: "4", title: "Instant Download", desc: "Click download to get your UTI-ready JPEG file. No watermark, no signup." },
                    ].map((item) => (
                        <div key={item.step} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
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

            {/* Section 4: Photo Size in KB/Pixels */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
                    UTI PAN Photo Size in KB, Pixels & Dimensions Explained
                </h2>
                <p className="mb-4">
                    To <strong>resize photo for uti pan</strong> correctly, you need to understand the relationship between pixels and KB. While 213x213 is a small resolution, high quality can still bloat the file size above 30KB. Our <strong>uti photo resize online process</strong> balances these two variables automatically.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 border rounded-xl text-center">
                        <p className="text-xs font-black text-slate-500 uppercase">Width</p>
                        <p className="text-lg font-black text-slate-800">213 PX</p>
                    </div>
                    <div className="p-4 bg-slate-50 border rounded-xl text-center">
                        <p className="text-xs font-black text-slate-500 uppercase">Height</p>
                        <p className="text-lg font-black text-slate-800">213 PX</p>
                    </div>
                    <div className="p-4 bg-slate-50 border rounded-xl text-center">
                        <p className="text-xs font-black text-slate-500 uppercase">Target Size</p>
                        <p className="text-lg font-black text-slate-800">&lt; 30 KB</p>
                    </div>
                </div>
            </section>

            {/* Section 5: Free UTI Resizer */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
                    Free UTI Photo Resizer Tool – Resize Image to Exact KB
                </h2>
                <p className="mb-4">
                    Your search for the best <strong>uti pan photo resize</strong> tool ends here. We offer:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="text-orange-500" size={16} /> 100% Free & Unlimited</li>
                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="text-orange-500" size={16} /> Precise 213x213 Calibration</li>
                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="text-orange-500" size={16} /> <strong>resize jpg without losing quality</strong></li>
                    <li className="flex items-center gap-2 text-sm"><CheckCircle className="text-orange-500" size={16} /> Secure Client-Side Processing</li>
                </ul>
            </section>

            {/* Section 6: Common Errors */}
            <section className="bg-red-50 rounded-2xl p-6 border border-red-100">
                <h2 className="text-xl font-bold text-red-900 mb-4">Common Errors While Uploading UTI PAN Photo</h2>
                <ul className="space-y-2 text-sm text-red-800 list-disc pl-5">
                    <li>"Image Size Error": File is over 30KB. Use our compressor.</li>
                    <li>"Dimension Mismatch": Width or height is not 213px.</li>
                    <li>Blurred Face: Image was stretched too much.</li>
                    <li>Incompatible Format: Uploading PNG or PDF. Always use <strong>convert image for pan upload</strong> to JPEG.</li>
                </ul>
            </section>

            {/* Section 7: Format */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-start gap-2">
                    <span className="text-orange-500 mt-1"><Scaling size={20} /></span>
                    Best Format for UTI PAN Photo (JPG, DPI & Background Color)
                </h2>
                <p className="mb-4 text-sm text-slate-600">
                    For a smooth <strong>uti photo resize online</strong> experience, always use a **white or light colored background**. While the portal doesn't always mandate a white background like passports, it ensures better facial recognition and faster processing.
                </p>
            </section>

            <div className="bg-orange-600 text-white rounded-[40px] p-8 md:p-14 mt-12 shadow-2xl shadow-orange-100 flex flex-col items-center text-center">
                <Zap size={48} className="mb-6" fill="white" />
                <h2 className="text-3xl md:text-4xl font-black mb-4">UTI Photo Resize Done Instantly!</h2>
                <p className="text-orange-100 mb-10 max-w-2xl text-lg">
                    Stop struggling with random online apps. Use the dedicated <strong>uti photo resize tool</strong> that gets it right every single time. 
                </p>
                <Link href="/" className="bg-white text-orange-600 px-12 py-5 rounded-[24px] font-black hover:scale-105 transition-transform text-xl shadow-xl shadow-orange-900/20">
                    Start Resizing Now 🚀
                </Link>
            </div>

        </article>
    );
}
