import mongoose from 'mongoose';
import Budget from '../models/Budget.js';
import Trip from '../models/Trip.js';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const getBudget = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.tripId)) {
      return res.status(400).json({ success: false, message: 'Invalid trip ID format' });
    }
    const trip = await Trip.findOne({ _id: req.params.tripId, userId: req.user._id });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    let budget = await Budget.findOne({ tripId: trip._id });
    if (!budget) {
      budget = await Budget.create({ tripId: trip._id });
    }
    const doc = budget.toObject({ virtuals: true });
    res.json({ success: true, budget: doc });
  } catch (err) {
    next(err);
  }
};

export const upsertBudget = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.tripId)) {
      return res.status(400).json({ success: false, message: 'Invalid trip ID format' });
    }
    const trip = await Trip.findOne({ _id: req.params.tripId, userId: req.user._id });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    const fields = [
      'transport',
      'accommodation',
      'activities',
      'meals',
      'miscellaneous',
      'dailyLimit',
      'costPerPersonMultiplier',
    ];
    let budget = await Budget.findOne({ tripId: trip._id });
    if (!budget) {
      budget = await Budget.create({ tripId: trip._id });
    }
    for (const k of fields) {
      if (req.body[k] !== undefined) {
        const parsed = Number(req.body[k]);
        if (!isNaN(parsed) && parsed >= 0) {
          budget[k] = parsed;
        }
      }
    }
    await budget.save();
    trip.totalBudget =
      (budget.transport || 0) +
      (budget.accommodation || 0) +
      (budget.activities || 0) +
      (budget.meals || 0) +
      (budget.miscellaneous || 0);
    await trip.save();
    const doc = budget.toObject({ virtuals: true });
    res.json({ success: true, budget: doc });
  } catch (err) {
    next(err);
  }
};

export const createBudget = upsertBudget;

export const updateBudget = upsertBudget;
