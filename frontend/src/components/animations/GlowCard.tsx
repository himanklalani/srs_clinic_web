"use client";

import { useRef, useState } from "react";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className = "" }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl bg-white border border-primary-light/30 transition-all duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => {
        /* scale handled via CSS active state */
      }}
      style={{ transform: isHovered ? undefined : undefined }}
    >
      {/* Glow effect — desktop only */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hidden [@media(pointer:fine)]:block"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, rgba(124, 58, 237, 0.15), transparent 60%)`,
        }}
      />
      {/* Mobile tap scale */}
      <div className="[@media(pointer:fine)]:contents active:scale-[1.02] transition-transform duration-200">
        {children}
      </div>
    </div>
  );
}
