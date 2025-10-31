// controllers/batchController.js
import sendResponse from "../utils/sendResponse.js";
import {
  findFacultyStudentByStatus,
  findPendingSubjects,
} from "../models/batchModel.js";

export const getBatchDetails = async (req, res) => {
  try {
    // We trust JWT-authenticated user id instead of client-sent id
    const studentId = req.user?.id;
    const course = req.query.course;

    if (!studentId || !course) {
      return sendResponse(res, 400, { success: false, message: "Missing required data: course (and authenticated user)" });
    }

    // fetch data
    const persuing = await findFacultyStudentByStatus(studentId, course, "Persuing");
    const completed = await findFacultyStudentByStatus(studentId, course, "Completed");
    const pending = await findPendingSubjects(studentId, course);

    return sendResponse(res, 200, {
      success: true,
      data: {
        persuing,
        completed,
        pending,
      },
    });
  } catch (err) {
    console.error("Batch details error:", err);
    return sendResponse(res, 500, { success: false, message: "Database error: " + (err.message || "") });
  }
};
