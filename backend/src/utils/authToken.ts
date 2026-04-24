import crypto from 'crypto';

/**
 * Timing-safe comparison of a provided token against the env secret.
 */
export function verifyBlogToken(provided: string): boolean {
  const secret = process.env.BLOG_SECRET_TOKEN || '';
  
  if (secret.length < 32) {
    console.warn(
      '[SECURITY WARNING] BLOG_SECRET_TOKEN is not set or is shorter than 32 characters. Requests will be rejected.'
    );
    return false;
  }

  if (!provided) return false;

  try {
    const secretBuf = Buffer.from(secret, 'utf-8');
    const providedBuf = Buffer.from(provided, 'utf-8');

    // Buffers must be same length for timingSafeEqual
    if (secretBuf.length !== providedBuf.length) return false;

    return crypto.timingSafeEqual(secretBuf, providedBuf);
  } catch {
    return false;
  }
}
