import express from "express";
import auth from "../middleware/auth.middleware.js";
import { getTasks, completeTask, updateTask } from "../controllers/task.controller.js";
import { requireProfileCompleted } from "../middleware/stage.middleware.js";

const router = express.Router();

router.get("/", auth, requireProfileCompleted, getTasks);
router.post("/complete", auth, completeTask);
router.patch("/:id", auth, requireProfileCompleted, updateTask);

export default router;
