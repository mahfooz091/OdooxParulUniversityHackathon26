import { Compass } from 'lucide-react';

export default function EmptyState({
  title,
  description,
  action,
  icon: Icon = Compass,
  className = '',
}) {
  return (
    <div
      className={`neu-card p-8 sm:p-10 flex flex-col items-center justify-center text-center w-full ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#F4FAFA] border border-[#E2EBEB] shadow-neu-inset flex items-center justify-center mb-4 text-teal-600">
        <Icon className="w-7 h-7 text-teal-600" />
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-neu-navy mb-1.5 font-heading">{title}</h3>
      {description && (
        <p className="text-slate-600 text-xs sm:text-sm max-w-md mb-5 leading-relaxed">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
