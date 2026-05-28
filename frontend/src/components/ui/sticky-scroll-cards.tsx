"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface StickyCardData {
  title: string;
  description: string;
  date?: string;
  icon?: React.ReactNode;
  color?: string;
  rotation?: string;
}

export function StickyScrollCards({ cards }: { cards: StickyCardData[] }) {
  return (
    <div className="grid gap-0 w-full">
      {cards.map((card, i) => (
        <figure 
          key={i} 
          className="sticky top-[38vh] md:top-0 min-h-[50vh] md:h-screen flex items-start md:items-center justify-center w-full"
        >
          <article
            className={cn(
              "w-full max-w-sm rounded-2xl p-5 md:p-6 flex flex-col justify-center gap-3 shadow-xl glass transition-all duration-500",
              card.rotation || (i % 2 === 0 ? "rotate-1" : "-rotate-1"),
              "border border-primary/15"
            )}
            style={{ 
              backgroundColor: card.color,
              marginTop: `${i * 1.5}rem`
            }}
          >
            <div className="flex items-center gap-3">
              {card.icon && (
                <div className="p-2.5 bg-primary/10 rounded-xl shrink-0">
                  {card.icon}
                </div>
              )}
              <div>
                {card.date && (
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-0.5">
                    {card.date}
                  </span>
                )}
                <h3 className="text-lg md:text-xl font-semibold text-primary-dark tracking-tight leading-snug">
                  {card.title}
                </h3>
              </div>
            </div>
            
            <p className="text-text/60 text-sm leading-relaxed">
              {card.description}
            </p>
          </article>
        </figure>
      ))}
    </div>
  );
}
