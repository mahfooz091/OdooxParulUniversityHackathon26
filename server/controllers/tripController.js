import mongoose from 'mongoose';
import Trip from '../models/Trip.js';
import Stop from '../models/Stop.js';
import Budget from '../models/Budget.js';
import ChecklistItem from '../models/ChecklistItem.js';
import Note from '../models/Note.js';
import Activity from '../models/Activity.js';
import City from '../models/City.js';
import User from '../models/User.js';
import { customAlphabet } from 'nanoid';

const slugAlphabet = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 10);
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const refreshTripStatus = (trip) => {
  const now = new Date();
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);
  if (now < start) trip.status = 'upcoming';
  else if (now > end) trip.status = 'completed';
  else trip.status = 'ongoing';
};

export const getTrips = async (req, res, next) => {
  try {
    const { status, sort } = req.query;
    const filter = { userId: req.user._id };
    if (status && status !== 'all') filter.status = status;
    let sortOpt = { createdAt: -1 };
    if (sort === 'startDate') sortOpt = { startDate: 1 };
    if (sort === 'name') sortOpt = { title: 1 };
    const trips = await Trip.find(filter)
      .sort(sortOpt)
      .populate({
        path: 'stops',
        select: 'cityName country arrivalDate departureDate order',
      });
    res.json({ success: true, trips });
  } catch (err) {
    next(err);
  }
};

export const createTrip = async (req, res, next) => {
  try {
    const {
      title,
      description,
      startDate,
      endDate,
      coverPhoto,
      isPublic,
      totalBudget,
    } = req.body;
    if (!title?.trim() || !startDate || !endDate) {
      return res.status(400).json({ success: false, message: 'Title, start date, and end date are required' });
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ success: false, message: 'Invalid start or end date format' });
    }
    if (start > end) {
      return res.status(400).json({ success: false, message: 'Start date cannot be after end date' });
    }
    const sanitizedBudget = Math.max(0, Number(totalBudget) || 0);

    const tripData = {
      userId: req.user._id,
      title: title.trim(),
      description: description || '',
      startDate,
      endDate,
      coverPhoto: coverPhoto || '',
      isPublic: Boolean(isPublic),
      totalBudget: sanitizedBudget,
    };
    if (tripData.isPublic) {
      tripData.publicSlug = slugAlphabet();
    }
    const trip = await Trip.create(tripData);
    await Budget.create({ tripId: trip._id });
    const populated = await Trip.findById(trip._id).populate('stops');
    res.status(201).json({ success: true, trip: populated });
  } catch (err) {
    next(err);
  }
};

export const getTripById = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid trip ID format' });
    }
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.user._id,
    })
      .populate({
        path: 'stops',
        populate: [
          { path: 'cityId', model: 'City' },
          { path: 'activities', model: 'Activity' },
        ],
      });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    res.json({ success: true, trip });
  } catch (err) {
    next(err);
  }
};

export const updateTrip = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid trip ID format' });
    }
    let trip = await Trip.findOne({ _id: req.params.id, userId: req.user._id });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    const {
      title,
      description,
      startDate,
      endDate,
      coverPhoto,
      isPublic,
      totalBudget,
    } = req.body;
    if (title !== undefined) trip.title = title.trim();
    if (description !== undefined) trip.description = description;

    const newStart = startDate ? new Date(startDate) : new Date(trip.startDate);
    const newEnd = endDate ? new Date(endDate) : new Date(trip.endDate);
    if (isNaN(newStart.getTime()) || isNaN(newEnd.getTime())) {
      return res.status(400).json({ success: false, message: 'Invalid date format' });
    }
    if (newStart > newEnd) {
      return res.status(400).json({ success: false, message: 'Start date cannot be after end date' });
    }
    if (startDate) trip.startDate = startDate;
    if (endDate) trip.endDate = endDate;

    if (coverPhoto !== undefined) trip.coverPhoto = coverPhoto;
    if (totalBudget !== undefined) {
      const parsedBudget = Number(totalBudget);
      trip.totalBudget = !isNaN(parsedBudget) && parsedBudget >= 0 ? parsedBudget : trip.totalBudget;
    }
    if (isPublic !== undefined) {
      trip.isPublic = Boolean(isPublic);
      if (trip.isPublic && !trip.publicSlug) trip.publicSlug = slugAlphabet();
      if (!trip.isPublic) trip.publicSlug = undefined;
    }
    refreshTripStatus(trip);
    await trip.save();
    const populated = await Trip.findById(trip._id).populate({
      path: 'stops',
      populate: [
        { path: 'cityId', model: 'City' },
        { path: 'activities', model: 'Activity' },
      ],
    });
    res.json({ success: true, trip: populated });
  } catch (err) {
    next(err);
  }
};

export const deleteTrip = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid trip ID format' });
    }
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.user._id });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    await Stop.deleteMany({ tripId: trip._id });
    await Budget.deleteOne({ tripId: trip._id });
    await ChecklistItem.deleteMany({ tripId: trip._id });
    await Note.deleteMany({ tripId: trip._id });
    await trip.deleteOne();
    res.json({ success: true, message: 'Trip removed' });
  } catch (err) {
    next(err);
  }
};

export const getPublicTripBySlug = async (req, res, next) => {
  try {
    const trip = await Trip.findOne({ publicSlug: req.params.slug, isPublic: true })
      .populate('userId', 'name photo')
      .populate({
        path: 'stops',
        populate: [
          { path: 'cityId', model: 'City' },
          { path: 'activities', model: 'Activity' },
        ],
      });
    if (!trip) {
      return res.status(404).json({ success: false, message: 'Itinerary not found' });
    }
    res.json({ success: true, trip });
  } catch (err) {
    next(err);
  }
};

export const duplicateTrip = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid trip ID format' });
    }
    const source = await Trip.findById(req.params.id).populate({
      path: 'stops',
      populate: [{ path: 'activities' }],
    });
    if (!source) {
      return res.status(404).json({ success: false, message: 'Trip not found' });
    }
    const isOwner = source.userId.toString() === req.user._id.toString();
    if (!isOwner && !source.isPublic) {
      return res.status(403).json({ success: false, message: 'Cannot copy this trip' });
    }
    const newTrip = await Trip.create({
      userId: req.user._id,
      title: `${source.title} (Copy)`,
      description: source.description,
      startDate: source.startDate,
      endDate: source.endDate,
      coverPhoto: source.coverPhoto,
      isPublic: false,
      totalBudget: source.totalBudget,
    });
    await Budget.create({ tripId: newTrip._id });
    const stopIds = [];
    for (let i = 0; i < (source.stops || []).length; i++) {
      const s = source.stops[i];
      const stop = await Stop.create({
        tripId: newTrip._id,
        cityId: s.cityId,
        cityName: s.cityName,
        country: s.country,
        arrivalDate: s.arrivalDate,
        departureDate: s.departureDate,
        activities: s.activities?.map((a) => a._id || a) || [],
        notes: s.notes,
        stopBudget: s.stopBudget,
        order: i,
      });
      stopIds.push(stop._id);
    }
    newTrip.stops = stopIds;
    await newTrip.save();
    const populated = await Trip.findById(newTrip._id).populate({
      path: 'stops',
      populate: [
        { path: 'cityId', model: 'City' },
        { path: 'activities', model: 'Activity' },
      ],
    });
    res.status(201).json({ success: true, trip: populated });
  } catch (err) {
    next(err);
  }
};
