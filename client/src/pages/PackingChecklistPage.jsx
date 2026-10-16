import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import * as checklistService from '../services/checklistService.js';
import { CHECKLIST_CATEGORIES } from '../utils/constants.js';
import Button from '../components/common/Button.jsx';
import Input from '../components/common/Input.jsx';
import Card from '../components/common/Card.jsx';
import Loader from '../components/common/Loader.jsx';
import Modal from '../components/common/Modal.jsx';
import { useState } from 'react';

export default function PackingChecklistPage() {
  const { id } = useParams();
  const qc = useQueryClient();
  const [label, setLabel] = useState('');
  const [category, setCategory] = useState('other');
  const [resetOpen, setResetOpen] = useState(false);

  const q = useQuery({
    queryKey: ['checklist', id],
    queryFn: () => checklistService.fetchChecklist(id),
    enabled: Boolean(id),
  });

  const items = q.data?.items || [];

  const addItem = useMutation({
    mutationFn: () => checklistService.addChecklistItem(id, { label, category }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['checklist', id] });
      setLabel('');
      toast.success('Item added');
    },
  });

  const toggle = useMutation({
    mutationFn: ({ itemId, isPacked }) =>
      checklistService.updateChecklistItem(id, itemId, { isPacked }),
    onMutate: async ({ itemId, isPacked }) => {
      await qc.cancelQueries({ queryKey: ['checklist', id] });
      const prev = qc.getQueryData(['checklist', id]);
      qc.setQueryData(['checklist', id], (old) => ({
        ...old,
        items: (old?.items || []).map((it) =>
          it._id === itemId ? { ...it, isPacked } : it
        ),
      }));
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      qc.setQueryData(['checklist', id], ctx.prev);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['checklist', id] }),
  });

  const removeItem = useMutation({
    mutationFn: (itemId) => checklistService.deleteChecklistItem(id, itemId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['checklist', id] }),
  });

  const packed = items.filter((i) => i.isPacked).length;

  const grouped = CHECKLIST_CATEGORIES.map((cat) => ({
    ...cat,
    items: items.filter((i) => i.category === cat.id),
  }));

  const resetAll = async () => {
    await Promise.all(items.map((i) => checklistService.updateChecklistItem(id, i._id, { isPacked: false })));
    qc.invalidateQueries({ queryKey: ['checklist', id] });
    setResetOpen(false);
    toast.success('Checklist reset');
  };

  if (q.isLoading) return <Loader />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
      <div className="flex flex-wrap justify-between gap-4 items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Packing checklist</h1>
          <p className="text-muted mt-1">
            {packed} of {items.length} items packed
          </p>
        </div>
        <Button variant="outline" onClick={() => setResetOpen(true)}>
          Reset all
        </Button>
      </div>

      <div className="h-3.5 rounded-full bg-[#E8F0F0] shadow-neu-inset overflow-hidden p-0.5 border border-[#E2EBEB]">
        <div
          className="h-full bg-gradient-to-r from-neu-teal to-neu-cyan rounded-full transition-all duration-500"
          style={{ width: `${items.length ? (packed / items.length) * 100 : 0}%` }}
        />
      </div>

      <Card className="p-6 border border-[#E2EBEB] shadow-neu-raised bg-white">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Add new essential item..."
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="flex-1"
          />
          <select
            className="bg-[#F8FCFC] border border-[#E2EBEB] shadow-neu-inset focus:bg-white focus:shadow-neu-inset-focus focus:border-neu-teal rounded-xl px-4 py-3 text-neu-navy font-medium text-sm outline-none transition-all"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CHECKLIST_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.emoji} {c.label}
              </option>
            ))}
          </select>
          <Button
            type="button"
            variant="primary"
            onClick={() => label.trim() && addItem.mutate()}
            className="sm:w-36 shadow-neu-btn-primary"
          >
            Add item
          </Button>
        </div>
      </Card>

      <div className="space-y-6">
        {grouped.map((g) => (
          <Card key={g.id} className="p-5 border border-[#E2EBEB] shadow-neu-raised bg-white">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#E2EBEB]/60">
              <h3 className="font-bold text-lg text-neu-navy flex items-center gap-2">
                <span>{g.emoji}</span>
                <span>{g.label}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F4FAFA] border border-[#E2EBEB] text-neu-slate">
                  {g.items.filter((i) => i.isPacked).length}/{g.items.length}
                </span>
              </h3>
              <div className="flex gap-2 text-xs">
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-lg text-neu-teal font-semibold hover:bg-neu-mint/50 transition-colors"
                  onClick={() =>
                    g.items.forEach((it) => toggle.mutate({ itemId: it._id, isPacked: true }))
                  }
                >
                  Check all
                </button>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-lg text-neu-slate hover:text-neu-navy hover:bg-[#F4FAFA] transition-colors"
                  onClick={() =>
                    g.items.forEach((it) => toggle.mutate({ itemId: it._id, isPacked: false }))
                  }
                >
                  Uncheck all
                </button>
              </div>
            </div>
            <ul className="space-y-2">
              {g.items.map((it) => (
                <li
                  key={it._id}
                  className="flex items-center gap-3 py-2 px-3 rounded-xl border border-transparent hover:border-[#E2EBEB] hover:bg-[#F8FCFC] transition-all"
                >
                  <input
                    type="checkbox"
                    checked={it.isPacked}
                    onChange={(e) =>
                      toggle.mutate({ itemId: it._id, isPacked: e.target.checked })
                    }
                    className="w-4 h-4 accent-neu-teal rounded cursor-pointer"
                  />
                  <span
                    className={`flex-1 text-sm transition-all ${
                      it.isPacked ? 'line-through text-neu-slate/50 font-normal' : 'text-neu-navy font-medium'
                    }`}
                  >
                    {it.label}
                  </span>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
                    onClick={() => removeItem.mutate(it._id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
              {g.items.length === 0 && (
                <p className="text-sm text-neu-slate/60 py-2 italic text-center">No items in this category yet.</p>
              )}
            </ul>
          </Card>
        ))}
      </div>

      <Modal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Reset checklist?"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setResetOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={resetAll}>
              Reset
            </Button>
          </div>
        }
      >
        <p>This will uncheck every item.</p>
      </Modal>
    </motion.div>
  );
}
