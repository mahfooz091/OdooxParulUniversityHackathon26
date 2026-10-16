import { Link } from 'react-router-dom';
import { Shield, FileText, Cookie, AlertTriangle, Users, Trash2, Lock, HelpCircle, ArrowRight } from 'lucide-react';
import LegalLayout from '../../components/legal/LegalLayout.jsx';

const legalDocs = [
  {
    title: 'Privacy Policy',
    desc: 'How we collect, protect, and process user data in accordance with India’s DPDPA 2023 and global privacy standards.',
    to: '/privacy-policy',
    icon: Shield,
    readTime: '6 min read',
    tag: 'Compliance',
  },
  {
    title: 'Terms of Service',
    desc: 'The binding user agreements, ownership rules for user content, free hackathon access terms, and liability limits.',
    to: '/terms-of-service',
    icon: FileText,
    readTime: '5 min read',
    tag: 'Agreement',
  },
  {
    title: 'Cookie & Storage Policy',
    desc: 'Exact details on the session tokens, cookies, and local storage keys used to keep you logged in.',
    to: '/cookie-policy',
    icon: Cookie,
    readTime: '3 min read',
    tag: 'Storage',
  },
  {
    title: 'Acceptable Use Policy',
    desc: 'Prohibited activities, content moderation standards, platform integrity rules, and security testing limits.',
    to: '/acceptable-use',
    icon: AlertTriangle,
    readTime: '4 min read',
    tag: 'Conduct',
  },
  {
    title: 'Data Deletion Instructions',
    desc: 'Self-service automated account erasure instructions, cascading database purges, and assisted deletion requests.',
    to: '/data-deletion',
    icon: Trash2,
    readTime: '3 min read',
    tag: 'Your Rights',
  },
  {
    title: 'Community Guidelines',
    desc: 'Standards for sharing authentic public itineraries, cultural respect, and constructive community remixing.',
    to: '/community-guidelines',
    icon: Users,
    readTime: '3 min read',
    tag: 'Community',
  },
  {
    title: 'Security Practices',
    desc: 'Architectural overview of TLS encryption, bcrypt password cryptography, rate limiting, and vulnerability disclosure.',
    to: '/security',
    icon: Lock,
    readTime: '4 min read',
    tag: 'Security',
  },
  {
    title: 'Contact & Support',
    desc: 'Submit technical bug tickets, report community routes, or contact our Data Grievance Officer.',
    to: '/contact',
    icon: HelpCircle,
    readTime: 'Support Desk',
    tag: 'Support',
  },
];

export default function LegalIndexPage() {
  return (
    <LegalLayout
      title="Legal & Trust Center"
      subtitle="Comprehensive documentation, terms, security disclosures, and user rights policies for the Colombiator collaborative travel platform."
      lastUpdated="October 16, 2026"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        {legalDocs.map((doc) => {
          const Icon = doc.icon;
          return (
            <Link
              key={doc.to}
              to={doc.to}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 transition-all hover:border-teal-300 hover:bg-white hover:shadow-card"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700 transition-colors group-hover:bg-teal-500 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {doc.tag}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-navy text-lg group-hover:text-teal-700 transition-colors">
                  {doc.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {doc.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-200/50 pt-4 text-xs font-medium text-slate-500">
                <span>{doc.readTime}</span>
                <span className="inline-flex items-center gap-1 font-semibold text-teal-700 group-hover:translate-x-0.5 transition-transform">
                  View Document
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </LegalLayout>
  );
}
