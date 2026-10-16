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
    <div className="min-h-screen bg-surface text-slate-800 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-200/80 shadow-sm print:hidden">
        <div className="mx-auto max-w-7xl px-4 py-3.5 flex items-center justify-between gap-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-700 hover:text-teal-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <span className="text-slate-300">|</span>
            <Link to="/" className="flex items-center gap-2">
              <Logo showText variant="dark" />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              title="Print this document"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Print Document</span>
            </button>
            <Link
              to="/legal"
              className="rounded-xl bg-teal-50 border border-teal-200/80 px-3 py-1.5 text-xs font-semibold text-teal-800 hover:bg-teal-100/80 transition-colors"
            >
              Legal Directory
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl w-full px-4 py-8 md:px-6 md:py-12 flex-1">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 space-y-4 print:hidden">
            <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-card">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
                Legal & Compliance
              </p>
              <nav className="space-y-1">
                {legalLinks.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        active
                          ? 'bg-teal-50 text-teal-800 font-semibold shadow-sm border border-teal-200/60'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-navy'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-teal-600' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50/60 to-cyan-50/60 p-4 text-xs text-slate-600 space-y-2">
              <p className="font-semibold text-teal-900 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-teal-600" />
                Indian DPDP Act & GDPR
              </p>
              <p className="leading-relaxed">
                Colombiator adheres to fair information practices, data minimization, and transparent user rights management.
              </p>
            </div>
          </aside>

          {/* Document Content */}
          <main className="lg:col-span-9 bg-white rounded-3xl border border-slate-200/80 p-6 md:p-10 shadow-card">
            {/* Header Banner */}
            <div className="border-b border-slate-100 pb-6 mb-8">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-100 mb-2">
                Colombiator Policy
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-navy tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="mt-2 text-base text-slate-600 leading-relaxed max-w-3xl">
                  {subtitle}
                </p>
              )}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
                <span>Effective Date: <strong>October 16, 2026</strong></span>
                <span>•</span>
                <span>Last Updated: <strong>{lastUpdated || 'October 16, 2026'}</strong></span>
                <span>•</span>
                <span>Jurisdiction: <strong>India & Global Fair Practices</strong></span>
              </div>
            </div>

            {/* Document Body */}
            <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
              {children}
            </article>

            {/* Document Footer Disclaimer */}
            <div className="mt-12 pt-6 border-t border-slate-100 text-xs text-slate-500 space-y-2 print:hidden">
              <p>
                <strong>Notice:</strong> This document is maintained for the Colombiator platform (Odoo × Parul University Hackathon 2026). For privacy inquiries, account data export, or deletion requests, please contact our Data Grievance Office via our <Link to="/contact" className="text-teal-700 underline font-semibold">Contact & Support form</Link> or email <strong>privacy@colombiator.vercel.app</strong>.
              </p>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-navy text-slate-400 py-6 text-xs text-center border-t border-slate-200/20 print:hidden">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Colombiator. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4 text-slate-400">
            <Link to="/privacy-policy" className="hover:text-teal-300">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-teal-300">Terms of Service</Link>
            <Link to="/cookie-policy" className="hover:text-teal-300">Cookie Policy</Link>
            <Link to="/contact" className="hover:text-teal-300">Help & Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
