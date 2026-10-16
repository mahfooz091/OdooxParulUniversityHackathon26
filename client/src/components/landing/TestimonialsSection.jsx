import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Calendar, Wallet, Share2, ArrowRight } from 'lucide-react';
import { WORKFLOW_SHOWCASE } from '../../data/landingContent.js';

const icons = [Calendar, Wallet, Share2];

export default function TestimonialsSection() {
  return (
    <section id="workflow" className="scroll-mt-24 py-20 md:py-28 bg-[#F4FAFA]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-teal-800 border border-[#E2EBEB] shadow-neu-raised-sm mb-3">
            <Compass className="w-3.5 h-3.5 text-teal-600" />
            Travel Planning Loop
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold text-neu-navy md:text-4xl">
            Designed for real-world exploration
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
            See how Colombiator streamlines complex travel logistics from preliminary itinerary drafting to departure day.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {WORKFLOW_SHOWCASE.map((step, i) => {
            const Icon = icons[i] || Compass;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="neu-card flex flex-col justify-between p-8 rounded-3xl border border-[#E2EBEB] shadow-neu-raised hover:shadow-neu-raised-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-neu-btn-primary">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-teal-50 px-3.5 py-1 text-xs font-bold text-teal-800 border border-teal-200/60 shadow-sm">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-neu-navy">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-xs md:text-sm leading-relaxed text-slate-600">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E2EBEB]">
                  <Link
                    to={step.actionLink}
                    className="neu-button inline-flex items-center gap-1.5 text-xs font-bold text-teal-800 w-full justify-center"
                  >
                    {step.actionText}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
