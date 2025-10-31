// middlewares/authMiddleware.js
import jwt from "jsonwebtoken";
import db from "../config/db.js";

export default async function protect(req, res, next) {
  try {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const [rows] = await db.execute(
      "SELECT id, name, contact , name_contactid FROM student WHERE id = ? LIMIT 1",
      [decoded.id]
    );
    const user = rows[0];
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid token user" });

    req.user = user; // { id, name, contact }
    return next();
  } catch (err) {
    console.error("Auth error:", err && err.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
}
