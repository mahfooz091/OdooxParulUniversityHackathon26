import { motion } from 'framer-motion';
import { Plane, Compass, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WelcomeBanner({ name }) {
  const firstName = name ? name.split(' ')[0] : 'Explorer';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="neu-card p-6 md:p-8 relative overflow-hidden bg-gradient-to-r from-white via-[#F8FCFC] to-[#EBF7F5] border border-[#E2EBEB] flex flex-col md:flex-row md:items-center md:justify-between gap-6"
    >
      <div className="relative z-10 max-w-xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-semibold mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-teal-600" />
          <span>Intelligent Trip Studio</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-neu-navy font-heading tracking-tight">
          Welcome back, {firstName}!
        </h1>
        <p className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed">
          Plan routes, sequence multi-stop timelines, and track budgets in real time — all in one unified loop.
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap gap-3">
        <Link
          to="/trips/new"
          className="neu-button-primary inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold min-h-[48px]"
        >
          <Plane className="w-4 h-4" />
          Plan New Trip
        </Link>
        <Link
          to="/cities"
          className="neu-button inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold min-h-[48px]"
        >
          <Compass className="w-4 h-4 text-teal-600" />
          Explore Cities
        </Link>
      </div>
    </motion.div>
  );
}
