import { Request, Response } from 'express';
import sanitizeHtml from 'sanitize-html';
import Contact from '../models/Contact';
import { verifyBlogToken } from '../utils/authToken';

// ─── POST /api/v1/contacts ───────────────────────────────────────────────
export async function submitContact(req: Request, res: Response): Promise<void> {
  try {
    const { firstname, lastname, email, message, name, phone } = req.body;
    
    // Support either firstname/lastname or full name
    const finalName = name || `${firstname || ''} ${lastname || ''}`.trim() || 'Anonymous';
    const finalPhone = phone || 'Not Provided';
    
    if (!email || !message) {
      res.status(400).json({ error: 'email and message are strictly required.' });
      return;
    }

    const sanitizedName = sanitizeHtml(String(finalName), { allowedTags: [], allowedAttributes: {} });
    const sanitizedEmail = sanitizeHtml(String(email), { allowedTags: [], allowedAttributes: {} });
    const sanitizedPhone = sanitizeHtml(String(finalPhone), { allowedTags: [], allowedAttributes: {} });
    const sanitizedMessage = sanitizeHtml(String(message), { allowedTags: [], allowedAttributes: {} });

    const contact = await Contact.create({
      name: sanitizedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      message: sanitizedMessage,
    });

    res.status(201).json({ success: true, contact });
  } catch (err) {
    console.error('[submitContact]', err);
    res.status(500).json({ error: 'Failed to submit contact form.' });
  }
}

// ─── GET /api/v1/contacts ──────────────────────────────────────────────────
export async function getContacts(req: Request, res: Response): Promise<void> {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';

  if (!verifyBlogToken(token)) {
    res.status(401).json({ error: 'Unauthorized.' });
    return;
  }

  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();
    res.status(200).json({ contacts });
  } catch (err) {
    console.error('[getContacts]', err);
    res.status(500).json({ error: 'Failed to fetch contact submissions.' });
  }
}
