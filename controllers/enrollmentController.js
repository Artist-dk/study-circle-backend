const Enrollment = require("../models/enrollmentModel");

exports.getUserEnrollments = async (req, res) => {
    const { userId } = req.params;

    try {
        const enrollments = await Enrollment.getUserEnrollments(userId);

        if (enrollments.length === 0) {
            return res.status(404).json({ message: "No enrollments found for this user." });
        }

        res.status(200).json({
            message: "Enrollments fetched successfully.",
            enrollments,
        });
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        res.status(500).json({ message: "Error fetching enrollments", error: error.message });
    }
};
