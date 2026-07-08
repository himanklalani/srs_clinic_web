# Universal Website SEO Playbook
### A step-by-step system (derived from a real completed project) that you can apply to any website

This plan is built from a real, successful SEO project done on a B2B website (Lalani Computers). It generalizes what actually worked so you can run the same process on any other site — e-commerce, services, B2B, blogs, anything. Follow it phase by phase. Each phase has a "gate" — don't let the AI/developer move to the next phase without your approval.

---

## PHASE 0 — Ground Rules (set this BEFORE any work starts)

Give these hard constraints to whoever/whatever is doing the work (an AI coding assistant, a freelancer, your dev team). This single step prevented the most damage in the original project.

**Paste this as your opening brief:**

> This is an SEO and content optimization project, not a redesign project.
> - Do not redesign the site, change branding, colors, fonts, spacing, styling, or UI theme.
> - Do not modify animations, transitions, or interactive behavior.
> - Do not replace/remove images unless explicitly instructed.
> - Do not change URLs without strong SEO justification + a redirect plan.
> - Do not delete existing content without flagging it first.
> - In discovery/planning phases, only audit and recommend — no code changes.
> - Implement changes only after I approve a plan.
> - Confirm my business offerings from the site itself before building any strategy — don't assume.

---

## PHASE 1 — Full Site Discovery (audit only, no changes) **[x] DONE**

**Goal:** Understand everything that exists before touching anything.

Tasks to run:
1. Crawl/list every page and route in the site (for code-based sites: list every file under the routing folder, e.g. `app/`, `pages/`, `src/routes/`).
2. Extract for every page: URL, title tag, meta description, canonical tag, H1–H3 headings, body content, image alt text, JSON-LD/schema, internal links, and which template/component it uses.
3. Build a **service/topic inventory** — every product, service, or topic the business actually covers (not just what's featured on the homepage).
4. Flag technical SEO issues:
   - Broken/duplicate canonical tags (e.g. every page pointing to `/`)
   - Sitemap entries that point to pages that don't actually exist ("phantom URLs" → 404s)
   - Missing or duplicated meta titles/descriptions across pages
   - Missing or generic JSON-LD schema (or the same schema copy-pasted on every page)
   - Robots.txt issues (accidentally blocking pages, missing sitemap reference)
5. Flag content/UX issues:
   - Thin content pages (a whole product category crammed onto one page with <300 words)
   - Weak heading hierarchy (no real H2/H3 structure)
   - Missing alt text on images
   - Orphaned pages (they exist but aren't linked from navigation/footer, so crawlers/users can't find them in ≤2 clicks)

**Deliverable:** A single discovery report with: URL inventory, service/topic inventory, SEO issues list, content/UX issues list, and a prioritized "top problems" summary.

**Gate:** Stop here. Review the report. Do not let anything get rewritten yet.

---

## PHASE 2 — Competitor & Keyword Research (audit only) **[x] DONE**

**Goal:** Know why competitors outrank you before writing anything.

Tasks:
1. Identify who actually ranks above you for your core services (search your key terms + city/region and note who shows up).
2. For each top competitor, compare against your own pages on:
   - Content depth (word count, specificity)
   - Keyword targeting (broad vs. granular — "IT products" vs. "Dell PowerEdge servers Mumbai")
   - Heading structure and use of FAQs
   - Metadata quality
   - Internal linking depth
   - Trust signals (case studies, badges, reviews)
3. Build **keyword clusters** grouped by actual service/product line (not generic terms).
4. Sort every keyword group by **search intent**:
   - Transactional ("buy X in [city]", "get a quote") → needs a deep product/category page with a fast CTA (WhatsApp/call/form)
   - Investigational ("best X for Y", "how to set up Z") → needs a guide/solutions page with process + trust signals
   - Navigational/local ("[brand] [neighborhood]") → needs Local Business schema, NAP consistency, Google Maps embed
5. Rank opportunities by **effort vs. impact** (a simple table works: Priority | Opportunity | Effort | Impact | Why).

**Deliverable:** Competitor gap analysis + keyword clusters + intent map + prioritized opportunity list.

**Gate:** Stop here. Review before any pages get built.

---

## PHASE 3 — Information Architecture & Content Mapping (plan only) **[x] DONE**

**Goal:** Decide the page structure before writing a single word.

The single most important rule from the real project:

> **Google ranks pages, not websites. One page = one search intent.**
> Never try to stuff multiple unrelated keyword intents (e.g. high-ticket B2B servers *and* "best laptop under 50,000") onto the same page — it dilutes relevance and the page ends up ranking for nothing.

Tasks:
1. For every high-priority keyword cluster from Phase 2, decide: does an existing page already own this intent, or does it need a **new dedicated page**?
2. When adding new pages for adjacent/consumer-style keywords (e.g. a B2B site wanting to also catch B2C searches), **don't dump them in a generic disconnected `/blog`** — nest them under your existing high-authority hub so they inherit topical authority. Example pattern:
   - `/products/computing/leasing-vs-buying-corporate-laptops`
   - `/solutions/data-center/sme-server-room-guide`
   - `/solutions/office-setup/startup-checklist-2026`

   This borrows the SEO equity of your established hub pages instead of starting a brand-new, unlinked content silo from zero.
3. Map internal linking: every new/deep page must be reachable from somewhere in the main navigation, footer, or a homepage element — in the original project, deep pages were completely orphaned (existed, but zero clicks led to them) until this was fixed.
4. Decide the **redirect plan** for anything whose URL must change (map old URL → new URL, 301 redirects, never silently drop a URL that already has traffic/links).

**Deliverable:** A page-by-page architecture map + list of new pages to build + internal linking plan.

**Gate:** Get explicit sign-off on the URL slugs and structure before building.

---

## PHASE 4 — Technical SEO Fixes (the foundational layer) **[x] DONE**

These are usually the highest-leverage, lowest-effort fixes. Do these first once you're cleared to implement.

1. **Fix canonical tags.** Every page needs a canonical tag pointing to *itself* (its own full URL), not a single hardcoded canonical in a global layout pointing everyone back to the homepage. This single bug alone can be why an entire site fails to get sub-pages indexed.
2. **Sync the sitemap with reality.** Remove/fix any sitemap URL that 404s. Add every new page you build to the sitemap the same day you build it.
3. **Check robots.txt.** Make sure it isn't blocking anything important, and add `Sitemap: https://yourdomain.com/sitemap.xml` to the bottom of it so Google can auto-discover it.
4. **Add structured data (JSON-LD schema):**
   - Global: `Organization` + `LocalBusiness` (name, address, phone, logo)
   - Per-service page: `Service` schema
   - Per-article page: `Article` schema
   - Avoid injecting the exact same schema block globally on every page — make it page-specific where it matters.
5. **Verify site ownership in Google Search Console** (DNS TXT record via your domain registrar/host) and **submit the sitemap** inside GSC.
6. **Fix on-page basics:** meta titles/descriptions unique per page, proper H1→H2→H3 hierarchy, descriptive alt text on all images.
7. **Add Open Graph / Twitter Card metadata** (title, description, and a **real, working image URL** — a placeholder or broken image will silently kill the entire preview card on WhatsApp/LinkedIn/etc.). Test with a cache-busting query string (`?v=1`) if a platform has already cached a broken preview.

**Gate:** Run a production build after every batch of changes to confirm nothing broke (`npm run build` or equivalent) before pushing live.

---

## PHASE 5 — Build the Missing Pages **[x] DONE**

1. Build the dedicated landing pages identified in Phase 3, reusing your existing UI components/design system (no new visual style — just new indexable content in the existing look).
2. Each page should include:
   - A clear H1 matching the target keyword
   - 300–1000+ words of specific, genuinely useful content (not just a bullet list bolted onto a template)
   - A comparison table where relevant (great for featured snippets)
   - Internal links to related product/solution pages
   - A single, obvious conversion action (WhatsApp click-to-chat with a pre-filled message, a quote form, a phone CTA)
3. Wire up navigation and footer links so every new page is discoverable in ≤2 clicks from the homepage — don't rely on the footer alone.
4. Add a WhatsApp/enquiry button pattern per product, prefilled with context, e.g.:
   `https://wa.me/<number>?text=Hi, I was looking for <product name>`

---

## PHASE 6 — High-Volume / Adjacent Keyword Content **[ ] PENDING**

If there's search volume adjacent to your core business (e.g. a B2B supplier also wants to catch consumer searches like "best laptop under 50,000"):

1. Confirm the angle won't cannibalize your core commercial pages — reframe toward your actual buyer if needed (e.g. "Best *Business* Laptops Under ₹50,000" instead of a pure consumer angle).
2. Write each price-bracket/comparison page as its own dedicated URL nested under the relevant hub (see Phase 3 rule).
3. Include a CTA that funnels consumer-intent readers toward your actual conversion path (bulk/corporate purchase, WhatsApp quote, etc.) rather than assuming they're a different customer type entirely.

---

## PHASE 7 — Indexing & Verification **[ ] PENDING (Manual GSC Task)**

1. In Google Search Console, use **Request Indexing** on your homepage and any newly built priority pages.
2. Test structured data using Google's Rich Results Test on live URLs — confirm green checkmarks for Organization/LocalBusiness/Service/Article schema.
3. Re-check the sitemap in GSC to confirm all new URLs are listed and being crawled (not just submitted).

---

## PHASE 8 — Off-Page / Backlinks (a simple 7-day sprint) **[ ] PENDING**

Goal: build a natural, diverse backlink profile — not just one type of link.

| Link type | Source examples | What it does |
|---|---|---|
| Local directories | Justdial, Sulekha, IndiaMART (or your country's equivalents) | Local trust signals; usually "nofollow" but great for local discovery |
| Social profiles | LinkedIn, Instagram, Facebook | Brand signals, discovery |
| B2B/company databases | Crunchbase, Clutch | High domain authority; signals a "real established company" to enterprise buyers and to Google |
| Partner/vendor links | Existing distributors, long-term clients, suppliers | Highest quality — real relevant relationship links |

A simple outreach template for partners (adjust tone to your relationship):

> Subject: Quick update regarding our partnership
> Hi [Name], we're updating our digital presence and would love to be listed as a partner on your site. Could you add a link to [yourdomain.com] on your Partners/Vendors page? Happy to send over our logo file.

**Tracking:** In GSC → Links → Top linking sites (External Links). New backlinks typically take 7–21 days to appear after the actual link goes live — don't panic if it's not immediate.

---

## PHASE 9 — Ongoing Monitoring **[ ] PENDING**

Recurring checklist (weekly/biweekly):
- GSC Performance report: track average position, impressions, clicks per query — expect some short-term fluctuation (average position can dip slightly as you get indexed for *more*, harder, competitive terms — that's often a good sign, not a bad one).
- GSC Coverage report: confirm no new crawl errors or 404s appear after each deploy.
- GSC Links report: confirm new backlinks are being discovered.
- Re-run Rich Results Test after any schema changes.
- Re-audit content quarterly: are new competitors appearing? Any new service lines to add pages for?

---

## Common Pitfalls (learned the hard way in the real project — avoid these)

1. **The canonical trap** — a single hardcoded canonical tag in a global layout pointing everything to `/` will silently deindex your entire site's sub-pages. Always use page-specific canonicals.
2. **Phantom sitemap URLs** — don't list URLs in your sitemap that don't actually exist as pages yet; it wastes crawl budget and creates 404s.
3. **One page, one intent** — resist the urge to cram multiple keyword intents onto a single page "to save time." It backfires.
4. **Broken OG image = no preview at all** — a placeholder image string will cause WhatsApp/LinkedIn to silently drop the whole preview card, not just the image.
5. **Platform preview caching** — once WhatsApp/LinkedIn caches a broken preview for a URL, fixing the code isn't enough; force a refresh with a `?v=1`-style query parameter.
6. **Git hygiene** — when working with a developer/AI on a live codebase, only commit and push the actual application files needed for the SEO change; leave local audit notes, scratch scripts, and planning docs out of the repo push.
7. **Orphaned pages** — a page can be perfectly optimized and still get zero traffic if it's not linked from anywhere a crawler or user would find it.

---

## PHASE 10 — Site Speed & Core Web Vitals (not covered in the original project, but critical) **[x] PARTIALLY DONE**

Google uses page experience signals as a ranking factor. Check these on every major page:

1. **Run PageSpeed Insights / Lighthouse** on your top 10 pages (mobile score matters most — Google indexes mobile-first).
2. Watch the three Core Web Vitals:
   - **LCP** (Largest Contentful Paint) — main content should load under ~2.5s. Usually fixed by compressing/optimizing hero images and reducing render-blocking scripts.
   - **INP** (Interaction to Next Paint) — how fast the page responds to clicks/taps. Usually fixed by trimming heavy JS.
   - **CLS** (Cumulative Layout Shift) — page shouldn't visually jump as it loads. Usually fixed by setting explicit width/height on images and ad slots.
3. Compress and lazy-load images (serve modern formats like WebP/AVIF where possible).
4. Minimize third-party scripts (chat widgets, trackers) that aren't earning their load-time cost.

---

## PHASE 11 — Local SEO (if the business has a physical presence or service area) **[ ] PENDING**

This was touched on lightly (LocalBusiness schema) but deserves its own checklist:

1. **Claim and fully complete a Google Business Profile** — category, hours, services, photos, service area. This is often a bigger local-ranking lever than on-site schema alone.
2. **NAP consistency** (Name, Address, Phone) — must match *exactly* across your website, Google Business Profile, and every directory listing. Mismatches (e.g. "Rd" vs "Road") quietly hurt local rank.
3. Actively collect and respond to **Google reviews** — review count, recency, and your responses all factor into local ranking.
4. Embed a Google Map on your contact page, not just an address in text.
5. If you serve multiple cities/regions, consider dedicated location pages rather than one generic "areas we serve" page — but only if each has genuinely distinct content (see Phase 3's "one page, one intent" rule).

---

## PHASE 12 — Measurement & Analytics (not covered in the original project) **[ ] PENDING**

You can't tell if any of this worked without tracking it properly:

1. Install **Google Analytics 4** and **Google Search Console** on day one if not already there (this playbook assumed GSC existed — set it up if it doesn't).
2. Set up **conversion tracking** for your actual business goal — WhatsApp click, form submit, phone click, "Request a Quote" — not just pageviews.
3. Create one simple recurring report: organic traffic, top landing pages, top queries, conversion rate from organic — reviewed monthly, not just after a big push.
4. Tag campaign/backlink sources with UTM parameters where you control the placement (partner links, email outreach, social bios) so you can see which sources actually convert, not just which ones send clicks.

---

## PHASE 13 — E-E-A-T & Trust Signals (Experience, Expertise, Authoritativeness, Trust) **[x] PARTIALLY DONE**

Google explicitly evaluates this, especially for anything touching money, safety, or business decisions (which most B2B/service sites do):

1. Show **real authorship** on guides/articles where possible — a named person with relevant credentials beats an anonymous "Admin" byline.
2. Feature **case studies with specifics** (client type, problem, what was deployed, outcome) rather than vague "we've helped many clients" language.
3. Display **certifications, partner badges, years in business, and client logos** prominently — not buried.
4. Keep an **About page** that actually explains who runs the business, not just a mission-statement paragraph.
5. Make sure **contact information and business legitimacy** are easy to find (physical address, phone, registration details where relevant) — thin/anonymous sites are trusted less by both users and Google.

---

## PHASE 14 — Content Maintenance (ongoing, often skipped) **[ ] PENDING**

SEO isn't a one-time project — content decays:

1. Revisit and update your highest-traffic pages every 6–12 months (refresh stats, prices, model names, screenshots).
2. Check for **keyword cannibalization** periodically — two pages accidentally competing for the same query (easy to create if you're not careful when adding new nested pages per Phase 3/6).
3. Watch for pages that used to rank and dropped — often a sign a competitor refreshed their content, or something broke technically (check GSC Coverage report).
4. Prune or consolidate truly thin/outdated pages rather than letting them dilute the site's overall quality signal.

---

## PHASE 15 — A Few More Technical Basics Worth Checking **[x] DONE**

- **HTTPS everywhere**, no mixed-content warnings.
- **No broken internal links** (run a crawler like Screaming Frog or a free equivalent periodically).
- **Proper 301 redirects** (not 302) for any permanently moved URL, and no redirect chains (A→B→C — point straight A→C).
- **Breadcrumb navigation + Breadcrumb schema** on deep pages — helps both users and search snippets.
- **XML sitemap should exclude** noindex'd, thin, or utility pages (login, cart, thank-you pages) — don't pad it with pages you don't want ranked.
- If you ever operate in multiple languages/countries, use **hreflang tags** — this wasn't relevant to the original project but matters a lot for multi-region sites.

---

## Reusable Kickoff Prompt (for any new site)

Copy this when starting the process on a new website with an AI coding assistant:

> You have access to my website's codebase and live site for [domain.com]. Improve the site's SEO, structure, content quality, and conversion clarity across ALL of my services — not just the most obvious one. First understand everything the business offers by reviewing the actual codebase/site, then build the strategy from that. This is SEO/content optimization only — no redesign, no branding/style changes, no URL changes without a redirect plan, no code changes until I approve a plan. Start with Phase 1: full site discovery. Do not rewrite or change anything yet — just report findings.

