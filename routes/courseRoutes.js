// routes/courseRoutes.js
import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { getCourseDetails } from "../controllers/courseController.js";

const router = express.Router();

// GET /api/course?course=CourseName
router.get("/", protect, getCourseDetails);

export default router;
