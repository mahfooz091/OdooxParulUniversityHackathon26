import { cn } from '../../utils/helpers.js';

export default function Button({
  children,
  className,
  variant = 'primary',
  type = 'button',
  disabled,
  ...props
}) {
  const variants = {
    primary:
      'bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold border border-teal-400/30 shadow-neu-btn-primary hover:brightness-105 active:scale-[0.98]',
    premium:
      'bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 text-white font-semibold border border-teal-400/40 shadow-neu-btn-primary hover:brightness-105 active:scale-[0.98]',
    secondary:
      'bg-white border border-[#E2EBEB] text-neu-navy font-medium shadow-neu-btn hover:bg-[#F8FCFC] active:shadow-neu-btn-pressed active:scale-[0.98]',
    outline:
      'border border-[#E2EBEB] text-teal-800 bg-white font-medium shadow-neu-btn hover:border-teal-400 hover:bg-teal-50/40 active:shadow-neu-btn-pressed active:scale-[0.98]',
    ghost:
      'text-neu-navy hover:bg-[#EBF7F5] hover:text-teal-800 active:scale-[0.98]',
    danger:
      'bg-error text-white font-semibold border border-red-400/40 shadow-md hover:bg-red-600 active:scale-[0.98]',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        'rounded-xl px-5 py-2.5 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:pointer-events-none min-h-[44px] inline-flex items-center justify-center gap-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50',
        variants[variant] || variants.primary,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
