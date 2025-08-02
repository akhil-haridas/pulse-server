import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authRoutes, logRoutes, reportRoutes, userRoutes } from "@routes";

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/reports", reportRoutes);

// Health check route
app.get("/api/ping", (_req, res) => {
  res.status(200).json({ message: "pong" });
});

export default app;
