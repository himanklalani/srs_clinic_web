"use client";

import React, { useEffect, useState } from "react";
import { TransitionPanel } from "@/components/ui/transition-panel";
import useMeasure from "react-use-measure";
import PageLink from "@/components/PageLink";
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider
} from "@/components/ui/image-comparison";

function NavigationButton({
  onClick,
  children,
  disabled
}: {
  onClick: () => void,
  children: React.ReactNode,
  disabled?: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type="button"
      className="relative flex h-10 sm:h-12 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-primary/20 bg-white px-4 md:px-6 text-sm sm:text-base font-medium text-primary transition-all hover:bg-primary/5 hover:text-primary-dark focus-visible:ring-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
    >
      {children}
    </button>
  );
}

export function TreatmentsTransitionPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ref, bounds] = useMeasure();

  const TREATMENTS = [
    {
      title: "Teeth Whitening",
      description: "Professional brightening for a radiant, confident smile using high-end gentle formulas.",
      beforeImage: "",
      afterImage: "",
    },
    {
      title: "Braces & Aligners",
      description: "Invisible, comfortable alignment solutions tailored for both teens and adults.",
      beforeImage: "",
      afterImage: "",
    },
    {
      title: "Root Canal",
      description: "Painless, single-sitting endodontic therapy utilizing the latest microscopic precision.",
      beforeImage: "",
      afterImage: "",
    },
    {
      title: "Dental Implants",
      description: "Permanent, natural-looking tooth replacements ensuring lifelong durability.",
      beforeImage: "",
      afterImage: "",
    },
    {
      title: "Cosmetic Dentistry",
      description: "Veneers and composite bonding crafted perfectly to match your facial aesthetics.",
      beforeImage: "",
      afterImage: "",
    },
    {
      title: "Pediatric Dentistry",
      description: "Gentle, anxiety-free dental care designed exclusively for our youngest patients.",
      beforeImage: "",
      afterImage: "",
    }
  ];

  const handleSetActiveIndex = (newIndex: number) => {
    setDirection(newIndex > activeIndex ? 1 : -1);
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    if (activeIndex < 0) setActiveIndex(0);
    if (activeIndex >= TREATMENTS.length) setActiveIndex(TREATMENTS.length - 1);
  }, [activeIndex]);

  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden rounded-3xl border border-primary/10 shadow-xl bg-white shadow-primary/5">
      <TransitionPanel
        activeIndex={activeIndex}
        variants={{
          enter: (direction) => ({
            x: direction > 0 ? 364 : -364,
            opacity: 0,
            height: bounds.height > 0 ? bounds.height : "auto",
            position: "initial",
          }),
          center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            height: bounds.height > 0 ? bounds.height : "auto",
          },
          exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 364 : -364,
            opacity: 0,
            position: "absolute",
            top: 0,
            width: "100%",
          }),
        }}
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        custom={direction}
      >
        {TREATMENTS.map((treatment, index) => (
          <div key={index} className="px-6 py-12 md:p-16 lg:p-24 text-center flex flex-col items-center justify-center min-h-[300px]" ref={ref}>
            <span className="text-primary font-medium tracking-widest text-[10px] sm:text-xs md:text-sm uppercase mb-3 sm:mb-4 block">
              Treatment Category
            </span>
            <h3 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-semibold font-playfair text-text">
              {treatment.title}
            </h3>
            <p className="text-lg sm:text-xl font-light text-text/70 leading-relaxed mb-8 max-w-2xl mx-auto">
              {treatment.description}
            </p>
            <PageLink 
              href="/book" 
              className="inline-flex items-center justify-center bg-primary text-white text-sm sm:text-base font-medium py-3 px-8 rounded-full hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg hover:-translate-y-1 will-change-transform mb-8"
            >
              Book Consultation
            </PageLink>
            
            {typeof treatment.beforeImage === 'string' && typeof treatment.afterImage === 'string' && (
              <div className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg border border-primary/20">
                <ImageComparison className="aspect-[16/9] w-full" enableHover>
                  <ImageComparisonImage
                    src={treatment.beforeImage}
                    alt={`${treatment.title} Before`}
                    position="left"
                  />
                  <ImageComparisonImage
                    src={treatment.afterImage}
                    alt={`${treatment.title} After`}
                    position="right"
                  />
                  <ImageComparisonSlider className="w-1 bg-white/50 backdrop-blur-sm shadow-md">
                    <div className="absolute top-1/2 left-1/2 h-8 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white flex items-center justify-center shadow-lg border border-primary/10">
                      <div className="flex gap-[2px]">
                        <div className="w-[2px] h-3 bg-primary/40 rounded-full" />
                        <div className="w-[2px] h-3 bg-primary/40 rounded-full" />
                      </div>
                    </div>
                  </ImageComparisonSlider>
                </ImageComparison>
                <div className="flex justify-between px-4 py-2 bg-surface text-xs font-medium text-primary">
                  <span>Before</span>
                  <span>After</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </TransitionPanel>
      <div className="flex justify-between items-center p-6 sm:p-8 bg-[#faf8f5]/50 border-t border-primary/10">
        <NavigationButton 
          onClick={() => handleSetActiveIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
        >
          Previous
        </NavigationButton>
        <div className="flex gap-2 sm:gap-3 flex-1 justify-center">
          {TREATMENTS.map((_, i) => (
            <button
              key={i}
              onClick={() => handleSetActiveIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-primary w-8" : "bg-primary/20 hover:bg-primary/40 w-2.5"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <NavigationButton
          onClick={() => handleSetActiveIndex(activeIndex + 1)}
          disabled={activeIndex === TREATMENTS.length - 1}
        >
          Next
        </NavigationButton>
      </div>
    </div>
  );
}
