import dotenv from 'dotenv';
import path from 'path';

// Load environment variables based on NODE_ENV
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import blogRoutes from './routes/blogRoutes';
import contactRoutes from './routes/contactRoutes';
import compression from 'compression';

// ─── Validate Token on Startup ────────────────────────────────────────────────
const secret = process.env.BLOG_SECRET_TOKEN || '';
if (secret.length < 32) {
  console.error(
    '[SECURITY] FATAL: BLOG_SECRET_TOKEN is not set or is shorter than 32 characters. Server will not start.'
  );
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Security: Helmet with full CSP ──────────────────────────────────────────
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", 'https://www.googletagmanager.com', 'https://www.google-analytics.com'],
        imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com', 'https://source.unsplash.com', 'https://images.unsplash.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        connectSrc: ["'self'", 'https://www.google-analytics.com'],
        frameSrc: ['https://www.google.com'],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    crossOriginOpenerPolicy: { policy: 'same-origin' },
    xFrameOptions: { action: 'deny' },
    xContentTypeOptions: true,
    // Permissions-Policy is not in helmet types but we set it via custom header below
  })
);

// Permissions-Policy (not covered by Helmet types directly)
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// ─── Performance Middlewares ──────────────────────────────────────────────────
app.use(compression());
// (Removed faulty X-Response-Time middleware that caused ERR_HTTP_HEADERS_SENT)

// ─── CORS: Whitelist from env only ────────────────────────────────────────────
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const allowedOrigins = [
  FRONTEND_URL,
  // Allow local dev origins only in development
  ...(process.env.NODE_ENV !== 'production'
    ? ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://192.168.29.161:3000']
    : []),
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin in development (curl, health checks)
      if (!origin && process.env.NODE_ENV !== 'production') return callback(null, true);
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
  })
);

// ─── Global Rate Limiter: 100 req/15min ───────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests from this IP. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

// ─── Body parsing & Cookies ───────────────────────────────────────────────────
// 50mb limit to support base64 Cloudinary image uploads from admin
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/contacts', contactRoutes);

// Health Check Route — no sensitive data
app.get('/api/v1/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

// ─── MongoDB Connection ───────────────────────────────────────────────────────
if (process.env.NODE_ENV !== 'test') {
  const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dental-clinic';

  // Disable Mongoose query logging in production
  if (process.env.NODE_ENV === 'production') {
    mongoose.set('debug', false);
  }

  mongoose
    .connect(MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    })
    .then(() => {
      console.log('Successfully connected to MongoDB.');
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1);
    });
}

export default app;
