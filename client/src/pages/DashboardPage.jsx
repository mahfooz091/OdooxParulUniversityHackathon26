import { useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Compass } from 'lucide-react';
import WelcomeBanner from '../components/dashboard/WelcomeBanner.jsx';
import TripCard from '../components/dashboard/TripCard.jsx';
import RecommendedCities from '../components/dashboard/RecommendedCities.jsx';
import BudgetHighlight from '../components/dashboard/BudgetHighlight.jsx';
import EmptyState from '../components/common/EmptyState.jsx';
import Loader from '../components/common/Loader.jsx';
import Modal from '../components/common/Modal.jsx';
import Button from '../components/common/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import * as tripService from '../services/tripService.js';
import * as cityService from '../services/cityService.js';
import * as budgetService from '../services/budgetService.js';

export default function DashboardPage() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const [deleteTrip, setDeleteTrip] = useState(null);

  const tripsQ = useQuery({
    queryKey: ['trips', {}],
    queryFn: () => tripService.fetchTrips({}),
  });

  const citiesQ = useQuery({
    queryKey: ['popular-cities'],
    queryFn: cityService.fetchPopularCities,
  });

  const trips = tripsQ.data?.trips || [];
  const ongoing = trips.find((t) => t.status === 'ongoing') || trips[0];

  const budgetQ = useQuery({
    queryKey: ['budget', ongoing?._id],
    queryFn: () => budgetService.fetchBudget(ongoing._id),
    enabled: Boolean(ongoing?._id),
  });

  const confirmDelete = async () => {
    if (!deleteTrip) return;
    try {
      await tripService.deleteTrip(deleteTrip._id);
      toast.success('Trip deleted');
      qc.invalidateQueries({ queryKey: ['trips'] });
    } catch (e) {
      toast.error(e.friendlyMessage || 'Could not delete');
    } finally {
      setDeleteTrip(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
      <WelcomeBanner name={user?.name} />

      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-neu-navy font-heading">
              Popular Destinations
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Explore curated global cities ready to be added to your itinerary.
            </p>
          </div>
          <Link
            to="/cities"
            className="text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explore All</span>
          </Link>
        </div>
        <RecommendedCities cities={citiesQ.data?.cities} loading={citiesQ.isLoading} />
      </section>

      <section className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-neu-navy font-heading">
                Previous Trips
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Active and completed itineraries saved to your account.
              </p>
            </div>
            {trips.length > 0 && (
              <Link
                to="/trips/new"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E2EBEB] shadow-neu-btn text-xs font-semibold text-teal-800 hover:bg-[#F8FCFC] active:shadow-neu-btn-pressed transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5 text-teal-600" />
                New Trip
              </Link>
            )}
          </div>

          {tripsQ.isLoading ? (
            <div className="py-12">
              <Loader />
            </div>
          ) : trips.length === 0 ? (
            <EmptyState
              title="No Trips Yet"
              description="You haven't planned any journeys yet. Build your first multi-stop itinerary with smart day-by-day scheduling."
              action={
                <Link
                  to="/trips/new"
                  className="neu-button-primary inline-flex items-center gap-2 text-sm font-semibold"
                >
                  <PlusCircle className="w-4 h-4" />
                  Plan Your First Trip
                </Link>
              }
            />
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {trips.slice(0, 6).map((trip, i) => (
                <motion.div
                  key={trip._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <TripCard trip={trip} onDelete={setDeleteTrip} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-neu-navy font-heading">
              Trip Insights
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Live budget pulse & journey recommendations.
            </p>
          </div>
          {ongoing && budgetQ.data?.budget ? (
            <BudgetHighlight trip={ongoing} budget={budgetQ.data.budget} />
          ) : (
            <div className="neu-card p-6 text-center space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/60 shadow-sm mx-auto flex items-center justify-center text-teal-600">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-sm text-neu-navy">Smart Travel Assistant</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Add stops and budgets to your active trips to view automated spending pulse breakdowns and cost metrics.
              </p>
              <Link
                to="/trips/new"
                className="inline-flex items-center justify-center w-full py-2.5 rounded-xl bg-white border border-[#E2EBEB] shadow-neu-btn text-xs font-semibold text-teal-800 hover:bg-[#F8FCFC] active:shadow-neu-btn-pressed transition-all"
              >
                Start New Itinerary
              </Link>
            </div>
          )}
        </div>
      </section>

      <Modal
        open={Boolean(deleteTrip)}
        onClose={() => setDeleteTrip(null)}
        title="Delete Trip Permanently?"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setDeleteTrip(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Confirm Delete
            </Button>
          </div>
        }
      >
        <p className="text-slate-600 text-sm leading-relaxed">
          Are you sure you want to permanently delete <strong>{deleteTrip?.title}</strong>? All associated stops, day schedules, and custom notes will be removed from your account.
        </p>
      </Modal>
    </motion.div>
  );
}
