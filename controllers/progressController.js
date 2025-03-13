
const Progress = require('../models/progressModel');

exports.trackProgress = async (req, res) => {
    const { lessonId } = req.params;
    const userId = req.user.id;

    console.log("userId from controller function: ", userId);

    try {
        const result = await Progress.markLessonComplete(userId, lessonId);
        res.status(200).json({ message: 'Progress updated', result });
    } catch (error) {
        res.status(500).json({ message: 'Error updating progress', error: error.message });
    }
};

exports.getProgress = async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user.id;

    try {
        const progress = await Progress.getCourseProgress(userId, courseId);
        res.status(200).json({ progress });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching progress', error: error.message });
    }
};