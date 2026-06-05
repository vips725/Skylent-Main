import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, Mail, Lock, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleChange = e => { setForm(f => ({ ...f, [e.target.name]: e.target.value })); if (error) setError(''); };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.email || !form.password) { setError('Please fill in all fields'); return; }
    setLoading(true);
    try {
      await login(form.email, form.password);
      window.location.href = 'https://skylent-global-demo.vercel.app';
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link to="/" className="flex items-center gap-2.5 mb-12">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <GraduationCap size={22} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">Skylent Global</span>
          </Link>
          <h2 className="font-display text-4xl font-bold text-white mb-4 leading-tight">Welcome back.<br />Let's keep building.</h2>
          <p className="text-white/60 text-lg mb-10">Your learning journey continues. Access your courses, track progress, and stay connected with your mentor.</p>
          <div className="space-y-4">
            {[
              { emoji: '🎯', text: '500+ students placed in top companies' },
              { emoji: '💰', text: 'Average package of ₹6–12 LPA' },
              { emoji: '🤝', text: '50+ hiring partners across India' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-3 text-white/80">
                <span className="text-xl">{item.emoji}</span>
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 bg-white">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center"><GraduationCap size={18} className="text-white" /></div>
            <span className="font-display font-bold text-lg text-gray-900">Skylent Global</span>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-gray-900">Sign in to your account</h1>
            <p className="text-gray-500 mt-2">Don't have an account? <Link to="/signup" className="text-brand-500 font-semibold hover:underline">Sign up free</Link></p>
          </div>

          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">
              <AlertCircle size={16} className="shrink-0" />{error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="input-field pl-10" autoComplete="email" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Enter your password" className="input-field pl-10 pr-10" autoComplete="current-password" />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 accent-brand-500" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-brand-500 hover:underline font-medium">Forgot password?</Link>
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>) : (<>Sign In <ArrowRight size={16} /></>)}
            </button>
          </form>

          {/* Admin hint */}
          <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-start gap-2">
            <ShieldCheck size={15} className="text-gray-400 mt-0.5 shrink-0" />
            <p className="text-xs text-gray-400">Admin? Use <span className="font-mono font-semibold text-gray-600">admin@skylent.com</span> / <span className="font-mono font-semibold text-gray-600">admin123</span></p>
          </div>

          <div className="mt-4 p-4 bg-brand-50 rounded-xl border border-brand-100">
            <p className="text-xs text-brand-700 font-medium text-center">🎓 New to Skylent? Start your career journey today.</p>
            <Link to="/signup" className="block w-full text-center mt-2 text-sm font-semibold text-brand-600 hover:underline">Create Free Account →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
