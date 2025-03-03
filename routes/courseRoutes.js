const express = require("express");
const { createCourse, getCourses } = require("../controllers/courseController");
const adminAuth = require("../middlewares/authMiddleware");
const validateCourse = require("../middlewares/validateCourse");

const router = express.Router();

router.post("/courses", adminAuth, validateCourse, createCourse);
router.get("/courses", getCourses);

module.exports = router;