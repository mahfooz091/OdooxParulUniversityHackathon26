import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MapPinned, Compass, Users, User } from 'lucide-react';

const items = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { to: '/trips', label: 'Trips', icon: MapPinned },
  { to: '/cities', label: 'Explore', icon: Compass },
  { to: '/community', label: 'Community', icon: Users },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#F4FAFA]/95 backdrop-blur-md border-t border-[#E2EBEB] shadow-[0_-4px_20px_rgba(18,184,169,0.06)]">
      <div className="flex justify-around items-center py-2 px-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-[56px] min-h-[48px] rounded-xl px-2 py-1 transition-all duration-200 ${
                isActive
                  ? 'text-neu-teal font-semibold bg-white shadow-neu-raised-sm border border-[#E2EBEB]'
                  : 'text-neu-slate hover:text-neu-navy'
              }`
            }
          >
            <item.icon className="w-5 h-5 mb-0.5" strokeWidth={2} />
            <span className="text-[10px] tracking-tight">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
