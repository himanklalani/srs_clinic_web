"use client";

import { useReducedMotion, motion, useInView, Variant } from "framer-motion";
import { useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  scale?: boolean;
}

const directionMap: Record<string, { x?: number; y?: number }> = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: { x: 0, y: 0 },
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  once = true,
  className = "",
  scale = false,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-20px" });
  const prefersReducedMotion = useReducedMotion();

  const offset = directionMap[direction] || { y: 40 };

  const hidden: Variant = {
    opacity: 0,
    ...offset,
    ...(scale && { scale: 0.85 }),
  };
  const visible: Variant = {
    opacity: 1,
    x: 0,
    y: 0,
    ...(scale && { scale: 1 }),
  };

  // If user prefers reduced motion, render children instantly with no animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={isInView ? visible : hidden}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
