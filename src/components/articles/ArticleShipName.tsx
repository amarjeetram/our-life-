import React from 'react';
import { Heart, Anchor, Sparkles, Wand2, Share2, Info } from 'lucide-react';
import Link from 'next/link';

export default function ArticleShipName() {
    return (
        <article className="mt-16 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-slate-200 text-slate-700 leading-relaxed">
            <header className="mb-10">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">
                    What is a Ship Name Generator?
                </h2>
                <div className="h-1.5 w-20 bg-pink-500 rounded-full mb-6"></div>
                <p className="text-lg font-medium text-slate-600">
                    A <strong>Ship Name Generator</strong> is a creative tool used to combine the names of two people (usually a couple or "ship") into a single, cute nickname. It's wildly popular in fandoms, social media groups, and among fans of celebrity couples. 
                </p>
            </header>

            <section className="mb-10">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <Wand2 className="text-pink-500" size={24} />
                    How to Use the Ship Name Maker
                </h3>
                <p className="mb-4">
                    Creating your own unique ship name is easy and takes less than 10 seconds. Just follow these simple steps:
                </p>
                <ul className="space-y-4 mb-6">
                    <li className="flex gap-3 items-start">
                        <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold">1</div>
                        <p>Enter your name or the first person's name in the "Your Name" box.</p>
                    </li>
                    <li className="flex gap-3 items-start">
                        <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold">2</div>
                        <p>Enter your partner, crush, or favorite celebrity's name in the second box.</p>
                    </li>
                    <li className="flex gap-3 items-start">
                        <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold">3</div>
                        <p>Click the <strong>Set Sail</strong> button to generate a list of creative combinations!</p>
                    </li>
                    <li className="flex gap-3 items-start">
                        <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center flex-shrink-0 mt-1 text-xs font-bold">4</div>
                        <p>Click any result to instantly copy it and use it as a hashtag or bio label.</p>
                    </li>
                </ul>
            </section>

            <div className="p-6 bg-pink-50 rounded-3xl border border-pink-100 my-10 flex gap-5 items-start">
                <Info className="text-pink-500 flex-shrink-0 mt-1" size={24} />
                <div>
                    <h4 className="font-bold text-pink-900 mb-1">Did you know?</h4>
                    <p className="text-pink-800 text-sm italic">
                        The term "shipping" comes from the word "relationship." It started in the late 90s with TV show fandoms where fans wanted two characters to date. Famous examples include <strong>Brangelina</strong> (Brad Pitt & Angelina Jolie) and <strong>Bennifer</strong> (Ben Affleck & Jennifer Lopez).
                    </p>
                </div>
            </div>

            <section className="mb-10">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Why Generate a Ship Name?</h3>
                <p className="mb-4">
                    Whether you are starting a new relationship or just having fun with your BFF, a ship name creates a sense of unity and identity. It is perfect for:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                        <Sparkles className="text-purple-500" size={18} />
                        <span className="font-bold text-slate-700">Instagram Hashtags</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                        <Share2 className="text-blue-500" size={18} />
                        <span className="font-bold text-slate-700">WhatsApp Status</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                        <Anchor className="text-indigo-500" size={18} />
                        <span className="font-bold text-slate-700">Wedding Portals</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                        <Heart className="text-red-500" size={18} />
                        <span className="font-bold text-slate-700">Couple Profiles</span>
                    </div>
                </div>
            </section>

            <section>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">Explore More Fun Tools</h3>
                <p>
                    Looking for more ways to check your relationship status? Use our 
                    <Link href="/love-tools/love-calculator" className="text-pink-600 font-bold hover:underline mx-1">Love Percentage Calculator</Link> 
                    to see your numerical score, or try our 
                    <Link href="/love-tools/flames-calculator" className="text-pink-600 font-bold hover:underline mx-1">FLAMES Game</Link> 
                    to reveal your ultimate relationship destiny!
                </p>
            </section>
        </article>
    );
}
