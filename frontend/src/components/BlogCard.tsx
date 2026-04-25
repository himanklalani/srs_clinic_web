"use client";

import Image from 'next/image';
import { CldImage } from 'next-cloudinary';
import PageLink from "@/components/PageLink";

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  author: string;
  tags: string[];
  createdAt: string;
}

export default function BlogCard({ title, slug, excerpt, coverImage, author, tags, createdAt }: BlogCardProps) {
  const displayDate = new Date(createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-300">
      {/* Cover Image - Only show if it exists */}
      {coverImage && (
        <div className="relative h-48 w-full overflow-hidden bg-purple-50">
          {coverImage.includes('cloudinary.com') ? (
            <CldImage
              src={coverImage}
              alt={title}
              fill
              crop="fill"
              format="avif"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs font-medium bg-purple-100 text-primary px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="font-bold text-lg text-text leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h2>

        {/* Excerpt */}
        <p className="text-text/60 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
          {excerpt}
        </p>

        {/* Meta + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="text-xs text-text/50">
            <span>{author}</span> · <span>{displayDate}</span>
          </div>
          <PageLink
            href={`/blogs/${slug}`}
            className="text-sm font-semibold text-primary hover:text-primaryDark transition-colors flex items-center gap-1"
          >
            Read More
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </PageLink>
        </div>
      </div>
    </article>
  );
}
