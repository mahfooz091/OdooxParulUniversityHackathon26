import { Link } from 'react-router-dom';
import LegalLayout from '../../components/legal/LegalLayout.jsx';

export default function SecurityPage() {
  return (
    <LegalLayout
      title="Security Practices & Architecture"
      subtitle="The technical controls, encryption standards, and defense-in-depth safeguards protecting your Colombiator account and travel itineraries."
      lastUpdated="October 16, 2026"
    >
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">1. Security Architecture Overview</h2>
        <p>
          Colombiator takes a defense-in-depth approach to data security. As a modern travel management platform, our architecture isolates confidential user account credentials and private trip plans through multi-layered controls across the edge network, application compute, and database persistence layers.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">2. Core Security Controls</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2">
            <h3 className="font-semibold text-navy">Encryption in Transit</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              All communications between your browser, Vercel Edge nodes, and our Express API server are encrypted using modern Transport Layer Security (TLS 1.2/1.3) with HTTP Strict Transport Security (HSTS) enforced.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2">
            <h3 className="font-semibold text-navy">Password Cryptography</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Passwords are salted and cryptographically hashed using <code className="bg-slate-200 px-1.5 py-0.5 rounded text-xs font-mono">bcryptjs</code> with a high work factor prior to storage. Plaintext passwords are never logged, stored, or readable by administrators.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2">
            <h3 className="font-semibold text-navy">API Rate Limiting</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Authentication endpoints are guarded by <code className="bg-slate-200 px-1.5 py-0.5 rounded text-xs font-mono">express-rate-limit</code> restricting brute-force login and credential stuffing attempts to a maximum of 50 requests per 15-minute window.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2">
            <h3 className="font-semibold text-navy">HTTP Security Headers</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              The Express API utilizes <code className="bg-slate-200 px-1.5 py-0.5 rounded text-xs font-mono">Helmet</code> to enforce strict HTTP headers including Content Security Policy (CSP), X-Frame-Options (clickjacking prevention), and X-Content-Type-Options (MIME-sniffing protection).
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2">
            <h3 className="font-semibold text-navy">Session Management</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Sessions are maintained via signed JSON Web Tokens (JWT) secured with HTTP-only cookies and same-origin policies, mitigating cross-site scripting (XSS) token exfiltration risks.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 space-y-2">
            <h3 className="font-semibold text-navy">Injection & Schema Defense</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Strict Mongoose schema typing and input validator sanitization prevent NoSQL injection, parameter tampering, and mass-assignment vulnerabilities on user profile and itinerary payloads.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">3. Data Isolation and Access Guards</h2>
        <p>
          Every authenticated API endpoint validates resource ownership on the server side. Users cannot inspect, modify, or delete another traveler&rsquo;s private itineraries, notes, budgets, or checklist items by tampering with resource IDs or route parameters.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-navy border-b border-slate-100 pb-2">4. Responsible Vulnerability Disclosure</h2>
        <p>
          We welcome responsible security research. If you discover a potential vulnerability in Colombiator, please notify our security team before public disclosure so we can verify and remediate the issue promptly.
        </p>
        <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-5 text-sm space-y-2 text-slate-700">
          <p className="font-semibold text-teal-900">Reporting Guidelines:</p>
          <ul className="list-disc pl-5 space-y-1 text-xs">
            <li>Email: <a href="mailto:security@colombiator.vercel.app" className="text-teal-800 underline font-medium">security@colombiator.vercel.app</a></li>
            <li>Include detailed steps to reproduce the vulnerability, including request payloads and affected endpoints.</li>
            <li>Allow a reasonable window (48&ndash;72 hours) for triage and remediation before public disclosure.</li>
            <li>Avoid executing destructive actions against production user accounts or overwhelming infrastructure with denial-of-service traffic.</li>
          </ul>
        </div>
      </section>
    </LegalLayout>
  );
}
