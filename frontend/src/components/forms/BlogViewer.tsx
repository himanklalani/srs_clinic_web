"use client";

import { useEffect, useState } from 'react';
import { Trash2, Edit } from 'lucide-react';

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  published: boolean;
  createdAt: string;
}

interface BlogViewerProps {
  token: string;
  onEdit: (blog: Blog) => void;
  refreshTrigger: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function BlogViewer({ token, onEdit, refreshTrigger }: BlogViewerProps) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, [token, refreshTrigger]);

  async function fetchBlogs() {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/v1/blogs/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch blogs');
      }

      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(slug: string) {
    try {
      console.log(`Sending DELETE request to: ${API_URL}/api/v1/blogs/${slug}`);
      const res = await fetch(`${API_URL}/api/v1/blogs/${slug}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setBlogs(blogs.filter(b => b.slug !== slug));
        setConfirmingDelete(null);
      } else {
        const errorData = await res.json().catch(() => ({}));
        console.error('Delete rejected:', res.status, errorData);
        alert(`Failed to delete blog post. Server responded with: ${res.status} ${errorData.error || ''}`);
      }
    } catch (err) {
      console.error('Fetch error during delete:', err);
      // Determine if it was a network error
      alert(`Network error while deleting. Details: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  if (loading) return <div className="text-center py-8">Loading blogs...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Manage Blogs</h2>
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
          {blogs.length} Posts
        </span>
      </div>

      <div className="space-y-4">
        {blogs.length === 0 ? (
          <p className="text-gray-500 text-center py-8 bg-white rounded-xl shadow-sm">No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <div>
                <h3 className="font-semibold text-gray-900">{blog.title}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-1">{blog.excerpt}</p>
                <div className="flex gap-2 mt-2 text-xs">
                  <span className={`px-2 py-0.5 rounded-full ${blog.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {blog.published ? 'Published' : 'Draft'}
                  </span>
                  <span className="text-gray-400">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => onEdit(blog)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Edit Blog"
                >
                  <Edit className="w-5 h-5" />
                </button>
                {confirmingDelete === blog.slug ? (
                  <div className="flex gap-2 items-center text-xs ml-2 animate-in fade-in zoom-in duration-200">
                    <span className="text-red-500 font-medium hidden sm:inline">Delete?</span>
                    <button onClick={() => handleDelete(blog.slug)} className="px-3 py-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition shadow-sm font-medium">Yes</button>
                    <button onClick={() => setConfirmingDelete(null)} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition shadow-sm font-medium">No</button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmingDelete(blog.slug)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Blog"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
