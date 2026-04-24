"use client";

import { useState } from 'react';
import AdminForm from './AdminForm';
import BlogViewer, { Blog } from './BlogViewer';
import ContactViewer from './ContactViewer';

export default function DashboardClient({ token }: { token: string }) {
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSuccess = () => {
    setEditingBlog(null);
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <>
      <BlogViewer 
        token={token} 
        onEdit={(blog) => {
          setEditingBlog(blog);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        refreshTrigger={refreshTrigger}
      />
      
      <hr className="my-12 max-w-3xl mx-auto border-gray-200" />
      
      <AdminForm 
        token={token} 
        initialData={editingBlog} 
        onSuccess={handleSuccess}
        onCancel={editingBlog ? () => setEditingBlog(null) : undefined}
      />
      
      <hr className="my-12 max-w-3xl mx-auto border-gray-200" />
      
      <ContactViewer token={token} />
    </>
  );
}
