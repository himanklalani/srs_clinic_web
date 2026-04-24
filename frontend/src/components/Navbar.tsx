"use client";

import { useState, useEffect } from "react";
import PageLink from "@/components/PageLink";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Treatments", href: "/treatments" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close simple drawer when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-surface shadow-sm">
      <nav
        className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <PageLink
          href="/"
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md p-1 -ml-1"
        >
          <img
            src="https://res.cloudinary.com/dswvmoboh/image/upload/ce42deb6-628f-42c0-bfe0-584a1bd0c22d_fno5wf.png"
            alt="Dr. Saachi Shingrani Logo"
            className="w-9 h-9 object-contain flex-shrink-0"
          />
          <span className="font-serif font-bold text-lg sm:text-xl text-text tracking-tight group-hover:text-primary transition-colors">
            Dr. Saachi Shingrani
          </span>
        </PageLink>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <PageLink
                    href={link.href}
                    className={`font-medium text-[15px] transition-all duration-200 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md px-1 py-0.5 ${
                      isActive
                        ? "text-primary border-b-2 border-primary"
                        : "text-text"
                    }`}
                  >
                    {link.label}
                  </PageLink>
                </li>
              );
            })}
          </ul>

          <PageLink
            href="/book"
            className="bg-primary hover:bg-primary-dark transition-colors text-white font-medium rounded-full px-6 py-2.5 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
          >
            Book Appointment
          </PageLink>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="lg:hidden flex items-center justify-center min-h-[44px] min-w-[44px] rounded-md text-text hover:text-primary hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-haspopup="true"
          aria-label={isOpen ? "Close main menu" : "Open main menu"}
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white border-t border-surface shadow-inner ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-6">
          <ul className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <PageLink
                    href={link.href}
                    className={`block min-h-[44px] flex items-center text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-md px-2 ${
                      isActive
                        ? "text-primary border-l-4 border-primary pl-4 -ml-2 bg-surface"
                        : "text-text hover:text-primary hover:bg-surface"
                    }`}
                  >
                    {link.label}
                  </PageLink>
                </li>
              );
            })}
          </ul>
          
          <div className="pt-2">
            <PageLink
              href="/book"
              className="flex items-center justify-center w-full min-h-[48px] bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Book Appointment
            </PageLink>
          </div>
        </div>
      </div>
    </header>
  );
}
