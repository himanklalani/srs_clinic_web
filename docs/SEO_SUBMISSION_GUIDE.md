# SEO Submission Guide for Dr. Saachi Shingrani's Clinic
**Prepared for Himank**

Hey Himank, here is your personal step-by-step guide to get the clinic's website submitted to all the major search engines so we can start ranking for those local dental searches in Mumbai.

## 1. Google Search Console (GSC) Setup
Google Search Console is the most important tool. It tells Google that our site exists and helps us monitor our search ranking.

**Steps:**
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Sign in with the primary clinic Google account.
3. Click "Add Property".
4. Choose **Domain** or **URL Prefix**. (I recommend URL Prefix if we're not doing heavy DNS changes right now. Just enter `https://drsaachishingrani.com`).
5. **Verify Ownership**: Follow their instructions. Usually, it gives you an HTML file to upload, or a string to put in the DNS settings. If you use URL Prefix, the easiest way is the HTML tag. You can add it into the `<head>` of our `layout.tsx` file inside `frontend/src/app/` if you take the meta tag approach.
6. **Submit the Sitemap**: Once verified, click "Sitemaps" on the left menu.
7. Enter `sitemap.xml` and click **Submit**. Google will now continuously crawl the static pages and the dynamically loaded blogs.

## 2. Bing Webmaster Tools (Important for Edge Users/Copilot)
Bing runs the default search on millions of Windows PCs and powers Copilot. 

**Steps:**
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters/about).
2. Sign in.
3. **The Easy Way:** There is an "Import from Google Search Console" button. Click that, sign in with the Google account, and it automatically imports our verification and sitemap!
4. Alternatively, you can verify it manually, similar to Google GSC.

## 3. The IndexNow Protocol
IndexNow allows us to instantly ping search engines (like Bing and Yandex, and potentially others) whenever a new blog is published.

**Steps:**
1. We need to generate an IndexNow API Key from [indexnow.org](https://www.indexnow.org/).
2. You place the generated key (e.g., `yourkey.txt`) into our `frontend/public/` folder so it solves ownership verification.
3. Have the backend ping `https://api.indexnow.org/indexnow?url=https://drsaachishingrani.com/blogs/our-new-blog&key=YOUR_KEY` whenever a new blog is successfully published. (This requires a future code update in the backend `blogController.ts`).

## 4. Ahrefs Webmaster Tools Setup (For Backlinks & Health)
Ahrefs provides a *free* webmaster tools tier that runs comprehensive SEO health audits. 

**Steps:**
1. Go to [Ahrefs Webmaster Tools](https://ahrefs.com/webmaster-tools).
2. Sign up and click "Add Project".
3. **Import from GSC**: Just like Bing, you can authenticate via Google Search Console and pull the property in automatically.
4. Set it to run a weekly crawl. It will email you if we ever break a meta tag, have a 404 error, or miss a canonical link during future updates.

## Next Steps
- Please ensure `https://drsaachishingrani.com/robots.txt` and `https://drsaachishingrani.com/sitemap.xml` are rendering correctly before submitting to GSC.
- Update the `NEXT_PUBLIC_SITE_URL` in our `.env` files to the actual domain.
- Let me know if you need help verifying the DNS records for step 1!
