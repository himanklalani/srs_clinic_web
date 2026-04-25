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
 */
export default function LazyVideo({ src, className = "", objectPosition = "object-center" }: LazyVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isRendered, setIsRendered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

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
            // Unmount video completely when out of view to free massive mobile GPU/CPU memory
            setIsRendered(false);
            setIsLoaded(false);
        }
      },
      // Keep rootMargin generous so it starts before user sees it, but unmounts when clearly away
      { rootMargin: "300px 0px" } 
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isRendered]);

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
          src={src}
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          preload="metadata"
          onCanPlay={() => setIsLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${objectPosition} ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}
