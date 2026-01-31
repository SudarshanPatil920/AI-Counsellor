import pool from "../config/db.js";

export const getTasks = async (req, res, next) => {
  try {
    const { rows } = await pool.query(
      `SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at`,
      [req.user.id]
    );
    res.json(rows);
  } catch (e) {
    next(e);
  }
};

export const completeTask = async (req, res, next) => {
  try {
    const { taskId } = req.body;
    await pool.query(
      `UPDATE tasks SET completed=true WHERE id=$1 AND user_id=$2`,
      [taskId, req.user.id]
    );
    res.json({ message: "Task completed" });
  } catch (e) {
    next(e);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { completed } = req.body;

    const { rows } = await pool.query(
      `UPDATE tasks
       SET completed = $1
       WHERE id = $2 AND user_id = $3
       RETURNING *`,
      [completed, req.params.id, req.user.id]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(rows[0]);
  } catch (e) {
    next(e);
  }
};
