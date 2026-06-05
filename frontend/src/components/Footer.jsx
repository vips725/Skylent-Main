import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Twitter, Linkedin, Instagram, Youtube, Facebook } from 'lucide-react';

const footerLinks = {
  Programs: [
    { label: 'Full Stack Development', path: '/courses' },
    { label: 'Data Science & ML', path: '/courses' },
    { label: 'Digital Marketing', path: '/courses' },
    { label: 'MBA Programs', path: '/mba' },
    { label: 'Certifications', path: '/certifications' },
  ],
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Placements', path: '/placements' },
    { label: 'Blog', path: '/blog' },
    { label: 'Careers', path: '/careers' },
    { label: 'Press', path: '/press' },
  ],
  Support: [
    { label: 'Contact Us', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Service', path: '/terms' },
    { label: 'Refund Policy', path: '/refund' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center">
                <GraduationCap size={20} className="text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white">Skylent</span>
                <span className="font-display font-bold text-lg text-brand-400">Global</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              India's fastest-growing edtech platform. We've helped 500+ students land jobs with ₹6–12 LPA packages through industry-ready programs.
            </p>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail size={14} className="text-brand-400" />
                <span>admissions@skylent.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone size={14} className="text-brand-400" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={14} className="text-brand-400" />
                <span>Bengaluru, Karnataka, India</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {[Twitter, Linkedin, Instagram, Youtube, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-brand-500 flex items-center justify-center transition-colors duration-200">
                  <Icon size={14} className="text-gray-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-sm text-gray-400 hover:text-brand-400 transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Stats bar */}
        <div className="border-t border-gray-800 border-b border-gray-800 py-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '500+', label: 'Students Trained' },
              { value: '₹6-12 LPA', label: 'Average Package' },
              { value: '50+', label: 'Hiring Partners' },
              { value: '95%', label: 'Placement Rate' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display font-bold text-2xl text-white">{stat.value}</div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <span>© 2024 Skylent Global Pvt. Ltd. All rights reserved.</span>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-brand-400 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-brand-400 transition-colors">Terms</Link>
            <Link to="/refund" className="hover:text-brand-400 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
