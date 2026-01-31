import pool from "../config/db.js";

export const upsertProfile = async (userId, data) => {
  const { rows } = await pool.query(
    `
    INSERT INTO profiles (user_id, data, completed)
    VALUES ($1, $2, true)
    ON CONFLICT (user_id)
    DO UPDATE SET data=$2, completed=true
    RETURNING *
    `,
    [userId, data]
  );
  return rows[0];
};

export const getProfile = async (userId) => {
  const { rows } = await pool.query(
    `SELECT * FROM profiles WHERE user_id=$1`,
    [userId]
  );
  return rows[0];
};


export const lockDecision = async (userId, country, university) => {
  const { rows } = await pool.query(
    `
    INSERT INTO locked_universities (user_id, country, university)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [userId, country, university]
  );
  return rows[0];
};
