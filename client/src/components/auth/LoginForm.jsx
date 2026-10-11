import { useState } from 'react';
import { Link } from 'react-router-dom';
import ClayInput from './ClayInput.jsx';
import ClayButton from './ClayButton.jsx';
import ClayAlert from './ClayAlert.jsx';
import { validateLogin } from '../../utils/validators.js';

export default function LoginForm({ onSubmit, loading = false, serverError = '' }) {
  const [email, setEmail] = useState(() => localStorage.getItem('colombiator_saved_email') || '');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(() => Boolean(localStorage.getItem('colombiator_saved_email')));
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const trimmedEmail = email.trim();
    const v = validateLogin({ email: trimmedEmail, password });
    setErrors(v);
    if (Object.keys(v).length > 0) return;

    if (rememberMe) {
      localStorage.setItem('colombiator_saved_email', trimmedEmail);
    } else {
      localStorage.removeItem('colombiator_saved_email');
    }

    await onSubmit({ email: trimmedEmail, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {serverError && <ClayAlert message={serverError} type="error" />}

      <ClayInput
        label="Email Address"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="alex.traveler@example.com"
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
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          error={errors.password}
          disabled={loading}
        />
      </div>

      <div className="flex items-center justify-between text-sm pt-1">
        <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 font-medium">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={loading}
            className="w-4 h-4 rounded-md text-teal-600 focus:ring-teal-500 accent-teal-600 border-slate-300"
          />
          <span>Remember me</span>
        </label>

        <Link
          to="/forgot-password"
          className="text-teal-700 hover:text-teal-800 font-semibold hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      <div className="pt-2">
        <ClayButton
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
          className="w-full text-lg shadow-clay-btn"
        >
          Sign In
        </ClayButton>
      </div>

      <div className="pt-3 text-center text-sm text-slate-500">
        Don&apos;t have an account yet?{' '}
        <Link
          to="/signup"
          className="font-bold text-teal-600 hover:text-teal-700 hover:underline"
        >
          Start your adventure
        </Link>
      </div>
    </form>
  );
}
