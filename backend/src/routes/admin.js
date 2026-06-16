const router = require('express').Router();
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { getUsers, getStats, createCourse, deleteCourse, updateCourse, deleteUser, getAdminCourses, getCertificates, getReports, getEngagement } = require('../controllers/adminController');

router.use(authenticateToken, requireAdmin);

router.get('/users', getUsers);
router.get('/stats', getStats);
router.get('/courses', getAdminCourses);
router.get('/certificates', getCertificates);
router.get('/reports', getReports);
router.get('/engagement', getEngagement);
router.post('/courses', createCourse);
router.put('/courses/:id', updateCourse);
router.delete('/courses/:id', deleteCourse);
router.delete('/users/:id', deleteUser);

module.exports = router;