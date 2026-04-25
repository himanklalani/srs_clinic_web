import { Router } from 'express';
import {
  getAllBlogs,
  getBlogBySlug,
  createBlog,
  deleteBlog,
  verifyTokenRoute,
  getAdminBlogs,
  updateBlog,
} from '../controllers/blogController';
import { blogPostRateLimit } from '../middlewares/blogRateLimit';

const router = Router();

// Public routes
router.get('/', getAllBlogs);
router.post('/verify-token', verifyTokenRoute);
router.get('/admin/all', getAdminBlogs); // Protected internally by token
router.get('/:slug', getBlogBySlug);

// Protected routes (timing-safe auth checked inside controller)
router.post('/', blogPostRateLimit, createBlog);
router.put('/:slug', updateBlog);
router.delete('/:slug', deleteBlog);

export default router;
