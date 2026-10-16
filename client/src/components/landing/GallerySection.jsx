import { motion } from 'framer-motion';
import { GALLERY_IMAGES } from '../../data/landingContent.js';
import TravelImage from '../common/TravelImage.jsx';

export default function GallerySection() {
  return (
    <section className="py-20 md:py-28 bg-[#F4FAFA]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="font-heading text-xs font-bold uppercase tracking-widest text-teal-600">
            Wanderlust Gallery
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-neu-navy md:text-4xl">
            Moments that inspire the next journey
          </h2>
          <p className="mt-3 text-sm text-slate-500">
            Captured authentic views from worldwide explorer communities.
          </p>
        </motion.div>

        <div className="columns-2 gap-4 md:columns-3 lg:gap-6">
          {GALLERY_IMAGES.map((src, i) => (
            <motion.figure
              key={src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ delay: (i % 4) * 0.05 }}
              className="mb-4 md:mb-6 break-inside-avoid group relative overflow-hidden rounded-2xl bg-white p-1 border border-[#E2EBEB] shadow-neu-raised-sm hover:shadow-neu-raised transition-all duration-300"
            >
              <div className="relative overflow-hidden rounded-xl aspect-[4/3] bg-slate-100">
                <TravelImage
                  src={src}
                  alt={`Travel destination view ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111B30]/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="absolute bottom-3 left-3 text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  Curated Escape
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
