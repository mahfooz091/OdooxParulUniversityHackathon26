import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Shield, KeyRound, AlertTriangle, Camera } from 'lucide-react';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';
import Card from '../components/common/Card.jsx';
import Avatar from '../components/common/Avatar.jsx';
import Modal from '../components/common/Modal.jsx';
import * as userService from '../services/userService.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProfilePage() {
  const { user, refreshUser, logout } = useAuth();
  const qc = useQueryClient();
  const profileQ = useQuery({
    queryKey: ['profile'],
    queryFn: userService.fetchProfile,
  });

  const u = profileQ.data?.user || user;
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    country: '',
    language: 'en',
  });
  const [privacy, setPrivacy] = useState(true);
  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' });
  const [delEmail, setDelEmail] = useState('');
  const [delOpen, setDelOpen] = useState(false);

  useEffect(() => {
    if (!u) return;
    setForm({
      name: u.name || '',
      phone: u.phone || '',
      city: u.city || '',
      country: u.country || '',
      language: u.language || 'en',
    });
    setPrivacy(u.isProfilePublic !== false);
  }, [u]);

  const saveProfile = useMutation({
    mutationFn: () =>
      userService.updateProfile({
        ...form,
        isProfilePublic: privacy,
      }),
    onSuccess: async () => {
      toast.success('Profile saved successfully');
      await refreshUser();
      qc.invalidateQueries({ queryKey: ['profile'] });
      setEdit(false);
    },
    onError: (e) => toast.error(e.friendlyMessage || 'Save failed'),
  });

  const upload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('photo', file);
    await userService.uploadProfilePhoto(fd);
    await refreshUser();
    qc.invalidateQueries({ queryKey: ['profile'] });
    toast.success('Profile photo updated');
  };

  const changePwd = useMutation({
    mutationFn: () =>
      userService.changePassword({
        currentPassword: pwd.current,
        newPassword: pwd.next,
      }),
    onSuccess: () => {
      toast.success('Password updated successfully');
      setPwd({ current: '', next: '', confirm: '' });
    },
    onError: (e) => toast.error(e.friendlyMessage || 'Could not update password'),
  });

  const deleteAccount = useMutation({
    mutationFn: () => userService.deleteAccount(),
    onSuccess: async () => {
      toast.success('Account and associated data deleted permanently');
      await logout();
    },
  });

  const submitPassword = () => {
    if (!pwd.current || !pwd.next) {
      toast.error('Please enter your current and new password');
      return;
    }
    if (pwd.next !== pwd.confirm) {
      toast.error('New passwords do not match');
      return;
    }
    changePwd.mutate();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-neu-navy font-heading">
          Account & Profile
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your personal explorer details, password security, and data preferences.
        </p>
      </div>

      {/* Personal Info Card */}
      <Card className="p-6 sm:p-8 flex flex-col sm:flex-row gap-8 items-start">
        <div className="flex flex-col items-center gap-3 w-full sm:w-auto">
          <div className="relative group">
            <Avatar src={u?.photo} name={u?.name} size="lg" />
            <label className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-[10px] font-semibold">
              <Camera className="w-5 h-5 mb-0.5" />
              Change
              <input type="file" accept="image/*" className="hidden" onChange={upload} />
            </label>
          </div>
          <span className="text-xs font-semibold text-teal-700">
            {u?.role === 'admin' ? 'Administrator' : 'Traveler'}
          </span>
        </div>

        <div className="flex-1 space-y-4 w-full">
          <div className="flex justify-between items-center border-b border-[#E2EBEB] pb-3">
            <h2 className="font-heading font-bold text-base text-neu-navy flex items-center gap-2">
              <User className="w-4 h-4 text-teal-600" /> Personal Details
            </h2>
            <button
              type="button"
              className="neu-button text-xs py-1.5 px-3 font-semibold text-teal-800"
              onClick={() => setEdit(!edit)}
            >
              {edit ? 'Cancel' : 'Edit Details'}
            </button>
          </div>

          <Input
            label="Full Name"
            value={form.name}
            disabled={!edit}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <Input label="Email Address (Account ID)" value={u?.email || ''} disabled />
          <Input
            label="Phone Number"
            value={form.phone}
            disabled={!edit}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              label="City"
              value={form.city}
              disabled={!edit}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
            />
            <Input
              label="Country"
              value={form.country}
              disabled={!edit}
              onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Preferred Language
            </label>
            <select
              className="w-full bg-[#F8FCFC] border border-[#E2EBEB] shadow-neu-inset rounded-xl px-4 py-3 text-sm text-neu-navy outline-none focus:border-teal-500 disabled:opacity-60"
              disabled={!edit}
              value={form.language}
              onChange={(e) => setForm((f) => ({ ...f, language: e.target.value }))}
            >
              <option value="en">English (US/UK)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="hi">Hindi (हिंदी)</option>
            </select>
          </div>

          <label className="flex items-center gap-3 pt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={privacy}
              disabled={!edit}
              onChange={(e) => setPrivacy(e.target.checked)}
              className="w-4 h-4 accent-teal-600 rounded"
            />
            <span className="text-xs font-medium text-slate-700">
              Display my public profile on community itineraries I publish
            </span>
          </label>

          {edit && (
            <div className="pt-2">
              <Button type="button" onClick={() => saveProfile.mutate()} disabled={saveProfile.isPending}>
                {saveProfile.isPending ? 'Saving…' : 'Save Changes'}
              </Button>
            </div>
          )}
        </div>
      </Card>

      {/* Saved Destinations Card */}
      <Card className="p-6 sm:p-8 space-y-4">
        <h2 className="font-heading font-bold text-base text-neu-navy flex items-center gap-2">
          <Shield className="w-4 h-4 text-teal-600" /> Saved Destinations
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(u?.savedDestinations || []).map((c) => (
            <span
              key={c._id || c}
              className="px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/70 text-xs font-semibold text-teal-800 whitespace-nowrap shadow-sm"
            >
              {c.name || c}
            </span>
          ))}
          {!(u?.savedDestinations || []).length && (
            <p className="text-xs text-slate-500">
              You haven&apos;t bookmarked any cities yet. Click &quot;Explore Cities&quot; to discover and save destinations.
            </p>
          )}
        </div>
      </Card>

      {/* Password Update Card */}
      <Card className="p-6 sm:p-8 space-y-4">
        <h2 className="font-heading font-bold text-base text-neu-navy flex items-center gap-2 border-b border-[#E2EBEB] pb-3">
          <KeyRound className="w-4 h-4 text-teal-600" /> Update Password
        </h2>
        <Input
          type="password"
          label="Current Password"
          placeholder="Enter current password"
          value={pwd.current}
          onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))}
        />
        <div className="grid sm:grid-cols-2 gap-4">
          <Input
            type="password"
            label="New Password"
            placeholder="At least 6 characters"
            value={pwd.next}
            onChange={(e) => setPwd((p) => ({ ...p, next: e.target.value }))}
          />
          <Input
            type="password"
            label="Confirm New Password"
            placeholder="Re-type new password"
            value={pwd.confirm}
            onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))}
          />
        </div>
        <button
          type="button"
          className="neu-button text-xs py-2.5 px-4 font-semibold text-teal-800"
          onClick={submitPassword}
          disabled={changePwd.isPending}
        >
          {changePwd.isPending ? 'Updating…' : 'Update Password'}
        </button>
      </Card>

      {/* Danger Zone: Account Deletion */}
      <Card className="p-6 sm:p-8 border border-red-200/90 bg-red-50/20 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-base text-red-600">
              Danger Zone · Irreversible Account Deletion
            </h2>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Permanently eradicate your account and all associated personal data (including all personal itineraries, stops, checklists, and private notes). This action cannot be undone. Read our{' '}
              <Link to="/data-deletion" className="text-teal-700 underline font-semibold">
                Data Deletion & Retention Instructions
              </Link>.
            </p>
          </div>
        </div>

        <Button variant="danger" type="button" onClick={() => setDelOpen(true)}>
          Delete My Account Permanently
        </Button>
      </Card>

      {/* Deletion Confirmation Modal */}
      <Modal
        open={delOpen}
        onClose={() => setDelOpen(false)}
        title="Confirm Irreversible Account Deletion"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setDelOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              disabled={delEmail !== u?.email || deleteAccount.isPending}
              onClick={() => deleteAccount.mutate()}
            >
              {deleteAccount.isPending ? 'Deleting…' : 'Confirm Permanent Deletion'}
            </Button>
          </div>
        }
      >
        <p className="mb-3 text-xs text-slate-600 leading-relaxed">
          To prevent accidental deletion, please type your account email address{' '}
          <strong className="text-neu-navy">{u?.email}</strong> below:
        </p>
        <Input
          placeholder="Enter your email to confirm"
          value={delEmail}
          onChange={(e) => setDelEmail(e.target.value)}
        />
      </Modal>
    </motion.div>
  );
}
