import mongoose from "mongoose";
import { connectToDb } from "../src/db/db.js";
import { recipeModel } from "../src/models/recipe.model.js";
import { normalizeDifficulty, parseNumber } from "../src/utils/validation.js";

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

const normalizeViews = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};

const run = async () => {
  await connectToDb();
  const recipes = await recipeModel.find().lean();
  let updatedCount = 0;

  for (const recipe of recipes) {
    const updates = {};
    const normalizedIngredients = normalizeStringList(recipe.ingredients);
    const normalizedInstructions = normalizeStringList(recipe.instructions);
    const normalizedTime = parseNumber(recipe.time);
    const normalizedViews = normalizeViews(recipe.views);

    if (
      !Array.isArray(recipe.ingredients) ||
      JSON.stringify(recipe.ingredients) !== JSON.stringify(normalizedIngredients)
    ) {
      updates.ingredients = normalizedIngredients;
    }

    if (
      !Array.isArray(recipe.instructions) ||
      JSON.stringify(recipe.instructions) !== JSON.stringify(normalizedInstructions)
    ) {
      updates.instructions = normalizedInstructions;
    }

    if (!Number.isFinite(Number(recipe.views)) || recipe.views !== normalizedViews) {
      updates.views = normalizedViews;
    }

    if (normalizedTime !== undefined && recipe.time !== normalizedTime) {
      updates.time = normalizedTime;
    }

    if (normalizedTime !== undefined) {
      updates.difficulty = normalizeDifficulty(normalizedTime);
    }

    if (Object.keys(updates).length > 0) {
      await recipeModel.updateOne({ _id: recipe._id }, { $set: updates });
      updatedCount += 1;
    }
  }

  console.log(`Updated ${updatedCount} recipes.`);
  await mongoose.disconnect();
};

run().catch((error) => {
  console.error("Recipe normalization failed:", error);
  mongoose.disconnect();
  process.exit(1);
});
