import { motion } from 'framer-motion';
import { CAPABILITIES } from '../../data/landingContent.js';

export default function StatsSection() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy-light to-ocean opacity-[0.97]" />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(6,182,212,0.4) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(20,184,166,0.35) 0%, transparent 45%)`,
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6 text-center">
          {CAPABILITIES.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-4"
            >
              <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight drop-shadow-sm">
                {item.value}
              </p>
              <p className="mt-2 font-heading text-xs sm:text-sm font-semibold uppercase tracking-wider text-teal-200/90">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
