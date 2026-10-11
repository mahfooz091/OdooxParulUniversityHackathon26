import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const FALLBACK_SECRET = 'colombiator_jwt_secret_production_key_2026_secured';

export const protect = async (req, res, next) => {
  let token = req.cookies?.token;
  if (!token && req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
  try {
    const secret = process.env.JWT_SECRET || FALLBACK_SECRET;
    const decoded = jwt.verify(token, secret);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not found or account removed' });
    }
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Not authorized, token invalid or expired' });
  }
};
