import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Compass, ArrowRight } from 'lucide-react';
import Card from '../common/Card.jsx';
import TravelImage from '../common/TravelImage.jsx';
import { FALLBACK_DESTINATIONS } from '../../data/landingContent.js';

export default function RecommendedCities({ cities = [], loading }) {
  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="min-w-[240px] h-44 rounded-2xl bg-white border border-[#E2EBEB] shadow-neu-raised-sm animate-pulse"
          />
        ))}
      </div>
    );
  }

  const items =
    cities && cities.length > 0
      ? cities.slice(0, 8).map((c) => ({
          id: c._id,
          name: c.name,
          country: c.country,
          image: c.coverImage,
          cost: c.costIndex ? '$'.repeat(c.costIndex) : '$$',
          link: `/cities?highlight=${c._id}`,
        }))
      : FALLBACK_DESTINATIONS.map((d) => ({
          id: d.id,
          name: d.name,
          country: d.country,
          image: d.image,
          cost: '$$$',
          link: '/cities',
        }));

  return (
    <div className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin">
      {items.map((item, i) => (
        <motion.div
          key={item.id || item.name}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="snap-start min-w-[240px] max-w-[260px] flex-shrink-0"
        >
          <Link to={item.link} className="block group">
            <Card className="overflow-hidden group-hover:shadow-neu-raised-lg group-hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-[16/10] relative overflow-hidden">
                <TravelImage
                  src={item.image}
                  alt={`${item.name}, ${item.country}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111B30]/80 via-[#111B30]/20 to-transparent" />
                <div className="absolute top-2.5 right-2.5">
                  <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-teal-800 shadow-sm">
                    {item.cost}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3 text-white">
                  <p className="font-bold text-base leading-tight font-heading">{item.name}</p>
                  <p className="text-xs text-teal-200 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 shrink-0" />
                    {item.country}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        </motion.div>
      ))}

      <div className="snap-start min-w-[140px] flex-shrink-0 flex items-center justify-center">
        <Link
          to="/cities"
          className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl bg-white border border-[#E2EBEB] shadow-neu-btn text-teal-700 hover:bg-teal-50/50 active:shadow-neu-btn-pressed transition-all text-xs font-semibold h-full w-full min-h-[150px]"
        >
          <Compass className="w-6 h-6 text-teal-600" />
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
