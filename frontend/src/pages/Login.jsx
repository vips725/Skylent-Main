import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, AlertCircle, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState('student');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => { setForm(f => ({ ...f, [e.target.name]: e.target.value })); if (error) setError(''); };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    try {
      const res = await login(form.email, form.password);
      const role = res?.role || 'student';
      navigate(role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally { setLoading(false); }
  };

  const features = [
    '500+ students placed in top companies',
    'Average package of ₹6–12 LPA',
    '50+ hiring partners across India',
  ];

  return (
    <div className="min-h-screen flex">

      {/* Left panel — glassmorphism blue */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-blue-950 to-sky-900 relative overflow-hidden">
        {/* Floating blurred circles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[-15%] right-[-10%] w-[70%] h-[70%] bg-sky-500/15 rounded-full blur-3xl" />
          <div className="absolute top-[30%] right-[10%] w-[35%] h-[35%] bg-cyan-300/10 rounded-full blur-2xl" />
          <div className="absolute bottom-[20%] left-[15%] w-[25%] h-[25%] bg-indigo-400/10 rounded-full blur-2xl" />
        </div>

        {/* Glassmorphism floating cards */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[12%] right-[8%] w-48 h-48 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl rotate-12" />
          <div className="absolute bottom-[15%] left-[5%] w-36 h-36 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl -rotate-6" />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 mb-12">
            <img src="/skyy.png" alt="SkyYent" className="h-24 w-auto" />
          </Link>

          {/* Welcome text */}
          <h2 className="font-display text-4xl font-bold text-white mb-4 leading-tight">
            Welcome back.<br />Let's keep building.
          </h2>
          <p className="text-white/60 text-base mb-10 leading-relaxed">
            Your learning journey continues. Access your courses,<br className="hidden xl:block" />
            track progress, and stay connected with your mentor.
          </p>

          {/* Features list */}
          <div className="space-y-4">
            {features.map(text => (
              <div key={text} className="flex items-center gap-3 text-white/80">
                <div className="w-6 h-6 bg-blue-500/30 backdrop-blur-sm border border-blue-400/30 rounded-full flex items-center justify-center shrink-0">
                  <Check size={12} className="text-blue-200" strokeWidth={3} />
                </div>
                <span className="text-sm">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — white form area */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 bg-white">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <img src="/skyy.png" alt="SkyYent" className="h-9 w-auto" />
          </Link>

          <div className="mb-6">
            <h1 className="font-display text-3xl font-bold text-gray-900">Sign in to your account</h1>
            <p className="text-gray-500 mt-2">
              Sign in as <span className="text-blue-600 font-semibold capitalize">{role}</span>
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Need an account?{' '}
              <Link to="/signup" className="text-blue-600 font-semibold hover:underline">Request access</Link>
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              {['student', 'admin', 'organization'].map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${role === r ? 'bg-blue-500 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Username</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="email"
                  type="text"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter your username"
                  className="input-field pl-10"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="password"
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="input-field pl-10 pr-10"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-blue-500" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 shadow-lg shadow-blue-500/25 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* CTA */}
          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs text-blue-700 font-medium text-center">
              Account creation is managed by Skylent Global.
            </p>
            <Link
              to="/signup"
              className="block w-full text-center mt-2 text-sm font-semibold text-blue-600 hover:underline"
            >
              Request access →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
