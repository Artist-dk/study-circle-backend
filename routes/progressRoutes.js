const express = require('express');
const router = express.Router();

const { trackProgress, getProgress } = require('../controllers/progressController');
const { verifyToken } = require('../middlewares/userMiddleware');

router.post('/:lessonId', verifyToken, trackProgress);
router.get('/:courseId', verifyToken, getProgress);

console.log("progressRoutes.js: testing progressRoutes ");
module.exports = router;