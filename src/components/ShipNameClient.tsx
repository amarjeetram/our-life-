"use client";

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Copy, RefreshCw, MessageCircleHeart, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ShipNameClient() {
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [results, setResults] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const generateShipNames = useCallback(() => {
        if (!name1 || !name2) {
            toast.error('Please enter both names! ❤️');
            return;
        }

        setIsGenerating(true);
        setTimeout(() => {
            const n1 = name1.trim().toLowerCase();
            const n2 = name2.trim().toLowerCase();

            const ships: string[] = [];

            const blend = (a: string, b: string) => {
                const midA = Math.ceil(a.length / 2);
                const midB = Math.floor(b.length / 2);
                
                // Classic blends
                const s1 = a.substring(0, midA) + b.substring(midB);
                const s2 = b.substring(0, midB) + a.substring(midA);
                
                // Swapped classic
                const s3 = a.substring(0, Math.floor(a.length / 2)) + b.substring(Math.ceil(b.length / 2));
                const s4 = b.substring(0, Math.floor(b.length / 2)) + a.substring(Math.ceil(a.length / 2));

                return [s1, s2, s3, s4];
            };

            const allBlends = [...blend(n1, n2), ...blend(n2, n1)];
            
            // Clean up and capitalize
            const uniqueShips = Array.from(new Set(allBlends))
                .filter(s => s.length > 3)
                .map(s => s.charAt(0).toUpperCase() + s.slice(1))
                .slice(0, 6);

            setResults(uniqueShips);
            setIsGenerating(false);
            toast.success('Ship names ready! ⚓');
        }, 800);
    }, [name1, name2]);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success(`Copied "${text}"!`);
    };

    return (
        <div className="max-w-xl mx-auto">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-pink-100/50 border border-pink-50 relative overflow-hidden"
            >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Heart size={120} className="text-pink-500 fill-pink-500" />
                </div>

                <div className="relative z-10">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Your Name</label>
                            <input
                                type="text"
                                placeholder="Enter first name..."
                                value={name1}
                                onChange={(e) => setName1(e.target.value)}
                                className="w-100 px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pink-300 focus:bg-white outline-none transition-all font-bold text-gray-800"
                            />
                        </div>

                        <div className="flex justify-center -my-3 relative z-20">
                            <div className="bg-pink-500 p-2 rounded-full shadow-lg shadow-pink-200">
                                <Heart size={20} className="text-white fill-white" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Crush / Partner Name</label>
                            <input
                                type="text"
                                placeholder="Enter second name..."
                                value={name2}
                                onChange={(e) => setName2(e.target.value)}
                                className="w-100 px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-pink-300 focus:bg-white outline-none transition-all font-bold text-gray-800"
                            />
                        </div>

                        <button
                            onClick={generateShipNames}
                            disabled={isGenerating}
                            className="w-100 py-5 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-pink-200 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {isGenerating ? (
                                <RefreshCw className="animate-spin" />
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    Sail with Ship Names
                                </>
                            )}
                        </button>
                    </div>

                    <AnimatePresence>
                        {results.length > 0 && !isGenerating && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="mt-12 pt-8 border-t border-gray-100"
                            >
                                <h3 className="text-center text-sm font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
                                    <span className="h-px bg-gray-100 flex-1"></span>
                                    Recommended Ships
                                    <span className="h-px bg-gray-100 flex-1"></span>
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {results.map((ship, idx) => (
                                        <motion.div
                                            key={ship}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="group relative"
                                        >
                                            <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-100 flex items-center justify-between group-hover:bg-white group-hover:border-rose-300 transition-all cursor-pointer"
                                                onClick={() => copyToClipboard(ship)}
                                            >
                                                <span className="font-extrabold text-rose-600 text-lg">{ship}</span>
                                                <Copy size={16} className="text-rose-300 group-hover:text-rose-500" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="mt-8 flex justify-center">
                                    <button 
                                        onClick={() => {
                                            copyToClipboard(`Our ship names: ${results.join(', ')} ❤️ via SmartToolsWala`);
                                        }}
                                        className="flex items-center gap-2 text-sm font-bold text-pink-500 hover:text-pink-600 transition-colors"
                                    >
                                        <Share2 size={16} /> Share All Names
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Micro-Interaction Tips */}
            <div className="mt-8 grid grid-cols-3 gap-4">
                {[
                    { icon: <MessageCircleHeart size={16} />, label: "Cute Vibes" },
                    { icon: <Sparkles size={16} />, label: "Unique Mix" },
                    { icon: <Copy size={16} />, label: "Easy Copy" }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 p-3 rounded-2xl bg-white/50 border border-white">
                        <span className="text-rose-400">{item.icon}</span>
                        <span className="text-[10px] font-black uppercase text-gray-500 tracking-tighter">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
