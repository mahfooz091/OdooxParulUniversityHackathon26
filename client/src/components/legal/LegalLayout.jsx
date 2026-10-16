import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, Cookie, AlertTriangle, Users, Trash2, Lock, HelpCircle, Printer } from 'lucide-react';
import Logo from '../common/Logo.jsx';

const legalLinks = [
  { to: '/privacy-policy', label: 'Privacy Policy', icon: Shield },
  { to: '/terms-of-service', label: 'Terms of Service', icon: FileText },
  { to: '/cookie-policy', label: 'Cookie Policy', icon: Cookie },
  { to: '/acceptable-use', label: 'Acceptable Use', icon: AlertTriangle },
  { to: '/community-guidelines', label: 'Community Guidelines', icon: Users },
  { to: '/data-deletion', label: 'Data Deletion', icon: Trash2 },
  { to: '/security', label: 'Security Practices', icon: Lock },
  { to: '/contact', label: 'Contact & Support', icon: HelpCircle },
];

export default function LegalLayout({ title, subtitle, lastUpdated, children }) {
  const { pathname } = useLocation();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#F4FAFA] text-slate-800 flex flex-col font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#F4FAFA]/95 backdrop-blur-md border-b border-[#E2EBEB] shadow-neu-raised-sm print:hidden">
        <div className="mx-auto max-w-7xl px-4 py-3.5 flex items-center justify-between gap-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <span className="text-slate-300">|</span>
            <Link to="/" className="flex items-center gap-2">
              <Logo showText variant="dark" />
            </Link>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              type="button"
              className="neu-button inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700"
              title="Print document"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Print Document</span>
            </button>
            <Link
              to="/legal"
              className="neu-button-primary inline-flex items-center text-xs font-semibold px-3 py-1.5"
            >
              Legal Directory
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl w-full px-4 py-8 md:px-6 md:py-12 flex-1">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-4 print:hidden">
            <div className="neu-card p-4 rounded-2xl border border-[#E2EBEB] shadow-neu-raised">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
                Legal & Governance
              </p>
              <nav className="space-y-1">
                {legalLinks.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        active
                          ? 'bg-white text-teal-800 shadow-neu-raised-sm border border-teal-200/80 font-bold'
                          : 'text-slate-600 hover:bg-white/60 hover:text-neu-navy'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-teal-600' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="neu-card p-4 rounded-2xl border border-[#E2EBEB] shadow-neu-raised-sm bg-gradient-to-br from-white to-teal-50/40 text-xs text-slate-600 space-y-1.5">
              <p className="font-bold text-teal-900 flex items-center gap-1.5 font-heading">
                <Shield className="w-3.5 h-3.5 text-teal-600" />
                DPDPA 2023 & GDPR Aligned
              </p>
              <p className="text-[11px] leading-relaxed text-slate-500">
                Transparent purpose limitation, data portability, and statutory Grievance Redressal.
              </p>
            </div>
          </aside>

          {/* Document Content */}
          <main className="lg:col-span-9 neu-card p-6 md:p-10 rounded-3xl border border-[#E2EBEB] shadow-neu-raised-lg bg-white">
            {/* Header Banner */}
            <div className="border-b border-[#E2EBEB] pb-6 mb-8">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 mb-2 shadow-sm">
                Colombiator Policy
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-neu-navy tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-sm md:text-base text-slate-600 leading-relaxed max-w-3xl">
                  {subtitle}
                </p>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                <span>Effective Date: <strong>October 16, 2026</strong></span>
                <span>•</span>
                <span>Last Updated: <strong>{lastUpdated || 'October 16, 2026'}</strong></span>
                <span>•</span>
                <span>Jurisdiction: <strong>Vadodara, Gujarat (India)</strong></span>
              </div>
            </div>

            {/* Document Body */}
            <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-sm">
              {children}
            </article>

            {/* Document Footer Disclaimer */}
            <div className="mt-12 pt-6 border-t border-[#E2EBEB] text-xs text-slate-500 space-y-2 print:hidden">
              <p>
                <strong>Notice:</strong> This document is maintained for the Colombiator platform (Odoo × Parul University Hackathon 2026). For privacy inquiries, account data export, or deletion requests, please contact our Data Grievance Office via our <Link to="/contact" className="text-teal-700 underline font-semibold">Contact & Support form</Link> or email <strong>privacy@colombiator.vercel.app</strong>.
              </p>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#F4FAFA] border-t border-[#E2EBEB] text-slate-500 py-6 text-xs text-center print:hidden">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Colombiator — Odoo &times; Parul University Hackathon 2026. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 text-slate-600">
            <Link to="/privacy-policy" className="hover:text-teal-700">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-teal-700">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-teal-700">Cookie Policy</Link>
            <Link to="/contact" className="hover:text-teal-700">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
