import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Instagram, Youtube, Mail, ChevronRight, ShieldCheck, Zap } from 'lucide-react';

const Footer = () => (
    <footer className="bg-slate-900 border-t border-slate-800 mt-20 relative overflow-hidden text-slate-300 font-sans">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-8">

                {/* Brand & Mission */}
                <div className="lg:col-span-4 xl:col-span-4 flex flex-col items-start pr-4">
                    <Link href="/" className="flex items-center gap-3 mb-6 group w-fit transition-transform hover:scale-105 duration-300">
                        <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-indigo-500/20 ring-1 ring-white/10">
                            <Image src="/logo.svg" alt="SmartToolsWala Logo" fill sizes="40px" className="object-cover" />
                        </div>
                        <span className="text-2xl font-extrabold text-white tracking-tight">
                            SmartTools<span className="text-indigo-400">Wala</span>
                        </span>
                    </Link>
                    <p className="text-base text-slate-400 leading-relaxed mb-8 max-w-sm">
                        Empowering users with blazingly fast, free, and secure online tools. Precision optimization powered by industry-grade technology.
                    </p>

                    <div className="flex gap-4 mb-8">
                        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-full border border-emerald-400/20">
                            <Zap className="w-3.5 h-3.5" /> Fast & Free
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-full border border-blue-400/20">
                            <ShieldCheck className="w-3.5 h-3.5" /> 100% Secure
                        </div>
                    </div>

                    {/* Socials Redesigned */}
                    <div className="flex items-center gap-3 mt-auto">
                        <a href="https://www.instagram.com/_smarttoolswala_" target="_blank" rel="noopener noreferrer" aria-label="SmartToolsWala Instagram"
                            className="group flex justify-center items-center w-11 h-11 rounded-full bg-slate-800 border border-slate-700 hover:border-pink-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:-translate-y-1">
                            <Instagram className="w-5 h-5 text-slate-400 group-hover:text-pink-500 transition-colors" />
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" aria-label="SmartToolsWala YouTube"
                            className="group flex justify-center items-center w-11 h-11 rounded-full bg-slate-800 border border-slate-700 hover:border-red-500/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:-translate-y-1">
                            <Youtube className="w-5 h-5 text-slate-400 group-hover:text-red-500 transition-colors" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="SmartToolsWala Twitter"
                            className="group flex justify-center items-center w-11 h-11 rounded-full bg-slate-800 border border-slate-700 hover:border-blue-400/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(96,165,250,0.3)] hover:-translate-y-1">
                            <Twitter className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                        </a>
                        <a href="mailto:support@smarttoolswala.com" aria-label="Email Support"
                            className="group flex justify-center items-center w-11 h-11 rounded-full bg-slate-800 border border-slate-700 hover:border-indigo-400/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(129,140,248,0.3)] hover:-translate-y-1">
                            <Mail className="w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                        </a>
                    </div>
                </div>

                {/* Quick Links / Categories */}
                <div className="lg:col-span-3 xl:col-span-2">
                    <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider relative inline-block">
                        Categories
                        <div className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-indigo-500 rounded-full"></div>
                    </h4>
                    <ul className="space-y-3.5 mb-8">
                        {[
                            { name: 'Photo & Image Tools', href: '/photo-and-image-compression-tools' },
                            { name: 'YouTube Tools', href: '/youtube-tools' },
                            { name: 'Other Tools', href: '/other-tools' },
                        ].map(link => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors flex items-center group">
                                    <ChevronRight className="w-4 h-4 mr-2 text-indigo-500/0 group-hover:text-indigo-400 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                    <span className="transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300">{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider relative inline-block">
                        Popular Tools
                        <div className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-indigo-500 rounded-full"></div>
                    </h4>
                    <ul className="space-y-3.5">
                        {[
                            { name: 'Compress to 20KB', href: '/compress-image-to-20kb' },
                            { name: 'Compress to 50KB', href: '/compress-image-to-50kb' },
                            { name: 'Compress to 100KB', href: '/compress-image-to-100kb' },
                            { name: 'MB to KB Converter', href: '/mb-to-kb-converter' },
                            { name: 'YouTube Tags', href: '/youtube-tag-extractor' },
                            { name: 'Couple Names', href: '/stylish-couple-name-maker' },
                        ].map(link => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors flex items-center group">
                                    <ChevronRight className="w-4 h-4 mr-2 text-indigo-500/0 group-hover:text-indigo-400 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                    <span className="transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300">{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Company & Support */}
                <div className="lg:col-span-3 xl:col-span-2">
                    <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider relative inline-block">
                        Company
                        <div className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-indigo-500 rounded-full"></div>
                    </h4>
                    <ul className="space-y-3.5">
                        {[
                            { name: 'About Us', href: '/about-us' },
                            { name: 'Contact Us', href: '/contact-us' },
                            { name: 'Disclaimer', href: '/disclaimer' },
                            { name: 'Privacy Policy', href: '/privacy-policy' },
                            { name: 'Terms & Conditions', href: '/terms-and-conditions' },
                            { name: 'Our Blog', href: '/blog' },
                        ].map(link => (
                            <li key={link.name}>
                                <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors flex items-center group">
                                    <ChevronRight className="w-4 h-4 mr-2 text-indigo-500/0 group-hover:text-indigo-400 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                                    <span className="transform -translate-x-2 group-hover:translate-x-0 transition-transform duration-300">{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Newsletter / CTA */}
                <div className="lg:col-span-2 xl:col-span-3">
                    <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider relative inline-block">
                        Stay Updated
                        <div className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-indigo-500 rounded-full"></div>
                    </h4>
                    <p className="text-sm text-slate-400 mb-6 leading-relaxed">
                        Join thousands of users getting the latest free tools and updates. No spam, ever.
                    </p>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 relative overflow-hidden group hover:border-indigo-500/30 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <p className="text-sm font-semibold text-slate-300 mb-4 relative z-10">
                            Have a feature request?
                        </p>
                        <Link href="/contact-us" className="relative z-10 w-full inline-flex justify-center items-center py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5">
                            Send us a Message
                        </Link>
                    </div>
                </div>

            </div>

            {/* Bottom bar & Disclaimer */}
            <div className="mt-20 pt-8 border-t border-slate-800 text-center md:text-left">
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4 mb-6">
                    <p className="text-[13px] text-slate-400 leading-snug text-center">
                        <span className="font-semibold text-amber-500">Disclaimer:</span> SmartToolsWala is an independent platform. We are <strong>not affiliated</strong> with any government body or official examination authority.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-400 font-medium">
                        © {new Date().getFullYear()} SmartTools<span className="text-indigo-400">Wala</span>. All rights reserved.
                    </p>

                    <div className="flex gap-6 text-sm text-slate-400">
                        <Link href="/cancellation-and-refund" className="hover:text-indigo-400 transition-colors">Refunds</Link>
                        <Link href="/shipping-policy" className="hover:text-indigo-400 transition-colors">Shipping</Link>
                        <span className="text-slate-600">•</span>
                        <span>Made with ❤️ in India</span>
                    </div>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
