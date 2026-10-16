import Input from '../common/Input.jsx';

export default function BudgetBreakdown({
  values,
  onChange,
  costPerPersonMultiplier,
  onMultiplierChange,
}) {
  const fields = [
    { key: 'transport', label: 'Transport' },
    { key: 'accommodation', label: 'Accommodation' },
    { key: 'activities', label: 'Activities' },
    { key: 'meals', label: 'Meals' },
    { key: 'miscellaneous', label: 'Miscellaneous' },
  ];
  return (
    <div className="space-y-4">
      {fields.map((f) => (
        <div key={f.key}>
          <label className="block text-xs uppercase tracking-wider font-semibold text-neu-slate mb-1">{f.label}</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neu-slate font-medium text-sm">$</span>
            <input
              type="number"
              min={0}
              className="w-full bg-[#F8FCFC] border border-[#E2EBEB] shadow-neu-inset focus:bg-white focus:shadow-neu-inset-focus focus:border-neu-teal rounded-xl pl-8 pr-4 py-2.5 text-neu-navy font-semibold outline-none transition-all"
              value={values[f.key] ?? 0}
              onChange={(e) => onChange(f.key, Number(e.target.value))}
            />
          </div>
        </div>
      ))}
      <div className="pt-2 border-t border-[#E2EBEB]">
        <label className="block text-xs uppercase tracking-wider font-semibold text-neu-slate mb-1">Daily limit</label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neu-slate font-medium text-sm">$</span>
          <input
            type="number"
            min={0}
            className="w-full bg-[#F8FCFC] border border-[#E2EBEB] shadow-neu-inset focus:bg-white focus:shadow-neu-inset-focus focus:border-neu-teal rounded-xl pl-8 pr-4 py-2.5 text-neu-navy font-semibold outline-none transition-all"
            value={values.dailyLimit ?? 0}
            onChange={(e) => onChange('dailyLimit', Number(e.target.value))}
          />
        </div>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider font-semibold text-neu-slate mb-1">Cost per person multiplier</label>
        <input
          type="number"
          step={0.1}
          min={0.1}
          className="w-full bg-[#F8FCFC] border border-[#E2EBEB] shadow-neu-inset focus:bg-white focus:shadow-neu-inset-focus focus:border-neu-teal rounded-xl px-4 py-2.5 text-neu-navy font-semibold outline-none transition-all"
          value={costPerPersonMultiplier}
          onChange={(e) => onMultiplierChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
