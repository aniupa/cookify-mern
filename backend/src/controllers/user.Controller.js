import mongoose from "mongoose";
import { userModel } from "../models/user.model.js";
import { recipeModel } from "../models/recipe.model.js";

export const userRegisterController = async (req, res) => {
  
  try {
    const { username, email, password, avatar, bio } = req.body;
    console.log(req.body);
    

    // basic request validation
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "username, email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1) quick check (user-friendly early response)
    const existing = await userModel.findOne({ email: normalizedEmail }).lean();
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // 2) hash password
    // const hashed = await bcrypt.hash(password, 10);

    // 3) create user (may still throw duplicate key if race condition)
    const user = await userModel.create({
      username,
      email: normalizedEmail,
      password: password,
      avatar,
      bio,
    });

    // you may want to remove password before sending back
    return res.status(201).json({  userId: user._id });
  } catch (err) {
    // 4) catch duplicate key error (race condition safety)
    if (err && err.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body ?? {};
    // console.log(req.body);
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await userModel.findOne({ email: normalizedEmail }).lean();
    if (!user) {
      return res
        .status(401)
        .json({ message: "unauthorized user... pls register!!" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "invalid password" });
    }

    const { password: _password, ...safeUser } = user;
    return res.status(200).json({ message: `welcome `, user: safeUser });
  } catch (error) {
    // console.log(error);

    res.status(500).json({ message: "internal server error" });
  }
};

export const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const allowedFields = ["username", "email", "password", "avatar", "bio"];
    const updates = {};
    for (const field of allowedFields) {
      const value = req.body?.[field];
      if (value !== undefined && value !== null && value !== "") {
        updates[field] = value;
      }
    }

    if (updates.email) {
      updates.email = updates.email.trim().toLowerCase();
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }

    const user = await userModel
      .findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true })
      .lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password: _password, ...safeUser } = user;
    return res.status(200).json({ user: safeUser });
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }
    console.error("Update user error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

const randomBios = [
  "Home cook sharing easy recipes.",
  "Always testing new flavors in the kitchen.",
  "Simple meals, big taste.",
  "Weekend baker and weeknight cook.",
  "Fresh ingredients, simple steps.",
  "Learning one recipe at a time.",
  "Cooking is my daily reset.",
  "Family recipes with a modern twist.",
  "Quick meals for busy days.",
  "Food lover and recipe keeper.",
];

export const randomBioController = (req, res) => {
  const bio = randomBios[Math.floor(Math.random() * randomBios.length)];
  return res.status(200).json({ bio });
};

export const getUserFavoritesController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const user = await userModel.findById(id).select("favorites").lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const favoriteIds = user.favorites || [];
    if (favoriteIds.length === 0) {
      return res.status(200).json({ favorites: [] });
    }

    const favorites = await recipeModel
      .find({ _id: { $in: favoriteIds } })
      .populate("createdBy", "username avatar")
      .sort({ createdAt: -1 })
      .lean();

    const withFavorites = favorites.map((recipe) => ({
      ...recipe,
      fav: true,
    }));

    return res.status(200).json({ favorites: withFavorites });
  } catch (error) {
    console.error("getUserFavoritesController error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
