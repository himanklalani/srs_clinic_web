import fs from 'fs';
import path from 'path';

// Define the exact URL here. If the user hasn't provided it, we can ask them to run it with the URL.
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

      const res = await fetch(`${url}/api/v1/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        console.log(`✅ Successfully posted: ${blog.title}`);
        successCount++;
      } else {
        const errorData = await res.json().catch(() => ({}));
        
        // If it already exists, maybe try to update it using PUT
        if (errorData.error && errorData.error.includes('duplicate')) {
            console.log(`⚠️ Blog already exists, updating: ${blog.title}`);
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
                console.log(`❌ Failed to update ${blog.title}: ${putRes.status}`);
            }
        } else {
            console.log(`❌ Failed to post ${blog.title}: ${res.status}`, errorData);
        }
      }
    } catch (e: any) {
      console.log(`❌ Network error for ${blog.title}: ${e.message}`);
    }
  }

  console.log(`\nFinished! Successfully processed ${successCount}/${blogsData.length} blogs.`);
}

main();
