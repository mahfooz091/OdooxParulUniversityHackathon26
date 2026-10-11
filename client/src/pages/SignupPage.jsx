import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';
import SignupForm from '../components/auth/SignupForm.jsx';
import Logo from '../components/common/Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { UNSPLASH } from '../data/landingContent.js';

export default function SignupPage() {
  const { register, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  const handleRegister = async (data) => {
    setLoading(true);
    try {
      await register(data);
      toast.success('Welcome to Colombiator! Account created successfully.');
      navigate('/dashboard', { replace: true });
    } catch (e) {
      toast.error(e.friendlyMessage || 'Unable to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-surface">
      {/* Visual Showcase Panel */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative hidden overflow-hidden lg:block"
      >
        <img
          src={UNSPLASH.split}
          alt="Colombiator Worldwide Travel"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/50 to-primary-dark/30" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <div className="max-w-lg">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-teal-500/20 text-teal-200 border border-teal-400/30 mb-4">
              Join Colombiator
            </span>
            <h2 className="font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
              The world is wide — your plan should be too.
            </h2>
            <p className="mt-6 text-base text-slate-200 leading-relaxed">
              Curate smart multi-city itineraries, manage travel budgets with friends, and discover authentic local activities.
            </p>
          </div>
          <div className="flex gap-8 text-sm text-white/80">
            <div>
              <p className="font-display text-2xl font-bold text-white">150+</p>
              <p className="text-xs uppercase tracking-wider text-slate-300">Destinations</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-white">50K+</p>
              <p className="text-xs uppercase tracking-wider text-slate-300">Explorers</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Registration Form Panel */}
      <div className="relative flex min-h-screen flex-col justify-center px-6 py-10 lg:px-12 bg-surface">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mx-auto w-full max-w-xl"
        >
          <div className="mb-6 lg:hidden">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary-dark hover:text-dark"
            >
              <ArrowLeft className="h-4 w-4" />
              Home
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-card sm:p-10">
            <div className="mb-6 text-center">
              <div className="flex justify-center mb-3">
                <Logo showText size="lg" variant="dark" />
              </div>
              <h1 className="text-2xl font-bold text-dark tracking-tight">Create your account</h1>
              <p className="mt-1 text-sm text-muted">Start planning trips collaboratively with Colombiator</p>
            </div>

            <SignupForm onSubmit={handleRegister} loading={loading} variant="default" />
          </div>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-dark hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
