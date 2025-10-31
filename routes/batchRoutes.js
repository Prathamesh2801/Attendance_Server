// routes/batchRoutes.js
import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { getBatchDetails } from "../controllers/batchController.js";

const router = express.Router();

// GET /api/batch?course=COURSECODE
router.get("/", protect, getBatchDetails);

export default router;
