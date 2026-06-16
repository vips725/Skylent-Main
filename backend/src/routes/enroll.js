const router = require('express').Router();
const { enroll } = require('../controllers/courseController');
const { authenticateToken } = require('../middleware/auth');

router.post('/:courseId', authenticateToken, enroll);

module.exports = router;