import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Compass, Sparkles, MapPin, ArrowLeft, Plus } from 'lucide-react';
import ActivitySearch from '../components/search/ActivitySearch.jsx';
import * as cityService from '../services/cityService.js';

export default function ActivitySearchPage() {
  const [params] = useSearchParams();
  const deepCityId = params.get('cityId');
  const tripId = params.get('tripId');
  const stopId = params.get('stopId');

  const [selectedCityId, setSelectedCityId] = useState(deepCityId || '');

  // Fetch available cities so the user can easily switch or filter
  const { data: citiesData } = useQuery({
    queryKey: ['cities-all-for-activities'],
    queryFn: () => cityService.fetchCities({ limit: 40 }),
  });

  const cities = citiesData?.cities || [];
  const activeCityId = deepCityId || selectedCityId;
  const isDeepLinked = Boolean(deepCityId && tripId && stopId);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Curated Experiences</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-neu-navy font-heading">
            {isDeepLinked ? 'Add Activities to Stop' : 'Activity & Experience Studio'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isDeepLinked
              ? 'Select activities to include in your trip itinerary schedule.'
              : 'Discover sights, walking tours, food tastings, and outdoor adventures.'}
          </p>
        </div>

        {isDeepLinked ? (
          <Link
            to={`/trips/${tripId}/builder`}
            className="neu-button inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Itinerary
          </Link>
        ) : (
          <Link
            to="/trips/new"
            className="neu-button-primary inline-flex items-center gap-1.5 text-xs font-semibold"
          >
            <Plus className="w-4 h-4" />
            Plan New Trip
          </Link>
        )}
      </div>

      {/* Explanatory banner when browsing freely */}
      {!isDeepLinked && (
        <div className="neu-card p-5 bg-gradient-to-r from-white to-[#F4FAFA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#E2EBEB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/60 shadow-sm flex items-center justify-center text-teal-700 shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-neu-navy font-heading">
                Explore worldwide activities
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Filter by destination city below or attach activities directly inside any trip itinerary stop.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
            <select
              className="bg-[#F8FCFC] border border-[#E2EBEB] shadow-neu-inset rounded-xl px-3 py-2 text-xs text-neu-navy outline-none focus:border-teal-500 w-full sm:w-48 font-medium"
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              aria-label="Filter activities by destination city"
            >
              <option value="">All Global Cities</option>
              {cities.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}, {c.country}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Main Activity Explorer & Selector */}
      <ActivitySearch
        cityId={activeCityId}
        tripId={tripId}
        stopId={stopId}
      />
    </div>
  );
}
