import jwt from 'jsonwebtoken';

export const generateToken = (id) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET is not configured in environment variables.');
    }
    console.warn('⚠️ Development warning: JWT_SECRET not set, using ephemeral development secret');
  }
  return jwt.sign({ id }, secret || 'dev_only_ephemeral_jwt_secret_not_for_prod', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};
