import validator from 'validator';

export const handleContactSubmission = async (req, res, next) => {
  try {
    const { name, email, category, subject, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    if (!email || !validator.isEmail(String(email).trim())) {
      return res.status(400).json({ success: false, message: 'Valid email address is required' });
    }

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message content is required' });
    }

    const sanitizedCategory = ['general', 'bug', 'privacy', 'moderation', 'feedback'].includes(category)
      ? category
      : 'general';

    const submission = {
      name: validator.escape(String(name).trim().slice(0, 100)),
      email: String(email).trim().toLowerCase(),
      category: sanitizedCategory,
      subject: subject ? validator.escape(String(subject).trim().slice(0, 150)) : 'No subject',
      message: validator.escape(String(message).trim().slice(0, 2000)),
      timestamp: new Date().toISOString(),
      ip: req.ip,
    };

    // Log the contact dispatch for administrative triage
    console.info('[Support Desk Dispatch]', {
      name: submission.name,
      email: submission.email,
      category: submission.category,
      subject: submission.subject,
      timestamp: submission.timestamp,
    });

    return res.status(200).json({
      success: true,
      message: 'Support inquiry received successfully. Our team will review and respond promptly.',
    });
  } catch (err) {
    next(err);
  }
};
