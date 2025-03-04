const express = require("express");
const validateCourse = require("../middlewares/validateCourse");
const { 
  createCourse, 
  getCourses,
  deleteCourse,
  updateCourse,
  getCourseById 
} = require("../controllers/courseController");
const { 
  isAdmin, 
  adminAuth, 
  verifyToken 
} = require('../middleware/authMiddleware');
const router = express.Router();

router.post("/courses", adminAuth, validateCourse, createCourse);
router.get("/courses", getCourses);
router.put("/:id", verifyToken, isAdmin, updateCourse);
router.get("/:id", getCourseById);
router.delete('/:id', isAdmin, deleteCourse);

module.exports = router;