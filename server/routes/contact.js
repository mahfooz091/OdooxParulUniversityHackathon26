import express from 'express';
import rateLimit from 'express-rate-limit';
import { handleContactSubmission } from '../controllers/contactController.js';

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { success: false, message: 'Too many inquiries sent from this IP. Please wait before submitting again.' },
});

router.post('/', contactLimiter, handleContactSubmission);

export default router;
