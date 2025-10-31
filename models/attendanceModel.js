import db from "../config/db.js";

export async function findAttendanceByUser({ name_contactid, course, batch }) {
  const sql = `
    SELECT date, name, attendence, topic, Reasonfor_absent
    FROM attendence
    WHERE name = ? AND course = ? AND batchno = ?
    ORDER BY date ASC
  `;
  const [rows] = await db.execute(sql, [name_contactid, course, batch]);
  console.log("Database Result : ", [rows]);
  return rows;
}
