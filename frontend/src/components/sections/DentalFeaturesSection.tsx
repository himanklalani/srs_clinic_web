import Image from "next/image";
import { UserCheck, ShieldCheck, HeartPulse, Star, MapPin, Zap } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

const features = [
  {
    icon: UserCheck,
    title: "Experienced Professionals",
    description: "A team of highly skilled dentists and specialists with years of experience."
  },
  {
    icon: ShieldCheck,
    title: "Hygiene And Safety Standards",
    description: "Strict adherence to international sterilization protocols to ensure a safe environment."
  },
  {
    icon: HeartPulse,
    title: "Personalized Care",
    description: "Individual attention and customized treatment plans tailored to meet your unique needs."
  },
  {
    icon: Star,
    title: "Positive Patient Experiences",
    description: "Proven track record of satisfied patients and excellent, recurring reviews with least follow-ups required post treatments."
  },
  {
    icon: MapPin,
    title: "Comfortable Environment",
    description: "A welcoming, child-friendly atmosphere designed to ease anxiety and promote relaxation."
  },
  {
    icon: Zap,
    title: "Latest Technology",
    description: "Advanced diagnostic tools and modern equipment for precise and pain-free treatments."
  }
];

export default function DentalFeaturesSection() {
  return (
    <section className="py-10 sm:py-20 bg-[#faf8f5] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <ScrollReveal direction="up">
          <div className="text-center mb-8 sm:mb-16 px-2">
             <h2 className="text-xl sm:text-2xl md:text-3xl font-inter text-text/60 leading-relaxed">
               Personalized treatments, modern techniques, and a team that truly cares.
             </h2>
          </div>
        </ScrollReveal>

        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-4">
          
          {/* Header/Image — hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex w-full lg:w-1/3 relative justify-center items-center order-1 lg:order-2 z-10 min-h-[500px]">
             <ScrollReveal scale once={false}>
               <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full bg-blue-50/50 flex items-center justify-center border-[2px] border-dashed border-blue-200 p-2 shadow-inner">
                  <Image 
                    src="https://images.unsplash.com/photo-1606265752439-1f18756aa5fc?q=80&w=1000&auto=format&fit=crop"
                    alt="Pristine Dental Technology"
                    fill
                    priority
                    className="object-cover rounded-full scale-105 drop-shadow-2xl"
                  />
                  {/* Decorative Dots matching the user interface graph */}
                  <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-600 shadow-lg z-20"></div>
                  <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-blue-600 shadow-lg z-20"></div>
                  <div className="absolute top-8 left-10 w-3.5 h-3.5 rounded-full bg-blue-500 shadow-md z-20"></div>
                  <div className="absolute top-8 right-10 w-3.5 h-3.5 rounded-full bg-blue-500 shadow-md z-20"></div>
                  <div className="absolute bottom-8 left-10 w-3.5 h-3.5 rounded-full bg-blue-500 shadow-md z-20"></div>
                  <div className="absolute bottom-8 right-10 w-3.5 h-3.5 rounded-full bg-blue-500 shadow-md z-20"></div>
               </div>
             </ScrollReveal>
          </div>

          {/* Unified Grid for Mobile (3 rows of 2 cards each) */}
          <div className="lg:hidden grid grid-cols-2 gap-4 sm:gap-6 w-full z-10 items-stretch">
            {features.map((feat, idx) => (
              <ScrollReveal direction="up" delay={idx * 0.1} key={`mobile-${feat.title}`} className="w-full h-full">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-surface/50 flex flex-col items-center text-center gap-3 w-full h-full">
                  <div className="shrink-0 bg-white shadow-sm p-3 rounded-full border border-surface/50 text-blue-500">
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-primary-dark mb-1 leading-tight">{feat.title}</h3>
                    <p className="text-text/70 text-[10px] leading-relaxed line-clamp-3">{feat.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Desktop Left Column */}
          <div className="hidden lg:flex flex-col gap-12 w-full lg:w-1/3 order-1 z-10">
            {features.slice(0, 3).map((feat, idx) => (
              <ScrollReveal direction="right" delay={idx * 0.15} key={`desktop-left-${feat.title}`}>
                <div className="flex flex-col items-center text-center gap-4 sm:flex-row lg:flex-col lg:items-end lg:text-right xl:flex-row xl:items-center xl:text-left lg:pr-4">
                  <div className="flex-1 order-2 sm:order-1 lg:order-2 xl:order-1">
                    <h3 className="text-xl font-bold text-primary-dark mb-2">{feat.title}</h3>
                    <p className="text-text/70 text-sm leading-relaxed">{feat.description}</p>
                  </div>
                  <div className="shrink-0 order-1 sm:order-2 lg:order-1 xl:order-2 bg-white shadow-md p-4 rounded-full border border-surface/50 text-blue-500">
                    <feat.icon className="w-8 h-8" />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Desktop Right Column */}
          <div className="hidden lg:flex flex-col gap-12 w-full lg:w-1/3 order-3 z-10">
            {features.slice(3, 6).map((feat, idx) => (
              <ScrollReveal direction="left" delay={idx * 0.15} key={`desktop-right-${feat.title}`}>
                <div className="flex flex-col items-center text-center gap-4 sm:flex-row lg:flex-col lg:pl-4 lg:text-left xl:flex-row">
                  <div className="shrink-0 bg-white shadow-md p-4 rounded-full border border-surface/50 text-blue-500">
                    <feat.icon className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-primary-dark mb-2">{feat.title}</h3>
                    <p className="text-text/70 text-sm leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
