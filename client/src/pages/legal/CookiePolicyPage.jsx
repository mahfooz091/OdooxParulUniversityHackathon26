import { useState } from 'react';
import LegalLayout from '../../components/legal/LegalLayout.jsx';

export default function CookiePolicyPage() {
  const [currentPref, setCurrentPref] = useState(() => {
    return localStorage.getItem('colombiator_cookie_consent') || 'essential_only';
  });
  const [statusMsg, setStatusMsg] = useState('');

  const updateConsent = (val) => {
    localStorage.setItem('colombiator_cookie_consent', val);
    setCurrentPref(val);
    setStatusMsg(`Preference saved: ${val === 'all' ? 'All Cookies Accepted' : 'Strictly Essential Only'}`);
    setTimeout(() => setStatusMsg(''), 4000);
  };

  return (
    <LegalLayout
      title="Cookie & Storage Policy"
      subtitle="How Colombiator uses cookies, local storage tokens, and related web technologies to provide secure authentication and preserve your preferences."
      lastUpdated="October 16, 2026"
    >
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">1. What Are Cookies and Web Storage?</h2>
        <p>
          Cookies and local storage technologies are small text files or key-value entries stored in your web browser by websites you visit. They enable websites to &ldquo;remember&rdquo; your active session, keep you logged in across page refreshes, and preserve your UI preferences.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">2. How Colombiator Uses Storage Technologies</h2>
        <p>
          Colombiator strictly limits its use of web storage to necessary authentication and application performance. We do not operate third-party tracking scripts or cross-site advertising beacons.
        </p>
        <p>
          Our web application utilizes two primary storage mechanisms:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="py-2.5 px-4 text-left font-semibold">Cookie / Storage Key</th>
                <th className="py-2.5 px-4 text-left font-semibold">Category</th>
                <th className="py-2.5 px-4 text-left font-semibold">Duration</th>
                <th className="py-2.5 px-4 text-left font-semibold">Function & Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2.5 px-4 font-mono font-medium text-xs">token</td>
                <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold">Strictly Essential</span></td>
                <td className="py-2.5 px-4">7 days</td>
                <td className="py-2.5 px-4 text-slate-600">HTTP-only cookie containing encrypted JWT session token to authenticate API requests.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono font-medium text-xs">colombiator_token</td>
                <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold">Strictly Essential</span></td>
                <td className="py-2.5 px-4">Persistent</td>
                <td className="py-2.5 px-4 text-slate-600">Browser local storage fallback token for persistent login recovery and API request authorization header.</td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-mono font-medium text-xs">colombiator_cookie_consent</td>
                <td className="py-2.5 px-4"><span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold">Preferences</span></td>
                <td className="py-2.5 px-4">1 year</td>
                <td className="py-2.5 px-4 text-slate-600">Stores your selected cookie consent choice (&ldquo;all&rdquo; or &ldquo;essential_only&rdquo;) so the banner does not repeatedly prompt you.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">3. Managing Your Cookie Preferences</h2>
        <p>
          You can adjust your consent preference directly below at any time. Strictly essential tokens cannot be disabled without breaking your ability to log in and manage trips.
        </p>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-navy">Current Preference</p>
              <p className="text-xs text-slate-500">
                Status: <strong className="text-teal-800 uppercase">{currentPref === 'all' ? 'All Cookies Enabled' : 'Essential Only'}</strong>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => updateConsent('essential_only')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  currentPref === 'essential_only'
                    ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                Essential Only
              </button>
              <button
                type="button"
                onClick={() => updateConsent('all')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  currentPref === 'all'
                    ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                Accept All
              </button>
            </div>
          </div>
          {statusMsg && (
            <p className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 inline-block">
              {statusMsg}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">4. Browser-Level Controls</h2>
        <p>
          You can also configure your web browser to block or delete cookies entirely. Please note that blocking all cookies will prevent you from signing in to Colombiator:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm">
          <li><strong>Google Chrome:</strong> Settings &rarr; Privacy and security &rarr; Third-party cookies.</li>
          <li><strong>Apple Safari:</strong> Settings &rarr; Privacy &rarr; Manage Website Data.</li>
          <li><strong>Mozilla Firefox:</strong> Settings &rarr; Privacy & Security &rarr; Cookies and Site Data.</li>
          <li><strong>Microsoft Edge:</strong> Settings &rarr; Cookies and site permissions.</li>
        </ul>
      </section>
    </LegalLayout>
  );
}
