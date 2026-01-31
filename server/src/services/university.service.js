export const classifyUniversity = (profile, uni) => {
  if (uni.cost > profile.budget) {
    return { category: "Risky", reason: "Cost exceeds your budget" };
  }

  if (uni.competitiveness === "High") {
    if (profile.gre === "Completed" && profile.sop === "Ready") {
      return { category: "Target", reason: "Strong profile for a competitive university" };
    }
    return { category: "Risky", reason: "High competition and profile not ready" };
  }

  if (uni.competitiveness === "Medium") {
    return { category: "Target", reason: "Balanced match for your profile" };
  }

  return { category: "Safe", reason: "Low competition and budget-friendly" };
};


const createTaskIfNotExists = async (pool, userId, title) => {
  const { rows } = await pool.query(
    "SELECT id FROM tasks WHERE user_id = $1 AND title = $2",
    [userId, title]
  );

  if (rows.length === 0) {
    await pool.query(
      "INSERT INTO tasks (user_id, title) VALUES ($1, $2)",
      [userId, title]
    );
  }
};
