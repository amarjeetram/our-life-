"use client";

import { Code, TrendingUp, Megaphone, Search } from "lucide-react";
import DisplayCards from "./display-cards";

const teamCards = [
  {
    icon: <Code className="w-4 h-4" />,
    title: "Amarjeet Ram",
    description: "Owner & Lead Developer",
    date: "SmartToolsWala",
    iconBg: "bg-blue-600",
    titleColor: "text-blue-400",
  },
  {
    icon: <TrendingUp className="w-4 h-4" />,
    title: "Ankush Prasad",
    description: "CFO & Strategy Head",
    date: "SmartToolsWala",
    iconBg: "bg-emerald-600",
    titleColor: "text-emerald-400",
  },
  {
    icon: <Megaphone className="w-4 h-4" />,
    title: "Satender",
    description: "Digital Marketing Expert",
    date: "SmartToolsWala",
    iconBg: "bg-rose-600",
    titleColor: "text-rose-400",
  },
  {
    icon: <Search className="w-4 h-4" />,
    title: "Abhishek Baghel",
    description: "SEO Expert",
    date: "SmartToolsWala",
    iconBg: "bg-amber-600",
    titleColor: "text-amber-400",
  },
];

export default function TeamDisplayCards() {
  return <DisplayCards cards={teamCards} />;
}
