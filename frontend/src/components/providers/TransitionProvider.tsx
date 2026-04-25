"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

interface TransitionContextType {
  navigate: (href: string) => void;
  isInitialLoad: boolean;
  isNavigating: boolean;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) throw new Error("useTransition must be used within TransitionProvider");
  return context;
};

const COLUMNS = 5;

export const TransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const controls = useAnimation();
  
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  // Initial load reveal -> slide down from 0% to 100%
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
      controls.start(i => ({
        y: "120%",
        transition: {
          duration: 0.5,
          ease: [0.76, 0, 0.24, 1],
          delay: i * 0.05, // Stagger left-to-right
        },
        transitionEnd: { display: "none" }
      }));
    }, 100);
    return () => clearTimeout(timer);
  }, [controls]);

  // When pathname actually changes after a router.push
  useEffect(() => {
    if (isNavigating) {
      // Small delay to ensure Next.js has mounted the new page
      const timer = setTimeout(() => {
        setIsNavigating(false);
        // Reveal the NEW page by sliding down from 0% to 120%
        controls.start(i => ({
          y: "120%",
          transition: {
            duration: 0.7,
            ease: [0.76, 0, 0.24, 1],
            delay: i * 0.08,
          },
          transitionEnd: { display: "none" }
        }));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pathname, isNavigating, controls]);

  const navigate = (href: string) => {
    if (href === pathname || isNavigating) return;
    
    setIsNavigating(true);
    
    // 1. Instantly reset blocks to top (-120%) and make visible
    controls.set({ y: "-120%", display: "block" });
    
    // 2. Animate down to cover the screen (0%)
    controls.start(i => ({
      y: "0%",
      transition: {
        duration: 0.7,
        ease: [0.76, 0, 0.24, 1],
        delay: (COLUMNS - 1 - i) * 0.08, // Stagger right-to-left
      }
    }));
    
    // 3. Trigger router push after blocks cover screen
    setTimeout(() => {
      router.push(href);
    }, 850);
  };

  return (
    <TransitionContext.Provider value={{ navigate, isInitialLoad, isNavigating }}>
      {children}
      
      {/* Staggered Column Curtain */}
      <div 
        className="fixed inset-0 z-[9999] pointer-events-none flex"
        aria-hidden="true"
      >
        {Array.from({ length: COLUMNS }).map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            animate={controls}
            initial={{ y: "0%" }} // Initially covers the page
            className="h-full bg-primary-dark w-full relative"
          >
            {/* White overlay line for extra flair */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10" />
          </motion.div>
        ))}
      </div>
      
      {/* Centered Logo for Initial Load only */}
      <AnimatePresence>
        {isInitialLoad && (
          <motion.div
            className="fixed inset-0 z-[10000] pointer-events-none flex items-center justify-center flex-col"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            key="loader-logo"
          >
             <div className="w-28 h-28 mb-6 flex items-center justify-center rounded-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.3)] border border-white/20">
                <img
                  src="https://res.cloudinary.com/dswvmoboh/image/upload/w_160,q_auto,f_auto/ce42deb6-628f-42c0-bfe0-584a1bd0c22d_fno5wf.png"
                  alt="Dr. Saachi Shingrani Logo"
                  className="w-20 h-20 object-contain drop-shadow-md"
                />
              </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-white tracking-tight leading-none drop-shadow-lg">
              Dr. Saachi Shingrani's Clinic
            </h1>
            <div className="h-0.5 w-16 bg-white/40 mx-auto mt-4 rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
};
