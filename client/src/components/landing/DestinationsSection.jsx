import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MapPin, Compass, ArrowRight } from 'lucide-react';
import { fetchPopularCities } from '../../services/cityService.js';
import { FALLBACK_DESTINATIONS } from '../../data/landingContent.js';

export default function DestinationsSection() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['landing-popular-cities'],
    queryFn: fetchPopularCities,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const apiCities = !isError && data?.cities ? data.cities : [];
  const cards =
    apiCities.length >= 4
      ? apiCities.slice(0, 4).map((c) => ({
          id: c._id,
          name: c.name,
          country: c.country,
          region: c.region || 'Global Escape',
          image: c.coverImage,
          description: c.description || 'Explore scenic neighborhoods, cultural landmarks, and local highlights.',
          highlight: 'Curated Itinerary Stop',
        }))
      : FALLBACK_DESTINATIONS;

  return (
    <section id="destinations" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="font-heading text-sm font-semibold uppercase tracking-widest text-teal-600">
            Destination Inspiration
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy md:text-4xl">
            Curated escapes ready for your itinerary
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Explore authentic global cities and seamlessly add stops directly into your personal trip planner.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-[4/5] rounded-3xl bg-slate-100 animate-pulse border border-slate-200" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((d, i) => (
              <motion.article
                key={d.id || d.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-300 hover:shadow-xl border border-slate-100"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={d.image}
                    alt={`${d.name}, ${d.country}`}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/35 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-teal-800 shadow-sm">
                      <Compass className="w-3 h-3 text-teal-600" />
                      {d.region}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="font-heading text-xl font-bold">{d.name}</h3>
                    <p className="flex items-center gap-1 text-sm text-teal-200 font-medium mt-0.5">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      {d.country}
                    </p>
                    <p className="mt-2 text-xs text-slate-200 line-clamp-2 leading-relaxed">
                      {d.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-semibold">
                      <span className="text-teal-200">{d.highlight}</span>
                      <Link
                        to="/trips/new"
                        className="inline-flex items-center gap-1 text-white hover:text-teal-300 transition-colors"
                      >
                        Plan Trip
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/cities"
            className="inline-flex items-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-navy hover:border-teal-400 hover:bg-teal-50/40 transition-all shadow-sm"
          >
            <Compass className="w-4 h-4 text-teal-600" />
            Explore All Destinations & Activities
          </Link>
        </div>
      </div>
    </section>
  );
}
