"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroAnimator({ children }: { children: React.ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    let mm = gsap.matchMedia();

    // Mobile — only run scroll animations if reduced motion is NOT preferred
    mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
      const imageNode = container.current?.querySelector('.hero-image-wrapper');
      const textNode = container.current?.querySelector('.hero-text-wrapper');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=60%", 
          scrub: true,
          pin: true,
        }
      });
      if (imageNode) tl.to(imageNode, { scale: 0.95, borderRadius: "1.5rem", ease: "power2.out" }, 0);
      if (textNode) tl.to(textNode, { y: -50, opacity: 0, scale: 0.95, ease: "power2.out" }, 0);
    });

    // Desktop/Tablet — only run scroll animations if reduced motion is NOT preferred
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const imageNode = container.current?.querySelector('.hero-image-wrapper');
      const textNode = container.current?.querySelector('.hero-text-wrapper');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "+=80%", 
          scrub: true,
          pin: true,
        }
      });
      if (imageNode) tl.to(imageNode, { scale: 0.85, borderRadius: "2rem", ease: "power2.out" }, 0);
      if (textNode) tl.to(textNode, { y: -100, opacity: 0, scale: 0.95, ease: "power2.out" }, 0);
    });

  }, { scope: container });

  return (
    <section
      ref={container}
      aria-label="Hero — A Smile That Goes An Extra Mile"
      className="relative w-full h-screen overflow-hidden bg-background"
    >
      {children}
    </section>
  );
}
