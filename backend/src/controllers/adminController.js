const { users, courses } = require('../data/store');

const getUsers = (req, res) => {
  res.json({ users: users.map(u => ({ id: u.id, name: u.name, email: u.email, role: u.role, enrolledCourses: u.enrolledCourses, createdAt: u.createdAt, completion: u.completion, streak: u.streak, status: u.status })) });
};

const getStats = (req, res) => {
  const students = users.filter(u => u.role === 'student');
  const totalEnrollments = students.reduce((sum, u) => sum + u.enrolledCourses.length, 0);
  const revenue = students.reduce((sum, u) => sum + u.enrolledCourses.reduce((s, cid) => { const c = courses.find(x => x.id === cid); return s + (c?.price || 0); }, 0), 0);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyRevenue = [120000, 145000, 132000, 178000, 195000, 210000, 198000, 215000, 240000, 228000, 265000, 290000];
  const monthlyEnrollments = [45, 52, 48, 65, 72, 80, 75, 88, 95, 90, 105, 118];
  const categoryMap = {};
  students.forEach(u => {
    u.enrolledCourses.forEach(cid => {
      const c = courses.find(x => x.id === cid);
      if (c) categoryMap[c.category] = (categoryMap[c.category] || 0) + 1;
    });
  });
  const enrollmentByCategory = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  const topCourses = courses.map(c => {
    const enrolledCount = students.filter(u => u.enrolledCourses.includes(c.id)).length;
    return { ...c, enrolledCount, revenue: enrolledCount * c.price };
  }).sort((a, b) => b.enrolledCount - a.enrolledCount).slice(0, 5);
  res.json({ totalStudents: students.length, totalCourses: courses.length, totalEnrollments, revenue, monthlyRevenue, monthlyEnrollments, months, enrollmentByCategory, topCourses });
};

const createCourse = (req, res) => {
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
};

const deleteCourse = (req, res) => {
  const idx = courses.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Course not found' });
  courses.splice(idx, 1);
  res.json({ message: 'Course deleted' });
};

const updateCourse = (req, res) => {
  const idx = courses.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Course not found' });
  const { curriculum, ...fields } = req.body;
  courses[idx] = { ...courses[idx], ...fields, curriculum: curriculum || courses[idx].curriculum };
  res.json({ message: 'Course updated', course: courses[idx] });
};

const deleteUser = (req, res) => {
  const idx = users.findIndex(u => u.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'User not found' });
  users.splice(idx, 1);
  res.json({ message: 'User deleted' });
};

const getAdminCourses = (req, res) => res.json({ courses });

const getCertificates = (req, res) => {
  const mockCertificates = [
    { id: 'cert-1', studentName: 'Rahul Sharma', course: 'Full Stack Web Development', issueDate: '2025-06-10', status: 'issued', grade: 'A' },
    { id: 'cert-2', studentName: 'Priya Patel', course: 'Data Science & Machine Learning', issueDate: '2025-06-08', status: 'issued', grade: 'A+' },
    { id: 'cert-3', studentName: 'Amit Kumar', course: 'MBA in Business Analytics', issueDate: '2025-05-28', status: 'issued', grade: 'B+' },
    { id: 'cert-4', studentName: 'Sneha Gupta', course: 'UI/UX Design Professional', issueDate: '2025-05-15', status: 'pending', grade: '-' },
    { id: 'cert-5', studentName: 'Vikram Singh', course: 'Cloud Computing & DevOps', issueDate: '2025-04-22', status: 'issued', grade: 'A' },
    { id: 'cert-6', studentName: 'Neha Reddy', course: 'Digital Marketing Mastery', issueDate: '2025-03-30', status: 'issued', grade: 'A-' },
    { id: 'cert-7', studentName: 'Arjun Nair', course: 'Full Stack Web Development', issueDate: '2025-06-01', status: 'pending', grade: '-' },
    { id: 'cert-8', studentName: 'Kavita Desai', course: 'Data Science & Machine Learning', issueDate: '2025-05-10', status: 'issued', grade: 'A' },
  ];
  res.json({ certificates: mockCertificates });
};

const getReports = (req, res) => {
  const mockReports = [
    { id: 'rep-1', title: 'Monthly Revenue Report', type: 'Financial', date: '2025-06-01', status: 'completed' },
    { id: 'rep-2', title: 'Student Enrollment Analysis Q2', type: 'Analytics', date: '2025-05-28', status: 'completed' },
    { id: 'rep-3', title: 'Course Completion Rates', type: 'Academic', date: '2025-05-15', status: 'completed' },
    { id: 'rep-4', title: 'Instructor Performance Review', type: 'HR', date: '2025-04-20', status: 'completed' },
    { id: 'rep-5', title: 'Platform Traffic & Engagement', type: 'Analytics', date: '2025-06-10', status: 'pending' },
    { id: 'rep-6', title: 'Refund & Cancellation Summary', type: 'Financial', date: '2025-03-30', status: 'completed' },
  ];
  res.json({ reports: mockReports });
};

const getEngagement = (req, res) => {
  const mockEngagement = {
    activeUsersToday: 142,
    avgSessionDuration: '18m 42s',
    totalWatchTime: '2,340 hrs',
    discussionPosts: 89,
    quizAttempts: 456,
    completionRate: 72,
    weeklyActive: [120, 135, 142, 138, 155, 168, 142],
    topDiscussions: [
      { topic: 'React Hooks deep dive', replies: 34, views: 156 },
      { topic: 'ML model deployment tips', replies: 28, views: 124 },
      { topic: 'Best UX research methods', replies: 22, views: 98 },
      { topic: 'Cloud architecture patterns', replies: 19, views: 87 },
    ],
  };
  res.json(mockEngagement);
};

module.exports = { getUsers, getStats, createCourse, deleteCourse, updateCourse, deleteUser, getAdminCourses, getCertificates, getReports, getEngagement };