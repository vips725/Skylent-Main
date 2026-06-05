import { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, Award, TrendingUp, Calendar, MessageSquare,
  Briefcase, Settings, LogOut, Menu, X, GraduationCap, Bell, ChevronRight,
  PlayCircle, Clock, Target, Star, Users, BarChart2, FileText, CheckCircle,
  Zap, Trophy, User, ChevronDown, ChevronUp, Video, HelpCircle, Code,
  Lock, Eye, ArrowLeft, Layers, Play, SkipForward, SkipBack, Volume2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',    to: '/dashboard' },
  { icon: BookOpen,        label: 'My Courses',   to: '/dashboard/courses' },
  { icon: Calendar,        label: 'Live Classes', to: '/dashboard/live' },
  { icon: Award,           label: 'Certificates', to: '/dashboard/certificates' },
  { icon: Briefcase,       label: 'Placements',   to: '/dashboard/placements' },
  { icon: MessageSquare,   label: 'Mentorship',   to: '/dashboard/mentorship' },
  { icon: FileText,        label: 'Assignments',  to: '/dashboard/assignments' },
  { icon: TrendingUp,      label: 'Progress',     to: '/dashboard/progress' },
  { icon: Settings,        label: 'Settings',     to: '/dashboard/settings' },
];

function Sidebar({ open, setOpen }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-50 flex flex-col transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center">
              <GraduationCap size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-gray-900">Skylent</span>
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <div className="px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center">
              <User size={18} className="text-brand-600" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5">
          {navItems.map(({ icon: Icon, label, to }) => {
            const active = to === '/dashboard' ? location.pathname === '/dashboard' : location.pathname.startsWith(to);
            return (
              <Link key={to} to={to} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  active ? 'bg-brand-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}>
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 pb-5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all">
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

function TopBar({ setOpen, title }) {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-100 px-4 md:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={() => setOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-800"><Menu size={22} /></button>
        <h1 className="font-display font-bold text-gray-900 text-lg">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="relative w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="w-9 h-9 rounded-xl bg-brand-100 flex items-center justify-center">
          <User size={17} className="text-brand-600" />
        </div>
      </div>
    </header>
  );
}

// ─── Sample data ──────────────────────────────────────────────────────────────
const enrolledCourses = [
  {
    id: '1',
    title: 'Full Stack Web Development',
    progress: 68,
    nextLesson: 'React Hooks Deep Dive',
    totalLessons: 120,
    completedLessons: 82,
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80',
    instructor: 'Rajesh Kumar',
    curriculum: [
      { title: 'HTML & CSS Foundations', lessons: [
        { title: 'HTML Structure', type: 'video', duration: '12:00', done: true },
        { title: 'CSS Flexbox', type: 'video', duration: '18:00', done: true },
        { title: 'CSS Grid', type: 'video', duration: '15:00', done: true },
      ]},
      { title: 'JavaScript Essentials', lessons: [
        { title: 'Variables & Types', type: 'video', duration: '20:00', done: true },
        { title: 'Functions & Scope', type: 'video', duration: '22:00', done: true },
        { title: 'Async/Await', type: 'video', duration: '25:00', done: false },
      ]},
      { title: 'React Development', lessons: [
        { title: 'React Basics', type: 'video', duration: '30:00', done: false },
        { title: 'React Hooks Deep Dive', type: 'video', duration: '35:00', done: false },
        { title: 'State Management', type: 'video', duration: '28:00', done: false },
      ]},
    ],
  },
  {
    id: '3',
    title: 'Digital Marketing Mastery',
    progress: 34,
    nextLesson: 'SEO Fundamentals',
    totalLessons: 80,
    completedLessons: 27,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
    instructor: 'Amit Verma',
    curriculum: [
      { title: 'Marketing Basics', lessons: [
        { title: 'Intro to Digital Marketing', type: 'video', duration: '10:00', done: true },
        { title: 'Understanding Your Audience', type: 'video', duration: '15:00', done: true },
      ]},
      { title: 'SEO & SEM', lessons: [
        { title: 'SEO Fundamentals', type: 'video', duration: '25:00', done: false },
        { title: 'Keyword Research', type: 'video', duration: '20:00', done: false },
      ]},
    ],
  },
];

// ─── Course Player (in-dashboard) ─────────────────────────────────────────────
function CoursePlayer({ courseId, onBack }) {
  const course = enrolledCourses.find(c => c.id === courseId);
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completed, setCompleted] = useState(() => {
    const set = new Set();
    course?.curriculum.forEach((mod, mi) => mod.lessons.forEach((l, li) => { if (l.done) set.add(`${mi}-${li}`); }));
    return set;
  });
  const [openModules, setOpenModules] = useState({ 0: true });

  if (!course) return null;

  const allLessons = course.curriculum.flatMap((m, mi) => m.lessons.map((l, li) => ({ ...l, mi, li })));
  const currentKey = `${currentModule}-${currentLesson}`;
  const activeLesson = course.curriculum[currentModule]?.lessons[currentLesson];

  const markDone = () => {
    setCompleted(s => new Set([...s, currentKey]));
  };

  const goNext = () => {
    const lessons = course.curriculum[currentModule].lessons;
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(l => l + 1);
    } else if (currentModule < course.curriculum.length - 1) {
      setCurrentModule(m => m + 1);
      setCurrentLesson(0);
      setOpenModules(o => ({ ...o, [currentModule + 1]: true }));
    }
  };

  const goPrev = () => {
    if (currentLesson > 0) {
      setCurrentLesson(l => l - 1);
    } else if (currentModule > 0) {
      setCurrentModule(m => m - 1);
      const prevMod = course.curriculum[currentModule - 1];
      setCurrentLesson(prevMod.lessons.length - 1);
    }
  };

  const totalDone = completed.size;
  const totalLessons = allLessons.length;
  const playerProgress = Math.round((totalDone / totalLessons) * 100);

  return (
    <div className="flex h-full min-h-screen bg-gray-900">
      {/* Video / Content area */}
      <div className="flex-1 flex flex-col">
        {/* Player top bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-gray-900 border-b border-white/10">
          <button onClick={onBack} className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
            <ArrowLeft size={16} />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold text-sm truncate">{course.title}</p>
            <p className="text-white/40 text-xs">{activeLesson?.title}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span>{totalDone}/{totalLessons} lessons</span>
            <div className="w-24 h-1.5 bg-white/10 rounded-full">
              <div className="h-1.5 bg-brand-400 rounded-full transition-all" style={{ width: `${playerProgress}%` }} />
            </div>
            <span>{playerProgress}%</span>
          </div>
        </div>

        {/* Video placeholder */}
        <div className="flex-1 bg-black flex items-center justify-center relative">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 cursor-pointer hover:bg-white/20 transition-all">
              <Play size={32} className="text-white ml-1" />
            </div>
            <p className="text-white font-semibold">{activeLesson?.title}</p>
            <p className="text-white/40 text-sm mt-1">{activeLesson?.duration}</p>
          </div>

          {/* Player controls overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4">
            <div className="h-1 bg-white/20 rounded-full mb-3 cursor-pointer">
              <div className="h-1 bg-brand-400 rounded-full" style={{ width: '35%' }} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={goPrev} className="text-white/70 hover:text-white"><SkipBack size={20} /></button>
                <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform">
                  <Play size={18} className="text-gray-900 ml-0.5" />
                </button>
                <button onClick={goNext} className="text-white/70 hover:text-white"><SkipForward size={20} /></button>
                <Volume2 size={18} className="text-white/70" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white/60 text-xs">0:00 / {activeLesson?.duration}</span>
                <button
                  onClick={markDone}
                  disabled={completed.has(currentKey)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                    completed.has(currentKey)
                      ? 'bg-green-500 text-white'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <CheckCircle size={12} />
                  {completed.has(currentKey) ? 'Done!' : 'Mark Done'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar: curriculum */}
      <div className="w-80 bg-gray-800 border-l border-white/10 flex flex-col overflow-hidden shrink-0">
        <div className="px-4 py-3 border-b border-white/10">
          <p className="text-white font-semibold text-sm">Course Content</p>
          <p className="text-white/40 text-xs">{course.curriculum.length} modules</p>
        </div>
        <div className="flex-1 overflow-y-auto">
          {course.curriculum.map((mod, mi) => (
            <div key={mi} className="border-b border-white/5">
              <button
                onClick={() => setOpenModules(o => ({ ...o, [mi]: !o[mi] }))}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5 transition-all"
              >
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-white/70 shrink-0">{mi + 1}</div>
                <span className="flex-1 text-white/80 text-sm font-medium">{mod.title}</span>
                {openModules[mi] ? <ChevronUp size={14} className="text-white/40" /> : <ChevronDown size={14} className="text-white/40" />}
              </button>
              {openModules[mi] && (
                <div>
                  {mod.lessons.map((lesson, li) => {
                    const key = `${mi}-${li}`;
                    const isActive = currentModule === mi && currentLesson === li;
                    const isDone = completed.has(key);
                    return (
                      <button
                        key={li}
                        onClick={() => { setCurrentModule(mi); setCurrentLesson(li); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all ${isActive ? 'bg-brand-500/30 border-l-2 border-brand-400' : 'hover:bg-white/5 border-l-2 border-transparent'}`}
                      >
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isDone ? 'bg-green-500' : isActive ? 'bg-brand-400' : 'bg-white/10'}`}>
                          {isDone ? <CheckCircle size={10} className="text-white" /> : <Play size={8} className="text-white ml-0.5" />}
                        </div>
                        <span className={`flex-1 text-xs ${isActive ? 'text-white font-medium' : isDone ? 'text-white/50 line-through' : 'text-white/60'}`}>{lesson.title}</span>
                        <span className="text-white/30 text-xs">{lesson.duration}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard Home ────────────────────────────────────────────────────────────
const upcomingClasses = [
  { title: 'Live Q&A: React Advanced Patterns', time: 'Today, 7:00 PM', mentor: 'Rajesh Kumar', type: 'Live' },
  { title: 'Assignment Review: CSS Projects', time: 'Tomorrow, 6:00 PM', mentor: 'Priya Sharma', type: 'Review' },
  { title: 'Placement Prep Workshop', time: 'Fri, 5:00 PM', mentor: 'HR Team', type: 'Career' },
];
const achievements = [
  { icon: '🏆', title: 'First Module Complete', date: '2 days ago' },
  { icon: '⚡', title: '7-Day Streak', date: '1 week ago' },
  { icon: '📚', title: 'Course Enrolled', date: '2 weeks ago' },
];

function DashboardHome() {
  const { user } = useAuth();
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="bg-gradient-to-r from-brand-500 to-brand-700 rounded-2xl p-6 text-white">
        <h2 className="font-display text-2xl font-bold mb-1">Welcome back, {user?.name?.split(' ')[0]}! 👋</h2>
        <p className="text-white/70 text-sm">You're on a roll! Keep pushing toward your goals.</p>
        <div className="mt-4 flex items-center gap-4">
          <div className="text-center"><div className="font-display font-bold text-2xl">68%</div><div className="text-white/60 text-xs">Avg Progress</div></div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center"><div className="font-display font-bold text-2xl">109</div><div className="text-white/60 text-xs">Lessons Done</div></div>
          <div className="w-px h-10 bg-white/20" />
          <div className="text-center"><div className="font-display font-bold text-2xl">7</div><div className="text-white/60 text-xs">Day Streak 🔥</div></div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: BookOpen, label: 'Enrolled Courses', value: '2', color: 'bg-blue-50 text-blue-600' },
          { icon: Award, label: 'Certificates', value: '0', color: 'bg-purple-50 text-purple-600' },
          { icon: CheckCircle, label: 'Lessons Done', value: '109', color: 'bg-green-50 text-green-600' },
          { icon: Target, label: 'Career Score', value: '72%', color: 'bg-orange-50 text-orange-600' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="card p-4">
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}><Icon size={18} /></div>
            <div className="font-display font-bold text-2xl text-gray-900">{value}</div>
            <div className="text-gray-400 text-xs mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-gray-900">Continue Learning</h3>
            <Link to="/dashboard/courses" className="text-sm text-brand-500 font-medium flex items-center gap-1 hover:gap-2 transition-all">View All <ChevronRight size={14} /></Link>
          </div>
          {enrolledCourses.map(course => (
            <div key={course.id} className="card p-4 flex gap-4">
              <img src={course.image} alt={course.title} className="w-20 h-16 object-cover rounded-xl shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">{course.title}</h4>
                <p className="text-xs text-gray-400 mb-2 flex items-center gap-1"><PlayCircle size={11} /> Next: {course.nextLesson}</p>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-brand-500 to-brand-400 h-1.5 rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{course.progress}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{course.completedLessons}/{course.totalLessons} lessons</span>
                  <Link to={`/dashboard/courses`} className="text-xs font-semibold text-brand-500 hover:underline flex items-center gap-0.5">Continue <ChevronRight size={11} /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="card p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm"><Calendar size={15} className="text-brand-500" /> Upcoming Classes</h4>
            <div className="space-y-3">
              {upcomingClasses.map((cls, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-0.5 shrink-0 ${cls.type === 'Live' ? 'bg-red-100 text-red-600' : cls.type === 'Career' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>{cls.type}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-800 leading-tight">{cls.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{cls.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm"><Trophy size={15} className="text-brand-500" /> Achievements</h4>
            <div className="space-y-2.5">
              {achievements.map((a, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <span className="text-xl">{a.icon}</span>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{a.title}</p>
                    <p className="text-xs text-gray-400">{a.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-4 bg-gradient-to-br from-brand-500 to-brand-700 text-white">
            <h4 className="font-semibold text-sm mb-1">Career Readiness</h4>
            <div className="flex items-end gap-2 mb-2">
              <span className="font-display font-bold text-3xl">72%</span>
              <span className="text-white/60 text-xs mb-1">overall</span>
            </div>
            <div className="bg-white/20 rounded-full h-1.5 mb-2">
              <div className="bg-white h-1.5 rounded-full" style={{ width: '72%' }} />
            </div>
            <p className="text-white/70 text-xs">Complete 2 more projects to reach 85% and unlock placement support.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── My Courses with in-dashboard player ─────────────────────────────────────
function MyCoursesPage() {
  const [playingCourse, setPlayingCourse] = useState(null);

  if (playingCourse) {
    return <CoursePlayer courseId={playingCourse} onBack={() => setPlayingCourse(null)} />;
  }

  return (
    <div className="p-4 md:p-6">
      <div className="grid md:grid-cols-2 gap-4">
        {enrolledCourses.map(course => (
          <div key={course.id} className="card overflow-hidden">
            <div className="relative group cursor-pointer" onClick={() => setPlayingCourse(course.id)}>
              <img src={course.image} alt={course.title} className="w-full h-36 object-cover" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl">
                  <PlayCircle size={28} className="text-brand-500" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg font-medium">
                {course.progress}% complete
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
              <p className="text-xs text-gray-400 mb-3">Instructor: {course.instructor}</p>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-brand-500 h-2 rounded-full" style={{ width: `${course.progress}%` }} />
                </div>
                <span className="text-xs font-bold text-gray-700">{course.progress}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">{course.completedLessons} / {course.totalLessons} lessons</span>
                <button onClick={() => setPlayingCourse(course.id)} className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5">
                  <Play size={11} /> Continue
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="card p-8 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200 hover:border-brand-300 hover:bg-brand-50/20 transition-all cursor-pointer min-h-[200px]" onClick={() => window.location.href='/courses'}>
          <BookOpen size={32} className="text-gray-300 mb-3" />
          <p className="text-gray-500 text-sm mb-3">Explore more courses</p>
          <Link to="/courses" className="btn-primary text-sm py-2">Browse Courses</Link>
        </div>
      </div>
    </div>
  );
}

// ─── Live Classes ─────────────────────────────────────────────────────────────
function LiveClassesPage() {
  const classes = [
    { title: 'React Advanced Patterns', mentor: 'Rajesh Kumar', time: 'Today, 7:00 PM', duration: '90 min', status: 'live', topic: 'Full Stack' },
    { title: 'SEO Deep Dive', mentor: 'Amit Verma', time: 'Tomorrow, 6:00 PM', duration: '60 min', status: 'upcoming', topic: 'Marketing' },
    { title: 'Placement Prep Workshop', mentor: 'HR Team', time: 'Fri, 5:00 PM', duration: '120 min', status: 'upcoming', topic: 'Career' },
    { title: 'CSS Grid Masterclass', mentor: 'Neha Singh', time: 'Sat, 4:00 PM', duration: '75 min', status: 'upcoming', topic: 'Design' },
  ];
  return (
    <div className="p-4 md:p-6 space-y-4">
      {classes.map((cls, i) => (
        <div key={i} className="card p-4 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${cls.status === 'live' ? 'bg-red-50' : 'bg-brand-50'}`}>
            {cls.status === 'live' ? <Zap size={20} className="text-red-500" /> : <Calendar size={20} className="text-brand-500" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="font-semibold text-gray-900 text-sm">{cls.title}</h3>
              {cls.status === 'live' && <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full animate-pulse">● LIVE</span>}
            </div>
            <p className="text-xs text-gray-400">{cls.mentor} · {cls.time} · {cls.duration}</p>
          </div>
          <button className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all ${cls.status === 'live' ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-brand-50 text-brand-600 hover:bg-brand-100'}`}>
            {cls.status === 'live' ? 'Join Now' : 'Remind Me'}
          </button>
        </div>
      ))}
    </div>
  );
}

function CertificatesPage() {
  return (
    <div className="p-4 md:p-6">
      <div className="card p-12 text-center">
        <Award size={48} className="text-gray-200 mx-auto mb-4" />
        <h3 className="font-display font-bold text-gray-700 text-xl mb-2">No Certificates Yet</h3>
        <p className="text-gray-400 text-sm mb-6">Complete a course to earn your first certificate.</p>
        <Link to="/dashboard/courses" className="btn-primary">Go to My Courses</Link>
      </div>
    </div>
  );
}

function PlacementsPage() {
  const jobs = [
    { company: 'TCS', role: 'Frontend Developer', package: '₹6.5 LPA', location: 'Bangalore', type: 'Full Time' },
    { company: 'Infosys', role: 'Full Stack Dev', package: '₹8 LPA', location: 'Pune', type: 'Full Time' },
    { company: 'Wipro', role: 'React Developer', package: '₹7 LPA', location: 'Hyderabad', type: 'Full Time' },
  ];
  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[{ label: 'Students Placed', value: '500+' }, { label: 'Avg Package', value: '₹7.2 LPA' }, { label: 'Hiring Partners', value: '50+' }].map(s => (
          <div key={s.label} className="card p-4 text-center">
            <div className="font-display font-bold text-2xl text-brand-500">{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-display font-bold text-gray-900 mb-3">Open Opportunities</h3>
        <div className="space-y-3">
          {jobs.map((job, i) => (
            <div key={i} className="card p-4 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center font-bold text-brand-600 text-sm shrink-0">{job.company[0]}</div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">{job.role}</div>
                <div className="text-xs text-gray-400">{job.company} · {job.location} · {job.package}</div>
              </div>
              <button className="btn-primary text-xs py-2 px-4">Apply</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MentorshipPage() {
  const mentors = [
    { name: 'Rajesh Kumar', expertise: 'Full Stack', exp: '8 years', rating: 4.9, sessions: 120 },
    { name: 'Priya Sharma', expertise: 'Data Science', exp: '6 years', rating: 4.8, sessions: 95 },
    { name: 'Amit Verma', expertise: 'Digital Marketing', exp: '7 years', rating: 4.7, sessions: 80 },
  ];
  return (
    <div className="p-4 md:p-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentors.map((m, i) => (
          <div key={i} className="card p-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-brand-100 flex items-center justify-center mx-auto mb-3">
              <User size={24} className="text-brand-600" />
            </div>
            <h3 className="font-semibold text-gray-900">{m.name}</h3>
            <p className="text-xs text-gray-400 mb-1">{m.expertise} · {m.exp}</p>
            <div className="flex items-center justify-center gap-1 mb-3">
              <Star size={13} className="text-yellow-400 fill-yellow-400" />
              <span className="text-xs font-semibold text-gray-700">{m.rating}</span>
              <span className="text-xs text-gray-400">({m.sessions} sessions)</span>
            </div>
            <button className="btn-primary text-xs py-2 w-full">Book Session</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AssignmentsPage() {
  const tasks = [
    { title: 'Build a React Todo App', course: 'Full Stack Dev', due: 'Jun 10', status: 'pending' },
    { title: 'SEO Audit Report', course: 'Digital Marketing', due: 'Jun 12', status: 'pending' },
    { title: 'CSS Flexbox Challenge', course: 'Full Stack Dev', due: 'Jun 5', status: 'submitted' },
  ];
  return (
    <div className="p-4 md:p-6 space-y-3">
      {tasks.map((t, i) => (
        <div key={i} className="card p-4 flex items-center gap-4">
          <div className={`w-2 h-2 rounded-full shrink-0 ${t.status === 'submitted' ? 'bg-green-400' : 'bg-orange-400'}`} />
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 text-sm">{t.title}</h4>
            <p className="text-xs text-gray-400">{t.course} · Due: {t.due}</p>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${t.status === 'submitted' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
            {t.status === 'submitted' ? 'Submitted' : 'Pending'}
          </span>
        </div>
      ))}
    </div>
  );
}

function ProgressPage() {
  const skills = [
    { name: 'HTML & CSS', pct: 90 }, { name: 'JavaScript', pct: 75 }, { name: 'React', pct: 60 },
    { name: 'Node.js', pct: 40 }, { name: 'SEO', pct: 50 }, { name: 'Analytics', pct: 30 },
  ];
  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="card p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Skill Progress</h3>
        <div className="space-y-4">
          {skills.map(s => (
            <div key={s.name}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{s.name}</span>
                <span className="text-gray-400">{s.pct}%</span>
              </div>
              <div className="bg-gray-100 rounded-full h-2">
                <div className="bg-gradient-to-r from-brand-500 to-brand-400 h-2 rounded-full transition-all" style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="card p-4 text-center">
          <div className="font-display font-bold text-3xl text-brand-500 mb-1">7</div>
          <div className="text-xs text-gray-400">Day Streak 🔥</div>
        </div>
        <div className="card p-4 text-center">
          <div className="font-display font-bold text-3xl text-green-500 mb-1">109</div>
          <div className="text-xs text-gray-400">Lessons Complete</div>
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  const { user } = useAuth();
  return (
    <div className="p-4 md:p-6">
      <div className="card p-6 max-w-lg">
        <h3 className="font-semibold text-gray-900 mb-4">Profile Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input defaultValue={user?.name} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input defaultValue={user?.email} disabled className="input-field bg-gray-50 text-gray-400 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input placeholder="Enter phone number" className="input-field" />
          </div>
          <button className="btn-primary w-full">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ─── Root Dashboard ────────────────────────────────────────────────────────────
const pageTitles = {
  '/dashboard': 'Dashboard',
  '/dashboard/courses': 'My Courses',
  '/dashboard/live': 'Live Classes',
  '/dashboard/certificates': 'Certificates',
  '/dashboard/placements': 'Placements',
  '/dashboard/mentorship': 'Mentorship',
  '/dashboard/assignments': 'Assignments',
  '/dashboard/progress': 'My Progress',
  '/dashboard/settings': 'Settings',
};

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Dashboard';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
        <TopBar setOpen={setSidebarOpen} title={title} />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="courses" element={<MyCoursesPage />} />
            <Route path="live" element={<LiveClassesPage />} />
            <Route path="certificates" element={<CertificatesPage />} />
            <Route path="placements" element={<PlacementsPage />} />
            <Route path="mentorship" element={<MentorshipPage />} />
            <Route path="assignments" element={<AssignmentsPage />} />
            <Route path="progress" element={<ProgressPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
