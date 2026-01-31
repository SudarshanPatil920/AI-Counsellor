import pkg from "pg";
import env from "./env.js";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("connect", () => {
  console.log("✅ Connected to Neon PostgreSQL");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL error:", err);
  process.exit(1);
});

export default pool;
