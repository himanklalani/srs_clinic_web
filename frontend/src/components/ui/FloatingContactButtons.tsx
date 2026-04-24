"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";

/**
 * FloatingContactButtons — Sticky floating buttons for WhatsApp and Direct Call
 * docked to the bottom-right corner.
 */
export default function FloatingContactButtons() {
  const phoneNumber = "919004402797";
  const whatsappMessage = encodeURIComponent(
    "Hello! I'd like to book an appointment at Dr. Saachi Shingrani's Dental Clinic."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
  const callUrl = `tel:+${phoneNumber}`;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-4">
      {/* Call Button */}
      <motion.a
        href={callUrl}
        aria-label="Call us"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.7, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center justify-center w-14 h-14 rounded-full shadow-xl bg-primary text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/50"
      >
        <Phone className="w-6 h-6" />
      </motion.a>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-green-400/50"
        style={{ backgroundColor: "#25D366" }}
      >
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-30"
          style={{ backgroundColor: "#25D366" }}
        />

        {/* WhatsApp SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="relative w-8 h-8 fill-white"
          aria-hidden="true"
        >
          <path d="M16.003 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.364.635 4.677 1.84 6.699L2.667 29.333l6.803-1.794A13.26 13.26 0 0 0 16.003 29.333c7.363 0 13.33-5.97 13.33-13.333S23.366 2.667 16.003 2.667zm0 24c-2.107 0-4.165-.568-5.97-1.644l-.43-.255-4.036 1.063 1.083-3.947-.28-.455A10.624 10.624 0 0 1 5.333 16c0-5.883 4.787-10.667 10.67-10.667 5.883 0 10.664 4.784 10.664 10.667S21.886 26.667 16.003 26.667zm5.85-7.974c-.32-.16-1.894-.935-2.188-1.04-.293-.107-.508-.16-.722.16-.213.32-.827 1.04-.975 1.254-.147.213-.294.24-.614.08-.32-.16-1.35-.497-2.57-1.587-.95-.848-1.592-1.894-1.777-2.214-.187-.32-.02-.493.14-.653.145-.143.32-.373.48-.56.16-.187.213-.32.32-.534.107-.213.053-.4-.027-.56-.08-.16-.722-1.734-1.014-2.374-.267-.624-.534-.534-.722-.534h-.614c-.213 0-.56.08-.854.4-.293.32-1.12 1.094-1.12 2.667s1.147 3.094 1.307 3.307c.16.213 2.254 3.441 5.46 4.827.763.33 1.36.527 1.82.674.768.244 1.466.21 2.02.128.614-.093 1.894-.774 2.16-1.521.267-.747.267-1.387.187-1.521-.08-.133-.293-.213-.614-.373z" />
        </svg>
      </motion.a>
    </div>
  );
}
