import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ClayAlert({ message, type = 'error', className = '' }) {
  if (!message) return null;

  const styles = {
    error: {
      container: 'bg-red-50/80 border-red-200/80 text-red-700 shadow-clay-card-sm',
      icon: <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />,
    },
    success: {
      container: 'bg-emerald-50/80 border-emerald-200/80 text-emerald-800 shadow-clay-card-sm',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />,
    },
    info: {
      container: 'bg-sky-50/80 border-sky-200/80 text-sky-800 shadow-clay-card-sm',
      icon: <Info className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />,
    },
  }[type] || styles.error;

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      className={`rounded-2xl border px-4 py-3 flex items-start gap-3 text-sm font-medium ${styles.container} ${className}`}
    >
      {styles.icon}
      <span className="leading-snug">{message}</span>
    </motion.div>
  );
}
