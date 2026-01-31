import pool from "../config/db.js";

export const createTask = async (userId, title) => {
  const { rows } = await pool.query(
    `INSERT INTO tasks (user_id, title, completed)
     VALUES ($1, $2, false)
     RETURNING *`,
    [userId, title]
  );
  return rows[0];
};

export const updateTaskStatus = async (taskId, completed) => {
  const { rows } = await pool.query(
    "UPDATE tasks SET completed=$1 WHERE id=$2 RETURNING *",
    [completed, taskId]
  );
  return rows[0];
};
