import app from '../server/server.js';
import { connectDB } from '../server/config/db.js';

export default async function handler(req, res) {
  // Allow health checks to respond immediately
  if (req.url === '/api/health' || req.url === '/health') {
    return new Promise((resolve) => {
      res.on('finish', resolve);
      res.on('close', resolve);
      app(req, res);
    });
  }

  try {
    await connectDB();
  } catch (error) {
    console.error('Database connection error in serverless handler:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to connect to database. Please check MONGO_URI in Vercel project settings.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }

  return new Promise((resolve, reject) => {
    res.on('finish', resolve);
    res.on('close', resolve);
    res.on('error', reject);
    app(req, res);
  });
}

