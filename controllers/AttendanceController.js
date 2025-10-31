// controllers/attendanceController.js
import sendResponse from "../utils/sendResponse.js";
import { findAttendanceByUser } from "../models/attendanceModel.js";

export const getAttendanceDetails = async (req, res) => {
  try {
    const { name_contactid, course, batch } = req.query;
    if (!name_contactid || !course || !batch) {
      return sendResponse(res, 400, {
        success: false,
        message: "Missing parameters",
      });
    }
    console.log("Data : ", { name_contactid, course, batch });
    // Authorization: only allow a user to fetch their own attendance
    console.log("Match Data : ",req.user)

    if (String(req.user.name_contactid) !== String(name_contactid)) {
      return sendResponse(res, 403, {
        success: false,
        message: "Unauthorized to view attendance",
      });
    }

    const rows = await findAttendanceByUser({ name_contactid, course, batch });
    return sendResponse(res, 200, { success: true, data: rows });
  } catch (err) {
    console.error("Attendance error:", err);
    return sendResponse(res, 500, {
      success: false,
      message: err.message || "Server error",
    });
  }
};
