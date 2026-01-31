import dotenv from "dotenv";

dotenv.config();

const requiredEnv = [
  "PORT",
  "DATABASE_URL",
  "JWT_SECRET",
  "NODE_ENV"
];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    console.error(`❌ Missing required env variable: ${key}`);
    process.exit(1);
  }
});

const env = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  nodeEnv: process.env.NODE_ENV,
};

export default env;
