"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Textarea from "@/components/ui/Textarea";

export default function BookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cooldown > 0) {
      alert(`Please wait ${cooldown} seconds before submitting another request.`);
      return;
    }

    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      
      const payload = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        date: new Date(formData.get("date") as string).toISOString(),
        service_type: formData.get("treatment"),
        preferred_slot: formData.get("slot"),
        notes: formData.get("notes"),
        business_id: process.env.NEXT_PUBLIC_BOOKING_BUSINESS_ID,
        api_key: process.env.NEXT_PUBLIC_BOOKING_API_KEY
      };

      const apiUrl = process.env.NEXT_PUBLIC_BOOKING_API_URL || 'https://review-booking-system.onrender.com';
      
      // Clean up the URL to prevent double /api/api if the user included /api in the env variable
      const cleanApiUrl = apiUrl.endsWith('/api') ? apiUrl.slice(0, -4) : apiUrl;
      
      const response = await fetch(`${cleanApiUrl}/api/public/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Start 60-second cooldown to prevent spamming
      setCooldown(60);
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Fire confetti animation (Balloons & Poppers vibe)
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      // Generate random particles from different sides
      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // Purple & Gold brand colors
        const colors = ['#7c3aed', '#ede9fe', '#a78bfa', '#f59e0b', '#fbbf24'];

        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors }));
      }, 250);
      
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong while submitting your request. Please try again or call the clinic directly.");
      setIsSubmitting(false);
    }
  };

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 rounded-3xl border border-primary-light/10 glass-dark p-8 sm:p-10 shadow-2xl relative overflow-hidden glow-card">
        
        {/* Animated Success Overlay */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div 
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              role="alert" aria-live="polite" aria-atomic="true"
              className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-primary-dark/80 rounded-3xl p-6"
            >
              <motion.div 
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                className="flex h-20 w-20 items-center justify-center rounded-full glass mb-6 shadow-glow"
              >
                <svg className="w-10 h-10 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h2 className="text-3xl font-playfair font-bold text-white mb-3 text-center">Request Received</h2>
              <p className="text-primary-light/80 text-center max-w-xs leading-relaxed font-light">
                Your appointment request is secured. We will confirm your slot shortly.
              </p>
              <button 
                type="button" 
                onClick={() => setIsSuccess(false)}
                className="mt-8 text-primary-light font-medium hover:text-white transition-colors text-sm tracking-widest uppercase underline-offset-4 hover:underline"
              >
                Book Another
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mb-2">
          <h3 className="text-2xl font-playfair text-white mb-1">Patient Details</h3>
          <p className="text-sm font-light text-primary-light/60">Please provide your contact information.</p>
        </div>

        {/* Form Inputs */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="name" className="text-[10px] uppercase tracking-widest font-semibold text-primary-light/80">
              Full Name <span aria-hidden="true" className="text-red-400">*</span>
              <span className="sr-only">(required)</span>
            </Label>
            <Input required aria-required="true" type="text" id="name" name="name" placeholder="John Doe" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-ring focus:border-primary-mid h-12 rounded-xl" />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="phone" className="text-[10px] uppercase tracking-widest font-semibold text-primary-light/80">
              Phone Number <span aria-hidden="true" className="text-red-400">*</span>
              <span className="sr-only">(required)</span>
            </Label>
            <Input required aria-required="true" type="tel" id="phone" name="phone" placeholder="+91 00000 00000" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-ring focus:border-primary-mid h-12 rounded-xl" />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="date" className="text-[10px] uppercase tracking-widest font-semibold text-primary-light/80">
              Preferred Date <span aria-hidden="true" className="text-red-400">*</span>
              <span className="sr-only">(required)</span>
            </Label>
            <Input 
              required 
              type="date" 
              id="date" 
              name="date" 
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                if (selectedDate.getDay() === 0) {
                  alert("Clinic is closed on Sundays. Please select another day.");
                  e.target.value = "";
                }
              }}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-ring focus:border-primary-mid h-12 rounded-xl [color-scheme:dark]" 
            />
          </div>
          <fieldset className="grid w-full items-center gap-2">
            <legend className="text-[10px] uppercase tracking-widest font-semibold text-primary-light/80 mb-2">
              Preferred Slot <span aria-hidden="true" className="text-red-400">*</span>
              <span className="sr-only">(required)</span>
            </legend>
            <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 h-12">
              <label className="flex-1 cursor-pointer relative">
                <input type="radio" name="slot" value="Morning" className="peer sr-only" defaultChecked />
                <div className="w-full h-full flex items-center justify-center text-[11px] sm:text-xs font-semibold text-white/50 peer-checked:text-white peer-checked:bg-white/15 peer-checked:shadow-sm rounded-lg transition-all duration-300">Morning</div>
              </label>
              <label className="flex-1 cursor-pointer relative">
                <input type="radio" name="slot" value="Afternoon" className="peer sr-only" />
                <div className="w-full h-full flex items-center justify-center text-[11px] sm:text-xs font-semibold text-white/50 peer-checked:text-white peer-checked:bg-white/15 peer-checked:shadow-sm rounded-lg transition-all duration-300">Afternoon</div>
              </label>
              <label className="flex-1 cursor-pointer relative">
                <input type="radio" name="slot" value="Evening" className="peer sr-only" />
                <div className="w-full h-full flex items-center justify-center text-[11px] sm:text-xs font-semibold text-white/50 peer-checked:text-white peer-checked:bg-white/15 peer-checked:shadow-sm rounded-lg transition-all duration-300">Evening</div>
              </label>
            </div>
          </fieldset>
        </div>
        <div className="grid w-full items-center gap-2 mt-2">
          <Label htmlFor="treatment" className="text-[10px] uppercase tracking-widest font-semibold text-primary-light/80">Treatment Type</Label>
          <div className="relative group">
            <select 
              id="treatment" 
              name="treatment" 
              required
              defaultValue=""
              className="w-full bg-white/5 border border-white/10 text-white focus-ring focus:border-primary-mid h-12 rounded-xl px-4 appearance-none cursor-pointer outline-none transition-all"
            >
              <option value="" disabled className="bg-primary-dark">Select a treatment...</option>
              <option value="Routine Checkup" className="bg-primary-dark">Routine Checkup</option>
              <option value="Teeth Whitening" className="bg-primary-dark">Teeth Whitening</option>
              <option value="Dental Implants" className="bg-primary-dark">Dental Implants</option>
              <option value="Invisible Braces" className="bg-primary-dark">Invisible Braces (Invisalign)</option>
              <option value="Root Canal" className="bg-primary-dark">Root Canal Treatment</option>
              <option value="Cosmetic Dentistry" className="bg-primary-dark">Cosmetic Dentistry</option>
              <option value="Orthodontic" className="bg-primary-dark">Orthodontic Treatment</option>
              <option value="Periodontal Care" className="bg-primary-dark">Periodontal Therapy</option>
              <option value="Other" className="bg-primary-dark">Other / Consult</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary-light/40 group-hover:text-primary-light transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        <div className="grid w-full gap-2 mt-2">
          <Label htmlFor="notes" className="text-[10px] uppercase tracking-widest font-semibold text-primary-light/80">Special Requests</Label>
          <Textarea placeholder="Any specific dental concerns, anxiety, or pain?" id="notes" name="notes" className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-ring focus:border-primary-mid rounded-xl min-h-[100px] resize-y" />
        </div>
        <div className="mt-8">
          <button 
            disabled={isSubmitting || isSuccess}
            type="submit" 
            className="w-full h-14 bg-gradient-to-r from-primary-dark via-primary to-primary-mid text-white rounded-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all font-semibold shadow-lg shadow-primary/20 disabled:opacity-50 flex items-center justify-center gap-2 animate-gradient-x overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-700 ease-in-out -translate-x-full skew-x-12" />
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Confirming Slot Request...
              </>
            ) : "Request Reservation"}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
