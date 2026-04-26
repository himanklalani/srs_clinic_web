import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check for cookie consent
  const cookieConsent = request.cookies.get('cookie_consent')?.value;
  let hasAnalyticsConsent = false;

  if (cookieConsent) {
    try {
      const parsed = JSON.parse(cookieConsent);
      hasAnalyticsConsent = parsed.analytics === true;
    } catch (e) {
      // ignore parse error
    }
  }

  // 2. Base CSP Directives
  const isProd = process.env.NODE_ENV === 'production';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  const bookingApiUrl = process.env.NEXT_PUBLIC_BOOKING_API_URL || 'https://review-booking-system.onrender.com';
  const cspDirectives = [
    "default-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https://res.cloudinary.com https://ui-avatars.com",
    "media-src 'self' https://res.cloudinary.com",
    "frame-src https://www.google.com",
    "object-src 'none'",
  ];

  // 3. Conditional Analytics (GDPR strict CSP)
  if (hasAnalyticsConsent) {
    cspDirectives.push(`script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com${!isProd ? " 'unsafe-eval'" : ""}`);
    cspDirectives.push(`connect-src 'self' ${apiUrl} ${bookingApiUrl} https://res.cloudinary.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net`);
  } else {
    // If no consent, strictly block analytics and tag manager
    cspDirectives.push(`script-src 'self' 'unsafe-inline'${!isProd ? " 'unsafe-eval'" : ""}`);
    cspDirectives.push(`connect-src 'self' ${apiUrl} ${bookingApiUrl} https://res.cloudinary.com`);
  }

  if (isProd) {
    cspDirectives.push("upgrade-insecure-requests");
  }

  const cspHeader = cspDirectives.join('; ');

  // 4. Handle Response
  let responseNode: NextResponse;

  // ─── Guard /blog-admin/* at the edge ──────────────────────────────────────
  if (pathname.startsWith('/blog-admin/')) {
    const segments = pathname.split('/');
    const token = segments[2] || '';
    const validTokenPattern = /^[a-zA-Z0-9_\-]{32,}$/;

    if (!token || !validTokenPattern.test(token)) {
      responseNode = NextResponse.rewrite(new URL('/not-found', request.url));
    } else {
      responseNode = NextResponse.next();
    }
  } else {
    responseNode = NextResponse.next();
  }

  // 5. Apply Headers
  responseNode.headers.set('Content-Security-Policy', cspHeader);
  responseNode.headers.set('X-DNS-Prefetch-Control', 'on');
  responseNode.headers.set('X-Frame-Options', 'DENY');
  responseNode.headers.set('X-Content-Type-Options', 'nosniff');
  responseNode.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  responseNode.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  if (isProd) {
    responseNode.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    responseNode.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  }

  return responseNode;
}

export const config = {
  // Run on all paths EXCEPT static assets and Next.js internals to ensure CSP is applied to all HTML pages
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
