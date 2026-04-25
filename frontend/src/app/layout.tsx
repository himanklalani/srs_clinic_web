import type { Metadata } from "next";
import { Inter, Playfair_Display, Instrument_Serif } from "next/font/google";
import ClientProviders from "@/components/providers/ClientProviders";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TransitionProvider } from '@/components/providers/TransitionProvider';
import { BackButton } from '@/components/ui/BackButton';
import FloatingContactButtons from "@/components/ui/FloatingContactButtons";
import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Dr. Saachi Shingranis Dental Clinic",
    default: "Dr. Saachi Shingranis Dental Clinic | Your Smile, Our Priority",
  },
  description: "Experience world-class dental care with a gentle touch at Dr. Saachi Shingrani's Dental Clinic in Mumbai.",
  keywords: ["dentist", "dental clinic", "teeth whitening", "Mumbai dentist"],
};

import { AnimatedNavFramer } from "@/components/ui/navigation-menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Preconnect to Cloudinary CDN for faster asset loading */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {/* Preload hero poster image for fast LCP */}
        <link
          rel="preload"
          href="https://res.cloudinary.com/dswvmoboh/video/upload/so_0,w_1280,q_auto,f_avif/v1775985264/SSclinic-.av1_corvyv.jpg"
          as="image"
          type="image/avif"
          fetchPriority="high"
        />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${instrument.variable} antialiased flex flex-col min-h-screen text-text bg-background relative selection:bg-primary/20 overflow-x-hidden`.trim()}>
        
        {/* Soft Pastel Gradient Blobs Background */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#faf8f5]">
          <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-surface blur-[120px] opacity-50 animate-blob will-change-transform" />
          <div className="absolute top-[20%] right-[0%] w-[40vw] h-[40vw] rounded-full bg-[#f3e8ff] blur-[100px] opacity-50 animate-blob animation-delay-2000 will-change-transform" />
          <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-[#fae8ff] blur-[120px] opacity-40 animate-blob animation-delay-4000 will-change-transform" />
        </div>

        <ClientProviders>
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:p-4 focus:bg-white focus:text-primary focus:font-bold focus:shadow-md transition-all"
          >
            Skip to main content
          </a>
          
          <AnimatedNavFramer />
          
          <main id="main-content" className="flex-grow z-10 relative">
            <TransitionProvider>
              <BackButton />
              {children}
            </TransitionProvider>
          </main>
          <Footer />
          <FloatingContactButtons />
          <CookieBanner />
          <GoogleAnalytics />
        </ClientProviders>
      </body>
    </html>
  );
}
