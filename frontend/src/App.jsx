import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Courses from './pages/Courses';
import CoursePreview from './pages/CoursePreview';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import { MBAPage, CertificationsPage, PlacementsPage, AboutPage, ContactPage } from './pages/OtherPages';

const noLayoutRoutes = ['/login', '/signup', '/dashboard', '/admin'];

function Layout() {
  const location = useLocation();
  const hideLayout = noLayoutRoutes.some(r => location.pathname.startsWith(r));

  return (
    <>
      {!hideLayout && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CoursePreview />} />
          <Route path="/mba" element={<MBAPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
          <Route path="/placements" element={<PlacementsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/*" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
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
