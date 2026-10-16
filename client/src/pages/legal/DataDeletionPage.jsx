import { Link } from 'react-router-dom';
import LegalLayout from '../../components/legal/LegalLayout.jsx';

export default function DataDeletionPage() {
  return (
    <LegalLayout
      title="Data Deletion & Retention Instructions"
      subtitle="Clear, step-by-step guidance on how to request or execute complete deletion of your Colombiator account and personal travel records."
      lastUpdated="October 16, 2026"
    >
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">1. Your Right to Data Erasure</h2>
        <p>
          In accordance with the <strong>Digital Personal Data Protection Act (DPDPA 2023)</strong> and global privacy frameworks (GDPR Art. 17), you hold an absolute statutory right to delete your personal account and have all associated personal data permanently removed from our systems.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">2. Method 1: Instant Self-Service Deletion (Recommended)</h2>
        <p>
          You do not need to submit tickets or wait for manual human approval to delete your data. You can execute real-time, automated account deletion directly within your account settings:
        </p>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4">
          <ol className="list-decimal pl-5 space-y-3 text-sm text-slate-700">
            <li>
              Log into your account and navigate to <Link to="/profile" className="text-teal-700 font-semibold underline">Profile Settings</Link>.
            </li>
            <li>
              Scroll down to the <strong>Danger zone</strong> card at the bottom of the page.
            </li>
            <li>
              Click the red <strong>Delete account</strong> button.
            </li>
            <li>
              A confirmation dialog will appear. Enter your registered email address exactly as requested to prevent accidental deletion.
            </li>
            <li>
              Click <strong>Delete permanently</strong>.
            </li>
          </ol>
        </div>
        <p className="text-sm text-slate-600">
          Once confirmed, our backend immediately calls <code className="bg-slate-100 px-2 py-0.5 rounded font-mono text-xs">DELETE /api/users/profile</code>, which permanently wipes your data across all database collections.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">3. What Data Is Permanently Eradicated?</h2>
        <p>Executing an account deletion performs an immediate, cascading purge of the following data records:</p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="py-2.5 px-4 text-left font-semibold">Data Category</th>
                <th className="py-2.5 px-4 text-left font-semibold">Database Collection</th>
                <th className="py-2.5 px-4 text-left font-semibold">Action Taken</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2.5 px-4 font-medium">User Profile & Auth</td>
                <td className="py-2.5 px-4 font-mono text-xs text-slate-500">User</td>
                <td className="py-2.5 px-4 text-rose-700 font-medium">Permanently Deleted</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium">Created Trips & Itineraries</td>
                <td className="py-2.5 px-4 font-mono text-xs text-slate-500">Trip</td>
                <td className="py-2.5 px-4 text-rose-700 font-medium">Permanently Deleted (Cascaded)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium">Packing Checklists</td>
                <td className="py-2.5 px-4 font-mono text-xs text-slate-500">ChecklistItem</td>
                <td className="py-2.5 px-4 text-rose-700 font-medium">Permanently Deleted (Cascaded)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium">Private Travel Notes</td>
                <td className="py-2.5 px-4 font-mono text-xs text-slate-500">Note</td>
                <td className="py-2.5 px-4 text-rose-700 font-medium">Permanently Deleted (Cascaded)</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-medium">Authentication Session</td>
                <td className="py-2.5 px-4 font-mono text-xs text-slate-500">Cookies & Storage</td>
                <td className="py-2.5 px-4 text-rose-700 font-medium">HTTP Cookie Expired & Cleared</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">4. Backup Retention Schedule</h2>
        <p>
          Live database records are deleted immediately upon confirmation. Residual database snapshots maintained within automated MongoDB Atlas infrastructure backups are retained strictly for disaster recovery purposes and expire automatically in accordance with the 7-day rolling backup retention cycle, after which they are irreversibly overwritten.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">5. Method 2: Assisted Deletion Request</h2>
        <p>
          If you are unable to access your account or require assistance deleting your records, you may submit a manual data erasure request to our Grievance Officer:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700">
          <li>Submit a request via our <Link to="/contact" className="text-teal-700 underline font-semibold">Support Portal</Link> selecting category <em>Data Deletion / Privacy</em>.</li>
          <li>Or send an email directly to <a href="mailto:privacy@colombiator.vercel.app" className="text-teal-700 font-semibold underline">privacy@colombiator.vercel.app</a> from your registered email address.</li>
        </ul>
        <p className="text-sm text-slate-600">
          To protect user accounts from malicious unauthorized deletion, manual requests require identity verification confirming ownership of the registered email address. All manual deletion requests are completed within 72 hours of verification.
        </p>
      </section>
    </LegalLayout>
  );
}
