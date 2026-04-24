"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Do not SSR this layout shift, and only render dynamically when NOT on home or blogs parent
  if (!mounted || pathname === "/") return null;

  return (
    <button 
      onClick={() => router.back()}
      className="fixed top-24 md:top-28 left-4 md:left-8 z-40 bg-white/90 backdrop-blur-md shadow-md border border-surface/50 text-text/70 hover:text-primary hover:scale-105 p-3 rounded-full transition-all duration-300 flex items-center justify-center group"
      aria-label="Go back"
    >
      <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-1" />
    </button>
  );
}
