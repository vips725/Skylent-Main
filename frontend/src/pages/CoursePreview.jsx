import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star, Clock, Users, BarChart2, Globe, CheckCircle, PlayCircle,
  ChevronDown, ChevronUp, BookOpen, Award, Zap, ArrowLeft,
  Share2, Heart, ShieldCheck, Video, FileText, HelpCircle, Code,
  ChevronRight, Lock, Eye
} from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const SAMPLE_CURRICULUM = [
  {
    title: 'Getting Started',
    lessons: [
      { title: 'Welcome & Course Overview', type: 'video', duration: '5:00', preview: true },
      { title: 'Setup Your Environment', type: 'video', duration: '12:00', preview: true },
      { title: 'Introduction Quiz', type: 'quiz', duration: '5:00', preview: false },
    ],
  },
  {
    title: 'Core Concepts',
    lessons: [
      { title: 'Fundamentals Explained', type: 'video', duration: '18:00', preview: false },
      { title: 'Deep Dive - Part 1', type: 'video', duration: '22:00', preview: false },
      { title: 'Deep Dive - Part 2', type: 'video', duration: '20:00', preview: false },
      { title: 'Reading: Core Reference', type: 'text', duration: '10 min', preview: false },
      { title: 'Coding Exercise', type: 'code', duration: '30 min', preview: false },
    ],
  },
  {
    title: 'Advanced Topics',
    lessons: [
      { title: 'Advanced Patterns', type: 'video', duration: '25:00', preview: false },
      { title: 'Real-World Project', type: 'code', duration: '45 min', preview: false },
      { title: 'Final Assessment', type: 'quiz', duration: '20 min', preview: false },
    ],
  },
];

function LessonIcon({ type }) {
  const map = {
    video: { icon: Video, className: 'text-red-400' },
    text: { icon: FileText, className: 'text-blue-400' },
    quiz: { icon: HelpCircle, className: 'text-purple-400' },
    code: { icon: Code, className: 'text-green-400' },
  };
  const { icon: Icon, className } = map[type] || map.video;
  return <Icon size={14} className={className} />;
}

function CurriculumSection({ section, idx, enrolled }) {
  const [open, setOpen] = useState(idx === 0);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3.5 bg-gray-50 hover:bg-gray-100 transition-all text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-600">{idx + 1}</div>
          <span className="font-semibold text-gray-800 text-sm">{section.title}</span>
          <span className="text-xs text-gray-400">{section.lessons.length} lessons</span>
        </div>
        {open ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
      </button>
      {open && (
        <div className="divide-y divide-gray-50">
          {section.lessons.map((lesson, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-all">
              <LessonIcon type={lesson.type} />
              <span className={`flex-1 text-sm ${lesson.preview || enrolled ? 'text-gray-700' : 'text-gray-500'}`}>
                {lesson.title}
              </span>
              {lesson.preview && !enrolled && (
                <span className="text-xs bg-green-100 text-green-600 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Eye size={10} /> Preview
                </span>
              )}
              {!lesson.preview && !enrolled && (
                <Lock size={12} className="text-gray-300" />
              )}
              <span className="text-xs text-gray-400">{lesson.duration}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CoursePreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [expandAll, setExpandAll] = useState(false);

  const curriculum = course?.curriculum || SAMPLE_CURRICULUM;

  useEffect(() => {
    axios.get(`/api/courses/${id}`)
      .then(r => {
        setCourse(r.data.course);
        if (user?.enrolledCourses?.includes(id)) setEnrolled(true);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id, user]);

  const totalLessons = curriculum.reduce((s, m) => s + m.lessons.length, 0);

  const handleEnroll = async () => {
    if (!isAuthenticated) { navigate('/login'); return; }
    setEnrolling(true);
    try {
      await axios.post(`/api/enroll/${id}`);
      setEnrolled(true);
      setTimeout(() => navigate('/dashboard/courses'), 1000);
    } catch (err) {
      if (err.response?.status === 409) {
        setEnrolled(true);
        navigate('/dashboard/courses');
      }
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const c = course || {
    title: 'Course Not Found',
    category: 'Technology',
    level: 'Beginner',
    rating: 4.8,
    students: 1240,
    instructor: 'Expert Instructor',
    duration: '6 months',
    price: 29999,
    originalPrice: 49999,
    badge: 'Bestseller',
    description: 'This course covers everything you need to know.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
  };

  const discount = c.originalPrice ? Math.round((1 - c.price / c.originalPrice) * 100) : 0;

  const features = [
    `${totalLessons} lessons across ${curriculum.length} modules`,
    `${c.duration} of structured learning`,
    'Certificate of completion',
    'Lifetime access',
    'Live doubt sessions',
    'Placement assistance',
  ];

  const whatYouLearn = [
    'Build real-world projects from scratch',
    'Master industry-standard tools & practices',
    'Work with modern frameworks & libraries',
    'Interview preparation & placement support',
    'Access to community & alumni network',
    'Get mentored by industry professionals',
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/courses" className="hover:text-brand-500 transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> Courses
          </Link>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-gray-400">{c.category}</span>
          <ChevronRight size={12} className="text-gray-300" />
          <span className="text-gray-700 font-medium truncate max-w-xs">{c.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                {c.badge && (
                  <span className="bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">{c.badge}</span>
                )}
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">{c.category}</span>
              </div>
              <h1 className="font-display text-3xl font-bold text-gray-900 mb-3 leading-tight">{c.title}</h1>
              <p className="text-gray-500 mb-4">{c.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={i < Math.floor(c.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                    ))}
                  </div>
                  <span className="font-bold text-gray-800 ml-1">{c.rating}</span>
                  <span className="text-gray-400">({(c.students * 2).toLocaleString()} ratings)</span>
                </div>
                <span className="flex items-center gap-1 text-gray-500"><Users size={14} /> {c.students?.toLocaleString()} students</span>
                <span className="flex items-center gap-1 text-gray-500"><Clock size={14} /> {c.duration}</span>
                <span className="flex items-center gap-1 text-gray-500"><BarChart2 size={14} /> {c.level}</span>
                <span className="flex items-center gap-1 text-gray-500"><Globe size={14} /> Hindi + English</span>
              </div>

              <p className="text-sm text-gray-500 mt-3">
                Created by <span className="text-brand-500 font-medium hover:underline cursor-pointer">{c.instructor}</span>
              </p>
            </div>

            {/* Course thumbnail (mobile only) */}
            <div className="lg:hidden">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img src={c.image} alt={c.title} className="w-full h-52 object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 transition-transform">
                    <PlayCircle size={32} className="text-brand-500" />
                  </div>
                </div>
              </div>
              {/* Mobile pricing */}
              <div className="mt-4 card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-display text-3xl font-bold text-gray-900">₹{c.price?.toLocaleString()}</span>
                  {c.originalPrice > c.price && (
                    <>
                      <span className="text-gray-400 line-through text-lg">₹{c.originalPrice?.toLocaleString()}</span>
                      <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded-lg">{discount}% off</span>
                    </>
                  )}
                </div>
                {enrolled ? (
                  <Link to="/dashboard/courses" className="btn-primary w-full text-center block">Go to Course →</Link>
                ) : (
                  <button onClick={handleEnroll} disabled={enrolling} className="btn-primary w-full">
                    {enrolling ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                )}
              </div>
            </div>

            {/* What you'll learn */}
            <div className="card p-6">
              <h2 className="font-display font-bold text-xl text-gray-900 mb-4">What you'll learn</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {whatYouLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display font-bold text-xl text-gray-900">Course Curriculum</h2>
                  <p className="text-sm text-gray-400 mt-0.5">{curriculum.length} modules • {totalLessons} lessons</p>
                </div>
                <button
                  onClick={() => setExpandAll(e => !e)}
                  className="text-sm text-brand-500 font-medium hover:underline"
                >
                  {expandAll ? 'Collapse all' : 'Expand all'}
                </button>
              </div>
              <div className="space-y-3">
                {curriculum.map((section, i) => (
                  <CurriculumSection key={i} section={section} idx={i} enrolled={enrolled} />
                ))}
              </div>
            </div>

            {/* Instructor */}
            <div>
              <h2 className="font-display font-bold text-xl text-gray-900 mb-4">Your Instructor</h2>
              <div className="card p-5 flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-brand-100 flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-brand-600 text-xl">{c.instructor?.[0] || 'I'}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-900">{c.instructor}</h3>
                  <p className="text-sm text-gray-500 mb-3">Senior {c.category} Expert · 8+ years experience</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Star size={13} className="text-yellow-400 fill-yellow-400" /> 4.9 rating</span>
                    <span className="flex items-center gap-1"><Users size={13} /> 3,200+ students</span>
                    <span className="flex items-center gap-1"><BookOpen size={13} /> 4 courses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Sticky pricing card (desktop) */}
          <div className="hidden lg:block">
            <div className="sticky top-6">
              <div className="card overflow-hidden shadow-xl border-gray-200">
                {/* Thumbnail */}
                <div className="relative">
                  <img src={c.image} alt={c.title} className="w-full h-44 object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition-transform">
                      <PlayCircle size={26} className="text-brand-500" />
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">Preview</span>
                </div>

                <div className="p-5">
                  {/* Price */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-display text-3xl font-bold text-gray-900">₹{c.price?.toLocaleString()}</span>
                    {c.originalPrice > c.price && (
                      <span className="text-gray-400 line-through">₹{c.originalPrice?.toLocaleString()}</span>
                    )}
                  </div>
                  {discount > 0 && (
                    <p className="text-sm text-red-500 font-semibold mb-4">{discount}% off · Limited time!</p>
                  )}

                  {enrolled ? (
                    <Link to="/dashboard/courses" className="btn-primary w-full text-center block mb-3">
                      Go to Course →
                    </Link>
                  ) : (
                    <>
                      <button onClick={handleEnroll} disabled={enrolling} className="btn-primary w-full mb-3">
                        {enrolling ? 'Enrolling...' : 'Enroll Now'}
                      </button>
                      <button className="btn-secondary w-full mb-3 text-sm py-2.5">Try Free Preview</button>
                    </>
                  )}

                  <div className="flex items-center gap-2 justify-center mb-4">
                    <button
                      onClick={() => setWishlist(w => !w)}
                      className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${wishlist ? 'text-red-500 bg-red-50' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                      <Heart size={12} className={wishlist ? 'fill-red-500' : ''} /> Wishlist
                    </button>
                    <button className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-all">
                      <Share2 size={12} /> Share
                    </button>
                  </div>

                  {/* Includes */}
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">This course includes:</p>
                    <div className="space-y-2">
                      {features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle size={13} className="text-green-500 shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Trust badges */}
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-brand-500" />
                    <span className="text-xs text-gray-500">30-day money-back guarantee</span>
                  </div>
                </div>
              </div>

              {/* Related stats */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="card p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-yellow-400 mb-1">
                    <Star size={14} className="fill-yellow-400" />
                    <span className="font-bold text-gray-800 text-sm">{c.rating}</span>
                  </div>
                  <p className="text-xs text-gray-400">Course rating</p>
                </div>
                <div className="card p-3 text-center">
                  <div className="font-bold text-gray-800 text-sm mb-1">{c.students?.toLocaleString()}+</div>
                  <p className="text-xs text-gray-400">Students enrolled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
