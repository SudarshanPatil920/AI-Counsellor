import { lockDecision } from "../models/profile.model.js";
import pool from "../config/db.js";

export const lockFinalDecision = async (req, res) => {
  try {
    const { country, university } = req.body;

    // 1️⃣ Lock the university
    await lockDecision(req.user.id, country, university);

    // 2️⃣ Auto-generate application tasks (🔥 THIS IS OPTION B)
    await pool.query(
      `
      INSERT INTO tasks (user_id, title)
      VALUES
        ($1, 'Write Statement of Purpose (SOP)'),
        ($1, 'Prepare academic transcripts'),
        ($1, 'Check IELTS / TOEFL requirements'),
        ($1, 'Review application deadlines')
      `,
      [req.user.id]
    );

    res.json({
      message: "University locked and application tasks generated",
      university,
      nextStage: "PREPARING_APPLICATIONS"
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to lock decision or create tasks"
    });
  }
};
