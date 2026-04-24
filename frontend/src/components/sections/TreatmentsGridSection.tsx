"use client";

import PageLink from '@/components/PageLink';
import SplitText from '@/components/animations/SplitText';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { TreatmentsTransitionPanel } from '@/components/sections/TreatmentsTransitionPanel';

export default function TreatmentsGridSection() {
  return (
    <section 
      id="treatments-grid" 
      className="pt-16 sm:pt-20 md:pt-24 pb-16 sm:pb-24 bg-[#faf8f5] bg-dots relative"
    >
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        <div className="mb-10 sm:mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-medium tracking-widest text-[10px] sm:text-xs md:text-sm uppercase mb-2 sm:mb-3 block">
              Our Expertise
            </span>
            <SplitText 
              text="Precision Treatments."
              tag="h2"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-semibold text-text leading-tight justify-start m-0"
              staggerDelay={0.06}
            />
            <p className="mt-4 md:mt-6 text-text/70 text-sm sm:text-base max-w-lg leading-relaxed font-light">
              A comprehensive suite of bespoke dental services, marrying advanced technology with artistic precision to deliver flawless results and uncompromising comfort.
            </p>
          </div>
          
          <PageLink 
            href="/treatments"
            className="text-text/60 hover:text-primary font-medium transition-colors md:pb-2 border-b border-transparent hover:border-primary w-fit flex items-center gap-2 text-sm sm:text-base"
          >
            View All Services
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </PageLink>
        </div>

        <ScrollReveal direction="up" delay={0.2}>
          <TreatmentsTransitionPanel />
        </ScrollReveal>
        
      </div>
    </section>
  );
}
