import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';

export default function Footer() {
  const handleOpenCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent('colombiator:open-cookie-preferences'));
  };

  return (
    <footer className="text-center text-xs text-slate-500 py-6 border-t border-slate-200/60 mt-12 space-y-2">
      <div className="flex flex-wrap items-center justify-center gap-4 text-slate-500">
        <Link to="/privacy-policy" className="hover:text-teal-700 transition-colors">
          Privacy Policy
        </Link>
        <span>•</span>
        <Link to="/terms-of-service" className="hover:text-teal-700 transition-colors">
          Terms of Service
        </Link>
        <span>•</span>
        <Link to="/cookie-policy" className="hover:text-teal-700 transition-colors">
          Cookie Policy
        </Link>
        <span>•</span>
        <Link to="/data-deletion" className="hover:text-teal-700 transition-colors">
          Data Deletion
        </Link>
        <span>•</span>
        <button
          type="button"
          onClick={handleOpenCookiePreferences}
          className="inline-flex items-center gap-1 hover:text-teal-700 transition-colors"
        >
          <Cookie className="w-3.5 h-3.5 text-teal-600" />
          Cookie Settings
        </button>
        <span>•</span>
        <Link to="/contact" className="hover:text-teal-700 transition-colors">
          Help & Support
        </Link>
      </div>
      <p>
        © {new Date().getFullYear()} Colombiator — Collaborative Travel & Itineraries · Odoo &times; Parul University Hackathon 2026
      </p>
    </footer>
  );
}
