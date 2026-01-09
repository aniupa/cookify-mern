import { assertObjectId } from "../utils/validation.js";

const extractUserId = (req) =>
  req.body?.userId || req.query?.userId || req.headers["x-user-id"];

export const requireUserId = (req, res, next) => {
  try {
    const userId = extractUserId(req);
    if (!userId) {
      return res.status(401).json({ message: "User id required" });
    }
    assertObjectId(userId, "Invalid user id");
    req.userId = userId;
    return next();
  } catch (error) {
    return res.status(error?.status || 400).json({
      message: error?.message || "Invalid user id",
    });
  }
};
