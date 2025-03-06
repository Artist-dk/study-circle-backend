// courseRoutes.js

const express = require("express");
const { createCourse, getCourses, updateCourse, getCourseById } = require("../controllers/courseController");
const { adminAuth, verifyToken, isAdmin, authMiddleware } = require("../middlewares/userMiddleware");

const router = express.Router();

// router.post("/", adminAuth, createCourse);
router.post("/", createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
// router.put("/:id", verifyToken, isAdmin, updateCourse);
router.put("/:id", updateCourse);

module.exports = router;