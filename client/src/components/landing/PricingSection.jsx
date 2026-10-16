import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

const openFeatures = [
  'Unlimited multi-stop itineraries & custom days',
  'Interactive Leaflet route maps & stop waypoints',
  'Comprehensive expense tracking & visual budget charts',
  'Categorized packing checklists with progress trackers',
  'Private travel notes, flight vaults & confirmation codes',
  'Public community sharing & one-click itinerary cloning',
  'Full account data export & self-service deletion',
  'Zero credit card required — no paywalls or trials',
];

export default function PricingSection() {
  return (
    <section id="pricing" className="scroll-mt-24 py-20 md:py-28 bg-[#F4FAFA] border-y border-[#E2EBEB]">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-teal-800 border border-[#E2EBEB] shadow-neu-raised-sm mb-3">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            100% Free & Open Access
          </span>
          <h2 className="mt-2 font-display text-3xl font-semibold text-neu-navy md:text-4xl">
            No subscriptions. No paywalls.
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-600 leading-relaxed">
            Colombiator was built for the <em>Odoo &times; Parul University Hackathon 2026</em>. Every planning tool, budget chart, and collaborative route is completely free for all travelers.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-[#E2EBEB] bg-white p-8 md:p-12 shadow-neu-raised-lg"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E2EBEB] pb-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3.5 py-1 text-xs font-bold text-teal-800 border border-teal-200 shadow-sm">
                <Heart className="w-3.5 h-3.5 text-teal-600" />
                Community Hackathon Edition
              </div>
              <h3 className="mt-3 font-heading text-2xl md:text-3xl font-bold text-neu-navy">
                Complete Travel Planning Suite
              </h3>
              <p className="mt-2 text-xs md:text-sm text-slate-600 max-w-xl">
                Full access to all itinerary studio tools, interactive maps, financial budget management, and community sharing.
              </p>
            </div>

            <div className="text-left md:text-right shrink-0">
              <p className="font-display text-5xl font-bold text-neu-navy">
                $0
              </p>
              <p className="text-xs font-bold text-teal-700 mt-1 uppercase tracking-wider">
                Forever Free · No Hidden Fees
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              What&rsquo;s included in your free account:
            </h4>
            <div className="grid sm:grid-cols-2 gap-3.5">
              {openFeatures.map((feature) => (
                <div key={feature} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50 border border-teal-200 text-teal-700 mt-0.5">
                    <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-[#E2EBEB] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Full privacy compliance under DPDPA 2023 & GDPR</span>
            </div>
            <Link
              to="/signup"
              className="neu-button-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold"
            >
              Start Planning Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
