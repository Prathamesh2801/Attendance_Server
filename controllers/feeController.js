// controllers/feeController.js
import sendResponse from "../utils/sendResponse.js";
import { findPaymentsByContact } from "../models/feeModel.js";

export const getFeeDetails = async (req, res) => {
  try {
    // use contact param if provided but enforce it matches authenticated user
    const queryContact = (req.query.name_contactid || "").trim(); // `name` in your old API
    const callerContact = String(req.user?.contact || "").trim();
    console.log('DEBUG callerContact:', callerContact, 'queryContact:', queryContact);
    if (!callerContact && !queryContact) {
      return sendResponse(res, 400, { success: false, message: "Contact is required" });
    }

    // If client supplied a contact, ensure it matches the logged-in user
    const contactToUse = queryContact ? queryContact : callerContact;
    console.log('DEBUG contactToUse used for DB query:', contactToUse);
    if (queryContact && contactToUse !== callerContact) {
      return sendResponse(res, 403, { success: false, message: "Forbidden: cannot view other user's fees" });
    }

    const payments = await findPaymentsByContact(contactToUse);

    const summary = payments.reduce((acc, p) => {
      acc.totalAmount += Number(p.courseFees || 0);
      acc.totalPaid += Number(p.Paid || 0);
      acc.totalDue += Number(p.Balance || 0);
      return acc;
    }, { totalAmount: 0, totalPaid: 0, totalDue: 0, totalPayments: payments.length });

    return sendResponse(res, 200, { success: true, data: { payments, summary } });
  } catch (err) {
    console.error("FeeDetails error:", err);
    return sendResponse(res, 500, { success: false, message: "Internal server error" });
  }
};
