import { motion } from 'framer-motion';

export default function ClayCard({ children, className = '', ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`relative rounded-3xl bg-white/95 p-8 sm:p-10 shadow-clay-card border border-white/80 backdrop-blur-sm ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
