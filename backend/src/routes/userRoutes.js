import express from "express";
import {
  randomBioController,
  userRegisterController,
  userLoginController,
} from "../controllers/user.Controller.js";

const router = express.Router();

router.post("/register", userRegisterController);
router.post("/login", userLoginController);
router.get("/random-bio", randomBioController);

export default router;
