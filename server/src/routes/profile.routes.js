import express from "express";
import auth from "../middleware/auth.middleware.js";
import {
  saveProfile,
  fetchProfile,
  getStageStatus
} from "../controllers/profile.controller.js";

const router = express.Router();

router.get("/", auth, fetchProfile);
router.post("/", auth, saveProfile);
router.get("/stage", auth, getStageStatus);

export default router;
