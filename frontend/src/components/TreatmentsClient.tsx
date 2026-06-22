"use client";

import { useTransition } from "@/components/providers/TransitionProvider";
import PageLink from '@/components/PageLink';
import Link from 'next/link';
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import { Smile, Activity, Crown, Sparkles, Baby, Leaf, Palette, CalendarCheck, Shield, HeartPulse, Stethoscope, Syringe, Zap } from 'lucide-react';
import DentalFeaturesSection from "@/components/sections/DentalFeaturesSection";
import dynamic from 'next/dynamic';
const TextRoll = dynamic(() => import('@/components/ui/text-roll').then(mod => mod.TextRoll));
import {
  ImageComparison,
  ImageComparisonImage,
  ImageComparisonSlider
} from "@/components/ui/image-comparison";
import { AnimatePresence, motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import { treatmentsData } from "@/lib/data/treatments";

const marqueeData = [
  { question: "Best dental clinic in Bandra?", slug: "best-dental-clinic-in-bandra-what-to-look-for" },
  { question: "How much do invisible aligners cost in Mumbai?", slug: "how-much-do-invisible-aligners-cost-in-mumbai" },
  { question: "Is teeth whitening safe for enamel?", slug: "is-teeth-whitening-safe-for-enamel" },
  { question: "Where can I get a painless root canal?", slug: "where-can-i-get-a-painless-root-canal-in-bandra" },
  { question: "What to expect during full mouth rehab?", slug: "what-to-expect-during-full-mouth-rehab" },
  { question: "How long do dental implants last?", slug: "how-long-do-dental-implants-last" },
  { question: "Best pediatric dentist near me?", slug: "best-pediatric-dentist-near-me-a-parents-guide" },
  { question: "Can cosmetic dentistry fix a gummy smile?", slug: "can-cosmetic-dentistry-fix-a-gummy-smile" },
  { question: "What is the recovery time for wisdom tooth surgery?", slug: "what-is-the-recovery-time-for-wisdom-tooth-surgery" },
  { question: "Are ceramic braces better than metal?", slug: "are-ceramic-braces-better-than-metal" },
  { question: "How to fix bleeding gums naturally?", slug: "how-to-fix-bleeding-gums-naturally" },
  { question: "Emergency dental clinic open now in Bandra?", slug: "emergency-dental-clinic-open-now-in-bandra" },
];

const seoFeatures = [
  {
    description: "No pain, just comfort — experience our signature gentle touch for all your dental needs.",
    icon: Shield,
    title: "Painless Treatments",
  },
  {
    description: "Our specialists bring years of expertise and international protocols right to your smile.",
    icon: Stethoscope,
    title: "Expert Specialists",
  },
  {
    description: "From 3D scanners to laser dentistry, we use the latest technology for precise results.",
    icon: Zap,
    title: "State-of-the-Art Clinic",
  },
  {
    description: "From your first consultation to your final follow-up, we are with you every step of the way.",
    icon: HeartPulse,
    title: "Comprehensive Care",
  },
];

const BEFORE_AFTER_PAIRS = [
  { before: "", after: "" }, // 0: Smile Design
  { 
    before: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779952394/copy_of_img_1456_yqfusi.heic", 
    after: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779953394/IMG_1441_xrzlbm.heic" 
  }, // 1: Teeth Whitening
  { 
    before: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1781958221/Untitled_design_8_mlx0xp.png", 
    after: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1781958221/Untitled_design_9_vlxwjp.png" 
  }, // 2: Implants
  { // 3: Aligners & Braces
    before: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779952235/IMG_0992_vow8gg.heic",
    after: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779952072/after_a_b_pkbkea.heic"
  },
  { // 4: Full Mouth Rehab
    before: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779950607/fmg_after_pnqadw.png",
    after:  "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779950606/fmh_before_lzmnze.png",
  },
  { 
    before: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779952763/Untitled_design_3_iqtn8x.png", 
    after: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779952763/Untitled_design_2_dgnbgf.png" 
  }, // 5: Pediatric
  { 
    before: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779953726/IMG_1759_sm3cbi.heic", 
    after: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779953772/IMG_1743_bxrvlp.heic",
    single: ""
  }, // 6: Cosmetic Dentistry
  { 
    before: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779953908/IMG_4462_tbwz0r.jpg", 
    after: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779953907/IMG_7728_sqaa60.jpg",
    single: ""
  }, // 7: Dentures
  { 
    before: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779954013/IMG_4353_d0l9go.heic", 
    after: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779954013/IMG_1829_emkjsf.jpg",
    single: ""
  }, // 8: Geriatric
  { 
    before: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779953239/IMG_0052_oneqip.heic", 
    after: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779953238/IMG_9605_yrsvm4.heic",
    single: ""
  }, // 9: Diagnosis of Oral Lesions
  { 
    before: "", 
    after: "", 
    single: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1779953151/37D41653-0775-4AAE-9998-96BF037F70B6_xeclpj.jpg" 
  }, // 10: Wisdom Tooth Surgery
  { 
    before: "", 
    after: "",
    single: ""
  }, // 11: Crowns and Bridges
  {
    before: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1781957292/copy_of_dental_cleaning1_siotd3.jpg",
    after: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1781957491/copy_of_dentalcleaning2_dq1qgn.jpg",
    single: ""
  }, // 12: Dental Cleaning
];

const TREATMENTS_DATA = [
  { slug: 'full-mouth-rehab', icon: Shield,     title: 'Full Mouth Rehab',   description: 'Comprehensive restoration of your oral health and aesthetics.',          pair: 4 },
  { slug: 'teeth-whitening', icon: Sparkles,   title: 'Teeth Whitening',    description: 'Brighten your smile with our safe, effective whitening procedures.',       pair: 1 },
  { slug: 'dental-implants', icon: Crown,      title: 'Implants',           description: 'Restore missing teeth with durable, natural-looking implants.',            pair: 2 },
  { slug: 'aligners-and-braces', icon: Activity,   title: 'Aligners & Braces',  description: 'Invisible, comfortable alignment solutions tailored for both teens and adults.', pair: 3 },
  { slug: 'smile-design', icon: Palette,    title: 'Smile Design',       description: 'Custom smile makeovers tailored to your unique facial features.',         pair: 0 },
  { slug: 'pediatric-dentistry', icon: Baby,       title: 'Pediatric',          description: 'Gentle, anxiety-free dental care designed exclusively for our youngest patients.', pair: 5 },
  { slug: 'cosmetic-dentistry', icon: Sparkles,   title: 'Cosmetic Dentistry', description: 'Enhance aesthetics with veneers, bonding, and smile redesigns.',          pair: 6 },
  { slug: 'dentures', icon: Activity,   title: 'Dentures',           description: 'High-quality, comfortable dentures to restore function and confidence.',   pair: 7 },
  { slug: 'geriatric-dentistry', icon: HeartPulse, title: 'Geriatric',          description: 'Specialized dental care focused on the unique needs of older adults.',     pair: 8 },
  { slug: 'diagnosis-of-oral-lesions', icon: Stethoscope,title: 'Diagnosis of Oral Lesions', description: 'Expert diagnosis and treatment of oral lesions and mucosal diseases.', pair: 9 },
  { slug: 'wisdom-tooth-surgery', icon: Syringe,    title: 'Wisdom Tooth Surgery', description: 'Safe, painless extraction of impacted wisdom teeth by specialists.', pair: 10 },
  { slug: 'crowns-and-bridges', icon: Crown,      title: 'Crowns and Bridges', description: 'Restore damaged or missing teeth with durable, custom-fitted crowns.', pair: 11 },
  { slug: 'dental-cleaning', icon: Sparkles,   title: 'Dental Cleaning',    description: 'Professional cleaning and polishing for a healthy, plaque-free smile.', pair: 12 },
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="text-primary font-medium tracking-widest text-xs uppercase mb-3 block">What We Offer</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold text-text mb-4">
              Our Treatments
            </h1>
            <p className="text-text/70 max-w-2xl mx-auto text-sm sm:text-base">
              Comprehensive dental solutions for every need — each backed by the latest technology and a compassionate approach.
            </p>
          </motion.div>

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
            {TREATMENTS_DATA.map((t, idx) => {
              const pair = BEFORE_AFTER_PAIRS[t.pair];
              return (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (idx % 4) * 0.1, ease: "easeOut" }}
                  key={t.title}
                  className="bg-white rounded-2xl shadow-sm border border-surface/50 overflow-hidden flex flex-col hover:shadow-md transition-shadow group h-full cursor-pointer relative"
                >
                  {/* Before / After Slider or Single Image */}
                  <div className="w-full rounded-t-2xl overflow-hidden border-b border-primary/10 relative">
                    {pair.single ? (
                      <Link href={`/treatments/${t.slug}`} className="aspect-[4/3] w-full relative block">
                        <img 
                          src={pair.single} 
                          alt={t.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          decoding="async"
                        />
                      </Link>
                    ) : pair.before && pair.after ? (
                      <>
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
                      </>
                    ) : (
                      <Link href={`/treatments/${t.slug}`} className="aspect-[4/3] w-full bg-surface flex items-center justify-center">
                        <span className="text-[10px] text-primary/40 uppercase tracking-widest font-medium">Coming Soon</span>
                      </Link>
                    )}
                  </div>

                  {/* Card Content */}
                  <Link href={`/treatments/${t.slug}`} className="p-3 sm:p-5 flex flex-col items-center text-center flex-1">
                    <t.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2 sm:mb-3 mt-1 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-sm sm:text-base font-semibold text-text mb-1 sm:mb-2 leading-tight group-hover:text-primary transition-colors">{t.title}</h3>
                    <p className="text-text/60 text-[10px] sm:text-xs leading-relaxed line-clamp-3">{t.description}</p>
                    <span className="mt-auto pt-3 text-[10px] font-semibold text-primary uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Learn More</span>
                  </Link>
                </motion.div>
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

      {/* SEO & FAQ Marquee Section */}
      <section className="relative bg-[#f5f0ff] py-20 sm:py-28 overflow-hidden border-t border-primary/10">
        
        {/* Decorative background blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto flex max-w-3xl flex-col items-center justify-center gap-5 px-6 text-center mb-12 sm:mb-16"
          >
            <div className="pill">
              <span>Questions We Hear Every Day</span>
            </div>
            <h2 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-primary-dark leading-tight">
              Removing the roadblocks to your perfect smile
            </h2>
            <p className="text-text/60 text-base sm:text-lg max-w-xl leading-relaxed">
              We filter out the noise and focus on what truly matters giving you the clarity and confidence to take the next step for your smile.
            </p>
          </motion.div>

          {/* Marquee rows — 3 rows, alternating direction, no pause, perfect CSS mask fade */}
          <div 
            className="relative w-full overflow-hidden py-4 space-y-3 sm:space-y-6"
            style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
          >
            {/* Row 1 — left */}
            <Marquee className="[--duration:38s] [--gap:0.5rem] sm:[--gap:1rem]" repeat={5}>
              {marqueeData.slice(0, 4).map((q) => (
                <Link
                  href={`/blogs/${q.slug}`}
                  key={q.slug}
                  className="flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 text-primary-dark text-xs sm:text-sm font-medium whitespace-nowrap shadow-sm hover:bg-white transition-colors cursor-pointer shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                  {q.question}
                </Link>
              ))}
            </Marquee>

            {/* Row 2 — right */}
            <Marquee className="[--duration:48s] [--gap:0.5rem] sm:[--gap:1rem]" repeat={5} reverse>
              {marqueeData.slice(4, 8).map((q) => (
                <Link
                  href={`/blogs/${q.slug}`}
                  key={q.slug}
                  className="flex items-center gap-2 rounded-full border border-accent/30 bg-primary/5 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 text-primary-dark text-xs sm:text-sm font-medium whitespace-nowrap shadow-sm hover:bg-primary/10 transition-colors cursor-pointer shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                  {q.question}
                </Link>
              ))}
            </Marquee>

            {/* Row 3 — left */}
            <Marquee className="[--duration:43s] [--gap:0.5rem] sm:[--gap:1rem]" repeat={5}>
              {marqueeData.slice(8, 12).map((q) => (
                <Link
                  href={`/blogs/${q.slug}`}
                  key={q.slug}
                  className="flex items-center gap-2 rounded-full border border-primary/15 bg-white/70 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 text-primary-dark text-xs sm:text-sm font-medium whitespace-nowrap shadow-sm hover:bg-white transition-colors cursor-pointer shrink-0"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/30 shrink-0" />
                  {q.question}
                </Link>
              ))}
            </Marquee>
          </div>

          {/* Feature grid */}
          <div className="mx-auto max-w-7xl mt-16 sm:mt-20 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-dashed border-primary/20 rounded-2xl overflow-hidden">
              {seoFeatures.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
                    key={feature.title}
                    className="group flex flex-col gap-4 p-6 sm:p-8 bg-white/50 hover:bg-white/90 transition-all duration-300 border-b border-dashed border-primary/20 last:border-b-0 sm:[&:nth-child(2)]:border-b lg:border-b-0 lg:[&:not(:last-child)]:border-r"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-2 pt-2 sm:pt-4">
                      <h3 className="font-semibold text-base sm:text-lg tracking-tight text-primary-dark">
                        {feature.title}
                      </h3>
                      <p className="leading-relaxed text-text/60 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SEO Treatments Overview Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-semibold text-primary-dark mb-4">
              Comprehensive Treatment Details
            </h2>
            <p className="text-text/70 text-sm sm:text-base max-w-2xl mx-auto">
              Explore our clinical expertise across a wide range of specialized dental procedures in Mumbai.
            </p>
          </motion.div>

          <div className="space-y-16">
            {treatmentsData.map((treatment, idx) => (
              <motion.div 
                key={treatment.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="group relative"
              >
                {/* Decorative side line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/30 to-transparent rounded-full" />
                
                <div className="pl-6 sm:pl-10">
                  <h3 className="text-2xl sm:text-3xl font-playfair font-semibold text-primary-dark mb-4">
                    {treatment.title}
                  </h3>
                  
                  <div className="prose prose-sm sm:prose-base text-text/80 max-w-none space-y-4">
                    <p className="font-medium text-primary/80 text-lg border-b border-primary/10 pb-4 inline-block">
                      {treatment.shortDescription}
                    </p>
                    
                    <div className="space-y-4 mt-4">
                      {treatment.fullDescription.map((para, pIdx) => (
                        <p key={pIdx} className="leading-relaxed">
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Quick Benefits list for SEO depth */}
                    <div className="mt-6 pt-4">
                      <h4 className="text-sm font-semibold tracking-wider text-text uppercase mb-3">Key Benefits</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 m-0 p-0 list-none">
                        {treatment.benefits.slice(0, 4).map((benefit, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2 text-sm text-text/70">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link 
                      href={`/treatments/${treatment.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                    >
                      Read full procedure & FAQs
                      <span className="text-lg">→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
