"use client";

import { useState } from 'react';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Generate 24h time slots: 10:00, 10:30, ..., 19:00
  const timeSlots: string[] = [];
  for (let hour = 10; hour <= 19; hour++) {
    const h = hour.toString().padStart(2, '0');
    timeSlots.push(`${h}:00`);
    if (hour < 19) {
      timeSlots.push(`${h}:30`);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'date') {
      const selectedDate = new Date(value);
      // Sunday is 0 in JS Date.getDay()
      if (selectedDate.getDay() === 0) {
        setError("Appointments are not available on Sundays. Please select another day.");
        setFormData({ ...formData, [name]: '' });
        return;
      }
      setError(null);
    }
    
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.date || !formData.time) {
      setError("Please select both a date and a time.");
      return;
    }
    
    // Final Sunday check
    if (new Date(formData.date).getDay() === 0) {
        setError("Selected date is a Sunday. Please pick another.");
        return;
    }

    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', date: '', time: '', message: '' });
      setSubmitted(false);
      setError(null);
    }, 3000);
  };

  const isFormEmpty = !formData.name || !formData.email || !formData.phone || !formData.date || !formData.time;

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-purple-50 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text/80 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[48px]"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text/80 mb-1">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[48px]"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-text/80 mb-1">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              inputMode="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[48px]"
              required
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-text/80 mb-1">
              Date <span className="text-xs text-text/40 font-normal">(Mon-Sat)</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              min={new Date().toISOString().split('T')[0]}
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[48px]"
              required
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-text/80 mb-1">Appointment Time</label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[48px] bg-white appearance-none"
              required
            >
              <option value="">Select Time...</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-text/80 mb-1">Message (optional)</label>
            <textarea
              id="message"
              name="message"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 italic">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isFormEmpty || !!error}
          className="w-full bg-primary text-white font-semibold py-4 rounded-full hover:bg-primaryDark transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
        >
          Confirm Appointment Request
        </button>
      </form>
      
      {submitted && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-6 py-3 rounded-2xl shadow-xl animate-fade-in z-50 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Booking request received! We'll contact you soon.
        </div>
      )}
      <p className="mt-4 text-center text-text/50 text-xs">Note: Your booking is subject to availability and will be confirmed via phone/email.</p>
    </section>
  );
}

