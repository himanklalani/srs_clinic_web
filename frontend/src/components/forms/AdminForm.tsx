"use client";

import { useState, useEffect } from 'react';

interface AdminFormProps {
  token: string;
  initialData?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminForm({ token, initialData, onSuccess, onCancel }: AdminFormProps) {
  // Form state
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    coverImage: '',
    tags: '',
    content: '',
    author: 'Dr. Saachi Shingrani',
    published: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        excerpt: initialData.excerpt || '',
        coverImage: initialData.coverImage || '',
        tags: Array.isArray(initialData.tags) ? initialData.tags.join(', ') : '',
        content: initialData.content || '',
        author: initialData.author || 'Dr. Saachi Shingrani',
        published: initialData.published ?? true,
      });
    } else {
      setForm({ title: '', excerpt: '', coverImage: '', tags: '', content: '', author: 'Dr. Saachi Shingrani', published: true });
    }
    setResult(null);
  }, [initialData]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm((f) => ({ ...f, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size - max 5MB (optional but good practice)
    if (file.size > 5 * 1024 * 1024) {
      setResult({ type: 'error', message: '❌ Image must be smaller than 5MB.' });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((f) => ({ ...f, coverImage: reader.result as string }));
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    const payload = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    const method = initialData ? 'PUT' : 'POST';
    const url = initialData ? `${API_URL}/api/v1/blogs/${initialData.slug}` : `${API_URL}/api/v1/blogs`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setResult({ type: 'success', message: `✅ Blog post ${initialData ? 'updated' : 'published'} successfully!` });
        if (!initialData) {
          setForm({ title: '', excerpt: '', coverImage: '', tags: '', content: '', author: 'Dr. Saachi Shingrani', published: true });
        }
        if (onSuccess) onSuccess();
      } else {
        const data = await res.json();
        setResult({ type: 'error', message: `❌ ${data.error || 'Failed to save blog post.'}` });
      }
    } catch {
      setResult({ type: 'error', message: '❌ Network error. Is the backend running?' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          {initialData ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
        <p className="text-text/60 text-sm mt-1">This page is private and not indexed by search engines.</p>
      </div>

      {result && (
        <div
          className={`p-4 rounded-lg mb-6 text-sm font-medium ${
            result.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {result.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-5">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-text/80 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Blog post title"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[48px]"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-text/80 mb-1">
            Excerpt <span className="text-red-500">*</span>
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={2}
            value={form.excerpt}
            onChange={handleChange}
            required
            placeholder="Short summary shown in listing"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Author */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-text/80 mb-1">
            Author <span className="text-red-500">*</span>
          </label>
          <input
            id="author"
            name="author"
            type="text"
            value={form.author}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[48px]"
          />
        </div>

        {/* Cover Image Upload */}
        <div>
          <label htmlFor="coverImageFile" className="block text-sm font-medium text-text/80 mb-1">
            Cover Image <span className="text-text/40 font-normal">(Auto-optimized to AVIF by Cloudinary)</span>
          </label>
          {form.coverImage && (
            <div className="mb-3 relative w-full h-40 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={form.coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
              <button 
                type="button" 
                onClick={() => setForm(f => ({ ...f, coverImage: '' }))}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center text-xs"
              >
                ✕
              </button>
            </div>
          )}
          {!form.coverImage && (
            <input
              id="coverImageFile"
              name="coverImageFile"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[48px] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
            />
          )}
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-text/80 mb-1">
            Tags <span className="text-text/40 font-normal">(comma-separated)</span>
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            value={form.tags}
            onChange={handleChange}
            placeholder="teeth whitening, tips, cosmetic"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary min-h-[48px]"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-text/80 mb-1">
            Content (HTML) <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-text/40 mb-2">Accepts HTML tags. Content is sanitized server-side before saving.</p>
          <textarea
            id="content"
            name="content"
            rows={10}
            value={form.content}
            onChange={handleChange}
            required
            placeholder="<p>Your blog content here...</p>"
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Published */}
        <div className="flex items-center gap-3">
          <input
            id="published"
            name="published"
            type="checkbox"
            checked={form.published}
            onChange={handleChange}
            className="w-5 h-5 accent-primary rounded"
          />
          <label htmlFor="published" className="text-sm font-medium text-text/80">
            Publish immediately
          </label>
        </div>

        {/* Submit */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            disabled={submitting || !form.title || !form.content || !form.excerpt}
            className="flex-1 bg-primary text-white font-semibold py-3 rounded-full hover:bg-primaryDark transition disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
          >
            {submitting ? (initialData ? 'Updating...' : 'Publishing...') : (initialData ? 'Update Blog Post' : 'Publish Blog Post')}
          </button>
          
          {initialData && onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-100 text-gray-700 font-semibold py-3 rounded-full hover:bg-gray-200 transition min-h-[48px]"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
