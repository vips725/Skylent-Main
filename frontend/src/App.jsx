import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Courses from './pages/Courses';
import CoursePreview from './pages/CoursePreview';
import { MBAPage, CertificationsPage, PlacementsPage, AboutPage, ContactPage } from './pages/OtherPages';

const noLayoutRoutes = ['/login', '/signup'];

function Layout() {

  const location = useLocation();

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [location.pathname]);
  const hideLayout = noLayoutRoutes.some(r => location.pathname.startsWith(r));

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="animate-fade-in" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CoursePreview />} />
          <Route path="/mba" element={<MBAPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/placements" element={<PlacementsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="font-display text-8xl font-bold text-brand-100">404</div>
                <h2 className="font-display text-2xl font-bold text-gray-900 mt-4 mb-2">Page not found</h2>
                <p className="text-gray-500 mb-6">The page you're looking for doesn't exist.</p>
                <a href="/" className="btn-primary inline-flex">Go Home</a>
              </div>
            </div>
          } />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </BrowserRouter>
  );
}
