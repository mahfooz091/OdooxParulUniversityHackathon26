import { useEffect, useMemo, useRef, useState } from 'react';

export default function NoteEditor({
  content,
  onChange,
  saving,
  onDelete,
  stops,
  stopId,
  onStopChange,
}) {
  const ref = useRef(null);

  const wrap = (prefix, suffix = prefix) => {
    const ta = ref.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const sel = content.slice(start, end);
    const next =
      content.slice(0, start) + prefix + sel + suffix + content.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(start + prefix.length, end + prefix.length);
    });
  };

  return (
    <div className="flex flex-col h-full min-h-[380px] border border-[#E2EBEB] rounded-2xl bg-white shadow-neu-raised overflow-hidden">
      <div className="flex flex-wrap gap-2 items-center px-4 py-3 border-b border-[#E2EBEB] bg-[#F8FCFC]">
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E2EBEB] shadow-neu-raised-sm">
          <button
            type="button"
            className="text-xs font-bold px-2.5 py-1 rounded-lg hover:bg-neu-mint/50 text-neu-navy transition-colors"
            onClick={() => wrap('**', '**')}
          >
            B
          </button>
          <button
            type="button"
            className="text-xs italic font-serif px-2.5 py-1 rounded-lg hover:bg-neu-mint/50 text-neu-navy transition-colors"
            onClick={() => wrap('*')}
          >
            I
          </button>
          <button
            type="button"
            className="text-xs px-2.5 py-1 rounded-lg hover:bg-neu-mint/50 text-neu-navy transition-colors"
            onClick={() => {
              const ta = ref.current;
              if (!ta) return;
              const pos = ta.selectionStart;
              const lineStart = content.lastIndexOf('\n', pos - 1) + 1;
              const next = `${content.slice(0, lineStart)}• ${content.slice(lineStart)}`;
              onChange(next);
            }}
          >
            • List
          </button>
        </div>
        <div className="ml-auto flex flex-wrap gap-3 items-center">
          <select
            className="text-xs font-semibold bg-white border border-[#E2EBEB] shadow-neu-raised-sm rounded-xl px-3 py-1.5 text-neu-navy outline-none"
            value={stopId || ''}
            onChange={(e) => onStopChange(e.target.value || null)}
          >
            <option value="">Whole trip</option>
            {(stops || []).map((s) => (
              <option key={s._id} value={s._id}>
                {s.cityName}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="text-xs text-red-500 font-semibold px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
            onClick={onDelete}
          >
            Delete
          </button>
          <span className="text-[11px] font-medium text-neu-slate/70 px-2 py-0.5 rounded-full bg-white border border-[#E2EBEB]">
            {saving ? 'Saving…' : 'Saved'}
          </span>
        </div>
      </div>
      <textarea
        ref={ref}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 w-full resize-none outline-none p-5 text-sm leading-relaxed text-neu-navy font-medium placeholder:text-neu-slate/40 min-h-[300px]"
        placeholder="Jot reservations, flight confirmations, packing thoughts, or local recommendations..."
      />
    </div>
  );
}
