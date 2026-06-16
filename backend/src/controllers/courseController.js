const { courses, users } = require('../data/store');

const getCourses = (req, res) => res.json({ courses });

const getCourseById = (req, res) => {
  const course = courses.find(c => c.id === req.params.id);
  if (!course) return res.status(404).json({ message: 'Course not found' });
  res.json({ course });
};

const enroll = (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  if (user.enrolledCourses.includes(req.params.courseId)) return res.status(409).json({ message: 'Already enrolled' });
  user.enrolledCourses.push(req.params.courseId);
  res.json({ message: 'Enrolled successfully', enrolledCourses: user.enrolledCourses });
};

module.exports = { getCourses, getCourseById, enroll };