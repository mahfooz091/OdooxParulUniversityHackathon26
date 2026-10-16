import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Check, ShieldCheck } from 'lucide-react';

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [pref, setPref] = useState('essential_only');

  useEffect(() => {
    const saved = localStorage.getItem('colombiator_cookie_consent');
    if (!saved) {
      // Delay slightly for smooth initial page render
      const t = setTimeout(() => setOpen(true), 1200);
      return () => clearTimeout(t);
    } else {
      setPref(saved);
    }
  }, []);

  useEffect(() => {
    const handleOpen = () => setModalOpen(true);
    window.addEventListener('colombiator:open-cookie-preferences', handleOpen);
    return () => window.removeEventListener('colombiator:open-cookie-preferences', handleOpen);
  }, []);

  const savePreference = (val) => {
    localStorage.setItem('colombiator_cookie_consent', val);
    setPref(val);
    setOpen(false);
    setModalOpen(false);
  };

  return (
    <>
      {/* Floating Bottom Banner */}
      <AnimatePresence>
        {open && !modalOpen && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed bottom-4 inset-x-4 max-w-xl mx-auto z-50 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-5 shadow-2xl"
            role="region"
            aria-label="Cookie Preferences"
          >
            <div className="flex items-start gap-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                <Cookie className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading text-sm font-bold text-navy">
                    Cookie & Storage Choices
                  </h4>
                  <button
                    onClick={() => savePreference('essential_only')}
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
                    aria-label="Dismiss cookie notice with essential cookies only"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  Colombiator uses strictly essential session tokens and cookies to maintain your login securely. We do not use third-party advertising trackers. View our{' '}
                  <Link to="/cookie-policy" className="text-teal-700 underline font-semibold">
                    Cookie Policy
                  </Link>.
                </p>
                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => savePreference('all')}
                    className="rounded-xl bg-teal-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-teal-700 transition-colors shadow-sm"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={() => savePreference('essential_only')}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    Strictly Essential
                  </button>
                  <button
                    onClick={() => setModalOpen(true)}
                    className="text-xs font-medium text-slate-500 hover:text-navy underline px-1"
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Modal (Openable anytime via footer) */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl bg-white border border-slate-200 p-6 md:p-8 shadow-2xl space-y-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cookie-modal-title"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 id="cookie-modal-title" className="font-heading font-bold text-navy text-lg">
                      Cookie Preferences
                    </h3>
                    <p className="text-xs text-slate-500">Manage storage settings for this browser</p>
                  </div>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100"
                  aria-label="Close preferences modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-navy">Strictly Essential Storage</span>
                    <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold">
                      Always Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Required for account authentication (<code className="text-xs font-mono">token</code>), security headers, CSRF protection, and route protection. Cannot be disabled without breaking service availability.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-navy">Functional & UI Preferences</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pref === 'all'}
                        onChange={(e) => setPref(e.target.checked ? 'all' : 'essential_only')}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
                    </label>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Stores non-identifying display preferences, sidebar toggle states, and itinerary viewing modes in localStorage.
                  </p>
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <Link
                  to="/cookie-policy"
                  onClick={() => setModalOpen(false)}
                  className="text-xs font-medium text-teal-700 underline"
                >
                  Read Full Cookie Policy
                </Link>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => savePreference('essential_only')}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50"
                  >
                    Reject Optional
                  </button>
                  <button
                    onClick={() => savePreference(pref)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 shadow-sm"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
