"use client";
 
import * as React from "react";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-primary" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-primary",
  titleClassName = "text-primary",
  index = 0,
  isActive = false,
  onClick,
}: DisplayCardProps & { index?: number; isActive?: boolean; onClick?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      whileTap={{ y: -5, scale: 0.98 }}
      animate={isActive ? { y: -15, zIndex: 50, scale: 1.02 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      onClick={onClick}
      className={cn(
        "relative flex h-36 w-full max-w-[20rem] select-none flex-col justify-between rounded-xl border border-surface bg-white/95 px-4 py-3 shadow-lg transition-all duration-700 hover:bg-white [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        "sm:max-w-[22rem]",
        "md:-skew-y-[8deg] md:border-2 md:bg-[#faf8f5]/70 md:backdrop-blur-sm md:after:absolute md:after:-right-1 md:after:top-[-5%] md:after:h-[110%] md:after:w-[20rem] md:after:bg-gradient-to-l md:after:from-background md:after:to-transparent md:after:content-[''] md:hover:border-black/5 md:hover:bg-[#faf8f5]",
        isActive && "border-primary/50 bg-white ring-2 ring-primary/5 shadow-2xl translate-y-[-10px]",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-primary/10 p-2">
          {icon}
        </span>
        <p className={cn("text-lg font-medium font-playfair", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg text-text">{description}</p>
      <p className="text-text/50">{date}</p>
    </motion.div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const defaultCards = [
    {
      className: "[grid-area:stack] translate-y-[-20px] translate-x-3 z-10",
    },
    {
      className: "[grid-area:stack] translate-y-[-10px] translate-x-6 z-20",
    },
    {
      className: "[grid-area:stack] translate-y-0 translate-x-10 z-30",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-[22rem]">
      <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700 w-full hover:z-50">
        {displayCards.map((cardProps, index) => (
          <DisplayCard 
            key={index} 
            index={index} 
            isActive={activeIndex === index}
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            {...cardProps} 
          />
        ))}
      </div>
      
      {/* Mobile Interaction Nudge */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex items-center gap-2 mt-60 md:hidden"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="size-2 rounded-full bg-primary"
        />
        
        <span className="text-sm font-medium text-text/60 tracking-wide uppercase italic">
          Tap cards to explore
        </span>
      </motion.div>
    </div>
  );
}
