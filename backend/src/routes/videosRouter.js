import express from "express";
import { getVideosController } from "../controllers/videos.controller.js";
const router = express.Router();

router.get("/videos", getVideosController);

export default router;
