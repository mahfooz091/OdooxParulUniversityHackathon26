import mongoose from 'mongoose';
import Activity from '../models/Activity.js';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const listActivities = async (req, res, next) => {
  try {
    const { cityId, category, maxCost, maxDuration } = req.query;
    const filter = {};
    if (cityId) {
      if (isValidObjectId(cityId)) {
        filter.cityId = cityId;
      } else {
        return res.status(400).json({ success: false, message: 'Invalid cityId parameter' });
      }
    }
    if (category) filter.category = category;
    if (maxCost !== undefined) {
      const parsedCost = Number(maxCost);
      if (!isNaN(parsedCost) && parsedCost >= 0) {
        filter.estimatedCost = { $lte: parsedCost };
      }
    }
    if (maxDuration !== undefined) {
      const parsedDuration = Number(maxDuration);
      if (!isNaN(parsedDuration) && parsedDuration >= 0) {
        filter.duration = { ...(filter.duration || {}), $lte: parsedDuration };
      }
    }
    const activities = await Activity.find(filter).populate('cityId').sort({ rating: -1 });
    res.json({ success: true, activities });
  } catch (err) {
    next(err);
  }
};

export const getActivityById = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid activity ID format' });
    }
    const activity = await Activity.findById(req.params.id).populate('cityId');
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }
    res.json({ success: true, activity });
  } catch (err) {
    next(err);
  }
};
