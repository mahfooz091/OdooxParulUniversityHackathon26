import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, Sparkles, MapPin } from 'lucide-react';
import Logo from '../common/Logo.jsx';

export default function ClayAuthLayout({
  children,
  badgeText = 'Travel Planning Platform',
  title,
  subtitle,
}) {
  return (
    <div className="min-h-screen bg-[#F4FAFA] text-neu-navy relative overflow-hidden flex flex-col justify-between selection:bg-neu-teal/20 selection:text-neu-teal">
      {/* Soft Ambient Glows */}
      <div className="absolute top-[-100px] left-[-80px] w-96 h-96 rounded-full bg-neu-mint/60 blur-3xl pointer-events-none" />
      <div className="absolute top-[20%] right-[-100px] w-[420px] h-[420px] rounded-full bg-cyan-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[25%] w-96 h-96 rounded-full bg-teal-100/40 blur-3xl pointer-events-none" />
      <div className="absolute top-[60%] left-[-80px] w-80 h-80 rounded-full bg-emerald-100/30 blur-3xl pointer-events-none" />

      {/* Top Bar Navigation */}
      <header className="relative z-20 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Logo showText size="md" />
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-sm font-semibold text-neu-slate shadow-neu-raised-sm border border-[#E2EBEB] hover:text-neu-teal hover:shadow-neu-raised transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </Link>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg mx-auto">
          {/* Header Title Section */}
          <div className="text-center mb-6 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200/60 text-xs font-semibold shadow-sm">
              <Compass className="w-3.5 h-3.5 text-teal-600" />
              <span>{badgeText}</span>
            </div>
            {title && (
              <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-800">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-slate-500 text-sm sm:text-base max-w-sm mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form Container */}
          {children}

          {/* Travel Feature Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 shadow-clay-card-sm border border-slate-100/80">
              <Sparkles className="w-3 h-3 text-teal-500" /> AI Itineraries
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 shadow-clay-card-sm border border-slate-100/80">
              <MapPin className="w-3 h-3 text-sky-500" /> Multi-City Routes
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/80 shadow-clay-card-sm border border-slate-100/80">
              <Compass className="w-3 h-3 text-indigo-500" /> Real-time Budgets
            </span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-xs text-neu-slate/70">
        <p>© {new Date().getFullYear()} Colombiator. Collaborative travel planning and smart itineraries.</p>
      </footer>
    </div>
  );
}
