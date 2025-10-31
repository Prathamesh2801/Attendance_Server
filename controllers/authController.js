import jwt from "jsonwebtoken";
import { findUserByPhone } from "../models/userModel.js";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || "1d";

export async function login(req, res) {
  try {
    const { contact, password } = req.body;
    if (!contact || !password) {
      return res
        .status(400)
        .json({ success: false, message: "contact and password required" });
    }

    const user = await findUserByPhone(contact);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // PLAIN-TEXT COMPARISON — not secure, only for temporary/testing use
    if (String(password) !== String(user.password)) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const tokenPayload = {
      id: user.id,
      name: user.name,
      contact: user.contact,
      contactno: user.name_contactid,
    };

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES,
    });

    const safeUser = {
      id: user.id,
      name: user.name,
      contact: user.contact,
      contactno: user.name_contactid,
    };
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: safeUser,
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
