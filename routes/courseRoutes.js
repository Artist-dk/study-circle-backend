const express = require("express");
const { createCourse, getCourses } = require("../controllers/courseController");
const  { adminAuth, verifyToken, isAdmin } = require("../middleware/authMiddleware");
const validateCourse = require("../middlewares/validateCourse");

const router = express.Router();

router.post("/courses", adminAuth, validateCourse, createCourse);
router.get("/courses", getCourses);
router.put("/:id", verifyToken, isAdmin, updateCourse);
router.get("/:id", getCourseById);

module.exports = router;