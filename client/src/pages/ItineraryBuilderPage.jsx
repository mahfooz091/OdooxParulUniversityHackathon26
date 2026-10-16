import { useParams, Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../components/common/Loader.jsx';
import ItineraryBuilder from '../components/itinerary/ItineraryBuilder.jsx';
import * as tripService from '../services/tripService.js';

export default function ItineraryBuilderPage() {
  const { id } = useParams();
  const qc = useQueryClient();

  const tripQ = useQuery({
    queryKey: ['trip', id],
    queryFn: () => tripService.fetchTrip(id),
    enabled: Boolean(id),
  });

  const trip = tripQ.data?.trip;

  const refresh = () => qc.invalidateQueries({ queryKey: ['trip', id] });

  if (tripQ.isLoading || !trip) return <Loader />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{trip.title}</h1>
          <p className="text-muted mt-1">{trip.description}</p>
        </div>
        <Link
          to={`/trips/${trip._id}/view`}
          className="px-5 py-2.5 rounded-xl bg-white border border-[#E2EBEB] text-neu-navy font-bold shadow-neu-raised-sm hover:shadow-neu-raised hover:text-neu-teal transition-all min-h-[44px] inline-flex items-center gap-2"
        >
          Preview itinerary
        </Link>
      </div>
      <ItineraryBuilder trip={trip} onRefresh={refresh} />
    </div>
  );
}
