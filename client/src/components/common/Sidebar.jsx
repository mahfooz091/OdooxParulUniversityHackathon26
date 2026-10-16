import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPinned,
  Compass,
  CalendarCheck,
  Users,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import Logo from './Logo.jsx';

const items = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/trips', label: 'My Trips', icon: MapPinned },
  { to: '/cities', label: 'Explore Cities', icon: Compass },
  { to: '/activities', label: 'Activities', icon: CalendarCheck },
  { to: '/community', label: 'Community', icon: Users },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function Sidebar({ mobileOpen, onClose }) {
  const { logout, isAdmin } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all min-h-[44px] text-sm font-medium ${
      isActive
        ? 'bg-white text-teal-800 font-semibold border border-teal-200/80 shadow-neu-raised-sm'
        : 'text-slate-600 hover:text-neu-navy hover:bg-white/60 hover:shadow-sm'
    } ${collapsed ? 'justify-center px-2' : ''}`;

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-[#111B30]/40 backdrop-blur-sm z-40 lg:hidden cursor-default"
          aria-label="Close navigation sidebar"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:sticky lg:top-0 lg:h-screen inset-y-0 left-0 z-50 flex flex-col bg-[#F8FCFC] border-r border-[#E2EBEB] transition-all duration-300 ease-in-out
        ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        ${collapsed ? 'w-20' : 'w-64'}`}
      >
        <div className="p-4 flex items-center justify-between border-b border-[#E2EBEB]/70 min-h-[64px]">
          {!collapsed ? (
            <Logo size="sm" />
          ) : (
            <div className="mx-auto">
              <Logo showText={false} size="sm" />
            </div>
          )}
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-8 h-8 rounded-lg bg-white border border-[#E2EBEB] shadow-neu-btn items-center justify-center text-slate-500 hover:text-neu-navy active:shadow-neu-btn-pressed transition-all"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={linkClass}
              onClick={onClose}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="w-5 h-5 shrink-0 text-teal-600" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={linkClass}
              onClick={onClose}
              title={collapsed ? 'Admin Console' : undefined}
            >
              <Shield className="w-5 h-5 shrink-0 text-amber-600" />
              {!collapsed && <span>Admin Console</span>}
            </NavLink>
          )}
        </nav>

        <div className="p-3 border-t border-[#E2EBEB]/70 space-y-1">
          <button
            type="button"
            onClick={() => logout()}
            className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50/60 min-h-[44px] transition-all ${
              collapsed ? 'justify-center px-2' : ''
            }`}
            title={collapsed ? 'Sign Out' : undefined}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!collapsed && 'Sign Out'}
          </button>
        </div>
      </aside>
    </>
  );
}
