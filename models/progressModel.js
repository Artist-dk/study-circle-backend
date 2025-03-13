
const db = require('../config/database');

const Progress = {
    markLessonComplete: async (userId, lessonId) => {
        console.log("userId from model function: ", userId);
        const sql = `INSERT INTO user_progress (user_id, lesson_id, completed_at) VALUES (?, ?, NOW())
                     ON DUPLICATE KEY UPDATE completed_at = NOW()`;
        return db.query(sql, [userId, lessonId]);
    },

    getCourseProgress: async (userId, courseId) => {
        const sql = `
            SELECT l.id as lessonId, l.title, IF(up.completed_at IS NOT NULL, true, false) as completed
            FROM lessons l
            LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ?
            WHERE EXISTS (
                SELECT 1 FROM courses c WHERE c.id = ? AND l.course_id = c.id
            )
        `;
        const [results] = await db.query(sql, [userId, courseId]);

        // const sql = `SELECT l.id as lessonId, l.title, IF(up.completed_at IS NOT NULL, true, false) as completed
        //              FROM lessons l
        //              LEFT JOIN user_progress up ON l.id = up.lesson_id AND up.user_id = ?
        //              WHERE l.course_id = ?`;
        // const [results] = await db.query(sql, [userId, courseId]);
        return results;
    }
};

module.exports = Progress;