"use client";

import { useState } from 'react';
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Textarea from "@/components/ui/Textarea";
import { Mail, MapPin, Phone } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ContactPage() {
  const [formData, setFormData] = useState({ firstname: '', lastname: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const errorId = 'contact-form-error';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;

    setStatus('loading');
    try {
      const res = await fetch(`${API_URL}/api/v1/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ firstname: '', lastname: '', email: '', phone: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#faf8f5]">
      <AnimatedNavFramer />
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-10 lg:flex-row lg:gap-20">
            <div className="mx-auto flex max-w-sm flex-col justify-between gap-10 lg:pl-4">
              <div className="text-center lg:text-left">
                <h1 className="mb-4 text-4xl font-playfair font-semibold lg:mb-6 lg:text-5xl text-primary">
                  Contact Us
                </h1>
                <p className="text-text/70 leading-relaxed">
                  We are available for questions, emergency dental care, or collaboration opportunities. Let us know how we can help structure your perfect smile!
                </p>
              </div>
              <div className="mx-auto w-fit lg:mx-0">
                <h2 className="mb-6 text-center text-xl font-semibold lg:text-left text-primary">
                  Contact Details
                </h2>
                <ul className="flex flex-col gap-4 text-text/80">
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                       <Phone className="w-5 h-5 text-blue-500" />
                    </div>
                    <a href="tel:+919004402797" className="hover:text-primary transition">
                      +91 90044 02797
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                       <Mail className="w-5 h-5 text-blue-500" />
                    </div>
                    <a href="mailto:srsdentalcare@gmail.com" className="hover:text-primary transition underline-offset-4 hover:underline">
                      srsdentalcare@gmail.com
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-1">
                      <MapPin className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="leading-relaxed">
                      Dr. Saachi Shingrani&apos;s, B-1 Nutan Nagar Society,<br />
                      Gurunanak Rd, opposite Bandra Talao,<br />
                      Bandra West, Mumbai 400050.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-screen-md flex-col gap-6 rounded-2xl border border-surface/50 bg-white p-8 sm:p-10 shadow-sm transition-shadow hover:shadow-md">
              {status === 'success' && (
                <div role="alert" aria-live="polite" className="p-4 rounded-lg bg-green-50 text-green-700 border border-green-200 text-sm font-medium">
                  ✅ Your message has been sent successfully! We will get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div role="alert" aria-live="assertive" id={errorId} className="p-4 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm font-medium">
                  ❌ Failed to send your message. Please try again.
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="firstname" className="text-sm font-medium text-primary">First Name</Label>
                  <Input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} placeholder="First Name" className="bg-gray-50/50" />
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="lastname" className="text-sm font-medium text-primary">Last Name</Label>
                  <Input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Last Name" className="bg-gray-50/50" />
                </div>
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="email" className="text-sm font-medium text-primary">
                  Email <span aria-hidden="true" className="text-red-500">*</span>
                  <span className="sr-only">(required)</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-describedby={status === 'error' ? errorId : undefined}
                  placeholder="Email Address"
                  className="bg-gray-50/50"
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="phone" className="text-sm font-medium text-primary">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number (Optional)"
                  className="bg-gray-50/50"
                />
              </div>
              <div className="grid w-full gap-2">
                <Label htmlFor="message" className="text-sm font-medium text-primary">
                  Message <span aria-hidden="true" className="text-red-500">*</span>
                  <span className="sr-only">(required)</span>
                </Label>
                <Textarea
                  placeholder="Type your message here..."
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  aria-required="true"
                  aria-describedby={status === 'error' ? errorId : undefined}
                  className="bg-gray-50/50"
                />
              </div>
              <Button type="submit" disabled={status === 'loading'} className="w-full mt-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition text-center flex justify-center shadow-md disabled:opacity-50">
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
