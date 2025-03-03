const Course = require("../models/Course");

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
module.exports = { getCourses, createCourse, updateCourse };