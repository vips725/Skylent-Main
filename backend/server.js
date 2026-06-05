require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'skylent_super_secret_key_2024';

// ─── In-memory stores ────────────────────────────────────────────────────────
const users = [];
const courses = [
  { id: '1', title: 'Full Stack Web Development', category: 'Technology', duration: '6 months', price: 29999, originalPrice: 49999, rating: 4.8, students: 1240, level: 'Beginner to Advanced', image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80', badge: 'Bestseller', instructor: 'Rajesh Kumar', description: 'Master HTML, CSS, JavaScript, React, Node.js and more.' },
  { id: '2', title: 'Data Science & Machine Learning', category: 'Technology', duration: '8 months', price: 34999, originalPrice: 59999, rating: 4.9, students: 980, level: 'Intermediate', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80', badge: 'Hot', instructor: 'Priya Sharma', description: 'Python, Pandas, ML algorithms, Deep Learning & real projects.' },
  { id: '3', title: 'Digital Marketing Mastery', category: 'Marketing', duration: '4 months', price: 19999, originalPrice: 34999, rating: 4.7, students: 2100, level: 'Beginner', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80', badge: 'Popular', instructor: 'Amit Verma', description: 'SEO, SEM, Social Media, Content Marketing & Analytics.' },
  { id: '4', title: 'MBA in Business Analytics', category: 'MBA', duration: '24 months', price: 149999, originalPrice: 199999, rating: 4.8, students: 560, level: 'Advanced', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', badge: 'Premium', instructor: 'Dr. Sunita Rao', description: 'Industry-aligned MBA with specialisation in Business Analytics.' },
  { id: '5', title: 'UI/UX Design Professional', category: 'Design', duration: '5 months', price: 24999, originalPrice: 44999, rating: 4.6, students: 870, level: 'Beginner to Intermediate', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&q=80', badge: 'New', instructor: 'Neha Singh', description: 'Figma, user research, wireframing, prototyping & design systems.' },
  { id: '6', title: 'Cloud Computing & DevOps', category: 'Technology', duration: '6 months', price: 32999, originalPrice: 54999, rating: 4.8, students: 720, level: 'Intermediate', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80', badge: 'Trending', instructor: 'Vikram Mehta', description: 'AWS, Docker, Kubernetes, CI/CD pipelines & cloud architecture.' },
];

// Seed admin
(async () => {
  const hash = await bcrypt.hash('admin123', 12);
  users.push({
    id: 'admin-001',
    name: 'Admin User',
    email: 'admin@skylent.com',
    phone: '',
    password: hash,
    createdAt: new Date().toISOString(),
    enrolledCourses: [],
    role: 'admin',
  });
})();

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'], credentials: true }));
app.use(express.json());

const authenticateToken = (req, res, next) => {
  const token = (req.headers['authorization'] || '').split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token required' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin access required' });
  next();
};

// ─── Auth routes ──────────────────────────────────────────────────────────────
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Name, email, and password are required' });
    if (users.find(u => u.email === email.toLowerCase())) return res.status(409).json({ message: 'An account with this email already exists' });
    if (password.length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = { id: Date.now().toString(), name: name.trim(), email: email.toLowerCase().trim(), phone: phone || '', password: hashedPassword, createdAt: new Date().toISOString(), enrolledCourses: [], role: 'student' };
    users.push(newUser);
    const token = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: 'Account created successfully', token, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
  } catch (err) { res.status(500).json({ message: 'Internal server error' }); }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
    const user = users.find(u => u.email === email.toLowerCase().trim());
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: 'Invalid email or password' });
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Login successful', token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { res.status(500).json({ message: 'Internal server error' }); }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, enrolledCourses: user.enrolledCourses } });
});

app.post('/api/auth/logout', authenticateToken, (req, res) => res.json({ message: 'Logged out successfully' }));

// ─── Courses (public) ─────────────────────────────────────────────────────────
app.get('/api/courses', (req, res) => res.json({ courses }));
app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json({ course });
});

// ─── Enrollment ───────────────────────────────────────────────────────────────
app.post('/api/enroll/:courseId', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user.enrolledCourses.includes(req.params.courseId)) return res.status(409).json({ message: 'Already enrolled' });
  user.enrolledCourses.push(req.params.courseId);
  res.json({ message: 'Enrolled successfully', enrolledCourses: user.enrolledCourses });
});

// ─── Admin routes ─────────────────────────────────────────────────────────────
app.get('/api/admin/users', authenticateToken, requireAdmin, (req, res) => {
  res.json({ users: users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role, enrolledCourses: u.enrolledCourses, createdAt: u.createdAt })) });
});

app.get('/api/admin/stats', authenticateToken, requireAdmin, (req, res) => {
  const students = users.filter(u => u.role === 'student');
  res.json({
    totalStudents: students.length,
    totalCourses: courses.length,
    totalEnrollments: students.reduce((sum, u) => sum + u.enrolledCourses.length, 0),
    revenue: students.reduce((sum, u) => sum + u.enrolledCourses.reduce((s, cid) => { const c = courses.find(x => x.id === cid); return s + (c?.price || 0); }, 0), 0),
  });
});

app.post('/api/admin/courses', authenticateToken, requireAdmin, (req, res) => {
  const { title, category, duration, price, originalPrice, level, instructor, description, badge, image, curriculum, visibility, tags, subtitle, introVideo } = req.body;
  const newCourse = {
    id: Date.now().toString(), title, subtitle, category, duration,
    price: Number(price) || 0, originalPrice: Number(originalPrice) || 0,
    rating: 4.5, students: 0, level,
    image: image || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80',
    badge: badge || 'New', instructor, description, curriculum: curriculum || [],
    visibility: visibility || 'public', tags: tags || '', introVideo: introVideo || '',
  };
  courses.push(newCourse);
  res.status(201).json({ message: 'Course created', course: newCourse });
});

app.delete('/api/admin/users/:id', authenticateToken, requireAdmin, (req, res) => {
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'User not found' });
  users.splice(idx, 1);
  res.json({ message: 'User deleted' });
});

// ─── Health ───────────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.listen(PORT, () => console.log(`✅ Skylent API running on http://localhost:${PORT}\n   Admin: admin@skylent.com / admin123`));

// ─── Delete course ────────────────────────────────────────────────────────────
app.delete('/api/admin/courses/:id', authenticateToken, requireAdmin, (req, res) => {
  const idx = courses.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Course not found' });
  courses.splice(idx, 1);
  res.json({ message: 'Course deleted' });
});

// ─── Update course ────────────────────────────────────────────────────────────
app.put('/api/admin/courses/:id', authenticateToken, requireAdmin, (req, res) => {
  const idx = courses.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Course not found' });
  const { curriculum, ...fields } = req.body;
  courses[idx] = { ...courses[idx], ...fields, curriculum: curriculum || courses[idx].curriculum };
  res.json({ message: 'Course updated', course: courses[idx] });
});
