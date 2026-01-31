import express from "express";
import auth from "../middleware/auth.middleware.js";
import { requireProfileCompleted } from "../middleware/stage.middleware.js";
import {
  talkToCounsellor,
  lockUniversityAction
} from "../controllers/counsellor.controller.js";

const router = express.Router();

router.post("/chat", auth, requireProfileCompleted, talkToCounsellor);
router.post("/lock-university", auth, requireProfileCompleted, lockUniversityAction);

export default router;
