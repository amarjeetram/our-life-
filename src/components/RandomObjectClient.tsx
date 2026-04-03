"use client";

import React, { useState } from 'react';
import { RefreshCw, Filter, ShieldCheck, Zap, Hash, Dices } from 'lucide-react';

const OBJECTS = [
    { name: "Apple", emoji: "🍎", category: "Food" },
    { name: "Car", emoji: "🚗", category: "Transport" },
    { name: "Telescope", emoji: "🔭", category: "Science" },
    { name: "Guitar", emoji: "🎸", category: "Music" },
    { name: "Bicycle", emoji: "🚲", category: "Transport" },
    { name: "Camera", emoji: "📸", category: "Tech" },
    { name: "Umbrella", emoji: "☂️", category: "Weather" },
    { name: "Pizza", emoji: "🍕", category: "Food" },
    { name: "Rocket", emoji: "🚀", category: "Space" },
    { name: "Book", emoji: "📖", category: "Education" },
    { name: "Laptop", emoji: "💻", category: "Tech" },
    { name: "Microphone", emoji: "🎤", category: "Music" },
    { name: "Basketball", emoji: "🏀", category: "Sports" },
    { name: "Soccer Ball", emoji: "⚽", category: "Sports" },
    { name: "Paintbrush", emoji: "🖌️", category: "Art" },
    { name: "Key", emoji: "🔑", category: "Misc" },
    { name: "Lock", emoji: "🔒", category: "Security" },
    { name: "Magnifying Glass", emoji: "🔍", category: "Science" },
    { name: "Lightbulb", emoji: "💡", category: "Science" },
    { name: "Clock", emoji: "🕒", category: "Time" },
    { name: "Alarm Clock", emoji: "⏰", category: "Time" },
    { name: "Hourglass", emoji: "⏳", category: "Time" },
    { name: "Globe", emoji: "🌍", category: "Geography" },
    { name: "Map", emoji: "🗺️", category: "Geography" },
    { name: "Compass", emoji: "🧭", category: "Geography" },
    { name: "Backpack", emoji: "🎒", category: "Education" },
    { name: "Glasses", emoji: "👓", category: "Fashion" },
    { name: "Sunglasses", emoji: "🕶️", category: "Fashion" },
    { name: "Shoes", emoji: "👞", category: "Fashion" },
    { name: "Sneakers", emoji: "👟", category: "Fashion" },
    { name: "Watch", emoji: "⌚", category: "Fashion" },
    { name: "Hat", emoji: "🎩", category: "Fashion" },
    { name: "Crown", emoji: "👑", category: "Fashion" },
    { name: "Ring", emoji: "💍", category: "Fashion" },
    { name: "Diamond", emoji: "💎", category: "Fashion" },
    { name: "Money", emoji: "💵", category: "Finance" },
    { name: "Coin", emoji: "🪙", category: "Finance" },
    { name: "Credit Card", emoji: "💳", category: "Finance" },
    { name: "Gem", emoji: "💎", category: "Finance" },
    { name: "Magnet", emoji: "🧲", category: "Science" },
    { name: "Thermometer", emoji: "🌡️", category: "Science" },
    { name: "Syringe", emoji: "💉", category: "Medical" },
    { name: "Stethoscope", emoji: "🩺", category: "Medical" },
    { name: "Pill", emoji: "💊", category: "Medical" },
    { name: "Microscope", emoji: "🔬", category: "Science" },
    { name: "Telescope", emoji: "🔭", category: "Space" },
    { name: "Satellite", emoji: "🛰️", category: "Space" },
    { name: "Anchor", emoji: "⚓", category: "Transport" },
    { name: "Boat", emoji: "⛵", category: "Transport" },
    { name: "Ship", emoji: "🚢", category: "Transport" },
    { name: "Airplane", emoji: "✈️", category: "Transport" },
    { name: "Helicopter", emoji: "🚁", category: "Transport" },
    { name: "Train", emoji: "🚂", category: "Transport" },
    { name: "Bus", emoji: "🚌", category: "Transport" },
    { name: "Ambulance", emoji: "🚑", category: "Medical" },
    { name: "Firetruck", emoji: "🚒", category: "Emergency" },
    { name: "Police Car", emoji: "🚓", category: "Emergency" },
    { name: "Taxi", emoji: "🚕", category: "Transport" },
    { name: "Tractor", emoji: "🚜", category: "Farming" },
    { name: "House", emoji: "🏠", category: "Building" },
    { name: "Castle", emoji: "🏰", category: "Building" },
    { name: "Tent", emoji: "⛺", category: "Outdoors" },
    { name: "Factory", emoji: "🏭", category: "Building" },
    { name: "Hospital", emoji: "🏥", category: "Building" },
    { name: "Bank", emoji: "🏦", category: "Building" },
    { name: "School", emoji: "🏫", category: "Building" },
    { name: "Statue", emoji: "🗽", category: "Landmark" },
    { name: "Bridge", emoji: "🌉", category: "Landmark" },
    { name: "Volcano", emoji: "🌋", category: "Nature" },
    { name: "Mountain", emoji: "⛰️", category: "Nature" },
    { name: "Snowman", emoji: "⛄", category: "Weather" },
    { name: "Fire", emoji: "🔥", category: "Nature" },
    { name: "Water Drop", emoji: "💧", category: "Nature" },
    { name: "Wind", emoji: "💨", category: "Weather" },
    { name: "Cloud", emoji: "☁️", category: "Weather" },
    { name: "Sun", emoji: "☀️", category: "Weather" },
    { name: "Moon", emoji: "🌙", category: "Space" },
    { name: "Star", emoji: "⭐", category: "Space" },
    { name: "Comet", emoji: "☄️", category: "Space" },
    { name: "Meteor", emoji: "🌠", category: "Space" },
    { name: "Rainbow", emoji: "🌈", category: "Weather" },
    { name: "Plant", emoji: "🌱", category: "Nature" },
    { name: "Tree", emoji: "🌳", category: "Nature" },
    { name: "Cactus", emoji: "🌵", category: "Nature" },
    { name: "Flower", emoji: "🌸", category: "Nature" },
    { name: "Leaf", emoji: "🍂", category: "Nature" },
    { name: "Mushroom", emoji: "🍄", category: "Nature" },
    { name: "Burger", emoji: "🍔", category: "Food" },
    { name: "Fries", emoji: "🍟", category: "Food" },
    { name: "Hotdog", emoji: "🌭", category: "Food" },
    { name: "Popcorn", emoji: "🍿", category: "Food" },
    { name: "Donut", emoji: "🍩", category: "Food" },
    { name: "Cookie", emoji: "🍪", category: "Food" },
    { name: "Cake", emoji: "🍰", category: "Food" },
    { name: "Chocolate", emoji: "🍫", category: "Food" },
    { name: "Candy", emoji: "🍬", category: "Food" },
    { name: "Lollipop", emoji: "🍭", category: "Food" },
    { name: "Ice Cream", emoji: "🍦", category: "Food" },
    { name: "Coffee", emoji: "☕", category: "Drink" },
    { name: "Tea", emoji: "🍵", category: "Drink" },
    { name: "Wine", emoji: "🍷", category: "Drink" },
    { name: "Beer", emoji: "🍺", category: "Drink" },
    { name: "Cocktail", emoji: "🍸", category: "Drink" },
    { name: "Juice", emoji: "🧃", category: "Drink" },
    { name: "Milk", emoji: "🥛", category: "Drink" },
    { name: "Baby Bottle", emoji: "🍼", category: "Misc" },
    { name: "Plate", emoji: "🍽️", category: "Food" },
    { name: "Spoon", emoji: "🥄", category: "Food" },
    { name: "Knife", emoji: "🔪", category: "Tool" },
    { name: "Fork", emoji: "🍴", category: "Food" },
    { name: "Chopsticks", emoji: "🥢", category: "Food" },
    { name: "Bowl", emoji: "🥣", category: "Food" },
    { name: "Sword", emoji: "🗡️", category: "Weapon" },
    { name: "Shield", emoji: "🛡️", category: "Weapon" },
    { name: "Bow", emoji: "🏹", category: "Weapon" },
    { name: "Axe", emoji: "🪓", category: "Tool" },
    { name: "Hammer", emoji: "🔨", category: "Tool" },
    { name: "Wrench", emoji: "🔧", category: "Tool" },
    { name: "Nut and Bolt", emoji: "🔩", category: "Tool" },
    { name: "Gear", emoji: "⚙️", category: "Tool" },
    { name: "Scissors", emoji: "✂️", category: "Tool" },
    { name: "Flashlight", emoji: "🔦", category: "Tool" },
];

export default function RandomObjectClient() {
    const [amount, setAmount] = useState<number | ''>(5);
    const [isUnique, setIsUnique] = useState(true);
    const [results, setResults] = useState<{ name: string; emoji: string; category: string }[]>([]);
    const [isSpinning, setIsSpinning] = useState(false);
    const [spinRotation, setSpinRotation] = useState(0);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === '') {
            setAmount('');
            return;
        }
        let numeric = parseInt(val, 10);
        if (isNaN(numeric)) return;
        
        // Clamp between 1 and 100
        if (numeric > 100) numeric = 100;
        if (numeric < 1) numeric = 1;

        setAmount(numeric);
    };

    const generateRandomObjects = () => {
        const count = typeof amount === 'number' ? amount : 5;
        
        setIsSpinning(true);
        setSpinRotation(prev => prev + 1080); // Spin 3 times

        // Small delay to let animation play and simulate building up randomness
        setTimeout(() => {
            let finalResults = [];
            
            if (isUnique) {
                // Ensure unique objects by shuffling and slicing
                const shuffled = [...OBJECTS].sort(() => 0.5 - Math.random());
                finalResults = shuffled.slice(0, Math.min(count, OBJECTS.length));
            } else {
                // Allow duplicates by picking completely random indices
                for (let i = 0; i < count; i++) {
                    const randomIndex = Math.floor(Math.random() * OBJECTS.length);
                    finalResults.push(OBJECTS[randomIndex]);
                }
            }
            
            setResults(finalResults);
            setIsSpinning(false);
        }, 600);
    };

    return (
        <div className="w-full bg-slate-50 border border-slate-200 shadow-xl rounded-[2rem] overflow-hidden relative z-20">
            {/* Header section with tools intro and top controls */}
            <div className="bg-white border-b border-slate-100 p-6 md:p-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Title Area */}
                    <div>
                        <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg"><Zap className="w-5 h-5 md:w-6 md:h-6" /></span>
                            Live Random Generator
                        </h2>
                        <p className="text-slate-500 text-sm mt-2 font-medium">Generate up to 100 random items for games, drawing, or object shows.</p>
                    </div>

                    {/* Controls Toolbar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                        
                        {/* Wrapper for the settings (count & toggle) */}
                        <div className="flex items-center justify-between sm:justify-start bg-slate-50 border border-slate-200 shadow-inner rounded-2xl p-1.5">
                            
                            {/* Input Box for Count */}
                            <div className="flex items-center bg-white border border-slate-200/60 shadow-sm rounded-xl px-3 py-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2">Count</span>
                                <input
                                    type="number"
                                    min={1}
                                    max={100}
                                    value={amount}
                                    onChange={handleAmountChange}
                                    placeholder="5"
                                    className="w-12 outline-none text-xl font-black text-indigo-600 bg-transparent text-center"
                                    suppressHydrationWarning
                                />
                            </div>

                            {/* Divider */}
                            <div className="w-px h-6 bg-slate-200 mx-2"></div>

                            {/* Unique Toggle */}
                            <button 
                                onClick={() => setIsUnique(!isUnique)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-sm tracking-wide transition-all mr-1 ${isUnique ? 'text-indigo-600 bg-indigo-50/50' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100/50'}`}
                            >
                                <div className={`w-4 h-4 rounded shadow-sm flex items-center justify-center transition-colors ${isUnique ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white border border-slate-300'}`}>
                                    {isUnique && <ShieldCheck className="w-3 h-3" />}
                                </div>
                                <span>Unique</span>
                            </button>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={generateRandomObjects}
                            disabled={isSpinning || amount === ''}
                            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 sm:py-3.5 text-base font-black text-white bg-slate-900 rounded-2xl overflow-hidden hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-slate-900/20 disabled:opacity-70 disabled:pointer-events-none whitespace-nowrap"
                            suppressHydrationWarning
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative z-10 flex items-center gap-2">
                                <RefreshCw
                                    className="w-5 h-5 text-indigo-200 group-hover:text-white transition-colors"
                                    style={{
                                        transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                        transform: `rotate(${spinRotation}deg)`
                                    }}
                                />
                                {isSpinning ? '...' : 'Generate New'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Results Display Area */}
            <div className="p-6 md:p-10 relative overflow-hidden min-h-[350px] flex items-center justify-center bg-slate-50/50">
                {/* Background decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50 -ml-20 -mb-20 pointer-events-none"></div>

                {results.length === 0 ? (
                    <div className="relative z-10 flex flex-col items-center justify-center text-center p-8">
                        <div className="w-20 h-20 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center mb-6">
                            <Dices className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-2">Ready to Spin?</h3>
                        <p className="text-slate-500 max-w-sm text-lg">Enter a count up to 100 at the top, and click generate to reveal your random objects!</p>
                    </div>
                ) : (
                    <div
                        className="w-full grid gap-4 transition-all duration-500 relative z-10"
                        style={{
                            gridTemplateColumns: `repeat(auto-fit, minmax(${results.length > 5 ? '120px' : '180px'}, 1fr))`,
                            opacity: isSpinning ? 0.3 : 1,
                            transform: isSpinning ? 'scale(0.98)' : 'scale(1)'
                        }}
                    >
                        {results.map((obj, i) => (
                            <div
                                key={`${obj.name}-${i}-${isSpinning}`}
                                className="bg-white border-2 border-slate-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-4 hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default group aspect-square"
                                style={{ animation: isSpinning ? 'none' : `popIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.02}s both` }}
                            >
                                <span className="text-5xl md:text-6xl filter drop-shadow-md group-hover:scale-110 transition-transform duration-300">{obj.emoji}</span>
                                <div>
                                    <h3 className="font-black text-slate-800 text-lg leading-tight">{obj.name}</h3>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{obj.category}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* CSS defined in global or injected here for animation */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes popIn {
                        0% { opacity: 0; transform: scale(0.8) translateY(10px); }
                        100% { opacity: 1; transform: scale(1) translateY(0); }
                    }
                `}} />
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-100 flex flex-wrap gap-4 justify-center text-xs font-bold text-slate-400 uppercase tracking-wide">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Free Tool</span>
                <span className="flex items-center gap-1.5"><Filter className="w-4 h-4 text-blue-500" /> 100+ Unique Items</span>
            </div>
        </div>
    );
}
