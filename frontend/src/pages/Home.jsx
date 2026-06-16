import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Play, Star, Users, TrendingUp, Award, CheckCircle2,
  ChevronRight, Quote, GraduationCap,
  BarChart3, Zap, Shield, Target, Briefcase, Video, FolderKanban, Clock, LayoutGrid,
  Code2, Database, Smartphone, GraduationCap as GradIcon, Palette, Cloud
} from 'lucide-react';

import axios from 'axios';
import CourseCard from '../components/CourseCard';


const MicrosoftLogo = () => (
  <svg height="26" viewBox="0 0 200 42" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="19" height="19" fill="#F25022"/>
    <rect x="21" y="0" width="19" height="19" fill="#7FBA00"/>
    <rect x="0" y="21" width="19" height="19" fill="#00A4EF"/>
    <rect x="21" y="21" width="19" height="19" fill="#FFB900"/>
    <text x="48" y="31" fontSize="26" fontWeight="600" fontFamily="'Segoe UI',sans-serif" fill="#737373">Microsoft</text>
  </svg>
);

const InfosysLogo = () => (
  <svg width="140" height="40" viewBox="0 0 180 50">
        <text
          x="5"
          y="35"
          fontFamily="Arial,sans-serif"
          fontSize="28"
          fontStyle="italic"
          fill="#007CC3"
        >
          Infosys
        </text>
      </svg>
);

const TCSLogo = () => (
  <svg width="90" height="40" viewBox="0 0 120 50">
    <text
      x="5"
      y="35"
      fontFamily="Arial Black, sans-serif"
      fontSize="32"
      fontWeight="900"
      fill="#E31837"
    >
      TCS
    </text>
  </svg>
);

const WiproLogo = () => (
  <svg height="28" viewBox="0 0 150 40" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="18" fill="#341A5E"/>
    <circle cx="20" cy="20" r="10" fill="#9B59B6"/>
    <circle cx="20" cy="20" r="5" fill="#F4A623"/>
    <text x="44" y="27" fontSize="24" fontWeight="700" fontFamily="Arial,sans-serif" fill="#341A5E">Wipro</text>
  </svg>
);

const AccentureLogo = () => (
  <svg height="28" viewBox="0 0 200 40" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="28" fontSize="24" fontWeight="700" fontFamily="Arial,sans-serif" fill="#A100FF">Accenture</text>
    <polygon points="175,2 183,2 179,10" fill="#A100FF"/>
  </svg>
);

const DeloitteLogo = () => (
  <svg height="28" viewBox="0 0 170 40" xmlns="http://www.w3.org/2000/svg">
    <text x="0" y="28" fontSize="24" fontWeight="700" fontFamily="Arial,sans-serif" fill="#86BC25">Deloitte</text>
    <circle cx="157" cy="10" r="6" fill="#86BC25"/>
  </svg>
);

const IBMLogo = () => (
 <svg width="90" height="40" viewBox="0 0 120 50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="ibmText">
      <text x="5" y="38"
            font-family="Arial Black, sans-serif"
            font-size="40"
            font-weight="900">
        IBM
      </text>
    </clipPath>
  </defs>

  <g clip-path="url(#ibmText)" fill="#1261FE">
    <rect x="0" y="2" width="120" height="3"/>
    <rect x="0" y="8" width="120" height="3"/>
    <rect x="0" y="14" width="120" height="3"/>
    <rect x="0" y="20" width="120" height="3"/>
    <rect x="0" y="26" width="120" height="3"/>
    <rect x="0" y="32" width="120" height="3"/>
    <rect x="0" y="38" width="120" height="3"/>
    <rect x="0" y="44" width="120" height="3"/>
  </g>
</svg>
);

const logos = [ MicrosoftLogo, InfosysLogo, TCSLogo, WiproLogo, AccentureLogo, DeloitteLogo, IBMLogo];

const testimonials = [
  { name: 'Arjun Mehta', role: 'Software Engineer @ Google', text: 'Skylent completely transformed my career. The full stack program was intense but incredibly rewarding. Landed my dream job 3 months after completing it!', rating: 5, avatar: 'AM', pkg: '₹14 LPA' },
  { name: 'Priya Nair', role: 'Data Analyst @ Microsoft', text: 'The data science curriculum is top-notch. Real projects, industry mentors, and an incredible placement team. Best investment of my life!', rating: 5, avatar: 'PN', pkg: '₹11 LPA' },
  { name: 'Rahul Sharma', role: 'Digital Marketer @ Flipkart', text: 'From zero marketing knowledge to leading campaigns for a top company. Skylent gave me the skills and confidence to succeed.', rating: 5, avatar: 'RS', pkg: '₹8 LPA' },
  { name: 'Sneha Kulkarni', role: 'UX Designer @ Swiggy', text: 'The mentorship program was outstanding. My mentor was a senior designer at a Fortune 500 company. Invaluable experience!', rating: 5, avatar: 'SK', pkg: '₹9 LPA' },
];

const programs = [
  { icon: Code2, title: 'Full Stack Development', duration: '6 months', students: '1.2K+', badge: 'Most Popular', badgeColor: 'bg-blue-50 text-blue-600' },
  { icon: Database, title: 'Data Science & AI', duration: '8 months', students: '980+', badge: 'Hot', badgeColor: 'bg-sky-50 text-sky-600' },
  { icon: Smartphone, title: 'Digital Marketing', duration: '4 months', students: '2.1K+', badge: 'Trending', badgeColor: 'bg-blue-50 text-blue-600' },
  { icon: GradIcon, title: 'MBA Programs', duration: '24 months', students: '560+', badge: 'Premium', badgeColor: 'bg-sky-50 text-sky-600' },
  { icon: Palette, title: 'UI/UX Design', duration: '5 months', students: '870+', badge: 'New', badgeColor: 'bg-blue-50 text-blue-600' },
  { icon: Cloud, title: 'Cloud & DevOps', duration: '6 months', students: '720+', badge: 'In Demand', badgeColor: 'bg-sky-50 text-sky-600' },
];

const whyUs = [
  { icon: Target, title: 'Industry-First Curriculum', desc: 'Designed with 50+ hiring partners to match exactly what companies need.' },
  { icon: Users, title: '1:1 Mentorship', desc: 'Get paired with a working professional from your target industry.' },
  { icon: Briefcase, title: 'Guaranteed Placement', desc: 'We don\'t stop until you get placed. Our team works tirelessly for you.' },
  { icon: Zap, title: 'Live Projects', desc: 'Work on real client projects and build a portfolio that stands out.' },
  { icon: BarChart3, title: 'Career Analytics', desc: 'Track your learning progress and career readiness in real time.' },
  { icon: Shield, title: 'Industry Certifications', desc: 'Get certified by recognized industry bodies and top tech companies.' },
];

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [videoPlay, setVideoPlay] = useState(false);

  useEffect(() => {
    axios.get('/api/courses').then(r => setCourses(r.data.courses.slice(0, 3))).catch(() => {});
  }, []);

  return (
    <div className="overflow-hidden">

      {/* ─── HERO ─── */}
      <section className="gradient-hero min-h-screen flex items-center relative pt-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="animate-slide-up">
            <div className="mb-5">
              <img src="/skyy.png" alt="Skylent" className="h-24 w-auto mix-blend-multiply" />
            </div>
            <div className="inline-flex items-center gap-2 bg-brand-100 border border-brand-200 rounded-full px-4 py-2 text-sm text-brand-700 mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>Get Placed in Top Companies</span>
            </div>
            <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Build Skills.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-sky-600">Build Careers.</span>
            </h1>
            <p className="text-gray-600 text-xl leading-relaxed mb-8 max-w-lg">
              India's fastest-growing edtech platform. Industry-ready programs with guaranteed placement support. Average package: 6-12 LPA.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/courses" className="btn-primary flex items-center gap-2 text-base">
                Explore Programs <ArrowRight size={18} />
              </Link>
              <button
                onClick={() => setVideoPlay(true)}
                className="flex items-center gap-3 bg-white hover:bg-blue-50 border border-blue-200 text-blue-700 font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-sm"
              >
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Play size={14} className="text-white ml-0.5" />
                </div>
                Watch Success Stories
              </button>
            </div>
            {/* Benefits */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: Award, label: 'Industry Aligned' },
                { icon: FolderKanban, label: 'Project Based' },
                { icon: LayoutGrid, label: 'Structured' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-brand-200 rounded-xl px-4 py-2.5 text-sm text-brand-700 shadow-sm">
                  <Icon size={16} className="text-brand-500" />
                  <span className="font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right - CSS Illustration of girl studying at PC */}
          <div className="relative flex items-center justify-center mt-10 lg:mt-0 scale-[0.75] lg:scale-100">
            <div className="relative w-full max-w-md">
              {/* Desk surface */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[380px] h-[60px] bg-brand-200/40 rounded-full blur-xl" />

              {/* Person (stylized) */}
              <div className="absolute bottom-[80px] left-[60px]">
                {/* Head */}
                <div className="w-14 h-14 bg-brand-100 rounded-full border-4 border-brand-300 relative">
                  {/* Hair */}
                  <div className="absolute -top-1 left-1 w-14 h-10 bg-brand-400 rounded-t-full" />
                  {/* Face */}
                  <div className="absolute top-4 left-3 w-8 h-6 bg-brand-200/50 rounded-full" />
                </div>
                {/* Body */}
                <div className="w-16 h-20 bg-brand-400 rounded-t-2xl -mt-2 ml-[-4px]" />
              </div>

              {/* Chair */}
              <div className="absolute bottom-[60px] left-[40px]">
                <div className="w-20 h-24 bg-brand-300/60 rounded-2xl" />
                <div className="w-6 h-16 bg-brand-400 rounded-lg absolute -bottom-12 left-[50%] -translate-x-1/2" />
              </div>

              {/* PC / Laptop */}
              <div className="absolute bottom-[100px] right-[40px]">
                {/* Screen */}
                <div className="w-48 h-32 bg-brand-700 rounded-xl relative border-4 border-brand-600 shadow-2xl">
                  {/* Screen content - code lines */}
                  <div className="absolute top-3 left-3 right-3 space-y-1.5">
                    <div className="h-1.5 bg-brand-400/60 rounded w-3/4" />
                    <div className="h-1.5 bg-brand-300/40 rounded w-full" />
                    <div className="h-1.5 bg-brand-400/50 rounded w-5/6" />
                    <div className="h-1.5 bg-sky-400/60 rounded w-2/3" />
                    <div className="h-1.5 bg-brand-300/40 rounded w-4/5" />
                  </div>
                  {/* Floating course card coming out of screen */}
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-xl p-3 w-44 animate-float">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-brand-100 rounded-lg flex items-center justify-center">
                        <Code2 size={14} className="text-brand-600" />
                      </div>
                      <span className="text-[10px] font-semibold text-gray-800 leading-tight">Master in CS(Complete Course)</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {[1,2,3,4,5].map(i => <Star key={i} size={8} className="fill-yellow-400 text-yellow-400" />)}
                      <span className="text-[9px] text-gray-500 ml-0.5">4.9</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-1.5">
                      <div className="text-[8px] text-gray-500 mb-1">Your Progress</div>
                      <div className="flex items-center gap-1.5">
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                          <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: '68%' }} />
                        </div>
                        <span className="text-[8px] font-semibold text-brand-500">68%</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Keyboard */}
                <div className="w-36 h-4 bg-brand-600 rounded-b-lg mt-[-2px] mx-auto shadow-lg" />
              </div>

              {/* Floating placement badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2.5 animate-float border border-gray-100" style={{ animationDelay: '1s' }}>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">Get Placed AT</p>
                  <p className="text-xs text-gray-500">Top Companies</p>
                </div>
              </div>

              {/* Floating students badge */}
              <div className="absolute -top-2 -right-8 bg-white rounded-2xl shadow-xl p-3 animate-float border border-gray-100" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 border-2 border-white -ml-1 first:ml-0" />
                  ))}
                  <span className="text-xs font-semibold text-gray-700 ml-1">HIGH</span>
                </div>
                <p className="text-xs text-gray-500"> Enrollenments</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-brand-300 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-3 bg-brand-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ─── PARTNERS TICKER ─── */}
<section className="bg-white border-y border-gray-100 py-6 overflow-hidden">
  <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-4 font-medium">
    Trusted by graduates working at
  </p>
  <div
    className="relative"
    style={{
      maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
      WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
    }}
  >
    <div className="flex items-center animate-marquee whitespace-nowrap">
      {[...logos, ...logos].map((Logo, i) => (
        <div key={i} className="inline-flex items-center justify-center px-10 h-14 shrink-0">
          <Logo />
        </div>
      ))}
    </div>
  </div>
</section>

      {/* ─── FEATURES ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-brand-500 font-semibold text-sm uppercase tracking-wider">What We Offer</span>
            <h2 className="section-title mt-2">Why Choose Skylent?</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Video, title: 'Live Classes', desc: 'Real-time interactive sessions with mentors' },
              { icon: FolderKanban, title: 'Hands-on Projects', desc: 'Build real-world portfolios from day one' },
              { icon: Users, title: 'Industry Mentors', desc: 'Learn directly from top professionals' },
              { icon: Briefcase, title: 'Career Support', desc: 'Placement assistance until you get hired' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 text-center">
                <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={28} className="text-brand-600" />
                </div>
                <h3 className="font-display font-bold text-xl text-gray-900">{title}</h3>
                <p className="text-gray-500 text-sm mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROGRAMS ─── */}
      <section className="py-20 mesh-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-500 font-semibold text-sm uppercase tracking-wider">Our Programs</span>
            <h2 className="section-title mt-2">Programs Built for the <span className="text-brand-500">Real World</span></h2>
            <p className="section-subtitle mx-auto">Every program is designed in collaboration with top hiring partners to ensure 100% industry relevance.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {programs.map((prog) => {
              const Icon = prog.icon;
              return (
                <Link 
                  to="/courses" 
                  key={prog.title} 
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 cursor-pointer p-6 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-brand-100 transition-colors">
                    <Icon size={26} className="text-blue-600" />
                  </div>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-base leading-tight group-hover:text-brand-600 transition-colors pr-2">{prog.title}</h3>
                    <span className={`badge ${prog.badgeColor} shrink-0`}>{prog.badge}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5"><Clock size={14} />{prog.duration}</span>
                    <span className="flex items-center gap-1.5"><Users size={14} />{prog.students}</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-500 text-sm font-semibold group-hover:gap-2 transition-all">
                    Learn More <ChevronRight size={16} />
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="text-center">
            <Link to="/courses" className="btn-primary inline-flex items-center gap-2">
              View All Programs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FEATURED COURSES ─── */}
      {courses.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="text-brand-500 font-semibold text-sm uppercase tracking-wider">Featured</span>
                <h2 className="section-title mt-1">Top Rated Courses</h2>
              </div>
              <Link to="/courses" className="hidden md:flex items-center gap-1 text-brand-500 font-semibold hover:gap-2 transition-all text-sm">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {courses.map(course => <CourseCard key={course.id} course={course} />)}
            </div>
          </div>
        </section>
      )}

      {/* ─── WHY US ─── */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">Why Skylent?</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">Succeed</span></h2>
            <p className="text-gray-400 text-lg mt-3 max-w-2xl mx-auto">We don't just teach — we transform careers with industry partnerships, mentorship, and guaranteed placement support.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-brand-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                  <Icon size={22} className="text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 mesh-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-500 font-semibold text-sm uppercase tracking-wider">Success Stories</span>
            <h2 className="section-title mt-2">Students Who Made It Happen</h2>
            <p className="section-subtitle mx-auto">Real stories from our graduates who landed their dream jobs.</p>
          </div>
        </div>

        {/* Scrolling testimonials */}
        <div className="relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
          <div className="flex gap-6 animate-marquee-slow">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div key={`${t.name}-${i}`} className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <Quote size={24} className="text-brand-200 mb-3" />
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, idx) => <Star key={idx} size={12} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-brand-700 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">{t.avatar}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">{t.name}</p>
                    <p className="text-gray-500 text-xs truncate">{t.role}</p>
                  </div>
                  <span className="ml-auto text-xs bg-green-50 text-green-700 font-semibold px-2.5 py-1 rounded-lg shrink-0">{t.pkg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @keyframes marquee-slow { 
            from { transform: translateX(0) } 
            to { transform: translateX(-50%) } 
          }
          .animate-marquee-slow {
            animation: marquee-slow 35s linear infinite;
          }
        `}</style>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Start Your<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-400">Career Journey?</span>
          </h2>
          <p className="text-gray-300 text-xl mb-8">
            Join 500+ students who have transformed their careers. Applications are open now.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white font-semibold px-8 py-4 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-all text-base">
              Apply Now — It's Free <ArrowRight size={18} />
            </Link>
            <Link to="/support" className="bg-transparent hover:bg-white/10 border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-all text-base">
              Talk to Counsellor
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">No credit card required • Free career consultation included</p>
        </div>
      </section>
    </div>
  );
}
