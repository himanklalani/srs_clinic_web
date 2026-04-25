Project: Dr. Saachi Shingrani's Dental Clinic Website
Stack: Next.js 15 (App Router), Node.js, Express, MongoDB, Tailwind CSS
Theme: Luxe Violet Atelier — No flat whites. 5-layer warm-lavender surface system.
Theme Colors: #6d28d9, #1e0842, #f5f0ff, #ede9fe (Detailed in Section 11)
Language: TypeScript everywhere
No hardcoded API keys — always use .env.local
No wide-open CORS

Semantic HTML Rule: Build with semantic HTML elements first. Only add ARIA
attributes when a native element cannot describe a dynamic state
(like aria-expanded) or a custom component (like a modal).

Image & Video Strategy: Cloudinary (f_auto, q_auto).
- Images: AVIF preferred.
- Videos: AV1/VP9/WebM preferred.
- Automatic optimization: Always append `q_auto` and `f_auto` to Cloudinary URLs.

MOBILE-FIRST RULE (NON-NEGOTIABLE): Every UI component and page must look
equal to or better on mobile than on desktop. Always design the mobile
layout first (320px → 768px), then scale up to desktop (1280px+). No
component ships if it looks worse on a phone than a widescreen monitor.
Test every component at 320px, 375px, 768px, and 1280px before marking done.
Hamburger menus, grids, carousels, and forms must be fully thumb-friendly.

---

# 📖 Full Project Reference Guide

## 1. What Is This Project?

This is the official website for **Dr. Saachi Shingrani's Dental Clinic**, a premium solo-practitioner
dental practice based in Mumbai. The site is a marketing, appointment-booking, and content-publishing
platform. There is exactly **one doctor** (Dr. Saachi Shingrani). Do not add placeholder "team" members.

**Live user flows:**
1. Patient → reads about services → books an appointment
2. Doctor (admin) → visits secret URL → posts/edits/deletes blog articles → reads contact submissions
3. Patient → reads health blogs
4. Patient → submits a contact/enquiry form

---

## 2. Architecture Overview

```
d:/ANTIGRAVITY 1ST PROJECY/
├── frontend/   ← Next.js 16 App Router — port 3000
└── backend/    ← Express + TypeScript — port 5000
```

All frontend-to-backend API calls go to `http://localhost:5000/api/v1/...`.
This base URL is controlled by the env var `NEXT_PUBLIC_API_URL=http://localhost:5000`.
**Never hardcode `localhost:5000` directly in components.**

### Caching rule — CRITICAL
Blog listing (`/blogs`) and blog detail (`/blogs/[slug]`) use `cache: 'no-store'` so new posts
appear **instantly** without any server restart. Do NOT re-introduce `revalidate` or
`generateStaticParams` on these pages — it will break live publishing.

---

## 3. Frontend Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| **Next.js** | 16.x (App Router) | Framework, routing, SSR/SSG |
| **React** | 19.x | UI rendering |
| **TypeScript** | 5.x | Type safety everywhere |
| **Tailwind CSS** | 4.x | Utility-first styling (no inline styles) |
| **Framer Motion** | 12.x | Scroll-reveal, whileInView animations, page transitions |
| **GSAP + ScrollTrigger** | 3.x | Complex scroll-pinning, parallax, stagger |
| **Lenis** | 1.x | Global smooth scroll (wraps native browser scroll) |
| **Lucide React** | 0.577.x | Icon set — use this for ALL icons; never use emoji as icons |
| **class-variance-authority** | 0.7.x | Variant-based component styling (Button, Badge) |
| **tailwind-merge** | 3.x | Safely merges Tailwind classes without conflicts |
| **sanitize-html** | 2.x | Sanitizes blog HTML before rendering — XSS protection |
| **next-cloudinary** | 6.x | Optimized image delivery (AVIF, automatic resizing) |
| **styled-components** | 6.x | Used ONLY for hover-animation-button; avoid for new components |
| **react-icons** | 5.x | Legacy fallback icon set — prefer lucide-react for new work |

### Google Fonts (loaded via `next/font`)
| Variable | Font | Usage |
|---|---|---|
| `--font-inter` / `font-inter` | Inter | Body text, paragraphs, UI labels |
| `--font-playfair` / `font-playfair` | Playfair Display | Section headings, doctor name, blog titles |
| `--font-instrument` / `font-instrument` | Instrument Serif | Large display/banner text (hero, "EXPERIENCE PERFECTION") |

---

## 4. Backend Tech Stack

| Tool | Purpose |
|---|---|
| **Express.js** | HTTP server and REST API |
| **TypeScript** | Type safety |
| **Mongoose** | MongoDB ODM — schemas, validation, queries |
| **MongoDB** | Data persistence (Atlas in production, local in dev) |
| **Helmet** | Automatically sets secure HTTP headers |
| **cors** | Restricts which origins can call the API |
| **express-rate-limit** | Prevents abuse (global: 100 req/15min; blog POST: 50/hr) |
| **cookie-parser** | Available for future session/JWT auth |
| **dotenv** | Loads `backend/.env` at startup |
| **cloudinary** | SDK for secure image/video uploads, lifecycle management, and dynamic transcoding (f_auto) |
| **body-parser** | 50MB payload limit configured to support high-res media uploads |

**Database name:** `dental_clinic`
**Collections:** `blogs`, `contacts`
**Connection env var:** `MONGODB_URI`
**Local default:** `mongodb://localhost:27017/dental-clinic`

---

## 5. Data Models

### Blog (`/backend/src/models/Blog.ts`)
```ts
{
  title: string        // Required
  slug: string         // Required, unique, URL-safe identifier, indexed
  content: string      // Required, full sanitized HTML body
  excerpt: string      // Required, short summary for blog cards
  coverImage: string   // Cloudinary secure URL (stored after base64 upload) — defaults to ''
  author: string       // Required — typically "Dr. Saachi Shingrani"
  tags: string[]       // e.g. ["orthodontics", "implants"]
  published: boolean   // false by default — must be set true to show publicly
  createdAt / updatedAt: Date  // Auto-managed by Mongoose timestamps
}
```

### Contact (`/backend/src/models/Contact.ts`)
```ts
{
  name: string     // Required
  email: string    // Required
  phone: string    // Required
  message: string  // Required
  createdAt: Date  // Auto-managed
}
```

---

## 6. API Routes Reference

### Blog Routes — `/api/v1/blogs`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | Public | All published blogs |
| GET | `/:slug` | Public | One blog by slug |
| POST | `/verify-token` | Token in body | Validates admin token |
| GET | `/admin/all` | Token in body | All blogs (including unpublished) |
| POST | `/` | Token in body | Create new blog (rate-limited: 50/hr) |
| PUT | `/:slug` | Token in body | Edit existing blog |
| DELETE | `/:slug` | Token in body | Delete a blog |

### Contact Routes — `/api/v1/contacts`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/` | Public | Submit contact/enquiry form |
| GET | `/admin` | Token in body | Read all contact submissions |

### Health Check
`GET /api/v1/health` → `{ status: "ok" }` — useful for deployment pings

---

## 7. Admin Access — No Login Page (By Design)

**There is intentionally no login page.** Admin access uses a **secret-URL token pattern**:

```
http://localhost:3000/blog-admin/<BLOG_SECRET_TOKEN>
```

**Current token (dev):** `super_secret_dynamic_admin_token_for_dental_clinic_123456`

### How it works
1. The Next.js page `/blog-admin/[token]` reads the token from the URL params
2. On mount it calls `POST /api/v1/blogs/verify-token` with the token
3. If valid → the full admin UI renders (CRUD of blogs + view contacts)
4. If invalid → nothing sensitive is exposed; the UI stays blank

### Security reasoning
- This clinic has exactly one admin (the doctor). A complex login system is overkill
- A 50+ character random token makes brute force statistically impossible
- The backend uses Node's `crypto.timingSafeEqual` to prevent timing attacks on token checks
- **The token must NEVER appear in frontend commits, `console.log`, or public files**

### How to rotate the token
Edit `BLOG_SECRET_TOKEN` in `backend/.env`, then restart the backend. Update your bookmarked admin URL.

### Future upgrade path
If multiple staff ever need access: install `next-auth` (email/password or Google OAuth).
The `cookie-parser` middleware is already included in the backend to support JWT sessions.

---

## 8. Frontend Pages

| Route | Render Type | Description |
|---|---|---|
| `/` | SSR → Client | Homepage (Hero → Services → About → Stats → Testimonials → Gallery → Location) |
| `/about` | Server + Client | Doctor profile, biography, career timeline (Dr. Saachi only — no fake team) |
| `/treatments` | Server | List and details of all dental treatment services |
| `/blogs` | Server (no-cache) | All published blog posts — **no caching**, renders fresh per request |
| `/blogs/[slug]` | Server (no-cache) | Individual blog article — sanitized HTML rendered with `dangerouslySetInnerHTML` |
| `/book` | Client | Appointment booking form (frontend-only form; backend route not yet wired) |
| `/contact` | Client | Patient enquiry/contact form — submits to `POST /api/v1/contacts` |
| `/blog-admin/[token]` | Client | Admin dashboard — create, edit, delete blogs; view contact submissions |

---

## 9. Component Directory Map

```
src/components/
│
├── sections/                   ← Full-page section blocks used in HomeClient.tsx
│   ├── HeroSection.tsx           Hero banner with GSAP/Lenis scroll effect
│   ├── AboutDoctorSection.tsx    Progressive blur scroller (expertise) + Dr bio + GSAP
│   ├── DentalFeaturesSection.tsx Feature cards
│   ├── ServicesCarouselSection.tsx  Horizontal scroll carousel of services
│   ├── TreatmentsGridSection.tsx Quick treatment grid
│   ├── TreatmentsTransitionPanel.tsx Animated tab switcher for treatments
│   ├── StatsSection.tsx          Animated counters (patients, years, etc.)
│   ├── TestimonialsSection.tsx   Floating display cards with patient reviews
│   ├── GallerySection.tsx        Before/after gallery images
│   └── LocationSection.tsx       Map & clinic address
│
├── animations/                 ← Reusable animation primitives
│   ├── BlurText.tsx              Blur → sharp text reveal (Framer Motion)
│   ├── CountUp.tsx               Number counter animation on scroll
│   ├── GlowCard.tsx              Card with cursor-tracking glow
│   ├── MagneticButton.tsx        Button that follows cursor magnetically
│   ├── ScrollReveal.tsx          Generic fade-up reveal on scroll
│   └── SplitText.tsx             Per-character stagger animation
│
├── forms/                      ← Admin form components
│   ├── AdminBlogForm.tsx         Blog create/edit form with preview
│   ├── BlogViewer.tsx            Admin blog list with inline delete confirmation
│   └── DashboardClient.tsx       State manager for admin dashboard
│
├── providers/                  ← Context wrappers
│   ├── ClientProviders.tsx       Initializes Lenis smooth scroll globally
│   └── TransitionProvider.tsx   Framer Motion page enter/exit transitions
│
├── ui/                         ← Atomic UI components
│   ├── Button.tsx                Styled button (CVA variants: default, outline, ghost)
│   ├── hover-animation-button.tsx  Animated gradient pill button (styled-components)
│   ├── text-roll.tsx             3D letter-roll animation triggered by whileInView
│   ├── progressive-blur.tsx      Gradient fade mask — top or bottom, configurable
│   ├── modern-timeline.tsx       Career timeline with Framer Motion stagger entries
│   ├── display-cards.tsx         Floating testimonial cards component
│   ├── zoom-parallax.tsx         Scroll-driven parallax zoom with video/modal support
│   ├── VideoModal.tsx            Standalone responsive video player with speed/mute controls
│   ├── LazyVideo.tsx             IntersectionObserver-based smart video lazy loading
│   ├── transition-panel.tsx      Animated sliding content tabs
│   ├── image-comparison.tsx      Motion-based before/after image slider
│   ├── navigation-menu.tsx       AnimatedNavFramer — the main Navbar (sticky, animated)
│   ├── sheet.tsx                 Mobile slide-in drawer (used inside navigation-menu)
│   ├── shadcn-card.tsx           Shadcn base card primitives (Card, CardContent, etc.)
│   ├── badge.tsx                 Status badge (Completed / Current / Upcoming)
│   ├── Card.tsx                  Earlier basic card — retained for legacy use
│   ├── label.tsx                 Form field label
│   ├── input.tsx                 Styled input
│   ├── Textarea.tsx              Styled textarea
│   ├── BackButton.tsx            Global back-navigation button (shown on sub-pages)
│   ├── SectionHeader.tsx         Reusable section title + subtitle block
│   ├── WhatsAppButton.tsx        Global sticky floating WhatsApp chat action
│   └── Typography.tsx            Typed text variants
│
├── Navbar.tsx              ← Old navbar (superseded by AnimatedNavFramer — keep but do not use)
├── Footer.tsx              ← Full footer with nav links and social icons
├── HomeClient.tsx          ← 'use client' wrapper orchestrating the entire homepage
├── BlogCard.tsx            ← Card used on /blogs listing page
├── HeroBanner.tsx          ← Simpler banner used on inner pages (about, treatments, etc.)
├── Breadcrumb.tsx          ← Breadcrumb nav for inner pages
└── PageLink.tsx            ← Client-side link wrapper (uses Next.js router.push)
```

---

## 10. Animation System

The site uses a **three-layer animation system**. Follow these strictly — do not mix tools randomly:

| Layer | Tool | When to Use |
|---|---|---|
| Scroll-reveal (fade/slide/scale) | **Framer Motion** `whileInView` | Default choice for all component entrances |
| Complex scroll binding / scrubbing | **GSAP + ScrollTrigger** | Sticky pinning, timeline scrubbing, tightly synced parallax |
| Per-character text | **SplitText.tsx** (Framer Motion) | Staggered character-by-character animations |
| 3D rolling letter banner | **TextRoll** `text-roll.tsx` | "EXPERIENCE PERFECTION"-style banners |
| Number counters | **CountUp.tsx** | Stats section — numbers animate on scroll |
| Blur text entrance | **BlurText.tsx** | Soft blur → sharp reveal |
| Image Comparison Slider | **image-comparison.tsx** (motion/react) | Before/after treatment visuals |
| Global page scroll | **Lenis** (via ClientProviders) | Replaces native scroll — do not remove |
| **Smart Video Lazy Load** | `IntersectionObserver` | Applied in `LazyVideo.tsx` to stop background/gallery videos from competing for bandwidth until near viewport. |
| **LQIP Placeholders** | Cloudinary URL generation | Instantly loads tiny 20px blurred images via `w_20,e_blur:500` before fading in full-res files. |
| **Full-Screen Lightbox**| Framer Motion `AnimatePresence` | Used in GallerySection to display maximum quality (q_auto instead of auto-compressed sizes) images cleanly. |
| **GPU Acceleration** | `will-change: transform` | Applied ONLY to video nodes inside full-screen parallax blocks to ensure 60fps mobile video scaling. Exception: Excluded from static center-image nodes to preserve max-fidelity sharpness without GPU texture-stretching blur. |
| Page enter/exit | **TransitionProvider** | Full page transition animations |
| Content edge masking | **ProgressiveBlur** | Fade content at top/bottom of scrollable containers |
| Success/Celebration states | **canvas-confetti** | Used for booking confirmations and primary success events |
| **Component Code Splitting** | `next/dynamic` | Used on below-the-fold sections (`HomeClient.tsx`) to massively reduce initial JS main-thread block time. |

### Critical animation rules
- Always use `viewport={{ once: true }}` — prevents re-animation on scroll-back
- Always set `margin` on viewport (e.g. `margin: "-15%"`) so animation starts when element is well into view, not as it just enters the screen
- **Function Props**: Never pass function props from Server Components to Client Components — Next.js will crash with a hydration error.
- **Overlay Interaction**: Use `pointer-events-none` on full-screen wrappers and `pointer-events-auto` on child elements to ensure clicks punch through overlapping layers.
- **Performance**: Always use `will-change: transform` for high-frequency scroll animations to avoid mobile stutter.
- **Scroll Sync**: Lenis and GSAP's `ScrollTrigger` MUST be synced via `gsap.ticker.add` in `SmoothScrollProvider` to prevent scroll-fighting and jitter.
- **Micro-Animations**: Use `.shimmer`, `.glow-card`, and `.orb` utility classes from `Luxe Violet Atelier` for atmospheric richness.

---

## 11. Global Styling & Theme

### Tailwind CSS Variables (Luxe Violet Atelier — defines Section 11)
```css
/* Core Palette */
--primary:       #6d28d9    /* Bolder Violet — main brand color */
--primary-mid:   #8b5cf6    /* Mid purple for accents */
--primary-dark:  #3b0764    /* Deep ink purple for text/dark areas */

/* 5-Layer Surface System (Removes Empty Whitespace) */
--bg-base:       #f5f0ff    /* Main warm-lavender background */
--bg-section:    #f9f6ff    /* Alternate section tint */
--bg-surface:    #ede9fe    /* Card/form backgrounds */
--bg-elevated:   #ffffff    /* Modal-only true white */
--bg-deep:       #1e0842    /* Dark section background */

/* Type & Status */
--text:          #1e0842    /* Deep ink-violet */
--success:       oklch(0.70 0.15 145)
--warning:       oklch(0.75 0.12 85)
```

### Atmospheric Layer (globals.css)
The design uses a global **Noise Grain** overlay at 2.2% opacity.
- `.orb-violet/orb-lavender`: Blurred ambient background glows.
- `.glass`: Frosted glass morphism for cards.
- `.bg-dots`: Subtle technical dot-grid for treatment sections.
- `.glow-card`: Interactive purple halo on hover.

### Background Decoration (RootLayout)
Three large animated blur blobs (`animate-blob`) are rendered as fixed elements behind all content
(`z-[-1]`). They produce the ambient purple/lavender glow visible throughout the site.
**Do not remove them** — they define the entire visual identity. 
*Note:* They deliberately use `will-change-transform` and opaque colors instead of `mix-blend-multiply` to ensure GPU hardware acceleration and prevent massive scroll-lag on mobile.

### Responsive Breakpoints (Tailwind defaults)
- `sm`: 640px+
- `md`: 768px+
- `lg`: 1024px+
- `xl`: 1280px+
- Always style for mobile first (no prefix), then add `sm:`, `md:`, etc.

---

## 12. Security Architecture

| Layer | What it does |
|---|---|
| **Helmet** | Auto-sets secure HTTP headers (HSTS, XSS-Protection, no-sniff) |
| **CORS whitelist** | Only whitelisted origins can call the API — update `allowedOrigins` in `server.ts` for production |
| **Global rate limit** | 100 requests per 15 minutes per IP |
| **Blog POST rate limit** | 50 blog-creation requests per hour per IP (stricter) |
| **Timing-safe token check** | Uses `crypto.timingSafeEqual` — prevents timing side-channel attacks on admin token |
| **HTML sanitization** | `sanitize-html` strips dangerous tags/attributes from blog `content` before rendering |
| **Payload Limits** | Express limits increased to `50mb` to support large base64 Cloudinary uploads |

---

## 13. Environment Variables

### `backend/.env`
```
MONGODB_URI=mongodb://localhost:27017/dental_clinic
PORT=5000
BLOG_SECRET_TOKEN=super_secret_dynamic_admin_token_for_dental_clinic_123456
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=dswvmoboh
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

### `frontend/.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dswvmoboh
```

> Note: Any env var prefixed with `NEXT_PUBLIC_` is exposed to the browser bundle.
> Never put secrets in `NEXT_PUBLIC_` vars.

---

## 14. Things That Must Never Be Changed Without Full Understanding

| Rule | Why breaking it is dangerous |
|---|---|
| `cache: 'no-store'` on `/blogs` and `/blogs/[slug]` fetch calls | Removing it makes freshly published blogs invisible until next server cycle |
| `timingSafeEqual` in blog token verification | Removing creates a timing-attack vulnerability on admin auth |
| `sanitize-html` on blog content rendering | Removing opens XSS injection from the admin editor |
| The 3 animated blobs in `RootLayout` | They are the background visual identity — removing breaks the look of every page |
| `whileInView` on `TextRoll` (not `animate`) | Switching back to `animate` fires on page load, not on scroll |
| `pointer-events-none` on `ProgressiveBlur` overlays | Without it, blur gradient divs block mouse scroll wheel events on desktop |
| CORS `allowedOrigins` list in `server.ts` | Making this `*` exposes the backend API to the entire internet |
| `NEXT_PUBLIC_API_URL` env var for API calls | Hardcoding the backend URL breaks production deployments |
| Selective `will-change: transform` | Never globally apply this to `ZoomParallax` children. It must be excluded from static high-res images, otherwise the browser caches a tiny texture map that looks awful when scaled up. Only apply to the videos. |
| `IntersectionObserver` video lazy loading | Changing `LazyVideo.tsx` back to standard `<video>` causes severe bandwidth contention, breaking the hero video load sequence on slower networks. |
| `pointer-events-none` on ZoomParallax wrappers | Removing it blocks 100% of video clicks because layers overlap full-screen |
| GSAP ticker sync in `SmoothScrollProvider.tsx` | Removing this causes Lenis and GSAP to run independent update loops, causing severe scroll jitter and layout thrashing. |
| No `mix-blend-multiply` on background blobs | Re-adding this CSS property to `.animate-blob` in `layout.tsx` forces the CPU to recalculate pixel blends on every scroll tick, causing massive lag. |

---

## 15. Planned / Not Yet Built

| Feature | Status | Notes |
|---|---|---|
| **Cloudinary image uploads** | ✅ Completed | Fully integrated with base64 conversion and AVIF optimization |
| **Blog pagination** | ✅ Completed | Backend supports `page` and `limit` query parameters |
| **Real appointment booking backend** | ⏳ Planned | `/book` form is frontend-only. Need to build: `POST /api/v1/bookings`, mongoose model, email notification via `nodemailer` |
| **Email notifications** | ⏳ Planned | After contact form submissions or bookings, the doctor should receive an email. Use `nodemailer` with an SMTP provider (Gmail App Password or SendGrid) |
| **SEO sitemap** | ⏳ Planned | Add `src/app/sitemap.ts` to auto-generate XML sitemap from blog slugs. `robots.ts` stub already exists |
| **Treatment detail pages** | ⏳ Partial | `/treatments` page exists; individual treatment sub-pages with rich content may need expansion |

---

## 16. Running Locally

```bash
# Terminal 1 — Backend
cd "d:/ANTIGRAVITY 1ST PROJECY/backend"
npm install
npm run dev          # → http://localhost:5000

# Terminal 2 — Frontend
cd "d:/ANTIGRAVITY 1ST PROJECY/frontend"
npm install
npm run dev          # → http://localhost:3000
```

| URL | What |
|---|---|
| `http://localhost:3000` | Main website |
| `http://localhost:3000/blog-admin/super_secret_dynamic_admin_token_for_dental_clinic_123456` | Admin panel |
| `http://localhost:5000/api/v1/health` | Backend health check |
