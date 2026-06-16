import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, CheckCircle2, Mail, Phone, MapPin, ChevronDown, ArrowRight, GraduationCap } from 'lucide-react';

const programs = [
  'Full Stack Development',
  'Data Science & ML',
  'Digital Marketing',
  'UI/UX Design',
  'Cloud & DevOps',
  'MBA Programs',
  'Cybersecurity',
  'Other',
];

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('about'); // 'about' | 'contact'

  return (
    <div className="min-h-screen pt-20">

      {/* ─── Section 1: Hero — "About Skylent" ─── */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-sky-50 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-6">
          <div className="text-center mb-6">
            <h1 className="font-display text-5xl font-bold text-gray-900 mb-3">About Skylent</h1>
            <p className="text-gray-500 text-xl">India's fastest-growing skill-development platform, built for the future of work.</p>
          </div>

          {/* CSS Illustration — 3 people around table with laptop */}
          <div className="py-6 overflow-hidden">
            <div className="max-w-xl mx-auto relative h-56 md:h-72 flex items-end justify-center">
              {/* Background glows */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-100/60 rounded-full blur-3xl" />
              <div className="absolute top-12 left-8 w-48 h-48 bg-blue-100/50 rounded-full blur-3xl" />
              <div className="absolute top-12 right-8 w-48 h-48 bg-sky-100/50 rounded-full blur-3xl" />

              {/* Main scene */}
              <div className="relative flex items-end justify-center gap-2 z-10">

                {/* Person 1 (left) */}
                <div className="relative flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-blue-200 border-2 border-blue-300 relative z-10">
                    <div className="absolute inset-0.5 rounded-full bg-blue-50" />
                  </div>
                  <div className="w-10 h-14 bg-blue-400 rounded-t-xl -mt-1 relative z-10" />
                  <div className="absolute bottom-8 left-6 w-8 h-2 bg-blue-300 rounded-full rotate-[-25deg] origin-left z-0" />
                </div>

                {/* Table + Laptop group */}
                <div className="relative flex flex-col items-center mx-1">
                  {/* Person 3 (back/center) */}
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-sky-200 border-2 border-sky-300 relative z-10">
                      <div className="absolute inset-0.5 rounded-full bg-sky-50" />
                    </div>
                    <div className="w-10 h-16 bg-sky-400 rounded-t-xl -mt-1 relative z-10" />
                  </div>

                  {/* Laptop */}
                  <div className="relative z-20 mb-[-2px]">
                    <div className="w-28 h-18 bg-blue-700 rounded-lg border-4 border-blue-600 p-2">
                      <div className="space-y-1">
                        <div className="h-1 bg-blue-400/60 rounded w-3/4" />
                        <div className="h-1 bg-blue-300/60 rounded w-full" />
                        <div className="h-1 bg-blue-400/60 rounded w-5/6" />
                        <div className="h-1 bg-sky-400/60 rounded w-2/3" />
                      </div>
                    </div>
                    <div className="w-24 h-3 bg-blue-600 rounded-b-lg mx-auto" />
                  </div>

                  {/* Table surface */}
                  <div className="w-48 h-5 bg-blue-400 rounded-xl shadow-md relative z-10" />
                </div>

                {/* Person 2 (right) */}
                <div className="relative flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-sky-200 border-2 border-sky-300 relative z-10">
                    <div className="absolute inset-0.5 rounded-full bg-sky-50" />
                  </div>
                  <div className="w-10 h-14 bg-sky-400 rounded-t-xl -mt-1 relative z-10" />
                  <div className="absolute bottom-8 right-6 w-8 h-2 bg-sky-300 rounded-full rotate-[25deg] origin-right z-0" />
                </div>
              </div>

              {/* Floating badges */}
              <div
                className="absolute top-2 right-2 bg-white rounded-xl shadow-lg px-3 py-2 animate-float border border-gray-100"
                style={{ animationDelay: '0.5s' }}
              >
                <div className="flex items-center gap-1.5">
                  <Users size={12} className="text-blue-500" />
                  <span className="text-[10px] font-bold text-gray-800">Teamwork</span>
                </div>
              </div>
              <div
                className="absolute bottom-12 left-2 bg-white rounded-xl shadow-lg px-3 py-2 animate-float border border-gray-100"
                style={{ animationDelay: '1.5s' }}
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-blue-500" />
                  <span className="text-[10px] font-bold text-gray-800">Collaborate</span>
                </div>
              </div>

              {/* Sparkles */}
              <div className="absolute top-4 left-16 w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
              <div className="absolute bottom-20 right-12 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
              <div className="absolute top-12 left-1/2 w-2 h-2 bg-sky-300 rounded-full animate-pulse" style={{ animationDelay: '1.2s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* ─── Section 2: Toggle cards ─── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* About Us card */}
          <button
            onClick={() => setActiveTab('about')}
            className={`card p-6 text-left cursor-pointer transition-all duration-200 border-2 ${
              activeTab === 'about'
                ? 'bg-blue-50 border-blue-400 shadow-md'
                : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-sm'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                activeTab === 'about' ? 'bg-blue-100' : 'bg-gray-50'
              }`}>
                <Users size={24} className={activeTab === 'about' ? 'text-blue-500' : 'text-gray-400'} />
              </div>
              <div>
                <h3 className={`font-semibold text-lg mb-1 ${activeTab === 'about' ? 'text-blue-700' : 'text-gray-900'}`}>
                  About Us
                </h3>
                <p className="text-gray-500 text-sm">
                  Learn about our mission, values, and what drives us forward.
                </p>
              </div>
            </div>
          </button>

          {/* Contact card */}
          <button
            onClick={() => setActiveTab('contact')}
            className={`card p-6 text-left cursor-pointer transition-all duration-200 border-2 ${
              activeTab === 'contact'
                ? 'bg-blue-50 border-blue-400 shadow-md'
                : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-sm'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                activeTab === 'contact' ? 'bg-blue-100' : 'bg-gray-50'
              }`}>
                <Mail size={24} className={activeTab === 'contact' ? 'text-blue-500' : 'text-gray-400'} />
              </div>
              <div>
                <h3 className={`font-semibold text-lg mb-1 ${activeTab === 'contact' ? 'text-blue-700' : 'text-gray-900'}`}>
                  Contact
                </h3>
                <p className="text-gray-500 text-sm">
                  Get in touch with our admissions and support teams.
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* ─── Section 3: Content area ─── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* About Us content */}
        {activeTab === 'about' && (
          <div className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
              {/* Left text */}
              <div>
                <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Skylent Global was founded with a singular mission: to bridge the gap between education and employment in India. We believe that talent is everywhere, but opportunity isn't — and we're changing that.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our programs are designed in close collaboration with hiring partners to ensure every graduate walks out job-ready, not just degree-holding.
                </p>
              </div>

              {/* Right stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['500+', 'Students Trained'],
                  ['50+', 'Hiring Partners'],
                  ['95%', 'Placement Rate'],
                  ['₹6–12 LPA', 'Avg Package'],
                ].map(([val, lbl]) => (
                  <div key={lbl} className="card p-5 text-center">
                    <div className="font-display font-bold text-3xl text-blue-500">{val}</div>
                    <div className="text-gray-500 text-sm mt-1">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA section */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-10 text-center text-white">
              <h2 className="font-display text-3xl font-bold mb-4">Ready to Join Skylent?</h2>
              <p className="text-gray-400 mb-6">Take the first step toward your dream career today.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/signup" className="btn-accent inline-flex items-center gap-2">
                  Get Started Free <ArrowRight size={16} />
                </Link>
                <Link to="/support" className="bg-transparent hover:bg-white/10 border-2 border-white/30 text-white font-semibold px-6 py-2.5 rounded-xl transition-all text-sm">
                  Talk to Counsellor
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Contact content */}
        {activeTab === 'contact' && (
          <div className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-10">
              {/* Left: Form */}
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Talk to an Advisor</h2>
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      className="input-field"
                      placeholder="you@example.com"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      className="input-field"
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  {/* Program dropdown */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Program of Interest</label>
                    <div className="relative">
                      <select className="input-field bg-white appearance-none w-full pr-10">
                        <option value="">Select a program</option>
                        {programs.map(p => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Tell us about your goals..."
                    />
                  </div>

                  {/* Submit */}
                  <button className="btn-primary w-full flex items-center justify-center gap-2">
                    Send Message <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Right: Contact info */}
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Contact Info</h2>
                <div className="space-y-4 mb-8">
                  {/* Email */}
                  <div className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Email</p>
                      <p className="text-gray-800 font-medium">admissions@skylent.com</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Phone</p>
                      <p className="text-gray-800 font-medium">+91 98765 43210</p>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center shrink-0">
                      <Phone size={18} className="text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">WhatsApp</p>
                      <p className="text-gray-800 font-medium">+91 98765 43210</p>
                    </div>
                  </div>

                  {/* Office */}
                  <div className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                    <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-sky-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Office</p>
                      <p className="text-gray-800 font-medium">Bengaluru, Karnataka, India</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                    <div className="w-10 h-10 bg-sky-50 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-sky-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Hours</p>
                      <p className="text-gray-800 font-medium">Mon–Sat, 9:00 AM – 7:00 PM IST</p>
                    </div>
                  </div>
                </div>

                {/* Free Career Counselling */}
                <div className="card p-5 bg-blue-50 border border-blue-100">
                  <h3 className="font-semibold text-blue-900 mb-2">Free Career Counselling</h3>
                  <p className="text-blue-700 text-sm mb-3">
                    Schedule a free 30-minute session with our career advisor.
                  </p>
                  <button className="btn-primary text-sm py-2.5 w-full">Book Free Session</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}