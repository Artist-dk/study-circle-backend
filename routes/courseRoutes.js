const express = require("express");
const { createCourse, getCourses } = require("../controllers/courseController");
const adminAuth = require("../middlewares/authMiddleware");
const validateCourse = require("../middlewares/validateCourse");

const router = express.Router();

router.post("/courses", adminAuth, validateCourse, createCourse);
router.get("/courses", getCourses);
router.put("/:id", verifyToken, isAdmin, updateCourse);

module.exports = router;