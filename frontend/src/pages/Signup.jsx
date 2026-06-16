import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, Mail, Lock, User, Phone, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const passwordStrength = (pw) => {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
};

const strengthLabel = (s) => ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][s];
const strengthColor = (s) => ['', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-emerald-500'][s];

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [formRole, setFormRole] = useState('student');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const pwStrength = passwordStrength(form.password);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('Please fill in all required fields'); return; }
    if (form.password !== form.confirm) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (!agreed) { setError('Please agree to the terms and conditions'); return; }
    setLoading(true);
    setError('Sign-up is temporarily unavailable. Please log in with the demo account.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — purple gradient */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-900 via-blue-950 to-sky-950 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-sky-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link to="/" className="flex items-center gap-2.5 mb-12">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <GraduationCap size={22} className="text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">Skylent Global</span>
          </Link>
          <h2 className="font-display text-4xl font-bold text-white mb-4 leading-tight">
            Your career<br />starts here.
          </h2>
          <p className="text-white/60 text-lg mb-10">Join 500+ students who turned their ambitions into high-paying careers. Industry mentors, live projects, guaranteed placement.</p>

          <div className="space-y-4">
            {[
              { icon: '🚀', title: 'Fast-Track Programs', desc: '4–8 months to job-readiness' },
              { icon: '👨‍💼', title: '1:1 Industry Mentors', desc: 'Work with real professionals' },
              { icon: '💼', title: 'Placement Guarantee', desc: 'We place you or refund you' },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3">
                <span className="text-2xl mt-0.5">{item.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                  <p className="text-white/50 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-6 lg:hidden">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <GraduationCap size={18} className="text-white" />
            </div>
            <span className="font-display font-bold text-lg text-gray-900">Skylent Global</span>
          </Link>

          <div className="mb-6">
            <h1 className="font-display text-3xl font-bold text-gray-900">Create your account</h1>
            <p className="text-gray-500 mt-2">Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link></p>
          </div>

          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl px-4 py-3 mb-5">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-400">*</span></label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="Your full name" className="input-field pl-10" autoComplete="name" />
              </div>
            </div>

            {/* Role toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-2">
              {['student', 'admin', 'organization'].map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setFormRole(r)}
                  className={`flex-1 py-2 text-sm font-medium rounded-lg capitalize transition-all ${formRole === r ? 'bg-blue-500 text-white shadow' : 'text-gray-600 hover:bg-gray-200'}`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address <span className="text-red-400">*</span></label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className="input-field pl-10" autoComplete="email" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number <span className="text-gray-400 font-normal">(optional)</span></label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="input-field pl-10" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="password" type={showPw ? 'text' : 'password'} value={form.password} onChange={handleChange} placeholder="Min 6 characters" className="input-field pl-10 pr-10" autoComplete="new-password" />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= pwStrength ? strengthColor(pwStrength) : 'bg-gray-100'}`} />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">{strengthLabel(pwStrength)}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password <span className="text-red-400">*</span></label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="Repeat your password" className="input-field pl-10 pr-10" autoComplete="new-password" />
                {form.confirm && form.password === form.confirm && (
                  <CheckCircle2 size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-green-500" />
                )}
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer pt-1">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 w-4 h-4 accent-blue-500 shrink-0" />
              <span className="text-sm text-gray-600">
                I agree to Skylent's{' '}
                <Link to="/terms" className="text-blue-500 hover:underline">Terms of Service</Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 shadow-lg shadow-blue-500/25 disabled:opacity-60 disabled:cursor-not-allowed transition-all mt-2"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</>
              ) : (
                <>Create Free Account <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-5">
            By creating an account, you get access to free resources,<br />course previews, and career counselling.
          </p>
          <p className="text-center mt-4">
            <Link to="/login" className="text-blue-600 hover:underline">Go to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}