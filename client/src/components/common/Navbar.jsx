import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Bell, Menu, Search, MapPinned, User, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext.jsx';
import Logo from './Logo.jsx';
import Avatar from './Avatar.jsx';

export default function Navbar({ variant = 'app', onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Welcome to Colombiator!', time: 'Just now' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setNotifications((prev) => [
        { id: Date.now(), text: 'New curated travel route available', time: 'Just now' },
        ...prev.map((n) => ({ ...n, time: 'A while ago' })).slice(0, 4),
      ]);
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const shell =
    variant === 'auth'
      ? 'bg-transparent'
      : scrolled
        ? 'bg-[#F4FAFA]/95 backdrop-blur-md border-b border-[#E2EBEB] shadow-neu-raised-sm'
        : 'bg-[#F4FAFA] border-b border-[#E2EBEB]';

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`sticky top-0 z-40 transition-all ${shell}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3 md:gap-4">
        <button
          type="button"
          className="lg:hidden text-neu-navy p-2 rounded-xl bg-white border border-[#E2EBEB] shadow-neu-btn hover:bg-[#F8FCFC] active:shadow-neu-btn-pressed min-w-[44px] min-h-[44px] flex items-center justify-center"
          onClick={onMenuClick}
          aria-label="Toggle navigation drawer"
        >
          <Menu className="w-5 h-5 text-neu-navy" />
        </button>

        <Link
          to="/dashboard"
          className={`flex items-center gap-2 ${variant === 'app' ? 'lg:hidden' : ''}`}
        >
          <Logo showText />
        </Link>

        {variant === 'app' && (
          <>
            <div className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  placeholder="Search destinations, itineraries, cities..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E2EBEB] shadow-neu-inset text-sm text-neu-navy placeholder:text-slate-400 outline-none focus:border-teal-500 focus:shadow-neu-inset-focus transition-all"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      navigate(`/cities?search=${encodeURIComponent(e.target.value)}`);
                    }
                  }}
                />
              </div>
            </div>

            <button
              type="button"
              className="md:hidden text-neu-navy p-2 rounded-xl bg-white border border-[#E2EBEB] shadow-neu-btn hover:bg-[#F8FCFC] min-w-[44px] min-h-[44px] flex items-center justify-center ml-auto"
              aria-label="Open search"
              onClick={() => navigate('/cities')}
            >
              <Search className="w-5 h-5 text-slate-600" />
            </button>

            <div className="flex items-center gap-2 md:gap-3 ml-auto md:ml-0">
              {/* Notifications */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setOpen(false);
                  }}
                  className="relative p-2.5 rounded-xl bg-white border border-[#E2EBEB] shadow-neu-btn hover:bg-[#F8FCFC] text-slate-700 active:shadow-neu-btn-pressed min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5 text-slate-700" />
                  {notifications.length > 0 && (
                    <span className="absolute top-2 right-2 w-2 h-2 bg-teal-500 rounded-full" />
                  )}
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-neu-raised border border-[#E2EBEB] p-2 z-50 max-h-80 overflow-y-auto"
                    >
                      <div className="px-4 py-2.5 border-b border-[#E2EBEB] font-heading font-bold text-sm text-neu-navy flex items-center justify-between">
                        <span>Notifications</span>
                        <span className="text-xs font-normal text-teal-600 font-sans">
                          {notifications.length} active
                        </span>
                      </div>
                      {notifications.length === 0 ? (
                        <div className="px-4 py-4 text-xs text-slate-500 text-center">
                          No new notifications
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            className="px-3.5 py-2.5 rounded-xl hover:bg-[#F4FAFA] transition-colors border-b border-slate-50 last:border-b-0"
                          >
                            <p className="text-xs font-medium text-neu-navy">{n.text}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{n.time}</p>
                          </div>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Account Menu */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(!open);
                    setShowNotifications(false);
                  }}
                  className="flex items-center gap-2 p-1.5 rounded-xl bg-white border border-[#E2EBEB] shadow-neu-btn hover:bg-[#F8FCFC] active:shadow-neu-btn-pressed transition-all"
                  aria-label="User profile menu"
                >
                  <Avatar src={user?.photo} name={user?.name} size="sm" />
                  <span className="hidden sm:inline-block text-xs font-semibold text-neu-navy max-w-[100px] truncate pr-1">
                    {user?.name?.split(' ')[0] || 'Explorer'}
                  </span>
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-neu-raised border border-[#E2EBEB] p-2 z-50"
                    >
                      <div className="px-3 py-2 border-b border-[#E2EBEB] mb-1">
                        <p className="text-xs font-bold text-neu-navy truncate">{user?.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                      </div>
                      <NavLink
                        to="/profile"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-[#F4FAFA] hover:text-teal-700 transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        <User className="w-4 h-4 text-slate-500" /> My Profile
                      </NavLink>
                      <NavLink
                        to="/trips"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-[#F4FAFA] hover:text-teal-700 transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        <MapPinned className="w-4 h-4 text-slate-500" /> My Trips
                      </NavLink>
                      <button
                        type="button"
                        className="flex w-full items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 text-left transition-colors"
                        onClick={() => {
                          setOpen(false);
                          logout();
                        }}
                      >
                        <LogOut className="w-4 h-4 text-red-500" /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </>
        )}
      </div>

      {variant === 'app' && user?.role === 'admin' && (
        <div className="hidden lg:block border-t border-[#E2EBEB] px-4 py-1 bg-teal-50/50">
          <Link
            to="/admin"
            className="inline-flex items-center gap-1 text-xs font-medium text-teal-800 hover:text-teal-900"
          >
            Admin console →
          </Link>
        </div>
      )}
    </motion.header>
  );
}
