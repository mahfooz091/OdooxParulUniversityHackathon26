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
      className={`neu-card p-10 md:p-14 flex flex-col items-center justify-center text-center max-w-lg mx-auto ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-[#F4FAFA] border border-[#E2EBEB] shadow-neu-inset flex items-center justify-center mb-5 text-teal-600">
        <Icon className="w-8 h-8 text-teal-600" />
      </div>
      <h3 className="text-xl font-bold text-neu-navy mb-2 font-heading">{title}</h3>
      {description && (
        <p className="text-slate-600 text-sm max-w-sm mb-6 leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
