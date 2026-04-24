"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

import { testimonialsData, Testimonial } from "@/data/testimonials";
import { ChevronDown, ChevronUp } from "lucide-react";

// Google Colors for authentic verified look
const GOOGLE_COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-purple-500",
  "bg-teal-500",
];

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const colorClass = GOOGLE_COLORS[index % GOOGLE_COLORS.length];
  const isLong = t.review.length > 200;

  return (
    <article className="flex-shrink-0 w-[300px] sm:w-[350px] glass rounded-2xl p-6 shadow-[0_4px_20px_rgb(0,0,0,0.2)] border border-white/10 mx-3 relative pt-10 flex flex-col justify-between" style={{ minHeight: '280px' }}>
      
      {/* Google-style Initials Avatar */}
      <div 
        className={`w-14 h-14 rounded-full absolute -top-5 left-6 border-4 border-primary-dark shadow-md flex items-center justify-center text-white font-bold text-lg ${colorClass}`}
      >
        {t.avatarInitials}
      </div>

      <div>
        <div className="flex items-center gap-1 mb-2" aria-label="5 out of 5 stars">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" aria-hidden="true" />
          ))}
          <span className="text-white/50 text-xs ml-2 font-medium tracking-wide">Verified Google Review</span>
        </div>
        
        <p className="font-semibold text-white/90 text-sm mb-1">{t.name}</p>
        <p className="text-white/40 text-[11px] mb-4 uppercase tracking-wider">{t.timeAgo}</p>
        
        <p className={`text-white/80 text-sm leading-relaxed mb-4 ${!expanded && isLong ? 'line-clamp-4' : ''}`}>
          {t.review}
        </p>

        {isLong && (
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="text-primary-light text-xs font-semibold uppercase tracking-wider flex items-center gap-1 hover:text-white transition-colors mb-4"
          >
            {expanded ? (
              <>Read Less <ChevronUp size={14} /></>
            ) : (
              <>Read More <ChevronDown size={14} /></>
            )}
          </button>
        )}
      </div>
      
      {/* Custom decorative icon (like google G) */}
      <div className="absolute bottom-6 right-6 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
      </div>

    </article>
  );
}

export default function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const autoScroll = () => {
      if (!isInteracting && scrollRef.current) {
        // Differential speed handling for mobile vs desktop natively within the JS hook
        const speed = window.innerWidth < 640 ? 0.6 : window.innerWidth < 1024 ? 1.0 : 1.5;
        scrollRef.current.scrollLeft += speed; 
        
        // Endless loop logic: The container holds 3 exact copies. 
        // When we've scrolled past exactly ONE copy's width, instantly jump back.
        const singleChunkWidth = scrollRef.current.scrollWidth / 3;
        if (scrollRef.current.scrollLeft >= singleChunkWidth) {
          scrollRef.current.scrollLeft -= singleChunkWidth;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInteracting]);

  // Triple the array to provide a massive buffer for endless scrolling
  const duplicatedTestimonials = [...testimonialsData, ...testimonialsData, ...testimonialsData];

  return (
    <section 
      id="testimonials" 
      className="py-16 sm:py-24 md:py-32 bg-primary-dark text-white relative overflow-hidden"
    >
      {/* Atmospheric ambient orbs */}
      <div className="orb orb-violet w-96 h-96 top-10 right-[-100px] opacity-20" />
      <div className="orb orb-deep w-64 h-64 bottom-20 left-10 opacity-30" />
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <ScrollReveal direction="up">
            <span className="text-secondary font-medium tracking-widest text-[10px] sm:text-xs md:text-sm uppercase mb-3 block">
              Patient Stories
            </span>
            <div className="flex items-center justify-center gap-4 mb-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold">
                Excel in Practice.
              </h2>
            </div>
            
            {/* Global Stats Overview */}
            <div className="flex items-center justify-center gap-6 mb-8 text-white/90">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold font-instrument mb-1">5.0</span>
                <div className="flex gap-1" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>
              <div className="w-[1px] h-10 bg-white/20" />
              <div className="flex flex-col items-start">
                <span className="text-2xl font-bold font-instrument">121+</span>
                <span className="text-sm font-medium tracking-wide uppercase text-white/50">Verified Reviews</span>
              </div>
            </div>

          </ScrollReveal>
        </div>

        {/* Scroller wrapper */}
        <div className="relative mt-4 md:mt-8 w-[100vw] left-1/2 -translate-x-1/2 overflow-hidden">
          
          <div 
            ref={scrollRef}
            onMouseEnter={() => setIsInteracting(true)}
            onMouseLeave={() => setIsInteracting(false)}
            onPointerDown={() => setIsInteracting(true)}
            onPointerUp={() => setIsInteracting(false)}
            onTouchStart={() => setIsInteracting(true)}
            onTouchEnd={() => setIsInteracting(false)}
            onTouchCancel={() => setIsInteracting(false)}
            className="flex w-full space-x-4 sm:space-x-6 overflow-x-auto hide-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-grab active:cursor-grabbing pt-8 pb-8"
          >
            {duplicatedTestimonials.map((t, i) => (
              <TestimonialCard key={i} index={i} t={t} />
            ))}
          </div>
          
          {/* Gradient Edges to soften the cut-off */}
          <div className="absolute top-0 left-0 w-8 sm:w-16 md:w-32 h-full bg-gradient-to-r from-primary-dark to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-8 sm:w-16 md:w-32 h-full bg-gradient-to-l from-primary-dark to-transparent pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
