import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { authRoutes, logRoutes, userRoutes } from "@routes";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/logs", logRoutes);

// Health check route
app.get("/api/health", (_req, res) => {
    res.json({ status: "OK", message: "Server is healthy" });
});

export default app;
