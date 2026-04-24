"use client";

import { useCookieConsent } from "@/context/CookieConsentContext";

interface CookieSettingsTriggerProps {
  className?: string;
  children?: React.ReactNode;
}

export default function CookieSettingsTrigger({ className, children = "Cookie Settings" }: CookieSettingsTriggerProps) {
  const { openManagePreferences } = useCookieConsent();

  return (
    <button 
      onClick={openManagePreferences}
      className={className || "hover:text-primary transition-colors min-h-[44px] md:min-h-0 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"}
    >
      {children}
    </button>
  );
}
