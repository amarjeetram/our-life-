import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Rocket, Globe } from "lucide-react";
import TeamDisplayCards from "@/components/ui/TeamDisplayCards";



export const metadata: Metadata = {
    title: "About Us | SmartToolsWala",
    description: "Learn about SmartToolsWala — your ultimate destination for innovative, practical, and easy-to-use online tools designed to simplify your digital life.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 py-24 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-indigo-200 text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm border border-white/20">
                        About Us
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
                        SmartToolsWala.com
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed font-medium">
                        Welcome to SmartToolsWala.com, your ultimate destination for innovative, practical, and easy-to-use online tools designed to simplify your digital life.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-16">

                {/* Mission & Vision Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                            <Rocket size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
                        <p className="text-slate-600 leading-relaxed">
                            To provide simple, reliable, and efficient online tools that empower individuals, students, professionals, and businesses to perform tasks faster and smarter, without any technical barriers.
                        </p>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                            <Globe size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h2>
                        <p className="text-slate-600 leading-relaxed">
                            To become India’s most trusted online tools platform, recognized for innovation, quality, and user-centric solutions, enabling millions to simplify their digital workflows effortlessly.
                        </p>
                    </div>
                </div>

                {/* Who We Are */}
                <div className="mb-20 text-center">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Who We Are</h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        At SmartToolsWala, we are more than just a tools platform — we are a passionate team driven by technology, creativity, and a desire to provide the best digital experience for our users.
                    </p>
                </div>

                {/* Team Section — DisplayCards stacked design */}
                <h3 className="text-2xl font-bold text-center text-slate-900 mb-4">Meet the Team</h3>
                <p className="text-center text-slate-500 text-sm mb-16">Hover over the cards to explore</p>

                <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl overflow-hidden py-16 px-6 mb-20">
                    {/* Background glow */}
                    <div className="absolute inset-0 opacity-30 pointer-events-none">
                        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-600 rounded-full blur-[120px] -translate-y-1/2" />
                        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-600 rounded-full blur-[100px] -translate-y-1/2" />
                    </div>

                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
                        {/* Left: Label + description */}
                        <div className="lg:w-2/5 text-center lg:text-left flex-shrink-0">
                            <span className="inline-block text-xs font-bold tracking-widest uppercase text-indigo-400 mb-4 border border-indigo-500/30 rounded-full px-4 py-1 bg-indigo-500/10">
                                Our People
                            </span>
                            <h4 className="text-3xl font-extrabold text-white mb-4 leading-tight">
                                The Brains<br />
                                <span className="text-indigo-400">Behind the Tools</span>
                            </h4>
                            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto lg:mx-0">
                                A passionate team of developers, strategists, and marketers dedicated to simplifying your digital life.
                            </p>

                            {/* Quick name list */}
                            <div className="mt-8 flex flex-col gap-3">
                                {[
                                    { name: "Amarjeet Ram", role: "Owner & Lead Developer", color: "bg-blue-500" },
                                    { name: "Ankush Prasad", role: "CFO & Strategy Head", color: "bg-emerald-500" },
                                    { name: "Satender", role: "Digital Marketing Expert", color: "bg-rose-500" },
                                    { name: "Abhishek Baghel", role: "SEO Expert", color: "bg-amber-500" },
                                ].map((m) => (
                                    <div key={m.name} className="flex items-center gap-3">
                                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${m.color}`} />
                                        <span className="text-white font-semibold text-sm">{m.name}</span>
                                        <span className="text-slate-400 text-xs">— {m.role}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Stacked DisplayCards */}
                        <div className="lg:w-3/5 flex justify-center items-center min-h-[320px]">
                            <TeamDisplayCards />
                        </div>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-16">
                    <div className="bg-slate-50 border-b border-slate-100 p-8 text-center">
                        <h2 className="text-3xl font-extrabold text-slate-900">Why Choose Us</h2>
                    </div>
                    <div className="p-8 grid sm:grid-cols-2 gap-y-8 gap-x-8">
                        <div className="flex items-start">
                            <CheckCircle2 className="text-indigo-500 mt-1 mr-4 flex-shrink-0" size={24} />
                            <div>
                                <h4 className="font-bold text-lg text-slate-900 mb-1">User-Friendly Tools</h4>
                                <p className="text-slate-600">Simple interface, no learning curve.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle2 className="text-indigo-500 mt-1 mr-4 flex-shrink-0" size={24} />
                            <div>
                                <h4 className="font-bold text-lg text-slate-900 mb-1">Reliable & Fast</h4>
                                <p className="text-slate-600">High-performance tools you can trust.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle2 className="text-indigo-500 mt-1 mr-4 flex-shrink-0" size={24} />
                            <div>
                                <h4 className="font-bold text-lg text-slate-900 mb-1">Completely Online</h4>
                                <p className="text-slate-600">No downloads or installations required.</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <CheckCircle2 className="text-indigo-500 mt-1 mr-4 flex-shrink-0" size={24} />
                            <div>
                                <h4 className="font-bold text-lg text-slate-900 mb-1">Continuous Innovation</h4>
                                <p className="text-slate-600">Regular updates and new tools based on user needs.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="text-center bg-indigo-50 rounded-3xl p-10 border border-indigo-100">
                    <p className="text-lg md:text-xl text-indigo-900 font-medium mb-8 max-w-2xl mx-auto leading-relaxed">
                        At SmartToolsWala, we believe technology should simplify life, not complicate it. Join thousands of users who trust us for smart, reliable, and easy-to-use online tools.
                    </p>
                    <div className="flex justify-center gap-4 flex-wrap">
                        <Link href="/contact-us" className="px-8 py-4 rounded-xl bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
                            Contact Us
                        </Link>
                        <Link href="/" className="px-8 py-4 rounded-xl bg-white text-slate-700 font-bold shadow-sm border border-slate-200 hover:bg-slate-50 transition-all">
                            ← Back to Home
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}
