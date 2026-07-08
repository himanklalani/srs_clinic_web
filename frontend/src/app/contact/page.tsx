import { Metadata } from 'next';
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: 'Contact Us',
  description: "Get in touch with us for emergency dental care, questions, or appointment scheduling in Bandra West, Mumbai.",
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[#faf8f5]">
      <AnimatedNavFramer />
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <ContactClient />
        </div>
      </section>
    </main>
  );
}
