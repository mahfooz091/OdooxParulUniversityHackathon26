import { cn } from '../../utils/helpers.js';

export default function Card({ children, className, onClick, variant = 'raised' }) {
  const isInteractive = Boolean(onClick);

  return (
    <div
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => isInteractive && (e.key === 'Enter' || e.key === ' ') && onClick(e)}
      className={cn(
        'bg-white rounded-2xl border border-[#E2EBEB] transition-all duration-300',
        variant === 'raised' && 'shadow-neu-raised',
        variant === 'raised-sm' && 'shadow-neu-raised-sm',
        variant === 'inset' && 'shadow-neu-inset bg-[#F8FCFC]',
        isInteractive &&
          'cursor-pointer hover:shadow-neu-raised-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-neu-raised-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50',
        className
      )}
    >
      {children}
    </div>
  );
}
