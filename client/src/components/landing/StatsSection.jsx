import { motion } from 'framer-motion';
import { CAPABILITIES } from '../../data/landingContent.js';

export default function StatsSection() {
  return (
    <section className="relative py-14 md:py-18 overflow-hidden bg-[#F4FAFA]">
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 text-center">
          {CAPABILITIES.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="neu-card p-6 rounded-2xl flex flex-col items-center justify-center border border-[#E2EBEB] shadow-neu-raised-sm hover:shadow-neu-raised transition-all"
            >
              <p className="font-display text-2xl sm:text-3xl font-bold text-gradient-brand tracking-tight">
                {item.value}
              </p>
              <p className="mt-2 font-heading text-xs font-semibold uppercase tracking-wider text-slate-500">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
