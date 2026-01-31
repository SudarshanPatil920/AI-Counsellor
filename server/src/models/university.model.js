import pool from "../config/db.js";

/**
 * Get all universities
 */
export const listUniversities = async () => {
  const { rows } = await pool.query(
    `SELECT * FROM universities`
  );
  return rows;
};


export const getLockedUniversities = async (userId) => {
  const { rows } = await pool.query(
    `SELECT * FROM locked_universities WHERE user_id = $1`,
    [userId]
  );
  return rows;
};
