import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function ClayInput({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  autoComplete,
  className = '',
  rightElement,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;
  const inputId = id || name || label?.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-semibold text-slate-700 tracking-wide"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`w-full rounded-2xl bg-clay-input text-slate-800 placeholder:text-slate-400 px-4 py-3.5 text-base outline-none transition-all duration-200 shadow-clay-inset border ${
            error
              ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-slate-200/60 focus:border-teal-500 focus:shadow-clay-inset-focus'
          } ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${
            isPassword || rightElement ? 'pr-12' : ''
          }`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
        {!isPassword && rightElement && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs font-medium text-red-500 pl-1 flex items-center gap-1">
          <span>•</span> {error}
        </p>
      )}
    </div>
  );
}
