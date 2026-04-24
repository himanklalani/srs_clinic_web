import type { Metadata } from 'next';
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import BookingForm from "@/components/BookingForm";
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Book Appointment | Dr. Saachi Shingranis Dental Clinic',
  description: 'Schedule your private dental suite appointment seamlessly.',
};

export default function BookPage() {
  return (
    <main className="flex min-h-screen flex-col bg-primary-dark relative overflow-hidden text-white">
      <AnimatedNavFramer />

      {/* Immersive background orbs */}
      <div className="orb orb-violet w-[800px] h-[800px] top-[-20%] right-[-10%] opacity-30 mix-blend-screen" />
      <div className="orb orb-deep w-[600px] h-[600px] bottom-0 left-[-10%] opacity-40 mix-blend-screen" />
      <div className="absolute inset-0 bg-dots opacity-20 pointer-events-none" />

      {/* Main Split Layout */}
      <section className="relative z-10 flex-1 flex flex-col lg:flex-row items-center justify-center container mx-auto px-4 md:px-6 py-24 sm:py-32 gap-12 lg:gap-24">

        {/* Left Column: Context & Contact */}
        <div className="flex-1 w-full max-w-xl text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-light/20 bg-primary-light/5 text-primary-light text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-primary-light animate-pulse" />
            Accepting New Patients
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-instrument font-bold mb-6 text-white drop-shadow-xl leading-[1.1]">
            Reserve Your<br />Appointment.
          </h1>

          <p className="text-base sm:text-lg text-primary-light/80 font-light max-w-md mx-auto lg:mx-0 mb-12">
            Secure your time with Dr. Saachi Shingrani. Experience zero-anxiety dentistry in a state-of-the-art environment.
          </p>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left max-w-md mx-auto lg:mx-0">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full glass-dark flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-primary-light" />
              </div>
              <div>
                <p className="font-medium tracking-wide text-white/90 text-sm mb-1 uppercase">Our Clinic</p>
                <p className="text-sm text-white/80 font-light">
                  Dr. Saachi Shingrani&apos;s, B-1 Nutan Nagar Society,<br />
                  Gurunanak Rd, opposite Bandra Talao,<br />
                  Bandra West, Mumbai 400050.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full glass-dark flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-primary-light" />
              </div>
              <div>
                <p className="font-medium tracking-wide text-white/90 text-sm mb-1 uppercase">Hours</p>
                <p className="text-sm text-white/80 font-light">Mon - Sat<br />10:00 AM - 8:00 PM</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full glass-dark flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-primary-light" />
              </div>
              <div>
                <p className="font-medium tracking-wide text-white/90 text-sm mb-1 uppercase">Call Us</p>
                <p className="text-sm text-white/80 font-light">+91 90044 02797</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full glass-dark flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-primary-light" />
              </div>
              <div>
                <p className="font-medium tracking-wide text-white/90 text-sm mb-1 uppercase">Email</p>
                <p className="text-sm text-white/80 font-light">srsdentalcare@gmail.com</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Glass Form */}
        <div className="flex-1 w-full max-w-lg lg:max-w-xl">
          <BookingForm />
        </div>

      </section>

      {/* Testimonials Section */}
      <div className="relative z-10 bg-background text-text">
        <TestimonialsSection />
      </div>

    </main>
  );
}
