import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
// initialize DB pool (run your config file which exports the pool)
import "./config/db.js";

// import routes
import authRoutes from "./routes/authRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import batchRoutes from "./routes/batchRoutes.js";

const app = express();

// security & parsing
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); // replaces custom parseBody
app.use(express.urlencoded({ extended: true }));

// dev logger
if (process.env.NODE_ENV !== "production") app.use(morgan("dev"));

// mount routes
app.use("/api/auth", authRoutes); // POST /api/auth/login

app.use("/api/attendance", attendanceRoutes); // GET

app.use("/api/batch", batchRoutes); // GET /api/batch?course=...

// health check
app.get("/api/health", (req, res) => {
  return res.json({ success: true, message: "Server OK" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  const status = err.statusCode || 500;
  const message = err.message || "Server error";
  res.status(status).json({ success: false, message });
});

export default app;
