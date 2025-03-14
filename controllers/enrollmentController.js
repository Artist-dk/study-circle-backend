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


exports.enrollUser = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id;

  if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
  }

  try {
      const alreadyEnrolled = await Enrollment.checkEnrollment(userId, courseId);

      if (alreadyEnrolled.length > 0) {
          return res.status(409).json({ message: "User already enrolled in this course" });
      }

      await Enrollment.enrollUser(userId, courseId);

      res.status(201).json({
          message: "User successfully enrolled in the course",
      });
  } catch (error) {
      console.error("Error enrolling user:", error);
      res.status(500).json({ message: "Error enrolling user", error: error.message });
  }
};
