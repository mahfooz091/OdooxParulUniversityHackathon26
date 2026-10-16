import { Link } from 'react-router-dom';
import { Wallet, ArrowRight } from 'lucide-react';
import Card from '../common/Card.jsx';

export default function BudgetHighlight({ trip, budget }) {
  if (!trip || !budget) return null;

  const total =
    (budget.transport || 0) +
    (budget.accommodation || 0) +
    (budget.activities || 0) +
    (budget.meals || 0) +
    (budget.miscellaneous || 0);

  const spent = total * 0.62;
  const pct = total > 0 ? Math.min(100, Math.round((spent / total) * 100)) : 0;

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200/60 shadow-sm flex items-center justify-center text-teal-700">
            <Wallet className="w-4 h-4" />
          </div>
          <h3 className="font-bold text-base text-neu-navy font-heading truncate max-w-[180px]">
            {trip.title}
          </h3>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
          Budget Pulse
        </span>
      </div>

      <p className="text-xs text-slate-500">
        Estimated spend allocated against planned category thresholds.
      </p>

      {/* Neumorphic Progress Bar */}
      <div className="space-y-1.5">
        <div className="h-3.5 rounded-full bg-[#F8FCFC] border border-[#E2EBEB] shadow-neu-inset p-0.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] font-medium text-slate-500">
          <span>{pct}% allocated</span>
          <span>Target: ${total.toLocaleString()}</span>
        </div>
      </div>

      <div className="pt-2 border-t border-[#E2EBEB] space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-slate-500">Estimated Spent</span>
          <span className="font-semibold text-neu-navy">${spent.toFixed(0)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-500">Total Planned</span>
          <span className="font-semibold text-teal-700 font-bold">${total.toFixed(0)}</span>
        </div>
      </div>

      <Link
        to={`/trips/${trip._id}/budget`}
        className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-white border border-[#E2EBEB] shadow-neu-btn text-xs font-semibold text-teal-800 hover:bg-[#F8FCFC] active:shadow-neu-btn-pressed transition-all"
      >
        <span>Open Budget Manager</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </Card>
  );
}
