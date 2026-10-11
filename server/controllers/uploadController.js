import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataUri = `data:${req.file.mimetype};base64,${b64}`;

    // 1. Attempt to upload to Cloudinary if configured
    if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      try {
        const folder = req.body.folder || 'colombiator/uploads';
        const result = await cloudinary.uploader.upload(dataUri, { folder });
        return res.json({ success: true, url: result.secure_url });
      } catch (err) {
        console.warn('Cloudinary upload failed, attempting fallback:', err.message);
      }
    }

    // 2. Local disk storage (works when running standalone server locally)
    if (!process.env.VERCEL) {
      try {
        const ext = req.file.mimetype.split('/')[1] || 'jpg';
        const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${ext}`;
        const uploadDir = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        const uploadPath = path.join(uploadDir, filename);
        fs.writeFileSync(uploadPath, req.file.buffer);
        const url = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
        return res.json({ success: true, url });
      } catch (err) {
        console.warn('Local disk write failed, falling back to data URI:', err.message);
      }
    }

    // 3. Serverless fallback: return base64 Data URI directly
    return res.json({ success: true, url: dataUri });
  } catch (err) {
    next(err);
  }
};
