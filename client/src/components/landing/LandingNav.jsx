import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const navClass = scrolled
    ? 'bg-white/85 shadow-card backdrop-blur-xl border-b border-slate-200/80'
    : 'bg-white/45 backdrop-blur-md border-b border-slate-200/40';

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
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
                className="rounded-lg px-3 py-2 text-sm font-medium text-navy/85 transition-colors hover:bg-teal-500/10 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                {l.label}
              </a>
            ) : (
              <Link
                key={l.label}
                to={l.to}
                className="rounded-lg px-3 py-2 text-sm font-medium text-navy/85 transition-colors hover:bg-teal-500/10 hover:text-teal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                {l.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/login"
            className="rounded-xl px-4 py-2 text-sm font-semibold text-navy hover:bg-slate-100/80 transition-colors min-h-[44px] inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-white shadow-glow-sm transition-all hover:brightness-105 active:scale-[0.98] min-h-[44px] inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            Get Started Free
          </Link>
        </div>

        <button
          type="button"
          className="rounded-xl p-2.5 text-navy md:hidden min-w-[44px] min-h-[44px] inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-slate-200/80 bg-white/95 backdrop-blur-xl px-4 py-4 md:hidden shadow-xl"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((l) =>
              l.isHash ? (
                <a
                  key={l.label}
                  href={l.href}
                  className="rounded-xl px-3 py-2.5 text-base font-medium text-navy hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  to={l.to}
                  className="rounded-xl px-3 py-2.5 text-base font-medium text-navy hover:bg-slate-50"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              )
            )}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link
                to="/login"
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-center font-semibold text-navy hover:bg-slate-50"
                onClick={() => setOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2.5 text-center font-semibold text-white shadow-md"
                onClick={() => setOpen(false)}
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
