import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import { validateSignup, passwordStrength } from '../../utils/validators.js';
import { cn } from '../../utils/helpers.js';

const countries = [
  'United States',
  'United Kingdom',
  'Canada',
  'Germany',
  'France',
  'Japan',
  'Australia',
  'India',
  'Colombia',
  'Spain',
  'Italy',
  'Brazil',
  'Mexico',
  'Other',
];

const fieldGlass =
  'w-full rounded-xl px-4 py-3 outline-none border border-white/20 bg-white/10 text-white focus:ring-2 focus:ring-teal-400/30';
const fieldDefault =
  'w-full border border-slate-200 bg-white rounded-xl px-4 py-3 outline-none text-dark focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all';

export default function SignupForm({ onSubmit, loading = false, variant = 'default' }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [errors, setErrors] = useState({});

  const glass = variant === 'glass';
  const iv = glass ? 'glass' : 'default';
  const strength = useMemo(() => passwordStrength(password), [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const name = `${firstName} ${lastName}`.trim();
    const trimmedEmail = email.trim();
    const v = validateSignup({ name, email: trimmedEmail, password, confirmPassword });
    setErrors(v);
    if (Object.keys(v).length) return;

    await onSubmit({
      name,
      email: trimmedEmail,
      password,
      phone: phone.trim(),
      city: city.trim(),
      country,
      additionalInfo: additionalInfo.trim(),
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 max-h-[72vh] overflow-y-auto pr-1"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          variant={iv}
          label="First Name"
          name="firstName"
          placeholder="Jane"
          disabled={loading}
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          error={errors.name && !firstName ? errors.name : undefined}
        />
        <Input
          variant={iv}
          label="Last Name"
          name="lastName"
          placeholder="Doe"
          disabled={loading}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          variant={iv}
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="jane@example.com"
          disabled={loading}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          error={errors.email}
        />
        <Input
          variant={iv}
          label="Phone Number"
          name="phone"
          placeholder="+1 (555) 000-0000"
          disabled={loading}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          variant={iv}
          label="Home City"
          name="city"
          placeholder="New York"
          disabled={loading}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div>
          <label
            className={cn('block text-sm font-medium mb-1.5', glass ? 'text-slate-200' : 'text-slate-700')}
          >
            Country
          </label>
          <select
            disabled={loading}
            className={cn(glass ? fieldGlass : fieldDefault, 'text-inherit')}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="" className={glass ? 'bg-navy text-white' : ''}>
              Select your country
            </option>
            {countries.map((c) => (
              <option key={c} value={c} className={glass ? 'bg-navy text-white' : ''}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Password with strength meter */}
      <div>
        <label
          className={cn('block text-sm font-medium mb-1.5', glass ? 'text-slate-200' : 'text-slate-700')}
        >
          Password (min. 8 characters)
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="••••••••"
            disabled={loading}
            className={cn(
              glass ? fieldGlass : fieldDefault,
              'pr-12',
              errors.password ? 'border-error focus:border-error focus:ring-error/20' : ''
            )}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
          />
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg transition-colors',
              glass ? 'text-slate-300 hover:text-white' : 'text-slate-400 hover:text-slate-600'
            )}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <div className="flex gap-1.5 mt-2">
          {[1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-all duration-300',
                strength >= i
                  ? 'bg-gradient-to-r from-teal-400 to-primary'
                  : glass
                    ? 'bg-white/20'
                    : 'bg-slate-200'
              )}
            />
          ))}
        </div>
        {errors.password && (
          <p className={cn('text-xs mt-1.5 font-medium', glass ? 'text-red-300' : 'text-error')}>
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label
          className={cn('block text-sm font-medium mb-1.5', glass ? 'text-slate-200' : 'text-slate-700')}
        >
          Confirm Password
        </label>
        <input
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="••••••••"
          disabled={loading}
          className={cn(
            glass ? fieldGlass : fieldDefault,
            errors.confirmPassword ? 'border-error focus:border-error focus:ring-error/20' : ''
          )}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }}
        />
        {errors.confirmPassword && (
          <p className={cn('text-xs mt-1.5 font-medium', glass ? 'text-red-300' : 'text-error')}>
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <div>
        <label
          className={cn('block text-sm font-medium mb-1.5', glass ? 'text-slate-200' : 'text-slate-700')}
        >
          Travel Preferences (Optional)
        </label>
        <textarea
          rows={2}
          disabled={loading}
          placeholder="Favorite destinations, travel style (backpacking, luxury, culture)..."
          className={cn(glass ? fieldGlass : fieldDefault, 'resize-none')}
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
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
            <span>Creating account…</span>
          </>
        ) : (
          <span>Create Colombiator Account</span>
        )}
      </Button>

      <p className={cn('text-center text-sm pt-1', glass ? 'text-slate-300' : 'text-slate-600')}>
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-primary-dark hover:underline">
          Sign in
        </Link>
      </p>
    </motion.form>
  );
}
