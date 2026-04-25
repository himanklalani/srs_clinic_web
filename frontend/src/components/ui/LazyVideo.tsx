"use client";

import { useRef, useState, useEffect } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
  objectPosition?: string;
}

/**
 * LazyVideo — Only starts downloading/playing when the element
 * enters the viewport (with a 200px root margin for early start).
 * Shows a subtle shimmer placeholder while loading.
 * 
 * Mobile optimizations:
 * - Serves lower-resolution videos on mobile via Cloudinary transforms
 * - Pauses videos when out of viewport to save CPU/GPU/battery
 * - Uses preload="none" on mobile to prevent bandwidth contention
 */
export default function LazyVideo({ src, className = "", objectPosition = "object-center" }: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Optimize Cloudinary video URL for mobile — serve at 480px width
  const optimizedSrc = isMobile
    ? src.replace('/upload/', '/upload/w_480,q_auto/')
    : src;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            if (!isRendered) setIsRendered(true);
            // Play video if it's already rendered and paused
            if (videoRef.current && videoRef.current.paused) {
                videoRef.current.play().catch(() => {}); // Catch DOMException if playback fails
            }
        } else {
            // Pause video to save massive CPU/GPU on mobile when out of view
            if (videoRef.current && !videoRef.current.paused) {
                videoRef.current.pause();
            }
        }
      },
      // Tighter margin on mobile so videos load closer to viewport (saves bandwidth)
      { rootMargin: isMobile ? "150px 0px" : "300px 0px" } 
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isRendered, isMobile]);

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full ${className}`}>
      {/* Shimmer placeholder while video loads */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-surface to-primary/10 animate-pulse" />
      )}

      {/* Only attach the video to DOM once it comes near viewport */}
      {isRendered && (
        <video
          ref={videoRef}
          src={optimizedSrc}
          autoPlay
          loop
          muted
          playsInline
          preload={isMobile ? "none" : "metadata"}
          onCanPlay={() => setIsLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${objectPosition} ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
