const Course = require("../models/Course");
const db = require("../config/db");

const createCourse = async (req, res) => {
    try {
        const { title, description, github_repo } = req.body;

        const newCourse = await Course.create({
            title,
            description,
            github_repo,
        });

        res.status(201).json({
            message: "Course created successfully",
            course: newCourse,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


const getCourses = async (req, res) => {
    try {
        let { page, limit } = req.query;
        
        // Set default values if not provided
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const offset = (page - 1) * limit;
        
        const { count, rows: courses } = await Course.findAndCountAll({
            attributes: ["id", "title", "description", "github_repo", "created_at"],
            limit,
            offset,
        });
        
        res.status(200).json({
            message: "Courses retrieved successfully",
            totalCourses: count,
            totalPages: Math.ceil(count / limit),
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

    if (!title || !github_repo) {
        return res.status(400).json({ message: "Title and GitHub repo are required." });
    }

    try {
        const [result] = await db.execute(
            "UPDATE courses SET title = ?, description = ?, github_repo = ?, updated_at = NOW() WHERE id = ?",
            [title, description, github_repo, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Course not found or no changes made." });
        }

        res.status(200).json({ message: "Course updated successfully." });
    } catch (error) {
        console.error("Error updating course:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

const getCourseById = async (req, res) => {
    const { id } = req.params;

    try {
        const [courseRows] = await db.execute("SELECT * FROM courses WHERE id = ?", [id]);

        if (courseRows.length === 0) {
            return res.status(404).json({ message: "Course not found." });
        }

        const course = courseRows[0];

        const [sections] = await db.execute(
            "SELECT * FROM course_sections WHERE course_id = ? ORDER BY position ASC",
            [id]
        );

        for (const section of sections) {
            const [lessons] = await db.execute(
                "SELECT * FROM lessons WHERE section_id = ? ORDER BY position ASC",
                [section.id]
            );
            section.lessons = lessons;
        }

        course.sections = sections;

        res.status(200).json(course);
    } catch (error) {
        console.error("Error fetching course details:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};


const deleteCourse = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if course exists
        const course = await db('courses').where({ id }).first();
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Delete course (cascade deletes sections & lessons)
        await db('courses').where({ id }).del();

        return res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        console.error('Error deleting course:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { getCourses, createCourse, updateCourse, getCourseById, deleteCourse };