// models/feeModel.js
import db from "../config/db.js";

/**
 * Flexible lookup that tolerates "NAME PHONE" stored in name_contactid.
 * Uses explicit COLLATE to avoid "Illegal mix of collations" errors.
 */
export async function findPaymentsByContact(contact) {
  const normalized = (contact || "").replace(/\D/g, ""); // digits only
  console.log("DEBUG findPaymentsByContact -> normalized:", normalized);

  const sql = `
    SELECT Receipt, course, courseFees, Paid, Balance, Dates, name_contactid
    FROM payement
    WHERE 
      -- normalize stored value by removing spaces/plus/hyphen, then force collation
      (REPLACE(REPLACE(REPLACE(name_contactid, ' ', ''), '+', ''), '-', '') COLLATE utf8mb4_general_ci)
      LIKE (CONCAT('%', ?, '%') COLLATE utf8mb4_general_ci)
    ORDER BY Dates DESC
  `;

  const [rows] = await db.execute(sql, [normalized]);
  console.log("DEBUG findPaymentsByContact -> rows.length:", rows.length);
  return rows;
}
