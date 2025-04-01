// courseModel.js

const db = require("../config/database");

const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, results) => {
            if (err) {
                console.error("Database Query Error:", err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const Course = {
    create: async (data) => {
        const results = await query("INSERT INTO courses (title, description, github_repo) VALUES(?, ?, ?)", [data.title, data.description, data.github_repo]);
        if (results.insertId) {
            const newCourseId = results.insertId;
            console.log("newCourseId from model function: ", newCourseId);
            return newCourseId;
        } else {
            console.error("Error creating course or missing insertId:", results);
            return null;
        }
    },

    getAll: async (limit, offset) => {
        // const totalCoursesResult = await query("SELECT COUNT(*) as count FROM courses");
        // const totalCourses = totalCoursesResult[0][0].count;

        // const coursesResult = await query("SELECT * FROM courses LIMIT ? OFFSET ?", [limit, offset]);
        const coursesResult = await query("SELECT * FROM courses");
        // return { courses: coursesResult[0], totalCourses: totalCourses };
        return coursesResult;
    },

    getById: async (id) => {
        const results = await query("SELECT * FROM courses WHERE id = ?", id);
        return results || null;
    },

    update: async (id, data) => {
        const results = await query("UPDATE courses SET title = ?, description = ?, github_repo = ?, updated_at = NOW() WHERE id = ?", [data.title, data.description, data.github_repo, id]);
        if (results.affectedRows === 0) {
            return null;
        }
        return Course.getById(id);
    },

    getSectionsWithLessons: async (courseId) => {
        const [sections] = await query("SELECT * FROM course_sections WHERE course_id = ? ORDER BY position ASC", [courseId]);

        for (const section of sections) {
            const [lessons] = await query("SELECT * FROM lessons WHERE section_id = ? ORDER BY position ASC", [section.id]);
            section.lessons = lessons;
        }
        return sections;
    },
    delete: async (courseId) => {
        try {
            await query(
                "DELETE FROM lessons WHERE section_id IN (SELECT id FROM course_sections WHERE course_id = ?)",
                [courseId]
            );
            await query("DELETE FROM course_sections WHERE course_id = ?", [courseId]);
            const result = await query("DELETE FROM courses WHERE id = ?", [courseId]);
            if (result.affectedRows === 0) {
                return null;
            }
            return { message: "Course deleted successfully" };
        } catch (error) {
            console.error("Error deleting course:", error);
            throw error;
        }
    }
    
};

module.exports = Course;