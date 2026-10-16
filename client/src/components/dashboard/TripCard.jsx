import { Link } from 'react-router-dom';
import { Calendar, MapPin, Pencil, Trash2, Eye } from 'lucide-react';
import Card from '../common/Card.jsx';
import Badge from '../common/Badge.jsx';
import TravelImage from '../common/TravelImage.jsx';
import { formatDateRange } from '../../utils/helpers.js';

const statusVariant = {
  upcoming: 'warning',
  ongoing: 'teal',
  completed: 'success',
};

export default function TripCard({ trip, onDelete }) {
  const destCount = trip.stops?.length ?? 0;

  return (
    <Card className="overflow-hidden group hover:shadow-neu-raised-lg transition-all duration-300">
      <div className="aspect-[16/9] relative overflow-hidden bg-slate-100">
        <TravelImage
          src={trip.coverPhoto}
          alt={trip.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111B30]/75 via-[#111B30]/20 to-transparent" />
        <Badge
          variant={statusVariant[trip.status] || 'default'}
          className="absolute top-3 right-3 capitalize"
        >
          {trip.status}
        </Badge>
        {trip.isPublic && (
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-teal-500/90 text-white text-[10px] font-semibold backdrop-blur-sm">
            Community Public
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-neu-navy line-clamp-1 font-heading">{trip.title}</h3>
        <div className="flex flex-wrap gap-3 text-xs text-slate-500 mt-2 font-medium">
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-teal-600" />
            {formatDateRange(trip.startDate, trip.endDate)}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            {destCount} {destCount === 1 ? 'stop' : 'stops'}
          </span>
        </div>

        <div className="flex gap-2 mt-5 pt-3 border-t border-[#E2EBEB]">
          <Link
            to={`/trips/${trip._id}/view`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white border border-[#E2EBEB] shadow-neu-btn text-xs font-semibold text-neu-navy hover:bg-[#F8FCFC] active:shadow-neu-btn-pressed transition-all min-h-[44px]"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" /> View
          </Link>
          <Link
            to={`/trips/${trip._id}/builder`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-teal-50/70 border border-teal-200/80 text-teal-800 text-xs font-semibold hover:bg-teal-100/60 active:scale-[0.98] transition-all min-h-[44px]"
          >
            <Pencil className="w-3.5 h-3.5 text-teal-600" /> Edit
          </Link>
          <button
            type="button"
            onClick={() => onDelete?.(trip)}
            className="px-3 rounded-xl bg-white border border-red-200 text-red-500 hover:bg-red-50/60 hover:text-red-700 active:scale-[0.98] min-h-[44px] min-w-[44px] inline-flex items-center justify-center transition-all"
            aria-label={`Delete ${trip.title}`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
}
