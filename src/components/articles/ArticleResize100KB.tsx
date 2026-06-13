import Link from 'next/link';
import { Image, Download, FileText, Smartphone, Shield, Zap, CheckCircle } from 'lucide-react';

export default function ArticleResize100KB() {
    return (
        <article className="mt-8 space-y-10 text-slate-700 leading-relaxed">

            {/* Intro */}
            <div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight">
                    Resize Image to 100KB – The Complete Free Online Guide
                </h2>
                <div className="h-1 w-16 bg-indigo-500 rounded-full mb-5"></div>
                <p className="text-base leading-relaxed mb-4">
                    Whether you are submitting a government exam form, uploading a passport-size photo for a job application, or attaching a document scan to an online portal, you have almost certainly faced this frustrating problem: your image is too large. The portal says <strong>maximum file size: 100KB</strong>, but your photo is 2MB, 4MB, or even 8MB. This is exactly why millions of people search for ways to <strong>resize image to 100KB</strong> online every single month.
                </p>
                <p className="text-base leading-relaxed mb-4">
                    Our free tool at SmartToolsWala solves this problem in under 3 seconds. You do not need to install any software, create an account, or pay anything. Just upload your photo, set the target size to 100KB, and <strong>resize image to 100KB download</strong> it instantly — with no watermarks and no quality loss visible to the naked eye.
                </p>
                <p className="text-base leading-relaxed">
                    In this comprehensive guide, we will cover everything: how the tool works, which portals require exactly 100KB, how to handle JPG, JPEG, and PDF requirements, and expert tips for getting the best results every time.
                </p>
            </div>

            {/* Why 100KB */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-start gap-2">
                    <span className="text-indigo-500 mt-1"><Zap size={20} /></span>
                    Why Do Portals Demand a 100KB Photo Size?
                </h2>
                <p className="mb-4">
                    The <strong>100KB photo size</strong> limit is not an arbitrary restriction. It is a deliberate technical constraint set by web developers who manage government databases, university admission systems, and corporate HR portals. There are two primary reasons this specific size is chosen:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="bg-indigo-50 dark:bg-indigo-950/20 rounded-xl p-5 border border-indigo-100 dark:border-indigo-900/30">
                        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Database Storage Efficiency</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">When millions of applicants upload photos, each extra megabyte multiplies into terabytes of storage cost. A strict <strong>100 KB photo size</strong> limit keeps the database lean and fast to query.</p>
                    </div>
                    <div className="bg-purple-50 dark:bg-purple-950/20 rounded-xl p-5 border border-purple-100 dark:border-purple-900/30">
                        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-2">Slow Network Compatibility</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Many rural applicants upload on 2G or slow 3G connections. A <strong>100kb photo size</strong> loads and uploads reliably even on the weakest internet signals available in India.</p>
                    </div>
                </div>
                <p className="mt-4">
                    Common portals that enforce this limit include SSC, UPSC, RRB NTPC, railways, state PSC exams, university admissions (DU, JNU, IGNOU), scholarship portals, and corporate job boards like Naukri and LinkedIn for profile photo uploads.
                </p>
            </section>

            {/* How to Resize */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-start gap-2">
                    <span className="text-indigo-500 mt-1"><Image size={20} /></span>
                    How to Resize Image to 100KB Online — Step by Step
                </h2>
                <p className="mb-5">
                    Using our tool to <strong>resize image to 100KB online</strong> is ridiculously simple. Here is the exact process:
                </p>
                <div className="space-y-4">
                    {[
                        { step: "1", title: "Upload Your Photo", desc: "Click the upload zone or drag and drop your image file directly. We accept JPG, JPEG, PNG, WEBP, and HEIC formats up to 20MB in size." },
                        { step: "2", title: "Set Target to 100KB", desc: "The tool automatically detects your target. You can also manually type '100' in the KB field to set the exact compression ceiling." },
                        { step: "3", title: "Preview the Result", desc: "Our smart engine compresses the image in milliseconds. You can preview both the original and compressed versions side by side to inspect quality." },
                        { step: "4", title: "Resize Image to 100KB Download", desc: "Click the Download button to save the optimized file directly to your device. The file will be named with a clear indicator so you do not confuse it with the original." },
                    ].map((item) => (
                        <div key={item.step} className="flex items-start gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-xl">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
                                {item.step}
                            </div>
                            <div>
                                <p className="font-bold text-slate-800 dark:text-slate-200 mb-1">{item.title}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Resize to 100KB Download */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-start gap-2">
                    <span className="text-indigo-500 mt-1"><Download size={20} /></span>
                    Resize Image to 100KB Download — Mobile and Desktop
                </h2>
                <p className="mb-4">
                    One of the biggest advantages of our tool is that it works seamlessly across all devices. Whether you are on a Windows PC, MacBook, Android phone, or iPhone, you can <strong>resize image to 100KB download</strong> your compressed photo without any friction.
                </p>
                <p className="mb-4">
                    On mobile, simply open the tool in Chrome or Safari, tap the upload button (which opens your camera roll or files app directly), and download the result. The compressed file lands in your standard Downloads folder and is immediately ready to attach to any form or email.
                </p>
                <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 flex items-start gap-4">
                    <Smartphone className="text-indigo-500 shrink-0 mt-1" size={24} />
                    <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200 mb-1">Pro Tip for Government Form Uploads</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">After you resize and download the image, always verify the final file size before submitting. On Android, long-press the file &gt; Properties. On iPhone, use the Files app &gt; Get Info. This prevents last-minute rejection errors.</p>
                    </div>
                </div>
            </section>

            {/* Increase image size to 100KB */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
                    How to Increase Image Size to 100KB (If Your Photo is Too Small)
                </h2>
                <p className="mb-4">
                    While most people need to <em>compress</em> their images down to 100KB, some portals reject photos that are <em>under</em> a minimum size. If you need to <strong>increase image size to 100KB</strong>, our tool can help here too.
                </p>
                <p className="mb-4">
                    When you upload a very small file (say, 30KB or 50KB) and set the target to 100KB, our system will losslessly scale the image up while maintaining pixel integrity. This works especially well for signature images or thumbnail submissions where the portal enforces a minimum file size.
                </p>
                <p>
                    Keep in mind that excessive upscaling of a very low-resolution image can introduce blurriness. For best results, start from a high-resolution source and then compress down to 100KB rather than upscaling a low-quality original.
                </p>
            </section>

            {/* 100KB Photo Resizer */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-start gap-2">
                    <span className="text-indigo-500 mt-1"><CheckCircle size={20} /></span>
                    Why Our Photo Resizer 100KB Tool Beats The Competition
                </h2>
                <p className="mb-5">
                    Your search for the best <strong>photo resizer 100KB</strong> online ends here. Here is what makes SmartToolsWala's tool uniquely better:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                        { title: "Exact Targeting", desc: "Unlike tools that only offer percentage-based sliders, we let you type the exact KB value. You get a file that is precisely at or below 100KB every time." },
                        { title: "Zero Watermarks", desc: "Your downloaded photo is completely clean. No logos, no promotional overlays, no hidden text stamps — guaranteed." },
                        { title: "Batch Processing", desc: "Need to compress multiple photos? Upload up to 10 images simultaneously and download all of them in one go. Perfect for applicants submitting group forms." },
                        { title: "Privacy First", desc: "All compression happens inside your browser. Photos are never uploaded to our servers permanently and are wiped from cache immediately after processing." },
                        { title: "Format Flexibility", desc: "Upload PNG, WEBP, or HEIC and download a perfectly compressed JPG or JPEG — whichever the portal requires — automatically." },
                        { title: "Instant Preview", desc: "See quality before you download. Our side-by-side comparison lets you inspect faces, text, and fine details before clicking download." },
                    ].map((item, i) => (
                        <div key={i} className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                            <p className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-1">{item.title}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* JPG / JPEG */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
                    Resize Image to 100KB JPG and JPEG — What's the Difference?
                </h2>
                <p className="mb-4">
                    Many applicants are confused when a portal says "upload a JPEG under 100KB" and they have a JPG file. Here is the simple truth: <strong>JPG and JPEG are exactly the same format</strong>. The name difference is purely historical — early Windows systems limited file extensions to 3 characters, so ".jpeg" became ".jpg". They use identical compression technology.
                </p>
                <p className="mb-4">
                    So whether you need to <strong>resize image to 100KB jpg</strong> or <strong>resize image to 100KB jpeg</strong>, our tool handles both cases with one click. Upload your file in any format and download a clean JPEG/JPG ready for portal submission.
                </p>
                <div className="bg-amber-50 dark:bg-amber-950/20 rounded-xl p-5 border border-amber-100 dark:border-amber-900/30">
                    <p className="font-bold text-slate-800 dark:text-slate-200 mb-2">⚡ Quick Tip on JPEG Quality</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        For human portrait photos (passport, ID), our engine prioritizes face sharpness even at high compression ratios. For document scans, it prioritizes text legibility. This intelligent profile-switching is what keeps your compressed image looking professional.
                    </p>
                </div>
            </section>

            {/* PDF Section */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 flex items-start gap-2">
                    <span className="text-indigo-500 mt-1"><FileText size={20} /></span>
                    Resize Image to 100KB PDF — Handling Document Portals
                </h2>
                <p className="mb-4">
                    Some portals require a combined PDF document where your photo must occupy a specific page and the entire PDF must stay under a certain size. To handle <strong>resize image to 100KB PDF</strong> scenarios effectively, follow this workflow:
                </p>
                <ol className="space-y-3 mb-4">
                    <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</span>
                        <p className="text-sm"><strong>First, resize your image to 100KB here.</strong> Download the compressed JPG from our tool.</p>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</span>
                        <p className="text-sm"><strong>Insert the compressed image into Microsoft Word or Google Docs.</strong> Set the image dimensions to match portal specifications (often 3.5cm × 4.5cm for passport photos).</p>
                    </li>
                    <li className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</span>
                        <p className="text-sm"><strong>Export/Print to PDF.</strong> Since your image is already at 100KB, the resulting PDF will be lightweight and well within most portal limits.</p>
                    </li>
                </ol>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    Alternatively, if you have an oversized MB-sized image file, you can first run it through our <Link href="/mb-to-kb-image-converter" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">MB to KB Image Converter</Link> to reduce it drastically before the final precision resize here.
                </p>
            </section>

            {/* Resize 100KB to 200KB */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
                    Resize Image to 100KB to 200KB — Flexible Size Range
                </h2>
                <p className="mb-4">
                    Not every portal has the same limit. Some require photos between <strong>100KB to 200KB</strong>, which means the image must be large enough (at least 100KB) but under 200KB. Our tool supports this entire range. Simply type your desired KB value anywhere from 15KB up to 1000KB and the compressor will target that exact boundary.
                </p>
                <p>
                    For portals in the 100KB to 200KB range — common in state government applications and certain bank PO exams — set the slider to your specific target and the tool handles the rest automatically.
                </p>
            </section>

            {/* Privacy */}
            <section className="bg-green-50 dark:bg-green-950/20 rounded-2xl p-6 border border-green-100 dark:border-green-900/30">
                <div className="flex items-center gap-3 mb-4">
                    <Shield className="text-green-600 dark:text-green-400" size={24} />
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Your Privacy is Completely Protected</h2>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                    Government ID photos, passport photos, and signature images are highly sensitive. Our tool is built with privacy as the top priority:
                </p>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li className="flex items-center gap-2"><CheckCircle className="text-green-500 shrink-0" size={16} /> All compression runs client-side inside your browser</li>
                    <li className="flex items-center gap-2"><CheckCircle className="text-green-500 shrink-0" size={16} /> No images are stored on our servers permanently</li>
                    <li className="flex items-center gap-2"><CheckCircle className="text-green-500 shrink-0" size={16} /> Files are wiped from memory immediately after download</li>
                    <li className="flex items-center gap-2"><CheckCircle className="text-green-500 shrink-0" size={16} /> No account creation or login required — ever</li>
                    <li className="flex items-center gap-2"><CheckCircle className="text-green-500 shrink-0" size={16} /> Zero tracking of uploaded file names or content</li>
                </ul>
            </section>

            {/* LSI / Related Tools */}
            <section>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">
                    Related Image Compression Tools You Might Need
                </h2>
                <p className="mb-5">
                    Depending on your specific portal requirements, you might also need other precision compression tools:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {[
                        { href: "/image-tools/resize-image-to-20kb", label: "Resize Image to 20KB", desc: "Passport-size and visa photo portal uploads." },
                        { href: "/image-tools/resize-image-to-30kb", label: "Resize Image to 30KB", desc: "SSC and RRB signature uploads." },
                        { href: "/image-tools/resize-image-to-50kb", label: "Resize Image to 50KB", desc: "Bank PO and state PSC form uploads." },
                        { href: "/image-tools/resize-image-to-200kb", label: "Resize Image to 200KB", desc: "Document scans and higher-quality portals." },
                        { href: "/mb-to-kb-image-converter", label: "MB to KB Image Converter", desc: "For very large 2MB–10MB source photos." },
                        { href: "/govt-exam-tools/ssc-signature-resize", label: "SSC Signature Resize Tool", desc: "Officially calibrated for SSC CGL, CHSL portals." },
                    ].map((tool, i) => (
                        <Link key={i} href={tool.href} className="flex flex-col p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all group shadow-sm">
                            <span className="font-bold text-indigo-700 dark:text-indigo-400 group-hover:underline mb-1">{tool.label} →</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{tool.desc}</span>
                        </Link>
                    ))}
                </div>
            </section>

        </article>
    );
}
