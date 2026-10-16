import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Copy, Printer, Check, Globe, Shield, ArrowLeft, PlusCircle } from 'lucide-react';
import Button from '../components/common/Button.jsx';
import Loader from '../components/common/Loader.jsx';
import Logo from '../components/common/Logo.jsx';
import TripMap from '../components/itinerary/TripMap.jsx';
import * as tripService from '../services/tripService.js';
import { useAuth } from '../context/AuthContext.jsx';
import { formatDateRange } from '../utils/helpers.js';

export default function PublicItineraryPage() {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const q = useQuery({
    queryKey: ['public-trip', slug],
    queryFn: () => tripService.fetchPublicTripBySlug(slug),
    enabled: Boolean(slug),
  });

  const trip = q.data?.trip;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success('Public link copied to clipboard!');
      setTimeout(() => setCopied(false), 3000);
    } catch (e) {
      toast.info('Copy link: ' + window.location.href);
    }
  };

  const copyTrip = async () => {
    if (!user) {
      toast.info('Sign in to clone this itinerary into your trips workspace');
      navigate('/login');
      return;
    }
    try {
      const { trip: t } = await tripService.duplicateTrip(trip._id);
      toast.success('Itinerary cloned into your personal planner!');
      navigate(`/trips/${t._id}/builder`);
    } catch (e) {
      toast.error(e.friendlyMessage || 'Could not copy trip');
    }
  };

  if (q.isLoading) return <Loader />;
  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <Logo showText variant="dark" />
        <h1 className="mt-6 text-2xl font-bold text-navy">Itinerary Not Found</h1>
        <p className="mt-2 text-sm text-slate-600 max-w-md">
          This itinerary may be private or the public link might have expired.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Colombiator Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      {/* Top Banner */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm print:hidden">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <Logo showText variant="dark" />
          </Link>
          <div className="flex items-center gap-3">
            {user ? (
              <Button type="button" variant="ghost" onClick={() => navigate('/dashboard')}>
                My Dashboard
              </Button>
            ) : (
              <Link
                to="/signup"
                className="rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:brightness-105"
              >
                Sign Up Free
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mx-auto max-w-6xl w-full px-4 py-8 md:py-10 space-y-6 flex-1"
      >
        {/* Cover Hero */}
        <div
          className="rounded-3xl h-64 md:h-80 bg-cover bg-center relative overflow-hidden shadow-card border border-slate-200/80"
          style={{
            backgroundImage: `url(${
              trip.coverPhoto ||
              'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/10" />
          
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/90 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-white shadow-sm">
              <Globe className="w-3.5 h-3.5" />
              Public Community Itinerary
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/80 backdrop-blur-md px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm">
              <Shield className="w-3 h-3 text-emerald-600" />
              Verified Read-Only
            </span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white space-y-2">
            <p className="text-xs md:text-sm text-teal-200 font-medium">
              Curated by <strong>{trip.userId?.name || 'Colombiator Explorer'}</strong> · {formatDateRange(trip.startDate, trip.endDate)}
            </p>
            <h1 className="text-2xl md:text-4xl font-display font-bold tracking-tight">
              {trip.title}
            </h1>
            {trip.description && (
              <p className="text-xs md:text-sm text-slate-200 max-w-2xl leading-relaxed">
                {trip.description}
              </p>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm print:hidden">
          <div className="flex flex-wrap items-center gap-2">
            <Button type="button" onClick={copyLink} className="min-h-[40px]">
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? 'Link Copied!' : 'Copy Share Link'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.print()}
              className="min-h-[40px]"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print / Save PDF
            </Button>
          </div>

          <Button
            type="button"
            onClick={copyTrip}
            className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-glow-sm min-h-[40px]"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Clone to My Trips
          </Button>
        </div>

        {/* Privacy Shield Notice */}
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-xs text-slate-600 flex items-center gap-2.5">
          <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Privacy Protection:</strong> Private personal notes, booking confirmation codes, and expense receipts are completely redacted from public views.
          </span>
        </div>

        {/* Itinerary Stops and Map */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-heading text-lg font-bold text-navy flex items-center gap-2">
              Itinerary Stops & Waypoints ({(trip.stops || []).length})
            </h2>

            {!(trip.stops || []).length ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-500 text-sm">
                No stops added to this itinerary yet.
              </div>
            ) : (
              (trip.stops || []).map((stop, idx) => (
                <div
                  key={stop._id || idx}
                  className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-5 md:p-6 transition-all hover:border-teal-200"
                >
                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <div className="w-full sm:w-32 h-28 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={
                          stop.cityId?.coverImage ||
                          'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80'
                        }
                        alt={stop.cityName || 'Destination'}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
                          {idx + 1}
                        </span>
                        <h3 className="font-heading font-bold text-xl text-navy">
                          {stop.cityName}, {stop.country}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        {formatDateRange(stop.arrivalDate, stop.departureDate)}
                      </p>
                      {stop.notes && (
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                          {stop.notes}
                        </p>
                      )}

                      {(stop.activities || []).length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-100">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                            Planned Activities
                          </p>
                          <ul className="space-y-1 text-xs text-slate-700">
                            {stop.activities.map((a, actIdx) => (
                              <li key={a._id || actIdx} className="flex items-center justify-between">
                                <span>• {a.name}</span>
                                {a.estimatedCost ? (
                                  <span className="text-teal-700 font-semibold">${a.estimatedCost}</span>
                                ) : null}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar & Map */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-5 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Planned Budget</p>
              <p className="text-3xl font-display font-bold text-teal-700">
                ${trip.totalBudget ? Number(trip.totalBudget).toLocaleString() : '0'}
              </p>
              <p className="text-xs text-slate-500">Estimated budget across all stops & activities</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card p-4 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Route Map</p>
              <div className="rounded-xl overflow-hidden border border-slate-100">
                <TripMap stops={trip.stops || []} />
              </div>
            </div>
          </div>
        </div>
      </motion.main>

      {/* Footer */}
      <footer className="bg-navy text-slate-400 py-6 text-xs text-center border-t border-slate-200/20 print:hidden">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Colombiator — Odoo &times; Parul University Hackathon 2026</p>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-teal-300">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-teal-300">Terms of Service</Link>
            <Link to="/contact" className="hover:text-teal-300">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
