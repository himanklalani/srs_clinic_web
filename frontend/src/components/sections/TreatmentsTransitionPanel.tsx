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
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

export function TreatmentsTransitionPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [ref, bounds] = useMeasure();

  const TREATMENTS = [
    {
      title: "Smile Design",
      description: "Custom smile makeovers tailored to your unique facial features and aesthetic goals.",
      beforeImage: "",
      afterImage: "",
    },
    {
      title: "Teeth Whitening",
      description: "Professional brightening for a radiant, confident smile using high-end gentle formulas.",
      beforeImage: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779952394/copy_of_img_1456_yqfusi.heic",
      afterImage: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779953394/IMG_1441_xrzlbm.heic",
    },
    {
      title: "Implants",
      description: "Permanent, natural-looking tooth replacements ensuring lifelong durability.",
      beforeImage: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1781958221/Untitled_design_8_mlx0xp.png",
      afterImage: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1781958221/Untitled_design_9_vlxwjp.png",
    },
    {
      title: "Aligners & Braces",
      description: "Invisible, comfortable alignment solutions tailored for both teens and adults.",
      beforeImage: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779952235/IMG_0992_vow8gg.heic",
      afterImage: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779952072/after_a_b_pkbkea.heic",
    },
    {
      title: "Full Mouth Rehab",
      description: "Comprehensive restoration of your oral health and aesthetics for a perfect smile.",
      beforeImage: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779950607/fmg_after_pnqadw.png",
      afterImage: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779950606/fmh_before_lzmnze.png",
      
    },
    {
      title: "Pediatric",
      description: "Gentle, anxiety-free dental care designed exclusively for our youngest patients.",
      beforeImage: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779952763/Untitled_design_3_iqtn8x.png",
      afterImage: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779952763/Untitled_design_2_dgnbgf.png",
    },
    {
      title: "Dental Cleaning",
      description: "Professional cleaning and polishing for a healthy, plaque-free smile and optimal gum health.",
      beforeImage: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1781957292/copy_of_dental_cleaning1_siotd3.jpg",
      afterImage: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1781957491/copy_of_dentalcleaning2_dq1qgn.jpg",
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
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Navigation Arrows */}
      <button 
        onClick={() => handleSetActiveIndex(activeIndex - 1)}
        disabled={activeIndex === 0}
        className="absolute -left-3 sm:-left-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white border border-primary/20 rounded-full shadow-lg text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-0 disabled:pointer-events-none focus:outline-none"
        aria-label="Previous treatment"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button 
        onClick={() => handleSetActiveIndex(activeIndex + 1)}
        disabled={activeIndex === TREATMENTS.length - 1}
        className="absolute -right-3 sm:-right-6 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 bg-white border border-primary/20 rounded-full shadow-lg text-primary hover:bg-primary hover:text-white transition-all disabled:opacity-0 disabled:pointer-events-none focus:outline-none"
        aria-label="Next treatment"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <div className="overflow-hidden rounded-3xl border border-primary/10 shadow-xl bg-white shadow-primary/5">
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
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={(e, { offset }) => {
          const swipeDistance = offset.x;
          if (swipeDistance < -50 && activeIndex < TREATMENTS.length - 1) {
            handleSetActiveIndex(activeIndex + 1);
          } else if (swipeDistance > 50 && activeIndex > 0) {
            handleSetActiveIndex(activeIndex - 1);
          }
        }}
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
            
            {typeof treatment.beforeImage === 'string' && treatment.beforeImage !== '' && typeof treatment.afterImage === 'string' && treatment.afterImage !== '' && (
              <div 
                className="w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-lg border border-primary/20"
                onPointerDownCapture={(e) => e.stopPropagation()}
              >
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

            <PageLink 
              href="/treatments" 
              className="mt-6 md:mt-8 inline-flex items-center gap-1.5 text-primary hover:text-primary-dark font-medium transition-colors text-sm sm:text-base group"
            >
              View all treatments
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </PageLink>
          </div>
        ))}
      </TransitionPanel>
      <div className="flex items-center justify-center p-6 sm:p-8 bg-[#faf8f5]/50 border-t border-primary/10">
        <div className="flex gap-2 sm:gap-3 justify-center">
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
      </div>
    </div>
    </div>
  );
}
