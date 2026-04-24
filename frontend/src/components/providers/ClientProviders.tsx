"use client";

import dynamic from "next/dynamic";
import { CookieConsentProvider } from "@/context/CookieConsentContext";


const SmoothScrollProvider = dynamic(() => import("@/components/providers/SmoothScrollProvider"), { ssr: false });
const ScrollProgressBar = dynamic(() => import("@/components/providers/ScrollProgressBar"), { ssr: false });
const TransitionProvider = dynamic(() => import("@/components/providers/TransitionProvider").then(mod => mod.TransitionProvider), { ssr: false });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <CookieConsentProvider>
      <TransitionProvider>
        <SmoothScrollProvider>
          <ScrollProgressBar />
          {children}
        </SmoothScrollProvider>
      </TransitionProvider>
    </CookieConsentProvider>
  );
}
