import { MetadataRoute } from 'next';
import { treatmentsData } from '@/lib/data/treatments';

export const revalidate = 86400; // Revalidate sitemap at most once per day

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const SITE_URL = 'https://www.srsdentalcare.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/about', '/treatments', '/blogs', '/contact', '/book'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const treatmentRoutes: MetadataRoute.Sitemap = treatmentsData.map((t) => ({
    url: `${SITE_URL}/treatments/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/v1/blogs`, {
      next: { revalidate: 86400 } // Cache and revalidate once per day
    });
    if (res.ok) {
      const respJson = await res.json();
      const blogs = Array.isArray(respJson) ? respJson : (respJson.data || respJson.blogs || []);
      
      blogRoutes = blogs.map((blog: any) => ({
        url: `${SITE_URL}/blogs/${blog.slug}`,
        lastModified: new Date(blog.updatedAt || blog.createdAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
    }
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
  }

  return [...staticRoutes, ...treatmentRoutes, ...blogRoutes];
}
