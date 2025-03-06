// courseRoutes.js

const express = require("express");
const { createCourse, getCourses, updateCourse, deleteCourse, getCourseById } = require("../controllers/courseController");
const { adminAuth, verifyToken, isAdmin, authMiddleware } = require("../middlewares/userMiddleware");

const router = express.Router();

// router.post("/", adminAuth, createCourse);
router.post("/", createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
// router.put("/:id", verifyToken, isAdmin, updateCourse);
router.put("/:id", updateCourse);
// router.delete('/:id', isAdmin, deleteCourse);
router.delete('/:id', deleteCourse);


module.exports = router;