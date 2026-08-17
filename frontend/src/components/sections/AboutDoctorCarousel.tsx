"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
      {/* All images rendered in DOM simultaneously — they all preload in parallel */}
      {ABOUT_IMAGES.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-xl"
            priority={i === 0}
          />
        </div>
      ))}

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
