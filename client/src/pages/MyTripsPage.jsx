import { useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Search, Plus, MapPin } from 'lucide-react';
import Input from '../components/common/Input.jsx';
import TripList from '../components/trips/TripList.jsx';
import Modal from '../components/common/Modal.jsx';
import Button from '../components/common/Button.jsx';
import * as tripService from '../services/tripService.js';
import { debounce } from '../utils/helpers.js';

export default function MyTripsPage() {
  const qc = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('status') || 'all';
  const sort = searchParams.get('sort') || 'createdAt';
  const [search, setSearch] = useState('');
  const [del, setDel] = useState(null);

  const debouncedSetSearch = useMemo(() => debounce((v) => setSearch(v), 300), []);

  const tripsQ = useQuery({
    queryKey: ['trips', { status: filter, sort }],
    queryFn: () => tripService.fetchTrips({ status: filter, sort }),
  });

  const filtered = useMemo(() => {
    let list = tripsQ.data?.trips || [];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((t) => t.title.toLowerCase().includes(q));
    }
    return list;
  }, [tripsQ.data, search]);

  const remove = async () => {
    if (!del) return;
    try {
      await tripService.deleteTrip(del._id);
      toast.success('Trip deleted');
      qc.invalidateQueries({ queryKey: ['trips'] });
    } catch (e) {
      toast.error(e.friendlyMessage || 'Failed to delete trip');
    } finally {
      setDel(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neu-navy font-heading">My Trips</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your personal travel itineraries, day stops, and expense trackers.
          </p>
        </div>
        <Link
          to="/trips/new"
          className="neu-button-primary inline-flex items-center gap-1.5 text-xs font-semibold self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Plan New Trip
        </Link>
      </div>

      {/* Search & Status Filters */}
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
        <div className="relative max-w-md w-full">
          <Input
            placeholder="Search your trips by title..."
            onChange={(e) => debouncedSetSearch(e.target.value)}
            className="pl-10 text-sm"
          />
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>

        {/* Neumorphic Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {['all', 'upcoming', 'ongoing', 'completed'].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                const p = new URLSearchParams(searchParams);
                p.set('status', s);
                setSearchParams(p);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold capitalize min-h-[40px] transition-all ${
                filter === s ? 'neu-pill-active' : 'neu-pill'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting bar */}
      <div className="flex gap-4 items-center text-xs text-slate-600 bg-white/70 border border-[#E2EBEB] p-2.5 rounded-xl shadow-neu-raised-sm">
        <span className="font-semibold text-slate-500 uppercase tracking-wider text-[10px]">
          Sort By:
        </span>
        {[
          { id: 'createdAt', label: 'Date Created' },
          { id: 'startDate', label: 'Departure Date' },
          { id: 'name', label: 'Trip Title (A–Z)' },
        ].map((o) => (
          <button
            key={o.id}
            type="button"
            className={`transition-colors ${
              sort === o.id
                ? 'font-bold text-teal-700 underline underline-offset-4'
                : 'hover:text-teal-700'
            }`}
            onClick={() => {
              const p = new URLSearchParams(searchParams);
              p.set('sort', o.id);
              setSearchParams(p);
            }}
          >
            {o.label}
          </button>
        ))}
      </div>

      <TripList trips={filtered} loading={tripsQ.isLoading} onDelete={setDel} />

      <Modal
        open={Boolean(del)}
        onClose={() => setDel(null)}
        title="Delete Trip Permanently?"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setDel(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={remove}>
              Delete Permanently
            </Button>
          </div>
        }
      >
        <p className="text-sm text-slate-600 leading-relaxed">
          Are you sure you want to delete <strong>{del?.title}</strong>? All associated stops, day schedules, and custom notes will be removed from your account.
        </p>
      </Modal>
    </motion.div>
  );
}
