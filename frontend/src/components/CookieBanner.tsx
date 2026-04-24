"use client";

import React, { useState, useEffect } from "react";
import { useCookieConsent } from "@/context/CookieConsentContext";
import { cookieCategories } from "@/lib/cookieConfig";
import { motion, AnimatePresence } from "framer-motion";
import PageLink from "@/components/PageLink";

export default function CookieBanner() {
  const { consent, showBanner, acceptAll, rejectNonEssential, updateConsent, saveConsent } = useCookieConsent();
  const [showPreferences, setShowPreferences] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !showBanner) return null;

  return (
    <div 
      role="dialog" 
      aria-labelledby="cookie-banner-title"
      aria-modal="true"
      className="fixed bottom-0 left-0 right-0 z-[9999] px-4 pb-4 pt-0 sm:p-4 pointer-events-none flex justify-center"
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-4xl bg-white border border-primary/20 shadow-2xl rounded-2xl overflow-hidden pointer-events-auto flex flex-col"
      >
        <div className="p-5 sm:p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="flex-1">
            <h2 id="cookie-banner-title" className="text-lg font-semibold text-text mb-2 font-serif">
              We Value Your Privacy
            </h2>
            <p className="text-sm text-text/80 leading-relaxed max-w-2xl">
              We use cookies to enhance your experience, serve personalized content, and analyze our traffic. 
              By clicking "Accept All", you consent to our use of cookies. 
              See our <PageLink href="/privacy-policy" className="text-primary hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm">Privacy Policy</PageLink>.
            </p>
          </div>

          {!showPreferences && (
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 shrink-0">
              <button
                onClick={() => setShowPreferences(true)}
                className="text-sm font-medium text-primary hover:text-primary-dark transition-colors px-4 py-2 sm:py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              >
                Manage Preferences
              </button>
              <button
                onClick={() => {
                  rejectNonEssential();
                  window.location.reload(); // Force reload to ensure CSP headers reflect new consent
                }}
                className="text-sm font-medium text-primary border border-primary hover:bg-primary/5 transition-colors px-6 py-2 sm:py-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto hover:shadow-sm"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={() => {
                  acceptAll();
                  window.location.reload(); // Force reload to ensure CSP headers reflect new consent
                }}
                className="text-sm font-medium text-white bg-primary hover:bg-primary-dark shadow-md shadow-primary/20 transition-all px-6 py-2 sm:py-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-full sm:w-auto"
              >
                Accept All
              </button>
            </div>
          )}
        </div>

        <AnimatePresence>
          {showPreferences && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-primary/10 overflow-hidden bg-surface/50"
            >
              <div className="p-5 sm:p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold text-text">Cookie Preferences</h3>
                  <button 
                    onClick={() => setShowPreferences(false)}
                    className="text-sm text-text/60 hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                  >
                    Close
                  </button>
                </div>
                
                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {cookieCategories.map((cat) => (
                    <div key={cat.id} className="flex items-start justify-between gap-4 p-4 rounded-xl bg-white border border-primary/10 shadow-sm">
                      <div className="flex-1 pr-4">
                        <div className="font-medium text-text mb-1">{cat.name}</div>
                        <div className="text-xs text-text/70 leading-relaxed">{cat.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0 min-h-[44px] min-w-[44px] justify-center">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={consent[cat.id as keyof typeof consent]}
                          disabled={cat.isRequired}
                          onChange={(e) => updateConsent(cat.id as keyof typeof consent, e.target.checked)}
                          aria-label={`Toggle ${cat.name} cookies`}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[12px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary opacity-100 peer-disabled:opacity-50"></div>
                        {cat.isRequired && <span className="sr-only">Required and always active</span>}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                  <button
                    onClick={() => {
                      rejectNonEssential();
                      window.location.reload();
                    }}
                    className="text-sm font-medium text-primary hover:bg-primary/5 transition-colors px-6 py-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-full sm:w-auto"
                  >
                    Reject Optional
                  </button>
                  <button
                    onClick={() => {
                      saveConsent();
                      window.location.reload();
                    }}
                    className="text-sm font-medium text-white bg-primary hover:bg-primary-dark shadow-md shadow-primary/20 transition-all px-6 py-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 w-full sm:w-auto"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
