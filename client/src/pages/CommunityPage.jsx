import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Heart, Bookmark, Share2, Copy, Eye, Users, Search } from 'lucide-react';
import Card from '../components/common/Card.jsx';
import Avatar from '../components/common/Avatar.jsx';
import TravelImage from '../components/common/TravelImage.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import * as communityService from '../services/communityService.js';
import * as tripService from '../services/tripService.js';
import { useAuth } from '../context/AuthContext.jsx';
import { formatDateRange, getTripDays } from '../utils/helpers.js';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';

export default function CommunityPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState('recent');
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['community', tab, search],
    queryFn: () =>
      communityService.fetchCommunityTrips({ sort: tab === 'popular' ? 'popular' : 'recent', search }),
  });

  const copyTrip = async (id) => {
    if (!user) {
      toast.info('Please sign in to clone this itinerary');
      navigate('/login');
      return;
    }
    try {
      const { trip } = await tripService.duplicateTrip(id);
      toast.success('Itinerary cloned to your account');
      qc.invalidateQueries({ queryKey: ['trips'] });
      navigate(`/trips/${trip._id}/builder`);
    } catch (e) {
      toast.error(e.friendlyMessage || 'Could not copy itinerary');
    }
  };

  const trips = data?.trips || [];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neu-navy font-heading">
            Community Itineraries
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Discover and clone verified public itineraries shared by fellow explorers. Read our{' '}
            <Link to="/community-guidelines" className="text-teal-700 underline font-semibold">
              Community Guidelines
            </Link>.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setTab('recent')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              tab === 'recent' ? 'neu-pill-active' : 'neu-pill'
            }`}
          >
            Most Recent
          </button>
          <button
            type="button"
            onClick={() => setTab('popular')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              tab === 'popular' ? 'neu-pill-active' : 'neu-pill'
            }`}
          >
            Most Popular
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Input
          placeholder="Search community trips by title or route..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 text-sm"
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="text-center py-16">
          <p className="text-xs text-slate-500 animate-pulse">Loading community feed…</p>
        </div>
      ) : trips.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No Community Trips Yet"
          description={
            search
              ? `No public itineraries matched "${search}". Try searching for another destination or keyword.`
              : 'Be the first traveler to publish a public itinerary to inspire the community!'
          }
          action={
            <Link
              to="/trips/new"
              className="neu-button-primary inline-flex items-center gap-1.5 text-xs font-semibold"
            >
              Share Your Journey
            </Link>
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {trips.map((trip, i) => (
            <motion.div
              key={trip._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="overflow-hidden h-full flex flex-col hover:shadow-neu-raised-lg transition-all duration-300">
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                  <TravelImage
                    src={trip.coverPhoto}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111B30]/75 via-[#111B30]/15 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-teal-800 shadow-sm">
                      {getTripDays(trip.startDate, trip.endDate)} Days
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-bold text-base line-clamp-1 font-heading">{trip.title}</h3>
                    <p className="text-xs text-teal-200 mt-0.5">
                      {formatDateRange(trip.startDate, trip.endDate)}
                    </p>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Avatar src={trip.userId?.photo} name={trip.userId?.name} size="sm" />
                      <span className="font-semibold text-neu-navy">{trip.userId?.name || 'Explorer'}</span>
                    </div>

                    <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">
                      {(trip.stops || []).map((s) => s.cityName).join(' → ') ||
                        'Curated multi-stop journey'}
                    </p>

                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#E2EBEB] text-xs text-slate-500">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-rose-500" /> {trip.likes || 0}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Bookmark className="w-3.5 h-3.5 text-teal-600" /> {trip.saves || 0}
                        </span>
                      </div>
                      <span className="text-teal-700 font-bold">
                        ${trip.totalBudget || 0} budget
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-5">
                    <button
                      type="button"
                      className="neu-button text-xs py-2 font-semibold text-neu-navy inline-flex items-center justify-center gap-1"
                      onClick={() => {
                        if (trip.publicSlug) {
                          const url = `${window.location.origin}/share/${trip.publicSlug}`;
                          navigator.clipboard.writeText(url);
                          toast.info('Shareable link copied to clipboard');
                        }
                      }}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Copy Link
                    </button>
                    <button
                      type="button"
                      className="neu-button-primary text-xs py-2 font-semibold inline-flex items-center justify-center gap-1"
                      onClick={() => copyTrip(trip._id)}
                    >
                      <Copy className="w-3.5 h-3.5" />
                      Clone Trip
                    </button>
                    <button
                      type="button"
                      className="neu-button col-span-2 text-xs py-2 text-slate-600 hover:text-teal-700 font-medium inline-flex items-center justify-center gap-1"
                      onClick={() => trip.publicSlug && navigate(`/share/${trip.publicSlug}`)}
                    >
                      <Eye className="w-3.5 h-3.5 text-slate-400" />
                      View Public Itinerary
                    </button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
