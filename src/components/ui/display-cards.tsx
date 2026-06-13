"use client";

import { cn } from "@/lib/utils";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconBg?: string;
  titleColor?: string;
}

function DisplayCard({
  className,
  icon,
  title = "Team Member",
  description = "Role",
  date = "SmartToolsWala",
  iconBg = "bg-indigo-600",
  titleColor = "text-indigo-400",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-xl border border-white/10 bg-slate-800/80 backdrop-blur-sm px-5 py-4 transition-all duration-500",
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-slate-900 after:to-transparent after:content-['']",
        "hover:border-indigo-500/40 hover:bg-slate-700/80",
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      {/* Top row: icon + name */}
      <div>
        <span className={cn("relative inline-flex items-center justify-center rounded-full p-2 text-white", iconBg)}>
          {icon}
        </span>
        <p className={cn("text-lg font-bold", titleColor)}>{title}</p>
      </div>

      {/* Middle: role */}
      <p className="whitespace-nowrap text-sm font-semibold text-slate-200">{description}</p>

      {/* Bottom: company tag */}
      <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">{date}</p>
    </div>
  );
}

export interface TeamCardProps extends DisplayCardProps {
  stackClassName?: string;
}

interface DisplayCardsProps {
  cards?: TeamCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: TeamCardProps[] = [
    { title: "Featured", description: "Discover content", date: "Just now" },
    { title: "Popular", description: "Trending this week", date: "2 days ago" },
    { title: "New", description: "Latest features", date: "Today" },
  ];

  const displayCards = cards || defaultCards;

  // Build stack className for each card position
  const stackClasses = [
    "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-full before:h-full before:rounded-xl before:content-[''] before:bg-slate-900/60 before:left-0 before:top-0 grayscale hover:grayscale-0 hover:before:opacity-0 before:transition-all before:duration-500",
    "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-full before:h-full before:rounded-xl before:content-[''] before:bg-slate-900/40 before:left-0 before:top-0 grayscale hover:grayscale-0 hover:before:opacity-0 before:transition-all before:duration-500",
    "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    "[grid-area:stack] translate-x-48 translate-y-32 hover:translate-y-20",
  ];

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard
          key={index}
          {...cardProps}
          className={cn(stackClasses[index % stackClasses.length], cardProps.className)}
        />
      ))}
    </div>
  );
}
