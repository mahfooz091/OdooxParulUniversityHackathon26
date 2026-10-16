import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function Modal({ open, onClose, title, children, footer, maxWidth = 'max-w-lg' }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-[#111B30]/40 backdrop-blur-sm cursor-default"
            aria-label="Close dialog overlay"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`relative bg-white rounded-3xl border border-[#E2EBEB] shadow-2xl ${maxWidth} w-full max-h-[90vh] overflow-y-auto z-10`}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2EBEB] bg-[#F8FCFC] rounded-t-3xl">
              <h2 className="text-lg font-bold text-neu-navy font-heading">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-xl bg-white border border-[#E2EBEB] shadow-neu-btn flex items-center justify-center text-slate-500 hover:text-neu-navy hover:bg-[#F4FAFA] active:shadow-neu-btn-pressed transition-all"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">{children}</div>
            {footer && (
              <div className="px-6 py-4 bg-[#F8FCFC] border-t border-[#E2EBEB] rounded-b-3xl">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
