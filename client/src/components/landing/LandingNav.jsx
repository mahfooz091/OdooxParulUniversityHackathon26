import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from '../common/Logo.jsx';

const navItems = [
  { href: '#destinations', label: 'Destinations', isHash: true },
  { href: '#studio', label: 'Studio', isHash: true },
  { href: '#features', label: 'Features', isHash: true },
  { href: '#pricing', label: 'Free Access', isHash: true },
  { href: '#workflow', label: 'Workflow', isHash: true },
  { to: '/community', label: 'Community', isHash: false },
  { to: '/legal', label: 'Legal & Trust', isHash: false },
];

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const navClass = scrolled
    ? 'bg-[#F4FAFA]/95 backdrop-blur-xl border-b border-[#E2EBEB] shadow-neu-raised-sm'
    : 'bg-[#F4FAFA]/80 backdrop-blur-md border-b border-[#E2EBEB]/60';

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navClass}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link to="/" className="flex items-center gap-2 min-h-[44px]">
          <Logo showText variant="dark" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((l) =>
            l.isHash ? (
              <a
                key={l.label}
                href={l.href}
                className="rounded-xl px-3.5 py-2 text-xs font-semibold text-neu-navy/85 transition-colors hover:text-teal-700 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.to}
                className="rounded-xl px-3.5 py-2 text-xs font-semibold text-neu-navy/85 transition-colors hover:text-teal-700 hover:bg-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="neu-button text-xs font-semibold px-4 py-2 min-h-[40px] inline-flex items-center"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="neu-button-primary text-xs font-semibold px-5 py-2 min-h-[40px] inline-flex items-center"
          >
            Get Started Free
          </Link>
        </div>

        <button
          type="button"
          className="rounded-xl p-2.5 text-neu-navy md:hidden bg-white border border-[#E2EBEB] shadow-neu-btn min-w-[44px] min-h-[44px] inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[#E2EBEB] bg-[#F4FAFA]/98 backdrop-blur-xl px-5 py-5 md:hidden shadow-neu-raised"
          >
            <div className="flex flex-col gap-1.5">
              {navItems.map((l) =>
                l.isHash ? (
                  <a
                    key={l.label}
                    href={l.href}
                    className="rounded-xl px-3.5 py-2.5 text-sm font-semibold text-neu-navy hover:bg-white/70"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                ) : (
                  <Link
                    key={l.label}
                    to={l.to}
                    className="rounded-xl px-3.5 py-2.5 text-sm font-semibold text-neu-navy hover:bg-white/70"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                )
              )}
              <div className="mt-4 pt-4 border-t border-[#E2EBEB] flex flex-col gap-2.5">
                <Link
                  to="/login"
                  className="neu-button text-center py-2.5 font-semibold text-xs"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="neu-button-primary text-center py-2.5 font-semibold text-xs"
                  onClick={() => setOpen(false)}
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
