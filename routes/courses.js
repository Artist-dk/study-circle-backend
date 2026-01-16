const express = require("express");
const router = express.Router();
const db = require("../config/db.js"); // MySQL2 connection

// Fetch all courses
router.get("/", async (req, res) => {
    try {
        const [courses] = await db.query("SELECT * FROM courses");
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Create a new course
router.post("/", async (req, res) => {
    const { title, github_repo } = req.body;
    if (!title || !github_repo) {
        return res.status(400).json({ error: "Title and GitHub repo are required" });
    }

    try {
        const [result] = await db.query(
            "INSERT INTO courses (title, github_repo) VALUES (?, ?)",
            [title, github_repo]
        );

        res.status(201).json({ id: result.insertId, title, github_repo });
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
