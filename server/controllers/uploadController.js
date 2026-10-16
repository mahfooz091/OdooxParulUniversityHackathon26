import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import path from 'path';
const currentDir = typeof __dirname !== 'undefined' ? __dirname : process.cwd();

export const isValidImageBuffer = (buf) => {
  if (!buf || buf.length < 4) return false;
  // JPEG: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return true;
  // PNG: 89 50 4E 47
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return true;
  // GIF: 47 49 46 38
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x38) return true;
  // WebP: RIFF ... WEBP
  if (
    buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
    buf.length >= 12 &&
    buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50
  ) {
    return true;
  }
  return false;
};

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    if (!isValidImageBuffer(req.file.buffer)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image format. Supported formats are JPEG, PNG, GIF, and WEBP.',
      });
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
        const uploadDir = path.join(currentDir, '..', 'uploads');
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

    // 3. Fallback: return base64 Data URI directly
    return res.json({ success: true, url: dataUri });
  } catch (err) {
    next(err);
  }
};
