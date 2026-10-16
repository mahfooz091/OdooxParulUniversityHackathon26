import { Link } from 'react-router-dom';
import LegalLayout from '../../components/legal/LegalLayout.jsx';

export default function TermsOfServicePage() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="The terms, conditions, and user agreements governing your access to and usage of the Colombiator collaborative travel platform."
      lastUpdated="October 16, 2026"
    >
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">1. Agreement to Terms</h2>
        <p>
          By creating an account, browsing, or using the <strong>Colombiator</strong> platform (&ldquo;Service&rdquo;), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our associated <Link to="/privacy-policy" className="text-teal-700 underline font-semibold">Privacy Policy</Link>.
        </p>
        <p>
          If you do not agree with any of these terms, you must discontinue using Colombiator immediately.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">2. Eligibility and Account Responsibilities</h2>
        <p>To register and use Colombiator, you represent and warrant that:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>You are at least 18 years of age, or have the express consent and supervision of a legal guardian.</li>
          <li>You provide accurate, current, and complete registration information.</li>
          <li>You are solely responsible for maintaining the confidentiality of your login credentials and password.</li>
          <li>You notify us immediately if you discover or suspect unauthorized access to your account.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">3. User-Generated Content and Ownership</h2>
        <p>
          You retain full intellectual property ownership of all travel itineraries, notes, budgets, checklists, photos, and descriptions you create or upload to Colombiator (&ldquo;User Content&rdquo;).
        </p>
        <p>
          <strong>Private Itineraries:</strong> By default, all your created trips, notes, and budgets are strictly private and accessible only by your authenticated account.
        </p>
        <p>
          <strong>Public Sharing License:</strong> If you explicitly mark an itinerary as &ldquo;Public&rdquo;, you grant Colombiator a worldwide, non-exclusive, royalty-free license to display your itinerary title, description, cover image, and stop list to other users within the Community section. Personal notes and financial expense records are never published.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">4. Hackathon Edition & Free Access</h2>
        <p>
          Colombiator is deployed as an open-access travel planning platform for the <em>Odoo &times; Parul University Hackathon 2026</em>. All core features &mdash; including multi-stop itinerary building, interactive mapping, budget tracking, packing organizers, and community route cloning &mdash; are provided completely free of charge.
        </p>
        <p>
          We do not require payment details, do not enforce paid subscription tiers, and do not charge transaction fees for using our planning suite.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">5. Travel Estimates & Disclaimers</h2>
        <p>
          Colombiator provides informational planning tools. You acknowledge and agree that:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Estimates are Not Guarantees:</strong> Route durations, destination costs, and currency calculations are user-entered or approximate estimates. Actual transport fares, lodging rates, and entry fees may vary.
          </li>
          <li>
            <strong>Independent Booking:</strong> Colombiator is not a travel agency, tour operator, or booking engine. You are solely responsible for verifying travel advisories, entry visas, flight schedules, and booking reservations through official providers.
          </li>
          <li>
            <strong>Map Data:</strong> Interactive map coordinates and route lines are provided via OpenStreetMap and Leaflet for visual orientation. Do not rely on them as sole navigation during hazardous or remote travel conditions.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">6. Acceptable Use and Prohibited Activities</h2>
        <p>
          You agree not to misuse Colombiator or assist any third party in doing so. Review our complete <Link to="/acceptable-use" className="text-teal-700 underline font-semibold">Acceptable Use Policy</Link> for exhaustive details. Prohibited conduct includes:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Attempting to bypass security controls, rate limits, or access other users&rsquo; private trips.</li>
          <li>Uploading illegal, defamatory, obscene, or infringing content.</li>
          <li>Submitting automated scraping requests or subjecting the platform to denial-of-service loads.</li>
          <li>Impersonating another person or misrepresenting affiliations.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">7. Account Termination and Deletion</h2>
        <p>
          You may terminate your account at any time through the <Link to="/profile" className="text-teal-700 underline font-semibold">Profile Settings</Link> page. We reserve the right to suspend or terminate accounts that violate our Acceptable Use Policy or compromise platform security.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">8. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by applicable law, Colombiator and its hackathon development contributors shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, travel interruptions, missed flights, or data loss arising from your use of the service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">9. Governing Law and Dispute Resolution</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles. Any legal disputes arising in connection with the project shall be subject to the exclusive jurisdiction of the competent courts in Vadodara, Gujarat, India.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">10. Contact Us</h2>
        <p>
          If you have questions regarding these Terms of Service, please reach out via our <Link to="/contact" className="text-teal-700 underline font-semibold">Contact & Support page</Link> or email <strong>legal@colombiator.vercel.app</strong>.
        </p>
      </section>
    </LegalLayout>
  );
}
