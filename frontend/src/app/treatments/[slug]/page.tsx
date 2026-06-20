import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { treatmentsData } from '@/lib/data/treatments';
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import PageLink from '@/components/PageLink';
import { CalendarCheck, ChevronRight, CheckCircle2 } from 'lucide-react';
import BookingForm from '@/components/BookingForm';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return treatmentsData.map((t) => ({
    slug: t.slug,
  }));
}

export function generateMetadata({ params }: Props): Metadata {
  const treatment = treatmentsData.find((t) => t.slug === params.slug);

  if (!treatment) {
    return { title: 'Treatment Not Found' };
  }

  return {
    title: `${treatment.title} in Bandra West, Mumbai`,
    description: treatment.shortDescription,
    keywords: treatment.seoKeywords,
    alternates: {
      canonical: `https://www.srsdentalcare.in/treatments/${treatment.slug}`,
    },
  };
}

export default function TreatmentPage({ params }: Props) {
  const treatment = treatmentsData.find((t) => t.slug === params.slug);

  if (!treatment) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": treatment.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": treatment.title,
    "provider": {
      "@type": "Dentist",
      "name": "Dr. Saachi Shingrani's Dental Clinic"
    },
    "areaServed": {
      "@type": "City",
      "name": "Mumbai"
    },
    "description": treatment.shortDescription
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#faf8f5]">
      <AnimatedNavFramer />

      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="pt-24 pb-12 sm:pt-32 sm:pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-text/60 mb-8" aria-label="Breadcrumb">
            <PageLink href="/" className="hover:text-primary transition-colors">Home</PageLink>
            <ChevronRight className="w-3 h-3" />
            <PageLink href="/treatments" className="hover:text-primary transition-colors">Treatments</PageLink>
            <ChevronRight className="w-3 h-3" />
            <span className="text-primary font-medium" aria-current="page">{treatment.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-10">
              
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-semibold text-primary-dark mb-6 leading-tight">
                  {treatment.title} <span className="block text-2xl sm:text-3xl text-primary font-medium mt-2">in Bandra West, Mumbai</span>
                </h1>
                
                <div className="prose prose-lg prose-p:text-text/80 prose-p:leading-relaxed max-w-none">
                  {treatment.fullDescription.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-primary/10">
                <h2 className="text-2xl font-semibold text-primary-dark mb-6">Key Benefits</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {treatment.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3 text-text/80">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-3xl font-playfair font-semibold text-primary-dark mb-6">The Procedure</h2>
                <div className="space-y-6">
                  {treatment.procedureSteps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {index + 1}
                        </div>
                        {index !== treatment.procedureSteps.length - 1 && (
                          <div className="w-0.5 h-full bg-primary/20 my-2" />
                        )}
                      </div>
                      <div className="pb-6">
                        <h3 className="text-xl font-medium text-text mb-2">{step.title}</h3>
                        <p className="text-text/70">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-playfair font-semibold text-primary-dark mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {treatment.faqs.map((faq, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-surface/50">
                      <h3 className="text-lg font-medium text-primary-dark mb-2">{faq.question}</h3>
                      <p className="text-text/70">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Booking Form */}
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24">
              <div className="bg-primary-dark rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[80px] opacity-20 pointer-events-none" />
                <h3 className="text-2xl font-playfair font-semibold mb-2 relative z-10">Ready to transform your smile?</h3>
                <p className="text-white/70 mb-8 text-sm relative z-10">Book a consultation for {treatment.title.toLowerCase()} today.</p>
                <div className="relative z-10">
                  <BookingForm />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
