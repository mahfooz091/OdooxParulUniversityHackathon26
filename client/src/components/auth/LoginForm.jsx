import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import { validateLogin } from '../../utils/validators.js';
import { cn } from '../../utils/helpers.js';

export default function LoginForm({ onSubmit, loading = false, variant = 'default' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const glass = variant === 'glass';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const trimmedEmail = email.trim();
    const v = validateLogin({ email: trimmedEmail, password });
    setErrors(v);
    if (Object.keys(v).length) return;

    await onSubmit({ email: trimmedEmail, password });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-4"
      noValidate
    >
      <Input
        variant={glass ? 'glass' : 'default'}
        label="Email address"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        error={errors.email}
        disabled={loading}
      />

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            className={cn('block text-sm font-medium', glass ? 'text-slate-200' : 'text-slate-700')}
          >
            Password
          </label>
          <Link
            to="/forgot-password"
            className="text-xs font-medium text-primary-dark hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <input
            type={show ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            disabled={loading}
            className={cn(
              'w-full rounded-xl px-4 py-3 pr-12 transition-all outline-none',
              glass
                ? 'border border-white/20 bg-white/10 text-white placeholder:text-slate-400 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/30'
                : 'border border-slate-200 bg-white text-dark focus:border-primary focus:ring-2 focus:ring-primary/20',
              errors.password ? 'border-error focus:border-error focus:ring-error/20' : '',
              loading ? 'opacity-60 cursor-not-allowed' : ''
            )}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
          />
          <button
            type="button"
            aria-label={show ? 'Hide password' : 'Show password'}
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg transition-colors',
              glass ? 'text-slate-300 hover:text-white' : 'text-slate-400 hover:text-slate-600'
            )}
            onClick={() => setShow(!show)}
          >
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className={cn('text-xs mt-1.5 font-medium', glass ? 'text-red-300' : 'text-error')}>
            {errors.password}
          </p>
        )}
      </div>

      <Button
        type="submit"
        variant={glass ? 'premium' : 'primary'}
        disabled={loading}
        className="w-full py-3.5 font-heading text-base font-semibold shadow-sm mt-2 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Signing in…</span>
          </>
        ) : (
          <span>Sign In</span>
        )}
      </Button>
    </motion.form>
  );
}
