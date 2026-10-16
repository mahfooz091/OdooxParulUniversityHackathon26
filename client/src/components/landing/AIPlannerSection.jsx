import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  Calendar,
  Wallet,
  CheckCircle2,
  MapPin,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function AIPlannerSection() {
  return (
    <section
      id="studio"
      className="scroll-mt-24 relative py-20 md:py-28 overflow-hidden bg-slate-50/50"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-teal-50/30 to-white pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-200/60 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              Smart Itinerary Studio
            </span>
            <h2 className="mt-2 font-display text-3xl font-semibold text-navy md:text-4xl">
              Organize multi-stop journeys with total clarity
            </h2>
            <p className="mt-4 text-lg text-slate-600 leading-relaxed">
              Colombiator synthesizes destination stops, transit days, and expense budgets into an interactive, structured workspace — fully customizable at every step of your trip.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                { icon: Calendar, text: 'Day-by-day activity sequencing with morning, afternoon & evening slots' },
                { icon: MapPin, text: 'Interactive Leaflet waypoint visualization across your entire route' },
                { icon: Wallet, text: 'Real-time category budget breakdowns across stays, dining, and transit' },
                { icon: Compass, text: 'Instant community cloning & one-click route duplication' },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100/80 text-teal-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-slate-700 text-sm pt-2 font-medium">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                to="/trips/new"
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-glow hover:brightness-105 active:scale-[0.98] transition-all"
              >
                Create a Trip Now
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-2xl md:p-8">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-sm">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-navy">Sample Itinerary</p>
                    <p className="text-xs text-slate-500">Live Studio Workspace</p>
                  </div>
                </div>
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 border border-teal-100">
                  Illustrative Preview
                </span>
              </div>
              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                  <Calendar className="h-4 w-4 text-teal-600" />
                  Day 1: Tokyo Imperial Palace & Ginza Architecture
                </div>
                {[
                  'Morning: Meiji Shrine & Yoyogi Park stroll',
                  'Afternoon: Shibuya crossing & panoramic viewpoint',
                  'Evening: Traditional Shinjuku ramen & nightlife',
                ].map((s) => (
                  <div
                    key={s}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-600 mt-0.5" />
                    <span className="text-xs text-slate-700 font-medium">{s}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Budget allocated: $1,250</span>
                <span className="text-teal-700 font-semibold">3 activities sequenced</span>
              </div>
            </div>
            <div className="absolute -z-10 -bottom-6 -right-6 h-40 w-40 rounded-full bg-cyan-400/20 blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
