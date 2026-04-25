import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const isProd = process.env.NODE_ENV === 'production';

// Static security headers have been moved to src/middleware.ts to support dynamic CSP based on cookie consent.

const nextConfig: NextConfig = {
  // @ts-ignore - Next.js 16.2 uses this outside experimental but types haven't caught up
  allowedDevOrigins: ["192.168.29.161", "localhost", "*"],
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'ui-avatars.com' },
      { protocol: 'https', hostname: '*.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async headers() {
    return [
      // Immutable cache for hashed static assets
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // No cache for Next.js API routes
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, max-age=0, must-revalidate' },
        ],
      },
      // Immutable cache for optimized images
      {
        source: '/_next/image(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Security headers are now managed by middleware.ts
    ];
  },
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default bundleAnalyzer(nextConfig);
