"use client";

import HeroSection from '@/components/sections/HeroSection';
import AboutDoctorSection from '@/components/sections/AboutDoctorSection';
import dynamic from 'next/dynamic';
const TreatmentsGridSection = dynamic(() => import('@/components/sections/TreatmentsGridSection'));
const StatsSection = dynamic(() => import('@/components/sections/StatsSection'), { ssr: false });
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), { ssr: false });
const GallerySection = dynamic(() => import('@/components/sections/GallerySection'), { ssr: false });
const LocationSection = dynamic(() => import('@/components/sections/LocationSection'), { ssr: false });
const ZoomParallax = dynamic(() => import('@/components/ui/zoom-parallax').then(mod => mod.ZoomParallax), { ssr: false });
const StickyScrollCards = dynamic(() => import('@/components/ui/sticky-scroll-cards').then(mod => mod.StickyScrollCards), { ssr: false });
import LazyMount from '@/components/ui/LazyMount';
import { Sparkles, Shield, Heart, Clock, Smile } from "lucide-react";

export default function HomeClient() {
  const clinicImages: any[] = [
    
    { src: 'https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/w_800/v1775983401/Untitled_design_nmymxg.png', alt: 'Dr. Saachi Shingrani - Centre' },
    { type: 'video', src: 'https://res.cloudinary.com/dswvmoboh/video/upload/q_auto/f_auto/v1777055439/IMG_6550.av1_e8ygjq.mp4', alt: 'Clinic Video 1', objectPosition: 'object-top' },
    { type: 'video', src: 'https://res.cloudinary.com/dswvmoboh/video/upload/q_auto/f_auto/v1775930892/cc403ebd436c4631a351260f8aa7befd.av1_lnfbmg.mp4', alt: 'Clinic Video 2', objectPosition: 'object-[center_15%]' },
    { type: 'video', src: 'https://res.cloudinary.com/dswvmoboh/video/upload/q_auto/f_auto/v1775930895/IMG_7886.av1_zjpqee.mp4', alt: 'Clinic Video 3', objectPosition: 'object-center' },
    { type: 'video', src: 'https://res.cloudinary.com/dswvmoboh/video/upload/q_auto/f_auto/v1775930900/c679f61e35dc4aadabfc39cb9b411ada-_1_.av1_z7dwx3.mp4', alt: 'Clinic Video 4', objectPosition: 'object-[center_75%]' },
    { type: 'video', src: 'https://res.cloudinary.com/dswvmoboh/video/upload/q_auto/f_auto/v1775930897/IMG_0464.av1_yjhxsl.mp4', alt: 'Clinic Video 5', objectPosition: 'object-[center_35%]' },
    { type: 'video', src: 'https://res.cloudinary.com/dswvmoboh/video/upload/q_auto/f_auto/v1775930903/IMG_2154.av1_br2or9.mp4', alt: 'Clinic Video 6', objectPosition: 'object-[center_35%]' },
  ];

  const valueCards = [
    {
      icon: <Shield className="size-4 text-primary" />,
      title: "Advanced Tech",
      description: "Laser dentistry & 3D scanning for precise diagnostics.",
      date: "State-of-the-Art",
      rotation: "rotate-0",
      color: "var(--bg-surface)"
    },
    {
      icon: <Heart className="size-4 text-primary" />,
      title: "Painless Care",
      description: "Compassionate, gentle approach to every procedure.",
      date: "Anxiety-Free",
      rotation: "rotate-0",
      color: "var(--bg-section)"
    },
    {
      icon: <Clock className="size-4 text-primary" />,
      title: "Efficient",
      description: "Zero wait times & swift procedures that respect your schedule.",
      date: "Respecting your time",
      rotation: "rotate-0",
      color: "var(--bg-base)"
    },
    {
      icon: <Smile className="size-4 text-primary" />,
      title: "Personalized Smile Design",
      description: "Every treatment plan is tailored to your unique facial aesthetics.",
      date: "Crafted for You",
      rotation: "rotate-0",
      color: "var(--bg-surface)"
    },
  ];

  return (
    <>
      <HeroSection />

      <AboutDoctorSection />
      
      {/* 3. Treatments Section (Precision Treatments) */}
      <TreatmentsGridSection />

      {/* Atmospheric transition IN */}
      <div className="w-full relative z-20 flex flex-col items-center justify-center pointer-events-none -mb-12 md:mb-12 scale-90 md:scale-100 py-4">
        <div className="orb orb-violet w-72 h-72 opacity-25" />
        <span className="section-label mb-3">Video Testimonials</span>
        <div className="divider-violet w-32 md:w-64" />
      </div>

      {/* Full Screen Cinematic Zoom Parallax */}
      <LazyMount minHeight="200vh" rootMargin="200px">
        <div className="-mt-16 md:mt-0 relative z-10">
          <ZoomParallax images={clinicImages} />
        </div>
      </LazyMount>

      {/* Atmospheric transition OUT */}
      <div className="w-full py-12 md:py-20 relative z-20 flex flex-col items-center justify-center -mt-8 md:-mt-16 bg-gradient-to-b from-transparent to-background">
        <div className="orb orb-lavender w-96 h-96 opacity-20 absolute top-10" />
        <div className="divider-violet w-48 md:w-96 mb-6" />
        <div className="pill shadow-sm glass">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-primary-dark tracking-wide">Immersive Environment</span>
        </div>
      </div>

      {/* Why Choose Us - Scroll Cards Area */}
      <section className="bg-background relative z-10 w-full overflow-visible">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between w-full">
          {/* Sticky Left Content */}
          <div className="w-full md:w-1/2 sticky top-24 md:top-0 h-auto md:h-screen flex items-start md:items-center pt-2 md:pt-0 mb-8 md:mb-0 z-0 pointer-events-none">
            <div className="max-w-xl text-center md:text-left mx-auto">
              <span className="text-primary font-bold tracking-widest text-[10px] sm:text-sm uppercase mb-2 md:mb-3 block">Why Choose Us</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-semibold text-text mb-3 md:mb-6 md:leading-[1.1]">Redefining Dental Standards.</h2>
              <p className="text-sm md:text-lg text-text/70 max-w-md font-light leading-relaxed mx-auto md:mx-0">
                From the moment you walk in, experience a seamless blend of luxury, advanced medical technology, and profound empathy.
              </p>
            </div>
          </div>
          
          {/* Scrollable Right Cards */}
          <div className="w-full md:w-1/2 relative pb-8 md:pb-0">
             <LazyMount minHeight="300px" rootMargin="400px">
               <StickyScrollCards cards={valueCards} />
             </LazyMount>
          </div>
        </div>
      </section>
      
      {/* Bottom Sections */}
      <LazyMount minHeight="200px" rootMargin="400px">
        <StatsSection />
      </LazyMount>

      <LazyMount minHeight="600px" rootMargin="400px">
        <TestimonialsSection />
      </LazyMount>

      <LazyMount minHeight="800px" rootMargin="400px">
        <GallerySection />
      </LazyMount>

      <LazyMount minHeight="600px" rootMargin="400px">
        <LocationSection />
      </LazyMount>
    </>
  );
}
