const router = require('express').Router();
const { getCourses, getCourseById } = require('../controllers/courseController');

router.get('/', getCourses);
router.get('/:id', getCourseById);

module.exports = router;