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
