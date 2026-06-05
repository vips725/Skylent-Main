// MBA Page
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, Star, CheckCircle2, Award, TrendingUp, Briefcase } from 'lucide-react';

const mbaPrograms = [
  { title: 'MBA in Business Analytics', duration: '24 months', fee: '₹1,49,999', rating: 4.8, students: 560, badge: 'Premium', highlights: ['Live Online Classes', 'Industry Projects', 'Dual Certification', 'Placement Support'] },
  { title: 'MBA in Digital Marketing', duration: '18 months', fee: '₹99,999', rating: 4.7, students: 420, badge: 'Popular', highlights: ['Google Certified Faculty', 'Agency Projects', 'Portfolio Building', 'Job Guarantee'] },
  { title: 'Executive MBA', duration: '12 months', fee: '₹74,999', rating: 4.6, students: 280, badge: 'Fast-Track', highlights: ['Weekend Classes', 'Industry Mentors', 'Peer Network', 'Alumni Access'] },
];

export function MBAPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90 mb-6">🎓 UGC & AICTE Recognized Programs</span>
          <h1 className="font-display text-5xl font-bold text-white mb-4">MBA Programs</h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">Industry-integrated MBA programs designed for the modern economy. Study online, work in parallel.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {mbaPrograms.map(prog => (
            <div key={prog.title} className="card p-6 hover:-translate-y-1">
              <span className="badge bg-brand-50 text-brand-600 mb-3 inline-block">{prog.badge}</span>
              <h3 className="font-display font-bold text-xl text-gray-900 mb-2">{prog.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1"><Clock size={13} />{prog.duration}</span>
                <span className="flex items-center gap-1"><Users size={13} />{prog.students}+ students</span>
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
                <Link to="/contact" className="btn-primary text-sm py-2">Apply Now</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Certifications Page
const certs = [
  { icon: '💻', title: 'Full Stack Developer', issuer: 'Skylent + AWS', duration: '6 months', level: 'Professional' },
  { icon: '📊', title: 'Data Science Professional', issuer: 'Skylent + IBM', duration: '8 months', level: 'Expert' },
  { icon: '📱', title: 'Digital Marketing Certified', issuer: 'Skylent + Google', duration: '4 months', level: 'Associate' },
  { icon: '🎨', title: 'UI/UX Design Certified', issuer: 'Skylent + Figma', duration: '5 months', level: 'Professional' },
  { icon: '☁️', title: 'Cloud Practitioner', issuer: 'Skylent + AWS', duration: '3 months', level: 'Foundational' },
  { icon: '🔐', title: 'Cybersecurity Analyst', issuer: 'Skylent + CompTIA', duration: '6 months', level: 'Professional' },
];

export function CertificationsPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="mesh-bg border-b border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl font-bold text-gray-900 mb-4">Industry Certifications</h1>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto">Get certified by recognized industry leaders. Our dual certifications are accepted globally.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map(cert => (
            <div key={cert.title} className="card p-5 hover:-translate-y-1 cursor-pointer group">
              <div className="text-4xl mb-4">{cert.icon}</div>
              <span className="badge bg-brand-50 text-brand-600 text-xs mb-2 inline-block">{cert.level}</span>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-brand-600 transition-colors">{cert.title}</h3>
              <p className="text-sm text-gray-500 mb-2">Issued by: <span className="font-medium text-gray-700">{cert.issuer}</span></p>
              <p className="text-xs text-gray-400 flex items-center gap-1"><Clock size={11} />{cert.duration} program</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Placements Page
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
      <div className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl font-bold text-white mb-4">Placement Record</h1>
          <p className="text-white/70 text-xl mb-8">Our students don't just learn — they land jobs at top companies.</p>
          <div className="flex flex-wrap justify-center gap-8">
            {[['500+','Students Placed'],['₹12 LPA','Highest Package'],['95%','Placement Rate'],['50+','Partner Companies']].map(([val,lbl]) => (
              <div key={lbl} className="text-center">
                <div className="font-display font-bold text-4xl text-white">{val}</div>
                <div className="text-white/60 text-sm mt-1">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="section-title text-center mb-10">Recent Placements</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {placedStudents.map(s => (
            <div key={s.name} className="card p-5 flex items-center gap-4">
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

// About Page
export function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="mesh-bg border-b border-gray-100 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl font-bold text-gray-900 mb-4">About Skylent Global</h1>
          <p className="text-gray-500 text-xl">India's fastest-growing skill-development platform, built for the future of work.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-4">Skylent Global was founded with a singular mission: to bridge the gap between education and employment in India. We believe that talent is everywhere, but opportunity isn't — and we're changing that.</p>
            <p className="text-gray-600 leading-relaxed">Our programs are designed in close collaboration with hiring partners to ensure every graduate walks out job-ready, not just degree-holding.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[['500+','Students Trained'],['50+','Hiring Partners'],['95%','Placement Rate'],['₹6-12 LPA','Avg Package']].map(([val,lbl]) => (
              <div key={lbl} className="card p-5 text-center">
                <div className="font-display font-bold text-3xl text-brand-500">{val}</div>
                <div className="text-gray-500 text-sm mt-1">{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-950 rounded-3xl p-10 text-center text-white">
          <h2 className="font-display text-3xl font-bold mb-4">Ready to Join Skylent?</h2>
          <p className="text-gray-400 mb-6">Take the first step toward your dream career today.</p>
          <a href="https://skylent-global-demo.vercel.app/admin" target="_blank" rel="noopener noreferrer" className="btn-accent inline-flex items-center gap-2">Get Started Free <ArrowRight size={16} /></a>
        </div>
      </div>
    </div>
  );
}

// Contact Page
export function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="mesh-bg border-b border-gray-100 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-500 text-xl">Have questions? Our admissions team is here to help.</p>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Talk to an Advisor</h2>
            <div className="space-y-4">
              {['name','email','phone'].map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 capitalize">{field === 'phone' ? 'Phone Number' : field === 'name' ? 'Full Name' : 'Email'}</label>
                  <input type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'} className="input-field" placeholder={field === 'email' ? 'you@example.com' : field === 'phone' ? '+91 98765 43210' : 'Your full name'} />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Program of Interest</label>
                <select className="input-field bg-white">
                  <option>Select a program</option>
                  <option>Full Stack Development</option>
                  <option>Data Science & ML</option>
                  <option>Digital Marketing</option>
                  <option>MBA Programs</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea rows={4} className="input-field resize-none" placeholder="Tell us about your goals..." />
              </div>
              <button className="btn-primary w-full flex items-center justify-center gap-2">
                Send Message <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Contact Info</h2>
            <div className="space-y-4 mb-8">
              {[
                { label: 'Email', value: 'admissions@skylent.com', icon: '📧' },
                { label: 'Phone', value: '+91 98765 43210', icon: '📞' },
                { label: 'WhatsApp', value: '+91 98765 43210', icon: '💬' },
                { label: 'Office', value: 'Bengaluru, Karnataka, India', icon: '📍' },
                { label: 'Hours', value: 'Mon–Sat, 9:00 AM – 7:00 PM IST', icon: '🕘' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{item.label}</p>
                    <p className="text-gray-800 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="card p-5 bg-brand-50 border border-brand-100">
              <h3 className="font-semibold text-brand-900 mb-2">Free Career Counselling</h3>
              <p className="text-brand-700 text-sm mb-3">Schedule a free 30-minute session with our career advisor.</p>
              <button className="btn-primary text-sm py-2.5 w-full">Book Free Session</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
