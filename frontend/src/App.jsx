import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CoursePreview from './pages/CoursePreview';
import { PlacementsPage } from './pages/OtherPages';
import SupportPage from './pages/Support';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminRoute from './components/AdminRoute';

import AdminDashboard from './components/AdminDashboard';
import AnalyticsPage from './pages/AnalyticsPage';
import UsersPage from './pages/UsersPage';
import CoursesAdminPage from './pages/CoursesAdminPage';
import ReportsPage from './pages/ReportsPage';
import EngagementPage from './pages/EngagementPage';
import StudentLayout from './layouts/StudentLayout';
import StudentRoute from './components/StudentRoute';
import StudentCoursesPage from './pages/StudentCoursesPage';
import StudentDashboard from './components/StudentDashboard';
import { DarkModeProvider } from './context/DarkModeContext';

const noLayoutRoutes = ['/login', '/signup'];

function Layout() {

  const location = useLocation();

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [location.pathname]);
  const hideLayout = noLayoutRoutes.some(r => location.pathname.startsWith(r));

  return (
    <>
      {!hideLayout && <Navbar />}
      <main className="animate-fade-in min-h-screen">
        <Outlet />
      </main>
      {!hideLayout && <Footer />}
    </>
  );
}

function AdminApp() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

function StudentApp() {
  return (
    <StudentLayout>
      <Outlet />
    </StudentLayout>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes with main layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="courses" element={<Courses />} />
            <Route path="courses/:id" element={<CoursePreview />} />
            <Route path="placements" element={<PlacementsPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminApp />
              </AdminRoute>
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="courses" element={<CoursesAdminPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="engagement" element={<EngagementPage />} />
          </Route>

          {/* Student routes */}
          <Route path="/student" element={
            <ProtectedRoute>
              <StudentRoute>
                <StudentApp />
              </StudentRoute>
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="courses" element={<StudentCoursesPage />} />
          </Route>

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
      </AuthProvider>
    </BrowserRouter>
  );
}