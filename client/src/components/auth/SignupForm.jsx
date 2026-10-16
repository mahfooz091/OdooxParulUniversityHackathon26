import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ClayInput from './ClayInput.jsx';
import ClayButton from './ClayButton.jsx';
import ClayAlert from './ClayAlert.jsx';
import { validateSignup, passwordStrength } from '../../utils/validators.js';

export default function SignupForm({ onSubmit, loading = false, serverError = '' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const strength = useMemo(() => passwordStrength(password), [password]);

  const strengthLabel = useMemo(() => {
    if (!password) return '';
    if (strength <= 1) return 'Weak';
    if (strength === 2) return 'Fair';
    if (strength === 3) return 'Good';
    return 'Strong';
  }, [password, strength]);

  const strengthColor = useMemo(() => {
    if (strength <= 1) return 'bg-red-400';
    if (strength === 2) return 'bg-amber-400';
    if (strength === 3) return 'bg-teal-400';
    return 'bg-emerald-500';
  }, [strength]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const v = validateSignup({
      name: trimmedName,
      email: trimmedEmail,
      password,
      confirmPassword,
    });

    setErrors(v);
    if (Object.keys(v).length > 0) return;

    await onSubmit({
      name: trimmedName,
      email: trimmedEmail,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {serverError && <ClayAlert message={serverError} type="error" />}

      <ClayInput
        label="Full Name"
        name="name"
        type="text"
        autoComplete="name"
        placeholder="Maya Lin"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
        }}
        error={errors.name}
        disabled={loading}
      />

      <ClayInput
        label="Email Address"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="maya@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        error={errors.email}
        disabled={loading}
      />

      <div>
        <ClayInput
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          error={errors.password}
          disabled={loading}
        />

        {password.length > 0 && (
          <div className="mt-2.5 px-1 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Password strength</span>
              <span className="font-bold text-slate-700">{strengthLabel}</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 h-1.5">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`rounded-full transition-all duration-300 ${
                    step <= strength ? strengthColor : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <ClayInput
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        placeholder="Re-enter password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.target.value);
          if (errors.confirmPassword) {
            setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }
        }}
        error={errors.confirmPassword}
        disabled={loading}
      />

      <div className="text-xs text-slate-500 leading-relaxed px-1">
        By creating an account, you agree to our{' '}
        <Link to="/terms-of-service" target="_blank" className="font-semibold text-teal-700 underline hover:text-teal-800">
          Terms of Service
        </Link>{' '}
        and acknowledge our{' '}
        <Link to="/privacy-policy" target="_blank" className="font-semibold text-teal-700 underline hover:text-teal-800">
          Privacy Policy
        </Link>.
      </div>

      <div className="pt-2">
        <ClayButton
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
          className="w-full text-lg shadow-clay-btn"
        >
          Create Account
        </ClayButton>
      </div>

      <div className="pt-3 text-center text-sm text-slate-500">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-bold text-teal-600 hover:text-teal-700 hover:underline"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}
