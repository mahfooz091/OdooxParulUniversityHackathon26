import { Link } from 'react-router-dom';
import LegalLayout from '../../components/legal/LegalLayout.jsx';

export default function CommunityGuidelinesPage() {
  return (
    <LegalLayout
      title="Community Guidelines"
      subtitle="How explorers collaborate, share authentic travel routes, and build an inclusive, trustworthy community on Colombiator."
      lastUpdated="October 16, 2026"
    >
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">1. The Colombiator Spirit</h2>
        <p>
          Colombiator was built to celebrate the joy of thoughtful exploration. The Community directory allows travelers from all over the world to discover multi-day itineraries, explore curated stops, and clone inspiring routes into their personal workspaces.
        </p>
        <p>
          To maintain an environment where everyone can discover reliable, inspiring travel ideas, we ask all community contributors to follow these core guidelines.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">2. Authentic & Helpful Travel Content</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Provide Real Context:</strong> Share routes that reflect practical travel timelines, realistic day-by-day pacing, and verified transit connections.</li>
          <li><strong>No Promotional Spam:</strong> Do not use public itineraries as commercial billboards, affiliate link farms, or unsolicited sales pitches for unverified tours.</li>
          <li><strong>Accurate Geolocation:</strong> Ensure stop coordinates and location names correspond accurately to actual destinations.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">3. Cultural Respect & Eco-Responsibility</h2>
        <p>Travel brings us closer together. As a community creator:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Respect local communities, religious traditions, sacred sites, and cultural norms in destination descriptions.</li>
          <li>Avoid publishing routes that encourage trespassing on private properties or unauthorized access to fragile wildlife sanctuaries.</li>
          <li>Promote sustainable, leave-no-trace travel practices that protect heritage monuments and natural ecosystems.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">4. Constructive Engagement & Cloning</h2>
        <p>
          When you clone a community itinerary into your personal planner, you are creating a private derivative to adapt for your own trip. You are free to customize stops, adjust dates, and calculate your personal budget without altering the original creator&rsquo;s published version.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">5. Reporting Unsuitable Routes</h2>
        <p>
          If you encounter a published route that contains offensive imagery, inaccurate safety hazards, or copyright violations, please notify us through our <Link to="/contact" className="text-teal-700 underline font-semibold">Contact & Support page</Link>. Our team reviews flagged routes and removes non-compliant itineraries promptly.
        </p>
      </section>
    </LegalLayout>
  );
}
