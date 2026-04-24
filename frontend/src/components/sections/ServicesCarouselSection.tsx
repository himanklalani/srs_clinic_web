"use client";

import { useRef } from "react";
import PageLink from "@/components/PageLink";
import Image from "next/image";
import {
  Sparkles,
  SmilePlus,
  ShieldCheck,
  Gem,
  HeartPulse,
  Baby,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import GlowCard from "@/components/animations/GlowCard";

interface Treatment {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
}

const TREATMENTS: Treatment[] = [
  {
    icon: Sparkles,
    title: "Teeth Whitening",
    description: "Brighten your smile with our professional whitening treatments.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=600&q=80",
  },
  {
    icon: SmilePlus,
    title: "Braces & Aligners",
    description: "Straighten your teeth discreetly with modern aligners.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80",
  },
  {
    icon: ShieldCheck,
    title: "Root Canal",
    description: "Pain-free root canal therapy with advanced techniques.",
    image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&q=80",
  },
  {
    icon: Gem,
    title: "Dental Implants",
    description: "Permanent tooth replacement that looks and feels natural.",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=80",
  },
  {
    icon: HeartPulse,
    title: "Cosmetic Dentistry",
    description: "Transform your smile with veneers, bonding, and more.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=600&q=80",
  },
  {
    icon: Baby,
    title: "Pediatric Dentistry",
    description: "Gentle, child-friendly dental care for little smiles.",
    image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=600&q=80",
  },
];

export default function ServicesCarouselSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-28 bg-surface overflow-hidden"
      aria-label="Our Treatments"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text mb-4">
              Our <span className="text-primary">Treatments</span>
            </h2>
            <p className="text-text/70 max-w-xl mx-auto text-sm sm:text-base">
              We offer a comprehensive range of dental treatments to keep your
              smile healthy and beautiful.
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop: 2-column layout; Mobile: stacked glow cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TREATMENTS.map((t, i) => {
            const Icon = t.icon;
            return (
              <ScrollReveal key={t.title} delay={i * 0.08}>
                <GlowCard className="h-full">
                  <div className="relative overflow-hidden rounded-t-2xl aspect-[16/10]">
                    <motion.div style={{ y: imageY }} className="absolute inset-[-10%]">
                      <Image
                        src={t.image}
                        alt={t.title}
                        fill
                        className="object-cover"
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 to-transparent" />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center mb-4 -mt-10 relative z-10 border-2 border-white shadow-sm">
                      <Icon className="text-primary" size={24} aria-hidden="true" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-text mb-2 font-serif">
                      {t.title}
                    </h3>
                    <p className="text-text/70 text-sm leading-relaxed mb-4">
                      {t.description}
                    </p>
                    <PageLink
                      href="/treatments"
                      className="text-primary font-medium text-sm hover:text-primary-dark transition-colors inline-flex items-center gap-1 min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md"
                      aria-label={`Learn more about ${t.title}`}
                    >
                      Learn More →
                    </PageLink>
                  </div>
                </GlowCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
