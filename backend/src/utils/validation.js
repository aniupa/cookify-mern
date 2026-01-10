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
  if (value === "" || value === null || value === undefined) {
    return undefined;
  }
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "easy" || normalized === "medium" || normalized === "hard") {
      return normalized;
    }
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return undefined;
  }
  if (parsed < 30) {
    return "easy";
  }
  if (parsed < 60) {
    return "medium";
  }
  return "hard";
};

export const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
