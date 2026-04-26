"use client";

import { useTransition } from "@/components/providers/TransitionProvider";
import PageLink from '@/components/PageLink';
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import { Smile, Activity, Crown, Sparkles, Baby, Leaf, Palette, CalendarCheck } from 'lucide-react';
import DentalFeaturesSection from "@/components/sections/DentalFeaturesSection";
import dynamic from 'next/dynamic';
const TextRoll = dynamic(() => import('@/components/ui/text-roll').then(mod => mod.TextRoll));
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider
} from "@/components/ui/image-comparison";
import { AnimatePresence, motion } from "framer-motion";

const BEFORE_AFTER_PAIRS = [
  {
    before: "",
    after:  "",
  },
  {
    before: "",
    after:  "",
  },
  {
    before: "",
    after:  "",
  },
  {
    before: "",
    after:  "",
  },
];

const TREATMENTS_DATA = [
  { icon: Smile,    title: 'Teeth Whitening',    description: 'Brighten your smile with our safe, effective whitening procedures.',       pair: 0 },
  { icon: Activity, title: 'Braces',             description: 'Straighten teeth with modern braces for all ages.',                        pair: 1 },
  { icon: Crown,    title: 'Root Canal',         description: 'Save damaged teeth with precise, pain-free root canal therapy.',           pair: 2 },
  { icon: Crown,    title: 'Implants',           description: 'Restore missing teeth with durable, natural-looking implants.',            pair: 3 },
  { icon: Sparkles, title: 'Cosmetic Dentistry', description: 'Enhance aesthetics with veneers, bonding, and smile redesigns.',          pair: 0 },
  { icon: Baby,     title: 'Pediatric Care',     description: 'Gentle, fear-free dental care designed especially for children.',         pair: 1 },
  { icon: Leaf,     title: 'Gum Treatment',      description: 'Treat gum disease with advanced periodontal therapy.',                    pair: 2 },
  { icon: Palette,  title: 'Smile Design',       description: 'Custom smile makeovers tailored to your unique facial features.',         pair: 3 },
];

export default function TreatmentsClient() {
  const { isInitialLoad } = useTransition();

  return (
    <main className="flex min-h-screen flex-col bg-[#faf8f5]">
      <AnimatedNavFramer />

      {/* 3D Rolling Text Banner */}
      <div className="w-full bg-background pt-28 pb-6 md:pt-32 md:pb-10 overflow-hidden flex justify-center items-center px-4">
        <AnimatePresence>
          {!isInitialLoad && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <TextRoll 
                className="text-3xl sm:text-5xl md:text-6xl lg:text-[5rem] xl:text-[6rem] font-bold text-primary-dark/30 hover:text-primary hover:opacity-100 transition-all duration-1000 font-instrument uppercase tracking-tighter whitespace-nowrap cursor-default drop-shadow-sm hover:drop-shadow-[0_0_30px_rgba(109,40,217,0.4)]"
              >
                EXPERIENCE PERFECTION
              </TextRoll>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Dental Features Wheel */}
      <DentalFeaturesSection />

      {/* Treatments Grid */}
      <section className="py-10 sm:py-14">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">

          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-primary font-medium tracking-widest text-xs uppercase mb-3 block">What We Offer</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold text-text mb-4">
              Our Treatments
            </h1>
            <p className="text-text/70 max-w-2xl mx-auto text-sm sm:text-base">
              Comprehensive dental solutions for every need — each backed by the latest technology and a compassionate approach.
            </p>
          </div>

          {/* Single CTA above the grid */}
          <div className="flex justify-center mb-10 sm:mb-14">
            <PageLink
              href="/book"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-3 px-8 rounded-full hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              <CalendarCheck className="w-4 h-4" />
              Book a Consultation
            </PageLink>
          </div>

          {/* Treatments Cards — 2-col on mobile, 4-col on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 items-stretch">
            {TREATMENTS_DATA.map((t) => {
              const pair = BEFORE_AFTER_PAIRS[t.pair];
              return (
                <div
                  key={t.title}
                  className="bg-white rounded-2xl shadow-sm border border-surface/50 overflow-hidden flex flex-col hover:shadow-md transition-shadow group h-full"
                >
                  {/* Before / After Slider */}
                  <div className="w-full rounded-t-2xl overflow-hidden border-b border-primary/10">
                    <ImageComparison className="aspect-[4/3] w-full" enableHover>
                      <ImageComparisonImage src={pair.before} alt={`${t.title} Before`} position="left" />
                      <ImageComparisonImage src={pair.after}  alt={`${t.title} After`}  position="right" />
                      <ImageComparisonSlider className="w-1 bg-white/60 backdrop-blur-sm shadow-md">
                        <div className="absolute top-1/2 left-1/2 h-6 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white flex items-center justify-center shadow-lg border border-primary/20">
                          <div className="w-[2px] h-2 bg-primary/40 rounded-full" />
                        </div>
                      </ImageComparisonSlider>
                    </ImageComparison>
                    <div className="flex justify-between px-3 py-1 bg-surface text-[9px] sm:text-[10px] font-medium text-primary uppercase tracking-wider">
                      <span>Before</span>
                      <span>After</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-3 sm:p-5 flex flex-col items-center text-center flex-1">
                    <t.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2 sm:mb-3 mt-1" />
                    <h3 className="text-sm sm:text-base font-semibold text-text mb-1 sm:mb-2 leading-tight">{t.title}</h3>
                    <p className="text-text/60 text-[10px] sm:text-xs leading-relaxed line-clamp-3">{t.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Single CTA below the grid */}
          <div className="flex flex-col items-center gap-3 mt-8 sm:mt-10">
            <p className="text-text/60 text-sm">Ready to transform your smile?</p>
            <PageLink
              href="/book"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-3 px-8 rounded-full hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg text-sm sm:text-base"
            >
              <CalendarCheck className="w-4 h-4" />
              Book a Consultation
            </PageLink>
          </div>

        </div>
      </section>
    </main>
  );
}
