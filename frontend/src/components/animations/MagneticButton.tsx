"use client";

import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  maxDisplacement?: number;
}

export default function MagneticButton({
  children,
  className = "",
  maxDisplacement = 10,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isPointerFine, setIsPointerFine] = useState(false);
  
  const x = useSpring(0, { stiffness: 200, damping: 20 });
  const y = useSpring(0, { stiffness: 200, damping: 20 });

  // Check for pointer: fine on mount
  if (typeof window !== "undefined" && !isPointerFine) {
    const mq = window.matchMedia("(pointer: fine)");
    if (mq.matches) setIsPointerFine(true);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current || !isPointerFine) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = ((e.clientX - cx) / (rect.width / 2)) * maxDisplacement;
    const dy = ((e.clientY - cy) / (rect.height / 2)) * maxDisplacement;
    x.set(dx);
    y.set(dy);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
