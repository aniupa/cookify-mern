import express from "express";
import {
  getUserFavoritesController,
  randomBioController,
  updateUserController,
  userRegisterController,
  userLoginController,
} from "../controllers/user.Controller.js";

const router = express.Router();

router.post("/register", userRegisterController);
router.post("/login", userLoginController);
router.patch("/user/:id", updateUserController);
router.get("/user/:id/favorites", getUserFavoritesController);
router.get("/random-bio", randomBioController);

export default router;
