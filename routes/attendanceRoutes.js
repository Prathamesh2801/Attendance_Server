// routes/attendanceRoutes.js
import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {getAttendanceDetails} from '../controllers/attendanceController.js'

const router = express.Router();

// GET /api/attendance?name_contactid=...&course=...&batch=...
router.get("/", protect, getAttendanceDetails);

export default router;
