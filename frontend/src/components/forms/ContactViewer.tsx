"use client";

import { useEffect, useState } from 'react';

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

interface ContactViewerProps {
  token: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ContactViewer({ token }: ContactViewerProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await fetch(`${API_URL}/api/v1/contacts`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch contacts');
        }

        const data = await res.json();
        setContacts(data.contacts || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchContacts();
  }, [token]);

  if (loading) return <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded-2xl shadow-sm text-center">Loading contact forms...</div>;
  if (error) return <div className="max-w-3xl mx-auto mt-12 p-6 bg-red-50 text-red-600 rounded-2xl shadow-sm text-center">Error: {error}</div>;

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary">Contact Forms Received</h2>
        <p className="text-text/60 text-sm mt-1">Inquiries submitted via the Contact page.</p>
      </div>

      {contacts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-text/60">
          No contact inquiries found.
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div key={contact._id} className="bg-white rounded-2xl shadow-sm p-6 border border-surface/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-semibold text-lg text-primaryDark">{contact.name}</h3>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-text/70 mt-1">
                    <a href={`mailto:${contact.email}`} className="hover:text-primary transition underline-offset-2 hover:underline">
                      {contact.email}
                    </a>
                    <span className="hidden sm:inline">•</span>
                    <a href={`tel:${contact.phone}`} className="hover:text-primary transition underline-offset-2 hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                </div>
                <div className="text-xs text-text/50 whitespace-nowrap">
                  {new Date(contact.createdAt).toLocaleDateString()} {new Date(contact.createdAt).toLocaleTimeString()}
                </div>
              </div>
              <p className="text-text/80 whitespace-pre-wrap text-sm leading-relaxed">
                {contact.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
