import express from "express";
import auth from "../middleware/auth.middleware.js";
import { requireProfileCompleted } from "../middleware/stage.middleware.js";
import { preventIfLocked } from "../middleware/decision.guard.js";
import { lockFinalDecision } from "../controllers/decision.controller.js";

const router = express.Router();

router.post(
  "/lock",
  auth,
  requireProfileCompleted,
  preventIfLocked,
  lockFinalDecision
);

export default router;
