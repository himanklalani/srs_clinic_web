import type { Metadata } from 'next';
import PageLink from '@/components/PageLink';
import Image from 'next/image';
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import GallerySection from '@/components/sections/GallerySection';

import { Heart, Cpu, DollarSign } from 'lucide-react';
import { Timeline, TimelineItem } from "@/components/ui/modern-timeline";

export const metadata: Metadata = {
  title: 'About Us | Dr. Saachi Shingranis Dental Clinic',
  description: 'Learn about Dr. Saachi Shingranis Dental Clinic, our story, team, and values.',
};

export const revalidate = 86400;


const values = [
  { icon: Heart, title: 'Patient First', description: 'Your comfort and health are our top priority.' },
  { icon: Cpu, title: 'Advanced Technology', description: 'State‑of‑the‑art equipment for precise care.' },
  { icon: DollarSign, title: 'Affordable Care', description: 'Transparent pricing with no hidden fees.' },
];

const journeyItems: TimelineItem[] = [
  {
    title: "Gaining Experience",
    description: "Started her professional dental journey by interning and gaining diverse clinical experience across multiple specialties.",
    date: "2016 – 2020",
    category: "Experience",
    status: "completed"
  },
  {
    title: "Academic Milestone",
    description: "Successfully completed her BDS degree from the prestigious Nair Hospital Dental College, Mumbai.",
    date: "2017",
    category: "Education",
    status: "completed"
  },
  {
    title: "Clinic Opening",
    description: "Officially opened Dr. Saachi Shingrani’s Dental Care in the heart of Bandra West, Mumbai, dedicated to high-quality oral healthcare.",
    date: "August 2020",
    category: "Milestone",
    status: "completed"
  },
  {
    title: "Continuing Care",
    description: "Providing a wide range of oral healthcare services with a focus on treatment satisfaction and patient-first care.",
    date: "Present",
    category: "Current",
    status: "current"
  }
];

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#faf8f5]">
      <AnimatedNavFramer />

      {/* Main Content Area without Hero */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-2xl font-semibold text-primary mb-4">Our Story</h2>
          <p className="text-text/80 mb-4">
            Welcome to Dr. Saachi Shingrani’s Dental Care, located at the heart of Mumbai City, Bandra West. Officially opened on August 2020, we provide a wide range of oral health care services to patients from dental implants and smile designing to invisible aligners, to braces, pain free root canals, not only treating dangerous oral lesions to even treating pediatric and geriatric care with highly competitive pricing.
          </p>
          <p className="text-text/80">
            Our mission is to provide the best dental care for our patients, rooted in sincerity and passion for clinical excellence. We strive to create a welcoming environment where every patient feels heard, respected, and cared for.
          </p>
        </div>
      </section>



      {/* Meet Dr. Saachi */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-8 px-4 md:px-8 max-w-5xl mx-auto">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-primary mb-4">Meet Dr. Saachi Shingrani</h2>
          <p className="text-text/80 mb-2 font-medium">BDS – Dental Surgeon</p>
          <p className="text-text/80 mb-4">
            Dr. Saachi Shingrani is a skilled & passionate Dentist, graduated from the Nair Hospital Dental College, Mumbai. Her friendly nature, sincerity with her work & treatment satisfaction underlines her motto of providing the best dental care for her patients.
          </p>
          <p className="text-text/70 italic text-sm">
            &quot;Providing the best dental care for my patients.&quot;
          </p>
        </div>
        <div className="flex-1 w-full h-64 relative">
          <Image
            src="https://ui-avatars.com/api/?name=Dr+Saachi+Shingrani&size=256"
            alt="Dr. Saachi Shingrani"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="px-4 md:px-8 max-w-5xl mx-auto py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold text-primary mb-4">Dr. Saachi's Journey</h2>
          <p className="text-text/70 max-w-2xl mx-auto text-lg">From early academic excellence to founding a distinguished clinic, follow the milestones of a career dedicated to painless, precision-driven dentistry.</p>
        </div>
        <Timeline items={journeyItems} />
      </section>

 

      {/* Added Gallery Section here */}
      <GallerySection hideButton={true} />

      {/* Bottom CTA */}
      <section className="bg-primary text-white py-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to visit us?</h2>
        <a
          href="/book"
          className="inline-block bg-white text-primary font-medium py-3 px-6 rounded-full hover:bg-gray-100 transition"
        >
          Book Appointment
        </a>
      </section>
    </main>
  );
}
