import { ArrowRight, Users, CheckCircle2, Clock, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

// ============================================================
// PlacementsPage
// ============================================================
const placedStudents = [
  { name: 'Arjun Mehta', company: 'Google', role: 'SWE', pkg: '₹14 LPA', program: 'Full Stack Dev', avatar: 'AM' },
  { name: 'Priya Nair', company: 'Microsoft', role: 'Data Analyst', pkg: '₹11 LPA', program: 'Data Science', avatar: 'PN' },
  { name: 'Rahul Sharma', company: 'Flipkart', role: 'Digital Marketer', pkg: '₹8 LPA', program: 'Digital Marketing', avatar: 'RS' },
  { name: 'Sneha Kulkarni', company: 'Swiggy', role: 'UX Designer', pkg: '₹9 LPA', program: 'UI/UX Design', avatar: 'SK' },
  { name: 'Vikram Singh', company: 'Amazon', role: 'Cloud Engineer', pkg: '₹12 LPA', program: 'Cloud & DevOps', avatar: 'VS' },
  { name: 'Ananya Rao', company: 'Deloitte', role: 'Business Analyst', pkg: '₹10 LPA', program: 'MBA Analytics', avatar: 'AR' },
];

export function PlacementsPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="gradient-hero-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl font-bold text-white mb-4">Placement Record</h1>
          <p className="text-white/70 text-xl mb-10">Our students don't just learn — they land jobs at top companies.</p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              ['500+', 'Students Placed'],
              ['₹12 LPA', 'Highest Package'],
              ['95%', 'Placement Rate'],
              ['50+', 'Partner Companies'],
            ].map(([val, lbl]) => (
              <div key={lbl} className="text-center">
                <div className="font-display font-bold text-4xl text-white">{val}</div>
                <div className="text-white/60 text-sm mt-1">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="bg-gray-50 border-y border-gray-100 py-8 overflow-hidden">
        <style>{`
          @keyframes marquee-slow {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-slow {
            animation: marquee-slow 35s linear infinite;
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <h2 className="font-display text-2xl font-bold text-gray-900 text-center">Recent Placements</h2>
        </div>
        <div
          className="relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="flex animate-marquee-slow whitespace-nowrap">
            {[...placedStudents, ...placedStudents].map((s, i) => (
              <div
                key={`${s.name}-${i}`}
                className="inline-flex items-center gap-3 mx-3 bg-white rounded-xl px-5 py-3 shadow-sm border border-gray-100"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xs">{s.avatar}</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm">{s.name}</p>
                  <p className="text-xs text-gray-500">{s.role} @ {s.company}</p>
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg ml-2">{s.pkg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Student Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {placedStudents.map(s => (
            <div key={s.name} className="card p-5 flex items-center gap-4 hover:-translate-y-1 transition-transform">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-full flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-sm">{s.avatar}</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{s.name}</p>
                <p className="text-sm text-gray-500">{s.role} @ <span className="font-medium text-gray-700">{s.company}</span></p>
                <p className="text-xs text-gray-400">{s.program}</p>
              </div>
              <span className="text-sm font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-lg">{s.pkg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MBA Page
// ============================================================
const mbaPrograms = [
  {
    title: 'MBA in Business Analytics',
    duration: '24 months',
    fee: '₹1,49,999',
    rating: 4.8,
    students: 560,
    badge: 'Premium',
    highlights: ['Live Online Classes', 'Industry Projects', 'Dual Certification', 'Placement Support'],
  },
  {
    title: 'MBA in Digital Marketing',
    duration: '18 months',
    fee: '₹99,999',
    rating: 4.7,
    students: 420,
    badge: 'Popular',
    highlights: ['Google Certified Faculty', 'Agency Projects', 'Portfolio Building', 'Job Guarantee'],
  },
  {
    title: 'Executive MBA',
    duration: '12 months',
    fee: '₹74,999',
    rating: 4.6,
    students: 280,
    badge: 'Fast-Track',
    highlights: ['Weekend Classes', 'Industry Mentors', 'Peer Network', 'Alumni Access'],
  },
];

export function MBAPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90 mb-6">
            UGC & AICTE Recognized Programs
          </span>
          <h1 className="font-display text-5xl font-bold text-white mb-4">MBA Programs</h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            Industry-integrated MBA programs designed for the modern economy. Study online, work in parallel.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {mbaPrograms.map(prog => (
            <div key={prog.title} className="card p-6 hover:-translate-y-1">
              <span className="badge bg-brand-50 text-brand-600 mb-3 inline-block">{prog.badge}</span>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-2">{prog.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Clock size={13} />{prog.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={13} />{prog.students}+ students
                </span>
              </div>
              <div className="flex items-center gap-1 mb-4">
                <Star size={13} className="fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-sm">{prog.rating}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {prog.highlights.map(h => (
                  <li key={h} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={14} className="text-green-500 shrink-0" />{h}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-2xl text-gray-900">{prog.fee}</span>
                <Link to="/support" className="btn-primary text-sm py-2">Apply Now</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Certifications Page
// ============================================================
const certs = [
  { title: 'Full Stack Developer', issuer: 'Skylent + AWS', duration: '6 months', level: 'Professional' },
  { title: 'Data Science Professional', issuer: 'Skylent + IBM', duration: '8 months', level: 'Expert' },
  { title: 'Digital Marketing Certified', issuer: 'Skylent + Google', duration: '4 months', level: 'Associate' },
  { title: 'UI/UX Design Certified', issuer: 'Skylent + Figma', duration: '5 months', level: 'Professional' },
  { title: 'Cloud Practitioner', issuer: 'Skylent + AWS', duration: '3 months', level: 'Foundational' },
  { title: 'Cybersecurity Analyst', issuer: 'Skylent + CompTIA', duration: '6 months', level: 'Professional' },
];

export function CertificationsPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="mesh-bg border-b border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl font-bold text-gray-900 mb-4">Industry Certifications</h1>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto">
            Get certified by recognized industry leaders. Our dual certifications are accepted globally.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map(cert => (
            <div key={cert.title} className="card p-5 hover:-translate-y-1 cursor-pointer group">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center">
                  <span className="text-brand-500 font-bold text-lg">
                    {cert.title.charAt(0)}
                  </span>
                </div>
              </div>
              <span className="badge bg-brand-50 text-brand-600 text-xs mb-2 inline-block">{cert.level}</span>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-brand-600 transition-colors">
                {cert.title}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Issued by: <span className="font-medium text-gray-700">{cert.issuer}</span>
              </p>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Clock size={11} />{cert.duration} program
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}