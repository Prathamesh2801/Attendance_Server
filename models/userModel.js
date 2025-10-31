import db from "../config/db.js";

export async function findUserByPhone(phone) {
  const [rows] = await db.execute(
    "SELECT id, name, contact, password FROM student WHERE contact = ? LIMIT 1",
    [phone]
  );
  return rows[0] || null;
}
