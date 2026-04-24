"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import CountUp from "@/components/animations/CountUp";

const STATS = [
  { target: 10, suffix: "+", label: "Years Experience" },
  { target: 5000, suffix: "+", label: "Happy Patients" },
  { target: 15, suffix: "+", label: "Treatments" },
  { target: 4.9, suffix: "★", label: "Google Rating" },
];

export default function StatsSection() {
  return (
    <section 
      className="py-16 md:py-20 bg-primary-dark relative overflow-hidden" 
      aria-label="Clinic statistics"
    >
      {/* Ambient orbs for depth */}
      <div className="orb orb-violet w-64 h-64 -top-20 -left-20 opacity-20" />
      <div className="orb orb-lavender w-48 h-48 -bottom-10 right-10 opacity-15" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-2">
                  <CountUp
                    target={stat.target}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </div>
                <p className="text-white/70 text-sm sm:text-base font-medium">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
