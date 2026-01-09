
import { recipeModel } from "../models/recipe.model.js";
import { userModel } from "../models/user.model.js";
import mongoose from "mongoose";

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

const applyFavoriteFlag = (items, favoriteSet) => {
  if (!favoriteSet) return items;
  return items.map((item) => ({
    ...item,
    fav: favoriteSet.has(String(item._id)),
  }));
};

export async function getRecipesController(req, res) {
  try {
    const limit = Math.max(1, parseInt(req.query.limit, 10) || 6);
    const after = req.query.after || null; // last-seen _id (string) or null
    const userId = req.query.userId || null;
    const favoriteSet = await buildFavoriteSet(userId);

    // build query
    const query = {};
    if (after) {
      // validate cursor
      if (!mongoose.isValidObjectId(after)) {
        return res.status(400).json({ message: "Invalid cursor (after)" });
      }
      // descending order: newer -> older, so fetch _id < after
      query._id = { $lt:new mongoose.Types.ObjectId(after) };
    }

    // fetch limit+1 to determine hasMore
    const docs = await recipeModel
      .find(query)
      .populate("createdBy", "username avatar")
      .sort({ _id: -1 }) // newest first (stable)
      .limit(limit + 1)
      .lean();

    const hasMore = docs.length > limit;
    const items = hasMore ? docs.slice(0, limit) : docs;
    const withFavorites = applyFavoriteFlag(items, favoriteSet);

    return res.json({
      recipes: withFavorites,
      hasMore,
      nextCursor: items.length ? String(items[items.length - 1]._id) : null,
    });
  } catch (error) {
    if (error?.status) {
      return res.status(error.status).json({ message: error.message });
    }
    console.error("getRecipesController error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * POST /api/recipes
 */
export async function createRecipeController(req, res) {
  try {
    const userId = req.body.userId;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    const recipePayload = req.body.recipe || {};
    const {
      title,
      imageUrl,
      description,
      ingredients,
      instructions,
      videoUrl,
      time,
      difficulty,
      isVeg,
      isTrending,
    } = recipePayload;

    const newRecipe = await recipeModel.create({
      title,
      imageUrl,
      description,
      ingredients,
      instructions,
      videoUrl,
      time: parseNumber(time),
      difficulty: normalizeDifficulty(difficulty),
      isVeg: parseBoolean(isVeg),
      isTrending: parseBoolean(isTrending),
      createdBy: userId,
    });

    return res.status(201).json({ recipe: newRecipe, userId });
  } catch (error) {
    console.error("createRecipeController error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * DELETE /api/recipes/:id
 */
export async function deleteRecipeController(req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const userId = req.body?.userId || req.query?.userId;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const recipe = await recipeModel.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    if (String(recipe.createdBy) !== String(userId)) {
      return res.status(403).json({ message: "Not allowed to delete this recipe" });
    }

    await recipe.deleteOne();
    return res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.error("deleteRecipeController error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateRecipeController(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid id" });
    }

    const userId = req.body?.userId;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const recipe = await recipeModel.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    if (String(recipe.createdBy) !== String(userId)) {
      return res.status(403).json({ message: "Not allowed to update this recipe" });
    }

    const allowedFields = [
      "title",
      "imageUrl",
      "description",
      "ingredients",
      "instructions",
      "videoUrl",
      "time",
      "difficulty",
      "isVeg",
      "isTrending",
    ];

    const updates = {};
    for (const field of allowedFields) {
      const value = req.body?.[field];
      if (value !== "" && value !== null && value !== undefined) {
        updates[field] = value;
      }
    }

    if (updates.time !== undefined) {
      const parsedTime = parseNumber(updates.time);
      if (parsedTime === undefined) {
        delete updates.time;
      } else {
        updates.time = parsedTime;
      }
    }

    if (updates.difficulty !== undefined) {
      const normalizedDifficulty = normalizeDifficulty(updates.difficulty);
      if (!normalizedDifficulty) {
        delete updates.difficulty;
      } else {
        updates.difficulty = normalizedDifficulty;
      }
    }

    if (updates.isVeg !== undefined) {
      const parsedIsVeg = parseBoolean(updates.isVeg);
      if (parsedIsVeg === undefined) {
        delete updates.isVeg;
      } else {
        updates.isVeg = parsedIsVeg;
      }
    }

    if (updates.isTrending !== undefined) {
      const parsedIsTrending = parseBoolean(updates.isTrending);
      if (parsedIsTrending === undefined) {
        delete updates.isTrending;
      } else {
        updates.isTrending = parsedIsTrending;
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const updatedRecipe = await recipeModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );
    return res
      .status(200)
      .json({ message: "Recipe updated successfully", recipe: updatedRecipe });
  } catch (error) {
    console.error("updateRecipeController error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}


export async function getMyRecipesController(req, res) {
  try {
    const userId = req.params.id;
    const favoriteSet = await buildFavoriteSet(userId);
    const myRecipe = await recipeModel
      .find({ createdBy: userId })
      .sort({ createdAt: -1 })
      .lean();
    const withFavorites = applyFavoriteFlag(myRecipe, favoriteSet);
    res.status(200).json({ myRecipe: withFavorites });

     
  } catch (error) {
    if (error?.status) {
      return res.status(error.status).json({ message: error.message });
    }
    console.error("getRecipesController error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function setFavoriteController(req, res) {
  try {
    const recipeId = req.params.id;
    const userId = req.body?.userId;
    const favorite =
      typeof req.body?.favorite === "boolean"
        ? req.body.favorite
        : typeof req.body?.fav === "boolean"
          ? req.body.fav
          : undefined;

    if (!mongoose.isValidObjectId(recipeId)) {
      return res.status(400).json({ message: "Invalid recipe id" });
    }
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }
    if (favorite === undefined) {
      return res.status(400).json({ message: "Favorite flag is required" });
    }

    const [user, recipe] = await Promise.all([
      userModel.findById(userId).select("_id favorites"),
      recipeModel.findById(recipeId).select("_id"),
    ]);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const update = favorite
      ? { $addToSet: { favorites: recipe._id } }
      : { $pull: { favorites: recipe._id } };
    await userModel.updateOne({ _id: userId }, update);

    return res.status(200).json({ favorite });
  } catch (error) {
    console.error("setFavoriteController error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
