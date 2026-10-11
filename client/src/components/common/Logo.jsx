export default function Logo({ size = 'md', showText = true, variant = 'dark' }) {
  const dim = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
  const textClass =
    variant === 'light'
      ? 'font-heading font-bold tracking-tight text-white text-lg md:text-xl'
      : 'font-heading font-bold tracking-tight text-navy text-lg md:text-xl';

  return (
    <div className="flex items-center gap-2.5">
      <img
        src="/logo.png"
        alt="Colombiator"
        className={`${dim} shrink-0 rounded-xl object-contain shadow-sm bg-white p-0.5 border border-slate-100`}
      />
      {showText && <span className={textClass}>Colombiator</span>}
    </div>
  );
}
