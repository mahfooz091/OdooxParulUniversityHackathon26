import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Bell, Menu, Search, MapPinned, User, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext.jsx';
import Logo from './Logo.jsx';
import Avatar from './Avatar.jsx';

export default function Navbar({ variant = 'app', onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const shell =
    variant === 'auth'
      ? 'bg-transparent'
      : scrolled
        ? 'bg-dark shadow-md'
        : 'bg-dark';

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`sticky top-0 z-40 transition-all ${shell}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        <button
          type="button"
          className="lg:hidden text-white p-2 rounded-xl hover:bg-white/10 min-w-[44px] min-h-[44px]"
          onClick={onMenuClick}
          aria-label="Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/dashboard" className="flex items-center gap-2 text-white">
          <Logo showText />
        </Link>
        {variant === 'app' && (
          <>
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input
                  placeholder="Search trips, cities..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter')
                      navigate(`/cities?search=${encodeURIComponent(e.target.value)}`);
                  }}
                />
              </div>
            </div>
            <button
              type="button"
              className="md:hidden text-white p-2 rounded-xl hover:bg-white/10"
              aria-label="Search"
              onClick={() => navigate('/cities')}
            >
              <Search className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                className="relative p-2 rounded-xl hover:bg-white/10 text-white min-w-[44px] min-h-[44px]"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </button>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-2 p-1 rounded-xl hover:bg-white/10"
                >
                  <Avatar src={user?.photo} name={user?.name} />
                </button>
                {open && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                    <NavLink
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50"
                      onClick={() => setOpen(false)}
                    >
                      <User className="w-4 h-4" /> Profile
                    </NavLink>
                    <NavLink
                      to="/trips"
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50"
                      onClick={() => setOpen(false)}
                    >
                      <MapPinned className="w-4 h-4" /> My Trips
                    </NavLink>
                    <button
                      type="button"
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50 text-left"
                      onClick={() => {
                        setOpen(false);
                        logout();
                      }}
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      {variant === 'app' && user?.role === 'admin' && (
        <div className="hidden lg:block border-t border-white/10 px-4 py-1">
          <Link
            to="/admin"
            className="inline-flex items-center gap-1 text-xs text-teal-200 hover:text-white"
          >
            Admin console →
          </Link>
        </div>
      )}
    </motion.header>
  );
}
