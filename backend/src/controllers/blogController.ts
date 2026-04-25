import { Request, Response } from 'express';
import sanitizeHtml from 'sanitize-html';
import slugify from 'slugify';
import { v2 as cloudinary } from 'cloudinary';
import Blog from '../models/Blog';
import { verifyBlogToken } from '../utils/authToken';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2']),
  allowedAttributes: {
    ...sanitizeHtml.defaults.allowedAttributes,
    img: ['src', 'alt', 'title', 'width', 'height'],
    '*': ['class'],
  },
};

// ─── GET /api/v1/blogs ───────────────────────────────────────────────────────
export async function getAllBlogs(req: Request, res: Response): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(20, parseInt(req.query.limit as string) || 6);
    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find({ published: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Blog.countDocuments({ published: true }),
    ]);

    res.status(200).json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error('[getAllBlogs]', err);
    res.status(500).json({ error: 'Failed to fetch blogs.' });
  }
}

// ─── GET /api/v1/blogs/:slug ──────────────────────────────────────────────────
export async function getBlogBySlug(req: Request, res: Response): Promise<void> {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true }).lean();
    if (!blog) {
      res.status(404).json({ error: 'Blog post not found.' });
      return;
    }
    res.status(200).json({ blog });
  } catch (err) {
    console.error('[getBlogBySlug]', err);
    res.status(500).json({ error: 'Failed to fetch blog post.' });
  }
}

// ─── GET /api/v1/blogs/admin/all ──────────────────────────────────────────────
export async function getAdminBlogs(req: Request, res: Response): Promise<void> {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!verifyBlogToken(token)) {
    res.status(401).json({ error: 'Unauthorized.' });
    return;
  }

  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json({ blogs });
  } catch (err) {
    console.error('[getAdminBlogs]', err);
    res.status(500).json({ error: 'Failed to fetch admin blogs.' });
  }
}

// ─── POST /api/v1/blogs ───────────────────────────────────────────────────────
export async function createBlog(req: Request, res: Response): Promise<void> {
  // Timing-safe token auth
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!verifyBlogToken(token)) {
    res.status(401).json({ error: 'Unauthorized.' });
    return;
  }

  try {
    const { title, content, excerpt, coverImage, author, tags, published } = req.body;

    if (!title || !content || !excerpt || !author) {
      res.status(400).json({ error: 'title, content, excerpt, and author are required.' });
      return;
    }

    // Sanitize all string inputs
    const sanitizedTitle = sanitizeHtml(String(title), { allowedTags: [], allowedAttributes: {} });
    const sanitizedExcerpt = sanitizeHtml(String(excerpt), { allowedTags: [], allowedAttributes: {} });
    const sanitizedAuthor = sanitizeHtml(String(author), { allowedTags: [], allowedAttributes: {} });
    const sanitizedContent = sanitizeHtml(String(content), SANITIZE_OPTIONS);
    // Add Cloudinary base64 upload here
    let finalCoverImage = coverImage || '';
    if (finalCoverImage.startsWith('data:image/')) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(finalCoverImage, {
          folder: 'dental-clinic/blogs',
          format: 'avif', // Convert incoming picture to AVIF as requested
        });
        finalCoverImage = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error('[Cloudinary Upload Error]', uploadError);
        res.status(500).json({ error: 'Failed to upload cover image to Cloudinary.' });
        return;
      }
    }

    const sanitizedCoverImage = sanitizeHtml(String(finalCoverImage || ''), { allowedTags: [], allowedAttributes: {} });
    const sanitizedTags: string[] = Array.isArray(tags)
      ? tags.map((t: string) => sanitizeHtml(String(t), { allowedTags: [], allowedAttributes: {} }))
      : [];

    // Generate unique slug from title
    let slug = slugify(sanitizedTitle, { lower: true, strict: true });
    const existing = await Blog.findOne({ slug }).lean();
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const blog = await Blog.create({
      title: sanitizedTitle,
      slug,
      content: sanitizedContent,
      excerpt: sanitizedExcerpt,
      coverImage: sanitizedCoverImage,
      author: sanitizedAuthor,
      tags: sanitizedTags,
      published: Boolean(published),
    });

    res.status(201).json({ blog });
  } catch (err) {
    console.error('[createBlog]', err);
    res.status(500).json({ error: 'Failed to create blog post.' });
  }
}

// ─── DELETE /api/v1/blogs/:slug ───────────────────────────────────────────────
export async function deleteBlog(req: Request, res: Response): Promise<void> {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!verifyBlogToken(token)) {
    res.status(401).json({ error: 'Unauthorized.' });
    return;
  }

  try {
    const deleted = await Blog.findOneAndDelete({ slug: req.params.slug });
      if (!deleted) {
        res.status(404).json({ error: 'Blog post not found.' });
        return;
      }

      // Automatically delete image from Cloudinary
      if (deleted.coverImage && deleted.coverImage.includes('cloudinary.com')) {
        try {
          // Extract public_id matching the folder structure. 
          // URL format: https://res.cloudinary.com/<cloud_name>/image/upload/<version>/<folder>/<filename>.<ext>
          const urlParts = deleted.coverImage.split('/');
          const filename = urlParts[urlParts.length - 1]; // e.g., image.avif
          const publicIdWithFolder = `dental-clinic/blogs/${filename.split('.')[0]}`;
          await cloudinary.uploader.destroy(publicIdWithFolder);
        } catch (cloudinaryErr) {
          console.error('[Cloudinary Deletion Error]', cloudinaryErr);
        }
      }

      res.status(200).json({ message: 'Blog post deleted successfully.' });
    } catch (err) {
    console.error('[deleteBlog]', err);
    res.status(500).json({ error: 'Failed to delete blog post.' });
  }
}

// ─── PUT /api/v1/blogs/:slug ──────────────────────────────────────────────────
export async function updateBlog(req: Request, res: Response): Promise<void> {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!verifyBlogToken(token)) {
    res.status(401).json({ error: 'Unauthorized.' });
    return;
  }

  try {
    const { title, content, excerpt, coverImage, author, tags, published } = req.body;

    const sanitizedTitle = sanitizeHtml(String(title || ''), { allowedTags: [], allowedAttributes: {} });
    const sanitizedExcerpt = sanitizeHtml(String(excerpt || ''), { allowedTags: [], allowedAttributes: {} });
    const sanitizedAuthor = sanitizeHtml(String(author || ''), { allowedTags: [], allowedAttributes: {} });
    const sanitizedContent = sanitizeHtml(String(content || ''), SANITIZE_OPTIONS);
    let finalCoverImage = coverImage || '';
    if (finalCoverImage.startsWith('data:image/')) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(finalCoverImage, {
          folder: 'dental-clinic/blogs',
          format: 'avif', // Convert incoming picture to AVIF as requested
        });
        finalCoverImage = uploadResponse.secure_url;
      } catch (uploadError) {
        console.error('[Cloudinary Update Error]', uploadError);
        res.status(500).json({ error: 'Failed to upload new cover image to Cloudinary.' });
        return;
      }
    }

    const sanitizedCoverImage = sanitizeHtml(String(finalCoverImage || ''), { allowedTags: [], allowedAttributes: {} });
    const sanitizedTags: string[] = Array.isArray(tags)
      ? tags.map((t: string) => sanitizeHtml(String(t), { allowedTags: [], allowedAttributes: {} }))
      : [];

    let updateData: any = {
      content: sanitizedContent,
      excerpt: sanitizedExcerpt,
      coverImage: sanitizedCoverImage,
      author: sanitizedAuthor,
      tags: sanitizedTags,
      published: Boolean(published),
    };

    if (title && sanitizedTitle !== '') {
        updateData.title = sanitizedTitle;
    }

    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      updateData,
      { new: true } // we would need to know what the OLD image was, but we didn't fetch it first. Let's do find and then update to get the old image.
    );

    if (!blog) {
      res.status(404).json({ error: 'Blog post not found.' });
      return;
    }

    res.status(200).json({ blog });
  } catch (err) {
    console.error('[updateBlog]', err);
    res.status(500).json({ error: 'Failed to update blog post.' });
  }
}

// ─── POST /api/v1/blogs/verify-token ─────────────────────────────────────────
export async function verifyTokenRoute(req: Request, res: Response): Promise<void> {
  const { token } = req.body;
  const valid = verifyBlogToken(String(token || ''));
  res.status(200).json({ valid });
}
