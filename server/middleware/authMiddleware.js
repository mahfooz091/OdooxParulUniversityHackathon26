import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token = req.cookies?.token;
  if (!token && req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }
  try {
    const secret = process.env.JWT_SECRET || (process.env.NODE_ENV !== 'production' ? 'dev_only_ephemeral_jwt_secret_not_for_prod' : null);
    if (!secret) {
      return res.status(500).json({ success: false, message: 'JWT_SECRET is not configured on the server' });
    }
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
