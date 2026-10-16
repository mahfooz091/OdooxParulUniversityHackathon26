import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Compass, Clock, DollarSign, Star, CheckCircle } from 'lucide-react';
import * as activityService from '../../services/activityService.js';
import * as tripService from '../../services/tripService.js';
import Button from '../common/Button.jsx';
import TravelImage from '../common/TravelImage.jsx';
import { ACTIVITY_CATEGORIES } from '../../utils/constants.js';

export default function ActivitySearch({ cityId, tripId, stopId, onAdded }) {
  const [category, setCategory] = useState('');
  const [maxCost, setMaxCost] = useState(500);
  const [maxDuration, setMaxDuration] = useState(12);
  const [selected, setSelected] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ['activities', cityId, category, maxCost, maxDuration],
    queryFn: () =>
      activityService.fetchActivities({
        cityId: cityId || undefined,
        category: category || undefined,
        maxCost,
        maxDuration,
      }),
  });

  const activities = data?.activities || [];

  const toggle = (a) => {
    setSelected((prev) =>
      prev.some((x) => x._id === a._id) ? prev.filter((x) => x._id !== a._id) : [...prev, a]
    );
  };

  const total = useMemo(
    () => selected.reduce((s, a) => s + (a.estimatedCost || 0), 0),
    [selected]
  );

  const confirm = async () => {
    if (!tripId || !stopId) {
      toast.info('Select a trip in your planner to attach these activities.');
      return;
    }
    try {
      for (const a of selected) {
        await tripService.addActivityToStop(tripId, stopId, a._id);
      }
      toast.success('Activities added to your itinerary stop');
      onAdded?.();
    } catch (e) {
      toast.error(e.friendlyMessage || 'Could not add activities');
    }
  };

  return (
    <div className="space-y-5">
      {/* Filters with Neumorphic controls */}
      <div className="grid sm:grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-[#E2EBEB] shadow-neu-raised-sm">
        <div>
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-1.5">
            Category
          </label>
          <select
            className="w-full bg-[#F8FCFC] border border-[#E2EBEB] shadow-neu-inset rounded-xl px-3.5 py-2.5 text-xs text-neu-navy outline-none focus:border-teal-500 focus:shadow-neu-inset-focus"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {ACTIVITY_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Max Cost
            </label>
            <span className="text-xs font-bold text-teal-700">${maxCost}</span>
          </div>
          <input
            type="range"
            min={0}
            max={1000}
            step={10}
            value={maxCost}
            onChange={(e) => setMaxCost(Number(e.target.value))}
            className="w-full accent-teal-600 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Max Duration
            </label>
            <span className="text-xs font-bold text-teal-700">{maxDuration}h</span>
          </div>
          <input
            type="range"
            min={1}
            max={24}
            value={maxDuration}
            onChange={(e) => setMaxDuration(Number(e.target.value))}
            className="w-full accent-teal-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Activity Cards List */}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
        {isLoading && (
          <div className="text-center py-10">
            <p className="text-xs text-slate-500 animate-pulse">Loading curated activities…</p>
          </div>
        )}
        {!isLoading && activities.length === 0 && (
          <div className="text-center py-10 neu-card p-6">
            <Compass className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-neu-navy">No activities found</p>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting category or cost threshold to discover more experiences.
            </p>
          </div>
        )}
        {!isLoading &&
          activities.map((a) => {
            const isSelected = selected.some((x) => x._id === a._id);
            return (
              <button
                type="button"
                key={a._id}
                onClick={() => toggle(a)}
                className={`w-full text-left rounded-2xl p-4 transition-all border ${
                  isSelected
                    ? 'bg-teal-50/80 border-teal-500 shadow-neu-inset'
                    : 'bg-white border-[#E2EBEB] shadow-neu-raised-sm hover:shadow-neu-raised hover:-translate-y-0.5'
                }`}
              >
                <div className="flex gap-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <TravelImage src={a.image} alt={a.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-heading font-bold text-sm text-neu-navy truncate">{a.name}</p>
                      {isSelected && (
                        <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      )}
                    </div>
                    <span className="inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 mt-1">
                      {a.category}
                    </span>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {a.description}
                    </p>
                    <div className="flex items-center gap-4 mt-2.5 text-xs text-slate-600 font-medium">
                      <span className="inline-flex items-center gap-1 text-teal-700 font-bold">
                        <DollarSign className="w-3.5 h-3.5" />
                        {a.estimatedCost}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {a.duration}h
                      </span>
                      {a.rating && (
                        <span className="inline-flex items-center gap-1 text-amber-600">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {a.rating}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
      </div>

      {tripId && stopId && (
        <div className="sticky bottom-0 bg-white/95 backdrop-blur-md border border-[#E2EBEB] p-4 rounded-2xl shadow-neu-raised flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            Selected <strong>{selected.length}</strong> activities · Total:{' '}
            <strong className="text-teal-700 font-bold">${total.toFixed(0)}</strong>
          </div>
          <Button type="button" onClick={confirm} disabled={!selected.length}>
            Add {selected.length} to Itinerary Stop
          </Button>
        </div>
      )}
    </div>
  );
}
