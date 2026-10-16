import { cn } from '../../utils/helpers.js';

export default function Input({
  label,
  error,
  className,
  id,
  variant = 'default',
  ...props
}) {
  const inputId = id || props.name || Math.random().toString(36).substring(2, 9);
  const isGlass = variant === 'glass';

  return (
    <div className="w-full text-left">
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            'block text-xs font-semibold uppercase tracking-wider mb-1.5',
            isGlass ? 'text-slate-200' : 'text-slate-700'
          )}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'w-full rounded-xl px-4 py-3 text-sm transition-all outline-none',
          isGlass
            ? 'border border-white/20 bg-white/10 text-white placeholder:text-slate-400 focus:border-teal-400/60 focus:ring-2 focus:ring-teal-400/30'
            : 'bg-[#F8FCFC] border border-[#E2EBEB] shadow-neu-inset text-neu-navy placeholder:text-slate-400 focus:border-teal-500 focus:shadow-neu-inset-focus',
          error && 'border-red-400 animate-shake',
          className
        )}
        {...props}
      />
      {error && (
        <p className={cn('text-xs mt-1 font-medium', isGlass ? 'text-red-300' : 'text-red-500')}>
          {error}
        </p>
      )}
    </div>
  );
}
