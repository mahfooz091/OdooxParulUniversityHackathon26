import jwt from 'jsonwebtoken';

const FALLBACK_SECRET = 'colombiator_jwt_secret_production_key_2026_secured';

export const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || FALLBACK_SECRET;
  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};
