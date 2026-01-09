import mongoose from "mongoose";

export const createHttpError = (status, message) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export const assertObjectId = (value, message = "Invalid id") => {
  if (!mongoose.isValidObjectId(value)) {
    throw createHttpError(400, message);
  }
};

export const parseBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true") return true;
    if (normalized === "false") return false;
  }
  return undefined;
};

export const parseNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

export const normalizeDifficulty = (value) => {
  
  // if (typeof value !== "string") return undefined;
  if (value <30) {
    return 'Easy'
  } else if (value >=30 && value <60) {
    return 'Medium'
  } else {
    return 'Hard'
  }
  // const normalized = value.trim().toLowerCase();
  // return normalized ? normalized : undefined;
};

export const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
