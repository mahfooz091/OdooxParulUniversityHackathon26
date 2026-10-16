import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Calendar, Wallet, Share2, ArrowRight } from 'lucide-react';
import { WORKFLOW_SHOWCASE } from '../../data/landingContent.js';

const icons = [Calendar, Wallet, Share2];

export default function TestimonialsSection() {
  return (
    <section id="workflow" className="scroll-mt-24 py-20 md:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-100 mb-3">
            <Compass className="w-3.5 h-3.5 text-teal-600" />
            Travel Planning Loop
          </span>
          <h2 className="font-display text-3xl font-semibold text-navy md:text-4xl">
            Designed for real-world exploration
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
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
                className="flex flex-col justify-between rounded-3xl border border-slate-100 bg-slate-50/60 p-8 shadow-card transition-all hover:bg-white hover:border-teal-200/80 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-md">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800 border border-teal-100">
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200/60">
                  <Link
                    to={step.actionLink}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-900 transition-colors"
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
