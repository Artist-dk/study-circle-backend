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

module.exports = { getCourses, createCourse };