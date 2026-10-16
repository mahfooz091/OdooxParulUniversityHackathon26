import { Link } from 'react-router-dom';
import LegalLayout from '../../components/legal/LegalLayout.jsx';

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How Colombiator collects, uses, safeguards, and provides user control over personal data in compliance with the Digital Personal Data Protection Act (DPDPA 2023) and global standards."
      lastUpdated="October 16, 2026"
    >
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">1. Introduction and Scope</h2>
        <p>
          Welcome to <strong>Colombiator</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), a collaborative travel planning and expense management platform developed for the Odoo &times; Parul University Hackathon 2026.
        </p>
        <p>
          This Privacy Policy outlines how we process personal data when you access or use our web application located at <a href="https://colombiator.vercel.app/" className="text-teal-700 underline font-semibold">https://colombiator.vercel.app</a>. We believe in transparency, data minimization, and providing individuals with unambiguous control over their travel plans and account credentials.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">2. Information We Collect</h2>
        <p>We collect only the information necessary to provide and operate the Colombiator platform:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Account Credentials:</strong> When you register an account, we collect your name, valid email address, and an encrypted password hash (created using industry-standard bcrypt with salt). We never store plaintext passwords.
          </li>
          <li>
            <strong>Profile Information:</strong> Optional information you provide, such as preferred language, city, country, phone number, and avatar photo.
          </li>
          <li>
            <strong>Trip and Itinerary Data:</strong> Destinations, start and end dates, itinerary days, activities, waypoint coordinates, travel notes, packing checklists, and estimated or actual budget expense entries.
          </li>
          <li>
            <strong>Public Community Data:</strong> If you explicitly toggle an itinerary as &ldquo;Public&rdquo;, its route title, description, cover image, and itinerary stops will be visible in the Community browse directory. Private trip notes and personal budgets remain strictly private to your account.
          </li>
          <li>
            <strong>Technical and Hosting Telemetry:</strong> When you access our application, hosting and infrastructure providers (such as Vercel Edge Network) automatically log standard HTTP request metadata, including your IP address, browser type, operating system, timestamp, and referring URL for security, DDoS mitigation, and error diagnosis.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">3. Purpose and Legal Basis for Processing</h2>
        <p>Under the Digital Personal Data Protection Act (India) and international data protection regulations, we process your personal data under the following legitimate grounds:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Contractual Performance:</strong> Providing authentication, syncing trips, calculating itinerary budgets, and saving your packing progress.</li>
          <li><strong>Explicit Consent:</strong> Uploading an avatar image, making an itinerary publicly accessible to other community members, or submitting an inquiry via our support portal.</li>
          <li><strong>Legal & Security Obligations:</strong> Protecting the service from unauthorized access, brute-force login attacks, and maintaining platform uptime.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">4. Third-Party Service Providers and Infrastructure</h2>
        <p>We do not sell, rent, or monetize your personal data. We engage verified infrastructure subprocessors strictly to host and deliver our application:</p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="py-2.5 px-4 text-left font-semibold">Subprocessor</th>
                <th className="py-2.5 px-4 text-left font-semibold">Purpose</th>
                <th className="py-2.5 px-4 text-left font-semibold">Data Processed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2.5 px-4 font-medium">Vercel Inc.</td>
                <td className="py-2.5 px-4">Application CDN, frontend static hosting & serverless compute</td>
                <td className="py-2.5 px-4 text-slate-600">IP address, request headers, serverless API execution</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium">MongoDB Atlas</td>
                <td className="py-2.5 px-4">Managed cloud database storage</td>
                <td className="py-2.5 px-4 text-slate-600">Encrypted user accounts, trips, itineraries, budgets</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium">Cloudinary Inc. (Optional)</td>
                <td className="py-2.5 px-4">Profile photo and trip image cloud storage</td>
                <td className="py-2.5 px-4 text-slate-600">Uploaded profile images and media assets</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium">OpenStreetMap / Leaflet</td>
                <td className="py-2.5 px-4">Interactive map tile display</td>
                <td className="py-2.5 px-4 text-slate-600">Map tile retrieval requests (no personal identifiers)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">5. Cookies and Local Storage</h2>
        <p>
          Colombiator uses strictly essential session cookies and local storage tokens to maintain your authenticated login state. We do not use third-party behavioral advertising trackers. For comprehensive details on each storage token, view our dedicated <Link to="/cookie-policy" className="text-teal-700 font-semibold underline">Cookie Policy</Link>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">6. Data Retention and Account Deletion</h2>
        <p>
          We retain your personal data only for as long as your account remains active. You maintain full ownership of your data and can permanently delete your entire account, trips, checklists, and personal records at any time:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Direct Self-Service Deletion:</strong> You can delete your account inside your <Link to="/profile" className="text-teal-700 underline font-semibold">Profile Settings</Link> under the Danger Zone section.</li>
          <li><strong>Cascading Eradication:</strong> Account deletion immediately purges your user profile, all associated trips, checklist items, and private notes from MongoDB.</li>
          <li><strong>Manual Deletion Assistance:</strong> Read our step-by-step <Link to="/data-deletion" className="text-teal-700 underline font-semibold">Data Deletion Instructions</Link> or submit a request to our Grievance Officer.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">7. User Rights under Indian DPDPA & GDPR</h2>
        <p>As a data principal, you hold the following statutory rights:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Right to Access:</strong> Review all personal information and trips associated with your profile.</li>
          <li><strong>Right to Correction:</strong> Update outdated profile details, passwords, or itinerary dates at any time.</li>
          <li><strong>Right to Erasure:</strong> Delete your personal records permanently upon request.</li>
          <li><strong>Right to Grievance Redressal:</strong> Submit a complaint or data inquiry to our designated Grievance Officer.</li>
          <li><strong>Right to Nominate:</strong> Nominate another individual to exercise rights on your behalf in the event of incapacity.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">8. Data Security and Technical Safeguards</h2>
        <p>
          We employ robust technical safeguards including HTTPS (TLS 1.3/2.0) encryption in transit, bcrypt password hashing with salt, rate-limited authentication endpoints (50 attempts per 15 minutes), HTTP-only cookies, and Helmet security headers. For more information, visit our <Link to="/security" className="text-teal-700 underline font-semibold">Security Overview</Link>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">9. Children&rsquo;s Privacy</h2>
        <p>
          Colombiator is designed for adult travelers and young adults capable of planning travel itineraries independently. We do not knowingly collect personal data from children under 18 years of age without parental or legal guardian consent. If we become aware that an account belongs to a minor without appropriate authorization, we will promptly delete the data.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">10. Grievance Officer and Contact Information</h2>
        <p>
          For questions, data access requests, or privacy grievances in connection with the Digital Personal Data Protection Act, contact our appointed Data Grievance Office:
        </p>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm space-y-1.5">
          <p className="font-semibold text-navy">Colombiator Data Grievance Office</p>
          <p className="text-slate-600">Project: Odoo &times; Parul University Hackathon 2026</p>
          <p className="text-slate-600">Email: <a href="mailto:privacy@colombiator.vercel.app" className="text-teal-700 underline font-medium">privacy@colombiator.vercel.app</a></p>
          <p className="text-slate-600">Web Support: <Link to="/contact" className="text-teal-700 underline font-medium">https://colombiator.vercel.app/contact</Link></p>
          <p className="text-slate-600">Response Window: All statutory inquiries addressed within 7 business days.</p>
        </div>
      </section>
    </LegalLayout>
  );
}
