export default function Badge({ children, variant = 'default', className = '' }) {
  const styles = {
    default: 'bg-white/90 text-slate-700 border border-[#E2EBEB] shadow-sm',
    success: 'bg-emerald-50 text-emerald-800 border border-emerald-200/60 shadow-sm',
    warning: 'bg-amber-50 text-amber-900 border border-amber-200/60 shadow-sm',
    error: 'bg-red-50 text-red-800 border border-red-200/60 shadow-sm',
    teal: 'bg-teal-50 text-teal-800 border border-teal-200/60 shadow-sm font-semibold',
    neu: 'bg-white text-slate-700 border border-[#E2EBEB] shadow-neu-raised-sm',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium tracking-wide ${styles[variant] || styles.default} ${className}`}
    >
      {children}
    </span>
  );
}
