"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import BlurText from "@/components/animations/BlurText";

export default function LocationSection() {
  return (
    <section
      className="py-16 md:py-28 bg-white"
      aria-label="Clinic location and contact"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-text mb-4">
              Find <span className="text-primary">Us</span>
            </h2>
            <p className="text-text/70 max-w-lg mx-auto text-sm sm:text-base">
              Visit our clinic or reach out — we&apos;re always happy to help.
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Contact info */}
          <address className="w-full lg:w-1/2 not-italic space-y-6">
            {[
              {
                icon: MapPin,
                title: "Address",
                content: (
                  <>
                    Dr. Saachi Shingrani&apos;s, B-1 Nutan Nagar Society,<br />
                    Gurunanak Rd, opposite Bandra Talao,<br />
                    Bandra West, Mumbai 400050.
                  </>
                ),
              },
              {
                icon: Phone,
                title: "Phone",
                content: (
                  <a href="tel:+919004402797" className="text-text/70 hover:text-primary transition-colors min-h-[44px] flex items-center">
                    +91 90044 02797
                  </a>
                ),
              },
              {
                icon: Mail,
                title: "Email",
                content: (
                  <a href="mailto:srsdentalcare@gmail.com" className="text-text/70 hover:text-primary transition-colors min-h-[44px] flex items-center break-all">
                    srsdentalcare@gmail.com
                  </a>
                ),
              },
              {
                icon: Clock,
                title: "Working Hours",
                content: (
                  <>Mon – Sat: 10:00 AM – 8:00 PM</>
                ),
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <BlurText key={item.title} delay={i * 0.1}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                      <Icon className="text-primary" size={22} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-text mb-1">{item.title}</h3>
                      <div className="text-text/70 text-sm sm:text-base leading-relaxed">
                        {item.content}
                      </div>
                    </div>
                  </div>
                </BlurText>
              );
            })}
          </address>

          {/* Map */}
          <ScrollReveal direction="right" className="w-full lg:w-1/2">
            <div className="w-full h-64 sm:h-80 lg:h-full min-h-[320px] rounded-2xl overflow-hidden shadow-lg border border-primary/10">
              <iframe
                title="Dr. Saachi Shingrani's Dental Clinic Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2818.66343830134!2d72.8362814!3d19.0563638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c93c3609a259%3A0x70aa9dc20ce34be!2sDr.%20Saachi%20Shingrani&#39;s!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '320px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
