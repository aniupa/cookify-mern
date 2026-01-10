import mongoose from "mongoose";
import { recipeModel } from "../models/recipe.model.js";
import { userModel } from "../models/user.model.js";
import {
  assertObjectId,
  createHttpError,
  normalizeDifficulty,
  parseBoolean,
  parseNumber,
} from "../utils/validation.js";

const normalizeStringList = (value) => {
  if (Array.isArray(value)) {
    const items = value
      .map((item) => String(item ?? "").trim())
      .filter(Boolean);
    return items;
  }
  if (typeof value === "string") {
    const items = value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    return items;
  }
  return [];
};

const normalizeRecipeForClient = (recipe) => ({
  ...recipe,
  ingredients: normalizeStringList(recipe?.ingredients),
  instructions: normalizeStringList(recipe?.instructions),
  views: Number.isFinite(Number(recipe?.views)) ? Number(recipe.views) : 0,
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

const applyFavoriteFlag = (items, favoriteSet) => {
  if (!favoriteSet) return items;
  return items.map((item) => ({
    ...item,
    fav: favoriteSet.has(String(item._id)),
  }));
};

export const getRecipes = async ({ limit, after, userId }) => {
  const parsedLimit = Math.max(1, parseInt(limit, 10) || 6);
  const favoriteSet = await buildFavoriteSet(userId);

  const query = {};
  if (after) {
    assertObjectId(after, "Invalid cursor (after)");
    query._id = { $lt: new mongoose.Types.ObjectId(after) };
  }

  const docs = await recipeModel
    .find(query)
    .populate("createdBy", "username avatar")
    .sort({ _id: -1 })
    .limit(parsedLimit + 1)
    .lean();

  const hasMore = docs.length > parsedLimit;
  const items = hasMore ? docs.slice(0, parsedLimit) : docs;
  const withFavorites = applyFavoriteFlag(items, favoriteSet);
  const normalized = withFavorites.map(normalizeRecipeForClient);

  return {
    recipes: normalized,
    hasMore,
    nextCursor: items.length ? String(items[items.length - 1]._id) : null,
  };
};

export const createRecipe = async ({ userId, recipe }) => {
  assertObjectId(userId, "Invalid user id");
  const recipePayload = recipe || {};
  const {
    title,
    imageUrl,
    description,
    ingredients,
    instructions,
    videoUrl,
    time,
    isVeg,
  } = recipePayload;
  const parsedTime = parseNumber(time);

  const newRecipe = await recipeModel.create({
    title,
    imageUrl,
    description,
    ingredients: normalizeStringList(ingredients),
    instructions: normalizeStringList(instructions),
    videoUrl,
    time: parsedTime,
    difficulty: normalizeDifficulty(parsedTime),
    isVeg: parseBoolean(isVeg),
    createdBy: userId,
  });

  return newRecipe;
};

export const deleteRecipe = async ({ recipeId, userId }) => {
  assertObjectId(recipeId, "Invalid id");
  assertObjectId(userId, "Invalid user id");

  const recipe = await recipeModel.findById(recipeId);
  if (!recipe) {
    throw createHttpError(404, "Recipe not found");
  }
  if (String(recipe.createdBy) !== String(userId)) {
    throw createHttpError(403, "Not allowed to delete this recipe");
  }

  await recipe.deleteOne();
};

export const updateRecipe = async ({ id, userId, data }) => {
  assertObjectId(id, "Invalid id");
  assertObjectId(userId, "Invalid user id");

  const recipe = await recipeModel.findById(id);
  if (!recipe) {
    throw createHttpError(404, "Recipe not found");
  }
  if (String(recipe.createdBy) !== String(userId)) {
    throw createHttpError(403, "Not allowed to update this recipe");
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
  ];

  const updates = {};
  for (const field of allowedFields) {
    const value = data?.[field];
    if (value !== "" && value !== null && value !== undefined) {
      updates[field] = value;
    }
  }

  let normalizedTime;
  if (updates.time !== undefined) {
    const parsedTime = parseNumber(updates.time);
    if (parsedTime === undefined) {
      delete updates.time;
    } else {
      updates.time = parsedTime;
      normalizedTime = parsedTime;
    }
  }

  if (updates.ingredients !== undefined) {
    const normalizedIngredients = normalizeStringList(updates.ingredients);
    if (normalizedIngredients.length === 0) {
      delete updates.ingredients;
    } else {
      updates.ingredients = normalizedIngredients;
    }
  }

  if (updates.instructions !== undefined) {
    const normalizedInstructions = normalizeStringList(updates.instructions);
    if (normalizedInstructions.length === 0) {
      delete updates.instructions;
    } else {
      updates.instructions = normalizedInstructions;
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
  if (normalizedTime !== undefined && updates.difficulty === undefined) {
    updates.difficulty = normalizeDifficulty(normalizedTime);
  }

  if (updates.isVeg !== undefined) {
    const parsedIsVeg = parseBoolean(updates.isVeg);
    if (parsedIsVeg === undefined) {
      delete updates.isVeg;
    } else {
      updates.isVeg = parsedIsVeg;
    }
  }

  if (Object.keys(updates).length === 0) {
    throw createHttpError(400, "No valid fields to update");
  }

  return recipeModel.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true, runValidators: true }
  );
};

export const getMyRecipes = async ({ userId }) => {
  const favoriteSet = await buildFavoriteSet(userId);
  const myRecipe = await recipeModel
    .find({ createdBy: userId })
    .sort({ createdAt: -1 })
    .lean();
  const withFavorites = applyFavoriteFlag(myRecipe, favoriteSet);
  return withFavorites.map(normalizeRecipeForClient);
};

export const incrementRecipeViews = async ({ id }) => {
  assertObjectId(id, "Invalid id");
  const recipe = await recipeModel
    .findByIdAndUpdate(id, { $inc: { views: 1 } }, { new: true })
    .lean();
  if (!recipe) {
    throw createHttpError(404, "Recipe not found");
  }
  return normalizeRecipeForClient(recipe);
};

export const setFavorite = async ({ recipeId, userId, favorite, fav }) => {
  assertObjectId(recipeId, "Invalid recipe id");
  assertObjectId(userId, "Invalid user id");

  const favoriteValue =
    typeof favorite === "boolean"
      ? favorite
      : typeof fav === "boolean"
        ? fav
        : undefined;
  if (favoriteValue === undefined) {
    throw createHttpError(400, "Favorite flag is required");
  }

  const [user, recipe] = await Promise.all([
    userModel.findById(userId).select("_id favorites"),
    recipeModel.findById(recipeId).select("_id"),
  ]);
  if (!user) {
    throw createHttpError(404, "User not found");
  }
  if (!recipe) {
    throw createHttpError(404, "Recipe not found");
  }

  const update = favoriteValue
    ? { $addToSet: { favorites: recipe._id } }
    : { $pull: { favorites: recipe._id } };
  await userModel.updateOne({ _id: userId }, update);

  return { favorite: favoriteValue };
};
