"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { getCookie, setCookie, hasCookie } from 'cookies-next';
import { CookieConsentState, defaultConsentState } from '@/lib/cookieConfig';

interface CookieConsentContextType {
  consent: CookieConsentState;
  showBanner: boolean;
  /**
   * Accepts all cookie categories.
   */
  acceptAll: () => void;
  /**
   * Rejects all optional cookie categories (retains strictly_necessary).
   */
  rejectNonEssential: () => void;
  /**
   * Updates a specific cookie category consent state.
   */
  updateConsent: (category: keyof CookieConsentState, value: boolean) => void;
  /**
   * Saves the current consent state to the cookie and hides the banner.
   */
  saveConsent: () => void;
  /**
   * Reopens the cookie consent banner to manage preferences.
   */
  openManagePreferences: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsentLocal] = useState<CookieConsentState>(defaultConsentState);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // On mount, check if consent cookie exists
    if (!hasCookie('cookie_consent')) {
      setShowBanner(true);
    } else {
      try {
        const savedConsentStr = getCookie('cookie_consent') as string;
        if (savedConsentStr) {
          const parsed = JSON.parse(savedConsentStr);
          setConsentLocal({ ...defaultConsentState, ...parsed });
        }
      } catch (e) {
        console.error("Failed to parse cookie_consent", e);
        setShowBanner(true);
      }
    }
  }, []);

  const saveConsent = useCallback(() => {
    setCookie('cookie_consent', JSON.stringify(consent), {
      maxAge: 60 * 60 * 24 * 365, // 365 days
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });
    setShowBanner(false);
    
    // Dispatch custom event for 3rd party scripts that might listen for consent changes dynamically
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookie_consent_updated', { detail: consent }));
    }
  }, [consent]);

  const acceptAll = useCallback(() => {
    setConsentLocal({
      strictly_necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
    // Need to use functional state update or trigger save immediately after state updates
    // Set immediate cookie to avoid state closure race conditions
    const finalConsent = { strictly_necessary: true, functional: true, analytics: true, marketing: true };
    setCookie('cookie_consent', JSON.stringify(finalConsent), {
      maxAge: 60 * 60 * 24 * 365, path: '/', sameSite: 'strict', secure: process.env.NODE_ENV === 'production',
    });
    setShowBanner(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookie_consent_updated', { detail: finalConsent }));
    }
  }, []);

  const rejectNonEssential = useCallback(() => {
    setConsentLocal(defaultConsentState);
    setCookie('cookie_consent', JSON.stringify(defaultConsentState), {
      maxAge: 60 * 60 * 24 * 365, path: '/', sameSite: 'strict', secure: process.env.NODE_ENV === 'production',
    });
    setShowBanner(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('cookie_consent_updated', { detail: defaultConsentState }));
    }
  }, []);

  const updateConsent = useCallback((category: keyof CookieConsentState, value: boolean) => {
    if (category === 'strictly_necessary') return; // Cannot disable
    setConsentLocal((prev) => ({ ...prev, [category]: value }));
  }, []);

  const openManagePreferences = useCallback(() => {
    setShowBanner(true);
  }, []);

  // Avoid hydration mismatch by waiting until mounted (so children rendering matches server)
  // Actually, we can render children but the banner itself will conditionally render
  return (
    <CookieConsentContext.Provider value={{ consent, showBanner, acceptAll, rejectNonEssential, updateConsent, saveConsent, openManagePreferences }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}
