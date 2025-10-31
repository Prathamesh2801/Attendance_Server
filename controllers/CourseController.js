// controllers/courseController.js
import sendResponse from "../utils/sendResponse.js";
import {
  findPersuingSubjects,
  findCompletedSubjects,
  findPendingSubjects,
} from "../models/courseModel.js";

export const getCourseDetails = async (req, res) => {
  try {
    // we trust the authenticated user's contact/id from middleware
    const studentId = req.user?.id;
    const course = (req.query.course || "").trim();

    if (!studentId || !course) {
      return sendResponse(res, 400, { success: false, message: "Missing course or authenticated user" });
    }

    // Fetch lists
    const persuing = await findPersuingSubjects(studentId, course);
    const completed = await findCompletedSubjects(studentId, course);
    const pending = await findPendingSubjects(studentId, course);

    return sendResponse(res, 200, {
      success: true,
      data: {
        persuingSubjects: persuing,
        completedSubjects: completed,
        pendingSubjects: pending,
      },
    });
  } catch (err) {
    console.error("Course details error:", err);
    return sendResponse(res, 500, { success: false, message: err.message || "Server error" });
  }
};
