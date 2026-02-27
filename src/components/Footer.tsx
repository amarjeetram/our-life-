import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Github } from 'lucide-react';

const Footer = () => (
    <footer className="bg-white border-t border-gray-100 mt-20 relative overflow-hidden">
        <div className="absolute inset-0 max-h-full pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(at 100% 0%, rgb(79, 70, 229) 0px, transparent 50%), radial-gradient(at 0% 100%, rgb(6, 182, 212) 0px, transparent 50%)' }}></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

                {/* Brand */}
                <div className="lg:col-span-4">
                    <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
                        <Image src="/logo.svg" alt="SmartToolsWala Logo" width={36} height={36} className="rounded-xl" />
                        <span className="text-xl font-extrabold text-gray-900 tracking-tight">
                            SmartTools<span className="text-gradient">Wala</span>
                        </span>
                    </Link>
                    <p className="text-base text-gray-500 leading-relaxed mb-6 max-w-sm">
                        India&apos;s #1 free image compression tool. Perfect for UPSC, SSC, banking forms, and web optimization. No signup. Always free.
                    </p>
                    <div className="flex items-center gap-4 text-gray-400 mb-6">
                        <a href="#" className="hover:text-indigo-600 transition-colors bg-gray-50 p-2 rounded-lg hover:bg-indigo-50"><Twitter className="w-5 h-5" /></a>
                        <a href="#" className="hover:text-indigo-600 transition-colors bg-gray-50 p-2 rounded-lg hover:bg-indigo-50"><Github className="w-5 h-5" /></a>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 max-w-sm">
                        <p className="text-[12px] text-amber-800 leading-snug">
                            <strong>Disclaimer:</strong> SmartToolsWala is an independent tool and is <strong>not affiliated with any government entity</strong>. We provide free image optimization to help applicants meet form requirements.
                        </p>
                    </div>
                </div>

                {/* Tools */}
                <div className="lg:col-span-2">
                    <h4 className="text-sm font-bold text-gray-900 mb-5 uppercase tracking-wider">Tools</h4>
                    <ul className="space-y-3">
                        {[
                            { name: 'Compress to 20KB', href: '/compress-image-to-20kb' },
                            { name: 'Compress to 30KB', href: '/compress-image-to-30kb' },
                            { name: 'Compress to 50KB', href: '/compress-image-to-50kb' },
                            { name: 'Compress to 100KB', href: '/compress-image-to-100kb' },
                            { name: 'Compress to 200KB', href: '/compress-image-to-200kb' },
                            { name: 'MB to KB Converter', href: '/mb-to-kb-image-converter' },
                            { name: 'All Tools', href: '/#tools' },
                            { name: 'Blog', href: '/blog' },
                        ].map(link => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-[15px] text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-indigo-500 transition-colors"></span>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Company */}
                <div className="lg:col-span-2">
                    <h4 className="text-sm font-bold text-gray-900 mb-5 uppercase tracking-wider">Company</h4>
                    <ul className="space-y-3">
                        {[
                            { name: 'About Us', href: '/about-us' },
                            { name: 'Contact Us', href: '/contact-us' },
                            { name: 'Disclaimer', href: '/disclaimer' },
                        ].map(link => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-[15px] text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-indigo-500 transition-colors"></span>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Legal */}
                <div className="lg:col-span-2">
                    <h4 className="text-sm font-bold text-gray-900 mb-5 uppercase tracking-wider">Legal</h4>
                    <ul className="space-y-3">
                        {[
                            { name: 'Privacy Policy', href: '/privacy-policy' },
                            { name: 'Terms', href: '/terms-and-conditions' },
                            { name: 'Refunds', href: '/cancellation-and-refund' },
                            { name: 'Shipping', href: '/shipping-policy' },
                        ].map(link => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-[15px] text-gray-500 hover:text-indigo-600 transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-indigo-500 transition-colors"></span>
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>


            </div>

            {/* Bottom bar */}
            <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-500 font-medium text-center sm:text-left">
                    © {new Date().getFullYear()} SmartTools<span className="text-indigo-600">Wala</span>. All rights reserved.
                </p>

            </div>
        </div>
    </footer>
);

export default Footer;
