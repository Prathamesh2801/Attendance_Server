
export default function sendResponse(res, status, payload = {}) {
  return res.status(status).json(payload);
}
