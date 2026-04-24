import rateLimit from 'express-rate-limit';

/**
 * Stricter rate limiter for blog POST route.
 * 5 blog creation requests per hour per IP.
 */
export const blogPostRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: 'Too many blog creation requests from this IP. Please try again in an hour.' },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
});

/**
 * Contact form rate limiter.
 * 2 submissions per 24 hours per IP — prevents spam.
 */
export const contactRateLimit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 2,
  message: { error: 'You have already submitted the contact form today. Please try again tomorrow.' },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
});
