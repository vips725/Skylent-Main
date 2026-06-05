import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, BookOpen, BarChart2, Settings, LogOut,
  Menu, X, GraduationCap, Bell, TrendingUp, DollarSign, Plus,
  Trash2, Eye, CheckCircle, Clock, ShieldCheck, User, Edit3,
  Layers, PlayCircle, Search, Filter, MoreVertical, ExternalLink,
  ChevronUp, ChevronDown, Star, AlertTriangle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const adminNav = [
  { icon: LayoutDashboard, label: 'Overview',       to: '/admin' },
  { icon: Users,           label: 'Students',       to: '/admin/students' },
  { icon: BookOpen,        label: 'Courses',        to: '/admin/courses' },
  { icon: BarChart2,       label: 'Analytics',      to: '/admin/analytics' },
  { icon: Settings,        label: 'Settings',       to: '/admin/settings' },
];

function AdminSidebar({ open, setOpen }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setOpen(false)} />}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-gray-900 z-50 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center">
              <GraduationCap size={18} className="text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-white text-sm block">Skylent</span>
              <span className="text-white/40 text-xs">Admin Panel</span>
            </div>
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden text-white/40 hover:text-white"><X size={20} /></button>
        </div>

        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-500/20 flex items-center justify-center">
              <ShieldCheck size={16} className="text-brand-400" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-white text-sm truncate">{user?.name}</p>
              <p className="text-xs text-white/40 truncate">Administrator</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {adminNav.map(({ icon: Icon, label, to }) => {
            const active = to === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(to);
            return (
              <Link key={to} to={to} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-brand-500 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
                <Icon size={17} />
                {label}
              </Link>
            );
          })}
          {/* Course Builder shortcut */}
          <Link to="/admin/course-builder" onClick={() => setOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${location.pathname === '/admin/course-builder' ? 'bg-accent-500 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}>
            <Layers size={17} />
            Course Builder
          </Link>
        </nav>

        <div className="px-3 pb-2">
          <Link to="/dashboard" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:bg-white/5 hover:text-white/80 transition-all">
            <Eye size={17} /> Student View
          </Link>
        </div>
        <div className="px-3 pb-5">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:bg-red-500/20 hover:text-red-400 transition-all">
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

function AdminTopBar({ setOpen, title }) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 md:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button onClick={() => setOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-800"><Menu size={22} /></button>
        <h1 className="font-display font-bold text-gray-900 text-lg">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <button className="relative w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100">
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}

// ─── Overview ──────────────────────────────────────────────────────────────────
function AdminOverview() {
  const [stats, setStats] = useState({ totalStudents: 0, totalCourses: 6, totalEnrollments: 0, revenue: 0 });
  useEffect(() => {
    axios.get('/api/admin/stats').then(r => setStats(r.data)).catch(() => {});
  }, []);

  const recentActivity = [
    { icon: Users, text: 'New student registered', time: '2 min ago', color: 'bg-blue-50 text-blue-500' },
    { icon: BookOpen, text: 'Course enrollment: Full Stack Dev', time: '15 min ago', color: 'bg-green-50 text-green-500' },
    { icon: CheckCircle, text: 'Assignment submitted by Rahul', time: '1 hr ago', color: 'bg-purple-50 text-purple-500' },
    { icon: DollarSign, text: 'Payment received ₹29,999', time: '2 hr ago', color: 'bg-orange-50 text-orange-500' },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Total Students', value: stats.totalStudents, color: 'bg-blue-50 text-blue-600', trend: '+12%', up: true },
          { icon: BookOpen, label: 'Total Courses', value: stats.totalCourses, color: 'bg-green-50 text-green-600', trend: '+2', up: true },
          { icon: TrendingUp, label: 'Enrollments', value: stats.totalEnrollments, color: 'bg-purple-50 text-purple-600', trend: '+8%', up: true },
          { icon: DollarSign, label: 'Revenue', value: `₹${(stats.revenue / 1000).toFixed(0)}K`, color: 'bg-orange-50 text-orange-600', trend: '+18%', up: true },
        ].map(({ icon: Icon, label, value, color, trend, up }) => (
          <div key={label} className="card p-4">
            <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center mb-3`}><Icon size={18} /></div>
            <div className="font-display font-bold text-2xl text-gray-900">{value}</div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-gray-400">{label}</span>
              <span className={`text-xs font-semibold flex items-center gap-0.5 ${up ? 'text-green-500' : 'text-red-500'}`}>
                {up ? <ChevronUp size={12} /> : <ChevronDown size={12} />}{trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Link to="/admin/course-builder" className="card p-4 flex items-center gap-3 hover:border-brand-300 hover:bg-brand-50/30 transition-all group">
          <div className="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center group-hover:bg-brand-200 transition-all">
            <Layers size={18} className="text-brand-600" />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-800">New Course</p>
            <p className="text-xs text-gray-400">Course Builder</p>
          </div>
        </Link>
        <Link to="/admin/students" className="card p-4 flex items-center gap-3 hover:border-blue-300 hover:bg-blue-50/30 transition-all group">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-all">
            <Users size={18} className="text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-800">Students</p>
            <p className="text-xs text-gray-400">Manage users</p>
          </div>
        </Link>
        <Link to="/admin/analytics" className="card p-4 flex items-center gap-3 hover:border-purple-300 hover:bg-purple-50/30 transition-all group">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-all">
            <BarChart2 size={18} className="text-purple-600" />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-800">Analytics</p>
            <p className="text-xs text-gray-400">View reports</p>
          </div>
        </Link>
        <Link to="/admin/settings" className="card p-4 flex items-center gap-3 hover:border-gray-300 transition-all group">
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-all">
            <Settings size={18} className="text-gray-600" />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-800">Settings</p>
            <p className="text-xs text-gray-400">Platform config</p>
          </div>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${a.color} flex items-center justify-center shrink-0`}><Icon size={15} /></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{a.text}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1"><Clock size={10} />{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Top Courses by Enrollment</h3>
          <div className="space-y-3">
            {[
              { name: 'Digital Marketing', students: 2100, pct: 100 },
              { name: 'Full Stack Dev', students: 1240, pct: 59 },
              { name: 'Data Science', students: 980, pct: 47 },
              { name: 'UI/UX Design', students: 870, pct: 41 },
            ].map((c, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">{c.name}</span>
                  <span className="text-gray-400">{c.students} students</span>
                </div>
                <div className="bg-gray-100 rounded-full h-1.5">
                  <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Students ─────────────────────────────────────────────────────────────────
function AdminStudents() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    axios.get('/api/admin/users').then(r => setUsers(r.data.users.filter(u => u.role === 'student'))).catch(() => {});
  }, []);

  const deleteUser = async (id) => {
    if (!confirm('Delete this student?')) return;
    try { await axios.delete(`/api/admin/users/${id}`); setUsers(u => u.filter(x => x.id !== id)); } catch {}
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search students..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-brand-400"
            />
          </div>
          <span className="text-sm text-gray-400 shrink-0">{filtered.length} students</span>
        </div>
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            <Users size={40} className="mx-auto mb-3 text-gray-200" />
            <p>{search ? 'No students match your search.' : 'No students registered yet.'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  {['Name', 'Email', 'Enrolled', 'Joined', 'Action'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-600">{u.name[0]}</div>
                      {u.name}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className="bg-brand-50 text-brand-600 text-xs font-semibold px-2 py-0.5 rounded-full">{u.enrolledCourses?.length || 0} courses</span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => deleteUser(u.id)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={15} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Courses with preview + builder link ──────────────────────────────────────
function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => { axios.get('/api/courses').then(r => setCourses(r.data.courses)).catch(() => {}); }, []);

  const deleteCourse = (id) => {
    if (!confirm('Delete this course?')) return;
    setCourses(c => c.filter(x => x.id !== id));
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">All Courses ({courses.length})</h3>
          <p className="text-xs text-gray-400 mt-0.5">Manage your course catalog</p>
        </div>
        <Link to="/admin/course-builder" className="btn-primary flex items-center gap-2 text-sm py-2.5">
          <Plus size={16} /> Create Course
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map(c => (
          <div key={c.id} className="card overflow-hidden group">
            <div className="relative">
              <img src={c.image} alt={c.title} className="w-full h-36 object-cover" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <Link
                  to={`/courses/${c.id}`}
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-brand-600 shadow-lg transition-all hover:scale-110"
                  title="Preview"
                >
                  <Eye size={15} />
                </Link>
                <button
                  onClick={() => navigate('/admin/course-builder')}
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-brand-600 shadow-lg transition-all hover:scale-110"
                  title="Edit"
                >
                  <Edit3 size={15} />
                </button>
                <button
                  onClick={() => deleteCourse(c.id)}
                  className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-red-500 shadow-lg transition-all hover:scale-110"
                  title="Delete"
                >
                  <Trash2 size={15} />
                </button>
              </div>
              {c.badge && (
                <span className="absolute top-2 left-2 bg-accent-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{c.badge}</span>
              )}
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 text-sm leading-tight mb-1">{c.title}</h4>
              <p className="text-xs text-gray-400 mb-2">{c.instructor} · {c.duration}</p>
              <div className="flex items-center gap-1 mb-3 text-xs text-gray-500">
                <Star size={11} className="text-yellow-400 fill-yellow-400" />
                <span className="font-medium text-gray-700">{c.rating}</span>
                <span className="text-gray-300 mx-1">·</span>
                <Users size={11} />
                <span>{c.students} enrolled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-brand-600">₹{c.price?.toLocaleString()}</span>
                <div className="flex items-center gap-1">
                  <Link
                    to={`/courses/${c.id}`}
                    className="text-xs font-medium text-gray-500 hover:text-brand-500 px-2 py-1 rounded-lg hover:bg-brand-50 transition-all flex items-center gap-1"
                  >
                    <ExternalLink size={11} /> View
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add new course card */}
        <Link to="/admin/course-builder" className="card border-2 border-dashed border-gray-200 hover:border-brand-400 hover:bg-brand-50/30 transition-all flex flex-col items-center justify-center p-8 text-center min-h-[220px] group">
          <div className="w-14 h-14 rounded-2xl bg-gray-100 group-hover:bg-brand-100 flex items-center justify-center mb-3 transition-all">
            <Plus size={24} className="text-gray-400 group-hover:text-brand-500 transition-all" />
          </div>
          <p className="font-semibold text-gray-500 group-hover:text-brand-600 transition-all text-sm">Create New Course</p>
          <p className="text-xs text-gray-400 mt-1">Use the Course Builder</p>
        </Link>
      </div>
    </div>
  );
}

// ─── Analytics ─────────────────────────────────────────────────────────────────
function AdminAnalytics() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const enrollments = [12, 19, 15, 27, 35, 42];
  const revenue = [350, 520, 410, 780, 960, 1120];
  const maxE = Math.max(...enrollments);
  const maxR = Math.max(...revenue);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Completion Rate', value: '68%', icon: CheckCircle, color: 'text-green-500' },
          { label: 'Avg Session Time', value: '45 min', icon: Clock, color: 'text-blue-500' },
          { label: 'Active Students', value: '87%', icon: Users, color: 'text-purple-500' },
          { label: 'Course Rating', value: '4.8 ★', icon: TrendingUp, color: 'text-orange-500' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card p-4 text-center">
            <Icon size={22} className={`${color} mx-auto mb-2`} />
            <div className="font-display font-bold text-xl text-gray-900">{value}</div>
            <div className="text-xs text-gray-400 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Monthly Enrollments</h3>
          <div className="flex items-end gap-3 h-40">
            {months.map((m, i) => (
              <div key={m} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-500 font-medium">{enrollments[i]}</span>
                <div className="w-full bg-brand-500 rounded-t-lg transition-all hover:bg-brand-600 cursor-pointer" style={{ height: `${(enrollments[i] / maxE) * 100}%`, minHeight: '4px' }} />
                <span className="text-xs text-gray-400">{m}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Monthly Revenue (₹K)</h3>
          <div className="flex items-end gap-3 h-40">
            {months.map((m, i) => (
              <div key={m} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-gray-500 font-medium">{revenue[i]}</span>
                <div className="w-full bg-accent-500 rounded-t-lg transition-all hover:bg-accent-600 cursor-pointer" style={{ height: `${(revenue[i] / maxR) * 100}%`, minHeight: '4px' }} />
                <span className="text-xs text-gray-400">{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course performance table */}
      <div className="card overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-semibold text-gray-900">Course Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                {['Course', 'Students', 'Completion', 'Rating', 'Revenue'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { name: 'Digital Marketing Mastery', students: 2100, completion: '72%', rating: 4.7, revenue: '₹41.9L' },
                { name: 'Full Stack Web Dev', students: 1240, completion: '68%', rating: 4.8, revenue: '₹37.2L' },
                { name: 'Data Science & ML', students: 980, completion: '61%', rating: 4.9, revenue: '₹34.3L' },
                { name: 'UI/UX Design', students: 870, completion: '75%', rating: 4.6, revenue: '₹21.7L' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{row.name}</td>
                  <td className="px-4 py-3 text-gray-500">{row.students.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-100 rounded-full h-1.5">
                        <div className="bg-brand-500 h-1.5 rounded-full" style={{ width: row.completion }} />
                      </div>
                      <span className="text-xs text-gray-600">{row.completion}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-sm">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />
                      {row.rating}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-green-600">{row.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function AdminSettings() {
  const { user } = useAuth();
  return (
    <div className="p-4 md:p-6">
      <div className="card p-6 max-w-lg">
        <h3 className="font-semibold text-gray-900 mb-4">Admin Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Admin Name</label>
            <input defaultValue={user?.name} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input defaultValue={user?.email} disabled className="input-field bg-gray-50 text-gray-400 cursor-not-allowed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input type="password" placeholder="Leave blank to keep current" className="input-field" />
          </div>
          <button className="btn-primary w-full">Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ─── Course Builder redirect wrapper ─────────────────────────────────────────
import CourseBuilder from './CourseBuilder';

const adminTitles = {
  '/admin': 'Admin Overview',
  '/admin/students': 'Student Management',
  '/admin/courses': 'Course Management',
  '/admin/course-builder': 'Course Builder',
  '/admin/analytics': 'Analytics',
  '/admin/settings': 'Settings',
};

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = adminTitles[location.pathname] || 'Admin';

  // Course builder gets full-page treatment
  if (location.pathname === '/admin/course-builder') {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
          <Routes>
            <Route path="course-builder" element={<CourseBuilder />} />
          </Routes>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col lg:ml-64 min-h-screen">
        <AdminTopBar setOpen={setSidebarOpen} title={title} />
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="students" element={<AdminStudents />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="course-builder" element={<CourseBuilder />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
