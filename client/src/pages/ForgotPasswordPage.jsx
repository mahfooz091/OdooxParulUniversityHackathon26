import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ClayAuthLayout from '../components/auth/ClayAuthLayout.jsx';
import ClayCard from '../components/auth/ClayCard.jsx';
import ClayInput from '../components/auth/ClayInput.jsx';
import ClayButton from '../components/auth/ClayButton.jsx';
import * as authService from '../services/authService.js';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email.trim() || loading) return;
    setLoading(true);
    try {
      await authService.forgotPassword(email.trim());
      setSent(true);
      toast.success('If an account exists, instructions have been sent.');
    } catch (err) {
      toast.error(err.friendlyMessage || 'Unable to send instructions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClayAuthLayout
      badgeText="Account Recovery"
      title="Reset your password"
      subtitle="Enter your email to receive recovery instructions."
    >
      <ClayCard className="w-full">
        {sent ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-teal-50 flex items-center justify-center text-teal-600 shadow-clay-card-sm text-2xl font-bold">
              ✓
            </div>
            <h3 className="font-heading text-xl font-bold text-slate-800">Check your inbox</h3>
            <p className="text-sm text-slate-500">
              If an account with <strong>{email}</strong> exists, password reset instructions have been sent.
            </p>
            <div className="pt-2">
              <Link
                to="/login"
                className="inline-block font-semibold text-teal-600 hover:text-teal-700 hover:underline text-sm"
              >
                Back to sign in
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5" noValidate>
            <ClayInput
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="alex.traveler@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />

            <ClayButton
              type="submit"
              variant="primary"
              loading={loading}
              disabled={loading}
              className="w-full text-lg shadow-clay-btn"
            >
              Send Reset Link
            </ClayButton>

            <div className="pt-2 text-center text-sm text-slate-500">
              Remembered your credentials?{' '}
              <Link
                to="/login"
                className="font-bold text-teal-600 hover:text-teal-700 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </form>
        )}
      </ClayCard>
    </ClayAuthLayout>
  );
}
