import { Link } from 'react-router-dom';
import LegalLayout from '../../components/legal/LegalLayout.jsx';

export default function AcceptableUsePage() {
  return (
    <LegalLayout
      title="Acceptable Use Policy"
      subtitle="The standards and community conduct required when utilizing the Colombiator planning tools and sharing public community itineraries."
      lastUpdated="October 16, 2026"
    >
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">1. Purpose and Application</h2>
        <p>
          This Acceptable Use Policy (&ldquo;AUP&rdquo;) defines prohibited activities across all Colombiator services, including trip itinerary creation, custom destination notes, checklist collaboration, profile creation, and public route publication in the Community library.
        </p>
        <p>
          By using Colombiator, you agree to comply with this policy in full.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">2. Prohibited Content</h2>
        <p>You may not create, upload, publish, or share any trip or content that:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Violates Laws or Regulations:</strong> Promotes unlawful travel activities, contraband trafficking, or trespassing on protected heritage or restricted private lands.</li>
          <li><strong>Harassment or Defamation:</strong> Contains hate speech, discriminatory slurs, threats, defamation, or targets any individual or community.</li>
          <li><strong>Infringes Intellectual Property:</strong> Incorporates photos, copyrighted travel guides, or trademarks without required authorization.</li>
          <li><strong>Adult or Obscene Material:</strong> Contains sexually explicit imagery, non-consensual media, or gratuitous violence.</li>
          <li><strong>Malicious Payloads:</strong> Embeds scripts, harmful links, phishing URLs, or malware inside trip notes or activity descriptions.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">3. Platform Integrity and Security Restrictions</h2>
        <p>To preserve performance, reliability, and security for all travelers, you must not:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Probe, scan, or test the vulnerability of our systems or network without explicit prior written authorization.</li>
          <li>Attempt to circumvent authentication middleware, authorization guards, or rate limiters.</li>
          <li>Scrape or mass-harvest itinerary data or user profiles using automated scripts, bots, or web scrapers.</li>
          <li>Deploy denial-of-service (DoS) or distributed denial-of-service (DDoS) traffic against our APIs or edge endpoints.</li>
          <li>Create multiple disposable accounts to game community rankings or circumvent suspensions.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">4. Public Community Standards</h2>
        <p>
          When you toggle an itinerary as &ldquo;Public&rdquo;, you are sharing it with the global Colombiator community. Public itineraries must provide genuine, helpful travel context with accurate waypoint descriptions, constructive tips, and respectful imagery.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">5. Violations, Reporting & Moderation</h2>
        <p>
          If you discover an itinerary or user profile that violates this policy, please report it immediately to our moderation team via our <Link to="/contact" className="text-teal-700 underline font-semibold">Contact & Support portal</Link> with the subject line &ldquo;Acceptable Use Violation&rdquo; and the URL of the affected content.
        </p>
        <p>
          We review reported content promptly. Violations may result in content removal, revocation of public sharing privileges, or permanent account termination.
        </p>
      </section>
    </LegalLayout>
  );
}
