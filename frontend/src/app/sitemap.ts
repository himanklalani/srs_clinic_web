import { MetadataRoute } from 'next';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://drsaachishingrani.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ['', '/about', '/treatments', '/blogs', '/contact', '/book'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(`${NEXT_PUBLIC_API_URL}/api/v1/blogs`, { cache: 'no-store' });
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

  return [...staticRoutes, ...blogRoutes];
}
