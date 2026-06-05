import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Courses', path: '/courses' },
  { label: 'MBA', path: '/mba' },
  { label: 'Certifications', path: '/certifications' },
  { label: 'Placements', path: '/placements' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-brand-500/30 transition-shadow">
              <GraduationCap size={20} className="text-white" />
            </div>
            <div>
              <span className="font-display font-bold text-lg text-gray-900">Skylent</span>
              <span className="font-display font-bold text-lg text-brand-500">Global</span>
              <div className="text-[9px] text-gray-400 font-medium -mt-1 leading-tight">BUILD SKILLS. BUILD CAREERS.</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.path
                    ? 'text-brand-600 bg-brand-50'
                    : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="https://skylent-global-demo.vercel.app/login" className="text-sm font-medium text-gray-600 hover:text-brand-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all">
              Log In
            </a>
            <a href="https://skylent-global-demo.vercel.app/signup" className="btn-primary text-sm py-2.5 px-5">
              Get Started Free
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.path ? 'text-brand-600 bg-brand-50' : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 pb-1 border-t border-gray-100 space-y-2">
              <a href="https://skylent-global-demo.vercel.app/login" className="block w-full text-center border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium">Log In</a>
              <a href="https://skylent-global-demo.vercel.app/signup" className="block w-full text-center bg-brand-500 text-white py-2.5 rounded-xl text-sm font-semibold">Get Started Free</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
