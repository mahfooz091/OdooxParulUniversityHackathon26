import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import TripForm from '../components/trips/TripForm.jsx';
import Card from '../components/common/Card.jsx';
import * as tripService from '../services/tripService.js';

export default function CreateTripPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCreate = async (payload) => {
    setLoading(true);
    try {
      const { trip } = await tripService.createTrip({
        title: payload.title,
        description: payload.description,
        startDate: payload.startDate,
        endDate: payload.endDate,
        coverPhoto: payload.coverPhoto,
        isPublic: payload.isPublic,
        totalBudget: 0,
      });
      if (payload.destinationCityId) {
        await tripService.addStop(trip._id, {
          cityId: payload.destinationCityId,
          arrivalDate: payload.startDate,
          departureDate: payload.endDate,
        });
      }
      localStorage.removeItem('colombiator-trip-draft');
      toast.success('Trip created');
      navigate(`/trips/${trip._id}/builder`, { replace: true });
    } catch (e) {
      toast.error(e.friendlyMessage || 'Could not create trip');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto pb-12">
      <div className="flex items-center justify-between gap-3 mb-6 p-3 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#E2EBEB] shadow-neu-raised-sm text-xs sm:text-sm font-medium text-neu-slate">
        <span className="flex items-center gap-1.5 text-neu-teal font-semibold px-2 py-1 bg-neu-mint/50 rounded-lg">
          <span className="w-5 h-5 rounded-full bg-neu-teal text-white flex items-center justify-center text-xs">1</span>
          Trip Details
        </span>
        <span className="text-neu-slate/40">→</span>
        <span className="flex items-center gap-1.5 px-2 py-1">
          <span className="w-5 h-5 rounded-full bg-[#E2EBEB] text-neu-slate flex items-center justify-center text-xs">2</span>
          Stops
        </span>
        <span className="text-neu-slate/40">→</span>
        <span className="flex items-center gap-1.5 px-2 py-1">
          <span className="w-5 h-5 rounded-full bg-[#E2EBEB] text-neu-slate flex items-center justify-center text-xs">3</span>
          Budget
        </span>
      </div>
      <Card className="p-6 sm:p-10 border border-[#E2EBEB] shadow-neu-raised bg-white">
        <div className="mb-8">
          <span className="text-xs uppercase tracking-wider font-semibold text-neu-teal">Step 1 of 3</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neu-navy tracking-tight mt-1">Design Your Next Journey</h1>
          <p className="text-sm text-neu-slate mt-1">Set the essentials for your adventure. You can invite friends, add daily stops, and customize expenses right after.</p>
        </div>
        <TripForm onSubmit={handleCreate} submitting={loading} />
      </Card>
    </motion.div>
  );
}
