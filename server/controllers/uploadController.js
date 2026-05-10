import cloudinary from '../config/cloudinary.js';

export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({ success: false, message: 'No image file' });
    }
    const folder = req.body.folder || 'traveloop/uploads';
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataUri = `data:${req.file.mimetype};base64,${b64}`;
    const result = await cloudinary.uploader.upload(dataUri, { folder });
    res.json({ success: true, url: result.secure_url });
  } catch (err) {
    next(err);
  }
};
