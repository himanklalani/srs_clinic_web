import HeroSection from '@/components/sections/HeroSection';
import AboutDoctorSection from '@/components/sections/AboutDoctorSection';
import TreatmentsGridSection from '@/components/sections/TreatmentsGridSection';
import StatsSection from '@/components/sections/StatsSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import GallerySection from '@/components/sections/GallerySection';
import LocationSection from '@/components/sections/LocationSection';
import dynamic from 'next/dynamic';
const ZoomParallax = dynamic(() => import('@/components/ui/zoom-parallax').then(mod => mod.ZoomParallax));
import DisplayCards from '@/components/ui/display-cards';
import { Sparkles, Shield, Heart, Clock } from "lucide-react";

export default function HomeClient() {
  const clinicImages: any[] = [
    { src: 'https://res.cloudinary.com/dswvmoboh/image/upload/q_100/f_auto/v1775983401/Untitled_design_nmymxg.png', alt: 'Dr. Saachi Shingrani - Centre' },
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
      description: "Laser dentistry & 3D scanning",
      date: "State-of-the-Art",
      iconClassName: "text-primary",
      titleClassName: "text-primary",
      className: "[grid-area:stack] translate-x-0 translate-y-0 rotate-0 opacity-100 scale-100 shadow-none transition-all duration-700 md:hover:-translate-y-10 md:before:absolute md:before:w-[100%] md:before:outline-1 md:before:rounded-xl md:before:outline-border md:before:h-[100%] md:before:content-[''] md:before:bg-blend-overlay md:before:bg-background/50 md:grayscale-[100%] md:hover:before:opacity-0 md:before:transition-opacity md:before:duration-700 md:hover:grayscale-0 md:before:left-0 md:before:top-0",
    },
    {
      icon: <Heart className="size-4 text-primary" />,
      title: "Painless Care",
      description: "Compassionate, gentle approach",
      date: "Anxiety-Free",
      iconClassName: "text-primary",
      titleClassName: "text-primary",
      className: "[grid-area:stack] translate-x-6 translate-y-20 rotate-0 opacity-100 scale-100 shadow-sm transition-all duration-700 md:translate-x-12 md:translate-y-10 md:hover:-translate-y-1 md:before:absolute md:before:w-[100%] md:before:outline-1 md:before:rounded-xl md:before:outline-border md:before:h-[100%] md:before:content-[''] md:before:bg-blend-overlay md:before:bg-background/50 md:grayscale-[100%] md:hover:before:opacity-0 md:before:transition-opacity md:before:duration-700 md:hover:grayscale-0 md:before:left-0 md:before:top-0",
    },
    {
      icon: <Clock className="size-4 text-primary" />,
      title: "Efficient",
      description: "Zero wait times & swift procedures",
      date: "Respecting your time",
      iconClassName: "text-primary",
      titleClassName: "text-primary",
      className: "[grid-area:stack] translate-x-12 translate-y-40 rotate-0 z-30 scale-100 shadow-xl transition-all duration-700 md:translate-x-24 md:translate-y-20 md:hover:translate-y-10",
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
        <span className="section-label mb-3">State of the Art</span>
        <div className="divider-violet w-32 md:w-64" />
      </div>

      {/* Full Screen Cinematic Zoom Parallax */}
      <div className="-mt-16 md:mt-0 relative z-10">
        <ZoomParallax images={clinicImages} />
      </div>

      {/* Atmospheric transition OUT */}
      <div className="w-full py-12 md:py-20 relative z-20 flex flex-col items-center justify-center -mt-8 md:-mt-16 bg-gradient-to-b from-transparent to-background">
        <div className="orb orb-lavender w-96 h-96 opacity-20 absolute top-10" />
        <div className="divider-violet w-48 md:w-96 mb-6" />
        <div className="pill shadow-sm glass">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-primary-dark tracking-wide">Immersive Environment</span>
        </div>
      </div>

      {/* Why Choose Us - Display Cards Area */}
      <section className="py-12 md:py-24 bg-background relative overflow-hidden z-10 flex flex-col md:flex-row items-center justify-center gap-16 px-4">
        <div className="max-w-xl text-center md:text-left">
          <span className="text-primary font-medium tracking-widest text-sm uppercase mb-3 block">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-semibold text-text mb-6">Redefining Dental Standards.</h2>
          <p className="text-lg text-text/70">From the moment you walk in, experience a seamless blend of luxury, advanced medical technology, and profound empathy.</p>
        </div>
        <div className="w-full max-w-sm flex justify-center">
          <DisplayCards cards={valueCards} />
        </div>
      </section>
      
      {/* 5. Testimonials Section */}
      <StatsSection />
      <TestimonialsSection />
      <GallerySection />
      <LocationSection />
    </>
  );
}
