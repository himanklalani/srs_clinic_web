"use client";

import Script from 'next/script';
import { useCookieConsent } from '@/context/CookieConsentContext';

const GA_MEASUREMENT_ID = 'G-4R8VZE70PT';

export default function GoogleAnalytics() {
  const { consent } = useCookieConsent();

  // If user hasn't explicitly consented to analytics, render nothing to remain GDPR compliant
  if (!consent.analytics) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
