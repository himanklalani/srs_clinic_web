import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PageLink from "@/components/PageLink";
import BlogCoverImage from '@/components/BlogCoverImage';
import sanitizeHtml from 'sanitize-html';
import ScrollReveal from '@/components/animations/ScrollReveal';

interface Blog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  tags: string[];
  createdAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2']),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ['src', 'alt', 'title', 'width', 'height'],
    '*': ['class'],
  },
};

async function getBlog(slug: string): Promise<Blog | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/blogs/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.blog ?? null;
  } catch {
    return null;
  }
}

// Server-Side Rendering (SSR) to ensure instant updates
// (Removed generateStaticParams to bypass strict SSG caching)

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: 'Blog Not Found' };

  return {
    title: `${blog.title} | Dr. Saachi Shingranis Dental Clinic`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: blog.coverImage ? [{ url: blog.coverImage }] : [],
      type: 'article',
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) notFound();

  const safeContent = sanitizeHtml(blog.content, SANITIZE_OPTIONS);

  const displayDate = new Date(blog.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main className="min-h-screen">
      {/* Aesthetic Hero Section */}
      <div className="relative pt-24 md:pt-32 pb-12 overflow-hidden bg-[#faf8f5]">
        {/* Background ambient glow/blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-30 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-5xl relative z-10">
          {/* Header Block */}
          <div className="text-center mb-10 md:mb-16">
            {blog.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {blog.tags.map((tag) => (
                  <span key={tag} className="text-[10px] uppercase tracking-widest font-bold bg-primary/5 text-primary px-3 py-1 rounded-full border border-primary/10">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-semibold text-text leading-tight mb-6 max-w-4xl mx-auto">
              {blog.title}
            </h1>

            <div className="flex items-center justify-center gap-4 text-sm text-text/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                  {blog.author.charAt(0)}
                </div>
                <span className="font-medium text-text/80">{blog.author}</span>
              </div>
              <span>·</span>
              <time dateTime={blog.createdAt}>{displayDate}</time>
            </div>
          </div>

          {/* Featured Image */}
          {blog.coverImage && (
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-purple-200/10 rounded-[40px] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000" />
              <div className="relative h-64 sm:h-80 md:h-[520px] w-full rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl border border-white/50">
                <BlogCoverImage src={blog.coverImage} alt={blog.title} />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[24px] sm:rounded-[32px]" />
              </div>
            </div>
          )}

          {!blog.coverImage && (
            <div className="h-2 rounded-full bg-gradient-to-r from-primary/20 via-primary to-primary/20 max-w-xs mx-auto mt-8" />
          )}
        </div>
      </div>

      {/* Article Content Area */}
      <div className="container mx-auto px-4 md:px-6 max-w-4xl py-12 md:pb-32 relative z-10">

        {/* Content — server-side sanitized */}
        <div
          className="prose prose-sm sm:prose lg:prose-lg max-w-none text-text/80 leading-relaxed [&>p]:text-[16px] [&>p]:leading-8 [&>h2]:text-primary [&>h3]:text-primary"
          dangerouslySetInnerHTML={{ __html: safeContent }}
        />

        {/* Back PageLink */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <PageLink
            href="/blogs"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primaryDark transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blogs
          </PageLink>
        </div>
      </div>
    </main>
  );
}
