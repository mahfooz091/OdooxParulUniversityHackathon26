import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm.jsx';
import Logo from '../components/common/Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { UNSPLASH } from '../data/landingContent.js';

export default function LoginPage() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true });
  }, [user, navigate]);

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      await login(data);
      toast.success('Welcome back to Colombiator!');
      navigate('/dashboard', { replace: true });
    } catch (e) {
      toast.error(e.friendlyMessage || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-surface">
      {/* Visual Showcase Panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="relative hidden overflow-hidden lg:block"
      >
        <img
          src={UNSPLASH.auth}
          alt="Colombiator Travel"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/60 to-primary-dark/40" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <div className="max-w-md">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-teal-500/20 text-teal-200 border border-teal-400/30 mb-4">
              Colombiator Platform
            </span>
            <h2 className="font-display text-4xl font-semibold leading-tight text-white">
              Welcome back, explorer.
            </h2>
            <p className="mt-4 text-base text-slate-200 leading-relaxed">
              Your collaborative itineraries, travel expenses, and journey maps — organized and ready for the next adventure.
            </p>
          </div>
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} Colombiator. All rights reserved.
          </p>
        </div>
      </motion.div>

      {/* Login Form Panel */}
      <div className="relative flex min-h-screen flex-col justify-center px-6 py-12 lg:px-12 bg-surface">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 mx-auto w-full max-w-md"
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
            <div className="mb-8 text-center">
              <div className="flex justify-center mb-3">
                <Logo showText size="lg" variant="dark" />
              </div>
              <h1 className="text-2xl font-bold text-dark tracking-tight">Sign in to your account</h1>
              <p className="mt-1 text-sm text-muted">Continue your journey with Colombiator</p>
            </div>

            <LoginForm onSubmit={handleLogin} loading={loading} variant="default" />
          </div>

          <p className="mt-6 text-center text-sm text-slate-600">
            New to Colombiator?{' '}
            <Link to="/signup" className="font-semibold text-primary-dark hover:underline">
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
