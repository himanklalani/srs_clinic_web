import type { Metadata } from 'next';
import PageLink from "@/components/PageLink";
import BlogCard from '@/components/BlogCard';
import { AnimatedNavFramer } from "@/components/ui/navigation-menu";
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Health Blogs | Dr. Saachi Shingranis Dental Clinic',
  description: 'Read expert dental health tips, treatment guides, and clinic news from Dr. Saachi Shingrani.',
};

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  tags: string[];
  createdAt: string;
}

interface BlogsResponse {
  blogs: Blog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

async function getBlogs(page: number): Promise<BlogsResponse> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const res = await fetch(`${apiUrl}/api/v1/blogs?page=${page}&limit=6`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error('Failed to fetch blogs');
    return res.json();
  } catch {
    return {
      blogs: [],
      pagination: { page: 1, limit: 6, total: 0, totalPages: 0 },
    };
  }
}

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogsPage({ searchParams }: Props) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || '1'));
  const data = await getBlogs(currentPage);
  const { blogs, pagination } = data;

  return (
    <main className="flex min-h-screen flex-col bg-[#faf8f5]">
      <AnimatedNavFramer />

      {/* Main Content Area */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          
          <div className="text-center mb-12 sm:mb-16">
             <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold text-primary mb-4">Our Blog</h1>
             <p className="text-text/70 max-w-2xl mx-auto">Insights, tips, and news from our dental experts.</p>
          </div>

          {/* Blog Grid */}
          {blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <svg className="w-16 h-16 text-primary/30 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-xl font-semibold text-text/60">No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog._id}
                  title={blog.title}
                  slug={blog.slug}
                  excerpt={blog.excerpt}
                  coverImage={blog.coverImage}
                  author={blog.author}
                  tags={blog.tags}
                  createdAt={blog.createdAt}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <nav className="flex justify-center items-center gap-2 mt-12" aria-label="Blog pagination">
              {currentPage > 1 && (
                <PageLink
                  href={`/blogs?page=${currentPage - 1}`}
                  className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition min-h-[44px] flex items-center"
                >
                  ← Previous
                </PageLink>
              )}
              <span className="text-text/60 text-sm px-2">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              {currentPage < pagination.totalPages && (
                <PageLink
                  href={`/blogs?page=${currentPage + 1}`}
                  className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition min-h-[44px] flex items-center"
                >
                  Next →
                </PageLink>
              )}
            </nav>
          )}
        </div>
      </section>
    </main>
  );
}
