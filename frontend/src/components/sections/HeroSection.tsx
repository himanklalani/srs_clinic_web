import React from 'react';
import PageLink from '@/components/PageLink';
import HeroAnimator from '@/components/animations/HeroAnimator';

export default function HeroSection() {
  return (
    <HeroAnimator>
      <div 
        className="hero-image-wrapper absolute inset-0 w-full h-full overflow-hidden origin-center will-change-transform bg-[#1e0842]"
      >
        {/* We use an AV1 video directly instead of next/image, prioritizing the poster image for LCP using preload in layout. */}
        <video
          src="https://res.cloudinary.com/dswvmoboh/video/upload/q_auto/f_auto/v1775985264/SSclinic-.av1_corvyv.mp4"
          poster="https://res.cloudinary.com/dswvmoboh/video/upload/so_0,w_1280,q_auto,f_avif/v1775985264/SSclinic-.av1_corvyv.jpg"
          autoPlay
          loop
          muted
          playsInline
          // @ts-expect-error -- fetchPriority is a valid HTML attribute not yet in React types
          fetchPriority="high"
          className={`w-full h-full object-cover object-center transition-opacity duration-1000 opacity-100`}
        />
        {/* Soft dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 pointer-events-none" /> 
      </div>

      <div 
        className="hero-text-wrapper relative z-10 w-full h-full flex flex-col items-center justify-center px-4 text-center pointer-events-none"
      >
        <span className="text-white/90 uppercase tracking-[0.2em] text-[10px] sm:text-xs md:text-sm font-medium mb-4 sm:mb-6 animate-fade-in pointer-events-auto">
          Dr. Saachi Shingrani's Dental Clinic
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white max-w-5xl leading-[1.15] md:leading-[1.1] mb-6 sm:mb-8 font-instrument tracking-tight drop-shadow-md pointer-events-auto">
          A Smile That Goes<br className="hidden md:block" /> An Extra Mile
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-white/90 max-w-2xl font-light mb-8 sm:mb-10 mx-auto drop-shadow-md pointer-events-auto">
          Expert dental care with compassion and precision right in the heart of Mumbai.
        </p>
        
        <PageLink 
          href="/book"
          className="pointer-events-auto bg-white text-primary px-6 py-3 sm:px-8 sm:py-4 rounded-full font-medium text-base sm:text-lg hover:bg-surface hover:scale-105 transition-all duration-300 shadow-xl"
        >
          Book Your Consultation
        </PageLink>
      </div>
    </HeroAnimator>
  );
}
