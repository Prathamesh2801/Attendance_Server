// models/feeModel.js
import db from "../config/db.js";

export async function findPaymentsByContact(contact) {
  const sql = `
    SELECT 
      Receipt,
      course,
      courseFees,
      Paid,
      Balance,
      Dates
    FROM payement
    WHERE name_contactid = ?
    ORDER BY Dates DESC
  `;
  const [rows] = await db.execute(sql, [contact]);
  return rows;
}
