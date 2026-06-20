import fs from 'fs';
import path from 'path';

async function main() {
  const url = process.argv[2];
  if (!url) {
    console.log("Usage: npx tsx postProdBlogs.ts <PROD_API_URL>");
    process.exit(1);
  }
  
  const token = 'super_secret_dynamic_admin_token_for_dental_clinic_123456';
  const blogsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'seo_blogs_seed.json'), 'utf-8'));
  
  let successCount = 0;

  for (const blog of blogsData) {
    try {
      const payload = {
        ...blog,
        author: 'Dr. Saachi Shingrani',
        published: true,
      };

      console.log(`Updating ${blog.title}...`);
      const putRes = await fetch(`${url}/api/v1/blogs/${blog.slug}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
      });
      if (putRes.ok) {
          console.log(`✅ Successfully updated: ${blog.title}`);
          successCount++;
      } else {
          const err = await putRes.json().catch(()=>({}));
          console.log(`❌ Failed to update ${blog.title}: ${putRes.status}`, err);
      }
    } catch (e: any) {
      console.log(`❌ Network error for ${blog.title}: ${e.message}`);
    }
  }

  console.log(`\nFinished! Successfully processed ${successCount}/${blogsData.length} blogs.`);
}

main();
