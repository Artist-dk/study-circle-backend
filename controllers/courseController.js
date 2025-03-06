// courseController.js

const Course = require("../models/courseModel");

const createCourse = async (req, res) => {
    try {
        const { title, description, github_repo } = req.body;
        const newCourseId = await Course.create({ title, description, github_repo });
        res.status(201).json({ message: "Course created successfully", course: newCourseId });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const getCourses = async (req, res) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const offset = (page - 1) * limit;

        const { courses, totalCourses } = await Course.getAll(limit, offset);

        res.status(200).json({
            message: "Courses retrieved successfully",
            totalCourses,
            totalPages: Math.ceil(totalCourses / limit),
            currentPage: page,
            courses,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, description, github_repo } = req.body;
    console.log("courseController.getCourseById: { title, description, github_repo } :", { title, description, github_repo } )

    if (!title || !github_repo) {
        return res.status(400).json({ message: "Title and GitHub repo are required." });
    }

    try {
        const updatedCourse = await Course.update(id, { title, description, github_repo });
        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found or no changes made." });
        }
        res.status(200).json({ message: "Course updated successfully.", course: updatedCourse });
    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const getCourseById = async (req, res) => {
    const { id } = req.params;
    console.log("courseController.getCourseById: { id:", id,"}")
    try {
        const course = await Course.getById(id);
        console.log("courseController.getCourseById: { course:", course,"}")

        if (!course) {
            return res.status(404).json({ message: "Course not found." });
        }

        // const sections = await Course.getSectionsWithLessons(id);

        // course.sections = sections;

        res.status(200).json(course);
    } catch (error) {
        console.error("Error fetching course details:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = { getCourses, createCourse, updateCourse, getCourseById };