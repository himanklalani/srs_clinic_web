"use client";

import { useRef, useState } from "react";
import PageLink from "@/components/PageLink";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { X } from "lucide-react";

const GALLERY_IMAGES = [
  { src: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1775988820/IMG_2165_p4bref.avif", alt: "Advanced Dental Suite" },
  { src: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1775988820/IMG_2159_lcqzlh.avif", alt: "Modern Clinic Interior" },
  { src: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1775988820/IMG_2135_hxpsip.avif", alt: "Patient Comfort Area" },
  { src: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1775988819/fav6_id8c8y.avif", alt: "Sterilized Equipment" },
  { src: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1775988819/IMG_2208_hfrus5.avif", alt: "Consultation Room" },
  { src: "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1775988818/IMG_2222_wvrmim.avif", alt: "Professional Care" },
];

export default function GallerySection({ hideButton = false }: { hideButton?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Alternating row parallax speeds
  const y1 = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-28 bg-surface overflow-hidden"
      aria-label="Clinic gallery"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text mb-4">
              Our <span className="text-primary">Clinic</span>
            </h2>
            <p className="text-text/70 max-w-lg mx-auto text-sm sm:text-base">
              Take a virtual tour of our state-of-the-art dental facility.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {GALLERY_IMAGES.map((img, i) => {
            const yVal = i % 2 === 0 ? y1 : y2;
            return (
              <ScrollReveal key={i} delay={i * 0.06}>
                <motion.div
                  style={{ y: yVal }}
                  className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-square group cursor-pointer"
                  onClick={() => setSelectedImage(img.src)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/20 transition-colors duration-300" />
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {!hideButton && (
          <ScrollReveal>
            <div className="text-center mt-10">
              <PageLink
                href="/about"
                className="inline-flex items-center justify-center min-h-[44px] rounded-full border-2 border-primary text-primary font-medium px-6 py-2.5 hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                aria-label="View more clinic images"
              >
                View More
              </PageLink>
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Full-Screen Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-auto max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10 flex items-center justify-center cursor-default"
            >
              {/* Load original full-res Cloudinary image for the popup, using standard img tag to bypass Next.js container-size limits */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedImage}
                alt="Clinic Full Resolution"
                className="w-full h-full object-contain max-h-[85vh]"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md transition-colors border border-white/10 text-red-400 hover:text-red-300 z-10"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
