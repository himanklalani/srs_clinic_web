import fs from 'fs';
import path from 'path';

async function fixBlogs() {
  const url = 'https://srs-website.onrender.com';
  const token = 'super_secret_dynamic_admin_token_for_dental_clinic_123456';
  
  // 1. Fetch all blogs to find duplicates
  const res = await fetch(`${url}/api/v1/blogs/admin/all`, {
      headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await res.json();
  const allSlugs = data.blogs.map((b: any) => b.slug);
  
  // 2. Delete the timestamped ones
  const toDelete = allSlugs.filter((s: string) => /\-\d{13}$/.test(s));
  for (const slug of toDelete) {
      console.log(`Deleting duplicate: ${slug}`);
      await fetch(`${url}/api/v1/blogs/${slug}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
      });
  }

  // 3. Update the 12 main blogs with the rich content
  const blogsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seo_blogs_seed.json'), 'utf-8'));
  
  // Map my intended simple slugs to the actual slugs in the DB
  const slugMap: Record<string, string> = {
    "best-dental-clinic-in-bandra": "best-dental-clinic-in-bandra-what-to-look-for",
    "invisible-aligners-cost-mumbai": "how-much-do-invisible-aligners-cost-in-mumbai",
    "is-teeth-whitening-safe": "is-teeth-whitening-safe-for-enamel",
    "painless-root-canal-bandra": "where-can-i-get-a-painless-root-canal-in-bandra",
    "full-mouth-rehab-expectations": "what-to-expect-during-full-mouth-rehab",
    "how-long-do-dental-implants-last": "how-long-do-dental-implants-last",
    "best-pediatric-dentist-bandra": "best-pediatric-dentist-near-me-a-parents-guide",
    "fix-gummy-smile-cosmetic-dentistry": "can-cosmetic-dentistry-fix-a-gummy-smile",
    "wisdom-tooth-surgery-recovery-time": "what-is-the-recovery-time-for-wisdom-tooth-surgery",
    "ceramic-vs-metal-braces": "are-ceramic-braces-better-than-metal",
    "how-to-fix-bleeding-gums": "how-to-fix-bleeding-gums-naturally",
    "emergency-dental-clinic-bandra": "emergency-dental-clinic-open-now-in-bandra"
  };

  for (const blog of blogsData) {
      const targetSlug = slugMap[blog.slug];
      if (!targetSlug) {
          console.log(`Skipping unknown slug: ${blog.slug}`);
          continue;
      }
      
      console.log(`Updating ${targetSlug}...`);
      const putRes = await fetch(`${url}/api/v1/blogs/${targetSlug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
              ...blog,
              author: 'Dr. Saachi Shingrani',
              published: true
          })
      });
      if (putRes.ok) {
          console.log(`✅ Success: ${targetSlug}`);
      } else {
          console.log(`❌ Failed: ${targetSlug}`, await putRes.json().catch(()=>({})));
      }
  }
}

fixBlogs();
