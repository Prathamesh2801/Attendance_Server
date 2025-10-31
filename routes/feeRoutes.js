// routes/feeRoutes.js
import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { getFeeDetails } from "../controllers/feeController.js";

const router = express.Router();

// GET /api/fee?name=<contact>   (name optional; if provided must match token)
router.get("/", protect, getFeeDetails);

export default router;
