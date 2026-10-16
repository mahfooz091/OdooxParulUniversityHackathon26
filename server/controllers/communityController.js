import mongoose from 'mongoose';
import Trip from '../models/Trip.js';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const listPublicTrips = async (req, res, next) => {
  try {
    const { sort = 'recent', search, page = 1, limit = 12 } = req.query;
    const filter = { isPublic: true };
    if (search && typeof search === 'string') {
      const sanitized = escapeRegex(search.trim());
      filter.title = new RegExp(sanitized, 'i');
    }
    let sortOpt = { createdAt: -1 };
    if (sort === 'popular') sortOpt = { likes: -1, saves: -1 };

    const parsedPage = Math.max(1, parseInt(page, 10) || 1);
    const parsedLimit = Math.min(Math.max(1, parseInt(limit, 10) || 12), 100);
    const skip = (parsedPage - 1) * parsedLimit;

    const [trips, total] = await Promise.all([
      Trip.find(filter)
        .sort(sortOpt)
        .skip(skip)
        .limit(parsedLimit)
        .populate('userId', 'name photo')
        .populate({
          path: 'stops',
          select: 'cityName country arrivalDate departureDate',
          populate: { path: 'cityId', select: 'coverImage coordinates' },
        }),
      Trip.countDocuments(filter),
    ]);
    res.json({
      success: true,
      trips,
      page: parsedPage,
      pages: Math.ceil(total / parsedLimit) || 1,
      total,
    });
  } catch (err) {
    next(err);
  }
};

export const likeTrip = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid trip ID format' });
    }
    const trip = await Trip.findOne({ _id: req.params.id, isPublic: true });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    trip.likes = (trip.likes || 0) + 1;
    await trip.save();
    res.json({ success: true, likes: trip.likes });
  } catch (err) {
    next(err);
  }
};

export const saveTripBookmark = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid trip ID format' });
    }
    const trip = await Trip.findOne({ _id: req.params.id, isPublic: true });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    trip.saves = (trip.saves || 0) + 1;
    await trip.save();
    res.json({ success: true, saves: trip.saves });
  } catch (err) {
    next(err);
  }
};
