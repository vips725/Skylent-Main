import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Play, Star, Users, TrendingUp, Award, CheckCircle2,
  BookOpen, Briefcase, Globe, ChevronRight, Quote, GraduationCap,
  BarChart3, Zap, Shield, Target
} from 'lucide-react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';

const stats = [
  { value: '500+', label: 'Students Trained', icon: Users },
  { value: '₹12 LPA', label: 'Highest Package', icon: TrendingUp },
  { value: '50+', label: 'Hiring Partners', icon: Briefcase },
  { value: '95%', label: 'Placement Rate', icon: Award },
];

const partners = [
  'Google', 'Microsoft', 'Amazon', 'Flipkart', 'Infosys', 'TCS', 'Wipro', 'Accenture', 'Deloitte', 'IBM'
];

const testimonials = [
  { name: 'Arjun Mehta', role: 'Software Engineer @ Google', text: 'Skylent completely transformed my career. The full stack program was intense but incredibly rewarding. Landed my dream job 3 months after completing it!', rating: 5, avatar: 'AM', pkg: '₹14 LPA' },
  { name: 'Priya Nair', role: 'Data Analyst @ Microsoft', text: 'The data science curriculum is top-notch. Real projects, industry mentors, and an incredible placement team. Best investment of my life!', rating: 5, avatar: 'PN', pkg: '₹11 LPA' },
  { name: 'Rahul Sharma', role: 'Digital Marketer @ Flipkart', text: 'From zero marketing knowledge to leading campaigns for a top company. Skylent gave me the skills and confidence to succeed.', rating: 5, avatar: 'RS', pkg: '₹8 LPA' },
  { name: 'Sneha Kulkarni', role: 'UX Designer @ Swiggy', text: 'The mentorship program was outstanding. My mentor was a senior designer at a Fortune 500 company. Invaluable experience!', rating: 5, avatar: 'SK', pkg: '₹9 LPA' },
];

const programs = [
  { icon: '💻', title: 'Full Stack Development', duration: '6 months', students: '1.2K+', badge: 'Most Popular' },
  { icon: '📊', title: 'Data Science & AI', duration: '8 months', students: '980+', badge: 'Hot' },
  { icon: '📱', title: 'Digital Marketing', duration: '4 months', students: '2.1K+', badge: 'Trending' },
  { icon: '🎓', title: 'MBA Programs', duration: '24 months', students: '560+', badge: 'Premium' },
  { icon: '🎨', title: 'UI/UX Design', duration: '5 months', students: '870+', badge: 'New' },
  { icon: '☁️', title: 'Cloud & DevOps', duration: '6 months', students: '720+', badge: 'In Demand' },
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
      <section className="gradient-hero min-h-screen flex items-center relative pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/3 rounded-full border border-white/5" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white/90 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>🎉 500+ Students Placed in Top Companies</span>
            </div>
            <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-6">
              Build Skills.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">Build Careers.</span>
            </h1>
            <p className="text-white/70 text-xl leading-relaxed mb-8 max-w-lg">
              India's fastest-growing edtech platform. Industry-ready programs with guaranteed placement support. Average package: ₹6–12 LPA.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link to="/courses" className="btn-accent flex items-center gap-2 text-base">
                Explore Programs <ArrowRight size={18} />
              </Link>
              <button
                onClick={() => setVideoPlay(true)}
                className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200"
              >
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Play size={14} className="text-white ml-0.5" />
                </div>
                Watch Success Stories
              </button>
            </div>
            {/* Mini stats */}
            <div className="flex flex-wrap gap-6">
              {[
                { val: '500+', lbl: 'Students' },
                { val: '₹12 LPA', lbl: 'Top Package' },
                { val: '50+', lbl: 'Partners' },
              ].map(s => (
                <div key={s.lbl}>
                  <div className="font-display font-bold text-2xl text-white">{s.val}</div>
                  <div className="text-white/50 text-sm">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – floating cards */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Main card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 animate-float">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <GraduationCap size={24} className="text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Full Stack Development</p>
                    <p className="text-white/60 text-sm">6 Months Program</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}
                    <span className="text-white/70 text-xs ml-1">4.9</span>
                  </div>
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">Enroll Now</span>
                </div>
                <div className="bg-white/10 rounded-xl p-3">
                  <div className="text-white/50 text-xs mb-1">Course Progress</div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-white/10 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-400 to-yellow-400 h-2 rounded-full" style={{ width: '68%' }} />
                    </div>
                    <span className="text-white text-xs font-semibold">68%</span>
                  </div>
                </div>
              </div>

              {/* Floating badge - placement */}
              <div className="absolute -bottom-4 -left-8 bg-white rounded-2xl shadow-2xl p-3 flex items-center gap-2.5 animate-float" style={{ animationDelay: '1s' }}>
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">Placement Secured!</p>
                  <p className="text-xs text-gray-500">₹11 LPA @ Amazon</p>
                </div>
              </div>

              {/* Floating badge - students */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-2xl p-3 animate-float" style={{ animationDelay: '2s' }}>
                <div className="flex items-center gap-1 mb-1">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-brand-400 to-brand-600 border-2 border-white -ml-1 first:ml-0" />
                  ))}
                  <span className="text-xs font-semibold text-gray-700 ml-1">+490</span>
                </div>
                <p className="text-xs text-gray-500">Students Enrolled</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-center justify-center">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ─── PARTNERS TICKER ─── */}
      <section className="bg-gray-50 border-y border-gray-200 py-6 overflow-hidden">
        <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-4">Trusted by graduates working at</p>
        <div className="flex items-center gap-12 animate-[marquee_20s_linear_infinite]">
          {[...partners, ...partners].map((p, i) => (
            <span key={i} className="text-gray-400 font-semibold text-sm whitespace-nowrap hover:text-brand-500 transition-colors cursor-default">{p}</span>
          ))}
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center group">
                <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-brand-500 transition-colors duration-300">
                  <Icon size={22} className="text-brand-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="font-display font-bold text-3xl text-gray-900">{value}</div>
                <div className="text-gray-500 text-sm mt-1">{label}</div>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
            {programs.map((prog) => (
              <Link to="/courses" key={prog.title} className="card p-5 group hover:-translate-y-1 cursor-pointer">
                <div className="text-3xl mb-3">{prog.icon}</div>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-brand-600 transition-colors">{prog.title}</h3>
                  <span className="badge bg-brand-50 text-brand-600 text-[10px] ml-2 shrink-0">{prog.badge}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><Clock size={10} />{prog.duration}</span>
                  <span className="flex items-center gap-1"><Users size={10} />{prog.students}</span>
                </div>
                <div className="flex items-center gap-1 mt-3 text-brand-500 text-xs font-semibold group-hover:gap-2 transition-all">
                  Learn More <ChevronRight size={12} />
                </div>
              </Link>
            ))}
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
      <section className="py-20 bg-gray-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-400 font-semibold text-sm uppercase tracking-wider">Why Skylent?</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-purple-400">Succeed</span></h2>
            <p className="text-gray-400 text-lg mt-3 max-w-2xl mx-auto">We don't just teach — we transform careers with industry partnerships, mentorship, and guaranteed placement support.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-brand-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-brand-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-500/30 transition-colors">
                  <Icon size={22} className="text-brand-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 mesh-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-500 font-semibold text-sm uppercase tracking-wider">Success Stories</span>
            <h2 className="section-title mt-2">Students Who Made It Happen</h2>
            <p className="section-subtitle mx-auto">Real stories from our graduates who landed their dream jobs.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-5 hover:-translate-y-1">
                <Quote size={24} className="text-brand-200 mb-3" />
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />)}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                  <span className="ml-auto text-xs bg-green-50 text-green-700 font-semibold px-2 py-1 rounded-lg">{t.pkg}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Start Your<br /><span className="text-orange-300">Career Journey?</span>
          </h2>
          <p className="text-white/70 text-xl mb-8">
            Join 500+ students who have transformed their careers. Applications are open now.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/signup" className="btn-accent text-base px-8 py-4 flex items-center gap-2">
              Apply Now — It's Free <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-all text-base">
              Talk to Counsellor
            </Link>
          </div>
          <p className="text-white/40 text-sm mt-6">No credit card required • Free career consultation included</p>
        </div>
      </section>
    </div>
  );
}

function Clock(props) {
  const { size = 16, ...rest } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...rest}>
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
