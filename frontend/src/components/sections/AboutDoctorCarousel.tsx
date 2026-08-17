"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ABOUT_IMAGES = [
  {
    src: "https://res.cloudinary.com/dswvmoboh/image/upload/f_auto,q_auto/v1786965682/IMG_2472_a75i6q.avif",
    alt: "Dr. Saachi Shingrani's Dental Care Clinic",
  },
  {
    src: "https://res.cloudinary.com/dswvmoboh/image/upload/f_auto,q_auto/v1786965681/IMG_2473_nkm6c3.avif",
    alt: "SRS Dental Care - Treatment Room",
  },
  {
    src: "https://res.cloudinary.com/dswvmoboh/image/upload/f_auto,q_auto/v1786965681/IMG_2470_crq3c3.avif",
    alt: "Modern Dental Clinic in Bandra, Mumbai",
  },
];

export default function AboutDoctorCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % ABOUT_IMAGES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 w-full relative rounded-xl overflow-hidden shadow-lg" style={{ minHeight: "260px" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={ABOUT_IMAGES[active].src}
            alt={ABOUT_IMAGES[active].alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-xl"
            priority={active === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {ABOUT_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === active ? "bg-white scale-125 shadow" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
