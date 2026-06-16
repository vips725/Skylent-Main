import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, LogIn, Sparkles } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Programs', path: '/courses' },
  { label: 'Placements', path: '/placements' },
  { label: 'Support', path: '/support' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/60 backdrop-blur-2xl bg-gradient-to-r from-white/80 via-sky-100/30 to-blue-100/20 border-b border-blue-200/50 shadow-lg shadow-blue-200/30 ring-1 ring-white/40' : 'bg-white/60 backdrop-blur-2xl bg-gradient-to-r from-white/80 via-sky-100/30 to-blue-100/20 border-b border-blue-200/50 shadow-lg shadow-blue-200/30 ring-1 ring-white/40'}`}>
      {/* Subtle decorative blue glow */}
      <div className="absolute top-0 right-0 w-96 h-32 bg-gradient-to-br from-blue-200/30 via-sky-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group relative">
            <img src="/skyy.png" alt="Skylent" className="h-24 w-auto drop-shadow-sm" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'bg-gradient-to-r from-blue-50 to-sky-50 text-brand-600 font-semibold rounded-full'
                    : 'text-gray-600 hover:text-brand-600 hover:bg-brand-50/50 rounded-full'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-brand-600 hover:bg-brand-50 border border-brand-200 rounded-full px-4 py-2 flex items-center gap-2 transition-all">
              <LogIn size={14} /> Log In
            </Link>
            <Link to="/signup" className="btn-primary text-sm py-2 px-5 rounded-full flex items-center gap-2 bg-gradient-to-r from-brand-500 via-sky-500 to-blue-500 hover:from-brand-600 hover:via-sky-600 hover:to-blue-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all">
              <Sparkles size={14} /> Request Access
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition-colors">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-blue-100/50 shadow-xl animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2.5 text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-gradient-to-r from-blue-50 to-sky-50 text-brand-600 font-semibold rounded-full'
                    : 'text-gray-700 hover:text-brand-600 hover:bg-brand-50/50 rounded-full'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 pb-1 border-t border-blue-100/50 space-y-2">
              <Link to="/login" className="flex items-center justify-center gap-2 w-full border border-brand-200 text-brand-600 hover:bg-brand-50 py-2.5 rounded-full text-sm font-medium transition-all">
                <LogIn size={14} /> Log In
              </Link>
              <Link to="/signup" className="flex items-center justify-center gap-2 w-full btn-primary py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-brand-500 via-sky-500 to-blue-500 hover:from-brand-600 hover:via-sky-600 hover:to-blue-600">
                <Sparkles size={14} /> Request Access
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
