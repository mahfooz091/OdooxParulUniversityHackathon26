import { Loader2 } from 'lucide-react';

export default function ClayButton({
  children,
  type = 'button',
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  onClick,
  ...props
}) {
  const isPrimary = variant === 'primary';

  const baseStyle =
    'relative inline-flex items-center justify-center font-heading font-semibold tracking-wide transition-all duration-200 select-none outline-none disabled:opacity-60 disabled:cursor-not-allowed';

  const variantStyle = isPrimary
    ? 'rounded-full bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-600 text-white shadow-clay-btn hover:brightness-105 active:scale-[0.98]'
    : 'rounded-full bg-white text-slate-700 shadow-clay-btn-secondary border border-slate-100 hover:bg-slate-50 active:scale-[0.98]';

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyle} ${variantStyle} px-7 py-3.5 min-h-[48px] text-base ${className}`}
      {...props}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Processing…</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
