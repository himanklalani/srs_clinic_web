"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

interface LazyMountProps {
  children: React.ReactNode;
  minHeight?: string;
  rootMargin?: string;
}

export default function LazyMount({ 
  children, 
  minHeight = "300px", 
  rootMargin = "400px" 
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: rootMargin as any });

  return (
    <div ref={ref} style={{ minHeight: isInView ? 'auto' : minHeight }} className="w-full">
      {isInView ? children : null}
    </div>
  );
}
