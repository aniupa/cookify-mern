import { recipeModel } from "../models/recipe.model.js";
import { userModel } from "../models/user.model.js";
import {
  assertObjectId,
  createHttpError,
  escapeRegex,
  normalizeDifficulty,
  parseBoolean,
  parseNumber,
} from "../utils/validation.js";

const normalizeStringList = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item ?? "").trim())
      .filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const normalizeVideoForClient = (video) => ({
  ...video,
  ingredients: normalizeStringList(video?.ingredients),
  instructions: normalizeStringList(video?.instructions),
  views: Number.isFinite(Number(video?.views)) ? Number(video.views) : 0,
});

const buildFavoriteSet = async (userId) => {
  if (!userId) return null;
  assertObjectId(userId, "Invalid user id");
  const user = await userModel.findById(userId).select("favorites").lean();
  if (!user) {
    throw createHttpError(404, "User not found");
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
      const timeRange =
        normalizedDifficulty === "easy"
          ? { $lt: 30 }
          : normalizedDifficulty === "medium"
            ? { $gte: 30, $lt: 60 }
            : { $gte: 60 };
      query.time = { ...(query.time || {}), ...timeRange };
    }

    const parsedVeg = parseBoolean(veg);
    if (parsedVeg !== undefined) {
      query.isVeg = parsedVeg;
    }

    const parsedTrending = parseBoolean(trending);
    const sort = parsedTrending ? { views: -1, createdAt: -1 } : { createdAt: -1 };

    const favoriteSet = await buildFavoriteSet(userId);
    const videos = await recipeModel
      .find(query)
      .sort(sort)
      .lean();
    const withFavorites = favoriteSet
      ? videos.map((video) => ({
          ...video,
          fav: favoriteSet.has(String(video._id)),
        }))
      : videos;
    const normalized = withFavorites.map(normalizeVideoForClient);

    return res.status(200).json({ videos: normalized });
  } catch (error) {
    if (error?.status) {
      return res.status(error.status).json({ message: error.message });
    }
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
