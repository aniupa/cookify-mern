import { recipeModel } from "../models/recipe.model.js";
import { userModel } from "../models/user.model.js";
import mongoose from "mongoose";

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const parseBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true") return true;
    if (normalized === "false") return false;
  }
  return undefined;
};

const parseNumber = (value) => {
  if (value === "" || value === null || value === undefined) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
};

const normalizeDifficulty = (value) => {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().toLowerCase();
  return normalized ? normalized : undefined;
};

const buildFavoriteSet = async (userId) => {
  if (!userId) return null;
  if (!mongoose.isValidObjectId(userId)) {
    const error = new Error("Invalid user id");
    error.status = 400;
    throw error;
  }
  const user = await userModel.findById(userId).select("favorites").lean();
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  return new Set((user.favorites || []).map((id) => String(id)));
};

export async function getVideosController(req, res) {
  try {
    const { search, maxTime, difficulty, veg, trending, userId } = req.query;

    const query = {
      videoUrl: {
        $exists: true,
        $nin: ["", null],
      },
    };

    if (search) {
      const safeSearch = escapeRegex(search);
      query.$or = [
        { title: { $regex: safeSearch, $options: "i" } },
        { description: { $regex: safeSearch, $options: "i" } },
      ];
    }

    const parsedMaxTime = parseNumber(maxTime);
    if (parsedMaxTime !== undefined) {
      query.time = { $lte: parsedMaxTime };
    }

    const normalizedDifficulty = normalizeDifficulty(difficulty);
    if (normalizedDifficulty) {
      query.difficulty = normalizedDifficulty;
    }

    const parsedVeg = parseBoolean(veg);
    if (parsedVeg !== undefined) {
      query.isVeg = parsedVeg;
    }

    const parsedTrending = parseBoolean(trending);
    if (parsedTrending !== undefined) {
      query.isTrending = parsedTrending;
    }

    const favoriteSet = await buildFavoriteSet(userId);
    const videos = await recipeModel
      .find(query)
      .sort({ createdAt: -1 })
      .lean();
    const withFavorites = favoriteSet
      ? videos.map((video) => ({
          ...video,
          fav: favoriteSet.has(String(video._id)),
        }))
      : videos;

    return res.status(200).json({ videos: withFavorites });
  } catch (error) {
    if (error?.status) {
      return res.status(error.status).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
