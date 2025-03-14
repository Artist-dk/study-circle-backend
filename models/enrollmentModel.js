const db = require("../config/database");

const Enrollment = {
    getUserEnrollments: async (userId) => {
        const sql = `
            SELECT c.id AS courseId, c.title, c.description, c.github_repo, e.enrolled_at
            FROM enrollments e
            JOIN courses c ON e.course_id = c.id
            WHERE e.user_id = ?
        `;

        const [results] = await db.promise().query(sql, [userId]);
        return results;
    },
};

module.exports = Enrollment;
