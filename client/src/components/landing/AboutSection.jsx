import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 py-16 md:py-24 bg-white/60 border-t border-slate-100">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-100 mb-3">
            About Colombiator
          </span>
          <h2 className="font-display text-3xl font-semibold text-navy md:text-4xl">
            Built for collaborative and effortless travel
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Colombiator combines intelligent itinerary creation with clear budget tracking and seamless group collaboration — empowering explorers and travel creators to build journeys that stay organized, transparent, and unforgettable.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
