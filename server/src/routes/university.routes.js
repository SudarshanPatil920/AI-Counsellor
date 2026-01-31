import express from "express";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/recommendations", auth, async (req, res) => {
  // Dummy data for hackathon
  res.json([
    {
      id: 1,
      name: "University of Toronto",
      category: "Dream",
      reason: "Strong academics but competitive",
    },
    {
      id: 2,
      name: "Arizona State University",
      category: "Target",
      reason: "Good match for your profile",
    },
    {
      id: 3,
      name: "University of Texas Arlington",
      category: "Safe",
      reason: "High acceptance rate and budget friendly",
    },
  ]);
});

export default router;
