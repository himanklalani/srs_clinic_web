import PageLink from "@/components/PageLink";
import CookieSettingsTrigger from "@/components/CookieSettingsTrigger";
import { FaInstagram, FaFacebookF, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-surface border-t-4 border-t-primary pt-12 pb-6 md:pt-16 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Responsive Grid: 1 col (mobile) -> 2 col (tablet) -> 4 col (desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-12 mb-12">
          
          {/* Column 1: Brand & Tagline */}
          <div className="flex flex-col space-y-4">
          <PageLink href="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md">
              <img
                src="https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1775975864/03b2bf11-e510-43ef-96cd-872fde8826b1_yhsftd.png"
                alt="Dr. Saachi Shingrani Dental Clinic"
                className="h-24 sm:h-28 md:h-36 w-auto object-contain max-w-[280px]"
              />
            </PageLink>
            <p className="text-text/80 leading-relaxed mt-2 text-[15px]">
              Your smile is our priority. Experience world-class dental care with a gentle touch.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://www.instagram.com/srsdentalcare/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm hover:shadow hover:-translate-y-1 hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/people/DrSaachi-Shingranis-Dental-Care/100063586435589/#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary shadow-sm hover:shadow hover:-translate-y-1 hover:bg-primary hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-surface"
                aria-label="Facebook"
              >
                <FaFacebookF size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick PageLinks */}
          <div>
            <h3 className="text-lg font-semibold text-text mb-4 lg:mb-6 font-serif tracking-wide border-b border-primary-light pb-2 inline-block">
              Quick PageLinks
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Treatments", href: "/treatments" },
                { label: "Health Blogs", href: "/blogs" },
                { label: "Book Appointment", href: "/book" }
              ].map((link) => (
                <li key={link.href}>
                  <PageLink
                    href={link.href}
                    className="text-text/80 hover:text-primary transition-colors flex items-center gap-2 group min-h-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </PageLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold text-text mb-4 lg:mb-6 font-serif tracking-wide border-b border-primary-light pb-2 inline-block">
              Working Hours
            </h3>
            <ul className="space-y-4 text-text/80 text-[15px]">
              <li className="flex justify-between items-center bg-white px-3 py-2 rounded-md shadow-sm border border-primary-light/30">
                <span className="font-medium">Mon - Sat</span>
                <span className="text-primary font-semibold">10:00 AM - 8:00 PM</span>
              </li>
              
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-text mb-4 lg:mb-6 font-serif tracking-wide border-b border-primary-light pb-2 inline-block">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary mt-1 shrink-0" size={18} />
                <span className="text-text/80 text-[15px] leading-relaxed">
                    Dr. Saachi Shingrani&apos;s, B-1 Nutan Nagar Society,<br />
                    Gurunanak Rd, opposite Bandra Talao,<br />
                    Bandra West, Mumbai 400050.
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-primary shrink-0" size={18} />
                <a href="tel:+919004402797" className="text-text/80 hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm min-h-[32px] min-w-[44px] flex items-center">
                  +91 90044 02797
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary shrink-0" size={18} />
                <a href="mailto:srsdentalcare@gmail.com" className="text-text/80 hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm min-h-[32px] min-w-[44px] flex items-center break-all">
                  srsdentalcare@gmail.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 pt-6 mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-text/60 text-sm text-center md:text-left">
              &copy; 2025 Dr. Saachi Shingrani&apos;s Dental Clinic. All rights reserved.
            </p>
            <p className="text-text/50 text-[11px] font-bold text-center md:text-left">
              Developed by <a href="mailto:himanklalani@gmail.com" className="hover:text-primary transition-colors underline decoration-primary/20 underline-offset-2">himanklalani@gmail.com</a>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-sm text-text/60">
            <PageLink href="/privacy-policy" className="hover:text-primary transition-colors min-h-[44px] md:min-h-0 flex items-center">Privacy Policy</PageLink>
            <CookieSettingsTrigger />
          </div>
        </div>

      </div>
    </footer>
  );
}
