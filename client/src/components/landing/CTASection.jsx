import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Plane } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-[#F4FAFA]">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-600 px-8 py-16 text-center shadow-neu-raised-lg md:px-16 border border-teal-400/40"
        >
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-white/30 blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-cyan-200/40 blur-2xl" />
          </div>

          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-md mb-4 border border-white/20">
              <Plane className="w-3.5 h-3.5" />
              Start Planning in Seconds
            </span>

            <h2 className="font-display text-3xl font-semibold text-white md:text-4xl lg:text-5xl">
              Start Your Next Journey with Colombiator
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base md:text-lg text-teal-50/95 leading-relaxed">
              Build collaborative multi-stop itineraries, manage expenses transparently, and explore with confidence — 100% free open access.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex min-h-[50px] items-center justify-center rounded-xl bg-white px-8 py-3.5 font-semibold text-teal-800 shadow-lg transition-all hover:bg-teal-50/90 active:scale-[0.98] w-full sm:w-auto text-sm"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <a
                href="#destinations"
                className="inline-flex min-h-[50px] items-center justify-center rounded-xl border border-white/60 bg-white/10 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-[0.98] w-full sm:w-auto text-sm"
              >
                Explore Destinations
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
