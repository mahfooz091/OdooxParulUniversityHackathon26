import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { connectDB } from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

import authRoutes from './routes/auth.js';
import tripRoutes from './routes/trips.js';
import cityRoutes from './routes/cities.js';
import activityRoutes from './routes/activities.js';
import budgetRoutes from './routes/budget.js';
import checklistRoutes from './routes/checklist.js';
import notesRoutes from './routes/notes.js';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';
import communityRoutes from './routes/community.js';
import uploadRoutes from './routes/upload.js';

import { validateEnv } from './config/envCheck.js';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 5001;
const clientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/$/, '');

const allowedOrigins = [
  clientUrl,
  'https://colombiator.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
];

const isAllowedOrigin = (origin) => {
  if (!origin) return true; // Direct API clients, curl, health probes, same-origin
  const normalized = origin.replace(/\/$/, '');
  if (allowedOrigins.includes(normalized)) return true;
  if (/^https:\/\/colombiator(?:-[a-zA-Z0-9_-]+)?\.vercel\.app$/.test(normalized)) {
    return true;
  }
  if (process.env.NODE_ENV !== 'production' && normalized.includes('localhost')) {
    return true;
  }
  return false;
};

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Fast health and root checks without database dependency
app.get(['/api/health', '/health', '/api', '/api/index.js'], (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    service: 'colombiator-api',
    timestamp: new Date().toISOString(),
  });
});

// Database connection middleware for all functional API routes
app.use(async (req, res, next) => {
  const isHealthOrRoot =
    req.path === '/' ||
    req.path === '/api' ||
    req.path === '/api/index.js' ||
    req.path === '/health' ||
    req.path === '/api/health' ||
    req.path.endsWith('/health');

  if (isHealthOrRoot || (process.env.NODE_ENV === 'test' && !process.env.TEST_WITH_DB)) {
    return next();
  }
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Database connection error in request middleware:', err.message);
    return res.status(503).json({
      success: false,
      message: 'Database connection failed. Please ensure MONGO_URI is properly configured.',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
});

// Mount routes on both /api/<prefix> and /<prefix> to support both direct and rewritten requests
const mountRoute = (prefix, router) => {
  app.use(`/api/${prefix}`, router);
  app.use(`/${prefix}`, router);
};

mountRoute('auth', authRoutes);
mountRoute('trips', tripRoutes);
mountRoute('cities', cityRoutes);
mountRoute('activities', activityRoutes);
mountRoute('budget', budgetRoutes);
mountRoute('checklist', checklistRoutes);
mountRoute('notes', notesRoutes);
mountRoute('users', userRoutes);
mountRoute('admin', adminRoutes);
mountRoute('community', communityRoutes);
mountRoute('upload', uploadRoutes);

app.use(['/api/*', '/*'], (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found' });
});

app.use(errorHandler);

// Only bind TCP port when executed directly as a standalone process (local dev, Docker)
// In Vercel, the Express app is exported directly and Vercel manages the HTTP server lifecycle
const isVercelRuntime = Boolean(process.env.VERCEL) || Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);
const isTest = process.env.NODE_ENV === 'test';
const isDirectRun =
  !isVercelRuntime &&
  !isTest &&
  (process.argv[1] &&
    (process.argv[1].endsWith('server.js') ||
      process.argv[1].endsWith('nodemon') ||
      process.argv[1].endsWith('/server.js')));

if (isDirectRun) {
  connectDB()
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.warn('Initial MongoDB connection deferred:', err.message));

  app.listen(PORT, () => {
    console.log(`Colombiator server listening on port ${PORT}`);
  });
}

export default app;

