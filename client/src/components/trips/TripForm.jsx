import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import { Loader2, MapPin, Calendar, UploadCloud, ChevronRight } from 'lucide-react';
import Input from '../common/Input.jsx';
import Button from '../common/Button.jsx';
import Modal from '../common/Modal.jsx';
import CitySearch from '../search/CitySearch.jsx';
import { uploadImage } from '../../services/uploadService.js';

export default function TripForm({ initial, onSubmit, submitting }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [startDate, setStartDate] = useState(
    initial?.startDate ? new Date(initial.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState(
    initial?.endDate ? new Date(initial.endDate) : new Date(Date.now() + 86400000 * 5)
  );
  const [coverPhoto, setCoverPhoto] = useState(initial?.coverPhoto || '');
  const [uploading, setUploading] = useState(false);
  const [isPublic, setIsPublic] = useState(Boolean(initial?.isPublic));
  const [destinationCityId, setDestinationCityId] = useState('');
  const [destinationCityName, setDestinationCityName] = useState('');
  const [showCityModal, setShowCityModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const id = setInterval(() => {
      const draft = {
        title,
        description,
        startDate,
        endDate,
        coverPhoto,
        isPublic,
        destinationCityId,
        destinationCityName,
      };
      localStorage.setItem('colombiator-trip-draft', JSON.stringify(draft));
    }, 30000);
    return () => clearInterval(id);
  }, [title, description, startDate, endDate, coverPhoto, isPublic, destinationCityId]);

  useEffect(() => {
    const raw = localStorage.getItem('colombiator-trip-draft');
    if (!initial && raw) {
      try {
        const d = JSON.parse(raw);
        if (d.title) setTitle(d.title);
        if (d.description) setDescription(d.description);
        if (d.startDate) setStartDate(new Date(d.startDate));
        if (d.endDate) setEndDate(new Date(d.endDate));
        if (d.coverPhoto) setCoverPhoto(d.coverPhoto);
        if (typeof d.isPublic === 'boolean') setIsPublic(d.isPublic);
        if (d.destinationCityId) setDestinationCityId(d.destinationCityId);
        if (d.destinationCityName) setDestinationCityName(d.destinationCityName);
      } catch {
        /* ignore */
      }
    }
  }, [initial]);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const { url } = await uploadImage(file, 'colombiator/trips');
      setCoverPhoto(url);
      toast.success('Cover image uploaded successfully!');
    } catch (err) {
      console.error(err);
      toast.error(err.friendlyMessage || 'Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!title.trim()) nextErrors.title = 'Required';
    if (!destinationCityId) nextErrors.destinationCityId = 'Pick a destination city';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    onSubmit({
      title,
      description,
      startDate,
      endDate,
      coverPhoto,
      isPublic,
      destinationCityId,
    });
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <Input
        label="Trip name"
        placeholder="e.g., Summer in Tokyo, Swiss Alps Hiking"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={errors.title}
      />
      <div>
        <label className="block text-xs uppercase tracking-wider font-semibold text-neu-slate mb-1.5">
          Destination City
        </label>
        <button
          type="button"
          className="w-full bg-[#F8FCFC] border border-[#E2EBEB] shadow-neu-inset hover:border-neu-teal/50 rounded-xl px-4 py-3.5 text-left flex justify-between items-center transition-all group"
          onClick={() => setShowCityModal(true)}
        >
          <span className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-neu-teal group-hover:scale-110 transition-transform" />
            <span className={destinationCityName ? "text-neu-navy font-medium" : "text-neu-slate/60"}>
              {destinationCityName || 'Select a destination city'}
            </span>
          </span>
          <ChevronRight className="w-4 h-4 text-neu-slate/60 group-hover:translate-x-0.5 transition-transform" />
        </button>
        {errors.destinationCityId && (
          <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.destinationCityId}</p>
        )}
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-neu-slate mb-1.5">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neu-teal" />
              Start Date
            </span>
          </label>
          <DatePicker
            selected={startDate}
            onChange={setStartDate}
            className="w-full bg-[#F8FCFC] border border-[#E2EBEB] shadow-neu-inset focus:bg-white focus:shadow-neu-inset-focus focus:outline-none rounded-xl px-4 py-3 text-neu-navy font-medium transition-all"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider font-semibold text-neu-slate mb-1.5">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neu-cyan" />
              End Date
            </span>
          </label>
          <DatePicker
            selected={endDate}
            onChange={setEndDate}
            className="w-full bg-[#F8FCFC] border border-[#E2EBEB] shadow-neu-inset focus:bg-white focus:shadow-neu-inset-focus focus:outline-none rounded-xl px-4 py-3 text-neu-navy font-medium transition-all"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider font-semibold text-neu-slate mb-1.5">Trip Description & Goals</label>
        <textarea
          rows={3}
          placeholder="What are the goals of this trip? Favorite spots, packing notes, or vibes..."
          className="w-full bg-[#F8FCFC] border border-[#E2EBEB] shadow-neu-inset focus:bg-white focus:shadow-neu-inset-focus focus:outline-none rounded-xl px-4 py-3 text-neu-navy placeholder:text-neu-slate/50 transition-all resize-y"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-wider font-semibold text-neu-slate mb-2">Cover Photo</label>
        <label className={`flex flex-col items-center justify-center border-2 border-dashed border-[#E2EBEB] bg-[#F8FCFC] rounded-2xl p-6 transition-all ${uploading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:border-neu-teal hover:bg-neu-mint/20 hover:shadow-neu-raised-sm'}`}>
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
          {uploading ? (
            <div className="flex flex-col items-center gap-2 text-neu-teal py-4">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="text-sm font-semibold">Uploading photo to CDN...</span>
            </div>
          ) : coverPhoto ? (
            <div className="relative group w-full flex flex-col items-center">
              <img src={coverPhoto} alt="Cover preview" className="max-h-52 w-full max-w-md rounded-xl object-cover shadow-neu-raised-sm border border-[#E2EBEB]" />
              <span className="text-xs text-neu-slate mt-2 group-hover:text-neu-teal transition-colors font-medium">Click or drag new image to replace</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-4 text-center">
              <div className="w-12 h-12 rounded-xl bg-neu-mint/60 flex items-center justify-center text-neu-teal shadow-neu-raised-sm">
                <UploadCloud className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-neu-navy">Drop your cover image or browse</span>
              <span className="text-xs text-neu-slate">PNG, JPG, or WebP up to 5MB</span>
            </div>
          )}
        </label>
      </div>
      <div className="p-3.5 bg-[#F8FCFC] rounded-xl border border-[#E2EBEB] shadow-neu-inset">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="w-4 h-4 accent-neu-teal rounded cursor-pointer"
          />
          <div>
            <span className="text-sm font-semibold text-neu-navy block">Share with Colombiator Community</span>
            <span className="text-xs text-neu-slate block">Allow other travelers to browse your itinerary and clone it for their own adventures.</span>
          </div>
        </label>
      </div>
      <Button type="submit" variant="primary" size="lg" className="w-full py-3.5 shadow-neu-btn-primary" disabled={submitting || uploading}>
        {submitting ? 'Saving Journey…' : 'Save & Continue to Itinerary'}
      </Button>

      <Modal
        open={showCityModal}
        onClose={() => setShowCityModal(false)}
        title="Select Destination"
      >
        <CitySearch
          mode="modal"
          onPickCity={(city) => {
            setDestinationCityId(city._id);
            setDestinationCityName(city.name);
            if (!coverPhoto && city.coverImage) {
              setCoverPhoto(city.coverImage);
            }
            setShowCityModal(false);
          }}
        />
      </Modal>
    </form>
  );
}
