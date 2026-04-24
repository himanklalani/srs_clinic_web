"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
  tag?: "h1" | "h2" | "h3" | "p" | "span";
  onComplete?: () => void;
}

export default function SplitText({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.08,
  duration = 0.7,
  tag = "h1",
  onComplete,
}: SplitTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");
  const Tag = tag;

  return (
    <Tag ref={ref} className={`flex flex-wrap ${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
            transition={{
              duration,
              delay: delay + i * staggerDelay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            onAnimationComplete={i === words.length - 1 ? onComplete : undefined}
            aria-hidden="true"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
