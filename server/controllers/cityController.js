import mongoose from 'mongoose';
import City from '../models/City.js';

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const listCities = async (req, res, next) => {
  try {
    const { search, region, page = 1, limit = 12, sort } = req.query;
    const filter = {};
    if (search && typeof search === 'string') {
      const sanitized = escapeRegex(search.trim());
      filter.$or = [
        { name: new RegExp(sanitized, 'i') },
        { country: new RegExp(sanitized, 'i') },
      ];
    }
    if (region && region !== 'All') {
      filter.region = region;
    }
    let sortOpt = { popularity: -1 };
    if (sort === 'cost') sortOpt = { costIndex: 1 };
    if (sort === 'name') sortOpt = { name: 1 };

    const parsedPage = Math.max(1, parseInt(page, 10) || 1);
    const parsedLimit = Math.min(Math.max(1, parseInt(limit, 10) || 12), 100);
    const skip = (parsedPage - 1) * parsedLimit;

    const [cities, total] = await Promise.all([
      City.find(filter).sort(sortOpt).skip(skip).limit(parsedLimit),
      City.countDocuments(filter),
    ]);
    res.json({
      success: true,
      cities,
      page: parsedPage,
      pages: Math.ceil(total / parsedLimit) || 1,
      total,
    });
  } catch (err) {
    next(err);
  }
};

export const getCityById = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid city ID format' });
    }
    const city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ success: false, message: 'City not found' });
    }
    res.json({ success: true, city });
  } catch (err) {
    next(err);
  }
};

export const popularCities = async (req, res, next) => {
  try {
    const cities = await City.find().sort({ popularity: -1 }).limit(12);
    res.json({ success: true, cities });
  } catch (err) {
    next(err);
  }
};
