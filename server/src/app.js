import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";
import counsellorRoutes from "./routes/counsellor.routes.js";
import universityRoutes from "./routes/university.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import taskRoutes from "./routes/task.routes.js";
import decisionRoutes from "./routes/decision.routes.js";


const app = express();

app.use(
  cors({
    origin: [
      "https://ai-counsellor-mvr.vercel.app", // frontend (prod)
      "http://localhost:5173"                // local dev
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "AI Counsellor API running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/counsellor", counsellorRoutes);
app.use("/api/universities", universityRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/decision", decisionRoutes);


app.use(errorMiddleware);

export default app;