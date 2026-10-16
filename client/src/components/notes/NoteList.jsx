import { useEffect, useState } from 'react';
import { Pin } from 'lucide-react';

export default function NoteList({ notes, activeId, onSelect }) {
  return (
    <div className="space-y-2.5 max-h-[65vh] overflow-y-auto pr-1">
      {(notes || []).map((n) => (
        <button
          key={n._id}
          type="button"
          onClick={() => onSelect(n)}
          className={`w-full text-left px-4 py-3 rounded-2xl border transition-all duration-200 ${
            activeId === n._id
              ? 'border-neu-teal/60 bg-white shadow-neu-raised-sm text-neu-navy'
              : 'border-[#E2EBEB] bg-[#F8FCFC] hover:bg-white hover:shadow-neu-raised-sm text-neu-slate'
          }`}
        >
          <div className="flex justify-between gap-2 items-start">
            <span className="font-semibold text-sm line-clamp-2 text-neu-navy">
              {(n.content || 'Untitled note').split('\n')[0] || 'Untitled note'}
            </span>
            <Pin className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${activeId === n._id ? 'text-neu-teal' : 'text-neu-slate/50'}`} />
          </div>
          <p className="text-[11px] text-neu-slate/70 mt-1.5 font-medium">
            {new Date(n.updatedAt || n.createdAt).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}
          </p>
        </button>
      ))}
    </div>
  );
}
