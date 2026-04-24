"use client";

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.message.trim()) newErrors.message = 'Message cannot be empty';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // In a real app, submit to backend here.
      setSubmitted(true);
      // Reset form after short delay
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' });
        setSubmitted(false);
      }, 3000);
    }
  };

  const isFormEmpty = !formData.name && !formData.email && !formData.phone && !formData.message;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-primary mb-4">Send us a message</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label htmlFor="name" className="block text-text/70 mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-primaryLight rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary h-12"
            aria-describedby={errors.name ? 'error-name' : undefined}
            required
          />
          {errors.name && <p id="error-name" className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-text/70 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-primaryLight rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary h-12"
            aria-describedby={errors.email ? 'error-email' : undefined}
            required
          />
          {errors.email && <p id="error-email" className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-text/70 mb-1">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            inputMode="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-primaryLight rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary h-12"
            aria-describedby={errors.phone ? 'error-phone' : undefined}
            required
          />
          {errors.phone && <p id="error-phone" className="text-red-600 text-sm mt-1">{errors.phone}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-text/70 mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className="w-full border border-primaryLight rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-describedby={errors.message ? 'error-message' : undefined}
            required
          />
          {errors.message && <p id="error-message" className="text-red-600 text-sm mt-1">{errors.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isFormEmpty}
          className="bg-primary text-white font-medium py-3 px-8 rounded-full hover:bg-primaryDark transition disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
        >
          Send Message
        </button>
      </form>
      {submitted && (
        <p className="mt-4 text-green-600 font-medium">Your message has been sent! We'll get back within 24 hours.</p>
      )}
    </div>
  );
}
