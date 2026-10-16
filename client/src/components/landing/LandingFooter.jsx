import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Github, Mail, MapPin, Shield, Cookie, ExternalLink } from 'lucide-react';
import Logo from '../common/Logo.jsx';

export default function LandingFooter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
    toast.success('Thank you for following Colombiator product updates!');
    setEmail('');
  };

  const handleOpenCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent('colombiator:open-cookie-preferences'));
  };

  return (
    <footer className="border-t border-[#E2EBEB] bg-[#F4FAFA] text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand & Project Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Logo showText variant="dark" />
            <p className="text-xs md:text-sm leading-relaxed text-slate-600 max-w-sm">
              The collaborative travel planning and expense management platform developed for the <em>Odoo &times; Parul University Hackathon 2026</em>.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com/mahfooz091/OdooxParulUniversityHackathon26"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-[#E2EBEB] shadow-neu-btn flex items-center justify-center text-slate-700 hover:text-teal-700 active:shadow-neu-btn-pressed transition-all"
                aria-label="Colombiator GitHub Repository"
              >
                <Github className="h-4 w-4" />
              </a>
              <Link
                to="/contact"
                className="w-9 h-9 rounded-xl bg-white border border-[#E2EBEB] shadow-neu-btn flex items-center justify-center text-slate-700 hover:text-teal-700 active:shadow-neu-btn-pressed transition-all"
                aria-label="Contact Support"
              >
                <Mail className="h-4 w-4" />
              </Link>
            </div>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                Parul University, Vadodara, Gujarat, India
              </p>
              <p className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                DPDPA 2023 & GDPR Privacy Aligned
              </p>
            </div>
          </div>

          {/* Product Navigation */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-neu-navy mb-4">
              Platform
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#destinations" className="text-slate-600 hover:text-teal-700 transition-colors">
                  Explore Destinations
                </a>
              </li>
              <li>
                <a href="#studio" className="text-slate-600 hover:text-teal-700 transition-colors">
                  Itinerary Studio
                </a>
              </li>
              <li>
                <a href="#features" className="text-slate-600 hover:text-teal-700 transition-colors">
                  Features & Tools
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-slate-600 hover:text-teal-700 transition-colors">
                  Free Open Access
                </a>
              </li>
              <li>
                <Link to="/community" className="text-slate-600 hover:text-teal-700 transition-colors">
                  Community Routes
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-600 hover:text-teal-700 transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Legal Compliance */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-neu-navy mb-4">
              Legal & Trust
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/legal" className="text-teal-700 hover:text-teal-900 transition-colors font-bold">
                  Trust & Legal Directory
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-slate-600 hover:text-teal-700 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-slate-600 hover:text-teal-700 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-slate-600 hover:text-teal-700 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/data-deletion" className="text-slate-600 hover:text-teal-700 transition-colors">
                  Data Deletion Instructions
                </Link>
              </li>
              <li>
                <Link to="/acceptable-use" className="text-slate-600 hover:text-teal-700 transition-colors">
                  Acceptable Use Policy
                </Link>
              </li>
              <li>
                <Link to="/community-guidelines" className="text-slate-600 hover:text-teal-700 transition-colors">
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Preferences */}
          <div>
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-neu-navy mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-teal-700 transition-colors">
                  Help & Contact Support
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-slate-600 hover:text-teal-700 transition-colors">
                  Security Practices
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleOpenCookiePreferences}
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-teal-700 transition-colors text-left"
                >
                  <Cookie className="w-3.5 h-3.5 text-teal-600" />
                  Cookie Settings
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/mahfooz091/OdooxParulUniversityHackathon26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-600 hover:text-teal-700 transition-colors"
                >
                  GitHub Repository
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-[#E2EBEB]">
              <p className="text-xs font-semibold text-neu-navy mb-2">Hackathon Updates</p>
              {subscribed ? (
                <p className="text-xs text-teal-700 font-medium">Subscribed to product updates!</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-1.5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full rounded-xl bg-white border border-[#E2EBEB] shadow-neu-inset px-3 py-2 text-xs text-neu-navy placeholder:text-slate-400 outline-none focus:border-teal-500"
                  />
                  <button
                    type="submit"
                    className="neu-button-primary px-3 py-2 text-xs font-semibold shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#E2EBEB] pt-8 text-xs text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} Colombiator — Odoo &times; Parul University Hackathon 2026. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 text-slate-500">
            <Link to="/privacy-policy" className="hover:text-teal-700">Privacy</Link>
            <Link to="/terms-of-service" className="hover:text-teal-700">Terms</Link>
            <Link to="/cookie-policy" className="hover:text-teal-700">Cookies</Link>
            <Link to="/data-deletion" className="hover:text-teal-700">Data Deletion</Link>
            <Link to="/contact" className="hover:text-teal-700">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
