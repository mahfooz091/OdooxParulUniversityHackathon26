import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Compass, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../common/Card.jsx';
import TravelImage from '../common/TravelImage.jsx';
import { FALLBACK_DESTINATIONS } from '../../data/landingContent.js';

export default function RecommendedCities({ cities = [], loading }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [cities]);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const distance = 340;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
    setTimeout(checkScroll, 350);
  };

  if (loading) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-3 no-scrollbar">
        {[1, 2, 3, 4].map((i) => (
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
    <div className="relative group">
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 border border-[#E2EBEB] shadow-neu-raised items-center justify-center text-neu-navy hover:text-neu-teal transition-all active:scale-95"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex gap-5 overflow-x-auto pb-2 pt-1 snap-x no-scrollbar scroll-smooth"
      >
        {items.map((item, i) => (
          <motion.div
            key={item.id || item.name}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="snap-start min-w-[240px] max-w-[260px] flex-shrink-0"
          >
            <Link to={item.link} className="block group/card">
              <Card className="overflow-hidden group-hover/card:shadow-neu-raised-lg group-hover/card:-translate-y-1 transition-all duration-300">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <TravelImage
                    src={item.image}
                    alt={`${item.name}, ${item.country}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
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

      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 border border-[#E2EBEB] shadow-neu-raised items-center justify-center text-neu-navy hover:text-neu-teal transition-all active:scale-95"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
