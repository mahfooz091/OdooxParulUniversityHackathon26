import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Plane, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { UNSPLASH } from '../../data/landingContent.js';

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:items-center lg:gap-8 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white px-4 py-1.5 text-xs font-semibold text-teal-800 shadow-neu-raised-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            <span>Collaborative Travel Planning & Smart Itineraries</span>
          </motion.div>

          <h1 className="font-display text-4xl font-semibold leading-[1.12] tracking-tight text-neu-navy sm:text-5xl lg:text-6xl xl:text-7xl">
            Plan Your Perfect Journey with{' '}
            <span className="text-gradient-brand">Colombiator</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg mx-auto lg:mx-0">
            Intelligent multi-stop itineraries, collaborative route building, and real-time expense tracking — so you spend less time coordinating and more time exploring.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
            <Link
              to="/signup"
              className="neu-button-primary inline-flex min-h-[50px] items-center justify-center px-8 text-sm font-semibold w-full sm:w-auto"
            >
              Start Planning Free
              <Plane className="ml-2 h-4 w-4" />
            </Link>
            <a
              href="#destinations"
              className="neu-button inline-flex min-h-[50px] items-center justify-center gap-2 px-7 text-sm font-semibold text-neu-navy w-full sm:w-auto"
            >
              <Play className="h-3.5 w-3.5 text-teal-600" />
              Explore Destinations
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E2EBEB] flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" /> 100% Free Open Access
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" /> Interactive Route Mapping
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-teal-600" /> Dynamic Budget Pulse
            </span>
          </div>
        </motion.div>

        {/* Hero Interactive Preview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#E2EBEB] bg-white shadow-neu-raised-lg">
            <img
              src={UNSPLASH.hero}
              alt="Colombiator travel planning and itinerary preview"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111B30]/75 via-[#111B30]/20 to-transparent" />

            {/* Illustrative preview badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-bold text-teal-800 shadow-sm border border-[#E2EBEB]">
                Illustrative Preview
              </span>
            </div>

            {/* Float Card 1: Itinerary Route */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-4 top-4 right-28 rounded-2xl border border-[#E2EBEB] bg-white/95 backdrop-blur-md p-3.5 shadow-neu-raised-sm"
            >
              <p className="text-[10px] font-bold uppercase tracking-wider text-teal-700">Multi-Stop Route</p>
              <p className="mt-0.5 font-heading text-base font-bold text-neu-navy">Tokyo → Kyoto → Osaka</p>
              <p className="text-xs text-slate-500">7 days · 3 stops · Automated Budget Pulse</p>
            </motion.div>

            {/* Float Card 2: Budget Pulse */}
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="absolute bottom-4 left-4 max-w-[210px] rounded-2xl border border-teal-200/80 bg-white/95 p-3.5 shadow-neu-raised-sm backdrop-blur-md"
            >
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900">
                <MapPin className="h-3.5 w-3.5 text-teal-600" />
                Live Budget Pulse
              </div>
              <p className="mt-1 text-[11px] text-slate-600 font-medium">$1,850 Tracked · On Target</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
