import { Router } from 'express';
import { submitContact, getContacts } from '@/controllers/contactController';
import { contactRateLimit } from '@/middlewares/blogRateLimit';

const router = Router();

// Public route to submit a form — 2 submissions max per 24 hours per IP
router.post('/', contactRateLimit, submitContact);

// Protected route to view all submissions (token checked inside controller)
router.get('/', getContacts);

export default router;
