import Image from "next/image";
import { UserCheck, ShieldCheck, HeartPulse, Star, MapPin, Zap, Plus, X } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

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

          {/* Mobile Accordion View */}
          <div className="lg:hidden w-full z-10 px-2 sm:px-0">
            <Accordion type="single" defaultValue={features[0].title} collapsible className="w-full space-y-3">
              {features.map((feat, idx) => (
                <ScrollReveal direction="up" delay={idx * 0.1} key={`mobile-${feat.title}`} className="w-full">
                  <AccordionItem value={feat.title} className="bg-white border border-primary/10 shadow-sm rounded-xl overflow-hidden data-[state=open]:border-primary/30 transition-colors">
                    <AccordionTrigger className="group px-4 py-3 sm:px-5 sm:py-4 hover:no-underline cursor-pointer [&>svg:last-child]:hidden border-b-0">
                      <div className="flex w-full items-center gap-3 min-w-0">
                        <div className="shrink-0 bg-primary/5 p-2 rounded-full text-primary group-data-[state=open]:bg-primary group-data-[state=open]:text-white transition-colors duration-300">
                          <feat.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <h3 className="text-[13px] sm:text-[15px] font-bold text-primary-dark leading-tight flex-1 text-left min-w-0 pr-2">{feat.title}</h3>
                        <div className="relative shrink-0 text-primary w-5 h-5 flex justify-center items-center ml-auto">
                          <Plus
                            strokeWidth={2.5}
                            className={cn(
                              "absolute transition-all duration-500 w-4 h-4 sm:w-5 sm:h-5",
                              "group-data-[state=open]:opacity-0 group-data-[state=closed]:opacity-100",
                              "group-data-[state=open]:rotate-180 group-data-[state=closed]:rotate-0"
                            )}
                          />
                          <X
                            strokeWidth={2.5}
                            className={cn(
                              "absolute transition-all duration-500 w-4 h-4 sm:w-5 sm:h-5",
                              "group-data-[state=closed]:opacity-0 group-data-[state=open]:opacity-100",
                              "group-data-[state=closed]:-rotate-180 group-data-[state=open]:rotate-0"
                            )}
                          />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0">
                      <div className="pl-11 sm:pl-14 text-text/70 text-[12px] sm:text-[13px] leading-relaxed pr-2">
                        {feat.description}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </ScrollReveal>
              ))}
            </Accordion>
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
